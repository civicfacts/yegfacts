/**
 * The merge accounted for every claim the extractors raised.
 *
 * Whole-source intake is only worth anything if nothing is quietly dropped
 * between the seats and the merged list — the failure mode it exists to
 * prevent is a claim disappearing because no one chose it. So the arithmetic
 * is checked rather than asserted: every `e-NNN` id emitted by every seat must
 * turn up in merged.json, either under a merged claim's `from` or in the
 * `dropped` list with a reason.
 *
 * What this proves is narrow, and worth stating narrowly: no claim the seats
 * raised was lost between them and the list. It does not show that the seats
 * found every claim in the source. Nothing here can show that.
 *
 *   npx tsx scripts/intake-coverage.ts reviews/intake/<slug>
 *
 * Non-zero exit on an id that is nowhere, an id both kept and dropped, an id
 * no seat emitted, or a quote that is not the words of the comment it cites.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from './lib/repo.ts';

type Form = { index: number; commenter: string; quote: string; seats?: string[] };
type Extraction = { claims: { id: string; proposition: string; side: string; forms: Form[] }[] };
type MergedClaim = {
  id: string;
  /** `claim` since D-0029; `proposition` in runs merged before it. */
  claim?: string;
  proposition?: string;
  side: string;
  commenters?: number;
  from?: Record<string, string[]>;
  forms: Form[];
};
type Merged = {
  claims?: MergedClaim[];
  propositions?: MergedClaim[];
  dropped: { seat: string; id: string; reason: string }[];
};

const arg = process.argv[2];
if (!arg) {
  console.error('usage: tsx scripts/intake-coverage.ts <reviews/intake/dir>');
  process.exit(1);
}
const dir = path.isAbsolute(arg) ? arg : path.join(REPO_ROOT, arg);

const mergedFile = path.join(dir, 'merged.json');
if (!existsSync(mergedFile)) {
  console.error(`intake-coverage: no merged.json in ${path.relative(REPO_ROOT, dir)}`);
  process.exit(1);
}
const merged = JSON.parse(readFileSync(mergedFile, 'utf8')) as Merged;
/** Either spelling: `propositions` before D-0029, `claims` after it. */
const mergedClaims = merged.claims ?? merged.propositions ?? [];

/** Seats are whatever extract-*.json files are present, not a list kept here. */
const seats = readdirSync(dir)
  .filter((name) => /^extract-.+\.json$/.test(name))
  .map((name) => name.slice('extract-'.length, -'.json'.length))
  .sort();

if (seats.length === 0) {
  console.error(`intake-coverage: no extract-<seat>.json files in ${path.relative(REPO_ROOT, dir)}`);
  process.exit(1);
}

const emitted = new Map<string, Set<string>>();
for (const seat of seats) {
  const extraction = JSON.parse(readFileSync(path.join(dir, `extract-${seat}.json`), 'utf8')) as Extraction;
  emitted.set(seat, new Set(extraction.claims.map((claim) => claim.id)));
}

// Where each id was accounted for: merged-claim slugs, or "dropped".
//
// A seat often raises one claim that is really two ("very few people cycle,
// only 1 to 2 percent"), and the merge is required to split those, so one id
// landing on several merged claims is correct and is reported as a split rather
// than counted as a defect. What is a defect: an id nowhere at all, an id both
// kept and dropped, and an id the merge cites that no seat emitted.
const accounted = new Map<string, string[]>();
const key = (seat: string, id: string) => `${seat}/${id}`;

function account(seat: string, id: string, where: string) {
  const seen = accounted.get(key(seat, id));
  if (seen) seen.push(where);
  else accounted.set(key(seat, id), [where]);
}

for (const claim of mergedClaims) {
  for (const [seat, ids] of Object.entries(claim.from ?? {})) {
    for (const id of ids) account(seat, id, claim.id);
  }
}
for (const entry of merged.dropped ?? []) account(entry.seat, entry.id, 'dropped');

const problems: string[] = [];

