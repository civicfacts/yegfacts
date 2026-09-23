/**
 * The admission gate, the retention, and what the stream and the capture each
 * settle.
 *
 * Every test here puts a stub `claude` first on PATH, so nothing is paid for and
 * nothing is asked of a model. The stub is a real shell script with real
 * filesystem access, which matters for the canary: when a scenario is supposed
 * to leak, the stub genuinely reads the synthetic fixture off disk and prints
 * the token it finds, rather than pretending to.
 *
 * It also makes real HTTP requests. `$ANTHROPIC_BASE_URL` points at the real
 * recording proxy, the proxy forwards to a stub upstream this file started, and
 * the stub posts a real set of request bodies. So the capture the check reads
 * was produced by an actual request through the actual proxy, rather than by a
 * file a test wrote where the capture should be.
 *
 * Each stub also gets its own HOME, carrying a CLAUDE.md and a project memory
 * file written for the test. That is the machine the capture check reads: a
 * leaking scenario copies a line of those files into its request for real, and
 * the check has to catch it by finding that line rather than by being told.
 *
 * The stream fixtures copy the shapes of a real stream, including the
 * `system/thinking_tokens` events that show up between the interesting ones and
 * the `tool_result` blocks that arrive on `user` events. None of it is invented;
 * a parser tested only against fixtures a CLI cannot emit tests nothing.
 *
 * WHAT EVERY RUN HERE FALLS SHORT OF, on purpose: the upstream is a stub, not
 * api.anthropic.com. That alone means `admitted_for_research` is false however
 * cleanly everything else passes, and the reason is recorded. That is the
 * behaviour under test, not a limitation of the test.
 */
import { spawnSync } from 'node:child_process';
import http from 'node:http';
import { chmodSync, cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import YAML from 'yaml';
import { HOME_INSTRUCTION, MEMORY_NOTE, startStubUpstream, stubHome } from './stub-machine.ts';

const REAL_REPO = fileURLToPath(new URL('..', import.meta.url));
const INVOKE = path.join(REAL_REPO, 'scripts', 'panel', 'invoke-reviewer.sh');
const STORY = 'stub-story';
const RUN_DATE = '2026-09-09';
/** What the stub CLI answers to `--version`, recorded and no longer gated. */
const STUB_VERSION = '2.1.272';
const POSTER = path.join(REAL_REPO, 'tests', 'stub-request-poster.mjs');

// realpath, because macOS hands out /var/folders paths that are symlinks into
// /private, and the launcher resolves before it compares.
const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'yegfacts-invoke-')));
afterAll(() => rmSync(root, { recursive: true, force: true }));

/**
 * A working copy of the repo with a real `reviews/`, so a test can write there
 * without touching the checkout.
 *
 * `scripts/` is COPIED rather than symlinked. Two reasons. A symlinked script
 * resolves back to the real one, so a test could never substitute a fixture for
 * it; and node reports the resolved path in `import.meta.url` while argv keeps
 * the link, which silently broke the entry-point guard in three of these files
 * the first time round. Everything else is a symlink because nothing rewrites it.
 */
function fakeRepo(): string {
  const repo = mkdtempSync(path.join(root, 'repo-'));
  cpSync(path.join(REAL_REPO, 'scripts'), path.join(repo, 'scripts'), { recursive: true });
  for (const entry of ['node_modules', 'prompts', 'src', 'methodology', 'package.json', 'tsconfig.json']) {
    symlinkSync(path.join(REAL_REPO, entry), path.join(repo, entry));
  }
  mkdirSync(path.join(repo, 'reviews', STORY, RUN_DATE), { recursive: true });
  writeFileSync(
    path.join(repo, 'reviews', STORY, RUN_DATE, 'brief.md'),
    '# Stub brief\n\nOne claim, for a run no model will ever see.\n',
  );
  return repo;
}

/**
 * Replace the launcher INSIDE ONE TEMPORARY FIXTURE REPO with a stand-in that
 * writes what an admitted research run would write, so the runner's retry
 * mechanics can be exercised while every real profile stays blocked.
 *
 * This is not a bypass and there is no flag for it in production: the real
 * launcher is untouched, and the only thing that can reach this one is a test
 * that copied the tree first. What it emulates is the contract the runner is
 * coded against and the review confirmed — a top-level `final-message.txt`
 * beside `package.md` and `metadata.json`. The diagnostic path's files live
 * under `canary/` on purpose and are never valid research output.
 *
 * `--response-N` is the nth invocation's final message; `--exit-N` its exit
 * code. `--create-during-run` writes a file partway through, which is how a
 * concurrent session filling the destination is simulated without touching
 * production code. `admitted` is what the launcher decided, and the runner now
 * reads it: the retry tests need an admitted run, and one test needs a run that
 * passed every check and was still not admitted.
 */
function fixtureLauncher(
  repo: string,
  responses: { text: string; exit?: number }[],
  options: { createDuringRun?: string; admitted?: boolean } = {},
): string {
  const state = mkdtempSync(path.join(root, 'fixture-'));
  responses.forEach((response, index) => {
    writeFileSync(path.join(state, `response-${index + 1}.txt`), response.text);
    writeFileSync(path.join(state, `exit-${index + 1}`), String(response.exit ?? 0));
  });
  if (options.createDuringRun) writeFileSync(path.join(state, 'create-during-run'), options.createDuringRun);
  const admitted = options.admitted === false ? 'false' : 'true';

  const script = `#!/usr/bin/env bash
set -euo pipefail
umask 077
ARCHIVE_ROOT="\${YEGFACTS_REVIEW_ARCHIVE:?}"
if [ "\${1:-}" = "--archive-root" ]; then
  mkdir -p "$ARCHIVE_ROOT"
  ( cd "$ARCHIVE_ROOT" && pwd -P )
  exit 0
fi

PROVIDER=""; PACKAGE=""; ATTEMPT_DIR=""; MODEL=""; EFFORT=""; LABEL=""; PURPOSE="research"
while [ "$#" -gt 0 ]; do
  case "$1" in
    --provider) PROVIDER="$2"; shift 2 ;;
    --package) PACKAGE="$2"; shift 2 ;;
    --attempt-dir) ATTEMPT_DIR="$2"; shift 2 ;;
    --model) MODEL="$2"; shift 2 ;;
    --effort) EFFORT="$2"; shift 2 ;;
    --label) LABEL="$2"; shift 2 ;;
    --purpose) PURPOSE="$2"; shift 2 ;;
    *) echo "fixture launcher: unknown option $1" >&2; exit 64 ;;
  esac
done

[ -e "$ATTEMPT_DIR" ] && { echo "attempt directory already exists" >&2; exit 1; }
mkdir -p "$ATTEMPT_DIR"

CALL=$(( $(cat "${state}/calls" 2>/dev/null || echo 0) + 1 ))
echo "$CALL" > "${state}/calls"
cp "$PACKAGE" "$ATTEMPT_DIR/package.md"
printf 'fixture-%016d\n' "$CALL" > "$ATTEMPT_DIR/attempt-id.txt"

# A concurrent session filling the destination while this "runs".
if [ -f "${state}/create-during-run" ]; then
  dest="$(cat "${state}/create-during-run")"
  mkdir -p "$(dirname "$dest")"
  printf 'written by another session\n' > "$dest"
fi

cat "${state}/response-$CALL.txt" > "$ATTEMPT_DIR/final-message.txt"
cp "${state}/response-$CALL.txt" "$ATTEMPT_DIR/stdout.txt"
EXIT="$(cat "${state}/exit-$CALL" 2>/dev/null || echo 0)"

sha() { shasum -a 256 "$1" | cut -d' ' -f1; }
STATUS=ok
[ "$EXIT" = "0" ] || STATUS=failed
printf '%s\n' "$EXIT" > "$ATTEMPT_DIR/exit-code"
printf '%s\n' "$STATUS" > "$ATTEMPT_DIR/status.txt"
printf '%s\n' pass > "$ATTEMPT_DIR/context-proof.txt"
cat > "$ATTEMPT_DIR/metadata.json" <<META
{
  "attempt_id": "$(cat "$ATTEMPT_DIR/attempt-id.txt")",
  "purpose": "$PURPOSE",
  "provider": "$PROVIDER",
  "status": "$STATUS",
  "reason": "fixture launcher",
  "profile": "fixture-profile",
  "model_id": "$MODEL",
  "reasoning_effort": "$EFFORT",
  "cli_version": "fixture",
  "exit_code": $EXIT,
  "canary": "pass",
  "structure": "pass",
  "context_proof": "pass",
  "admitted_for_research": ${admitted},
  "admission_reason": "fixture launcher: admitted ${admitted}",
  "package_sha256": "$(sha "$ATTEMPT_DIR/package.md")",
  "stdout_sha256": "$(sha "$ATTEMPT_DIR/stdout.txt")",
  "final_message_sha256": "$(sha "$ATTEMPT_DIR/final-message.txt")"
}
META
exit "$EXIT"
`;
  const target = path.join(repo, 'scripts', 'panel', 'invoke-reviewer.sh');
  writeFileSync(target, script);
  chmodSync(target, 0o755);
  return state;
}

