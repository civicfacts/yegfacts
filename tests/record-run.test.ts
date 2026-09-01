/**
 * The run manifest is the only record of what actually ran, so the fields that
 * identify and shape a seat's output — model ID, and since methodology v1.6 the
 * seat name and reasoning effort — must be present on every new entry, and a
 * manifest written before that rule existed must still be readable and
 * appendable.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import YAML from 'yaml';

const SCRIPT = fileURLToPath(new URL('../scripts/panel/record-run.ts', import.meta.url));
const TSX = fileURLToPath(new URL('../node_modules/.bin/tsx', import.meta.url));

const workdir = mkdtempSync(path.join(tmpdir(), 'yegfacts-record-run-'));
afterAll(() => rmSync(workdir, { recursive: true, force: true }));

type Manifest = { runs: Record<string, unknown>[] };

function record(manifest: string, overrides: Record<string, string | null>): void {
  const args: Record<string, string | null> = {
    manifest,
    story: 'climate-targets',
    date: '2026-09-01',
    provider: 'anthropic',
    seat: 'Claude Fable 5.1',
    round: '1',
    command: 'claude -p --model claude-fable-5-1 --effort high < package.md',
    cli_version: '2.1.252',
    model: 'claude-fable-5-1',
    effort: 'high',
    'prompt-sha256': 'a'.repeat(64),
    'started-at': '2026-09-01T06:48:00Z',
    'finished-at': '2026-09-01T06:52:00Z',
    attempts: '1',
    status: 'ok',
    ...overrides,
  };
  const argv = Object.entries(args).flatMap(([flag, value]) =>
    value === null ? [] : [`--${flag}`, value],
  );
  execFileSync(TSX, [SCRIPT, ...argv], { encoding: 'utf8', stdio: 'pipe' });
}

function read(manifest: string): Manifest {
  return YAML.parse(readFileSync(manifest, 'utf8')) as Manifest;
}

describe('record-run', () => {
  it('records the pinned reasoning effort on a new entry', () => {
    const manifest = path.join(workdir, 'new-run.yaml');
    record(manifest, {});
    const entry = read(manifest).runs[0]!;
    expect(entry.model_id).toBe('claude-fable-5-1');
    expect(entry.seat).toBe('Claude Fable 5.1');
    expect(entry.reasoning_effort).toBe('high');
  });

  it('refuses to record a run whose effort was not stated', () => {
    const manifest = path.join(workdir, 'no-effort.yaml');
    expect(() => record(manifest, { effort: null })).toThrow(/--effort is required/);
  });

  it('appends to a pre-v1.6 manifest without inventing an effort for its entries', () => {
    const manifest = path.join(workdir, 'legacy.yaml');
    writeFileSync(
      manifest,
      YAML.stringify({
        story: 'climate-targets',
        date: '2026-09-01',
        methodology_version: '1.0',
        runs: [{ provider: 'openai', round: 1, model_id: 'gpt-5.6-sol', status: 'ok' }],
      }),
    );

    record(manifest, {});

    const runs = read(manifest).runs;
    expect(runs).toHaveLength(2);
    const legacy = runs.find((run) => run.provider === 'openai')!;
    expect(legacy).not.toHaveProperty('reasoning_effort');
    expect(legacy).not.toHaveProperty('seat');
    expect(runs.find((run) => run.provider === 'anthropic')?.reasoning_effort).toBe('high');
  });
});
