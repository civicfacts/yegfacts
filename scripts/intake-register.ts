/**
 * A completed intake run, as register entries.
 *
 *   npx tsx scripts/intake-register.ts reviews/intake/<slug>
 *
 * Reads `merged.json`, `groups.json` and, when it is there,
 * `triage-stories.json` from the run directory, matches the run to its
 * `sources` entry in `intake/register.yaml`, and prints the two YAML blocks to
 * paste under `questions:` and under `claims:`. It prints; it does not write.
 * The register is a public record and a script that edits it in place is a
 * script that can quietly rewrite one.
 *
 * A hundred-odd claims is where hand-copying starts producing a register that
 * disagrees with the run it came from — a wording off by a word, a pseudonym
 * mistyped — and the whole promise of whole-source intake is that the two
 * agree. So the copying is mechanical and the validator checks the result.
 *
 * The register has two levels and they are printed separately because they
 * paste under two different keys. Triage rules on the question, so a question
 * carries the three state fields; a claim belongs to one question, gets one
 * finding, and carries no state at all.
 *
 * The account counts are the one thing here that is derived rather than copied.
 * A claim's count is the people who gave it a wording; a question's are those
 * counts unioned across its claims, per side and overall. Somebody who argued
 * both ways is counted on both sides, so the sides can sum to more than the
 * total.
 *
 * The run's own JSON keeps the words it was written with where they still fit,
 * and this reads both spellings: a run merged before D-0029 says `propositions`
 * and `stories`, one merged after says `claims` and `questions`. Dropping the
 * old names would make every archived run unreproducible, which is the one
 * thing this script exists to prevent.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { REPO_ROOT, loadYaml, relative, repoPath } from './lib/repo.ts';

// ---------------------------------------------------------------------------
// The shapes on disk
// ---------------------------------------------------------------------------

interface MergedForm {
  index: number;
  commenter: string;
  quote: string;
  seats?: string[];
}

/** One merged claim in `merged.json`, with every wording it was said in. */
export interface MergedClaim {
  id: string;
  /** `claim` since D-0029; `proposition` in runs merged before it. */
  claim?: string;
  proposition?: string;
  side: string;
  names_person?: boolean;
  from?: Record<string, string[]>;
  forms?: MergedForm[];
}

export interface Merged {
  claims?: MergedClaim[];
  propositions?: MergedClaim[];
  dropped?: Array<{ seat: string; id: string; reason: string }>;
}

/** A claim in `groups.json`: one assertion, as one or more merged claims. */
export interface GroupedClaim {
  id: string;
  claim?: string;
  proposition?: string;
  /** `merged_from` since D-0029; `variations` in runs grouped before it. */
  merged_from?: string[];
  variations?: string[];
}

export interface GroupedQuestion {
  id: string;
  question: string;
  note?: string;
  claims: GroupedClaim[];
}

export interface Groups {
  questions?: GroupedQuestion[];
  stories?: GroupedQuestion[];
}

/** `triage-stories.json`: one decision per question, not per claim. */
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

/** A question entry, with the keys in the order the register writes them. */
export interface QuestionEntry {
  id: string;
  recorded: string;
  source: string;
  question: string;
  /**
   * Registered and nothing more: the run has been grouped and triaged, no brief
   * has been written, and nothing is on the site. `triage` is left off when the
   * run has no decision for the question, which the validator rejects — an
   * untriaged run is working, not a record.
   */
  lifecycle: 'registered';
  triage?: string;
  publication: 'unpublished';
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
  question: string;
  proposition: string;
  wording: string;
  side: string;
  accounts: number;
  seats?: string[];
  names_person?: true;
  variations?: Array<{ wording: string; source_id: string; author_name: string }>;
}

/** The sides, in the order the register prints them. */
const SIDES = ['for', 'against', 'neither'] as const;

// ---------------------------------------------------------------------------
// The conversion
// ---------------------------------------------------------------------------

/** Old outcome to new triage answer. Triage has three values and only three. */
const TRIAGE: Record<string, string> = { GO: 'go', PARK: 'park', NO: 'no' };

/** The run's own key, whichever spelling it was written with. */
const mergedClaims = (merged: Merged): MergedClaim[] =>
  merged.claims ?? merged.propositions ?? [];

const groupedQuestions = (groups: Groups): GroupedQuestion[] =>
  groups.questions ?? groups.stories ?? [];

const wording = (claim: MergedClaim | GroupedClaim): string =>
  claim.claim ?? claim.proposition ?? '';

const mergedFrom = (claim: GroupedClaim): string[] => claim.merged_from ?? claim.variations ?? [];

/**
 * The seats that found the claim, sorted.
 *
 * A claim can fold in several merged claims and the merge listed each one's
 * seats in its own order, so an order taken from the first would depend on
 * which the grouping happened to put first. Sorted is the same list however the
 * grouping is written.
 */
function seatsOf(merged: MergedClaim[]): string[] | undefined {
  const seats = new Set(merged.flatMap((claim) => Object.keys(claim.from ?? {})));
  return seats.size > 0 ? [...seats].sort() : undefined;
}

/**
 * Every captured wording under the claim, in the order the merge wrote them,
 * without repeats.
 *
 * Two merged claims folded into one can cite the same words in the same
 * comment, and printing that twice would show a reader one person saying a
 * thing twice. The register keeps no comment index, so the key is the words and
 * the person: the same sentence typed by two people is two wordings, and the
 * same sentence typed twice by one person is one.
 */
function variationsOf(merged: MergedClaim[], sourceId: string): ClaimEntry['variations'] {
  const seen = new Set<string>();
  const variations: NonNullable<ClaimEntry['variations']> = [];
  for (const claim of merged) {
    for (const form of claim.forms ?? []) {
      const key = `${form.commenter} ${form.quote}`;
      if (seen.has(key)) continue;
      seen.add(key);
      variations.push({ wording: form.quote, source_id: sourceId, author_name: form.commenter });
    }
  }
  return variations.length > 0 ? variations : undefined;
}

