# Run record: `lanes-and-congestion`, run 2026-09-16

Stage: **PARKED at framing**, 2026-09-16, on framing check 3 REVISE under
the three-report cap (methodology v1.12; defect handling v1.20). NOT
frozen; no panel may run. Under the rule as written it reopens only on
new intake evidence, never on a further revision of this brief. The
editor's assessment of what the third report found, and what it would
take, is at the end of this file, because the cap parked this brief on a
finding the editor agrees with and would have adopted.

This file records what happened to the brief between drafting and the
park: every framing-check report, what the editor adopted and what the
editor rejected. There was no freeze, so there is no hash.

## Stage 1, framing

**Drafted** 2026-09-16 by Stew (Claude Fable 5.1) from the register
entries for `lanes-and-congestion` and the captured source
`yegscoop-2026-08-26`. The intake record is `intake.md` in this
directory. Six claims were registered under the question; five went into
the draft, and one, `roads-carry-goods-and-services`, stayed out on the
triage NO it already carried.

**Checked by** `prompts/framing-check.md`, every report run through
`scripts/panel/audit-package.sh --provider openai` under methodology
v1.31, which pins the model and effort inside the launcher and records
the outgoing request; the attempt directories are named below. This is
the first brief whose framing checks ran entirely through the shared
launcher rather than an ad hoc command. Each package was the framing
prompt, `intake.md`, the brief, the verdict vocabulary from
`docs/DESIGN.md` section 3 and `prompts/review-schema.json`; re-checks
added `register-note.md`, every previous report and every author
response. No package carried a local path. Reports are committed
unedited as `framing/check-N.md`; the editor's answers are
`framing/response-N.md`.

**Check 1** (attempt `84f1024447e77441`): REVISE. Two defects, corrected
in the checker's wording (claim 3's C=0 coverage gap; claim 5's treatment
of missing evidence, moot on removal). Nine framing findings, all
adopted: claim 4 narrowed to the traffic-calming reason the holder gave;
claim 5 (`79-street-relieves-75-street`) removed and carried to the 79
Street question (`register-note.md`); claim 3's "all throughout the city"
raised to 8 of 15 district-plan areas with 5 as the alternative; claim 1
given a coverage rule; congestion given alternative measures; claim 2's S
and D tightened to attributable substitution and attributed delay
reduction; district boundaries, the Complete Streets figure and the
AAWDT/ADT distinction corrected; an idling-absence prediction removed;
stakes rewritten for every verdict on both sides. Response:
`framing/response-1.md`.

**Check 2** (attempt `dade890214bac256`): REVISE. Two defects, corrected
in the checker's wording (claim 1's coverage denominator, now Q equal to
claim 3's C; the one-third/one-half coverage gap). Eleven framing
findings, all adopted: claim 1 made explicitly causal with an
attribution-capable design required for U; claim 2 required at citywide
scale; claim 4 required to establish both halves of what the holder said
(O, K, J); the corridor defined on the City's on-street bike-route GIS
layer; D10 and D5 defined; every minimum of three reported again at five;
peak period and windows given alternatives; "contemporaneous" and
traffic-calming terms defined; the household survey renamed Navigating
Tomorrow; the perceptibility sentence removed; a leak about 102 Avenue's
LRT conversion removed; a proxy-evidence sentence added to the reviewer
instructions; stakes and "Who asks this" revised. Five check 1 findings
had been marked WEAKENED and were re-answered. Response:
`framing/response-2.md`.

