/**
 * A completed intake run, as register entries.
 *
 *   npx tsx scripts/intake-register.ts reviews/intake/<slug>
 *
 * Reads `merged.json`, `groups.json` and, when it is there,
 * `triage-stories.json` from the run directory, matches the run to its
 * `sources` entry in `intake/register.yaml`, and prints the two YAML blocks to
 * paste under `investigations:` and under `candidates:`. It prints; it does not
 * write. The register is a public record and a script that edits it in place is
 * a script that can quietly rewrite one.
 *
 * A hundred-odd propositions is where hand-copying starts producing a register
 * that disagrees with the run it came from — a quote off by a word, a comment
 * index off by one — and the whole promise of whole-source intake is that the
 * two agree. So the copying is mechanical and the validator checks the result.
 *
 * The register has two levels and they are printed separately because they
 * paste under two different keys. Triage rules on the question, so an
 * investigation carries the outcome and its reason; a claim belongs to one
 * investigation, gets one finding, and carries no outcome at all.
 *
 * The account counts are the one thing here that is derived rather than copied.
 * A claim's count is the accounts that gave it a form; an investigation's are
 * those counts unioned across its claims, per side and overall. An account that
 * argued both ways is counted on both sides, so the sides can sum to more than
 * the total.
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

export interface Proposition {
  id: string;
  proposition: string;
  side: string;
  relation: Relation;
  names_person?: boolean;
  from?: Record<string, string[]>;
  forms?: MergedForm[];
}

export interface Merged {
  propositions: Proposition[];
  dropped?: Array<{ seat: string; id: string; reason: string }>;
}

/** A claim in `groups.json`: one assertion, as one or more propositions. */
export interface Claim {
  id: string;
  proposition: string;
  variations: string[];
}

export interface Story {
  id: string;
  question: string;
  note?: string;
  claims: Claim[];
}

export interface Groups {
  stories: Story[];
}

/** `triage-stories.json`: one decision per investigation, not per claim. */
export interface Triage {
  decisions: Array<{ id: string; outcome: string; reason?: string }>;
}

interface SourceEntry {
  id: string;
  run?: string;
  captured?: string;
}

// ---------------------------------------------------------------------------
// The shapes in the register
// ---------------------------------------------------------------------------

/** Distinct accounts on a question: the union, then each side of it. */
export interface Accounts {
  total: number;
  for?: number;
  against?: number;
  neither?: number;
}

/** An investigation entry, with the keys in the order the register writes them. */
export interface InvestigationEntry {
  id: string;
  recorded: string;
  source: string;
  question: string;
  outcome: string;
  reason?: string;
  grouping_note?: string;
  accounts: Accounts;
  run: string;
}

/** A claim entry, with the keys in the order the register writes them. */
export interface ClaimEntry {
  id: string;
  recorded: string;
  origin: 'captured';
  source: string;
  investigation: string;
  proposition: string;
  wording: string;
  side: string;
  variation_of?: string;
  accounts: number;
  variations?: string[];
  seats?: string[];
  names_person?: true;
  forms?: Array<{ commenter: string; quote: string; comment: number }>;
}

/** The sides, in the order the register prints them. */
const SIDES = ['for', 'against', 'neither'] as const;

// ---------------------------------------------------------------------------
// The conversion
// ---------------------------------------------------------------------------

/**
 * The already-registered entry this claim is the same claim as, when the merge
 * named one.
 *
 * Only when it points out of the run. Inside the run, sameness is what the
 * grouping expresses — two propositions in one claim — so a relation naming
 * another proposition of the same merge is either that grouping restated or the
 * grouping overruled, and either way it is not a register id. The merge also
 * writes the occasional relation pointing a proposition at itself, which this
 * drops for the same reason.
 */
const variationOf = (
  relation: Relation,
  propositions: ReadonlyMap<string, Proposition>,
): string | undefined => {
  const target =
    typeof relation === 'object' && relation !== null ? relation['variation-of'] : undefined;
  return target !== undefined && !propositions.has(target) ? target : undefined;
};

