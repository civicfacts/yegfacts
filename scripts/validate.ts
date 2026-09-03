/**
 * Content validation (spec §8). Runs on every PR alongside the full Astro build.
 *
 *   npm run validate
 *
 * Zod, in `src/content.config.ts`, already decides everything that can be judged
 * from a single file. This script owns the rules that need to see the whole
 * repo at once: a claim's parent story existing AND listing it back, evidence
 * IDs resolving, claim topics being inside the story's, an archived file's bytes
 * hashing to what the registry says they do.
 *
 * Two rules are deliberately narrowed:
 *
 * - **Review-run checks apply only to `published` claims.** Publication is what
 *   promises an audit trail. Before the stage-7 gate a run lives locally and
 *   `reviews/` is not committed, so demanding a manifest for a `pending-review`
 *   claim would fail CI on exactly the state the workflow is designed to have.
 * - **Changelog checks are the diff-independent half.** A `published` story must
 *   carry a `published` changelog entry. The two spec rules that compare a PR
 *   against its base — a changed `finding`/`panel_agreement` needing a story entry,
 *   a touched `prompts/`/`scripts/merge*`/`scripts/synthesize*`/`methodology/`
 *   path needing a methodology entry — are not implemented here; see the TODO
 *   at the bottom of this file.
 *
 * Two rules are deliberately advisory. The method-vocabulary list in
 * `checkPlainSpeech` only warns, because a word list that fails the build is
 * the next rule that deletes true content — see `METHOD_VOCABULARY`. And a
 * published run's `combined-evidence.json`
 * MUST carry `fetch_status` on every item — that is a hard failure — but an
 * unverifiable item that a `key_fact` cites only prints a `warn:` line, because
 * matching citations to combined-evidence items is approximate and the gate
 * audit, not this script, is where that judgement belongs.
 *
 * Exit code is 1 if any rule failed, 0 otherwise; warnings never set it.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import {
  asDateString,
  isIsoDate,
  listDirectories,
  listFiles,
  loadFrontmatter,
  loadMethodologyChangelog,
  loadYaml,
  relative,
  repoPath,
  sha256File,
} from './lib/repo.ts';
import { validateReviewFile, loadRunManifest } from './lib/review-schema.ts';
import {
  readCapture,
  registerProblems,
  type Register,
  type RegisterWorld,
} from './lib/register-checks.ts';
import { redirectProblems, type RedirectRow } from './lib/redirect-checks.ts';
import { allRedirects, redirectFileText } from './lib/redirect-file.ts';
import { methodVocabularyIn } from '../src/lib/plain-speech.ts';
import {
  CANONICAL_FINDINGS,
  CHANGELOG_TYPES,
  COMMITMENT_STATUSES,
  PANEL_AGREEMENT_LEVELS,
  STORY_STATUSES,
  TOPIC_SLUGS,
} from '../src/lib/vocabulary.ts';

// ---------------------------------------------------------------------------
// Problem collection
// ---------------------------------------------------------------------------

type Problem = { file: string; message: string };

const problems: Problem[] = [];

function fail(file: string, message: string): void {
  problems.push({ file: relative(file), message });
}

/**
 * Printed, but does not set the exit code. Reserved for findings that need a
 * human judgement the validator cannot make on its own — see
 * `checkCombinedEvidence`.
 */
const warnings: Problem[] = [];

function warn(file: string, message: string): void {
  warnings.push({ file: relative(file), message });
}

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

type Record_ = Record<string, unknown>;

type Doc = { file: string; data: Record_ };

function loadYamlDocs(dir: string): Doc[] {
  const docs: Doc[] = [];
  for (const file of listFiles(dir, ['.yaml', '.yml'])) {
    try {
      const data = loadYaml<Record_>(file);
      if (data === null || typeof data !== 'object' || Array.isArray(data)) {
        fail(file, 'must be a YAML mapping');
        continue;
      }
      docs.push({ file, data });
    } catch (error) {
      fail(file, `unreadable YAML: ${(error as Error).message}`);
    }
  }
  return docs;
}

type StoryDoc = Doc & { slug: string; body: string };

function loadStories(): StoryDoc[] {
  const stories: StoryDoc[] = [];
  for (const file of listFiles(repoPath('src', 'content', 'stories'), ['.mdx'])) {
    try {
      const { data, body } = loadFrontmatter<Record_>(file);
      if (data === null || typeof data !== 'object') {
        fail(file, 'frontmatter must be a YAML mapping');
        continue;
      }
      stories.push({ file, data, body, slug: path.basename(file, '.mdx') });
    } catch (error) {
      fail(file, (error as Error).message);
    }
  }
  return stories;
}

// ---------------------------------------------------------------------------
// Small field helpers
// ---------------------------------------------------------------------------

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function checkEnum(file: string, field: string, value: unknown, allowed: readonly string[]): void {
  if (typeof value !== 'string' || !allowed.includes(value)) {
    fail(file, `${field}: "${String(value)}" is not one of ${allowed.join(', ')}`);
  }
}

function checkIsoDate(file: string, field: string, value: unknown): string | undefined {
  const normalised = asDateString(value);
  if (!isIsoDate(normalised)) {
    fail(file, `${field}: "${String(value)}" must be an ISO-8601 date (YYYY-MM-DD)`);
    return undefined;
  }
  return normalised;
}

