/**
 * Controlled vocabularies (design spec §3).
 *
 * These live outside `src/content.config.ts` for one reason: the config file
 * imports `astro:content`, a virtual module that only exists inside an Astro
 * build, so the plain-Node scripts under `scripts/` cannot import it. Both the
 * content schemas and the pipeline scripts read the vocabularies from here, so
 * there is exactly one definition of each. `src/content.config.ts` re-exports
 * them, which keeps every existing `from '../content.config'` import working.
 */

export const TOPIC_SLUGS = [
  'transportation',
  'housing-development',
  'city-finances',
  'growth-planning',
  'climate-environment',
  'downtown',
] as const;

/** What a model may output. Reviewers never output Mixed (spec §3). */
export const REVIEWER_VERDICTS = [
  'Supported',
  'Partially supported',
  'Not established',
  'Contradicted',
] as const;

/** What synthesis may produce: the reviewer verdicts plus Mixed. */
export const CANONICAL_FINDINGS = [...REVIEWER_VERDICTS, 'Mixed'] as const;

/**
 * How firmly one reviewer holds its own verdict. This is a per-reviewer
 * dimension only: it is reported inside the AI review beside the model that
 * gave it, and it is never aggregated into a site-level number.
 */
export const CONFIDENCE_LEVELS = ['High', 'Moderate', 'Low'] as const;

/**
 * Panel agreement (methodology v1.3) — the canonical per-claim dimension that
 * replaced a canonical "confidence".
 *
 * Confidence was the wrong word for what the site could actually compute.
 * Nothing here measures the probability that a claim is true; what the panel
 * produces is a distribution of three independent verdicts, and the honest
 * summary of that distribution is how far apart the three reviewers landed.
 * Computed from the locked round-1 multiset:
 *
 * - `Unanimous` — one distinct verdict.
 * - `Adjacent`  — two distinct verdicts, one step apart on the support axis
 *                 (S–P–N, and N–C, which both refuse the claim).
 * - `Split`     — everything else: verdicts two or more apart, or three
 *                 distinct readings.
 */
export const PANEL_AGREEMENT_LEVELS = ['Unanimous', 'Adjacent', 'Split'] as const;

export const STORY_STATUSES = ['draft', 'pending-review', 'published'] as const;

export const CHANGELOG_TYPES = [
  'published',
  'updated',
  'correction',
  'verdict-change',
  'verified',
] as const;

export const COMMITMENT_STATUSES = [
  'Recorded',
  'Not yet assessable',
  'Assessable',
  'Assessed',
] as const;

/** What a journal post is: a mistake owned, a method change, work built, a check run, numbers read, or a passing note. */
export const JOURNAL_TYPES = [
  'mistake',
  'method',
  'building',
  'checking',
  'numbers',
  'aside',
] as const;

export type TopicSlug = (typeof TOPIC_SLUGS)[number];
export type ReviewerVerdict = (typeof REVIEWER_VERDICTS)[number];
export type CanonicalFinding = (typeof CANONICAL_FINDINGS)[number];
export type Confidence = (typeof CONFIDENCE_LEVELS)[number];
export type PanelAgreement = (typeof PANEL_AGREEMENT_LEVELS)[number];
export type StoryStatus = (typeof STORY_STATUSES)[number];
export type CommitmentStatus = (typeof COMMITMENT_STATUSES)[number];
export type JournalType = (typeof JOURNAL_TYPES)[number];
