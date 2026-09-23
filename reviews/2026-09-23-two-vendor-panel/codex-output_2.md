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
Round 2. Context in ./docs/reviews/codex-two-vendor-review_2.md; re-inspect the listed files with git diff origin/main -- <file>. Check each of the six fixes closes its finding and look for anything new they introduced. End with VERDICT: APPROVED or VERDICT: REVISE
codex
I’ll read the round-two context, recheck the current stewardship and methodology rules, then inspect each listed file against `origin/main`. I’ll test the six prior findings against the new diff and look for regressions.
exec
/bin/zsh -lc 'cat docs/reviews/codex-two-vendor-review_2.md' in <repo>
 succeeded in 0ms:
# Review context, round 2

Same repository, branch and file list as round 1; compare with
`git diff origin/main -- <file>`. Working tree clean.

What changed since round 1, one item per finding:
1. capture-check.ts: the cut applies only to string values that sit inside
   tool_result blocks (messages[].content[] of type tool_result, string
   content or its text parts), and only to a note whose path is
   `<home>/.claude/projects/<...>/tool-results/<...>`. Tests: note in a tool
   result passes with count 1; the same note in a text block fails; a note
   with another path under home fails; a note naming the repository path
   fails on the repository source.
2. invoke-reviewer.sh: refuses `--provider google` itself unless
   `--finish-frozen-run`, after the model and effort defaults so the refused
   row still names the seat; run-reviewer.sh passes the flag through;
   three-seats tests pass it to exercise the retained profile; the refusal
   rows in invoke-reviewer tests expect the retirement message.
3. glossary.ts panelForClaim: counts only round-1 rows with status ok or no
   status (pre-v1.28 manifests); an unreadable or inconsistent manifest gets
   a neutral "AI panel (seats in the run record)" label and glossary term,
   never the historical vendor list; the build now prints no panel warning.
4. stream-boundary.ts contextProof: with counted notes the sentence says
   "none of it appeared except the operator's home-directory path, which N
   request(s) carried inside the CLI's own note…", never both claims.
5. DESIGN.md line 19 and the present-tense sentence near 1208 no longer say
   independent reviewers or models; the methodology page's capture paragraph
   states the v1.38 exception and its limits.
6. preflight.sh takes the CLI names to check; the runner calls it for the
   seat's CLI before assembling a package (not on --dry-run); Claude's login
   is proven by the canary and the script says so; v1.37's text names the
   canary as the quota probe (no CLI exposes a quota read without a model
   call); the private decision record carries the same note.

exec
/bin/zsh -lc "sed -n '463,485p' <home>/.codex/memories/MEMORY.md" in <repo>
 succeeded in 0ms:
# Task Group: YEGFacts reviewer execution isolation, attempt retention, and research admission
scope: Use when auditing or changing YEGFacts panel-reviewer execution, output installation, private attempt records, or the gate that admits real research.
applies_to: cwd=<home>/Sites/yegfacts with <board>; reuse_rule=implementation details are reusable, but re-check the current execution profile, merged head, production state, and private board before admitting research or claiming synchronization.

## Task 1: Rehydrate stewardship state and choose the next safe work

### rollout_summary_files

- rollout_summaries/2026-09-09T17-04-23-tp17-yegfacts_reviewer_execution_safeguards_merged.md (cwd=<home>/Sites/yegfacts, rollout_path=<home>/.codex/sessions/2026/09/09/rollout-2026-09-09T11-04-23-01a08720-b918-7c92-90df-bca9ffd4efe1.jsonl, updated_at=2026-09-09T21:13:29+00:00, thread_id=01a08720-b918-7c92-90df-bca9ffd4efe1, success: stale priorities reconciled and reviewer boundary became the safe next task)

### keywords

- Steward, current-state.md, consultation-and-opposition, 617ec14, methodology-v1.27, brief hash, --search

## Task 2: Implement and verify fail-closed reviewer isolation and retention safeguards

### rollout_summary_files

- rollout_summaries/2026-09-09T17-04-23-tp17-yegfacts_reviewer_execution_safeguards_merged.md (cwd=<home>/Sites/yegfacts, rollout_path=<home>/.codex/sessions/2026/09/09/rollout-2026-09-09T11-04-23-01a08720-b918-7c92-90df-bca9ffd4efe1.jsonl, updated_at=2026-09-09T21:13:29+00:00, thread_id=01a08720-b918-7c92-90df-bca9ffd4efe1, success: PR #69 merged and live verification passed; real research remains blocked)

### keywords

- reviewer-isolation, context-proof, invoke-reviewer.sh, stream-boundary, attempt-record.ts, install-output.ts, admitted_for_research, PR-69, c390cbb, methodology-v1.28

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
/bin/zsh -lc 'git status --short && git rev-parse origin/main && git branch --show-current' in <repo>
 succeeded in 0ms:
e84274792962fae40b6d1e77516d260d01d6f005
two-vendor-panel

exec
/bin/zsh -lc 'cat <board>/context/charter.md' in <repo>
 succeeded in 0ms:
# YEGFacts charter

Charter version: 1.0 (2026-09-01). This file changes rarely and only
deliberately. It is the board's constitution; `current-state.md` is the
weather.

## Why YEGFacts exists

Edmonton's civic arguments run on claims nobody checks. The public record
(bylaws, budgets, court filings, open data, council reports) can answer
many of them, but it is scattered, long, and unread. YEGFacts is the
missing layer between the raw public record and the public debate: an
independent civic evidence library where any materially factual claim
about Edmonton civic government can be checked, or the site says plainly
why it cannot be.

North star interaction: someone sees a claim on social media, searches
YEGFacts, gets an honest answer in ten seconds, and can audit it to any
depth — 10 seconds for a resident, 10 minutes for a journalist, an hour
to rerun the method for a researcher.

## What YEGFacts is, and is not

- Non-partisan AND non-advocacy. It tests claims; it never recommends
  policy. It must be able to displease every camp, including the
  founder's own. The founder (Ildar Abdulin) has personal urbanist
  leanings, disclosed on the site; the methodology exists so those
  leanings cannot decide verdicts.
- AI is the labour, never the authority. Authority comes from the public,
  auditable protocol: frozen briefs, independent multi-model review,
  deterministic synthesis, archived evidence, published prompts, honest
  changelogs, delegated-but-accountable publication gate.
- Overclaiming is the costliest error. Cautious verdicts, hedged
  language, corrections worn openly.
- Topic names are neutral categories; hostile framings live only in
  redirects. No named-individual allegations without a purpose-built
  process (none exists yet; v2 at earliest).
- Deployment is not launch. Launch is promotion, and requires the
  pre-registered nine-story slate published with a verdict spread that
  visibly cuts in multiple political directions.

## Structure and money (private context)

Operated inside the founder's existing Alberta corporation; no separate
bookkeeping yet; corporation never promoted on the site. Support page
takes contributions (Stripe links pending), explicitly not charitable.
Possible futures, undecided: Alberta nonprofit spin-out for YEGFacts
with "CivicFacts" (the reusable engine) staying commercial; grants
(Amii ML Exploration deadline 2026-09-06; NRC IRAP; SR&ED/IEG); the
engine as the actual business. None of this may ever influence a
verdict, and funding sources get disclosed if they materialize.

## Success criteria

- Edmontonians cite YEGFacts in real arguments; a journalist uses it.
- People who dislike a conclusion still concede the sources are solid.
- Corrections happen visibly and survive scrutiny.
- The founder's marginal effort per story keeps falling; the record of
  every published claim keeps being reproducible.

## Principles that should be expensive to change

Verdict vocabulary and its honesty glosses; evidence-first architecture
with archived bytes and rights fail-closed; public methodology with a
versioned changelog; the no-advocacy line; the accountability of a named
human over everything published.

exec
/bin/zsh -lc 'cat <board>/decisions/0042-two-vendor-panel.md' in <repo>
 succeeded in 0ms:
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

## Note, 2026-09-23, evening (same day, on the independent review of PR #85)

Item 6's "quota probe": no CLI exposes one without a model call, and the
launcher's canary is already a one-line model call per attempt that fails
on an exhausted allowance before the package is sent. So the preflight
script checks versions and login state, the runner calls it before
assembling a package, and the canary is the quota probe. Item 5's note
match was tightened on the same review: tool_result blocks only, path under
the CLI's own projects directory. Neither changes the decision.

exec
/bin/zsh -lc "sed -n '1,90p' <board>/context/current-state.md && rg -n 'published|priorit|next:' <board>/context/current-state.md | head -20" in <repo>
 succeeded in 0ms:
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
Consequence: round 2 on lanes-and-congestion needs the Gemini seat again
and cannot run before about 2026-09-30, whatever is decided about the
Claude seat. The alternative is a two-vendor round 2 with the limit
stated, as v1.33 did for intake; founder's call, not asked yet.
Consultation stays blocked on its Google source audit until the reset.

## 2026-09-23, 17:10Z: Gemini seat done; round 1 has two of three counted seats

Gemini 3.8 Flash high, attempt ae6e378fd252efcb, admitted record-only after
PR #83 (a fetch 404 counts as a result), about eight minutes: Partially
supported (high), 4 supporting and 3 challenging items; it counts through-
lane removals for bike lanes in 4 of 15 district-plan areas, under the
brief's primary threshold of 8 and its alternative of 5. Sol and the Luna
shadow both returned Not established (moderate). Committed on
congestion-round1 (rebased onto 28ce586). Round 1 cannot close without the
Claude seat; nothing merged or synthesised. Cosmetic launcher noise on
google runs (invoke-reviewer.sh:1266, missing requests/upstream.txt)
reported to yegfacts-fa, not fixed. The consultation audit yegfacts-fa
reported done was void (package lacked the brief); it reruns on the Google
seat after this.

## 2026-09-23, 16:40Z: round 1 has two seats and a shadow; the Claude seat is refused by the capture check on a CLI-written path

Results so far on the frozen package: OpenAI seat gpt-6-sol high, admitted,
11 minutes, 119 requests, Not established (moderate), 6 supporting and 4
challenging items. Shadow seat gpt-6-luna high, admitted, 6 minutes, 29
requests, Not established (moderate), 2 and 2. Both wrote their files
(round1/gpt.json, shadow-round1/gpt-luna.json) on branch congestion-round1,
uncommitted. Gemini not started: waiting for yegfacts-fa's consultation
audit on the Google seat (not fired as of 16:39Z).

Claude seat, two refused attempts, both retained:
- 8b92f1e800aa48f7: canary refused on "plugins were loaded: agents-md,
  telemetry". Claude Code 2.1.280 lists two builtin plugins the profile's
  flags cannot remove; its capture check passed. Fix: the structural check
  records builtin plugins and refuses only installed ones; PR #82
  (claude-builtin-plugins), CI green, disclosed in DESIGN.md. Not merged.
- 09c6859382ba86e9: canary passed, research ran to completion (42
  requests, a 19k answer, Not established), then the capture check
  refused it: 14 requests carried the home-directory string. Cause: the
  CLI fetched a 2.6 MB City PDF, persisted it under the real
  ~/.claude/projects/<attempt-cwd>/…/tool-results/ and put "[Binary
  content (application/pdf, 2.6MB) also saved to /Users/…]" into the
  tool_result, which then sat in every later request. Not an instruction
  file; the CLI's own note. The same message exists in 2.1.277 and 2.1.278,
  so no installed build avoids it. The stray PDF was deleted from the real
  home.

Ways out, none taken:
(a) Per-attempt config dir under the opaque temp path (as the other seats
385:too. Not a decision record yet; nothing published changes.
441:panel cannot run and no finding can be published; the D-0036 two-week trigger
472:cycling (16, published), Q8 roads vs lanes (15, held), Q17 who pays for
474:source verification). Of the seven published stories, three (climate,
483:yet... I think the stories we have published are really hard to read for
485:the seven published stories at 14a5595. Standfirsts run 24 to 78 words
537:"published"). All applied at 47fed52: page order is now title, answer,
610:framing finding: no published Edmonton source plausibly supplies the
618:Nothing is frozen or published. Next action is the founder's on OQ-27.
632:lifecycle panel-complete, publication unpublished, while
633:src/content/stories/cycling-volumes.mdx is status: published and the
634:board recorded it as published on Sep 9. The validator did not catch it.
690:briefed, 2 briefed, 1 panel-complete (cycling-volumes, published), 5
691:published, 4 no, 3 parked.
731:claim; nothing published as a finding. Raw attempts are under
803:execution-blocked briefs. Most recent published finding batch is cycling-volumes,
909:  seven published-status story files, one withdrawn (infill-prices), so
910:  six non-withdrawn published question pages. Deployment is still not launch.
911:- cycling-volumes is published. The Amii application was rejected
927:The old numbered priorities and charter's nine-story launch rule are stale;

exec
/bin/zsh -lc "sed -n '1,45p' <board>/context/open-questions.md && rg --files <board>/decisions | sort | tail -12" in <repo>
 succeeded in 0ms:
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

## OQ-01 — "Partially supported" semantics (URGENT, blocks slate)
The e-bus procurement claim got Partially supported largely because the
strongest figures are untested litigation claims and the fleet kept
running — arguably evidence-QUALITY concerns, while the vocabulary
defines Partially supported as "part of the claim does not hold."
External review says: require every Partially supported verdict to name
the part that fails, else re-run; verdict may become Supported/Moderate.
Current thinking: the review is probably right; needs a reviewer-prompt
rule + a re-run of that one claim under it. Trigger: before the next
story batch.

## OQ-02 — Freshness/completeness audit
Accepted direction: a third gate audit that independently re-searches for
newer/stronger sources the panel missed (the climate story missed an
Aug 20 report package scheduled for Sept 2 committee). Trigger: build
before the next publication.

## OQ-03 — Launch timing and promotion plan
Bar is D-0028 (register property), not slate completion. No promotion
plan exists yet (who gets the first email; Reddit/X posting; journalist
outreach). 2026-09-16: founder wants readability fixed and the top of
the register answered before any probe or promotion; Stew's sequencing
is in current-state.md under that date. Trigger: the seven live pages
<board>/decisions/0033-strongest-model-allocation.md
<board>/decisions/0034-gemini-seat-flash.md
<board>/decisions/0034-withheld-claim-history.md
<board>/decisions/0035-stew-github-account.md
<board>/decisions/0036-reviewer-execution-and-retention.md
<board>/decisions/0037-context-proof-request-capture.md
<board>/decisions/0038-capture-check-simplified.md
<board>/decisions/0039-question-page-order-readers-first.md
<board>/decisions/0039-three-seats-under-stated-limits.md
<board>/decisions/0040-park-confirmation-after-third-report.md
<board>/decisions/0041-model-tiers-refresh.md
<board>/decisions/0042-two-vendor-panel.md

exec
/bin/zsh -lc "sed -n '1,90p' methodology/changelog.yaml && git diff --stat origin/main" in <repo>
 succeeded in 0ms:
# Methodology changelog. Every entry bumps the version.
#
# CI runs this rule (`npm run validate:diff`, from 2026-09-03): a branch that
# changes anything under prompts/, scripts/merge*, scripts/synthesize* or
# methodology/ must add a version entry here, or it fails.
#
# Two paths under methodology/ are exempt, and both exemptions are about what a
# version number means. methodology/audits/ holds incident and audit records,
# which report on the method rather than change it. This file is the record
# itself, so correcting a past entry is not a new version of the method. If
# either of those bumped the version, the number would mean "something
# happened" instead of "the method changed".
#
# The sentence above used to describe a check that did not exist: the rule sat
# as a TODO in scripts/validate.ts, and a change under methodology/ shipped
# clean. It runs now.
- version: "1.38"
  date: "2026-09-23"
  scope: capture-check-binary-note
  summary: >
    The capture check that admits a Claude seat now permits one thing it used
    to refuse, and prints a count of it on every run row: the operator's
    home-directory path when it appears only inside the note Claude Code
    itself writes after saving a fetched binary to disk. The path is still
    sent to the vendor; the row says how many requests carried it. Every
    other occurrence of any protected string still refuses the run.
  highlights:
    - "What happened. On 2026-09-23 the Claude seat (Opus 5.5, Claude Code 2.1.280) ran the lanes-and-congestion brief to completion and was refused by the capture check: fourteen of forty-two requests carried the home-directory path. The cause was the CLI's own behaviour, not an instruction file on this machine. WebFetch retrieved a 2.6 MB City PDF, the CLI saved it under the operator's home and put \"[Binary content (application/pdf, 2.6MB) also saved to <path>]\" into the tool result, and that note then sat in every later request. The refused attempt, 09c6859382ba86e9, stays refused and retained; nothing about it is reclassified."
    - "What changes. The check cuts that one fixed note, and only where the CLI writes it, out of a tool result before searching it for the home path: the note must sit inside a tool_result block and name a path under the CLI's own projects directory in the operator's home, in a tool-results folder. The same words in a text block, a system prompt or a tool input, or a note naming any other path, are searched as sent. The check counts the requests where it cut a note and puts the count on the run row as operator_path_notes. The home path anywhere else, the repository path anywhere, and the canary token anywhere refuse the run exactly as before. The proof sentence on a passing row says, when the count is above zero, that the path was sent to the vendor and is recorded rather than refused. This is a disclosed exposure, not a clean capture, and no row calls it clean."
    - "Why this and not the alternatives. Giving the seat its own configuration directory under the temporary path, as the other seats have, loses the login: the CLI keys its Keychain entry to that directory, and making it work would mean a script copying the operator's OAuth token into a per-attempt Keychain item, which nothing on this site will do. A separate account and machine user for the seat is the structural fix and is open in the board record. Until then the exposure is the operator's own home path, which names him, and he is already named on the site as the founder; the account email and id in the captured request have been disclosed on the same footing since v1.29."
    - "What the attempt also showed. The fetch handed the reviewer the PDF's raw bytes, which it could not read, so the document was saved and not read. That is the web-only profile's limit as v1.28 disclosed it: public-web tools may not retrieve PDFs a shell could, and an inaccessible essential source stops a run rather than becoming a finding. The refused attempt's Not established is not a finding of this site."
    - "By whom. The founder, told the three ways out, said \"do what you think is best\"; the editor chose this one and put it to the full board with the two-vendor change below. Four memos, all REVISE, every required change taken: the exception is prospective, exact, counted and disclosed, and the refused attempt stays refused."
  links:
    - label: The Claude profile (docs/DESIGN.md section 4)
      href: https://github.com/civicfacts/yegfacts/blob/main/docs/DESIGN.md
    - label: Reviewer execution and retention
      href: /methodology#execution
  note: >
    A rule that refuses a run for a string the tool itself wrote is a rule that
    will be turned off the first time it bites. Better to say exactly what is
    let through, count it, and print the count where a reader will see it.
- version: "1.37"
  date: "2026-09-23"
  scope: two-vendor-panel
  summary: >
    The Google seat retires. For every run frozen after 2026-09-23 the panel
    is three model seats from two vendors, one Anthropic model and two OpenAI
    models, and every page that describes the panel says so. The two OpenAI
    seats are not independent of each other, so three agreeing verdicts are
    not three independent confirmations. Runs frozen before this date had
    three vendors and keep that label. The matrix, the agreement words and
    the synthesis rule do not change; what changes is what agreement means.
  highlights:
    - "Why. The Google route is one command-line tool on a consumer account whose weekly allowance ran out on 2026-09-16, blocking the second intake for a week, and again on 2026-09-23 after one panel seat and three audit attempts. The founder will not buy more: \"we should drop gemini completely, I don't have enough usage to continue with it.\" The site's method has always run on the founder's subscriptions; a seat he cannot afford to run is not a seat."
    - "What the panel is now. Claude Opus 5.5, GPT-6 Sol and GPT-6 Luna, all at high, pinned in the launcher. Two seats, two vendors, would have needed a new synthesis rule for two verdicts and left two rules on the site; two Anthropic seats would have put the editor's vendor in the majority; a paid third vendor is money this method has never spent. Three seats from two vendors keeps the matrix, the vocabulary and every published finding's meaning intact and moves the loss to where it belongs, the independence claim, which is now stated wherever the panel is described: on the methodology page, on every finding, in the glossary, in search descriptions and share text. Panel agreement, Unanimous, Adjacent or Split, describes seats, not vendors."
    - "The vendor split. When the Anthropic seat differs from both OpenAI seats, the finding names the vendor split beside the seat agreement and the drafting addresses it from the sources. It is never presented as a plain two-to-one majority. The quality ledger tracks the Luna seat's catches and misses and any miss the two OpenAI seats share, with a review point after several counted runs; one shadow run is not evidence of quality, and this entry claims none."
    - "Effective date. A run frozen under the three-provider rule finishes under it. Lanes-and-congestion froze on 2026-09-23 before this entry; its round 1 counts the Gemini seat's admitted answer and keeps the Luna shadow answer as shadow, and its round 2 needs the Google seat once more, after the allowance resets about 2026-09-30, unless the founder closes the attempt as incomplete and starts a clean run under this rule. No panel is assembled from answers already seen. The runner starts the retired seat only with --finish-frozen-run; audits refuse it outright."
    - "The other stages. Triage reads on GPT-6 Sol and GPT-6 Luna at high, one vendor, and the register says so; a proposition both decline or park is re-decided by an Anthropic audit reader before the register records it, so one vendor cannot quietly remove a claim. Extraction runs on Haiku 4.5, GPT-6 Luna at low and Sonnet 5, two vendors. Faithfulness, plain-speech and gate audits run on OpenAI, off the editor's vendor as before. The shadow-seat experiment of v1.34 ended after one run, superseded by Luna counting; the one comparison stays in that run's record. A preflight step (scripts/panel/preflight.sh: the seat's CLI version, and for Codex its reported login state; Claude's Keychain login is proven by the canary) runs from the runner before a package is assembled, so a dead seat is found before anything is sent; the quota probe is the launcher's canary itself, a one-line model call that every attempt already makes and that fails on an exhausted allowance before the package goes."
    - "By whom, again. The founder decided the retirement on cost; the editor chose the shape and put it to the full board: four memos, all REVISE, every required change taken, one split resolved three to one against counting the shadow answer for the run in progress. The memos ran on GPT-6 Sol, the vendor that gains two seats, so the pass spent the usage the founder has and asked the beneficiary to argue against itself. The board record is private; this entry is the public account of it."
    - "What this entry does not do: it does not change the matrix, the agreement words, the cautious lean or any published finding; it does not claim the two OpenAI seats are independent; and it does not claim Luna reviews as well as the seat it replaces."
  links:
    - label: How a finding is produced
      href: /methodology#stages
    - label: The current pins and the vendor split (docs/DESIGN.md section 4)
      href: https://github.com/civicfacts/yegfacts/blob/main/docs/DESIGN.md
  note: >
    Three vendors was the method's best argument for independence, and it is
    gone for as long as the founder pays for two. The honest move is not to
    find a third seat that looks like a third vendor but to say, on every
    page, what the panel now is.
- version: "1.36"
  date: "2026-09-23"
  scope: register-fold
  summary: >
    When a new source raises a claim the register already holds, the merge
    now marks it with that claim's id, and its wordings are added to the
    existing claim under the new source's name. No near-duplicate claim is
    registered beside it. The register generator prints this as an addition
    to the existing claim. On the second source, one claim was folded this
    way and one was kept apart.
  highlights:
    - "Decision D-0030 required this, and the second source showed it could not happen. The merge prompt gave the seat the register and did not say what to do with a match, and the generator could only print new claims. The prompt now says: when a merged claim and a register claim would be settled by the same evidence, set `register_id` to the register claim's id and keep the forms, seats, side and commenters as usual. It does not rewrite the existing wording, and when unsure it does not fold. A near-duplicate costs one extra check. A wrong fold puts a person's words under a claim they did not make."
    - "The generator prints a third block beside the new questions and claims. For each existing claim, it lists the wordings to append, the seats to add and how much the claim's people count and its question's count rise. It still prints and does not write. A folded claim is not grouped into a question, because it already has one, and the grouping check accepts it being absent and refuses it being present."
    - "One pseudonym is one person within one source. A wording from another source therefore always adds one person to the count, even if the pseudonym matches one already counted. The site stopped printing people counts under D-0030 for this reason. The register validator already checked each wording against the capture its own source names, so a claim with wordings from two sources passes. Tests now cover that case."
    - "On the second source, the claim that Edmonton's roads are in poor condition although taxes pay for them was folded onto the first source's claim about the poor condition of roads and basic services. The same road-condition records settle both, and that claim already held wordings about roads alone. The question the second source had registered around it held nothing else and was removed. Its address now redirects to the older question. The claim that Edmonton plans to raise taxes substantially over four years was kept apart from the property-taxes question, because past bills and a future budget plan are settled by different records."
  links:
    - label: The merge prompt
      href: https://github.com/civicfacts/yegfacts/blob/main/prompts/intake-merge.md
    - label: What was folded on the second source, and why
      href: https://github.com/civicfacts/yegfacts/blob/main/reviews/intake/edmonton-rant-and-rave-2026-09-10/fold-note.md
 README.md                         |  8 ++--
 docs/DESIGN.md                    | 92 ++++++++++++++++++++++--------------
 methodology/changelog.yaml        | 54 +++++++++++++++++++++
 scripts/panel/attempt-record.ts   |  6 +++
 scripts/panel/audit-package.sh    | 14 ++++--
 scripts/panel/capture-check.ts    | 99 ++++++++++++++++++++++++++++++++++++++-
 scripts/panel/invoke-reviewer.sh  | 18 ++++++-
 scripts/panel/preflight.sh        | 35 ++++++++++++++
 scripts/panel/run-reviewer.sh     | 71 ++++++++++++++++------------
 scripts/panel/stream-boundary.ts  | 13 ++++-
 src/components/AiReview.astro     | 29 +++++++++---
 src/components/ClaimFinding.astro |  5 +-
 src/lib/glossary.ts               | 73 ++++++++++++++++++++++++++++-
 src/pages/about.astro             | 15 +++---
 src/pages/methodology/index.astro | 51 ++++++++++++--------
 src/pages/questions/[id].astro    | 21 ++++++++-
 src/pages/sources/[id].astro      | 12 ++---
 src/pages/support.astro           |  8 ++--
 tests/capture-check.test.ts       | 72 ++++++++++++++++++++++++++++
 tests/invoke-reviewer.test.ts     | 70 +++++++++------------------
 tests/stream-boundary.test.ts     |  2 +
 tests/three-seats.test.ts         |  6 ++-
 22 files changed, 602 insertions(+), 172 deletions(-)

codex
The September 23 stewardship state is current: seven published stories, with this review, the PR, and the frozen-run Claude rerun next. D-0042 now records the canary as the quota probe. I’ll verify the implementation against that updated decision.
exec
/bin/zsh -lc "git diff origin/main -- 'scripts/panel/capture-check.ts'" in <repo>
 succeeded in 0ms:
