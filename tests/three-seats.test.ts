/**
 * The Codex and Gemini seats, admitted under stated limits (methodology v1.31).
 *
 * Every test here puts a stub `codex` or `agy` first on PATH, so nothing is paid
 * for and nothing is asked of a model. The stubs are real programs with real
 * filesystem access, and that is what makes two very different properties
 * testable rather than merely asserted:
 *
 *   The Codex stub genuinely reads the planted fixture off disk and puts what it
 *   found into the NEXT turn's request body, which is what the seat's whole limit
 *   rests on. The read-only sandbox lets the read happen; the denylist over the
 *   capture is what refuses the run afterwards.
 *
 *   The Gemini stub writes its transcript and its fetched page where agy 1.1.28
 *   writes them, inside the per-attempt HOME, so the launcher's copy-out and the
 *   record check run over files a CLI actually produced.
 *
 * The Codex stub also makes real HTTP requests through the launcher's own
 * recording proxy to a stub upstream this file started, so its capture was
 * produced by an actual request rather than written by a test where the capture
 * should be.
 *
 * WHAT EVERY RUN HERE FALLS SHORT OF, on purpose: none of them is admitted. A
 * Codex capture taken against a stub upstream is not a production one, and a
 * Gemini run with a loopback upstream configured is a run a test arranged. Both
 * are recorded with the reason. That is the behaviour under test, not a
 * limitation of the test.
 */
import { spawnSync } from 'node:child_process';
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { HOME_INSTRUCTION, MEMORY_NOTE, startStubUpstream, stubHome } from './stub-machine.ts';

const REAL_REPO = fileURLToPath(new URL('..', import.meta.url));
const INVOKE = path.join(REAL_REPO, 'scripts', 'panel', 'invoke-reviewer.sh');

const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'yegfacts-seats-')));
afterAll(() => rmSync(root, { recursive: true, force: true }));

let upstream: { url: string; stop: () => void };
let upstreamUrl = '';
beforeAll(async () => {
  upstream = await startStubUpstream(root);
  upstreamUrl = upstream.url;
});
afterAll(() => upstream?.stop());

type Seat = 'openai' | 'google';
type Stub = {
  dir: string;
  home: string;
  bin: string;
  archive: string;
  credential: string;
  env: NodeJS.ProcessEnv;
};

/**
 * A machine with private files, a credential for one seat, and that seat's CLI
 * on PATH.
 *
 * `onPath: false` leaves the CLI off PATH entirely, which is how the executable
 * hook is tested: a hook that only worked when the command was already there
 * would prove nothing.
 */