/**
 * The seats that found the claim, sorted.
 *
 * A claim can hold several propositions and the merge listed each one's seats
 * in its own order, so an order taken from the first would depend on which
 * proposition the grouping happened to put first. Sorted is the same list
 * however the grouping is written.
 */
function seatsOf(propositions: Proposition[]): string[] | undefined {
  const seats = new Set(propositions.flatMap((p) => Object.keys(p.from ?? {})));
  return seats.size > 0 ? [...seats].sort() : undefined;
}

/**
 * Every captured wording under the claim, in the order the merge wrote them,
 * without repeats.
 *
 * Two propositions folded into one claim can cite the same words in the same
 * comment, and printing that twice would show a reader one person saying a
 * thing twice. The same words in two different comments are two people, or one
 * person twice, and both stay.
 */
function formsOf(propositions: Proposition[]): ClaimEntry['forms'] {
  const seen = new Set<string>();
  const forms: NonNullable<ClaimEntry['forms']> = [];
  for (const proposition of propositions) {
    for (const form of proposition.forms ?? []) {
      const key = `${form.index} ${form.quote}`;
      if (seen.has(key)) continue;
      seen.add(key);
      forms.push({ commenter: form.commenter, quote: form.quote, comment: form.index });
    }
  }
  return forms.length > 0 ? forms : undefined;
}

/** The distinct accounts that gave any of these propositions a form. */
function accountsOf(propositions: Proposition[]): Set<string> {
  return new Set(
    propositions.flatMap((p) => (p.forms ?? []).map((form) => form.commenter)),
  );
}

/** Undefined keys would print as `null`, and an optional field means absent. */
function pruned<T extends object>(entry: T): T {
  for (const key of Object.keys(entry) as Array<keyof T>) {
    if (entry[key] === undefined) delete entry[key];
  }
  return entry;
}

/**
 * One run's investigations and claims as register entries, in `groups.json`'s
 * order.
 *
 * `triage` is undefined when the run has not been triaged, which makes every
 * investigation `not-triaged` — an outcome the register's validator rejects on
 * an investigation, deliberately: an untriaged run is working, not a record.
 */
export function registerEntries(
  merged: Merged,
  groups: Groups,
  triage: Triage | undefined,
  source: SourceEntry,
  recorded: string,
): { investigations: InvestigationEntry[]; claims: ClaimEntry[]; untriaged: string[] } {
  const propositions = new Map(merged.propositions.map((p) => [p.id, p]));
  const decisions = new Map((triage?.decisions ?? []).map((d) => [d.id, d]));
  const untriaged: string[] = [];
  const investigations: InvestigationEntry[] = [];
  const claims: ClaimEntry[] = [];
  const run = source.run ?? '';

  for (const story of groups.stories) {
    const bySide = new Map<string, Set<string>>();
    const total = new Set<string>();

    for (const claim of story.claims ?? []) {
      const variations = (claim.variations ?? []).map((id) => {
        const proposition = propositions.get(id);
        if (!proposition) {
          throw new Error(
            `claim ${claim.id} cites ${id}, which is not in merged.json — ` +
              'run scripts/intake-groups.ts first',
          );
        }
        return proposition;
      });
      const canonical = variations[0];
      if (!canonical) throw new Error(`claim ${claim.id} has no variations`);

      const accounts = accountsOf(variations);
      for (const account of accounts) {
        total.add(account);
        const side = bySide.get(canonical.side) ?? new Set<string>();
        side.add(account);
        bySide.set(canonical.side, side);
      }

      const forms = formsOf(variations);
      claims.push(
        pruned<ClaimEntry>({
          id: claim.id,
          recorded,
          origin: 'captured',
          source: source.id,
          investigation: story.id,
          proposition: canonical.proposition,
          // The words somebody actually typed, kept beside the merge's plain
          // sentence. The merge lists the form it built the proposition from
          // first, and the longest is as often a rebuttal as an assertion.
          wording: forms?.[0]?.quote ?? canonical.proposition,
          side: canonical.side,
          variation_of: variationOf(canonical.relation, propositions),
          accounts: accounts.size,
          // Only when there is more than one: a claim of one proposition would
          // otherwise list its own wording as a variation of itself.
          variations:
            variations.length > 1 ? variations.slice(1).map((p) => p.proposition) : undefined,
          seats: seatsOf(variations),
          names_person: variations.some((p) => p.names_person === true) ? true : undefined,
          forms,
        }),
      );
    }

    const decision = decisions.get(story.id);
    if (triage !== undefined && decision === undefined) untriaged.push(story.id);

    const accounts: Accounts = { total: total.size };
    for (const side of SIDES) {
      const counted = bySide.get(side);
      if (counted !== undefined && counted.size > 0) accounts[side] = counted.size;
    }

    investigations.push(
      pruned<InvestigationEntry>({
        id: story.id,
        recorded,
        source: source.id,
        question: story.question,
        outcome: decision?.outcome ?? 'not-triaged',
        reason: decision?.reason,
        grouping_note: story.note,
        accounts,
        run,
      }),
    );
  }

  return { investigations, claims, untriaged };
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

/**
 * The fields the register writes in double quotes: the prose and the dates.
 *
 * Ids, sides, outcomes and seats are plain, so a diff of a regenerated block
 * against the committed register is a diff of content and not of style. Dates
 * are quoted because bare `2026-09-03` parses back as a timestamp.
 */
const QUOTED = new Set([
  'recorded',
  'question',
  'reason',
  'grouping_note',
  'proposition',
  'wording',
  'variations',
  'commenter',
  'quote',
]);

/** The entries as a YAML block, indented to sit under a top-level key. */
export function toYamlBlock(entries: object[]): string {
  const doc = new YAML.Document(entries);
  YAML.visit(doc, {
    Pair(_index, pair) {
      if (!YAML.isScalar(pair.key) || !QUOTED.has(String(pair.key.value))) return;
      const values = YAML.isSeq(pair.value) ? pair.value.items : [pair.value];
      for (const value of values) {
        if (YAML.isScalar(value) && typeof value.value === 'string') {
          value.type = 'QUOTE_DOUBLE';
        }
      }
    },
  });
  return doc
    .toString({ lineWidth: 0 })
    .split('\n')
    .map((line) => (line === '' ? line : `  ${line}`))
    .join('\n');
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(file, 'utf8')) as T;
}

