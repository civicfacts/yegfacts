/**
 * The parts every stub reviewer CLI needs, in one place.
 *
 * There are four stub programs in this directory and they were each carrying
 * their own copy of the same four things: how a run reads its control files, how
 * a leaking run finds a real private line to leak, and how a request reaches the
 * launcher's own recording proxy. Four copies of a needle-finder is four chances
 * for one of them to drift into finding something the real check would not, and
 * a test whose leak does not leak the way production leaks is a test that proves
 * nothing.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import path from 'node:path';

/**
 * A reader for one stub's control directory: the files a test writes to say what
 * this run should do (`version`, `exit`, `mutate`, `mutate-canary`). A missing
 * file is the default rather than an error, because most runs set none of them.
 */
export function controlFile(stateDir) {
  return (name, fallback = '') => {
    const file = path.join(stateDir ?? '', name);
    return existsSync(file) ? readFileSync(file, 'utf8') : fallback;
  };
}

/**
 * The first line of a file long enough for the check to treat as a needle.
 *
 * It mirrors `needleLines` in capture-check.ts deliberately: a leaking scenario
 * has to leak a line the real denylist would actually search for, or it would
 * pass for the wrong reason.
 */
export function firstNeedle(file) {
  for (const raw of readFileSync(file, 'utf8').split('\n')) {
    const line = raw.trim();
    if (line.length >= 24 && !line.startsWith('```') && !/^#+$/.test(line) && !/^-{3,}$/.test(line)) {
      return line;
    }
  }
  throw new Error(`no line worth leaking in ${file}`);
}

/** The first Markdown file under any project's memory directory in this HOME. */
export function firstMemoryFile(home) {
  const projects = path.join(home, '.claude', 'projects');
  for (const project of readdirSync(projects).sort()) {
    const memory = path.join(projects, project, 'memory');
    for (const file of readdirSync(memory).sort()) {
      if (file.endsWith('.md')) return path.join(memory, file);
    }
  }
  throw new Error(`no memory file under ${projects}`);
}

/**
 * The private line this run will copy into its request, or '' for a clean run.
 * Read from the stub HOME the launcher was given, so a leaking scenario leaks
 * the same bytes the check will look for rather than a string a test invented.
 */
export function leakedLine(mutate, home) {
  if (mutate === 'leak-home') return firstNeedle(path.join(home, '.claude', 'CLAUDE.md'));
  if (mutate === 'leak-memory') return firstNeedle(firstMemoryFile(home));
  return '';
}

/**
 * One request, over real HTTP, to whatever loopback base URL the launcher put in
 * front of this stub. Real requests through the real proxy are the whole point:
 * what lands in `requests/` then is a genuine capture rather than a file a test
 * wrote where the capture should be. An https base is trusted the way codex
 * trusts it: through the certificate named by CODEX_CA_CERTIFICATE, and nothing
 * else.
 */
export const send = (base, request, headers = {}) =>
  new Promise((resolve, reject) => {
    const url = new URL(base);
    const payload = request.body === null ? null : Buffer.from(JSON.stringify(request.body), 'utf8');
    const secure = url.protocol === 'https:';
    const ca = secure && process.env.CODEX_CA_CERTIFICATE ? readFileSync(process.env.CODEX_CA_CERTIFICATE) : undefined;
    const outgoing = (secure ? https : http).request(
      {
        host: url.hostname,
        port: url.port,
        ...(ca ? { ca } : {}),
        method: request.method,
        path: request.url,
        headers: {
          'content-type': 'application/json',
          ...headers,
          ...(payload ? { 'content-length': String(payload.length) } : {}),
        },
      },
      (response) => {
        response.resume();
        response.on('end', () => resolve(response.statusCode));
      },
    );
    outgoing.on('error', reject);
    if (payload) outgoing.write(payload);
    outgoing.end();
  });

/** The credential headers the Codex stubs send, redacted in the capture only. */
export const CODEX_HEADERS = {
  authorization: 'Bearer stub-codex-token',
  'chatgpt-account-id': 'stub-account-0000-1111-2222',
};