**Check 3** (attempt `8d4b4dafb150ad13`): REVISE, the third and final
report under the cap. Two defects, each with exact replacement wording:
claim 1's M admitted non-attribution-capable measurements, so three
uncontrolled before-and-after figures could produce Contradicted; claim
4's denominator excluded undocumented corridors, so a small documented
subset could produce Supported. Six framing findings: claim 2's "has been
shown" made the proposition about the literature rather than the effect,
and omitted the 10 per cent magnitude its ladder applies; claim 4's
majority cutoff lacked a two-thirds alternative; the GIS snapshot was
asserted but not identified with a URL, time and checksum; claim 4's
"contemporaneous" boundary lacked an alternative at the start of
installation; and, the finding that decides the outcome, the brief
identified no published source plausibly capable of supplying the
decisive instrument for claims 1, 2 or 4 at the causal level, so those
ladders predetermine Not established; the checker's replacement is to
identify one by title, date and URL before freeze or remove each such
claim as uncheckable. Claim 3 was found checkable from the project
record, designs and route inventory. Provenance, leakage and scope were
OK.

**Park.** Under v1.12 the brief parks. The editor made no fourth
revision and ran no fourth check.

## What the editor would have adopted, recorded so it is not lost

Every one of check 3's findings, in the checker's wording. In
particular the editor agrees with the decisive one. The City's published
evaluations of its lane conversions are counts and monitoring, not
attribution-capable travel-time studies; no Edmonton study estimates
infrastructure-attributable substitution linked to a citywide delay
figure; and the Hermitage Road decision report documents the design and
the calming program without the counterfactual the holder's claim needs.
On that record the honest shape of this question is:

- `city-removed-traffic-lanes` (claim 3): checkable, and the one claim
  in this question whose ladder the checker passed without a framing
  finding at report 3.
- `lane-removal-increases-congestion` (claim 1),
  `bike-infra-reduces-congestion` (claim 2) and
  `lanes-removed-for-traffic-calming` (claim 4): parked on the register
  with a public reason in the shape `cycling-volumes` used for its
  parked claim, that the published Edmonton record identified at intake
  cannot answer them at the level people assert them, each with the
  instrument that would reopen it: an attribution-capable before-and-
  after travel-time evaluation of a converted Edmonton corridor; an
  Edmonton study of infrastructure-attributable mode substitution linked
  to a citywide delay estimate; a contemporaneous City record addressing
  the without-the-bike-lane counterfactual and the combined-project or
  savings account.

That is what the third report asked for. The cap does not let this brief
do it, and the same rule parked `infrastructure-deficit` and
`who-pays-for-roads` on 2026-09-03. Whether the rule should have a step
for exactly this case, a third report whose standing finding is that the
record cannot carry a claim, is the board's question OQ-27, and the
founder's call.

## What reopens this brief

Under the rule as written: new intake evidence, that is, a captured
source that adds claims to this question. Under the change OQ-27
proposes: a fourth report confined to confirming the parks above and the
remaining ladder for claim 3, in the shape of the v1.20 defect
confirmation, after which claim 3 freezes and runs.

## 2026-09-23: revised under methodology v1.35, sent for a park confirmation

