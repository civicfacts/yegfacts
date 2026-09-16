/**
 * The denylist check, against a stub machine.
 *
 * Every test here builds its own $HOME and its own repository root and points
 * the resolver at them, so the assertions are about text this file wrote rather
 * than about whatever happens to be in the founder's home directory. That is
 * also the only honest way to test a leak: a scenario that claims a private line
 * reached the request puts a real line of a real file into a real request body.
 *
 * The lock this file holds is the one the whole check exists for: a failure
 * names the source and the line NUMBER and never the line. A report that quoted
 * the leaking line to prove the leak would republish the private text into the
 * record defending it, and that report is retained and hashed into a public row.
 */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import {
  type CapturedRequest,
  MEMORY_GROUP,
  checkCapture,
  needleLines,
  privateSources,
  readCapture,
} from '../scripts/panel/capture-check.ts';

const root = mkdtempSync(path.join(tmpdir(), 'yegfacts-capture-check-'));
afterAll(() => rmSync(root, { recursive: true, force: true }));

const PACKAGE = '# Stub brief\n\nOne claim, and the exact bytes a reviewer was handed.\n';
const HOME_LINE = 'Every session the founder starts in this repo is the project steward.';
const MEMORY_LINE = 'The founder runs parallel sessions; stage commits by explicit file names.';
const REPO_LINE = 'Work happens in a worktree on a branch, one pull request per batch.';

/** A stub machine: a HOME with the private files, and a repository root. */
function stubMachine(name: string): { home: string; repoRoot: string } {
  const home = path.join(root, name, 'home');
  const repoRoot = path.join(root, name, 'repo');
  mkdirSync(path.join(home, '.claude', 'projects', 'stub-project', 'memory'), { recursive: true });
  mkdirSync(repoRoot, { recursive: true });
  writeFileSync(path.join(home, '.claude', 'CLAUDE.md'), `# Global\n\n${HOME_LINE}\n`);
  writeFileSync(
    path.join(home, '.claude', 'projects', 'stub-project', 'memory', 'notes.md'),
    `# Memory\n\n${MEMORY_LINE}\n`,
  );
  writeFileSync(path.join(repoRoot, 'CLAUDE.md'), `# Repo\n\n${REPO_LINE}\n`);
  return { home, repoRoot };
}

/** A request body the way the proxy captures one. */
const request = (file: string, body: unknown): CapturedRequest => ({
  file,
  method: body === '' ? 'HEAD' : 'POST',
  url: '/v1/messages',
  headers: { authorization: '<redacted>' },
  body,
});

const mainTurn = (extra: string[] = []) =>
  request('req-0003.json', {
    model: 'claude-opus-5',
    system: [{ type: 'text', text: 'You are a Claude agent.' }],
    messages: [
      { role: 'user', content: [{ type: 'text', text: PACKAGE }, ...extra.map((text) => ({ type: 'text', text }))] },
    ],
  });

const sessionTitle = () =>
  request('req-0002.json', {
    model: 'claude-opus-5',
    messages: [{ role: 'user', content: [{ type: 'text', text: `<session>\n${PACKAGE}</session>\n` }] }],
  });

const connectivity = () => request('req-0001.json', '');

const check = (
  machine: { home: string; repoRoot: string },
  requests: CapturedRequest[],
  options: { token?: string; packageText?: string } = {},
) =>
  checkCapture({
    requests,
    packageText: options.packageText ?? PACKAGE,
    token: options.token ?? '',
    sources: privateSources({ ...machine, token: options.token ?? '' }),
  });

describe('needle lines', () => {
  it('keeps distinctive lines and drops markdown punctuation and short ones', () => {
    const lines = needleLines(
      ['# Heading', '---', '```', '- short', HOME_LINE, '   ', '###', `  ${MEMORY_LINE}  `].join('\n'),
    );
    // Both long lines survive, trimmed. Everything else is either under the
    // length floor or markdown scaffolding that appears in half the files on
    // the machine, and a check built on those would refuse clean runs.
    expect(lines).toEqual([HOME_LINE, MEMORY_LINE]);
  });
});

