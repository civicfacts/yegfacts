/**
 * The half of the stub `claude` that talks to the network.
 *
 * The launcher's whole claim rests on the recording proxy seeing what the CLI
 * sends, so a test whose stub only wrote a stream to stdout would exercise none
 * of it. This posts a plausible set of request bodies to `$ANTHROPIC_BASE_URL`
 * instead: real HTTP, through the real proxy, to a stub upstream the test
 * started. What lands in `requests/` is then a genuine capture of a genuine
 * request, and the check runs over it exactly as it would in production.
 *
 * WHY THERE IS NO CAPTURE FIXTURE ANY MORE. Until methodology v1.30 the bodies
 * came from a sanitized copy of a real capture under
 * `tests/fixtures/request-capture/`, because the check compared every byte of
 * every request against a pinned description and only a real capture could
 * satisfy it. The check is now a denylist: it asks whether the private text on
 * this machine appears in the request, and any request body can answer that. So
 * the fixture is gone and these bodies are written here, in the shape a real
 * request has but with none of its pinned content.
 *
 * `--mutate` makes one run leak on purpose, and it leaks for real: it reads the
 * stub HOME's own CLAUDE.md or memory file off disk and copies a line of it into
 * the request, which is exactly the failure the check exists to catch.
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

/**
 * The private line this run will copy into its request, or '' for a clean run.
 * Read from the stub HOME the launcher was given, so a leaking scenario leaks
 * the same bytes the check will look for rather than a string a test invented.
 */
function leakedLine(mutate, home) {
  if (mutate === 'leak-home') return firstNeedle(path.join(home, '.claude', 'CLAUDE.md'));
  if (mutate === 'leak-memory') return firstNeedle(firstMemoryFile(home));
  return '';
}

/**
 * The requests one attempt makes, in the order a real one makes them:
 * connectivity, session title, the main turn, a fetch summarizer. The package
 * travels in the session title and in the main turn, which is the "twice per
 * attempt" the launcher's header describes.
 */
export function buildRequests({ packageText, workDir, model, mutate, home, date }) {
  const leaked = leakedLine(mutate, home);
  const packaged = mutate === 'no-package' ? 'a package this run never received\n' : packageText;

  const post = (body) => ({ method: 'POST', url: '/v1/messages', body });

  return [
    { method: 'HEAD', url: '/api/hello', body: null },
    post({
      model,
      max_tokens: 512,
      system: [
        { type: 'text', text: 'x-anthropic-billing-header: cc_entrypoint=sdk-cli;' },
        { type: 'text', text: "You are a Claude agent, built on Anthropic's Claude Agent SDK." },
        { type: 'text', text: 'You are naming a coding session. Return a short title.' },
      ],
      messages: [{ role: 'user', content: [{ type: 'text', text: `<session>\n${packaged}</session>\n` }] }],
    }),
    post({
      model,
      max_tokens: 64000,
      output_config: { effort: 'high' },
      system: [
        { type: 'text', text: 'x-anthropic-billing-header: cc_entrypoint=sdk-cli;' },
        { type: 'text', text: "You are a Claude agent, built on Anthropic's Claude Agent SDK." },
        { type: 'text', text: 'STAND-IN for the vendor default prompt, which this repository does not carry.' },
      ],
      tools: [
        { name: 'WebFetch', description: 'Fetch a URL', input_schema: { type: 'object' } },
        { name: 'WebSearch', description: 'Search the web', input_schema: { type: 'object' } },
      ],
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: '# userEmail\nThe email address is user@example.com.\n' },
            { type: 'text', text: packaged },
            ...(leaked ? [{ type: 'text', text: `<system-reminder>\n${leaked}\n</system-reminder>` }] : []),
          ],
        },
        {
          role: 'system',
          content: [
            {
              type: 'text',
              text:
                `# Environment\n - Primary working directory: ${workDir}\n - Is a git repository: false\n` +
                ` - Platform: darwin\n\nThe exact model ID is ${model}.\n\nToday's date is ${date}.\n`,
            },
          ],
        },
      ],
    }),
    post({
      model,
      max_tokens: 4096,
      system: [{ type: 'text', text: 'x-anthropic-billing-header: cc_entrypoint=sdk-cli;' }],
      messages: [{ role: 'user', content: [{ type: 'text', text: '\nWeb page content:\n---\nExample Domain\n' }] }],
    }),
  ];
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
          authorization: 'Bearer stub-oauth-token',
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
    workDir: flags['work-dir'],
    model: flags.model,
    mutate: flags.mutate ?? '',
    home: process.env.HOME ?? '',
    date: '2026-09-16',
  });
  for (const request of requests) await send(flags.base, request);
}