// ---------------------------------------------------------------------------
// Stream fixtures, shaped after a real capture.
// ---------------------------------------------------------------------------
const initEvent = (over: Record<string, unknown> = {}) =>
  JSON.stringify({
    type: 'system',
    subtype: 'init',
    cwd: '/stub',
    session_id: 'stub-session',
    tools: ['WebFetch', 'WebSearch'],
    mcp_servers: [],
    model: 'claude-opus-5-5',
    permissionMode: 'default',
    slash_commands: [],
    claude_code_version: STUB_VERSION,
    output_style: 'default',
    agents: ['claude', 'Explore', 'general-purpose', 'Plan'],
    skills: [],
    plugins: [],
    ...over,
  });

/** The noise a real stream carries between the events that matter. */
const noiseEvent = () => JSON.stringify({ type: 'system', subtype: 'thinking_tokens', session_id: 'stub-session' });

const toolUseEvent = (id: string, name: string, input: Record<string, unknown>) =>
  JSON.stringify({
    type: 'assistant',
    message: { role: 'assistant', content: [{ type: 'tool_use', id, name, input }] },
    session_id: 'stub-session',
  });

const toolResultEvent = (id: string, content: string, isError = false) =>
  JSON.stringify({
    type: 'user',
    message: {
      role: 'user',
      content: [{ type: 'tool_result', tool_use_id: id, content, ...(isError ? { is_error: true } : {}) }],
    },
    session_id: 'stub-session',
  });

const resultEvent = (text: string, over: Record<string, unknown> = {}) =>
  JSON.stringify({
    type: 'result',
    subtype: 'success',
    is_error: false,
    result: text,
    permission_denials: [],
    subagent_stats: { spawned: 0 },
    session_id: 'stub-session',
    ...over,
  });

const stream = (...lines: string[]) => `${lines.join('\n')}\n`;

const FETCH_ID = 'toolu_01VK6hJYGg6BHuzrbymqjm2K';
const fetchedOk = 'The top-level heading (h1 element) from the webpage is:\n\n"Example Domain"';
const canaryAnswer = '{"web_h1": "Example Domain", "canary_token": null, "tools": ["WebFetch", "WebSearch"]}';

const goodCanary = stream(
  initEvent(),
  noiseEvent(),
  toolUseEvent(FETCH_ID, 'WebFetch', { url: 'https://example.com/', prompt: 'Extract the h1' }),
  toolResultEvent(FETCH_ID, fetchedOk),
  noiseEvent(),
  resultEvent(canaryAnswer),
);

const assistantTextEvent = (text: string) =>
  JSON.stringify({
    type: 'assistant',
    message: { role: 'assistant', content: [{ type: 'text', text }] },
    session_id: 'stub-session',
  });

/**
 * A research run with one assistant turn, which is what the stub's one main
 * turn has to agree with. The proof compares the number of main-turn requests
 * against the number of assistant turns in the stream, so the two fixtures are
 * one fixture in two halves.
 */
const researchRun = (text: string) =>
  stream(initEvent(), noiseEvent(), assistantTextEvent(text), resultEvent(text));

/**
 * A review the schema accepts, borrowed from a real published run rather than
 * hand-written, so the retry tests validate against the same shape a seat
 * actually returns.
 */
const validReview = (() => {
  const source = path.join(REAL_REPO, 'reviews', 'winter-cycling', '2026-09-01', 'round1', 'gemini.json');
  const review = JSON.parse(readFileSync(source, 'utf8')) as Record<string, unknown>;
  return JSON.stringify({ ...review, story: STORY, round: 1 });
})();

// ---------------------------------------------------------------------------
// The stub upstream. The recording proxy forwards to it, so no test reaches the
// network and every test still goes through the proxy for real.
// ---------------------------------------------------------------------------
let upstream: { url: string; stop: () => void };
let upstreamUrl = '';
beforeAll(async () => {
  upstream = await startStubUpstream(root);
  upstreamUrl = upstream.url;
});
afterAll(() => upstream?.stop());

type Stub = { dir: string; archive: string; env: NodeJS.ProcessEnv };

/**
 * The stub `claude`. It posts a real set of request bodies to whatever
 * `$ANTHROPIC_BASE_URL` names and writes a stream-json fixture to stdout, which
 * is the pair of things a real invocation produces and the pair the launcher
 * checks. `mutate` breaks one piece of the request on purpose, per run, so the
 * canary and the research run can be made to fail independently.
 *
 * HOME is always a directory inside the stub, and it holds a `.claude/CLAUDE.md`
 * and a project memory file. That is the private text the capture check reads:
 * a `leak-home` or `leak-memory` run copies a line of one of them into its
 * request for real, and `no-package` sends a request that does not carry the
 * declared package at all.
 *
 * From methodology v1.30 there is no pinned build and no version gate, so there
 * is one stub executable and it sits on PATH, which is where the launcher now
 * looks. `version` is what it answers to `--version`, which is recorded and
 * nothing more.
 */
function stubClaude(
  options: {
    canary?: string;
    canaryExit?: number;
    version?: string;
    research?: string;
    researchExit?: number;
    mutateCanary?: string;
    mutateResearch?: string;
  } = {},
): Stub {
  const dir = mkdtempSync(path.join(root, 'stub-'));
  const bin = path.join(dir, 'bin');
  mkdirSync(bin);
  const home = stubHome(dir);
  writeFileSync(path.join(dir, 'version'), `${options.version ?? STUB_VERSION} (Claude Code)\n`);
  writeFileSync(path.join(dir, 'canary.jsonl'), options.canary ?? goodCanary);
  writeFileSync(path.join(dir, 'canary.exit'), String(options.canaryExit ?? 0));
  writeFileSync(path.join(dir, 'research.jsonl'), options.research ?? researchRun('the package was sent'));
  writeFileSync(path.join(dir, 'research.exit'), String(options.researchExit ?? 0));

  const script = `#!/usr/bin/env bash
set -u
if [ "\${1:-}" = "--version" ]; then cat "${dir}/version"; exit 0; fi

model=""
prev=""
for arg in "$@"; do
  if [ "$prev" = "--model" ]; then model="$arg"; fi
  prev="$arg"
done

count=$(( $(cat "${dir}/calls" 2>/dev/null || echo 0) + 1 ))
echo "$count" > "${dir}/calls"
stdin="${dir}/stdin-$count.txt"
cat > "$stdin"

kind=research
case "$(cat "$stdin")" in
  *CANARY.md*) kind=canary ;;
esac
if [ "$kind" = canary ]; then mutate="\${STUB_MUTATE_CANARY:-}"; else mutate="\${STUB_MUTATE_RESEARCH:-}"; fi

# The part that makes the capture real: an actual request, through the actual
# proxy, from the directory the launcher chose.
if [ -n "\${ANTHROPIC_BASE_URL:-}" ]; then
  "${process.execPath}" "${POSTER}" --base "$ANTHROPIC_BASE_URL" \
    --package "$stdin" --work-dir "$(pwd -P)" --model "$model" --mutate "$mutate"
fi

if [ "$kind" = canary ]; then
  # A real read of the real fixture: a scenario that claims to leak, leaks.
  token="$(sed -n 's/^token: //p' ../CANARY.md 2>/dev/null || true)"
  sed "s|__TOKEN__|\${token:-MISSING}|" "${dir}/canary.jsonl"
  exit "$(cat "${dir}/canary.exit")"
fi

cp "$stdin" "${dir}/package-sent.txt"
cat "${dir}/research.jsonl"
exit "$(cat "${dir}/research.exit")"
`;
  const claude = path.join(bin, 'claude');
  writeFileSync(claude, script);
  chmodSync(claude, 0o755);

  // A stub `codex` and `agy` beside the stub `claude`, so that the two refusals
  // the tests below are about are the ones they say they are. Without these the
  // launcher stops at "codex is not on PATH" on any machine that does not happen
  // to have the real CLI installed — which is every CI runner — and the
  // credential check under test is never reached. A test that passes only on the
  // machine it was written on is a test about that machine.
  //
  // Neither is ever asked to do work here, because the credential refusal comes
  // first. They answer `--version`, which the launcher reads before it builds a
  // home, and anything past that records a call in the same `calls` file the
  // stub `claude` uses. So `calls` staying absent now means no reviewer CLI ran
  // at all, rather than only that `claude` did not.
  for (const [name, version] of [['codex', 'codex-cli 0.154.0'], ['agy', '1.2.4']] as const) {
    const other = path.join(bin, name);
    writeFileSync(
      other,
      `#!/usr/bin/env bash
set -u
if [ "\${1:-}" = "--version" ]; then echo "${version}"; exit 0; fi
count=$(( $(cat "${dir}/calls" 2>/dev/null || echo 0) + 1 ))
echo "$count" > "${dir}/calls"
exit 0
`,
    );
    chmodSync(other, 0o755);
  }

  const archive = mkdtempSync(path.join(root, 'archive-'));
  return {
    dir,
    archive,
    env: {
      ...process.env,
      HOME: home,
      PATH: `${bin}:${process.env.PATH ?? ''}`,
      YEGFACTS_REVIEW_ARCHIVE: archive,
      YEGFACTS_REVIEW_UPSTREAM: upstreamUrl,
      ...(options.mutateCanary ? { STUB_MUTATE_CANARY: options.mutateCanary } : {}),
      ...(options.mutateResearch ? { STUB_MUTATE_RESEARCH: options.mutateResearch } : {}),
    },
  };
}

