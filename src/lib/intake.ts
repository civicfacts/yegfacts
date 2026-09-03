import { parse } from 'yaml';

/**
 * How far the work on a question has got. Registered is an address and a
 * decision; gate-complete is an audit against archived bytes.
 */
export type Lifecycle = 'registered' | 'briefed' | 'panel-complete' | 'gate-complete';

/**
 * The answer to "should we spend an investigation on this". Three values and
 * only three — the words `variation` and `not-a-claim` left the vocabulary with
 * D-0029: deduplication is one claim recording several wordings, and a
 * proposition that never became a claim belongs to its source's record.
 */
export type Triage = 'go' | 'park' | 'no';

/** What a reader can see. A withdrawal leaves a dated tombstone, not a 404. */
export type Publication = 'unpublished' | 'published' | 'corrected' | 'withdrawn';

/** Where a wording came from. */
export type ClaimOrigin = 'captured' | 'supplied' | 'editor';

/**
 * How many distinct people discussed something in a source.
 *
 * One pseudonym is one person within one source, so `total` is the distinct
 * people on the question. The three side counts are the distinct people on each
 * side, and somebody who argued both ways is in both, so the sides can come to
 * more than the total.
 *
 * Recorded and checked, and since D-0030 not printed: the site counts comments
 * instead, because a people count stops being exact the moment a claim turns up
 * in a second source. The record keeps the split at no cost, and the validator
 * goes on checking it against the claims.
 */
export interface Accounts {
  total: number;
  for?: number;
  against?: number;
  neither?: number;
}

/**
 * THE UNIT OF WORK: one question, one brief, one panel run, one gate audit.
 *
 * State lives here and nowhere else, in three fields rather than one. A single
 * `outcome` had to stand for how far the work had got, whether it was worth
 * doing and whether anyone could read it, and it drifted between all three.
 *
 * Most questions come out of a source read end to end and name it. The seven
 * registered one at a time, before whole-source intake existed, name no source
 * and keep the wording they were filed under as `registered_as`.
 */
export interface Question {
  id: string;
  recorded: string;
  /** The question, as the brief asks it. */
  question: string;
  /**
   * Every topic the question is filed under, broad and narrow alike, and empty
   * for a question no topic honestly covers.
   *
   * The register carries them because the register carries every question, and
   * a topic that only appeared once an article did would file six questions of
   * forty-four. Where a question has an article, the two lists are the same set
   * and `scripts/validate.ts` fails the build if they drift.
   */
  topics: readonly string[];
  lifecycle: string;
  triage: string;
  publication: string;
  /** Id of the `sources` entry it came out of, when it came out of one. */
  source?: string;
  /** Repo-relative run directory the grouping came out of. */
  run?: string;
  /** One public sentence saying why triage answered as it did. */
  reason?: string;
  /** Why these claims are one question, when that needs saying. */
  grouping_note?: string;
  accounts?: Accounts;
  /** The verbatim wording a hand-registered question was filed under. */
  registered_as?: string;
  /** Where that wording came from, for a hand-registered question. */
  origin?: string;
  supplied_by?: string;
  /** Where it was said. Internal shorthand, not reader copy. */
  context?: string;
  /** Internal shorthand. Shown to readers only when there is no `reason`. */
  note?: string;
  /** Slug of the story carrying it, when one does. */
  story?: string;
  /** Repo-relative path to the triage report behind the decision. */
  triage_report?: string;
  /** Repo-relative path to the intake record the triage read. */
  intake?: string;
}

/**
 * One captured wording of a claim, as a person actually typed it.
 *
 * No comment index: the check that keeps this honest is "these are the words of
 * some comment in this source", which survives a re-export of the capture. The
 * index it replaced could not.
 */
export interface Variation {
  /** The person's words, verbatim. */
  wording: string;
  /** Id of the `sources` entry the words were captured from. */
  source_id: string;
  /** Stable pseudonym within the source. Never a real name. */
  author_name: string;
}

/**
 * THE UNIT OF JUDGEMENT: exactly one finding, under exactly one question.
 *
 * A claim carries no state of its own, because triage ruled on its question and
 * one panel run answers that question for every claim under it. The single
 * exception is the right-of-reply decline: an accusation against a named person
 * is turned down even where the question around it is going ahead.
 */
