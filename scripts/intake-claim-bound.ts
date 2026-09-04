/**
 * The merge bound gate: refuse a merge that put two assertions in one claim.
 *
 *   npx tsx scripts/intake-claim-bound.ts reviews/intake/<slug>   # a merged run
 *   npx tsx scripts/intake-claim-bound.ts                         # the live register
 *
 * `intake-quote-gate.ts` is the sibling and the model, and the difference is
 * worth stating before anyone reads this as the same kind of thing. The quote
 * gate decides a substring question — are these words in that comment — and
 * because the question is decidable it acts on the answer, cutting the form and
 * naming the loss. This one is about entailment: does this wording assert this
 * proposition. No string test decides that, so this gate implements one
 * mechanical corner of `prompts/intake-merge.md` rule 1 and says so everywhere
 * it reports.
 *
 * It also does not edit anything. The quote gate can throw a form out because a
 * form is a citation and a wrong citation has one correct fate. A compound
 * claim has to be *split*, and splitting is an editorial act: it decides which
 * wording goes under which half, and what each half now claims. A script that
 * did that silently would be inventing propositions, which is the defect. So
 * this refuses and names, and a person re-merges.
 *
 * Exit 1 when a claim is flagged, or when it cannot do its job. A flag is a
 * finding, not a warning.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { REPO_ROOT, loadYaml, relative, repoPath } from './lib/repo.ts';
import { describeUnsplit, unsplitClaims, type BoundClaim } from './lib/claim-bound.ts';

/**
 * What the mechanical half does not see. Printed with every report, because a
 * partial check that reads as the whole rule is the failure this gate exists to
 * answer.
 */
const NOT_CHECKED_HERE = [
  'A compound proposition with no numerals in it. "Increases congestion, slows traffic and',
  'causes idling and emissions" is four assertions and nothing below fires on it.',
  '',
  'Rule 2 — a form must assert the claim, not the topic. "Bicycles reduce congestion" and',
  '"removing a traffic lane increases congestion" are opposite claims sharing every content',
  'word. That needs a reader, or a seat, and neither is invoked here.',
  '',
  'A claim where one person happened to use both numbers in two separate assertions.',
];

type MergedForm = { quote?: string };
type MergedClaim = {
  id?: string;
  claim?: string;
  proposition?: string;
  forms?: MergedForm[];
};

function fromRun(dir: string): { claims: BoundClaim[]; label: string } {
  const merged = path.join(dir, 'merged.json');
  if (!existsSync(merged)) {
    console.error(`intake-claim-bound: no merged.json in ${relative(dir)}`);
    process.exit(1);
  }
  const parsed = JSON.parse(readFileSync(merged, 'utf8')) as {
    claims?: MergedClaim[];
    propositions?: MergedClaim[];
  };
  const rows = parsed.claims ?? parsed.propositions ?? [];
  return {
    label: relative(merged),
    claims: rows.map((row) => ({
      id: String(row.id ?? ''),
      proposition: String(row.claim ?? row.proposition ?? ''),
      wordings: (row.forms ?? []).map((form) => String(form.quote ?? '')),
    })),
  };
}

type RegisterClaim = {
  id?: string;
  proposition?: string;
  wording?: string;
  variations?: Array<{ wording?: string }>;
};

function fromRegister(): { claims: BoundClaim[]; label: string } {
  const file = repoPath('intake', 'register.yaml');
  const register = loadYaml<{ claims?: RegisterClaim[] }>(file);
  const rows = register?.claims ?? [];
  return {
    label: relative(file),
    // A right-of-reply decline carries no proposition at all; there is nothing
    // to bound and nothing to read.
    claims: rows
      .filter((row) => typeof row.proposition === 'string' && row.proposition.trim() !== '')
      .map((row) => ({
        id: String(row.id ?? ''),
        proposition: String(row.proposition),
        // `wording` is the representative variation, so it is in the list
        // twice; a count in the report should be the number of distinct
        // captured sentences.
        wordings: [
          ...new Set([
            ...(typeof row.wording === 'string' ? [row.wording] : []),
            ...(row.variations ?? []).map((variation) => String(variation.wording ?? '')),
          ]),
        ],
      })),
  };
}

const arg = process.argv[2];
const dir = arg ? (path.isAbsolute(arg) ? arg : path.join(REPO_ROOT, arg)) : undefined;
const { claims, label } = dir ? fromRun(dir) : fromRegister();

if (claims.length === 0) {
  console.error(`intake-claim-bound: no claims in ${label}`);
  process.exit(1);
}

const flagged = unsplitClaims(claims);

const report = [
  '# Merge bound',
  '',
  `${claims.length} claim(s) read from \`${label}\`.`,
  '',
  'One mechanical corner of `prompts/intake-merge.md` rule 1, and only that corner:',
  'a proposition whose coordinated halves each name a numeral, whose numerals are',
  'disjoint, and where no single captured wording carries a numeral from both. That is',
  'a claim asserting two quantities nobody in the source asserted together.',
  '',
  '## Not checked here',
  '',
  ...NOT_CHECKED_HERE,
  '',
  '## Flagged',
  '',
];

if (flagged.length === 0) {
  report.push('Nothing flagged by the mechanical corner. That is not "rule 1 holds".', '');
} else {
  report.push(...flagged.map((claim) => `- ${describeUnsplit(claim)}`), '');
}

if (dir) {
  const out = path.join(dir, 'claim-bound.md');
  writeFileSync(out, `${report.join('\n')}\n`);
  console.log(`intake-claim-bound: ${relative(out)}`);
}

for (const claim of flagged) console.error(`✗ ${describeUnsplit(claim)}`);
console.log(
  `intake-claim-bound: ${claims.length} claim(s) read, ${flagged.length} flagged. ` +
    'The mechanical corner only; rule 2 and non-numeric compounds are not checked.',
);
process.exit(flagged.length > 0 ? 1 : 0);
