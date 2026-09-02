import { parse } from 'yaml';

/** The stages a candidate can be at. `pre-triage` predates triage existing. */
export type CandidateOutcome = 'GO' | 'PARK' | 'NO' | 'not-triaged' | 'pre-triage';

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

/** Every candidate in the register, in the order the file lists them. */
export function candidateRegister(): Candidate[] {
  return Object.values(sources)
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
      story: optional(entry.story),
    }))
    .filter((candidate) => candidate.id !== '');
}
