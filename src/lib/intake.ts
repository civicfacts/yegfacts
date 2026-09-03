import { parse } from 'yaml';

/**
 * The stages a candidate can be at. `pre-triage` predates triage existing.
 * `not-answered` (methodology v1.13) is a claim we did check and then took off
 * the findings board, because the public record cannot answer it at the level
 * people ask it. `variation` and `not-a-claim` arrive with whole-source intake:
 * a whole source is read, so the register now has to hold the propositions that
 * merged into another entry and the ones that were never factual claims, rather
 * than quietly leaving them out.
 */
export type CandidateOutcome =
  | 'GO'
  | 'PARK'
  | 'NO'
  | 'variation'
  | 'not-a-claim'
  | 'not-answered'
  | 'not-triaged'
  | 'pre-triage';

/** Where the wording came from. */
export type CandidateOrigin = 'captured' | 'supplied' | 'editor';

/**
 * How many distinct commenters discussed something in a source.
 *
 * One pseudonym is one person within one source, so `total` is the distinct
 * people on the question. The three side counts are the distinct people on each
 * side, and somebody who argued both ways is in both, so the sides can come to
 * more than the total. The record keeps the split and the validator checks it;
 * the site prints the total alone, because a count beside a claim has to say
 * that people discussed it and never that they agreed with it.
 */
export interface Accounts {
  total: number;
  for?: number;
  against?: number;
  neither?: number;
}

/**
 * One question, checked once: one brief, one body of evidence, one panel run.
 *
 * This is the unit of work and the unit triage rules on, which is why the
 * outcome lives here rather than on the claims. Several claims to an
 * investigation is normal, and opposite claims belong in the same one: a single
 * finding over both would state nothing, and would label each side with a
 * verdict about the other, so each claim keeps its own finding under the one
 * question.
 */
export interface Investigation {
  id: string;
  recorded: string;
  /** Id of the `sources` entry the question came out of. */
  source: string;
  /** The question, as the brief will ask it. */
  question: string;
  outcome: string;
  /** One public sentence saying why the outcome is what it is. */
  reason?: string;
  /** Why these claims are one investigation, when that needs saying. */
  grouping_note?: string;
  accounts: Accounts;
  /** Repo-relative run directory the grouping came out of. */
  run: string;
}

/** One captured wording of a proposition, as a person actually typed it. */
export interface CapturedForm {
  /** Stable pseudonym within the source. Never a real name. */
  commenter: string;
  /** The commenter's words, verbatim. */
  quote: string;
  /** 1-based index of the comment in the source's capture. */
  comment: number;
}

