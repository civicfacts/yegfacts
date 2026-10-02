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
 * What counts as a recorded failure, read mechanically from each seat's answer:
 * a sentence in one of its statements (a claim's limitations, unknowns,
 * interpretation notes or missing-evidence descriptions, or an evidence
 * entry's finding and quote) that carries a failure marker, in a statement
 * that names the document. The markers are an HTTP status of 400 or above
 * (written "HTTP 502", "returned 403", or "502 Bad Gateway" and the like) or a
 * failure phrase ("could not read", "unable to open", "fetch error" ...). A
 * statement names the document when it contains its URL or the URL's file
 * name, or, in the same sentence as the marker, one of the names the run
 * declares for it, each of which must appear in the frozen brief. An evidence
 * entry names the document only when its source_url is the document's URL
 * (query string ignored); an entry citing another source never counts, even
 * if it mentions this document's name.
 *
 * A seat that read the document directly says so, and the carried-documents
 * section asks it to write "read directly from <URL>". A statement naming the
 * document with "read directly" or "read it directly" and no failure marker is
 * a direct read. A direct read by any seat, in either of the two rounds or any
 * later round of the run, refuses the ground.
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
  /** The seat's own words: the sentence naming the document and the sentence with the failure. */
  words: string;
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

/** The run's rounds that have answers on disk, oldest first. */
export function committedRounds(runDir: string): CommittedRound[] {
  const rounds: CommittedRound[] = [];
  for (const manifest of runManifests(runDir)) {
    const dir = path.dirname(manifest);
    const rows = ((YAML.parse(readFileSync(manifest, 'utf8')) as { runs?: RunRow[] } | null)?.runs ?? []).filter(
      (row) => row.status === 'ok' && Number.isInteger(row.round),
    );
    for (const number of [...new Set(rows.map((row) => row.round!))].sort()) {
      const answers = [path.join(dir, `round${number}`), dir].find((candidate) =>
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
const DIRECT_READ = /\bread (?:it )?directly\b/i;

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

const withoutQuery = (url: string) => url.replace(/[?#].*$/, '');

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
  | { status: 'failed'; where: string; words: string; http_status: number | null; error: string | null }
  | { status: 'read'; where: string; words: string }
  | { status: 'no record' };

/**
 * What one seat's answer records about `url`: a failure, a direct read, or
 * nothing. A failure with an HTTP status is preferred over one with a phrase.
 */
export function readSeatAnswer(answer: unknown, url: string, names: readonly string[]): SeatReading {
  const fileName = decodeURIComponent(withoutQuery(url).split('/').pop() ?? '');
  const bare = withoutQuery(url);
  const namePatterns = names.map((name) => new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'));
  const nameIn = (text: string) => namePatterns.some((pattern) => pattern.test(text));
  const urlIn = (text: string) => text.includes(bare) || (fileName.length > 4 && text.toLowerCase().includes(fileName.toLowerCase()));
  /** Where the sentence first names the document, so the failure read is the one after it; 0 when it does not. */
  const namedAt = (sentence: string) => {
    const lower = sentence.toLowerCase();
    const at = [
      sentence.indexOf(bare),
      fileName.length > 4 ? lower.indexOf(fileName.toLowerCase()) : -1,
      ...namePatterns.map((pattern) => pattern.exec(sentence)?.index ?? -1),
    ].filter((i) => i >= 0);
    return at.length > 0 ? Math.min(...at) : 0;
  };
  let failure: Extract<SeatReading, { status: 'failed' }> | undefined;
  let read: Extract<SeatReading, { status: 'read' }> | undefined;
  for (const statement of statements(answer)) {
    if (statement.evidenceFor !== undefined && withoutQuery(statement.evidenceFor) !== bare) continue;
    const wholeNames = statement.evidenceFor !== undefined || urlIn(statement.text);
    const parts = sentences(statement.text);
    const naming = parts.find((s) => urlIn(s) || nameIn(s));
    for (const sentence of parts) {
      const named = wholeNames || urlIn(sentence) || nameIn(sentence);
      if (!named) continue;
      const marker = failureMarker(sentence.slice(namedAt(sentence))) ?? failureMarker(sentence);
      if (marker) {
        const words = naming && naming !== sentence && wholeNames ? `${naming} ${sentence}` : sentence;
        const candidate = { status: 'failed' as const, where: statement.where, words, ...marker };
        if (!failure || (failure.http_status === null && marker.http_status !== null)) failure = candidate;
      } else if (DIRECT_READ.test(sentence) && !read) {
        read = { status: 'read', where: statement.where, words: sentence };
      }
    }
  }
  return read ?? failure ?? { status: 'no record' };
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
  const rounds = committedRounds(runDir);
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