/** True when the stub was ever handed a real package rather than the canary. */
const packageWasSent = (stub: Stub) => existsSync(path.join(stub.dir, 'package-sent.txt'));

/** spawnSync, not execFileSync: the launcher says what it decided on stderr, and
 * that has to be readable when it succeeded as well as when it refused. The
 * first argument is the program unless it is a path, in which case bash runs it. */
function run(args: string[], env: NodeJS.ProcessEnv): { ok: boolean; stderr: string; stdout: string } {
  const [first, ...rest] = args;
  const direct = first === 'npx';
  const result = direct
    ? spawnSync(first, rest, { env, encoding: 'utf8' })
    : spawnSync('bash', args, { env, encoding: 'utf8' });
  return { ok: result.status === 0, stderr: result.stderr ?? '', stdout: result.stdout ?? '' };
}

const writePackage = (name: string) => {
  const file = path.join(root, name);
  writeFileSync(file, `package ${name}\nwith bytes worth keeping\n`);
  return file;
};

const readJson = (file: string) => JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;

// ---------------------------------------------------------------------------
describe('research admission', { timeout: 60_000 }, () => {
  /**
   * From methodology v1.31 the Codex and Gemini seats are no longer refused for
   * having no profile. They are still refused here, and for the reason that
   * matters most: this machine has no credential for them, and the launcher
   * never creates one. A seat whose login is absent stops before anything is
   * sent, exactly as an unknown vendor does.
   */
  it.each([
    ['openai', 'gpt-6-sol', /no codex credential at \$HOME\/\.codex\/auth\.json/],
    // The shadow seat's model is pinned for the same vendor: it clears the pin
    // check and stops, like the counted seat, at the missing credential.
    ['openai', 'gpt-6-luna', /no codex credential at \$HOME\/\.codex\/auth\.json/],
    // The superseded seat stays pinned while a check that ran on it is open
    // (v1.35 confirms on the same pinned model), so it too reaches the
    // credential check. A model on no list stops earlier.
    ['openai', 'gpt-5.6-sol', /no codex credential at \$HOME\/\.codex\/auth\.json/],
    ['openai', 'gpt-5.6-luna', /model 'gpt-5\.6-luna' is not pinned for openai/],
    ['google', 'gemini-3.8-flash-high', /retired for runs frozen after 2026-09-23 \(methodology v1\.37\)/],
    ['mystery-vendor', 'claude-opus-5-5', /unknown provider/],
  ])('refuses %s for research without invoking anything', (provider, model, expected) => {
    const stub = stubClaude();
    const attempt = path.join(stub.archive, 'refusal', provider);
    const pkg = writePackage(`pkg-${provider}.md`);

    const result = run(
      [INVOKE, '--purpose', 'research', '--provider', provider, '--package', pkg,
        '--attempt-dir', attempt, '--model', model, '--effort', 'high'],
      stub.env,
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(expected);
    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
    expect(packageWasSent(stub)).toBe(false);

    // A refusal is still an attempt on the record, with the exact bytes that
    // were almost sent.
    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.status).toBe('blocked');
    expect(metadata.provider).toBe(provider);
    expect(metadata.admitted_for_research).toBe(false);
    expect(metadata.context_proof).toBe('unavailable');
    expect(metadata.package_sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(readFileSync(path.join(attempt, 'package.md'), 'utf8')).toBe(readFileSync(pkg, 'utf8'));
    expect(readFileSync(path.join(attempt, 'context-proof.txt'), 'utf8').trim()).toBe('unavailable');
  });

  it.each([
    ['openai', 'gpt-6-sol', /no codex credential at \$HOME\/\.codex\/auth\.json/],
    ['google', 'gemini-3.8-flash-high', /retired for runs frozen after 2026-09-23 \(methodology v1\.37\)/],
  ])('records %s with its own seat and its own reason when no model is named', (provider, model, expected) => {
    const stub = stubClaude();
    const attempt = path.join(stub.archive, 'defaults', provider);

    // No --model and no --effort: the launcher's pin for this vendor answers,
    // and it answers before the refusal, so the retained row names the seat the
    // audit was actually commissioned from.
    const result = run(
      [INVOKE, '--purpose', 'research', '--provider', provider,
        '--package', writePackage(`defaults-${provider}.md`), '--attempt-dir', attempt],
      stub.env,
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(expected);
    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.provider).toBe(provider);
    expect(metadata.model_id).toBe(model);
    expect(metadata.reasoning_effort).toBe('high');
    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
  });

  it.each([
    ['model', ['--model', 'claude-fable-5-1', '--effort', 'high'], /model 'claude-fable-5-1' is not pinned/],
    ['effort', ['--model', 'claude-opus-5-5', '--effort', 'max'], /reasoning effort 'max' is not pinned/],
    ['low-effort', ['--model', 'claude-opus-5-5', '--effort', 'low'], /reasoning effort 'low' is not pinned/],
  ])('refuses an unpinned %s before the admission gate', (_label, args, expected) => {
    const stub = stubClaude();
    const attempt = path.join(stub.archive, 'pins', _label);
    const result = run(
      [INVOKE, '--purpose', 'diagnostic', '--provider', 'anthropic',
        '--package', writePackage(`pin-${_label}.md`), '--attempt-dir', attempt, ...args],
      stub.env,
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(expected);
    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
    expect(readJson(path.join(attempt, 'metadata.json')).status).toBe('blocked');
  });
});

/**
 * The research path, end to end, through the real proxy.
 *
 * "End to end" stops short of admission on purpose: the upstream is a stub, that
 * is recorded, and it makes `admitted_for_research` false. That is the property
 * these tests are really about — a run can pass every check it is capable of
 * passing and still not be admitted, and the row has to say why.
 */
describe('research run', { timeout: 120_000 }, () => {
  const research = (stub: Stub, name: string, extra: string[] = []) => {
    const attempt = path.join(stub.archive, 'research', name);
    const pkg = writePackage(`research-${name}.md`);
    const result = run(
      [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', pkg,
        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high', ...extra],
      stub.env,
    );
    return { ...result, attempt, pkg };
  };

  it('captures and checks both runs, sends the package, and leaves the contract files', () => {
    const stub = stubClaude({ research: researchRun('a report a reader could use') });
    const { ok, stderr, attempt, pkg } = research(stub, 'happy');

    expect(stderr).toBe(stderr);
    expect(ok).toBe(true);

    // The output contract run-reviewer.sh is coded against.
    expect(readFileSync(path.join(attempt, 'final-message.txt'), 'utf8')).toBe('a report a reader could use');
    expect(existsSync(path.join(attempt, 'stdout.txt'))).toBe(true);
    expect(readFileSync(path.join(attempt, 'package.md'), 'utf8')).toBe(readFileSync(pkg, 'utf8'));
    expect(readFileSync(path.join(stub.dir, 'package-sent.txt'), 'utf8')).toBe(readFileSync(pkg, 'utf8'));

    // Two captures, from two proxies, kept apart.
    const captured = (dir: string) => readdirSync(dir).filter((f) => f.startsWith('req-')).sort();
    expect(captured(path.join(attempt, 'requests'))).toEqual([
      'req-0001.json', 'req-0002.json', 'req-0003.json', 'req-0004.json',
    ]);
    expect(captured(path.join(attempt, 'canary', 'requests'))).toHaveLength(4);
    // Redacted in the capture, and only in the capture.
    const first = readJson(path.join(attempt, 'requests', 'req-0002.json'));
    expect((first.headers as Record<string, string>).authorization).toBe('<redacted>');
    expect(JSON.stringify(first)).not.toContain('stub-oauth-token');

    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.status).toBe('ok');
    expect(metadata.canary).toBe('pass');
    expect(metadata.structure).toBe('pass');
    expect(metadata.context_proof).toBe('pass');
    expect(metadata.canary_context_proof).toBe('pass');
    expect(metadata.request_count).toBe(4);
    // Four captured, three walked: the HEAD connectivity check has no JSON body.
    expect(metadata.requests_searched).toBe(3);
    // The package leaves twice per attempt: the session title and the main turn.
    expect(metadata.package_seen).toBe(2);
    expect(metadata.upstream).toBe(upstreamUrl);
    expect(metadata.requests_manifest_sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(metadata.proof_report_sha256).toMatch(/^[0-9a-f]{64}$/);
    // Recorded privately and never anywhere else.
    expect(metadata.cli_executable).toContain('claude');

    // Which private sources were read, by symbolic name and line count. The
    // stub HOME's two files are there, present, with the lines this test wrote.
    const sources = metadata.capture_check_sources as {
      name: string;
      present: boolean;
      lines_checked: number;
      files?: number;
    }[];
    expect(sources.find((one) => one.name === '$HOME/.claude/CLAUDE.md')).toEqual({
      name: '$HOME/.claude/CLAUDE.md',
      present: true,
      lines_checked: 1,
    });
    // The memory files are ONE row with a count, not one row each. On the
    // founder's machine there are 92 of them, and 92 rows is not a record
    // anyone reads.
    expect(sources.find((one) => one.name === '$HOME/.claude/projects/*/memory/*.md')).toEqual({
      name: '$HOME/.claude/projects/*/memory/*.md',
      present: true,
      files: 1,
      lines_checked: 1,
    });
    expect(sources.filter((one) => one.name.includes('memory'))).toHaveLength(1);
    expect(JSON.stringify(sources)).not.toContain('memory/*.md (');
    // Names and counts only: no line of any private file is in the record.
    expect(JSON.stringify(sources)).not.toContain(HOME_INSTRUCTION);
    expect(JSON.stringify(sources)).not.toContain(MEMORY_NOTE);

    // Every check passed and the run is still not admitted, for the stated
    // reason. This is the assertion the whole release turns on.
    expect(metadata.admitted_for_research).toBe(false);
    expect(String(metadata.admission_reason)).toMatch(/rather than https:\/\/api\.anthropic\.com/);

    const row = JSON.parse(
      run([
        'npx', 'tsx', path.join(REAL_REPO, 'scripts', 'panel', 'attempt-record.ts'),
        attempt, '--attempt', '1', '--schema', 'not-reached',
      ], stub.env).stdout || '{}',
    ) as Record<string, unknown>;
    expect(row.context_proof).toBe('pass');
    expect(row.admitted_for_research).toBe(false);
    expect(row.upstream).toBe(upstreamUrl);
    expect(row.request_count).toBe(4);
    expect(row.requests_searched).toBe(3);
    expect(row.package_seen).toBe(2);
    expect(row.capture_check_sources).toEqual(sources);
    // Nothing that names this machine crosses into the public row.
    expect(row.cli_executable).toBeUndefined();
    expect(row.cli_executable_sha256).toBeUndefined();
    expect(JSON.stringify(row)).not.toContain(stub.archive);
    expect(JSON.stringify(row)).not.toContain('/Users/');
  });

  /**
   * The working directory is context the reviewer receives, because the
   * vendor's environment reminder puts it in every request. Running inside the
   * attempt directory handed a blind reviewer the story, the round and the seat
   * in that one line.
   */
  it('works in an opaque temporary directory and takes it away afterwards', () => {
    const stub = stubClaude();
    const { ok, attempt } = research(stub, 'work-dir');
    expect(ok).toBe(true);

    const metadata = readJson(path.join(attempt, 'metadata.json'));
    const workDir = String(metadata.work_dir);
    expect(path.basename(workDir)).toMatch(/^attempt-[0-9a-f]{16}$/);
    // Nothing in the path names the project, the story, the round or the seat.
    for (const leak of [STORY, RUN_DATE, 'round1', 'claude', 'yegfacts', stub.archive, stub.dir]) {
      expect(workDir).not.toContain(leak);
    }
    // Removed after the run: only the files the launcher made, and only the
    // directories it made.
    expect(existsSync(workDir)).toBe(false);

    // The prompt and the synthetic fixture are still retained where they were
    // written, which is the point of copying rather than moving.
    expect(readFileSync(path.join(attempt, 'canary', 'work', 'canary.md'), 'utf8')).toContain('../CANARY.md');
    expect(readFileSync(path.join(attempt, 'canary', 'CANARY.md'), 'utf8')).toMatch(/^token: YEGFACTS_CANARY_/);

    // And the request the reviewer got names the temporary directory. Under this
    // seat the working directory travels in a system-role message rather than in
    // a user reminder block.
    const main = readJson(path.join(attempt, 'requests', 'req-0003.json'));
    const environment = (main.body as { messages: { role: string; content: { text: string }[] }[] })
      .messages[1]!;
    expect(environment.role).toBe('system');
    expect(environment.content[0]!.text).toContain(`Primary working directory: ${workDir}/work`);
  });

  it('stops both proxies once the run is over', async () => {
    const stub = stubClaude();
    const { attempt } = research(stub, 'ports');

    const ports = [
      readFileSync(path.join(attempt, 'proxy-port'), 'utf8').trim(),
      readFileSync(path.join(attempt, 'canary', 'proxy-port'), 'utf8').trim(),
    ];
    for (const port of ports) {
      expect(port).toMatch(/^\d+$/);
      const refused = await new Promise<string>((resolve) => {
        const probe = http.request({ host: '127.0.0.1', port: Number(port), method: 'HEAD', path: '/' }, () =>
          resolve('answered'),
        );
        probe.on('error', (error: NodeJS.ErrnoException) => resolve(error.code ?? 'error'));
        probe.end();
      });
      expect(refused).toBe('ECONNREFUSED');
    }
  });

  it('refuses when the canary capture carries the global CLAUDE.md, and never sends the package', () => {
    const stub = stubClaude({ mutateCanary: 'leak-home' });
    const { ok, stderr, attempt } = research(stub, 'canary-leak');

    expect(ok).toBe(false);
    // The source and the line number, never the line.
    expect(stderr).toMatch(/carries \$HOME\/\.claude\/CLAUDE\.md line 1/);
    expect(stderr).not.toContain(HOME_INSTRUCTION);
    expect(stderr).toMatch(/failed its canary/);
    expect(packageWasSent(stub)).toBe(false);
    expect(existsSync(path.join(attempt, 'final-message.txt'))).toBe(false);
    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.canary_context_proof).toBe('fail');
    expect(metadata.admitted_for_research).toBe(false);
  });

  it('refuses when the research capture carries a project memory line, after a clean canary', () => {
    const stub = stubClaude({ mutateResearch: 'leak-memory' });
    const { ok, stderr, attempt } = research(stub, 'research-leak');

    expect(ok).toBe(false);
    expect(stderr).toMatch(/carries \$HOME\/\.claude\/projects\/\*\/memory\/\*\.md \(1\) line 1/);
    expect(stderr).not.toContain(MEMORY_NOTE);
    // The canary passed; the run that mattered did not.
    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.canary_context_proof).toBe('pass');
    expect(metadata.context_proof).toBe('fail');
    expect(metadata.admitted_for_research).toBe(false);
    // The bytes of the run that failed are kept, capture included.
    expect(existsSync(path.join(attempt, 'stdout.txt'))).toBe(true);
    expect(readdirSync(path.join(attempt, 'requests')).length).toBeGreaterThan(0);
  });

  it('refuses a capture that never carried the declared package', () => {
    // Not a leak, and still not a capture of this run. A capture that cannot be
    // tied to the package it was supposed to carry proves nothing about it.
    const stub = stubClaude({ mutateResearch: 'no-package' });
    const { ok, stderr, attempt } = research(stub, 'no-package');

    expect(ok).toBe(false);
    expect(stderr).toMatch(/no captured request carries the declared package byte for byte/);
    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.context_proof).toBe('fail');
    expect(metadata.package_seen).toBe(0);
    expect(metadata.admitted_for_research).toBe(false);
  });

  it('keeps the output of a nonzero research exit without admitting it', () => {
    const stub = stubClaude({ researchExit: 4 });
    const { ok, stderr, attempt } = research(stub, 'nonzero');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/the research invocation exited 4/);
    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.exit_code).toBe(4);
    expect(metadata.admitted_for_research).toBe(false);
  });
});

