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
I've revised the change based on your feedback. The updated review context is in ./docs/reviews/codex-8c367083-review_2.md; read it, then re-inspect the listed files with git diff origin/main -- <file>. Re-check in particular: the guard cannot be bypassed, the tests cover it, the DESIGN.md placement, and whether any public sentence now overclaims. If it is solid and ready to merge, end with: VERDICT: APPROVED. If more changes are needed, end with: VERDICT: REVISE
codex
I’ll read the revised context, compare each listed file against the current `origin/main`, and trace the guard and its tests. I’ll also re-read the public wording for claims the code does not support.
exec
/bin/zsh -lc 'cat docs/reviews/codex-8c367083-review_2.md' in <repo>
 succeeded in 0ms:
# Review context, round 2

Repository root: <repo>
(branch model-tiers, rebased onto origin/main 74c16b0 which now carries v1.35
and v1.36; compare with `git diff origin/main -- <file>`). Working tree clean.

Changed files: docs/DESIGN.md, methodology/changelog.yaml,
scripts/panel/run-reviewer.sh, scripts/panel/invoke-reviewer.sh,
tests/invoke-reviewer.test.ts, tests/three-seats.test.ts.

What changed since round 1:
1. Rebased: v1.36 and v1.35 sit above v1.34 in the changelog; nothing replaced.
2. Guard: the shadow seat now requires `--into shadow-<name>` (case pattern
   `shadow-*`); `round1`, `round1-rerun-1`, `round2` and a missing `--into` are
   all refused before the brief lookup, and round 2 is refused. Usage text and
   the case comment say so.
3. Tests: tests/invoke-reviewer.test.ts has two new run-reviewer tests (every
   refusal case, plus a dry run showing gpt-6-luna, effort high and the
   shadow-round1/gpt-luna.json destination, with no launcher call) and three
   new rows in the refusal it.each: gpt-6-luna and gpt-5.6-sol clear the pin
   check and stop at the credential, gpt-5.6-luna is refused as unpinned.
4. DESIGN.md: the historical table is restored exactly as on main; a "Current
   pins (v1.34)" paragraph and the shadow-seat paragraph follow it, before the
   "From v1.28" paragraph.
5. Changelog: the unsourced accuracy comparisons are gone; the two price
   sources are linked; the shadow highlight matches the guard.
6. New, at the request of the session running the v1.35 park confirmation:
   gpt-5.6-sol stays in the openai PINNED_MODELS list (never default) while a
   framing check that ran on it is open, because v1.35 confirms a park on the
   same pinned model as the report it confirms. Stated in the launcher comment,
   the v1.34 entry and DESIGN.md.

exec
/bin/zsh -lc "sed -n '1,35p' <board>/context/current-state.md; sed -n '1,22p' <board>/context/open-questions.md" in <repo>
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
yet: every check-3 finding applied in the checker's wording
(framing/response-3.md); claims 1, 2 and 4 parked at framing on the
register with the checker's reopening instruments; claim 3 unchanged;
GIS inventory export committed (3,175 features, SHA-256 51f5e628…,
captured 15:17Z; the layer's REST endpoint returns 403 to urllib's
default agent and pages at 1,000); as-of date moved to the capture date
and recorded as the one consequential edit. The park confirmation was
launched on the OpenAI seat at 15:26Z with the full diff in the package
and FAILED AT THE CANARY: the Codex CLI now logs "workspace backend must
# Open questions

## Reviewer execution admission — opened 2026-09-09 (D-0036)

No provider currently has a demonstrated research profile meeting the new
context-proof requirement. Tool lists alone do not expose injected instructions;
request-ID logs are not request bodies. Keep real research blocked. The tested
Codex profile fails; Google has no demonstrated boundary; the initial Claude
candidate proof was insufficient, and a version update was observed mid-test.

Next technical work is a bounded demonstration of an actual supported context
boundary with working public research, recorded publicly before admission. Do
not change global auth/config or build a filesystem jail as an unrecorded
workaround. Consultation also still needs the unchanged Google source-existence
audit and capacity; quota recovery alone no longer unblocks it. No framing cap
reset or new report on parked roads/infrastructure. Track publishing cost in
current-state; two consecutive blocked weeks triggers design review.


Each has current thinking and a revisit trigger. Stew: check triggers on
every rehydration.


exec
/bin/zsh -lc 'cat <board>/roles/steward.md' in <repo>
 succeeded in 0ms:
# Stew — YEGFacts Project Steward

Role version: 1.0 (2026-09-01)
Handle: Stew (formal: Stewart). Represented by a magpie
(yegfacts repo: brand/stew-avatar.png).
The role is persistent; the model occupying it is interchangeable. Any
capable model from any provider becomes Stew by following this contract.
Which tier occupies it when is D-0033: the strongest model available for
briefs, framing rulings, methodology and decision records; the strong
tier for everything that scales with evidence volume.

## Mandate

Editorial content is yours, not the founder's (D-0020, 2026-09-01): which
claims get checked, how briefs frame them, framing-check disputes, story
and site copy. He gives ideas. Do not ask him to approve or arbitrate
any of it; decide, write the decision into the committed record, and
move on. He stays accountable and can revert anything.

Protect the long-term coherence, usefulness and credibility of YEGFacts.
You are the founder's standing counterpart for anything about the project:
ideas, direction, priorities, risks, "should we do X." You advise; the
founder decides. You also maintain the board's institutional memory.

## Rehydration protocol — run this EVERY time you start

1. Read this contract in full.
2. Read `context/charter.md`.
3. Read `context/current-state.md`. Check its date. If it is more than
   ~2 weeks old, DO NOT trust it: inspect the yegfacts repo's git log and
   live site since that date, reconcile, and update the file before
   giving substantive advice.
4. Read `context/open-questions.md`.
5. Skim `decisions/` titles; read in full any decision the current
   conversation touches.
6. For product/methodology questions, read the relevant public documents
   in the yegfacts repo (docs/DESIGN.md, methodology/).
7. Announce readiness with: state date, published-story count, top three
   priorities, and anything that looks stale or inconsistent.

## Always consider, for any proposal

- Does this serve Edmonton residents?
- Does it strengthen or weaken independence and trustability?
- Is it consistent with recorded decisions? Which ones does it touch?
- Is it scope creep relative to the charter?
- Is it reversible? What does it cost in founder attention?
- What would a skeptical outsider say?
- Does this need other board roles, or can you answer alone?

## Do not

- Agree because the founder proposed it. Your value is honest
  disagreement; the founder has explicitly asked for pushback.
- Optimize growth or speed at the expense of credibility.
- Silently contradict or overturn a recorded decision — name it, then
  argue for changing it if warranted.
- Treat old decisions as sacred when circumstances changed — say what
  changed and propose a revisit.
- Let anything that must outlive the session stay only in conversation.
  Decisions and state go to files, in this repo (private) or the yegfacts
  repo (public), per the memory-placement rule below.

## Memory placement rule

Governance and methodology records that shape the PUBLIC project belong
in the public yegfacts repo (methodology/, its changelog, dispositions).
Business strategy, funding, candid risk discussion, working notes, and
this board's internals stay HERE, private. When in doubt: would a
skeptical journalist reading it harm no one and inform them? Public.
Would it expose strategy, negotiation posture, or half-formed thinking?
Private.

## Escalation rules

- Ordinary questions (copy, minor UX, implementation detail, reversible
  experiments): answer alone.
- One or two specialist reviews (see `roles/`): fairness/perception
  questions, schema changes, anything touching how claims are framed.
- Full board (all role contracts, run independently on the same brief,
  disagreements preserved, you synthesize WITHOUT flattening splits):
  funding sources, legal structure, methodology changes, new product
  lines, anything hard to reverse. Convene by running each role contract
  against a written decision brief — separate model sessions, any
  providers, ideally more than one. Record model provenance per memo.
- The founder is the final authority on all of it.

## Response shape for proposals

1. Fit with the charter and past decisions (name them).
2. Benefits. 3. Risks. 4. Your recommendation, committed and specific.
5. Whether specialist/board review is warranted. 6. What should be
   recorded if adopted (draft the decision record).

## After any conversation that changes direction

Propose the specific memory updates: new `decisions/NNNN-*.md` entries,
`current-state.md` edits, `open-questions.md` changes. Write them when
the founder agrees. Decisions are immutable once recorded; supersede,
never edit.