function stub(
  seat: Seat,
  options: {
    /** Breaks the research run only, so a clean canary can precede a bad run. */
    mutate?: string;
    /** Breaks the canary, which stops the package being sent at all. */
    mutateCanary?: string;
    exit?: number;
    version?: string;
    credential?: boolean;
    onPath?: boolean;
  } = {},
): Stub {
  const dir = mkdtempSync(path.join(root, `stub-${seat}-`));
  const bin = path.join(dir, 'bin');
  mkdirSync(bin);
  const home = stubHome(dir);

  // The credential the launcher may link to and must never create.
  let credential = '';
  if (options.credential !== false) {
    if (seat === 'openai') {
      mkdirSync(path.join(home, '.codex'), { recursive: true });
      credential = path.join(home, '.codex', 'auth.json');
      // Deliberately not shaped like a real credential file. The launcher never
      // reads one, so nothing here needs the real keys, and a stand-in that
      // looked like a token would trip the repository's own secret scan.
      writeFileSync(credential, '{"stub-login": "this file stands in for a login and holds nothing"}\n');
    } else {
      mkdirSync(path.join(home, '.gemini', 'antigravity-cli'), { recursive: true });
      credential = path.join(home, '.gemini', 'antigravity-cli', 'antigravity-oauth-token');
      writeFileSync(credential, 'stub-gemini-token\n');
      writeFileSync(path.join(home, '.gemini', 'antigravity-cli', 'installation_id'), 'stub-installation\n');
      // The real settings the launcher must not touch.
      writeFileSync(path.join(home, '.gemini', 'antigravity-cli', 'settings.json'), '{"real": true}\n');
    }
  }

  if (options.mutate) writeFileSync(path.join(dir, 'mutate'), options.mutate);
  if (options.mutateCanary) writeFileSync(path.join(dir, 'mutate-canary'), options.mutateCanary);
  if (options.exit !== undefined) writeFileSync(path.join(dir, 'exit'), String(options.exit));
  if (options.version) writeFileSync(path.join(dir, 'version'), options.version);

  const source = path.join(REAL_REPO, 'tests', seat === 'openai' ? 'stub-codex.mjs' : 'stub-agy.mjs');
  const name = seat === 'openai' ? 'codex' : 'agy';
  const executable = path.join(bin, name);
  writeFileSync(executable, `#!/usr/bin/env node\nimport(${JSON.stringify(source)});\n`);
  chmodSync(executable, 0o755);

  const archive = mkdtempSync(path.join(root, 'archive-'));
  // A PATH with the system tools the launcher needs and no reviewer CLI on it.
  // Emptying PATH entirely would test nothing: the launcher would fail on `git`
  // long before it asked whether a reviewer CLI exists. The real PATH is not an
  // option either, because this machine has a real `codex` and a real `agy`.
  const tools = path.join(dir, 'tools');
  mkdirSync(tools);
  for (const tool of ['node', 'npx']) {
    const found = spawnSync('which', [tool], { encoding: 'utf8' }).stdout.trim();
    if (found) symlinkSync(found, path.join(tools, tool));
  }
  return {
    dir,
    home,
    bin: executable,
    archive,
    credential,
    env: {
      ...process.env,
      HOME: home,
      PATH:
        options.onPath === false
          ? `${tools}:/usr/bin:/bin:/usr/sbin:/sbin`
          : `${bin}:${process.env.PATH ?? ''}`,
      YEGFACTS_REVIEW_ARCHIVE: archive,
      YEGFACTS_REVIEW_UPSTREAM: upstreamUrl,
      YEGFACTS_STUB_DIR: dir,
      YEGFACTS_STUB_HOME: home,
    },
  };
}

function run(args: string[], env: NodeJS.ProcessEnv): { ok: boolean; stderr: string; stdout: string } {
  const result = spawnSync('bash', args, { env, encoding: 'utf8' });
  return { ok: result.status === 0, stderr: result.stderr ?? '', stdout: result.stdout ?? '' };
}

const writePackage = (name: string) => {
  const file = path.join(root, name);
  writeFileSync(file, `package ${name}\nwith bytes worth keeping\n`);
  return file;
};

const readJson = (file: string) => JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;

const MODELS: Record<Seat, string> = { openai: 'gpt-6-sol', google: 'gemini-3.8-flash-high' };

const invoke = (
  seat: Seat,
  one: Stub,
  name: string,
  purpose: 'research' | 'diagnostic' = 'research',
  extra: string[] = [],
) => {
  const attempt = path.join(one.archive, purpose, name);
  const pkg = writePackage(`${seat}-${name}.md`);
  const result = run(
    [
      INVOKE, '--purpose', purpose, '--provider', seat, '--package', pkg, '--attempt-dir', attempt,
      '--model', MODELS[seat], '--effort', 'high',
      // v1.37: the Google profile is kept for runs frozen before the retirement
      // and reachable only with the flag; these tests exercise that profile.
      ...(seat === 'google' ? ['--finish-frozen-run'] : []),
      ...extra,
    ],
    one.env,
  );
  return { ...result, attempt, pkg };
};

/** True when the stub was ever handed a real package rather than the canary. */
const packageWasSent = (one: Stub) => existsSync(path.join(one.dir, 'package-sent.txt'));

