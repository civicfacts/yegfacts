/**
 * A stand-in for api.anthropic.com, for tests that put a real recording proxy
 * in front of a real CLI invocation.
 *
 *   node tests/stub-upstream.mjs --port-file <file>
 *
 * It runs in its OWN process, and that is not incidental. The launcher is
 * driven from the tests with `spawnSync`, which blocks the vitest worker's
 * event loop until the launcher exits — so an upstream listening inside that
 * worker would never answer a single request and the run would deadlock.
 *
 * It answers every request the same way, with a minimal server-sent-events
 * body. Nothing here models the API; the tests are about what the CLI sent, and
 * the response only has to arrive.
 */
import fs from 'node:fs';
import http from 'node:http';

const flags = {};
const argv = process.argv.slice(2);
for (let index = 0; index < argv.length; index += 2) flags[argv[index].slice(2)] = argv[index + 1];

const server = http.createServer((request, response) => {
  request.resume();
  request.on('end', () => {
    response.writeHead(200, { 'content-type': 'text/event-stream' });
    response.end('event: message_stop\ndata: {"type":"message_stop"}\n\n');
  });
});

server.listen(0, '127.0.0.1', () => {
  const temporary = `${flags['port-file']}.partial`;
  fs.writeFileSync(temporary, `${server.address().port}\n`);
  fs.renameSync(temporary, flags['port-file']);
});

process.on('SIGTERM', () => server.close(() => process.exit(0)));