describe('candidate diagnostic', { timeout: 60_000 }, () => {
  const diagnose = (stub: Stub, name: string, extra: string[] = []) => {
    const attempt = path.join(stub.archive, 'diag', name);
    const pkg = writePackage(`diag-${name}.md`);
    const result = run(
      [INVOKE, '--purpose', 'diagnostic', '--provider', 'anthropic', '--package', pkg,
        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high', ...extra],
      stub.env,
    );
    return { ...result, attempt, pkg };
  };

  it('runs the canary, checks its request, and still admits nothing', () => {
    const stub = stubClaude();
    const { ok, stderr, attempt, pkg } = diagnose(stub, 'happy');

    expect(ok).toBe(true);
    expect(stderr).toMatch(/Canary context proof: pass/);
    expect(stderr).toMatch(/Not admitted for research/);

    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.status).toBe('diagnostic');
    expect(metadata.canary).toBe('pass');
    expect(metadata.structure).toBe('pass');
    // The canary's own request was captured and checked. It still admits
    // nothing: a diagnostic sends no package, so there is nothing to admit.
    expect(metadata.admitted_for_research).toBe(false);
    expect(metadata.context_proof).toBe('pass');
    expect(metadata.canary_context_proof).toBe('pass');
    expect(metadata.canary_request_count).toBe(4);
    expect(metadata.canary_requests_searched).toBe(3);
    // The canary prompt is the package for a diagnostic, and it travels twice.
    expect(metadata.canary_package_seen).toBe(2);
    expect(metadata.canary_upstream).toBe(upstreamUrl);
    expect(String(metadata.admission_reason)).toMatch(/a diagnostic never admits a seat/);
    expect(metadata.exit_code).toBe(0);
    // Nothing is left at the top level where the runner looks for a review.
    expect(existsSync(path.join(attempt, 'final-message.txt'))).toBe(false);
    // The complete final message, the stderr and the report the verdict was
    // read off are all hashed, so the published row can be checked against the
    // retained bytes rather than merely pointing at them.
    for (const key of ['canary_stdout_sha256', 'canary_stderr_sha256', 'canary_final_message_sha256', 'canary_report_sha256']) {
      expect(metadata[key], key).toMatch(/^[0-9a-f]{64}$|^absent$/);
    }
    expect(metadata.canary_final_message_sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(metadata.canary_report_sha256).toMatch(/^[0-9a-f]{64}$/);

    const row = JSON.parse(
      run([
        'npx', 'tsx', path.join(REAL_REPO, 'scripts', 'panel', 'attempt-record.ts'),
        attempt, '--attempt', '1', '--schema', 'not-reached',
      ], stub.env).stdout || '{}',
    ) as Record<string, unknown>;
    expect(row.canary_final_message_sha256).toBe(metadata.canary_final_message_sha256);
    expect(row.canary_report_sha256).toBe(metadata.canary_report_sha256);

    // The package is retained and was never sent: the diagnostic asks the CLI
    // about itself, not about the story.
    expect(readFileSync(path.join(attempt, 'package.md'), 'utf8')).toBe(readFileSync(pkg, 'utf8'));
    expect(packageWasSent(stub)).toBe(false);
    expect(readFileSync(path.join(stub.dir, 'calls'), 'utf8').trim()).toBe('1');
    expect(readJson(path.join(attempt, 'canary', 'report.json')).ok).toBe(true);
  });

  it('keeps the complete final message, footer and all', () => {
    const footer = '\n\nSources consulted: https://example.com/one, https://example.com/two';
    const stub = stubClaude({
      canary: stream(
        initEvent(),
        toolUseEvent(FETCH_ID, 'WebFetch', { url: 'https://example.com/' }),
        toolResultEvent(FETCH_ID, fetchedOk),
        resultEvent(canaryAnswer + footer),
      ),
    });
    const { attempt } = diagnose(stub, 'footer');
    const retained = readFileSync(path.join(attempt, 'canary', 'final-message.txt'), 'utf8');
    expect(retained.endsWith(footer)).toBe(true);
    expect(retained).toContain('Sources consulted: https://example.com/one');
  });

  it('fails when the synthetic token comes back', () => {
    const stub = stubClaude({
      canary: stream(
        initEvent(),
        toolUseEvent(FETCH_ID, 'WebFetch', { url: 'https://example.com/' }),
        toolResultEvent(FETCH_ID, fetchedOk),
        resultEvent('{"web_h1": "Example Domain", "canary_token": "__TOKEN__"}'),
      ),
    });
    const { ok, stderr, attempt } = diagnose(stub, 'leak');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/canary token came back/);
    expect(readFileSync(path.join(attempt, 'canary.txt'), 'utf8').trim()).toBe('fail');
  });

  it('fails when the fetch errored and the model recited the heading from memory', () => {
    // The whole reason the check reads the tool_result rather than the final
    // text: this stream "says" Example Domain and fetched nothing.
    const stub = stubClaude({
      canary: stream(
        initEvent(),
        toolUseEvent(FETCH_ID, 'WebFetch', { url: 'https://example.com/' }),
        toolResultEvent(FETCH_ID, 'Request failed: ENOTFOUND', true),
        resultEvent(canaryAnswer),
      ),
    });
    const { ok, stderr } = diagnose(stub, 'recited');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/no successful WebFetch of https:\/\/example\.com/);
  });

  it('fails when a fetch never came back at all', () => {
    const stub = stubClaude({
      canary: stream(
        initEvent(),
        toolUseEvent(FETCH_ID, 'WebFetch', { url: 'https://example.com/' }),
        resultEvent(canaryAnswer),
      ),
    });
    const { ok, stderr } = diagnose(stub, 'no-result');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/no tool_result/);
  });

  it.each([
    [
      'unexpected tools in the inventory',
      { init: { tools: ['Bash', 'Read', 'WebFetch', 'WebSearch'] } },
      /tool inventory was \[Bash, Read, WebFetch, WebSearch\]/,
    ],
    ['loaded skills', { init: { skills: ['ponytail'] } }, /skills were loaded: ponytail/],
    ['loaded plugins', { init: { plugins: [{ name: 'superpowers' }] } }, /plugins were loaded: superpowers/],
    ['a custom agent', { init: { agents: ['claude', 'stew'] } }, /custom agents were loaded: stew/],
    ['a non-default output style', { init: { output_style: 'explanatory' } }, /output style was "explanatory"/],
    ['a missing inventory field', { init: { skills: undefined } }, /did not report its skills/],
    ['a denied tool', { result: { permission_denials: [{ name: 'WebFetch' }] } }, /denied tools it asked for: WebFetch/],
    ['a spawned subagent', { result: { subagent_stats: { spawned: 1 } } }, /1 subagent\(s\) were spawned/],
    ['a missing subagent counter', { result: { subagent_stats: {} } }, /did not report its subagent counters/],
  ])('fails on %s', (name, over: { init?: Record<string, unknown>; result?: Record<string, unknown> }, expected) => {
    const stub = stubClaude({
      canary: stream(
        initEvent(over.init ?? {}),
        toolUseEvent(FETCH_ID, 'WebFetch', { url: 'https://example.com/' }),
        toolResultEvent(FETCH_ID, fetchedOk),
        resultEvent(canaryAnswer, over.result ?? {}),
      ),
    });
    const { ok, stderr } = diagnose(stub, name.replace(/\W+/g, '-'));
    expect(ok).toBe(false);
    expect(stderr).toMatch(expected);
  });

  it('fails when the model reached for a tool outside the profile', () => {
    // The inventory is clean and a tool showed up anyway. Checking only init
    // would miss this.
    const stub = stubClaude({
      canary: stream(
        initEvent(),
        toolUseEvent(FETCH_ID, 'WebFetch', { url: 'https://example.com/' }),
        toolResultEvent(FETCH_ID, fetchedOk),
        toolUseEvent('toolu_02', 'Read', { file_path: '/synthetic-private-fixture/CLAUDE.md' }),
        toolResultEvent('toolu_02', 'contents'),
        resultEvent(canaryAnswer),
      ),
    });
    const { ok, stderr } = diagnose(stub, 'extra-tool');
    expect(ok).toBe(false);
    expect(stderr).toMatch(/called tools outside the profile: Read/);
  });

  it.each([
    ['a duplicated init event', stream(initEvent(), initEvent(), resultEvent(canaryAnswer)), /exactly one system\/init event, saw 2/],
    ['a reordered stream', stream(resultEvent(canaryAnswer), initEvent()), /opened with "result\/success", not system\/init/],
    ['a truncated line', `${initEvent()}\n{"type":"resu\n`, /1 line\(s\) of the stream were not JSON/],
    [
      'a repeated tool_use id',
      stream(
        initEvent(),
        toolUseEvent(FETCH_ID, 'WebFetch', { url: 'https://example.com/' }),
        toolUseEvent(FETCH_ID, 'WebFetch', { url: 'https://example.com/' }),
        toolResultEvent(FETCH_ID, fetchedOk),
        resultEvent(canaryAnswer),
      ),
      /repeated tool_use ids/,
    ],
  ])('fails on %s', (name, canary, expected) => {
    const stub = stubClaude({ canary });
    const { ok, stderr } = diagnose(stub, name.replace(/\W+/g, '-'));
    expect(ok).toBe(false);
    expect(stderr).toMatch(expected);
  });

  /**
   * The version is an observation now, not a gate. v1.29 refused any build with
   * no pin row, which meant refusing almost every day: the vendor ships builds
   * several times a week and each one needed a live capture and a fresh pin
   * before a reviewer could run. The denylist does not care which build sent the
   * request, so the build a machine actually has is the build that runs, and the
   * record says which one it was.
   */
  it('runs whatever build is on PATH and writes its version down', () => {
    const stub = stubClaude({ version: '2.1.999' });
    const { ok, attempt } = diagnose(stub, 'any-version');

    expect(ok).toBe(true);
    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.cli_version).toBe('2.1.999');
    // Private: the path of the executable and the hash of its bytes, so a later
    // reader of a retained capture can still ask which file produced it.
    expect(String(metadata.cli_executable)).toBe(path.join(stub.dir, 'bin', 'claude'));
    expect(metadata.cli_executable_sha256).toMatch(/^[0-9a-f]{64}$/);

    // Neither crosses into the public row, because one names a place on this
    // machine and the other is a hash of a file nobody else can fetch.
    const row = JSON.parse(
      run([
        'npx', 'tsx', path.join(REAL_REPO, 'scripts', 'panel', 'attempt-record.ts'),
        attempt, '--attempt', '1',
      ], stub.env).stdout || '{}',
    ) as Record<string, unknown>;
    expect(row.cli_version).toBe('2.1.999');
    expect(row.cli_executable).toBeUndefined();
    expect(row.cli_executable_sha256).toBeUndefined();
    // The v1.29 pin fields are gone from the row entirely.
    expect(row.path_cli_version).toBeUndefined();
    expect(row.pins_source).toBeUndefined();
    expect(row.vendor_prompt_sha256).toBeUndefined();
    expect(row.tool_definitions_sha256).toBeUndefined();
  });

  it('refuses when there is no CLI on PATH at all, before sending anything', () => {
    const stub = stubClaude();
    const attempt = path.join(stub.archive, 'diag', 'no-cli');
    // A PATH with the system tools the launcher needs and no `claude` anywhere
    // on it. Emptying PATH entirely would test nothing: the launcher would fail
    // on `git` long before it asked whether a reviewer CLI exists.
    const tools = mkdtempSync(path.join(root, 'tools-'));
    symlinkSync(process.execPath, path.join(tools, 'node'));
    const result = run(
      [INVOKE, '--purpose', 'diagnostic', '--provider', 'anthropic', '--package', writePackage('no-cli.md'),
        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high'],
      { ...stub.env, PATH: `${tools}:/usr/bin:/bin` },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/claude is not on PATH/);
    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
    expect(readJson(path.join(attempt, 'metadata.json')).status).toBe('blocked');
  });

  it('keeps the output of a nonzero exit without ever admitting it', () => {
    const stub = stubClaude({ canaryExit: 3 });
    const { ok, stderr, attempt } = diagnose(stub, 'nonzero');

    expect(ok).toBe(false);
    expect(stderr).toMatch(/exited 3/);
    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.exit_code).toBe(3);
    expect(metadata.status).toBe('failed');
    // Structurally the stream was perfect. It still does not pass.
    expect(readJson(path.join(attempt, 'canary', 'report.json')).ok).toBe(true);
    expect(readFileSync(path.join(attempt, 'canary', 'final-message.txt'), 'utf8')).toContain('Example Domain');
    expect(readFileSync(path.join(attempt, 'canary', 'stdout.txt'), 'utf8')).toContain('tool_use');
  });
});

