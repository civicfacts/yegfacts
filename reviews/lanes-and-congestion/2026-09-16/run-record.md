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
