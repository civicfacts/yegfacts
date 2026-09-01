# Source verification — climate-targets

Gate stage 7, AI-automatable portion. Run date 2026-09-01 (story run `2026-09-01`).

**Method.** Every `key_fact` in `src/content/claims/climate-on-track.yaml`, plus
the five TL;DR bullets, the `one_line` and the `short_answer` in
`src/content/stories/climate-targets.mdx`, was checked against the archived bytes
of its cited evidence only. No web access was used. Registry entries under
`evidence/registry/YF-EV-*.yaml` gave the `archive.path`; HTML archives were
stripped to text, PDFs were extracted with `pypdf` (`pdftotext`, `mutool` and
`qpdf` are not installed). All four PDFs extracted cleanly — 7, 6, 26 and 153
pages — so nothing here rests on an unreadable archive.

**Integrity check.** All six archives match the `archive.sha256` recorded in the
registry. The bytes audited are the bytes the registry claims.

| ID | Archive | Pages / size | sha256 |
|---|---|---|---|
| YF-EV-0020 | Fall 2025 Carbon Budget Update (FCS03160) | 7 pp | match |
| YF-EV-0021 | 2023-2026 Carbon Budget (FCS01478) | 6 pp | match |
| YF-EV-0022 | 2026 Budget Highlights | 26 pp | match |
| YF-EV-0024 | Annual Report 2025 | 153 pp | match |
| YF-EV-0032 | Engaged Edmonton climate FAQ | HTML | match |
| YF-EV-0033 | CBC, Nov 12 2024 | HTML | match |

**Grading.** VERIFIED = the archive supports the statement as written.
PARTIAL = the archive supports the substance but at least one asserted detail is
not in *that* archive. UNSUPPORTED = the archive does not contain it.

This is the cleanest of the three stories audited today. Every number in the
published text lands on a City sentence, and the attribution discipline — "the
City's own reporting says", "the report's own words" — holds throughout. One
PARTIAL, and it is a labelling gap rather than a number problem.

---

## Claim: `climate-on-track`

### KF-1 — cited YF-EV-0021 — **VERIFIED**

> "The targets: a 35 per cent cut by 2025 and 50 per cent by 2030, both from 2005
> levels, and 'becoming an emissions neutral community by 2050' — set in the
> Community Energy Transition Strategy and recorded in the City's November 14,
> 2022 report FCS01478, 2023-2026 Carbon Budget."

Archive p.4, verbatim:

> "As outlined in the Community Energy Transition Strategy, the City of
> Edmonton's community emission reduction targets are 35 per cent by 2025, 50 per
> cent by 2030 (both from 2005 baseline levels) and becoming an emissions neutral
> community by 2050."

The report header confirms the routing line: "November 14, 2022 – Financial and
Corporate Services FCS01478." Every element checks.

### KF-2 — cited YF-EV-0020, YF-EV-0022 — **VERIFIED**

> "The latest published community inventory covers 2024. The Fall 2025 Carbon
> Budget Update (report FCS03160, November 24, 2025) puts 2024 community
> emissions at 15.2 million tCO2e — a three per cent increase from 2023 —
> against a 2024 trajectory value of '12.2 million tCO2e or less', and states
> that 'this 2024 target was not met'."

YF-EV-0020 p.3, verbatim:

> "Edmonton's community emissions were targeted to be 12.2 million tCO2e or less
> in 2024; however, this 2024 target was not met."

and p.2: "In 2024, Edmonton's community emissions were 15.2 million tCO2e (a
three per cent increase from 2023)." Header: "November 24, 2025 – Financial and
Corporate Services FCS03160." YF-EV-0022 p.15 carries the identical sentence.

"The latest published community inventory covers 2024" is a negative claim, and
it is well supported inside the archive set: YF-EV-0024 (Annual Report 2025,
`published_on: 2026-04-15`) and YF-EV-0022 (supplemental schedules updated April
2026) both still report 2024 as the most recent inventory.

### KF-3 — cited YF-EV-0020 — **VERIFIED**