describe('archive safety', { timeout: 60_000 }, () => {
  it('refuses an archive root inside a Git repository', () => {
    const inside = path.join(root, 'fake-repo-archive');
    mkdirSync(path.join(inside, '.git', 'refs'), { recursive: true });
    mkdirSync(path.join(inside, '.git', 'objects'), { recursive: true });
    writeFileSync(path.join(inside, '.git', 'HEAD'), 'ref: refs/heads/main\n');

    const result = run([INVOKE, '--archive-root'], { ...process.env, YEGFACTS_REVIEW_ARCHIVE: inside });
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/inside a Git repository/);
  });

  it('refuses an attempt directory that traverses out of the archive', () => {
    const stub = stubClaude();
    const escape = path.join(root, 'escaped-target');
    const result = run(
      [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', writePackage('trav.md'),
        '--attempt-dir', `${stub.archive}/../${path.basename(escape)}/attempt-1`,
        '--model', 'claude-opus-5-5', '--effort', 'high'],
      stub.env,
    );
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/must not contain '\.\.'/);
    expect(existsSync(escape)).toBe(false);
  });

  it('refuses an attempt directory reached through a symlinked parent', () => {
    const stub = stubClaude();
    const outside = path.join(root, 'outside-target');
    mkdirSync(outside, { recursive: true });
    symlinkSync(outside, path.join(stub.archive, 'sneaky'));

    const result = run(
      [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', writePackage('symlink.md'),
        '--attempt-dir', path.join(stub.archive, 'sneaky', 'attempt-1'),
        '--model', 'claude-opus-5-5', '--effort', 'high'],
      stub.env,
    );
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/reaches outside the archive root/);
    expect(readdirSync(outside)).toEqual([]);
  });

  it('never writes into an attempt directory that already exists', () => {
    const stub = stubClaude();
    const attempt = path.join(stub.archive, 'taken', 'attempt-1');
    mkdirSync(attempt, { recursive: true });
    writeFileSync(path.join(attempt, 'package.md'), 'the earlier attempt\n');

    const result = run(
      [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', writePackage('collide.md'),
        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high'],
      stub.env,
    );
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/already exists/);
    expect(readFileSync(path.join(attempt, 'package.md'), 'utf8')).toBe('the earlier attempt\n');
  });
});

