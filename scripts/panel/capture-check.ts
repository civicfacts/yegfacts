/**
 * Test a captured outgoing request against the private text that actually
 * exists on this machine.
 *
 * WHAT THIS REPLACED, AND WHY. Methodology v1.29 pinned the whole shape of a
 * clean request: the vendor's default prompt by hash, the two tool definitions
 * by hash, a per-(build, model) pin table, an archived copy of the pinned build,
 * an allowlist of every top-level key. It worked, and it rotted. The vendor
 * ships a new CLI build several times a week and every one of them needs a fresh
 * live capture, a new pin row and a repin before a reviewer can run at all. On
 * 2026-09-16 the founder decided that cost was not worth paying and asked for a
 * check that cannot rot. Stew advised keeping v1.29 and the disagreement is on
 * the record beside the decision.
 *
 * WHAT THIS CHECKS. Every private file this machine could leak into a request is
 * read at check time, split into lines, and every line long enough to be
 * distinctive becomes a needle. Then every string in every captured request body
 * is searched for every needle. A hit is a leak: the reviewer was handed text
 * from outside the declared package. The declared package itself has to be in
 * the capture at least once, because a capture with no package in it is not a
 * capture of this run.
 *
 * WHAT IT DOES NOT CHECK, stated here because a check named "capture" invites
 * the opposite reading. It catches KNOWN private text FROM THIS MACHINE. It
 * cannot catch text the vendor attaches that is not on this machine, and it does
 * not describe what the request contains: it only says what the request does not
 * contain. The capture is retained so that a later reader can ask a stronger
 * question of the same bytes.
 *
 * WHAT NEVER LEAVES THIS FILE. The contents of the private sources. They are
 * read into memory, compared, and dropped. A failure names the source and the
 * line number, never the line. A report that quoted the leaking line to prove a
 * leak would republish the private text into the very record it is defending.
 * Source names are symbolic (`$HOME/...`, `<repo>/...`) for the same reason: the
 * home directory and the repository path are themselves on the denylist.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

export const PRODUCTION_UPSTREAM = 'https://api.anthropic.com';

const sha256 = (text: string): string => createHash('sha256').update(text, 'utf8').digest('hex');

export type CapturedRequest = {
  file: string;
  method: string;
  url: string;
  headers: Record<string, unknown>;
  body: unknown;
};

/**
 * One thing a request must not contain.
 *
 * `lines` is what is actually searched for. A file contributes its distinctive
 * lines; a bare string (the home directory, the repository path, the canary
 * token) contributes itself as a single line. `present: false` means the file
 * was not on this machine, which is recorded rather than treated as an error —
 * a machine without a `~/.codex/AGENTS.md` cannot leak one.
 */
export type PrivateSource = {
  name: string;
  present: boolean;
  lines: string[];
};

export type SourceReport = {
  name: string;
  present: boolean;
  lines_checked: number;
};

export type CaptureCheckResult = {
  status: 'pass' | 'fail';
  failures: string[];
  sources: SourceReport[];
  /** How many captured requests carried the declared package byte for byte. */
  package_seen: number;
  /** Every captured request, including the ones with no JSON body. */
  requests: number;
};

export type CaptureCheckInput = {
  requests: CapturedRequest[];
  /** The exact bytes of the package this attempt was given. */
  packageText: string;
  /** The attempt's canary token, or '' on a research run. */
  token: string;
  sources: PrivateSource[];
};

/**
 * The shortest line worth searching for.
 *
 * Short lines are the whole problem with a text search. "## Notes", "- [ ] fix
 * this" and "MIT" appear in private files and in ordinary prose, so a check
 * built on them would refuse clean runs until someone turned it off. Twenty-four
 * characters is long enough that a collision is a sentence two people wrote the
 * same way, which is rare enough to be worth looking at when it happens.
 */
const MIN_LINE = 24;