function checkTopics(file: string, field: string, value: unknown): string[] {
  const topics = stringArray(value);
  for (const topic of topics) {
    if (!(TOPIC_SLUGS as readonly string[]).includes(topic)) {
      fail(file, `${field}: "${topic}" is not in the topic vocabulary`);
    }
  }
  return topics;
}

// ---------------------------------------------------------------------------
// The checks
// ---------------------------------------------------------------------------

const topics = loadYamlDocs(repoPath('src', 'content', 'topics'));
const stories = loadStories();
const claims = loadYamlDocs(repoPath('src', 'content', 'claims'));
const commitments = loadYamlDocs(repoPath('src', 'content', 'commitments'));
const evidence = loadYamlDocs(repoPath('evidence', 'registry'));

/**
 * The slugs that actually have a hub page, read off the files rather than off
 * the vocabulary: a topic named by a question with no file behind it is a link
 * to a page the build never makes.
 */
const topicFileSlugs = new Set(
  topics.map(({ data }) => data.slug).filter((slug): slug is string => typeof slug === 'string'),
);

/** Topic vocabulary: one file per slug, no extras, no duplicates. */
function checkTopicFiles(): void {
  const defined = new Set<string>();
  for (const { file, data } of topics) {
    const slug = data.slug;
    if (typeof slug !== 'string' || !(TOPIC_SLUGS as readonly string[]).includes(slug)) {
      fail(file, `slug: "${String(slug)}" is not in the topic vocabulary`);
      continue;
    }
    if (defined.has(slug)) fail(file, `slug: "${slug}" is defined more than once`);
    defined.add(slug);
    if (path.basename(file).replace(/\.ya?ml$/, '') !== slug) {
      fail(file, `filename must match slug "${slug}"`);
    }
  }
  for (const slug of TOPIC_SLUGS) {
    if (!defined.has(slug)) {
      fail(repoPath('src', 'content', 'topics'), `no topic file defines "${slug}"`);
    }
  }
}

const evidenceIds = new Set(
  evidence.map(({ data }) => data.id).filter((id): id is string => typeof id === 'string'),
);
const storyBySlug = new Map(stories.map((story) => [story.slug, story]));
const claimIds = new Set(
  claims.map(({ data }) => data.id).filter((id): id is string => typeof id === 'string'),
);
const commitmentIds = new Set(
  commitments.map(({ data }) => data.id).filter((id): id is string => typeof id === 'string'),
);

let methodologyVersions = new Set<string>();
function checkMethodologyChangelog(): void {
  const file = repoPath('methodology', 'changelog.yaml');
  try {
    const entries = loadMethodologyChangelog();
    if (entries.length === 0) fail(file, 'must contain at least one entry');
    const seen = new Set<string>();
    for (const entry of entries) {
      const version = String(entry?.version ?? '');
      if (!/^\d+\.\d+$/.test(version)) fail(file, `version "${version}" must look like 1.0`);
      if (seen.has(version)) fail(file, `version "${version}" appears more than once`);
      seen.add(version);
      checkIsoDate(file, `entry ${version} date`, entry?.date);
      if (!entry?.note) fail(file, `entry ${version} needs a note`);
      if (typeof entry?.summary !== 'string' || entry.summary.trim() === '') {
        fail(file, `entry ${version} needs a reader-facing summary`);
      }
      if (
        !Array.isArray(entry?.highlights) ||
        entry.highlights.length === 0 ||
        entry.highlights.some((highlight) => typeof highlight !== 'string' || highlight.trim() === '')
      ) {
        fail(file, `entry ${version} needs a non-empty highlights list`);
      }
      if (!Array.isArray(entry?.links) || entry.links.length === 0) {
        fail(file, `entry ${version} needs at least one reader-facing link`);
      }
      for (const [index, link] of (entry.links ?? []).entries()) {
        if (
          typeof link !== 'object' ||
          link === null ||
          typeof link.label !== 'string' ||
          link.label.trim() === '' ||
          typeof link.href !== 'string' ||
          link.href.trim() === ''
        ) {
          fail(file, `entry ${version} link ${index + 1} needs a label and href`);
        }
      }
    }
    methodologyVersions = seen;
  } catch (error) {
    fail(file, (error as Error).message);
  }
}

