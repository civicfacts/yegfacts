/**
 * The two spec §8 rules that need a diff, not a snapshot, as pure functions.
 *
 * `scripts/validate.ts` sees the working tree and nothing else, so it has never
 * been able to ask "did this change come with the entry it owes". Both rules
 * below compare a branch against its base, which is a thing CI knows and a
 * local script does not. They lived as a TODO in the validator, and the header
 * of `methodology/changelog.yaml` announced one of them as if it ran. It did
 * not, and a change under `methodology/` shipped clean the night this was
 * written.
 *
 *   1. A change to a claim's `finding` or `panel_agreement` requires a new entry
 *      in the parent story's changelog. The published answer changed; the page
 *      has to say so.
 *   2. A change under `prompts/`, `scripts/merge*`, `scripts/synthesize*` or
 *      `methodology/` requires a new entry in `methodology/changelog.yaml`. The
 *      method changed; the version has to move.
 *
 * Rule 2 has two exemptions and each is an argument about what a version number
 * means, not a convenience:
 *
 *   - `methodology/audits/` holds incident and audit records. They report on the
 *     method; they do not change it. Requiring a version bump for one would make
 *     the version mean "something happened" rather than "the method changed",
 *     and the first person to write an audit under a version freeze would
 *     quietly stop writing audits.
 *   - `methodology/changelog.yaml` itself is the record, not the method. Fixing
 *     a typo in a past entry is not a new version of the method, and demanding
 *     one would make every correction to the record inflate the number the
 *     record exists to explain.
 *
 * Everything the rules need from git arrives through `DiffWorld`, so they can be
 * tested against fixtures rather than against whatever the branch happens to be.
 */
import YAML from 'yaml';

/** A repo-relative path that changed between base and head. */
export interface ChangedPath {
  path: string;
  /** git's name-status letter. `D` is the only one that means "gone at head". */
  status: string;
}

export interface DiffWorld {
  /** Repo-relative paths that differ between the base commit and head. */
  changed: readonly ChangedPath[];
  /** A file's text at the base commit, or undefined when it did not exist there. */
  base(path: string): string | undefined;
  /** A file's text at head, or undefined when it is gone. */
  head(path: string): string | undefined;
}

export const METHODOLOGY_CHANGELOG = 'methodology/changelog.yaml';

/**
 * Does touching this path oblige the branch to bump the methodology version?
 *
 * `scripts/merge*` and `scripts/synthesize*` are the spec's wording and mean the
 * top-level scripts whose names start that way — `scripts/merge.ts`,
 * `scripts/merge-published-questions.ts`, `scripts/synthesize.ts`,
 * `scripts/synthesis-matrix.ts` is deliberately NOT one of them, because the
 * spec named `synthesize` and widening a rule by guessing is how a rule stops
 * meaning what it says.
 */
export function governsMethodologyVersion(file: string): boolean {
  if (file === METHODOLOGY_CHANGELOG) return false;
  if (file.startsWith('methodology/audits/')) return false;
  if (file.startsWith('methodology/')) return true;
  if (file.startsWith('prompts/')) return true;
  return /^scripts\/(merge|synthesize)[^/]*$/.test(file);
}

function versionsIn(text: string | undefined): Set<string> {
  if (text === undefined) return new Set();
  const parsed = YAML.parse(text) as unknown;
  if (!Array.isArray(parsed)) return new Set();
  return new Set(
    parsed
      .map((entry) => (entry as { version?: unknown })?.version)
      .filter((version) => version !== undefined && version !== null)
      .map((version) => String(version)),
  );
}

/**
 * A story's changelog entries at one revision, each as a stable string so two
 * revisions can be compared. Order is not identity: an entry inserted at the
 * top of the list is still a new entry, and re-wording an old one is not.
 */
function changelogEntriesIn(mdx: string | undefined): Set<string> {
  if (mdx === undefined) return new Set();
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(mdx.replace(/^﻿/, ''));
  if (!match) return new Set();
  let frontmatter: unknown;
  try {
    frontmatter = YAML.parse(match[1]!);
  } catch {
    return new Set();
  }
  const entries = (frontmatter as { changelog?: unknown })?.changelog;
  if (!Array.isArray(entries)) return new Set();
  return new Set(
    entries.map((entry) => {
      const row = entry as { date?: unknown; type?: unknown; note?: unknown };
      const date = row?.date instanceof Date ? row.date.toISOString().slice(0, 10) : String(row?.date ?? '');
      return JSON.stringify([date, String(row?.type ?? ''), String(row?.note ?? '')]);
    }),
  );
}

/** The fields whose change obliges the parent story to carry a changelog entry. */
const ANSWERED_FIELDS = ['finding', 'panel_agreement'] as const;

function claimFields(yaml: string | undefined): { story?: string; values: Record<string, string> } {
  if (yaml === undefined) return { values: {} };
  let parsed: unknown;
  try {
    parsed = YAML.parse(yaml);
  } catch {
    return { values: {} };
  }
  const row = (parsed ?? {}) as Record<string, unknown>;
  const values: Record<string, string> = {};
  for (const field of ANSWERED_FIELDS) values[field] = String(row[field] ?? '');
  return { story: typeof row.story === 'string' ? row.story : undefined, values };
}

/** Every way this branch owes an entry it did not write. One string per failure. */
export function diffRuleProblems(world: DiffWorld): string[] {
  const problems: string[] = [];

  // Rule 2 — the method changed, so the version moves.
  const governed = world.changed.map((row) => row.path).filter(governsMethodologyVersion).sort();
  if (governed.length > 0) {
    const before = versionsIn(world.base(METHODOLOGY_CHANGELOG));
    const added = [...versionsIn(world.head(METHODOLOGY_CHANGELOG))].filter(
      (version) => !before.has(version),
    );
    if (added.length === 0) {
      problems.push(
        `${METHODOLOGY_CHANGELOG}: this branch changes the method (${governed.join(', ')}) ` +
          'but adds no new version entry. Add one, or move the change under ' +
          'methodology/audits/ if it reports on the method rather than changing it.',
      );
    }
  }

  // Rule 1 — the published answer changed, so the story says so.
  for (const row of world.changed) {
    if (!/^src\/content\/claims\/.+\.yaml$/.test(row.path)) continue;
    const headText = world.head(row.path);
    if (headText === undefined) continue; // deleted; nothing left to answer for
    const head = claimFields(headText);
    const base = claimFields(world.base(row.path));
    const moved = ANSWERED_FIELDS.filter((field) => base.values[field] !== head.values[field]);
    if (moved.length === 0) continue;

    const story = head.story;
    if (story === undefined) {
      problems.push(`${row.path}: ${moved.join(' and ')} changed, and the claim names no parent story`);
      continue;
    }
    const storyPath = `src/content/stories/${story}.mdx`;
    const storyText = world.head(storyPath);
    if (storyText === undefined) {
      problems.push(`${row.path}: ${moved.join(' and ')} changed, and ${storyPath} does not exist`);
      continue;
    }
    const headEntries = changelogEntriesIn(storyText);
    const baseEntries = changelogEntriesIn(world.base(storyPath));
    const added = [...headEntries].filter((entry) => !baseEntries.has(entry));
    if (added.length === 0) {
      problems.push(
        `${storyPath}: ${row.path} changed ${moved.join(' and ')} ` +
          `(${moved.map((field) => `"${base.values[field]}" → "${head.values[field]}"`).join('; ')}) ` +
          'and the story gained no changelog entry saying so.',
      );
    }
  }

  return problems;
}