export interface Candidate {
  id: string;
  recorded: string;
  origin: string;
  wording: string;
  /**
   * What triage decided. A claim inside an investigation has none of its own in
   * the register and inherits its investigation's, which the loader resolves
   * here so everything downstream — the redaction included — reads one field.
   */
  outcome: string;
  /** Who passed the wording on, when a person did. */
  supplied_by?: string;
  /** Where it was said, when we know. Internal shorthand, not reader copy. */
  context?: string;
  /** One public sentence saying why the outcome is what it is. */
  reason?: string;
  /** Internal shorthand. Shown to readers only when there is no `reason`. */
  note?: string;
  /** Repo-relative path to the triage report behind the outcome. */
  triage?: string;
  /** Repo-relative path to the intake record the triage read. */
  intake?: string;
  /** Slug of the story carrying the claim, when one does. */
  story?: string;
  /** Id of the `sources` entry the proposition was extracted from. */
  source?: string;
  /** Id of the `investigations` entry this claim is checked under. */
  investigation?: string;
  /** What would have to be true, in one plain sentence. Shown as the claim. */
  proposition?: string;
  /** Which side of the source's argument the proposition serves. */
  side?: string;
  /** How many distinct accounts argued the claim, either way. */
  accounts?: number;
  /** Other wordings of the same assertion folded into this claim. */
  variations?: string[];
  /** Which extractor seats found it. */
  seats?: string[];
  /** Every captured wording. Empty when the site is withholding them. */
  forms?: CapturedForm[];
  /** The proposition names an identifiable individual. */
  names_person?: boolean;
  /** Register id or published claim id this is the same claim as, reworded. */
  variation_of?: string;
  /**
   * Set by `redact()`: this entry names an individual and did not get a GO, so
   * neither its proposition nor its captured wordings are on the site at all.
   */
  withheld?: boolean;
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

function forms(value: unknown): CapturedForm[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter((form): form is Record<string, unknown> => typeof form === 'object' && form !== null)
    .map((form) => ({
      commenter: text(form.commenter),
      quote: text(form.quote),
      comment: Number(form.comment),
    }))
    .filter((form) => form.quote !== '' && Number.isInteger(form.comment));
}

/**
 * A claim that names an identifiable individual, checked and published, is a
 * finding. The same claim parked or declined is an unanswered allegation about
 * a named person, and v1 has no right-of-reply process to put behind one — so
 * the site does not print it at all.
 *
 * The redaction happens here, at the one point the register enters the site,
 * rather than in the pages: what a page never receives, a later edit to that
 * page cannot leak. The entry keeps its id, its outcome and its `reason`, which
 * the validator makes mandatory on every outcome this can apply to, so the row
 * is still on `/considered` to be read and counted.
 *
 * The `outcome` this reads is the one that decided the claim: its own for an
 * entry registered on its own, and its investigation's for a claim from a whole
 * source, which is the only outcome such a claim has. `parseRegister` resolves
 * that before calling this, so a claim in a declined investigation is withheld
 * even though the claim itself carries no outcome in the file.
 */
export function withholdsWording(entry: {
  names_person?: boolean;
  outcome: string;
}): boolean {
  // Only a decline. Parking a claim is a decision about when to check it, not
  // a refusal to repeat it, and most claims naming a person name an
  // office-holder doing something in office: a motion brought, a lane
  // installed. Those are the public record and the site names them, here and
  // in the stories.
  //
  // A decline can arrive two ways. Both readers can refuse the whole question,
  // or a single claim can be declined on the right-of-reply ground inside a
  // question that is going ahead. The second is the common case and the reason
  // the claim's own outcome overrides what it would inherit: an investigation
  // into what councillors have disclosed is worth running, and an accusation
  // sitting inside it is still one this site cannot put to the person.
  return entry.names_person === true && entry.outcome === 'NO';
}

/**
 * What a withheld entry is called wherever a claim would be printed.
 *
 * Literal and neutral on purpose. The reason used to stand in this place, which
 * read as though a commenter had asserted the site's own policy; the reason
 * belongs under the heading, saying why there is nothing above it.
 */
export const WITHHELD_LABEL = 'Withheld claim';

/**
 * A candidate as the site may print it. Identity for everything else.
 *
 * `side`, `accounts` and `variations` go with the wording: "against the
 * argument", "discussed by one person" and another phrasing of the allegation
 * all describe a claim this entry is refusing to show, so the site never
 * receives them either.
 */
export function redact(candidate: Candidate): Candidate {
  if (!withholdsWording(candidate)) return candidate;
  return {
    ...candidate,
    wording: WITHHELD_LABEL,
    proposition: WITHHELD_LABEL,
    side: undefined,
    accounts: undefined,
    variations: undefined,
    forms: [],
    withheld: true,
  };
}

function toCandidate(
  entry: Record<string, unknown>,
  investigations: Map<string, Investigation>,
): Candidate {
  const investigation = optional(entry.investigation);
  const inherited = investigation ? investigations.get(investigation)?.outcome : undefined;
  return redact({
    id: text(entry.id),
    recorded: text(entry.recorded),
    origin: text(entry.origin),
    wording: text(entry.wording),
    outcome: optional(entry.outcome) ?? inherited ?? '',
    investigation,
    supplied_by: optional(entry.supplied_by),
    context: optional(entry.context),
    reason: optional(entry.reason),
    note: optional(entry.note),
    triage: optional(entry.triage),
    intake: optional(entry.intake),
    story: optional(entry.story),
    source: optional(entry.source),
    proposition: optional(entry.proposition),
    side: optional(entry.side),
    accounts: count(entry.accounts),
    variations: entry.variations === undefined ? undefined : strings(entry.variations),
    seats: entry.seats === undefined ? undefined : strings(entry.seats),
    forms: forms(entry.forms),
    names_person: entry.names_person === true,
    variation_of: optional(entry.variation_of),
  });
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
  };
}

