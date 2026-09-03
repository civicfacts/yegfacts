/**
 * A completed intake run, as register entries.
 *
 *   npx tsx scripts/intake-register.ts reviews/intake/<slug>
 *
 * Reads `merged.json` and, when it is there, `triage.json` from the run
 * directory, matches the run to its `sources` entry in `intake/register.yaml`,
 * and prints the YAML block to paste under `candidates:`. It prints; it does
 * not write. The register is a public record and a script that edits it in
 * place is a script that can quietly rewrite one.
 *
 * Sixty-odd propositions is where hand-copying starts producing a register that
 * disagrees with the run it came from — a quote off by a word, a comment index
 * off by one — and the whole promise of whole-source intake is that the two
 * agree. So the copying is mechanical and the validator checks the result.
 *
 * A proposition the merge marked a variation of something else becomes
 * `outcome: variation` whatever triage said about it: triage dispositions a
 * claim, and this one is not a separate claim.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { REPO_ROOT, loadYaml, relative, repoPath } from './lib/repo.ts';

// ---------------------------------------------------------------------------
// The shapes on disk
// ---------------------------------------------------------------------------

/** `"new"`, or `{"variation-of": "<id>"}`. */
type Relation = 'new' | { 'variation-of': string };

interface MergedForm {
  index: number;
  commenter: string;
  quote: string;
  seats?: string[];
}

interface Proposition {
  id: string;
  proposition: string;
  side: string;
  relation: Relation;
  commenters?: number;
  names_person?: boolean;
  from?: Record<string, string[]>;
  forms?: MergedForm[];
}

interface Merged {
  propositions: Proposition[];
  dropped?: Array<{ seat: string; id: string; reason: string }>;
}

interface Triage {
  decisions: Array<{ id: string; outcome: string; reason: string }>;
}

interface SourceEntry {
  id: string;
  run?: string;
  captured?: string;
}

/** A register entry, with the keys in the order the register writes them. */
export interface RegisterEntry {
  id: string;
  recorded: string;
  origin: 'captured';
  source: string;
  proposition: string;
  wording: string;
  side: string;
  commenters?: number;
  seats?: string[];
  outcome: string;
  variation_of?: string;
  names_person?: boolean;
  reason?: string;
  forms?: Array<{ commenter: string; quote: string; comment: number }>;
}

// ---------------------------------------------------------------------------
// The conversion
// ---------------------------------------------------------------------------

const variationOf = (relation: Relation): string | undefined =>
  typeof relation === 'object' && relation !== null ? relation['variation-of'] : undefined;

/**
 * The seats that found a proposition, in the order `from` names them, since
 * that is the order the merge wrote and it says nothing the register needs to
 * re-sort.
 */
const seatsOf = (proposition: Proposition): string[] | undefined => {
  const seats = Object.keys(proposition.from ?? {});
  return seats.length > 0 ? seats : undefined;
};

/**
 * The register's `wording` is the representative captured quote — the words
 * somebody actually typed, kept beside the merge's plain sentence.
 *
 * The merge's first form, not the longest: a proposition's forms include the
 * comments that deny it as well as the ones that assert it, and the longest is
 * as often a rebuttal as a statement of the claim. The merge lists the form it
 * built the proposition from first.
 */
function representative(forms: MergedForm[]): MergedForm | undefined {
  return forms[0];
}

/**
 * One run's propositions as register entries, in merged.json's order.
 *
 * `decisions` is undefined when the run has not been triaged, which makes every
 * entry `pre-triage` — except the variations, which triage would not have been
 * asked about anyway.
 */
export function registerEntries(
  merged: Merged,
  triage: Triage | undefined,
  source: SourceEntry,
  recorded: string,
): { entries: RegisterEntry[]; untriaged: string[] } {
  const decisions = new Map(
    (triage?.decisions ?? []).map((decision) => [decision.id, decision]),
  );
  const untriaged: string[] = [];

  const entries = merged.propositions.map((proposition) => {
    const merges = variationOf(proposition.relation);
    const decision = decisions.get(proposition.id);
    const forms = proposition.forms ?? [];
    const quote = representative(forms);

    if (!merges && triage !== undefined && decision === undefined) {
      untriaged.push(proposition.id);
    }

    const outcome = merges ? 'variation' : (decision?.outcome ?? 'pre-triage');
    const reason = merges
      ? `The same claim as ${merges}, in other words; it is checked there.`
      : decision?.reason;

    const entry: RegisterEntry = {
      id: proposition.id,
      recorded,
      origin: 'captured',
      source: source.id,
      proposition: proposition.proposition,
      wording: quote?.quote ?? proposition.proposition,
      side: proposition.side,
      commenters: proposition.commenters,
      seats: seatsOf(proposition),
      outcome,
      variation_of: merges,
      names_person: proposition.names_person === true ? true : undefined,
      reason,
      forms: forms.map((form) => ({
        commenter: form.commenter,
        quote: form.quote,
        comment: form.index,
      })),
    };

    // Undefined keys would print as `null`, and the register's optional fields
    // mean absent, not empty.
    for (const key of Object.keys(entry) as Array<keyof RegisterEntry>) {
      if (entry[key] === undefined) delete entry[key];
    }
    if (entry.forms?.length === 0) delete entry.forms;
    return entry;
  });

  return { entries, untriaged };
}

/** The entries as the YAML block that goes under `candidates:`, indented to match. */
export function toYamlBlock(entries: RegisterEntry[]): string {
  return YAML.stringify(entries, { lineWidth: 0 })
    .split('\n')
    .map((line) => (line === '' ? line : `  ${line}`))
    .join('\n');
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function main(): void {
  const arg = process.argv[2];
  if (!arg) {
    console.error('usage: npx tsx scripts/intake-register.ts reviews/intake/<slug>');
    process.exit(1);
  }
  const dir = path.isAbsolute(arg) ? arg : path.join(REPO_ROOT, arg);
  const runPath = relative(dir);

  const mergedFile = path.join(dir, 'merged.json');
  if (!existsSync(mergedFile)) {
    console.error(`intake-register: no merged.json in ${runPath}`);
    process.exit(1);
  }
  const merged = JSON.parse(readFileSync(mergedFile, 'utf8')) as Merged;

  const triageFile = path.join(dir, 'triage.json');
  const triage = existsSync(triageFile)
    ? (JSON.parse(readFileSync(triageFile, 'utf8')) as Triage)
    : undefined;
  if (triage === undefined) {
    console.error(
      `intake-register: no triage.json in ${runPath} — every entry is outcome: pre-triage`,
    );
  }

  // The run directory is what ties a run to its source, so the register says
  // which source these entries belong to rather than the command line guessing.
  const registerFile = repoPath('intake', 'register.yaml');
  const sources = loadYaml<{ sources?: SourceEntry[] }>(registerFile).sources ?? [];
  const source = sources.find((entry) => entry.run === runPath);
  if (!source) {
    console.error(
      `intake-register: no source in intake/register.yaml has run: ${runPath}\n` +
        '  Add the source entry first; the candidates point at it by id.',
    );
    process.exit(1);
  }

  const recorded = new Date().toISOString().slice(0, 10);
  const { entries, untriaged } = registerEntries(merged, triage, source, recorded);

  for (const id of untriaged) {
    console.error(`intake-register: ${id} has no triage decision — recorded as pre-triage`);
  }

  process.stdout.write(`${toYamlBlock(entries)}\n`);
  console.error(`\nintake-register: ${entries.length} entries from ${runPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