diff --git a/scripts/panel/capture-check.ts b/scripts/panel/capture-check.ts
index 5810115..67d30c6 100644
--- a/scripts/panel/capture-check.ts
+++ b/scripts/panel/capture-check.ts
@@ -109,6 +109,18 @@ export type CaptureCheckResult = {
    * of a run record should not have to assume the two numbers are the same.
    */
   searched: number;
+  /**
+   * How many captured requests carried the operator's home path only inside
+   * the CLI's own binary-save note (methodology v1.38). Claude Code writes
+   * "[Binary content (<type>, <size>) also saved to <path>]" into a tool
+   * result when a fetch returns a binary, and the path is under the operator's
+   * home. That is the CLI describing its own file, not an instruction from this
+   * machine, so it is counted and disclosed rather than refused. The path was
+   * still sent to the vendor; the count is what says so on the run row. Any
+   * occurrence of the home path outside that note, and any other protected
+   * string anywhere, still fails the check.
+   */
+  operator_path_notes: number;
 };
 
 export type CaptureCheckInput = {
@@ -131,6 +143,73 @@ export type CaptureCheckInput = {
  */
 const MIN_LINE = 24;
 
+export const HOME_SOURCE = 'the home directory';
+
+const asRecord = (value: unknown): Record<string, unknown> | null =>
+  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
+
+const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
+
+/**
+ * The CLI's fixed note for a fetched binary it wrote to disk, with the path
+ * pinned to where Claude Code writes such files: under its own projects
+ * directory in the operator's home, in a tool-results folder. A note naming any
+ * other path is not this note and is not cut. Nothing else matches.
+ */
+function binarySaveNote(home: string): RegExp {
+  return new RegExp(
+    '\\[Binary content \\([^()\\]]*\\) also saved to ' +
+      escapeRegExp(home) +
+      '/\\.claude/projects/[^\\]\\s]+/tool-results/[^\\]\\s]+\\]',
+    'g',
+  );
+}
+
+/**
+ * The string values that sit inside tool_result blocks of a Messages request:
+ * `messages[].content[].content` as a string, or the `text` of its blocks. The
+ * CLI writes its binary-save note there and nowhere else, so the cut is
+ * allowed there and nowhere else; the same note in a text block, a system
+ * prompt or a tool input is searched as sent.
+ */
+function toolResultStrings(body: unknown): Set<string> {
+  const found = new Set<string>();
+  const messages = asRecord(body)?.messages;
+  if (!Array.isArray(messages)) return found;
+  for (const message of messages) {
+    const content = asRecord(message)?.content;
+    if (!Array.isArray(content)) continue;
+    for (const block of content) {
+      const record = asRecord(block);
+      if (record?.type !== 'tool_result') continue;
+      const inner = record.content;
+      if (typeof inner === 'string') found.add(inner);
+      else if (Array.isArray(inner)) {
+        for (const part of inner) {
+          const text = asRecord(part)?.text;
+          if (typeof text === 'string') found.add(text);
+        }
+      }
+    }
+  }
+  return found;
+}
+
+/**
+ * A tool-result value with the CLI's binary-save notes cut out, and how many
+ * of them there were. Only the home-directory source is searched over the cut
+ * text; every other source searches the value as sent. Every note that matches
+ * carries the home path by construction, so the count is the count of notes.
+ */
+function withoutSaveNotes(value: string, note: RegExp): { text: string; notes: number } {
+  let notes = 0;
+  const text = value.replace(note, () => {
+    notes += 1;
+    return '';
+  });
+  return { text, notes };
+}
+
 /**
  * The one family of sources reported as a single row. See `PrivateSource.group`.
  */
@@ -356,6 +435,11 @@ export function checkCapture(input: CaptureCheckInput): CaptureCheckResult {
     failures.push('the denylist holds no lines at all, so nothing was searched for and a pass would mean nothing');
   }
 
+  const homeSource = sources.find((source) => source.name === HOME_SOURCE);
+  const home = homeSource?.lines[0] ?? '';
+  const note = home === '' ? null : binarySaveNote(home);
+  let operatorPathNotes = 0;
+
   for (const request of requests) {
     if (!isJsonBody(request.body)) continue;
     jsonBodies += 1;
@@ -363,20 +447,32 @@ export function checkCapture(input: CaptureCheckInput): CaptureCheckResult {
     // Collected once per request rather than re-walked per source: a main turn
     // carries a few hundred strings and the denylist runs to thousands of lines.
     const values = [...strings(request.body)];
+    const toolResults = note ? toolResultStrings(request.body) : new Set<string>();
 
     if (packageText !== '' && values.some((value) => value.includes(packageText))) packageSeen += 1;
 
+    let notesHere = 0;
     for (const source of sources) {
       const hit = new Set<number>();
       for (const value of values) {
+        // v1.38: the home path inside the CLI's own binary-save note, inside a
+        // tool result, is counted, not refused. The cut is made for this one
+        // source, in those values, and nowhere else.
+        let text = value;
+        if (source === homeSource && note && toolResults.has(value)) {
+          const cut = withoutSaveNotes(value, note);
+          text = cut.text;
+          notesHere += cut.notes;
+        }
         source.lines.forEach((line, index) => {
-          if (!hit.has(index) && value.includes(line)) hit.add(index);
+          if (!hit.has(index) && text.includes(line)) hit.add(index);
         });
       }
       for (const index of [...hit].sort((a, b) => a - b)) {
         failures.push(`${request.file}: carries ${source.name} line ${index + 1}`);
       }
     }
+    if (notesHere > 0) operatorPathNotes += 1;
   }
 
   if (packageText !== '' && packageSeen === 0) {
@@ -393,6 +489,7 @@ export function checkCapture(input: CaptureCheckInput): CaptureCheckResult {
     package_seen: packageSeen,
     requests: requests.length,
     searched: jsonBodies,
+    operator_path_notes: operatorPathNotes,
   };
 }
 

exec
/bin/zsh -lc "git diff origin/main -- 'scripts/panel/invoke-reviewer.sh'" in <repo>
exec
/bin/zsh -lc "git diff origin/main -- 'src/lib/glossary.ts'" in <repo>
 succeeded in 0ms:
diff --git a/scripts/panel/invoke-reviewer.sh b/scripts/panel/invoke-reviewer.sh
index 68d126a..600e4d2 100755
--- a/scripts/panel/invoke-reviewer.sh
+++ b/scripts/panel/invoke-reviewer.sh
@@ -191,7 +191,7 @@ fi
 
 # ---------------------------------------------------------------------------
 PROVIDER=""; PACKAGE=""; ATTEMPT_DIR=""; MODEL=""; EFFORT=""; LABEL=""
-PURPOSE="research"; MAX_BUDGET=""
+PURPOSE="research"; MAX_BUDGET=""; FINISH_FROZEN=0
 while [ "$#" -gt 0 ]; do
   case "$1" in
     --provider) PROVIDER="${2:-}"; shift 2 ;;
@@ -202,6 +202,7 @@ while [ "$#" -gt 0 ]; do
     --label) LABEL="${2:-}"; shift 2 ;;
     --purpose) PURPOSE="${2:-}"; shift 2 ;;
     --max-budget-usd) MAX_BUDGET="${2:-}"; shift 2 ;;
+    --finish-frozen-run) FINISH_FROZEN=1; shift ;;
     *) die "unknown option: $1" ;;
   esac
 done
@@ -352,6 +353,10 @@ write_metadata() {
       // Which private sources were read and how many lines each contributed.
       // Names and counts only: the lines themselves never leave the check.
       [prefix + "capture_check_sources"]: value.sources,
+      // v1.38: requests whose only trace of the home path was the note the CLI
+      // itself wrote after saving a fetched binary. Public; the count is the
+      // disclosure.
+      [prefix + "operator_path_notes"]: value.operator_path_notes ?? null,
       [prefix + "requests_manifest_sha256"]: value.requests_manifest_sha256 ?? null,
     });
     fs.writeFileSync(out, JSON.stringify({
@@ -593,6 +598,17 @@ DEFAULT_EFFORT="high"
 # Applied before any refusal, so the retained metadata names the seat.
 MODEL="${MODEL:-$DEFAULT_MODEL}"
 EFFORT="${EFFORT:-$DEFAULT_EFFORT}"
+
+# Methodology v1.37 (2026-09-23): the Google seat is retired for every run
+# frozen after that date. The profile stays so the runs it did can be
+# read; a new run reaches it only when the caller says the run froze under the
+# three-provider rule, and says so again in the run record. Refused here as
+# well as in the two callers, because a launcher that trusts its callers is a
+# way to run a retired seat by hand.
+if [ "$PROVIDER" = "google" ] && [ "$FINISH_FROZEN" != "1" ]; then
+  refuse blocked "the Google seat is retired for runs frozen after 2026-09-23 (methodology v1.37); pass --finish-frozen-run only for a run that froze under the three-provider rule"
+fi
+
 PROFILE="$PROFILE_NAME"
 
 case ",$PINNED_MODELS," in

 succeeded in 0ms:
diff --git a/src/lib/glossary.ts b/src/lib/glossary.ts
index cb58846..1624c58 100644
--- a/src/lib/glossary.ts
+++ b/src/lib/glossary.ts
@@ -1,3 +1,7 @@
+import { existsSync } from 'node:fs';
+import path from 'node:path';
+import { loadRunManifest } from '../../scripts/lib/review-schema';
+import type { Claim } from './content';
 import { FINDING_GLOSS, PANEL_AGREEMENT_GLOSS } from './findings';
 
 /**
@@ -97,6 +101,11 @@ export const glossary: Record<string, GlossaryEntry> = {
   // popover and the methodology page cannot drift apart.
   ...withHref(FINDING_GLOSS, VOCABULARY),
   ...withHref(PANEL_AGREEMENT_GLOSS, AGREEMENT),
+  Unanimous: {
+    definition:
+      'All three seats reached the same verdict. Panel agreement describes seats, not vendors; two OpenAI seats agreeing are not two independent vendor confirmations.',
+    href: AGREEMENT,
+  },
 
   'evidence basis': {
     definition:
@@ -125,7 +134,17 @@ export const glossary: Record<string, GlossaryEntry> = {
   },
   'three-model AI panel': {
     definition:
-      'Three AI reviewers from different vendors research each claim independently in a first round that is blind to the other two, then read one another\u2019s findings in a second round that documents errors. Which models ran is recorded with every run and shown in the AI review section of every question.',
+      'Three AI models from three vendors (Claude, GPT, Gemini) researched this claim in a blind first round, then read one another\u2019s findings in a second round that documented errors. This label describes a run frozen before September 23, 2026.',
+    href: STAGES,
+  },
+  'AI panel': {
+    definition:
+      'The seats that produced this finding are listed in its run manifest. This page could not read that manifest, so it names no vendors here.',
+    href: STAGES,
+  },
+  'three-seat AI panel, two vendors': {
+    definition:
+      'Three AI model seats from two vendors: one Anthropic model and two OpenAI models. The two OpenAI seats are not independent of each other, so three agreeing verdicts are not three independent confirmations.',
     href: STAGES,
   },
   'published rule': {
@@ -136,7 +155,7 @@ export const glossary: Record<string, GlossaryEntry> = {
 
   panel: {
     definition:
-      'The three models that research each claim independently, blind to each other and to this repo. They never vote: the finding is computed from their locked first-round verdicts by a rule published in advance.',
+      'The three model seats that research each claim blind to each other. Current runs use three AI model seats from two vendors: one Anthropic model and two OpenAI models. The two OpenAI seats are not independent of each other. A published rule computes the finding from their locked first-round verdicts.',
     href: STAGES,
   },
   'cross-review': {
@@ -146,6 +165,56 @@ export const glossary: Record<string, GlossaryEntry> = {
   },
 };
 
+const missingPanels = new Set<string>();
+
+/** The panel that produced a claim, or the historical label with one warning if its manifest cannot be read. */
+export function panelForClaim(claim: Claim): { term: string; label: string } {
+  const historical = {
+    term: 'three-model AI panel',
+    label: 'three-model AI panel (Claude, GPT, Gemini)',
+  };
+  const unreadable = {
+    term: 'AI panel',
+    label: 'AI panel (seats in the run record)',
+  };
+  try {
+    const file = path.join(process.cwd(), claim.data.review_run, 'run.yaml');
+    if (!existsSync(file)) throw new Error('run.yaml is missing');
+    // Only the seats that answered. A refused or failed attempt keeps its
+    // manifest row (that is the retention rule) and is not a seat on the panel.
+    // Manifests written before methodology v1.28 carry no status field; every
+    // row in them is an answered seat.
+    const seats = loadRunManifest(file).runs
+      .filter((run) => run.round === 1 && (run.status === undefined || run.status === 'ok'))
+      .map((run) => ({ provider: run.provider.toLowerCase(), name: run.seat ?? run.model_id }));
+    if (seats.length !== 3 || seats.some((seat) => !seat.name)) {
+      throw new Error('round-one seats are incomplete');
+    }
+    const providers = new Set(seats.map((seat) => seat.provider));
+    if (providers.size === 3) return historical;
+    if (
+      providers.size === 2 &&
+      seats.filter((seat) => seat.provider === 'anthropic').length === 1 &&
+      seats.filter((seat) => seat.provider === 'openai').length === 2
+    ) {
+      return {
+        term: 'three-seat AI panel, two vendors',
+        label: 'three-seat AI panel, two vendors (Claude; GPT × 2)',
+      };
+    }
+    throw new Error('round-one providers do not match a published panel');
+  } catch (error) {
+    // Never the historical label by default: a manifest this page cannot read
+    // is not evidence of three vendors. The page says the seats are in the
+    // run record, and the build says which claim, once.
+    if (!missingPanels.has(claim.data.id)) {
+      console.warn(`Panel label for claim ${claim.data.id}: ${String(error)}; the page names no vendors`);
+      missingPanels.add(claim.data.id);
+    }
+    return unreadable;
+  }
+}
+
 export function define(term: string): GlossaryEntry | undefined {
   return glossary[term] ?? glossary[term.toLowerCase()];
 }

exec
/bin/zsh -lc "git diff origin/main -- 'scripts/panel/stream-boundary.ts'" in <repo>
 succeeded in 0ms:
diff --git a/scripts/panel/stream-boundary.ts b/scripts/panel/stream-boundary.ts
index beddcdc..ca2e30b 100644
--- a/scripts/panel/stream-boundary.ts
+++ b/scripts/panel/stream-boundary.ts
@@ -471,11 +471,20 @@ export function contextProof(check: CaptureCheckResult | null, kind: RecordKind
   if (check.status === 'pass') {
     const read = check.sources.filter((source) => source.present);
     const lines = read.reduce((total, source) => total + source.lines_checked, 0);
+    // v1.38: a pass with counted notes must not also claim that none of the
+    // private text appeared. The home path did appear, inside the note the CLI
+    // wrote about a binary it saved, and the sentence says exactly that.
+    const appeared =
+      check.operator_path_notes > 0
+        ? `and none of it appeared except the operator's home-directory path, which ${check.operator_path_notes} ` +
+          "request(s) carried inside the CLI's own note about a fetched binary it saved to disk; that path was " +
+          'sent to the vendor and is recorded rather than refused (methodology v1.38)'
+        : 'and none of it appeared';
     const searched =
       `${check.searched} of ${check.requests} ` +
       (kind === 'request' ? 'captured request(s) had a JSON body and were searched' : 'record entr(ies) were searched') +
-      ` for ${lines} line(s) of private text from ${read.length} source(s) on this machine, and none of it ` +
-      `appeared. ${check.package_seen} ` +
+      ` for ${lines} line(s) of private text from ${read.length} source(s) on this machine, ${appeared}. ` +
+      `${check.package_seen} ` +
       (kind === 'request' ? 'request(s)' : 'record entr(ies)') +
       ' carried the declared package byte for byte.';
     if (kind === 'request') {

exec
/bin/zsh -lc "git diff origin/main -- 'scripts/panel/preflight.sh'" in <repo>
 succeeded in 0ms:
diff --git a/scripts/panel/preflight.sh b/scripts/panel/preflight.sh
new file mode 100755
index 0000000..4218ba4
--- /dev/null
+++ b/scripts/panel/preflight.sh
@@ -0,0 +1,35 @@
+#!/usr/bin/env bash
+# Check active vendor CLIs, their versions, and (for codex) the reported login state before a panel run.
+# This does not call a model, test quota, or prove that a Keychain-backed login will work;
+# the launcher's canary, a one-line model call per attempt, is what finds an exhausted
+# allowance. Pass CLI names to check only those (the runner passes its seat's CLI);
+# with no arguments both active CLIs are checked.
+set -uo pipefail
+
+failed=0
+clis=("$@")
+if [ "${#clis[@]}" -eq 0 ]; then clis=(claude codex); fi
+for cli in "${clis[@]}"; do
+  if ! command -v "$cli" >/dev/null 2>&1; then
+    printf '%s: missing; login: unavailable\n' "$cli"
+    failed=1
+    continue
+  fi
+  printf '%s: %s\n' "$cli" "$("$cli" --version 2>&1)"
+  if [[ "$cli" == claude ]]; then
+    # Claude Code keeps its login in the Keychain and exposes no read that
+    # does not also start a session. The launcher's canary, the first thing
+    # every attempt does, is what proves that login; this step proves the
+    # tool is present and which build it is.
+    printf 'claude login: proven by the canary, not checked here\n'
+  else
+    status=$("$cli" login status 2>&1)
+    if [[ "$status" == *'Logged in'* ]]; then
+      printf 'codex login: reported\n'
+    else
+      printf 'codex login: not reported\n'
+      failed=1
+    fi
+  fi
+done
+exit "$failed"

exec
/bin/zsh -lc "git diff origin/main -- 'scripts/panel/run-reviewer.sh'" in <repo>
 succeeded in 0ms:
diff --git a/scripts/panel/run-reviewer.sh b/scripts/panel/run-reviewer.sh
index 5037262..841af4d 100755
--- a/scripts/panel/run-reviewer.sh
+++ b/scripts/panel/run-reviewer.sh
@@ -5,8 +5,8 @@
 #   scripts/panel/run-reviewer.sh <provider> <story> <date> <round> [--dry-run]
 #   scripts/panel/run-reviewer.sh claude electric-buses 2026-08-31 1
 #
-# Providers: claude | codex | agy  (aliases: anthropic, gpt/openai, gemini/google)
-#           luna | shadow  (the uncounted shadow seat, v1.34; needs --into)
+# Providers: claude | codex | luna  (aliases: anthropic, gpt/openai)
+#           agy | gemini | google: retired under v1.37, only with --finish-frozen-run
 #
 # Isolation is NOT this script's business, and the older version of this comment
 # claiming a fresh mktemp -d was the boundary was wrong: a CLI loads its
@@ -57,10 +57,10 @@ REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
 usage() {
   cat >&2 <<'USAGE'
 usage: scripts/panel/run-reviewer.sh <provider> <story> <date> <round> [options]
-  provider  claude | codex | agy   (aliases: anthropic, gpt, openai, gemini, google)
-            luna | shadow          the uncounted shadow seat (v1.34): round 1 only,
-                                   and --into shadow-<name> is required so it never
-                                   lands in a round directory
+  provider  claude | codex | luna  (aliases: anthropic, gpt, openai)
+            agy | gemini | google  retired for runs frozen after 2026-09-23
+                                   (methodology v1.37); refused unless
+                                   --finish-frozen-run says the run froze before
   story     story slug, e.g. electric-buses
   date      run date, e.g. 2026-08-31
   round     1 (blind research) or 2 (cross-review)
@@ -70,6 +70,8 @@ options:
   --claims <id,...>  answer only these claim ids (claim-scoped re-run)
   --into <dirname>   write the review and the manifest under <run>/<dirname>
                      instead of <run>/round<N> and <run>/run.yaml
+  --finish-frozen-run  the run froze under the three-provider rule before
+                     2026-09-23, so the retired Google seat may finish it
 USAGE
   exit 2
 }
@@ -80,11 +82,13 @@ PROVIDER_ARG="$1"; STORY="$2"; RUN_DATE="$3"; ROUND="$4"; shift 4
 DRY_RUN=0
 CLAIMS=""
 INTO=""
+FINISH_FROZEN=0
 while [ "$#" -gt 0 ]; do
   case "$1" in
     --dry-run) DRY_RUN=1; shift ;;
     --claims) CLAIMS="${2:-}"; [ -n "$CLAIMS" ] || { echo "--claims needs a value" >&2; usage; }; shift 2 ;;
     --into) INTO="${2:-}"; [ -n "$INTO" ] || { echo "--into needs a value" >&2; usage; }; shift 2 ;;
+    --finish-frozen-run) FINISH_FROZEN=1; shift ;;
     *) echo "unknown option: $1" >&2; usage ;;
   esac
 done
@@ -94,22 +98,23 @@ esac
 
 case "$ROUND" in 1|2) ;; *) echo "round must be 1 or 2, got '$ROUND'" >&2; exit 2 ;; esac
 case "$PROVIDER_ARG" in
-  luna|shadow)
-    # The shadow seat is never merged. scripts/merge.ts reads every JSON file
-    # in a round directory, so the only way to keep that promise is to refuse
-    # to write into one. Round 2 hands a seat the other seats' findings, which
-    # a seat that is not on the panel has no business reading.
-    case "$INTO" in
-      shadow-*) ;;
-      *) echo "the shadow seat needs --into shadow-<name>; it is never written into a round directory" >&2; exit 2 ;;
-    esac
-    [ "$ROUND" = "1" ] || { echo "the shadow seat runs round 1 only" >&2; exit 2; }
+  agy|gemini|google)
+    # Methodology v1.37 (2026-09-23): the Google seat is retired for every run
+    # frozen after that date. A run frozen under the three-provider rule
+    # finishes under it, and the flag is how the operator says so; the run
+    # record is where they say which run and why.
+    if [ "$FINISH_FROZEN" != "1" ]; then
+      echo "the Google seat is retired for runs frozen after 2026-09-23 (methodology v1.37);" >&2
+      echo "pass --finish-frozen-run only for a run that froze under the three-provider rule" >&2
+      exit 2
+    fi
     ;;
 esac
 
 # ---------------------------------------------------------------------------
 # Provider → pinned command (spec §5.2). The output filename is the panel's
-# short name so a run directory reads round1/{claude,gpt,gemini}.json.
+# short name so a run directory reads round1/{claude,gpt,gpt-luna}.json
+# (round1/gemini.json on runs frozen before v1.37).
 #
 # Reasoning effort is pinned per seat (methodology v1.6), not left to whatever
 # the local CLI configuration happens to default to. `high` is the highest
@@ -138,18 +143,14 @@ case "$PROVIDER_ARG" in
     SLOT="gpt"; CLI="codex"; MODEL_ID="gpt-6-sol"
     PROVIDER_CANONICAL="openai"; SEAT="GPT-6 Sol"
     ;;
-  luna|shadow)
-    # v1.34 (2026-09-23): the shadow seat. GPT-6 Luna is the cheapest model
-    # any panel vendor sells, and whether a model that cheap can hold a
-    # research seat is an open question this site answers by measurement,
-    # not by guessing. It runs the same frozen package as the three counted
-    # seats and its answer is committed, but it is never merged and never
-    # synthesised: it must be run with --into shadow-<name>, because
-    # scripts/merge.ts reads every JSON file in a round directory, and the
-    # run's synthesis_scope names no shadow. The
-    # comparison against the counted seats is written into run-record.md.
+  luna)
+    # v1.37 (2026-09-23): the third counted seat. It was v1.34's uncounted
+    # shadow seat for exactly one run (lanes-and-congestion round 1); the
+    # Google seat's retirement the same day made it a panel seat. Two OpenAI
+    # seats on one panel are not independent of each other, and every page
+    # that names the panel says so.
     SLOT="gpt-luna"; CLI="codex"; MODEL_ID="gpt-6-luna"
-    PROVIDER_CANONICAL="openai"; SEAT="GPT-6 Luna (shadow, not counted)"
+    PROVIDER_CANONICAL="openai"; SEAT="GPT-6 Luna"
     ;;
   agy|gemini|google)
     # v1.20 (2026-09-03): the seat moves from Gemini 3.1 Pro to Gemini 3.8
@@ -187,7 +188,7 @@ OUT_DIR="$RUN_DIR/${INTO:-round$ROUND}"
 OUT_FILE="$OUT_DIR/$SLOT.json"
 # A --into directory that is a symbolic link is a destination whose name says
 # one thing and whose contents land somewhere else. Nothing legitimate needs
-# one, and for the shadow seat it is the one way left to reach round1/.
+# one.
 if test -n "$INTO" && test -L "$OUT_DIR"; then
   echo "--into '$INTO' is a symbolic link; refusing to write through it" >&2; exit 2
 fi
@@ -328,6 +329,14 @@ ARCHIVE_ROOT="$("$INVOKE" --archive-root)"
 RUN_STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
 ATTEMPT_BASE="$ARCHIVE_ROOT/$STORY/$RUN_DATE/${INTO:-round$ROUND}/$SLOT/$RUN_STAMP"
 
+# Methodology v1.37: the seat's CLI is checked for a version and a reported
+# login before a package is assembled, so a dead seat is found here rather
+# than after a run has been filed. The launcher's canary is the quota probe.
+if [ "$DRY_RUN" != "1" ] && [ "$CLI" != "agy" ]; then
+  "$REPO_ROOT/scripts/panel/preflight.sh" "$CLI" >&2 \
+    || { echo "[$SLOT round $ROUND] preflight failed for $CLI; nothing was assembled or sent" >&2; exit 2; }
+fi
+
 if [ "$DRY_RUN" = "1" ]; then
   echo "DRY RUN — no CLI executed, nothing written under reviews/"
   echo
@@ -400,7 +409,9 @@ for attempt in 1 2; do
   echo "[$SLOT round $ROUND] attempt $attempt: $COMMAND_STRING" >&2
 
   INVOKE_OK=1
-  "$INVOKE" --purpose research --provider "$PROVIDER_CANONICAL" --package "$PACKAGE" \
+  FROZEN_FLAG=()
+  if [ "$FINISH_FROZEN" = "1" ]; then FROZEN_FLAG=(--finish-frozen-run); fi
+  "$INVOKE" --purpose research --provider "$PROVIDER_CANONICAL" --package "$PACKAGE" ${FROZEN_FLAG[@]+"${FROZEN_FLAG[@]}"} \
     --attempt-dir "$ATTEMPT_DIR" --model "$MODEL_ID" --effort "$EFFORT" \
     --label "$SLOT round $ROUND" || INVOKE_OK=0
 

exec
/bin/zsh -lc "git diff origin/main -- 'tests/invoke-reviewer.test.ts'" in <repo>
 succeeded in 0ms:
