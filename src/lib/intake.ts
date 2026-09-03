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
  /** What would have to be true, in one plain sentence. Shown as the claim. */
  proposition?: string;
  /** Which side of the source's argument the proposition serves. */
  side?: string;
  /** How many distinct people asserted it in the source. */
  commenters?: number;
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
 */
export function withholdsWording(entry: {
  names_person?: boolean;
  outcome: string;
}): boolean {
  // Only a decline. Parking a claim is a decision about when to check it, not
  // a refusal to repeat it, and most claims naming a person name an
  // office-holder doing something in office: a motion brought, a lane
  // installed. Those are the public record and the site names them, here and
  // in the stories. What is withheld is what two readers refused outright,
  // which under the triage rule can only be an allegation the site has no way
  // to put to the person.
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
 * `side` and `commenters` go with the wording: "against the argument" and "one
 * person said it" describe a claim this entry is refusing to show, so the site
 * never receives them either.
 */
export function redact(candidate: Candidate): Candidate {
  if (!withholdsWording(candidate)) return candidate;
  return {
    ...candidate,
    wording: WITHHELD_LABEL,
    proposition: WITHHELD_LABEL,
    side: undefined,
    commenters: undefined,
    forms: [],
    withheld: true,
  };
}

function toCandidate(entry: Record<string, unknown>): Candidate {
  return redact({
    id: text(entry.id),
    recorded: text(entry.recorded),
    origin: text(entry.origin),
    wording: text(entry.wording),
    outcome: text(entry.outcome),
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
    commenters: count(entry.commenters),
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

function list(key: 'candidates' | 'sources'): Record<string, unknown>[] {
  return Object.values(files)
    .flatMap((raw) => {
      const parsed: unknown = parse(raw);
      const entries = (parsed as Record<string, unknown> | null)?.[key];
      return Array.isArray(entries) ? entries : [];
    })
    .filter((entry): entry is Record<string, unknown> => typeof entry === 'object' && entry !== null);
}

let candidateCache: Candidate[] | undefined;
let sourceCache: Source[] | undefined;

/**
 * Every candidate in the register, in the order the file lists them, with
 * named-individual allegations already redacted (`redact`).
 */
export function candidateRegister(): Candidate[] {
  candidateCache ??= list('candidates')
    .map(toCandidate)
    .filter((candidate) => candidate.id !== '');
  return candidateCache;
}

/** Every source in the register, in the order the file lists them. */
export function sourceRegister(): Source[] {
  sourceCache ??= list('sources').map(toSource).filter((source) => source.id !== '');
  return sourceCache;
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
  const used = new Set(candidateRegister().map((candidate) => candidate.outcome));
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
 * Which side of the source's argument a proposition serves, in words. The
 * register's third value is `neither`, and "neither the argument" is not a
 * phrase, so that one takes a longer form.
 */
export function sideLabel(side: string): string {
  return side === 'neither' ? 'neither side of the argument' : `${side} the argument`;
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