function main(): void {
  const arg = process.argv[2];
  if (!arg) {
    console.error('usage: npx tsx scripts/intake-register.ts reviews/intake/<slug>');
    process.exit(1);
  }
  const dir = path.isAbsolute(arg) ? arg : path.join(REPO_ROOT, arg);
  const runPath = relative(dir);

  for (const name of ['merged.json', 'groups.json']) {
    if (!existsSync(path.join(dir, name))) {
      console.error(`intake-register: no ${name} in ${runPath}`);
      process.exit(1);
    }
  }
  const merged = readJson<Merged>(path.join(dir, 'merged.json'));
  const groups = readJson<Groups>(path.join(dir, 'groups.json'));

  const triageFile = path.join(dir, 'triage-stories.json');
  const triage = existsSync(triageFile) ? readJson<Triage>(triageFile) : undefined;
  if (triage === undefined) {
    console.error(
      `intake-register: no triage-stories.json in ${runPath} — ` +
        'every investigation is outcome: not-triaged',
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
        '  Add the source entry first; the entries point at it by id.',
    );
    process.exit(1);
  }

  const recorded = new Date().toISOString().slice(0, 10);
  const { investigations, claims, untriaged } = registerEntries(
    merged,
    groups,
    triage,
    source,
    recorded,
  );

  for (const id of untriaged) {
    console.error(`intake-register: ${id} has no triage decision — recorded as not-triaged`);
  }

  // Two blocks, because they paste under two different keys. The markers are
  // YAML comments, so stdout stays a thing you can paste.
  process.stdout.write('# ----- paste under `investigations:` -----\n');
  process.stdout.write(`${toYamlBlock(investigations)}\n`);
  process.stdout.write('# ----- paste under `candidates:` -----\n');
  process.stdout.write(`${toYamlBlock(claims)}\n`);

  console.error(
    `\nintake-register: ${investigations.length} investigations, ${claims.length} claims from ${runPath}`,
  );
}

if (import.meta.url === `file://${process.argv[1]}`) main();
