OpenAI Codex v0.156.1
--------
workdir: <repo>
model: gpt-6-sol
provider: openai
approval: never
sandbox: danger-full-access
reasoning effort: high
reasoning summaries: none
session id: 01a0cedb-eda2-7652-83af-eba2f4768fe3
--------
user
Round 3. Context in ./docs/reviews/codex-8c367083-review_3.md. Re-inspect scripts/panel/run-reviewer.sh, tests/invoke-reviewer.test.ts and docs/DESIGN.md against origin/main for the symlink fix and its test. If solid and ready to merge, end with: VERDICT: APPROVED. Otherwise end with: VERDICT: REVISE
codex
I’ll read the round-3 context, inspect the three named diffs against `origin/main`, and check that the symlink regression test exercises the same path as a real shadow run.
exec
/bin/zsh -lc 'cat docs/reviews/codex-8c367083-review_3.md' in <repo>
 succeeded in 0ms:
# Review context, round 3

Same repository, branch and file list as round 2. Working tree clean; compare
with `git diff origin/main -- <file>`.

Change since round 2: run-reviewer.sh refuses any `--into` whose directory is a
symbolic link, right after OUT_DIR is computed and before the dry-run block or
any invocation (`test -n "$INTO" && test -L "$OUT_DIR"`). The guard test in
tests/invoke-reviewer.test.ts creates `<run>/shadow-linked -> <run>/round1` and
expects the refusal with no launcher call. DESIGN.md's shadow paragraph now says
"or that is a symbolic link".

exec
/bin/zsh -lc 'git diff origin/main -- scripts/panel/run-reviewer.sh' in <repo>
 succeeded in 0ms:
diff --git a/scripts/panel/run-reviewer.sh b/scripts/panel/run-reviewer.sh
index 3e2c630..5037262 100755
--- a/scripts/panel/run-reviewer.sh
+++ b/scripts/panel/run-reviewer.sh
@@ -6,6 +6,7 @@
 #   scripts/panel/run-reviewer.sh claude electric-buses 2026-08-31 1
 #
 # Providers: claude | codex | agy  (aliases: anthropic, gpt/openai, gemini/google)
+#           luna | shadow  (the uncounted shadow seat, v1.34; needs --into)
 #
 # Isolation is NOT this script's business, and the older version of this comment
 # claiming a fresh mktemp -d was the boundary was wrong: a CLI loads its
@@ -57,6 +58,9 @@ usage() {
   cat >&2 <<'USAGE'
 usage: scripts/panel/run-reviewer.sh <provider> <story> <date> <round> [options]
   provider  claude | codex | agy   (aliases: anthropic, gpt, openai, gemini, google)
+            luna | shadow          the uncounted shadow seat (v1.34): round 1 only,
+                                   and --into shadow-<name> is required so it never
+                                   lands in a round directory
   story     story slug, e.g. electric-buses
   date      run date, e.g. 2026-08-31
   round     1 (blind research) or 2 (cross-review)
@@ -89,6 +93,19 @@ case "$INTO" in
 esac
 
 case "$ROUND" in 1|2) ;; *) echo "round must be 1 or 2, got '$ROUND'" >&2; exit 2 ;; esac
+case "$PROVIDER_ARG" in
+  luna|shadow)
+    # The shadow seat is never merged. scripts/merge.ts reads every JSON file
+    # in a round directory, so the only way to keep that promise is to refuse
+    # to write into one. Round 2 hands a seat the other seats' findings, which
+    # a seat that is not on the panel has no business reading.
+    case "$INTO" in
+      shadow-*) ;;
+      *) echo "the shadow seat needs --into shadow-<name>; it is never written into a round directory" >&2; exit 2 ;;
+    esac
+    [ "$ROUND" = "1" ] || { echo "the shadow seat runs round 1 only" >&2; exit 2; }
+    ;;
+esac
 
 # ---------------------------------------------------------------------------
 # Provider → pinned command (spec §5.2). The output filename is the panel's
@@ -104,17 +121,35 @@ EFFORT="high"
 
 case "$PROVIDER_ARG" in
   claude|anthropic)
