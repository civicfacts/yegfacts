/**
 * One-shot migration of `intake/register.yaml` to the shape D-0029 fixes.
 *
 *   npx tsx scripts/migrate-register-questions.ts
 *
 * The register is the site's public record, so the rewrite that renames its
 * halves is a script rather than an editing session: it is auditable, and it is
 * repeatable. Running it on an already-migrated file does nothing, because the
 * key it reads from is the one it renamed away.
 *
 * What changes, and why:
 *
 * - `investigations:` becomes `questions:`. The word the site says everywhere is
 *   "question"; "investigation" was a second name for the same thing.
 * - `candidates:` becomes `claims:`, because a claim is the unit of judgement
 *   and "candidate" described a queue we no longer keep.
 * - One `outcome` becomes three fields — `lifecycle`, `triage`, `publication`.
 *   A question that is registered, going ahead and unpublished was previously
 *   describable only as "GO", which said nothing about how far it had got.
 * - A claim's `forms` become `variations`, `{ wording, source_id, author_name }`.
 *   The comment index goes: the quote check widens from "the words of comment N"
 *   to "the words of some comment in this source", which survives a re-export.
 * - `variation_of` goes entirely. Deduplication means one claim recording
 *   several wordings, never a second claim pointing at a first. The rows the
 *   whole-source grouping superseded are deleted here and redirected in
 *   `redirects.yaml`; the one pointing at a published claim hands its wordings
 *   over through `register_claims` on that claim's own file.
 * - The propositions the merge set aside as not factual claims move onto the
 *   source, where the completeness promise lives. They were invisible.
 * - The seven rows registered one at a time, before whole-source intake, become
 *   questions: each is one triage decision on one unit of work, which is what a
 *   question is. Their verbatim wording is kept as `registered_as`.
 *
 * Terminology note: the old `triage:` field was a path to a triage report, and
 * `triage` is now a state. The path is `triage_report`.
 */
import { writeFileSync } from 'node:fs';
import YAML from 'yaml';
import { loadYaml, readText, repoPath } from './lib/repo.ts';

type Row = Record<string, unknown>;

// ---------------------------------------------------------------------------
// The decisions this migration encodes
// ---------------------------------------------------------------------------

/** Old outcome to new triage answer. Triage has three values and only three. */
const TRIAGE: Record<string, string> = { GO: 'go', PARK: 'park', NO: 'no' };

/**
 * The rows the whole-source grouping superseded, and where a reader goes now.
 *
 * Every one was registered by hand before the Yegscoop source was read end to
 * end, and every one is now several claims inside a question, grouped from the
 * capture rather than picked out of it. Deleting them loses nothing but the
 * address, and `redirects.yaml` keeps the address.
 */
const SUPERSEDED = new Set([
  'at-100m-a-year',
  'at-congestion-reduced',
  'bike-lanes-nobody-rides',
  'bike-100m-one-percent-of-roads',
  'fifty-street-181m-600m',
  'rice-50m-motions-and-review',
  // These two are the same relation written the other way round: rows carrying
  // `outcome: variation`, an outcome that leaves the vocabulary with the word.
  'lanes-removed-citywide',
  'fifteen-minute-city-agreement',
]);

/**
 * The rows registered one at a time, as questions.
 *
 * Each one is a triage decision on one unit of work with its own triage report,
 * which is a question in everything but the name it was filed under. The
 * question text is the only prose this migration writes, and it is written from
 * the row's own wording, which is kept beside it as `registered_as` so nothing
 * a reader could see before disappears.
 */
const LEGACY_QUESTIONS: Record<
  string,
  { question: string; lifecycle: string; triage: string; publication: string }