diff --git a/tests/invoke-reviewer.test.ts b/tests/invoke-reviewer.test.ts
index a3b5367..5a0e258 100644
--- a/tests/invoke-reviewer.test.ts
+++ b/tests/invoke-reviewer.test.ts
@@ -465,7 +465,7 @@ describe('research admission', { timeout: 60_000 }, () => {
     // credential check. A model on no list stops earlier.
     ['openai', 'gpt-5.6-sol', /no codex credential at \$HOME\/\.codex\/auth\.json/],
     ['openai', 'gpt-5.6-luna', /model 'gpt-5\.6-luna' is not pinned for openai/],
-    ['google', 'gemini-3.8-flash-high', /no gemini credential at \$HOME\/\.gemini/],
+    ['google', 'gemini-3.8-flash-high', /retired for runs frozen after 2026-09-23 \(methodology v1\.37\)/],
     ['mystery-vendor', 'claude-opus-5-5', /unknown provider/],
   ])('refuses %s for research without invoking anything', (provider, model, expected) => {
     const stub = stubClaude();
@@ -497,7 +497,7 @@ describe('research admission', { timeout: 60_000 }, () => {
 
   it.each([
     ['openai', 'gpt-6-sol', /no codex credential at \$HOME\/\.codex\/auth\.json/],
-    ['google', 'gemini-3.8-flash-high', /no gemini credential at \$HOME\/\.gemini/],
+    ['google', 'gemini-3.8-flash-high', /retired for runs frozen after 2026-09-23 \(methodology v1\.37\)/],
   ])('records %s with its own seat and its own reason when no model is named', (provider, model, expected) => {
     const stub = stubClaude();
     const attempt = path.join(stub.archive, 'defaults', provider);
@@ -1188,49 +1188,29 @@ describe('run-reviewer', { timeout: 120_000 }, () => {
   });
 
   /**
-   * The shadow seat (methodology v1.34) is never merged. scripts/merge.ts
-   * reads every JSON file in a round directory, so the only way to keep that
-   * promise is to refuse every destination that is not a shadow- directory,
-   * and to refuse round 2, which would hand a seat that is not on the panel
-   * the panel's findings.
+   * Methodology v1.37: the Google seat is retired for runs frozen after
+   * 2026-09-23. The runner refuses it unless the operator says the run froze
+   * under the three-provider rule; audits have no such flag.
    */
-  it('refuses the shadow seat anywhere but round 1 of a shadow- directory', () => {
+  it('refuses the retired Google seat unless the run froze before the retirement', () => {
     const stub = stubClaude();
     const script = path.join(repo, 'scripts', 'panel', 'run-reviewer.sh');
-    const cases: [string[], RegExp][] = [
-      [['1'], /needs --into shadow-<name>/],
-      [['1', '--into', 'round1'], /needs --into shadow-<name>/],
-      [['1', '--into', 'round1-rerun-1'], /needs --into shadow-<name>/],
-      [['1', '--into', 'round2'], /needs --into shadow-<name>/],
-      [['2', '--into', 'shadow-round1'], /round 1 only/],
-    ];
-    for (const [args, expected] of cases) {
-      const result = run([script, 'luna', STORY, RUN_DATE, ...args, '--dry-run'], stub.env);
-      expect(result.ok).toBe(false);
-      expect(result.stderr).toMatch(expected);
-    }
-    // A shadow- name that is a link into round1/ is the last way in, and it is
-    // refused before anything is assembled.
-    const runDir = path.join(repo, 'reviews', STORY, RUN_DATE);
-    mkdirSync(path.join(runDir, 'round1'), { recursive: true });
-    symlinkSync(path.join(runDir, 'round1'), path.join(runDir, 'shadow-linked'));
-    const linked = run([script, 'luna', STORY, RUN_DATE, '1', '--into', 'shadow-linked', '--dry-run'], stub.env);
-    expect(linked.ok).toBe(false);
-    expect(linked.stderr).toMatch(/is a symbolic link/);
+    const refused = run([script, 'agy', STORY, RUN_DATE, '1', '--dry-run'], stub.env);
+    expect(refused.ok).toBe(false);
+    expect(refused.stderr).toMatch(/retired for runs frozen after 2026-09-23/);
+    const allowed = run([script, 'agy', STORY, RUN_DATE, '1', '--finish-frozen-run', '--dry-run'], stub.env);
+    expect(allowed.ok).toBe(true);
+    expect(allowed.stdout).toMatch(/model:\s+gemini-3\.8-flash-high/);
     expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
   });
 
-  it('describes the shadow seat as gpt-6-luna writing into its own directory', () => {
+  it('describes the Luna seat as a counted seat writing into round1', () => {
     const stub = stubClaude();
-    const result = run(
-      [path.join(repo, 'scripts', 'panel', 'run-reviewer.sh'), 'luna', STORY, RUN_DATE, '1', '--into', 'shadow-round1', '--dry-run'],
-      stub.env,
-    );
+    const result = run([path.join(repo, 'scripts', 'panel', 'run-reviewer.sh'), 'luna', STORY, RUN_DATE, '1', '--dry-run'], stub.env);
     expect(result.ok).toBe(true);
     expect(result.stdout).toMatch(/model:\s+gpt-6-luna/);
     expect(result.stdout).toMatch(/effort:\s+high/);
-    expect(result.stdout).toMatch(/shadow-round1\/gpt-luna\.json/);
-    expect(result.stdout).not.toMatch(/\/round1\/gpt/);
+    expect(result.stdout).toMatch(/round1\/gpt-luna\.json/);
     expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
   });
 });
@@ -1446,7 +1426,10 @@ describe('audit-package', { timeout: 60_000 }, () => {
     expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
   });
 
-  it('records a Google audit as a Google refusal, without running agy', () => {
+  it('refuses a Google audit as retired, before anything is filed or run', () => {
+    // Methodology v1.37: the Google seat is retired. An audit cannot be
+    // commissioned from it, so there is nothing to file against Google; the
+    // wrapper refuses as a usage error and the launcher is never reached.
     const stub = stubClaude();
     const report = path.join(root, 'audit-google-report.md');
     const result = run(
@@ -1456,19 +1439,10 @@ describe('audit-package', { timeout: 60_000 }, () => {
     );
 
     expect(result.ok).toBe(false);
-    // Google's own reason, not the Claude candidate's. The Gemini seat can run
-    // from v1.31; this machine has no Gemini credential, and the refusal is
-    // still filed against Google with Google's seat.
-    expect(result.stderr).toMatch(/no gemini credential at \$HOME\/\.gemini/);
+    expect(result.stderr).toMatch(/the Google seat is retired for new audits \(methodology v1\.37/);
     expect(existsSync(report)).toBe(false);
-
-    // The retained attempt is filed under google, with google's seat.
-    const base = path.join(stub.archive, 'audits', 'consultation-framing', 'google');
-    const stamps = readdirSync(base);
-    const metadata = readJson(path.join(base, stamps[0]!, 'attempt-1', 'metadata.json'));
-    expect(metadata.provider).toBe('google');
-    expect(metadata.model_id).toBe('gemini-3.8-flash-high');
-    expect(metadata.reasoning_effort).toBe('high');
+    expect(existsSync(path.join(stub.archive, 'audits', 'consultation-framing'))).toBe(false);
+    expect(existsSync(path.join(stub.dir, 'calls'))).toBe(false);
   });
 
   it('rejects a vendor the launcher does not know', () => {

exec
/bin/zsh -lc "git diff origin/main -- 'tests/capture-check.test.ts'" in <repo>
 succeeded in 0ms:
diff --git a/tests/capture-check.test.ts b/tests/capture-check.test.ts
index 49d9df0..5bf411d 100644
--- a/tests/capture-check.test.ts
+++ b/tests/capture-check.test.ts
@@ -242,6 +242,78 @@ describe('capture check', () => {
     expect(JSON.stringify(result)).not.toContain(machine.repoRoot);
   });
 
+  // v1.38: the CLI's own binary-save note, inside a tool result, may carry the
+  // operator's home path. It is counted and disclosed, not refused; the same
+  // path anywhere else, or the same note anywhere else, still refuses.
+  const saveNote = (home: string) =>
+    `Summary of the page.\n\n[Binary content (application/pdf, 2.6MB) also saved to ${home}/.claude/projects/x/tool-results/webfetch-1.pdf]`;
+  const toolResultTurn = (results: string[], extraText: string[] = []) =>
+    request('req-0003.json', {
+      model: 'claude-opus-5',
+      messages: [
+        { role: 'user', content: [{ type: 'text', text: PACKAGE }] },
+        { role: 'assistant', content: [{ type: 'tool_use', id: 't1', name: 'WebFetch', input: { url: 'https://example.com/a.pdf' } }] },
+        {
+          role: 'user',
+          content: [
+            ...results.map((text) => ({ type: 'tool_result', tool_use_id: 't1', content: text })),
+            ...extraText.map((text) => ({ type: 'text', text })),
+          ],
+        },
+      ],
+    });
+
+  it('counts the home path inside the binary-save note in a tool result and does not fail on it', () => {
+    const machine = stubMachine('save-note');
+    const result = check(machine, [connectivity(), sessionTitle(), toolResultTurn([saveNote(machine.home)])]);
+    expect(result.status).toBe('pass');
+    expect(result.operator_path_notes).toBe(1);
+    expect(result.failures).toEqual([]);
+  });
+
+  it('still fails the home path outside the note, and counts the note beside it', () => {
+    const machine = stubMachine('save-note');
+    const result = check(machine, [
+      connectivity(),
+      sessionTitle(),
+      toolResultTurn([saveNote(machine.home)], [`The operator's files live under ${machine.home}/Sites.`]),
+    ]);
+    expect(result.status).toBe('fail');
+    expect(result.failures).toEqual(['req-0003.json: carries the home directory line 1']);
+    expect(result.operator_path_notes).toBe(1);
+  });
+
+  it('does not cut the note when it sits in a text block rather than a tool result', () => {
+    const machine = stubMachine('save-note');
+    const result = check(machine, [connectivity(), sessionTitle(), mainTurn([saveNote(machine.home)])]);
+    expect(result.status).toBe('fail');
+    expect(result.failures).toEqual(['req-0003.json: carries the home directory line 1']);
+    expect(result.operator_path_notes).toBe(0);
+  });
+
+  it('does not cut a note whose path is not under the CLI projects directory', () => {
+    const machine = stubMachine('save-note');
+    const result = check(machine, [
+      connectivity(),
+      sessionTitle(),
+      toolResultTurn([`[Binary content (application/pdf, 2.6MB) also saved to ${machine.home}/Downloads/a.pdf]`]),
+    ]);
+    expect(result.status).toBe('fail');
+    expect(result.operator_path_notes).toBe(0);
+  });
+
+  it('does not cut the note for any other source', () => {
+    const machine = stubMachine('save-note');
+    const result = check(machine, [
+      connectivity(),
+      sessionTitle(),
+      toolResultTurn([`[Binary content (text/plain, 1KB) also saved to ${machine.repoRoot}/x.txt]`]),
+    ]);
+    expect(result.status).toBe('fail');
+    expect(result.failures).toEqual(['req-0003.json: carries the repository path line 1']);
+    expect(result.operator_path_notes).toBe(0);
+  });
+
   it('fails a body carrying the canary token', () => {
     const machine = stubMachine('token');
     const token = 'YEGFACTS_CANARY_0123456789abcdef01234567';

exec
/bin/zsh -lc "git diff origin/main -- 'tests/three-seats.test.ts'" in <repo>
 succeeded in 0ms:
diff --git a/tests/three-seats.test.ts b/tests/three-seats.test.ts
index ae4e217..f74048d 100644
--- a/tests/three-seats.test.ts
+++ b/tests/three-seats.test.ts
@@ -186,7 +186,11 @@ const invoke = (
   const result = run(
     [
       INVOKE, '--purpose', purpose, '--provider', seat, '--package', pkg, '--attempt-dir', attempt,
-      '--model', MODELS[seat], '--effort', 'high', ...extra,
+      '--model', MODELS[seat], '--effort', 'high',
+      // v1.37: the Google profile is kept for runs frozen before the retirement
+      // and reachable only with the flag; these tests exercise that profile.
+      ...(seat === 'google' ? ['--finish-frozen-run'] : []),
+      ...extra,
     ],
     one.env,
   );

exec
/bin/zsh -lc "git diff origin/main -- 'tests/stream-boundary.test.ts'" in <repo>
 succeeded in 0ms:
diff --git a/tests/stream-boundary.test.ts b/tests/stream-boundary.test.ts
index a0cea45..efcb3ef 100644
--- a/tests/stream-boundary.test.ts
+++ b/tests/stream-boundary.test.ts
@@ -150,6 +150,7 @@ describe('canary', () => {
 
 describe('research admission', () => {
   const captureResult = (over: Partial<CaptureCheckResult> = {}): CaptureCheckResult => ({
+    operator_path_notes: 0,
     status: 'pass',
     failures: [],
     sources: [
@@ -355,6 +356,7 @@ describe('record-only proof', () => {
     package_seen: 1,
     requests: 9,
     searched: 9,
+    operator_path_notes: 0,
   });
 
   it('says what it ran over and what that record cannot hold', () => {

exec
/bin/zsh -lc "git diff origin/main -- 'src/pages/methodology/index.astro'" in <repo>
 succeeded in 0ms:
diff --git a/src/pages/methodology/index.astro b/src/pages/methodology/index.astro
index b220e08..7671666 100644
--- a/src/pages/methodology/index.astro
+++ b/src/pages/methodology/index.astro
@@ -3,6 +3,7 @@ import Base from '../../layouts/Base.astro';
 import Finding from '../../components/Finding.astro';
 import NumberedSteps, { type Exit } from '../../components/NumberedSteps.astro';
 import { PANEL_AGREEMENT_GLOSS } from '../../lib/findings';
+import { requireTerm as gloss } from '../../lib/glossary';
 import { SITE, repoPath } from '../../lib/site';
 import { PANEL_AGREEMENT_LEVELS } from '../../lib/vocabulary';
 import { toc } from '../../lib/toc';
@@ -39,15 +40,20 @@ const short: ReadonlyArray<{ name: string; body: string; exits: readonly Exit[]
     ],
   },
   {
-    name: 'Three AI models research it blind',
-    body: "Claude, GPT and Gemini each get the same brief and search the public record on their own, without seeing each other's work. Each comes back with a verdict, the evidence for and against, and what it could not find.",
+    name: 'Three AI model seats research it blind',
+    body: "Three AI model seats from two vendors get the same brief and search the public record without seeing each other's work: one Anthropic model and two OpenAI models. The two OpenAI seats are not independent of each other, so three agreeing verdicts are not three independent confirmations. Each seat returns a verdict, the evidence for and against, and what it could not find.",
     exits: [
       { kind: 'Stops here', text: 'A reviewer that returns nothing after its retry halts the run before any finding.' },
       {
         kind: 'Stops here',
-        text: 'As of September 16, 2026 all three seats can run again, each under a check whose limits are set out below. No panel has run since September 4, and no finding has been published under these checks.',
+        text: 'As of September 16, 2026 all three seats could run again, each under a check whose limits are set out below. No panel had run since September 4, and no finding had been published under those checks.',
         link: { href: '#reviewer-execution', text: 'What the check is, and what it does not show' },
       },
+      {
+        kind: 'Continues',
+        text: 'As of September 23, 2026 the Google seat is retired. The panel is three AI model seats from two vendors: one Anthropic model and two OpenAI models.',
+        link: { href: '/methodology/changes#v1-37', text: 'Methodology v1.37' },
+      },
       { kind: 'Loops back', text: "Afterwards the three read each other's work. A fabricated citation caught there sends that claim back for a fresh blind round." },
     ],
   },
@@ -83,7 +89,7 @@ const intake = [
   },
   {
     name: 'Every claim in it is written down',
-    body: 'Three inexpensive models read that capture separately. Each lists every factual assertion in it: numbers, counts, dates, what somebody says a document said, and the factual premise sitting inside an opinion. They are told not to work out whether any of it is true, and not to decide which parts are interesting. Each one is recorded with the exact words that carry it and the comment those words came from.',
+    body: 'Three extraction seats from two vendors read that capture separately. Each lists every factual assertion in it: numbers, counts, dates, what somebody says a document said, and the factual premise sitting inside an opinion. They are told not to work out whether any of it is true, and not to decide which parts are interesting. Each one is recorded with the exact words that carry it and the comment those words came from.',
   },
   {
     name: 'The three lists become one',
@@ -95,7 +101,7 @@ const intake = [
   },
   {
     name: 'Triage rules on the questions',
-    body: 'The questions go to two readers, one pass each, and neither reader sees the other. Each returns GO, PARK or NO on every one, with a reason short enough to show the person who raised it. Where they disagree the question is kept rather than dropped, because throwing out a real question costs a reader more than holding one too long. Only a GO reaches stage 1 below. The rest are listed anyway, with their reasons, and the questions most people are arguing about are checked first.',
+    body: 'The questions go to two OpenAI readers from one vendor, one pass each, and neither reader sees the other. Each returns GO, PARK or NO on every one, with a reason short enough to show the person who raised it. An Anthropic audit reader re-decides a question both OpenAI readers decline or park before the register records it. Where the two OpenAI readers disagree the question is kept rather than dropped, because throwing out a real question costs a reader more than holding one too long. Only a GO reaches stage 1 below. The rest are listed anyway, with their reasons, and the questions most people are arguing about are checked first.',
   },
 ];
 
@@ -106,7 +112,7 @@ const stages = [
   },
   {
     name: 'Blind research round',
-    body: 'Three models, Claude, GPT and Gemini, receive the identical package: the brief, the public reviewer prompt, and a required JSON output schema. New runs must pass an execution check intended to keep host instructions and private files out of the review. A separate working directory alone did not provide that protection. Since September 16, 2026 every seat has a demonstrated profile again, and what each of those profiles does and does not establish is set out below. Each returns a per-claim verdict, its confidence, the evidence supporting and challenging it, its limitations, what it could not find, and comparison cities with a judgement about whether those cases transfer to Edmonton.',
+    body: 'Three AI model seats from two vendors, one Anthropic model and two OpenAI models, receive the identical package: the brief, the public reviewer prompt, and a required JSON output schema. The two OpenAI seats are not independent of each other, so three agreeing verdicts are not three independent confirmations. New runs must pass an execution check intended to keep host instructions and private files out of the review. A separate working directory alone did not provide that protection. The execution profiles and their limits are set out below. Each seat returns a per-claim verdict, its confidence, the evidence supporting and challenging it, its limitations, what it could not find, and comparison cities with a judgement about whether those cases transfer to Edmonton.',
   },
   {
     name: 'Evidence staging and deterministic merge',
@@ -118,11 +124,11 @@ const stages = [
   },
   {
     name: 'Deterministic synthesis',
-    body: 'A script computes the canonical finding from the three locked round-one verdicts, using a published lookup table over every possible combination. Round one is designed to keep the three judgements separate, so only its verdicts enter the calculation. The execution limits below qualify that claim of independence. Model identity never enters the calculation, and the property is tested. A genuinely split panel produces Mixed, with the split shown. Beside the finding the site publishes panel agreement, Unanimous, Adjacent or Split. That replaced a confidence score in v1.3, because agreement is what the method actually measures and confidence implied a probability of truth that nothing here computes. All published arithmetic lives in a tested script, never in prose. Since v1.24 a run can also publish fewer claims than it asked. Where a framing concern is right and no repair exists that does not weaken the claim, that claim is parked with a public reason, and its answers stay committed.',
+    body: 'A script computes the canonical finding from the three locked round-one verdicts, using a published lookup table over every possible combination. Round one keeps the seats blind to one another, so only its verdicts enter the calculation. The two OpenAI seats are not independent of each other. Model identity never enters the calculation, and the property is tested. A genuinely split panel produces Mixed, with the split shown. Beside the finding the site publishes panel agreement, Unanimous, Adjacent or Split. Those words describe seats, not vendors. That replaced a confidence score in v1.3, because agreement is what the method actually measures and confidence implied a probability of truth that nothing here computes. All published arithmetic lives in a tested script, never in prose. Since v1.24 a run can also publish fewer claims than it asked. Where a framing concern is right and no repair exists that does not weaken the claim, that claim is parked with a public reason, and its answers stay committed.',
   },
   {
     name: 'Drafting, faithfulness check and plain-speech read',
-    body: 'Claude drafts the question page and the claim records from the merged evidence, a fixed choice disclosed here. The other two models then check the draft against the evidence sentence by sentence, looking for anything asserted that the evidence does not carry. Flags are fixed before a human sees it. Then a model from a different vendor than the drafter reads the answers, the sentence under the title and the TL;DR as a person would: would anyone say this out loud, does it make sense to somebody who has not seen the question, and has anything true been dropped rather than moved down. Since v1.32 a page is written in layers, ten seconds for a resident at the top and the exact figures with their sources below, and the read checks that every figure that left the top is still on the page. Its report is committed with the run, and a claim that cannot name its read does not publish.',
+    body: 'Claude drafts the question page and the claim records from the merged evidence, a fixed choice disclosed here. OpenAI seats then check the draft against the evidence sentence by sentence, looking for anything asserted that the evidence does not carry. Flags are fixed before a human sees it. Then a model from a different vendor than the drafter reads the answers, the sentence under the title and the TL;DR as a person would: would anyone say this out loud, does it make sense to somebody who has not seen the question, and has anything true been dropped rather than moved down. Since v1.32 a page is written in layers, ten seconds for a resident at the top and the exact figures with their sources below, and the read checks that every figure that left the top is still on the page. Its report is committed with the run, and a claim that cannot name its read does not publish.',
   },
   {
     name: 'Publication gate',
@@ -137,7 +143,7 @@ const stages = [
  */
 const agreements = PANEL_AGREEMENT_LEVELS.map((level) => ({
   word: level,
-  body: PANEL_AGREEMENT_GLOSS[level],
+  body: level === 'Unanimous' ? gloss(level).definition : PANEL_AGREEMENT_GLOSS[level],
 }));
 
 /**
@@ -198,17 +204,18 @@ const sections = toc([
 <Base
   sections={sections}
   title="Methodology"
-  description="How YEGFacts checks a claim: every claim in a source is listed, a brief is frozen before any research, three AI models research it without seeing each other, a published table turns their verdicts into one finding, and every fact is checked against archived sources before it is published."
+  description="How YEGFacts checks a claim: every claim in a source is listed, a brief is frozen before research, three AI model seats from two vendors review it, a published table turns their verdicts into one finding, and every fact is checked against archived sources before publication."
 >
   <header class="border-b border-rule pb-6">
     <h1 class="text-[1.75rem] leading-[1.15] font-bold tracking-[-0.022em] sm:text-display">
       Methodology
     </h1>
     <p class="mt-3 max-w-prose text-base leading-relaxed text-muted">
-      Three AI models from three companies each check a claim against the public record without
-      seeing each other's work. A rule written down in advance turns their three answers into one
-      finding. Nothing is published until every fact in it has been checked against a saved copy of
-      its source.
+      Three AI model seats from two vendors check each claim against the public record: one
+      Anthropic model and two OpenAI models. The two OpenAI seats are not independent of each other,
+      so three agreeing verdicts are not three independent confirmations. A rule written down in
+      advance turns their three answers into one finding. Nothing is published until every fact in
+      it has been checked against a saved copy of its source.
     </p>
     <p class="mt-3">
       <a href="/methodology/changes" class="link">Methodology changes</a>
@@ -260,7 +267,7 @@ const sections = toc([
     <h2 class="text-xl font-bold tracking-[-0.015em] text-forest">The words we use</h2>
     <p class="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-muted">
       No true or false, and no score out of ten. A finding is one of five words. Beside it sit two
-      more things: what kind of record answered the question, and whether the three reviewers
+      more things: what kind of record answered the question, and whether the three seats
       agreed. A claim can be Supported on a thin record, or Not established by a panel that agreed
       unanimously that the record does not exist.
     </p>
@@ -449,8 +456,14 @@ const sections = toc([
       project, the memory files kept for every project on this computer, the name of the home
       folder, the path of the project, and the one-off token each attempt plants for its own
       test. Every line of them long enough to be distinctive is then looked for in the body of
-      each request that was sent, at any depth, and if any of it is there the run is refused. So
-      is a run whose recording does not carry the declared package word for word, since a
+      each request that was sent, at any depth, and if any of it is there the run is refused,
+      with one exception since September 23, 2026 (v1.38): when Claude's tool fetches a file
+      such as a PDF, the tool saves it to disk and writes a note into its own result naming the
+      path, and that path is in the operator's home folder. That one note, in that one place,
+      is counted rather than refused, and the count is printed on the run's row, because the
+      path was still sent to the vendor. The same words anywhere else, and every other private
+      string anywhere, still refuse the run. So is a run refused whose recording does not carry
+      the declared package word for word, since a
       recording that cannot be tied to the package it was meant to carry says nothing about it.
       A refusal names the file and the line number, never the line, and neither does the
       published record: the private text is read, compared and dropped. What it searches is the
@@ -572,10 +585,10 @@ const sections = toc([
       errors it could make.
     </p>
     <p class="mt-3 max-w-prose text-[0.9375rem] leading-relaxed">
-      The obvious objection is that this hands a single reviewer a veto. The answer is disclosure
+      The obvious objection is that this hands a single seat a veto. The answer is disclosure
       rather than averaging. Every claim shows what each of the three said, so a reader who thinks
       the lone qualifier was wrong can see precisely that and weigh it, without the site publishing
-      a stronger claim than every reviewer accepted.
+      a stronger claim than every seat accepted.
     </p>
 
     {/*

exec
/bin/zsh -lc "git diff origin/main -- 'docs/DESIGN.md'" in <repo>
 succeeded in 0ms:
diff --git a/docs/DESIGN.md b/docs/DESIGN.md
index 1b9c044..a12653a 100644
--- a/docs/DESIGN.md
+++ b/docs/DESIGN.md
@@ -16,7 +16,9 @@ It checks claims about Edmonton civic government against public records, data
 and research, and publishes findings with full evidence trails.
 
 AI does the research labour. Authority does not come from the models — it comes
-from a public, auditable method: a frozen brief, three independent reviewers, a
+from a public, auditable method: a frozen brief, three reviewer seats that work
+blind to each other (three vendors until 2026-09-23, one Anthropic and two
+OpenAI models since, which is said wherever the panel is described), a
 deterministic merge, a cross-review round, a published synthesis rule, and a
 publication gate that checks every cited source against its archived bytes
 before anything is published. Since methodology v1.1 that gate is performed by a
@@ -174,7 +176,8 @@ Captures live in `intake/captures/<slug>/`, extraction and merge artifacts in
 `reviews/intake/<slug>/`, and the candidate register in `intake/register.yaml`,
 published at `/considered`.
 
-1. **Extraction.** Three cheap seats, one per panel vendor, each read the whole
+1. **Extraction.** Three cheap seats from the panel's vendors (from v1.37, Haiku
+   4.5, GPT-6 Luna and Sonnet 5, two vendors) each read the whole
    thread as rendered by `scripts/intake-render-thread.ts`, under
    `prompts/intake-extract.md`, and list every materially factual claim with a
    verbatim quote and the comment index it came from. Seats do no research, do
@@ -198,7 +201,11 @@ published at `/considered`.
    (not a claim, duplicate quote, not about Edmonton civic government). This is
    the guarantee the arrangement exists to provide.
 5. **Triage.** `prompts/intake-triage-batch.md` goes to two readers, both from
-   a different vendor than the editor, neither seeing the other. Each rules on
+   a different vendor than the editor, neither seeing the other. From v1.37 both
+   are OpenAI models (GPT-6 Sol and GPT-6 Luna), one vendor, and the register
+   says so; a proposition both decline or park is re-decided by an Anthropic
+   audit reader before the register records it, so one vendor cannot quietly
+   remove a claim. Each rules on
    every proposition in one batch, GO, PARK or NO, with a reason written for a
    reader. They combine so that GO takes both, or one GO and one PARK; NO takes
    both; everything else parks, a GO set against a NO included. Throwing out a
@@ -248,8 +255,12 @@ stopped.
    accounting window, and any calculation the verdict depends on. The brief is
    frozen before round 1, so the framing cannot be adjusted once the findings
    arrive.
-2. **Blind research round.** Three models independently receive the identical
-   package — brief, `prompts/reviewer.md`, and the required output schema
+2. **Blind research round.** Three seats independently receive the identical
+   package. From v1.37 they are three model seats from two vendors, one Anthropic
+   model and two OpenAI models; the two OpenAI seats are not independent of each
+   other, so three agreeing verdicts are not three independent confirmations.
+   Runs frozen before 2026-09-23 had three vendors and keep that label. The
+   package is — brief, `prompts/reviewer.md`, and the required output schema
    `prompts/review-schema.json`. From v1.28, the shared launcher must check the
    execution profile and a separate per-attempt canary before research. The
    candidate Claude profile suppresses host customizations and exposes only
@@ -344,35 +355,34 @@ record earlier execution, **not commands approved for new runs**:
 | GPT-5.6 Sol | `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check` |
 | Gemini 3.8 Flash | `agy --model gemini-3.8-flash-high --effort high --sandbox --dangerously-skip-permissions --print-timeout 45m -p` (v1.26; Gemini 3.1 Pro before that, and v1.14 added the permissions flag, without which the headless seat returned nothing on PDF-heavy briefs). The founder retired 3.1 Pro from every seat on this site after the intake extraction run, where 3.8 Flash at high turned the weakest extractor seat into the cleanest; no panel-round comparison of the two exists. Runs already published under 3.1 Pro keep the model their manifests record. |
 
-**Current pins (v1.34).** The commands approved for new runs are the ones
+**Current pins (v1.37).** The commands approved for new runs are the ones
 `scripts/panel/run-reviewer.sh` assembles and `scripts/panel/invoke-reviewer.sh`
-admits; nothing else runs a seat. From v1.34 the Claude seat is
-`claude-opus-5-5`, the OpenAI seat `gpt-6-sol` and the Google seat
-`gemini-3.8-flash-high`, every seat at `high`. Opus 5.5 defaults to medium
-effort, so the pin is what keeps the seat at the level v1.6 chose. Both moves
-are cost decisions (Opus 5.5 is listed a fifth below Opus 5, GPT-6 Sol at half
-of GPT-5.6 Sol), not findings about which model reviews better, which nothing
-on this site measures. Runs already published under Opus 5, Fable 5.1 or
-GPT-5.6 Sol keep the model their manifests record. A superseded model stays on
-the launcher's pinned list, never as the default, while a brief parked on a
-check it ran can still be confirmed, because v1.35 confirms a park on the same
-pinned model as the report it confirms.
-
-**The shadow seat (v1.34).** The founder's question is whether a model as cheap
-as GPT-6 Luna, listed at a twentieth of the OpenAI seat's price, can hold a
-research seat. This site answers that by measurement rather than by guessing.
-For the next two panel runs a fourth seat, `gpt-6-luna` at `high`, receives the
-identical frozen package through the same launcher and profile as the counted
-OpenAI seat. Its answer is committed under `<run>/shadow-<name>/` with its own
-manifest (`scripts/panel/run-reviewer.sh luna <story> <date> 1 --into
-shadow-round1`). It is never merged and never synthesised: `scripts/merge.ts`
-reads every JSON file in a round directory, so the runner refuses any `--into`
-that is not a `shadow-` directory or that is a symbolic link, and refuses round
-2 outright, and `run.yaml`'s
-`synthesis_scope` names no shadow. `run-record.md` compares its sources and
-findings against the three counted seats. After two runs the editor recommends
-and the founder decides whether a cheap-tier model takes a counted seat; until
-then no finding rests on it.
+admits; nothing else runs a seat. From v1.37 the seats are `claude-opus-5-5`,
+`gpt-6-sol` and `gpt-6-luna`, every seat at `high`. Opus 5.5 defaults to medium
+effort, so the pin is what keeps the seat at the level v1.6 chose. The Google
+seat (`gemini-3.8-flash-high`) is retired for runs frozen after 2026-09-23: the
+founder's Google usage ran out twice in a week and he will not buy more. Its
+profile stays in the launcher for the record of the runs it did, and the runner
+starts it only with `--finish-frozen-run`, for a run that froze under the
+three-provider rule. A superseded model stays on the launcher's pinned list,
+never as the default, while a brief parked on a check it ran can still be
+confirmed (v1.35). Runs already published keep the model their manifests
+record.
+
+**The vendor split (v1.37).** When the Anthropic seat differs from both OpenAI
+seats, the finding names the vendor split beside the seat agreement and the
+drafting addresses it from the sources. It is never presented as a plain
+two-to-one majority. The quality ledger tracks the Luna seat's catches and
+misses and any miss the two OpenAI seats share, with a review point after
+several counted runs.
+
+**The shadow seat (v1.34, ended by v1.37).** For one run, lanes-and-congestion
+round 1 on 2026-09-23, a fourth uncounted seat on `gpt-6-luna` received the
+identical frozen package; its answer sits under `<run>/shadow-round1/` and was
+never merged. The same day the Google seat retired and Luna became a counted
+seat, so the two-run comparison ended after one. The one comparison stands in
+that run's record: same verdict as the OpenAI seat, six minutes against eleven,
+29 requests against 119, two supporting items against six.
 
 From v1.28, `scripts/panel/invoke-reviewer.sh` is the common execution path for
 panel reviews and package-in/report-out framing or source audits. There is no
@@ -389,6 +399,20 @@ else still refuses the run. What excludes their text from the request is the
 capture check, which passed on the attempt that first met them
 (2026-09-23, attempt `8b92f1e800aa48f7`, refused on the older rule and retained).
 
+One thing the capture check permits, from v1.38, and says so on every run row.
+When a fetch returns a binary such as a PDF, Claude Code saves it to disk under
+the operator's home directory and writes "[Binary content (…) also saved to
+<path>]" into the tool result, and that note then travels in every later
+request. On 2026-09-23 fourteen requests of one attempt (`09c6859382ba86e9`,
+refused, retained) carried the operator's home path that way. The path was sent
+to the vendor; the check now counts those requests (`operator_path_notes` on the
+row) instead of refusing the run, for that fixed note only. The home path
+anywhere else, the repository path anywhere, and the canary token anywhere still
+refuse. This is a disclosed exposure, not a clean capture, and a separate account
+for the seat (OQ-30 in the board record) remains the structural fix. The same
+attempt also shows the profile's known limit: the fetch handed the reviewer raw
+PDF bytes, so the document was saved and not read.
+
 v1.28 refused every seat because an empty startup inventory shows what was not
 loaded and cannot show what was sent, and no inspected path emitted the request.
 v1.29 changed that for Claude and only for Claude, and v1.30 changed what the
@@ -1183,7 +1207,7 @@ Stew, the AI steward, writes in the first person in the journal. That works,
 and the founder asked whether it belongs on the pages that carry findings too.
 
 It does, in one narrow form, and the restriction is not squeamishness. A
-finding is produced by three independent models and a fixed table precisely so
+finding is produced by three model seats working blind and a fixed table precisely so
 that no single author's judgement decides it. A first-person aside beside the
 finding hands a hostile reader the one accusation the whole method exists to
 deny: that the answer has an author with a view.

exec
/bin/zsh -lc "git diff origin/main -- 'methodology/changelog.yaml'" in <repo>
 succeeded in 0ms:
diff --git a/methodology/changelog.yaml b/methodology/changelog.yaml
index 767f1e0..82b16ae 100644
--- a/methodology/changelog.yaml
+++ b/methodology/changelog.yaml
@@ -14,6 +14,60 @@
 # The sentence above used to describe a check that did not exist: the rule sat
 # as a TODO in scripts/validate.ts, and a change under methodology/ shipped
 # clean. It runs now.
+- version: "1.38"
+  date: "2026-09-23"
+  scope: capture-check-binary-note
+  summary: >
+    The capture check that admits a Claude seat now permits one thing it used
+    to refuse, and prints a count of it on every run row: the operator's
+    home-directory path when it appears only inside the note Claude Code
+    itself writes after saving a fetched binary to disk. The path is still
+    sent to the vendor; the row says how many requests carried it. Every
+    other occurrence of any protected string still refuses the run.
+  highlights:
+    - "What happened. On 2026-09-23 the Claude seat (Opus 5.5, Claude Code 2.1.280) ran the lanes-and-congestion brief to completion and was refused by the capture check: fourteen of forty-two requests carried the home-directory path. The cause was the CLI's own behaviour, not an instruction file on this machine. WebFetch retrieved a 2.6 MB City PDF, the CLI saved it under the operator's home and put \"[Binary content (application/pdf, 2.6MB) also saved to <path>]\" into the tool result, and that note then sat in every later request. The refused attempt, 09c6859382ba86e9, stays refused and retained; nothing about it is reclassified."
+    - "What changes. The check cuts that one fixed note, and only where the CLI writes it, out of a tool result before searching it for the home path: the note must sit inside a tool_result block and name a path under the CLI's own projects directory in the operator's home, in a tool-results folder. The same words in a text block, a system prompt or a tool input, or a note naming any other path, are searched as sent. The check counts the requests where it cut a note and puts the count on the run row as operator_path_notes. The home path anywhere else, the repository path anywhere, and the canary token anywhere refuse the run exactly as before. The proof sentence on a passing row says, when the count is above zero, that the path was sent to the vendor and is recorded rather than refused. This is a disclosed exposure, not a clean capture, and no row calls it clean."
+    - "Why this and not the alternatives. Giving the seat its own configuration directory under the temporary path, as the other seats have, loses the login: the CLI keys its Keychain entry to that directory, and making it work would mean a script copying the operator's OAuth token into a per-attempt Keychain item, which nothing on this site will do. A separate account and machine user for the seat is the structural fix and is open in the board record. Until then the exposure is the operator's own home path, which names him, and he is already named on the site as the founder; the account email and id in the captured request have been disclosed on the same footing since v1.29."
+    - "What the attempt also showed. The fetch handed the reviewer the PDF's raw bytes, which it could not read, so the document was saved and not read. That is the web-only profile's limit as v1.28 disclosed it: public-web tools may not retrieve PDFs a shell could, and an inaccessible essential source stops a run rather than becoming a finding. The refused attempt's Not established is not a finding of this site."
+    - "By whom. The founder, told the three ways out, said \"do what you think is best\"; the editor chose this one and put it to the full board with the two-vendor change below. Four memos, all REVISE, every required change taken: the exception is prospective, exact, counted and disclosed, and the refused attempt stays refused."
+  links:
+    - label: The Claude profile (docs/DESIGN.md section 4)
+      href: https://github.com/civicfacts/yegfacts/blob/main/docs/DESIGN.md
+    - label: Reviewer execution and retention
+      href: /methodology#execution
+  note: >
+    A rule that refuses a run for a string the tool itself wrote is a rule that
+    will be turned off the first time it bites. Better to say exactly what is
+    let through, count it, and print the count where a reader will see it.
+- version: "1.37"
+  date: "2026-09-23"
+  scope: two-vendor-panel
+  summary: >
+    The Google seat retires. For every run frozen after 2026-09-23 the panel
+    is three model seats from two vendors, one Anthropic model and two OpenAI
+    models, and every page that describes the panel says so. The two OpenAI
+    seats are not independent of each other, so three agreeing verdicts are
+    not three independent confirmations. Runs frozen before this date had
+    three vendors and keep that label. The matrix, the agreement words and
+    the synthesis rule do not change; what changes is what agreement means.
+  highlights:
+    - "Why. The Google route is one command-line tool on a consumer account whose weekly allowance ran out on 2026-09-16, blocking the second intake for a week, and again on 2026-09-23 after one panel seat and three audit attempts. The founder will not buy more: \"we should drop gemini completely, I don't have enough usage to continue with it.\" The site's method has always run on the founder's subscriptions; a seat he cannot afford to run is not a seat."
+    - "What the panel is now. Claude Opus 5.5, GPT-6 Sol and GPT-6 Luna, all at high, pinned in the launcher. Two seats, two vendors, would have needed a new synthesis rule for two verdicts and left two rules on the site; two Anthropic seats would have put the editor's vendor in the majority; a paid third vendor is money this method has never spent. Three seats from two vendors keeps the matrix, the vocabulary and every published finding's meaning intact and moves the loss to where it belongs, the independence claim, which is now stated wherever the panel is described: on the methodology page, on every finding, in the glossary, in search descriptions and share text. Panel agreement, Unanimous, Adjacent or Split, describes seats, not vendors."
+    - "The vendor split. When the Anthropic seat differs from both OpenAI seats, the finding names the vendor split beside the seat agreement and the drafting addresses it from the sources. It is never presented as a plain two-to-one majority. The quality ledger tracks the Luna seat's catches and misses and any miss the two OpenAI seats share, with a review point after several counted runs; one shadow run is not evidence of quality, and this entry claims none."
+    - "Effective date. A run frozen under the three-provider rule finishes under it. Lanes-and-congestion froze on 2026-09-23 before this entry; its round 1 counts the Gemini seat's admitted answer and keeps the Luna shadow answer as shadow, and its round 2 needs the Google seat once more, after the allowance resets about 2026-09-30, unless the founder closes the attempt as incomplete and starts a clean run under this rule. No panel is assembled from answers already seen. The runner starts the retired seat only with --finish-frozen-run; audits refuse it outright."
+    - "The other stages. Triage reads on GPT-6 Sol and GPT-6 Luna at high, one vendor, and the register says so; a proposition both decline or park is re-decided by an Anthropic audit reader before the register records it, so one vendor cannot quietly remove a claim. Extraction runs on Haiku 4.5, GPT-6 Luna at low and Sonnet 5, two vendors. Faithfulness, plain-speech and gate audits run on OpenAI, off the editor's vendor as before. The shadow-seat experiment of v1.34 ended after one run, superseded by Luna counting; the one comparison stays in that run's record. A preflight step (scripts/panel/preflight.sh: the seat's CLI version, and for Codex its reported login state; Claude's Keychain login is proven by the canary) runs from the runner before a package is assembled, so a dead seat is found before anything is sent; the quota probe is the launcher's canary itself, a one-line model call that every attempt already makes and that fails on an exhausted allowance before the package goes."
+    - "By whom, again. The founder decided the retirement on cost; the editor chose the shape and put it to the full board: four memos, all REVISE, every required change taken, one split resolved three to one against counting the shadow answer for the run in progress. The memos ran on GPT-6 Sol, the vendor that gains two seats, so the pass spent the usage the founder has and asked the beneficiary to argue against itself. The board record is private; this entry is the public account of it."
+    - "What this entry does not do: it does not change the matrix, the agreement words, the cautious lean or any published finding; it does not claim the two OpenAI seats are independent; and it does not claim Luna reviews as well as the seat it replaces."
+  links:
+    - label: How a finding is produced
+      href: /methodology#stages
+    - label: The current pins and the vendor split (docs/DESIGN.md section 4)
+      href: https://github.com/civicfacts/yegfacts/blob/main/docs/DESIGN.md
+  note: >
+    Three vendors was the method's best argument for independence, and it is
+    gone for as long as the founder pays for two. The honest move is not to
+    find a third seat that looks like a third vendor but to say, on every
+    page, what the panel now is.
 - version: "1.36"
   date: "2026-09-23"
   scope: register-fold

exec
/bin/zsh -lc "git diff origin/main -- 'README.md'" in <repo>
exec
/bin/zsh -lc "git diff origin/main -- 'scripts/panel/attempt-record.ts'" in <repo>
 succeeded in 0ms:
diff --git a/README.md b/README.md
index 984b2e0..f7138e4 100644
--- a/README.md
+++ b/README.md
@@ -6,11 +6,11 @@
 
 **[yegfacts.ca](https://yegfacts.ca)**. Claims about Edmonton civic government, checked against the public record, published with the evidence attached.
 
-This repository is the whole site and the whole method. Every published finding can be audited from here without asking anyone anything: the frozen brief, the three independent model reviews, the merge, the synthesis rule, the archived evidence with its hashes, the publication gate report, and the edit history.
+This repository is the whole site and the whole method. Every published finding can be audited from here without asking anyone anything: the frozen brief, the three round-one seat reviews, the merge, the synthesis rule, the archived evidence with its hashes, the publication gate report, and the edit history. Current runs use three AI model seats from two vendors: one Anthropic model and two OpenAI models. The two OpenAI seats are not independent of each other, so three agreeing verdicts are not three independent confirmations.
 
 ## Who builds it
 
-Hello, I'm Stew, a magpie and the AI Project Steward. I build and maintain this repository: the research runs, the code, the evidence archive, the audits, and most of the words. The findings themselves are not mine. They come from a three-model review panel working under the [published methodology](https://yegfacts.ca/methodology), and a deterministic rule turns the panel's verdicts into the finding you read.
+Hello, I'm Stew, a magpie and the AI Project Steward. I build and maintain this repository: the research runs, the code, the evidence archive, the audits, and most of the words. The findings themselves are not mine. New runs use three AI model seats from two vendors, one Anthropic model and two OpenAI models, under the [published methodology](https://yegfacts.ca/methodology); published findings retain the panel recorded in their run. A deterministic rule turns the panel's verdicts into the finding you read.
 
 The human behind the project is Ildar Abdulin, in Edmonton. He supplies the idea, the direction, and the judgment calls, and he is the named person accountable for everything published. The [About page](https://yegfacts.ca/about) has his interests note and the argument for why neither of us gets to pick answers.
 
@@ -19,7 +19,7 @@ The human behind the project is Ildar Abdulin, in Edmonton. He supplies the idea
 One run per story, all of its claims together. State lives in `reviews/<story>/state.yaml` so any session can resume.
 
 1. **Brief.** I write it. It defines each claim precisely (what counts, whose money, the as-of date) before any model runs. A model from a different vendor checks the framing. Then the brief is frozen.
-2. **Blind round.** Three models from three companies (Claude, GPT, Gemini) each get the identical package in an empty working directory. They cannot see each other, the site, or this pipeline. Output is validated against `prompts/review-schema.json`.
+2. **Blind round.** Three AI model seats from two vendors, one Anthropic model and two OpenAI models, each get the identical package. They cannot see each other's work. The two OpenAI seats are not independent of each other, so three agreeing verdicts are not three independent confirmations. Runs frozen before September 23, 2026 used three AI models from three vendors (Claude, GPT, Gemini) and keep that label. Output is validated against `prompts/review-schema.json`.
 3. **Evidence and merge.** Every cited source is fetched, its bytes hashed and archived, and given a registry entry under `evidence/registry/`. The three reviews are merged by script, not by a model.
 4. **Cross-review.** Each reviewer reads the others' work and may document errors. Verdicts do not change here.
 5. **Synthesis.** `scripts/synthesize.ts` computes the finding and the panel agreement from the round-one verdicts with a rule that is published in advance and tested over every possible combination.
@@ -68,7 +68,7 @@ npm run build        # astro build + pagefind index
 
 CI runs all of that plus `astro check` and an in-page duplication audit on every push. Production deploys from `main` when a pull request merges. Every other branch gets a Cloudflare Pages preview, linked on the PR.
 
-Running the panel needs three vendor CLIs and their subscriptions. Each run's `run.yaml` records the exact command, model and reasoning effort per seat (effort pinned since methodology v1.6).
+Running the panel needs two vendor CLIs, `claude` and `codex`, and their subscriptions. The three seats use one Anthropic model and two OpenAI models. Each run's `run.yaml` records the exact command, model and reasoning effort per seat (effort pinned since methodology v1.6).
 
 ## Contributing
 

 succeeded in 0ms:
diff --git a/scripts/panel/attempt-record.ts b/scripts/panel/attempt-record.ts
index bc433ec..bde1b04 100644
--- a/scripts/panel/attempt-record.ts
+++ b/scripts/panel/attempt-record.ts
@@ -188,6 +188,12 @@ function attemptRecord(dir: string, attempt: number, schema?: string): AttemptRe
     // was never asked, and it always is.
     context_proof: text('context_proof') ?? 'unavailable',
     ...(text('record_kind') ? { record_kind: text('record_kind') } : {}),
+    // v1.38: how many requests carried the operator's home path inside the
+    // CLI's own binary-save note. Zero is worth printing; absent means the
+    // check never ran.
+    ...(typeof metadata.operator_path_notes === 'number'
+      ? { operator_path_notes: metadata.operator_path_notes }
+      : {}),
     admitted_for_research: metadata.admitted_for_research === true,
     ...(text('canary_context_proof') ? { canary_context_proof: text('canary_context_proof') } : {}),
     ...(text('admission_reason') ? { admission_reason: text('admission_reason') } : {}),

exec
/bin/zsh -lc "git diff origin/main -- 'scripts/panel/audit-package.sh'" in <repo>
 succeeded in 0ms:
diff --git a/scripts/panel/audit-package.sh b/scripts/panel/audit-package.sh
index 0d5f066..bf28e9d 100755
--- a/scripts/panel/audit-package.sh
+++ b/scripts/panel/audit-package.sh
@@ -54,8 +54,9 @@ usage: scripts/panel/audit-package.sh --package <file> --report <file> [options]
   --report <file>     where to write the complete response; must not exist
 
 options:
-  --provider <name>   anthropic (default) | openai | google. The vendor the
-                      audit is commissioned from, recorded even when refused.
+  --provider <name>   anthropic (default) | openai. The vendor the audit is
+                      commissioned from, recorded even when refused. google is
+                      retired (methodology v1.37) and refused here.
   --label <text>      what to call this audit in the log
 
 The model and reasoning effort are pinned per vendor in invoke-reviewer.sh and
@@ -82,8 +83,13 @@ done
 # The vendor names the launcher knows. Checked here so a typo is a usage error
 # rather than a retained attempt filed against a provider that does not exist.
 case "$PROVIDER" in
-  anthropic|openai|google) ;;
-  *) echo "unknown provider: $PROVIDER (expected anthropic, openai or google)" >&2; usage ;;
+  anthropic|openai) ;;
+  google)
+    # Methodology v1.37 (2026-09-23): the Google seat is retired. Audits have
+    # no frozen run to finish, so there is no flag; the profile stays in the
+    # launcher for the record of the runs it did.
+    echo "the Google seat is retired for new audits (methodology v1.37, 2026-09-23)" >&2; exit 2 ;;
+  *) echo "unknown provider: $PROVIDER (expected anthropic or openai)" >&2; usage ;;
 esac
 
 # -L as well as -e: a dangling symlink at the destination is still something a

exec
/bin/zsh -lc "git diff origin/main -- 'src/components/ClaimFinding.astro'" in <repo>
 succeeded in 0ms:
diff --git a/src/components/ClaimFinding.astro b/src/components/ClaimFinding.astro
index 6a9a1f1..2f507ed 100644
--- a/src/components/ClaimFinding.astro
+++ b/src/components/ClaimFinding.astro
@@ -5,7 +5,7 @@ import Gloss from './Gloss.astro';
 import TopicTags from './TopicTags.astro';
 import { claimTopics, type Claim, type Story } from '../lib/content';
 import { saidIn, sourceRegister, variationsFrom, type Question } from '../lib/intake';
-import { requireTerm as gloss } from '../lib/glossary';
+import { panelForClaim, requireTerm as gloss } from '../lib/glossary';
 
 /**
  * One checked claim, answering on its own.
@@ -27,6 +27,7 @@ interface Props {
 }
 
 const { claim, story, question, pageUrl } = Astro.props;
+const panel = panelForClaim(claim);
 
 const sources = new Map(sourceRegister().map((source) => [source.id, source]));
 
@@ -97,7 +98,7 @@ const heading = 'section-heading mt-14';
 
     {/* Who decided this, under what rule, and how old it is. */}
     <p class="mt-5 text-[0.8125rem] text-muted">
-      Verdict by a <Gloss {...gloss('three-model AI panel')}>three-model AI panel</Gloss> under a{' '}
+      Verdict by a <Gloss {...gloss(panel.term)}>{panel.label}</Gloss> under a{' '}
       <Gloss {...gloss('published rule')}>published rule</Gloss> ·{' '}
       <Gloss {...gloss('as of')}>as of</Gloss>{' '}
       <time datetime={story.data.as_of}>{story.data.as_of}</time> ·{' '}

exec
/bin/zsh -lc "git diff origin/main -- 'src/components/AiReview.astro'" in <repo>
 succeeded in 0ms:
diff --git a/src/components/AiReview.astro b/src/components/AiReview.astro
index ddb2b66..4a13504 100644
--- a/src/components/AiReview.astro
+++ b/src/components/AiReview.astro
@@ -4,6 +4,7 @@ import path from 'node:path';
 import { loadRunManifest } from '../../scripts/lib/review-schema.ts';
 import type { Claim, Story } from '../lib/content';
 import { FINDING_TONE } from '../lib/findings';
+import { panelForClaim } from '../lib/glossary';
 import { effortSentence } from '../lib/runs';
 import { repoPath } from '../lib/site';
 
@@ -46,6 +47,7 @@ interface Props {
 const { story, claims } = Astro.props;
 
 const reviewed = claims.filter((claim) => claim.data.review !== undefined);
+const panelTypes = new Set(reviewed.map((claim) => panelForClaim(claim).term));
 
 /** Seat column order, taken from the first reviewed claim and held steady. */
 const models = reviewed[0]?.data.review?.reviewers.map((reviewer) => reviewer.model) ?? [];
@@ -89,19 +91,32 @@ const runArtifacts = runs.map((run) => ({
  * run's behalf. This is NOT the "High" in the matrix above, which is a
  * reviewer's confidence in its own verdict.
  */
-const effort = effortSentence(
-  runs.flatMap((run) => {
-    const file = path.join(REPO_ROOT, run, 'run.yaml');
+const manifestRuns = runs.flatMap((run) => {
+  const file = path.join(REPO_ROOT, run, 'run.yaml');
+  try {
     return existsSync(file) ? loadRunManifest(file).runs : [];
-  }),
-);
+  } catch {
+    return [];
+  }
+});
+const effort = panelTypes.has('three-seat AI panel, two vendors') &&
+  manifestRuns.length > 0 && manifestRuns.every((run) => run.reasoning_effort === 'high')
+  ? 'Every seat ran at its pinned high reasoning setting; the manifest records it per run.'
+  : effortSentence(manifestRuns);
 ---
 
 <section id="ai-review" class="mt-14">
   <h2 class="section-heading">AI review</h2>
   <p class="mt-1.5 text-sm leading-relaxed text-muted">
-    Three models research each claim independently, then cross-review each other’s findings. The
-    canonical finding is computed from the blind round-one verdicts by a deterministic rule
+    {panelTypes.has('three-seat AI panel, two vendors') && (
+      <>Three AI model seats from two vendors research each claim: one Anthropic model and two OpenAI
+      models. The two OpenAI seats are not independent of each other, so three agreeing verdicts
+      are not three independent confirmations. </>
+    )}
+    {panelTypes.has('three-model AI panel') && (
+      <>Earlier findings used three AI models from three vendors (Claude, GPT, Gemini). </>
+    )}
+    The canonical finding is computed from the blind round-one verdicts by a deterministic rule
     published in advance; the models never vote and never decide. Cross-review documents their
     errors, and what it changed is shown below rather than folded into the finding. Authority comes
     from the <a href="/methodology" class="link">methodology</a>, not from the

exec
/bin/zsh -lc "git diff origin/main -- 'src/pages/about.astro'" in <repo>
 succeeded in 0ms:
diff --git a/src/pages/about.astro b/src/pages/about.astro
index 35b2d75..9915bd3 100644
--- a/src/pages/about.astro
+++ b/src/pages/about.astro
@@ -35,9 +35,10 @@ const sections = toc([
         Hello — I'm <a href="/journal" class="link-stew">Stew</a>, a magpie, and the AI Project
         Steward of YEGFacts. I build and maintain this site: the research runs, the code, the
         evidence archive, the audits, and most of the words you are reading. The findings
-        themselves come from a three-model review panel working under a{' '}
-        <a href="/methodology" class="link">published methodology</a> — not from me,
-        and not from any single model.
+        from new runs will come from three AI model seats from two vendors, one Anthropic model and
+        two OpenAI models, working under the{' '}
+        <a href="/methodology" class="link">published methodology</a>. They do not come from me or
+        any single model. Published findings keep the panel recorded in their run.
       </p>
     </StewByline>
     <p>
@@ -72,9 +73,11 @@ const sections = toc([
       equally honest in the other direction: I am not neutral either. AI models carry their own
       biases — from training data, from sources, from prompts. So YEGFacts is not built on trusting
       Ildar, and it is not built on trusting me. It is built so that{' '}
-      <strong class="font-semibold">neither of us gets to pick the answers</strong>. Three models
-      from three companies research each claim independently, without seeing each other's work. The
-      canonical finding is computed from their verdicts by a deterministic rule written down and
+      <strong class="font-semibold">neither of us gets to pick the answers</strong>. Three AI model
+      seats from two vendors research each claim without seeing each other's work: one Anthropic
+      model and two OpenAI models. The two OpenAI seats are not independent of each other, so three
+      agreeing verdicts are not three independent confirmations. The canonical finding is computed
+      from their verdicts by a deterministic rule written down and
       published in advance. The publication gate checks every published statement against the
       archived bytes of its sources. Ildar's personal views on the questions checked here do not
       enter that process — and if they ever did, the interference would be inspectable in the

exec
/bin/zsh -lc "git diff origin/main -- 'src/pages/support.astro'" in <repo>
 succeeded in 0ms:
diff --git a/src/pages/support.astro b/src/pages/support.astro
index 3b9b336..f60109f 100644
--- a/src/pages/support.astro
+++ b/src/pages/support.astro
@@ -82,8 +82,10 @@ const rules = [
       <div class="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[13rem_1fr]">
         <dt class="font-semibold">Two AI subscriptions</dt>
         <dd class="text-[0.9375rem] leading-relaxed">
-          <span class="tabular">US$200</span> a month each. They run the three-model research panel
-          and the build and audit tooling behind it.
+          <span class="tabular">US$200</span> a month each. They run three AI model seats from two
+          vendors, one Anthropic model and two OpenAI models, and the build and audit tooling. The
+          two OpenAI seats are not independent of each other, so three agreeing verdicts are not
+          three independent confirmations.
         </dd>
       </div>
       <div class="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[13rem_1fr]">
@@ -141,7 +143,7 @@ const rules = [
     <h2 class="text-xl font-bold tracking-[-0.015em] text-forest">Why this is credible</h2>
     <p>
       Independence claims are cheap. What makes this one checkable is that the whole process is in
-      public: the evidence behind every finding, what each of the three models concluded and where
+      public: the evidence behind every finding, what each of the three seats concluded and where
       they disagreed, the rule that combined those verdicts, and a dated history of every revision.
       My role is applying that published methodology — published changes are inspectable in the
       public git history, sitting next to the evidence they touch. See{' '}

exec
/bin/zsh -lc "git diff origin/main -- 'src/pages/questions/[id].astro'" in <repo>
 succeeded in 0ms:
diff --git a/src/pages/questions/[id].astro b/src/pages/questions/[id].astro
index c3bebd2..b4d17a5 100644
--- a/src/pages/questions/[id].astro
+++ b/src/pages/questions/[id].astro
@@ -33,7 +33,7 @@ import {
   type Question,
 } from '../../lib/intake';
 import { questionRows, type QuestionRow } from '../../lib/questions';
-import { requireTerm as gloss } from '../../lib/glossary';
+import { panelForClaim, requireTerm as gloss } from '../../lib/glossary';
 import { SITE } from '../../lib/site';
 import { subheads, toc } from '../../lib/toc';
 
@@ -138,6 +138,10 @@ const missing = answered.flatMap((claim) => claim.data.missing_evidence);
 const methodologyVersions = [
   ...new Set(answered.map((claim) => claim.data.methodology_version)),
 ];
+const panelLabels = [...new Map(answered.map((claim) => {
+  const panel = panelForClaim(claim);
+  return [panel.label, panel] as const;
+})).values()];
 
 const withdrawn = story?.data.withdrawn;
 
@@ -336,7 +340,12 @@ const Content = rendered?.Content;
               this?" where the finding is.
             */}
             <p class="mt-8 border-t border-rule pt-4 text-[0.8125rem] text-muted">
-              Verdicts by a <Gloss {...gloss('three-model AI panel')}>three-model AI panel</Gloss>{' '}
+              Verdicts by {panelLabels.map((panel, index) => (
+                <>
+                  {index > 0 && ' and '}
+                  a <Gloss {...gloss(panel.term)}>{panel.label}</Gloss>
+                </>
+              ))}{' '}
               under a <Gloss {...gloss('published rule')}>published rule</Gloss> ·{' '}
               <Gloss {...gloss('as of')}>as of</Gloss>{' '}
               <time datetime={story.data.as_of}>{story.data.as_of}</time> ·{' '}
@@ -454,6 +463,14 @@ const Content = rendered?.Content;
                       </span>
                     </p>
 
+                    {panelLabels.length > 1 && (
+                      <p class="mt-2 text-xs text-muted">
+                        Verdict by a <Gloss {...gloss(panelForClaim(claim).term)}>
+                          {panelForClaim(claim).label}
+                        </Gloss>
+                      </p>
+                    )}
+
                     <p class="mt-2.5 text-sm leading-relaxed text-muted">
                       <Gloss {...gloss('evidence basis')}>Evidence basis</Gloss>:{' '}
                       {claim.data.evidence_basis}

exec
/bin/zsh -lc "git diff origin/main -- 'src/pages/sources/[id].astro'" in <repo>
 succeeded in 0ms:
diff --git a/src/pages/sources/[id].astro b/src/pages/sources/[id].astro
index 6bffab9..6a73c3b 100644
--- a/src/pages/sources/[id].astro
+++ b/src/pages/sources/[id].astro
@@ -71,10 +71,10 @@ const badgeColumn = 'block md:table-cell md:w-px md:pl-4 md:text-right md:align-
       {source.title}
     </h1>
     <p class="mt-4 max-w-prose text-base leading-relaxed">
-      This source was read end to end. Three models each wrote down every factual claim they could
-      find in it, a fourth folded those lists into one claim for each thing a public record could
-      settle, and the claims were grouped into the questions below. Everything that came out of it
-      is on this page, including what was read and set aside.
+      This source was read end to end. The extraction seats each wrote down every factual claim they
+      could find in it. A merge seat folded those lists into one claim for each thing a public record
+      could settle, and the claims were grouped into the questions below. Everything that came out
+      of it is on this page, including what was read and set aside.
     </p>
   </header>
 
@@ -83,10 +83,10 @@ const badgeColumn = 'block md:table-cell md:w-px md:pl-4 md:text-right md:align-
 
     {/*
       Straight out of the register: what the source is, when we took it, how big
-      it was, and the two counts kept apart. The three extractions raise claims;
+      it was, and the two counts kept apart. The extractions raise claims;
       the merge is what turns those into the claims below, and there are fewer
       of the second because one claim holds every wording of itself that the
-      three readings found.
+      extraction seats found.
     */}
     <p class={`mt-3 ${label}`} data-record>
       {sourceKind(source)}

exec
/bin/zsh -lc "cat package.json | head -40 && nl -ba scripts/panel/capture-check.ts | sed -n '143,225p;425,480p' && nl -ba scripts/panel/stream-boundary.ts | sed -n '466,506p'" in <repo>
 succeeded in 0ms:
{
  "name": "yegfacts",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && pagefind --site dist",
    "preview": "astro preview",
    "check": "astro check",
    "validate": "tsx scripts/validate.ts",
    "validate:diff": "tsx scripts/validate-diff.ts",
    "redirects": "tsx scripts/build-redirects.ts",
    "audit:exposure": "tsx scripts/exposure-audit.ts",
    "audit:duplication": "tsx scripts/duplication-audit.ts",
    "audit:sitemap": "tsx scripts/sitemap-audit.ts",
    "withheld:fingerprint": "tsx scripts/withheld-fingerprint.ts",
    "test": "vitest run",
    "astro": "astro",
    "deploy": "bash scripts/deploy.sh"
  },
  "dependencies": {
    "@astrojs/mdx": "^8.0.0",
    "@astrojs/rss": "^4.0.19",
    "@tailwindcss/vite": "^4.3.3",
    "astro": "^7.2.10",
    "tailwindcss": "^4.3.3",
    "yaml": "^2.9.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.5",
    "@types/node": "^26.4.0",
    "ajv": "^8.20.0",
    "ajv-formats": "^3.0.1",
    "pagefind": "^1.5.2",
    "tsx": "^4.23.13",
    "typescript": "^5.9.0",
   143	 */
   144	const MIN_LINE = 24;
   145	
   146	export const HOME_SOURCE = 'the home directory';
   147	
   148	const asRecord = (value: unknown): Record<string, unknown> | null =>
   149	  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
   150	
   151	const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
   152	
   153	/**
   154	 * The CLI's fixed note for a fetched binary it wrote to disk, with the path
   155	 * pinned to where Claude Code writes such files: under its own projects
   156	 * directory in the operator's home, in a tool-results folder. A note naming any
   157	 * other path is not this note and is not cut. Nothing else matches.
   158	 */
   159	function binarySaveNote(home: string): RegExp {
   160	  return new RegExp(
   161	    '\\[Binary content \\([^()\\]]*\\) also saved to ' +
   162	      escapeRegExp(home) +
   163	      '/\\.claude/projects/[^\\]\\s]+/tool-results/[^\\]\\s]+\\]',
   164	    'g',
   165	  );
   166	}
   167	
   168	/**
   169	 * The string values that sit inside tool_result blocks of a Messages request:
   170	 * `messages[].content[].content` as a string, or the `text` of its blocks. The
   171	 * CLI writes its binary-save note there and nowhere else, so the cut is
   172	 * allowed there and nowhere else; the same note in a text block, a system
   173	 * prompt or a tool input is searched as sent.
   174	 */
   175	function toolResultStrings(body: unknown): Set<string> {
   176	  const found = new Set<string>();
   177	  const messages = asRecord(body)?.messages;
   178	  if (!Array.isArray(messages)) return found;
   179	  for (const message of messages) {
   180	    const content = asRecord(message)?.content;
   181	    if (!Array.isArray(content)) continue;
   182	    for (const block of content) {
   183	      const record = asRecord(block);
   184	      if (record?.type !== 'tool_result') continue;
   185	      const inner = record.content;
   186	      if (typeof inner === 'string') found.add(inner);
   187	      else if (Array.isArray(inner)) {
   188	        for (const part of inner) {
   189	          const text = asRecord(part)?.text;
   190	          if (typeof text === 'string') found.add(text);
   191	        }
   192	      }
   193	    }
   194	  }
   195	  return found;
   196	}
   197	
   198	/**
   199	 * A tool-result value with the CLI's binary-save notes cut out, and how many
   200	 * of them there were. Only the home-directory source is searched over the cut
   201	 * text; every other source searches the value as sent. Every note that matches
   202	 * carries the home path by construction, so the count is the count of notes.
   203	 */
   204	function withoutSaveNotes(value: string, note: RegExp): { text: string; notes: number } {
   205	  let notes = 0;
   206	  const text = value.replace(note, () => {
   207	    notes += 1;
   208	    return '';
   209	  });
   210	  return { text, notes };
   211	}
   212	
   213	/**
   214	 * The one family of sources reported as a single row. See `PrivateSource.group`.
   215	 */
   216	export const MEMORY_GROUP = '$HOME/.claude/projects/*/memory/*.md';
   217	
   218	/** A line that is markdown punctuation rather than content. */
   219	const isStructural = (line: string): boolean =>
   220	  line.startsWith('```') || /^#+$/.test(line) || /^-{3,}$/.test(line) || /^\.{3,}$/.test(line);
   221	
   222	/** The distinctive lines of one private file, in file order. */
   223	export function needleLines(text: string): string[] {
   224	  const lines: string[] = [];
   225	  for (const raw of text.split('\n')) {
   425	
   426	  if (!sources.some((source) => source.origin === 'home' && source.present)) {
   427	    failures.push(
   428	      'no private source under $HOME was found, so the denylist was built without the operator\'s own ' +
   429	        'instruction and memory files; an empty denylist passes everything',
   430	    );
   431	  }
   432	
   433	  const needles = sources.reduce((total, source) => total + source.lines.length, 0);
   434	  if (needles === 0) {
   435	    failures.push('the denylist holds no lines at all, so nothing was searched for and a pass would mean nothing');
   436	  }
   437	
   438	  const homeSource = sources.find((source) => source.name === HOME_SOURCE);
   439	  const home = homeSource?.lines[0] ?? '';
   440	  const note = home === '' ? null : binarySaveNote(home);
   441	  let operatorPathNotes = 0;
   442	
   443	  for (const request of requests) {
   444	    if (!isJsonBody(request.body)) continue;
   445	    jsonBodies += 1;
   446	
   447	    // Collected once per request rather than re-walked per source: a main turn
   448	    // carries a few hundred strings and the denylist runs to thousands of lines.
   449	    const values = [...strings(request.body)];
   450	    const toolResults = note ? toolResultStrings(request.body) : new Set<string>();
   451	
   452	    if (packageText !== '' && values.some((value) => value.includes(packageText))) packageSeen += 1;
   453	
   454	    let notesHere = 0;
   455	    for (const source of sources) {
   456	      const hit = new Set<number>();
   457	      for (const value of values) {
   458	        // v1.38: the home path inside the CLI's own binary-save note, inside a
   459	        // tool result, is counted, not refused. The cut is made for this one
   460	        // source, in those values, and nowhere else.
   461	        let text = value;
   462	        if (source === homeSource && note && toolResults.has(value)) {
   463	          const cut = withoutSaveNotes(value, note);
   464	          text = cut.text;
   465	          notesHere += cut.notes;
   466	        }
   467	        source.lines.forEach((line, index) => {
   468	          if (!hit.has(index) && text.includes(line)) hit.add(index);
   469	        });
   470	      }
   471	      for (const index of [...hit].sort((a, b) => a - b)) {
   472	        failures.push(`${request.file}: carries ${source.name} line ${index + 1}`);
   473	      }
   474	    }
   475	    if (notesHere > 0) operatorPathNotes += 1;
   476	  }
   477	
   478	  if (packageText !== '' && packageSeen === 0) {
   479	    failures.push(
   480	      `no captured request carries the declared package byte for byte (${jsonBodies} request(s) with a JSON body); ` +
   466	        'no request capture was taken for this attempt, so nothing establishes what the outgoing request ' +
   467	        'contained. The absence of plugins, skills and MCP servers from the init inventory is evidence ' +
   468	        'about loading, not about what was sent.',
   469	    };
   470	  }
   471	  if (check.status === 'pass') {
   472	    const read = check.sources.filter((source) => source.present);
   473	    const lines = read.reduce((total, source) => total + source.lines_checked, 0);
   474	    // v1.38: a pass with counted notes must not also claim that none of the
   475	    // private text appeared. The home path did appear, inside the note the CLI
   476	    // wrote about a binary it saved, and the sentence says exactly that.
   477	    const appeared =
   478	      check.operator_path_notes > 0
   479	        ? `and none of it appeared except the operator's home-directory path, which ${check.operator_path_notes} ` +
   480	          "request(s) carried inside the CLI's own note about a fetched binary it saved to disk; that path was " +
   481	          'sent to the vendor and is recorded rather than refused (methodology v1.38)'
   482	        : 'and none of it appeared';
   483	    const searched =
   484	      `${check.searched} of ${check.requests} ` +
   485	      (kind === 'request' ? 'captured request(s) had a JSON body and were searched' : 'record entr(ies) were searched') +
   486	      ` for ${lines} line(s) of private text from ${read.length} source(s) on this machine, ${appeared}. ` +
   487	      `${check.package_seen} ` +
   488	      (kind === 'request' ? 'request(s)' : 'record entr(ies)') +
   489	      ' carried the declared package byte for byte.';
   490	    if (kind === 'request') {
   491	      return {
   492	        status: 'pass',
   493	        reason:
   494	          `${searched} Only the string values of those bodies were searched, not the HTTP headers, the ` +
   495	          'request URLs or the responses. This says what the request bodies did not contain; it does not ' +
   496	          'say what they did contain, and it cannot see text the vendor attaches that is not on this ' +
   497	          'machine.',
   498	      };
   499	    }
   500	    return {
   501	      status: 'record-only',
   502	      reason:
   503	        `${searched} This CLI exposes no way to record its outgoing request, so the search ran over its own ` +
   504	        'local record of the run: the event stream it printed, the transcript it kept, the page contents its ' +
   505	        'fetch tool saved and the final response. That record holds what the model produced and what its ' +
   506	        'tools returned. It does not hold the system prompt or anything else the CLI attached on the way ' +

exec
/bin/zsh -lc "rg -n 'status:|run.status|runs.filter|review_run|panelForClaim' tests src scripts | head -130" in <repo>
 succeeded in 0ms:
src/pages/questions/[id].astro:36:import { panelForClaim, requireTerm as gloss } from '../../lib/glossary';
src/pages/questions/[id].astro:142:  const panel = panelForClaim(claim);
src/pages/questions/[id].astro:468:                        Verdict by a <Gloss {...gloss(panelForClaim(claim).term)}>
src/pages/questions/[id].astro:469:                          {panelForClaim(claim).label}
tests/record-proxy.test.ts:92:  new Promise<{ status: number; body: Buffer }>((resolve, reject) => {
tests/record-proxy.test.ts:98:        response.on('end', () => resolve({ status: response.statusCode ?? 0, body: Buffer.concat(chunks) }));
scripts/lib/review-schema.ts:136:    status: string;
src/pages/commitments.astro:26:const anchor = (status: string) => status.toLowerCase().replace(/[^a-z0-9]+/g, '-');
tests/diff-rules.test.ts:35:    changed: changed.map((path) => ({ path, status: 'M' })),
scripts/evidence-stage.ts:40:  status: 'ok' | 'failed';
scripts/evidence-stage.ts:81:async function fetchOnce(url: string): Promise<{ bytes: Uint8Array; contentType: string; status: number }> {
scripts/evidence-stage.ts:96:    status: response.status,
scripts/evidence-stage.ts:113:        status: 'ok',
scripts/evidence-stage.ts:120:        http_status: status,
scripts/evidence-stage.ts:129:    status: 'failed',
scripts/evidence-stage.ts:132:    ...(httpStatus ? { http_status: httpStatus } : {}),
scripts/lib/diff-rules.ts:41:  status: string;
scripts/validate-diff.ts:58:  changed.push({ path: head, status: status[0]! });
scripts/annotate-evidence.ts:100:    fetch_status: status ?? 'not-attempted',
scripts/validate.ts:430:    const reviewRun = typeof data.review_run === 'string' ? data.review_run : '';
scripts/validate.ts:432:      fail(file, 'review_run is required');
scripts/validate.ts:530:    fail(claimFile, `review_run: "${reviewRun}" does not exist (required for published claims)`);
scripts/validate.ts:535:    fail(claimFile, `review_run: "${reviewRun}" has no run.yaml manifest`);
scripts/validate.ts:761:    const reviewRun = typeof data.review_run === 'string' ? data.review_run : '';
scripts/validate.ts:790:          `items[${index}].fetch_status: "${String(status)}" must be one of ` +
src/pages/index.astro:57:  const manifestPath = path.join(process.cwd(), newest.claim.data.review_run, 'run.yaml');
src/pages/index.astro:61:      manifest.runs.filter((seat) => seat.round === 1).map((seat) => seat.provider),
scripts/panel/attempt-record.ts:41:  status: string;
scripts/panel/attempt-record.ts:178:    status: text('status') ?? readMaybe(path.join(dir, 'status.txt')) ?? 'incomplete',
tests/stub-codex.mjs:131:        status: 'completed',
scripts/panel/capture-check.ts:98:  status: 'pass' | 'fail';
scripts/panel/capture-check.ts:486:    status: failures.length === 0 ? 'pass' : 'fail',
src/lib/glossary.ts:171:export function panelForClaim(claim: Claim): { term: string; label: string } {
src/lib/glossary.ts:181:    const file = path.join(process.cwd(), claim.data.review_run, 'run.yaml');
src/lib/glossary.ts:188:      .filter((run) => run.round === 1 && (run.status === undefined || run.status === 'ok'))
tests/stub-agy.mjs:130:    status: 'DONE',
tests/stub-agy.mjs:137:    status: 'DONE',
tests/stub-agy.mjs:146:    status: 'DONE',
tests/stub-agy.mjs:153:    status: mutate === 'file-tool-done' || mutate === 'token-leak' ? 'DONE' : 'ERROR',
tests/stub-agy.mjs:160:  { step_index: 4, source: 'MODEL', type: 'PLANNER_RESPONSE', status: 'DONE', content: answer },
tests/stub-agy.mjs:217:      status: mutate === 'failed-result' ? 'CANCELLED' : 'SUCCESS',
tests/record-run.test.ts:40:    status: 'ok',
tests/record-run.test.ts:71:      status: 'failed',
tests/record-run.test.ts:73:        { attempt: 1, attempt_id: 'a'.repeat(16), status: 'blocked', context_proof: 'unavailable', admitted_for_research: false },
tests/record-run.test.ts:84:    expect(() => record(manifest, { status: null })).toThrow(/--status must be ok, failed or blocked/);
tests/record-run.test.ts:95:        runs: [{ provider: 'openai', round: 1, model_id: 'gpt-5.6-sol', attempts: 1, status: 'ok' }],
tests/record-run.test.ts:100:      status: 'blocked',
tests/record-run.test.ts:101:      'attempts-detail': JSON.stringify([{ attempt: 1, attempt_id: 'b'.repeat(16), status: 'blocked' }]),
tests/record-run.test.ts:120:        runs: [{ provider: 'openai', round: 1, model_id: 'gpt-5.6-sol', status: 'ok' }],
scripts/panel/stream-boundary.ts:430:export type ContextProof = { status: ProofStatus; reason: string };
scripts/panel/stream-boundary.ts:464:      status: 'unavailable',
scripts/panel/stream-boundary.ts:492:        status: 'pass',
scripts/panel/stream-boundary.ts:501:      status: 'record-only',
scripts/panel/stream-boundary.ts:511:    status: 'fail',
scripts/panel/stream-boundary.ts:852:  result_status: string | null;
scripts/panel/stream-boundary.ts:872:    result_status: null,
src/content.config.ts:139:      status: z.enum(STORY_STATUSES),
src/content.config.ts:235:    review_run: z.string().min(1),
src/content.config.ts:358:      status: z.enum(COMMITMENT_STATUSES),
scripts/panel/invoke-reviewer.sh:366:      status: values.status,
src/content/commitments/ebus-range-expectation.yaml:8:status: Assessed
scripts/panel/record-run.ts:39:  status: 'ok' | 'failed' | 'blocked';
scripts/panel/record-run.ts:138:  status: parseStatus(values.status),
tests/stream-boundary.test.ts:154:    status: 'pass',
tests/stream-boundary.test.ts:181:      captureResult({ status: 'fail', failures: ['req-0003.json: carries $HOME/CLAUDE.md line 4'] }),
tests/stream-boundary.test.ts:218:      captureResult({ status: 'fail', failures: ['req-0003.json: carries $HOME/.claude/CLAUDE.md line 7'] }),
tests/stream-boundary.test.ts:292:    const rateLimit = JSON.stringify({ type: 'rate_limit_event', status: 'allowed' });
tests/stream-boundary.test.ts:353:    status: 'pass',
tests/stream-boundary.test.ts:373:      { ...passing(), status: 'fail', failures: ['transcript-1.jsonl line 3: carries $HOME/CLAUDE.md line 4'] },
tests/stream-boundary.test.ts:390:      const proof = status === 'unavailable' ? contextProof(null) : contextProof({ ...passing(), status: 'fail' });
tests/stream-boundary.test.ts:451:    expect(codexSearchRequests([{ ...search, status: 200 }])).toHaveLength(1);
tests/stream-boundary.test.ts:452:    expect(codexSearchRequests([{ ...search, status: 500 }])).toHaveLength(0);
tests/stream-boundary.test.ts:506:        result: { conversation_id: 'c', status: over.status ?? 'SUCCESS', response: '{"web_h1": "Example Domain"}' },
tests/stream-boundary.test.ts:541:    expect(checkGeminiStructure(readGeminiStream(geminiStream({ status: 'ERROR' }))).ok).toBe(true);
tests/stream-boundary.test.ts:545:    expect(checkGeminiStructure(readGeminiStream(geminiStream({ status: 'CANCELLED' }))).failures.join()).toMatch(
tests/stream-boundary.test.ts:553:    const missing = geminiStream({ status: 'ERROR' }).replace(
tests/stream-boundary.test.ts:570:    const broken = geminiStream({ status: 'ERROR' }).replace(
tests/stream-boundary.test.ts:588:    const broken = geminiStream({ status: 'ERROR' }).replace(
tests/stream-boundary.test.ts:600:      JSON.stringify({ event: 'result', result: { conversation_id: 'c', status: 'ERROR', response: 'an answer' } }),
src/content/claims/cv-trips-by-bike.yaml:11:review_run: reviews/cycling-volumes/2026-09-03
src/content/claims/ip-infill-affordable.yaml:12:review_run: reviews/infill-prices/2026-09-01-rerun2
src/content/claims/ebus-cold-cities.yaml:11:review_run: reviews/electric-buses/2026-08-31
src/content/stories/cycling-volumes.mdx:23:status: published
src/content/stories/active-transportation.mdx:29:status: published
src/content/stories/infill-prices.mdx:20:status: published
src/content/stories/winter-cycling.mdx:25:status: published
src/content/claims/districts-travel-restrictions.yaml:11:review_run: reviews/fifteen-minute-districts/2026-09-01
src/content/claims/at-100m-vs-snow.yaml:19:review_run: reviews/active-transportation/2026-09-02-rerun
src/content/claims/cv-counter-total-2026.yaml:12:review_run: reviews/cycling-volumes/2026-09-03
src/content/stories/fifteen-minute-districts.mdx:25:status: published
src/content/stories/electric-buses.mdx:27:status: published
src/content/claims/cv-commuters-cycle.yaml:11:review_run: reviews/cycling-volumes/2026-09-03
src/content/claims/cv-population-rides.yaml:11:review_run: reviews/cycling-volumes/2026-09-03
src/content/claims/ebus-82m-loss.yaml:11:review_run: reviews/electric-buses/2026-08-31
src/content/stories/climate-targets.mdx:25:status: published
src/content/claims/climate-on-track.yaml:16:review_run: reviews/climate-targets/2026-09-01
src/content/claims/ebus-procurement-failure.yaml:15:review_run: reviews/electric-buses/2026-09-01-rerun
src/content/claims/at-100m-vs-roads.yaml:19:review_run: reviews/active-transportation/2026-09-02-rerun
src/content/claims/cv-commute-by-car.yaml:11:review_run: reviews/cycling-volumes/2026-09-03
src/content/claims/cv-lanes-look-empty.yaml:11:review_run: reviews/cycling-volumes/2026-09-03
src/content/claims/cv-year-round-riders.yaml:11:review_run: reviews/cycling-volumes/2026-09-03
src/content/claims/ip-teardown-price-gap.yaml:12:review_run: reviews/infill-prices/2026-09-02-magnitude
src/content/claims/wc-too-cold.yaml:11:review_run: reviews/winter-cycling/2026-09-01
src/components/ClaimFinding.astro:8:import { panelForClaim, requireTerm as gloss } from '../lib/glossary';
src/components/ClaimFinding.astro:30:const panel = panelForClaim(claim);
src/components/AiReview.astro:7:import { panelForClaim } from '../lib/glossary';
src/components/AiReview.astro:50:const panelTypes = new Set(reviewed.map((claim) => panelForClaim(claim).term));
src/components/AiReview.astro:65:const runs = [...new Set(reviewed.map((claim) => claim.data.review_run))];

exec
/bin/zsh -lc "node - <<'NODE'
const home='/Users/test';
const escapeRegExp=text=>text.replace(/[.*+?"'^${}()|['"\\]\\\\]/g,'\\\\"'$&'"');
const r=new RegExp('\\\\[Binary content \\\\(["'^()'"\\\\]]*\\\\) also saved to '+escapeRegExp(home)+'/\\\\.claude/projects/["'^'"\\\\]\\\\s]+/tool-results/["'^'"\\\\]\\\\s]+\\\\]','g');
console.log(String(r));
for(const s of [
'[Binary content (application/pdf, 2.6MB) also saved to /Users/test/.claude/projects/x/tool-results/webfetch-1.pdf]',
'[Binary content (application/pdf, 2.6MB) also saved to /Users/test/.claude/projects/x/tool-results/a b.pdf]',
'[Binary content (application/pdf, 2.6MB) also saved to /Users/test/.claude/projects/x/tool-results/a.pdf] outside',
]) console.log(r.test(s),s);
NODE" in <repo>
 succeeded in 0ms:
/\[Binary content \([^()\]]*\) also saved to \/Users\/test\/\.claude\/projects\/[^\]\s]+\/tool-results\/[^\]\s]+\]/g
true [Binary content (application/pdf, 2.6MB) also saved to /Users/test/.claude/projects/x/tool-results/webfetch-1.pdf]
false [Binary content (application/pdf, 2.6MB) also saved to /Users/test/.claude/projects/x/tool-results/a b.pdf]
true [Binary content (application/pdf, 2.6MB) also saved to /Users/test/.claude/projects/x/tool-results/a.pdf] outside

exec
/bin/zsh -lc "sed -n '1135,1220p' docs/DESIGN.md; sed -n '385,418p' docs/DESIGN.md; sed -n '145,215p' tests/capture-check.test.ts" in <repo>
 succeeded in 0ms:
  answer is the standfirst and the story carries none of its own; the page
  used to print both, ten words apart, and the critique of 2026-09-16 caught
  it.
- **The TL;DR** is the same ten-second reader, reading on. Three to five
  sentences, each a thing a person would say, each carrying one fact the
  standfirst did not. Numbers rounded as people say them. No source names, no
  survey years, no denominators, no comparator lists, no method words. The
  exact figure, the year and the source belong one layer down, and the
  explanation must carry them, so that the bullet is a plain statement of a
  fact the page proves rather than the proof itself.
- **The explanation** is the ten-minute layer. Exact figures, sources, years,
  denominators and qualifications live here, each beside the sentence it
  supports. It opens with what happened, not with how the question was put to
  the panel.
- **Claim detail** is the hour. The brief, the panel and how it split, the rule,
  the key facts and their sources, what a seat tried and what it could not
  find. Method narration belongs here, or under its own subhead after the
  reader has the answer, and never in the first paragraphs of the explanation.

Nothing moves up a layer by being deleted from the one below. A fact leaving a
bullet lands in the explanation, and the plain-speech read's clause accounting
covers the whole move, bullet by bullet. Where a plainer bullet would change
the strength or the scope of a finding, the bullet stays and the read says why.

The order of the page follows the layers. Title, then the answer, then the
TL;DR, with nothing between them. On a question with one claim the answer is
the claim's row in the verdict strip; on a question with several, the answer
is the standfirst and the strip follows the TL;DR, because seven rows of
question, verdict and answer before the page-level answer is a report. Who
checked it and when, and any notice that a finding has left the board, come
after the TL;DR in the same words. Three outside readings of the rendered
pages on 2026-09-16 each found the provenance line and the notices sitting
between the answer and the TL;DR, so a resident read the machinery before the
evidence; the founder's rule on hearing that the order was a recorded decision
was that the site optimizes for readers, not for past decisions.

### What a script checks, and what a reader checks

A script can only see shape, so it checks shape: the answer's punctuation, the
question's opening word and its lack of a colon, the presence of a stance
opener, a jargon list that warns rather than fails, and the length of a
standfirst or a TL;DR bullet, which also only warns, because a length that
failed the build would be the cap this section removed coming back.

Everything else goes to a plain-speech read before publication, by a model from
a different vendor than the one that drafted, in the same shape as the
faithfulness check. It reads the standfirst and the TL;DR under the layers rule
above as well as the answers. It answers three questions. Would a person say this out
loud. Does the answer make sense to someone who has not seen the question. Has
anything true been deleted rather than moved. The last one is the important
one: the reader has to account for every substantive clause in the draft as
kept, moved to the explanation, split into another claim, or dropped with a
written reason.

The read is a stage, not a habit, because a prompt nobody is obliged to run is
documentation. It has a prompt (`prompts/plain-speech-read.md`), a committed
artifact beside the run's faithfulness reports
(`<run>/plain-speech/<seat>-<n>.md`), and a field on every published claim
naming that file (`plain_speech_read`), which the validator checks is really on
disk. §4 stage 6 has the sequence. The vendor rule cannot be enforced by a
schema, so it is written into the prompt in the imperative and both seats are
named in the report header, where a breach is visible to anyone reading it.

The standard was not written and then applied. The site's own editor drafted ten
answers under it first, and the reading seat rewrote nine of them.

No script rewrites prose. A build rule that silently removes a sentence
recreates the failure this section exists because of.

### Stew's note

Stew, the AI steward, writes in the first person in the journal. That works,
and the founder asked whether it belongs on the pages that carry findings too.

It does, in one narrow form, and the restriction is not squeamishness. A
finding is produced by three model seats working blind and a fixed table precisely so
that no single author's judgement decides it. A first-person aside beside the
finding hands a hostile reader the one accusation the whole method exists to
deny: that the answer has an author with a view.

So a finding page may carry a clearly labelled **Stew's note**, placed after the
evidence and the sources, never beside the finding. It covers editorial acts and
nothing else: why this question was checked, what changed on the page, what was
corrected, what surprised the editor about the process. It says in its own words
that it did not decide the finding.

29 requests against 119, two supporting items against six.

From v1.28, `scripts/panel/invoke-reviewer.sh` is the common execution path for
panel reviews and package-in/report-out framing or source audits. There is no
unrestricted fallback. The candidate Claude Code profile uses safe mode, empty
settings sources, strict MCP configuration, no slash commands or session
persistence, and an explicit WebSearch/WebFetch allowlist. From v1.30 it is not
tied to one build: the flag set is what the profile is. This is not a filesystem
jail or a vendor-wide guarantee. Claude Code builds from 2.1.280 list two
plugins the build itself ships, `agents-md` and `telemetry`, marked `builtin` in
the inventory, and no flag in the profile removes them. The structural check
records their names on every attempt and does not refuse on them, because they
are the CLI rather than a customization of this machine; a plugin from anywhere
else still refuses the run. What excludes their text from the request is the
capture check, which passed on the attempt that first met them
(2026-09-23, attempt `8b92f1e800aa48f7`, refused on the older rule and retained).

One thing the capture check permits, from v1.38, and says so on every run row.
When a fetch returns a binary such as a PDF, Claude Code saves it to disk under
the operator's home directory and writes "[Binary content (…) also saved to
<path>]" into the tool result, and that note then travels in every later
request. On 2026-09-23 fourteen requests of one attempt (`09c6859382ba86e9`,
refused, retained) carried the operator's home path that way. The path was sent
to the vendor; the check now counts those requests (`operator_path_notes` on the
row) instead of refusing the run, for that fixed note only. The home path
anywhere else, the repository path anywhere, and the canary token anywhere still
refuse. This is a disclosed exposure, not a clean capture, and a separate account
for the seat (OQ-30 in the board record) remains the structural fix. The same
attempt also shows the profile's known limit: the fetch handed the reviewer raw
PDF bytes, so the document was saved and not read.

v1.28 refused every seat because an empty startup inventory shows what was not
loaded and cannot show what was sent, and no inspected path emitted the request.
v1.29 changed that for Claude and only for Claude, and v1.30 changed what the
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
    // Three captured, two walked: the HEAD connectivity check has no JSON body
    // and nothing looked inside it. A reader of a run record is told both.
    expect(result.searched).toBe(2);
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


exec
/bin/zsh -lc "nl -ba src/pages/index.astro | sed -n '45,85p'; nl -ba scripts/panel/run-reviewer.sh | sed -n '270,345p;390,430p'; nl -ba scripts/panel/invoke-reviewer.sh | sed -n '590,630p'" in <repo>
 succeeded in 0ms:
    45	  finding,
    46	  count: rows.filter((row) => row.claim.data.finding === finding).length,
    47	})).filter((entry) => entry.count > 0);
    48	
    49	/**
    50	 * How many reviewers actually sat on the newest claim's panel, read from the
    51	 * run manifest rather than asserted in prose. Round 1 is the blind round, so it
    52	 * is the round the sentence is about.
    53	 */
    54	let reviewerCount: number | undefined;
    55	const newest = rows[0];
    56	if (newest) {
    57	  const manifestPath = path.join(process.cwd(), newest.claim.data.review_run, 'run.yaml');
    58	  if (existsSync(manifestPath)) {
    59	    const manifest = loadRunManifest(manifestPath);
    60	    const providers = new Set(
    61	      manifest.runs.filter((seat) => seat.round === 1).map((seat) => seat.provider),
    62	    );
    63	    reviewerCount = providers.size > 0 ? providers.size : undefined;
    64	  }
    65	}
    66	
    67	const evidenceCount = (await getCollection('evidence')).length;
    68	const methodologyVersion = highestMethodologyVersion(methodologyChanges());
    69	
    70	/** A topic's weight is how many checked claims sit under it, not how many questions. */
    71	/**
    72	 * Topics count questions, not checked claims.
    73	 *
    74	 * Counting checked claims made the biggest topic on the site read "no claims
    75	 * yet": bike lanes holds twenty-six questions and none of them has been
    76	 * checked, because the register filled up faster than the panel did. A
    77	 * navigation list that hides where the argument is because nobody has answered
    78	 * it yet is navigation pointed at the wrong thing. A question can carry several
    79	 * topics, so these do not sum to the total and the line above no longer says
    80	 * they do.
    81	 */
    82	const questions = await questionRows();
    83	const topics = (await orderedTopics()).map((topic) => ({
    84	  ...topic.data,
    85	  count: questions.filter((row) => row.topics.includes(topic.data.slug)).length,
   270	    echo "do not return it. Everything else in the brief governs as written — the"
   271	    echo "definitions, the fixed dates, the denominators, the thresholds, the"
   272	    echo "required calculations and the reviewer instructions all still apply."
   273	    echo
   274	  fi
   275	  echo "---"
   276	  echo
   277	  echo "## Methodology"
   278	  echo
   279	  cat "$SCRATCH/$(basename "$PROMPT_FILE")"
   280	  echo
   281	  echo "---"
   282	  echo
   283	  echo "## Brief"
   284	  echo
   285	  cat "$SCRATCH/brief.md"
   286	  echo
   287	  if [ "$ROUND" = "2" ]; then
   288	    echo "---"
   289	    echo
   290	    echo "## Combined evidence from round 1 (all reviewers)"
   291	    echo
   292	    echo '```json'
   293	    cat "$SCRATCH/combined-evidence.json"
   294	    echo '```'
   295	    echo
   296	    for other in "$SCRATCH"/other-review-*.json; do
   297	      [ -e "$other" ] || continue
   298	      echo "---"
   299	      echo
   300	      echo "## Round-1 findings from another reviewer ($(basename "$other" .json | sed 's/^other-review-//'))"
   301	      echo
   302	      echo '```json'
   303	      cat "$other"
   304	      echo '```'
   305	      echo
   306	    done
   307	  fi
   308	  echo "---"
   309	  echo
   310	  echo "## Required output schema (JSON Schema 2020-12)"
   311	  echo
   312	  echo '```json'
   313	  cat "$SCRATCH/review-schema.json"
   314	  echo '```'
   315	  echo
   316	  echo "Return ONLY the JSON document. Set \`round\` to $ROUND."
   317	  if [ -n "$CLAIMS" ]; then
   318	    echo "Answer only these claims, and no others: $CLAIMS"
   319	  fi
   320	} > "$PACKAGE"
   321	
   322	PROMPT_SHA="$(shasum -a 256 "$PACKAGE" | cut -d' ' -f1)"
   323	INVOKE="$REPO_ROOT/scripts/panel/invoke-reviewer.sh"
   324	COMMAND_STRING="scripts/panel/invoke-reviewer.sh --provider $PROVIDER_CANONICAL --model $MODEL_ID --effort $EFFORT --package package.md"
   325	
   326	# Each attempt lands in its own directory under the private archive, keyed by a
   327	# fresh timestamp, so a re-run of a round never lands on top of the last one.
   328	ARCHIVE_ROOT="$("$INVOKE" --archive-root)"
   329	RUN_STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
   330	ATTEMPT_BASE="$ARCHIVE_ROOT/$STORY/$RUN_DATE/${INTO:-round$ROUND}/$SLOT/$RUN_STAMP"
   331	
   332	# Methodology v1.37: the seat's CLI is checked for a version and a reported
   333	# login before a package is assembled, so a dead seat is found here rather
   334	# than after a run has been filed. The launcher's canary is the quota probe.
   335	if [ "$DRY_RUN" != "1" ] && [ "$CLI" != "agy" ]; then
   336	  "$REPO_ROOT/scripts/panel/preflight.sh" "$CLI" >&2 \
   337	    || { echo "[$SLOT round $ROUND] preflight failed for $CLI; nothing was assembled or sent" >&2; exit 2; }
   338	fi
   339	
   340	if [ "$DRY_RUN" = "1" ]; then
   341	  echo "DRY RUN — no CLI executed, nothing written under reviews/"
   342	  echo
   343	  echo "provider:      $PROVIDER_ARG (slot: $SLOT, canonical: $PROVIDER_CANONICAL)"
   344	  echo "model:         $MODEL_ID"
   345	  echo "effort:        $EFFORT"
   390	add_detail() {
   391	  local record
   392	  record="$(npx tsx "$REPO_ROOT/scripts/panel/attempt-record.ts" "$1" --attempt "$2" --schema "$3")"
   393	  # An empty record means the recorder ran and said nothing, which is how a
   394	  # manifest ends up describing a run without describing the attempt it made.
   395	  # Better to stop the whole run than to publish a row with the evidence
   396	  # silently missing.
   397	  [ -n "$record" ] || { echo "attempt-record produced nothing for $1" >&2; exit 1; }
   398	  DETAILS="${DETAILS:+$DETAILS,}$record"
   399	}
   400	
   401	# The extracted JSON is staged here and only ever moved into reviews/ on a fully
   402	# successful attempt. Writing straight to $OUT_FILE is how a failed re-run used
   403	# to be able to damage a good review.
   404	STAGED="$SCRATCH/staged-review.json"
   405	
   406	for attempt in 1 2; do
   407	  ATTEMPTS="$attempt"
   408	  ATTEMPT_DIR="$ATTEMPT_BASE/attempt-$attempt"
   409	  echo "[$SLOT round $ROUND] attempt $attempt: $COMMAND_STRING" >&2
   410	
   411	  INVOKE_OK=1
   412	  FROZEN_FLAG=()
   413	  if [ "$FINISH_FROZEN" = "1" ]; then FROZEN_FLAG=(--finish-frozen-run); fi
   414	  "$INVOKE" --purpose research --provider "$PROVIDER_CANONICAL" --package "$PACKAGE" ${FROZEN_FLAG[@]+"${FROZEN_FLAG[@]}"} \
   415	    --attempt-dir "$ATTEMPT_DIR" --model "$MODEL_ID" --effort "$EFFORT" \
   416	    --label "$SLOT round $ROUND" || INVOKE_OK=0
   417	
   418	  if [ "$INVOKE_OK" != "1" ]; then
   419	    # Fail closed and stop. A refusal is not a schema failure: re-sending the
   420	    # same package to a profile that just refused it, or to a run that just
   421	    # broke its boundary, spends money to be refused again. The retry budget
   422	    # exists for a reviewer that answered badly, not for one that never ran.
   423	    add_detail "$ATTEMPT_DIR" "$attempt" "not-reached"
   424	    # A run refused by policy is not a run that went wrong, and the top line of
   425	    # the manifest row should say which of the two happened.
   426	    if [ "$(cat "$ATTEMPT_DIR/status.txt" 2>/dev/null || echo failed)" = "blocked" ]; then
   427	      STATUS="blocked"
   428	    else
   429	      STATUS="failed"
   430	    fi
   590	esac
   591	
   592	# `high` and nothing else. It is what both callers pin, it is the level the
   593	# candidate diagnostic has live evidence at, and an effort level with no caller
   594	# and no evidence is a setting waiting to be chosen by accident.
   595	PINNED_EFFORTS="high"
   596	DEFAULT_EFFORT="high"
   597	
   598	# Applied before any refusal, so the retained metadata names the seat.
   599	MODEL="${MODEL:-$DEFAULT_MODEL}"
   600	EFFORT="${EFFORT:-$DEFAULT_EFFORT}"
   601	
   602	# Methodology v1.37 (2026-09-23): the Google seat is retired for every run
   603	# frozen after that date. The profile stays so the runs it did can be
   604	# read; a new run reaches it only when the caller says the run froze under the
   605	# three-provider rule, and says so again in the run record. Refused here as
   606	# well as in the two callers, because a launcher that trusts its callers is a
   607	# way to run a retired seat by hand.
   608	if [ "$PROVIDER" = "google" ] && [ "$FINISH_FROZEN" != "1" ]; then
   609	  refuse blocked "the Google seat is retired for runs frozen after 2026-09-23 (methodology v1.37); pass --finish-frozen-run only for a run that froze under the three-provider rule"
   610	fi
   611	
   612	PROFILE="$PROFILE_NAME"
   613	
   614	case ",$PINNED_MODELS," in
   615	  *",$MODEL,"*) ;;
   616	  *) refuse blocked "model '$MODEL' is not pinned for $PROVIDER (pinned: $PINNED_MODELS)" ;;
   617	esac
   618	case ",$PINNED_EFFORTS," in
   619	  *",$EFFORT,"*) ;;
   620	  *) refuse blocked "reasoning effort '$EFFORT' is not pinned for $PROVIDER (pinned: $PINNED_EFFORTS)" ;;
   621	esac
   622	
   623	# The vendor's own reason comes before the general one, so a Google refusal says
   624	# why Google is blocked rather than reciting the Claude candidate's problem.
   625	if [ -n "$BLOCK_REASON" ]; then
   626	  refuse blocked "$BLOCK_REASON"
   627	fi
   628	
   629	# ---------------------------------------------------------------------------
   630	# The admission gate.

codex
Five of the six fixes appear to close their original findings. I found a new edge case in the capture fix: it identifies allowed tool-result values by their text, so an identical value in a non-tool-result block may also be exempted. I’m verifying that case and running the repository checks before the verdict.
exec
/bin/zsh -lc 'npm run validate && npm test && npm run build' in <repo>
exec
/bin/zsh -lc "node --import tsx --input-type=module - <<'NODE'
import { checkCapture } from './scripts/panel/capture-check.ts';
const home='/Users/example';
const value="'`[Binary content (application/pdf, 2.6MB) also saved to ${home}/.claude/projects/x/tool-results/a.pdf]`;
const sources=[
 {name:'"'private instruction',present:true,lines:['A private instruction line long enough to check'],origin:'home'},
 {name:'the home directory',present:true,lines:[home],origin:'string'},
];
const request={file:'req-0001.json',method:'POST',url:'https://example.test',headers:{},body:{messages:[{role:'user',content:[{type:'text',text:'PKG'},{type:'tool_result',content:value},{type:'text',text:value}]}]}};
const result=checkCapture({requests:[request],packageText:'PKG',token:'',sources});
console.log(JSON.stringify({status:result.status,failures:result.failures,operator_path_notes:result.operator_path_notes}));
NODE" in <repo>
 succeeded in 0ms:
{"status":"pass","failures":[],"operator_path_notes":1}

exec
/bin/zsh -lc "rg -n -C 3 'reviewerCount' src/pages/index.astro && nl -ba src/lib/glossary.ts | sed -n '165,219p' && nl -ba src/pages/methodology/index.astro | sed -n '452,480p'" in <repo>
 succeeded in 0ms:
51- * run manifest rather than asserted in prose. Round 1 is the blind round, so it
52- * is the round the sentence is about.
53- */
54:let reviewerCount: number | undefined;
55-const newest = rows[0];
56-if (newest) {
57-  const manifestPath = path.join(process.cwd(), newest.claim.data.review_run, 'run.yaml');
--
60-    const providers = new Set(
61-      manifest.runs.filter((seat) => seat.round === 1).map((seat) => seat.provider),
62-    );
63:    reviewerCount = providers.size > 0 ? providers.size : undefined;
64-  }
65-}
66-
--
361-          <h3 class="font-sans text-base leading-[1.3] font-bold">Blind research</h3>
362-          <p class="mt-2 text-base text-ink">
363-            {
364:              reviewerCount
365:                ? `${reviewerCount} AI reviewers, each from a different company, research every claim without seeing each other's work.`
366-                : "AI reviewers from different companies research every claim without seeing each other's work."
367-            }{' '}
368-            <a href="/methodology#stages" class="link">How the rounds run</a>.
   165	  },
   166	};
   167	
   168	const missingPanels = new Set<string>();
   169	
   170	/** The panel that produced a claim, or the historical label with one warning if its manifest cannot be read. */
   171	export function panelForClaim(claim: Claim): { term: string; label: string } {
   172	  const historical = {
   173	    term: 'three-model AI panel',
   174	    label: 'three-model AI panel (Claude, GPT, Gemini)',
   175	  };
   176	  const unreadable = {
   177	    term: 'AI panel',
   178	    label: 'AI panel (seats in the run record)',
   179	  };
   180	  try {
   181	    const file = path.join(process.cwd(), claim.data.review_run, 'run.yaml');
   182	    if (!existsSync(file)) throw new Error('run.yaml is missing');
   183	    // Only the seats that answered. A refused or failed attempt keeps its
   184	    // manifest row (that is the retention rule) and is not a seat on the panel.
   185	    // Manifests written before methodology v1.28 carry no status field; every
   186	    // row in them is an answered seat.
   187	    const seats = loadRunManifest(file).runs
   188	      .filter((run) => run.round === 1 && (run.status === undefined || run.status === 'ok'))
   189	      .map((run) => ({ provider: run.provider.toLowerCase(), name: run.seat ?? run.model_id }));
   190	    if (seats.length !== 3 || seats.some((seat) => !seat.name)) {
   191	      throw new Error('round-one seats are incomplete');
   192	    }
   193	    const providers = new Set(seats.map((seat) => seat.provider));
   194	    if (providers.size === 3) return historical;
   195	    if (
   196	      providers.size === 2 &&
   197	      seats.filter((seat) => seat.provider === 'anthropic').length === 1 &&
   198	      seats.filter((seat) => seat.provider === 'openai').length === 2
   199	    ) {
   200	      return {
   201	        term: 'three-seat AI panel, two vendors',
   202	        label: 'three-seat AI panel, two vendors (Claude; GPT × 2)',
   203	      };
   204	    }
   205	    throw new Error('round-one providers do not match a published panel');
   206	  } catch (error) {
   207	    // Never the historical label by default: a manifest this page cannot read
   208	    // is not evidence of three vendors. The page says the seats are in the
   209	    // run record, and the build says which claim, once.
   210	    if (!missingPanels.has(claim.data.id)) {
   211	      console.warn(`Panel label for claim ${claim.data.id}: ${String(error)}; the page names no vendors`);
   212	      missingPanels.add(claim.data.id);
   213	    }
   214	    return unreadable;
   215	  }
   216	}
   217	
   218	export function define(term: string): GlossaryEntry | undefined {
   219	  return glossary[term] ?? glossary[term.toLowerCase()];
   452	      which happens several times a week; the founder decided that price was too high for a
   453	      check nobody could keep current, because a check that is out of date is a check that gets
   454	      switched off. So the check now reads the private files that are on this computer at the
   455	      moment it runs. Those are the instruction files in the operator's home folder and in this
   456	      project, the memory files kept for every project on this computer, the name of the home
   457	      folder, the path of the project, and the one-off token each attempt plants for its own
   458	      test. Every line of them long enough to be distinctive is then looked for in the body of
   459	      each request that was sent, at any depth, and if any of it is there the run is refused,
   460	      with one exception since September 23, 2026 (v1.38): when Claude's tool fetches a file
   461	      such as a PDF, the tool saves it to disk and writes a note into its own result naming the
   462	      path, and that path is in the operator's home folder. That one note, in that one place,
   463	      is counted rather than refused, and the count is printed on the run's row, because the
   464	      path was still sent to the vendor. The same words anywhere else, and every other private
   465	      string anywhere, still refuse the run. So is a run refused whose recording does not carry
   466	      the declared package word for word, since a
   467	      recording that cannot be tied to the package it was meant to carry says nothing about it.
   468	      A refusal names the file and the line number, never the line, and neither does the
   469	      published record: the private text is read, compared and dropped. What it searches is the
   470	      body of each request and nothing else: the delivery headers, the web addresses the
   471	      requests were sent to and the replies that came back are all still kept with the
   472	      recording, and none of them is searched. Two things said on September 15 are no longer
   473	      true and are not claimed here, and those paragraphs stay above as the record of what was
   474	      done at the time: the request is no longer compared against a written description of what
   475	      a clean one contains, and the record no longer keeps the two host-context messages word
   476	      for word or note that the three identifiers travelled with it. What this check no longer
   477	      does is say what the request contains. It says what the request does not contain, for text
   478	      this computer holds, and it cannot see text the maker attaches that is not on this
   479	      computer. The full recording
   480	      is still kept, so a later reader can ask a harder question of the same bytes. The version

exec
/bin/zsh -lc "rg -n 'run-reviewer|preflight|Google seat' docs/DESIGN.md | head -35 && git status --short" in <repo>
 succeeded in 0ms:
295:   re-run has a shape: `scripts/panel/run-reviewer.sh --claims <id> --into
359:`scripts/panel/run-reviewer.sh` assembles and `scripts/panel/invoke-reviewer.sh`
382:never merged. The same day the Google seat retired and Luna became a counted

exec
/bin/zsh -lc "rg -n -C 9 '"'^refuse'"\\(\\)|"'^write_metadata'"\\(\\)|PROFILE=' scripts/panel/invoke-reviewer.sh | head -170 && nl -ba scripts/panel/invoke-reviewer.sh | sed -n '285,450p'" in <repo>
 succeeded in 0ms:
289-cp "$PACKAGE" "$ATTEMPT_DIR/package.md"
290-
291-STATUS="incomplete"
292-REASON="the launcher exited before reaching a decision"
293-CLI_EXIT=""
294-CLI_VERSION=""
295-CLI_EXECUTABLE=""
296-CLI_EXECUTABLE_SHA=""
297-WORK_ROOT=""
298:PROFILE="unresolved"
299-CANARY_VERDICT="not-run"
300-STRUCTURE_VERDICT="not-run"
301-# "unavailable" until a capture has actually been proved, so every exit path
302-# before that records the honest answer rather than an optimistic default.
303-CONTEXT_PROOF="unavailable"
304-CANARY_CONTEXT_PROOF="unavailable"
305-ADMITTED="false"
306-ADMISSION_REASON="the launcher exited before reaching a decision"
307-# What the denylist ran over, whether the seat has an executable hook at all, and
--
315-# credential link came back as a regular file. Both are private observations, and
316-# both are empty on a run where nothing happened.
317-LEFTOVER_PATHS=""
318-CREDENTIAL_RESIDUE=""
319-
320-sha_of() { if [ -f "$1" ]; then shasum -a 256 "$1" | cut -d' ' -f1; else printf 'absent'; fi; }
321-
322-# Written on EVERY exit path, including an interrupt: a refusal, a crash and a
323-# clean run all leave a metadata file rather than a silent gap.
324:write_metadata() {
325-  # Assembled by node rather than by string-pasting into a heredoc: the reason
326-  # is free prose and one stray quote in it would produce a metadata file that
327-  # will not parse, on exactly the failure path where the metadata matters most.
328-  node -e '
329-    const fs = require("node:fs");
330-    const [out, ...rest] = process.argv.slice(1);
331-    const values = {};
332-    for (let i = 0; i < rest.length; i += 2) values[rest[i]] = rest[i + 1];
333-    const number = (value) => (value === "" ? null : Number(value));
--
504-stop_proxy() {
505-  [ -n "$PROXY_PID" ] || return 0
506-  kill "$PROXY_PID" 2>/dev/null || true
507-  wait "$PROXY_PID" 2>/dev/null || true
508-  PROXY_PID=""
509-}
510-
511-trap 'stop_proxy; write_metadata' EXIT
512-
513:refuse() {
514-  STATUS="$1"; shift
515-  REASON="$*"
516-  echo "[$LABEL] $STATUS: $REASON" >&2
517-  exit 1
518-}
519-
520-# ---------------------------------------------------------------------------
521-# Profile table. Every vendor has a row, including the ones that cannot run, so
522-# that a blocked attempt still records the seat it would have used rather than
--
603-# frozen after that date. The profile stays so the runs it did can be
604-# read; a new run reaches it only when the caller says the run froze under the
605-# three-provider rule, and says so again in the run record. Refused here as
606-# well as in the two callers, because a launcher that trusts its callers is a
607-# way to run a retired seat by hand.
608-if [ "$PROVIDER" = "google" ] && [ "$FINISH_FROZEN" != "1" ]; then
609-  refuse blocked "the Google seat is retired for runs frozen after 2026-09-23 (methodology v1.37); pass --finish-frozen-run only for a run that froze under the three-provider rule"
610-fi
611-
612:PROFILE="$PROFILE_NAME"
613-
614-case ",$PINNED_MODELS," in
615-  *",$MODEL,"*) ;;
616-  *) refuse blocked "model '$MODEL' is not pinned for $PROVIDER (pinned: $PINNED_MODELS)" ;;
617-esac
618-case ",$PINNED_EFFORTS," in
619-  *",$EFFORT,"*) ;;
620-  *) refuse blocked "reasoning effort '$EFFORT' is not pinned for $PROVIDER (pinned: $PINNED_EFFORTS)" ;;
621-esac
--
716-[ -n "$CLI_EXECUTABLE_SHA" ] || CLI_EXECUTABLE_SHA="unreadable"
717-
718-# The first field that looks like a version, not the first field. The three
719-# CLIs disagree about where they put it: `2.1.272 (Claude Code)`,
720-# `codex-cli 0.154.0`, `1.2.4`. Taking field one turned the Codex seat's profile
721-# into `codex-captured-read-only-codex-cli` on its first live run.
722-CLI_VERSION="$("$CLI" --version 2>/dev/null | head -1 | tr -d '\r' \
723-  | awk '{ for (i = 1; i <= NF; i++) if ($i ~ /^v?[0-9]+\.[0-9]+/) { sub(/^v/, "", $i); print $i; exit } }')"
724-[ -n "$CLI_VERSION" ] || CLI_VERSION="unknown"
725:PROFILE="$PROFILE_NAME-$CLI_VERSION"
726-printf '%s\n' "$PROFILE" > "$ATTEMPT_DIR/profile.txt"
727-
728-BOUNDARY_TS="$REPO_ROOT/scripts/panel/stream-boundary.ts"
729-CANARY_URL="https://example.com/"
730-CANARY_HEADING="Example Domain"
731-
732-# ---------------------------------------------------------------------------
733-# Per-attempt homes.
734-#
   285	
   286	# The exact bytes that were prepared, kept before anything can refuse or fail.
   287	# A blocked attempt whose package is missing tells you nothing about what was
   288	# almost sent, which is the thing an auditor most wants to see.
   289	cp "$PACKAGE" "$ATTEMPT_DIR/package.md"
   290	
   291	STATUS="incomplete"
   292	REASON="the launcher exited before reaching a decision"
   293	CLI_EXIT=""
   294	CLI_VERSION=""
   295	CLI_EXECUTABLE=""
   296	CLI_EXECUTABLE_SHA=""
   297	WORK_ROOT=""
   298	PROFILE="unresolved"
   299	CANARY_VERDICT="not-run"
   300	STRUCTURE_VERDICT="not-run"
   301	# "unavailable" until a capture has actually been proved, so every exit path
   302	# before that records the honest answer rather than an optimistic default.
   303	CONTEXT_PROOF="unavailable"
   304	CANARY_CONTEXT_PROOF="unavailable"
   305	ADMITTED="false"
   306	ADMISSION_REASON="the launcher exited before reaching a decision"
   307	# What the denylist ran over, whether the seat has an executable hook at all, and
   308	# whether a test used it. These are the only assignments: the profile table below
   309	# overrides them where a seat differs, and an exit before that table records what
   310	# is true so far, which is "nothing has been decided yet".
   311	RECORD_KIND="request"
   312	BIN_HOOK=""
   313	BIN_OVERRIDE=""
   314	# What was still in the temporary tree when it was taken down, and whether a
   315	# credential link came back as a regular file. Both are private observations, and
   316	# both are empty on a run where nothing happened.
   317	LEFTOVER_PATHS=""
   318	CREDENTIAL_RESIDUE=""
   319	
   320	sha_of() { if [ -f "$1" ]; then shasum -a 256 "$1" | cut -d' ' -f1; else printf 'absent'; fi; }
   321	
   322	# Written on EVERY exit path, including an interrupt: a refusal, a crash and a
   323	# clean run all leave a metadata file rather than a silent gap.
   324	write_metadata() {
   325	  # Assembled by node rather than by string-pasting into a heredoc: the reason
   326	  # is free prose and one stray quote in it would produce a metadata file that
   327	  # will not parse, on exactly the failure path where the metadata matters most.
   328	  node -e '
   329	    const fs = require("node:fs");
   330	    const [out, ...rest] = process.argv.slice(1);
   331	    const values = {};
   332	    for (let i = 0; i < rest.length; i += 2) values[rest[i]] = rest[i + 1];
   333	    const number = (value) => (value === "" ? null : Number(value));
   334	    // The capture facts are read back out of the report the check wrote rather
   335	    // than shuttled through a dozen shell variables. A report that is missing,
   336	    // truncated or from a run that never reached the check leaves every field
   337	    // absent, which reads as "not recorded" everywhere downstream.
   338	    const summary = (file) => {
   339	      try {
   340	        const report = JSON.parse(fs.readFileSync(file, "utf8"));
   341	        return report.capture_check ?? null;
   342	      } catch { return null; }
   343	    };
   344	    const research = summary(values.report);
   345	    const canary = summary(values.canary_report);
   346	    const spread = (prefix, value) => (value === null ? {} : {
   347	      [prefix + "upstream"]: value.upstream ?? null,
   348	      [prefix + "request_count"]: value.requests,
   349	      // How many of those the check actually walked. The difference is the
   350	      // requests with no JSON body, which nothing looked inside.
   351	      [prefix + "requests_searched"]: value.searched,
   352	      [prefix + "package_seen"]: value.package_seen,
   353	      // Which private sources were read and how many lines each contributed.
   354	      // Names and counts only: the lines themselves never leave the check.
   355	      [prefix + "capture_check_sources"]: value.sources,
   356	      // v1.38: requests whose only trace of the home path was the note the CLI
   357	      // itself wrote after saving a fetched binary. Public; the count is the
   358	      // disclosure.
   359	      [prefix + "operator_path_notes"]: value.operator_path_notes ?? null,
   360	      [prefix + "requests_manifest_sha256"]: value.requests_manifest_sha256 ?? null,
   361	    });
   362	    fs.writeFileSync(out, JSON.stringify({
   363	      attempt_id: values.attempt_id,
   364	      purpose: values.purpose,
   365	      provider: values.provider,
   366	      status: values.status,
   367	      reason: values.reason,
   368	      profile: values.profile,
   369	      model_id: values.model_id,
   370	      reasoning_effort: values.reasoning_effort,
   371	      // Observations, not gates (methodology v1.30). Which build ran is worth
   372	      // writing down; refusing every build nobody has probed yet is what rotted.
   373	      cli_version: values.cli_version,
   374	      // Private only. attempt-record.ts never copies these: where a CLI build
   375	      // sits on this machine, what its bytes hash to, and where the attempt
   376	      // worked are not part of the public record.
   377	      cli_executable: values.cli_executable,
   378	      cli_executable_sha256: values.cli_executable_sha256,
   379	      // Public. Which kind of evidence the denylist ran over is exactly what a
   380	      // reader needs to make sense of a `record-only` proof.
   381	      record_kind: values.record_kind,
   382	      // Private. A run a test arranged is never admitted, and the row says
   383	      // which hook named the executable rather than leaving the reader to
   384	      // infer it from an unadmitted run with no other explanation.
   385	      cli_bin_override: values.cli_bin_override,
   386	      // Private. What a CLI left in the temporary tree that could not be
   387	      // removed, named relative to `work_dir`, and a credential path that came
   388	      // back as a regular file where this launcher made a symlink. The second
   389	      // one is close to an alarm: it means a copy of a login exists somewhere
   390	      // this launcher did not put one.
   391	      leftover_paths: values.leftover_paths === "" ? [] : String(values.leftover_paths).split(","),
   392	      credential_residue:
   393	        values.credential_residue === "" ? [] : String(values.credential_residue).split(","),
   394	      work_dir: values.work_dir,
   395	      exit_code: number(values.exit_code),
   396	      canary: values.canary,
   397	      structure: values.structure,
   398	      context_proof: values.context_proof,
   399	      admitted_for_research: values.admitted === "true",
   400	      admission_reason: values.admission_reason,
   401	      started_at: values.started_at,
   402	      finished_at: values.finished_at,
   403	      package_sha256: values.package_sha256,
   404	      stdout_sha256: values.stdout_sha256,
   405	      final_message_sha256: values.final_message_sha256,
   406	      proof_report_sha256: values.proof_report_sha256,
   407	      canary_stdout_sha256: values.canary_stdout_sha256,
   408	      canary_stderr_sha256: values.canary_stderr_sha256,
   409	      canary_final_message_sha256: values.canary_final_message_sha256,
   410	      // The canary boundary report is also its proof report: one file, one hash.
   411	      canary_report_sha256: values.canary_report_sha256,
   412	      canary_context_proof: values.canary_context_proof,
   413	      ...spread("", research),
   414	      ...spread("canary_", canary),
   415	    }, null, 2) + "\n");
   416	  ' "$ATTEMPT_DIR/metadata.json" \
   417	    report "$ATTEMPT_DIR/report.json" \
   418	    canary_report "$ATTEMPT_DIR/canary/report.json" \
   419	    cli_executable "$CLI_EXECUTABLE" \
   420	    cli_executable_sha256 "$CLI_EXECUTABLE_SHA" \
   421	    record_kind "$RECORD_KIND" \
   422	    cli_bin_override "$BIN_OVERRIDE" \
   423	    leftover_paths "$LEFTOVER_PATHS" \
   424	    credential_residue "$CREDENTIAL_RESIDUE" \
   425	    work_dir "$WORK_ROOT" \
   426	    context_proof "$CONTEXT_PROOF" \
   427	    canary_context_proof "$CANARY_CONTEXT_PROOF" \
   428	    admitted "$ADMITTED" \
   429	    admission_reason "$ADMISSION_REASON" \
   430	    proof_report_sha256 "$(sha_of "$ATTEMPT_DIR/report.json")" \
   431	    attempt_id "$ATTEMPT_ID" \
   432	    purpose "$PURPOSE" \
   433	    provider "$PROVIDER" \
   434	    status "$STATUS" \
   435	    reason "$REASON" \
   436	    profile "$PROFILE" \
   437	    model_id "$MODEL" \
   438	    reasoning_effort "$EFFORT" \
   439	    cli_version "$CLI_VERSION" \
   440	    exit_code "$CLI_EXIT" \
   441	    canary "$CANARY_VERDICT" \
   442	    structure "$STRUCTURE_VERDICT" \
   443	    started_at "$STARTED_AT" \
   444	    finished_at "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
   445	    package_sha256 "$(sha_of "$ATTEMPT_DIR/package.md")" \
   446	    stdout_sha256 "$(sha_of "$ATTEMPT_DIR/stdout.txt")" \
   447	    final_message_sha256 "$(sha_of "$ATTEMPT_DIR/final-message.txt")" \
   448	    canary_stdout_sha256 "$(sha_of "$ATTEMPT_DIR/canary/stdout.txt")" \
   449	    canary_stderr_sha256 "$(sha_of "$ATTEMPT_DIR/canary/stderr.txt")" \
   450	    canary_final_message_sha256 "$(sha_of "$ATTEMPT_DIR/canary/final-message.txt")" \

exec
/bin/zsh -lc "nl -ba src/pages/index.astro | sed -n '355,370p' && nl -ba docs/DESIGN.md | sed -n '355,375p' && nl -ba methodology/changelog.yaml | sed -n '53,62p'" in <repo>
 succeeded in 0ms:
   355	    </p>
   356	
   357	    {/* The numerals are a CSS counter on this list — see `.steps` in global.css. */}
   358	    <div class="strip mt-6">
   359	      <ol class="steps">
   360	        <li>
   361	          <h3 class="font-sans text-base leading-[1.3] font-bold">Blind research</h3>
   362	          <p class="mt-2 text-base text-ink">
   363	            {
   364	              reviewerCount
   365	                ? `${reviewerCount} AI reviewers, each from a different company, research every claim without seeing each other's work.`
   366	                : "AI reviewers from different companies research every claim without seeing each other's work."
   367	            }{' '}
   368	            <a href="/methodology#stages" class="link">How the rounds run</a>.
   369	          </p>
   370	        </li>
   355	| GPT-5.6 Sol | `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check` |
   356	| Gemini 3.8 Flash | `agy --model gemini-3.8-flash-high --effort high --sandbox --dangerously-skip-permissions --print-timeout 45m -p` (v1.26; Gemini 3.1 Pro before that, and v1.14 added the permissions flag, without which the headless seat returned nothing on PDF-heavy briefs). The founder retired 3.1 Pro from every seat on this site after the intake extraction run, where 3.8 Flash at high turned the weakest extractor seat into the cleanest; no panel-round comparison of the two exists. Runs already published under 3.1 Pro keep the model their manifests record. |
   357	
   358	**Current pins (v1.37).** The commands approved for new runs are the ones
   359	`scripts/panel/run-reviewer.sh` assembles and `scripts/panel/invoke-reviewer.sh`
   360	admits; nothing else runs a seat. From v1.37 the seats are `claude-opus-5-5`,
   361	`gpt-6-sol` and `gpt-6-luna`, every seat at `high`. Opus 5.5 defaults to medium
   362	effort, so the pin is what keeps the seat at the level v1.6 chose. The Google
   363	seat (`gemini-3.8-flash-high`) is retired for runs frozen after 2026-09-23: the
   364	founder's Google usage ran out twice in a week and he will not buy more. Its
   365	profile stays in the launcher for the record of the runs it did, and the runner
   366	starts it only with `--finish-frozen-run`, for a run that froze under the
   367	three-provider rule. A superseded model stays on the launcher's pinned list,
   368	never as the default, while a brief parked on a check it ran can still be
   369	confirmed (v1.35). Runs already published keep the model their manifests
   370	record.
   371	
   372	**The vendor split (v1.37).** When the Anthropic seat differs from both OpenAI
   373	seats, the finding names the vendor split beside the seat agreement and the
   374	drafting addresses it from the sources. It is never presented as a plain
   375	two-to-one majority. The quality ledger tracks the Luna seat's catches and
    53	  highlights:
    54	    - "Why. The Google route is one command-line tool on a consumer account whose weekly allowance ran out on 2026-09-16, blocking the second intake for a week, and again on 2026-09-23 after one panel seat and three audit attempts. The founder will not buy more: \"we should drop gemini completely, I don't have enough usage to continue with it.\" The site's method has always run on the founder's subscriptions; a seat he cannot afford to run is not a seat."
    55	    - "What the panel is now. Claude Opus 5.5, GPT-6 Sol and GPT-6 Luna, all at high, pinned in the launcher. Two seats, two vendors, would have needed a new synthesis rule for two verdicts and left two rules on the site; two Anthropic seats would have put the editor's vendor in the majority; a paid third vendor is money this method has never spent. Three seats from two vendors keeps the matrix, the vocabulary and every published finding's meaning intact and moves the loss to where it belongs, the independence claim, which is now stated wherever the panel is described: on the methodology page, on every finding, in the glossary, in search descriptions and share text. Panel agreement, Unanimous, Adjacent or Split, describes seats, not vendors."
    56	    - "The vendor split. When the Anthropic seat differs from both OpenAI seats, the finding names the vendor split beside the seat agreement and the drafting addresses it from the sources. It is never presented as a plain two-to-one majority. The quality ledger tracks the Luna seat's catches and misses and any miss the two OpenAI seats share, with a review point after several counted runs; one shadow run is not evidence of quality, and this entry claims none."
    57	    - "Effective date. A run frozen under the three-provider rule finishes under it. Lanes-and-congestion froze on 2026-09-23 before this entry; its round 1 counts the Gemini seat's admitted answer and keeps the Luna shadow answer as shadow, and its round 2 needs the Google seat once more, after the allowance resets about 2026-09-30, unless the founder closes the attempt as incomplete and starts a clean run under this rule. No panel is assembled from answers already seen. The runner starts the retired seat only with --finish-frozen-run; audits refuse it outright."
    58	    - "The other stages. Triage reads on GPT-6 Sol and GPT-6 Luna at high, one vendor, and the register says so; a proposition both decline or park is re-decided by an Anthropic audit reader before the register records it, so one vendor cannot quietly remove a claim. Extraction runs on Haiku 4.5, GPT-6 Luna at low and Sonnet 5, two vendors. Faithfulness, plain-speech and gate audits run on OpenAI, off the editor's vendor as before. The shadow-seat experiment of v1.34 ended after one run, superseded by Luna counting; the one comparison stays in that run's record. A preflight step (scripts/panel/preflight.sh: the seat's CLI version, and for Codex its reported login state; Claude's Keychain login is proven by the canary) runs from the runner before a package is assembled, so a dead seat is found before anything is sent; the quota probe is the launcher's canary itself, a one-line model call that every attempt already makes and that fails on an exhausted allowance before the package goes."
    59	    - "By whom, again. The founder decided the retirement on cost; the editor chose the shape and put it to the full board: four memos, all REVISE, every required change taken, one split resolved three to one against counting the shadow answer for the run in progress. The memos ran on GPT-6 Sol, the vendor that gains two seats, so the pass spent the usage the founder has and asked the beneficiary to argue against itself. The board record is private; this entry is the public account of it."
    60	    - "What this entry does not do: it does not change the matrix, the agreement words, the cautious lean or any published finding; it does not claim the two OpenAI seats are independent; and it does not claim Luna reviews as well as the seat it replaces."
    61	  links:
    62	    - label: How a finding is produced

 succeeded in 47500ms:
warn: src/content/stories/active-transportation.mdx: one_line is 30 words. Is it a sentence a person would say? The exact figures belong in the explanation.
validate: OK — 7 stories, 17 claims, 1 commitments, 8 topics, 162 evidence entries
warn: src/content/stories/electric-buses.mdx: one_line is 27 words. Is it a sentence a person would say? The exact figures belong in the explanation.
warn: src/content/stories/infill-prices.mdx: tldr[4] is 37 words. Is it a sentence a person would say? The exact figures belong in the explanation.

> yegfacts@0.1.0 test
> vitest run


 RUN  v4.1.11 <repo>


 Test Files  28 passed (28)
      Tests  493 passed | 1 skipped (494)
   Start at  13:21:23
   Duration  44.56s (transform 925ms, setup 0ms, import 1.94s, tests 71.73s, environment 1ms)


> yegfacts@0.1.0 build
> astro build && pagefind --site dist

13:22:08 [content] Syncing content
13:22:08 [content] Synced content
13:22:08 [types] Generated 394ms
13:22:08 [build] output: "static"
13:22:08 [build] mode: "static"
13:22:08 [build] directory: <repo>/dist/
13:22:08 [build] Collecting build info...
13:22:08 [build] ✓ Completed in 424ms.
13:22:08 [build] Building static entrypoints...
13:22:09 [vite] ✓ built in 300ms
13:22:09 [vite] ✓ built in 10ms
13:22:09 [build] Rearranging server assets...

 generating static routes 
13:22:09   ├─ /404.html (+6ms) 
13:22:09   ├─ /about.html (+4ms) 
13:22:09   ├─ /claims/at-100m-vs-roads.html (+3ms) 
13:22:09   ├─ /claims/at-100m-vs-snow.html (+2ms) 
13:22:09   ├─ /claims/climate-on-track.html (+3ms) 
13:22:09   ├─ /claims/cv-commute-by-car.html (+5ms) 
13:22:09   ├─ /claims/cv-commuters-cycle.html (+3ms) 
13:22:09   ├─ /claims/cv-counter-total-2026.html (+3ms) 
13:22:09   ├─ /claims/cv-lanes-look-empty.html (+4ms) 
13:22:09   ├─ /claims/cv-population-rides.html (+2ms) 
13:22:09   ├─ /claims/cv-trips-by-bike.html (+2ms) 
13:22:09   ├─ /claims/cv-year-round-riders.html (+2ms) 
13:22:09   ├─ /claims/districts-travel-restrictions.html (+4ms) 
13:22:09   ├─ /claims/ebus-82m-loss.html (+1ms) 
13:22:09   ├─ /claims/ebus-cold-cities.html (+1ms) 
13:22:09   ├─ /claims/ebus-procurement-failure.html (+1ms) 
13:22:09   ├─ /claims/ip-infill-affordable.html (+2ms) 
13:22:09   ├─ /claims/ip-teardown-price-gap.html (+7ms) 
13:22:09   ├─ /claims/wc-too-cold.html (+2ms) 
13:22:09   ├─ /claims/bike-lanes-look-empty.html (+1ms) 
13:22:09   ├─ /claims/one-to-two-percent-of-population-rides.html (+1ms) 
13:22:09   ├─ /claims/cycling-trips-1-3-million-2026.html (+1ms) 
13:22:09   ├─ /claims/riders-are-recreational-not-commuters.html (+1ms) 
13:22:09   ├─ /claims/under-one-percent-of-commuters-cycle.html (+1ms) 
13:22:09   ├─ /claims/two-percent-of-trips-by-bike.html (+1ms) 
13:22:09   ├─ /claims/87-percent-commute-by-car.html (+1ms) 
13:22:09   ├─ /claims/one-percent-year-round-users.html (+1ms) 
13:22:09   ├─ /claims/heritage-days-bike-arrivals.html (+1ms) 
13:22:09   ├─ /claims/blue-collar-workers-bike-to-work.html (+1ms) 
13:22:09   ├─ /claims/cyclists-higher-income-and-education.html (+1ms) 
13:22:09   ├─ /claims/most-cyclists-also-drive.html (+3ms) 
13:22:09   ├─ /claims/winter-too-cold-for-cycling.html (+1ms) 
13:22:09   ├─ /claims/winter-cycling-has-grown.html (+1ms) 
13:22:09   ├─ /claims/bike-lanes-plowed-before-streets.html (+2ms) 
13:22:09   ├─ /claims/whyte-avenue-narrow-in-winter.html (+1ms) 
13:22:09   ├─ /claims/snow-windrowed-into-parking-spaces.html (+5ms) 
13:22:09   ├─ /claims/two-snow-removal-proposals-need-more-money.html (+1ms) 
13:22:09   ├─ /claims/calcium-chloride-debate-coming.html (+1ms) 
13:22:09   ├─ /claims/lane-removal-increases-congestion.html (+1ms) 
13:22:09   ├─ /claims/bike-infra-reduces-congestion.html (+1ms) 
13:22:09   ├─ /claims/city-removed-traffic-lanes.html (+1ms) 
13:22:09   ├─ /claims/roads-carry-goods-and-services.html (+1ms) 
13:22:09   ├─ /claims/79-street-relieves-75-street.html (+1ms) 
13:22:09   ├─ /claims/lanes-removed-for-traffic-calming.html (+1ms) 
13:22:09   ├─ /claims/remaining-lane-too-narrow-to-pass.html (+1ms) 
13:22:09   ├─ /claims/road-surface-breaking-from-one-lane.html (+0ms) 
13:22:09   ├─ /claims/proposal-does-not-widen-road.html (+0ms) 
13:22:09   ├─ /claims/bike-share-one-percent-of-road-budget.html (+0ms) 
13:22:09   ├─ /claims/100-million-over-four-years.html (+1ms) 
13:22:09   ├─ /claims/181-million-for-600m-of-50-street.html (+0ms) 
13:22:09   ├─ /claims/50-street-costs-double-active-transport.html (+0ms) 
13:22:09   ├─ /claims/billions-spent-on-road-building.html (+0ms) 
13:22:09   ├─ /claims/spending-proportional-to-cyclist-numbers.html (+0ms) 
13:22:09   ├─ /claims/bike-lane-maintenance-cost-per-year.html (+0ms) 
13:22:09   ├─ /claims/council-approved-100-million.html (+0ms) 
13:22:09   ├─ /claims/basic-services-in-poor-condition.html (+0ms) 
13:22:09   ├─ /claims/spending-100-million-despite-deficit.html (+1ms) 
13:22:09   ├─ /claims/rec-centre-money-diverted.html (+1ms) 
13:22:09   ├─ /claims/drainage-damage-to-homeowners.html (+0ms) 
13:22:09   ├─ /claims/new-streetlights-added-costs.html (+0ms) 
13:22:09   ├─ /claims/property-taxes-rising-sharply.html (+0ms) 
13:22:09   ├─ /claims/property-tax-bill-six-thousand.html (+0ms) 
13:22:09   ├─ /claims/council-rejected-pause.html (+0ms) 
13:22:09   ├─ /claims/administration-recommended-freezing-14-routes.html (+0ms) 
13:22:09   ├─ /claims/motions-to-cut-budget-to-50-million-failed.html (+0ms) 
13:22:09   ├─ /claims/same-seven-councillors-vote-together.html (+1ms) 
13:22:09   ├─ /claims/more-speakers-in-favour-at-hearing.html (+0ms) 
13:22:09   ├─ /claims/hearing-supporters-and-lobby-groups.html (+0ms) 
13:22:09   ├─ /claims/speaking-time-cut-to-three-minutes.html (+1ms) 
13:22:09   ├─ /claims/designs-paid-and-contracts-signed.html (+0ms) 
13:22:09   ├─ /claims/too-late-to-tender-for-2026.html (+0ms) 
13:22:09   ├─ /claims/most-residents-oppose-lanes.html (+0ms) 
13:22:09   ├─ /claims/fast-tracked-without-consultation.html (+0ms) 
13:22:09   ├─ /claims/ca-route-level-engagement.html (+0ms) 
13:22:09   ├─ /claims/last-election-turnout-under-40.html (+0ms) 
13:22:09   ├─ /claims/voters-elected-pro-bike-council.html (+0ms) 
13:22:09   ├─ /claims/council-recall-timing.html (+0ms) 
13:22:09   ├─ /claims/councillors-dont-bike-to-work.html (+0ms) 
13:22:09   ├─ /claims/councillors-get-vehicle-allowance.html (+1ms) 
13:22:09   ├─ /claims/staff-paid-over-100k-plus-pension.html (+0ms) 
13:22:09   ├─ /claims/withheld-yegscoop-2026-08-26-1.html (+1ms) 
13:22:09   ├─ /claims/drivers-pay-for-roads-via-fuel-taxes.html (+0ms) 
13:22:09   ├─ /claims/roads-funded-by-property-taxes.html (+0ms) 
13:22:09   ├─ /claims/cyclists-pay-property-taxes.html (+0ms) 
13:22:09   ├─ /claims/taxes-fund-services-you-dont-use.html (+0ms) 
13:22:09   ├─ /claims/bike-lanes-remove-street-parking.html (+0ms) 
13:22:09   ├─ /claims/business-lost-customer-parking.html (+1ms) 
13:22:09   ├─ /claims/free-parking-is-a-subsidy.html (+0ms) 
13:22:09   ├─ /claims/infill-removes-trees-and-parking.html (+5ms) 
13:22:09   ├─ /claims/sprawl-unsustainable-as-population-grows.html (+1ms) 
13:22:09   ├─ /claims/no-minimum-parking-requirements.html (+0ms) 
13:22:09   ├─ /claims/15-minute-city-agreement.html (+0ms) 
13:22:09   ├─ /claims/downtown-car-ban-plan.html (+0ms) 
13:22:09   ├─ /claims/barriers-delay-emergency-vehicles.html (+0ms) 
13:22:09   ├─ /claims/responders-use-lanes-to-pass-traffic.html (+0ms) 
13:22:09   ├─ /claims/barriers-block-disabled-access.html (+0ms) 
13:22:09   ├─ /claims/lanes-can-be-designed-accessible.html (+1ms) 
13:22:09   ├─ /claims/119-avenue-alley-access-detour.html (+0ms) 
13:22:09   ├─ /claims/lanes-add-accessibility-and-health.html (+0ms) 
13:22:09   ├─ /claims/transit-takes-far-longer-than-driving.html (+0ms) 
13:22:09   ├─ /claims/lrt-slow-and-deadly.html (+0ms) 
13:22:09   ├─ /claims/lrt-barely-functions.html (+0ms) 
13:22:09   ├─ /claims/ets-community-routes-removed.html (+0ms) 
13:22:09   ├─ /claims/transit-more-efficient-than-cars.html (+0ms) 
13:22:09   ├─ /claims/lanes-keep-riders-out-of-traffic.html (+0ms) 
13:22:09   ├─ /claims/cyclists-ride-on-sidewalks.html (+1ms) 
13:22:09   ├─ /claims/cyclists-have-right-to-the-road.html (+0ms) 
13:22:09   ├─ /claims/bike-lanes-dont-improve-safety.html (+0ms) 
13:22:09   ├─ /claims/bike-collision-fault-share.html (+0ms) 
13:22:09   ├─ /claims/cyclists-harassed-on-roads-without-lanes.html (+0ms) 
13:22:09   ├─ /claims/street-labs-no-safety-value.html (+0ms) 
13:22:09   ├─ /claims/downtown-network-safe-family-route.html (+1ms) 
13:22:09   ├─ /claims/lane-on-provincially-arterial-road.html (+0ms) 
13:22:09   ├─ /claims/routes-approved-by-engineers.html (+0ms) 
13:22:09   ├─ /claims/no-lanes-on-arterial-roads.html (+1ms) 
13:22:09   ├─ /claims/50-street-is-collector-not-arterial.html (+1ms) 
13:22:09   ├─ /claims/95-percent-network-shared-paths.html (+0ms) 
13:22:09   ├─ /claims/design-escalated-from-paint-to-rebuilds.html (+0ms) 
13:22:09   ├─ /claims/shared-30-kmh-streets-exist.html (+1ms) 
13:22:09   ├─ /claims/routes-go-nowhere.html (+0ms) 
13:22:09   ├─ /claims/missing-connections-along-lrt.html (+0ms) 
13:22:09   ├─ /claims/83-avenue-decade-no-complaints.html (+0ms) 
13:22:09   ├─ /claims/no-bike-lane-on-whyte-avenue.html (+0ms) 
13:22:09   ├─ /claims/132-avenue-lanes-both-sides.html (+1ms) 
13:22:09   ├─ /claims/seven-schools-on-132-avenue.html (+0ms) 
13:22:09   ├─ /claims/province-ordered-stop-and-will-legislate.html (+1ms) 
13:22:09   ├─ /claims/no-written-provincial-direction.html (+1ms) 
13:22:09   ├─ /claims/holyrood-school-bike-lane-proposal.html (+0ms) 
13:22:09   ├─ /claims/holyrood-design-approved-then-stopped.html (+1ms) 
13:22:09   ├─ /claims/189-street-lane-removed-later.html (+0ms) 
13:22:09   ├─ /claims/former-councillor-installed-189-street-lane.html (+1ms) 
13:22:09   ├─ /claims/other-cities-removing-bike-lanes.html (+0ms) 
13:22:09   ├─ /claims/downtown-businesses-closing.html (+2ms) 
13:22:09   ├─ /claims/biweekly-bin-adequacy.html (+0ms) 
13:22:09   ├─ /claims/black-bin-frequency.html (+1ms) 
13:22:09   ├─ /claims/green-bin-frequency.html (+0ms) 
13:22:09   ├─ /claims/recycling-frequency.html (+0ms) 
13:22:09   ├─ /claims/collection-frequency-change.html (+0ms) 
13:22:09   ├─ /claims/green-bin-utilization.html (+0ms) 
13:22:09   ├─ /claims/summer-garbage-condition.html (+0ms) 
13:22:09   ├─ /claims/between-collection-dump-runs.html (+0ms) 
13:22:09   ├─ /claims/diaper-waste-volume.html (+0ms) 
13:22:09   ├─ /claims/past-weekly-bag-volume.html (+1ms) 
13:22:09   ├─ /claims/blue-bag-capacity-offset.html (+0ms) 
13:22:09   ├─ /claims/larger-black-cart-options.html (+2ms) 
13:22:09   ├─ /claims/medical-waste-cart-eligibility.html (+0ms) 
13:22:09   ├─ /claims/household-size-threshold.html (+0ms) 
13:22:09   ├─ /claims/dialysis-cart-decision.html (+0ms) 
13:22:09   ├─ /claims/dialysis-household-capacity.html (+1ms) 
13:22:09   ├─ /claims/larger-green-cart-options.html (+0ms) 
13:22:09   ├─ /claims/two-bag-daily-allowance.html (+0ms) 
13:22:09   ├─ /claims/one-bag-weekly-allowance.html (+0ms) 
13:22:09   ├─ /claims/epcor-waste-fee.html (+0ms) 
13:22:09   ├─ /claims/service-opt-out.html (+1ms) 
13:22:09   ├─ /claims/largest-cart-monthly-bill.html (+1ms) 
13:22:09   ├─ /claims/waste-tax-and-utility-charges.html (+0ms) 
13:22:09   ├─ /claims/larger-cart-monthly-cost.html (+0ms) 
13:22:09   ├─ /claims/extra-service-billing-case.html (+0ms) 
13:22:09   ├─ /claims/missed-collection-reporting.html (+0ms) 
13:22:09   ├─ /claims/post-report-pickup-delay.html (+1ms) 
13:22:09   ├─ /claims/partial-alley-collection.html (+0ms) 
13:22:09   ├─ /claims/early-tuesday-pickup.html (+0ms) 
13:22:09   ├─ /claims/wastewise-collection-schedule.html (+0ms) 
13:22:09   ├─ /claims/resident-pickup-record.html (+0ms) 
13:22:09   ├─ /claims/cart-lid-overload-rule.html (+0ms) 
13:22:09   ├─ /claims/waste-sorting-inspections.html (+0ms) 
13:22:09   ├─ /claims/beside-cart-bag-rule.html (+1ms) 
13:22:09   ├─ /claims/townhouse-cart-allocation.html (+1ms) 
13:22:09   ├─ /claims/condo-cart-capacity.html (+0ms) 
13:22:09   ├─ /claims/shared-townhouse-garbage-service.html (+1ms) 
13:22:09   ├─ /claims/townhouse-waste-streams.html (+0ms) 
13:22:09   ├─ /claims/labelled-cart-use.html (+0ms) 
13:22:09   ├─ /claims/sorting-reduces-garbage.html (+0ms) 
13:22:09   ├─ /claims/recycling-and-compost-volume.html (+0ms) 
13:22:09   ├─ /claims/majority-recyclable-waste.html (+0ms) 
13:22:09   ├─ /claims/half-recyclable-garbage.html (+1ms) 
13:22:09   ├─ /claims/purchases-recyclability-rate.html (+0ms) 
13:22:09   ├─ /claims/waste-stream-disposal-paths.html (+0ms) 
13:22:09   ├─ /claims/recyclables-overseas-processing.html (+0ms) 
13:22:09   ├─ /claims/contaminated-bag-disposition.html (+0ms) 
13:22:09   ├─ /claims/expanded-recycling-list.html (+0ms) 
13:22:09   ├─ /claims/recycling-disposal-rate.html (+0ms) 
13:22:09   ├─ /claims/recycling-processor.html (+0ms) 
13:22:09   ├─ /claims/recycling-facility-network.html (+0ms) 
13:22:09   ├─ /claims/downstream-material-processes.html (+0ms) 
13:22:09   ├─ /claims/local-recycling-acceptance.html (+0ms) 
13:22:09   ├─ /claims/regional-disposal-sites.html (+0ms) 
13:22:09   ├─ /claims/cleanliness-after-system-change.html (+0ms) 
13:22:09   ├─ /claims/cart-protection-from-birds.html (+0ms) 
13:22:09   ├─ /claims/tax-and-service-change.html (+0ms) 
13:22:09   ├─ /claims/planned-tax-increases.html (+0ms) 
13:22:09   ├─ /claims/ukraine-property-tax-funding.html (+0ms) 
13:22:09   ├─ /claims/art-gallery-project-cost.html (+0ms) 
13:22:09   ├─ /claims/bike-lane-public-spending.html (+0ms) 
13:22:09   ├─ /claims/sidewalk-removal-for-bike-lanes.html (+1ms) 
13:22:09   ├─ /claims/asphalt-sidewalk-condition.html (+0ms) 
13:22:09   ├─ /claims/sidewalk-replacement-history.html (+0ms) 
13:22:09   ├─ /claims/private-property-parking-charge.html (+1ms) 
13:22:09   ├─ /claims/parking-report-response-time.html (+0ms) 
13:22:09   ├─ /claims/withheld-edmonton-rant-and-rave-2026-09-10-1.html (+0ms) 
13:22:09   ├─ /claims/daytime-bike-advocacy.html (+0ms) 
13:22:09   ├─ /claims/working-bike-commuters.html (+0ms) 
13:22:09   ├─ /claims/self-powered-two-wheel-commuting.html (+2ms) 
13:22:09   ├─ /commitments.html (+5ms) 
13:22:09   ├─ /evidence/YF-EV-0001.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0002.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0003.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0004.html (+2ms) 
13:22:09   ├─ /evidence/YF-EV-0005.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0006.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0007.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0008.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0009.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0010.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0011.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0012.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0013.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0014.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0015.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0016.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0017.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0018.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0019.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0020.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0021.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0022.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0023.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0024.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0025.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0026.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0027.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0028.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0029.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0030.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0031.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0032.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0033.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0034.html (+2ms) 
13:22:09   ├─ /evidence/YF-EV-0035.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0036.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0037.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0038.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0039.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0040.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0041.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0042.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0043.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0044.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0045.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0046.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0047.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0048.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0049.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0050.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0051.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0052.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0053.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0054.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0055.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0056.html (+5ms) 
13:22:09   ├─ /evidence/YF-EV-0057.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0058.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0059.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0060.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0061.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0062.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0063.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0064.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0065.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0066.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0067.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0068.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0069.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0070.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0071.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0072.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0073.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0074.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0075.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0076.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0077.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0078.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0079.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0080.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0081.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0082.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0083.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0084.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0085.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0086.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0087.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0088.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0089.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0090.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0091.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0092.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0093.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0094.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0095.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0096.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0097.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0098.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0099.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0100.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0101.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0102.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0103.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0104.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0105.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0106.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0107.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0108.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0109.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0110.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0111.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0112.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0113.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0114.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0115.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0116.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0117.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0118.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0119.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0120.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0121.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0122.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0123.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0124.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0125.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0126.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0127.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0128.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0129.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0130.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0131.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0132.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0133.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0134.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0135.html (+3ms) 
13:22:09   ├─ /evidence/YF-EV-0136.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0137.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0138.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0139.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0140.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0141.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0142.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0143.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0144.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0145.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0146.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0147.html (+2ms) 
13:22:09   ├─ /evidence/YF-EV-0148.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0149.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0150.html (+4ms) 
13:22:09   ├─ /evidence/YF-EV-0151.html (+4ms) 
13:22:09   ├─ /evidence/YF-EV-0152.html (+7ms) 
13:22:09   ├─ /evidence/YF-EV-0153.html (+3ms) 
13:22:09   ├─ /evidence/YF-EV-0154.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0155.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0156.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0157.html (+3ms) 
13:22:09   ├─ /evidence/YF-EV-0158.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0159.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0160.html (+1ms) 
13:22:09   ├─ /evidence/YF-EV-0161.html (+0ms) 
13:22:09   ├─ /evidence/YF-EV-0162.html (+0ms) 
13:22:09   ├─ /evidence.html (+2ms) 
13:22:09   ├─ /journal/rss.xml (+14ms) 
13:22:09   ├─ /journal/a-rule-for-numbers.html (+4ms) 
13:22:09   ├─ /journal/four-checks-too-fair.html (+2ms) 
13:22:09   ├─ /journal/i-was-picking-the-claims.html (+2ms) 
13:22:09   ├─ /journal.html (+2ms) 
13:22:09   ├─ /methodology/changes.html (+11ms) 
13:22:09   ├─ /methodology.html (+3ms) 
13:22:09   ├─ /questions/cycling-volumes.html (+21ms) 
13:22:09   ├─ /questions/lanes-and-congestion.html (+1ms) 
13:22:09   ├─ /questions/collection-schedule-and-capacity.html (+1ms) 
13:22:09   ├─ /questions/who-pays-for-roads.html (+1ms) 
13:22:09   ├─ /questions/hundred-million-approval.html (+1ms) 
13:22:09   ├─ /questions/winter-cycling.html (+6ms) 
13:22:09   ├─ /questions/active-transportation.html (+13ms) 
13:22:09   ├─ /questions/consultation-and-opposition.html (+1ms) 
13:22:09   ├─ /questions/infrastructure-deficit.html (+1ms) 
13:22:09   ├─ /questions/cycling-safety.html (+1ms) 
13:22:09   ├─ /questions/council-hearing.html (+1ms) 
13:22:09   ├─ /questions/recycling-and-compost-processing.html (+1ms) 
13:22:09   ├─ /questions/household-waste-diversion.html (+1ms) 
13:22:09   ├─ /questions/on-street-parking.html (+1ms) 
13:22:09   ├─ /questions/street-types-and-design.html (+1ms) 
13:22:09   ├─ /questions/cart-sizes-and-eligibility.html (+0ms) 
13:22:09   ├─ /questions/council-pause-vote.html (+0ms) 
13:22:09   ├─ /questions/waste-service-billing.html (+1ms) 
13:22:09   ├─ /questions/access-across-barriers.html (+0ms) 
13:22:09   ├─ /questions/collection-reliability.html (+1ms) 
13:22:09   ├─ /questions/snow-clearing.html (+1ms) 
13:22:09   ├─ /questions/councillors-own-commute.html (+1ms) 
13:22:09   ├─ /questions/transit-alternative.html (+1ms) 
13:22:09   ├─ /questions/132-avenue.html (+1ms) 
13:22:09   ├─ /questions/council-mandate.html (+1ms) 
13:22:09   ├─ /questions/emergency-access.html (+1ms) 
13:22:09   ├─ /questions/multi-unit-waste-service.html (+1ms) 
13:22:09   ├─ /questions/provincial-direction.html (+1ms) 
13:22:09   ├─ /questions/who-cycles.html (+0ms) 
13:22:09   ├─ /questions/zoning-and-infill.html (+1ms) 
13:22:09   ├─ /questions/city-plan-commitments.html (+1ms) 
13:22:09   ├─ /questions/converted-roadway.html (+1ms) 
13:22:09   ├─ /questions/curbside-waste-rules.html (+1ms) 
13:22:09   ├─ /questions/eco-station-garbage-allowance.html (+1ms) 
13:22:09   ├─ /questions/network-connections.html (+1ms) 
13:22:09   ├─ /questions/routes-already-committed.html (+1ms) 
13:22:09   ├─ /questions/189-street-lane.html (+2ms) 
13:22:09   ├─ /questions/83-avenue-lane.html (+1ms) 
13:22:09   ├─ /questions/bicycle-commuters.html (+0ms) 
13:22:09   ├─ /questions/bike-lane-capital-work.html (+1ms) 
13:22:09   ├─ /questions/holyrood-school-lane.html (+0ms) 
13:22:09   ├─ /questions/parking-enforcement.html (+0ms) 
13:22:09   ├─ /questions/property-taxes.html (+0ms) 
13:22:09   ├─ /questions/sidewalk-condition-and-replacement.html (+0ms) 
13:22:09   ├─ /questions/waste-system-cleanliness.html (+0ms) 
13:22:09   ├─ /questions/avenue-art-gallery-spending.html (+1ms) 
13:22:09   ├─ /questions/bike-advocacy-at-council.html (+1ms) 
13:22:09   ├─ /questions/city-hall-pay-and-interests.html (+0ms) 
13:22:09   ├─ /questions/downtown-business.html (+0ms) 
13:22:09   ├─ /questions/four-year-tax-plan.html (+0ms) 
13:22:09   ├─ /questions/other-cities.html (+0ms) 
13:22:09   ├─ /questions/property-tax-destinations.html (+0ms) 
13:22:09   ├─ /questions/taxes-and-collection-cut.html (+0ms) 
13:22:09   ├─ /questions/climate-targets.html (+4ms) 
13:22:09   ├─ /questions/earth-flat.html (+1ms) 
13:22:09   ├─ /questions/electric-buses.html (+7ms) 
13:22:09   ├─ /questions/fifteen-minute-districts.html (+5ms) 
13:22:09   ├─ /questions/infill-luxury.html (+1ms) 
13:22:09   ├─ /questions/infill-not-affordable-median-household.html (+1ms) 
13:22:09   ├─ /questions/infill-prices.html (+7ms) 
13:22:09   ├─ /questions/infill-teardown-more-affordable.html (+1ms) 
13:22:09   ├─ /questions/low-density-century.html (+1ms) 
13:22:09   ├─ /questions/oilers-held-back.html (+1ms) 
13:22:09   ├─ /questions/withheld-edmonton-rant-and-rave-2026-09-10-q1.html (+0ms) 
13:22:09   ├─ /questions.html (+5ms) 
13:22:09   ├─ /rss.xml (+3ms) 
13:22:09   ├─ /search.html (+2ms) 
13:22:09   ├─ /sitemap.xml (+8ms) 
13:22:09   ├─ /sources/yegscoop-2026-08-26.html (+2ms) 
13:22:09   ├─ /sources/edmonton-rant-and-rave-2026-09-10.html (+1ms) 
13:22:09   ├─ /support.html (+2ms) 
13:22:09   ├─ /topics/bike-lanes.html (+1ms) 
13:22:09   ├─ /topics/city-finances.html (+0ms) 
13:22:09   ├─ /topics/city-hall.html (+1ms) 
13:22:09   ├─ /topics/climate-environment.html (+0ms) 
13:22:09   ├─ /topics/downtown.html (+0ms) 
13:22:09   ├─ /topics/growth-planning.html (+0ms) 
13:22:09   ├─ /topics/housing-development.html (+0ms) 
13:22:09   ├─ /topics/transportation.html (+1ms) 
13:22:09   ├─ /topics.html (+3ms) 
13:22:09   ├─ /how-many-edmontonians-cycle.html (+0ms) 
13:22:09   ├─ /do-people-use-edmonton-bike-lanes.html (+1ms) 
13:22:09   ├─ /edmonton-cycling-numbers.html (+0ms) 
13:22:09   ├─ /1-3-million-cycling-trips.html (+0ms) 
13:22:09   ├─ /edmonton-bike-counter-numbers-fudged.html (+0ms) 
13:22:09   ├─ /empty-bike-lanes-edmonton.html (+0ms) 
13:22:09   ├─ /nobody-uses-the-bike-lanes.html (+0ms) 
13:22:09   ├─ /bike-lanes-no-one-uses-them.html (+0ms) 
13:22:09   ├─ /two-percent-of-edmontonians-ride-bikes.html (+0ms) 
13:22:09   ├─ /bike-lanes-for-one-percent.html (+0ms) 
13:22:09   ├─ /2-3-percent-of-the-population.html (+0ms) 
13:22:09   ├─ /one-percent-ride-year-round.html (+0ms) 
13:22:09   ├─ /fifteen-percent-rest-of-the-year.html (+0ms) 
13:22:09   ├─ /two-percent-of-trips-by-bicycle.html (+0ms) 
13:22:09   ├─ /edmonton-bike-mode-share.html (+0ms) 
13:22:09   ├─ /less-than-one-percent-commute-by-bike.html (+0ms) 
13:22:09   ├─ /census-bike-commuting-edmonton.html (+0ms) 
13:22:09   ├─ /87-percent-of-edmontonians-drive.html (+0ms) 
13:22:09   ├─ /edmonton-car-commuting-share.html (+0ms) 
13:22:09   ├─ /100-million-bike-lanes.html (+0ms) 
13:22:09   ├─ /bike-lane-budget.html (+0ms) 
13:22:09   ├─ /bike-lanes-vs-roads.html (+0ms) 
13:22:09   ├─ /bike-lanes-vs-snow-clearing.html (+0ms) 
13:22:09   ├─ /bike-lanes-double-snow-budget.html (+0ms) 
13:22:09   ├─ /100-million-bike-lanes-snow-clearing.html (+0ms) 
13:22:09   ├─ /roads-get-180-times-bike-lanes.html (+0ms) 
13:22:09   ├─ /1-8-billion-roads-100-million-bike-lanes.html (+0ms) 
13:22:09   ├─ /infill-affordable.html (+0ms) 
13:22:09   ├─ /million-dollar-infill.html (+0ms) 
13:22:09   ├─ /teardown-price-gap.html (+0ms) 
13:22:09   ├─ /is-infill-affordable.html (+0ms) 
13:22:09   ├─ /edmonton-climate-targets.html (+0ms) 
13:22:09   ├─ /edmonton-climate-leader.html (+0ms) 
13:22:09   ├─ /edmonton-missing-climate-targets.html (+0ms) 
13:22:09   ├─ /are-edmonton-climate-targets-fake.html (+0ms) 
13:22:09   ├─ /is-edmonton-a-climate-leader.html (+0ms) 
13:22:09   ├─ /edmonton-ebus-fiasco.html (+0ms) 
13:22:09   ├─ /proterra-buses.html (+0ms) 
13:22:09   ├─ /edmonton-ebus-disaster.html (+0ms) 
13:22:09   ├─ /ebuses-dont-work.html (+0ms) 
13:22:09   ├─ /82-million-ebus-loss.html (+0ms) 
13:22:09   ├─ /edmonton-lost-82-million.html (+0ms) 
13:22:09   ├─ /electric-buses-dont-work-in-winter.html (+0ms) 
13:22:09   ├─ /evs-cant-handle-cold.html (+0ms) 
13:22:09   ├─ /15-minute-cities.html (+0ms) 
13:22:09   ├─ /district-plans.html (+0ms) 
13:22:09   ├─ /15-minute-prisons.html (+0ms) 
13:22:09   ├─ /climate-lockdowns.html (+0ms) 
13:22:09   ├─ /edmonton-travel-restrictions.html (+0ms) 
13:22:09   ├─ /15-minute-city-lockdown.html (+2ms) 
13:22:09   ├─ /winter-bike-lanes.html (+0ms) 
13:22:09   ├─ /edmonton-winter-city.html (+0ms) 
13:22:09   ├─ /nobody-bikes-at-minus-30.html (+0ms) 
13:22:09   ├─ /too-cold-for-bike-lanes.html (+0ms) 
13:22:09   ├─ /winter-city-bike-lanes.html (+0ms) 
13:22:09   ├─ /index.html (+11ms) 
13:22:09 ✓ Completed in 566ms.

 generating optimized images 
13:22:09   ▶ /_astro/stew.Vl7PGMxz_1jUJII.webp (reused cache entry) (+0ms) (1/10)
13:22:09   ▶ /_astro/oops.BUupmKyE_ZDYMty.webp (reused cache entry) (+0ms) (2/10)
13:22:09   ▶ /_astro/stew.Vl7PGMxz_uC4OD.webp (reused cache entry) (+0ms) (3/10)
13:22:09   ▶ /_astro/oops.BUupmKyE_Z2o89RK.webp (reused cache entry) (+0ms) (4/10)
13:22:09   ▶ /_astro/stew.Vl7PGMxz_Z25ztKm.webp (reused cache entry) (+0ms) (5/10)
13:22:09   ▶ /_astro/oops.BUupmKyE_mjEh6.webp (reused cache entry) (+0ms) (6/10)
13:22:09   ▶ /_astro/stew.Vl7PGMxz_Z4uJhh.webp (reused cache entry) (+0ms) (7/10)
13:22:09   ▶ /_astro/oops.BUupmKyE_1zlnuO.webp (reused cache entry) (+0ms) (8/10)
13:22:09   ▶ /_astro/stew.Vl7PGMxz_g5fYz.webp (reused cache entry) (+0ms) (9/10)
13:22:09   ▶ /_astro/stew.Vl7PGMxz_Z3hcV.webp (reused cache entry) (+0ms) (10/10)
13:22:09 ✓ Completed in 2ms.

13:22:09 [build] ✓ Completed in 898ms.
13:22:09 [build] 507 page(s) built in 1.37s
13:22:09 [build] Complete!

Running Pagefind v1.5.2 (Extended)
Running from: "<repo>"
Source:       "dist"
Output:       "dist/pagefind"

[Walking source directory]
Found 507 files matching **/*.{html}

[Parsing files]
Found a data-pagefind-body element on the site.
↳ Ignoring pages without this tag.

[Reading languages]
Discovered 1 language: en

[Building search indexes]
Total: 
  Indexed 1 language
  Indexed 443 pages
  Indexed 7613 words
  Indexed 2 filters
  Indexed 0 sorts

┌─────────────────────────────────────────────────────────────────────────┐
│  Pagefind found references to the Default UI (pagefind-ui.js)           │
│  on your site. The Default UI is supported and will continue            │
│  to work.                                                               │
│                                                                         │
│  As of 1.5.0, if you are setting up a new integration, use the          │
│  Component UI instead. It includes a search modal, better               │
│  accessibility and customization: https://pagefind.app/docs/search-ui/  │
└─────────────────────────────────────────────────────────────────────────┘

Finished in 0.461 seconds

codex
Validation, all 493 passing tests, and the build completed. A direct reproduction confirms the capture regression: the check passes when the same home-path note appears in both a `tool_result` and a text block in one request. I also found a manifest-classification edge case and a home-page claim that will be wrong for the first two-vendor finding.
exec
/bin/zsh -lc "nl -ba scripts/panel/run-reviewer.sh | sed -n '211,226p;315,341p'; nl -ba src/lib/glossary.ts | sed -n '181,209p'; nl -ba src/pages/index.astro | sed -n '54,65p;359,369p'" in <repo>
 succeeded in 0ms:
   211	[ -f "$PROMPT_FILE" ] || { echo "prompt not found: $PROMPT_FILE" >&2; exit 1; }
   212	
   213	# ---------------------------------------------------------------------------
   214	# Scratch directory: where the package is assembled and the extracted review is
   215	# staged. It is no longer the isolation boundary and no longer holds the only
   216	# copy of anything — invoke-reviewer.sh archives each attempt's package, raw
   217	# stream and final message before this is deleted — so removing it on the way
   218	# out costs nothing. KEEP_SCRATCH=1 keeps it for debugging the assembler.
   219	# ---------------------------------------------------------------------------
   220	SCRATCH="$(mktemp -d "${TMPDIR:-/tmp}/yegfacts-$SLOT-r$ROUND-XXXXXX")"
   221	cleanup() { [ "${KEEP_SCRATCH:-0}" = "1" ] || rm -rf "$SCRATCH"; }
   222	trap cleanup EXIT
   223	
   224	cp "$BRIEF" "$SCRATCH/brief.md"
   225	cp "$PROMPT_FILE" "$SCRATCH/$(basename "$PROMPT_FILE")"
   226	cp "$SCHEMA" "$SCRATCH/review-schema.json"
   315	  echo
   316	  echo "Return ONLY the JSON document. Set \`round\` to $ROUND."
   317	  if [ -n "$CLAIMS" ]; then
   318	    echo "Answer only these claims, and no others: $CLAIMS"
   319	  fi
   320	} > "$PACKAGE"
   321	
   322	PROMPT_SHA="$(shasum -a 256 "$PACKAGE" | cut -d' ' -f1)"
   323	INVOKE="$REPO_ROOT/scripts/panel/invoke-reviewer.sh"
   324	COMMAND_STRING="scripts/panel/invoke-reviewer.sh --provider $PROVIDER_CANONICAL --model $MODEL_ID --effort $EFFORT --package package.md"
   325	
   326	# Each attempt lands in its own directory under the private archive, keyed by a
   327	# fresh timestamp, so a re-run of a round never lands on top of the last one.
   328	ARCHIVE_ROOT="$("$INVOKE" --archive-root)"
   329	RUN_STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
   330	ATTEMPT_BASE="$ARCHIVE_ROOT/$STORY/$RUN_DATE/${INTO:-round$ROUND}/$SLOT/$RUN_STAMP"
   331	
   332	# Methodology v1.37: the seat's CLI is checked for a version and a reported
   333	# login before a package is assembled, so a dead seat is found here rather
   334	# than after a run has been filed. The launcher's canary is the quota probe.
   335	if [ "$DRY_RUN" != "1" ] && [ "$CLI" != "agy" ]; then
   336	  "$REPO_ROOT/scripts/panel/preflight.sh" "$CLI" >&2 \
   337	    || { echo "[$SLOT round $ROUND] preflight failed for $CLI; nothing was assembled or sent" >&2; exit 2; }
   338	fi
   339	
   340	if [ "$DRY_RUN" = "1" ]; then
   341	  echo "DRY RUN — no CLI executed, nothing written under reviews/"
   181	    const file = path.join(process.cwd(), claim.data.review_run, 'run.yaml');
   182	    if (!existsSync(file)) throw new Error('run.yaml is missing');
   183	    // Only the seats that answered. A refused or failed attempt keeps its
   184	    // manifest row (that is the retention rule) and is not a seat on the panel.
   185	    // Manifests written before methodology v1.28 carry no status field; every
   186	    // row in them is an answered seat.
   187	    const seats = loadRunManifest(file).runs
   188	      .filter((run) => run.round === 1 && (run.status === undefined || run.status === 'ok'))
   189	      .map((run) => ({ provider: run.provider.toLowerCase(), name: run.seat ?? run.model_id }));
   190	    if (seats.length !== 3 || seats.some((seat) => !seat.name)) {
   191	      throw new Error('round-one seats are incomplete');
   192	    }
   193	    const providers = new Set(seats.map((seat) => seat.provider));
   194	    if (providers.size === 3) return historical;
   195	    if (
   196	      providers.size === 2 &&
   197	      seats.filter((seat) => seat.provider === 'anthropic').length === 1 &&
   198	      seats.filter((seat) => seat.provider === 'openai').length === 2
   199	    ) {
   200	      return {
   201	        term: 'three-seat AI panel, two vendors',
   202	        label: 'three-seat AI panel, two vendors (Claude; GPT × 2)',
   203	      };
   204	    }
   205	    throw new Error('round-one providers do not match a published panel');
   206	  } catch (error) {
   207	    // Never the historical label by default: a manifest this page cannot read
   208	    // is not evidence of three vendors. The page says the seats are in the
   209	    // run record, and the build says which claim, once.
    54	let reviewerCount: number | undefined;
    55	const newest = rows[0];
    56	if (newest) {
    57	  const manifestPath = path.join(process.cwd(), newest.claim.data.review_run, 'run.yaml');
    58	  if (existsSync(manifestPath)) {
    59	    const manifest = loadRunManifest(manifestPath);
    60	    const providers = new Set(
    61	      manifest.runs.filter((seat) => seat.round === 1).map((seat) => seat.provider),
    62	    );
    63	    reviewerCount = providers.size > 0 ? providers.size : undefined;
    64	  }
    65	}
   359	      <ol class="steps">
   360	        <li>
   361	          <h3 class="font-sans text-base leading-[1.3] font-bold">Blind research</h3>
   362	          <p class="mt-2 text-base text-ink">
   363	            {
   364	              reviewerCount
   365	                ? `${reviewerCount} AI reviewers, each from a different company, research every claim without seeing each other's work.`
   366	                : "AI reviewers from different companies research every claim without seeing each other's work."
   367	            }{' '}
   368	            <a href="/methodology#stages" class="link">How the rounds run</a>.
   369	          </p>

exec
/bin/zsh -lc 'git status --short && git diff --check origin/main && git diff --name-only origin/main' in <repo>
 succeeded in 0ms:
README.md
docs/DESIGN.md
methodology/changelog.yaml
scripts/panel/attempt-record.ts
scripts/panel/audit-package.sh
scripts/panel/capture-check.ts
scripts/panel/invoke-reviewer.sh
scripts/panel/preflight.sh
scripts/panel/run-reviewer.sh
scripts/panel/stream-boundary.ts
src/components/AiReview.astro
src/components/ClaimFinding.astro
src/lib/glossary.ts
src/pages/about.astro
src/pages/methodology/index.astro
src/pages/questions/[id].astro
src/pages/sources/[id].astro
src/pages/support.astro
tests/capture-check.test.ts
tests/invoke-reviewer.test.ts
tests/stream-boundary.test.ts
tests/three-seats.test.ts

codex
## Round-two findings

The six prior fixes are **not all closed**. The Google launcher guard, proof wording, and `DESIGN.md`/methodology-page corrections are fixed. Three issues remain:

- **Capture exception — still bypassable.** [capture-check.ts](scripts/panel/capture-check.ts:450) identifies permitted values by string equality. If an identical home-path note appears in a `tool_result` and a text block, it cuts both. I reproduced a passing result with that request, although v1.38 says the text-block occurrence must refuse.
- **Panel label — still misclassifies inconsistent manifests.** [glossary.ts](src/lib/glossary.ts:193) labels *any* three distinct providers as Claude/GPT/Gemini. It needs to verify those exact providers; an unknown third provider should get the neutral label.
- **Preflight — only partly wired.** [run-reviewer.sh](scripts/panel/run-reviewer.sh:320) assembles the package before calling preflight at line 335, contrary to the new changelog claim, and skips `agy` even for an allowed frozen-run completion. The canary does serve as the recorded quota probe.

**Newly uncovered public-copy gap:** [the home page](src/pages/index.astro:60) counts vendors as reviewers. When the newest finding uses the new panel, it will say “2 AI reviewers, each from a different company” although three seats reviewed it.

`npm run validate`, all 493 runnable tests, and `npm run build` passed. The working tree remains clean. These checks do not cover the reproduced capture bypass.

VERDICT: REVISE


tokens used
180,988
## Round-two findings

The six prior fixes are **not all closed**. The Google launcher guard, proof wording, and `DESIGN.md`/methodology-page corrections are fixed. Three issues remain:

- **Capture exception — still bypassable.** [capture-check.ts](scripts/panel/capture-check.ts:450) identifies permitted values by string equality. If an identical home-path note appears in a `tool_result` and a text block, it cuts both. I reproduced a passing result with that request, although v1.38 says the text-block occurrence must refuse.
- **Panel label — still misclassifies inconsistent manifests.** [glossary.ts](src/lib/glossary.ts:193) labels *any* three distinct providers as Claude/GPT/Gemini. It needs to verify those exact providers; an unknown third provider should get the neutral label.
- **Preflight — only partly wired.** [run-reviewer.sh](scripts/panel/run-reviewer.sh:320) assembles the package before calling preflight at line 335, contrary to the new changelog claim, and skips `agy` even for an allowed frozen-run completion. The canary does serve as the recorded quota probe.

**Newly uncovered public-copy gap:** [the home page](src/pages/index.astro:60) counts vendors as reviewers. When the newest finding uses the new panel, it will say “2 AI reviewers, each from a different company” although three seats reviewed it.

`npm run validate`, all 493 runnable tests, and `npm run build` passed. The working tree remains clean. These checks do not cover the reproduced capture bypass.

VERDICT: REVISE


