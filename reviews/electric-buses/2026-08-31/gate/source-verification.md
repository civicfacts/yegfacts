# Source verification — electric-buses

Gate stage 7, AI-automatable portion. Run date 2026-09-01 (story run `2026-08-31`).

**Method.** Every `key_fact` in `src/content/claims/ebus-*.yaml`, plus the five
TL;DR bullets and the `one_line` in `src/content/stories/electric-buses.mdx`, was
checked against the archived bytes of its cited evidence ID only. No web access
was used. Registry entries under `evidence/registry/YF-EV-*.yaml` gave the
`archive.path`; HTML archives were stripped to text, PDFs were extracted with
`pypdf` 6.14.2 (`pdftotext`, `mutool` and `qpdf` are not installed on this
machine). All five PDFs extracted cleanly — 12, 72, 102, 38 and 213 pages
respectively — so nothing in this report rests on an unreadable archive.

**Integrity check.** All 12 archives match the `archive.sha256` recorded in the
registry (verified with `shasum -a 256`). The bytes audited are the bytes the
registry claims.

**Grading.** VERIFIED = the archive supports the statement as written.
PARTIAL = the archive supports the substance but at least one asserted detail is
not in *that* archive. UNSUPPORTED = the archive does not contain it.

A recurring pattern drives most PARTIALs: the statement is *true* and is
supported by some archive in the set, but the `source:` field points at an
archive that carries only part of it. These are citation-routing errors, not
fabrications. Each one names the archive that does carry the missing detail.

---

## Claim: `ebus-82m-loss`

### KF-1 — cited YF-EV-0003 — **PARTIAL**

> "The $82 million figure is a proof of claim the City filed on February 2, 2024
> in Proterra's Chapter 11 bankruptcy, seeking damages for breach of contract and
> negligence. A damages claim is not an audited loss."

The substance is in the archive. CBC (Feb 12, 2024):

> "a proof of claim filed early this month shows the city is now seeking more
> than $82 million for breaches of contract and negligence."

What is **not** in YF-EV-0003 is the date **February 2, 2024**. CBC says only
"early this month." The exact date is confirmed in a different archive —
YF-EV-0002, the claims register, row: `02/02/2024 | 1281 | The City of Edmonton`.

*Fix:* cite YF-EV-0002 alongside YF-EV-0003 on this fact.

### KF-2 — cited YF-EV-0001 — **VERIFIED**

> "The City's October 2023 court filing says it paid US$58,761,600 under the
> 60-bus contract, and itemized C$1,352,655.58 in repair labour, parts, battery
> blankets and an outstanding receivable at that time."

Archive (Case 23-11120-BLS Doc 450, filed 10/20/23), ¶2 and ¶3:

> "Edmonton agreed to pay Proterra the sum of $58,761,600.00 (USD)" … "Edmonton
> paid the Purchase Price to Proterra."

The itemization on p.3 matches to the cent: internal labour $302,263.33; parts
(excluding blankets) $824,777.67; battery blankets $206,122.50; outstanding A/R
$19,492.08; total $1,352,655.58 CAD. "Under the Contract, Edmonton ordered a
total of 60 electric buses." Every element checks.

### KF-3 — cited YF-EV-0002 — **VERIFIED**

> "A May 2026 claims-register entry lists Edmonton's claim as general unsecured,
> with no allowed or paid amount shown — how much Edmonton will ever recover is
> not public."

Archive footer: `Case 23-11120-BLS Doc 1636 Filed 05/04/26`, "Date Range:
08/07/2023-04/06/2026". Edmonton's row reads `FOREIGN | General Unsecured`.

Two points of precision worth knowing, neither of which makes the statement
wrong. The Claim Amount column reads `FOREIGN` (currency not stated) rather than
being blank. And the register has no "allowed" or "paid" columns at all — so "no
allowed or paid amount shown" is accurate but is a property of the document
format, not a disposition on Edmonton's claim. The concluding inference ("not
public") follows from the absence, which is the honest reading.

### KF-4 — cited YF-EV-0010 — **VERIFIED**

> "Governments announced more than C$43 million in joint funding for the original
> project: more than C$21.5M federal, about C$10.8M provincial and more than
> C$10.8M municipal…"

Archive (Canada.ca news release, April 13, 2018):

