import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { candidateReportsLoader } from './lib/candidate-reports';

/**
 * Controlled vocabularies (design spec §3) live in `src/lib/vocabulary.ts` so
 * that the plain-Node pipeline scripts, which cannot import `astro:content`,
 * read the same definitions. They are re-exported here because that is where
 * the site code already imports them from.
 *
 * The schemas below are the rules Zod can decide by looking at a single file.
 * Cross-file rules — a claim's `story` existing, evidence IDs resolving, claim
 * topics being a subset of the story's — belong to `scripts/validate.ts`.
 */
import {
  CANONICAL_FINDINGS,
  CHANGELOG_TYPES,
  COMMITMENT_STATUSES,
  CONFIDENCE_LEVELS,
  JOURNAL_TYPES,
  PANEL_AGREEMENT_LEVELS,
  REVIEWER_VERDICTS,
  STORY_STATUSES,
  TOPIC_SLUGS,
} from './lib/vocabulary';

export {
  CANONICAL_FINDINGS,
  CHANGELOG_TYPES,
  COMMITMENT_STATUSES,
  CONFIDENCE_LEVELS,
  JOURNAL_TYPES,
  PANEL_AGREEMENT_LEVELS,
  REVIEWER_VERDICTS,
  STORY_STATUSES,
  TOPIC_SLUGS,
};

const topicSlug = z.enum(TOPIC_SLUGS);

/**
 * ISO-8601 calendar date, `YYYY-MM-DD`, that is also a real date.
 *
 * YAML parses a bare `2026-08-31` into a Date, so an unquoted date in
 * frontmatter arrives here as an object. It is normalised back to the string
 * form the repo stores, which keeps ordering comparisons plain string
 * comparisons and keeps authors from having to quote every date.
 */
const isoDate = z
  .preprocess(
    (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
    z.string(),
  )
  .refine(
    (value) => /^\d{4}-\d{2}-\d{2}$/.test(value),
    'must be an ISO-8601 date (YYYY-MM-DD)',
  )
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }, 'must be a real calendar date');

const evidenceId = z.string().regex(/^YF-EV-\d{4}$/, 'must look like YF-EV-0001');

const changelogEntry = z.object({
  date: isoDate,
  type: z.enum(CHANGELOG_TYPES),
  note: z.string().min(1),
});

/**
 * One composite paraphrase shown in "Common forms of the claim". Since
 * methodology v1.2 these are written by us, never captured from a real post, so
 * only `text` reaches the page — `platform` and `context` are authoring
 * provenance and are deliberately not rendered.
 */
const seenCard = z.object({
  platform: z.enum(['facebook', 'reddit', 'x']),
  text: z.string().min(1),
  /** Kept only for public officials and organizations. Not rendered. */
  attribution: z.string().optional(),
  /** Subreddit, group name, or similar surrounding context. Not rendered. */
  context: z.string().optional(),
  source_url: z.url().optional(),
  /** True when the wording was paraphrased rather than quoted exactly. */
  paraphrased: z.boolean().default(false),
});