export interface Claim {
  id: string;
  recorded: string;
  origin: string;
  /** Id of the `questions` entry it is checked under. */
  question: string;
  /** What would have to be true, in one plain sentence. Shown as the claim. */
  proposition?: string;
  /** The representative captured wording. */
  wording?: string;
  /** Which side of the source's argument the claim serves. */
  side?: string;
  /** How many distinct people argued the claim, either way. */
  accounts?: number;
  /** Id of the `sources` entry it was extracted from. */
  source?: string;
  /** Which extractor seats found it. */
  seats?: string[];
  /** Every captured wording. Empty when the site is withholding them. */
  variations?: Variation[];
  /** The claim names an identifiable individual. */
  names_person?: boolean;
  /** The claim's own decline. Only ever `no`, only ever with a ground. */
  triage?: string;
  /** Why it carries a decline of its own. `right-of-reply` is the only value. */
  ground?: string;
  /** One public sentence saying why. Mandatory on a decline of its own. */
  reason?: string;
  /**
   * Set by `redact()`: this claim names an individual and was declined, so
   * neither its proposition nor its captured wordings are on the site at all.
   */
  withheld?: boolean;
}

/** A proposition the merge set aside as not a factual claim, with the reason. */
export interface SetAside {
  wording: string;
  reason: string;
}

/** One source read end to end: a post, an article, a discussion, a video. */
export interface Source {
  id: string;
  kind: string;
  url: string;
  title: string;
  captured: string;
  captured_by: string;
  /** Repo-relative capture directory. */
  capture: string;
  /** Repo-relative run directory. */
  run: string;
  comments?: number;
  commenters?: number;
  extracted_by: string[];
  merged_by?: string;
  claims_found?: number;
  propositions?: number;
  /**
   * What the merge read and set aside as opinion, prediction or value
   * judgement. The completeness promise is made about the source, so the
   * propositions that never became claims are listed on the source rather than
   * dropped: they were invisible while `not-a-claim` was a claim disposition.
   */
  set_aside?: SetAside[];
}

/**
 * `intake/register.yaml`, read at build time.
 *
 * Read the same way as `methodology/changelog.yaml` (see `methodology.ts`): the
 * file belongs to the intake process rather than to the site, so it is a raw
 * text import rather than a content collection — it may legitimately not exist
 * yet, and its shape should be free to grow without breaking the build.
 * `import.meta.glob` resolves it relative to this source file and yields
 * nothing at all when the file is absent.
 */
const files = import.meta.glob<string>('../../intake/register.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const text = (value: unknown): string =>
  value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? '').trim();

const optional = (value: unknown): string | undefined => {
  const trimmed = text(value);
  return trimmed === '' ? undefined : trimmed;
};

const count = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) ? value : undefined;

const strings = (value: unknown): string[] =>
  Array.isArray(value) ? value.map(text).filter((item) => item !== '') : [];

function variations(value: unknown): Variation[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter((row): row is Record<string, unknown> => typeof row === 'object' && row !== null)
    .map((row) => ({
      wording: text(row.wording),
      source_id: text(row.source_id),
      author_name: text(row.author_name),
    }))
    .filter((variation) => variation.wording !== '');
}

/**
 * A claim that names an identifiable individual, checked and published, is a
 * finding. The same claim parked or declined is an unanswered allegation about
 * a named person, and v1 has no right-of-reply process to put behind one — so
 * the site does not print it at all.
 *
 * The redaction happens here, at the one point the register enters the site,
 * rather than in the pages: what a page never receives, a later edit to that
 * page cannot leak. The claim keeps its id and its `reason`, which the
 * validator makes mandatory on a decline, so the row is still there to be read
 * and counted.
 *
 * The triage this reads is the one that decided the claim: its question's, or
 * its own where it was declined on the right-of-reply ground inside a question
 * that is going ahead. That second case is the common one, and it is why the
 * claim's own decline overrides what it would inherit.
 */
export function withholdsWording(entry: { names_person?: boolean; triage: string }): boolean {
  // Only a decline. Parking a question is a decision about when to check it,
  // not a refusal to repeat it, and most claims naming a person name an
  // office-holder doing something in office: a motion brought, a lane
  // installed. Those are the public record and the site names them.
  return entry.names_person === true && entry.triage === 'no';
}

/**
 * What a withheld claim is called wherever a claim would be printed.
 *
 * Literal and neutral on purpose. The reason used to stand in this place, which
 * read as though a commenter had asserted the site's own policy; the reason
 * belongs under the heading, saying why there is nothing above it.
 */
