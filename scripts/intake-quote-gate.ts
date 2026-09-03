/**
 * Throw out any extracted form whose quote is not the words of the comment it
 * cites, before the merge ever sees it.
 *
 * A cheap seat reading several hundred comments will sometimes stitch two
 * sentences together, repair a typo, or cite a comment index the thread does
 * not have. Every one of those is a false attribution to a real person, which
 * is worse than a missed claim: the person can read the site and find words
 * they did not write next to their own label.
 *
 * So the extractions are filtered mechanically rather than trusted. Curly
 * quotes and runs of whitespace are normalised away and nothing else is; a
 * quote must be one unbroken run of its comment. Discards are written to a
 * report beside the run so the loss is visible rather than silent, and a claim
 * that loses every form is named there too.
 *
 *   npx tsx scripts/intake-quote-gate.ts reviews/intake/<slug>
 *
 * Rewrites each `extract-<seat>.json` in place and writes `quote-gate.md`.
 * Exits non-zero only when it cannot do its job (no run directory, no capture,
 * unreadable extraction) — throwing forms out is the normal outcome, not a
 * failure.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT } from './lib/repo.ts';

type Form = { index: number; commenter: string; quote: string };
type Claim = { id: string; proposition: string; side: string; forms: Form[] };
type Extraction = { claims: Claim[] };

const arg = process.argv[2];
if (!arg) {
  console.error('usage: tsx scripts/intake-quote-gate.ts <reviews/intake/dir>');
  process.exit(1);
}
const dir = path.isAbsolute(arg) ? arg : path.join(REPO_ROOT, arg);
const capture = path.join(REPO_ROOT, 'intake/captures', path.basename(dir), 'comments.jsonl');

if (!existsSync(capture)) {
  console.error(`intake-quote-gate: no capture at ${path.relative(REPO_ROOT, capture)}`);
  process.exit(1);
}

const comments = new Map<number, string>();
for (const line of readFileSync(capture, 'utf8').split('\n')) {
  if (!line.trim()) continue;
  const row = JSON.parse(line) as { index: number; text: string };
  comments.set(row.index, row.text);
}

/** Curly quotes and whitespace only. Spelling and capitals are the person's. */
const normalise = (s: string) =>
  s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();
const normalised = new Map([...comments].map(([index, text]) => [index, normalise(text)]));

const seats = readdirSync(dir)
  .filter((name) => /^extract-.+\.json$/.test(name) && !name.startsWith('extract-superseded'))
  .map((name) => name.slice('extract-'.length, -'.json'.length))
  .sort();

if (seats.length === 0) {
  console.error(`intake-quote-gate: no extract-<seat>.json files in ${path.relative(REPO_ROOT, dir)}`);
  process.exit(1);
}

const report: string[] = [
  '# Quote gate',
  '',
  `Every quote checked against the ${comments.size} comments in \`${path.relative(REPO_ROOT, capture)}\`.`,
  'A form survives only if its quote is one unbroken run of the comment it cites.',
  '',
];
const totals: { seat: string; claims: number; forms: number; cut: number; lost: number }[] = [];

for (const seat of seats) {
  const file = path.join(dir, `extract-${seat}.json`);
  const extraction = JSON.parse(readFileSync(file, 'utf8')) as Extraction;
  const kept: Claim[] = [];
  const cut: string[] = [];
  const lost: string[] = [];

  for (const claim of extraction.claims) {
    const survivors = (claim.forms ?? []).filter((form) => {
      const quote = normalise(form.quote ?? '');
      const cited = normalised.get(form.index);
      if (cited !== undefined && quote && cited.includes(quote)) return true;
      // Say where the words really are: usually the seat cited the wrong
      // comment, and that is a one-line correction rather than a re-run.
      const elsewhere = quote
        ? [...normalised].filter(([, text]) => text.includes(quote)).map(([index]) => index)
        : [];
      const why =
        cited === undefined
          ? `comment ${form.index} is not in the capture`
          : elsewhere.length > 0
            ? `not in comment ${form.index}; these words are in ${elsewhere.join(', ')}`
            : `not in comment ${form.index}, and nowhere in the capture`;
      cut.push(`- \`${claim.id}\` ${why}. Quote: “${(form.quote ?? '').slice(0, 90)}”`);
      return false;
    });
    if (survivors.length > 0) kept.push({ ...claim, forms: survivors });
    else lost.push(claim.id);
  }

  writeFileSync(file, `${JSON.stringify({ ...extraction, claims: kept }, null, 1)}\n`);

  report.push(`## ${seat}`, '');
  if (cut.length === 0) {
    report.push('Every quote is the words of the comment it cites. Nothing thrown out.', '');
  } else {
    report.push(
      `${cut.length} form(s) thrown out; ${lost.length} claim(s) lost every form and went with them.`,
      '',
      ...cut,
      '',
    );
    if (lost.length > 0) report.push(`Claims lost entirely: ${lost.map((id) => `\`${id}\``).join(', ')}`, '');
  }
  totals.push({
    seat,
    claims: kept.length,
    forms: kept.reduce((n, c) => n + c.forms.length, 0),
    cut: cut.length,
    lost: lost.length,
  });
}

report.push(
  '## Totals',
  '',
  '| seat | claims kept | forms kept | forms thrown out | claims lost |',
  '| --- | ---: | ---: | ---: | ---: |',
  ...totals.map((t) => `| ${t.seat} | ${t.claims} | ${t.forms} | ${t.cut} | ${t.lost} |`),
);
writeFileSync(path.join(dir, 'quote-gate.md'), `${report.join('\n')}\n`);

for (const t of totals) {
  console.log(`${t.seat.padEnd(8)} kept ${t.claims} claims / ${t.forms} forms; threw out ${t.cut} forms, ${t.lost} claims`);
}
console.log(`\nintake-quote-gate: ${path.relative(REPO_ROOT, path.join(dir, 'quote-gate.md'))}`);