function toInvestigation(entry: Record<string, unknown>): Investigation {
  return {
    id: text(entry.id),
    recorded: text(entry.recorded),
    source: text(entry.source),
    question: text(entry.question),
    outcome: text(entry.outcome),
    reason: optional(entry.reason),
    grouping_note: optional(entry.grouping_note),
    accounts: toAccounts(entry.accounts),
    run: text(entry.run),
  };
}

function toAccounts(value: unknown): Accounts {
  const entry = (typeof value === 'object' && value !== null ? value : {}) as Record<string, unknown>;
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
  investigations: Investigation[];
  sources: Source[];
  candidates: Candidate[];
}

/**
 * One register file as the site receives it: investigations first, because a
 * claim's outcome is its investigation's and the claims cannot be built without
 * them.
 *
 * Exported as a pure function of the text so the rules that matter can be
 * tested against a fixture — above all that a claim naming an individual, in an
 * investigation both readers declined, arrives with nothing of the allegation
 * left on it.
 */
export function parseRegister(raw: string): IntakeRegister {
  const parsed: unknown = parse(raw);
  const investigations = rows(parsed, 'investigations')
    .map(toInvestigation)
    .filter((investigation) => investigation.id !== '');
  const byId = new Map(investigations.map((investigation) => [investigation.id, investigation]));
  return {
    investigations,
    sources: rows(parsed, 'sources').map(toSource).filter((source) => source.id !== ''),
    candidates: rows(parsed, 'candidates')
      .map((entry) => toCandidate(entry, byId))
      .filter((candidate) => candidate.id !== ''),
  };
}

let cache: IntakeRegister | undefined;

function register(): IntakeRegister {
  if (cache === undefined) {
    const parsed = Object.values(files).map(parseRegister);
    cache = {
      investigations: parsed.flatMap((file) => file.investigations),
      sources: parsed.flatMap((file) => file.sources),
      candidates: parsed.flatMap((file) => file.candidates),
    };
  }
  return cache;
}

/**
 * Every candidate in the register, in the order the file lists them, each
 * carrying the outcome that decided it and with named-individual allegations
 * already redacted (`redact`).
 */
export function candidateRegister(): Candidate[] {
  return register().candidates;
}

/** Every source in the register, in the order the file lists them. */
export function sourceRegister(): Source[] {
  return register().sources;
}

/** Every investigation in the register, in the order the file lists them. */
export function investigationRegister(): Investigation[] {
  return register().investigations;
}

/** The investigation a claim is checked under, when it belongs to one. */
export function investigationOf(candidate: Candidate): Investigation | undefined {
  return candidate.investigation === undefined
    ? undefined
    : investigationRegister().find(({ id }) => id === candidate.investigation);
}

/** One investigation with the claims checked under it. */
export interface InvestigationClaims {
  investigation: Investigation;
  claims: Candidate[];
  /**
   * Claims for the source's argument and claims against it, under the one
   * question. The site's best evidence that it is not picking sides, so the
   * investigation's own page says it in a sentence rather than leaving it to be
   * counted off the claims. It is off the index row, where it was a third piece
   * of small print beside two counts.
   */
  twoSided: boolean;
}

/** The claims checked under one investigation, in the register's order. */
export function claimsOf(investigationId: string): Candidate[] {
  return candidateRegister().filter(
    (candidate) => candidate.investigation === investigationId,
  );
}

/**
 * A source's investigations, most-argued question first.
 *
 * `accounts.total` is the sort key because it is the closest thing the register
 * has to "how many people are having this argument": it puts the questions
 * Edmonton is actually arguing over at the top and sinks the hyper-specific
 * ones, which is the order a reader checking for cherry-picking wants.
 */
export function investigationsForSource(sourceId: string): InvestigationClaims[] {
  return investigationRegister()
    .filter((investigation) => investigation.source === sourceId)
    .map((investigation) => {
      const claims = claimsOf(investigation.id);
      const sides = new Set(claims.map((claim) => claim.side));
      return {
        investigation,
        claims,
        twoSided: sides.has('for') && sides.has('against'),
      };
    })
    .sort(
      (a, b) =>
        b.investigation.accounts.total - a.investigation.accounts.total ||
        a.investigation.id.localeCompare(b.investigation.id),
    );
}