> = {
  'infill-teardown-350k-1m': {
    question: 'What happens to the price of an Edmonton house when it is torn down and replaced?',
    // It went through three panel runs and a gate, was published, and was taken
    // off the findings board under methodology v1.13. Three fields say that;
    // `not-answered` said only the last part.
    lifecycle: 'gate-complete',
    triage: 'go',
    publication: 'withdrawn',
  },
  'low-density-century': {
    question:
      'How long has Edmonton had low-density housing, and were its neighbourhoods planned around it?',
    // Briefed and run; the run stopped in round one because a reviewer seat
    // never returned, so nothing was ever published.
    lifecycle: 'briefed',
    triage: 'go',
    publication: 'unpublished',
  },
  'infill-teardown-more-affordable': {
    question: 'Were the houses torn down for infill more affordable than what replaced them?',
    lifecycle: 'registered',
    triage: 'park',
    publication: 'unpublished',
  },
  'infill-luxury': {
    question: 'Is new infill housing in Edmonton luxury housing?',
    lifecycle: 'registered',
    triage: 'no',
    publication: 'unpublished',
  },
  'infill-not-affordable-median-household': {
    question: 'Can a median-income Edmonton household afford new infill housing?',
    lifecycle: 'registered',
    triage: 'park',
    publication: 'unpublished',
  },
  'earth-flat': {
    question: 'Is the Earth flat?',
    lifecycle: 'registered',
    triage: 'no',
    publication: 'unpublished',
  },
  'oilers-held-back': {
    question:
      'Are the Edmonton Oilers held back by the NHL because their market is smaller and more loyal?',
    lifecycle: 'registered',
    triage: 'no',
    publication: 'unpublished',
  },
};

// ---------------------------------------------------------------------------
// The pieces
// ---------------------------------------------------------------------------

interface MergedForm {
  index: number;
  commenter: string;
  quote: string;
}

interface Merged {
  propositions: Array<{ id: string; forms?: MergedForm[] }>;
  dropped?: Array<{ seat: string; id: string; reason: string }>;
}

/** Undefined keys would print as `null`, and an optional field means absent. */
function pruned<T extends Row>(row: T): T {
  for (const key of Object.keys(row)) if (row[key] === undefined) delete row[key];
  return row;
}

/**
 * The propositions the merge set aside as not factual claims, with the wording
 * the seat that raised them gave.
 *
 * The `dropped` list names an extractor's id and a reason; the wording is in
 * that seat's own extraction. Only the "not a claim" drops move: the rest are a
 * seat's duplicate of its own quote, which is a bookkeeping fact about the
 * merge and not something the source set aside.
 */
function setAside(run: string): Array<{ wording: string; reason: string }> {
  const merged = JSON.parse(readText(repoPath(run, 'merged.json'))) as Merged;
  const extractions = new Map<string, Map<string, string>>();
  const wordings = (seat: string): Map<string, string> => {
    const cached = extractions.get(seat);
    if (cached) return cached;
    const file = JSON.parse(readText(repoPath(run, `extract-${seat}.json`))) as {
      claims: Array<{ id: string; proposition: string }>;
    };
    const map = new Map(file.claims.map((claim) => [claim.id, claim.proposition]));
    extractions.set(seat, map);
    return map;
  };

  return (merged.dropped ?? [])
    .filter((entry) => entry.reason.startsWith('not a claim'))
    .map((entry) => {
      const wording = wordings(entry.seat).get(entry.id);
      if (wording === undefined) {
        throw new Error(`dropped ${entry.seat}/${entry.id} has no wording in its extraction`);
      }
      return { wording, reason: entry.reason };
    });
}

/**
 * `forms` as `variations`. The comment index is dropped; the person is not.
 *
 * Dropping the index makes two forms the same wording where they used to be
 * two, and they have to collapse: one commenter pasting the same sentence into
 * six replies is one wording, and printing it six times under one name would
 * misrepresent the thread. The same sentence typed by two people stays two.
 */
function variations(row: Row, sourceId: string | undefined) {
  const forms = Array.isArray(row.forms) ? (row.forms as Row[]) : undefined;
  if (forms === undefined || sourceId === undefined) return undefined;
  const seen = new Set<string>();
  const kept: Array<{ wording: string; source_id: string; author_name: string }> = [];
  for (const form of forms) {
    const wording = String(form.quote ?? '');
    const author_name = String(form.commenter ?? '');
    const key = `${author_name} ${wording}`;
    if (seen.has(key)) continue;
    seen.add(key);
    kept.push({ wording, source_id: sourceId, author_name });
  }
  return kept;
}

