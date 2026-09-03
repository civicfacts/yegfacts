/**
 * The grouping accounted for every merged claim, and no claim welds two
 * different assertions together.
 *
 * Grouping happens twice and the two levels do different work. A question is
 * one unit of work: one brief, one body of evidence, one panel run, and
 * grouping there is what saves the site from checking the same thing five
 * times. A claim carries one finding, so grouping there decides what a finding
 * will mean.
 *
 * The failure this guards against is the second kind. If a claim folds in two
 * merged claims that a single state of the world does not make true or false
 * together, its finding answers neither, and every commenter quoted under it is
 * labelled with a verdict about somebody else's argument. So everything folded
 * into one claim has to share a side, and a claim whose parts disagree is
 * reported as an error rather than published.
 *
 *   npx tsx scripts/intake-groups.ts reviews/intake/<slug>
 *
 * Reads `merged.json` and `groups.json`, in either spelling: a run merged
 * before D-0029 says `propositions` and `stories`, one merged after says
 * `claims` and `questions`. Non-zero exit on a merged claim that is missing,
 * placed twice, or invented; on a claim that mixes sides; on a claim whose
 * wording is not verbatim from one of the claims it folds in; and on an id that
 * could not be a URL. Whether a two-sided question presupposes its answer is a
 * judgement, so those questions are printed for a person to read rather than
 * guessed at by a pattern.
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from './lib/repo.ts';

type MergedClaim = {
  id: string;
  /** `claim` since D-0029; `proposition` in runs merged before it. */
  claim?: string;
  proposition?: string;
  side?: string;
  commenters?: number;
  forms: unknown[];
};
type Merged = { claims?: MergedClaim[]; propositions?: MergedClaim[] };
type GroupedClaim = {
  id: string;
  claim?: string;
  proposition?: string;
  /** `merged_from` since D-0029; `variations` in runs grouped before it. */
  merged_from?: string[];
  variations?: string[];
  side?: string;
};
type GroupedQuestion = { id: string; question: string; note?: string; claims: GroupedClaim[] };
type Groups = { questions?: GroupedQuestion[]; stories?: GroupedQuestion[] };

/** The run's own key, whichever spelling it was written with. */
const wordingOf = (claim: MergedClaim | GroupedClaim): string =>
  claim.claim ?? claim.proposition ?? '';

const arg = process.argv[2];
if (!arg) {
  console.error('usage: tsx scripts/intake-groups.ts <reviews/intake/dir>');
  process.exit(1);
}
const dir = path.isAbsolute(arg) ? arg : path.join(REPO_ROOT, arg);

for (const name of ['merged.json', 'groups.json']) {
  if (!existsSync(path.join(dir, name))) {
    console.error(`intake-groups: no ${name} in ${path.relative(REPO_ROOT, dir)}`);
    process.exit(1);
  }
}

const merged = JSON.parse(readFileSync(path.join(dir, 'merged.json'), 'utf8')) as Merged;
const groups = JSON.parse(readFileSync(path.join(dir, 'groups.json'), 'utf8')) as Groups;

const mergedClaims = merged.claims ?? merged.propositions ?? [];
const questions = groups.questions ?? groups.stories ?? [];
const parts = new Map(mergedClaims.map((claim) => [claim.id, claim]));
const problems: string[] = [];
const placed = new Map<string, string[]>();

