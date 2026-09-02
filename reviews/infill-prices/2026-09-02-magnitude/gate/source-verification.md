# Source verification — infill-prices (magnitude re-run)

Gate stage 7, AI-automatable portion. Run date 2026-09-02 (story run
`2026-09-02-magnitude`). Auditor: Claude (Opus) audit session, separate from the
drafting session.

**Scope.** Every `key_fact` in `src/content/claims/ip-teardown-price-gap.yaml`
against every source it lists, and every `limitation`, `unknown` and
`missing_evidence` line in it; in `src/content/stories/infill-prices.mdx`, the
`one_line`, the TL;DR bullets, both 2026-09-02 `changelog` entries and every
body sentence carrying a number, a date, a name, or an assertion about what a
document or a seat says. Sentences bearing only on `ip-infill-affordable` — TL;DR
bullet 5, the "hypothetical Edmonton household" clause in the opening, and the
whole of "The affordability test, and where the panel split" — were not re-graded
here: that claim was gated on 2026-09-01 under run `2026-09-01-rerun2` and is
unchanged in this run. They are marked SKIPPED in the counts.

**Method.** Statements were checked against the archived bytes of the cited
evidence only, or against the attributed run artifacts. No web access was used.
Registry entries under `evidence/registry/YF-EV-*.yaml` gave the `archive.path`;
all eleven cited archives sit under `evidence/private/`. HTML archives were
stripped to text, and the two Socrata dataset pages were additionally read
through their embedded page payload, which is where the column list, the column
descriptions, the value cardinalities and the dataset description actually live —
the stripped text of those two is a nav shell of about 500 characters and carries
nothing. PDFs were extracted with `pypdf` (`pdftotext`, `mutool` and `qpdf` are
not installed); all four extracted cleanly, and the two City reports and the
assessment methodology needed whitespace normalisation before any phrase search
would hit. Where a statement is attributed to a run artifact it was checked
against `round1/claude.json`, `round1/gpt.json`, `round1/gemini.json`,
`round2/claude.json`, `round2/gpt.json`, `brief.md`, `errata.md`,
`fetch-report.md`, `intake.md`, `run.yaml`, `synthesis.json` or
`framing/editorial-note.md` in this run's directory, and, where the text says so,
against the same files under `reviews/infill-prices/2026-09-01-rerun2/`.

**Integrity check.** All eleven cited archives match the `archive.sha256`
recorded in the registry. The bytes audited are the bytes the registry claims.
No cited archive is a soft-404 or an error page. The two developer-portal pages
that returned the Socrata portal shell under an HTTP 200 and are byte-identical
to each other are recorded in `fetch-report.md`; they were correctly kept **out**
of the registry and neither is cited by the claim, and the claim discloses the
failure rather than hiding it. The two Socrata dataset landing pages that *are*
cited are the real pages: each carries its own `<title>` and its own dataset id
and column metadata, and they are not byte-identical to one another.

| ID | Archive | Form | sha256 |
|---|---|---|---|
| YF-EV-0036 | Alberta, Find land titles, documents or plans | HTML | match |
| YF-EV-0041 | Property Assessment Data (Historical) portal page | HTML | match |
| YF-EV-0044 | General Building Permits portal page | HTML | match |
| YF-EV-0047 | City of Edmonton, Assessment FAQ | HTML | match |
| YF-EV-0048 | 2023 Redeveloping Area Infill Annual Report | 5 pp | match |
| YF-EV-0055 | Jacob Dawang, Edmonton's $15M infill property tax dividend | HTML | match |
| YF-EV-0101 | 2024 Redeveloping Area Infill Report | 7 pp | match |
| YF-EV-0108 | StatCan table 18-10-0004-01 | HTML | match |
| YF-EV-0111 | 2025 Assessment Methodology, Residential Improved | 39 pp | match |
| YF-EV-0112 | City Plan Economic, Demographic and Market Study | 120 pp | match |
| YF-EV-0113 | Section 814 Mature Neighbourhood Overlay, webdocs | HTML | match |

**Grading.** VERIFIED = the archive, or the attributed run artifact, supports the
statement as written. IMPRECISE = the substance is supported but at least one
asserted detail is not in *that* archive, or is stated more strongly or more
loosely than the source allows; the wording the bytes do support is given.
UNSUPPORTED = the source does not contain it.

The headline result first: **every figure in the graded text reproduces exactly
against its source.** 294, 3,535, 221, 387, 3, 3, 131, 2,931, 524, 2012, 2025,
5,672, 5,668, 3,167, 247, 40, 35, 17, 18, 15, 8, 11, 1.37, 1.71, 1.89, 3.94,
1,492, 1,242, 1,182, $0.2 million, 2.5, 2.0, 1.5 and 2.9 all check. Nothing here
is an arithmetic error, and no statement is unsupported. The five imprecisions
are all of one family and one of them recurs from the last gate: a *dataset page*
is cited for something that is really *a seat's query against the dataset*, or a
document's own scope is narrowed one notch tighter than the document states.

---

## Claim: `ip-teardown-price-gap`

### KF-1 — cited YF-EV-0101 — **VERIFIED**

> "…sets a net loss of 294 single detached houses in the redeveloping area
> against 3,535 net new dwelling units there, including 221 net new semi-detached
> units, with apartments, secondary suites, backyard houses and row housing
> carrying most of the gain. No property in it is identified and no dollar figure
> is attached to any of them."

