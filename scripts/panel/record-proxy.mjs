/**
 * Record every request a reviewer CLI sends to its configured base URL, then
 * forward it unchanged.
 *
 *   node scripts/panel/record-proxy.mjs --out <dir> --port-file <file>
 *
 * This is the piece that was missing when v1.28 said the context boundary was
 * undemonstrated. Claude Code honours `ANTHROPIC_BASE_URL`, so pointing it at a
 * loopback listener puts the complete outgoing request on disk before it leaves
 * the machine. What the CLI addresses elsewhere is not seen here, and nothing
 * else on the machine is watched.
 *
 * TWO RULES, and everything else follows from them.
 *
 * It never rewrites. The bytes that arrive are the bytes that go upstream, and
 * the bytes that come back are the bytes that go to the CLI. A proxy that
 * edited a request would make the capture a description of the proxy rather
 * than of the CLI, which is the opposite of the point.
 *
 * It redacts in the CAPTURE ONLY. `authorization`, `x-api-key` and `cookie`
 * become `<redacted>` in `req-NNNN.json`; the real headers are forwarded. The
 * retained capture is evidence a person may have to read, and a subscription
 * token in it would make the whole archive unshowable.
 *
 * Upstream is `https://api.anthropic.com`. `YEGFACTS_REVIEW_UPSTREAM` may point
 * at a loopback URL instead, which is how the tests run without reaching the
 * network; anything else is refused before the listener opens. The upstream
 * actually used is written to `<out>/upstream.txt` and travels from there into
 * the attempt metadata and the public manifest row, so a capture taken against
 * a stub can never be presented as a production one.
 *
 * Files written, per request, numbered in arrival order:
 *   req-NNNN.json  method, url, headers (redacted), body parsed as JSON when it
 *                  is JSON and kept as text when it is not
 *   res-NNNN.txt   the status line and the complete response body, including a
 *                  streamed (SSE) one, read to its end. Content encodings are
 *                  decoded for the capture; an encoding this node cannot decode
 *                  is written as base64 under a header line that says so.
 *
 * An upstream error is written to `res-NNNN.txt` and returned to the CLI as a
 * 502. It is never swallowed: a run that failed to reach the API has to look
 * different from one that succeeded.
 */
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const PRODUCTION_UPSTREAM = 'https://api.anthropic.com';
const REDACTED_HEADERS = new Set(['authorization', 'x-api-key', 'cookie']);

/**
 * The only non-production upstream that is allowed, and it has to be on this
 * machine. A test that could be pointed at an arbitrary host would be a way to
 * send a package somewhere nobody chose.
 */
const LOOPBACK = /^http:\/\/(?:127\.0\.0\.1|localhost)(?::\d{1,5})?(?:\/.*)?$/;

export function resolveUpstream(value) {
  if (value === undefined || value === '') return PRODUCTION_UPSTREAM;
  if (!LOOPBACK.test(value)) {
    throw new Error(
      `YEGFACTS_REVIEW_UPSTREAM must be a loopback URL (http://127.0.0.1:... or http://localhost:...), got "${value}"`,
    );
  }
  return value.replace(/\/$/, '');
}

/** The capture of one response body, decoded when this node can decode it. */
function decodeBody(buffer, encoding) {
  const name = (encoding ?? '').toLowerCase().trim();
  try {
    if (name === '' || name === 'identity') return { text: buffer.toString('utf8'), note: '' };
    if (name === 'gzip') return { text: zlib.gunzipSync(buffer).toString('utf8'), note: '' };
    if (name === 'deflate') return { text: zlib.inflateSync(buffer).toString('utf8'), note: '' };
    if (name === 'br') return { text: zlib.brotliDecompressSync(buffer).toString('utf8'), note: '' };
  } catch (error) {
    return { text: buffer.toString('base64'), note: ` (undecoded ${name}: ${error.message}; body is base64)` };
  }
  return { text: buffer.toString('base64'), note: ` (undecoded ${name}; body is base64)` };
}