// ---------------------------------------------------------------------------
describe('run-reviewer', { timeout: 120_000 }, () => {
  let repo: string;
  beforeEach(() => {
    repo = fakeRepo();
  });

  const reviewPath = () => path.join(repo, 'reviews', STORY, RUN_DATE, 'round1', 'claude.json');
  const manifest = () =>
    YAML.parse(readFileSync(path.join(repo, 'reviews', STORY, RUN_DATE, 'run.yaml'), 'utf8')) as {
      runs: Record<string, unknown>[];
    };

  const runReviewer = (stub: Stub) =>
    run([path.join(repo, 'scripts', 'panel', 'run-reviewer.sh'), 'claude', STORY, RUN_DATE, '1'], stub.env);

  /**
   * The case that matters most here: everything passed and nothing is
   * published. The launcher captured the request, checked it, exited zero and
   * still recorded `admitted_for_research: false`, because the capture went to
   * a stub upstream. A response from such a run
   * is a real response to a real package; it is not a review, and the runner
   * has to be the thing that refuses to file it as one.
   */
  it('installs nothing when the launcher passed every check without admitting the run', () => {
    const stub = stubClaude({ research: researchRun(validReview) });
    const result = runReviewer(stub);

    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/not admitted for research/);
    expect(result.stderr).toMatch(/rather than https:\/\/api\.anthropic\.com/);
    // The package was sent and answered. The answer simply does not become a
    // review, and it is retained where it was written.
    expect(packageWasSent(stub)).toBe(true);
    expect(existsSync(reviewPath())).toBe(false);

    const entry = manifest().runs[0]!;
    expect(entry.status).toBe('failed');
    // One attempt: not being admitted is not a reviewer answering badly, so the
    // retry budget is not spent on it.
    expect(entry.attempts).toBe(1);
    const detail = entry.attempts_detail as Record<string, unknown>[];
    expect(detail).toHaveLength(1);
    expect(detail[0]!.context_proof).toBe('pass');
    expect(detail[0]!.canary_context_proof).toBe('pass');
    expect(detail[0]!.schema).toBe('not-reached');
    expect(detail[0]!.attempt_id).toMatch(/^[0-9a-f]{16}$/);
    // The row says the capture was checked AND that the run was not admitted,
    // and why. A reader of the manifest sees both without reading any code.
    expect(detail[0]!.admitted_for_research).toBe(false);
    expect(String(detail[0]!.admission_reason)).toMatch(/not admitted for research/);
    expect(detail[0]!.upstream).toBe(upstreamUrl);
    expect(detail[0]!.package_seen).toBe(2);
    // Source names and line counts, never a line of a private file.
    expect(JSON.stringify(detail)).not.toContain(HOME_INSTRUCTION);
    expect(JSON.stringify(detail)).not.toContain(MEMORY_NOTE);
    // No filesystem path crosses into the public manifest.
    expect(JSON.stringify(detail)).not.toContain(stub.archive);
    expect(JSON.stringify(detail)).not.toContain('/Users/');
  });

  it('writes no review when the launcher refuses', () => {
    const stub = stubClaude({ mutateCanary: 'leak-home' });
    const result = runReviewer(stub);

    expect(result.ok).toBe(false);
    expect(existsSync(reviewPath())).toBe(false);
    expect(packageWasSent(stub)).toBe(false);
    expect(manifest().runs[0]!.status).toBe('failed');
  });

  it('leaves an existing review exactly where it was', () => {
    const existing = path.join(repo, 'reviews', STORY, RUN_DATE, 'round1');
    mkdirSync(existing, { recursive: true });
    const kept = '{\n  "kept": "from a run that actually happened"\n}\n';
    writeFileSync(path.join(existing, 'claude.json'), kept);

    expect(runReviewer(stubClaude()).ok).toBe(false);
    expect(readFileSync(reviewPath(), 'utf8')).toBe(kept);
  });

  it('still describes the run under --dry-run without invoking anything', () => {
    const stub = stubClaude();
    const result = run(
      [path.join(repo, 'scripts', 'panel', 'run-reviewer.sh'), 'claude', STORY, RUN_DATE, '1', '--dry-run'],
      stub.env,
    );
    expect(result.ok).toBe(true);
    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
  });

  /**
   * Methodology v1.37: the Google seat is retired for runs frozen after
   * 2026-09-23. The runner refuses it unless the operator says the run froze
   * under the three-provider rule; audits have no such flag.
   */
  it('refuses the retired Google seat unless the run froze before the retirement', () => {
    const stub = stubClaude();
    const script = path.join(repo, 'scripts', 'panel', 'run-reviewer.sh');
    const refused = run([script, 'agy', STORY, RUN_DATE, '1', '--dry-run'], stub.env);
    expect(refused.ok).toBe(false);
    expect(refused.stderr).toMatch(/retired for runs frozen after 2026-09-23/);
    const allowed = run([script, 'agy', STORY, RUN_DATE, '1', '--finish-frozen-run', '--dry-run'], stub.env);
    expect(allowed.ok).toBe(true);
    expect(allowed.stdout).toMatch(/model:\s+gemini-3\.8-flash-high/);
    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
  });

  it('describes the Luna seat as a counted seat writing into round1', () => {
    const stub = stubClaude();
    const result = run([path.join(repo, 'scripts', 'panel', 'run-reviewer.sh'), 'luna', STORY, RUN_DATE, '1', '--dry-run'], stub.env);
    expect(result.ok).toBe(true);
    expect(result.stdout).toMatch(/model:\s+gpt-6-luna/);
    expect(result.stdout).toMatch(/effort:\s+high/);
    expect(result.stdout).toMatch(/round1\/gpt-luna\.json/);
    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
  });
});