/**
 * The register's outcomes, in the order `/considered` prints the entries that
 * came in one at a time, with the sentence each one is worth to a reader and
 * the colour it is filled in where a source's claims are listed as a table.
 *
 * On the hand-registered list the outcome is a section heading rather than a
 * badge: a declined claim is a decision the site defends, not a state to
 * colour-code. Inside a source it has to be a badge, because the point of
 * publishing a whole source is that sixty-odd dispositions can be read down one
 * column. The list lives here because `/considered` and `/considered/<id>` must
 * call the same outcome the same thing.
 *
 * `definition` is the line `/considered` prints in its key. Every label a
 * reader can see is defined there, so a badge is never a word the page expects
 * the reader to already know, and none of the definitions may leave "going
 * ahead" sounding like a verdict.
 */
export const REGISTER_SECTIONS = [
  {
    id: 'declined',
    outcome: 'NO',
    heading: 'Declined',
    badge: 'Declined',
    definition: 'Both readers turned it down for checking. Not a ruling that the claim is false.',
    fill: 'bg-brick text-white',
    edge: 'border-brick',
  },
  {
    id: 'parked',
    outcome: 'PARK',
    heading: 'Parked',
    badge: 'Parked',
    definition:
      'Kept, not dropped. Either the readers disagreed, or the public record cannot answer it yet.',
    fill: 'bg-navy text-white',
    edge: 'border-navy',
  },
  {
    id: 'not-answered',
    outcome: 'not-answered',
    heading: 'Checked, not answered',
    badge: 'Not answered',
    definition:
      'It went through a panel, and the public record could not answer it at the level people ask.',
    fill: 'bg-charcoal text-white',
    edge: 'border-charcoal',
  },
  {
    id: 'going-ahead',
    outcome: 'GO',
    heading: 'Going ahead',
    badge: 'Going ahead',
    definition: 'Worth checking, so a check is coming. That is all it says: nothing is settled yet.',
    fill: 'bg-forest text-white',
    edge: 'border-forest',
  },
  {
    id: 'variation',
    outcome: 'variation',
    heading: 'The same claim in other words',
    badge: 'Merged',
    definition: 'The same claim as another entry, said differently. It is dealt with there.',
    fill: 'bg-charcoal text-white',
    edge: 'border-charcoal',
  },
  {
    id: 'not-a-claim',
    outcome: 'not-a-claim',
    heading: 'Not a factual claim',
    badge: 'Not a claim',
    definition:
      'An opinion, a prediction or a value judgement, so no record could settle it either way.',
    fill: 'border border-rule-strong bg-wash text-muted',
    edge: 'border-rule-strong',
  },
  {
    id: 'pre-triage',
    outcome: 'pre-triage',
    heading: 'Checked before triage existed',
    badge: 'Pre-triage',
    definition: 'Registered before there was a triage step, so no reader ever ruled on it.',
    fill: 'border border-rule-strong bg-wash text-muted',
    edge: 'border-rule-strong',
  },
  {
    id: 'not-triaged',
    outcome: 'not-triaged',
    heading: 'Not yet triaged',
    badge: 'Not triaged',
    definition: 'Registered, and not yet put to the readers.',
    fill: 'border border-rule-strong bg-wash text-muted',
    edge: 'border-rule-strong',
  },
] as const;

const section = (outcome: string) =>
  REGISTER_SECTIONS.find((entry) => entry.outcome === outcome);

/** What to call an outcome in running text. Unknown values print themselves. */
export function outcomeHeading(outcome: string): string {
  return section(outcome)?.heading ?? outcome;
}

/** The badge word for an outcome, short enough to sit in a table column. */
export function outcomeBadge(outcome: string): string {
  return section(outcome)?.badge ?? outcome;
}

/** The badge fill, and the ledger row's left edge, for an outcome. */
export function outcomeFill(outcome: string): string {
  return section(outcome)?.fill ?? 'border border-rule-strong bg-wash text-muted';
}

export function outcomeEdge(outcome: string): string {
  return section(outcome)?.edge ?? 'border-rule-strong';
}

/**
 * The order the claims of one source are read in: what is being checked, then
 * what is waiting, then what was folded into another entry, then what was
 * turned down, then what was never a factual claim. Anything the list does not
 * name sorts last, in the register's own order.
 */
