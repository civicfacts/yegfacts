/**
 * The two-round seat-failure ground (methodology v1.43, D-0048 rule 1).
 *
 * A document the frozen brief names qualifies to be carried when every panel
 * seat recorded a failure to read it in two consecutive committed rounds of the
 * same run, whatever later quick probes show. The evidence is the seats' own
 * committed answers, never a probe and never the editor's account of them.
 *
 * Which rounds count. Every run.yaml of the run is read: <run>/run.yaml and
 * <run>/<dir>/run.yaml one level down, which is where a stopped round is moved
 * when it is superseded (superseded-<date>/) or written with --into. A round is
 * one run.yaml's ok rows for one round number; its answers are at
 * <dir>/round<N>/<seat>.json, or <dir>/<seat>.json for an --into directory.
 * Rounds are ordered by their earliest start time, and "consecutive" means
 * next to each other in that order. Each of the three pinned seats
 * (seat-probe.ts, SEAT_MODELS) must have an ok row and an answer in both.
 *
 * Every run.yaml must name this run's story and date (its directory path);
 * one copied from another run stops the ground. Each seat and round needs its
 * own answer file.
 *
 * What counts as a recorded failure, read mechanically from each seat's answer:
 * a sentence in one of its statements (a claim's limitations, unknowns,
 * interpretation notes or missing-evidence descriptions, or an evidence
 * entry's finding and quote) that carries a failure marker tied to the
 * document. The markers are an HTTP status of 400 or above (written "HTTP
 * 502", "returned 403", or "502 Bad Gateway" and the like) or a failure phrase
 * ("could not read", "unable to open", "fetch error" ...). A marker is tied to
 * the document when the nearest document mentioned before it in the sentence is
 * this one: its URL (sameDocumentUrl: query string kept, and on the meeting
 * portal exactly the same DocumentId), the URL's file name when the URL has no
 * query string, or a name the run declares for it, each of which must appear
 * in the frozen brief. With no mention before the marker, the sentence must
 * mention this document and no other. A sentence that mentions no document
 * counts only inside an evidence entry whose source_url is this document's
 * URL, or when it opens "It", "This"
 * or "The PDF" right after a sentence that names this document and no other.
 * Other documents are any other URL or file name, a numbered reference such as
 * "Attachment 4" or "Bylaw 20226" that is not itself a declared name, and a
 * portal, meeting page, (meeting) minutes, agenda, index or FAQ. So "the bylaw relies on
 * Attachment 4, which returned HTTP 502" does not count, and when the sentence
 * cannot say which document failed, it does not count either.
 *
 * A seat that read the document directly says so, and the carried-documents
 * section asks it to write "read directly from <URL>". A sentence tied to the
 * document the same way that says "read directly" or "read it directly" is a
 * direct read, and it overrides every failure that seat recorded in that
 * round, the same sentence included. A direct read by any seat, in either of
 * the two rounds or any later round of the run, refuses the ground.
 *
 * The ground is recorded per seat per round: the answer file, where in it, the
 * seat's own words, the status or error, the seat's model and tool, and the
 * row's start and finish times. Successful quick probes are recorded beside it
 * and do not erase it. Nothing here says the source is unavailable: it shows
 * only that the seats' research tools failed to retrieve it.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { SEAT_MODELS, type SeatName, type SeatProbe } from './seat-probe.ts';

export type SeatFailure = {
  seat: SeatName;
  model: string;
  tool: string;
  /** The answer file, relative to the run directory. */
  file: string;
  started_at: string;
  finished_at: string;
  /** Where in the answer, e.g. claims[0].limitations[1]. */
  where: string;
  /** The seat's own words: the exact sentence that ties the failure to the document. */
  words: string;
  /** The sentence before it, when that sentence names the document and this one refers back ("It ..."). */
  antecedent?: string;
  http_status: number | null;
  error: string | null;
};

export type FailedRound = {
  /** The round's answers, relative to the run directory, e.g. superseded-2026-10-02/round1. */
  round: string;
  /** The run.yaml whose rows give the seats and times, relative to the run directory. */
  run_yaml: string;
  round_number: number;
  started_at: string;
  seats: SeatFailure[];
};

