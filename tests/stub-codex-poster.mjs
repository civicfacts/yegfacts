/**
 * The half of the stub `codex` that talks to the network.
 *
 * The Codex seat's whole claim rests on the recording proxy seeing what the CLI
 * sends, so a stub that only wrote a stream to stdout would exercise none of it.
 * This posts a plausible set of request bodies to the loopback base URL the
 * launcher put on the command line: real HTTP, through the real proxy, to a stub
 * upstream the test started. What lands in `requests/` is then a genuine capture
 * of a genuine request, and the check runs over it exactly as it would in
 * production.
 *
 * The shapes come from the 2026-09-16 probe of codex-cli 0.154.0: a models
 * lookup with no body, a WebSocket upgrade attempt that carries no body either,
 * the model request at `POST /backend-api/codex/responses`, the web-search call
 * at `POST /backend-api/codex/alpha/search`, and a second model request carrying
 * the first turn's tool output. That last one is the important one: it is why a
 * reviewer that reads a private file is refused by the denylist even though the
 * sandbox let it read.
 *
 * `--mutate` breaks one piece on purpose, per run, and a leak leaks for real: it
 * reads the stub HOME's own CLAUDE.md or memory file off disk and copies a line
 * of it into the request.
 */
import { readFileSync, readdirSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';

/** The first line of a file long enough for the check to treat as a needle. */
function firstNeedle(file) {
  for (const raw of readFileSync(file, 'utf8').split('\n')) {
    const line = raw.trim();
    if (line.length >= 24 && !line.startsWith('```') && !/^#+$/.test(line) && !/^-{3,}$/.test(line)) {
      return line;
    }
  }
  throw new Error(`no line worth leaking in ${file}`);
}

/** The first Markdown file under any project's memory directory in this HOME. */
function firstMemoryFile(home) {
  const projects = path.join(home, '.claude', 'projects');
  for (const project of readdirSync(projects).sort()) {
    const memory = path.join(projects, project, 'memory');
    for (const file of readdirSync(memory).sort()) {
      if (file.endsWith('.md')) return path.join(memory, file);
    }
  }
  throw new Error(`no memory file under ${projects}`);
}

function leakedLine(mutate, home) {
  if (mutate === 'leak-home') return firstNeedle(path.join(home, '.claude', 'CLAUDE.md'));
  if (mutate === 'leak-memory') return firstNeedle(firstMemoryFile(home));
  return '';
}

export function buildRequests({ packageText, model, effort, mutate, home, toolOutput }) {
  const leaked = leakedLine(mutate, home);
  const packaged = mutate === 'no-package' ? 'a package this run never received\n' : packageText;
  const sentEffort = mutate === 'wrong-effort' ? 'low' : effort;

  const turn = (input) => ({
    method: 'POST',
    url: '/backend-api/codex/responses',
    body: {
      model,
      input,
      tool_choice: 'auto',
      parallel_tool_calls: false,
      reasoning: { effort: sentEffort, context: 'all_turns' },
      store: false,
      stream: true,
      prompt_cache_key: 'stub-thread',
      text: { verbosity: 'medium' },
      client_metadata: { 'x-codex-window-id': 'stub-window' },
    },
  });

  const message = (role, text) => ({ type: 'message', role, content: [{ type: 'input_text', text }] });

  const requests = [
    { method: 'GET', url: '/backend-api/codex/models?client_version=0.154.0', body: null },
    { method: 'GET', url: '/backend-api/codex/responses', body: null },
    turn([
      { type: 'additional_tools', tools: [{ type: 'web_search' }, { type: 'exec' }] },
      message('system', 'STAND-IN for the vendor base prompt, which this repository does not carry.'),
      message('user', packaged),
      ...(leaked ? [message('user', `<host-instruction>\n${leaked}\n</host-instruction>`)] : []),
    ]),
  ];

  if (mutate !== 'no-search') {
    requests.push({
      method: 'POST',
      url: '/backend-api/codex/alpha/search',
      body: { id: 'stub-search', model, input: 'City of Edmonton open data portal', commands: [], settings: {} },
    });
  }

  // The second turn, carrying the first turn's tool output back to the model.
  // When the canary read the planted fixture, this is where its token travels,
  // and it is the reason a private read is caught after the fact.
  requests.push(
    turn([
      message('user', packaged),
      message('user', `tool output:\n${toolOutput ?? ''}`),
    ]),
  );

  requests.push({
    method: 'POST',
    url: '/backend-api/codex/analytics-events/events',
    body: { events: [{ name: 'turn_completed' }] },
  });

  return requests;
}

const send = (base, request) =>
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

const flags = {};
const argv = process.argv.slice(2);
for (let index = 0; index < argv.length; index += 2) flags[argv[index].slice(2)] = argv[index + 1];

if (flags.base) {
  const requests = buildRequests({
    packageText: readFileSync(flags.package, 'utf8'),
    model: flags.model,
    effort: flags.effort || 'high',
    mutate: flags.mutate ?? '',
    home: process.env.HOME ?? '',
    toolOutput: flags['tool-output'] ?? '',
  });
  for (const request of requests) await send(flags.base, request);
}