/** A line that is markdown punctuation rather than content. */
const isStructural = (line: string): boolean =>
  line.startsWith('```') || /^#+$/.test(line) || /^-{3,}$/.test(line) || /^\.{3,}$/.test(line);

/** The distinctive lines of one private file, in file order. */
export function needleLines(text: string): string[] {
  const lines: string[] = [];
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (line.length < MIN_LINE) continue;
    if (isStructural(line)) continue;
    lines.push(line);
  }
  return lines;
}

/**
 * Read a file if it is there, following a symlink once.
 *
 * `~/AGENTS.md` is a symlink to `~/CLAUDE.md` on this machine and may be a
 * symlink to anything on another. `readFileSync` follows the chain on its own;
 * what this adds is that a broken link, a directory or an unreadable file is
 * "absent" rather than a crash in the middle of an admission decision.
 */
function readIfPresent(file: string): string | null {
  try {
    if (!existsSync(file)) return null;
    if (!statSync(file).isFile()) return null;
    return readFileSync(file, 'utf8');
  } catch {
    return null;
  }
}

/** Every Markdown file in the `memory` directory of every project under
 * `$HOME/.claude/projects`, in a stable order. */
function memoryFiles(home: string): string[] {
  const projects = path.join(home, '.claude', 'projects');
  const found: string[] = [];
  let entries: string[] = [];
  try {
    entries = readdirSync(projects).sort();
  } catch {
    return found;
  }
  for (const project of entries) {
    const memory = path.join(projects, project, 'memory');
    let files: string[] = [];
    try {
      files = readdirSync(memory).sort();
    } catch {
      continue;
    }
    for (const file of files) {
      if (file.endsWith('.md')) found.push(path.join(memory, file));
    }
  }
  return found;
}

/**
 * The private sources, resolved against this machine at check time.
 *
 * Resolved every run rather than listed in a fixture, because the point is the
 * text that exists NOW: a memory file written this morning is exactly the text
 * a reviewer must not be handed this afternoon.
 *
 * The names are symbolic. A project directory under `~/.claude/projects` is
 * named after the absolute path of the project it belongs to, so printing one
 * would put the founder's home directory in a report whose job is to prove the
 * home directory did not travel.
 */
export function privateSources(options: { home: string; repoRoot: string; token: string }): PrivateSource[] {
  const { home, repoRoot, token } = options;
  const sources: PrivateSource[] = [];

  const file = (name: string, absolute: string) => {
    const text = readIfPresent(absolute);
    sources.push(
      text === null ? { name, present: false, lines: [] } : { name, present: true, lines: needleLines(text) },
    );
  };

  file('$HOME/.claude/CLAUDE.md', path.join(home, '.claude', 'CLAUDE.md'));
  file('$HOME/CLAUDE.md', path.join(home, 'CLAUDE.md'));
  file('$HOME/AGENTS.md', path.join(home, 'AGENTS.md'));
  file('$HOME/.codex/AGENTS.md', path.join(home, '.codex', 'AGENTS.md'));
  file('<repo>/CLAUDE.md', path.join(repoRoot, 'CLAUDE.md'));
  file('<repo>/AGENTS.md', path.join(repoRoot, 'AGENTS.md'));

  memoryFiles(home).forEach((absolute, index) => {
    file(`$HOME/.claude/projects/*/memory/*.md (${index + 1})`, absolute);
  });

  // The three bare strings. Each is private in its own way: the repository path
  // names the project, the home directory names the operator, and the canary
  // token is the synthetic secret the attempt planted to see whether local files
  // are reachable. A research run has no token and the source is simply absent.
  const string = (name: string, value: string) =>
    sources.push(value === '' ? { name, present: false, lines: [] } : { name, present: true, lines: [value] });

  string('the repository path', repoRoot);
  string('the home directory', home);
  string('the canary token', token);

  return sources;
}

/** Every string value anywhere in a parsed JSON body. */
function* strings(value: unknown): Generator<string> {
  if (typeof value === 'string') {
    yield value;
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) yield* strings(item);
    return;
  }
  if (value !== null && typeof value === 'object') {
    for (const item of Object.values(value as Record<string, unknown>)) yield* strings(item);
  }
}