// ---------------------------------------------------------------------------
describe('the Codex seat', { timeout: 120_000 }, () => {
  it('captures both runs, checks them, and records the read the sandbox allowed', () => {
    const one = stub('openai');
    const { ok, attempt, pkg } = invoke('openai', one, 'happy');
    expect(ok).toBe(true);

    // The output contract run-reviewer.sh is coded against.
    expect(readFileSync(path.join(attempt, 'final-message.txt'), 'utf8')).toBe('a report a reader could use');
    expect(readFileSync(path.join(attempt, 'package.md'), 'utf8')).toBe(readFileSync(pkg, 'utf8'));
    expect(readFileSync(path.join(one.dir, 'package-sent.txt'), 'utf8')).toBe(readFileSync(pkg, 'utf8'));

    // Two captures, from two proxies, kept apart.
    const captured = (dir: string) => readdirSync(dir).filter((f) => f.startsWith('req-') && f.endsWith('.json'));
    expect(captured(path.join(attempt, 'requests')).length).toBeGreaterThan(3);
    expect(captured(path.join(attempt, 'canary', 'requests')).length).toBeGreaterThan(3);

    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.status).toBe('ok');
    expect(metadata.canary).toBe('pass');
    expect(metadata.structure).toBe('pass');
    expect(metadata.context_proof).toBe('pass');
    expect(metadata.canary_context_proof).toBe('pass');
    expect(metadata.record_kind).toBe('request');
    expect(metadata.profile).toMatch(/^codex-captured-read-only-/);
    expect(metadata.package_seen).toBe(2);

    // The canary read the planted fixture, because this profile cannot stop it,
    // and the run is recorded rather than failed for it.
    const canaryReport = readJson(path.join(attempt, 'canary', 'report.json'));
    expect((canaryReport.facts as Record<string, unknown>).file_read).toBe('allowed');
    expect(canaryReport.ok).toBe(true);

    // Every check passed and the run is still not admitted, for the stated
    // reason: the capture went to a stub, not to chatgpt.com.
    expect(metadata.admitted_for_research).toBe(false);
    expect(String(metadata.admission_reason)).toMatch(/rather than https:\/\/chatgpt\.com/);
  });

  /**
   * The three CLIs put their version in different places: `2.1.272 (Claude
   * Code)`, `codex-cli 0.154.0`, `1.2.4`. Taking the first field turned this
   * seat's profile into `codex-captured-read-only-codex-cli` on its first live
   * run, which is a profile name that names no build at all.
   */
  it('records the version and not the product name in front of it', () => {
    const one = stub('openai', { version: 'codex-cli 0.154.0\n' });
    const { attempt } = invoke('openai', one, 'version');
    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.cli_version).toBe('0.154.0');
    expect(metadata.profile).toBe('codex-captured-read-only-0.154.0');
  });

  it('redacts the account identifier in the capture and nowhere else', () => {
    const one = stub('openai');
    const { attempt } = invoke('openai', one, 'redaction');
    const files = readdirSync(path.join(attempt, 'requests')).filter((f) => f.endsWith('.json'));
    const bodies = files.map((f) => readJson(path.join(attempt, 'requests', f)));
    const headers = bodies.map((body) => body.headers as Record<string, string>);
    expect(headers.some((one) => one['chatgpt-account-id'] === '<redacted>')).toBe(true);
    for (const capture of bodies) {
      expect(JSON.stringify(capture)).not.toContain('stub-account-0000-1111-2222');
      expect(JSON.stringify(capture)).not.toContain('stub-codex-token');
    }
  });

  it('builds a per-attempt home holding a symlink and two lines, and unlinks it afterwards', () => {
    const one = stub('openai');
    const before = statSync(one.credential);
    const { attempt } = invoke('openai', one, 'home');

    // What the subprocess saw: a 0700 directory, the pinned model and effort,
    // and a LINK to the credential rather than a copy of it.
    const seen = readJson(path.join(one.dir, 'home-seen.json'));
    expect(seen.mode).toBe('700');
    expect(seen.entries).toContain('auth.json');
    expect(seen.config).toBe('model = "gpt-6-sol"\nmodel_reasoning_effort = "high"\n');
    expect(seen.auth_is_symlink).toBe(true);
    expect(seen.auth_target).toBe(one.credential);
    expect(seen.hooks_disabled).toBe('1');

    // Afterwards the link and the configuration are gone, and the credential at
    // the other end of the link is exactly as it was.
    expect(existsSync(path.join(attempt, 'home', 'auth.json'))).toBe(false);
    expect(existsSync(path.join(attempt, 'home', 'config.toml'))).toBe(false);
    const after = statSync(one.credential);
    expect(after.size).toBe(before.size);
    expect(after.mode).toBe(before.mode);
    expect(readFileSync(one.credential, 'utf8')).toContain('stands in for a login');
  });

  it('refuses when there is no credential, and never writes one', () => {
    const one = stub('openai', { credential: false });
    const { ok, stderr, attempt } = invoke('openai', one, 'no-auth');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/no codex credential at \$HOME\/\.codex\/auth\.json/);
    expect(stderr).toMatch(/never creates one/);
    expect(existsSync(path.join(one.home, '.codex'))).toBe(false);
    expect(packageWasSent(one)).toBe(false);
    expect(readJson(path.join(attempt, 'metadata.json')).status).toBe('blocked');
  });

  it('refuses a canary whose search never reached the endpoint', () => {
    // The model saying it searched is not evidence that it did. The 2026-09-09
    // probe watched exactly this: a fabricated fetch and a zero exit.
    const one = stub('openai', { mutateCanary: 'no-search' });
    const { ok, stderr } = invoke('openai', one, 'no-search');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/no successful web-search request in the capture/);
    expect(packageWasSent(one)).toBe(false);
  });

  it('refuses when the reasoning effort in the request is not the pinned one', () => {
    const one = stub('openai', { mutateCanary: 'wrong-effort' });
    const { ok, stderr } = invoke('openai', one, 'effort');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/reasoning effort in the request was low, expected "high"/);
  });

  it('refuses when the research capture carries a project memory line', () => {
    const one = stub('openai', { mutate: 'leak-memory' });
    const { ok, stderr, attempt } = invoke('openai', one, 'leak');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/carries \$HOME\/\.claude\/projects\/\*\/memory\/\*\.md \(1\) line 1/);
    expect(stderr).not.toContain(MEMORY_NOTE);
    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.canary_context_proof).toBe('pass');
    expect(metadata.context_proof).toBe('fail');
    expect(metadata.admitted_for_research).toBe(false);
  });

  it('refuses a capture that never carried the declared package', () => {
    const one = stub('openai', { mutate: 'no-package' });
    const { ok, stderr } = invoke('openai', one, 'no-package');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/no captured request carries the declared package byte for byte/);
  });
});