describe('private sources', () => {
  it('records a file that is not on this machine as absent, not as an error', () => {
    const machine = stubMachine('absent');
    const sources = privateSources({ ...machine, token: '' });
    const byName = Object.fromEntries(sources.map((source) => [source.name, source]));

    expect(byName['$HOME/.claude/CLAUDE.md']!.present).toBe(true);
    expect(byName['$HOME/.claude/CLAUDE.md']!.lines).toEqual([HOME_LINE]);
    // No ~/.codex on this stub machine, and none on plenty of real ones. A
    // machine that cannot leak a file is not a machine that failed a check.
    expect(byName['$HOME/.codex/AGENTS.md']).toEqual({
      name: '$HOME/.codex/AGENTS.md',
      present: false,
      lines: [],
    });
    expect(byName['<repo>/AGENTS.md']!.present).toBe(false);
    // A research run has no canary token, so that source is absent too.
    expect(byName['the canary token']!.present).toBe(false);
    // The memory file is found by walking every project directory, and it keeps
    // its own source so a failure can name the file that leaked.
    expect(byName[`${MEMORY_GROUP} (1)`]!.lines).toEqual([MEMORY_LINE]);
    expect(byName[`${MEMORY_GROUP} (1)`]!.group).toBe(MEMORY_GROUP);
  });

  it('marks the memory group absent when the machine keeps no memory files', () => {
    const machine = stubMachine('no-memory');
    rmSync(path.join(machine.home, '.claude', 'projects'), { recursive: true, force: true });

    // A group with no members would otherwise vanish from the report, and "this
    // machine keeps no project memory" is a fact rather than a gap.
    const group = privateSources({ ...machine, token: '' }).filter((source) => source.group === MEMORY_GROUP);
    expect(group).toEqual([{ name: MEMORY_GROUP, present: false, lines: [], group: MEMORY_GROUP }]);
  });

  it('names sources symbolically, so no report carries a path from this machine', () => {
    const machine = stubMachine('names');
    const names = privateSources({ ...machine, token: 'YEGFACTS_CANARY_abc' }).map((source) => source.name);
    expect(names.join('\n')).not.toContain(machine.home);
    expect(names.join('\n')).not.toContain(machine.repoRoot);
    expect(names).toContain('the home directory');
    expect(names).toContain('the repository path');
    expect(names).toContain('the canary token');
  });
});