The founder decided OQ-27 on 2026-09-23 (D-0040 on the board, methodology
v1.35, yegfacts PR #77): after a third REVISE whose standing findings say
the record cannot carry a claim, the editor may apply the report
unchanged, park those claims and send the brief once for a park
confirmation. This brief is the first case.

What the editor did, all in `framing/response-3.md` finding by finding:
applied every standing finding of check 3; removed claims 1, 2 and 4 as
uncheckable at the asserted level and parked them on the register
(`triage: park`, `ground: no-instrument`, `parked_at: framing`) with the
checker's three reopening instruments as their reasons; supplied the
immutable inventory export check 3 asked for
(`snapshot/bike-routes-on-street.geojson`, 3,175 features, SHA-256 in
`snapshot/sha256.txt`, captured 2026-09-23T15:17:38Z) and moved the as-of
date to the capture date; kept claim 3 unchanged in its thresholds, unit
and definitions; and removed the text that served only the removed
claims. Nothing was disputed and no source was added. The three parks
cut both ways: claim 1 is the anti-lane side's, claims 2 and 4 the
pro-lane side's.

The confirmation goes to the same seat as check 3, the OpenAI seat
through `scripts/panel/audit-package.sh --provider openai`, with the
whole difference between the check-3 brief and this one in the package.
PARKS CONFIRMED freezes the brief with claim 3; PARKS REJECTED parks it
under the cap, reopening only on new intake evidence. Its result is
recorded below when it lands.

## 2026-09-23, later: PARKS CONFIRMED, brief frozen

The park confirmation ran on the OpenAI seat (gpt-5.6-sol, the seat that
wrote check 3) through the shared launcher at 15:51Z, attempt
`2e6dff95dc39e17b`, profile codex-captured-read-only-0.156.1, after
yegfacts PR #80 moved the capture proxy to HTTPS on loopback for
codex-cli 0.156.1. The first launch at 15:26Z (attempt under
`audits/park-confirmation-lanes-and-congestion/openai/20260923T152624Z`)
failed at the canary on that CLI change and sent nothing.

`framing/check-4.md`: **PARKS CONFIRMED.** All three parks confirmed as
what report 3 asked for, with the reopening instruments matching. The
difference trace found every substantive edit traces to report 3,
including the as-of date moving to the snapshot's capture date. Checks 8
and 9 OK on the remaining claim; the report notes that neither side is
invited to treat the antecedent fact as resolving the parked dispute.

**The freeze is the sha256 of `brief.md`, and it is
`ddaa04ae53a85b81e63c126a69de275943585f23e0b6a221e87088c134f0aff9`**, taken after the status
block above was written. Register: `lanes-and-congestion` moves to
`lifecycle: briefed`; the three parked claims already carry their state.
Next: round 1 on `city-removed-traffic-lanes`, three seats, under
whichever seat pins main carries when it runs (D-0041 moves them); the
story leads with the three parks.

## 2026-09-23: round 1 on the frozen brief, under the rule in force at the freeze

The brief froze on 2026-09-23 (sha256 ddaa04ae…) under the three-provider rule,
before methodology v1.37 retired the Google seat the same evening. v1.37's
effective-date rule applies: this run finishes under the rule it froze under.
Every seat received the identical package (brief.md, reviewer.md,
review-schema.json, 32,223 bytes) through scripts/panel/run-reviewer.sh and the
v1.31 launcher; each seat's manifest row is in run.yaml.

| Seat | Attempt | Outcome |
|---|---|---|
| GPT-6 Sol, high (counted) | 16:19Z to 16:30Z | admitted, one attempt, 119 requests captured and searched: Not established, moderate; 6 supporting, 4 challenging items. round1/gpt.json |
| Gemini 3.8 Flash, high (counted) | ae6e378fd252efcb, 16:57Z to 17:05Z | admitted record-only, one attempt, after PR #83 let a fetch 404 count as a result: Partially supported, high; 4 supporting, 3 challenging; counts through-lane removals in 4 of 15 district-plan areas, under both thresholds. round1/gemini.json. The week's last Gemini run before the quota closed. |
| GPT-6 Luna, high (shadow, not counted, methodology v1.34) | 16:19Z to 16:25Z | admitted, one attempt, 29 requests: Not established, moderate; 2 and 2. shadow-round1/gpt-luna.json, never merged. The shadow experiment ended after this one run when v1.37 made Luna a counted seat for later runs; the board pass declined to count this answer for this run, since promoting an uncounted answer after its verdict is known would make seat selection outcome-dependent. |
| Claude Opus 5.5, high (counted) | 8b92f1e800aa48f7, 16:19Z | refused at the canary: the structural check read two plugins Claude Code 2.1.280 ships as builtin (agents-md, telemetry) as loaded customizations; the capture check passed. Package never sent. Rule adapted in PR #82 (builtin plugins recorded, not refused). |
| Claude Opus 5.5, high (counted) | d2658c44f0afbcad, 19:41Z to 19:50Z, Claude Code 2.1.281 | admitted, one attempt, after methodology v1.37 and v1.38 merged (PRs #85, #86) and the branch was rebased onto them: 48 requests captured, 47 searched, none carrying any protected string; operator_path_notes 0, so the v1.38 exception was not used and the positional refinement of PR #86 changes nothing about this attempt. Partially supported, moderate; 7 supporting, 6 challenging; through-lane removals confirmed on 102 Avenue and 132 Avenue, in 2 to 3 of 15 districts. round1/claude.json |
| Claude Opus 5.5, high (counted) | 09c6859382ba86e9, 16:25Z to about 16:40Z | canary passed; research ran (42 requests); refused by the capture check: fourteen requests carried the operator's home-directory path inside the CLI's own note after it saved a fetched 2.6 MB City PDF to disk. Not an instruction file. The fetch handed the reviewer the PDF's raw bytes, so the document was saved and not read (the web-only profile's disclosed limit). Its answer (Not established) is not a finding of this site. Stays refused and retained; methodology v1.38 permits that one note prospectively and counts it. The seat reruns under v1.38. |

Round 1 is complete: Claude Partially supported (moderate), Sol Not
established (moderate), Gemini Partially supported (high), all on the same
frozen package. Claude and Gemini each count removals in a few districts and
call that Partially supported; Sol reads the same shortfall against the
brief's threshold as Not established. The difference goes to the
cross-review round as designed and is named on the finding if it survives
synthesis. Under the v1.37 vendor-split rule the Anthropic seat does not
differ from both OpenAI seats here (the Luna answer is shadow, not counted),
so no vendor split is recorded for this round. Round 2 needs the Google seat again and waits for its allowance to
reset, about 2026-09-30, unless the founder closes this attempt as incomplete
and starts a clean run under v1.37. No panel is assembled from the answers on
hand.

## 2026-09-24: the 2026-09-23 attempt is closed incomplete; round 1 restarts clean under v1.37

The founder closed the attempt rather than wait a week for the Google seat
to finish it: "close the attempt and restart clean under v1.37, we can't
wait for gemini reset ... we should drop gemini altogether from all work."
v1.37 names this outcome as the alternative to waiting. The attempt's files
move unchanged under `closed-2026-09-23/`: its three counted answers (Claude
Partially supported, GPT-6 Sol Not established, Gemini Partially supported),
the Luna shadow answer, its manifest, merge and fetch report. None of them is
an input to the restarted run, and no answer is carried across: the roster
changed, so every seat answers again from the same frozen package.

The restarted roster, fixed before any seat ran: Claude Opus 5.5, GPT-6 Sol
and GPT-6 Luna, all at high, three seats from two vendors under v1.37. The
brief is unchanged (sha256 ddaa04ae…); the package is assembled from it by
the runner exactly as before. The prior attempt's answers were seen by the
editor; the seats never see each other's, and the editor chooses nothing
about them, so the restart changes the roster and nothing else.

### Round 1 of the restarted run

| Seat | Outcome |
|---|---|
| Claude Opus 5.5, high | admitted, one attempt: Partially supported, moderate; 6 supporting, 4 challenging |
| GPT-6 Sol, high | admitted, one attempt: Not established, moderate; 5 and 4 |
| GPT-6 Luna, high | admitted, one attempt: Not established, low; 2 and 2 |

The Anthropic seat differs from both OpenAI seats. Under v1.37 that is a
vendor split: the published finding names it beside the seat agreement and
the drafting addresses it from the sources, never as a plain two-to-one
majority. Each seat's manifest row is in run.yaml. Merge and evidence
staging are done; see fetch-report.md. Round 2 (cross-review) follows on
the same three seats.

### Round 2 raised a framing concern; the brief is revised and round 1 reruns

Round 2 on the restarted run completed on all three seats (Claude Partially
supported, GPT-6 Sol Partially supported, GPT-6 Luna Not established), and
`scripts/synthesize.ts` halted: every seat flagged `MATERIAL FRAMING
CONCERN`. Under methodology v1.2 that halts synthesis, revises the brief and
reruns round 1. It is the panel's check on a frozen brief, not the framing
checker's, so the v1.12 cap and v1.35's confirmation do not govern it.

**The two defects the seats named, both real.**

1. The threshold table had no row for the case every seat met: at least one
   qualifying corridor verified (C at least 1) with the census of built
   corridors incomplete, so A known only as a minimum. Partially supported
   required "A is less than 8", which only a complete census could prove,
   and Not established was reserved for C of zero. Seats split on which row
   to force. The fix makes the table say what the brief's stakes text
   already said before any seat ran: "Partially supported means specific
   removals are established but 'all throughout' is not." A is now counted
   from verified corridors and reported as a minimum when the census is
   incomplete; Supported at a verified A of 8 or more (a minimum can only
   rise); Partially supported at C of at least 1 and A below 8, complete or
   minimum, with the answer naming the part not established. No threshold,
   definition, date or source changed.
2. The brief said the package carried the dated snapshot. It never did: the
   package is the brief, the reviewer prompt and the schema, and a
   3,175-feature file cannot travel in it or be parsed through a web tool.
   The brief now gives the snapshot's public URL and checksum, lets
   reviewers count from it or from the live layer (saying which, and the
   feature count they saw), and makes the story's calculation script
   recompute every published count against the snapshot.

**The freeze.** The brief's sha256 was `ddaa04ae53a85b81e63c126a69de275943585f23e0b6a221e87088c134f0aff9` and is now `f058e5177cac3aae109311164d1ba3161e504aa6070b408a160e2599275b84ce`.
The halted round's files (round 1, round 2, the manifest, the merge and the
fetch report) move unchanged to `superseded-2026-09-24/`; its answers are to
the old hash. Round 1 reruns on all three seats against the new one, blind,
because answers to two packages cannot share a round.

