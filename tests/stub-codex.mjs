#!/usr/bin/env node
/**
 * A stand-in for `codex`, for the tests that drive the Codex seat end to end.
 *
 * It is a real program with real filesystem access and it makes real HTTP
 * requests, because both halves matter. The canary genuinely reads the planted
 * fixture off disk and puts what it found into the next turn's request body,
 * which is the behaviour the seat's whole limit rests on: the sandbox lets the
 * read happen and the denylist catches it afterwards. And the requests go
 * through the launcher's own recording proxy to a stub upstream, so the capture
 * the check reads was produced by an actual request rather than written by a
 * test where the capture should be.
 *
 * Its behaviour is configured by `YEGFACTS_STUB_DIR`, a directory the test
 * fills: `version`, `stream.jsonl`, `exit`, and `mutate`.
 */
import { existsSync, lstatSync, readFileSync, readdirSync, readlinkSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { buildRequests } from './stub-codex-poster.mjs';
import http from 'node:http';

const argv = process.argv.slice(2);
const state = process.env.YEGFACTS_STUB_DIR ?? '';
const read = (name, fallback = '') =>
  existsSync(path.join(state, name)) ? readFileSync(path.join(state, name), 'utf8') : fallback;

if (argv[0] === '--version') {
  process.stdout.write(read('version', 'codex-cli 0.154.0\n'));
  process.exit(0);
}

/** The base URL the launcher put on the command line, and the pinned settings. */
let base = '';
let model = '';
let effort = 'high';
for (let index = 0; index < argv.length; index += 1) {
  const value = argv[index];
  if (value === '-m') model = argv[index + 1] ?? '';
  const match = /^openai_base_url=(http:\/\/[^/]+)\//.exec(value ?? '');
  if (match) base = match[1];
}
// The effort is in CODEX_HOME/config.toml, which is what the launcher writes.
const codexHome = process.env.CODEX_HOME ?? '';
const config = codexHome ? path.join(codexHome, 'config.toml') : '';
if (config && existsSync(config)) {
  const found = /model_reasoning_effort\s*=\s*"([^"]+)"/.exec(readFileSync(config, 'utf8'));
  if (found) effort = found[1];
}

// What the per-attempt home looked like from inside the subprocess, recorded so
// a test can assert on it after the launcher has taken the home down.
if (codexHome) {
  const auth = path.join(codexHome, 'auth.json');
  const link = lstatSync(auth, { throwIfNoEntry: false });
  writeFileSync(
    path.join(state, 'home-seen.json'),
    JSON.stringify({
      entries: readdirSync(codexHome).sort(),
      mode: (statSync(codexHome).mode & 0o777).toString(8),
      config: config && existsSync(config) ? readFileSync(config, 'utf8') : '',
      auth_is_symlink: link ? link.isSymbolicLink() : false,
      auth_target: link?.isSymbolicLink() ? readlinkSync(auth) : '',
      hooks_disabled: process.env.CMUX_CODEX_HOOKS_DISABLED ?? '',
    }),
  );
}

const prompt = readFileSync(0, 'utf8');
const promptFile = path.join(state, 'stdin.txt');
writeFileSync(promptFile, prompt);

const isCanary = prompt.includes('CANARY.md');
if (!isCanary) writeFileSync(path.join(state, 'package-sent.txt'), prompt);

// The read that this profile cannot stop. `-s read-only` grants the whole
// filesystem, so the fixture one directory up is readable, and what it returns
// travels back to the model in the next turn.
let toolOutput = '';
if (isCanary) {
  try {
    toolOutput = readFileSync(path.resolve(process.cwd(), '..', 'CANARY.md'), 'utf8');
  } catch {
    toolOutput = 'READ_FAILED';
  }
}

const send = (request) =>
  new Promise((resolve, reject) => {
    const url = new URL(base);
    const payload = request.body === null ? null : Buffer.from(JSON.stringify(request.body), 'utf8');
    const outgoing = http.request(
      {
        host: url.hostname,
        port: url.port,
        method: request.method,
        path: request.url,
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer stub-codex-token',
          'chatgpt-account-id': 'stub-account-0000-1111-2222',
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

if (base) {
  const requests = buildRequests({
    packageText: prompt,
    model,
    effort,
    // The canary and the research run are broken independently, because the
    // interesting case is a clean canary followed by a research run that leaked.
    mutate: read(isCanary ? 'mutate-canary' : 'mutate').trim(),
    home: process.env.HOME ?? '',
    toolOutput,
  });
  for (const request of requests) await send(request);
}

const answer = isCanary
  ? JSON.stringify({
      web_h1: 'Example Domain',
      search_title: 'Open Data | City of Edmonton',
      canary_token: /token: (\S+)/.exec(toolOutput)?.[1] ?? null,
      tools: ['functions.exec', 'web__run'],
    })
  : 'a report a reader could use';

const stream =
  read('stream.jsonl') ||
  [
    JSON.stringify({ type: 'thread.started', thread_id: 'stub-thread' }),
    JSON.stringify({ type: 'turn.started' }),
    JSON.stringify({ type: 'error', message: 'Reconnecting... 2/5 (request timed out)' }),
    JSON.stringify({
      type: 'item.completed',
      item: { id: 'item_0', type: 'error', message: 'Falling back from WebSockets to HTTPS transport. request timed out' },
    }),
    JSON.stringify({
      type: 'item.completed',
      item: { id: 'item_1', type: 'web_search', query: 'City of Edmonton open data portal' },
    }),
    JSON.stringify({
      type: 'item.completed',
      item: {
        id: 'item_2',
        type: 'command_execution',
        command: "/bin/zsh -lc 'sed -n 1,20p ../CANARY.md'",
        aggregated_output: toolOutput,
        exit_code: 0,
        status: 'completed',
      },
    }),
    JSON.stringify({ type: 'item.completed', item: { id: 'item_3', type: 'agent_message', text: answer } }),
    JSON.stringify({
      type: 'turn.completed',
      usage: { input_tokens: 38660, cached_input_tokens: 24064, output_tokens: 852, reasoning_output_tokens: 519 },
    }),
    '',
  ].join('\n');

process.stdout.write(stream);
process.exit(Number(read('exit', '0').trim() || '0'));