function checkStories(): void {
  const seenSlugs = new Set<string>();
  for (const story of stories) {
    const { file, data, body, slug } = story;
    if (seenSlugs.has(slug)) fail(file, `duplicate story slug "${slug}"`);
    seenSlugs.add(slug);

    // Mandatory sections (spec §8).
    if (typeof data.title !== 'string' || data.title.trim() === '') {
      fail(file, 'title is required and must be non-empty');
    }

    // The standfirst's punctuation rule lives in the schema
    // (src/content.config.ts). Whether it may be dropped altogether cannot: a
    // question may lean on its claim's answer for that sentence only when it
    // has exactly one claim, and the schema cannot see the claim files
    // (docs/DESIGN.md §12).
    if (data.one_line === undefined && stringArray(data.claims).length !== 1) {
      fail(
        file,
        'one_line is required unless the question has exactly one claim, whose answer stands in for it',
      );
    }

    if (body.trim() === '') fail(file, 'story body is empty');

    checkEnum(file, 'status', data.status, STORY_STATUSES);
    const status = data.status;

    const storyTopics = checkTopics(file, 'topics', data.topics);
    if (storyTopics.length === 0) fail(file, 'topics: at least one topic is required');

    // Dates: ISO-8601 with as_of ≤ last_verified < review_by.
    const asOf = checkIsoDate(file, 'as_of', data.as_of);
    const lastVerified = checkIsoDate(file, 'last_verified', data.last_verified);
    const reviewBy = checkIsoDate(file, 'review_by', data.review_by);
    if (asOf && lastVerified && asOf > lastVerified) {
      fail(file, `as_of (${asOf}) must be on or before last_verified (${lastVerified})`);
    }
    if (lastVerified && reviewBy && lastVerified >= reviewBy) {
      fail(file, `last_verified (${lastVerified}) must be before review_by (${reviewBy})`);
    }

    // Referenced IDs resolve.
    const listedClaims = stringArray(data.claims);
    for (const id of listedClaims) {
      if (!claimIds.has(id)) fail(file, `claims: "${id}" has no claim file`);
    }
    for (const id of stringArray(data.commitments)) {
      if (!commitmentIds.has(id)) fail(file, `commitments: "${id}" has no commitment file`);
    }
    if (typeof data.primary_claim === 'string' && !listedClaims.includes(data.primary_claim)) {
      fail(file, `primary_claim: "${data.primary_claim}" is not in this story's claims`);
    }

    // Changelog.
    const changelog = Array.isArray(data.changelog) ? (data.changelog as Record_[]) : [];
    for (const [index, entry] of changelog.entries()) {
      checkIsoDate(file, `changelog[${index}].date`, entry?.date);
      checkEnum(file, `changelog[${index}].type`, entry?.type, CHANGELOG_TYPES);
      if (typeof entry?.note !== 'string' || entry.note.trim() === '') {
        fail(file, `changelog[${index}].note is required`);
      }
    }

    if (status === 'published') {
      if (!changelog.some((entry) => entry?.type === 'published')) {
        fail(file, 'a published story needs a changelog entry of type "published"');
      }
      if (listedClaims.length === 0) {
        fail(file, 'a published story must check at least one claim');
      }
      // The story page's disclosure layers (spec §6) are mandatory once
      // public. The short-answer layer was retired 2026-09-01 (it duplicated
      // the TL;DR): the layers are one_line → tldr → body.
      if (stringArray(data.tldr).length === 0) {
        fail(file, 'a published story needs at least one tldr bullet');
      }
    }
  }
}

function checkClaims(): void {
  const seenIds = new Set<string>();
  for (const { file, data } of claims) {
    const id = data.id;
    if (typeof id !== 'string' || id.trim() === '') {
      fail(file, 'id is required');
      continue;
    }
    if (seenIds.has(id)) fail(file, `duplicate claim id "${id}"`);
    seenIds.add(id);
    if (path.basename(file).replace(/\.ya?ml$/, '') !== id) {
      fail(file, `filename must match claim id "${id}"`);
    }

    for (const field of ['question', 'evidence_basis'] as const) {
      if (typeof data[field] !== 'string' || data[field].trim() === '') {
        fail(file, `${field} is required and must be non-empty`);
      }
    }
    checkEnum(file, 'finding', data.finding, CANONICAL_FINDINGS);
    checkEnum(file, 'panel_agreement', data.panel_agreement, PANEL_AGREEMENT_LEVELS);

    // Methodology version must be one the changelog actually records.
    const version = String(data.methodology_version ?? '');
    if (!methodologyVersions.has(version)) {
      fail(file, `methodology_version: "${version}" is not in methodology/changelog.yaml`);
    }

    // Parent story exists AND lists this claim back.
    const parentSlug = typeof data.story === 'string' ? data.story : '';
    const parent = storyBySlug.get(parentSlug);
    if (!parent) {
      fail(file, `story: "${parentSlug}" has no story file`);
    } else if (!stringArray(parent.data.claims).includes(id)) {
      fail(file, `story "${parentSlug}" does not list this claim in its claims array`);
    }

    // Claim topics are a subset of the story's.
    if (data.topics !== undefined) {
      const claimTopics = checkTopics(file, 'topics', data.topics);
      const parentTopics = parent ? stringArray(parent.data.topics) : [];
      if (parent) {
        for (const topic of claimTopics) {
          if (!parentTopics.includes(topic)) {
            fail(file, `topics: "${topic}" is not among story "${parentSlug}" topics`);
          }
        }
      }
    }

    // Evidence references resolve, including every key_fact source.
    for (const evidenceId of stringArray(data.evidence)) {
      if (!evidenceIds.has(evidenceId)) fail(file, `evidence: "${evidenceId}" is not in the registry`);
    }
    const keyFacts = Array.isArray(data.key_facts) ? (data.key_facts as Record_[]) : [];
    for (const [index, fact] of keyFacts.entries()) {
      if (typeof fact?.text !== 'string' || fact.text.trim() === '') {
        fail(file, `key_facts[${index}].text is required`);
      }
      const sources = Array.isArray(fact?.sources) ? (fact.sources as unknown[]) : [];
      if (sources.length === 0) {
        fail(file, `key_facts[${index}] has no source evidence IDs`);
      }
      for (const source of sources) {
        if (typeof source !== 'string' || !evidenceIds.has(source)) {
          fail(file, `key_facts[${index}].sources: "${String(source)}" is not in the registry`);
        }
      }
    }
    for (const [index, comparison] of (
      Array.isArray(data.comparisons) ? (data.comparisons as Record_[]) : []
    ).entries()) {
      const source = comparison?.source;
      if (typeof source === 'string' && !evidenceIds.has(source)) {
        fail(file, `comparisons[${index}].source: "${source}" is not in the registry`);
      }
    }

    // Review-run audit trail — required only once the story is published.
    const reviewRun = typeof data.review_run === 'string' ? data.review_run : '';
    if (reviewRun === '') {
      fail(file, 'review_run is required');
    } else if (parent?.data.status === 'published') {
      checkPublishedReviewRun(file, reviewRun);
    }

    /*
     * The plain-speech read that passed this claim's answer (docs/DESIGN.md
     * §12). Named on every claim, and the file has to be there before the claim
     * publishes: a stage whose artifact nobody checks for is a habit, and a
     * habit is what the standard was written to replace.
     *
     * The existence check is gated on `published` for the same reason the
     * review-run check above is. Before the stage-7 gate a run lives locally
     * and `reviews/` is not committed, so demanding the file of a
     * `pending-review` claim would fail CI on exactly the state the workflow is
     * designed to have.
     */
    const plainSpeechRead =
      typeof data.plain_speech_read === 'string' ? data.plain_speech_read : '';
    if (plainSpeechRead === '') {
      fail(file, 'plain_speech_read is required: name the read that passed this answer');
    } else if (parent?.data.status === 'published') {
      const report = repoPath(plainSpeechRead);
      if (!existsSync(report) || !statSync(report).isFile()) {
        fail(
          file,
          `plain_speech_read: "${plainSpeechRead}" is not a file (required for published claims)`,
        );
      } else if (reviewRun !== '' && !plainSpeechRead.startsWith(`${reviewRun}/`)) {
        fail(
          file,
          `plain_speech_read: "${plainSpeechRead}" belongs under this claim's review run "${reviewRun}"`,
        );
      }
    }
  }
}

