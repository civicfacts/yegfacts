/**
 * The rules `intake/register.yaml` has to satisfy, as a pure function.
 *
 * `scripts/validate.ts` owns the reporting and the filesystem; this module owns
 * the judgement, so the rules can be tested against fixtures instead of against
 * whatever the repository happens to contain today. Everything the rules need
 * from outside the file arrives through `RegisterWorld`.
 *
 * Two rules matter more than the rest, and both are about words attributed to a
 * real person. Whole-source intake takes a pseudonymous commenter's sentence and
 * puts it on the site, so:
 *
 *   - every variation's `wording` must be an exact substring of some comment in
 *     its source's capture, after curly quotes and runs of whitespace are
 *     normalised and nothing else. A model that dropped a clause, fixed a typo
 *     or stitched two sentences has put words in that person's mouth.
 *   - every variation's `author_name` must be a commenter label that appears in
 *     that capture. The field name invites a real name, and the pseudonym scheme
 *     dies the first time one is written there.
 *
 * The register has two levels and the rules keep them apart. A question is one
 * unit of work — one brief, one panel run, one gate audit — and it is the only
 * thing that carries state. A claim belongs to exactly one question and gets
 * exactly one finding, so it carries no state of its own: a claim with its own
 * would say it had been ruled on twice. The single exception is an accusation
 * against a named person, declined on the right-of-reply ground inside a
 * question that is going ahead.
 *
 * A claim may also carry `prior_triage`, the claim-level decision v1.16
 * superseded when triage moved up to the question. That is history and not
 * state: it decides nothing, and it exists so a brief author does not spend a
 * panel run on a claim two readers already refused.
 */
import { isIsoDate } from './repo.ts';

export type Record_ = Record<string, unknown>;

/** How far the work has got. */
export const LIFECYCLES = ['registered', 'briefed', 'panel-complete', 'gate-complete'] as const;

/**
 * The answers to "should we spend an investigation on this". Three, and only
 * three: `variation` was a claim relation and is gone, and `not-a-claim`
 * describes a proposition that never became a claim, which belongs to the
 * source record where the completeness promise lives.
 */
export const TRIAGE = ['go', 'park', 'no'] as const;

/** What a reader can see. A withdrawal leaves a tombstone, never a 404. */
export const PUBLICATION = ['unpublished', 'published', 'corrected', 'withdrawn'] as const;

/** A question that parks or declines owes the reader a sentence saying why. */
export const TRIAGE_NEEDING_REASON = ['park', 'no'] as const;

export const CLAIM_ORIGINS = ['captured', 'supplied', 'editor'] as const;

export const SOURCE_KINDS = ['facebook-post', 'article', 'discussion', 'video'] as const;

export const CLAIM_SIDES = ['for', 'against', 'neither'] as const;

/** The only ground on which a claim carries a decline of its own. */
export const DECLINE_GROUND = 'right-of-reply';

/**
 * The only ground on which a claim carries a park of its own (methodology
 * v1.24): the question was checked, the panel answered it, and this one claim
 * came back unanswerable on the record that exists.
 *
 * It is a different thing from a question parked at triage, which is a decision
 * about when to spend a run. This is what is left when the run has been spent:
 * the only instrument the search found cannot carry the proposition as posed,
 * and the proposition may be made more precise but never weaker to fit it. The
 * claim keeps its wording and its provenance — nothing here is withheld — and
 * it carries the reason and the condition on which it reopens, because a claim
 * dropped at the last stage without a public reason cannot be told apart from a
 * claim dropped for the answer it was going to give.
 */
export const PARK_GROUND = 'no-instrument';

/** A capture, as the rules need to see it. */
export interface Capture {
  /** Every comment's text, in the capture's order. */
  comments: readonly string[];
  /** Every commenter label the capture uses. Pseudonyms, never real names. */
  commenters: ReadonlySet<string>;
}

