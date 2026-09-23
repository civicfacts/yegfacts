OpenAI Codex v0.156.1
--------
workdir: <repo>
model: gpt-6-sol
provider: openai
approval: never
sandbox: danger-full-access
reasoning effort: high
reasoning summaries: none
session id: 01a0cfaa-10cf-7b31-aef1-17caf01899bc
--------
user
Round 4. One change since round 3: src/pages/index.astro now says 'On the newest finding, N AI reviewer seats from M companies researched the claim without seeing each other's work; seats that share a company are not independent of each other. Every finding names its own panel.' (and the three-vendor and fallback variants likewise qualified). Re-inspect with git diff origin/main -- src/pages/index.astro and confirm the finding is closed. End with VERDICT: APPROVED or VERDICT: REVISE
codex
I’ll inspect the home-page diff against `origin/main` and check that all three wording branches describe the panel they actually use.
exec
/bin/zsh -lc "sed -n '463,465p' <home>/.codex/memories/MEMORY.md && sed -n '1,40p' <board>/context/current-state.md && sed -n '1,65p' <board>/decisions/0042-two-vendor-panel.md" in <repo>
 succeeded in 0ms:
# Task Group: YEGFacts reviewer execution isolation, attempt retention, and research admission
scope: Use when auditing or changing YEGFacts panel-reviewer execution, output installation, private attempt records, or the gate that admits real research.
applies_to: cwd=<home>/Sites/yegfacts with <board>; reuse_rule=implementation details are reusable, but re-check the current execution profile, merged head, production state, and private board before admitting research or claiming synchronization.
# Current state — verified 2026-09-23

## 2026-09-23, evening: the Google seat retires (D-0042, methodology v1.37 and v1.38)

Founder: "we should drop gemini completely, I don't have enough usage to
continue with it"; on the Claude seat, "do what you think is best". Full
board pass on GPT-6 Sol (reviews/2026-09-23-two-vendor-panel/): four
REVISE, every required change taken; one split (count Luna's shadow answer
for congestion round 1) resolved three to one against. D-0042 written.
Shape adopted: three seats from two vendors (Opus 5.5, GPT-6 Sol, GPT-6
Luna, all high), labelled everywhere; effective for runs frozen after
2026-09-23; vendor-split rule; one-vendor triage with an Anthropic audit
of declines; ledger tracking of Luna; preflight. v1.38: the capture check
counts the CLI's binary-save note carrying the home path (operator_path_
notes on the row) instead of refusing; everything else still refuses; the
refused attempt stays refused; the Claude seat reruns under it.

Branch two-vendor-panel (worktree .claude/worktrees/two-vendor-panel), first
commit holds scripts/panel (retired Google seat with --finish-frozen-run for
frozen runs; luna a counted seat; audit-package refuses google;
capture-check carve-out; count wired to metadata, row and proof sentence),
tests, docs/DESIGN.md s4, changelog v1.37 and v1.38. Public copy (about
twenty sentences across the methodology page, README, about, support,
sources, two components, the glossary), a per-finding panel label read from
each run's run.yaml, and scripts/panel/preflight.sh are delegated to a
Codex implementer (GPT-6 Sol, workspace-write, spec in the session
scratchpad) per D-0041; Stew reviews the diff before the PR. PR #82 merged
as e842747 by Stew on the founder's "do what you think is best".
Congestion run record updated on congestion-round1 (round 1 table,
effective-date rule, both refused Claude attempts). Next: review Codex's
diff, PR, independent review, merge; rebase congestion-round1; rerun the
Claude seat under v1.38; then round 2 waits for the Google reset or the
founder's call to restart clean.

## 2026-09-23, 17:20Z: Google quota gone until about 2026-09-30 16:30Z

yegfacts-fa's third consultation audit run (correct package) died at
"Individual quota reached ... Resets in 167h16m" after eight minutes;
nothing admitted. The lanes-and-congestion Gemini round-1 file
(ae6e378fd252efcb) is complete and was the week's last Gemini run.
# D-0042 — The Google seat retires; three seats from two vendors; the capture note

Date: 2026-09-23. Status: adopted by the founder ("we should drop gemini
completely, I don't have enough usage to continue with it"; on the
Claude seat's capture failure, "do what you think is best"), shaped by a
full board pass (reviews/2026-09-23-two-vendor-panel/, four GPT-6 Sol
memos, all REVISE, every required change adopted, one split resolved
three to one). Stew is Claude Fable 5.1. Supersedes D-0003's "three
providers" for runs frozen after this date. Amends D-0041's pins.
Public record: methodology v1.37 and v1.38.

## Decision

1. The Google seat retires from every stage for runs frozen after
   2026-09-23. The panel is three seats from two vendors: Claude Opus 5.5,
   GPT-6 Sol, GPT-6 Luna, all at high. The matrix, the agreement
   vocabulary and the synthesis scripts are unchanged; the independence
   claim is not. Every description of the current panel carries the
   adopted label (synthesis, item 1). Historical findings keep their own.
2. Effective date: a run frozen under the three-provider rule finishes
   under it. Lanes-and-congestion counts Gemini's admitted round-1 answer
   and keeps Luna's as shadow; its round 2 waits for the Google reset
   (about 2026-09-30) unless the founder closes it as incomplete and
   starts a clean run under the new rule. The shadow-seat experiment of
   v1.34 ended after one run, superseded by Luna counting; the one
   comparison stays in the run record.
3. Triage: GPT-6 Sol and GPT-6 Luna at high, labelled one vendor; a claim
   both decline or park is re-decided by an Anthropic audit reader before
   the register records it. Extraction: Haiku 4.5, GPT-6 Luna low,
   Sonnet 5. Faithfulness, plain-speech and gate audits: OpenAI.
4. Vendor-split rule: when the Anthropic seat differs from both OpenAI
   seats, the finding names the vendor split and the drafting addresses
   it from the sources. Never a plain majority.
5. Capture check (v1.38, prospective): the home-directory string is
   permitted only inside the CLI's fixed note "[Binary content (<type>,
   <size>) also saved to <path>]" within a tool_result block; the run row
   records the count of affected requests; every other occurrence of any
   protected string refuses. Public disclosure says the path was sent to
   the vendor. Today's refused attempt 09c6859382ba86e9 stays refused; the
   Claude seat reruns under the new rule. The role account (OQ-30) remains
   the structural fix. No OAuth token is copied by any script.