const splits: string[] = [];
for (const seat of seats) {
  for (const id of [...emitted.get(seat)!].sort()) {
    const where = accounted.get(key(seat, id));
    if (!where) {
      problems.push(`unaccounted  ${seat}/${id} — in the extraction, in neither a proposition nor dropped`);
    } else if (where.includes('dropped') && where.length > 1) {
      problems.push(`kept and dropped  ${seat}/${id} — ${where.join(', ')}`);
    } else if (where.length > 1) {
      splits.push(`${seat}/${id} → ${where.join(', ')}`);
    }
  }
}

for (const [composite, where] of accounted) {
  const [seat, id] = composite.split('/');
  if (!seats.includes(seat!)) {
    problems.push(`unknown seat  ${composite} — cited by ${where.join(', ')}`);
  } else if (!emitted.get(seat!)!.has(id!)) {
    problems.push(`invented id  ${composite} — cited by ${where.join(', ')}, no such claim in extract-${seat}.json`);
  }
}

// ---------------------------------------------------------------------------
// Every form quotes the comment it cites
// ---------------------------------------------------------------------------
//
// Counting is not enough: a merged claim is only usable if the words attributed
// to a commenter are the words in the capture, under the index given. Seats
// reword lightly (a dropped sentence stitched without an ellipsis, a corrected
// typo) and one seat invented comment numbers outright, so both are checked.
// Curly quotes and runs of whitespace are normalised away; nothing else is.

const captureFile = path.join(REPO_ROOT, 'intake/captures', path.basename(dir), 'comments.jsonl');
if (existsSync(captureFile)) {
  type Comment = { index: number; text: string };
  const comments = new Map<number, string>();
  for (const line of readFileSync(captureFile, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    const row = JSON.parse(line) as Comment;
    comments.set(row.index, row.text);
  }
  const normalise = (s: string) =>
    s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();
  const normalised = new Map([...comments].map(([index, text]) => [index, normalise(text)]));

  let quotesChecked = 0;
  for (const claim of mergedClaims) {
    for (const form of claim.forms ?? []) {
      quotesChecked += 1;
      const quote = normalise(form.quote ?? '');
      const cited = normalised.get(form.index);
      if (cited !== undefined && cited.includes(quote)) continue;
      // Where the real words are, if they are anywhere: usually the seat cited
      // the wrong comment rather than made the quote up.
      const found = quote ? [...normalised].filter(([, text]) => text.includes(quote)).map(([index]) => index) : [];
      const where =
        cited === undefined
          ? `comment ${form.index} does not exist`
          : found.length > 0
            ? `not in comment ${form.index}; these words are in ${found.join(', ')}`
            : `not in comment ${form.index}, and nowhere in the capture`;
      problems.push(`quote  ${claim.id} — ${where}: "${(form.quote ?? '').slice(0, 60)}"`);
    }
  }
  console.log(`intake-coverage: checked ${quotesChecked} quotes against ${comments.size} captured comments\n`);
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const bySeatCount = new Map<number, number>();
for (const claim of mergedClaims) {
  const found = Object.keys(claim.from ?? {}).length;
  bySeatCount.set(found, (bySeatCount.get(found) ?? 0) + 1);
}

console.log(`intake-coverage: ${path.relative(REPO_ROOT, dir)}\n`);
for (const seat of seats) {
  console.log(`  ${seat.padEnd(8)} ${String(emitted.get(seat)!.size).padStart(4)} claims`);
}
console.log(`  ${'total'.padEnd(8)} ${String([...emitted.values()].reduce((n, s) => n + s.size, 0)).padStart(4)} extractor claims\n`);
console.log(`  merged claims       ${mergedClaims.length}`);
for (const count of [...bySeatCount.keys()].sort((a, b) => b - a)) {
  console.log(`    found by ${count} seat${count === 1 ? ' ' : 's'}   ${bySeatCount.get(count)}`);
}
console.log(`  dropped             ${(merged.dropped ?? []).length}`);
if (splits.length > 0) {
  console.log(`  split across merged claims  ${splits.length}`);
  for (const split of splits) console.log(`    ${split}`);
}

if (problems.length > 0) {
  console.error(`\nintake-coverage: ${problems.length} problem(s)`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log('\nintake-coverage: every extractor claim is accounted for, none both kept and dropped');