> "FCS03160 states that reaching the 2025 target means cutting to 10.8 million
> tCO2e, '35 per cent below 2005 emissions or 29 per cent below 2024 emissions',
> and that 'The trend for this year indicates this target will not be met and
> there are no current initiatives or actions that will allow the necessary
> reductions to meet the target.'"

Archive p.3, verbatim on both quoted fragments:

> "…emissions need to be reduced to 10.8 million tCO2e (or less) in 2025, equal
> to 35 per cent below 2005 emissions or 29 per cent below 2024 emissions. The
> trend for this year indicates this target will not be met and there are no
> current initiatives or actions that will allow the necessary reductions to meet
> the target."

One detail worth knowing, which does not affect the grade: the same sentence
appears twice in the document, and the executive-summary version on p.2 reads
"The trend for **2025** indicates…" where the report body on p.3 reads "The trend
for **this year** indicates…". The claim quotes the p.3 wording, which is correct
as written.

### KF-4 — cited YF-EV-0022 — **VERIFIED**

> "The City repeated the assessment in a 2026 publication. The 2026 Budget
> Highlights, in its Carbon Budget section, says: 'Edmonton's 2024 Community GHG
> Inventory shows that GHG emissions are not decreasing over time and are not on
> track to meet the 2025, 2030 and 2050 emissions targets.'"

Archive p.15, section headed "Carbon Budget" → "Community Carbon Budget",
verbatim. The quotation is exact.

*Precision note.* "A 2026 publication" is right but rests on internal evidence
rather than a stated publication date: the document carries no date line, the
registry has no `published_on`, and "2026" in the title is the budget year. What
does establish it is the content — the table of contents lists "Supplemental
Schedules - Updated April 2026", p.3 describes the December 2025 Council
deliberation, and it reports the 2024 inventory published in November 2025. The
document is therefore a 2026 artifact and postdates FCS03160, which is what the
key_fact needs. Worth adding `published_on` to the registry entry.

*Registry/record note.* The round-2 reviewer notes in
`reviews/climate-targets/2026-09-01/round2/claude.json` call this document the
"Spring 2026 Budget Highlights" and record that the reviewer could not extract
its text. The registry and the published claim both name it correctly as the 2026
Budget Highlights, and this audit read the bytes directly, so the published text
is sound — but the run record carries a mislabel.

### KF-5 — cited YF-EV-0024, YF-EV-0020 — **PARTIAL**

> "Measured progress is real but far behind the trajectory. Against a
> recalculated 2005 baseline of 16.7 million tonnes, the 2024 inventory shows
> community emissions nine per cent lower and per-capita emissions 46 per cent
> lower, at 12.8 tonnes per person — against a 35 per cent absolute cut due in
> 2025."

Everything numeric is verified. YF-EV-0024 p.140:

> "Progress is measured against a 2005 baseline year of 16.7 million tonnes and
> 419,000 tonnes of carbon dioxide equivalent (tCO2e) for the community and
> corporation respectively."

and p.141: "Community emissions have decreased by 9 per cent since the 2005
baseline. Per capita community emissions have decreased by 46 per cent since the
2005 baseline." YF-EV-0020 p.2 gives the same 9 / 46 / 12.8 figures.