Verbatim in the archived report: "In 2024, 221 net new semi-detached units were
approved (Figure 7), the highest count in the past five years. During the same
period, there was a net loss of 294 single detached houses," and "In 2024, 3,535
net new units were approved in the redeveloping area (Figure 1)." The mix is the
report's own: "Apartment units made up about 41 per cent… Together, secondary
suites and backyard houses also made up about 40 per cent… 21 per cent of net new
units in the redeveloping area were row houses." The negative half checks
exactly: the character `$` occurs nowhere in the seven-page extraction, and
neither do "assessed", "market value", "price", "address" or "legal description".

### KF-2 — cited YF-EV-0048 — **VERIFIED**

> "The same series a year earlier, reporting on 2023 and published in 2024, counts
> what came down by dwelling type: 387 single detached houses, 3 semi-detached
> units, 3 row housing units and 131 apartment dwellings, against 2,931 net new
> units. Counts by type are the whole of it. No parcel is named, no property is
> followed and no value appears on either side."

Verbatim: "Demolitions that made way for infill housing included 387 single
detached houses, 3 semi-detached units, 3 row housing units, and 131 apartment
dwellings," and "In total, 2,931 net new housing units were approved in the
redeveloping area." "Reporting on 2023" is the report's own scope statement:
"a summary of residential infill activity… for 2023." "Published in 2024" is not
printed in the bytes; it is the registry's `published_on` and is consistent with
the report's own forward reference, "Future reporting will align to Edmonton
Zoning Bylaw 20001, which came into effect on January 1, 2024," and with
`errata.md`, where the Claude seat documents the same distinction against GPT's
`source_date`. The negatives hold: no `$`, no "assessed", no "price", no
"address" anywhere in the five-page extraction.

### KF-3 — cited YF-EV-0041 — **VERIFIED**

> "The historical assessment roll runs from the 2012 roll to the 2025 roll and
> publishes an account number, an assessment year, an address, a legal
> description, the year built and one total assessed value. It marks no
> demolition, names no replacement, splits no value into land and improvement,
> counts no dwellings inside a title and flags none of them as separately titled."

The archived page's embedded column metadata gives the complete schema, twenty-one
columns: Account Number, Assessment Year, Suite, House Number, Street Name, Legal
Description, Latitude, Longitude, Point Location, Neighbourhood, Actual Year
Built, Garage, Zoning, Lot Size, Assessed Value, and Assessment Class and
Assessment Class % 1 through 3. Assessed Value is described as "Total assessed
value for the property"; the Assessment Year cardinality list runs 2012 through
2025 with `smallest 2012` and `largest 2025`. Every negative is a real absence
from that list: no demolition field, no replacement field, no land or improvement
component, no dwelling count, no title-form flag. Address is carried as Suite,
House Number and Street Name.

One observation rather than a grade: "Three of those absent fields are the ones
this claim's valuation rules turn on" reads best as the land-and-improvement
split, the dwelling count and the separately-titled flag, and only the last two
are strictly valuation rules — the brief asks for the land and improvement split
conditionally, "Where the assessment separates land from improvement, report…".

### KF-4 — cited YF-EV-0044 — **IMPRECISE**

> "The open general building permit dataset carries an issue date, a job
> description, a work type, an address, a legal description and a units-added
> count, and no parcel or title identifier. Its coding of demolitions changed in
> 2019, so one seat built its candidate frame out of the job description text and
> returned 5,672 records… Occupancy dates are thin behind 2021, with 3,167
> populated rows for permits issued in 2021 and 247 for 2020."

The schema half is on the page and verifies exactly. The embedded column list is
PERMIT_DATE (`issue_date`), PERMIT_NUMBER ("blanked due to FOIP reasons"),
REPORT_PERMIT_DATE, YEAR, MONTH_NUMBER, JOB_CATEGORY, JOB_DESCRIPTION,
BUILDING_TYPE, WORK_TYPE, CONSTRUCTION_VALUE, FLOOR_AREA, UNITS_ADDED, ADDRESS,
LEGAL_DESCRIPTION, ZONING, NEIGHBOURHOOD_NUMBER, NEIGHBOURHOOD, BIA, LATITUDE,
LONGITUDE, LOCATION, Geometry Point and Occupancy Date, plus Row ID. No LINC, no
title number, no assessment account: "no parcel or title identifier" is a correct
negative, and `round2/claude.json` states it in terms — "there is no parcel or
title identifier". The page also corroborates that the frame is reachable from
text: JOB_DESCRIPTION's top values include "To demolish a Single Detached House."
at 1,476 and "To demolish a Single Detached House and detached Garage." at 955.

Two clauses are not in these bytes, and both are cited to them as properties of
the dataset:

- **The 2019 coding change.** The page carries a JOB_CATEGORY cardinality list
  ("Home Improvement" 61,982; "Other Miscellaneous Building" 36,702) and a
  separate YEAR cardinality list, never the two crossed. The coding change is one
  seat's tabulation, in `round1/claude.json`: "demolitions before 2019 sit under
  job category 'Other Miscellaneous Building' with work type '(99) Demolition',
  and from 2019 they sit under 'Home Improvement'… so the frame must be built
  from the job description text, not the category." It is uncontested — the GPT
  seat adopts it in `round2/gpt.json` under `evidence_i_missed` — but it is not
  something YF-EV-0044 says. This is the same defect the 2026-09-01 gate found at
  that claim's KF-3, in a milder form: there it was contested, here it is not.
- **3,167 and 247.** The archived page carries `occupancy_granted_date` with
  24,903 non-null of 245,683 rows, `smallest 2022-01-03`, and the description
  line "Residential: Permits finalized on or after January 1, 2022." It carries
  no breakdown by issue year. The two counts come from `round2/claude.json`,
  which re-queried the Socrata endpoint on 2026-09-02: "occupancy_granted_date is
  populated for 2 permits issued in 2018, 26 in 2019, 247 in 2020, 3,167 in
  2021…". `errata.md` carries the same two figures.