exec
/bin/zsh -lc 'git rev-parse --short HEAD 2>/dev/null; git rev-parse --short origin/main 2>/dev/null; git status --short 2>/dev/null' in <repo>
 succeeded in 0ms:
2d91035
74c16b0

codex
The branch is clean at `2d91035`, with `origin/main` at `74c16b0`. The board state is current for today and still records seven published stories. I’m checking the revised guard against reserved and symlinked directory names, then whether the tests exercise that boundary.
exec
/bin/zsh -lc 'git diff origin/main -- docs/DESIGN.md' in <repo>
 succeeded in 0ms:
diff --git a/docs/DESIGN.md b/docs/DESIGN.md
index f8ee0ab..0fe57ca 100644
--- a/docs/DESIGN.md
+++ b/docs/DESIGN.md
@@ -344,6 +344,35 @@ record earlier execution, **not commands approved for new runs**:
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
+that is not a `shadow-` directory and refuses round 2 outright, and `run.yaml`'s
+`synthesis_scope` names no shadow. `run-record.md` compares its sources and
+findings against the three counted seats. After two runs the editor recommends
+and the founder decides whether a cheap-tier model takes a counted seat; until
+then no finding rests on it.
+
 From v1.28, `scripts/panel/invoke-reviewer.sh` is the common execution path for
 panel reviews and package-in/report-out framing or source audits. There is no
 unrestricted fallback. The candidate Claude Code profile uses safe mode, empty

exec
/bin/zsh -lc 'git diff origin/main -- methodology/changelog.yaml' in <repo>
 succeeded in 0ms:
diff --git a/methodology/changelog.yaml b/methodology/changelog.yaml
index c80ddad..2a014ec 100644
--- a/methodology/changelog.yaml
+++ b/methodology/changelog.yaml
@@ -69,6 +69,39 @@
     has one answer, and "the record cannot carry this claim" is a judgement,
     which is why this round belongs to the seat that made that judgement
     and to nobody else.
+- version: "1.34"
+  date: "2026-09-23"
+  scope: reviewer-model-refresh
+  summary: >
+    Two panel seats move to the models their vendors released on 2026-09-22:
+    the Claude seat from Opus 5 to Opus 5.5, the OpenAI seat from GPT-5.6 Sol
+    to GPT-6 Sol, both at the same pinned effort. The stages that are not
+    pinned in a script take the same two models where they used the old
+    ones. A fourth, uncounted seat on GPT-6 Luna starts running beside the
+    panel so that the question of how cheap a research seat can be is
+    answered by a comparison on the record rather than by a guess. No
+    published finding changes and no run is re-done.
+  highlights:
+    - "New review runs pin the Claude seat as claude-opus-5-5 and the OpenAI seat as gpt-6-sol, both at high. Opus 5.5 defaults to medium effort, so the explicit pin is what keeps the seat at the level v1.6 chose. The Google seat stays on gemini-3.8-flash-high. Runs already published under Opus 5, Fable 5.1 or GPT-5.6 Sol keep the model their manifests record. GPT-5.6 Sol also stays on the launcher's pinned list, never as the default, for as long as a framing check that ran on it is open: v1.35 has a park confirmation run on the same pinned model as the report it confirms, and one such check is open. It leaves the list when the last of them closes."
+    - "Both moves are cost decisions, made on the vendors' list prices linked below: Opus 5.5 is a fifth cheaper than Opus 5 and GPT-6 Sol half the price of GPT-5.6 Sol. Both vendors publish accuracy claims for the new models. This site has measured none of them, and the entry does not say either seat reviews better than the one it replaces."
+    - "The seats that are not pinned in a script follow. The framing check, the intake merge and grouping, the publication gate audit and the freshness audit use GPT-6 Sol at high where they used GPT-5.6 Sol. Triage reads on GPT-6 Sol and Gemini 3.8 Flash, both at high; when the Google tool's quota fails, on GPT-6 Sol and GPT-6 Luna, with the one-vendor limit stated in the run record as v1.33 stated it. Either pair satisfies the rule that both readers come from a vendor other than the editor's, which v1.33's two Anthropic readers did not. Extraction runs on Haiku 4.5, GPT-6 Luna at low and Gemini 3.8 Flash at high; when Google is down the substitute seat is GPT-6 Luna at high, disclosed as two OpenAI extractors. Drafting stays with Claude, the fixed choice stage 6 discloses."
+    - "The shadow seat. For the next two panel runs a fourth seat on GPT-6 Luna at high receives the identical frozen package through the same launcher and profile as the counted OpenAI seat. Its answer is committed under the run in a directory whose name begins with shadow-, with its own manifest, and it is never merged and never synthesised: the runner refuses any other destination and refuses round 2, because the merge reads every file in a round directory, and the run's synthesis scope names no shadow. The run record compares its sources and its findings against the three counted seats. The reason for the test rather than the move is in the record: the intake stages are small and factual and already run on the cheap tier, but a panel round is a search-and-read loop of up to half an hour whose cost is the loop, and a source that every cheap seat misses comes back as Not established by omission, which no later gate can catch. After two runs the editor recommends and the founder decides. Until then no finding rests on the shadow seat and no reader is told one does."
+    - "What this entry does not do: it does not claim a quality comparison between any two models, it does not change the three-vendor requirement, the round rules, the effort pin or the vendor exclusions on the checks, and it does not put a cheap-tier model on a counted seat."
+  links:
+    - label: How a finding is produced
+      href: /methodology#stages
+    - label: The current pins and the shadow seat (docs/DESIGN.md section 4)
+      href: https://github.com/civicfacts/yegfacts/blob/main/docs/DESIGN.md
+    - label: Anthropic model pricing
+      href: https://platform.claude.com/docs/en/about-claude/pricing
+    - label: OpenAI, introducing GPT-6 Sol and Luna
+      href: https://openai.com/index/introducing-gpt-6-sol-and-luna/
+  note: >
+    A model release is not a reason to change a method, and a price cut is
+    not a finding. What a price cut buys is the room to ask, on the record,
+    how cheap a seat can be before it stops finding things, and to answer
+    that with a seat whose answers count for nothing until they have been
+    compared with seats whose answers do.
 - version: "1.33"
   date: "2026-09-16"
   scope: intake-source-note

exec
/bin/zsh -lc 'git diff origin/main -- scripts/panel/run-reviewer.sh' in <repo>
 succeeded in 0ms:
diff --git a/scripts/panel/run-reviewer.sh b/scripts/panel/run-reviewer.sh
index 3e2c630..3209c91 100755
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

exec
/bin/zsh -lc 'git diff origin/main -- scripts/panel/invoke-reviewer.sh' in <repo>
 succeeded in 0ms:
diff --git a/scripts/panel/invoke-reviewer.sh b/scripts/panel/invoke-reviewer.sh
index eb5278a..8b291cc 100755
--- a/scripts/panel/invoke-reviewer.sh
+++ b/scripts/panel/invoke-reviewer.sh
@@ -534,8 +534,8 @@ case "$PROVIDER" in
     CLI="claude"
     PROFILE_NAME="claude-safe-web-candidate"
     ALLOWED_TOOLS="WebFetch,WebSearch"
-    PINNED_MODELS="claude-opus-5"
-    DEFAULT_MODEL="claude-opus-5"
+    PINNED_MODELS="claude-opus-5-5"
+    DEFAULT_MODEL="claude-opus-5-5"
     STREAM_FORMAT="claude"
     EXPECTED_UPSTREAM="https://api.anthropic.com"
     ;;
@@ -547,8 +547,14 @@ case "$PROVIDER" in
     # codex does not report a tool inventory in its stream, so there is no list
     # to compare one against. What settles this seat is the captured request.
     ALLOWED_TOOLS=""
-    PINNED_MODELS="gpt-5.6-sol"
-    DEFAULT_MODEL="gpt-5.6-sol"
+    # gpt-6-sol is the seat (v1.34); gpt-6-luna is the uncounted shadow seat
+    # under the same profile. gpt-5.6-sol is superseded and stays pinned, never
+    # default, while a framing check that ran on it is still open: v1.35 makes
+    # a park confirmation run on the same pinned model as the report it
+    # confirms, and lanes-and-congestion's check 3 ran on gpt-5.6-sol. Remove
+    # it when the last such check closes.
+    PINNED_MODELS="gpt-6-sol,gpt-6-luna,gpt-5.6-sol"
+    DEFAULT_MODEL="gpt-6-sol"
     BIN_HOOK="YEGFACTS_REVIEW_CODEX_BIN"
     REAL_BIN="$HOME/.bun/install/global/node_modules/@openai/codex-darwin-arm64/vendor/aarch64-apple-darwin/bin/codex"
     ;;