> "announced more than $43 million in joint funding to purchase up to 40 new
> electric buses for the Edmonton Transit Service."

Quick facts: "The Government of Canada is providing more than $21.5 million …
The Government of Alberta is contributing approximately $10.8 million of
GreenTRIP funding, and the City of Edmonton is providing more than $10.8
million." All four figures match. "Original project" correctly signals that this
covered up to 40 buses, not the eventual 60.

*Registry nit:* `published_on: 2018-04-01`; the archive is dated April 13, 2018.

### KF-5 — cited YF-EV-0005 — **PARTIAL**

> "The buses entered service in 2020, were reported still in daily service in
> early 2024, and the City still lists all 60 in the ETS fleet…"

Only the third clause is in YF-EV-0005:

> "ETS has 60 electric buses in its fleet."

The archive (page title: "Hydrogen and Electric Buses") contains no in-service
date and no 2024 status. Both are supported elsewhere in the set: entry into
service in summer/August 2020 is in YF-EV-0004 ("In the summer of 2020, Don
Iveson … announced that electric buses were being deployed") and YF-EV-0012;
still-in-service in early 2024 is in YF-EV-0003, where Coun. Andrew Knack says
in February 2024 the buses "are still providing service to Edmontonians every
day."

The trailing inference — "residual value exists" — is analysis, not an archive
statement.

*Fix:* add YF-EV-0004 (or 0012) and YF-EV-0003 to this fact's sources.

*Registry nit:* YF-EV-0005 is titled "Electric Buses (City of Edmonton project
page)"; the archived page is titled "Hydrogen and Electric Buses."

---

## Claim: `ebus-procurement-failure`

### KF-1 — cited YF-EV-0003 — **VERIFIED**

> "The City's February 2024 proof of claim says the contract specified 328 km of
> range, or 268 km in extreme cold, while the buses averaged about 165 km in
> winter — 38% below the cold-weather guarantee."

Archive: "According to the recent proof of claim … The contract specifies the
buses would have a range of 328 kilometres, or 268 in extreme cold. But none of
the city's buses has ever travelled 328 on a single charge and on average, the
range has been between about 165 and 250 kilometres." The photo caption is
explicit that 165 km is the winter figure: "The City of Edmonton claims
Proterra's electric buses have a range of only 165 kilometres in the winter."
The 38% is arithmetic on archive numbers: (268 − 165) / 268 = 38.4%.

### KF-2 — cited YF-EV-0004 — **VERIFIED**

> "City court filings say the buses failed contract specifications for range,
> battery life, reliability and durability, with more than half the 60-bus fleet
> out of service at times roughly three years after the 2020 rollout."

Archive: "In a court filing last month, the city's U.S. lawyers wrote that
Edmonton's electric buses have failed to meet contract qualifications with
respect to range, battery life, reliability and durability." Also "Three years
later, most of the city's 60 electric buses aren't fit to be on the roads" and
"only 16 of the 60 buses were able to go on the roads that morning." The same
allegation appears first-hand in YF-EV-0001 ¶3.

### KF-3 — cited YF-EV-0004 — **PARTIAL**

> "Proterra entered Chapter 11 in August 2023 and Edmonton's contract was not
> among those transferred to the buyer, impairing warranty and vendor support."