-    # v1.15 (2026-09-02): moved off Fable 5.1, whose allowance on the
-    # founder's subscription is nearly used up. A cost decision, not a
-    # finding about which model reviews better; nothing here measures that.
-    # Runs already published under Fable 5.1 keep the model their manifests
-    # record.
-    SLOT="claude"; CLI="claude"; MODEL_ID="claude-opus-5"
-    PROVIDER_CANONICAL="anthropic"; SEAT="Claude Opus 5"
+    # v1.34 (2026-09-23): Opus 5 to Opus 5.5, the day after its release. A
+    # cost decision, as v1.15's move off Fable 5.1 was: the new model is
+    # priced a fifth below the old one and its vendor claims fewer invented
+    # figures; nothing here measures either. Opus 5.5 defaults to medium
+    # effort, so the pin below is what keeps this seat at the level v1.6
+    # pinned. Runs already published under Opus 5 or Fable 5.1 keep the model
+    # their manifests record.
+    SLOT="claude"; CLI="claude"; MODEL_ID="claude-opus-5-5"
+    PROVIDER_CANONICAL="anthropic"; SEAT="Claude Opus 5.5"
     ;;
   codex|gpt|openai)
-    SLOT="gpt"; CLI="codex"; MODEL_ID="gpt-5.6-sol"
-    PROVIDER_CANONICAL="openai"; SEAT="GPT-5.6 Sol"
+    # v1.34 (2026-09-23): GPT-5.6 Sol to GPT-6 Sol, released the same day as
+    # Opus 5.5 at half the price of the seat it replaces. Same kind of
+    # decision as above; runs published under GPT-5.6 Sol keep their model.
+    SLOT="gpt"; CLI="codex"; MODEL_ID="gpt-6-sol"
+    PROVIDER_CANONICAL="openai"; SEAT="GPT-6 Sol"
+    ;;
+  luna|shadow)
+    # v1.34 (2026-09-23): the shadow seat. GPT-6 Luna is the cheapest model
+    # any panel vendor sells, and whether a model that cheap can hold a
+    # research seat is an open question this site answers by measurement,
+    # not by guessing. It runs the same frozen package as the three counted
+    # seats and its answer is committed, but it is never merged and never
+    # synthesised: it must be run with --into shadow-<name>, because
+    # scripts/merge.ts reads every JSON file in a round directory, and the
+    # run's synthesis_scope names no shadow. The
+    # comparison against the counted seats is written into run-record.md.
+    SLOT="gpt-luna"; CLI="codex"; MODEL_ID="gpt-6-luna"
+    PROVIDER_CANONICAL="openai"; SEAT="GPT-6 Luna (shadow, not counted)"
     ;;
   agy|gemini|google)
     # v1.20 (2026-09-03): the seat moves from Gemini 3.1 Pro to Gemini 3.8
@@ -150,6 +185,12 @@ SCHEMA="$REPO_ROOT/prompts/review-schema.json"
 # the seats answered, and the re-run's own hashes sit beside its own answers.
 OUT_DIR="$RUN_DIR/${INTO:-round$ROUND}"
 OUT_FILE="$OUT_DIR/$SLOT.json"
+# A --into directory that is a symbolic link is a destination whose name says
+# one thing and whose contents land somewhere else. Nothing legitimate needs
+# one, and for the shadow seat it is the one way left to reach round1/.
+if test -n "$INTO" && test -L "$OUT_DIR"; then
+  echo "--into '$INTO' is a symbolic link; refusing to write through it" >&2; exit 2
+fi
 MANIFEST="${INTO:+$RUN_DIR/$INTO/run.yaml}"
 MANIFEST="${MANIFEST:-$RUN_DIR/run.yaml}"
 

exec
/bin/zsh -lc "sed -n '1,26p' <board>/context/current-state.md" in <repo>
exec
/bin/zsh -lc 'git diff origin/main -- tests/invoke-reviewer.test.ts' in <repo>
 succeeded in 0ms:
# Current state — verified 2026-09-23

## 2026-09-23, day: OQ-27 decided (D-0040), PRs 75 to 77 merged, fold in PR #79, congestion and consultation in flight

Founder, on a morning session analysis: "do everything ... ask me simple
plain questions when you can't decide ... don't overengineer anything."
Three plain questions asked, three answers: yes to the cap change with a
quick board pass; merge PRs #75 and #76; stop after the fold and the
consultation audit, no third source today. Session yegfacts-fa on
claude-fable-5-1; the parallel session yegfacts-07 ran the model-tiers
batch (entry above) and the two coordinated by message; v1.34 is theirs,
v1.35 and v1.36 this session's.

Merged to main, in order: #76 (second intake, v1.33, d411c6c), #75
(congestion record, f360010), #77 (park confirmation, v1.35, 574487e).
Open: #79 (register fold, v1.36, branch register-fold).

OQ-27 closed by D-0040. Board pass: four Claude Opus role memos in
parallel on a written brief, all REVISE, synthesis and the ruling in
reviews/2026-09-23-park-confirmation/. Every required change adopted
except the dispute route (split 3 to 1, stricter side taken). The brief
misstated the 2026-09-09 roads audit; all four caught it; corrected.
Public: methodology v1.35, prompts/framing-check.md, one exit line on
the methodology page, register field `parked_at: framing | panel`.