const stories = defineCollection({
  loader: glob({ base: './src/content/stories', pattern: '**/*.mdx' }),
  schema: z
    .object({
      title: z.string().min(1),
      /**
       * The whole answer in one sentence: first thing under the title, and the
       * description on every share card. Thirty words is where it stops being a
       * sentence held in one go; a dash is how a second clause sneaks in.
       */
      one_line: z
        .string()
        .min(1)
        .refine((line) => line.trim().split(/\s+/).length <= 30, 'one_line is over 30 words')
        .refine((line) => !/[\u2014\u2013]/.test(line), 'one_line must not contain a dash'),
      /**
       * TL;DR bullets — the second disclosure layer, directly under the answer.
       * Five at most. Each should carry a fact the one-sentence answer does
       * not (a figure, a date, a clause of the record); the duplication audit
       * catches restatement, so the schema only caps the count.
       */
      tldr: z.array(z.string().min(1)).max(5, 'tldr has more than five bullets').default([]),
      topics: z.array(topicSlug).min(1),
      claims: z.array(z.string()).default([]),
      commitments: z.array(z.string()).default([]),
      /** Set only when one claim clearly dominates the story. */
      primary_claim: z.string().optional(),
      seen: z.array(seenCard).default([]),
      /** Hostile or colloquial phrasings that redirect here. */
      aliases: z.array(z.string()).default([]),
      status: z.enum(STORY_STATUSES),
      /**
       * Set when the story has left the findings board (methodology v1.13):
       * every claim on it came back Not established because the public record
       * cannot answer the question at the level people ask it.
       *
       * `status` stays `published` — the panel did run, the corrections history
       * is still the history of a published page, and the page keeps its URL.
       * What changes is listing: `src/lib/content.ts` keeps a withdrawn story
       * off every board, and `/considered` lists its claims instead.
       */
      withdrawn: z
        .object({
          date: isoDate,
          /** One sentence, shown to readers in the note at the top of the page. */
          reason: z.string().min(1),
          /** The `not-answered` candidate id in `intake/register.yaml`. */
          register: z.string().min(1),
        })
        .optional(),
      as_of: isoDate,
      last_verified: isoDate,
      review_by: isoDate,
      changelog: z.array(changelogEntry).default([]),
    })
    .superRefine((story, ctx) => {
      if (story.as_of > story.last_verified) {
        ctx.addIssue({
          code: 'custom',
          path: ['last_verified'],
          message: 'last_verified must be on or after as_of',
        });
      }
      if (story.last_verified >= story.review_by) {
        ctx.addIssue({
          code: 'custom',
          path: ['review_by'],
          message: 'review_by must be after last_verified',
        });
      }
      if (story.primary_claim && !story.claims.includes(story.primary_claim)) {
        ctx.addIssue({
          code: 'custom',
          path: ['primary_claim'],
          message: 'primary_claim must be one of this story’s claims',
        });
      }
    }),
});

/** One reviewer's position on one claim, as rendered in the AI review panel. */
const panelReviewer = z.object({
  model: z.string().min(1),
  verdict: z.enum(REVIEWER_VERDICTS),
  confidence: z.enum(CONFIDENCE_LEVELS),
  key_findings: z.array(z.string().min(1)).default([]),
  /** What this reviewer changed between round 1 and the cross-review round. */
  changed_between_rounds: z.string().optional(),
});

const claims = defineCollection({
  loader: glob({ base: './src/content/claims', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    id: z.string().min(1),
    question: z.string().min(1),
    /** Parent story slug. */
    story: z.string().min(1),
    finding: z.enum(CANONICAL_FINDINGS),
    evidence_basis: z.string().min(1),
    /**
     * Panel agreement over the locked round-1 multiset (methodology v1.3).
     * Replaced a canonical `confidence`, which named something the method never
     * computed. Per-reviewer confidence still lives in `review.reviewers`.
     */
    panel_agreement: z.enum(PANEL_AGREEMENT_LEVELS),
    methodology_version: z.string().min(1),
    /** Repo path of the review run that produced this verdict. */
    review_run: z.string().min(1),
    /** Narrower than the story's topics; validated as a subset in CI. */
    topics: z.array(topicSlug).optional(),
    evidence: z.array(evidenceId).default([]),
    key_facts: z
      .array(
        z.object({
          text: z.string().min(1),
          sources: z.array(evidenceId).min(1),
        }),
      )
      .default([]),
    aliases: z.array(z.string()).default([]),
    /**
     * Register claim ids this published claim was grouped from.
     *
     * A whole-source read regularly turns up a claim the site has already
     * published, in words nobody here wrote. Naming the register claim here —
     * rather than having the register point back at this file, which is what
     * `variation_of` did until D-0029 — is what puts those captured wordings on
     * this claim's page under "Also said as". Validated against the register.
     */
    register_claims: z.array(z.string()).default([]),
    limitations: z.array(z.string().min(1)).default([]),
    unknowns: z.array(z.string().min(1)).default([]),
    missing_evidence: z.array(z.string().min(1)).default([]),
    comparisons: z
      .array(
        z.object({
          city: z.string().min(1),
          note: z.string().min(1),
          transferability: z.string().min(1),
          source: evidenceId.optional(),
        }),
      )
      .default([]),
    /** Panel result for this claim; the AI review component renders it. */
    review: z
      .object({
        agreement: z.enum(PANEL_AGREEMENT_LEVELS),
        reviewers: z.array(panelReviewer).min(1),
      })
      .optional(),
  }),
});