6. Preflight before a run: CLI versions, login state, a quota probe. A
   script step. The Google profile stays in the launcher for the record
   and refuses new runs with a dated reason.
7. Ledger: Luna's catches and misses, vendor-correlated misses, and a
   to-do to review the matrix's 2-1 cases for vendor weighting. Review
   point after several counted runs.

## Why

The founder's usage is the constraint; the board's job was the honest
shape. Two seats would need a new synthesis rule and leave two rules on
the site; two Anthropic seats put the editor's vendor in the majority; a
paid third vendor is money the method has never spent. B keeps the record
mechanics and moves the loss to where it belongs, the independence claim,
which is now said plainly everywhere. On the in-progress round, three
roles saw the same trap: changing a panel after seeing its answers.

## Record

Private: this file, the board pass directory, current-state.md, D-0041
amended by reference. Public: methodology v1.37 and v1.38, docs/DESIGN.md
s4, scripts/panel, the methodology page and every page that names the
panel, the lanes-and-congestion run record.


exec
/bin/zsh -lc 'git diff origin/main -- src/pages/index.astro && git status --short' in <repo>
 succeeded in 0ms:
diff --git a/src/pages/index.astro b/src/pages/index.astro
index 6bfe2b2..3256e46 100644
--- a/src/pages/index.astro
+++ b/src/pages/index.astro
@@ -52,15 +52,19 @@ const findingCounts = CANONICAL_FINDINGS.map((finding) => ({
  * is the round the sentence is about.
  */
 let reviewerCount: number | undefined;
+let vendorCount: number | undefined;
 const newest = rows[0];
 if (newest) {
   const manifestPath = path.join(process.cwd(), newest.claim.data.review_run, 'run.yaml');
   if (existsSync(manifestPath)) {
     const manifest = loadRunManifest(manifestPath);
-    const providers = new Set(
-      manifest.runs.filter((seat) => seat.round === 1).map((seat) => seat.provider),
+    // Seats that answered: rows without a status predate the field (v1.28).
+    const seats = manifest.runs.filter(
+      (seat) => seat.round === 1 && (seat.status === undefined || seat.status === 'ok'),
     );
-    reviewerCount = providers.size > 0 ? providers.size : undefined;
+    const providers = new Set(seats.map((seat) => seat.provider));
+    reviewerCount = seats.length > 0 ? seats.length : undefined;
+    vendorCount = providers.size > 0 ? providers.size : undefined;
   }
 }
 
@@ -361,9 +365,11 @@ const jsonLd = [
           <h3 class="font-sans text-base leading-[1.3] font-bold">Blind research</h3>
           <p class="mt-2 text-base text-ink">
             {
-              reviewerCount
-                ? `${reviewerCount} AI reviewers, each from a different company, research every claim without seeing each other's work.`
-                : "AI reviewers from different companies research every claim without seeing each other's work."
+              reviewerCount && vendorCount && vendorCount === reviewerCount
+                ? `On the newest finding, ${reviewerCount} AI reviewers, each from a different company, researched the claim without seeing each other's work. Every finding names its own panel.`
+                : reviewerCount && vendorCount
+                  ? `On the newest finding, ${reviewerCount} AI reviewer seats from ${vendorCount} companies researched the claim without seeing each other's work; seats that share a company are not independent of each other. Every finding names its own panel.`
+                  : "AI reviewers research every claim without seeing each other's work. Every finding names its own panel."
             }{' '}
             <a href="/methodology#stages" class="link">How the rounds run</a>.
           </p>
 M scripts/panel/capture-check.ts
 M scripts/panel/preflight.sh
 M scripts/panel/run-reviewer.sh
 M src/lib/glossary.ts
 M tests/capture-check.test.ts

codex
[The home-page diff](src/pages/index.astro:368) now limits the seat and vendor counts to the newest finding. Its three-vendor and two-vendor wording no longer describes older findings as using the newest panel. The round-three finding is closed; no new issue found in this change.

VERDICT: APPROVED


tokens used
230,513
[The home-page diff](src/pages/index.astro:368) now limits the seat and vendor counts to the newest finding. Its three-vendor and two-vendor wording no longer describes older findings as using the newest panel. The round-three finding is closed; no new issue found in this change.

VERDICT: APPROVED