/** A successful quick probe recorded beside the failures; it does not erase them. */
export type QuickProbe = { by: string; probed_at: string; http_status: number | null; outcome: string };

export type TwoRoundGround = {
  /** Names the run declared for the document besides its URL, each in the frozen brief. */
  names: string[];
  rounds: FailedRound[];
};

type RunRow = {
  provider?: string;
  model_id?: string;
  round?: number;
  status?: string;
  started_at?: string;
  finished_at?: string;
};

type CommittedRound = {
  /** Answers directory, relative to the run directory. */
  rel: string;
  manifest: string;
  number: number;
  startedAt: string;
  rows: Array<{ seat: SeatName; model: string; file: string; startedAt: string; finishedAt: string }>;
};

const seatForModel = (model: string | undefined): SeatName | undefined =>
  (Object.keys(SEAT_MODELS) as SeatName[]).find((seat) => SEAT_MODELS[seat].model === model);

/** Every run.yaml of a run: its own, and one level down (superseded and --into directories). */
export function runManifests(runDir: string): string[] {
  const files = existsSync(path.join(runDir, 'run.yaml')) ? [path.join(runDir, 'run.yaml')] : [];
  for (const name of existsSync(runDir) ? readdirSync(runDir).sort() : []) {
    const file = path.join(runDir, name, 'run.yaml');
    if (statSync(path.join(runDir, name)).isDirectory() && existsSync(file)) files.push(file);
  }
  return files;
}

/**
 * The run's rounds that have answers on disk, oldest first.
 *
 * @throws when a nested run.yaml names another story or date than the run
 *   (its directory path, and its own run.yaml when there is one), or when one
 *   answer file would stand for two rounds. Answers sit in <dir>/round<N>/;
 *   flat <dir>/<seat>.json files (an --into directory) count only for a
 *   run.yaml that records a single round number.
 */
export function committedRounds(runDir: string): CommittedRound[] {
  const rounds: CommittedRound[] = [];
  const identity = { story: path.basename(path.dirname(runDir)), date: path.basename(runDir) };
  const used = new Map<string, string>();
  for (const manifest of runManifests(runDir)) {
    const dir = path.dirname(manifest);
    const parsed = (YAML.parse(readFileSync(manifest, 'utf8')) ?? {}) as { story?: unknown; date?: unknown; runs?: RunRow[] };
    if (String(parsed.story) !== identity.story || String(parsed.date) !== identity.date) {
      throw new Error(
        `${path.relative(runDir, manifest)} describes story "${String(parsed.story)}", date "${String(parsed.date)}", not this run (${identity.story} ${identity.date}); a round from another run never counts`,
      );
    }
    const rows = (parsed.runs ?? []).filter((row) => row.status === 'ok' && Number.isInteger(row.round));
    const numbers = [...new Set(rows.map((row) => row.round!))].sort();
    for (const number of numbers) {
      const candidates = [path.join(dir, `round${number}`), ...(numbers.length === 1 && dir !== runDir ? [dir] : [])];
      const answers = candidates.find((candidate) =>
        rows.some((row) => row.round === number && existsSync(path.join(candidate, `${seatForModel(row.model_id)}.json`))),
      );
      if (!answers) continue;
      const seats = rows
        .filter((row) => row.round === number)
        .flatMap((row) => {
          const seat = seatForModel(row.model_id);
          const file = seat ? path.join(answers, `${seat}.json`) : '';
          if (!seat || !existsSync(file)) return [];
          return [{ seat, model: row.model_id!, file: path.relative(runDir, file), startedAt: row.started_at ?? '', finishedAt: row.finished_at ?? '' }];
        });
      if (seats.length === 0) continue;
      const label = `${path.relative(runDir, manifest)} round ${number}`;
      for (const seat of seats) {
        const before = used.get(seat.file);
        if (before) throw new Error(`${seat.file} would stand for both ${before} and ${label}; each seat and round needs its own answer file`);
        used.set(seat.file, label);
      }
      rounds.push({
        rel: path.relative(runDir, answers) || '.',
        manifest: path.relative(runDir, manifest),
        number,
        startedAt: seats.map((s) => s.startedAt).sort()[0] ?? '',
        rows: seats,
      });
    }
  }
  return rounds.sort((a, b) => a.startedAt.localeCompare(b.startedAt) || a.rel.localeCompare(b.rel));
}