**Supported wording:** "…and no parcel or title identifier; its permit-number
column is blanked. One seat found that the dataset's coding of demolitions
changed in 2019 and built its candidate frame out of the job description text
instead, returning 5,672 records coded as single detached house demolitions for
2016 to 2025, 5,668 of them with a legal description… The dataset page records
that residential occupancy dates begin with permits finalized on or after
1 January 2022, and the same seat's re-query returned 3,167 populated occupancy
rows for permits issued in 2021 and 247 for 2020."

### KF-5 — cited YF-EV-0047, YF-EV-0111 — **VERIFIED**

> "Both sides of the ratio are assessed values… The City assesses annually by
> mass appraisal and calls the result an estimate of market value on July 1 of
> the preceding year, adjusted for the property's condition to December 31, which
> is a valuation and not a price anyone paid."

YF-EV-0047, verbatim: "the City must assess all property within Edmonton every
year using a mass appraisal approach", "your property's market value—the amount
it would have sold for based on mass appraisal in the open market—on July 1 of
the previous year", and "the condition of the property as of December 31."
YF-EV-0111 carries the legislated form: "Valuation Date refers to the legislated
date of July 1, 2024" and assessments represent "an estimate of the value… of the
fee simple estate in the property; as the property existed on December 31, 2024;
… as if the property had been sold on July 1, 2024". "Not a price anyone paid" is
the documents' own conditional — "would have sold for", "as if… had been sold".

### KF-6 — cited YF-EV-0036 — **VERIFIED**

> "…Alberta answers a request for a title, a registered document or a plan as a
> single order against one property, through SPIN2, ARLO or a registry agent, and
> publishes no bulk or open dataset of titles. That page carries no transfer
> price and establishes none."

The page enumerates its routes and every one is single-order: "Most titles,
documents or plans can be ordered through the Alberta Registries Spatial
Information System (SPIN2), Alberta Registry for Land Online (ARLO) or through a
registry agent"; "To get a title search, you need to know one of the following:
legal description, land identification number code (LINC number), title number";
document copies "with 9-digit registration numbers are available through SPIN2 or
through a registry agent"; "Registered plans of survey are available through
SPIN2 or through a registry agent". The negatives are exact: "bulk", "open data",
"price", "consideration" and "sold" occur nowhere in the archive, and the single
occurrence of "transfer" is "transfers of writs". The sale-to-sale sensitivity is
the brief's own, predeclared and expressly outside the verdict.

### KF-7 — cited YF-EV-0041, YF-EV-0044 — **VERIFIED**

> "One seat matched what it could and reports the results as cases… 35 of the 40
> demolished houses on the 2018 roll by exact legal description but only 17 of
> the 40 lots on the 2025 roll… Eight lots and eleven replacement dwellings came
> through with approximate constant-dollar ratios spanning about 1.37 to 3.94:
> five lots where one house replaced one house ran about 1.71 to 3.94, and
> dwellings on subdivided lots about 1.37 to 1.89 apiece."

Attributed to a seat on its face, and it reproduces exactly against
`round1/claude.json`. Single-replacement constant-dollar ratios there: Parkview
2.57, Westbrook Estates 3.94, Hazeldean 2.27, McCauley 3.14, Calder 1.71 — five
lots, range 1.71 to 3.94. Split-lot dwellings: Belgravia 1.44 and 1.44,
Pleasantview 1.84 and 1.89, Gold Bar 1.37 and 1.53 — three lots, six dwellings,
range 1.37 to 1.89. Eight lots, eleven dwellings, overall span 1.37 to 3.94. The
probe counts, the address recovery of three lots as separately titled pairs under
new plan numbers, and the 2025-roll departure are all in the same file and
restated in `round2/gpt.json`. Note the drafter kept the Calder case at 1.71 that
GPT documented the seat's own TL;DR for dropping.

### KF-8 — cited YF-EV-0055 — **IMPRECISE**

> "…an independent August 2026 analysis joining 2024 small-scale-residential-zone
> building permits to the 2024 and 2026 assessment rolls by legal description, 25
> metre proximity and address: 1,492 permits consolidated to 1,242 lots, of which
> 1,182 carried both values."

Nearly all of it is verbatim in the archive. "Published August 4, 2026." The
matching tiers: "I match on legal description (plan/block/lot) first… The first
fallback is geographic: the nearest 2024 assessment point within 25m… the civic
address usually still resolves." The counts: "Consolidating collapses 1492
permits into 1242 distinct lots… Altogether, 1182 lots (95%) end up with both a
2024 baseline and a 2026 completed value." The uplift figure is Table 2's own row
for 5+ unit rowhomes: "Per home added 67 $0.2M $0.2M", gross and net, and the RS
Zone is described as the small-scale residential zone.