/** The distinct people who gave any of these merged claims a wording. */
function accountsOf(merged: MergedClaim[]): Set<string> {
  return new Set(merged.flatMap((claim) => (claim.forms ?? []).map((form) => form.commenter)));
}

/** Undefined keys would print as `null`, and an optional field means absent. */
function pruned<T extends object>(entry: T): T {
  for (const key of Object.keys(entry) as Array<keyof T>) {
    if (entry[key] === undefined) delete entry[key];
  }
  return entry;
}

/**
 * One run's questions and claims as register entries, in `groups.json`'s order.
 *
 * A question with no triage decision comes out with no `triage` field at all,
 * which the register's validator rejects — deliberately: an untriaged run is
 * working, not a record. Lifecycle and publication are fixed here because a
 * freshly registered question is exactly that and nothing more; anything later
 * is a state change somebody has to make on purpose.
 */
export function registerEntries(
  merged: Merged,
  groups: Groups,
  triage: Triage | undefined,
  source: SourceEntry,
  recorded: string,
): { questions: QuestionEntry[]; claims: ClaimEntry[]; untriaged: string[] } {
  const byId = new Map(mergedClaims(merged).map((claim) => [claim.id, claim]));
  const decisions = new Map((triage?.decisions ?? []).map((d) => [d.id, d]));
  const untriaged: string[] = [];
  const questions: QuestionEntry[] = [];
  const claims: ClaimEntry[] = [];
  const run = source.run ?? '';

  for (const group of groupedQuestions(groups)) {
    const bySide = new Map<string, Set<string>>();
    const total = new Set<string>();

    for (const grouped of group.claims ?? []) {
      const parts = mergedFrom(grouped).map((id) => {
        const found = byId.get(id);
        if (!found) {
          throw new Error(
            `claim ${grouped.id} cites ${id}, which is not in merged.json — ` +
              'run scripts/intake-groups.ts first',
          );
        }
        return found;
      });
      const canonical = parts[0];
      if (!canonical) throw new Error(`claim ${grouped.id} folds in nothing`);

      const accounts = accountsOf(parts);
      for (const account of accounts) {
        total.add(account);
        const side = bySide.get(canonical.side) ?? new Set<string>();
        side.add(account);
        bySide.set(canonical.side, side);
      }

      const variations = variationsOf(parts, source.id);
      claims.push(
        pruned<ClaimEntry>({
          id: grouped.id,
          recorded,
          origin: 'captured',
          source: source.id,
          question: group.id,
          proposition: wording(canonical),
          // The words somebody actually typed, kept beside the merge's plain
          // sentence. The merge lists the wording it built the claim from
          // first, and the longest is as often a rebuttal as an assertion.
          wording: variations?.[0]?.wording ?? wording(canonical),
          side: canonical.side,
          accounts: accounts.size,
          seats: seatsOf(parts),
          names_person: parts.some((part) => part.names_person === true) ? true : undefined,
          variations,
        }),
      );
    }

    const decision = decisions.get(group.id);
    if (triage !== undefined && decision === undefined) untriaged.push(group.id);

    const accounts: Accounts = { total: total.size };
    for (const side of SIDES) {
      const counted = bySide.get(side);
      if (counted !== undefined && counted.size > 0) accounts[side] = counted.size;
    }

    questions.push(
      pruned<QuestionEntry>({
        id: group.id,
        recorded,
        source: source.id,
        question: group.question,
        lifecycle: 'registered',
        triage: decision === undefined ? undefined : (TRIAGE[decision.outcome] ?? decision.outcome),
        publication: 'unpublished',
        reason: decision?.reason,
        grouping_note: group.note,
        accounts,
        run,
      }),
    );
  }

  return { questions, claims, untriaged };
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

/**
 * The fields the register writes in double quotes: the prose and the dates.
 *
 * Ids, sides, states and seats are plain, so a diff of a regenerated block
 * against the committed register is a diff of content and not of style. Dates
 * are quoted because bare `2026-09-03` parses back as a timestamp. `question`
 * is passed in per block rather than listed here, because it is prose on a
 * question and a slug on a claim.
 */
const QUOTED = new Set([
  'recorded',
  'reason',
  'grouping_note',
  'proposition',
  'wording',
  'author_name',
]);

/** The entries as a YAML block, indented to sit under a top-level key. */
export function toYamlBlock(entries: object[], ...also: string[]): string {
  const quoted = new Set([...QUOTED, ...also]);
  const doc = new YAML.Document(entries);
  YAML.visit(doc, {
    Pair(_index, pair) {
      if (!YAML.isScalar(pair.key) || !quoted.has(String(pair.key.value))) return;
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
        'every question comes out with no triage answer at all',
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
  const { questions, claims, untriaged } = registerEntries(
    merged,
    groups,
    triage,
    source,
    recorded,
  );

  for (const id of untriaged) {
    console.error(`intake-register: ${id} has no triage decision — printed with no triage answer`);
  }

  // Two blocks, because they paste under two different keys. The markers are
  // YAML comments, so stdout stays a thing you can paste.
  process.stdout.write('# ----- paste under `questions:` -----\n');
  process.stdout.write(`${toYamlBlock(questions, 'question')}\n`);
  process.stdout.write('# ----- paste under `claims:` -----\n');
  process.stdout.write(`${toYamlBlock(claims)}\n`);

  console.error(
    `\nintake-register: ${questions.length} questions, ${claims.length} claims from ${runPath}`,
  );
}

if (import.meta.url === `file://${process.argv[1]}`) main();