export const WITHHELD_LABEL = 'Withheld claim';

/**
 * A claim as the site may print it. Identity for everything else.
 *
 * `side`, `accounts` and `variations` go with the wording: "against the
 * argument", "discussed by one person" and another phrasing of the allegation
 * all describe a claim this entry is refusing to show, so the site never
 * receives them either.
 */
export function redact(claim: Claim, triage: string): Claim {
  if (!withholdsWording({ names_person: claim.names_person, triage })) return claim;
  return {
    ...claim,
    wording: WITHHELD_LABEL,
    proposition: WITHHELD_LABEL,
    side: undefined,
    accounts: undefined,
    variations: [],
    withheld: true,
  };
}

function toClaim(entry: Record<string, unknown>, questions: Map<string, Question>): Claim {
  const question = text(entry.question);
  const own = optional(entry.triage);
  const claim: Claim = {
    id: text(entry.id),
    recorded: text(entry.recorded),
    origin: text(entry.origin),
    question,
    proposition: optional(entry.proposition),
    wording: optional(entry.wording),
    side: optional(entry.side),
    accounts: count(entry.accounts),
    source: optional(entry.source),
    seats: entry.seats === undefined ? undefined : strings(entry.seats),
    variations: variations(entry.variations),
    names_person: entry.names_person === true,
    triage: own,
    ground: optional(entry.ground),
    reason: optional(entry.reason),
  };
  return redact(claim, own ?? questions.get(question)?.triage ?? '');
}

function toSource(entry: Record<string, unknown>): Source {
  return {
    id: text(entry.id),
    kind: text(entry.kind),
    url: text(entry.url),
    title: text(entry.title),
    captured: text(entry.captured),
    captured_by: text(entry.captured_by),
    capture: text(entry.capture),
    run: text(entry.run),
    comments: count(entry.comments),
    commenters: count(entry.commenters),
    extracted_by: strings(entry.extracted_by),
    merged_by: optional(entry.merged_by),
    claims_found: count(entry.claims_found),
    propositions: count(entry.propositions),
    set_aside: Array.isArray(entry.set_aside)
      ? entry.set_aside
          .filter((row): row is Record<string, unknown> => typeof row === 'object' && row !== null)
          .map((row) => ({ wording: text(row.wording), reason: text(row.reason) }))
          .filter((row) => row.wording !== '')
      : undefined,
  };
}

function toQuestion(entry: Record<string, unknown>): Question {
  return {
    id: text(entry.id),
    recorded: text(entry.recorded),
    question: text(entry.question),
    topics: strings(entry.topics),
    lifecycle: text(entry.lifecycle),
    triage: text(entry.triage),
    publication: text(entry.publication),
    source: optional(entry.source),
    run: optional(entry.run),
    reason: optional(entry.reason),
    grouping_note: optional(entry.grouping_note),
    accounts: entry.accounts === undefined ? undefined : toAccounts(entry.accounts),
    registered_as: optional(entry.registered_as),
    origin: optional(entry.origin),
    supplied_by: optional(entry.supplied_by),
    context: optional(entry.context),
    note: optional(entry.note),
    story: optional(entry.story),
    triage_report: optional(entry.triage_report),
    intake: optional(entry.intake),
  };
}

function toAccounts(value: unknown): Accounts {
  const entry = (typeof value === 'object' && value !== null ? value : {}) as Record<
    string,
    unknown
  >;
  return {
    total: count(entry.total) ?? 0,
    for: count(entry.for),
    against: count(entry.against),
    neither: count(entry.neither),
  };
}

function rows(parsed: unknown, key: string): Record<string, unknown>[] {
  const entries = (parsed as Record<string, unknown> | null)?.[key];
  return (Array.isArray(entries) ? entries : []).filter(
    (entry): entry is Record<string, unknown> => typeof entry === 'object' && entry !== null,
  );
}

/** The register's three lists, in the order the file lists them. */
export interface IntakeRegister {
  questions: Question[];
  sources: Source[];
  claims: Claim[];
}

/**
 * One register file as the site receives it: questions first, because a claim's
 * decision is its question's and the claims cannot be built without them.
 *
 * Exported as a pure function of the text so the rules that matter can be
 * tested against a fixture — above all that a claim naming an individual, in a
 * question that was declined, arrives with nothing of the allegation left on it.
 */