/** A question out of the run: the three state fields in place of one outcome. */
function question(row: Row): Row {
  const outcome = String(row.outcome ?? '');
  const triage = TRIAGE[outcome];
  if (triage === undefined) throw new Error(`question ${String(row.id)}: no triage for ${outcome}`);
  return pruned({
    id: row.id,
    recorded: row.recorded,
    source: row.source,
    question: row.question,
    // Every question in the register today was grouped and triaged and nothing
    // more, so the lifecycle is where every one of them actually is.
    lifecycle: 'registered',
    triage,
    publication: 'unpublished',
    reason: row.reason,
    grouping_note: row.grouping_note,
    accounts: row.accounts,
    run: row.run,
  });
}

/** A row registered on its own, as the question it always was. */
function legacyQuestion(row: Row): Row {
  const state = LEGACY_QUESTIONS[String(row.id)]!;
  return pruned({
    id: row.id,
    recorded: row.recorded,
    question: state.question,
    lifecycle: state.lifecycle,
    triage: state.triage,
    publication: state.publication,
    registered_as: row.wording,
    origin: row.origin,
    supplied_by: row.supplied_by,
    context: row.context,
    reason: row.reason,
    story: row.story,
    triage_report: row.triage,
    intake: row.intake,
    note: row.note,
  });
}

