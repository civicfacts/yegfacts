/**
 * The rules `intake/register.yaml` has to satisfy, as a pure function.
 *
 * `scripts/validate.ts` owns the reporting and the filesystem; this module owns
 * the judgement, so the rules can be tested against fixtures instead of against
 * whatever the repository happens to contain today. Everything the rules need
 * from outside the file arrives through `RegisterWorld`.
 *
 * The rule that matters most is the quote rule. Whole-source intake attributes
 * verbatim words to a pseudonymous person, and a model that reworded a comment
 * — dropped a clause, fixed a typo, stitched two sentences — has put words in
 * that person's mouth. So every `forms[].quote` must be an exact substring of
 * the comment it cites, after curly quotes and runs of whitespace are
 * normalised and nothing else.
 *
 * The register has two levels of grouping and the rules keep them apart. An
 * investigation is one question, one brief, one panel run, and it carries the
 * triage outcome. A claim belongs to exactly one investigation and gets exactly
 * one finding, so it carries no outcome of its own — a claim with both would say
 * it was ruled on twice, and a claim with neither would say it was never ruled
 * on at all.
 */
import { isIsoDate } from './repo.ts';

export type Record_ = Record<string, unknown>;

export const CANDIDATE_OUTCOMES = [
  'GO',
  'PARK',
  'NO',
  'variation',
  'not-a-claim',
  'not-answered',
  'not-triaged',
  'pre-triage',
] as const;

export const CANDIDATE_ORIGINS = ['captured', 'supplied', 'editor'] as const;

export const SOURCE_KINDS = ['facebook-post', 'article', 'discussion', 'video'] as const;

/**
 * Triage rules on investigations, and it has three answers. The dispositions a
 * claim can be registered with on its own — a merge, an opinion, a check that
 * came back unanswered — are not decisions triage makes about a question.
 */
export const INVESTIGATION_OUTCOMES = ['GO', 'PARK', 'NO'] as const;

/** An investigation that parks or declines owes the reader a sentence saying why. */
export const INVESTIGATION_OUTCOMES_NEEDING_REASON = ['PARK', 'NO'] as const;

export const CLAIM_SIDES = ['for', 'against', 'neither'] as const;

/**
 * Outcomes that owe the reader a sentence saying why. `variation` and
 * `not-a-claim` are on the list for the same reason `PARK` and `NO` are —
 * `/considered` publishes them — and for one more: a withheld named-individual
 * entry prints its reason where its proposition would have gone, so the reason
 * has to stand on its own.
 */
export const OUTCOMES_NEEDING_REASON = [
  'PARK',
  'NO',
  'variation',
  'not-a-claim',
  'not-answered',
] as const;

/** What the checks need to know about the world outside the register file. */
export interface RegisterWorld {
  /** Does this repo-relative path exist at all? */
  exists(path: string): boolean;
  /** Does it exist and is it a directory? */
  isDirectory(path: string): boolean;
  /**
   * The capture's comments by index, or undefined when the file is missing or
   * unreadable — the missing-directory rule reports that, so the quote rule
   * stays quiet rather than reporting the same defect a second time.
   */
  comments(capture: string): Map<number, string> | undefined;
  /** The ids of claims that have been published. */
  claimIds: ReadonlySet<string>;
}

/**
 * Curly quotes and runs of whitespace normalised away; nothing else. A dropped
 * word or a corrected typo must still fail, which is the whole point.
 */