const commitments = defineCollection({
  loader: glob({ base: './src/content/commitments', pattern: '**/*.{yaml,yml}' }),
  schema: z
    .object({
      id: z.string().min(1),
      statement: z.string().min(1),
      promised_by: z.string().min(1),
      promised_on: isoDate,
      /** Evidence object carrying the original City statement. */
      source: evidenceId,
      /** The measurable claim inside the promise. */
      measurable: z.string().min(1),
      /** When the promise becomes assessable. */
      assessable_on: isoDate.optional(),
      status: z.enum(COMMITMENT_STATUSES),
      /** Set when status is Assessed: the claim that went through the panel. */
      assessed_claim: z.string().optional(),
      story: z.string().optional(),
      topics: z.array(topicSlug).optional(),
    })
    .superRefine((commitment, ctx) => {
      if (commitment.status === 'Assessed' && !commitment.assessed_claim) {
        ctx.addIssue({
          code: 'custom',
          path: ['assessed_claim'],
          message: 'an Assessed commitment must link the claim that assessed it',
        });
      }
    }),
});

const topics = defineCollection({
  loader: glob({ base: './src/content/topics', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    slug: topicSlug,
    name: z.string().min(1),
    /** Short curated overview shown on the hub. Neutral category, never a conclusion. */
    overview: z.string().min(1),
    order: z.number().int().nonnegative(),
  }),
});

/**
 * Evidence registry (spec §4 puts it at the repo root, outside src/content, so
 * the ingest script and the site read the same files).
 */
const evidence = defineCollection({
  loader: glob({ base: './evidence/registry', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({
    id: evidenceId,
    title: z.string().min(1),
    publisher: z.string().min(1),
    url: z.url(),
    published_on: isoDate.optional(),
    retrieved_on: isoDate,
    kind: z.string().min(1),
    /** What this source can establish — the claim-vs-outcome distinction. */
    establishes: z.string().min(1),
    archive: z.object({
      required: z.boolean(),
      sha256: z.string().regex(/^[0-9a-f]{64}$/, 'must be a lowercase sha256 hex digest'),
      visibility: z.enum(['public', 'private']),
      path: z.string().optional(),
    }),
    rights: z.object({
      redistribution: z.enum(['allowed', 'restricted', 'unclear']),
      note: z.string().optional(),
    }),
    /** Excerpts permitted for sources that cannot be mirrored. */
    excerpts: z.array(z.string().min(1)).default([]),
  }),
});

/**
 * The project journal (D-0022): dated posts by Stew about building the site,
 * served at `/journal/<id>`. Deliberately outside the story→claim→evidence
 * model — a post carries no finding, no panel and no evidence IDs, because it
 * is Stew writing about the work rather than the record of a check.
 */
const journal = defineCollection({
  loader: glob({ base: './src/content/journal', pattern: '**/*.mdx' }),
  schema: z
    .object({
      title: z.string().min(1),
      date: isoDate,
      type: z.enum(JOURNAL_TYPES),
      /**
       * The whole post in a sentence or two: the standfirst on the post, the
       * only body text in the list, and the description in the RSS feed. Forty
       * words is where it stops being a summary and starts being the post.
       */
      summary: z.string().min(1),
      /**
       * One sentence for a reader who does not care about the machinery: why
       * the post is worth their time. Rendered under the summary.
       */
      why: z.string().min(1).optional(),
      /** Where the post points: the story it is about, a run, a methodology version. */
      links: z
        .array(z.object({ label: z.string().min(1), href: z.string().min(1) }))
        .default([]),
      draft: z.boolean().default(false),
    })
    .superRefine((post, ctx) => {
      if (post.summary.trim().split(/\s+/).length > 40) {
        ctx.addIssue({
          code: 'custom',
          path: ['summary'],
          message: 'summary is over 40 words',
        });
      }
    }),
});

/**
 * The intake records and triage reports behind `/considered/<id>`, rendered
 * from Markdown at build time. The loader explains why they cannot be a plain
 * `glob()`: the register, not a directory, is what says which files exist.
 */
const candidateReports = defineCollection({
  loader: candidateReportsLoader(),
  schema: z.object({
    path: z.string().min(1),
    reader: z.string().optional(),
    run: z.string().optional(),
  }),
});

export const collections = {
  stories,
  claims,
  commitments,
  topics,
  evidence,
  journal,
  candidateReports,
};