/** A claim under a question. No state of its own but the one decline. */
function claim(row: Row): Row {
  const sourceId = row.source === undefined ? undefined : String(row.source);
  const declined = row.ground === 'right-of-reply';
  // Key order matches what `scripts/intake-register.ts` prints, so a
  // regenerated block diffs against the committed register as content rather
  // than as style.
  return pruned({
    id: row.id,
    recorded: row.recorded,
    origin: row.origin,
    source: row.source,
    question: row.investigation,
    proposition: row.proposition,
    wording: row.wording,
    side: row.side,
    accounts: row.accounts,
    seats: row.seats,
    names_person: row.names_person,
    // The one override: an accusation against a named person is declined even
    // where the question around it goes ahead. The generator cannot produce
    // this row — the merge holds the allegation and the name — so it is the one
    // place the register and a regenerated block legitimately differ.
    triage: declined ? 'no' : undefined,
    ground: declined ? 'right-of-reply' : undefined,
    reason: row.reason,
    variations: variations(row, sourceId),
  });
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

/**
 * The prose and the dates are quoted; ids, states and seats are not, so a diff
 * of a regenerated block against the committed register is a diff of content.
 *
 * `question` is not on the list because it is two different fields: the text a
 * question asks, which is prose, and the id a claim names, which is a slug. The
 * questions block adds it.
 */
const QUOTED = new Set([
  'recorded',
  'captured',
  'reason',
  'grouping_note',
  'proposition',
  'wording',
  'registered_as',
  'title',
  'url',
  'context',
  'supplied_by',
  'note',
  'author_name',
]);

function toYaml(value: unknown, ...also: string[]): string {
  const quoted = new Set([...QUOTED, ...also]);
  const doc = new YAML.Document(value);
  YAML.visit(doc, {
    Pair(_index, pair) {
      if (!YAML.isScalar(pair.key) || !quoted.has(String(pair.key.value))) return;
      const values = YAML.isSeq(pair.value) ? pair.value.items : [pair.value];
      for (const item of values) {
        if (YAML.isScalar(item) && typeof item.value === 'string') item.type = 'QUOTE_DOUBLE';
      }
    },
  });
  return doc.toString({ lineWidth: 0 });
}

/**
 * The comment the migrated register opens with.
 *
 * It is written here rather than carried across because every word of the old
 * one described the vocabulary D-0029 retired. It documents the file for anyone
 * who opens it, which is the point: the register is published.
 */
const HEADER = `# The register (methodology v1.12, regrouped under v1.16, remodelled under D-0029).
#
# Every question the site has considered, every claim inside one, and every
# source they came out of. Nothing that reached this file leaves it: a question
# that was declined keeps its row and its reason, and a proposition the merge
# set aside as not a factual claim is listed under the source it came from.
#
# Three keys, in this order:
#
#   questions:  THE UNIT OF WORK. One brief, one panel run, one gate audit.
#               Carries the article and several claims, and has a permanent
#               address from the day it is registered.
#   sources:    a capture, read end to end. Its entry is the completeness
#               record: what came out of it, and what was set aside.
#   claims:     THE UNIT OF JUDGEMENT. Exactly one finding each. A claim
#               belongs to exactly one question and carries no state of its own.
#
# State lives on the question, in three fields, never one:
#
#   lifecycle    registered | briefed | panel-complete | gate-complete
#   triage       go | park | no
#   publication  unpublished | published | corrected | withdrawn
#
# Triage has three values and only three: they are the answers to "should we
# spend an investigation on this". How far the work has got is the lifecycle,
# and whether readers can see it is the publication.
#
# A question's fields
# ------------------
#
# source:         the id of the \`sources\` entry it came out of. Absent on the
#                 seven questions registered one at a time, before whole-source
#                 intake existed.
# run:            repo-relative directory holding the grouping and the triage.
# question:       what the brief asks, as a reader would type it.
# reason:         one public sentence saying why triage answered as it did.
#                 Required on park and no — the register is published, so a
#                 declined question never sits here unexplained.
# grouping_note:  why these claims are one question, when that needs saying.
# accounts:       distinct people in the source who took part in the question,
#                 with the for/against/neither split. One pseudonym is one
#                 person within a source; no page sums across sources. The
#                 split is what the validator checks the total against.
# registered_as:  the verbatim wording a hand-registered question was filed
#                 under, before the register had claims.
# triage_report:  repo-relative path to the triage report. (\`triage\` is a state
#                 now, so the path took a different name.)
#
# A claim's fields
# ---------------
#
# question:     the id of the \`questions\` entry it is checked under.
# proposition:  what would have to be true, in one plain sentence. This is what
#               the site shows as the claim.
# wording:      the representative captured quote, verbatim.
# side:         for | against | neither — which side of the source's argument
#               the claim serves.
# accounts:     how many distinct people argued it, either way. Somebody counted
#               here may have been arguing against it, which is why the site
#               says a claim was discussed by so many and never that it was
#               agreed.
# variations:   every captured wording of the claim, each
#               { wording, source_id, author_name }. \`author_name\` is the
#               source's stable pseudonym and never a real name. The validator
#               checks each wording is an exact substring of some comment in
#               that source's capture, and each author_name against the
#               commenter labels in it, so a wording attributed to a person is
#               that person's words.
# seats:        which extractor seats found it.
# triage/ground: a claim carries no state, with one exception. An accusation
#               against a named person is declined even inside a question that
#               is going ahead, because the site has no way to put it to them.
#               That is \`triage: no\` with \`ground: right-of-reply\`, and such a
#               claim carries no proposition, wording or variations at all.
# names_person: the claim names an identifiable individual.
#
# A source's fields
# ----------------
#
# set_aside:    the propositions the merge set aside as not factual claims —
#               opinion, prediction, value judgement — with the reason. The
#               completeness promise lives on the source, so they live here.
#
# Questions and claims are generated from a completed run rather than typed:
#
#   npx tsx scripts/intake-register.ts reviews/intake/<slug>
`;

function main(): void {
  const file = repoPath('intake', 'register.yaml');
  const parsed = loadYaml<Row>(file);
  const rows = (key: string): Row[] => (Array.isArray(parsed[key]) ? (parsed[key] as Row[]) : []);

  const existing = rows('investigations');
  if (existing.length === 0) {
    console.error('migrate-register-questions: nothing to do — no `investigations` key');
    process.exit(0);
  }

  const candidates = rows('candidates').filter((row) => !SUPERSEDED.has(String(row.id)));
  const questions = [
    ...existing.map(question),
    ...candidates.filter((row) => row.investigation === undefined).map(legacyQuestion),
  ];
  const claims = candidates.filter((row) => row.investigation !== undefined).map(claim);

  const sources = rows('sources').map((row) =>
    pruned({ ...row, set_aside: setAside(String(row.run ?? '')) }),
  );

  const body = [
    HEADER,
    'questions:',
    indent(toYaml(questions, 'question')),
    '',
    'sources:',
    indent(toYaml(sources)),
    '',
    'claims:',
    indent(toYaml(claims)),
  ].join('\n');

  writeFileSync(file, `${body}\n`);
  console.log(
    `migrate-register-questions: ${questions.length} questions, ${claims.length} claims, ` +
      `${sources.length} source(s); ${SUPERSEDED.size} superseded rows removed`,
  );
}

const indent = (yaml: string): string =>
  yaml
    .split('\n')
    .map((line) => (line === '' ? line : `  ${line}`))
    .join('\n')
    .replace(/\n+$/, '');

if (import.meta.url === `file://${process.argv[1]}`) main();