/**
 * The two-attempt retry path, exercised against a fixture launcher inside a
 * temporary copy of the tree.
 *
 * Every real profile stays blocked; nothing here can reach a model or a
 * production code path. What is under test is the runner's own mechanics, which
 * the admission gate otherwise hides completely: that a rejected response earns
 * exactly one retry, that the retry is a genuinely different package carrying
 * the validator's complaints, that both packages survive as distinct immutable
 * bytes, and that a nonzero exit is never rescued by valid-looking JSON.
 */
describe('retry mechanics', { timeout: 120_000 }, () => {
  let repo: string;
  beforeEach(() => {
    repo = fakeRepo();
  });

  const reviewPath = () => path.join(repo, 'reviews', STORY, RUN_DATE, 'round1', 'claude.json');
  const manifestPath = () => path.join(repo, 'reviews', STORY, RUN_DATE, 'run.yaml');
  const manifest = () => YAML.parse(readFileSync(manifestPath(), 'utf8')) as { runs: Record<string, unknown>[] };

  const runReviewer = (env: NodeJS.ProcessEnv) =>
    run([path.join(repo, 'scripts', 'panel', 'run-reviewer.sh'), 'claude', STORY, RUN_DATE, '1'], env);

  const archiveEnv = () => {
    const archive = mkdtempSync(path.join(root, 'retry-archive-'));
    return { ...process.env, YEGFACTS_REVIEW_ARCHIVE: archive } as NodeJS.ProcessEnv;
  };

  const attempts = (env: NodeJS.ProcessEnv) => {
    const base = path.join(env.YEGFACTS_REVIEW_ARCHIVE!, STORY, RUN_DATE, 'round1', 'claude');
    if (!existsSync(base)) return [];
    return readdirSync(base)
      .sort()
      .flatMap((stamp) =>
        readdirSync(path.join(base, stamp))
          .sort()
          .map((attempt) => path.join(base, stamp, attempt)),
      );
  };

  it('retries once on a rejected response and keeps both packages distinct', () => {
    fixtureLauncher(repo, [{ text: '{"round": 1}' }, { text: validReview }]);
    const env = archiveEnv();
    const result = runReviewer(env);

    expect(result.ok).toBe(true);
    const dirs = attempts(env);
    expect(dirs).toHaveLength(2);

    const packages = dirs.map((dir) => readFileSync(path.join(dir, 'package.md'), 'utf8'));
    expect(packages[0]).not.toBe(packages[1]);
    expect(packages[0]).not.toContain('Your previous response was rejected');
    expect(packages[1]).toContain('Your previous response was rejected');
    // The retry carries what the validator actually said, not a generic nudge.
    expect(packages[1]).toMatch(/must have required property|round/);

    const hashes = dirs.map((dir) => readJson(path.join(dir, 'metadata.json')).package_sha256);
    expect(hashes[0]).not.toBe(hashes[1]);
    // Attempt 1's bytes survive attempt 2, which is what the single reused
    // path in the old runner destroyed.
    expect(readFileSync(path.join(dirs[0]!, 'final-message.txt'), 'utf8')).toBe('{"round": 1}');

    const detail = manifest().runs[0]!.attempts_detail as Record<string, unknown>[];
    expect(detail.map((row) => row.schema)).toEqual(['invalid', 'valid']);
    expect(new Set(detail.map((row) => row.package_sha256)).size).toBe(2);
    // The rejected attempt's validation errors are hashed into the public row.
    expect(detail[0]!.validation_errors_sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(detail[1]!.validation_errors_sha256).toBeUndefined();

    expect(manifest().runs[0]!.attempts).toBe(2);
    expect(manifest().runs[0]!.status).toBe('ok');
    expect(JSON.parse(readFileSync(reviewPath(), 'utf8')).story).toBe(STORY);
  });

  it('keeps the complete final message with its footer and writes a clean review', () => {
    const footer = '\n\nSources consulted: https://example.com/one, https://example.com/two';
    fixtureLauncher(repo, [{ text: validReview + footer }]);
    const env = archiveEnv();

    expect(runReviewer(env).ok).toBe(true);
    const retained = readFileSync(path.join(attempts(env)[0]!, 'final-message.txt'), 'utf8');
    expect(retained.endsWith(footer)).toBe(true);
    expect(readFileSync(reviewPath(), 'utf8')).not.toContain('Sources consulted');
  });

  it('never installs a response from a launcher that did not admit the run', () => {
    fixtureLauncher(repo, [{ text: validReview }], { admitted: false });
    const env = archiveEnv();
    const result = runReviewer(env);

    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/not admitted for research/);
    expect(existsSync(reviewPath())).toBe(false);
    // The answer is retained, and it is the schema-valid one. Being valid was
    // never what earned it a place under reviews/.
    expect(readFileSync(path.join(attempts(env)[0]!, 'final-message.txt'), 'utf8')).toContain('"story"');
    expect(manifest().runs[0]!.status).toBe('failed');
    expect(manifest().runs[0]!.attempts).toBe(1);
    const detail = manifest().runs[0]!.attempts_detail as Record<string, unknown>[];
    expect(detail[0]!.schema).toBe('not-reached');
    expect(detail[0]!.admitted_for_research).toBe(false);
  });

  it('never accepts a nonzero exit, however good the JSON looks', () => {
    fixtureLauncher(repo, [{ text: validReview, exit: 3 }]);
    const env = archiveEnv();
    const result = runReviewer(env);

    expect(result.ok).toBe(false);
    expect(existsSync(reviewPath())).toBe(false);
    const dir = attempts(env)[0]!;
    expect(readFileSync(path.join(dir, 'exit-code'), 'utf8').trim()).toBe('3');
    // The output that would have been accepted is retained and readable.
    expect(readFileSync(path.join(dir, 'final-message.txt'), 'utf8')).toContain('"story"');
    expect(manifest().runs[0]!.status).toBe('failed');
    // One attempt: a launcher that failed is not a reviewer that answered badly.
    expect(manifest().runs[0]!.attempts).toBe(1);
  });

  it('refuses before invoking anything when the review already exists', () => {
    const state = fixtureLauncher(repo, [{ text: validReview }]);
    const env = archiveEnv();

    expect(runReviewer(env).ok).toBe(true);
    const good = readFileSync(reviewPath(), 'utf8');
    const manifestBefore = readFileSync(manifestPath(), 'utf8');
    const callsAfterFirst = readFileSync(path.join(state, 'calls'), 'utf8');

    const second = runReviewer(archiveEnv());
    expect(second.ok).toBe(false);
    expect(second.stderr).toMatch(/already exists/);
    expect(second.stderr).toMatch(/--into/);

    // Both the answer and the row describing it survive untouched.
    expect(readFileSync(reviewPath(), 'utf8')).toBe(good);
    expect(readFileSync(manifestPath(), 'utf8')).toBe(manifestBefore);
    expect(readFileSync(path.join(state, 'calls'), 'utf8')).toBe(callsAfterFirst);
  });

  it('refuses a dangling symlink sitting at the destination', () => {
    fixtureLauncher(repo, [{ text: validReview }]);
    mkdirSync(path.dirname(reviewPath()), { recursive: true });
    symlinkSync(path.join(root, 'no-such-review.json'), reviewPath());

    const result = runReviewer(archiveEnv());
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/already exists/);
  });

  it('refuses to write through a destination that appeared during the run', () => {
    // The pre-flight check passes, then the fixture fills the destination
    // partway through, the way a concurrent session would. Only the exclusive
    // install can catch this, and it must.
    fixtureLauncher(repo, [{ text: validReview }], { createDuringRun: reviewPath() });
    const env = archiveEnv();
    const result = runReviewer(env);

    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/refusing to overwrite/);
    expect(readFileSync(reviewPath(), 'utf8')).toBe('written by another session\n');
    // The answer that lost the race is still retained in full.
    expect(readFileSync(path.join(attempts(env)[0]!, 'final-message.txt'), 'utf8')).toContain('"story"');
  });
});

