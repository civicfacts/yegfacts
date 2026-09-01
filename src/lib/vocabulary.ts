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

export const CONFIDENCE_LEVELS = ['High', 'Moderate', 'Low'] as const;

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

export type TopicSlug = (typeof TOPIC_SLUGS)[number];
export type ReviewerVerdict = (typeof REVIEWER_VERDICTS)[number];
export type CanonicalFinding = (typeof CANONICAL_FINDINGS)[number];
export type Confidence = (typeof CONFIDENCE_LEVELS)[number];
export type StoryStatus = (typeof STORY_STATUSES)[number];
export type CommitmentStatus = (typeof COMMITMENT_STATUSES)[number];
