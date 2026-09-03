/**
 * The six published stories take their places as questions in the register.
 *
 *   npx tsx scripts/merge-published-questions.ts
 *
 * D-0029 said the six published stories become questions and their claims gain
 * addresses. This is that, written as a script for the same reason the first
 * migration was: the register is a public record, so a rewrite of it is
 * auditable rather than an editing session. Running it twice does nothing,
 * because it exits when the questions it adds are already there.
 *
 * Each story keeps its slug as the question's id. Those slugs are already
 * public addresses under `/facts/<slug>`, so `/facts/<slug>` becomes
 * `/questions/<slug>` — a rename, not a move, and an old `#claim-anchor` rides
 * along with it because the browser re-applies a fragment the server never saw.
 *
 * Two of the six are questions the register already held, asked once by us and
 * once by a thread:
 *
 * - `winter-cycling` — the Yegscoop question "Can people cycle through an
 *   Edmonton winter, and do they?" and the published claim `wc-too-cold`,
 *   "Does Edmonton's winter climate make cycling unworkable as a meaningful
 *   transportation mode?", are one question. The row keeps its id, its source
 *   and its counts and becomes published.
 * - `bike-vs-road-spending` — "How does the money for bike lanes compare with
 *   what Edmonton spends on roads?" is what the active-transportation story
 *   answers, in `at-100m-vs-roads` and `at-100m-vs-snow`. The row is renamed to
 *   `active-transportation`, keeping every field, and its old id is redirected.
 *
 * A third row is absorbed rather than merged, and this one is not in the
 * editor's instruction: `infill-teardown-350k-1m` was the register entry for
 * the withdrawn infill-prices story, created in the previous batch because a
 * withdrawn story needs one. With the story itself now a question carrying
 * `publication: withdrawn`, keeping both would put two withdrawn questions on
 * one story, which the withdrawal-pairing rule cannot express and which no
 * reader could tell apart. So the row's id becomes `infill-prices` and every
 * field it carried — its reason, its records, the wording it was registered
 * under — comes with it.
 *
 * What this deliberately does NOT do is copy the published claims into the
 * register. A published claim already names its story, and the story's slug is
 * now the question's id, so the claim is attached to its question by the link
 * that was always there. Copying them in would give every finding two homes
 * that can disagree. `npm run validate` checks the link instead.
 */
import { writeFileSync } from 'node:fs';
import YAML from 'yaml';
import { loadYaml, readText, repoPath } from './lib/repo.ts';

type Row = Record<string, unknown>;

/** The date these rows entered the register. */
const RECORDED = '2026-09-03';

/**
 * A published story's question, where the register did not already hold it.
 *
 * The question text is the published claim's own `question`, verbatim, wherever
 * one claim carries the story. `electric-buses` is the exception: it answers
 * three claims with three questions, so the one sentence covering them is
 * written here, and it is the only prose this script adds.
 */
const ADDED: Row[] = [
  {
    id: 'climate-targets',
    recorded: RECORDED,
    question: 'Is Edmonton on track to meet its climate targets?',
    lifecycle: 'gate-complete',
    triage: 'go',
    publication: 'published',
    story: 'climate-targets',
  },
  {
    id: 'electric-buses',
    recorded: RECORDED,
    question:
      "Did Edmonton's electric buses fail, what did that cost, and does it show electric buses do not work in cold cities?",
    lifecycle: 'gate-complete',
    triage: 'go',
    publication: 'published',
    story: 'electric-buses',
  },
  {
    id: 'fifteen-minute-districts',
    recorded: RECORDED,
    question:
      "Do Edmonton's district plans restrict, or create a mechanism to restrict, where residents can travel within the city?",
    lifecycle: 'gate-complete',
    triage: 'go',
    publication: 'published',
    story: 'fifteen-minute-districts',
  },
];

/** Rows the register already holds, under the id and state they take now. */
const RENAMED: Record<string, { id: string; story: string; publication: string }> = {
  'bike-vs-road-spending': {
    id: 'active-transportation',
    story: 'active-transportation',
    publication: 'published',
  },
  'infill-teardown-350k-1m': {
    id: 'infill-prices',
    story: 'infill-prices',
    publication: 'withdrawn',
  },
};