export function parseRegister(raw: string): IntakeRegister {
  const parsed: unknown = parse(raw);
  const questions = rows(parsed, 'questions')
    .map(toQuestion)
    .filter((question) => question.id !== '');
  const byId = new Map(questions.map((question) => [question.id, question]));
  return {
    questions,
    sources: rows(parsed, 'sources')
      .map(toSource)
      .filter((source) => source.id !== ''),
    claims: rows(parsed, 'claims')
      .map((entry) => toClaim(entry, byId))
      .filter((claim) => claim.id !== ''),
  };
}

let cache: IntakeRegister | undefined;

function register(): IntakeRegister {
  if (cache === undefined) {
    const parsed = Object.values(files).map(parseRegister);
    cache = {
      questions: parsed.flatMap((file) => file.questions),
      sources: parsed.flatMap((file) => file.sources),
      claims: parsed.flatMap((file) => file.claims),
    };
  }
  return cache;
}

/**
 * Every claim in the register, in the order the file lists them, with
 * named-individual allegations already redacted (`redact`).
 */
export function claimRegister(): Claim[] {
  return register().claims;
}

/** Every source in the register, in the order the file lists them. */
export function sourceRegister(): Source[] {
  return register().sources;
}

/** Every question in the register, in the order the file lists them. */
export function questionRegister(): Question[] {
  return register().questions;
}

/** The question a claim is checked under. */
export function questionOf(claim: Claim): Question | undefined {
  return questionRegister().find(({ id }) => id === claim.question);
}

/** The claims checked under one question, in the register's order. */
export function claimsOf(questionId: string): Claim[] {
  return claimRegister().filter((claim) => claim.question === questionId);
}


/**
 * The triage answers, with the sentence each one is worth to a reader and the
 * colour it is filled in where a source's questions are listed as a table.
 *
 * On the hand-registered list triage is a section heading rather than a badge:
 * a declined question is a decision the site defends, not a state to
 * colour-code. Inside a source it has to be a badge, because the point of
 * publishing a whole source is that thirty-odd dispositions can be read down
 * one column.
 *
 * `definition` is the line the register's key prints. Every label a reader can
 * see is defined there, so a badge is never a word the page expects the reader
 * to already know, and none of the definitions may leave "going ahead"
 * sounding like a verdict.
 */
export const TRIAGE_SECTIONS = [
  {
    id: 'declined',
    triage: 'no',
    heading: 'Declined',
    badge: 'Declined',
    definition: 'Both readers turned it down for checking. Not a ruling that any claim is false.',
    fill: 'bg-brick text-white',
    edge: 'border-brick',
  },
  {
    id: 'parked',
    triage: 'park',
    heading: 'Parked',
    badge: 'Parked',
    definition:
      'Kept, not dropped. Either the readers disagreed, or the public record cannot answer it yet.',
    fill: 'bg-navy text-white',
    edge: 'border-navy',
  },
  {
    id: 'going-ahead',
    triage: 'go',
    heading: 'Going ahead',
    badge: 'Going ahead',
    definition: 'Worth checking, so a check is coming. That is all it says: nothing is settled yet.',
    fill: 'bg-forest text-white',
    edge: 'border-forest',
  },
] as const;

/**
 * What a publication state is called in running text.
 *
 * Kept apart from triage on purpose: whether a question was worth checking and
 * whether a reader can see the result are different facts, and one field
 * standing for both is what D-0029 fixed.
 */
export const PUBLICATION_LABELS: Record<string, string> = {
  unpublished: 'Not published yet',
  published: 'Published',
  corrected: 'Corrected',
  withdrawn: 'Withdrawn',
};

/** What a lifecycle stage is called in running text. */
export const LIFECYCLE_LABELS: Record<string, string> = {
  registered: 'Registered',
  briefed: 'Briefed',
  'panel-complete': 'Panel complete',
  'gate-complete': 'Gate complete',
};

const section = (triage: string) => TRIAGE_SECTIONS.find((entry) => entry.triage === triage);

/** What to call a triage answer in running text. Unknown values print themselves. */
export function triageHeading(triage: string): string {
  return section(triage)?.heading ?? triage;
}

/** The badge word for a triage answer, short enough to sit in a table column. */
export function triageBadge(triage: string): string {
  return section(triage)?.badge ?? triage;
}