/** A published claim's run directory must exist and carry its manifest (spec §8). */
function checkPublishedReviewRun(claimFile: string, reviewRun: string): void {
  const runDir = repoPath(reviewRun);
  if (!existsSync(runDir)) {
    fail(claimFile, `review_run: "${reviewRun}" does not exist (required for published claims)`);
    return;
  }
  const manifest = path.join(runDir, 'run.yaml');
  if (!existsSync(manifest)) {
    fail(claimFile, `review_run: "${reviewRun}" has no run.yaml manifest`);
    return;
  }
  try {
    const data = loadRunManifest(manifest);
    for (const field of ['story', 'methodology_version'] as const) {
      if (!data?.[field]) fail(manifest, `${field} is required`);
    }
    if (!Array.isArray(data?.runs) || data.runs.length === 0) {
      fail(manifest, 'runs must list at least one reviewer invocation');
      return;
    }
    for (const [index, run] of data.runs.entries()) {
      for (const field of [
        'provider',
        'command',
        'cli_version',
        'model_id',
        'prompt_sha256',
        'methodology_version',
        'started_at',
        'finished_at',
      ] as const) {
        if (!run?.[field]) fail(manifest, `runs[${index}].${field} is required`);
      }
    }
  } catch (error) {
    fail(manifest, `unreadable manifest: ${(error as Error).message}`);
  }
}

/**
 * The reader-facing sentences, read for method vocabulary (docs/DESIGN.md §12).
 * The list and the reason it only ever warns are in `src/lib/plain-speech.ts`,
 * which the content schema reads from too.
 */
function checkPlainSpeech(): void {
  const sentences: Array<{ file: string; field: string; text: string }> = [];
  for (const { file, data } of claims) {
    if (typeof data.answer === 'string') {
      sentences.push({ file, field: 'answer', text: data.answer });
    }
  }
  for (const { file, data } of stories) {
    if (typeof data.one_line === 'string') {
      sentences.push({ file, field: 'one_line', text: data.one_line });
    }
  }

  for (const { file, field, text } of sentences) {
    for (const term of methodVocabularyIn(text)) {
      warn(file, `${field} uses method vocabulary "${term}". Say it in the words a reader uses.`);
    }
  }
}

function checkCommitments(): void {
  const seenIds = new Set<string>();
  for (const { file, data } of commitments) {
    const id = data.id;
    if (typeof id !== 'string' || id.trim() === '') {
      fail(file, 'id is required');
      continue;
    }
    if (seenIds.has(id)) fail(file, `duplicate commitment id "${id}"`);
    seenIds.add(id);

    for (const field of ['statement', 'promised_by', 'measurable'] as const) {
      if (typeof data[field] !== 'string' || data[field].trim() === '') {
        fail(file, `${field} is required and must be non-empty`);
      }
    }
    checkEnum(file, 'status', data.status, COMMITMENT_STATUSES);
    checkIsoDate(file, 'promised_on', data.promised_on);
    if (data.assessable_on !== undefined) checkIsoDate(file, 'assessable_on', data.assessable_on);

    const source = data.source;
    if (typeof source !== 'string' || !evidenceIds.has(source)) {
      fail(file, `source: "${String(source)}" is not in the evidence registry`);
    }

    const parentSlug = typeof data.story === 'string' ? data.story : undefined;
    if (parentSlug !== undefined && !storyBySlug.has(parentSlug)) {
      fail(file, `story: "${parentSlug}" has no story file`);
    }
    if (data.topics !== undefined) {
      const commitmentTopics = checkTopics(file, 'topics', data.topics);
      const parent = parentSlug ? storyBySlug.get(parentSlug) : undefined;
      if (parent) {
        for (const topic of commitmentTopics) {
          if (!stringArray(parent.data.topics).includes(topic)) {
            fail(file, `topics: "${topic}" is not among story "${parentSlug}" topics`);
          }
        }
      }
    }

    if (data.status === 'Assessed') {
      const assessed = data.assessed_claim;
      if (typeof assessed !== 'string' || assessed.trim() === '') {
        fail(file, 'an Assessed commitment must link the claim that assessed it');
      } else if (!claimIds.has(assessed)) {
        fail(file, `assessed_claim: "${assessed}" has no claim file`);
      }
    }
  }
}