/** Rows that keep their id and only change state. */
const PUBLISHED_IN_PLACE: Record<string, { story: string; publication: string }> = {
  'winter-cycling': { story: 'winter-cycling', publication: 'published' },
};

/**
 * A question in the register's key order.
 *
 * `story` sits with the other cross-references and `lifecycle`/`publication`
 * with the state, so a row reads the same wherever it came from.
 */
function ordered(row: Row): Row {
  const keys = [
    'id',
    'recorded',
    'source',
    'question',
    'lifecycle',
    'triage',
    'publication',
    'reason',
    'grouping_note',
    'accounts',
    'registered_as',
    'origin',
    'supplied_by',
    'context',
    'story',
    'triage_report',
    'intake',
    'note',
    'run',
  ];
  const out: Row = {};
  for (const key of keys) if (row[key] !== undefined) out[key] = row[key];
  // Anything this script has not heard of keeps its place at the end rather
  // than being silently dropped.
  for (const key of Object.keys(row)) if (out[key] === undefined) out[key] = row[key];
  return out;
}

/** The prose and the dates are quoted; ids, states and seats are not. */
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

const indent = (yaml: string): string =>
  yaml
    .split('\n')
    .map((line) => (line === '' ? line : `  ${line}`))
    .join('\n')
    .replace(/\n+$/, '');

function main(): void {
  const file = repoPath('intake', 'register.yaml');
  const raw = readText(file);
  const parsed = loadYaml<Row>(file);
  const rows = (key: string): Row[] => (Array.isArray(parsed[key]) ? (parsed[key] as Row[]) : []);

  const questions = rows('questions');
  if (questions.some((question) => question.id === 'active-transportation')) {
    console.log('merge-published-questions: already done — nothing changed');
    return;
  }

  const moved = new Map<string, string>();
  const rewritten = questions.map((question) => {
    const id = String(question.id);
    const renamed = RENAMED[id];
    if (renamed !== undefined) {
      moved.set(id, renamed.id);
      return ordered({
        ...question,
        id: renamed.id,
        // A question the site has answered has been through a brief, a panel
        // and a gate. One field said only that it was worth checking.
        lifecycle: 'gate-complete',
        publication: renamed.publication,
        story: renamed.story,
      });
    }
    const inPlace = PUBLISHED_IN_PLACE[id];
    if (inPlace !== undefined) {
      return ordered({
        ...question,
        lifecycle: 'gate-complete',
        publication: inPlace.publication,
        story: inPlace.story,
      });
    }
    return question;
  });

  // The added ones sit after the questions out of the source and before the
  // ones registered one at a time, which is where a reader looking for "what
  // has been answered" gets to them first.
  const lastSourced = rewritten.reduce(
    (last, question, index) => (question.source === undefined ? last : index),
    -1,
  );
  rewritten.splice(lastSourced + 1, 0, ...ADDED.map(ordered));

  // A claim under a renamed question follows it. Nothing else about the claim
  // changes: it is the same claim, under the same question, at a new address.
  const claims = rows('claims').map((claim) => {
    const to = moved.get(String(claim.question));
    return to === undefined ? claim : { ...claim, question: to };
  });

  const header = raw.slice(0, raw.indexOf('\nquestions:') + 1);
  const sources = rows('sources');
  writeFileSync(
    file,
    [
      header + 'questions:',
      indent(toYaml(rewritten, 'question')),
      '',
      'sources:',
      indent(toYaml(sources)),
      '',
      'claims:',
      indent(toYaml(claims)),
      '',
    ].join('\n'),
  );

  console.log(
    `merge-published-questions: ${rewritten.length} questions ` +
      `(${ADDED.length} added, ${moved.size} renamed, ${Object.keys(PUBLISHED_IN_PLACE).length} published in place), ` +
      `${claims.length} claims`,
  );
  for (const [from, to] of moved) console.log(`  ${from} -> ${to}`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
