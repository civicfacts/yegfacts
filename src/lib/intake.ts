import { parse } from 'yaml';

/**
 * The stages a candidate can be at. `pre-triage` predates triage existing.
 * `not-answered` (methodology v1.13) is a claim we did check and then took off
 * the findings board, because the public record cannot answer it at the level
 * people ask it.
 */
export type CandidateOutcome =
  | 'GO'
  | 'PARK'
  | 'NO'
  | 'not-answered'
  | 'not-triaged'
  | 'pre-triage';

/** Where the wording came from. */
export type CandidateOrigin = 'captured' | 'supplied' | 'editor';

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
const sources = import.meta.glob<string>('../../intake/register.yaml', {
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

let registerCache: Candidate[] | undefined;

/** Every candidate in the register, in the order the file lists them. */
export function candidateRegister(): Candidate[] {
  if (registerCache) return registerCache;
  registerCache = Object.values(sources)
    .flatMap((raw) => {
      const parsed: unknown = parse(raw);
      const list = (parsed as { candidates?: unknown } | null)?.candidates;
      return Array.isArray(list) ? list : [];
    })
    .filter((entry): entry is Record<string, unknown> => typeof entry === 'object' && entry !== null)
    .map((entry) => ({
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
    }))
    .filter((candidate) => candidate.id !== '');
  return registerCache;
}

/**
 * The register's outcomes, in the order `/considered` prints them, with the
 * sentence each one is worth to a reader.
 *
 * The outcome is a section heading rather than a badge: a declined claim is a
 * decision the site defends, not a state to colour-code. The list lives here
 * because `/considered` and `/considered/<id>` must call the same outcome the
 * same thing, and a candidate page states in a sentence what the listing states
 * as a heading.
 */
export const REGISTER_SECTIONS = [
  { id: 'declined', outcome: 'NO', heading: 'Declined' },
  { id: 'parked', outcome: 'PARK', heading: 'Parked' },
  { id: 'not-answered', outcome: 'not-answered', heading: 'Checked, not answered' },
  { id: 'going-ahead', outcome: 'GO', heading: 'Going ahead' },
  { id: 'pre-triage', outcome: 'pre-triage', heading: 'Checked before triage existed' },
  { id: 'not-triaged', outcome: 'not-triaged', heading: 'Not yet triaged' },
] as const;

/** What to call an outcome in running text. Unknown values print themselves. */
export function outcomeHeading(outcome: string): string {
  return REGISTER_SECTIONS.find((section) => section.outcome === outcome)?.heading ?? outcome;
}

const ORIGINS: Record<string, string> = {
  captured: 'captured from a post',
  supplied: 'passed to us, source not captured',
  editor: 'our own hypothesis',
};

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

/** The label for the link to a candidate's story, when it has one. */
export function storyLinkLabel(candidate: Candidate): string {
  return candidate.outcome === 'not-answered'
    ? 'The story, kept for the record'
    : 'Where it was checked';
}

/**
 * The reports behind a candidate, in the order a page shows them. A candidate
 * with neither has no page of its own and nothing to link to.
 */
export function reportsFor(candidate: Candidate): Array<{ label: string; path: string }> {
  return [
    candidate.intake && { label: 'Intake record', path: candidate.intake },
    candidate.triage && { label: 'Triage', path: candidate.triage },
  ].filter((report): report is { label: string; path: string } => Boolean(report));
}