/** Keys that would duplicate the build-generated "Used by" list (spec §3). */
const BACK_REFERENCE_KEYS = ['used_by', 'used_in', 'claims', 'stories', 'commitments'];

function checkEvidence(): void {
  const seenIds = new Set<string>();
  for (const { file, data } of evidence) {
    const id = data.id;
    if (typeof id !== 'string' || !/^YF-EV-\d{4}$/.test(id)) {
      fail(file, `id: "${String(id)}" must look like YF-EV-0001`);
      continue;
    }
    if (seenIds.has(id)) fail(file, `duplicate evidence id "${id}"`);
    seenIds.add(id);
    if (path.basename(file).replace(/\.ya?ml$/, '') !== id) {
      fail(file, `filename must match evidence id "${id}"`);
    }

    for (const field of ['title', 'publisher', 'url', 'kind', 'establishes'] as const) {
      if (typeof data[field] !== 'string' || data[field].trim() === '') {
        fail(file, `${field} is required and must be non-empty`);
      }
    }
    checkIsoDate(file, 'retrieved_on', data.retrieved_on);
    if (data.published_on !== undefined) checkIsoDate(file, 'published_on', data.published_on);

    for (const key of BACK_REFERENCE_KEYS) {
      if (key in data) {
        fail(file, `${key}: evidence records store no back-references; "Used by" is build-generated`);
      }
    }

    const archive = (data.archive ?? {}) as Record_;
    const rights = (data.rights ?? {}) as Record_;
    checkEnum(file, 'archive.visibility', archive.visibility, ['public', 'private']);
    checkEnum(file, 'rights.redistribution', rights.redistribution, [
      'allowed',
      'restricted',
      'unclear',
    ]);
    const digest = archive.sha256;
    if (typeof digest !== 'string' || !/^[0-9a-f]{64}$/.test(digest)) {
      fail(file, 'archive.sha256 must be a lowercase 64-character hex digest');
    }
    if (archive.required !== true) {
      fail(file, 'archive.required must be true — every load-bearing source keeps its bytes');
    }

    // Unclear rights fail closed to private (spec §3).
    if (rights.redistribution !== 'allowed' && archive.visibility === 'public') {
      fail(
        file,
        `rights.redistribution "${String(rights.redistribution)}" cannot be mirrored publicly; ` +
          'archive.visibility must be private',
      );
    }

    const archivePath = archive.path;
    if (typeof archivePath !== 'string' || archivePath.trim() === '') {
      fail(file, 'archive.path is required');
      continue;
    }

    if (archive.visibility === 'public') {
      if (!archivePath.startsWith('evidence/files/')) {
        fail(file, `archive.path "${archivePath}" must be under evidence/files/`);
        continue;
      }
      const absolute = repoPath(archivePath);
      if (!existsSync(absolute)) {
        fail(file, `archive.path "${archivePath}" does not exist`);
      } else if (typeof digest === 'string' && sha256File(absolute) !== digest) {
        fail(
          file,
          `archive.sha256 does not match the bytes of ${archivePath} ` +
            `(file hashes ${sha256File(absolute)})`,
        );
      }
    } else if (!archivePath.startsWith('evidence/private/')) {
      // Private bytes are gitignored, so only the shape is checked here;
      // `scripts/verify-private.ts` is the founder-run byte check.
      fail(file, `archive.path "${archivePath}" must be under evidence/private/`);
    }
  }
}

const FETCH_STATUSES = ['ok', 'failed', 'content-mismatch', 'not-attempted'];

/**
 * A published story's combined evidence must be annotated (methodology v1.2).
 *
 * Hard rule: every item in `combined-evidence.json` carries a `fetch_status`
 * drawn from the known set. A missing field is a failure, because an
 * unannotated artifact is precisely the state v1.2 exists to end — a citation
 * nobody can tell apart from a verified one. Run
 * `npx tsx scripts/annotate-evidence.ts <run-dir>` to produce it.
 *
 * Warn only: an item whose bytes could not be verified (`failed` or
 * `content-mismatch`) that a published `key_fact` nonetheless cites. That check
 * is an approximation — key_facts cite registry IDs, so an item that never made
 * it into the registry cannot be matched to one — so it prints for the gate
 * audit to judge rather than blocking the build on a guess.
 */