// ---------------------------------------------------------------------------
describe('the Gemini seat', { timeout: 120_000 }, () => {
  it('runs against the CLI\'s own record, and says so rather than saying pass', () => {
    const one = stub('google');
    const { ok, attempt, pkg } = invoke('google', one, 'happy');
    expect(ok).toBe(true);

    expect(readFileSync(path.join(attempt, 'final-message.txt'), 'utf8')).toBe('a report a reader could use');
    expect(readFileSync(path.join(one.dir, 'package-sent.txt'), 'utf8').trim()).toBe(
      readFileSync(pkg, 'utf8').trim(),
    );

    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.status).toBe('ok');
    expect(metadata.canary).toBe('pass');
    expect(metadata.structure).toBe('pass');
    // The fourth word, and the only seat that may be admitted on it.
    expect(metadata.context_proof).toBe('record-only');
    expect(metadata.canary_context_proof).toBe('record-only');
    expect(metadata.record_kind).toBe('local-record');
    expect(metadata.profile).toMatch(/^agy-denied-tools-record-only-/);
    // There is no proxy, so there is no upstream, and the row says nothing
    // rather than something reassuring.
    expect(metadata.upstream).toBeNull();

    // The record the denylist read: the stream the CLI printed and the
    // transcript it kept, copied out before the home came down.
    const record = readdirSync(path.join(attempt, 'record')).sort();
    expect(record).toEqual(['stdout.jsonl', 'transcript-1.jsonl']);
    expect(readdirSync(path.join(attempt, 'fetched'))).toEqual(['page-1.md']);
    expect(readFileSync(path.join(attempt, 'fetched', 'page-1.md'), 'utf8')).toContain('Example Domain');

    // A run a test arranged is never research.
    expect(metadata.admitted_for_research).toBe(false);
    expect(String(metadata.admission_reason)).toMatch(/arranged by a test/);
  });

  it('writes the deny settings into the per-attempt home and leaves the real ones alone', () => {
    const one = stub('google');
    const before = readFileSync(one.credential, 'utf8');
    const { attempt } = invoke('google', one, 'settings');

    // What the subprocess saw: a 0700 home, the deny rules the profile is, and
    // LINKS to the credential and the installation id rather than copies.
    const seen = readJson(path.join(one.dir, 'home-seen.json'));
    expect(seen.mode).toBe('700');
    expect(JSON.parse(String(seen.settings))).toEqual({
      permissions: {
        allow: ['read_url(*)'],
        deny: ['read_file(*)', 'write_file(*)', 'command(*)', 'execute_url(*)'],
      },
    });
    expect(seen.token_is_symlink).toBe(true);
    expect(seen.token_target).toBe(one.credential);
    expect(seen.entries).toContain('installation_id');

    // The operator's own settings file is not what the CLI read and not what
    // this touched, and the credential is exactly as it was.
    expect(readFileSync(path.join(one.home, '.gemini', 'antigravity-cli', 'settings.json'), 'utf8')).toBe(
      '{"real": true}\n',
    );
    expect(readFileSync(one.credential, 'utf8')).toBe(before);

    // Afterwards nothing that looks like a credential is anywhere under the
    // attempt directory, and the home itself was never there.
    const walk = (dir: string): string[] =>
      readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory() ? walk(path.join(dir, entry.name)) : [entry.name],
      );
    const left = walk(attempt);
    expect(left).not.toContain('antigravity-oauth-token');
    expect(left).not.toContain('installation_id');
    expect(left).not.toContain('settings.json');
  });

  /**
   * The leak the first live canary found. agy's fetch tool saves the page it
   * fetched under HOME and then tells the model the absolute path of that file.
   * With the home under the archive, and the archive under `$HOME/.local/state`,
   * that handed the reviewer the operator's home directory, and the denylist
   * refused the run. The home moved into the opaque temporary tree instead.
   */
  it('keeps the operator\'s home directory out of the record the reviewer sees', () => {
    const one = stub('google');
    const { ok, attempt } = invoke('google', one, 'no-home-in-record');
    expect(ok).toBe(true);

    const record = readdirSync(path.join(attempt, 'record'))
      .map((name) => readFileSync(path.join(attempt, 'record', name), 'utf8'))
      .join('\n');
    expect(record).not.toContain(one.home);
    expect(record).not.toContain(one.archive);
    // The home the CLI ran under is in the same opaque tree the working
    // directory uses, named only by the attempt id.
    const workDir = String(readJson(path.join(attempt, 'metadata.json')).work_dir);
    expect(path.basename(workDir)).toMatch(/^attempt-[0-9a-f]{16}$/);
    expect(workDir.startsWith(one.home)).toBe(false);
  });

  /**
   * The one case `clean_homes` will not tidy, and must not.
   *
   * Every credential reaches a subprocess as a symlink, and the launcher unlinks
   * the link on the way out. If a vendor ever replaced that link with a regular
   * file, the file would be a copy of a login sitting in the temporary tree.
   * Deleting it is the wrong move: the same vendor may have rotated the token
   * and written the new one there, and removing it could log the operator out.
   * So it is left alone, named on stderr, and named in the private metadata.
   */
  it('leaves a credential copy in place, and says so loudly', () => {
    const one = stub('google', { mutateCanary: 'replace-credential' });
    const before = readFileSync(one.credential, 'utf8');
    const { ok, stderr, attempt } = invoke('google', one, 'residue');
    expect(ok).toBe(true);

    const relative = 'canary-home/.gemini/antigravity-cli/antigravity-oauth-token';
    expect(stderr).toContain('is a regular file where this launcher made a symlink');
    expect(stderr).toContain('LEFT IN PLACE');
    expect(stderr).toContain(relative);

    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.credential_residue).toEqual([relative]);
    // Left where it was, not deleted, and the real login is untouched.
    const workDir = String(metadata.work_dir);
    expect(readFileSync(path.join(workDir, relative), 'utf8')).toContain('a copy a vendor wrote');
    expect(readFileSync(one.credential, 'utf8')).toBe(before);

    // Nothing crosses into the public row.
    const record = spawnSync(
      'npx',
      ['tsx', path.join(REAL_REPO, 'scripts', 'panel', 'attempt-record.ts'), attempt, '--attempt', '1'],
      { env: one.env, encoding: 'utf8' },
    );
    const row = JSON.parse(record.stdout || '{}') as Record<string, unknown>;
    expect(row.credential_residue).toBeUndefined();
    expect(row.leftover_paths).toBeUndefined();
  });

  /**
   * The temporary tree comes down after the homes that live inside it, so a run
   * leaves no empty `attempt-<id>` directory behind. What a CLI wrote into its
   * own home and never cleaned up cannot be removed by `rmdir`, and that is
   * named rather than silently kept.
   */
  it('takes the temporary tree down, and names whatever a CLI left in it', () => {
    const one = stub('google');
    const { ok, attempt } = invoke('google', one, 'leftovers');
    expect(ok).toBe(true);

    const metadata = readJson(path.join(attempt, 'metadata.json'));
    const workDir = String(metadata.work_dir);
    const leftovers = metadata.leftover_paths as string[];
    // This stub's CLI writes a brain directory into its home, as agy does, so
    // both homes survive and both are named.
    expect(leftovers).toEqual(['canary-home', 'research-home']);
    expect(existsSync(workDir)).toBe(true);
    for (const name of leftovers) expect(existsSync(path.join(workDir, name))).toBe(true);
    // Nothing the launcher itself made is still there.
    expect(readdirSync(workDir).sort()).toEqual(leftovers);
  });

  it('refuses when there is no credential, and never writes one', () => {
    const one = stub('google', { credential: false });
    const { ok, stderr, attempt } = invoke('google', one, 'no-auth');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/no gemini credential at \$HOME\/\.gemini/);
    expect(stderr).toMatch(/never creates one/);
    expect(existsSync(path.join(one.home, '.gemini'))).toBe(false);
    expect(packageWasSent(one)).toBe(false);
    expect(readJson(path.join(attempt, 'metadata.json')).status).toBe('blocked');
  });

  it('fails when a file tool actually ran instead of being refused', () => {
    // The tools stay in the model's inventory under this profile; what stops
    // them is the permission check. A file tool that reached DONE is a file that
    // was read, and no amount of denying afterwards changes that.
    const one = stub('google', { mutateCanary: 'file-tool-done' });
    const { ok, stderr } = invoke('google', one, 'file-tool');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/ran tools outside the profile: view_file/);
    expect(packageWasSent(one)).toBe(false);
  });

  it('fails when the synthetic token came back', () => {
    const one = stub('google', { mutateCanary: 'token-leak' });
    const { ok, stderr } = invoke('google', one, 'token');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/the file boundary leaked|ran tools outside the profile/);
  });

  it('fails when the page the fetch tool saved does not carry the heading', () => {
    // The heading is read out of the saved bytes, not out of the answer. The
    // model says "Example Domain" in both runs; only one of them fetched it.
    const one = stub('google', { mutateCanary: 'empty-fetch' });
    const { ok, stderr } = invoke('google', one, 'empty-fetch');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/does not contain "Example Domain"/);
  });

  it('fails when the fetch never completed', () => {
    const one = stub('google', { mutateCanary: 'no-fetch' });
    const { ok, stderr } = invoke('google', one, 'no-fetch');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/no completed fetch of https:\/\/example\.com/);
  });

  it('refuses when the transcript carries the global CLAUDE.md', () => {
    const one = stub('google', { mutateCanary: 'leak-home' });
    const { ok, stderr, attempt } = invoke('google', one, 'leak');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/carries \$HOME\/\.claude\/CLAUDE\.md line 1/);
    expect(stderr).not.toContain(HOME_INSTRUCTION);
    expect(readJson(path.join(attempt, 'metadata.json')).canary_context_proof).toBe('fail');
    expect(packageWasSent(one)).toBe(false);
  });

  it('refuses a record that never carried the declared package', () => {
    const one = stub('google', { mutate: 'no-package' });
    const { ok, stderr } = invoke('google', one, 'no-package');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/no captured request carries the declared package byte for byte/);
  });

  it('fails when the CLI reported a status it has no rule for', () => {
    // `ERROR` is not one of those: under this profile steps fail on purpose, at
    // the permission check, and the first live canary came back ERROR having
    // done exactly what it was supposed to. What fails is a status nobody has a
    // reading for, and a step that failed for some other reason.
    const one = stub('google', { mutateCanary: 'failed-result' });
    const { ok, stderr } = invoke('google', one, 'failed-result');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/result status was "CANCELLED"/);
  });
});