export function normaliseQuote(value: string): string {
  return value
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/** `comments.jsonl` as a map of index to text. Blank lines are skipped. */
export function readComments(jsonl: string): Map<number, string> {
  const comments = new Map<number, string>();
  for (const line of jsonl.split('\n')) {
    if (line.trim() === '') continue;
    const row = JSON.parse(line) as { index?: unknown; text?: unknown };
    if (typeof row.index === 'number' && typeof row.text === 'string') {
      comments.set(row.index, row.text);
    }
  }
  return comments;
}

export interface Register {
  candidates: unknown;
  sources?: unknown;
  investigations?: unknown;
}

const isRecord = (value: unknown): value is Record_ =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Every problem with the register, as sentences. Empty means it validates.
 * Order is the file's own, so a diff of the output reads down the file.
 */
export function registerProblems(register: Register, world: RegisterWorld): string[] {
  const problems: string[] = [];
  const fail = (message: string) => problems.push(message);

  const sources = Array.isArray(register.sources) ? register.sources : [];
  const candidates = Array.isArray(register.candidates) ? register.candidates : [];
  if (register.investigations !== undefined && !Array.isArray(register.investigations)) {
    fail('investigations must be a list');
  }
  const investigations = Array.isArray(register.investigations) ? register.investigations : [];

  // -------------------------------------------------------------------------
  // Sources
  // -------------------------------------------------------------------------
  const sourceById = new Map<string, Record_>();
  for (const [index, source] of sources.entries()) {
    if (!isRecord(source)) {
      fail(`source ${index + 1} must be a mapping`);
      continue;
    }
    const id = typeof source.id === 'string' ? source.id : '';
    const where = id === '' ? `source ${index + 1}` : `source ${id}`;
    if (id === '') fail(`${where}: needs an id`);
    else if (sourceById.has(id)) fail(`source id "${id}" appears more than once`);
    else sourceById.set(id, source);

    if (!SOURCE_KINDS.includes(source.kind as (typeof SOURCE_KINDS)[number])) {
      fail(`${where} kind: "${String(source.kind)}" is not one of ${SOURCE_KINDS.join(', ')}`);
    }
    if (!isIsoDate(asDate(source.captured))) {
      fail(`${where} captured: "${String(source.captured)}" is not an ISO-8601 date`);
    }
    // The capture is the evidence the quotes are checked against and the run is
    // the working behind the dispositions; a path that does not resolve makes
    // both unauditable.
    for (const field of ['capture', 'run'] as const) {
      const value = source[field];
      if (typeof value !== 'string' || value.trim() === '') {
        fail(`${where}: ${field} must be a repo-relative directory`);
      } else if (!world.isDirectory(value)) {
        fail(`${where}: ${field} directory "${value}" does not exist`);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Investigations
  //
  // What a claim is checked under, so what a claim's outcome means. The claims
  // are read first for the account counts, which are derived from them.
  // -------------------------------------------------------------------------
  const claimAccounts = new Map<string, number[]>();
  for (const candidate of candidates) {
    if (!isRecord(candidate) || typeof candidate.investigation !== 'string') continue;
    const counts = claimAccounts.get(candidate.investigation) ?? [];
    counts.push(typeof candidate.accounts === 'number' ? candidate.accounts : 0);
    claimAccounts.set(candidate.investigation, counts);
  }

  const investigationById = new Map<string, Record_>();
  for (const [index, investigation] of investigations.entries()) {
    if (!isRecord(investigation)) {
      fail(`investigation ${index + 1} must be a mapping`);
      continue;
    }
    const id = typeof investigation.id === 'string' ? investigation.id : '';
    const where = id === '' ? `investigation ${index + 1}` : `investigation ${id}`;
    if (id === '') fail(`${where}: needs an id`);
    else if (investigationById.has(id)) fail(`investigation id "${id}" appears more than once`);
    else investigationById.set(id, investigation);

    // The question is the brief's question, and an investigation without one is
    // a panel run with nothing to answer.
    if (typeof investigation.question !== 'string' || investigation.question.trim() === '') {
      fail(`${where}: needs the question it asks`);
    }
    if (!isIsoDate(asDate(investigation.recorded))) {
      fail(`${where} recorded: "${String(investigation.recorded)}" is not an ISO-8601 date`);
    }

    const outcome = String(investigation.outcome);
    if (!INVESTIGATION_OUTCOMES.includes(outcome as (typeof INVESTIGATION_OUTCOMES)[number])) {
      fail(`${where} outcome: "${outcome}" is not one of ${INVESTIGATION_OUTCOMES.join(', ')}`);
    }
    if (
      INVESTIGATION_OUTCOMES_NEEDING_REASON.includes(
        outcome as (typeof INVESTIGATION_OUTCOMES_NEEDING_REASON)[number],
      ) &&
      (typeof investigation.reason !== 'string' || investigation.reason.trim() === '')
    ) {
      fail(`${where}: outcome ${outcome} needs a public reason sentence`);
    }

    if (typeof investigation.source !== 'string' || !sourceById.has(investigation.source)) {
      fail(`${where}: source "${String(investigation.source)}" is not in the sources list`);
    }
    // The run is the working behind the grouping and the triage call on it.
    if (typeof investigation.run !== 'string' || investigation.run.trim() === '') {
      fail(`${where}: run must be a repo-relative directory`);
    } else if (!world.isDirectory(investigation.run)) {
      fail(`${where}: run directory "${investigation.run}" does not exist`);
    }

    // The account counts are derived from the claims, and a derived number that
    // is wrong misstates how many people are arguing the question. Distinct
    // accounts on the question cannot be fewer than the accounts on any one of
    // its claims, and cannot be more than every claim's accounts counted
    // separately, which is what the same account arguing twice would give.
    const counts = claimAccounts.get(id) ?? [];
    const accounts = isRecord(investigation.accounts) ? investigation.accounts : undefined;
    const total = accounts !== undefined ? accounts.total : undefined;
    if (typeof total !== 'number' || !Number.isInteger(total) || total < 0) {
      fail(`${where}: accounts.total must be the number of distinct accounts arguing the question`);
    } else if (counts.length === 0) {
      fail(`${where}: no claim is checked under it`);
    } else {
      const largest = Math.max(...counts);
      const sum = counts.reduce((running, value) => running + value, 0);
      if (total < largest || total > sum) {
        fail(
          `${where}: accounts.total ${total} is outside its claims' range ${largest} to ${sum}`,
        );
      }
    }
    for (const side of CLAIM_SIDES) {
      const value = accounts?.[side];
      if (value !== undefined && (!Number.isInteger(value) || (value as number) < 0)) {
        fail(`${where}: accounts.${side} must be a whole number of accounts`);
      }
    }
  }

  // -------------------------------------------------------------------------
  // Candidates
  // -------------------------------------------------------------------------
  const ids = new Set<string>();
  for (const candidate of candidates) {
    if (isRecord(candidate) && typeof candidate.id === 'string') ids.add(candidate.id);
  }

  // Both levels are published at `/considered/<id>`, so a shared id is two
  // pages fighting over one URL.
  for (const id of investigationById.keys()) {
    if (ids.has(id)) fail(`id "${id}" is both an investigation and a claim`);
  }

  const commentsFor = new Map<string, Map<number, string> | undefined>();

  const seen = new Set<string>();
  for (const [index, candidate] of candidates.entries()) {
    if (!isRecord(candidate)) {
      fail(`candidate ${index + 1} must be a mapping`);
      continue;
    }
    const id = typeof candidate.id === 'string' ? candidate.id : '';
    const where = id === '' ? `candidate ${index + 1}` : id;
    if (id === '') fail(`${where}: needs an id`);
    else if (seen.has(id)) fail(`id "${id}" appears more than once`);
    seen.add(id);

    // An outcome or an investigation, exactly one. A claim inside an
    // investigation is ruled on there, once, for every claim under the question;
    // a claim registered on its own was ruled on by itself. A claim with both
    // would carry two decisions that can disagree, and a claim with neither has
    // no decision at all.
    const investigation = candidate.investigation;
    const hasOutcome = candidate.outcome !== undefined;
    if (investigation !== undefined) {
      if (typeof investigation !== 'string' || !investigationById.has(investigation)) {
        fail(
          `${where}: investigation "${String(investigation)}" is not in the investigations list`,
        );
      }
      // One exception to inheriting, and it is the charter's, not a
      // convenience. A claim accusing a named person of wrongdoing or an
      // improper motive is declined whatever happens to the question around
      // it: an investigation into what councillors have disclosed can be
      // entirely worth running while the accusation inside it is one this site
      // has no way to put to the person. So the claim carries its own NO, and
      // it may carry nothing else that repeats the accusation.
      if (hasOutcome) {
        const ground = candidate.ground;
        if (ground !== 'right-of-reply') {
          fail(
            `${where}: triage ruled on its investigation, so it carries no outcome of its own ` +
              `unless it is declined on the right-of-reply ground`,
          );
        } else if (candidate.outcome !== 'NO') {
          fail(`${where}: a right-of-reply ground only ever accompanies an outcome of NO`);
        } else {
          if (candidate.names_person !== true) {
            fail(`${where}: declined on the right-of-reply ground, so it must be marked names_person`);
          }
          for (const field of ['proposition', 'wording', 'forms', 'variations'] as const) {
            if (candidate[field] !== undefined) {
              fail(
                `${where}: withheld on the right-of-reply ground, so it must carry no ${field}; ` +
                  `the register is published too`,
              );
            }
          }
          if (typeof candidate.reason !== 'string' || candidate.reason.trim() === '') {
            fail(`${where}: withheld, so the reason is all a reader gets and it cannot be empty`);
          }
        }
      }
      // Both are printed beside the claim, and the account count is what the
      // investigation's total is checked against.
      if (candidate.side === undefined) {
        fail(`${where}: needs the side of the argument it serves`);
      }
      if (candidate.accounts === undefined) {
        fail(`${where}: needs the number of accounts that argued it`);
      }
    } else if (!hasOutcome) {
      fail(`${where}: needs an investigation to be checked under, or an outcome of its own`);
    }

    const outcome = hasOutcome ? String(candidate.outcome) : '';
    if (
      hasOutcome &&
      !CANDIDATE_OUTCOMES.includes(outcome as (typeof CANDIDATE_OUTCOMES)[number])
    ) {
      fail(`${where} outcome: "${outcome}" is not one of ${CANDIDATE_OUTCOMES.join(', ')}`);
    }
    if (
      candidate.side !== undefined &&
      !CLAIM_SIDES.includes(candidate.side as (typeof CLAIM_SIDES)[number])
    ) {
      fail(`${where} side: "${String(candidate.side)}" is not one of ${CLAIM_SIDES.join(', ')}`);
    }
    if (
      candidate.accounts !== undefined &&
      (!Number.isInteger(candidate.accounts) || (candidate.accounts as number) < 1)
    ) {
      fail(`${where}: accounts must be the number of accounts that argued the claim`);
    }
    // Plain strings: a variation is another wording of the same assertion, and
    // one that says something else belongs in its own claim, which is a
    // judgement the grouping gate makes rather than a shape this can see.
    if (
      candidate.variations !== undefined &&
      (!Array.isArray(candidate.variations) ||
        candidate.variations.some(
          (variation) => typeof variation !== 'string' || variation.trim() === '',
        ))
    ) {
      fail(`${where}: variations must be a list of alternative wordings`);
    }
    if (!CANDIDATE_ORIGINS.includes(candidate.origin as (typeof CANDIDATE_ORIGINS)[number])) {
      fail(`${where} origin: "${String(candidate.origin)}" is not one of ${CANDIDATE_ORIGINS.join(', ')}`);
    }
    if (!isIsoDate(asDate(candidate.recorded))) {
      fail(`${where} recorded: "${String(candidate.recorded)}" is not an ISO-8601 date`);
    }

    if (OUTCOMES_NEEDING_REASON.includes(outcome as (typeof OUTCOMES_NEEDING_REASON)[number])) {
      if (typeof candidate.reason !== 'string' || candidate.reason.trim() === '') {
        fail(`${where}: outcome ${outcome} needs a public reason sentence`);
      }
    }

    // Both paths are rendered at `/considered/<id>`, so a path that does not
    // resolve is a page that silently loses a section.
    for (const field of ['triage', 'intake'] as const) {
      const value = candidate[field];
      if (value === undefined) continue;
      if (typeof value !== 'string' || value.trim() === '') {
        fail(`${where}: ${field} must be a repo-relative path`);
      } else if (!world.exists(value)) {
        fail(`${where}: ${field} record "${value}" does not exist`);
      }
    }

    // A variation says "this was checked over there"; with nothing to point at,
    // it says the claim was dropped and does not say where it went.
    if (outcome === 'variation' && candidate.variation_of === undefined) {
      fail(`${where}: outcome variation must name the entry it merged into (variation_of)`);
    }
    if (candidate.variation_of !== undefined) {
      const target = candidate.variation_of;
      if (typeof target !== 'string' || target.trim() === '') {
        fail(`${where}: variation_of must be a register id or a published claim id`);
      } else if (target === id) {
        fail(`${where}: variation_of cannot point at itself`);
      } else if (!ids.has(target) && !world.claimIds.has(target)) {
        fail(`${where}: variation_of "${target}" is neither a register id nor a published claim id`);
      }
    }

    // ----- the source, and the quotes it has to back up ---------------------
    const source = candidate.source;
    let comments: Map<number, string> | undefined;
    if (source !== undefined) {
      if (typeof source !== 'string' || !sourceById.has(source)) {
        fail(`${where}: source "${String(source)}" is not in the sources list`);
      } else {
        if (!commentsFor.has(source)) {
          const capture = sourceById.get(source)!.capture;
          commentsFor.set(
            source,
            typeof capture === 'string' ? world.comments(capture) : undefined,
          );
        }
        comments = commentsFor.get(source);
      }
    }

    const forms = candidate.forms;
    if (forms !== undefined) {
      if (!Array.isArray(forms)) {
        fail(`${where}: forms must be a list`);
      } else {
        if (source === undefined) {
          fail(`${where}: forms are quotes out of a capture, so the entry needs a source`);
        }
        for (const [position, form] of forms.entries()) {
          const at = `${where} forms[${position}]`;
          if (!isRecord(form)) {
            fail(`${at}: must be a mapping of commenter, quote and comment`);
            continue;
          }
          if (typeof form.commenter !== 'string' || form.commenter.trim() === '') {
            fail(`${at}: needs the commenter's pseudonym`);
          }
          if (typeof form.quote !== 'string' || form.quote.trim() === '') {
            fail(`${at}: needs the quote`);
            continue;
          }
          if (!Number.isInteger(form.comment)) {
            fail(`${at}: comment must be the integer index of the comment in the capture`);
            continue;
          }
          if (comments === undefined) continue;
          const cited = comments.get(form.comment as number);
          if (cited === undefined) {
            fail(`${at}: comment ${String(form.comment)} is not in the capture`);
            continue;
          }
          if (!normaliseQuote(cited).includes(normaliseQuote(form.quote))) {
            fail(
              `${at}: the quote is not in comment ${String(form.comment)}: "${form.quote.slice(0, 60)}"`,
            );
          }
        }
      }
    }
  }

  return problems;
}

/** YAML turns a bare `2026-08-31` into a Date; both forms are authored. */
function asDate(value: unknown): unknown {
  return value instanceof Date ? value.toISOString().slice(0, 10) : value;
}
