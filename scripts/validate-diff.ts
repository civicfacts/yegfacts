/**
 * The half of validation that needs to know what this branch changed.
 *
 *   npm run validate:diff              # against origin/main
 *   npm run validate:diff origin/main  # or any base ref
 *
 * `npm run validate` sees one snapshot of the working tree, so it can check that
 * a published story carries a published changelog entry but never that *this
 * change* came with the entry it owes. That needs a base commit, which is
 * something CI has and a local script does not — which is why both rules sat as
 * a TODO in `scripts/validate.ts` while the header of
 * `methodology/changelog.yaml` described one of them as if it ran.
 *
 * The rules and their exemptions are argued in `scripts/lib/diff-rules.ts`. This
 * file is the git adapter and nothing else.
 *
 * It fails loudly when it cannot resolve a base, rather than passing. A check
 * that quietly turns itself off when the ground is unfamiliar is the same
 * promise-without-a-check this exists to remove: CI must fetch enough history
 * (`fetch-depth: 0`) for the base ref to exist.
 */
import { execFileSync } from 'node:child_process';
import { REPO_ROOT } from './lib/repo.ts';
import { diffRuleProblems, type ChangedPath, type DiffWorld } from './lib/diff-rules.ts';

function git(...args: string[]): string {
  return execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

const baseRef = process.argv[2] ?? process.env.VALIDATE_BASE_REF ?? 'origin/main';

let mergeBase: string;
try {
  mergeBase = git('merge-base', baseRef, 'HEAD').trim();
} catch {
  console.error(
    `validate-diff: cannot find a merge base between "${baseRef}" and HEAD.\n` +
      '  In CI this means the checkout was shallow: set fetch-depth: 0.\n' +
      '  Locally, fetch the base ref first (git fetch origin).',
  );
  process.exit(1);
}

// HEAD, not the working tree: what CI will judge is what has been committed,
// and a check that passes locally on an uncommitted file and fails on push is
// worse than no check.
const fields = git('diff', '--name-status', '-z', mergeBase, 'HEAD', '--').split('\0');
const changed: ChangedPath[] = [];
for (let i = 0; i < fields.length; i += 1) {
  const status = fields[i];
  if (status === undefined || status === '') continue;
  // -z emits status and path as separate NUL-terminated fields. A rename or
  // copy carries two paths; the second is the one that exists at HEAD.
  const paths = /^[RC]/.test(status) ? 2 : 1;
  const head = fields[i + paths];
  i += paths;
  if (head === undefined || head === '') continue;
  changed.push({ path: head, status: status[0]! });
}

/**
 * A file's text at one revision. Absent is a normal answer — a claim added on
 * this branch has no base version — so git's "does not exist" on stderr is
 * noise, not news, and is dropped.
 */
const at = (rev: string) => (file: string): string | undefined => {
  try {
    return execFileSync('git', ['show', `${rev}:${file}`], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return undefined;
  }
};

const world: DiffWorld = { changed, base: at(mergeBase), head: at('HEAD') };
const problems = diffRuleProblems(world);

console.log(
  `validate-diff: ${changed.length} file(s) changed against ${baseRef} (${mergeBase.slice(0, 9)}).`,
);

if (problems.length > 0) {
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  console.error(
    `\nvalidate-diff: ${problems.length} problem${problems.length === 1 ? '' : 's'}`,
  );
  process.exit(1);
}

console.log('validate-diff: every change that owes an entry has one.');