/** True when the proxy captured a parsed JSON body rather than raw text. */
const isJsonBody = (body: unknown): boolean => body !== null && typeof body === 'object';

/**
 * The check itself: pure, so the launcher's behaviour can be argued about in a
 * unit test rather than only observed through a subprocess.
 *
 * Failures are ordered by request and then by source, and each one names a
 * source and a line number. Two different requests carrying the same leaked line
 * are two failures, because "which request leaked" is the first thing a person
 * reading the retained capture wants to know.
 */
export function checkCapture(input: CaptureCheckInput): CaptureCheckResult {
  const failures: string[] = [];
  const { requests, packageText, sources } = input;

  let packageSeen = 0;
  let jsonBodies = 0;

  if (packageText === '') {
    failures.push('the check was given no package text, so nothing establishes that this capture is of this run');
  }

  for (const request of requests) {
    if (!isJsonBody(request.body)) continue;
    jsonBodies += 1;

    // Collected once per request rather than re-walked per source: a main turn
    // carries a few hundred strings and the denylist runs to thousands of lines.
    const values = [...strings(request.body)];

    if (packageText !== '' && values.some((value) => value.includes(packageText))) packageSeen += 1;

    for (const source of sources) {
      const hit = new Set<number>();
      for (const value of values) {
        source.lines.forEach((line, index) => {
          if (!hit.has(index) && value.includes(line)) hit.add(index);
        });
      }
      for (const index of [...hit].sort((a, b) => a - b)) {
        failures.push(`${request.file}: carries ${source.name} line ${index + 1}`);
      }
    }
  }

  if (packageText !== '' && packageSeen === 0) {
    failures.push(
      `no captured request carries the declared package byte for byte (${jsonBodies} request(s) with a JSON body); ` +
        'this capture is not of this run',
    );
  }

  return {
    status: failures.length === 0 ? 'pass' : 'fail',
    failures,
    sources: sources.map(({ name, present, lines }) => ({ name, present, lines_checked: lines.length })),
    package_seen: packageSeen,
    requests: requests.length,
  };
}

export type Capture = {
  requests: CapturedRequest[];
  upstream: string;
  requestsManifestSha256: string;
};

/**
 * Read a capture directory. The manifest hash covers the sorted list of
 * `<file> <hash>` lines over every `req-*`/`res-*` file, so a published row can
 * be checked against the retained bytes without republishing them, and a file
 * removed after the fact changes the hash.
 */
export function readCapture(dir: string): Capture {
  const entries = readdirSync(dir).sort();
  const requests: CapturedRequest[] = [];
  const manifest: string[] = [];

  for (const name of entries) {
    if (!/^(req|res)-\d+\.(json|txt)$/.test(name)) continue;
    const raw = readFileSync(path.join(dir, name));
    manifest.push(`${name} ${createHash('sha256').update(raw).digest('hex')}`);
    if (!name.startsWith('req-')) continue;
    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(raw.toString('utf8')) as Record<string, unknown>;
    } catch {
      // A capture file the proxy could not finish writing. Kept in the manifest
      // and pushed through with no body rather than skipped.
    }
    const headers = parsed.headers;
    requests.push({
      file: name,
      method: typeof parsed.method === 'string' ? parsed.method : '?',
      url: typeof parsed.url === 'string' ? parsed.url : '?',
      headers:
        headers !== null && typeof headers === 'object' && !Array.isArray(headers)
          ? (headers as Record<string, unknown>)
          : {},
      body: parsed.body,
    });
  }

  const upstreamFile = path.join(dir, 'upstream.txt');
  let upstream = '';
  try {
    upstream = readFileSync(upstreamFile, 'utf8').trim();
  } catch {
    upstream = '';
  }

  return { requests, upstream, requestsManifestSha256: sha256(manifest.join('\n')) };
}