Congestion (Q4), branch congestion-confirmation, commit 187f085, no PR

 succeeded in 0ms:
diff --git a/tests/invoke-reviewer.test.ts b/tests/invoke-reviewer.test.ts
index 7eb8a33..a3b5367 100644
--- a/tests/invoke-reviewer.test.ts
+++ b/tests/invoke-reviewer.test.ts
@@ -31,19 +31,7 @@
  */
 import { spawnSync } from 'node:child_process';
 import http from 'node:http';
-import {
-  chmodSync,
-  cpSync,
-  existsSync,
-  mkdirSync,
-  mkdtempSync,
-  readFileSync,
-  readdirSync,
-  realpathSync,
-  rmSync,
-  symlinkSync,
-  writeFileSync,
-} from 'node:fs';
+import { chmodSync, cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
 import { tmpdir } from 'node:os';
 import path from 'node:path';
 import { fileURLToPath } from 'node:url';
@@ -210,7 +198,7 @@ const initEvent = (over: Record<string, unknown> = {}) =>
     session_id: 'stub-session',
     tools: ['WebFetch', 'WebSearch'],
     mcp_servers: [],
-    model: 'claude-opus-5',
+    model: 'claude-opus-5-5',
     permissionMode: 'default',
     slash_commands: [],
     claude_code_version: STUB_VERSION,
@@ -468,9 +456,17 @@ describe('research admission', { timeout: 60_000 }, () => {
    * sent, exactly as an unknown vendor does.
    */
   it.each([
+    ['openai', 'gpt-6-sol', /no codex credential at \$HOME\/\.codex\/auth\.json/],
+    // The shadow seat's model is pinned for the same vendor: it clears the pin
+    // check and stops, like the counted seat, at the missing credential.
+    ['openai', 'gpt-6-luna', /no codex credential at \$HOME\/\.codex\/auth\.json/],
+    // The superseded seat stays pinned while a check that ran on it is open
+    // (v1.35 confirms on the same pinned model), so it too reaches the
+    // credential check. A model on no list stops earlier.
     ['openai', 'gpt-5.6-sol', /no codex credential at \$HOME\/\.codex\/auth\.json/],
+    ['openai', 'gpt-5.6-luna', /model 'gpt-5\.6-luna' is not pinned for openai/],
     ['google', 'gemini-3.8-flash-high', /no gemini credential at \$HOME\/\.gemini/],
-    ['mystery-vendor', 'claude-opus-5', /unknown provider/],
+    ['mystery-vendor', 'claude-opus-5-5', /unknown provider/],
   ])('refuses %s for research without invoking anything', (provider, model, expected) => {
     const stub = stubClaude();
     const attempt = path.join(stub.archive, 'refusal', provider);
@@ -500,7 +496,7 @@ describe('research admission', { timeout: 60_000 }, () => {
   });
 
   it.each([
-    ['openai', 'gpt-5.6-sol', /no codex credential at \$HOME\/\.codex\/auth\.json/],
+    ['openai', 'gpt-6-sol', /no codex credential at \$HOME\/\.codex\/auth\.json/],
     ['google', 'gemini-3.8-flash-high', /no gemini credential at \$HOME\/\.gemini/],
   ])('records %s with its own seat and its own reason when no model is named', (provider, model, expected) => {
     const stub = stubClaude();
@@ -526,8 +522,8 @@ describe('research admission', { timeout: 60_000 }, () => {
 
   it.each([
     ['model', ['--model', 'claude-fable-5-1', '--effort', 'high'], /model 'claude-fable-5-1' is not pinned/],
-    ['effort', ['--model', 'claude-opus-5', '--effort', 'max'], /reasoning effort 'max' is not pinned/],
-    ['low-effort', ['--model', 'claude-opus-5', '--effort', 'low'], /reasoning effort 'low' is not pinned/],
+    ['effort', ['--model', 'claude-opus-5-5', '--effort', 'max'], /reasoning effort 'max' is not pinned/],
+    ['low-effort', ['--model', 'claude-opus-5-5', '--effort', 'low'], /reasoning effort 'low' is not pinned/],
   ])('refuses an unpinned %s before the admission gate', (_label, args, expected) => {
     const stub = stubClaude();
     const attempt = path.join(stub.archive, 'pins', _label);
@@ -558,7 +554,7 @@ describe('research run', { timeout: 120_000 }, () => {
     const pkg = writePackage(`research-${name}.md`);
     const result = run(
       [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', pkg,
-        '--attempt-dir', attempt, '--model', 'claude-opus-5', '--effort', 'high', ...extra],
+        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high', ...extra],
       stub.env,
     );
     return { ...result, attempt, pkg };
@@ -780,7 +776,7 @@ describe('candidate diagnostic', { timeout: 60_000 }, () => {
     const pkg = writePackage(`diag-${name}.md`);
     const result = run(
       [INVOKE, '--purpose', 'diagnostic', '--provider', 'anthropic', '--package', pkg,
-        '--attempt-dir', attempt, '--model', 'claude-opus-5', '--effort', 'high', ...extra],
+        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high', ...extra],
       stub.env,
     );
     return { ...result, attempt, pkg };
@@ -1014,7 +1010,7 @@ describe('candidate diagnostic', { timeout: 60_000 }, () => {
     symlinkSync(process.execPath, path.join(tools, 'node'));
     const result = run(
       [INVOKE, '--purpose', 'diagnostic', '--provider', 'anthropic', '--package', writePackage('no-cli.md'),
-        '--attempt-dir', attempt, '--model', 'claude-opus-5', '--effort', 'high'],
+        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high'],
       { ...stub.env, PATH: `${tools}:/usr/bin:/bin` },
     );
 
@@ -1058,7 +1054,7 @@ describe('archive safety', { timeout: 60_000 }, () => {
     const result = run(
       [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', writePackage('trav.md'),
         '--attempt-dir', `${stub.archive}/../${path.basename(escape)}/attempt-1`,
-        '--model', 'claude-opus-5', '--effort', 'high'],
+        '--model', 'claude-opus-5-5', '--effort', 'high'],
       stub.env,
     );
     expect(result.ok).toBe(false);
@@ -1075,7 +1071,7 @@ describe('archive safety', { timeout: 60_000 }, () => {
     const result = run(
       [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', writePackage('symlink.md'),
         '--attempt-dir', path.join(stub.archive, 'sneaky', 'attempt-1'),
-        '--model', 'claude-opus-5', '--effort', 'high'],
+        '--model', 'claude-opus-5-5', '--effort', 'high'],
       stub.env,
     );
     expect(result.ok).toBe(false);
@@ -1091,7 +1087,7 @@ describe('archive safety', { timeout: 60_000 }, () => {
 
     const result = run(
       [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', writePackage('collide.md'),
-        '--attempt-dir', attempt, '--model', 'claude-opus-5', '--effort', 'high'],
+        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high'],
       stub.env,
     );
     expect(result.ok).toBe(false);
@@ -1190,6 +1186,53 @@ describe('run-reviewer', { timeout: 120_000 }, () => {
     expect(result.ok).toBe(true);
     expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
   });
+
+  /**
+   * The shadow seat (methodology v1.34) is never merged. scripts/merge.ts
+   * reads every JSON file in a round directory, so the only way to keep that
+   * promise is to refuse every destination that is not a shadow- directory,
+   * and to refuse round 2, which would hand a seat that is not on the panel
+   * the panel's findings.
+   */
+  it('refuses the shadow seat anywhere but round 1 of a shadow- directory', () => {
+    const stub = stubClaude();
+    const script = path.join(repo, 'scripts', 'panel', 'run-reviewer.sh');
+    const cases: [string[], RegExp][] = [
+      [['1'], /needs --into shadow-<name>/],
+      [['1', '--into', 'round1'], /needs --into shadow-<name>/],
+      [['1', '--into', 'round1-rerun-1'], /needs --into shadow-<name>/],
+      [['1', '--into', 'round2'], /needs --into shadow-<name>/],
+      [['2', '--into', 'shadow-round1'], /round 1 only/],
+    ];
+    for (const [args, expected] of cases) {
+      const result = run([script, 'luna', STORY, RUN_DATE, ...args, '--dry-run'], stub.env);
+      expect(result.ok).toBe(false);
+      expect(result.stderr).toMatch(expected);
+    }
+    // A shadow- name that is a link into round1/ is the last way in, and it is
+    // refused before anything is assembled.
+    const runDir = path.join(repo, 'reviews', STORY, RUN_DATE);
+    mkdirSync(path.join(runDir, 'round1'), { recursive: true });
+    symlinkSync(path.join(runDir, 'round1'), path.join(runDir, 'shadow-linked'));
+    const linked = run([script, 'luna', STORY, RUN_DATE, '1', '--into', 'shadow-linked', '--dry-run'], stub.env);
+    expect(linked.ok).toBe(false);
+    expect(linked.stderr).toMatch(/is a symbolic link/);
+    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
+  });
+
+  it('describes the shadow seat as gpt-6-luna writing into its own directory', () => {
+    const stub = stubClaude();
+    const result = run(
+      [path.join(repo, 'scripts', 'panel', 'run-reviewer.sh'), 'luna', STORY, RUN_DATE, '1', '--into', 'shadow-round1', '--dry-run'],
+      stub.env,
+    );
+    expect(result.ok).toBe(true);
+    expect(result.stdout).toMatch(/model:\s+gpt-6-luna/);
+    expect(result.stdout).toMatch(/effort:\s+high/);
+    expect(result.stdout).toMatch(/shadow-round1\/gpt-luna\.json/);
+    expect(result.stdout).not.toMatch(/\/round1\/gpt/);
+    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
+  });
 });
 
 /**
@@ -1472,7 +1515,7 @@ describe.runIf(process.env.YEGFACTS_LIVE_CANARY === '1')('live candidate diagnos
 
     const diagnostic = run(
       [INVOKE, '--purpose', 'diagnostic', '--provider', 'anthropic', '--package', writePackage('live.md'),
-        '--attempt-dir', attempt, '--model', 'claude-opus-5', '--effort', 'high', '--max-budget-usd', '2'],
+        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high', '--max-budget-usd', '2'],
       env,
     );
     expect(diagnostic.ok).toBe(true);

exec
/bin/zsh -lc 'git diff origin/main -- docs/DESIGN.md' in <repo>
 succeeded in 0ms:
diff --git a/docs/DESIGN.md b/docs/DESIGN.md
index f8ee0ab..cc5a0aa 100644
--- a/docs/DESIGN.md
+++ b/docs/DESIGN.md
@@ -344,6 +344,36 @@ record earlier execution, **not commands approved for new runs**:
 | GPT-5.6 Sol | `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check` |
 | Gemini 3.8 Flash | `agy --model gemini-3.8-flash-high --effort high --sandbox --dangerously-skip-permissions --print-timeout 45m -p` (v1.26; Gemini 3.1 Pro before that, and v1.14 added the permissions flag, without which the headless seat returned nothing on PDF-heavy briefs). The founder retired 3.1 Pro from every seat on this site after the intake extraction run, where 3.8 Flash at high turned the weakest extractor seat into the cleanest; no panel-round comparison of the two exists. Runs already published under 3.1 Pro keep the model their manifests record. |
 
+**Current pins (v1.34).** The commands approved for new runs are the ones
+`scripts/panel/run-reviewer.sh` assembles and `scripts/panel/invoke-reviewer.sh`
+admits; nothing else runs a seat. From v1.34 the Claude seat is
+`claude-opus-5-5`, the OpenAI seat `gpt-6-sol` and the Google seat
+`gemini-3.8-flash-high`, every seat at `high`. Opus 5.5 defaults to medium
+effort, so the pin is what keeps the seat at the level v1.6 chose. Both moves
+are cost decisions (Opus 5.5 is listed a fifth below Opus 5, GPT-6 Sol at half
+of GPT-5.6 Sol), not findings about which model reviews better, which nothing
+on this site measures. Runs already published under Opus 5, Fable 5.1 or
+GPT-5.6 Sol keep the model their manifests record. A superseded model stays on
+the launcher's pinned list, never as the default, while a framing check that ran
+on it is open, because v1.35 confirms a park on the same pinned model as the
+report it confirms; it leaves the list when the last such check closes.
+
+**The shadow seat (v1.34).** The founder's question is whether a model as cheap
+as GPT-6 Luna, listed at a twentieth of the OpenAI seat's price, can hold a
+research seat. This site answers that by measurement rather than by guessing.
+For the next two panel runs a fourth seat, `gpt-6-luna` at `high`, receives the
+identical frozen package through the same launcher and profile as the counted
+OpenAI seat. Its answer is committed under `<run>/shadow-<name>/` with its own
+manifest (`scripts/panel/run-reviewer.sh luna <story> <date> 1 --into
+shadow-round1`). It is never merged and never synthesised: `scripts/merge.ts`
+reads every JSON file in a round directory, so the runner refuses any `--into`
+that is not a `shadow-` directory or that is a symbolic link, and refuses round
+2 outright, and `run.yaml`'s
+`synthesis_scope` names no shadow. `run-record.md` compares its sources and
+findings against the three counted seats. After two runs the editor recommends
+and the founder decides whether a cheap-tier model takes a counted seat; until
+then no finding rests on it.
+
 From v1.28, `scripts/panel/invoke-reviewer.sh` is the common execution path for
 panel reviews and package-in/report-out framing or source audits. There is no
 unrestricted fallback. The candidate Claude Code profile uses safe mode, empty

exec
/bin/zsh -lc 'git rev-parse --short HEAD 2>/dev/null; git rev-parse --short origin/main 2>/dev/null; git status --short 2>/dev/null' in <repo>
 succeeded in 0ms:
1d12c3b
74c16b0

exec
/bin/zsh -lc 'npx vitest run tests/invoke-reviewer.test.ts' in <repo>
exec
/bin/zsh -lc 'bash -n scripts/panel/run-reviewer.sh' in <repo>
 succeeded in 0ms:
exec
/bin/zsh -lc "nl -ba scripts/panel/run-reviewer.sh | sed -n '90,110p;180,205p;315,345p;350,370p'; nl -ba tests/invoke-reviewer.test.ts | sed -n '1185,1245p'; nl -ba docs/DESIGN.md | sed -n '359,379p'" in <repo>
 succeeded in 0ms:
    90	done
    91	case "$INTO" in
    92	  */*|..|.) echo "--into must be a single directory name, got '$INTO'" >&2; exit 2 ;;
    93	esac
    94	
    95	case "$ROUND" in 1|2) ;; *) echo "round must be 1 or 2, got '$ROUND'" >&2; exit 2 ;; esac
    96	case "$PROVIDER_ARG" in
    97	  luna|shadow)
    98	    # The shadow seat is never merged. scripts/merge.ts reads every JSON file
    99	    # in a round directory, so the only way to keep that promise is to refuse
   100	    # to write into one. Round 2 hands a seat the other seats' findings, which
   101	    # a seat that is not on the panel has no business reading.
   102	    case "$INTO" in
   103	      shadow-*) ;;
   104	      *) echo "the shadow seat needs --into shadow-<name>; it is never written into a round directory" >&2; exit 2 ;;
   105	    esac
   106	    [ "$ROUND" = "1" ] || { echo "the shadow seat runs round 1 only" >&2; exit 2; }
   107	    ;;
   108	esac
   109	
   110	# ---------------------------------------------------------------------------
   180	SCHEMA="$REPO_ROOT/prompts/review-schema.json"
   181	# A claim-scoped re-run (`--claims` with `--into`) writes into its own directory
   182	# with its own manifest, and never into `round1/` or the run's `run.yaml`. The
   183	# completed round stays exactly as the seats returned it: nothing is
   184	# overwritten, the package hash recorded against it still describes the package
   185	# the seats answered, and the re-run's own hashes sit beside its own answers.
   186	OUT_DIR="$RUN_DIR/${INTO:-round$ROUND}"
   187	OUT_FILE="$OUT_DIR/$SLOT.json"
   188	# A --into directory that is a symbolic link is a destination whose name says
   189	# one thing and whose contents land somewhere else. Nothing legitimate needs
   190	# one, and for the shadow seat it is the one way left to reach round1/.
   191	if test -n "$INTO" && test -L "$OUT_DIR"; then
   192	  echo "--into '$INTO' is a symbolic link; refusing to write through it" >&2; exit 2
   193	fi
   194	MANIFEST="${INTO:+$RUN_DIR/$INTO/run.yaml}"
   195	MANIFEST="${MANIFEST:-$RUN_DIR/run.yaml}"
   196	
   197	[ -f "$BRIEF" ] || { echo "brief not found: $BRIEF" >&2; exit 1; }
   198	[ -f "$SCHEMA" ] || { echo "schema not found: $SCHEMA" >&2; exit 1; }
   199	
   200	if [ "$ROUND" = "1" ]; then
   201	  PROMPT_FILE="$REPO_ROOT/prompts/reviewer.md"
   202	else
   203	  PROMPT_FILE="$REPO_ROOT/prompts/cross-review.md"
   204	  COMBINED="$RUN_DIR/combined-evidence.json"
   205	  [ -f "$COMBINED" ] || {
   315	  echo "Return ONLY the JSON document. Set \`round\` to $ROUND."
   316	  if [ -n "$CLAIMS" ]; then
   317	    echo "Answer only these claims, and no others: $CLAIMS"
   318	  fi
   319	} > "$PACKAGE"
   320	
   321	PROMPT_SHA="$(shasum -a 256 "$PACKAGE" | cut -d' ' -f1)"
   322	INVOKE="$REPO_ROOT/scripts/panel/invoke-reviewer.sh"
   323	COMMAND_STRING="scripts/panel/invoke-reviewer.sh --provider $PROVIDER_CANONICAL --model $MODEL_ID --effort $EFFORT --package package.md"
   324	
   325	# Each attempt lands in its own directory under the private archive, keyed by a
   326	# fresh timestamp, so a re-run of a round never lands on top of the last one.
   327	ARCHIVE_ROOT="$("$INVOKE" --archive-root)"
   328	RUN_STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
   329	ATTEMPT_BASE="$ARCHIVE_ROOT/$STORY/$RUN_DATE/${INTO:-round$ROUND}/$SLOT/$RUN_STAMP"
   330	
   331	if [ "$DRY_RUN" = "1" ]; then
   332	  echo "DRY RUN — no CLI executed, nothing written under reviews/"
   333	  echo
   334	  echo "provider:      $PROVIDER_ARG (slot: $SLOT, canonical: $PROVIDER_CANONICAL)"
   335	  echo "model:         $MODEL_ID"
   336	  echo "effort:        $EFFORT"
   337	  echo "round:         $ROUND"
   338	  echo "scratch dir:   $SCRATCH"
   339	  echo "attempt dirs:  $ATTEMPT_BASE/attempt-N"
   340	  echo "package files: $PACKAGE_FILES"
   341	  echo "package bytes: $(wc -c < "$PACKAGE" | tr -d ' ')"
   342	  echo "prompt sha256: $PROMPT_SHA"
   343	  echo "would write:   ${OUT_FILE#"$REPO_ROOT"/}"
   344	  echo "would update:  ${MANIFEST#"$REPO_ROOT"/}"
   345	  echo
   350	
   351	# A completed review, and the manifest row describing it, are the output of a
   352	# research run that cost money and cannot be reproduced bit for bit. Neither is
   353	# re-derivable, so a re-run does not get to touch either: it refuses here,
   354	# before the launcher is called and before record-run.ts rewrites the row.
   355	# A claim-scoped re-run has --into for exactly this, and it writes its own
   356	# directory and its own manifest. -L as well as -e, because a dangling symlink
   357	# at the destination is still something a person put there.
   358	if [ -e "$OUT_FILE" ] || [ -L "$OUT_FILE" ]; then
   359	  echo "[$SLOT round $ROUND] ${OUT_FILE#"$REPO_ROOT"/} already exists." >&2
   360	  echo "[$SLOT round $ROUND] Refusing: a re-run would replace both it and its manifest row." >&2
   361	  echo "[$SLOT round $ROUND] Use --into <dirname> to record a re-run beside it." >&2
   362	  exit 1
   363	fi
   364	
   365	CLI_VERSION="unknown"
   366	if command -v "$CLI" >/dev/null 2>&1; then
   367	  CLI_VERSION="$("$CLI" --version 2>/dev/null | head -1 | tr -d '\r' || echo unknown)"
   368	fi
   369	[ -n "$CLI_VERSION" ] || CLI_VERSION="unknown"
   370	
  1185	    );
  1186	    expect(result.ok).toBe(true);
  1187	    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
  1188	  });
  1189	
  1190	  /**
  1191	   * The shadow seat (methodology v1.34) is never merged. scripts/merge.ts
  1192	   * reads every JSON file in a round directory, so the only way to keep that
  1193	   * promise is to refuse every destination that is not a shadow- directory,
  1194	   * and to refuse round 2, which would hand a seat that is not on the panel
  1195	   * the panel's findings.
  1196	   */
  1197	  it('refuses the shadow seat anywhere but round 1 of a shadow- directory', () => {
  1198	    const stub = stubClaude();
  1199	    const script = path.join(repo, 'scripts', 'panel', 'run-reviewer.sh');
  1200	    const cases: [string[], RegExp][] = [
  1201	      [['1'], /needs --into shadow-<name>/],
  1202	      [['1', '--into', 'round1'], /needs --into shadow-<name>/],
  1203	      [['1', '--into', 'round1-rerun-1'], /needs --into shadow-<name>/],
  1204	      [['1', '--into', 'round2'], /needs --into shadow-<name>/],
  1205	      [['2', '--into', 'shadow-round1'], /round 1 only/],
  1206	    ];
  1207	    for (const [args, expected] of cases) {
  1208	      const result = run([script, 'luna', STORY, RUN_DATE, ...args, '--dry-run'], stub.env);
  1209	      expect(result.ok).toBe(false);
  1210	      expect(result.stderr).toMatch(expected);
  1211	    }
  1212	    // A shadow- name that is a link into round1/ is the last way in, and it is
  1213	    // refused before anything is assembled.
  1214	    const runDir = path.join(repo, 'reviews', STORY, RUN_DATE);
  1215	    mkdirSync(path.join(runDir, 'round1'), { recursive: true });
  1216	    symlinkSync(path.join(runDir, 'round1'), path.join(runDir, 'shadow-linked'));
  1217	    const linked = run([script, 'luna', STORY, RUN_DATE, '1', '--into', 'shadow-linked', '--dry-run'], stub.env);
  1218	    expect(linked.ok).toBe(false);
  1219	    expect(linked.stderr).toMatch(/is a symbolic link/);
  1220	    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
  1221	  });
  1222	
  1223	  it('describes the shadow seat as gpt-6-luna writing into its own directory', () => {
  1224	    const stub = stubClaude();
  1225	    const result = run(
  1226	      [path.join(repo, 'scripts', 'panel', 'run-reviewer.sh'), 'luna', STORY, RUN_DATE, '1', '--into', 'shadow-round1', '--dry-run'],
  1227	      stub.env,
  1228	    );
  1229	    expect(result.ok).toBe(true);
  1230	    expect(result.stdout).toMatch(/model:\s+gpt-6-luna/);
  1231	    expect(result.stdout).toMatch(/effort:\s+high/);
  1232	    expect(result.stdout).toMatch(/shadow-round1\/gpt-luna\.json/);
  1233	    expect(result.stdout).not.toMatch(/\/round1\/gpt/);
  1234	    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
  1235	  });
  1236	});
  1237	
  1238	/**
  1239	 * The two-attempt retry path, exercised against a fixture launcher inside a
  1240	 * temporary copy of the tree.
  1241	 *
  1242	 * Every real profile stays blocked; nothing here can reach a model or a
  1243	 * production code path. What is under test is the runner's own mechanics, which
  1244	 * the admission gate otherwise hides completely: that a rejected response earns
  1245	 * exactly one retry, that the retry is a genuinely different package carrying
   359	report it confirms; it leaves the list when the last such check closes.
   360	
   361	**The shadow seat (v1.34).** The founder's question is whether a model as cheap
   362	as GPT-6 Luna, listed at a twentieth of the OpenAI seat's price, can hold a
   363	research seat. This site answers that by measurement rather than by guessing.
   364	For the next two panel runs a fourth seat, `gpt-6-luna` at `high`, receives the
   365	identical frozen package through the same launcher and profile as the counted
   366	OpenAI seat. Its answer is committed under `<run>/shadow-<name>/` with its own
   367	manifest (`scripts/panel/run-reviewer.sh luna <story> <date> 1 --into
   368	shadow-round1`). It is never merged and never synthesised: `scripts/merge.ts`
   369	reads every JSON file in a round directory, so the runner refuses any `--into`
   370	that is not a `shadow-` directory or that is a symbolic link, and refuses round
   371	2 outright, and `run.yaml`'s
   372	`synthesis_scope` names no shadow. `run-record.md` compares its sources and
   373	findings against the three counted seats. After two runs the editor recommends
   374	and the founder decides whether a cheap-tier model takes a counted seat; until
   375	then no finding rests on it.
   376	
   377	From v1.28, `scripts/panel/invoke-reviewer.sh` is the common execution path for
   378	panel reviews and package-in/report-out framing or source audits. There is no
   379	unrestricted fallback. The candidate Claude Code profile uses safe mode, empty

exec
/bin/zsh -lc 'git diff --check origin/main -- scripts/panel/run-reviewer.sh tests/invoke-reviewer.test.ts docs/DESIGN.md' in <repo>
 succeeded in 0ms:
 succeeded in 43437ms:

 RUN  v4.1.11 <repo>


 Test Files  1 passed (1)
      Tests  63 passed | 1 skipped (64)
   Start at  09:37:11
   Duration  43.23s (transform 35ms, setup 0ms, import 62ms, tests 43.11s, environment 0ms)


codex
The symlink check runs before package assembly, dry-run, invocation, and directory creation. Its new test creates a link into `round1` and verifies the runner refuses it. I’m waiting for the focused test run to finish, then I’ll give the verdict.
codex
The symlink fix closes the reported bypass. [run-reviewer.sh](scripts/panel/run-reviewer.sh:186) refuses a linked shadow directory before invocation; [the regression test](tests/invoke-reviewer.test.ts:1214) exercises that path; and [DESIGN.md](docs/DESIGN.md:368) matches the guard. The focused suite passed: 63 tests passed, 1 skipped. Shell syntax and diff checks passed.

VERDICT: APPROVED
tokens used
186,959
The symlink fix closes the reported bypass. [run-reviewer.sh](scripts/panel/run-reviewer.sh:186) refuses a linked shadow directory before invocation; [the regression test](tests/invoke-reviewer.test.ts:1214) exercises that path; and [DESIGN.md](docs/DESIGN.md:368) matches the guard. The focused suite passed: 63 tests passed, 1 skipped. Shell syntax and diff checks passed.

VERDICT: APPROVED
