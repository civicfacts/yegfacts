/**
 * The recording proxy, run as the launcher runs it: a real subprocess, a real
 * loopback listener, and a stub upstream instead of the API.
 *
 * The two claims worth testing are the two the whole proof rests on. The bytes
 * that arrive are the bytes that go upstream, and the bytes that come back are
 * the bytes the caller gets — so the capture describes the CLI rather than the
 * proxy. And the credential is redacted in the capture and only in the capture,
 * so the retained evidence can be read by a person without handing them a
 * subscription token.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import http from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
import { afterAll, describe, expect, it } from 'vitest';
import { resolveUpstream } from '../scripts/panel/record-proxy.mjs';

const PROXY = path.join(fileURLToPath(new URL('..', import.meta.url)), 'scripts', 'panel', 'record-proxy.mjs');
const root = mkdtempSync(path.join(tmpdir(), 'yegfacts-proxy-'));

const servers: http.Server[] = [];
const children: ReturnType<typeof spawn>[] = [];
afterAll(() => {
  for (const child of children) child.kill('SIGKILL');
  for (const server of servers) server.close();
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Received = { method: string; url: string; headers: http.IncomingHttpHeaders; body: string };

/** A stand-in API. It records what it was handed and answers with fixed bytes. */
async function stubUpstream(reply: (received: Received) => { body: Buffer | string; headers?: Record<string, string> }) {
  const received: Received[] = [];
  const server = http.createServer((request, response) => {
    const chunks: Buffer[] = [];
    request.on('data', (chunk: Buffer) => chunks.push(chunk));
    request.on('end', () => {
      const entry: Received = {
        method: request.method ?? '',
        url: request.url ?? '',
        headers: request.headers,
        body: Buffer.concat(chunks).toString('utf8'),
      };
      received.push(entry);
      const answer = reply(entry);
      response.writeHead(200, { 'content-type': 'text/event-stream', ...(answer.headers ?? {}) });
      response.end(answer.body);
    });
  });
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as { port: number };
  return { received, url: `http://127.0.0.1:${port}` };
}