export const SOURCE_ORDER = ['GO', 'PARK', 'variation', 'NO', 'not-a-claim'] as const;

export function outcomeRank(outcome: string): number {
  const index = SOURCE_ORDER.indexOf(outcome as (typeof SOURCE_ORDER)[number]);
  return index === -1 ? SOURCE_ORDER.length : index;
}

/**
 * The key `/considered` prints before the entries: every outcome the register
 * actually uses, with its definition, in the order the entries themselves are
 * read in. Built from the register rather than written out on the page, so the
 * page cannot show a label it has not defined.
 */
export function registerKey(): Array<(typeof REGISTER_SECTIONS)[number]> {
  const used = new Set([
    ...investigationRegister().map((investigation) => investigation.outcome),
    ...candidateRegister().map((candidate) => candidate.outcome),
  ]);
  return REGISTER_SECTIONS.filter((section) => used.has(section.outcome)).sort(
    (a, b) => outcomeRank(a.outcome) - outcomeRank(b.outcome),
  );
}

/**
 * What the site calls the claim. A merged proposition is the plain sentence the
 * merge wrote; a hand-registered entry has only the wording it arrived in.
 */
export function claimText(candidate: Candidate): string {
  return candidate.proposition ?? candidate.wording;
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

/** The one-line "where this wording came from", shared by both register pages. */
export function provenance(candidate: Candidate): string {
  const origin = ORIGINS[candidate.origin] ?? candidate.origin;
  return candidate.supplied_by ? `${origin}, ${attribution(candidate.supplied_by)}` : origin;
}

/**
 * How many people discussed a question or a claim, in words. The one phrase the
 * site prints for any of these counts, at either level of the register.
 *
 * "Discussed by" is doing the work a printed split used to do. A bare total
 * next to a claim reads as corroboration if the verb lets it, and a count is of
 * the people who argued the claim either way, not of the people who assert it:
 * a proposition's captured wordings include the comments denying it. Discussed
 * claims no agreement, so the count is safe to print whole and the sides stay
 * where they belong, on each claim.
 *
 * People, not accounts: a pseudonym is one person within its source by
 * construction, so the count undercounts nobody and overcounts only across
 * sources, which no page adds up.
 */
export function discussedBy(people: number): string {
  return `Discussed by ${people} ${people === 1 ? 'person' : 'people'}`;
}

/** The label for the link to a candidate's story, when it has one. */
export function storyLinkLabel(candidate: Candidate): string {
  return candidate.outcome === 'not-answered'
    ? 'The story, kept for the record'
    : 'Where it was checked';
}

/**
 * The reports behind a candidate, in the order a page shows them. A candidate
 * with neither has no report to render; since whole-source intake it may still
 * have a page, because its captured wordings are worth a page of their own.
 */
export function reportsFor(candidate: Candidate): Array<{ label: string; path: string }> {
  return [
    candidate.intake && { label: 'Intake record', path: candidate.intake },
    candidate.triage && { label: 'Triage', path: candidate.triage },
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
 * The candidates that have a page under `/considered/<id>`: the ones with a
 * report to show, or the ones extracted from a source, whose page carries the
 * captured wordings and the disposition. `/considered/[id]` builds its routes
 * from this and the sitemap lists them from it, so "which candidates have a
 * page" is decided once.
 */
export function candidatesWithPages(): Array<{
  candidate: Candidate;
  reports: ReturnType<typeof reportsFor>;
}> {
  return candidateRegister()
    .map((candidate) => ({ candidate, reports: reportsFor(candidate) }))
    .filter(({ candidate, reports }) => reports.length > 0 || candidate.source !== undefined);
}

/**
 * Every captured wording that belongs to a published claim, gathered from the
 * register entries merged into it (`variation_of`). This is what lets someone
 * who commented on the original post find their own words on the site, under
 * the pseudonym and never under their name.
 *
 * Reads `candidateRegister()`, so a withheld entry contributes nothing: it has
 * no forms left by the time it gets here.
 */
export function formsForVariationTarget(
  targetId: string,
): Array<{ candidate: Candidate; form: CapturedForm }> {
  return candidateRegister()
    .filter((candidate) => candidate.variation_of === targetId)
    .flatMap((candidate) =>
      (candidate.forms ?? []).map((form) => ({ candidate, form })),
    );
}