const STATUS_PATTERNS = [
  /\bHTTP\s*([45]\d\d)\b/i,
  /\b([45]\d\d)\s+(?:Bad Gateway|Forbidden|Not Found|Service Unavailable|Gateway Time-?out|Too Many Requests|Internal Server Error|Unauthorized)\b/i,
  /\breturned\s+(?:an?\s+)?(?:HTTP\s+)?(?:status\s+)?([45]\d\d)\b/i,
];
const FAILURE_PHRASE =
  /\b(fetch error|could not (?:read|open|retrieve|fetch|extract|decompress|access|load)|unable to (?:read|open|retrieve|fetch|access|load)|failed to (?:read|open|retrieve|fetch|load)|timed out)\b/i;
const DIRECT_READ = /\bread (?:it |the (?:pdf|document|file|page) )?directly\b/i;

/** The failure a sentence records: an HTTP status of 400 or above, or a failure phrase. */
export function failureMarker(sentence: string): { http_status: number | null; error: string | null } | undefined {
  for (const pattern of STATUS_PATTERNS) {
    const match = pattern.exec(sentence);
    if (match) return { http_status: Number(match[1]), error: null };
  }
  const phrase = FAILURE_PHRASE.exec(sentence);
  return phrase ? { http_status: null, error: phrase[1]!.toLowerCase() } : undefined;
}

/** Sentences of a statement; a full stop inside a URL, a number or an abbreviation like "s.38" does not split. */
export function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * A URL as compared: scheme and host in lower case, `%26` read as `&`, and no
 * trailing slash on the path. The query string is kept, because on the meeting
 * portal it is what names the file.
 */