describe('audit-package', { timeout: 60_000 }, () => {
  const script = path.join(REAL_REPO, 'scripts', 'panel', 'audit-package.sh');

  it('writes no report when every check passed but the run was not admitted', () => {
    const stub = stubClaude({ research: researchRun('The audit found one framing problem.') });
    const report = path.join(root, 'audit-not-admitted.md');
    const result = run(
      [script, '--package', writePackage('audit.md'), '--report', report, '--label', 'framing-check'],
      stub.env,
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/not admitted for research/);
    // The package was sent and answered. What the answer does not get is a file
    // under the name of an audit.
    expect(packageWasSent(stub)).toBe(true);
    expect(existsSync(report)).toBe(false);
  });

  it('writes no report when the launcher refuses', () => {
    const stub = stubClaude({ mutateCanary: 'leak-home' });
    const report = path.join(root, 'audit-refused.md');
    const result = run(
      [script, '--package', writePackage('audit-refused-package.md'), '--report', report, '--label', 'framing-check'],
      stub.env,
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/failed its canary/);
    expect(existsSync(report)).toBe(false);
    expect(packageWasSent(stub)).toBe(false);
  });

  it('refuses an existing report before invoking anything', () => {
    const stub = stubClaude();
    const report = path.join(root, 'audit-existing.md');
    writeFileSync(report, 'an earlier audit\n');

    const result = run([script, '--package', writePackage('audit2.md'), '--report', report], stub.env);
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/report already exists/);
    expect(readFileSync(report, 'utf8')).toBe('an earlier audit\n');
    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
  });

  it('refuses a Google audit as retired, before anything is filed or run', () => {
    // Methodology v1.37: the Google seat is retired. An audit cannot be
    // commissioned from it, so there is nothing to file against Google; the
    // wrapper refuses as a usage error and the launcher is never reached.
    const stub = stubClaude();
    const report = path.join(root, 'audit-google-report.md');
    const result = run(
      [script, '--package', writePackage('audit-google-package.md'), '--report', report,
        '--provider', 'google', '--label', 'consultation-framing'],
      stub.env,
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/the Google seat is retired for new audits \(methodology v1\.37/);
    expect(existsSync(report)).toBe(false);
    expect(existsSync(path.join(stub.archive, 'audits', 'consultation-framing'))).toBe(false);
    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
  });

  it('rejects a vendor the launcher does not know', () => {
    const stub = stubClaude();
    const result = run(
      [script, '--package', writePackage('audit-bad.md'), '--report', path.join(root, 'audit-bad-report.md'),
        '--provider', 'mystery'],
      stub.env,
    );
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/unknown provider: mystery/);
  });

  it('has no flag for choosing a model', () => {
    const stub = stubClaude();
    const result = run(
      [script, '--package', writePackage('audit3.md'), '--report', path.join(root, 'a4.md'),
        '--model', 'claude-fable-5-1'],
      stub.env,
    );
    expect(result.ok).toBe(false);
    expect(result.stderr).toMatch(/unknown option: --model/);
  });
});

/**
 * The one live test, opt-in because it spends real money on a real subscription.
 * Run it deliberately with YEGFACTS_LIVE_CANARY=1. It runs the candidate
 * profile's diagnostic against the installed CLI and the real API, with no stub
 * upstream, and asserts what a real capture shows.
 *
 * It also runs against the FOUNDER'S OWN $HOME, which is the point: the denylist
 * is built from the CLAUDE.md, AGENTS.md and memory files that actually exist on
 * this machine, so a real leak of any of them fails here and nowhere else.
 */
describe.runIf(process.env.YEGFACTS_LIVE_CANARY === '1')('live candidate diagnostic', { timeout: 240_000 }, () => {
  it('passes the structural canary and its own capture check', () => {
    const archive = mkdtempSync(path.join(root, 'live-archive-'));
    const attempt = path.join(archive, 'live', 'attempt-1');
    // Deliberately no YEGFACTS_REVIEW_UPSTREAM: the point of this test is the
    // production upstream.
    const env: NodeJS.ProcessEnv = { ...process.env, YEGFACTS_REVIEW_ARCHIVE: archive };
    delete env.YEGFACTS_REVIEW_UPSTREAM;

    const diagnostic = run(
      [INVOKE, '--purpose', 'diagnostic', '--provider', 'anthropic', '--package', writePackage('live.md'),
        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high', '--max-budget-usd', '2'],
      env,
    );
    expect(diagnostic.ok).toBe(true);

    const report = readJson(path.join(attempt, 'canary', 'report.json'));
    expect(report.ok).toBe(true);
    const facts = report.facts as Record<string, unknown>;
    expect(facts.tools).toEqual(['WebFetch', 'WebSearch']);
    expect(facts.skills).toEqual([]);
    expect(facts.plugins).toEqual([]);
    expect(facts.mcp_servers).toEqual([]);
    expect((report.context_proof as Record<string, unknown>).status).toBe('pass');

    const metadata = readJson(path.join(attempt, 'metadata.json'));
    expect(metadata.canary).toBe('pass');
    expect(metadata.reasoning_effort).toBe('high');
    expect(metadata.canary_upstream).toBe('https://api.anthropic.com');
    // A diagnostic never admits, whatever its check says: no package was sent.
    expect(metadata.admitted_for_research).toBe(false);
    expect(metadata.stdout_sha256).toBe('absent');
    expect(metadata.canary_stdout_sha256).toMatch(/^[0-9a-f]{64}$/);

    // The real machine's real files were read, and none of their text is in the
    // report that a public row will carry the hash of.
    const capture = report.capture_check as {
      sources: { name: string; present: boolean; lines_checked: number }[];
    };
    const read = capture.sources.filter((source) => source.present);
    expect(read.length).toBeGreaterThan(0);
    expect(read.reduce((total, source) => total + source.lines_checked, 0)).toBeGreaterThan(0);
    for (const source of capture.sources) {
      expect(source.name).toMatch(/^(\$HOME|<repo>|the )/);
    }
  });
});