/** The badge fill, and the ledger row's left edge, for a triage answer. */
export function triageFill(triage: string): string {
  return section(triage)?.fill ?? 'border border-rule-strong bg-wash text-muted';
}

export function triageEdge(triage: string): string {
  return section(triage)?.edge ?? 'border-rule-strong';
}

/**
 * The order the questions of one source are read in: what is being checked,
 * then what is waiting, then what was turned down.
 */
export const TRIAGE_ORDER = ['go', 'park', 'no'] as const;

export function triageRank(triage: string): number {
  const index = TRIAGE_ORDER.indexOf(triage as (typeof TRIAGE_ORDER)[number]);
  return index === -1 ? TRIAGE_ORDER.length : index;
}

/**
 * The two publication states a reader filters and reads the register by.
 *
 * `corrected` is folded into Published — a correction is a published finding
 * that changed, and a reader looking for what the site has answered wants it in
 * that list — and `unpublished` is not a state anybody filters for, because it
 * is what the triage answer already says.
 */
const PUBLICATION_STATES = [
  {
    id: 'published',
    label: 'Published',
    definition: 'Checked, and the findings are on the site.',
  },
  {
    id: 'withdrawn',
    label: 'Withdrawn',
    definition: 'Checked and published, then withdrawn as a finding. The page stays, saying why.',
  },
] as const;

/** One state a question can be in, as the register's own page labels it. */
export interface QuestionState {
  id: string;
  label: string;
  definition: string;
}

/**
 * Every state a question can be in, in the order the register reads them:
 * answered first, then the three triage answers, then withdrawn.
 *
 * Two of the question's three state fields are here and the lifecycle is not:
 * how far a run has got is worth printing on a question's own page and is not
 * something anybody wants a list of. The triage half is built from
 * `TRIAGE_SECTIONS` rather than restated, so a word cannot mean one thing in
 * the key and another on the badge.
 */
export const QUESTION_STATES: QuestionState[] = [
  PUBLICATION_STATES[0],
  ...[...TRIAGE_SECTIONS]
    .sort((a, b) => triageRank(a.triage) - triageRank(b.triage))
    .map((entry) => ({
      id: entry.triage,
      label: entry.badge,
      definition: entry.definition,
    })),
  PUBLICATION_STATES[1],
];

/**
 * Every state one question is in. More than one, always: triage and publication
 * are different facts, and a filter that made a reader choose between them would
 * hide a published question from anybody looking at what is going ahead.
 */
export function statesOf(question: {
  triage: string;
  publication: string;
}): string[] {
  const states = [question.triage];
  if (question.publication === 'published' || question.publication === 'corrected') {
    states.push('published');
  }
  if (question.publication === 'withdrawn') states.push('withdrawn');
  return states;
}

/**
 * The key the register prints: every state the register actually puts a
 * question in, with its definition, in the order the entries are read in. Built
 * from the register rather than written out on the page, so the page cannot
 * show a label it has not defined, and cannot define one it never shows.
 */
export function questionStateKey(): QuestionState[] {
  const used = new Set(questionRegister().flatMap(statesOf));
  return QUESTION_STATES.filter((state) => used.has(state.id));
}

/**
 * What the site calls the claim. A merged proposition is the plain sentence the
 * merge wrote; a claim with no proposition has only the wording it arrived in.
 */
export function claimText(claim: Claim): string {
  return claim.proposition ?? claim.wording ?? claim.id;
}

const ORIGINS: Record<string, string> = {
  captured: 'captured from a post',
  supplied: 'passed to us, source not captured',
  editor: 'our own hypothesis',
};

const KINDS: Record<string, string> = {
  'facebook-post': 'Facebook post',
  article: 'Article',
  discussion: 'Discussion thread',
  video: 'Video',
};

/** What a source is, in words, for the provenance line. */
export function sourceKind(source: Source): string {
  return KINDS[source.kind] ?? source.kind;
}

/**
 * `supplied_by` is written for the register and carries the circumstance as
 * well as the person ("founder, as a test case for the triage"). Readers need
 * the circumstance too, or a test case reads as a serious suggestion, so the
 * whole clause is shown. A lowercase value is a role and takes an article; a
 * capitalised one is a name and does not.
 */
function attribution(suppliedBy: string): string {
  const article = /^[a-z]/.test(suppliedBy) ? 'the ' : '';
  return `from ${article}${suppliedBy}`;
}