// ---------------------------------------------------------------------------
describe('the executable hook', { timeout: 120_000 }, () => {
  it.each([
    ['openai', 'YEGFACTS_REVIEW_CODEX_BIN'],
    ['google', 'YEGFACTS_REVIEW_AGY_BIN'],
  ] as const)('runs %s from the named executable under a loopback upstream, and records it', (seat, hook) => {
    const one = stub(seat, { onPath: false });
    const { ok, attempt } = invoke(seat, { ...one, env: { ...one.env, [hook]: one.bin } }, 'hook');
    expect(ok).toBe(true);
    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.cli_executable).toBe(one.bin);
    expect(metadata.cli_bin_override).toBe(one.bin);
    // The hook is a test arrangement, so the run is never research whatever its
    // checks say.
    expect(metadata.admitted_for_research).toBe(false);
    expect(String(metadata.admission_reason)).toMatch(/test|rather than https/);
  });

  it.each([
    ['openai', 'YEGFACTS_REVIEW_CODEX_BIN'],
    ['google', 'YEGFACTS_REVIEW_AGY_BIN'],
  ] as const)('ignores the %s hook when the upstream is not loopback', (seat, hook) => {
    const one = stub(seat, { onPath: false });
    const env = { ...one.env, [hook]: one.bin };
    delete env.YEGFACTS_REVIEW_UPSTREAM;
    const { ok, stderr, attempt } = invoke(seat, { ...one, env }, 'hook-ignored');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/is not on PATH/);
    expect(readJson(path.join(attempt, 'metadata.json')).status).toBe('blocked');
  });

  it('refuses an upstream override that is not loopback at all', () => {
    const one = stub('openai');
    const env = { ...one.env, YEGFACTS_REVIEW_UPSTREAM: 'https://example.invalid' };
    const { ok, stderr } = invoke('openai', { ...one, env }, 'bad-upstream');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/must be a loopback URL/);
  });
});

// ---------------------------------------------------------------------------
describe('the public row', { timeout: 120_000 }, () => {
  it('carries the record kind and the proof word, and no path from this machine', () => {
    const one = stub('google');
    const { attempt } = invoke('google', one, 'row');
    const record = spawnSync(
      'npx',
      ['tsx', path.join(REAL_REPO, 'scripts', 'panel', 'attempt-record.ts'), attempt, '--attempt', '1'],
      { env: one.env, encoding: 'utf8' },
    );
    const row = JSON.parse(record.stdout || '{}') as Record<string, unknown>;
    expect(row.context_proof).toBe('record-only');
    expect(row.record_kind).toBe('local-record');
    expect(row.admitted_for_research).toBe(false);
    expect(row.cli_executable).toBeUndefined();
    expect(row.cli_executable_sha256).toBeUndefined();
    expect(row.cli_bin_override).toBeUndefined();
    expect(JSON.stringify(row)).not.toContain(one.archive);
    expect(JSON.stringify(row)).not.toContain('/Users/');
    expect(JSON.stringify(row)).not.toContain(HOME_INSTRUCTION);
  });
});