/** Ids reach the public site as URL segments, so they are checked like one. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const questionIds = new Set<string>();
const claimIds = new Set<string>();

for (const question of questions) {
  if (!SLUG.test(question.id)) problems.push(`question id  "${question.id}" is not a url slug`);
  if (questionIds.has(question.id)) problems.push(`question id  "${question.id}" appears twice`);
  questionIds.add(question.id);
  if (!/\?$/.test(question.question ?? '')) {
    problems.push(`question  ${question.id} — must be a question a reader would type: "${question.question ?? ''}"`);
  }

  for (const claim of question.claims ?? []) {
    if (!SLUG.test(claim.id)) problems.push(`claim id  "${claim.id}" is not a url slug`);
    if (claimIds.has(claim.id)) problems.push(`claim id  "${claim.id}" appears twice`);
    claimIds.add(claim.id);

    const folded = claim.merged_from ?? claim.variations ?? [];
    if (folded.length === 0) problems.push(`claim  ${claim.id} folds in nothing`);

    // The canonical wording is copied from a merged claim, never composed, so a
    // reader comparing the claim with the quotes underneath finds the same
    // sentence rather than an editor's paraphrase.
    const canonical = parts.get(folded[0] ?? '');
    if (canonical && wordingOf(claim).trim() !== wordingOf(canonical).trim()) {
      problems.push(
        `claim wording  ${claim.id} — not the verbatim wording of the first claim it folds in, ${folded[0]}`,
      );
    }

    const claimSides = new Set<string>();
    for (const id of folded) {
      const part = parts.get(id);
      if (!part) {
        problems.push(`invented claim  ${claim.id} cites ${id}, which is not in merged.json`);
        continue;
      }
      const seen = placed.get(id);
      if (seen) seen.push(claim.id);
      else placed.set(id, [claim.id]);
      if (part.side) claimSides.add(part.side);
    }

    // A claim is one assertion. What is folded into it may word it differently
    // or deny it flatly, which is the same truth condition; it may not argue
    // the other way, which is a different claim under the same question.
    const substantive = [...claimSides].filter((s) => s !== 'neither');
    if (substantive.length > 1) {
      problems.push(
        `mixed claim  ${claim.id} — its parts argue ${substantive.join(' and ')}; ` +
          `a finding here would label each side with a verdict about the other. Split it.`,
      );
    }
  }
}

for (const [id, claims] of placed) {
  if (claims.length > 1) problems.push(`placed twice  ${id} — in ${claims.join(', ')}`);
}
for (const id of parts.keys()) {
  if (!placed.has(id)) problems.push(`unplaced  ${id} — in merged.json, in no claim`);
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const foldedIn = (claim: GroupedClaim) => claim.merged_from ?? claim.variations ?? [];

const claimCount = questions.reduce((n, q) => n + (q.claims?.length ?? 0), 0);
const foldedCount = questions.reduce(
  (n, q) => n + (q.claims ?? []).reduce((m, c) => m + foldedIn(c).length, 0),
  0,
);
const sidesOf = (question: GroupedQuestion) =>
  new Set(
    (question.claims ?? []).flatMap((c) => foldedIn(c).map((id) => parts.get(id)?.side)),
  );
const bothSided = questions.filter((q) => {
  const sides = sidesOf(q);
  return sides.has('for') && sides.has('against');
}).length;

console.log(`intake-groups: ${path.relative(REPO_ROOT, dir)}\n`);
console.log(`  merged claims  ${mergedClaims.length}`);
console.log(`  claims         ${claimCount}`);
console.log(`  questions      ${questions.length}`);
console.log(`  merged claims placed  ${foldedCount}`);
console.log(`  questions carrying both sides  ${bothSided}`);

const sizes = questions
  .map((q) => ({ id: q.id, claims: q.claims?.length ?? 0 }))
  .sort((a, b) => b.claims - a.claims)
  .slice(0, 5);
console.log('\n  largest questions:');
for (const q of sizes) console.log(`    ${String(q.claims).padStart(2)} claims  ${q.id}`);

// Whether a two-sided question presupposes its answer is a judgement, not a
// pattern, and a script that guesses at it fails honest questions and teaches
// everyone to ignore it. So these are printed for a person to read instead of
// asserted to be fine.
const twoSided = questions.filter((question) => {
  const sides = sidesOf(question);
  return sides.has('for') && sides.has('against');
});
if (twoSided.length > 0) {
  console.log('\n  questions holding claims from both camps — read these:');
  for (const question of twoSided) console.log(`    ${question.id}: ${question.question}`);
}

if (problems.length > 0) {
  console.error(`\nintake-groups: ${problems.length} problem(s)`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log('\nintake-groups: every merged claim placed once, no claim mixes sides');