async function startProxy(upstream: string | undefined, name: string) {
  const out = path.join(root, name, 'requests');
  const portFile = path.join(root, name, 'port');
  const child = spawn(process.execPath, [PROXY, '--out', out, '--port-file', portFile], {
    env: { ...process.env, ...(upstream === undefined ? {} : { YEGFACTS_REVIEW_UPSTREAM: upstream }) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  children.push(child);
  let stderr = '';
  child.stderr?.on('data', (chunk) => (stderr += String(chunk)));
  let gone = false;
  const exited = new Promise<number>((resolve) =>
    child.on('exit', (code) => {
      gone = true;
      resolve(code ?? -1);
    }),
  );

  // Stops polling the moment the child dies, so a refusal is reported as a
  // refusal rather than as a timeout.
  for (let waited = 0; waited < 100 && !gone && !existsSync(portFile); waited += 1) await sleep(50);
  return {
    child,
    out,
    exited,
    stderr: () => stderr,
    port: existsSync(portFile) ? readFileSync(portFile, 'utf8').trim() : '',
  };
}

const post = (port: string, body: string, headers: Record<string, string>) =>
  new Promise<{ status: number; body: Buffer }>((resolve, reject) => {
    const request = http.request(
      { host: '127.0.0.1', port: Number(port), method: 'POST', path: '/v1/messages?beta=true', headers },
      (response) => {
        const chunks: Buffer[] = [];
        response.on('data', (chunk: Buffer) => chunks.push(chunk));
        response.on('end', () => resolve({ status: response.statusCode ?? 0, body: Buffer.concat(chunks) }));
      },
    );
    request.on('error', reject);
    request.end(body);
  });

describe('the upstream rule', () => {
  it('defaults to the API and accepts nothing but loopback beside it', () => {
    expect(resolveUpstream(undefined)).toBe('https://api.anthropic.com');
    expect(resolveUpstream('')).toBe('https://api.anthropic.com');
    expect(resolveUpstream('http://127.0.0.1:51234')).toBe('http://127.0.0.1:51234');
    expect(resolveUpstream('http://localhost:80/')).toBe('http://localhost:80');
  });

  it.each([
    'https://evil.example.com',
    'http://127.0.0.1.evil.example.com',
    'http://192.168.0.5:8080',
    'file:///etc/hosts',
  ])('refuses %s', (value) => {
    expect(() => resolveUpstream(value)).toThrow(/must be a loopback URL/);
  });

  it('refuses to start against a non-loopback override', async () => {
    const proxy = await startProxy('https://somewhere.example.com', 'refused');
    expect(await proxy.exited).toBe(2);
    expect(proxy.stderr()).toMatch(/must be a loopback URL/);
    expect(existsSync(path.join(root, 'refused', 'port'))).toBe(false);
  });
});

describe('recording and forwarding', { timeout: 30_000 }, () => {
  it('forwards the request unchanged and redacts only the capture', async () => {
    const upstream = await stubUpstream(() => ({
      body: 'event: message_start\ndata: {"type":"message_start"}\n\nevent: message_stop\ndata: {}\n\n',
    }));
    const proxy = await startProxy(upstream.url, 'plain');
    expect(proxy.port).toMatch(/^\d+$/);

    const sent = JSON.stringify({ model: 'claude-opus-5', messages: [{ role: 'user', content: 'hello' }] });
    const answer = await post(proxy.port, sent, {
      'content-type': 'application/json',
      authorization: 'Bearer stub-oauth-token',
      'x-api-key': 'k-2',
      cookie: 'session=private',
      'x-app': 'cli',
    });

    // The caller got the upstream's bytes, unedited.
    expect(answer.status).toBe(200);
    expect(answer.body.toString('utf8')).toContain('event: message_start');

    // The upstream got the request the caller made, credential and all: a proxy
    // that stripped the token would break the run rather than protect anything.
    expect(upstream.received).toHaveLength(1);
    expect(upstream.received[0]!.body).toBe(sent);
    expect(upstream.received[0]!.url).toBe('/v1/messages?beta=true');
    expect(upstream.received[0]!.headers.authorization).toBe('Bearer stub-oauth-token');
    expect(upstream.received[0]!.headers['x-app']).toBe('cli');

    proxy.child.kill('SIGTERM');
    expect(await proxy.exited).toBe(0);

    const capture = JSON.parse(readFileSync(path.join(proxy.out, 'req-0001.json'), 'utf8'));
    expect(capture.method).toBe('POST');
    expect(capture.url).toBe('/v1/messages?beta=true');
    expect(capture.body).toEqual(JSON.parse(sent));
    expect(capture.headers.authorization).toBe('<redacted>');
    expect(capture.headers['x-api-key']).toBe('<redacted>');
    expect(capture.headers.cookie).toBe('<redacted>');
    expect(capture.headers['x-app']).toBe('cli');
    // Nothing that could be replayed is left in the retained bytes.
    expect(readFileSync(path.join(proxy.out, 'req-0001.json'), 'utf8')).not.toContain('stub-oauth-token');

    const response = readFileSync(path.join(proxy.out, 'res-0001.txt'), 'utf8');
    expect(response.startsWith('HTTP 200\n')).toBe(true);
    expect(response).toContain('event: message_stop');

    expect(readFileSync(path.join(proxy.out, 'upstream.txt'), 'utf8').trim()).toBe(upstream.url);
  });

  it('numbers every request and decodes a compressed response for the capture', async () => {
    const upstream = await stubUpstream(() => ({
      body: zlib.gzipSync('event: message_stop\ndata: {"compressed":true}\n\n'),
      headers: { 'content-encoding': 'gzip' },
    }));
    const proxy = await startProxy(upstream.url, 'gzip');

    for (const index of [1, 2, 3]) {
      await post(proxy.port, JSON.stringify({ turn: index }), { 'content-type': 'application/json' });
    }
    proxy.child.kill('SIGTERM');
    expect(await proxy.exited).toBe(0);

    const files = readdirSync(proxy.out).sort();
    expect(files).toEqual([
      'req-0001.json',
      'req-0002.json',
      'req-0003.json',
      'res-0001.txt',
      'res-0002.txt',
      'res-0003.txt',
      'upstream.txt',
    ]);
    expect(JSON.parse(readFileSync(path.join(proxy.out, 'req-0003.json'), 'utf8')).body).toEqual({ turn: 3 });
    // The capture is readable rather than a wall of gzip, and it says nothing
    // was rewritten: the caller still received the compressed bytes.
    expect(readFileSync(path.join(proxy.out, 'res-0002.txt'), 'utf8')).toContain('"compressed":true');
  });

  it('records an upstream that could not be reached instead of hiding it', async () => {
    // A port nothing is listening on: the connection is refused immediately.
    const proxy = await startProxy('http://127.0.0.1:1', 'unreachable');
    const answer = await post(proxy.port, '{}', { 'content-type': 'application/json' });
    expect(answer.status).toBe(502);

    proxy.child.kill('SIGTERM');
    expect(await proxy.exited).toBe(0);
    expect(readFileSync(path.join(proxy.out, 'res-0001.txt'), 'utf8')).toMatch(/^UPSTREAM ERROR /);
    expect(existsSync(path.join(proxy.out, 'req-0001.json'))).toBe(true);
  });
});