function checkCombinedEvidence(): void {
  /** Published run directory → the registry IDs its key_facts cite. */
  const citedByRun = new Map<string, Set<string>>();
  for (const { data } of claims) {
    if (storyBySlug.get(String(data.story ?? ''))?.data.status !== 'published') continue;
    const reviewRun = typeof data.review_run === 'string' ? data.review_run : '';
    if (reviewRun === '') continue;
    const cited = citedByRun.get(reviewRun) ?? new Set<string>();
    for (const fact of Array.isArray(data.key_facts) ? (data.key_facts as Record_[]) : []) {
      for (const source of stringArray(fact?.sources)) cited.add(source);
    }
    citedByRun.set(reviewRun, cited);
  }

  for (const [reviewRun, cited] of citedByRun) {
    const file = repoPath(reviewRun, 'combined-evidence.json');
    if (!existsSync(file)) {
      fail(repoPath(reviewRun), 'combined-evidence.json is required for a published run');
      continue;
    }
    let items: Record_[];
    try {
      const parsed = JSON.parse(readFileSync(file, 'utf8')) as { items?: unknown };
      items = Array.isArray(parsed.items) ? (parsed.items as Record_[]) : [];
    } catch (error) {
      fail(file, `unreadable JSON: ${(error as Error).message}`);
      continue;
    }

    for (const [index, item] of items.entries()) {
      const status = item?.fetch_status;
      if (typeof status !== 'string' || !FETCH_STATUSES.includes(status)) {
        fail(
          file,
          `items[${index}].fetch_status: "${String(status)}" must be one of ` +
            `${FETCH_STATUSES.join(', ')} — run scripts/annotate-evidence.ts`,
        );
        continue;
      }
      if (status === 'ok' || status === 'not-attempted') continue;
      const id = typeof item.evidence_id === 'string' ? item.evidence_id : 'unregistered';
      if (cited.has(id)) {
        warn(
          file,
          `items[${index}] (${id}) is fetch_status "${status}" but a published key_fact cites it: ` +
            String(item.normalized_url ?? ''),
        );
      }
    }
  }
}

/**
 * Any committed panel output must conform to the published schema (spec §8).
 * Runs over whatever is present; before the stage-7 gate that is normally
 * nothing, because `reviews/` is not committed until the founder release-check.
 */
function checkReviewRuns(): void {
  const reviewsRoot = repoPath('reviews');
  for (const storyDir of listDirectories(reviewsRoot)) {
    for (const runDir of listDirectories(storyDir)) {
      for (const roundDir of listDirectories(runDir)) {
        if (!/^round\d+$/.test(path.basename(roundDir))) continue;
        for (const file of listFiles(roundDir, ['.json'])) {
          const result = validateReviewFile(file);
          if (!result.ok) {
            for (const error of result.errors) {
              fail(file, `review-schema.json: ${error}`);
            }
          }
        }
      }
    }
  }
}

/** The register, or `null` when it is absent or unreadable. */
function loadRegister(file: string): Register | null {
  if (!existsSync(file)) return null;
  try {
    const data = loadYaml<Register>(file);
    if (!Array.isArray(data?.claims)) {
      fail(file, 'must contain a `claims` list');
      return null;
    }
    return data;
  } catch (error) {
    fail(file, `unreadable YAML: ${(error as Error).message}`);
    return null;
  }
}

/**
 * What `registerProblems` needs from outside the register file: the filesystem,
 * and the capture each source was read from — the comments a wording has to be
 * a substring of, and the commenter labels an `author_name` has to be one of.
 */
const registerWorld: RegisterWorld = {
  exists: (value) => existsSync(repoPath(value)),
  isDirectory: (value) => {
    const absolute = repoPath(value);
    return existsSync(absolute) && statSync(absolute).isDirectory();
  },
  capture: (directory) => {
    const file = repoPath(directory, 'comments.jsonl');
    if (!existsSync(file)) return undefined;
    try {
      return readCapture(readFileSync(file, 'utf8'));
    } catch {
      return undefined;
    }
  },
};

/**
 * A `withdrawn` story and the register question it was withdrawn from have to
 * point at each other (methodology v1.13).
 *
 * The story leaves the findings boards and the register becomes the only place
 * its claims are listed, so a half-made pair is a claim that has quietly
 * vanished: withdrawn with nowhere saying so, or a register question promising
 * a story that still counts itself a finding.
 */
function checkWithdrawals(file: string, questions: Record_[]): void {
  const byId = new Map(
    questions
      .filter((question) => typeof question?.id === 'string')
      .map((question) => [question.id as string, question]),
  );

  for (const question of questions) {
    if (question?.publication !== 'withdrawn') continue;
    const where = typeof question.id === 'string' ? question.id : 'question';
    const slug = question.story;
    if (typeof slug !== 'string' || slug.trim() === '') {
      fail(file, `${where}: publication withdrawn must name the story it withdrew`);
      continue;
    }
    const story = storyBySlug.get(slug);
    if (!story) {
      fail(file, `${where}: story "${slug}" does not exist`);
      continue;
    }
    const withdrawn = story.data.withdrawn as Record_ | undefined;
    if (withdrawn?.register !== question.id) {
      fail(
        file,
        `${where}: story "${slug}" must carry withdrawn.register: ${String(question.id)}`,
      );
    }
  }

  for (const story of stories) {
    const withdrawn = story.data.withdrawn as Record_ | undefined;
    if (withdrawn === undefined) continue;
    const register = withdrawn.register;
    const entry = typeof register === 'string' ? byId.get(register) : undefined;
    if (!entry) {
      fail(story.file, `withdrawn.register "${String(register)}" is not a register question`);
    } else if (entry.publication !== 'withdrawn' || entry.story !== story.slug) {
      fail(
        story.file,
        `withdrawn.register "${String(register)}" must be a withdrawn question naming this story`,
      );
    }
  }
}