/** The one-line "where this wording came from", for a hand-registered entry. */
export function provenance(entry: { origin?: string; supplied_by?: string }): string {
  const origin = ORIGINS[entry.origin ?? ''] ?? entry.origin ?? '';
  return entry.supplied_by ? `${origin}, ${attribution(entry.supplied_by)}` : origin;
}

/**
 * How many comments carried a claim or a question, in words. The one phrase the
 * site prints for any of these counts, at either level of the register.
 *
 * Comments, not people (D-0030). A pseudonym is one person within one source,
 * so a people count was exact there — but the moment a claim turns up in two
 * sources the same person commenting on two threads is counted twice, and there
 * is no honest way to correct that without resolving identities across
 * platforms, which this site should not attempt even where it could. A comment
 * count is exactly true whatever the number of sources. Measured against the
 * first source, the two rank claims almost identically: the median ratio of
 * wordings to people per claim is 1.00 and the overall ratio 1.14, so nothing is
 * lost by taking the number that never needs a footnote. The per-person and
 * per-side counts stay in the register at no cost; they are simply not printed.
 *
 * "Said in" is doing the work a printed split used to do. A bare total next to a
 * claim reads as corroboration if the verb lets it, and the comments counted
 * here include the ones denying the claim. Said claims no agreement, so the
 * count is safe to print whole.
 */
export function saidIn(comments: number): string {
  return `Said in ${comments} ${comments === 1 ? 'comment' : 'comments'}`;
}

/** How many captured wordings a claim carries. Zero for a withheld one. */
export function commentsOn(claim: Claim): number {
  return (claim.variations ?? []).length;
}

/**
 * How many captured wordings a published claim was grouped from.
 *
 * A checked claim keeps its wordings on the register claims it names, so its
 * count has to be gathered the same way its quotes are. Without it a question's
 * total would not add up to the rows under it, which is the one thing a count
 * on a ledger has to do.
 */
export function commentsFrom(claimIds: readonly string[]): number {
  return variationsFrom(claimIds).length;
}

/**
 * How many comments carried a question: every wording under it, added up.
 *
 * Read off the claims rather than off the question, so the number on a question
 * row and the numbers on the rows beneath it cannot disagree.
 */
export function commentsOnQuestion(questionId: string): number {
  return claimsOf(questionId).reduce((running, claim) => running + commentsOn(claim), 0);
}


/**
 * The reports behind a question, in the order a page shows them.
 *
 * They hang off the question because the question is what a triage read: one
 * report covers every claim under it.
 */
export function reportsFor(question: Question): Array<{ label: string; path: string }> {
  return [
    question.intake && { label: 'Intake record', path: question.intake },
    question.triage_report && { label: 'Triage', path: question.triage_report },
  ].filter((report): report is { label: string; path: string } => Boolean(report));
}

/**
 * The section anchor a report renders under. Two places need it and they have
 * to agree: the page's outline, built before the reports are rendered, and the
 * section itself.
 */
export function reportAnchor(label: string): string {
  return label === 'Triage' ? 'triage' : 'intake';
}

/**
 * The claims that have a page of their own: the ones extracted from a source,
 * whose page carries the captured wordings and the disposition. The route and
 * the sitemap both build from this, so "which claims have a page" is decided
 * once.
 */
export function claimsWithPages(): Claim[] {
  return claimRegister().filter((claim) => claim.source !== undefined);
}

/**
 * Every captured wording belonging to a published claim, gathered from the
 * register claims that claim names in `register_claims`.
 *
 * This is what lets someone who commented on the original post find their own
 * words on the site, under the pseudonym and never under their name. The
 * relation used to be written the other way round, as `variation_of` on the
 * register claim, which made deduplication look like one claim pointing at
 * another; D-0029 removed that word, so the published claim declares which
 * register claims are it.
 *
 * Reads `claimRegister()`, so a withheld claim contributes nothing: it has no
 * variations left by the time it gets here.
 */
export function variationsFrom(
  claimIds: readonly string[],
): Array<{ claim: Claim; variation: Variation }> {
  const wanted = new Set(claimIds);
  return claimRegister()
    .filter((claim) => wanted.has(claim.id))
    .flatMap((claim) => (claim.variations ?? []).map((variation) => ({ claim, variation })));
}