**What no archive says is that 16.7 is the *recalculated* baseline.** The word
"recalculated" carries real weight here — it is the whole reason the story warns
readers off the older series — and the two halves sit in different documents.
YF-EV-0020 (Nov 2025) documents that a recalculation happened ("the 2005 baseline
was recently recalculated as revised natural gas usage data has become
available") but gives no baseline number. YF-EV-0024 (April 2026) gives 16.7 but
never mentions the recalculation. YF-EV-0021 (2022) states no numeric baseline at
all, so the pre-revision figure is not in the set either.

The joining inference is sound and arithmetically self-confirming: 16.7 × 0.91 =
15.20 Mt, exactly the reported 2024 inventory, and 0020's own "10.8 million tCO2e
… equal to 35 per cent below 2005 emissions" implies a baseline of 16.6–16.7 Mt.
So the number in force is right. This is a labelling gap, not a figure problem,
and it is the lowest-severity finding in this report.

*Fix (optional):* "Against the 2005 baseline of 16.7 million tonnes as restated
in the City's 2025 annual report…" — which drops the unsourced adjective without
losing the point.

### KF-6 — cited YF-EV-0021, YF-EV-0020 — **VERIFIED**

> "The community carbon budget — 'the maximum total emissions allowed from 2022
> until 2050 for the community to be carbon neutral by 2050' — is 176 million
> tonnes CO2e. The Fall 2025 update forecasts it depleted in 2036, one year
> earlier than the original 2023-2026 Carbon Budget forecast."

YF-EV-0021 p.4, verbatim on the definition and the 176 Mt. The same page gives
the original forecast: "The community is forecasted to deplete that budget by
2037." YF-EV-0020 p.4: "The community carbon budget is forecasted to be depleted
in 2036, one year earlier than forecasted in the original 2023-2026 Carbon
Budget." 2037 → 2036 is one year earlier, exactly as stated.

Context the founder should hold, from YF-EV-0022 p.16: that document reports the
*remaining* community budget for 2025-2050 as 133 million tonnes CO2e, and
attributes the shift to 2036 to "the 2022 actual emissions being higher than
forecasted." 176 Mt (2022-2050) and 133 Mt (2025-2050) are the same instrument at
two different start dates, not a discrepancy — but a reader who opens
YF-EV-0022 will meet the smaller number first.

### KF-7 — cited YF-EV-0020, YF-EV-0021 — **VERIFIED**

> "Corporate emissions are a separate measure from the community target and about
> two per cent of it, and are also over budget: FCS03160 reports 884,000 tonnes
> CO2e of quantified corporate emissions over 2023-2026 against a roughly
> 816,000-tonne corporate target, a 68,000-tonne carbon deficit, against a
> corporate neutrality target of 2040."

YF-EV-0020 p.5, verbatim on every figure:

> "…the corporate emissions would be 816,000 tonnes of CO2e over 2023-2026. The
> quantifiable impacts of the 2023 and 2024 budget updates are calculated to
> increase emissions by 68,000 tonnes, resulting in 884,000 tonnes CO2e of
> emissions between 2023-2026. This exceeds the preliminary corporate emissions
> targets … resulting in a carbon deficit of 68,000 tonnes."

The same page: "corporate emissions make up approximately two per cent of the
total emissions within the community." The 2040 neutrality target is in
YF-EV-0021 p.2 and p.4 ("a corporate target to be emissions neutral by the year
2040"). The claim's own framing — "a separate measure … do not conflate" — is
exactly what the brief asked for and what the archives support.

### KF-8 — cited YF-EV-0032 — **VERIFIED**

> "The targets have not been quietly moved. The City's Climate Action Plan Update
> (2027-2030) page asks 'Will you update the City's climate targets given the
> City is unlikely to meet its 2025 GHG emissions reduction target?' and answers:
> 'Rather than revising the targets, this project will focus on renewing the
> action plan.'"

Both fragments are verbatim in the archived FAQ. The full answer continues "…to
identify and prioritize the initiatives that would have the biggest impact on
achieving the City's goals," which the claim truncates without changing the
sense. Note that the question is the City's own FAQ heading — the City is the one
characterizing its 2025 target as unlikely to be met, which is what makes this
the strongest available answer to "are they moving the goalposts."

### KF-9 — cited YF-EV-0033 — **VERIFIED**

> "The 2024 miss was not the first. CBC reported on November 12, 2024 that the
> City's Fall 2024 Carbon Budget Update put 2023 community emissions at an
> estimated 16.2 million tonnes against a 13.4 million tonne aim, quoting the
> report: 'If Edmonton's current emission trajectory continues, Edmonton's GHG
> reduction targets will not be achieved.'"

Archive byline: "Natasha Riebe · CBC News · Posted: Nov 12, 2024." Body: "the
city emitted an estimated 16.2 million tonnes of carbon dioxide equivalent in
2023 — higher than the 13.4 million tonnes it was aiming for." The quoted
sentence is verbatim.

*Small precision point.* CBC calls the source "the 2023-2026 carbon budget update
report"; it never uses the phrase "Fall 2024 Carbon Budget Update." That label is
correct and is corroborated inside the set — YF-EV-0020 names "the November 13,
2024 Financial and Corporate Services report, FCS02532 Fall 2024 Carbon Budget
Update" — so the identification holds across archives rather than within the one
cited. Not enough to move the grade.

The archive also independently supports the story's limitation about moving
trajectory values: CBC records "emissions would need to go down to 12.7 million
tonnes or less in 2024," against FCS03160's 12.2 million.

---

## Story front matter

### `one_line` — **VERIFIED**

> "Edmonton is not on track to meet its adopted community emissions targets — the
> City's own carbon budget reporting says so, in those words, and the latest
> inventory sits 3.0 million tonnes above the line the City drew for itself."

"In those words" is a strong claim and it survives: YF-EV-0022's Carbon Budget
section says emissions "are not on track to meet the 2025, 2030 and 2050
emissions targets." The 3.0 Mt is arithmetic on two archive numbers (15.2 − 12.2)
and the "line the City drew for itself" is the City's own trajectory value. The
attribution is scoped correctly to the City's reporting rather than asserted as
an independent finding.

### `short_answer` — **VERIFIED**

Every load-bearing element checks: 35/50/neutral targets (YF-EV-0021); 15.2 vs
12.2 and the two quoted fragments "will not be met" / "no current initiatives or
actions" (YF-EV-0020); "not on track to meet the 2025, 2030 and 2050 emissions
targets" (YF-EV-0022); 46 per cent per-capita and 9 per cent absolute
(YF-EV-0024 / YF-EV-0020).

"About 25% over" is arithmetic: (15.2 − 12.2) / 12.2 = 24.6%. The denominator is
the trajectory value, which is the sensible one and is the one the sentence
implies.

The closing vintage caveat — "The 2024 inventory is the newest one published; on
the City's stated annual cycle, the 2025 numbers would arrive in the fall of
2026" — rests on YF-EV-0020's statement that "the carbon budget is presented
every four years with an annual update in the fall," plus the absence of any
later inventory across the set. Honest, and correctly framed as a cycle
expectation rather than a commitment.

### TL;DR 1 — **VERIFIED**

Targets and their two source documents. Same basis as KF-1.

### TL;DR 2 — **VERIFIED**

> "Latest published inventory covers 2024: 15.2 million tonnes CO2e, up 3% from
> 2023, against the 12.2 million the City's own trajectory called for — 3.0
> million tonnes, about 25%, over."

All four figures are archive numbers or arithmetic on them. Units are stated,
the denominator is identified ("the City's own trajectory"), and the "up 3%" is
correctly attached to the year-over-year comparison rather than to the gap.

### TL;DR 3 — **VERIFIED**

2025 target will not be met, plus the 2036 depletion. Both in YF-EV-0020.

### TL;DR 4 — **VERIFIED**

> "Per-capita emissions are down 46% since 2005; absolute emissions are down 9%
> against a 35% milestone — 26 percentage points short."

35 − 9 = 26, and the bullet says *percentage points*, not per cent, which is the
correct unit for a difference of two percentages. This is the kind of thing that
usually goes wrong and did not.

### TL;DR 5 — **VERIFIED**

The FAQ quote (YF-EV-0032) plus the verdict statement. "On the City's own
published measurements" is an accurate description of the evidence base — five of
the six archives are City documents.

---

## Summary

| # | Item | Cited | Verdict |
|---|------|-------|---------|
| 1 | KF-1 — 35/50/neutral targets, FCS01478 | YF-EV-0021 | VERIFIED |
| 2 | KF-2 — 2024 inventory 15.2 Mt vs 12.2 Mt, "not met" | 0020/0022 | VERIFIED |
| 3 | KF-3 — 10.8 Mt, 29% cut, "will not be met" | YF-EV-0020 | VERIFIED |
| 4 | KF-4 — 2026 Budget Highlights "not on track" | YF-EV-0022 | VERIFIED |
| 5 | KF-5 — recalculated 16.7 Mt baseline, 9% / 46% / 12.8 t | 0024/0020 | PARTIAL |
| 6 | KF-6 — 176 Mt budget, depleted 2036 | 0021/0020 | VERIFIED |
| 7 | KF-7 — corporate 884k vs 816k, 68k deficit, 2040 | 0020/0021 | VERIFIED |
| 8 | KF-8 — targets not being revised | YF-EV-0032 | VERIFIED |
| 9 | KF-9 — CBC Nov 2024, 16.2 vs 13.4 Mt | YF-EV-0033 | VERIFIED |
| 10 | Story `one_line` | 0020/0022 | VERIFIED |
| 11 | Story `short_answer` | 0020/0021/0022/0024 | VERIFIED |
| 12 | TL;DR 1 — adopted targets | 0021 | VERIFIED |
| 13 | TL;DR 2 — 15.2 vs 12.2, 3.0 Mt / 25% over | 0020/0022 | VERIFIED |
| 14 | TL;DR 3 — 2025 miss, 2036 depletion | 0020 | VERIFIED |
| 15 | TL;DR 4 — 46% / 9% / 26 points | 0024/0020 | VERIFIED |
| 16 | TL;DR 5 — targets not revised | 0032 | VERIFIED |

**Totals: 15 VERIFIED · 1 PARTIAL · 0 UNSUPPORTED.**

### Verdict: **1 issue, low severity. Nothing blocks publication.**

Nothing in the published text is contradicted by the archives, nothing is
invented, and no figure is misreported. The single PARTIAL is the adjective
"recalculated" attached to the 16.7 Mt baseline: the number is right and is
arithmetically confirmed twice over, but the archives establish the recalculation
and the number in two different documents, and neither joins them. It needs a
wording tweak or a citation, not re-reporting.

The attribution discipline this story most needed — separating "the City says"
from "it happened" — holds throughout. Every forecast in the published text is
labelled as a City forecast, the observed values are labelled as inventory
results, and the limitations already say so explicitly ("The 2036 depletion date
and the statement that the 2025 target will not be met are City forecasts. Only
the 2023 and 2024 inventory values and their comparison against the trajectory
are observed results"). That is correct against the bytes.

---

## Appendix — observations outside the graded scope

**1. Body text is clean, with one date not in any archive.** The story opens
"Edmonton City Council declared a climate emergency on August 27, 2019." No
archive in this claim's evidence set gives that date. YF-EV-0033 says only "The
city declared a climate emergency in 2019" and YF-EV-0032 says "City Council
declared a climate emergency in 2019." The **day** is uncited. Either drop it to
"in 2019" or register a source.

**2. Two other body assertions land correctly.** The 180,000 tonnes over four
years is in YF-EV-0020 p.4 verbatim; the A-grade CDP disclosure is in YF-EV-0024
p.141 ("Edmonton's 2023 CDP reporting resulted in Edmonton maintaining an
A-grade"). The 2022 warning quoted in the body — "Current investments are not
enough to achieve reduction targets and action is needed as the carbon deficit
continues to grow under the current state" — is verbatim in YF-EV-0021 p.4, under
the heading "Achieving Emission Reduction Targets." The story calls it a warning
"in its own summary"; it is in the report body, and a near-identical bullet
appears in the executive summary ("Edmonton's overall carbon deficit continues to
grow under the current state"). Harmless, but "in the report" would be exact.

**3. The limitation about incompatible vintages is correct and load-bearing.**
CBC's 12.7 Mt (Fall 2024) against FCS03160's 12.2 Mt is verified in both
archives. Keeping this in the limitations rather than the body is the right call.

**4. Registry metadata gap.** YF-EV-0022 has no `published_on`. Given that the
key_fact turns on it being "a 2026 publication," the entry should record a date
(the document supports April 2026 for the consolidated version).

**5. Corporate depletion year, if it is ever cited.** YF-EV-0020 and YF-EV-0022
both put the corporate carbon budget at 2032, one year earlier than the 2033 in
YF-EV-0021. The story does not use this and does not need to; noted only so it is
not mistaken for a discrepancy later.