This is the weakest citation in the set. YF-EV-0004 was published **Nov 22,
2023** — before the events in the second half of the sentence. It supports only
that Proterra "filed for Chapter 11 bankruptcy protection this summer" (no
month) and that parts supply was cut off ("they can no longer buy parts from
Proterra because of the bankruptcy protection proceedings").

Not in YF-EV-0004:
- **August 2023.** In YF-EV-0001 ¶12: "On August 7, 2023, Proterra Inc and
  Proterra Operating Company, Inc. … commenced their cases under Chapter 11."
- **Contract not transferred to the buyer.** In YF-EV-0003: "one day before the
  January sale hearing, Edmonton was removed from the list of contracts … The
  removal means the contract and warranty provisions between the city and the
  company likely won't continue to be honoured."

*Fix:* source this fact to YF-EV-0001 + YF-EV-0003, not YF-EV-0004.

### KF-4 — cited YF-EV-0009 — **VERIFIED**

> "Transit-union representatives independently described numerous mechanical
> issues, battery problems and missing parts across the fleet."

Archive (Global News): "The transit union said they faced numerous mechanical
issues, battery problems and dealt with missing parts." Near-verbatim.

One caveat on the word *independently*: the union is independent of the City's
legal strategy, which is presumably the intent, but the Global News and CBC
accounts are not independent of each other — both quote the same ATU 569
officials (Bradshaw, McCabe). The claim's own limitations section does not
mention this.

### KF-5 — cited YF-EV-0005 — **PARTIAL**

> "The City's own project page still lists 60 electric buses in the ETS fleet;
> the buses entered service in August 2020 and were reported still in daily
> service in early 2024."

Same split as `ebus-82m-loss` KF-5. First clause verified in YF-EV-0005 ("ETS
has 60 electric buses in its fleet"). "August 2020" and "still in daily service
in early 2024" are not in this archive; they are in YF-EV-0012 / YF-EV-0004 and
YF-EV-0003 respectively.

### KF-6 — cited YF-EV-0006 — **VERIFIED**

> "Toronto's head-to-head evaluation measured its Proterra fleet at 95%
> availability by April 2022 and praised Proterra's support there…"

Archive p.19: "NFI achieved 95%, which is an increase of 6% since April 2021.
BYD achieved 30% … Proterra achieved 95% which is an increase 33%." Report date
is April 14, 2022. On support, Appendix A: "Overall, the service and technical
support from Proterra has been excellent, but the ongoing challenges with body
crack repairs have hurt the fleet's availability performance."

Context the founder should hold alongside this: the same report puts Proterra's
MDBF at 25,000 km against a 30,000 km target and "trending negatively" (p.18),
and records Proterra's composite body as "susceptible to cracking." The
claim's use of the fact is fair, but 95% availability was not Proterra's only
number in Toronto.

---

## Claim: `ebus-cold-cities`

### KF-1 — cited YF-EV-0006 — **VERIFIED**

> "Toronto tested 60 buses from three manufacturers head-to-head. Winter range
> loss was real for all three, but outcomes diverged sharply by manufacturer —
> New Flyer reached a 70,000 km mean distance between failures against a
> 30,000 km target, with 95% fleet availability."

Every element is in the archive. "The TTC's first 60 eBuses were procured from
BYD, NFI and Proterra" (p.14); "In October 2020, TTC initiated its head-to-head
evaluation of the three bus types procured from BYD Canada, Proterra, and New
Flyer Industries" (p.1). Reliability, p.18: "The TTC's target for eBus MDBF is
30,000 km. NFI has achieved an MDBF of 70,000 km." Availability, p.19: "NFI
achieved 95%."

Winter range loss for all three, Table 4 (p.55), 2021 rows: BYD 274 → 198 km
(−28%); New Flyer 234 → 203 km (−13%); Proterra 212 → 161 km (−24%). Loss is
real for all three, and the spread is wide, exactly as the fact says.

### KF-2 — cited YF-EV-0007 — **VERIFIED**

> "A later TTC program update reported battery-electric propulsion accounted for
> less than 4% of recorded defects and identified no fundamental technology
> barrier."

Archive (Green Bus Program Update, July 17, 2025):

> "The propulsion systems of the buses were reliable and accounted for less than
> 4% of the defects experienced… the TTC identified that there were no
> fundamental issues with eBus technology preventing the transition to a
> zero-emission bus fleet."

Verbatim, so VERIFIED. But the reader should know two things the sentence does
not carry, both from the same archive:

1. The "<4%" figure is that update's **recap of the 2019–22 pilot finding**, not
   a fresh 2025 measurement. The 2025 number in the same document is higher:
   "Propulsion-related faults account for only 6% of all system defects."
2. The same page reports the pilot fleet at "45-50%" availability as of May 2025
   and says "The availability of Proterra pilot buses has fallen sharply to 30%
   due to traction motor defects and ongoing supply chain challenges following
   the company's 2023 bankruptcy."

The reviewers argued this both-things-are-true point explicitly in round 2; the
published key_fact keeps only the favourable half. Not a sourcing error, but a
selection the founder is ratifying.

*Registry nit:* `published_on: 2025-01-01`; the archive is dated July 17, 2025.

### KF-3 — cited YF-EV-0008 — **PARTIAL**

> "Winnipeg — with winters comparable to Edmonton's — ran its own cold-climate
> technical evaluation and proceeded with zero-emission bus procurement."

The middle clause is solid. The archive **is** that evaluation: "Transition to
Zero-Emission / Technical Evaluation Report," Winnipeg Transit, 1/14/2021, 213
pages, with a dedicated cold-weather analysis ("Winnipeg Transit requires 35 kW
of heat to maintain cabin temperatures in extreme cold outdoor temperatures").

"**Proceeded with zero-emission bus procurement" is not in this archive.** The
report recommends an evaluation fleet, not a procurement:

> "It is recommended that a 16-bus fleet with four 40-foot long-range BEBs, four
> 40-foot FC-BEBs, four 60-foot long-range BEBs and four 60-foot FC-BEBs be
> operated for the purposes of evaluating the two remaining technologies…"

and closes prospectively: "After testing is complete, Winnipeg Transit will be
well positioned to begin purchasing zero-emission buses as part of its Bus
Replacement Program." A January 2021 recommendation to test 16 buses is not a
procurement decision. The 2023 New Flyer order that would establish it is
**not in the evidence registry** — it sits unregistered in
`evidence/staging/348f8abc4544-winnipeg-starts-massive-zero-emission-transit-transition-with-order-for-16-new-f`.

"With winters comparable to Edmonton's" is also not an archive statement,
though the archive documents Winnipeg's climate in enough detail (winter daily
average −16.4 °C, 52 days below −20 °C, 193 days below freezing) that the
comparison is defensible as editorial framing.

*Fix:* either register the New Flyer order as evidence, or soften to "…ran its
own cold-climate technical evaluation and recommended proceeding to a
zero-emission test fleet."

### KF-4 — cited YF-EV-0004 — **PARTIAL**

> "Edmonton's own problems were concentrated in one manufacturer whose company
> went bankrupt, cutting off parts and warranty support — a vendor failure, not
> a category-wide result."

Supported in YF-EV-0004: single manufacturer throughout, Chapter 11, and parts
cut off ("Now that their parts warehouse is locked up and we can't get new parts
for them" — the same point appears in YF-EV-0009).

**"Warranty support" is not in YF-EV-0004.** It is in YF-EV-0003: "the contract
and warranty provisions between the city and the company likely won't continue
to be honoured." Note the hedge — *likely won't continue to be honoured*, which
is weaker than "cutting off."

The closing clause ("a vendor failure, not a category-wide result") is the
claim's argument, carried by YF-EV-0006/0007, not by YF-EV-0004.

---

## Story front matter

### `one_line` — **VERIFIED**

> "Edmonton's electric buses fell well short of what the City contracted for — by
> the City's own account in court filings — but the widely shared '$82 million
> lost' figure is a legal claim, not a confirmed loss — and one bad procurement
> doesn't show electric buses can't work in cold cities."

Three legs, all supported, and the attribution is handled carefully. Leg 1 is
explicitly scoped to "the City's own account in court filings," which is exactly
what YF-EV-0001 and YF-EV-0003 establish and no more. Leg 2 matches YF-EV-0003
(proof of claim for breach and negligence) plus YF-EV-0002 (no disposition).
Leg 3 is the negative claim the TTC data in YF-EV-0006/0007 supports.

> The `one_line` was edited on disk during this audit (an earlier version read
> "Edmonton's Proterra buses…"). This audit grades the current text.

### TL;DR 1 — **VERIFIED**

> "The buses materially underperformed the contract: roughly 165 km average
> winter range against a 268 km extreme-cold guarantee — a 38% shortfall — per
> the City's court filings."

Same basis as `ebus-procurement-failure` KF-1 (YF-EV-0003), and the "per the
City's court filings" attribution is correct.

### TL;DR 2 — **PARTIAL**

> "More than half the 60-bus fleet was at times out of service, and Proterra's
> bankruptcy ended its warranty coverage and disrupted parts supply."

"More than half … at times out of service" is verified — YF-EV-0001 ¶3: "at
times resulting in more than half of the Buses to be out of service for
non-routine maintenance." "Disrupted parts supply" is verified in YF-EV-0004 and
YF-EV-0009.

**"Ended its warranty coverage" overstates the archive.** The strongest
available statement is YF-EV-0003's hedge: warranty provisions "likely won't
continue to be honoured." No archive states that warranty coverage ended. The
bullet asserts a completed fact where the record has a probable one.

*Fix:* "…left its warranty coverage unlikely to be honoured and disrupted parts
supply," or similar.

### TL;DR 3 — **VERIFIED**

> "The $82 million figure is a bankruptcy proof of claim filed in February 2024,
> not a measured loss; what Edmonton actually recovers is still not public."

YF-EV-0003 for the identity and month; YF-EV-0002 for the unresolved status.
Note this bullet says "February 2024" rather than the specific date, so unlike
`ebus-82m-loss` KF-1 it needs no additional citation.

### TL;DR 4 — **VERIFIED**

> "The City paid US$58.76 million for the buses, with more than C$43 million in
> joint federal, provincial and municipal funding announced for the original
> project."

YF-EV-0001 (US$58,761,600, paid) + YF-EV-0010 (>$43M joint, up to 40 buses).
The currencies are labelled distinctly, which is what the brief required ("report
both currencies; do not silently convert").

### TL;DR 5 — **PARTIAL**

> "Toronto's head-to-head test of three manufacturers found large winter range
> losses for all — but 95% availability for some fleets, so cold-city failure is
> not a property of the technology."

The second half is verified (NFI 95%, Proterra 95%, p.19).

**"Large winter range losses for all" is contradicted in emphasis by the cited
archive.** Page 69 of YF-EV-0006 restricts the finding to two of the three
vendors:

> "Proterra and BYD still achieve between 20% and 30% less range in the winter
> than they do in the summer."

and p.44 says the opposite of "all" for the third: "Proterra and BYD are more
significantly affected by the swings in seasonal changes while **NFI is more
stable throughout the year**." Table 4 bears this out — New Flyer's 2021 winter
loss was 13%, half of BYD's 28%.

This matters because it cuts the wrong way for the story's own argument. The
manufacturer spread in *winter sensitivity* is stronger evidence for
`ebus-cold-cities` than a flattened "large losses for all." The bullet gives
away its best point.

*Fix:* "…found winter range losses across the board, from 13% to 28% depending
on the manufacturer — but 95% availability for some fleets…"

---

## Summary

| # | Item | Cited | Verdict |
|---|------|-------|---------|
| 1 | `82m-loss` KF-1 — proof of claim, Feb 2, 2024 | YF-EV-0003 | PARTIAL |
| 2 | `82m-loss` KF-2 — US$58,761,600 + C$1,352,655.58 | YF-EV-0001 | VERIFIED |
| 3 | `82m-loss` KF-3 — May 2026 register, general unsecured | YF-EV-0002 | VERIFIED |
| 4 | `82m-loss` KF-4 — >C$43M joint funding, payer mix | YF-EV-0010 | VERIFIED |
| 5 | `82m-loss` KF-5 — 2020 service, early-2024 status, 60 in fleet | YF-EV-0005 | PARTIAL |
| 6 | `procurement-failure` KF-1 — 328/268 vs 165 km, 38% | YF-EV-0003 | VERIFIED |
| 7 | `procurement-failure` KF-2 — spec failure, >half out of service | YF-EV-0004 | VERIFIED |
| 8 | `procurement-failure` KF-3 — Aug 2023 Ch.11, contract not transferred | YF-EV-0004 | PARTIAL |
| 9 | `procurement-failure` KF-4 — union accounts | YF-EV-0009 | VERIFIED |
| 10 | `procurement-failure` KF-5 — 60 in fleet, Aug 2020, early 2024 | YF-EV-0005 | PARTIAL |
| 11 | `procurement-failure` KF-6 — Proterra 95% in Toronto, support praised | YF-EV-0006 | VERIFIED |
| 12 | `cold-cities` KF-1 — 60 buses, 3 makers, NFI 70k MDBF / 95% | YF-EV-0006 | VERIFIED |
| 13 | `cold-cities` KF-2 — <4% of defects, no fundamental barrier | YF-EV-0007 | VERIFIED |
| 14 | `cold-cities` KF-3 — Winnipeg evaluated and procured | YF-EV-0008 | PARTIAL |
| 15 | `cold-cities` KF-4 — one manufacturer, parts and warranty cut off | YF-EV-0004 | PARTIAL |
| 16 | Story `one_line` | 0001/0002/0003/0004/0006/0007 | VERIFIED |
| 17 | TL;DR 1 — 165 vs 268 km, 38% | YF-EV-0003 | VERIFIED |
| 18 | TL;DR 2 — >half out of service, warranty ended, parts disrupted | 0001/0003/0004 | PARTIAL |
| 19 | TL;DR 3 — Feb 2024 proof of claim, recovery not public | 0002/0003 | VERIFIED |
| 20 | TL;DR 4 — US$58.76M paid, >C$43M joint funding | 0001/0010 | VERIFIED |
| 21 | TL;DR 5 — large winter losses for all, 95% for some | YF-EV-0006 | PARTIAL |

**Totals: 14 VERIFIED · 7 PARTIAL · 0 UNSUPPORTED.**

### Verdict: **7 issues.**

Nothing in the published text is contradicted by the archives, and nothing is
invented. Six of the seven are citation-routing errors — the statement is true
and the supporting archive is already in the registry, just not the one named in
the `source:` field. Those are cheap to fix and do not require re-reporting.

Two need an actual wording or sourcing decision before the founder clicks
approve:

- **`cold-cities` KF-3 (Winnipeg "proceeded with … procurement").** The archive
  recommends a 16-bus test fleet in January 2021. The order that would establish
  procurement is unregistered, sitting in `evidence/staging/`. Register it or
  soften the wording.
- **TL;DR 5 ("large winter range losses for all").** The cited archive says the
  losses were *not* uniform, and naming the spread would strengthen the story's
  own argument rather than weaken it.

One more is a judgement call rather than an error: **TL;DR 2's "ended its
warranty coverage"** hardens YF-EV-0003's "likely won't continue to be honoured"
into a completed fact. The same hardening appears in the `short_answer`
("Proterra's 2023 bankruptcy ended its warranty coverage") and in the body ("left
the City without warranty coverage").

---

## Appendix — observations outside the graded scope

These were not part of the assigned check (key_facts, TL;DR, `one_line`) but
surfaced while reading the archives and bear on the same gate.

**1. `ebus-cold-cities` limitation misstates the TTC finding.** The limitation
reads "Cold-weather range reduction is real and large across all manufacturers
(roughly 26-30% higher energy demand)." Two problems. The archive's figure is
"between 20% and 30% less **range**" — a different quantity from energy demand —
and it is explicitly scoped to Proterra and BYD only. Computed from Table 2, the
2021 winter energy increase was BYD +39%, Proterra +31%, New Flyer +15%; the
2020 figures were +16%, +39%, +7%. There is no manufacturer at "26-30%" and no
range that spans all three. This is the same overreach as TL;DR 5 and should be
fixed with it.

**2. Winnipeg comparison figure is correct and well sourced.** The `comparisons`
entry — "about 75% coverage of conventional runs under maximum heating demand" —
lands exactly on Figure 85 (p.120): 35-40-foot runs, max HVAC, BEB Long-range
Max Capacity, Total **75.49%**. Good citation.

**3. Body-text assertions with no archive behind them.** Two sentences in the
story body have no supporting archive in the registry: "Proterra's transit
business was sold to Phoenix Motor in January 2024, **which said it planned to
restock spare parts**" and "**Proterra's reorganization plan took effect in March
2024.**" The January 2024 sale itself is in YF-EV-0003; the restocking statement
and the plan effective date are not in any of the 12 archives. Candidate sources
sit unregistered in `evidence/staging/` (`dd11090fe030-proterra-emerges-from-chapter-11`).

**4. YF-EV-0012 is registered but unused.** No claim's `evidence:` list includes
it. It is the archive that supports the body's "up to 350 km of range on ETS
routes" — "enabling these vehicles to get approximately 350 km of range on ETS
routes" — and the August 2020 in-service date. Worth wiring into
`ebus-procurement-failure` KF-5 and `ebus-82m-loss` KF-5, which is where the
in-service date currently floats uncited.

**5. Registry metadata drift.** Three entries disagree with their archived
bytes on date or title: YF-EV-0007 `published_on: 2025-01-01` (archive: July 17,
2025); YF-EV-0010 `published_on: 2018-04-01` (archive: April 13, 2018);
YF-EV-0005 titled "Electric Buses" (archive: "Hydrogen and Electric Buses").
None affects a published fact, but the dates are wrong in a registry whose whole
job is provenance.