What the bytes do not support is the permit window. The 1,492 permits are the
2024 **to 2026** set, not 2024 alone: the post's own subtitle is "Matching
2024–2026 building permits to City assessment data", its key number is "the
amount that small-scale infill… in the RS Zone from 2024–2026 will add", and the
consolidation is described as "spanning the full 2024–2026 timeframe: a fourplex
permitted in 2024 and its garden suite permitted in 2025, for example, are still
one lot." What is measured on the 2024 cohort is the uplift — "Measuring the
uplift: the 2024 cohort", and Table 2 is "measured from the completed 2024
cohort". The claim collapses the two, narrowing the join to a year it did not
cover. `round1/claude.json` makes the same slip ("Independent analysis of 2024
building permits in the RS zone"), so the archive is the authority here.

**Supported wording:** "…joining 2024 to 2026 small-scale-residential-zone
building permits to the 2024 and 2026 assessment rolls by legal description, 25
metre proximity and address: 1,492 permits consolidated to 1,242 lots, of which
1,182 carried both values. What it measures, on the completed 2024 cohort, is net
assessed-value uplift, a median near $0.2 million per home added on rowhomes of
five units or more."

### KF-9 — cited YF-EV-0112 — **VERIFIED**

> "A market study the City commissioned in 2019 reports that low-density infill
> developers hunt for properties priced below their neighbourhood and work the
> distance between what they pay and what the neighbourhood's top quartile sells
> for."

Verbatim, and the "low-density" qualifier is the study's own: "key factors
related to site selection with respect to low density infill development.
Specifically: • … o Land values… developers actively seek out properties that are
undervalued relative to the surrounding neighbourhood – effectively identifying
future margin. In general, when selecting sites for infill, the differential
between initial purchase price and the top quartile selling price in a
neighbourhood is given far more weight than the neighbourhood itself." The cover
carries "Watson & Associates Economists Ltd… May 2, 2019… City of Edmonton" and
"This technical study was initiated to inform the development of The City Plan",
which is the commissioning. The seat attribution is `errata.md` under Gemini:
"establishes a mechanism and a directional gap, not the 2.5x magnitude or the
2.0x majority threshold this proposition requires."

### KF-10 — cited YF-EV-0113 — **VERIFIED**

> "The archived consolidation of section 814 of Zoning Bylaw 12800 carries the
> Overlay's purpose and the RF1 to RF5 site-zoning condition it applied under,
> and one seat documented that the page does not by itself verify the appendix
> boundary as it stood on 2023-12-31."

Verbatim: "814.1 General Purpose: The purpose of this Overlay is to regulate
residential development in Edmonton's mature residential neighbourhoods…" and
"814.2 Area of Application: This Overlay applies to all Sites zoned RF1, RF2,
RF3, RF4 and RF5 within the areas shown on the Appendix to this Overlay." The
negatives hold: "Appendix" occurs twice and never as a map or a parcel list, and
"repeal" and "2023" occur nowhere. The seat documentation is `round2/gpt.json` and
`errata.md`: "the archived webdocs citation establishes the overlay's purpose and
zoning-based area of application, but does not by itself verify the Appendix
boundary or the consolidation in force on 2023-12-31." 2023-12-31 as the frozen
date is the brief's.

### KF-11 — cited YF-EV-0108 — **VERIFIED**

> "The deflator is published and holds no property value. Statistics Canada's
> monthly Consumer Price Index table offers census-metropolitan-area geography,
> and the Edmonton July figures read off it are what put both sides of a pair
> into constant July 2025 dollars."

The archive is table 18-10-0004-01, "Consumer Price Index, monthly, not
seasonally adjusted", "Frequency: Monthly", "Release date: 2026-08-17",
"Geography: Canada, Province or territory, Census subdivision, Census
metropolitan area, Census metropolitan area part". The sentence claims what the
table *offers*, which is what the page carries, and attributes the Edmonton
values to a read of the table rather than to the archived view — correctly, since
the string "Edmonton" does not occur anywhere in these bytes and the July series
is in `round1/claude.json`, "retrieved through the StatCan Web Data Service"
(v41692918, July 2015 through July 2026). The base period is the brief's: July
2025. "Holds no property value" is right for an all-items consumer price index.

### Limitations 1 to 12 — **VERIFIED (12 of 12)**

- **1** ("no conforming population series was produced in this run or located in
  a published source, not that the arithmetic would come out small"). All three
  round-2 files say exactly this; `round2/gpt.json`: "This is not evidence that
  the ratios are small."
- **2** (the replaced version, its majority test, its Not established finding,
  the editor's later judgement, the re-brief). The published version at commit
  `3636ae9` asked "is the housing built in its place worth more than the house
  that came down?", finding Not established; `2026-09-01-rerun2/synthesis.json`
  carries that run's majority share with bounds (62.0 percent, 42.6 to 73.8) and
  its median ratio 1.222 reported alongside. The editor's judgement is
  `framing/editorial-note.md` and `intake.md`.
- **3** (2.5 and "better than half… 2.0", alternatives 2.0 and 1.5, met only on
  the lower bound and failed only on the upper). `brief.md` verbatim on all four
  figures and: "A threshold counts as met only where the lower bound meets it,
  and counts as failed only where the upper bound fails it." *Observation, not a
  grade:* the brief's word throughout is "median"; "the midpoint of the ratio
  spread" is the drafter's plain-English rendering of it, used consistently in
  the claim and the story.
- **4** (no conforming series from this run; one seat's 40-permit probe; the
  other two reporting none in print; an earlier run's non-conforming proxy).
  `round1/claude.json`, `round1/gpt.json`, `round1/gemini.json`, and the 6,603
  classified units at median 1.222 in `2026-09-01-rerun2/synthesis.json`.
- **5** (2025 roll instead of first full roll; up to five years of movement; one
  seat documented it; CPI removes general inflation only). `errata.md` under
  Gemini, and `round1/claude.json` limitations 1 and 2.
- **6** (candidate rather than validated frame; job-description text; garage-only
  admissions; semi-detached and other demolitions left out). `round2/gpt.json`
  and `errata.md` under GPT, plus `round1/claude.json` limitation 3.
- **7** (the seats disagreed about what the record cannot do, not about the
  finding). `round2/claude.json`: "I disagree… with the implication in both
  reviews that the record cannot yield the series. It can. Someone has to build
  it," against `round1/gemini.json`'s "requires bespoke scripting… which does not
  exist as an authoritative public report."
- **8** (one seat's round-one review cited nothing; two others documented it).
  `round1/gemini.json` has `supporting_evidence: []`, `challenging_evidence: []`
  and no URL anywhere; both `round2/claude.json` and `round2/gpt.json` document
  it, and `errata.md` records both.
- **9** (eighteen of the 35, three recovered by address, linkage risk only).
  `round1/claude.json` gives 35 on the 2018 roll and 17 on the 2025 roll, and the
  three recovered lots all carry 2018-roll values there, so they are inside the
  35. `round2/gpt.json` supplies "a matching risk rather than its population
  incidence". *Note:* the eighteen is 35 − 17 and assumes all seventeen 2025-roll
  matches lie inside the thirty-five; nothing in the artifact contradicts that,
  and the story makes the subtraction visible.
- **10** (two developer-portal pages, HTTP 200, byte-identical, not ingested, not
  cited). `fetch-report.md`, including the shared sha256; and neither URL appears
  in the claim's evidence list.
- **11** (the $350,000 to $1,000,000 example: no captured source, no verdict).
  `intake.md` on provenance and `brief.md`: "The two round numbers are not
  cutoffs and are not the test."
- **12** (no cohort-level public source for sale prices, asking prices, contract
  rents, tenure, bedroom counts or fire and safety-order flags).
  `round1/claude.json` limitation 7 carries the first five including bedroom
  count; the fire-order and safety-order gap is in both seats' unknowns.

### Unknowns 1 to 7 — **VERIFIED (7 of 7)**

Each is carried as an unknown by at least one seat and contradicted by none. The
median and both shares with bounds (all three seats); the frame's true membership
once garage-only records are struck and semi-detached demolitions added
(`round2/gpt.json`); dwelling counts and title structure per replacement
(`round1/gpt.json`, `round1/claude.json`); the frequency and direction of
legal-description linkage loss (`round2/gpt.json`); the by-year distribution and
the Bylaw 20001 rowhome shift (`round1/claude.json` unknown 2); the frozen
2023-12-31 subset and the redeveloping-area result (both); tenure, rent and
displacement (both).

### Missing evidence 1 to 8 — **7 VERIFIED, 1 IMPRECISE**

Items 1 to 7 match the seats' `missing_evidence` entries in substance, holder and
importance: the matched series with the freeze date 2026-09-02 (critical); the
reproducible demolition frame with garage-only records excluded (GPT round 1,
critical); parcel and title lineage through Alberta Land Titles and AltaLIS (GPT
round 1, critical); pre-2021 completion and occupancy dates (critical in this run
after `round2/claude.json` found the permit record unusable for 2016 to 2020);
verified dwelling counts and the land and improvement split (high); arm's-length
sale prices for the sale-to-sale sensitivity (high, and "Alberta Land Titles at
Service Alberta" matches YF-EV-0036's own "Lead ministry: Service Alberta and Red
Tape Reduction"); the section 814 appendix boundary as a parcel-level layer
(moderate).

**Item 8 — IMPRECISE.**

> "Prior tenure, prior rent, tenant notices and any recorded displacement for the
> demolished houses. No public holder compiles these…"

The artifacts establish that no public holder was *identified*, not that none
exists. `round1/claude.json`: "No public holder identified." `round2/gpt.json`:
"no complete public registry was identified." The universal negative is the
drafter's. The GPT faithfulness seat raised the same point at `gpt-2.md` item 11
and it is the one item that check left open.

**Supported wording:** "…No public holder for these was identified (property
owners and tenants, City of Edmonton; moderate)."

---

## Story: `infill-prices`

### `one_line` — **VERIFIED**

> "No conforming Edmonton series matches demolished houses to what replaced them,
> so the price gap is Not established; an earlier run left affordability there
> too."

Both findings check: `synthesis.json` for this run gives Not established /
Unanimous on `ip-teardown-price-gap`, and `src/content/claims/ip-infill-affordable.yaml`
carries Not established against run `2026-09-01-rerun2`. "Conforming" is the
scope all three round-2 files use.

### TL;DR 1 — **VERIFIED**

The four figures and their ordering are the brief's, and the "fixed before anyone
looked" framing is the brief's own: "All four figures are judgements. They are
fixed here, before any result is consulted, and may not be changed after the
results are seen." Same midpoint-for-median observation as limitation 3.

### TL;DR 2 — **VERIFIED**

> "…no conforming series… was produced in this run or found in print. What the
> City does publish is the churn: 294 detached houses lost on net in the
> redeveloping area in 2024 against 3,535 net new units, and 524 dwellings
> demolished the year before."

294 and 3,535 are verbatim in YF-EV-0101. 524 is the sum of YF-EV-0048's own four
counts, 387 + 3 + 3 + 131, and the bullet says "dwellings", which is the right
noun for that total — the trap the 2026-09-01 gate flagged when an earlier draft
called 390 "teardowns" is avoided here.

### TL;DR 3 — **VERIFIED**

> "Permits going back a decade carry legal descriptions, rolls going back to 2012
> carry values against the same descriptions. What the rolls withhold is the
> land-and-improvement split, how many dwellings share a title and which of them
> stand alone on one, and permits mostly stop recording occupancy before 2021."

The permit dataset's description carries "All records start from January 1,
2009"; LEGAL_DESCRIPTION is in its column list; the roll's Assessment Year runs
2012 to 2025 with Legal Description and one Assessed Value. The three withheld
fields are real absences from the roll's schema. The occupancy clause is
supported on both sides: the dataset page's own "Residential: Permits finalized
on or after January 1, 2022" and `smallest 2022-01-03`, and `round2/claude.json`'s
issue-year counts. Unlike KF-4 this bullet asserts no year-by-year figures, so it
needs no attribution.

### TL;DR 4 — **VERIFIED**

Eight lots, eleven replacement dwellings, 1.37 to 3.94, 40 permits from a single
month, 2025 roll rather than first full year: all as at KF-7, and attributed to
"one seat" on its face.

### TL;DR 5 — **SKIPPED** (affordability only; gated 2026-09-01, unchanged)

### Changelog, 2026-09-02, magnitude re-run — **VERIFIED**

> "The brief fixed two figures before any result was seen… All three seats
> returned Not established in both rounds, no seat moved its verdict, and the
> finding is unchanged. Confidence moved without moving any verdict: the Claude
> and GPT seats from Moderate to High, the Gemini seat from High to Moderate. The
> claim record… now come from reviews/infill-prices/2026-09-02-magnitude under
> methodology v1.10; the affordability claim was not re-run… Faithfulness check:
> pending. Gate audit: pending."

Every verdict and confidence value checks against `synthesis.json` and the six
round files; all three `verdict_changes` arrays are empty, and `errata.md` says
so in terms. The claim's `review_run` and `methodology_version` fields match. The
affordability exclusion is `intake.md`: "Claim 2, `ip-infill-affordable`, is not
re-run here… Its published finding stands." "Pending" is accurate as written:
this gate audit is the first, and the faithfulness check's second GPT pass
(`faithfulness/gpt-2.md`) still returns REVISE on one item, the same item graded
IMPRECISE at missing evidence 8 above.

### Changelog, 2026-09-02, editorial note — **VERIFIED**

> "…a majority test asking whether over half the replacement dwellings came in
> above the old house… Four framing-check reports and an escalation neutralised
> that out of the brief and the editor adopted each step. The founder, reading
> the published page, called it 'that's poor claim to make'… Recorded against the
> framing check and the editor in the panel quality ledger; the check now tests
> for this failure (methodology v1.10)."

The majority test is the replaced claim's, verified at limitation 2. "Four
framing-check reports and an escalation" is exactly what `reviews/infill-prices/2026-09-02/framing/`
holds — `check-1.md` through `check-4.md` plus `escalation.md` — and the same
phrasing is the panel quality ledger's own in `methodology/changelog.yaml` under
v1.10. "The editor adopted each step" is `escalation.md`: "As editor, Stew adopts
resolutions 1 to 8 above as written." The quotation is verbatim in both
`framing/editorial-note.md` and `intake.md`, with the apostrophe and the missing
article intact, which is the fix the GPT faithfulness seat asked for.

*Observation, not a grade:* `framing/editorial-note.md` and `intake.md` describe
the same narrowing as "five framing-check rounds and three runs", and the three
earlier runs between them hold ten check reports. The story's count is the first
2026-09-02 run's alone. Both statements are true of what they count; they are not
counting the same thing, and a reader moving between the note and the story will
notice.

### Body — 17 statements, **15 VERIFIED, 2 IMPRECISE**

**VERIFIED.** The opening quotation and its provenance (`intake.md`); the
editor's magnitude judgement (`framing/editorial-note.md`); "Two briefs, each
frozen before its panel ran… Both came back Not established" (both claim files,
and `brief.md`'s exclusion of affordability); the whole of "How 'about triple' was
made testable", including "The quoted example works out near 2.9, which is where
2.5 comes from" against `brief.md`'s "$350,000 and $1,000,000, which is a ratio
of about 2.9"; "Neither figure could be worked out, under either reading";
the churn paragraph, where "524 dwellings pulled down the year before, 387 of
them detached houses" is YF-EV-0048's tally and "Neither one attaches money to a
property" is the `$`-free negative in both reports; "A decade of building permits
carries legal descriptions… One seat pulled roughly 5,672 permit records"; the
roll bullet, against YF-EV-0041's column list; the price bullet — YF-EV-0111
establishes that sale prices attach to registered land-title transactions ("The
City of Edmonton validates all land title transactions (sales)… uses the date the
legal title transfer was registered at the Land Titles Office as the sale date"),
and YF-EV-0036 establishes the one-at-a-time, no-bulk half; the eight-lots
section entire, including "so 18 exact matches failed", "The other fifteen were
not run down, so this is a linkage risk and not a measured bias", the form split,
and "The seat said as much, and the other two said it again in cross-review"
(`round2/gpt.json` on the convenience sample, `errata.md` under Gemini on the
2025 roll); the Dawang paragraph, whose figures and non-convertibility
qualification both check; and "The $350,000 to $1,000,000 example was never
tested."

**IMPRECISE — "The permit stream changed how it labels a demolition in 2019, so
the records have to be found by reading job descriptions rather than by filtering
on a category, and some rows filed under a house turn out to describe a garage."**
Second instance of the KF-4 defect, and here with no attribution at all. The
story attributes seat work elsewhere — "One seat pulled roughly 5,672 permit
records", "One seat tried the join on 40 permits" — so the bare assertion reads
as a property of the dataset. **Fix:** "One seat found that the permit stream
changed how it labels a demolition in 2019, so the records have to be found by
reading job descriptions rather than by filtering on a category, and that some
rows filed under a house turn out to describe a garage."

**IMPRECISE — "the archived office consolidation of that section carries the
zoning condition without settling where the appendix ran at the end of 2023".**
The substance is right and matches KF-10. The document type is not. The string
"consolidation" occurs zero times in YF-EV-0113's archived bytes; the registry
titles it "webdocs consolidation" and `round1/claude.json` calls it "the webdocs
online consolidation", saying in terms "I could not open the 65 MB archived PDF
to confirm its consolidation date." The office consolidation of Bylaw 12800 is a
different artefact, YF-EV-0102 from the 2026-09-01 run, and this claim does not
cite it. **Fix:** "the archived webdocs consolidation of that section", and drop
or re-point the `<Term t="office consolidation">` gloss, which currently labels
the wrong document.

### Affordability section and opening clause — **SKIPPED**

"The affordability test, and where the panel split" entire, the closing two
paragraphs, and the "hypothetical Edmonton household on the median income,
buying" clause in the opening: gated on 2026-09-01 against run
`2026-09-01-rerun2`, unchanged in this run, and outside this audit's scope.

A diff against the version that passed that gate (commit `3636ae9`) shows exactly
one change in this material, the utility-allowance sentence, made under the
`$4,532` attribution repair `errata.md` records. It is now more accurate than the
wording that passed, and it verifies: the archive behind it, YF-EV-0107, still
hashes clean against the registry, carries "Water, fuel and electricity" and 64
occurrences of "Canada", and contains neither "Alberta" nor 4,532 anywhere — so
"the archived copy of that table carries the Canada geography only, so the
Alberta average behind the allowance is the run's own read of the table rather
than a figure in the archived bytes" is what the bytes support, and it is
substantially the supported wording the 2026-09-01 audit's second pass asked for.
Nothing else in the affordability material moved.

---

## Collateral checks

**YF-EV-0044's `establishes` line is stale and contradicts this run.** It reads
"Establishes that house demolitions largely drop out of this stream after 2018,
so the brief's predeclared frame — all residential demolition permits 2016 to
2025 — cannot be reconstructed from it for most of that window." That is the same
assertion the 2026-09-01 gate found UNSUPPORTED at that claim's KF-3 and required
repaired in the parallel entry YF-EV-0094, and this run's own record contradicts
it: `round1/claude.json` returns 451, 516, 590, 622, 511, 645 and 690 house
demolition permits for 2019 through 2025, and `round2/claude.json` concludes the
opposite, that the record can yield the series. Nothing in the claim or the story
now rests on this line — KF-4 makes no fall-off assertion — but the entry should
be brought into line with its own archived bytes, which carry a schema, a dataset
description and cardinality lists and no annual demolition counts at all.
Recommended: "The general building-permit record the City publishes, by work type
and year. Establishes the fields available for a demolition frame — issue date,
job category, job description, work type, units added, address and legal
description — and that the dataset carries no parcel or title identifier."

**YF-EV-0055's extended `establishes` line inherits KF-8's window.** It now
carries 1,492, 1,242 and 1,182, which is the repair `errata.md` records, and it
does not date the permits, so it is not itself wrong. If KF-8 is fixed as above,
adding "2024 to 2026 permits" here would keep the two in step.

**The two 2026-09-02 registry corrections check out.** Only `establishes` text
changed in YF-EV-0049 and YF-EV-0055; both archives still hash clean against
their recorded `sha256`, and no `path`, `url`, date or rights field moved.

**The freshness audit, the framing record and the run metadata are consistent.**
`run.yaml` records six seat runs, three per round, with prompt hashes, CLI
versions and effort; `framing/check-2.md` reads "FRAME OK"; `disagreements.json`
is empty and `synthesis.json` records `basis: round1` with `round2_documented:
true`, which is what a run with no material framing concern and no verdict
movement should look like.

---

## Counts

| | Claim | Story | Total |
|---|---|---|---|
| Statements graded | 38 | 24 | **62** |
| VERIFIED | 35 | 22 | **57** |
| IMPRECISE | 3 | 2 | **5** |
| UNSUPPORTED | 0 | 0 | **0** |
| Skipped (affordability, gated 2026-09-01) | — | 4 | **4** |

The five imprecisions are four distinct defects. Two are the same fact in two
places — the 2019 change in how the permit dataset codes demolitions, asserted as
a property of the dataset page in the claim's KF-4 and unattributed in the story's
"Why it is unbuilt" bullet, when it is one seat's tabulation that a second seat
adopted. The other three are each their own: the Dawang join narrowed from a 2024
to 2026 permit set to a 2024 one; a webdocs consolidation called an office
consolidation; and a universal negative about tenancy records where the artifacts
support only "none was identified".

## Verdict

**GATE FAIL.**

Zero unsupported, which is where this claim's last audit needed three passes to
land, and the two defects that failed it then — a dataset page cited for a seat's
tabulation of the dataset, and a land-title page cited for prices it does not
carry — are handled correctly in the claim's KF-6 and in the story's price
bullet. The five imprecisions are all repairable in a single pass and none of them
touches the finding: the demolition frame is candidate records either way, the
Dawang analysis measures uplift and not the ratio either way, and no tenancy
series was found either way.

Two of the five have already been raised inside the run and should be fixed
together with the rest: missing evidence 8 is `faithfulness/gpt-2.md` item 11,
still open at REVISE, and the KF-4 attribution is the same failure mode the
2026-09-01 audit named for the next run. Worth naming again here, since it has
now recurred across two runs: **an open-data portal page establishes a dataset's
schema, its description and its value cardinalities — it never establishes what a
query against that dataset returns.** Every count a seat computes from the rows
belongs to the seat and must be attributed to it, however uncontested it is.

A second pass need only re-read the five statements above.

---

## Second pass, 2026-09-02

Scope: the five statements flagged above, in the wording now in the tree, plus
the two registry `establishes` lines the drafter reworded while applying the
fixes. Same method, same archives, same run artifacts, no web access. All four
archives touched here rehash clean against their registry entries: YF-EV-0044
`2c23c8f1…`, YF-EV-0094 `dab7b865…`, YF-EV-0055 `0dde83a5…`, YF-EV-0113
`02e06211…`.

### KF-4, `ip-teardown-price-gap` key fact 4 — **VERIFIED**

The two clauses that were asserted as properties of YF-EV-0044 now carry their
seat. "One seat found that the dataset's coding of demolitions changed in 2019
and built its candidate frame out of the job description text instead" matches
`round1/claude.json` in substance and in the direction of the finding, and the
5,672 / 5,668 pair is that seat's own count. "The dataset page records that
residential occupancy dates begin with permits finalized on or after 1 January
2022" is verbatim page text — "Residential: Permits finalized on or after
January 1, 2022." — and is now the only occupancy fact laid at the page's door.
The 3,167 and 247 are attributed to "the seat that built the frame re-queried
the endpoint", which is right: `round2/claude.json` records the 2026-09-02
re-query, and it is the same seat as the round-one frame. The schema half and
the blanked permit-number column verify against the page's embedded column
payload as before.

### KF-8, key fact 8 — **VERIFIED**

The permit window is now the archive's own. "2024 to 2026
small-scale-residential-zone building permits" matches the post's subtitle
("Matching 2024–2026 building permits to City assessment data"), its key number
("in the RS Zone from 2024–2026") and its consolidation note ("spanning the full
2024–2026 timeframe"). The three counts stay verbatim — "Consolidating collapses
1492 permits into 1242 distinct lots… Altogether, 1182 lots (95%) end up with
both a 2024 baseline and a 2026 completed value." The uplift clause is correctly
pinned to the narrower cohort: Table 2 is titled "measured from the completed
2024 cohort" and its row reads "Per home added 67 $0.2M $0.2M", so "a median
near $0.2 million per home added on rowhomes of five units or more" holds for
net as well as gross. The non-convertibility sentence is `round2/gpt.json`
verbatim in substance ("cannot be converted into one without the missing
baseline and denominator").

### Missing evidence 8 — **VERIFIED**

"The run identified no complete public registry or source for these" is the
artifacts' own scope: `round2/gpt.json` "no complete public registry was
identified", `round1/claude.json` "No public holder identified." The universal
negative is gone, and the holder parenthesis matches both seats' holder fields.
This closes `faithfulness/gpt-2.md` item 11.

### Story, the "Why it is unbuilt" bullet — **VERIFIED**

Now "One seat found that the permit stream changed how it labels a demolition in
2019… and that some rows filed under a house turn out to describe a garage" —
the attribution the claim carries, in the same seat's voice, matching
`round1/claude.json`. The bullet's second sentence, that occupancy dates thin
out badly before 2021, sits inside that seat's bullet and is that seat's
re-query result; it reads as attributed in place. Nothing in this bullet is now
laid at the dataset page's door.

### Story, the webdocs sentence and the mirrored Dawang sentence — **VERIFIED**

The section 814 sentence reads "the archived webdocs consolidation of that
section", and the `<Term>` gloss it carries is now `webdocs consolidation`,
defined in `src/lib/glossary.ts` as the City's own web copy of a bylaw section
served from webdocs, carrying the section text only. That matches the registry
title, `round2/claude.json` ("the webdocs online consolidation"), and the
archived bytes, which carry the 814.1 purpose, the 814.2 RF1-to-RF5 area of
application and two bare references to an Appendix with no map. The wrong
document type is gone; YF-EV-0102 is no longer implicated.

The Dawang sentence in the story no longer asserts a permit window at all — "an
independent August 2026 analysis that matched 1,242 lots and got values at both
ends on 1,182 of them" — so the narrowing that failed the claim's version cannot
recur here. "August 2026" matches "Published August 4, 2026", and "a median near
$0.2 million per home added on the larger rowhomes" is Table 2's 5+ unit rowhome
row, on the completed 2024 cohort the sentence names.

### Registry lines

**YF-EV-0044 — VERIFIED.** The `establishes` line now claims only schema,
coverage and a correct negative: "All records start from January 1, 2009" is
verbatim; WORK_TYPE, JOB_CATEGORY, JOB_DESCRIPTION, UNITS_ADDED, ADDRESS,
LEGAL_DESCRIPTION and YEAR are all in the embedded column list; "To demolish a
Single Detached House." is a top JOB_DESCRIPTION value at 1,476; and no LINC,
title number or assessment account appears anywhere in the payload. It asserts
no count and no query result.

**YF-EV-0094 — VERIFIED.** Same page, second capture. The field list, the 2009
coverage note and the page's update stamp are all in the bytes, as are
BUILDING_TYPE, UNITS_ADDED and the Occupancy Date note. The added clause —
"whether recorded house demolitions thin out after 2018 is a seat's tabulation
of the data, not something the page carries" — is a correct negative: the page
carries JOB_CATEGORY and YEAR cardinalities separately and never crossed, and no
demolition series by year. "The archived bytes are the portal page, not the
permit rows" is exactly right.

### Counts

| | Claim | Story | Total |
|---|---|---|---|
| Statements graded | 38 | 24 | **62** |
| VERIFIED | 38 | 24 | **62** |
| IMPRECISE | 0 | 0 | **0** |
| UNSUPPORTED | 0 | 0 | **0** |
| Skipped (affordability, gated 2026-09-01) | — | 4 | **4** |

Registry lines re-read: 2 of 2 verified.

`npm run validate` passes: 5 stories, 8 claims, 1 commitment, 6 topics, 113
evidence entries.

### Verdict

**GATE PASS.**

All five imprecisions are repaired at the source rather than papered over, and
the two repairs that changed a fact rather than an attribution — the Dawang
permit window and the document type behind section 814 — moved toward the
archive, not away from it. The rule the first pass named holds in the reworded
registry lines: YF-EV-0044 and YF-EV-0094 now establish the dataset's schema,
description and cardinalities and nothing about what a query returns, and every
count computed off the rows is carried by the seat that computed it.