### The rerun on the re-frozen brief

| Seat | Outcome |
|---|---|
| Claude Opus 5.5, high | admitted, one attempt: Partially supported, low |
| GPT-6 Sol, high | admitted, one attempt: Partially supported, moderate |
| GPT-6 Luna, high | admitted, one attempt: Partially supported, moderate |

No seat raised a framing concern. The three agree on the verdict, so no
vendor split arises. Merge: 18 distinct sources; evidence staging
archived 13, 3 not (fetch-report.md). Round 2 follows.

### Round 2 flagged a second framing concern; the table moves to the cautious reading

The rerun's round 2 completed (all three seats held Partially supported) and
synthesis halted again: GPT-6 Sol flagged `MATERIAL FRAMING CONCERN`. The
revised table gave Partially supported to a verified minimum below 8, "even
if unreviewed corridors could raise A to Supported", so the verdict would
read as "fewer than 8 districts" when the record shows only "at least 2 or 3".

The editor's ruling: the concern is right, for two reasons the site already
holds. Since methodology v1.4 a Partially supported finding must name the
part of the claim that does not hold, and "fewer than 8 areas" is not shown
to fail on an incomplete census; it is not established. And the matrix's
cautious lean (D-0011 in the board record, published on the methodology
page) prefers the reading that does not imply more than the record shows.
The table now gives Partially supported only on a complete census with A
below 8; an incomplete census with a verified A below 8 is Not established,
with the verified corridors, their districts and the verified A reported as
the part that is established; Supported stays at a verified A of 8 or more.
The stakes text is changed to match. No threshold, definition, date, unit or
source changed.

This is the second revision after answers were seen, and it moves against
the answer on the table: all three seats had just returned Partially
supported under the previous wording, and the revision makes that verdict
harder to reach, not easier. The brief's sha256 was `f058e5177cac3aae109311164d1ba3161e504aa6070b408a160e2599275b84ce` and is now
`785b7ae3ee64a0bc0d67b617b6ade3048e729a0ded30f99e8e93a803cb893e39`. The halted round's files move unchanged to
`superseded-2026-09-24b/`. Round 1 reruns on all three seats.

### Round 1 on the second freeze

All three seats admitted, one attempt each: Claude Opus 5.5, GPT-6 Sol and
GPT-6 Luna, all Not established (moderate). No framing concern, no vendor
split. Merge: 21 distinct sources; staging archived 19, 2 not
(fetch-report.md). Round 2 follows.