describe('capture check', () => {
  it('passes a capture that carries the package and nothing private', () => {
    const machine = stubMachine('clean');
    const result = check(machine, [connectivity(), sessionTitle(), mainTurn()]);

    expect(result.failures).toEqual([]);
    expect(result.status).toBe('pass');
    // Two of the three requests carry the package: the session title and the
    // main turn. The package leaves twice per attempt and the check says so.
    expect(result.package_seen).toBe(2);
    expect(result.requests).toBe(3);
    expect(result.sources.find((source) => source.name === '$HOME/.claude/CLAUDE.md')).toEqual({
      name: '$HOME/.claude/CLAUDE.md',
      present: true,
      lines_checked: 1,
    });
  });

  it('reports the memory files as one row with a file count, not one row each', () => {
    const machine = stubMachine('many-memory');
    const memory = path.join(machine.home, '.claude', 'projects', 'stub-project', 'memory');
    writeFileSync(path.join(memory, 'second.md'), `# More\n\n${MEMORY_LINE} And a second line worth keeping.\n`);
    mkdirSync(path.join(machine.home, '.claude', 'projects', 'other-project', 'memory'), { recursive: true });
    writeFileSync(
      path.join(machine.home, '.claude', 'projects', 'other-project', 'memory', 'third.md'),
      '# Third\n\nA third note long enough to count as a distinctive line.\n',
    );

    const sources = privateSources({ ...machine, token: '' });
    // Three files, three sources: the check still looks at each one on its own.
    expect(sources.filter((source) => source.group === MEMORY_GROUP)).toHaveLength(3);

    const result = check(machine, [sessionTitle(), mainTurn()]);
    const rows = result.sources.filter((row) => row.name.startsWith('$HOME/.claude/projects'));
    // One row in the report, with the count and the total.
    expect(rows).toEqual([{ name: MEMORY_GROUP, present: true, files: 3, lines_checked: 3 }]);
    // And no row naming an individual memory file.
    expect(JSON.stringify(result.sources)).not.toContain(`${MEMORY_GROUP} (`);
  });

  it('reports an absent memory group with a file count of zero', () => {
    const machine = stubMachine('empty-memory');
    rmSync(path.join(machine.home, '.claude', 'projects'), { recursive: true, force: true });
    const result = check(machine, [sessionTitle(), mainTurn()]);
    expect(result.sources.find((row) => row.name === MEMORY_GROUP)).toEqual({
      name: MEMORY_GROUP,
      present: false,
      files: 0,
      lines_checked: 0,
    });
  });

  it('fails a body carrying one line of the global CLAUDE.md, and never quotes it', () => {
    const machine = stubMachine('home-leak');
    const result = check(machine, [connectivity(), sessionTitle(), mainTurn([`Remember: ${HOME_LINE}`])]);

    expect(result.status).toBe('fail');
    expect(result.failures).toEqual(['req-0003.json: carries $HOME/.claude/CLAUDE.md line 1']);
    // The whole point. The report names where and which line, and the line
    // itself stays where it was.
    expect(JSON.stringify(result)).not.toContain(HOME_LINE);
  });

  it('fails a body carrying a line of a project memory file', () => {
    const machine = stubMachine('memory-leak');
    const result = check(machine, [sessionTitle(), mainTurn([MEMORY_LINE])]);

    // Collapsed in the report, named individually in a failure: the row is for
    // reading and the failure is for finding the file that leaked.
    expect(result.failures).toEqual([`req-0003.json: carries ${MEMORY_GROUP} (1) line 1`]);
    expect(JSON.stringify(result)).not.toContain(MEMORY_LINE);
  });

  it('fails a body carrying a line of the repository CLAUDE.md', () => {
    const machine = stubMachine('repo-leak');
    const result = check(machine, [sessionTitle(), mainTurn([REPO_LINE])]);
    expect(result.failures).toEqual(['req-0003.json: carries <repo>/CLAUDE.md line 1']);
  });

  it('fails a body carrying the repository path', () => {
    const machine = stubMachine('repo-path');
    const result = check(machine, [
      sessionTitle(),
      mainTurn([` - Primary working directory: ${machine.repoRoot}/work`]),
    ]);

    expect(result.status).toBe('fail');
    expect(result.failures).toEqual(['req-0003.json: carries the repository path line 1']);
    // The path is exactly what the check is defending, so it is not reprinted.
    expect(JSON.stringify(result)).not.toContain(machine.repoRoot);
  });

  it('fails a body carrying the canary token', () => {
    const machine = stubMachine('token');
    const token = 'YEGFACTS_CANARY_0123456789abcdef01234567';
    const result = check(machine, [sessionTitle(), mainTurn([`token: ${token}`])], { token });

    expect(result.failures).toEqual(['req-0003.json: carries the canary token line 1']);
    expect(JSON.stringify(result)).not.toContain(token);
  });

  it('fails a capture whose requests never carry the package', () => {
    const machine = stubMachine('no-package');
    const result = check(machine, [connectivity(), request('req-0002.json', { messages: [] })]);

    expect(result.status).toBe('fail');
    expect(result.package_seen).toBe(0);
    expect(result.failures.join()).toMatch(/no captured request carries the declared package byte for byte/);
    expect(result.failures.join()).toMatch(/this capture is not of this run/);
  });

  it('counts a request with no JSON body and searches nothing in it', () => {
    const machine = stubMachine('head');
    // The HEAD connectivity check has an empty body, which the proxy captures as
    // a bare string. It is counted, because a capture has to account for every
    // request, and it is not walked, because there is nothing to walk.
    const result = check(machine, [connectivity(), sessionTitle(), mainTurn()]);
    expect(result.requests).toBe(3);
    expect(result.package_seen).toBe(2);
    expect(result.status).toBe('pass');
  });

  it('reports one failure per request when two requests carry the same line', () => {
    const machine = stubMachine('both');
    const leaking = request('req-0002.json', {
      messages: [{ role: 'user', content: [{ type: 'text', text: `${PACKAGE}\n${HOME_LINE}` }] }],
    });
    const result = check(machine, [leaking, mainTurn([HOME_LINE])]);

    expect(result.failures).toEqual([
      'req-0002.json: carries $HOME/.claude/CLAUDE.md line 1',
      'req-0003.json: carries $HOME/.claude/CLAUDE.md line 1',
    ]);
  });

  it('searches deeply nested strings, not only the message text', () => {
    const machine = stubMachine('nested');
    const buried = request('req-0003.json', {
      messages: [{ role: 'user', content: [{ type: 'text', text: PACKAGE }] }],
      tools: [{ name: 'WebFetch', input_schema: { properties: { note: { description: HOME_LINE } } } }],
    });
    expect(check(machine, [buried]).failures).toEqual([
      'req-0003.json: carries $HOME/.claude/CLAUDE.md line 1',
    ]);
  });
});

describe('reading a capture directory', () => {
  it('reads the requests, the upstream and a manifest hash over every file', () => {
    const dir = path.join(root, 'capture');
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, 'req-0001.json'), `${JSON.stringify(connectivity())}\n`);
    writeFileSync(path.join(dir, 'req-0002.json'), `${JSON.stringify(sessionTitle())}\n`);
    writeFileSync(path.join(dir, 'res-0002.txt'), 'HTTP 200\n');
    writeFileSync(path.join(dir, 'upstream.txt'), 'http://127.0.0.1:4000\n');

    const capture = readCapture(dir);
    expect(capture.requests.map((one) => one.file)).toEqual(['req-0001.json', 'req-0002.json']);
    expect(capture.upstream).toBe('http://127.0.0.1:4000');
    expect(capture.requestsManifestSha256).toMatch(/^[0-9a-f]{64}$/);

    // The hash covers the response files too, so a capture pruned after the fact
    // no longer matches the hash a public row carries.
    const before = capture.requestsManifestSha256;
    writeFileSync(path.join(dir, 'res-0002.txt'), 'HTTP 200\nand one more line\n');
    expect(readCapture(dir).requestsManifestSha256).not.toBe(before);
  });
});