export function normaliseUrl(url: string): string {
  const raw = url.trim().replace(/[.,;:]+$/, '').replace(/%26/gi, '&');
  try {
    const parsed = new URL(raw);
    const pathname = parsed.pathname.length > 1 ? parsed.pathname.replace(/\/+$/, '') : parsed.pathname;
    return `${parsed.protocol.toLowerCase()}//${parsed.host.toLowerCase()}${pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return raw;
  }
}

/**
 * Whether two URLs name the same document. On the meeting portal
 * (escribemeetings.com) a file is its DocumentId: the same host and path and
 * exactly the same DocumentId value. Anywhere else the normalised URLs must be
 * equal, query string included.
 */
export function sameDocumentUrl(a: string, b: string): boolean {
  const x = normaliseUrl(a);
  const y = normaliseUrl(b);
  try {
    const ux = new URL(x);
    const uy = new URL(y);
    const portal = /(^|\.)escribemeetings\.com$/i.test(ux.hostname);
    const idX = ux.searchParams.get('DocumentId');
    if (portal && idX !== null) {
      return ux.host === uy.host && ux.pathname.toLowerCase() === uy.pathname.toLowerCase() && idX === uy.searchParams.get('DocumentId');
    }
  } catch {
    // Not URLs: compared as written below.
  }
  return x === y;
}

type Statement = { where: string; text: string; evidenceFor?: string };

function statements(answer: unknown): Statement[] {
  const out: Statement[] = [];
  const claims = ((answer ?? {}) as { claims?: unknown[] }).claims ?? [];
  claims.forEach((raw, c) => {
    const claim = (raw ?? {}) as Record<string, unknown>;
    const strings = (field: string) => {
      const value = claim[field];
      if (typeof value === 'string') out.push({ where: `claims[${c}].${field}`, text: value });
      if (Array.isArray(value)) {
        value.forEach((entry, i) => {
          if (typeof entry === 'string') out.push({ where: `claims[${c}].${field}[${i}]`, text: entry });
        });
      }
    };
    strings('interpretation_notes');
    strings('limitations');
    strings('unknowns');
    for (const field of ['missing_evidence']) {
      const list = claim[field];
      if (!Array.isArray(list)) continue;
      list.forEach((entry, i) => {
        const description = (entry as { description?: unknown })?.description;
        if (typeof description === 'string') out.push({ where: `claims[${c}].${field}[${i}].description`, text: description });
      });
    }
    for (const field of ['supporting_evidence', 'challenging_evidence']) {
      const list = claim[field];
      if (!Array.isArray(list)) continue;
      list.forEach((entry, i) => {
        const e = (entry ?? {}) as Record<string, unknown>;
        const text = [e.finding, e.quote].filter((v): v is string => typeof v === 'string').join(' ');
        if (text) out.push({ where: `claims[${c}].${field}[${i}]`, text, evidenceFor: typeof e.source_url === 'string' ? e.source_url : '' });
      });
    }
  });
  return out;
}

export type SeatReading =
  | { status: 'failed'; where: string; words: string; antecedent?: string; http_status: number | null; error: string | null }
  | { status: 'read'; where: string; words: string }
  | { status: 'no record' };

const NUMBERED_REFERENCE = /\b(?:Attachment|Bylaw|Report|Schedule|Appendix|Item|Motion)\s+[A-Z]*\d(?:[\w.-]*\w)?/gi;
const OTHER_GENERIC = /\b(?:meeting )?portal\b|\bmeeting pages?\b|\b(?:the|meeting|post-meeting|council|committee)\s+minutes\b|\bagenda\b|\bindex\b|\bFAQ\b/gi;
const ANY_URL = /https?:\/\/[^\s)>\]"'`]+/gi;
const ANY_FILE = /\b[\w-]+(?:\.[\w-]+)*\.(?:pdf|aspx|html?|docx?|xlsx?)\b/gi;
const ANAPHOR = /^(?:It|This|That|The (?:file|PDF|document|page))\b/;

type Mention = { at: number; end: number; ours: boolean };

/**
 * Every document a sentence mentions, ours or another, in order. Ours: the
 * URL, its file name, or a declared name. Another: any other URL or file
 * name, a numbered reference ("Attachment 4", "Bylaw 20226") that is not
 * itself a declared name, or a portal, meeting page, meeting minutes,
 * agenda, index or FAQ. A declared name inside another document's numbered reference is
 * that other document.
 */
function mentionsIn(sentence: string, doc: { url: string; fileName: string; names: readonly string[] }): Mention[] {
  const spans = (pattern: RegExp, ours: boolean) => [...sentence.matchAll(pattern)].map((m) => ({ at: m.index!, end: m.index! + m[0].length, ours, text: m[0] }));
  const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const declared = (text: string) => doc.names.some((name) => name.toLowerCase() === text.toLowerCase());
  const urls = spans(ANY_URL, false);
  const ours = [
    ...urls.filter((m) => sameDocumentUrl(m.text, doc.url)).map((m) => ({ ...m, ours: true })),
    ...(doc.fileName.length > 4 ? spans(new RegExp(`\\b${escape(doc.fileName)}\\b`, 'gi'), true) : []),
    ...doc.names.flatMap((name) => spans(new RegExp(`\\b${escape(name)}\\b`, 'gi'), true)),
  ];
  const others = [
    ...urls.filter((m) => !sameDocumentUrl(m.text, doc.url)),
    ...spans(ANY_FILE, false).filter((m) => m.text.toLowerCase() !== doc.fileName.toLowerCase()),
    ...spans(NUMBERED_REFERENCE, false).filter((m) => !declared(m.text)),
    ...spans(OTHER_GENERIC, false),
  ];
  const overlaps = (a: { at: number; end: number }, b: { at: number; end: number }) => a.at < b.end && b.at < a.end;
  // A numbered reference to another document swallows a declared name inside it ("Bylaw" in "Bylaw 20226").
  const keptOurs = ours.filter((o) => !others.some((x) => overlaps(o, x) && x.end - x.at > o.end - o.at));
  // Another URL or file name inside our own URL is ours.
  const keptOthers = others.filter((x) => !keptOurs.some((o) => overlaps(o, x) && o.end - o.at >= x.end - x.at));
  return [...keptOurs, ...keptOthers].sort((a, b) => a.at - b.at).map(({ at, end, ours: isOurs }) => ({ at, end, ours: isOurs }));
}

/** Every failure marker in a sentence, with where it starts. */
function markersIn(sentence: string): Array<{ at: number; http_status: number | null; error: string | null }> {
  const found: Array<{ at: number; http_status: number | null; error: string | null }> = [];
  for (const pattern of STATUS_PATTERNS) {
    for (const m of sentence.matchAll(new RegExp(pattern.source, 'gi'))) found.push({ at: m.index!, http_status: Number(m[1]), error: null });
  }
  for (const m of sentence.matchAll(new RegExp(FAILURE_PHRASE.source, 'gi'))) found.push({ at: m.index!, http_status: null, error: m[1]!.toLowerCase() });
  return found.sort((a, b) => a.at - b.at);
}

/**
 * Whether the thing at `at` in a sentence is tied to our document: the
 * nearest document mentioned before it is ours; or, with nothing mentioned
 * before it, the sentence mentions ours and no other document; or the
 * sentence mentions no document at all and its context names ours alone (an
 * evidence entry citing our URL, or a sentence opening "It" or "The PDF"
 * right after one that names ours and nothing else). Anything else, including
 * a sentence where another document is the nearest, does not count.
 */
function tiedToOurs(mentions: Mention[], at: number, context: boolean): boolean {
  const before = mentions.filter((m) => m.end <= at).at(-1);
  if (before) return before.ours;
  if (mentions.length > 0) return mentions.every((m) => m.ours);
  return context;
}

/**
 * What one seat's answer records about `url`: a direct read, a failure, or
 * nothing. A direct read anywhere in the answer overrides every failure in it.
 * A failure with an HTTP status is preferred over one with a phrase. The
 * record keeps the exact sentence, and the sentence before it when the
 * failure sentence refers back ("It returned HTTP 502").
 */
export function readSeatAnswer(answer: unknown, url: string, names: readonly string[]): SeatReading {
  // A file name identifies the document only when no query string does: a portal file is its DocumentId.
  const parsed = (() => {
    try {
      return new URL(normaliseUrl(url));
    } catch {
      return undefined;
    }
  })();
  const fileName = parsed && !parsed.search ? decodeURIComponent(parsed.pathname.split('/').pop() ?? '') : '';
  const doc = { url, fileName, names };
  let failure: Extract<SeatReading, { status: 'failed' }> | undefined;
  for (const statement of statements(answer)) {
    if (statement.evidenceFor !== undefined && !sameDocumentUrl(statement.evidenceFor, url)) continue;
    const parts = sentences(statement.text);
    for (const [index, sentence] of parts.entries()) {
      const mentions = mentionsIn(sentence, doc);
      const previous = index > 0 ? mentionsIn(parts[index - 1]!, doc) : [];
      const anaphora = ANAPHOR.test(sentence) && previous.length > 0 && previous.every((m) => m.ours);
      const context = statement.evidenceFor !== undefined || anaphora;
      const read = DIRECT_READ.exec(sentence);
      if (read) {
        const after = mentions.find((m) => m.at >= read.index);
        if (after ? after.ours : tiedToOurs(mentions, read.index, context)) return { status: 'read', where: statement.where, words: sentence };
      }
      const tied = markersIn(sentence).filter((m) => tiedToOurs(mentions, m.at, context));
      const marker = tied.find((m) => m.http_status !== null) ?? tied[0];
      if (!marker) continue;
      const candidate: Extract<SeatReading, { status: 'failed' }> = {
        status: 'failed',
        where: statement.where,
        words: sentence,
        ...(mentions.length === 0 && anaphora ? { antecedent: parts[index - 1]! } : {}),
        http_status: marker.http_status,
        error: marker.error,
      };
      if (!failure || (failure.http_status === null && marker.http_status !== null)) failure = candidate;
    }
  }
  return failure ?? { status: 'no record' };
}

export type TwoRoundResult =
  | { ok: true; ground: TwoRoundGround }
  | { ok: false; reason: string };

/**
 * The two-round ground for `url` in `runDir`: the latest pair of consecutive
 * committed rounds in which every pinned seat recorded a failure, with no
 * direct read in either round or any later one.
 *
 * @param names names the run declares for the document; each must appear in
 *   `brief` (case-insensitive), or the ground is refused.
 */
export function twoRoundGround(runDir: string, url: string, names: readonly string[], brief: string): TwoRoundResult {
  const missing = names.filter((name) => !brief.toLowerCase().includes(name.toLowerCase()));
  if (missing.length > 0) return { ok: false, reason: `declared name(s) ${missing.map((n) => `"${n}"`).join(', ')} do not appear in the frozen brief` };
  let rounds: CommittedRound[];
  try {
    rounds = committedRounds(runDir);
  } catch (error) {
    return { ok: false, reason: (error as Error).message };
  }
  const pinned = Object.keys(SEAT_MODELS) as SeatName[];
  const readings = rounds.map((round) =>
    pinned.map((seat) => {
      const row = round.rows.find((r) => r.seat === seat);
      if (!row) return { seat, row, reading: { status: 'no record' } as SeatReading };
      const answer = JSON.parse(readFileSync(path.join(runDir, row.file), 'utf8')) as unknown;
      return { seat, row, reading: readSeatAnswer(answer, url, names) };
    }),
  );
  const directRead = (from: number) =>
    readings.slice(from).flatMap((round, i) =>
      round.filter((r) => r.reading.status === 'read').map((r) => `${r.seat} in ${rounds[from + i]!.rel}`),
    );
  for (let index = rounds.length - 1; index >= 1; index -= 1) {
    const pair = [index - 1, index];
    if (!pair.every((i) => readings[i]!.every((r) => r.reading.status === 'failed'))) continue;
    const reads = directRead(index - 1);
    if (reads.length > 0) return { ok: false, reason: `a seat read ${url} directly (${reads.join(', ')})` };
    return {
      ok: true,
      ground: {
        names: [...names],
        rounds: pair.map((i) => ({
          round: rounds[i]!.rel,
          run_yaml: rounds[i]!.manifest,
          round_number: rounds[i]!.number,
          started_at: rounds[i]!.startedAt,
          seats: readings[i]!.map(({ seat, row, reading }) => {
            const failed = reading as Extract<SeatReading, { status: 'failed' }>;
            return {
              seat,
              model: row!.model,
              tool: SEAT_MODELS[seat].tool,
              file: row!.file,
              started_at: row!.startedAt,
              finished_at: row!.finishedAt,
              where: failed.where,
              words: failed.words,
              ...(failed.antecedent ? { antecedent: failed.antecedent } : {}),
              http_status: failed.http_status,
              error: failed.error,
            };
          }),
        })),
      },
    };
  }
  const summary = rounds
    .map((round, i) => `${round.rel}: ${readings[i]!.map((r) => `${r.seat} ${r.reading.status}`).join(', ')}`)
    .join('; ');
  return {
    ok: false,
    reason: `no two consecutive committed rounds in which every seat recorded a failure to read ${url} (${summary || 'no committed rounds'})`,
  };
}

/** The latest successful quick probe of `url` by each seat, and the site fetcher's, if it retrieved it. */
export function quickProbes(probes: readonly SeatProbe[], url: string, fetcher?: { checked_at: string; http_status: number | null }): QuickProbe[] {
  const latest = new Map<string, SeatProbe>();
  for (const probe of probes) {
    if (probe.url !== url || probe.outcome !== 'fetched') continue;
    const before = latest.get(probe.seat);
    if (!before || before.probed_at < probe.probed_at) latest.set(probe.seat, probe);
  }
  const out: QuickProbe[] = [...latest.values()]
    .sort((a, b) => a.seat.localeCompare(b.seat))
    .map((p) => ({ by: `${p.seat} seat (${p.tool})`, probed_at: p.probed_at, http_status: p.http_status, outcome: p.outcome }));
  if (fetcher && fetcher.http_status !== null && fetcher.http_status >= 200 && fetcher.http_status < 300) {
    out.push({ by: 'site fetcher', probed_at: fetcher.checked_at, http_status: fetcher.http_status, outcome: 'fetched' });
  }
  return out;
}

/** Every file the ground rests on: each round's run.yaml and each answer named, relative to the run directory. */
export function groundFiles(ground: TwoRoundGround): string[] {
  const files = new Set<string>();
  for (const round of ground.rounds) {
    files.add(round.run_yaml);
    for (const seat of round.seats) files.add(seat.file);
  }
  return [...files];
}