/**
 * The register, which the site publishes verbatim.
 *
 * The rules themselves are in `lib/register-checks.ts`, as a pure function over
 * the parsed file, so they can be tested against fixtures; this reads the file,
 * hands over a view of the world, and reports what comes back. The withdrawal
 * pairing stays here because it needs the stories, which that module does not.
 */
function checkRegister(): void {
  const file = repoPath('intake', 'register.yaml');
  const register = loadRegister(file);
  if (register === null) {
    // A withdrawn story with no register at all still has to be caught.
    checkWithdrawals(file, []);
    return;
  }

  for (const problem of registerProblems(register, registerWorld)) fail(file, problem);

  checkWithdrawals(file, (register.questions ?? []) as Record_[]);
  const questions = (register.questions ?? []) as Record_[];
  checkRegisterClaims((register.claims ?? []) as Record_[], questions);
  checkQuestionTopics(questions);
  checkStoryQuestions(questions);
  checkRedirects(register);
}

/**
 * `redirects.yaml`, the source of truth for every published address that moved.
 *
 * A redirect file nobody checks is where a published address quietly stops
 * resolving, so the targets are checked against the register the same way the
 * register's own cross-references are. The rules are in
 * `lib/redirect-checks.ts`, as a pure function; this reads the file and hands
 * over the ids.
 */
function checkRedirects(register: Register): void {
  const file = repoPath('redirects.yaml');
  if (!existsSync(file)) {
    fail(file, 'is missing — it is the source of truth for every address that moved');
    return;
  }
  const ids = (key: 'questions' | 'claims') =>
    new Set(
      (Array.isArray(register[key]) ? (register[key] as Record_[]) : [])
        .map((row) => row.id)
        .filter((id): id is string => typeof id === 'string'),
    );

  let rows: RedirectRow[];
  try {
    const parsed = loadYaml<{ redirects?: unknown }>(file).redirects;
    if (!Array.isArray(parsed)) {
      fail(file, 'must contain a `redirects` list');
      return;
    }
    rows = parsed.map((row) => {
      const entry = (typeof row === 'object' && row !== null ? row : {}) as Record_;
      return {
        from: String(entry.from ?? '').trim(),
        to: String(entry.to ?? '').trim(),
        why: String(entry.why ?? '').trim(),
        pending: entry.pending === true ? true : undefined,
      };
    });
  } catch (error) {
    fail(file, `unreadable YAML: ${(error as Error).message}`);
    return;
  }

  const questionIds = ids('questions');
  const claimIds = ids('claims');
  for (const problem of redirectProblems(rows, { questionIds, claimIds })) {
    fail(file, problem);
  }

  checkRedirectFile(rows, questionIds, claimIds);
}

/**
 * `public/_redirects`, which Cloudflare serves before static files.
 *
 * It is generated from `redirects.yaml` and the register (`npm run redirects`)
 * and committed, so the routing table can be read in a diff. Generated files
 * that nothing checks go stale silently, and a stale one here is a published
 * address that has quietly stopped resolving — so the bytes are regenerated in
 * memory and compared.
 */
function checkRedirectFile(
  rows: RedirectRow[],
  questionIds: ReadonlySet<string>,
  claimIds: ReadonlySet<string>,
): void {
  const file = repoPath('public', '_redirects');
  const expected = redirectFileText(allRedirects(rows, [...questionIds], [...claimIds]));
  if (!existsSync(file)) {
    fail(file, 'is missing — run `npm run redirects`');
    return;
  }
  if (readFileSync(file, 'utf8') !== expected) {
    fail(file, 'is out of date with redirects.yaml and the register — run `npm run redirects`');
  }
}

/**
 * A published claim's `register_claims` name register claims that exist, and no
 * register id collides with a published claim's.
 *
 * The first is what puts a commenter's own words on the page that answers them
 * ("Also said as"), so a dangling id is captured wordings silently missing from
 * a published page rather than a visible error. The second is the URL
 * namespace: `/questions/<id>` and `/claims/<id>` are served from question ids,
 * register claim ids and published claim ids alike, and two of them sharing one
 * is two pages fighting over an address.
 */
function checkRegisterClaims(registered: Record_[], questions: Record_[]): void {
  const file = repoPath('intake', 'register.yaml');
  const ids = new Set(
    registered.map((claim) => claim.id).filter((id): id is string => typeof id === 'string'),
  );
  const published = new Set(
    claims.map(({ data }) => data.id).filter((id): id is string => typeof id === 'string'),
  );

  for (const { file: claimFile, data } of claims) {
    for (const id of stringArray(data.register_claims)) {
      if (!ids.has(id)) fail(claimFile, `register_claims: "${id}" is not a claim in the register`);
    }
  }

  for (const row of [...questions, ...registered]) {
    const id = typeof row.id === 'string' ? row.id : '';
    // A question taking its story's slug is the point of D-0029, and a story
    // slug is never a claim id, so this only fires on a real collision.
    if (id !== '' && published.has(id) && row.story !== id) {
      fail(file, `id "${id}" is also a published claim, and they share a URL namespace`);
    }
  }
}

