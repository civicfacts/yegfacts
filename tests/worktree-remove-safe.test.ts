/**
 * scripts/worktree-remove-safe.sh against a throwaway repository: a worktree is
 * removed only after every private archive file it holds is safely in the main
 * checkout, and any doubt stops the removal.
 */
import { spawnSync, execFileSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const SCRIPT = path.resolve('scripts/worktree-remove-safe.sh');
const asRoot = process.getuid?.() === 0;
const cleanups: Array<() => void> = [];

afterEach(() => {
  while (cleanups.length > 0) cleanups.pop()!();
});

/** A repo whose main checkout and one worktree each have evidence/private/. */
function setup(): { main: string; wt: string; mainPrivate: string; wtPrivate: string } {
  const main = mkdtempSync(path.join(tmpdir(), 'wt-safe-'));
  cleanups.push(() => rmSync(main, { recursive: true, force: true }));
  const git = (...args: string[]) => execFileSync('git', args, { cwd: main, stdio: 'pipe' });
  git('init', '-q');
  writeFileSync(path.join(main, '.gitignore'), 'evidence/private/\n');
  git('add', '.gitignore');
  git('-c', 'user.email=t', '-c', 'user.name=t', 'commit', '-qm', 'init');
  git('worktree', 'add', '-q', 'wt', '-b', 'wt');
  const mainPrivate = path.join(main, 'evidence/private');
  const wtPrivate = path.join(main, 'wt/evidence/private');
  mkdirSync(mainPrivate, { recursive: true });
  mkdirSync(wtPrivate, { recursive: true });
  return { main, wt: path.join(main, 'wt'), mainPrivate, wtPrivate };
}

function run(wt: string) {
  return spawnSync('bash', [SCRIPT, wt], { encoding: 'utf8' });
}

describe('worktree-remove-safe.sh', () => {
  it('copies a file the main checkout lacks, then removes the worktree', () => {
    const { wt, mainPrivate, wtPrivate } = setup();
    writeFileSync(path.join(mainPrivate, 'same'), 'x');
    writeFileSync(path.join(wtPrivate, 'same'), 'x');
    mkdirSync(path.join(wtPrivate, 'sub'));
    writeFileSync(path.join(wtPrivate, 'sub', 'b c'), 'new');
    const result = run(wt);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('copied evidence/private/sub/b c');
    expect(readFileSync(path.join(mainPrivate, 'sub', 'b c'), 'utf8')).toBe('new');
    expect(existsSync(wt)).toBe(false);
  });

  it('refuses when a file differs, after copying the missing ones', () => {
    const { wt, mainPrivate, wtPrivate } = setup();
    writeFileSync(path.join(mainPrivate, 'a'), 'main');
    writeFileSync(path.join(wtPrivate, 'a'), 'worktree');
    writeFileSync(path.join(wtPrivate, 'n'), 'n');
    const result = run(wt);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('differ');
    expect(existsSync(path.join(mainPrivate, 'n'))).toBe(true);
    expect(existsSync(wt)).toBe(true);
  });

  it("copies a symlink's target bytes, not the link", () => {
    const { main, wt, mainPrivate, wtPrivate } = setup();
    const target = path.join(main, 'outside');
    writeFileSync(target, 'linked bytes');
    symlinkSync(target, path.join(wtPrivate, 'link'));
    const result = run(wt);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('copied evidence/private/link');
    expect(readFileSync(path.join(mainPrivate, 'link'), 'utf8')).toBe('linked bytes');
  });

  it('refuses a dangling symlink', () => {
    const { main, wt, wtPrivate } = setup();
    symlinkSync(path.join(main, 'gone'), path.join(wtPrivate, 'dangling'));
    const result = run(wt);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('dangling symlink');
    expect(existsSync(wt)).toBe(true);
  });

  it("refuses when a directory in the main checkout's destination path is a symlink", () => {
    const { wt, mainPrivate, wtPrivate } = setup();
    const outside = mkdtempSync(path.join(tmpdir(), 'wt-safe-outside-'));
    cleanups.push(() => rmSync(outside, { recursive: true, force: true }));
    symlinkSync(outside, path.join(mainPrivate, 'sub'));
    mkdirSync(path.join(wtPrivate, 'sub'));
    writeFileSync(path.join(wtPrivate, 'sub', 'a'), 'x');
    const result = run(wt);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('evidence/private/sub in the main checkout is a symlink');
    expect(existsSync(path.join(outside, 'a'))).toBe(false);
    expect(existsSync(wt)).toBe(true);
  });

  it("refuses when the main checkout's copy is itself a symlink", () => {
    const { main, wt, mainPrivate, wtPrivate } = setup();
    writeFileSync(path.join(main, 'elsewhere'), 'x');
    symlinkSync(path.join(main, 'elsewhere'), path.join(mainPrivate, 'a'));
    writeFileSync(path.join(wtPrivate, 'a'), 'x');
    const result = run(wt);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('evidence/private/a in the main checkout is a symlink');
    expect(existsSync(wt)).toBe(true);
  });

  it.skipIf(asRoot)('refuses when a file cannot be hashed', () => {
    const { wt, mainPrivate, wtPrivate } = setup();
    writeFileSync(path.join(mainPrivate, 'a'), 'x');
    writeFileSync(path.join(wtPrivate, 'a'), 'y');
    chmodSync(path.join(wtPrivate, 'a'), 0o000);
    cleanups.push(() => chmodSync(path.join(wtPrivate, 'a'), 0o644));
    const result = run(wt);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('could not hash');
    expect(existsSync(wt)).toBe(true);
  });

  it.skipIf(asRoot)('refuses when part of the archive cannot be listed', () => {
    const { wt, wtPrivate } = setup();
    const locked = path.join(wtPrivate, 'locked');
    mkdirSync(locked);
    writeFileSync(path.join(locked, 'hidden'), 'x');
    chmodSync(locked, 0o000);
    cleanups.push(() => chmodSync(locked, 0o755));
    const result = run(wt);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('could not list');
    expect(existsSync(wt)).toBe(true);
  });

  it('refuses the main checkout itself', () => {
    const { main } = setup();
    const result = run(main);
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('is the main checkout');
  });
});
