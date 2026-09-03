/**
 * The merge accounted for every claim the extractors raised.
 *
 * Whole-source intake is only worth anything if nothing is quietly dropped
 * between the seats and the merged list — the failure mode it exists to
 * prevent is a claim disappearing because no one chose it. So the arithmetic
 * is checked rather than asserted: every `e-NNN` id emitted by every seat must
 * appear exactly once in merged.json, either under a proposition's `from` or
 * in the `dropped` list.
 *
 *   npx tsx scripts/intake-coverage.ts reviews/intake/<slug>
 *
 * Non-zero exit on any unaccounted, double-counted, or invented id.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from './lib/repo.ts';

type Form = { index: number; commenter: string; quote: string; seats?: string[] };
type Extraction = { claims: { id: string; proposition: string; side: string; forms: Form[] }[] };
type Proposition = {
  id: string;
  proposition: string;
  side: string;
  relation: unknown;
  commenters?: number;
  from?: Record<string, string[]>;
  forms: Form[];
};
type Merged = { propositions: Proposition[]; dropped: { seat: string; id: string; reason: string }[] };

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

// Where each id was accounted for: a proposition slug, or "dropped". A second
// sighting is as much a defect as none — it means one claim was counted twice.
const accounted = new Map<string, string[]>();
const key = (seat: string, id: string) => `${seat}/${id}`;

function account(seat: string, id: string, where: string) {
  const seen = accounted.get(key(seat, id));
  if (seen) seen.push(where);
  else accounted.set(key(seat, id), [where]);
}

for (const proposition of merged.propositions) {
  for (const [seat, ids] of Object.entries(proposition.from ?? {})) {
    for (const id of ids) account(seat, id, proposition.id);
  }
}
for (const entry of merged.dropped ?? []) account(entry.seat, entry.id, 'dropped');

const problems: string[] = [];

for (const seat of seats) {
  for (const id of [...emitted.get(seat)!].sort()) {
    const where = accounted.get(key(seat, id));
    if (!where) problems.push(`unaccounted  ${seat}/${id} — in the extraction, in neither a proposition nor dropped`);
    else if (where.length > 1) problems.push(`counted twice  ${seat}/${id} — ${where.join(', ')}`);
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
// Report
// ---------------------------------------------------------------------------

const bySeatCount = new Map<number, number>();
for (const proposition of merged.propositions) {
  const found = Object.keys(proposition.from ?? {}).length;
  bySeatCount.set(found, (bySeatCount.get(found) ?? 0) + 1);
}

console.log(`intake-coverage: ${path.relative(REPO_ROOT, dir)}\n`);
for (const seat of seats) {
  console.log(`  ${seat.padEnd(8)} ${String(emitted.get(seat)!.size).padStart(4)} claims`);
}
console.log(`  ${'total'.padEnd(8)} ${String([...emitted.values()].reduce((n, s) => n + s.size, 0)).padStart(4)} extractor claims\n`);
console.log(`  propositions        ${merged.propositions.length}`);
for (const count of [...bySeatCount.keys()].sort((a, b) => b - a)) {
  console.log(`    found by ${count} seat${count === 1 ? ' ' : 's'}   ${bySeatCount.get(count)}`);
}
console.log(`  dropped             ${(merged.dropped ?? []).length}`);

if (problems.length > 0) {
  console.error(`\nintake-coverage: ${problems.length} problem(s)`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log('\nintake-coverage: every extractor claim is accounted for exactly once');
