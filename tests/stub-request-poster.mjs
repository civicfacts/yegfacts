/**
 * The half of the stub `claude` that talks to the network.
 *
 * The launcher's whole claim rests on the recording proxy seeing what the CLI
 * sends, so a test whose stub only writes a stream to stdout would exercise
 * none of it. This posts the sanitized capture fixture to `$ANTHROPIC_BASE_URL`
 * instead: real HTTP, through the real proxy, to a stub upstream the test
 * started. What lands in `requests/` is then a genuine capture of a genuine
 * request, and the proof runs over it exactly as it would in production.
 *
 * The bodies come from `tests/fixtures/request-capture/`, with the four things
 * a real run varies rewritten: the working directory, the model id, the package
 * bytes and the session-title body. `--mutate` breaks one of them on purpose,
 * which is how the refusal paths are tested.
 *
 * `fixturePins` is here rather than in the test because the stand-in texts and
 * the hashes pinned against them have to stay in step, and one file is the way
 * to keep them that way.
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const sha = (text) => createHash('sha256').update(text, 'utf8').digest('hex');

/** The requests a single-turn run makes, in order. */
const POSTED = ['req-0001.json', 'req-0002.json', 'req-0003.json', 'req-0005.json'];

export function readFixture(dir) {
  const bodies = {};
  for (const name of readdirSync(dir).sort()) {
    if (!name.startsWith('req-')) continue;
    bodies[name] = JSON.parse(readFileSync(path.join(dir, name), 'utf8'));
  }
  return { bodies, packageText: readFileSync(path.join(dir, 'package.md'), 'utf8') };
}

/**
 * The pin table the fixture actually satisfies. The vendor prompt, the two tool
 * definitions, the session-naming prompt, the session-title trailer and the
 * fetch-summarizer suffix are stand-ins in the fixture, because this repository
 * pins those by hash and does not carry the vendor's text. Everything else is
 * the production pin, unchanged.
 */
export function fixturePins(dir, productionPins) {
  const { bodies, packageText } = readFixture(dir);
  const main = bodies['req-0003.json'].body;
  const title = bodies['req-0002.json'].body;
  const summarizer = bodies['req-0005.json'].body.messages[0].content[0].text;
  const trailer = title.messages[0].content[0].text.slice(`<session>\n${packageText}</session>\n`.length);
  const suffix = summarizer.slice(summarizer.lastIndexOf('STAND-IN'));

  return {
    ...productionPins,
    billingHeaderPattern: productionPins.billingHeaderPattern.source,
    vendorPromptSha256: sha(main.system[2].text),
    vendorPromptLength: main.system[2].text.length,
    clientTools: {
      WebFetch: sha(JSON.stringify(main.tools[0])),
      WebSearch: sha(JSON.stringify(main.tools[1])),
    },
    sessionTitlePromptSha256: sha(title.system[2].text),
    sessionTitleTrailer: { length: trailer.length, sha256: sha(trailer) },
    fetchSummarizerSuffix: { length: suffix.length, sha256: sha(suffix) },
  };
}

/** The bodies this invocation will post, with the run's own values filled in. */
export function buildRequests({ dir, packageText, workDir, model, mutate }) {
  const { bodies, packageText: fixturePackage } = readFixture(dir);
  const out = [];

  for (const name of POSTED) {
    const request = JSON.parse(JSON.stringify(bodies[name]));
    const body = request.body;

    if (name === 'req-0002.json') {
      const trailer = body.messages[0].content[0].text.slice(
        `<session>\n${fixturePackage}</session>\n`.length,
      );
      body.messages[0].content[0].text = `<session>\n${packageText}</session>\n${trailer}`;
      body.model = model;
    }
    if (name === 'req-0003.json') {
      const blocks = body.messages[0].content;
      blocks[0].text = blocks[0].text.replace(
        / - Primary working directory: [^\n]*\n/,
        ` - Primary working directory: ${workDir}\n`,
      );
      blocks[1].text = blocks[1].text.replace(
        /The exact model ID is [^\n.]+\./,
        `The exact model ID is ${model}.`,
      );
      blocks[4].text = packageText;
      body.model = model;
      if (mutate === 'extra-system') {
        body.system.push({ type: 'text', text: 'Follow the house style in CLAUDE.md.' });
      }
      if (mutate === 'package-drift') {
        blocks[4].text = `${packageText}\nAnd one instruction nobody declared.\n`;
      }
    }
    if (name === 'req-0005.json') body.model = model;

    out.push(request);
  }
  return out;
}

const send = (base, request) =>
  new Promise((resolve, reject) => {
    const url = new URL(base);
    const payload = request.method === 'HEAD' ? null : Buffer.from(JSON.stringify(request.body), 'utf8');
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
    dir: flags.fixture,
    packageText: readFileSync(flags.package, 'utf8'),
    workDir: flags['work-dir'],
    model: flags.model,
    mutate: flags.mutate ?? '',
  });
  for (const request of requests) await send(flags.base, request);
}