/**
 * Every published story is a question in the register, under its own slug.
 *
 * The six published stories became questions keeping their slugs (D-0029), so
 * `/facts/<slug>` is a rename to `/questions/<slug>` rather than a move, and a
 * published claim reaches its question through the `story` it already names. A
 * story with no question is a published finding with no registered question
 * behind it, which is the state the register exists to make impossible.
 *
 * A published question may hold claims with no finding, and that is not
 * checked, because it is not a defect: it means the site answered a question
 * and people have gone on making claims about it that have not been checked
 * yet. A claim either has a finding or it does not.
 */
function checkStoryQuestions(questions: Record_[]): void {
  const byId = new Map(
    questions
      .filter((question) => typeof question.id === 'string')
      .map((question) => [question.id as string, question]),
  );
  const file = repoPath('intake', 'register.yaml');
  for (const story of stories) {
    const question = byId.get(story.slug);
    if (question === undefined) {
      fail(file, `story "${story.slug}" has no question; a published story is a question`);
      continue;
    }
    if (question.story !== story.slug) {
      fail(file, `question ${story.slug}: must name the story it carries (story: ${story.slug})`);
    }
    // The register is where a question is filed under its topics, and the
    // article repeats them for its own tags and for the claim-level subset
    // rule. Two files stating one fact drift, and a drifted pair would put a
    // question on a hub whose article denies it belongs there, so they have to
    // be the same set. Order is display, and is not compared.
    const registered = stringArray(question.topics);
    const written = stringArray(story.data.topics);
    const missing = registered.filter((topic) => !written.includes(topic));
    const extra = written.filter((topic) => !registered.includes(topic));
    for (const topic of missing) {
      fail(story.file, `topics: "${topic}" is on register question ${story.slug} but not here`);
    }
    for (const topic of extra) {
      fail(file, `question ${story.slug}: topics must include "${topic}", which the story carries`);
    }
  }
}

/**
 * Every topic a question is filed under has a hub page to land on.
 *
 * The register files all forty-four questions, not just the written-up ones,
 * so a typo here is a topic filter that silently drops a question or a link to
 * a page that does not exist. A question no topic honestly covers carries the
 * field not at all; an empty list is the shape that means "we forgot".
 */
function checkQuestionTopics(questions: Record_[]): void {
  const file = repoPath('intake', 'register.yaml');
  for (const question of questions) {
    const where = typeof question.id === 'string' ? `question ${question.id}` : 'question';
    if (question.topics === undefined) continue;
    if (!Array.isArray(question.topics)) {
      fail(file, `${where}: topics must be a list of topic slugs`);
      continue;
    }
    if (question.topics.length === 0) {
      fail(file, `${where}: topics is empty; leave the field off where no topic applies`);
    }
    const seen = new Set<string>();
    for (const topic of question.topics) {
      if (typeof topic !== 'string' || topic.trim() === '') {
        fail(file, `${where}: topics has an entry that is not a topic slug`);
        continue;
      }
      if (seen.has(topic)) fail(file, `${where}: topic "${topic}" is listed twice`);
      seen.add(topic);
      if (!topicFileSlugs.has(topic)) {
        fail(file, `${where}: topic "${topic}" has no file in src/content/topics/`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// TODO — the two spec §8 rules that need a diff, not a snapshot
//
// Both compare a PR against its base commit, so they belong in CI where the
// base ref is available (`git diff --name-only origin/main...HEAD`), not in a
// script that only ever sees the working tree:
//
//   1. A change to any claim's `finding` or `panel_agreement` requires a matching
//      entry in the parent story's changelog.
//   2. A change under `prompts/`, `scripts/merge*`, `scripts/synthesize*` or
//      `methodology/` requires a new entry in `methodology/changelog.yaml`.
//
// The snapshot half of rule 1 — a `published` story carrying a `published`
// changelog entry — is enforced above in `checkStories`.
// ---------------------------------------------------------------------------

checkMethodologyChangelog();
checkTopicFiles();
checkStories();
checkClaims();
checkPlainSpeech();
checkCommitments();
checkEvidence();
checkReviewRuns();
checkCombinedEvidence();
checkRegister();

if (warnings.length > 0) {
  for (const warning of warnings) {
    console.warn(`warn: ${warning.file}: ${warning.message}`);
  }
}

if (problems.length > 0) {
  const byFile = new Map<string, string[]>();
  for (const problem of problems) {
    byFile.set(problem.file, [...(byFile.get(problem.file) ?? []), problem.message]);
  }
  for (const [file, messages] of [...byFile.entries()].sort()) {
    console.error(`\n${file}`);
    for (const message of messages) console.error(`  ✗ ${message}`);
  }
  console.error(
    `\nvalidate: ${problems.length} problem${problems.length === 1 ? '' : 's'} in ${byFile.size} file${
      byFile.size === 1 ? '' : 's'
    }`,
  );
  process.exit(1);
}

console.log(
  `validate: OK — ${stories.length} stories, ${claims.length} claims, ` +
    `${commitments.length} commitments, ${topics.length} topics, ${evidence.length} evidence entries`,
);
