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
 *   against its base — a changed `finding`/`confidence` needing a story entry,
 *   a touched `prompts/`/`scripts/merge*`/`scripts/synthesize*`/`methodology/`
 *   path needing a methodology entry — are not implemented here; see the TODO
 *   at the bottom of this file.
 *
 * Exit code is 1 if any rule failed, 0 otherwise.
 */
import { existsSync } from 'node:fs';
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
  CANONICAL_FINDINGS,
  CHANGELOG_TYPES,
  COMMITMENT_STATUSES,
  CONFIDENCE_LEVELS,
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
    for (const field of ['title', 'one_line'] as const) {
      if (typeof data[field] !== 'string' || data[field].trim() === '') {
        fail(file, `${field} is required and must be non-empty`);
      }
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
      // The story page's disclosure layers (spec §6) are mandatory once public.
      if (typeof data.short_answer !== 'string' || data.short_answer.trim() === '') {
        fail(file, 'a published story needs a short_answer');
      }
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
    checkEnum(file, 'confidence', data.confidence, CONFIDENCE_LEVELS);

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
      const source = fact?.source;
      if (typeof source !== 'string' || source.trim() === '') {
        fail(file, `key_facts[${index}] has no source evidence ID`);
      } else if (!evidenceIds.has(source)) {
        fail(file, `key_facts[${index}].source: "${source}" is not in the registry`);
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

// ---------------------------------------------------------------------------
// TODO — the two spec §8 rules that need a diff, not a snapshot
//
// Both compare a PR against its base commit, so they belong in CI where the
// base ref is available (`git diff --name-only origin/main...HEAD`), not in a
// script that only ever sees the working tree:
//
//   1. A change to any claim's `finding` or `confidence` requires a matching
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
checkCommitments();
checkEvidence();
checkReviewRuns();

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
