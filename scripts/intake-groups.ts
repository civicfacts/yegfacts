/**
 * The grouping accounted for every proposition, and no claim welds two
 * different assertions together.
 *
 * Grouping happens twice and the two levels do different work. A story is one
 * investigation: one brief, one body of evidence, one panel run, and grouping
 * there is what saves the site from checking the same thing five times. A claim
 * carries one finding, so grouping there decides what a finding will mean.
 *
 * The failure this guards against is the second kind. If a claim holds two
 * propositions that a single state of the world does not make true or false
 * together, its finding answers neither, and every commenter quoted under it is
 * labelled with a verdict about somebody else's argument. So a claim's
 * variations have to share a side, and a claim whose variations disagree is
 * reported as an error rather than published.
 *
 *   npx tsx scripts/intake-groups.ts reviews/intake/<slug>
 *
 * Reads `merged.json` and `groups.json`. Non-zero exit on a proposition that is
 * missing, placed twice, or invented; on a claim that mixes sides; on a claim
 * whose wording is not verbatim from one of its variations; and on an id that
 * could not be a URL. Whether a two-sided investigation's question presupposes
 * its answer is a judgement, so those questions are printed for a person to
 * read rather than guessed at by a pattern.
 */
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from './lib/repo.ts';

type Proposition = { id: string; proposition: string; side?: string; commenters?: number; forms: unknown[] };
type Merged = { propositions: Proposition[] };
type Claim = { id: string; proposition: string; variations: string[]; side?: string };
type Story = { id: string; question: string; note?: string; claims: Claim[] };
type Groups = { stories: Story[] };

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

const props = new Map(merged.propositions.map((p) => [p.id, p]));
const problems: string[] = [];
const placed = new Map<string, string[]>();

/** Ids reach the public site as URL segments, so they are checked like one. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const storyIds = new Set<string>();
const claimIds = new Set<string>();

for (const story of groups.stories) {
  if (!SLUG.test(story.id)) problems.push(`story id  "${story.id}" is not a url slug`);
  if (storyIds.has(story.id)) problems.push(`story id  "${story.id}" appears twice`);
  storyIds.add(story.id);
  if (!/\?$/.test(story.question ?? '')) {
    problems.push(`story question  ${story.id} — must be a question a reader would type: "${story.question ?? ''}"`);
  }

  for (const claim of story.claims ?? []) {
    if (!SLUG.test(claim.id)) problems.push(`claim id  "${claim.id}" is not a url slug`);
    if (claimIds.has(claim.id)) problems.push(`claim id  "${claim.id}" appears twice`);
    claimIds.add(claim.id);

    const variations = claim.variations ?? [];
    if (variations.length === 0) problems.push(`claim  ${claim.id} has no variations`);

    // The canonical wording is copied from a proposition, never composed, so a
    // reader comparing the claim with the quotes underneath finds the same
    // sentence rather than an editor's paraphrase.
    const canonical = props.get(variations[0] ?? '');
    if (canonical && claim.proposition?.trim() !== canonical.proposition.trim()) {
      problems.push(
        `claim wording  ${claim.id} — not the verbatim wording of its first variation ${variations[0]}`,
      );
    }

    const claimSides = new Set<string>();
    for (const id of variations) {
      const proposition = props.get(id);
      if (!proposition) {
        problems.push(`invented proposition  ${claim.id} cites ${id}, which is not in merged.json`);
        continue;
      }
      const seen = placed.get(id);
      if (seen) seen.push(claim.id);
      else placed.set(id, [claim.id]);
      if (proposition.side) claimSides.add(proposition.side);
    }

    // A claim is one assertion. Variations may word it differently or deny it
    // flatly, which is the same truth condition; they may not argue the other
    // way, which is a different claim in the same story.
    const substantive = [...claimSides].filter((s) => s !== 'neither');
    if (substantive.length > 1) {
      problems.push(
        `mixed claim  ${claim.id} — variations argue ${substantive.join(' and ')}; ` +
          `a finding here would label each side with a verdict about the other. Split it.`,
      );
    }
  }
}

for (const [id, claims] of placed) {
  if (claims.length > 1) problems.push(`placed twice  ${id} — in ${claims.join(', ')}`);
}
for (const id of props.keys()) {
  if (!placed.has(id)) problems.push(`unplaced  ${id} — in merged.json, in no claim`);
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const claimCount = groups.stories.reduce((n, s) => n + (s.claims?.length ?? 0), 0);
const variationCount = groups.stories.reduce(
  (n, s) => n + (s.claims ?? []).reduce((m, c) => m + (c.variations?.length ?? 0), 0),
  0,
);
const bothSided = groups.stories.filter((s) => {
  const sides = new Set(
    (s.claims ?? []).flatMap((c) => (c.variations ?? []).map((id) => props.get(id)?.side)),
  );
  return sides.has('for') && sides.has('against');
}).length;

console.log(`intake-groups: ${path.relative(REPO_ROOT, dir)}\n`);
console.log(`  propositions   ${merged.propositions.length}`);
console.log(`  claims         ${claimCount}`);
console.log(`  stories        ${groups.stories.length}`);
console.log(`  variations placed  ${variationCount}`);
console.log(`  stories carrying both sides  ${bothSided}`);

const sizes = groups.stories
  .map((s) => ({ id: s.id, claims: s.claims?.length ?? 0 }))
  .sort((a, b) => b.claims - a.claims)
  .slice(0, 5);
console.log('\n  largest investigations:');
for (const s of sizes) console.log(`    ${String(s.claims).padStart(2)} claims  ${s.id}`);

// Whether a two-sided story's question presupposes its answer is a judgement,
// not a pattern, and a script that guesses at it fails honest questions and
// teaches everyone to ignore it. So these are printed for a person to read
// instead of asserted to be fine.
const twoSided = groups.stories.filter((story) => {
  const sides = new Set(
    (story.claims ?? []).flatMap((c) => (c.variations ?? []).map((id) => props.get(id)?.side)),
  );
  return sides.has('for') && sides.has('against');
});
if (twoSided.length > 0) {
  console.log('\n  investigations holding claims from both camps — read these questions:');
  for (const story of twoSided) console.log(`    ${story.id}: ${story.question}`);
}

if (problems.length > 0) {
  console.error(`\nintake-groups: ${problems.length} problem(s)`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log('\nintake-groups: every proposition placed once, no claim mixes sides');