/** What the checks need to know about the world outside the register file. */
export interface RegisterWorld {
  /** Does this repo-relative path exist at all? */
  exists(path: string): boolean;
  /** Does it exist and is it a directory? */
  isDirectory(path: string): boolean;
  /**
   * A source's capture, or undefined when it is missing or unreadable — the
   * missing-directory rule reports that, so the wording rules stay quiet rather
   * than reporting the same defect a second time.
   */
  capture(path: string): Capture | undefined;
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

/** `comments.jsonl` as a capture. Blank lines are skipped. */
export function readCapture(jsonl: string): Capture {
  const comments: string[] = [];
  const commenters = new Set<string>();
  for (const line of jsonl.split('\n')) {
    if (line.trim() === '') continue;
    const row = JSON.parse(line) as { commenter?: unknown; text?: unknown };
    if (typeof row.text === 'string') comments.push(row.text);
    if (typeof row.commenter === 'string' && row.commenter !== '') commenters.add(row.commenter);
  }
  return { comments, commenters };
}

export interface Register {
  questions?: unknown;
  sources?: unknown;
  claims?: unknown;
}

const isRecord = (value: unknown): value is Record_ =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const list = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

const named = (value: unknown): string => (typeof value === 'string' ? value : '');

const filled = (value: unknown): boolean => typeof value === 'string' && value.trim() !== '';

/** A capture normalised once, however many variations quote it. */
interface NormalisedCapture {
  comments: string[];
  commenters: ReadonlySet<string>;
}

/**
 * Every problem with the register, as sentences. Empty means it validates.
 * Order is the file's own, so a diff of the output reads down the file.
 */
export function registerProblems(register: Register, world: RegisterWorld): string[] {
  const problems: string[] = [];
  const fail = (message: string) => problems.push(message);

  for (const [key, value] of Object.entries(register)) {
    if (value !== undefined && !Array.isArray(value)) fail(`${key} must be a list`);
  }
  const sources = list(register.sources);
  const questions = list(register.questions);
  const claims = list(register.claims);

  // -------------------------------------------------------------------------
  // Sources
  // -------------------------------------------------------------------------
  const sourceById = new Map<string, Record_>();
  for (const [index, source] of sources.entries()) {
    if (!isRecord(source)) {
      fail(`source ${index + 1} must be a mapping`);
      continue;
    }
    const id = named(source.id);
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
    // The capture is the evidence the wordings are checked against and the run
    // is the working behind the dispositions; a path that does not resolve makes
    // both unauditable.
    for (const field of ['capture', 'run'] as const) {
      const value = source[field];
      if (!filled(value)) fail(`${where}: ${field} must be a repo-relative directory`);
      else if (!world.isDirectory(value as string)) {
        fail(`${where}: ${field} directory "${String(value)}" does not exist`);
      }
    }

    // What the merge set aside as not a factual claim. The source's page is the
    // completeness record, so these are published; a wording with no reason is
    // a proposition quietly dropped.
    if (source.set_aside !== undefined) {
      if (!Array.isArray(source.set_aside)) {
        fail(`${where}: set_aside must be a list of set-aside propositions`);
      } else {
        for (const [position, entry] of source.set_aside.entries()) {
          const at = `${where} set_aside[${position}]`;
          if (!isRecord(entry)) {
            fail(`${at}: must be a mapping of wording and reason`);
            continue;
          }
          if (!filled(entry.wording)) fail(`${at}: needs the wording that was set aside`);
          if (!filled(entry.reason)) fail(`${at}: needs the reason it was set aside`);
          for (const key of Object.keys(entry)) {
            if (key !== 'wording' && key !== 'reason') {
              fail(`${at}: carries "${key}"; a set-aside proposition is a wording and a reason`);
            }
          }
        }
      }
    }
  }

  // -------------------------------------------------------------------------
  // Questions
  //
  // The claims are read first, for the account counts derived from them.
  // -------------------------------------------------------------------------
  const claimAccounts = new Map<string, number[]>();
  for (const claim of claims) {
    if (!isRecord(claim) || typeof claim.question !== 'string') continue;
    const counts = claimAccounts.get(claim.question) ?? [];
    counts.push(typeof claim.accounts === 'number' ? claim.accounts : 0);
    claimAccounts.set(claim.question, counts);
  }

  const questionById = new Map<string, Record_>();
  for (const [index, question] of questions.entries()) {
    if (!isRecord(question)) {
      fail(`question ${index + 1} must be a mapping`);
      continue;
    }
    const id = named(question.id);
    const where = id === '' ? `question ${index + 1}` : `question ${id}`;
    if (id === '') fail(`${where}: needs an id`);
    else if (questionById.has(id)) fail(`question id "${id}" appears more than once`);
    else questionById.set(id, question);

    // The question is the brief's question, and one without it is a panel run
    // with nothing to answer.
    if (!filled(question.question)) fail(`${where}: needs the question it asks`);
    if (!isIsoDate(asDate(question.recorded))) {
      fail(`${where} recorded: "${String(question.recorded)}" is not an ISO-8601 date`);
    }

    // Three fields, never one. "Registered, going ahead, not yet published" was
    // describable only as GO, which said nothing about how far the work had got
    // or whether a reader could see any of it.
    checkState(where, question, fail);
    const triage = named(question.triage);
    if (
      TRIAGE_NEEDING_REASON.includes(triage as (typeof TRIAGE_NEEDING_REASON)[number]) &&
      !filled(question.reason)
    ) {
      fail(`${where}: triage ${triage} needs a public reason sentence`);
    }

    // A question out of a whole-source run names its source and its run
    // directory; the seven registered one at a time, before whole-source intake
    // existed, name neither. What is not allowed is half of the pair.
    const source = question.source;
    const run = question.run;
    if (source !== undefined && !sourceById.has(named(source))) {
      fail(`${where}: source "${String(source)}" is not in the sources list`);
    }
    if (run !== undefined) {
      if (!filled(run)) fail(`${where}: run must be a repo-relative directory`);
      else if (!world.isDirectory(run as string)) {
        fail(`${where}: run directory "${String(run)}" does not exist`);
      }
    }
    if ((source === undefined) !== (run === undefined)) {
      fail(`${where}: a question out of a source names both its source and its run, or neither`);
    }

    for (const field of ['triage_report', 'intake'] as const) {
      const value = question[field];
      if (value === undefined) continue;
      if (!filled(value)) fail(`${where}: ${field} must be a repo-relative path`);
      else if (!world.exists(value as string)) {
        fail(`${where}: ${field} record "${String(value)}" does not exist`);
      }
    }

    if (source === undefined) continue;

    // The account counts are derived from the claims, and a derived number that
    // is wrong misstates how many people are arguing the question. Distinct
    // people on the question cannot be fewer than the people on any one of its
    // claims, and cannot be more than every claim's count added up, which is
    // what the same person arguing twice would give.
    const counts = claimAccounts.get(id) ?? [];
    const accounts = isRecord(question.accounts) ? question.accounts : undefined;
    const total = accounts?.total;
    if (typeof total !== 'number' || !Number.isInteger(total) || total < 0) {
      fail(`${where}: accounts.total must be the number of distinct people arguing the question`);
    } else if (counts.length === 0) {
      fail(`${where}: no claim is checked under it`);
    } else {
      const largest = Math.max(...counts);
      const sum = counts.reduce((running, value) => running + value, 0);
      if (total < largest || total > sum) {
        fail(`${where}: accounts.total ${total} is outside its claims' range ${largest} to ${sum}`);
      }
    }
    let whole = true;
    let split = 0;
    for (const side of CLAIM_SIDES) {
      const value = accounts?.[side];
      if (value === undefined) continue;
      if (!Number.isInteger(value) || (value as number) < 0) {
        fail(`${where}: accounts.${side} must be a whole number of people`);
        whole = false;
        continue;
      }
      split += value as number;
    }
    // And the split is those same people, counted once each. The register says
    // the sides add up to the total, so they have to: somebody who argued on
    // more than one side of a question is still one person on the question, and
    // a split that overshoots is that person counted twice. Which side they
    // belong on is a judgement about their own words, not arithmetic, so the
    // rule only refuses to publish a total the split contradicts.
    if (whole && typeof total === 'number' && Number.isInteger(total) && split !== total) {
      fail(
        `${where}: accounts.total ${total} is not the ${split} its for/against/neither ` +
          `split adds up to`,
      );
    }
  }

  // -------------------------------------------------------------------------
  // Claims
  // -------------------------------------------------------------------------
  const captures = new Map<string, NormalisedCapture | undefined>();
  const captureFor = (sourceId: string): NormalisedCapture | undefined => {
    if (!captures.has(sourceId)) {
      const directory = sourceById.get(sourceId)?.capture;
      const capture = typeof directory === 'string' ? world.capture(directory) : undefined;
      captures.set(
        sourceId,
        capture === undefined
          ? undefined
          : { comments: capture.comments.map(normaliseQuote), commenters: capture.commenters },
      );
    }
    return captures.get(sourceId);
  };

  const seen = new Set<string>();
  for (const [index, claim] of claims.entries()) {
    if (!isRecord(claim)) {
      fail(`claim ${index + 1} must be a mapping`);
      continue;
    }
    const id = named(claim.id);
    const where = id === '' ? `claim ${index + 1}` : id;
    if (id === '') fail(`${where}: needs an id`);
    else if (seen.has(id)) fail(`id "${id}" appears more than once`);
    // Questions and claims share a URL namespace, so a shared id is two pages
    // fighting over one address.
    else if (questionById.has(id)) fail(`id "${id}" is both a question and a claim`);
    seen.add(id);

    if (!isIsoDate(asDate(claim.recorded))) {
      fail(`${where} recorded: "${String(claim.recorded)}" is not an ISO-8601 date`);
    }
    if (!CLAIM_ORIGINS.includes(claim.origin as (typeof CLAIM_ORIGINS)[number])) {
      fail(`${where} origin: "${String(claim.origin)}" is not one of ${CLAIM_ORIGINS.join(', ')}`);
    }

    // Every claim is checked under a question. That is what a claim is.
    if (claim.question === undefined) {
      fail(`${where}: needs the question it is checked under`);
    } else if (!questionById.has(named(claim.question))) {
      fail(`${where}: question "${String(claim.question)}" is not in the questions list`);
    }

    checkClaimState(where, claim, fail);
    checkPriorTriage(where, claim, fail);

    // Both are printed beside the claim, and the account count is what the
    // question's total is checked against.
    if (claim.side === undefined) fail(`${where}: needs the side of the argument it serves`);
    else if (!CLAIM_SIDES.includes(claim.side as (typeof CLAIM_SIDES)[number])) {
      fail(`${where} side: "${String(claim.side)}" is not one of ${CLAIM_SIDES.join(', ')}`);
    }
    if (claim.accounts === undefined) fail(`${where}: needs the number of people who argued it`);
    else if (!Number.isInteger(claim.accounts) || (claim.accounts as number) < 1) {
      fail(`${where}: accounts must be the number of people who argued the claim`);
    }

    const source = claim.source;
    if (source !== undefined && !sourceById.has(named(source))) {
      fail(`${where}: source "${String(source)}" is not in the sources list`);
    }

    // ----- the wordings, and the people they are attributed to ---------------
    if (claim.variations === undefined) continue;
    if (!Array.isArray(claim.variations)) {
      fail(`${where}: variations must be a list of captured wordings`);
      continue;
    }
    for (const [position, variation] of claim.variations.entries()) {
      const at = `${where} variations[${position}]`;
      if (!isRecord(variation)) {
        fail(`${at}: must be a mapping of wording, source_id and author_name`);
        continue;
      }
      if (!filled(variation.wording)) fail(`${at}: needs the wording`);
      if (!filled(variation.author_name)) fail(`${at}: needs the author's pseudonym`);
      const sourceId = named(variation.source_id);
      if (sourceId === '' || !sourceById.has(sourceId)) {
        fail(`${at}: source_id "${String(variation.source_id)}" is not in the sources list`);
        continue;
      }
      const capture = captureFor(sourceId);
      if (capture === undefined) continue;

      // THE rule. A wording is somebody's actual words or it does not go on the
      // site, and "somebody's actual words" means a substring of a comment, not
      // a tidied-up version of one.
      if (filled(variation.wording)) {
        const wording = normaliseQuote(variation.wording as string);
        if (!capture.comments.some((comment) => comment.includes(wording))) {
          fail(
            `${at}: the wording is in no comment in ${sourceId}'s capture: ` +
              `"${(variation.wording as string).slice(0, 60)}"`,
          );
        }
      }
      // And the person it is attributed to is a pseudonym the capture uses. A
      // real name here would be a real name on the site.
      if (filled(variation.author_name) && !capture.commenters.has(variation.author_name as string)) {
        fail(
          `${at}: author_name "${String(variation.author_name)}" is not a commenter in ` +
            `${sourceId}'s capture`,
        );
      }
    }
  }

  return problems;
}

/** All three state fields, each from its own vocabulary. */
function checkState(where: string, question: Record_, fail: (message: string) => void): void {
  const fields = [
    ['lifecycle', LIFECYCLES],
    ['triage', TRIAGE],
    ['publication', PUBLICATION],
  ] as const;
  for (const [field, vocabulary] of fields) {
    if (question[field] === undefined) {
      fail(`${where}: needs a ${field} (${vocabulary.join(', ')})`);
    } else if (!(vocabulary as readonly string[]).includes(named(question[field]))) {
      fail(`${where} ${field}: "${String(question[field])}" is not one of ${vocabulary.join(', ')}`);
    }
  }
}

/**
 * A claim carries no state of its own, with two exceptions, and both name the
 * ground they stand on so neither can be reached by accident.
 *
 * The first is the charter's. A claim accusing a named person of wrongdoing or
 * an improper motive is declined whatever happens to the question around it: an
 * investigation into what councillors have disclosed can be entirely worth
 * running while the accusation inside it is one this site has no way to put to
 * the person. So the claim carries its own decline, and it may carry nothing
 * else that repeats the accusation — the register is published too.
 *
 * The second is the run's. A claim the panel answered and the run could not
 * publish — because the only instrument that exists cannot carry the
 * proposition, and a proposition may be made more precise but never weaker — is
 * parked on its own while the question around it goes ahead. See `PARK_GROUND`.
 */
function checkClaimState(where: string, claim: Record_, fail: (message: string) => void): void {
  for (const field of ['lifecycle', 'publication'] as const) {
    if (claim[field] !== undefined) {
      fail(`${where}: ${field} is the question's, so a claim never carries one`);
    }
  }

  const ground = claim.ground;
  if (claim.triage === undefined && ground === undefined) return;

  if (ground === PARK_GROUND) {
    if (claim.triage !== 'park') {
      fail(`${where}: a ${PARK_GROUND} ground only ever accompanies a triage of park`);
      return;
    }
    // The reason is the whole point of parking a claim in public: it says the
    // site tried, what stopped it, and what would let it try again.
    if (!filled(claim.reason)) {
      fail(
        `${where}: parked on the ${PARK_GROUND} ground, so it needs the reason a reader is shown, ` +
          `including what would reopen it`,
      );
    }
    return;
  }

  if (ground !== DECLINE_GROUND) {
    fail(
      `${where}: triage ruled on its question, so it carries no triage of its own ` +
        `unless it is declined on the ${DECLINE_GROUND} ground or parked on the ${PARK_GROUND} ground`,
    );
    return;
  }
  if (claim.triage !== 'no') {
    fail(`${where}: a ${DECLINE_GROUND} ground only ever accompanies a triage of no`);
    return;
  }
  if (claim.names_person !== true) {
    fail(`${where}: declined on the ${DECLINE_GROUND} ground, so it must be marked names_person`);
  }
  for (const field of ['proposition', 'wording', 'variations'] as const) {
    if (claim[field] !== undefined) {
      fail(
        `${where}: withheld on the ${DECLINE_GROUND} ground, so it must carry no ${field}; ` +
          `the register is published too`,
      );
    }
  }
  if (!filled(claim.reason)) {
    fail(`${where}: withheld, so the reason is all a reader gets and it cannot be empty`);
  }
}

/**
 * The claim-level decision v1.16 superseded, on the claims that kept it.
 *
 * When triage moved up to the question, the decisions made at the old level
 * went with it, and eleven propositions two readers had independently refused
 * became live claims under questions that are going ahead, with nothing
 * anywhere saying they had been refused. `prior_triage` puts that back without
 * putting state back: the question still decides whether the work happens, and
 * this only tells the next brief author that two readers already read this one
 * and said no, and on what ground.
 *
 * So it is checked as a record rather than as a disposition — an outcome, the
 * readers who reached it, and the sentence they gave. A superseded decision
 * with no reason is worse than none, because it stops a panel run without
 * saying why.
 */
function checkPriorTriage(where: string, claim: Record_, fail: (message: string) => void): void {
  const prior = claim.prior_triage;
  if (prior === undefined) return;

  // A claim declined on the right-of-reply ground carries that decline live. A
  // superseded one beside it would say the claim had been ruled on twice, which
  // is the thing the two levels are kept apart to prevent.
  if (claim.ground === DECLINE_GROUND) {
    fail(`${where}: declined on the ${DECLINE_GROUND} ground, so its decline is live, not prior`);
    return;
  }
  if (!isRecord(prior)) {
    fail(`${where}: prior_triage must be a mapping of outcome, readers and reason`);
    return;
  }
  if (!TRIAGE.includes(prior.outcome as (typeof TRIAGE)[number])) {
    fail(
      `${where} prior_triage outcome: "${String(prior.outcome)}" is not one of ${TRIAGE.join(', ')}`,
    );
  }
  // Named, and more than one. "The readers declined it" is worth nothing to a
  // reader who cannot see how many there were or who they were, and the
  // claim-level read is two seats that never saw each other's answer.
  const readers = prior.readers;
  if (!Array.isArray(readers) || readers.length < 2 || !readers.every(filled)) {
    fail(`${where}: prior_triage must name the two or more readers who reached it`);
  }
  if (!filled(prior.reason)) fail(`${where}: prior_triage needs the reason those readers gave`);
  for (const key of Object.keys(prior)) {
    if (key !== 'outcome' && key !== 'readers' && key !== 'reason') {
      fail(`${where}: prior_triage carries "${key}"; it is an outcome, its readers and a reason`);
    }
  }
}

/** YAML turns a bare `2026-08-31` into a Date; both forms are authored. */
function asDate(value: unknown): unknown {
  return value instanceof Date ? value.toISOString().slice(0, 10) : value;
}