export function startRecordingProxy({ out, upstream }) {
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'upstream.txt'), `${upstream}\n`);

  const target = new URL(upstream);
  const transport = target.protocol === 'https:' ? https : http;
  let counter = 0;

  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const body = Buffer.concat(chunks);
      const id = String(++counter).padStart(4, '0');

      const headers = {};
      for (const [key, value] of Object.entries(req.headers)) {
        headers[key] = REDACTED_HEADERS.has(key.toLowerCase()) ? '<redacted>' : value;
      }
      let parsed = null;
      try {
        parsed = body.length > 0 ? JSON.parse(body.toString('utf8')) : null;
      } catch {
        parsed = null;
      }
      // Written before anything is forwarded. A capture that only appears once
      // the upstream answered would lose exactly the requests worth keeping.
      fs.writeFileSync(
        path.join(out, `req-${id}.json`),
        `${JSON.stringify(
          {
            method: req.method,
            url: req.url,
            headers,
            body: parsed ?? body.toString('utf8'),
          },
          null,
          2,
        )}\n`,
      );

      // The CLI addressed the proxy, so its Host header names the proxy. The
      // upstream needs its own name and nothing else changes.
      const forwarded = { ...req.headers, host: target.host };
      if (body.length > 0) forwarded['content-length'] = String(body.length);

      const upstreamRequest = transport.request(
        {
          protocol: target.protocol,
          host: target.hostname,
          port: target.port || (target.protocol === 'https:' ? 443 : 80),
          method: req.method,
          path: req.url,
          headers: forwarded,
        },
        (upstreamResponse) => {
          const received = [];
          res.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers);
          upstreamResponse.on('data', (chunk) => {
            received.push(chunk);
            // Written through as it arrives, so a streamed response stays
            // streamed: buffering it here would change the CLI's timing.
            res.write(chunk);
          });
          upstreamResponse.on('end', () => {
            res.end();
            const { text, note } = decodeBody(
              Buffer.concat(received),
              upstreamResponse.headers['content-encoding'],
            );
            fs.writeFileSync(
              path.join(out, `res-${id}.txt`),
              `HTTP ${upstreamResponse.statusCode}${note}\n${text}`,
            );
          });
        },
      );
      upstreamRequest.on('error', (error) => {
        fs.writeFileSync(path.join(out, `res-${id}.txt`), `UPSTREAM ERROR ${error.message}\n`);
        if (!res.headersSent) res.writeHead(502, { 'content-type': 'text/plain' });
        res.end(error.message);
      });
      if (body.length > 0) upstreamRequest.write(body);
      upstreamRequest.end();
    });
  });

  return server;
}

/**
 * True when this file is the script node was told to run, through a symlink as
 * well as directly.
 */
const invoked = process.argv[1] ? fs.realpathSync(process.argv[1]) : '';
const self = fs.realpathSync(fileURLToPath(import.meta.url));

if (invoked === self) {
  const flags = {};
  const argv = process.argv.slice(2);
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!flag?.startsWith('--') || value === undefined) {
      console.error(`record-proxy: bad arguments near "${flag ?? ''}"`);
      process.exit(2);
    }
    flags[flag.slice(2)] = value;
  }
  // One rule for what counts as loopback, asked for rather than copied. The
  // launcher needs the same answer to decide whether a substitute pin table may
  // be used, and a shell glob of `http://127.0.0.1*` is not the same rule: it
  // matches http://127.0.0.1.example.com.
  if (flags['classify-upstream'] !== undefined) {
    try {
      const value = flags['classify-upstream'];
      resolveUpstream(value);
      process.stdout.write(value === undefined || value === '' ? 'production' : 'loopback');
      process.exit(0);
    } catch (error) {
      console.error(`record-proxy: ${error.message}`);
      process.exit(2);
    }
  }

  if (!flags.out || !flags['port-file']) {
    console.error('usage: node scripts/panel/record-proxy.mjs --out <dir> --port-file <file>');
    process.exit(2);
  }

  let upstream;
  try {
    upstream = resolveUpstream(process.env.YEGFACTS_REVIEW_UPSTREAM);
  } catch (error) {
    console.error(`record-proxy: ${error.message}`);
    process.exit(2);
  }

  const server = startRecordingProxy({ out: flags.out, upstream });
  server.listen(0, '127.0.0.1', () => {
    // Renamed into place rather than written in place: the launcher polls for
    // this file, and a half-written one would be read as a port number.
    const portFile = flags['port-file'];
    const temporary = `${portFile}.partial`;
    fs.writeFileSync(temporary, `${server.address().port}\n`);
    fs.renameSync(temporary, portFile);
  });

  // The launcher stops the proxy after the CLI has exited and waits for this
  // process to go with it, which is what makes "every capture is flushed"
  // something other than a hope about timing.
  const shutdown = () => {
    server.close(() => process.exit(0));
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}