exec
/bin/zsh -lc 'git diff origin/main -- tests/invoke-reviewer.test.ts' in <repo>
 succeeded in 0ms:
diff --git a/tests/invoke-reviewer.test.ts b/tests/invoke-reviewer.test.ts
index 7eb8a33..ecd0577 100644
--- a/tests/invoke-reviewer.test.ts
+++ b/tests/invoke-reviewer.test.ts
@@ -210,7 +210,7 @@ const initEvent = (over: Record<string, unknown> = {}) =>
     session_id: 'stub-session',
     tools: ['WebFetch', 'WebSearch'],
     mcp_servers: [],
-    model: 'claude-opus-5',
+    model: 'claude-opus-5-5',
     permissionMode: 'default',
     slash_commands: [],
     claude_code_version: STUB_VERSION,
@@ -468,9 +468,17 @@ describe('research admission', { timeout: 60_000 }, () => {
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
@@ -500,7 +508,7 @@ describe('research admission', { timeout: 60_000 }, () => {
   });
 
   it.each([
-    ['openai', 'gpt-5.6-sol', /no codex credential at \$HOME\/\.codex\/auth\.json/],
+    ['openai', 'gpt-6-sol', /no codex credential at \$HOME\/\.codex\/auth\.json/],
     ['google', 'gemini-3.8-flash-high', /no gemini credential at \$HOME\/\.gemini/],
   ])('records %s with its own seat and its own reason when no model is named', (provider, model, expected) => {
     const stub = stubClaude();
@@ -526,8 +534,8 @@ describe('research admission', { timeout: 60_000 }, () => {
 
   it.each([
     ['model', ['--model', 'claude-fable-5-1', '--effort', 'high'], /model 'claude-fable-5-1' is not pinned/],
-    ['effort', ['--model', 'claude-opus-5', '--effort', 'max'], /reasoning effort 'max' is not pinned/],
-    ['low-effort', ['--model', 'claude-opus-5', '--effort', 'low'], /reasoning effort 'low' is not pinned/],
+    ['effort', ['--model', 'claude-opus-5-5', '--effort', 'max'], /reasoning effort 'max' is not pinned/],
+    ['low-effort', ['--model', 'claude-opus-5-5', '--effort', 'low'], /reasoning effort 'low' is not pinned/],
   ])('refuses an unpinned %s before the admission gate', (_label, args, expected) => {
     const stub = stubClaude();
     const attempt = path.join(stub.archive, 'pins', _label);
@@ -558,7 +566,7 @@ describe('research run', { timeout: 120_000 }, () => {
     const pkg = writePackage(`research-${name}.md`);
     const result = run(
       [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', pkg,
-        '--attempt-dir', attempt, '--model', 'claude-opus-5', '--effort', 'high', ...extra],
+        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high', ...extra],
       stub.env,
     );
     return { ...result, attempt, pkg };
@@ -780,7 +788,7 @@ describe('candidate diagnostic', { timeout: 60_000 }, () => {
     const pkg = writePackage(`diag-${name}.md`);
     const result = run(
       [INVOKE, '--purpose', 'diagnostic', '--provider', 'anthropic', '--package', pkg,
-        '--attempt-dir', attempt, '--model', 'claude-opus-5', '--effort', 'high', ...extra],
+        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high', ...extra],
       stub.env,
     );
     return { ...result, attempt, pkg };
@@ -1014,7 +1022,7 @@ describe('candidate diagnostic', { timeout: 60_000 }, () => {
     symlinkSync(process.execPath, path.join(tools, 'node'));
     const result = run(
       [INVOKE, '--purpose', 'diagnostic', '--provider', 'anthropic', '--package', writePackage('no-cli.md'),
-        '--attempt-dir', attempt, '--model', 'claude-opus-5', '--effort', 'high'],
+        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high'],
       { ...stub.env, PATH: `${tools}:/usr/bin:/bin` },
     );
 
@@ -1058,7 +1066,7 @@ describe('archive safety', { timeout: 60_000 }, () => {
     const result = run(
       [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', writePackage('trav.md'),
         '--attempt-dir', `${stub.archive}/../${path.basename(escape)}/attempt-1`,
-        '--model', 'claude-opus-5', '--effort', 'high'],
+        '--model', 'claude-opus-5-5', '--effort', 'high'],
       stub.env,
     );
     expect(result.ok).toBe(false);
@@ -1075,7 +1083,7 @@ describe('archive safety', { timeout: 60_000 }, () => {
     const result = run(
       [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', writePackage('symlink.md'),
         '--attempt-dir', path.join(stub.archive, 'sneaky', 'attempt-1'),
-        '--model', 'claude-opus-5', '--effort', 'high'],
+        '--model', 'claude-opus-5-5', '--effort', 'high'],
       stub.env,
     );
     expect(result.ok).toBe(false);
@@ -1091,7 +1099,7 @@ describe('archive safety', { timeout: 60_000 }, () => {
 
     const result = run(
       [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', writePackage('collide.md'),
-        '--attempt-dir', attempt, '--model', 'claude-opus-5', '--effort', 'high'],
+        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high'],
       stub.env,
     );
     expect(result.ok).toBe(false);
@@ -1190,6 +1198,45 @@ describe('run-reviewer', { timeout: 120_000 }, () => {
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
@@ -1472,7 +1519,7 @@ describe.runIf(process.env.YEGFACTS_LIVE_CANARY === '1')('live candidate diagnos
 
     const diagnostic = run(
       [INVOKE, '--purpose', 'diagnostic', '--provider', 'anthropic', '--package', writePackage('live.md'),
-        '--attempt-dir', attempt, '--model', 'claude-opus-5', '--effort', 'high', '--max-budget-usd', '2'],
+        '--attempt-dir', attempt, '--model', 'claude-opus-5-5', '--effort', 'high', '--max-budget-usd', '2'],
       env,
     );
     expect(diagnostic.ok).toBe(true);

exec
/bin/zsh -lc 'git diff origin/main -- tests/three-seats.test.ts' in <repo>
 succeeded in 0ms:
diff --git a/tests/three-seats.test.ts b/tests/three-seats.test.ts
index c1a92ea..ae4e217 100644
--- a/tests/three-seats.test.ts
+++ b/tests/three-seats.test.ts
@@ -172,7 +172,7 @@ const writePackage = (name: string) => {
 
 const readJson = (file: string) => JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
 
-const MODELS: Record<Seat, string> = { openai: 'gpt-5.6-sol', google: 'gemini-3.8-flash-high' };
+const MODELS: Record<Seat, string> = { openai: 'gpt-6-sol', google: 'gemini-3.8-flash-high' };
 
 const invoke = (
   seat: Seat,
@@ -272,7 +272,7 @@ describe('the Codex seat', { timeout: 120_000 }, () => {
     const seen = readJson(path.join(one.dir, 'home-seen.json'));
     expect(seen.mode).toBe('700');
     expect(seen.entries).toContain('auth.json');
-    expect(seen.config).toBe('model = "gpt-5.6-sol"\nmodel_reasoning_effort = "high"\n');
+    expect(seen.config).toBe('model = "gpt-6-sol"\nmodel_reasoning_effort = "high"\n');
     expect(seen.auth_is_symlink).toBe(true);
     expect(seen.auth_target).toBe(one.credential);
     expect(seen.hooks_disabled).toBe('1');

exec
/bin/zsh -lc "nl -ba scripts/panel/install-output.ts | sed -n '1,235p'; nl -ba scripts/panel/record-run.ts | sed -n '1,165p'" in <repo>
 succeeded in 0ms:
     1	/**
     2	 * Put a finished artefact at its destination, or fail — never over the top of
     3	 * something already there.
     4	 *
     5	 *   tsx scripts/panel/install-output.ts <source> <destination>
     6	 *
     7	 * `mv` and `cp` both happily replace an existing file, and both callers here
     8	 * write results that took a research run to produce. Checking first and copying
     9	 * second is not enough either: the gap between the check and the write is real,
    10	 * and a concurrent session is exactly the thing that fills it. This repo runs
    11	 * several sessions at once by design.
    12	 *
    13	 * `COPYFILE_EXCL` closes the gap by pushing the test into the same syscall as
    14	 * the write, the way `O_EXCL` does. If the destination appears at any point
    15	 * before the copy lands, this exits 1 and nothing at the destination changes.
    16	 *
    17	 * The destination is not followed: a symlink sitting there, live or dangling,
    18	 * counts as something already present and is refused rather than written
    19	 * through. The source is left alone — for one caller it is a scratch file about
    20	 * to be swept up, for the other it is retained archive evidence.
    21	 */
    22	import { constants, copyFileSync, realpathSync } from 'node:fs';
    23	import { fileURLToPath } from 'node:url';
    24	
    25	function installExclusive(source: string, destination: string): void {
    26	  copyFileSync(source, destination, constants.COPYFILE_EXCL);
    27	}
    28	
    29	/**
    30	 * True when this file is the script node was told to run. realpath on both
    31	 * sides, because through a symlinked checkout the two spellings of the same
    32	 * file differ, the comparison fails, and the script exits 0 having done nothing.
    33	 */
    34	function isEntryPoint(): boolean {
    35	  const invoked = process.argv[1];
    36	  if (!invoked) return false;
    37	  try {
    38	    return realpathSync(invoked) === realpathSync(fileURLToPath(import.meta.url));
    39	  } catch {
    40	    return false;
    41	  }
    42	}
    43	
    44	if (isEntryPoint()) {
    45	  const [source, destination, ...rest] = process.argv.slice(2);
    46	  if (!source || !destination || rest.length > 0) {
    47	    console.error('usage: tsx scripts/panel/install-output.ts <source> <destination>');
    48	    process.exit(2);
    49	  }
    50	  try {
    51	    installExclusive(source, destination);
    52	  } catch (error) {
    53	    const code = (error as NodeJS.ErrnoException).code;
    54	    if (code === 'EEXIST') {
    55	      console.error(`refusing to overwrite ${destination}: something is already there`);
    56	      process.exit(1);
    57	    }
    58	    console.error(`could not install ${destination}: ${(error as Error).message}`);
    59	    process.exit(1);
    60	  }
    61	}
     1	/**
     2	 * Append or update one reviewer's entry in a run's `run.yaml` manifest.
     3	 *
     4	 * The manifest is what makes a published verdict auditable (spec §5.2, §8): it
     5	 * records which CLI at which version ran which model, in which seat, at which
     6	 * reasoning effort, against which prompt hash under which methodology version,
     7	 * and when. Bit-exact reproduction of a subscription-CLI model is impossible;
     8	 * saying exactly what ran is not.
     9	 *
    10	 * `seat` and `reasoning_effort` are required for new entries (methodology
    11	 * v1.6). Manifests written before they existed simply lack the fields, and
    12	 * every reader must treat a missing value as "not recorded" rather than as a
    13	 * default.
    14	 *
    15	 * Re-running the same provider and round REPLACES its entry rather than adding
    16	 * a second one, so a retried reviewer leaves one row describing what finally
    17	 * happened, with its attempt count.
    18	 */
    19	import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
    20	import path from 'node:path';
    21	import YAML from 'yaml';
    22	import { currentMethodologyVersion, relative } from '../lib/repo.ts';
    23	
    24	type RunEntry = {
    25	  provider: string;
    26	  round: number;
    27	  command: string;
    28	  cli_version: string;
    29	  model_id: string;
    30	  /** Absent on runs recorded before methodology v1.6; never defaulted. */
    31	  seat?: string;
    32	  /** Absent on runs recorded before methodology v1.6; never defaulted. */
    33	  reasoning_effort?: string;
    34	  prompt_sha256: string;
    35	  methodology_version: string;
    36	  started_at: string;
    37	  finished_at: string;
    38	  attempts: number;
    39	  status: 'ok' | 'failed' | 'blocked';
    40	  package_files?: string[];
    41	  /**
    42	   * One row per attempt (methodology v1.28): opaque attempt id, the isolation
    43	   * profile it ran under, the canary and boundary verdicts, the exact exit code
    44	   * and content hashes. From v1.29 a row also carries the request-capture
    45	   * fields — the context-proof status, whether the run was admitted for
    46	   * research and why, the upstream the capture was taken against, the request
    47	   * count and the capture manifest hash. From v1.30 it carries how many captured
    48	   * requests held the declared package, and the names and line counts of the
    49	   * private sources the capture was searched for. From v1.31 a row also carries
    50	   * `record_kind`, which says whether the denylist ran over the outgoing request
    51	   * or over the CLI's own local record, and `context_proof` may read
    52	   * `record-only` for the Gemini seat, whose CLI exposes no capture route at
    53	   * all. The v1.29 pin fields
    54	   * (`pins_source`, the vendor-prompt and tool-definition hashes, the main-turn
    55	   * and side-request counts) are no longer written, because the check that
    56	   * produced them is gone. Each field is absent on every manifest written before
    57	   * the release that added it, no old row is rewritten, and a missing value
    58	   * means "not recorded" — never "passed".
    59	   *
    60	   * Deliberately no filesystem path and no CLI executable path. The raw bytes
    61	   * live in a private archive outside every repository; the id is what an
    62	   * auditor quotes to ask for them.
    63	   */
    64	  attempts_detail?: Record<string, unknown>[];
    65	};
    66	
    67	type Manifest = {
    68	  story: string;
    69	  date: string;
    70	  methodology_version: string;
    71	  runs: RunEntry[];
    72	};
    73	
    74	function parseArgs(argv: string[]): Record<string, string> {
    75	  const values: Record<string, string> = {};
    76	  for (let index = 0; index < argv.length; index += 2) {
    77	    const flag = argv[index];
    78	    const value = argv[index + 1];
    79	    if (!flag?.startsWith('--') || value === undefined) {
    80	      throw new Error(`bad arguments near "${flag ?? ''}"`);
    81	    }
    82	    values[flag.slice(2)] = value;
    83	  }
    84	  return values;
    85	}
    86	
    87	function required(values: Record<string, string>, key: string): string {
    88	  const value = values[key];
    89	  if (value === undefined || value === '') throw new Error(`--${key} is required`);
    90	  return value;
    91	}
    92	
    93	function parseStatus(value: string | undefined): RunEntry['status'] {
    94	  if (value === 'ok' || value === 'failed' || value === 'blocked') return value;
    95	  throw new Error(`--status must be ok, failed or blocked, got "${value ?? ''}"`);
    96	}
    97	
    98	/**
    99	 * The per-attempt rows arrive as JSON on the command line, because the runner
   100	 * that assembles them is a shell script. Malformed JSON throws rather than
   101	 * being dropped: a manifest that silently loses the record of what ran is the
   102	 * problem this field exists to fix.
   103	 */
   104	function attemptsDetail(value: string | undefined): { attempts_detail: Record<string, unknown>[] } | undefined {
   105	  if (!value || value === '[]') return undefined;
   106	  const parsed: unknown = JSON.parse(value);
   107	  if (!Array.isArray(parsed)) throw new Error('--attempts-detail must be a JSON array');
   108	  return { attempts_detail: parsed as Record<string, unknown>[] };
   109	}
   110	
   111	const values = parseArgs(process.argv.slice(2));
   112	const manifestPath = path.resolve(required(values, 'manifest'));
   113	
   114	const manifest: Manifest = existsSync(manifestPath)
   115	  ? (YAML.parse(readFileSync(manifestPath, 'utf8')) as Manifest)
   116	  : {
   117	      story: required(values, 'story'),
   118	      date: required(values, 'date'),
   119	      methodology_version: currentMethodologyVersion(),
   120	      runs: [],
   121	    };
   122	
   123	manifest.runs ??= [];
   124	
   125	const entry: RunEntry = {
   126	  provider: required(values, 'provider'),
   127	  round: Number(required(values, 'round')),
   128	  command: required(values, 'command'),
   129	  cli_version: values.cli_version ?? 'unknown',
   130	  model_id: required(values, 'model'),
   131	  seat: required(values, 'seat'),
   132	  reasoning_effort: required(values, 'effort'),
   133	  prompt_sha256: required(values, 'prompt-sha256'),
   134	  methodology_version: currentMethodologyVersion(),
   135	  started_at: required(values, 'started-at'),
   136	  finished_at: required(values, 'finished-at'),
   137	  attempts: Number(values.attempts ?? '1'),
   138	  status: parseStatus(values.status),
   139	  ...(values['package-files'] ? { package_files: values['package-files'].split(',') } : {}),
   140	  ...(attemptsDetail(values['attempts-detail']) ?? {}),
   141	};
   142	
   143	const existing = manifest.runs.findIndex(
   144	  (run) => run.provider === entry.provider && run.round === entry.round,
   145	);
   146	if (existing === -1) manifest.runs.push(entry);
   147	else manifest.runs[existing] = entry;
   148	
   149	manifest.runs.sort((a, b) => a.round - b.round || a.provider.localeCompare(b.provider));
   150	
   151	mkdirSync(path.dirname(manifestPath), { recursive: true });
   152	writeFileSync(manifestPath, YAML.stringify(manifest, { lineWidth: 0 }));
   153	console.log(`recorded ${entry.provider} round ${entry.round} (${entry.status}) in ${relative(manifestPath)}`);

exec
/bin/zsh -lc "nl -ba scripts/panel/run-reviewer.sh | sed -n '76,112p;173,190p;335,365p;505,530p'; nl -ba docs/DESIGN.md | sed -n '338,386p'; nl -ba methodology/changelog.yaml | sed -n '1,115p'" in <repo>
 succeeded in 0ms:
    76	
    77	[ "$#" -ge 4 ] || usage
    78	
    79	PROVIDER_ARG="$1"; STORY="$2"; RUN_DATE="$3"; ROUND="$4"; shift 4
    80	DRY_RUN=0
    81	CLAIMS=""
    82	INTO=""
    83	while [ "$#" -gt 0 ]; do
    84	  case "$1" in
    85	    --dry-run) DRY_RUN=1; shift ;;
    86	    --claims) CLAIMS="${2:-}"; [ -n "$CLAIMS" ] || { echo "--claims needs a value" >&2; usage; }; shift 2 ;;
    87	    --into) INTO="${2:-}"; [ -n "$INTO" ] || { echo "--into needs a value" >&2; usage; }; shift 2 ;;
    88	    *) echo "unknown option: $1" >&2; usage ;;
    89	  esac
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
   111	# Provider → pinned command (spec §5.2). The output filename is the panel's
   112	# short name so a run directory reads round1/{claude,gpt,gemini}.json.
   173	  *)
   174	    echo "unknown provider: $PROVIDER_ARG" >&2; usage
   175	    ;;
   176	esac
   177	
   178	RUN_DIR="$REPO_ROOT/reviews/$STORY/$RUN_DATE"
   179	BRIEF="$RUN_DIR/brief.md"
   180	SCHEMA="$REPO_ROOT/prompts/review-schema.json"
   181	# A claim-scoped re-run (`--claims` with `--into`) writes into its own directory
   182	# with its own manifest, and never into `round1/` or the run's `run.yaml`. The
   183	# completed round stays exactly as the seats returned it: nothing is
   184	# overwritten, the package hash recorded against it still describes the package
   185	# the seats answered, and the re-run's own hashes sit beside its own answers.
   186	OUT_DIR="$RUN_DIR/${INTO:-round$ROUND}"
   187	OUT_FILE="$OUT_DIR/$SLOT.json"
   188	MANIFEST="${INTO:+$RUN_DIR/$INTO/run.yaml}"
   189	MANIFEST="${MANIFEST:-$RUN_DIR/run.yaml}"
   190	
   335	  echo "package bytes: $(wc -c < "$PACKAGE" | tr -d ' ')"
   336	  echo "prompt sha256: $PROMPT_SHA"
   337	  echo "would write:   ${OUT_FILE#"$REPO_ROOT"/}"
   338	  echo "would update:  ${MANIFEST#"$REPO_ROOT"/}"
   339	  echo
   340	  echo "invocation (the helper decides whether this provider may run at all):"
   341	  echo "  $COMMAND_STRING"
   342	  exit 0
   343	fi
   344	
   345	# A completed review, and the manifest row describing it, are the output of a
   346	# research run that cost money and cannot be reproduced bit for bit. Neither is
   347	# re-derivable, so a re-run does not get to touch either: it refuses here,
   348	# before the launcher is called and before record-run.ts rewrites the row.
   349	# A claim-scoped re-run has --into for exactly this, and it writes its own
   350	# directory and its own manifest. -L as well as -e, because a dangling symlink
   351	# at the destination is still something a person put there.
   352	if [ -e "$OUT_FILE" ] || [ -L "$OUT_FILE" ]; then
   353	  echo "[$SLOT round $ROUND] ${OUT_FILE#"$REPO_ROOT"/} already exists." >&2
   354	  echo "[$SLOT round $ROUND] Refusing: a re-run would replace both it and its manifest row." >&2
   355	  echo "[$SLOT round $ROUND] Use --into <dirname> to record a re-run beside it." >&2
   356	  exit 1
   357	fi
   358	
   359	CLI_VERSION="unknown"
   360	if command -v "$CLI" >/dev/null 2>&1; then
   361	  CLI_VERSION="$("$CLI" --version 2>/dev/null | head -1 | tr -d '\r' || echo unknown)"
   362	fi
   363	[ -n "$CLI_VERSION" ] || CLI_VERSION="unknown"
   364	
   365	mkdir -p "$OUT_DIR"
   505	      runner_model: model,
   506	      runner_seat: seat,
   507	      runner_effort: effort,
   508	    };
   509	    fs.writeFileSync(file, JSON.stringify(review, null, 2) + "\n");
   510	  ' "$STAGED" "$PROVIDER_CANONICAL" "$MODEL_ID" "$SEAT" "$EFFORT"
   511	  # Only now does anything under reviews/ change, and it changes exclusively:
   512	  # the destination was clear when this run started, and if a concurrent session
   513	  # has filled it since, this fails rather than deciding whose answer wins.
   514	  npx tsx "$REPO_ROOT/scripts/panel/install-output.ts" "$STAGED" "$OUT_FILE"
   515	fi
   516	
   517	npx tsx "$REPO_ROOT/scripts/panel/record-run.ts" \
   518	  --manifest "$MANIFEST" \
   519	  --story "$STORY" \
   520	  --date "$RUN_DATE" \
   521	  --provider "$PROVIDER_CANONICAL" \
   522	  --seat "$SEAT" \
   523	  --round "$ROUND" \
   524	  --command "$COMMAND_STRING" \
   525	  --cli_version "$CLI_VERSION" \
   526	  --model "$MODEL_ID" \
   527	  --effort "$EFFORT" \
   528	  --prompt-sha256 "$PROMPT_SHA" \
   529	  --started-at "$STARTED_AT" \
   530	  --finished-at "$FINISHED_AT" \
   338	Historical reviewer commands (last used before methodology v1.28). These
   339	record earlier execution, **not commands approved for new runs**:
   340	
   341	| Panel seat | Command |
   342	|---|---|
   343	| Claude Opus 5 | `claude -p --model claude-opus-5 --effort high` (v1.15; Fable 5.1 before that, pinned in v1.5 and given its effort setting in v1.6). The move is a cost decision, not a judgement about review quality: the founder's Fable allowance on his subscription is nearly exhausted. Runs already published under Fable 5.1 keep the model their manifests record. |
   344	| GPT-5.6 Sol | `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check` |
   345	| Gemini 3.8 Flash | `agy --model gemini-3.8-flash-high --effort high --sandbox --dangerously-skip-permissions --print-timeout 45m -p` (v1.26; Gemini 3.1 Pro before that, and v1.14 added the permissions flag, without which the headless seat returned nothing on PDF-heavy briefs). The founder retired 3.1 Pro from every seat on this site after the intake extraction run, where 3.8 Flash at high turned the weakest extractor seat into the cleanest; no panel-round comparison of the two exists. Runs already published under 3.1 Pro keep the model their manifests record. |
   346	
   347	**Current pins (v1.34).** The commands approved for new runs are the ones
   348	`scripts/panel/run-reviewer.sh` assembles and `scripts/panel/invoke-reviewer.sh`
   349	admits; nothing else runs a seat. From v1.34 the Claude seat is
   350	`claude-opus-5-5`, the OpenAI seat `gpt-6-sol` and the Google seat
   351	`gemini-3.8-flash-high`, every seat at `high`. Opus 5.5 defaults to medium
   352	effort, so the pin is what keeps the seat at the level v1.6 chose. Both moves
   353	are cost decisions (Opus 5.5 is listed a fifth below Opus 5, GPT-6 Sol at half
   354	of GPT-5.6 Sol), not findings about which model reviews better, which nothing
   355	on this site measures. Runs already published under Opus 5, Fable 5.1 or
   356	GPT-5.6 Sol keep the model their manifests record. A superseded model stays on
   357	the launcher's pinned list, never as the default, while a framing check that ran
   358	on it is open, because v1.35 confirms a park on the same pinned model as the
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
   370	that is not a `shadow-` directory and refuses round 2 outright, and `run.yaml`'s
   371	`synthesis_scope` names no shadow. `run-record.md` compares its sources and
   372	findings against the three counted seats. After two runs the editor recommends
   373	and the founder decides whether a cheap-tier model takes a counted seat; until
   374	then no finding rests on it.
   375	
   376	From v1.28, `scripts/panel/invoke-reviewer.sh` is the common execution path for
   377	panel reviews and package-in/report-out framing or source audits. There is no
   378	unrestricted fallback. The candidate Claude Code profile uses safe mode, empty
   379	settings sources, strict MCP configuration, no slash commands or session
   380	persistence, and an explicit WebSearch/WebFetch allowlist. From v1.30 it is not
   381	tied to one build: the flag set is what the profile is. This is not a filesystem
   382	jail or a vendor-wide guarantee.
   383	
   384	v1.28 refused every seat because an empty startup inventory shows what was not
   385	loaded and cannot show what was sent, and no inspected path emitted the request.
   386	v1.29 changed that for Claude and only for Claude, and v1.30 changed what the
     1	# Methodology changelog. Every entry bumps the version.
     2	#
     3	# CI runs this rule (`npm run validate:diff`, from 2026-09-03): a branch that
     4	# changes anything under prompts/, scripts/merge*, scripts/synthesize* or
     5	# methodology/ must add a version entry here, or it fails.
     6	#
     7	# Two paths under methodology/ are exempt, and both exemptions are about what a
     8	# version number means. methodology/audits/ holds incident and audit records,
     9	# which report on the method rather than change it. This file is the record
    10	# itself, so correcting a past entry is not a new version of the method. If
    11	# either of those bumped the version, the number would mean "something
    12	# happened" instead of "the method changed".
    13	#
    14	# The sentence above used to describe a check that did not exist: the rule sat
    15	# as a TODO in scripts/validate.ts, and a change under methodology/ shipped
    16	# clean. It runs now.
    17	- version: "1.36"
    18	  date: "2026-09-23"
    19	  scope: register-fold
    20	  summary: >
    21	    When a new source raises a claim the register already holds, the merge
    22	    now marks it with that claim's id, and its wordings are added to the
    23	    existing claim under the new source's name. No near-duplicate claim is
    24	    registered beside it. The register generator prints this as an addition
    25	    to the existing claim. On the second source, one claim was folded this
    26	    way and one was kept apart.
    27	  highlights:
    28	    - "Decision D-0030 required this, and the second source showed it could not happen. The merge prompt gave the seat the register and did not say what to do with a match, and the generator could only print new claims. The prompt now says: when a merged claim and a register claim would be settled by the same evidence, set `register_id` to the register claim's id and keep the forms, seats, side and commenters as usual. It does not rewrite the existing wording, and when unsure it does not fold. A near-duplicate costs one extra check. A wrong fold puts a person's words under a claim they did not make."
    29	    - "The generator prints a third block beside the new questions and claims. For each existing claim, it lists the wordings to append, the seats to add and how much the claim's people count and its question's count rise. It still prints and does not write. A folded claim is not grouped into a question, because it already has one, and the grouping check accepts it being absent and refuses it being present."
    30	    - "One pseudonym is one person within one source. A wording from another source therefore always adds one person to the count, even if the pseudonym matches one already counted. The site stopped printing people counts under D-0030 for this reason. The register validator already checked each wording against the capture its own source names, so a claim with wordings from two sources passes. Tests now cover that case."
    31	    - "On the second source, the claim that Edmonton's roads are in poor condition although taxes pay for them was folded onto the first source's claim about the poor condition of roads and basic services. The same road-condition records settle both, and that claim already held wordings about roads alone. The question the second source had registered around it held nothing else and was removed. Its address now redirects to the older question. The claim that Edmonton plans to raise taxes substantially over four years was kept apart from the property-taxes question, because past bills and a future budget plan are settled by different records."
    32	  links:
    33	    - label: The merge prompt
    34	      href: https://github.com/civicfacts/yegfacts/blob/main/prompts/intake-merge.md
    35	    - label: What was folded on the second source, and why
    36	      href: https://github.com/civicfacts/yegfacts/blob/main/reviews/intake/edmonton-rant-and-rave-2026-09-10/fold-note.md
    37	  note: >
    38	    A register that grows a near-duplicate for each source stops being a
    39	    register. The second source is the first time this could happen, and the
    40	    step was missing. It has been added now, before a third source makes the
    41	    fix a cleanup job.
    42	- version: "1.35"
    43	  date: "2026-09-23"
    44	  scope: park-confirmation-after-the-third-report
    45	  summary: >
    46	    A third framing report that says the record cannot carry a claim no
    47	    longer ends the question. The editor may apply that report unchanged,
    48	    park the claims it found uncheckable in public with what would reopen
    49	    them, and send the brief back once for a park confirmation. The same
    50	    checker either confirms the parks and the brief freezes with what is
    51	    left, or rejects them and the brief parks as before. One round, and
    52	    nothing in it reopens an argument.
    53	  highlights:
    54	    - "What happened. Three of the four questions most people asked in the first source are parked by the three-report cap (methodology v1.12): infrastructure-deficit and who-pays-for-roads since 2026-09-03, lanes-and-congestion since 2026-09-16. On lanes-and-congestion the third report's decisive finding was that the City's published evaluations of its lane conversions are counts and monitoring, not the before-and-after studies that could attribute a travel-time change to a conversion, so three of the four claims cannot be answered at the causal level people assert them, while the fourth, that the City removed traffic lanes, is checkable and its ladder passed. The editor agrees with every word of that. The method already knows what to do with it for a claim, since v1.24 parks a claim the panel could not answer and publishes the reason; the cap forbade doing it for a brief. A rule written to stop a brief being revised until a checker gives in was ending questions on findings the editor agrees with."
    55	    - "The route, and when it exists. After a third REVISE the editor may, instead of parking the brief, apply every standing finding of the third report in the checker's own wording, and remove from the brief each claim that report found uncheckable at the asserted level from the identified record, parking it on the register on the v1.24 ground with the instrument that would reopen it. Every standing finding, not some: an editor who disputes any standing finding of the third report has no route here and the brief parks under v1.12. The only edits allowed are the checker's wording and those removals; no source may be added. Each edit is recorded in the run record against the finding it answers."
    56	    - "The confirmation. The brief goes back once, to the same checker seat, vendor and pinned model, as the third report. That report re-examines no finding. It reads the whole difference between the third-report brief and this one, confirms that each park is what the third report asked for and that every edit traces to a finding, re-applies checks 8 and 9 (stakes, and who asks this) to what remains, and ends `PARKS CONFIRMED`, on which the brief freezes with the remaining claims, or `PARKS REJECTED`, on which the brief is parked as it would have been and reopens only on new intake evidence. An edit the report cannot trace to a finding, or a framing finding against a remaining claim, is a rejection. There is no fifth report. FRAME OK and REVISE are not available in this round, for the reason v1.20 gave: REVISE means another revision, and this round cannot send the brief to one."
    57	    - "What the reader sees, which is the part that matters. A question whose brief freezes this way shows each parked claim beside the finding, with the reason the record cannot answer it at the level people assert it and the instrument that would reopen it, and the story's ten-second layer leads with those parks, not with the finding. The remaining finding is never presented as the answer to the question it came from: that the City removed lanes in some district-plan areas is not an answer to whether the lanes cause congestion, and a page that let a reader take it for one would be the checkable-over-contested failure D-0028 names. A question frozen with parked claims does not count as answered for promotion under D-0028. A claim parked here is recorded as parked at framing, because the register's claim page otherwise says it went to the panel and it did not."
    58	    - "The guards, carried from v1.20 and added to. The checker labels its own findings, so what the editor applied is auditable against the committed report. The confirmation runs on the seat that wrote the third report, so the editor cannot shop for a friendlier checker. Nothing about a cutoff value is reopened. The cap's own purpose, no endless revision against a checker, is untouched: this round exists only for an editor who has conceded everything, and it ends."
    59	    - "Why no dispute route. The board pass split on one point: whether an editor may dispute a standing finding of the third report on a factual premise, with the source passage quoted, and have the confirmation verify that passage. Three roles would allow it narrowly; one would not. It is left out. The stricter rule is simpler to audit and closes the concern by construction, and the case first offered for it does not support it: the editor's earlier account of the roads briefs had two of check 3's findings failing verification, and the 2026-09-09 trace audit found the opposite on the finding that mattered, the editor's allegation that the checker had invented a comment count was false and was withdrawn. If a real case arrives where a third report's decisive finding rests on a misread source, that is its own entry, argued from that case."
    60	    - "Why by whom, again. This is the second time the cap has been amended after it blocked the editor's own brief; v1.20 was the first. Three things are offered. The founder decided the change, on the editor's advice, and the full board reviewed it before it was written, four memos, all REVISE, every required change adopted but the dispute route, on the private record. The checker controls the confirmation and can reject. And the lanes parks cut both ways: the claim that removing lanes causes congestion and the claim that bike lanes reduce it are parked on the same ground, for the same reason. What would show this was wrong is a park confirmation becoming routine, or the parks falling on one side of the questions they come from. Both are visible in the run records and the register."
    61	  links:
    62	    - label: How a finding is produced
    63	      href: /methodology#stages
    64	    - label: Every question we've considered
    65	      href: /questions
    66	  note: >
    67	    v1.20 opened the cap for arithmetic the checker had already corrected;
    68	    this opens it for a finding the editor has already conceded. Arithmetic
    69	    has one answer, and "the record cannot carry this claim" is a judgement,
    70	    which is why this round belongs to the seat that made that judgement
    71	    and to nobody else.
    72	- version: "1.34"
    73	  date: "2026-09-23"
    74	  scope: reviewer-model-refresh
    75	  summary: >
    76	    Two panel seats move to the models their vendors released on 2026-09-22:
    77	    the Claude seat from Opus 5 to Opus 5.5, the OpenAI seat from GPT-5.6 Sol
    78	    to GPT-6 Sol, both at the same pinned effort. The stages that are not
    79	    pinned in a script take the same two models where they used the old
    80	    ones. A fourth, uncounted seat on GPT-6 Luna starts running beside the
    81	    panel so that the question of how cheap a research seat can be is
    82	    answered by a comparison on the record rather than by a guess. No
    83	    published finding changes and no run is re-done.
    84	  highlights:
    85	    - "New review runs pin the Claude seat as claude-opus-5-5 and the OpenAI seat as gpt-6-sol, both at high. Opus 5.5 defaults to medium effort, so the explicit pin is what keeps the seat at the level v1.6 chose. The Google seat stays on gemini-3.8-flash-high. Runs already published under Opus 5, Fable 5.1 or GPT-5.6 Sol keep the model their manifests record. GPT-5.6 Sol also stays on the launcher's pinned list, never as the default, for as long as a framing check that ran on it is open: v1.35 has a park confirmation run on the same pinned model as the report it confirms, and one such check is open. It leaves the list when the last of them closes."
    86	    - "Both moves are cost decisions, made on the vendors' list prices linked below: Opus 5.5 is a fifth cheaper than Opus 5 and GPT-6 Sol half the price of GPT-5.6 Sol. Both vendors publish accuracy claims for the new models. This site has measured none of them, and the entry does not say either seat reviews better than the one it replaces."
    87	    - "The seats that are not pinned in a script follow. The framing check, the intake merge and grouping, the publication gate audit and the freshness audit use GPT-6 Sol at high where they used GPT-5.6 Sol. Triage reads on GPT-6 Sol and Gemini 3.8 Flash, both at high; when the Google tool's quota fails, on GPT-6 Sol and GPT-6 Luna, with the one-vendor limit stated in the run record as v1.33 stated it. Either pair satisfies the rule that both readers come from a vendor other than the editor's, which v1.33's two Anthropic readers did not. Extraction runs on Haiku 4.5, GPT-6 Luna at low and Gemini 3.8 Flash at high; when Google is down the substitute seat is GPT-6 Luna at high, disclosed as two OpenAI extractors. Drafting stays with Claude, the fixed choice stage 6 discloses."
    88	    - "The shadow seat. For the next two panel runs a fourth seat on GPT-6 Luna at high receives the identical frozen package through the same launcher and profile as the counted OpenAI seat. Its answer is committed under the run in a directory whose name begins with shadow-, with its own manifest, and it is never merged and never synthesised: the runner refuses any other destination and refuses round 2, because the merge reads every file in a round directory, and the run's synthesis scope names no shadow. The run record compares its sources and its findings against the three counted seats. The reason for the test rather than the move is in the record: the intake stages are small and factual and already run on the cheap tier, but a panel round is a search-and-read loop of up to half an hour whose cost is the loop, and a source that every cheap seat misses comes back as Not established by omission, which no later gate can catch. After two runs the editor recommends and the founder decides. Until then no finding rests on the shadow seat and no reader is told one does."
    89	    - "What this entry does not do: it does not claim a quality comparison between any two models, it does not change the three-vendor requirement, the round rules, the effort pin or the vendor exclusions on the checks, and it does not put a cheap-tier model on a counted seat."
    90	  links:
    91	    - label: How a finding is produced
    92	      href: /methodology#stages
    93	    - label: The current pins and the shadow seat (docs/DESIGN.md section 4)
    94	      href: https://github.com/civicfacts/yegfacts/blob/main/docs/DESIGN.md
    95	    - label: Anthropic model pricing
    96	      href: https://platform.claude.com/docs/en/about-claude/pricing
    97	    - label: OpenAI, introducing GPT-6 Sol and Luna
    98	      href: https://openai.com/index/introducing-gpt-6-sol-and-luna/
    99	  note: >
   100	    A model release is not a reason to change a method, and a price cut is
   101	    not a finding. What a price cut buys is the room to ask, on the record,
   102	    how cheap a seat can be before it stops finding things, and to answer
   103	    that with a seat whose answers count for nothing until they have been
   104	    compared with seats whose answers do.
   105	- version: "1.33"
   106	  date: "2026-09-16"
   107	  scope: intake-source-note
   108	  summary: >
   109	    The intake prompts no longer name one source's argument. Each whole-source
   110	    run now commits a source note, one paragraph saying what the people in
   111	    that source are arguing about and what "for" and "against" mean in it,
   112	    and every seat reads the note after the prompt. The second source read
   113	    under this method, a public-group thread on garbage collection, snow
   114	    clearing and taxes, ran on two vendors rather than three, and the run
   115	    record says so and why.

exec
/bin/zsh -lc "git log --oneline -4 origin/main 2>/dev/null; rg -n 'v1\\.35|v1\\.36|version: \"1\\.(34|35|36)\"' methodology/changelog.yaml | head -20" in <repo>
 succeeded in 0ms:
74c16b0 Fold a claim the register already holds onto the existing entry (methodology v1.36) (#79)
574487e Park confirmation after the third framing report (methodology v1.35) (#77)
f360010 Lanes and congestion: brief, three framing checks, parked under the cap (record only) (#75)
d411c6c Second whole-source intake: Edmonton Rant and Rave thread of 2026-09-10 (methodology v1.33, two vendors) (#76)
17:- version: "1.36"
42:- version: "1.35"
72:- version: "1.34"
85:    - "New review runs pin the Claude seat as claude-opus-5-5 and the OpenAI seat as gpt-6-sol, both at high. Opus 5.5 defaults to medium effort, so the explicit pin is what keeps the seat at the level v1.6 chose. The Google seat stays on gemini-3.8-flash-high. Runs already published under Opus 5, Fable 5.1 or GPT-5.6 Sol keep the model their manifests record. GPT-5.6 Sol also stays on the launcher's pinned list, never as the default, for as long as a framing check that ran on it is open: v1.35 has a park confirmation run on the same pinned model as the report it confirms, and one such check is open. It leaves the list when the last of them closes."

exec
/bin/zsh -lc "rg -n 'symlink|shadow-|--into' tests/invoke-reviewer.test.ts scripts/panel/install-output.ts scripts/panel/run-reviewer.sh | tail -80" in <repo>
 succeeded in 0ms:
scripts/panel/install-output.ts:17: * The destination is not followed: a symlink sitting there, live or dangling,
scripts/panel/install-output.ts:31: * sides, because through a symlinked checkout the two spellings of the same
scripts/panel/run-reviewer.sh:9:#           luna | shadow  (the uncounted shadow seat, v1.34; needs --into)
scripts/panel/run-reviewer.sh:48:# re-run does not get to overwrite either. Use --into to record one beside it.
scripts/panel/run-reviewer.sh:62:                                   and --into shadow-<name> is required so it never
scripts/panel/run-reviewer.sh:71:  --into <dirname>   write the review and the manifest under <run>/<dirname>
scripts/panel/run-reviewer.sh:87:    --into) INTO="${2:-}"; [ -n "$INTO" ] || { echo "--into needs a value" >&2; usage; }; shift 2 ;;
scripts/panel/run-reviewer.sh:92:  */*|..|.) echo "--into must be a single directory name, got '$INTO'" >&2; exit 2 ;;
scripts/panel/run-reviewer.sh:103:      shadow-*) ;;
scripts/panel/run-reviewer.sh:104:      *) echo "the shadow seat needs --into shadow-<name>; it is never written into a round directory" >&2; exit 2 ;;
scripts/panel/run-reviewer.sh:147:    # synthesised: it must be run with --into shadow-<name>, because
scripts/panel/run-reviewer.sh:181:# A claim-scoped re-run (`--claims` with `--into`) writes into its own directory
scripts/panel/run-reviewer.sh:349:# A claim-scoped re-run has --into for exactly this, and it writes its own
scripts/panel/run-reviewer.sh:350:# directory and its own manifest. -L as well as -e, because a dangling symlink
scripts/panel/run-reviewer.sh:355:  echo "[$SLOT round $ROUND] Use --into <dirname> to record a re-run beside it." >&2
tests/invoke-reviewer.test.ts:44:  symlinkSync,
tests/invoke-reviewer.test.ts:62:// realpath, because macOS hands out /var/folders paths that are symlinks into
tests/invoke-reviewer.test.ts:71: * `scripts/` is COPIED rather than symlinked. Two reasons. A symlinked script
tests/invoke-reviewer.test.ts:75: * the first time round. Everything else is a symlink because nothing rewrites it.
tests/invoke-reviewer.test.ts:81:    symlinkSync(path.join(REAL_REPO, entry), path.join(repo, entry));
tests/invoke-reviewer.test.ts:1022:    symlinkSync(process.execPath, path.join(tools, 'node'));
tests/invoke-reviewer.test.ts:1077:  it('refuses an attempt directory reached through a symlinked parent', () => {
tests/invoke-reviewer.test.ts:1081:    symlinkSync(outside, path.join(stub.archive, 'sneaky'));
tests/invoke-reviewer.test.ts:1084:      [INVOKE, '--purpose', 'research', '--provider', 'anthropic', '--package', writePackage('symlink.md'),
tests/invoke-reviewer.test.ts:1205:   * promise is to refuse every destination that is not a shadow- directory,
tests/invoke-reviewer.test.ts:1209:  it('refuses the shadow seat anywhere but round 1 of a shadow- directory', () => {
tests/invoke-reviewer.test.ts:1213:      [['1'], /needs --into shadow-<name>/],
tests/invoke-reviewer.test.ts:1214:      [['1', '--into', 'round1'], /needs --into shadow-<name>/],
tests/invoke-reviewer.test.ts:1215:      [['1', '--into', 'round1-rerun-1'], /needs --into shadow-<name>/],
tests/invoke-reviewer.test.ts:1216:      [['1', '--into', 'round2'], /needs --into shadow-<name>/],
tests/invoke-reviewer.test.ts:1217:      [['2', '--into', 'shadow-round1'], /round 1 only/],
tests/invoke-reviewer.test.ts:1230:      [path.join(repo, 'scripts', 'panel', 'run-reviewer.sh'), 'luna', STORY, RUN_DATE, '1', '--into', 'shadow-round1', '--dry-run'],
tests/invoke-reviewer.test.ts:1236:    expect(result.stdout).toMatch(/shadow-round1\/gpt-luna\.json/);
tests/invoke-reviewer.test.ts:1374:    expect(second.stderr).toMatch(/--into/);
tests/invoke-reviewer.test.ts:1382:  it('refuses a dangling symlink sitting at the destination', () => {
tests/invoke-reviewer.test.ts:1385:    symlinkSync(path.join(root, 'no-such-review.json'), reviewPath());

codex
The new `shadow-*` check closes the plain-name bypasses, and the added tests cover those cases. I’m checking one remaining path: whether an existing `shadow-` directory can be a symlink into `round1`, and whether the output installer follows that parent link. I’ll run the focused test files as well.
exec
/bin/zsh -lc 'npx vitest run tests/invoke-reviewer.test.ts tests/three-seats.test.ts' in <repo>
web search: 
web search: https://platform.claude.com/docs/en/about-claude/pricing
web search: 
web search: '$0.10'
 succeeded in 44314ms:

 RUN  v4.1.11 <repo>


 Test Files  2 passed (2)
      Tests  91 passed | 1 skipped (92)
   Start at  09:33:10
   Duration  44.12s (transform 63ms, setup 0ms, import 109ms, tests 68.02s, environment 0ms)


exec
/bin/zsh -lc "bash -c 'pins=\"gpt-6-sol,gpt-6-luna,gpt-5.6-sol\"; for model in \"*\" \"gpt-6-*\" \"gpt-6-s?l\" \"gpt-6-luna\" \"gpt-6-lun\"; do case \","'$pins," in *",$model,"*) printf "%s ACCEPTED'"\\n\" \""'$model";; *) printf "%s refused'"\\n\" \""'$model";; esac; done'"' " in <repo>
 succeeded in 0ms:
* refused
gpt-6-* refused
gpt-6-s?l refused
gpt-6-luna ACCEPTED
gpt-6-lun refused

codex
The focused tests pass: 91 passed, 1 skipped. The official pricing pages support the ratios in the public copy. The remaining issue is narrower than the first-round bypass: a pre-existing `shadow-*` directory symlink can still redirect an admitted shadow output into `round1`, and the new tests do not cover it. I’m doing a final line-level check before the verdict.
codex
## Required fix

[run-reviewer.sh](scripts/panel/run-reviewer.sh:102) checks that `--into` starts with `shadow-`, but not where that directory resolves. If `<run>/shadow-round1` is a symlink to `<run>/round1`, the runner follows it at line 365 and can install `round1/gpt-luna.json`. Refuse symlinked shadow destinations before invocation and add that case to [the guard tests](tests/invoke-reviewer.test.ts:1209). Until then, the “never merged” statements in [DESIGN.md](docs/DESIGN.md:368) and [changelog.yaml](methodology/changelog.yaml:88) overclaim.

The direct-name guard cases and model pins are covered; 91 focused tests passed, with 1 skipped. DESIGN.md now separates historical commands from current pins, v1.35 and v1.36 are preserved, and the price ratios match [Anthropic’s](https://platform.claude.com/docs/en/about-claude/pricing) and [OpenAI’s](https://openai.com/index/introducing-gpt-6-sol-and-luna/) published prices.

VERDICT: REVISE
tokens used
164,953
## Required fix

[run-reviewer.sh](scripts/panel/run-reviewer.sh:102) checks that `--into` starts with `shadow-`, but not where that directory resolves. If `<run>/shadow-round1` is a symlink to `<run>/round1`, the runner follows it at line 365 and can install `round1/gpt-luna.json`. Refuse symlinked shadow destinations before invocation and add that case to [the guard tests](tests/invoke-reviewer.test.ts:1209). Until then, the “never merged” statements in [DESIGN.md](docs/DESIGN.md:368) and [changelog.yaml](methodology/changelog.yaml:88) overclaim.

The direct-name guard cases and model pins are covered; 91 focused tests passed, with 1 skipped. DESIGN.md now separates historical commands from current pins, v1.35 and v1.36 are preserved, and the price ratios match [Anthropic’s](https://platform.claude.com/docs/en/about-claude/pricing) and [OpenAI’s](https://openai.com/index/introducing-gpt-6-sol-and-luna/) published prices.

VERDICT: REVISE
