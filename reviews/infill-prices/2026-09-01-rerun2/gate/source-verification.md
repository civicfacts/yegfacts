# Source verification — infill-prices

Gate stage 7, AI-automatable portion. Run date 2026-09-01 (story run
`2026-09-01-rerun2`). Auditor: Claude (Opus) audit session, separate from the
drafting session.

**Method.** Every `key_fact` in `src/content/claims/ip-teardown-price-gap.yaml`
and `src/content/claims/ip-infill-affordable.yaml`, every `limitation`,
`unknown` and `missing_evidence` line in both, and the `one_line`, five TL;DR
bullets and every fact-bearing body sentence in
`src/content/stories/infill-prices.mdx` were checked against the archived bytes
of the cited evidence only. No web access was used. Registry entries under
`evidence/registry/YF-EV-*.yaml` gave the `archive.path`; HTML archives were
stripped to text, and the Socrata and Statistics Canada shells were additionally
read through their embedded JSON, which is where the column lists, dataset
descriptions and release metadata actually live. PDFs were extracted with
`pypdf` (`pdftotext`, `mutool` and `qpdf` are not installed); all eight
extracted cleanly, including the 1,402-page consolidated Bylaw 12800. Where a
statement is attributed to a run artifact, it was checked against
`reviews/infill-prices/2026-09-01-rerun2/round1/claude.json`, `round2/gpt.json`,
`errata.md`, `fetch-report.md`, `intake.md` or `run.yaml`.

**Integrity check.** All 36 cited archives match the `archive.sha256` recorded
in the registry. The bytes audited are the bytes the registry claims. No cited
archive is a soft-404 or an error page: the four URLs that returned wrong
content under an HTTP 200 (two Census Profile pages, two Socrata foundry pages)
are recorded in `fetch-report.md` and were correctly kept **out** of the
registry, so nothing in the published text rests on them. Both claims and the
story disclose the Census failure rather than hiding it.

| ID | Archive | Form | sha256 |
|---|---|---|---|
| YF-EV-0036 | Alberta, Find land titles, documents or plans | HTML | match |
| YF-EV-0037 | CMHC, Introducing the Housing Hardship Concept | 7 pp | match |
| YF-EV-0039 | CMHC, Methodology for Rental Market Survey | HTML | match |
| YF-EV-0040 / 0098 | Property Assessment Data (current year) portal page | HTML | match |
| YF-EV-0041 / 0099 | Property Assessment Data (historical) portal page | HTML | match |
| YF-EV-0042 / 0095 | Development Permits portal pages | HTML | match |
| YF-EV-0046 | City of Edmonton Historical Tax Rates | 1 p | match |
| YF-EV-0047 | City of Edmonton, Assessment FAQ | HTML | match |
| YF-EV-0048 | 2023 Redeveloping Area Infill Annual Report | 5 pp | match |
| YF-EV-0049 | 2024 Monitoring Market Housing Affordability Report | 14 pp | match |
| YF-EV-0050 | City of Edmonton Affordable Housing Guidebook | 72 pp | match |
| YF-EV-0053 | Taproot Edmonton, City to analyze how infill impacts property values | HTML | match |
| YF-EV-0054 | Canada Gazette II, SOR/2025-55 | HTML | match |
| YF-EV-0055 | Jacob Dawang, Edmonton's $15M infill property tax dividend | HTML | match |
| YF-EV-0059 | StatCan table 11-10-0190-01 | HTML | match |
| YF-EV-0090 | City of Edmonton, Assessment of Properties | HTML | match |
| YF-EV-0091 | Bank of Canada, Changes to publication of interest rate statistics | HTML | match |
| YF-EV-0092 | Bank of Canada Valet, series V80691335 | JSON | match |
| YF-EV-0093 | CMHC mortgage loan insurance cost | HTML | match |
| YF-EV-0094 | General Building Permits portal page | HTML | match |
| YF-EV-0096 | Mature Neighbourhoods portal page | HTML | match |
| YF-EV-0097 | Property and Education Tax Rates portal page | HTML | match |
| YF-EV-0100 | City of Edmonton, Zoning Bylaw | HTML | match |
| YF-EV-0101 | 2024 Redeveloping Area Infill Report | 7 pp | match |
| YF-EV-0102 | Zoning Bylaw 12800, office consolidation Dec 2023 | 1,402 pp | match |
| YF-EV-0103 | Report UPE02698, Zoning Bylaw 20001 one-year review | 12 pp | match |
| YF-EV-0104 | REALTORS Association of Edmonton, July 2026 release | HTML | match |
| YF-EV-0105 | CMHC absorbed unit prices, Edmonton CSD | HTML | match |
| YF-EV-0106 | StatCan Census Dictionary, shelter-cost-to-income ratio | HTML | match |
| YF-EV-0107 | StatCan table 11-10-0222-01 | HTML | match |
| YF-EV-0108 | StatCan table 18-10-0004-01 | HTML | match |
| YF-EV-0109 | StatCan table 18-10-0205-01 | HTML | match |
| YF-EV-0110 | StatCan classification, 30% or more of income on shelter | HTML | match |

**Grading.** VERIFIED = the archive supports the statement as written.
IMPRECISE = the archive supports the substance but at least one asserted detail
is not in *that* archive, or is stated more strongly or more loosely than the
archive allows; the wording the bytes do support is given. UNSUPPORTED = the
archive does not contain it.

The headline result first: **every computed figure in the published text — 62.0
percent, 6,603, 1.222, 42.6 and 73.8, 2,995.6, 9,598.6, 3,244, 93.2, 99.6, 71.7,
88.4, 3,359, 2,968, 3,584, 82.8, 89.1, $638,000, $3,948, $377.67, 80.9, 49.1 —
reproduces exactly against `round1/claude.json`, and every figure attributed to
a document reproduces exactly against that document's bytes.** Nothing here is
an arithmetic error. The one hard failure is an attribution problem: a claim
about what a *dataset* shows that is really a claim about what a *seat's
tabulation of the data* shows, and that another seat expressly documented as not
established. The imprecisions cluster in one recognisable place: Statistics
Canada and open-portal landing pages are cited for the series they *offer*, as
though they carried the series values.

---

## Claim: `ip-teardown-price-gap`

### KF-1 — cited YF-EV-0101 — **VERIFIED**

> "…reports a net loss of 294 single detached houses in the redeveloping area
> and concludes that other built forms are replacing the detached houses that
> come down. It carries no matched price or assessed-value comparison…"

Verbatim in the archived report: "During the same period, there was a net loss
of 294 single detached houses," and "Net new apartment units as well as row
houses with secondary suites have been slowly replacing single detached houses."
The negative half checks too: the strings `$`, "assessed", "market value" and
"price" occur nowhere in the seven-page extraction.

### KF-2 — cited YF-EV-0048 — **VERIFIED**

> "The same series for 2023 publishes aggregate demolition counts by dwelling
> type, on the order of 390 houses that year. Aggregate counts are all it
> carries…"

The archive tallies by type exactly: "Demolitions that made way for infill
housing included 387 single detached houses, 3 semi-detached units, 3 row
housing units, and 131 apartment dwellings." 387 + 3 = 390 houses. No `$`, no
"assessed" and no property identifier appears anywhere in the report, so "no
permit-level cohort, no property identifiers, and no values or prices" holds.
Worth noting for the story grade below: the *house* subtotal is 390; the total
dwellings demolished is 524.

### KF-3 — cited YF-EV-0094, YF-EV-0042 — **UNSUPPORTED**

> "The record of house demolitions largely drops out of the City's open general
> building permit stream after 2018, so the brief's predeclared frame … cannot
> be reconstructed from it for most of that window."

YF-EV-0094's archived bytes are the Socrata landing page for General Building
Permits. They carry the dataset description — "List of issued building permits …
Note - All records start from January 1, 2009" — the full field list
(`JOB_CATEGORY`, `WORK_TYPE`, `UNITS_ADDED`, `LEGAL_DESCRIPTION`,
`Occupancy Date`), the creation date and the row-update timestamp. They carry no
annual demolition counts and nothing at all about a post-2018 fall-off. The
underlying observation — "house demolition records in this dataset fall from 370
in 2018 to under 30 a year from 2019" — appears only in the Claude seat's own
`establishes` line in `round1/claude.json`, and the GPT seat documented against
it in round 2, recorded in `errata.md`: "the post-2018 under-capture of teardowns
is plausible but not established by falling demolition-description counts set
against a separate total of approved dwelling units, which have a different
denominator."

So the sentence states as a property of a published dataset page something that
is one seat's contested tabulation. **Fix:** attribute it, in the same way the
claim's own limitation 2 already does — "one seat's tabulation of the general
building permit records finds house demolitions falling away after 2018" —
rather than sourcing it to YF-EV-0094 as a fact the dataset page carries.

The second half of the key fact is fine. "The development permit stream,
published from 2019 onward" is VERIFIED: YF-EV-0042's archived page is titled
"Development Permits from 2019 to present."

### KF-4 — cited YF-EV-0099, YF-EV-0041 — **VERIFIED**

> "The historical assessment roll publishes account, assessment year, address,
> legal description, coordinates, year built, lot size and total assessed value.
> It carries no land and improvement components, no count of dwellings within a
> title and no separately titled flag…"

The archived page's embedded column list is, in order: Account Number,
Assessment Year, Suite, House Number, Street Name, Legal Description, Latitude,
Longitude, Point Location, Neighbourhood, Actual Year Built, Garage, Zoning, Lot
Size, Assessed Value, Assessment Class 1–3 and their percentages. Every field
the key fact names is there and every field it says is absent is absent. The
same bytes carry the dataset description: "the historical assessed value of
properties within the City of Edmonton … effective from 2012-01-01 until
2025-12-31."

### KF-5 — cited YF-EV-0047, YF-EV-0090, YF-EV-0036 — **IMPRECISE**

The assessment half is verified twice over. YF-EV-0047: "The Government of
Alberta legislates that the City must assess all property within Edmonton every
year using a mass appraisal approach. The assessed value … is your property's
market value … on July 1 of the previous year," and "information on any physical
changes recorded up to last December 31." YF-EV-0090 says the same and adds "it
is adjusted for any changes in physical condition recorded by December 31."
"Rather than a transaction price" is carried by YF-EV-0047's own caution:
"Depending on the time of the year you purchased your property, the sale price
could be either higher or lower than the assessment."

The land-title half is not carried:

> "Arm's-length sale prices exist in Alberta's land-title registry, obtainable
> parcel by parcel for a fee, and are not published as a bulk or open dataset."

YF-EV-0036 contains no occurrence of "price", "consideration", "purchase",
"sold" or a search fee. It enumerates what a title *does* identify — "the current
owner, mortgages, caveats, easements, builders' liens, other registered
interests" — and sale price is not on that list. What the bytes support is the
retrieval mechanism only: "Most titles, documents or plans can be ordered through
… (SPIN2), (ARLO) or through a registry agent," and "you can search and pay for
titles with a Plan, Block, Lot; title number and (LINC) number." **Fix:** state
what this archive establishes — that titles and registered documents are ordered
one at a time, and paid for, through SPIN2, ARLO or a registry agent, with no
bulk or open-data route offered — and cite the presence of transfer
consideration in the registry to a source that says so, or drop the assertion.
The same wording recurs in claim 2 KF-5, in the story's third TL;DR bullet and
in the story body; all four need the same repair.

### KF-6 — cited YF-EV-0053 — **VERIFIED**

> "As of August 2026 the City was being asked to analyse how infill affects
> property values. What the source establishes is the request."

The archived Taproot brief, dated Aug. 21, 2026: "Edmonton's city council has
requested information on how infill development affects the property values of
surrounding homes in the small-scale residential (RS) zone. In a 9-4 vote,
council approved a motion from Coun. Karen Principe." The claim's explicit
labelling of non-publication as a run search conclusion rather than something the
source carries is exactly right, and matches the correction recorded in
`errata.md`.

### KF-7 — cited YF-EV-0055 — **VERIFIED**

Every figure is in the post. "Consolidating collapses 1492 permits into 1242
distinct lots"; "1182 lots (95%) end up with both a 2024 baseline and a 2026
completed value"; the observed-gross-uplift table gives n = 67, median gross
uplift $1.7M for 5+ unit rowhomes; "Across 77,474 non-redeveloped RS Zone
properties in mature neighbourhoods, the median 2024-to-2026 growth ratio is
1.19x." The characterisation is fair too: the author writes "it's good enough for
a blog post," which is as plain a statement of "personal analytical post rather
than peer-reviewed or City work" as one could ask for. One observation for the
record rather than a grade: the same table does publish a "Per home added" median
of $0.2M, so the post is not silent on a per-home basis — but that is uplift
divided by homes added, not the per-dwelling value the proposition needs, which
is what the key fact actually denies.

### KF-8 — cited YF-EV-0103 — **VERIFIED**

> "…16,511 dwelling units approved city-wide in 2024, a 30 percent increase, 40
> percent of them in the redeveloping area, with a large share of the
> multi-dwelling permits being eight-unit row housing in the RS zone."

"In 2024, 16,511 new dwelling units were approved in Edmonton. This is a 30 per
cent increase from 2023"; "In 2024, 40 per cent of proposed dwelling units were
approved in the redeveloping area"; and, verbatim, "A large proportion of the
multi-dwelling permits issued were for eight unit row housing developments in the
RS Zone." The report says "proposed dwelling units" where the claim says "of
them"; the difference is immaterial. "The report carries no prices or assessed
values" is verified: no `$`, no "assessed value", no "market value" in twelve
pages.

### KF-9 — cited YF-EV-0099, YF-EV-0098 — **VERIFIED**

Against `round1/claude.json`: "4,091 of 6,603 classified units = 62.0 percent
higher than the demolished dwelling; lower bound treating the 2,995.6
unclassified units as not higher = 4,091/9,598.6 = 42.6 percent; upper bound =
73.8 percent," and "Median replacement-to-demolished ratio 1.222 constant."
Every number matches. The key fact's own closing sentence — "The archived bytes
behind those rolls are the open data portal pages and carry none of the computed
shares" — is itself correct, and is the disclosure KF-3 needed and did not make.

### KF-10 — cited YF-EV-0102, YF-EV-0100, YF-EV-0096 — **VERIFIED**

Bylaw 12800 s. 814.2, verbatim from the archived consolidation: "This Overlay
applies to all Sites zoned RF1, RF2, RF3, RF4 and RF5 within the areas shown on
the Appendix to this Overlay." YF-EV-0100, verbatim: "Zoning Bylaw 12800 was
repealed on January 1, 2024, and replaced with Zoning Bylaw 20001." YF-EV-0096
carries both halves of the last sentence: its dataset description says mature
neighbourhoods "are formally defined by the Mature Neighbourhood Overlay," and
its embedded column metadata records a Neighbourhood Name cardinality of 111 with
zero nulls. A neighbourhood list, as the claim says, not a parcel-level zoning
condition.

### KF-11 — cited YF-EV-0108, YF-EV-0109 — **IMPRECISE**

> "…the Edmonton all-items Consumer Price Index by month … and the New Housing
> Price Index for Edmonton…"

Neither archive contains the string "Edmonton", an all-items series, or a single
index value. Both are Statistics Canada table landing shells. YF-EV-0108 carries
"Consumer Price Index, monthly, not seasonally adjusted", table 18-10-0004-01,
release date 2026-08-17, and "Geography: Canada, Province or territory, Census
subdivision, Census metropolitan area, Census metropolitan area part."
YF-EV-0109 carries "New housing price index, monthly", table 18-10-0205-01,
release date 2026-08-20, and a geography line that likewise includes census
metropolitan area. **Fix:** the wording the bytes support is that Statistics
Canada publishes a monthly CPI table and a monthly New Housing Price Index table,
each offering census-metropolitan-area geography from which the Edmonton series
is drawn — the archived pages establish the instruments, not the Edmonton
figures. The closing sentence, "Neither supplies a property-level value to
adjust," is VERIFIED.

### Limitations 1–10

Nine of the ten are VERIFIED.

Limitation 2 (frame departure, last-standing-roll substitution, another seat
documenting it), limitation 3 (no code or row-level output published),
limitation 4 (2,995.6 and 9,598.6, fractional dwellings), limitation 5 (title
form inferred from units-added against title counts) and limitation 8
(neighbourhood proxy never applying the parcel-by-parcel RF1–RF5 condition) all
reproduce almost word for word in the GPT seat's documented points in
`errata.md`. Limitation 6 reproduces in `round1/claude.json`: "under a reading
where only row-house and apartment permits divide a title, the classified share
is 4,089/5,702 = 71.7 percent … Both readings point the same way, so I did not
raise a halt." Limitation 9's search conclusion is correctly labelled as one.
Limitation 10 checks against `intake.md`, which records that "Platform, author
and URL were not captured," and against the GPT seat's finding that the example
"has no address or source, was not treated as a threshold."

### Limitation 7 — **IMPRECISE**

> "This claim previously carried 286 built, 387 demolished and a net loss of 101
> for the 2024 Redeveloping Area Infill Report. Those figures were a
> transcription error in the evidence registry…"

The first half is right and I confirmed it independently: 286, 387 and 101 do not
occur in YF-EV-0101. But those three numbers are not a transcription error. They
are the *2023* report's real figures, and they sit verbatim in YF-EV-0048 — an
archive this same claim cites in KF-2: "While 286 new single detached houses were
built, 387 single detached houses were demolished, resulting in a net reduction
of 101 units."

What happened was a wrong-year attribution, not a garbled transcription, and the
distinction matters: "transcription error" implies the numbers were never real,
when in fact they are correct 2023 figures filed against the 2024 report.
**Fix:** "Those figures are the 2023 report's (YF-EV-0048), attributed in the
registry to the 2024 report." `errata.md` has the same wording and would want the
same repair.

### Unknowns 1–6 — **VERIFIED**

Five state open questions and assert nothing about a source. Unknown 4's embedded
premise — "the 2022 and 2023 pattern, in which per-unit values mostly fell below
the demolished house" — checks against `round1/claude.json`: "for houses
demolished in 2022-2023 the per-unit share drops to 38-46 percent."

### Missing evidence 1–8 — **VERIFIED**

All eight are run search conclusions with named holders, and all are labelled as
such. Item 1 anchors itself to the freeze date explicitly. Item 2's "capture only
a fraction after 2018" inherits the KF-3 problem and should be repaired with it.
Item 6's holder attribution (Alberta Land Titles, REALTORS Association) is
consistent with the GPT seat's documented correction of Gemini in `errata.md`.

---

## Claim: `ip-infill-affordable`

### KF-1 — cited YF-EV-0106, YF-EV-0110 — **VERIFIED**

The Census Dictionary archive lists the classification exactly as the claim
quotes it: "Spending less than 30% of income on shelter costs / Less than 15% /
15% to less than 30% / Spending 30% or more of income on shelter costs / 30% to
less than 50% / 50% or more." YF-EV-0110 carries the same split with "Date
modified: 2026-05-07", which is in force on the freeze date. Neither archive
contains "Edmonton", so "neither … carries any Edmonton figure" is verified.

### KF-2 — cited YF-EV-0092, YF-EV-0046, YF-EV-0097, YF-EV-0107 — **IMPRECISE**

Three of the four verify cleanly. YF-EV-0092 is the Valet JSON itself: `"label":
"Conventional mortgage: 5-year"`, `"description": "The interest rate for a 5-year
conventional mortgage offered by chartered banks in Canada"`, 2,696 observations
running 1975-01-01 to 2026-08-26 — a full observation history, and a posted
offered rate rather than a contract rate. YF-EV-0046 is a one-page table of
Municipal, Education and Education Requisition Allowance rates by year and by
Residential / Other Residential / Mature Area Derelict Residential / Non
Residential / Farmland class. YF-EV-0097's column list is "Tax Year, Tax Rate
Type, Assessment Class, Amount per $1,000 of Assessed Value, Amount per Dollar of
Assessed Value."

The fourth does not:

> "…Statistics Canada's household spending table gives the water, fuel and
> electricity category for the principal accommodation, with 2023 as the latest
> reference year released before the freeze date."

YF-EV-0107 is a landing shell. It carries the table number 11-10-0222-01, the
release date 2025-05-21, "Frequency: Annual", "Geography: Canada, Geographical
region of Canada, Province or territory" and a reference-period selector ending
at 2023. It does not contain "water", "fuel", "electricity" or "principal
accommodation". That category, and the value behind it, come from the run:
`round1/claude.json` records "Statistics Canada Table 11-10-0222-01, Alberta,
'Water, fuel and electricity for principal accommodation', average $4,532 per
[year]", i.e. the $377.67 month. **Fix:** the archived page establishes the table,
its provincial geography — which is what makes "a provincial average, not any
dwelling's bill" correct — its annual frequency and its 2023 latest reference
year; say that the water-fuel-and-electricity line itself is the run's read of
that table, as the run's own record does.

### KF-3 — cited YF-EV-0091 — **VERIFIED**

Verbatim: "Effective October 1, 2019, the Bank of Canada will no longer publish
the monthly Chartered Bank Interest Rates. As well, the weekly rate will be
relocated on our website." The archive also independently vindicates the Claude
seat's derivation rule quoted in the review block — "The monthly Chartered Bank
Interest Rates will be discontinued because they are simply the last weekly
Wednesday rate of each month."

### KF-4 — cited YF-EV-0059, YF-EV-0049 — **IMPRECISE**

The load-bearing parts verify. YF-EV-0049 carries the income figure twice: "The
2021 median household income was $90,000" and, in Table 1, the row "Edmonton
1,010,899 $356,700 $90,000 4.0". $90,000 × 0.30 ÷ 12 = $2,250, so the monthly
line is right. `fetch-report.md` records both Census Profile URLs returning "200,
body is 'File not found | Fichier non trouvé' (4,099 bytes)", exactly as the
claim says, and confirms the figure "was not ingested from those pages."
`round1/claude.json` confirms no first arm's-length sale price and no published
condominium fee for the cohort.

The YF-EV-0059 clause overstates:

> "…a later Statistics Canada estimate for the Edmonton area on a different unit,
> economic families rather than households."

The archive is another landing shell: table 11-10-0190-01, "Market income,
government transfers, total income, income tax and after-tax income by economic
family type", annual, released 2026-04-29, geography including census
metropolitan area. The only occurrence of "Edmonton" in the whole file is the
string `{"id":"1.20","text":"Edmonton, Alberta"}` inside the geography selector.
No estimate value for Edmonton is in these bytes. **Fix:** "a later Statistics
Canada table reported on a different unit, economic families rather than
households, which offers an Edmonton census-metropolitan-area geography." The
claim's own labelling of the sensitivity result as "the run's own arithmetic" is
correct and should stay.

### KF-5 — cited YF-EV-0040, YF-EV-0047, YF-EV-0036 — **IMPRECISE**

YF-EV-0040's embedded column list is Account Number, Suite, House Number, Street
Name, Neighbourhood ID, Neighbourhood, Ward, Assessed Value, Tax Class, Garage,
Assessment Class 1–3 and percentages, Latitude, Longitude, Point Location — so
"assessed values only, with no sale prices, no shelter costs and no tenure" is
VERIFIED. The mass-appraisal clause is VERIFIED against YF-EV-0047 as above. The
closing land-title clause carries the same defect as claim 1 KF-5 and needs the
same fix.

### KF-6 — cited YF-EV-0049 — **IMPRECISE**

> "…a median-income Edmonton household could afford benchmark row and apartment
> product and could not afford benchmark single-detached product."

The archive does not report a single-detached benchmark. Its category is
combined: "Single and semi-detached homes, which have a benchmark price of
$431,100, are likely out of reach for households earning less than $105,000
(approximately 54 per cent of households in Edmonton)." The positive half is
verbatim: "All households with an income greater than $60,000 should be able to
afford the benchmark price for townhouses, row houses and apartments." **Fix:**
"benchmark single- and semi-detached product." The GPT seat's own key finding in
the review block gets this right — "benchmark detached and semi-detached product"
— so the claim text is out of step with its own record. The remainder of KF-6 is
VERIFIED: the report uses benchmark prices, income bands and a mortgage-
qualification method built on the Gross Debt Service Ratio, and "teardown",
"demolition" and "replacement dwelling" occur nowhere in its fourteen pages.

### KF-7 — cited YF-EV-0105, YF-EV-0104 — **IMPRECISE**

The CMHC half is VERIFIED and is the corrected version recorded in `errata.md`.
The archived table page is headed "Edmonton — Average, Median and Price
Percentiles for Absorbed Homeowner and Condominium Units by Census Subdivision",
and its type selector offers only "Single", "Semi-detached" and "Single /
Semi-detached" — so "covers single- and semi-detached units only, so it says
nothing about new row or apartment prices" is right.

The REALTORS half misdescribes the geography:

> "The REALTORS Association's July 2026 city-wide averages put detached at
> $585,726…"

All four figures are verbatim in the archive — "Detached home prices averaged
$585,726"; "The semi-detached average price was $425,329"; "Row/townhomes prices
… averaging $292,756"; "Condominium prices averaged $214,521 during July 2026" —
but the release is explicit that its market is regional, not municipal: "The
Greater Edmonton Area (GEA) real estate market reported 2,535 sales in July
2026." **Fix:** "the REALTORS Association's July 2026 Greater Edmonton Area
averages."

### KF-8 — cited YF-EV-0039 — **VERIFIED**

Both halves are verbatim. On heat: "No adjustments are made for the inclusion or
exclusion of amenities and services such as heat, hydro, parking or hot water."
On scope: "It targets only privately initiated structures with at least 3 rental
units," and "Universe: This consists of all row projects and apartment structures
with three or more units."

### KF-9 — cited YF-EV-0050 — **VERIFIED**

Both definitions are on the guidebook's page 7, essentially as quoted: "Rental or
ownership housing that gets financial help from the government, either upfront or
ongoing … meant for people who earn less than the median income for their
household size," and "A property rented to the public under a government
agreement aimed at reducing poverty. The rent charged is limited to no more than
80% of the market rate or 30% of the residents' pre-tax income." The exclusion is
on page 6: "This guide applies to all housing types except emergency shelters or
market home ownership."

### KF-10 — cited YF-EV-0054, YF-EV-0093 — **IMPRECISE**

> "A 30-year amortization has been available since 2024-12-15 for newly built
> dwellings and first-time buyers…"

The date is right — "Subsections 3(2) and (4), section 7, subsections 10(2) and
(4) and section 14 are deemed to have come into force on December 15, 2024" — but
the condition is disjunctive, and the claim's "and" reads as conjunctive. The
replaced s. 5(1.1) is: "The loan may be scheduled to amortize over a period that
exceeds 25 years, but does not exceed 30 years, if any of the borrowers is a
first-time home buyer **or** if the eligible residential property against which
the loan is secured is newly built." The conjunctive version is the *superseded*
August 2024 text, which also required both. **Fix:** "for a first-time home buyer
or a newly built dwelling." "Only on insured borrowing" is supported — the whole
instrument amends the Insurable Housing Loan Regulations and the Eligible
Mortgage Loan Regulations, and the 30-year provision sits in s. 5 (high-ratio)
with no equivalent added to the s. 6 low-ratio criteria. YF-EV-0093 carries the
premium schedule by loan-to-value band exactly as described (up to 65% at 0.60%
through 90.01%–95% at 4.00%).

### Limitations 1–11 — **VERIFIED**

All eleven check. Limitation 6 reproduces the GPT seat's documented point almost
verbatim from `errata.md`: "2,968 divided by 3,584 is called the lower bound with
unclassified dwellings treated as meeting the threshold, but the numerator
excludes all 225 unclassified dwellings. The arithmetic is the lower bound; the
description is reversed." Limitation 7's 3,244 and 49.1 percent, limitation 8's
80.9 percent and limitation 9's absent condominium fees and bedroom counts all
reproduce in `round1/claude.json`.

Limitation 10 deserves a note because its precision is unusually good.
YF-EV-0037 does argue the critique attributed to it — "The 30% STIR approach,
while useful …, does not reveal how housing costs may be restricting the ability
of households to consume essential goods and services" — and the archive does
carry Edmonton rows (housing hardship 4–7%, above-30% threshold 9–13%, 2012–2017).
The limitation's careful wording, "establishes nothing about Edmonton **dwellings
or prices**", survives that: the Edmonton content is household rates, not
dwellings or prices.

### Missing evidence 1–8 — **VERIFIED**

All eight are run conclusions with named holders. Item 3 checks directly against
`fetch-report.md`.

---

## Story: `infill-prices`

### `one_line` — **VERIFIED**

Both claims carry `finding: Not established`, and the "no published Edmonton
series" conclusion is the run's, correctly framed as a run result.

### TL;DR 1 — **VERIFIED**

294 and the replacement-by-other-forms conclusion, both verbatim in YF-EV-0101.

### TL;DR 2 — **UNSUPPORTED**

> "Recorded house demolitions largely drop out of the City's open building-permit
> stream after 2018, so the review's own frame … cannot be rebuilt from it."

Same defect as claim 1 KF-3, in the most prominent position in the story. The
archived portal page carries no annual demolition counts; the observation is one
seat's tabulation and was documented as not established by another. **Fix:**
attribute it to the seat, or drop it from the TL;DR.

### TL;DR 3 — **IMPRECISE**

The assessment-roll field list is VERIFIED against YF-EV-0041/0099's column
metadata, including all three withheld fields. The closing sentence — "Arm's-
length sale prices sit in Alberta's land-title registry parcel by parcel for a
fee" — carries the YF-EV-0036 defect described at claim 1 KF-5.

### TL;DR 4 — **VERIFIED**

62.0 percent, 6,603, roughly 3,000 unverified units counted fractionally, and
bounds of 42.6 and 73.8 all reproduce in `round1/claude.json`, as does the
inferred-not-published classification.

### TL;DR 5 — **IMPRECISE**

> "…The other two seats did not accept the frame, and the Census pages cited for
> that income returned File not found when the run archived them."

The model inputs ($90,000, 20 percent down, 25-year amortization, $377.67, 88.4
percent of 3,359) and the Census failure are all VERIFIED. But "the other two
seats did not accept the frame" is true only of round one. In round two Gemini
moved to Supported on exactly this ground, as `errata.md` and the claim's own
review block record. The body gets this right — "The other two in round one did
not" — and the TL;DR drops the qualifier. **Fix:** "The other two seats in round
one did not accept the frame."

### Body — 33 statements: 28 VERIFIED, 4 IMPRECISE, 1 UNSUPPORTED

VERIFIED without qualification: the $350,000-to-$1,000,000 opening (verbatim in
`intake.md`); both findings Not established; 294 lost on net with the losses made
up in other forms; neither report putting a dollar figure against a property;
16,511 up 30 percent with two in five in the redeveloping area and much of the
multi-dwelling total as eight-unit RS row housing; "approvals and a product mix …
no money figure of any kind"; the per-lot / per-dwelling divergence attributed to
one seat and contested by the other two; the development permit stream opening in
2019; the assessment roll's eight published fields and three withheld ones; the
mass-appraisal sentence; the freeze-date search conclusion and the August 2026
request; s. 814.2's RF1-to-RF5 mapped appendix and the repeal at the start of
2024; the 111-neighbourhood layer; 62.0 percent of 6,603 at a median ratio of
1.222; 93.2 percent by title and 99.6 percent by lot; roughly 3,000 unconfirmed
and bounds of 42.6 and 73.8; the three cross-review objections; 1,242 lots,
$1.7 million median gross uplift, 67 rowhouse lots; the untested example with no
address, source or property and round numbers not treated as thresholds; 20
percent down over 25 years; the 30 percent classification, the posted five-year
rate and the City's mill rates; $90,000, $2,250 a month, the two File-not-found
Census pages and the fallback to the fetch report and YF-EV-0049; no retrievable
sale price and no published condominium fee; the economic-families income
estimate and the run's own sensitivity arithmetic; 88.4 percent of 3,359; about
half the set inside single-title buildings; Split with the finding resting on
round one; and the guidebook's subsidised, income-tested scope excluding market
infill.

Also verified, though outside the graded body: the changelog note's "Two earlier
runs on this story were halted by the panel on framing concerns before this one
cleared framing check 3." `reviews/infill-prices/2026-09-02/` and
`reviews/infill-prices/2026-09-02-rerun/` both exist with their own
`framing/panel-concern.md`, and this run's `framing/check-1.md` and `check-2.md`
read "Verdict: REVISE" while `check-3.md` reads "Verdict: FRAME OK".

**UNSUPPORTED — "Most house demolitions vanish from the open general building
permit stream after 2018, which is why the ten-year permit cohort the brief
froze, 2016 through 2025, cannot be rebuilt out of it."** Third instance of the
KF-3 defect; same fix.

**IMPRECISE — "something on the order of 390 teardowns tallied by type the year
before."** The claim's version ("390 houses") is fine; "teardowns" is not. The
archive's tally by type is 387 single detached + 3 semi-detached + 3 row housing +
131 apartment dwellings, so the demolitions total 524 and 390 is the *house*
subtotal. **Fix:** "390 houses" or, better, the exact "387 single-detached houses
among 524 dwellings demolished."

**IMPRECISE — "and Statistics Canada the household spending line behind the
$377.67 monthly utility allowance."** YF-EV-0107 carries no such line and no such
figure; the derivation is the run's. Same fix as claim 2 KF-2.

**IMPRECISE — "a median-income household could afford benchmark row and apartment
product in 2024 and could not afford benchmark single-detached."** The report's
category is single **and semi-**detached at $431,100. Same fix as claim 2 KF-6.

**IMPRECISE — "Real arm's-length sale prices live in Alberta's land-title
registry and come out one parcel at a time for a fee, never as an open
dataset."** YF-EV-0036 does not mention prices or fees. Same fix as claim 1 KF-5.

---

## Counts

| | Claim 1 | Claim 2 | Story | Total |
|---|---|---|---|---|
| Statements graded | 35 | 29 | 39 | **103** |
| VERIFIED | 31 | 23 | 31 | **85** |
| IMPRECISE | 3 | 6 | 6 | **15** |
| UNSUPPORTED | 1 | 0 | 2 | **3** |

The three UNSUPPORTED statements are one fact appearing three times: that house
demolitions largely drop out of the City's open general building permit stream
after 2018, cited to YF-EV-0094 in `ip-teardown-price-gap` KF-3 and asserted
unattributed in the story's second TL;DR bullet and in the corresponding body
bullet. The archived dataset page does not carry it; it is one seat's tabulation,
and a second seat documented in round 2 that the tabulation does not establish it.

## Verdict

**GATE FAIL.**

Three unsupported statements, all of the same fact, and it is not a small fact:
it is the reason the story gives for why the frozen ten-year permit cohort could
not be used, which is in turn the reason the whole reconstruction exists. It is
repairable in one edit — attribute the fall-off to the seat's tabulation of the
permit records, as claim 1's limitation 2 already does, instead of to the
dataset's landing page — after which this audit would pass.

The fifteen imprecisions should be fixed in the same pass. Four of them are the
same land-title sentence in four places; two are the same
single-and-semi-detached category; two are the same Statistics Canada
utility line. The recurring pattern is worth naming for the next run: a
Statistics Canada or open-portal landing page establishes that a series exists
and what geography it offers, not what the series says. Four key facts and two
story sentences cite such a page as though it carried the value. Limitation 7's
"transcription error" is the one finding with an independent bite — 286, 387 and
101 are real 2023 figures sitting in an archive this claim already cites, so the
correction record understates what actually went wrong.

---

## Second pass, 2026-09-01

Same auditor, same method, no web access. Only the eighteen statements graded
IMPRECISE or UNSUPPORTED above were re-read, in their new wording, against the
same archived bytes. The sixteen archives those eighteen rest on were re-hashed
against `archive.sha256` first: all sixteen still match, so the bytes graded here
are the bytes graded in the first pass.

### Claim: `ip-teardown-price-gap`

**KF-3 — cited YF-EV-0094, YF-EV-0042 — VERIFIED.** Every asserted detail is now
in an archive or an attributed run artifact. YF-EV-0094's embedded dataset
description carries "All records start from January 1, 2009" and the field list
`JOB_CATEGORY`, `WORK_TYPE`, `UNITS_ADDED`, `LEGAL_DESCRIPTION`, `Occupancy Date`.
"No annual demolition counts" holds: the page carries a `WORK_TYPE` cardinality
list with "(99) Demolition" at 9,760 all-time and a separate year cardinality
list, never the two crossed. The fall-off is now attributed to
`round1/claude.json`, where the seat's own `establishes` line reads "house
demolition records in this dataset fall from 370 in 2018 to under 30 a year from
2019," and the counter-documentation to `round2/gpt.json`: "Claude's assertion
that the permit datasets under-capture teardowns after 2018 is plausible but not
established merely by falling demolition-description counts and a separate total
of approved dwelling units." The predeclared frame is the brief's own: "all
residential demolition permits issued in the window," the window being "the ten
complete calendar years ending with the most recent complete calendar year before
the freeze date." YF-EV-0042 is titled "Development Permits from 2019 to present."

**KF-5, land-title clause — cited YF-EV-0036 — VERIFIED.** The price assertion is
gone and what replaces it is on the page. "Most titles, documents or plans can be
ordered through the Alberta Registries Spatial Information System (SPIN2),
Alberta Registry for Land Online (ARLO) or through a registry agent"; "To get a
title search, you need to know one of the following: legal description, land
identification number code (LINC number), title number." Document copies and plan
copies are separately described as available through SPIN2 or a registry agent,
one registration number at a time. "Offers no bulk or open-data route" is a
correct negative: the page enumerates its routes and none is bulk, and the strings
"bulk" and "open data" do not occur. "Price", "consideration" and "sold" still do
not occur.

**KF-11 — cited YF-EV-0108, YF-EV-0109 — VERIFIED.** The instruments are what the
pages carry and the sentence now says so. YF-EV-0108: title "Consumer Price Index,
monthly, not seasonally adjusted", "Frequency: Monthly", table 18-10-0004-01,
"Geography: Canada, Province or territory, Census subdivision, Census metropolitan
area, Census metropolitan area part". YF-EV-0109: title "New housing price index,
monthly", "Frequency: Monthly", table 18-10-0205-01, "Geography: Canada,
Geographical region of Canada, Province or territory, Census metropolitan area,
Census agglomeration". The two roles are the brief's, verbatim: "The primary
constant-dollar calculation uses the Statistics Canada Consumer Price Index,
all-items, Edmonton census metropolitan area, monthly series, for that July, with
July 2025 as the base period," and the New Housing Price Index "labelled as a
market-index adjustment rather than a general price adjustment." Correcting the
first pass: YF-EV-0108 does carry an All-items row and index values, on Canada
geography — what it does not carry is any Edmonton value, which is what the new
wording claims and all it claims.

**Limitation 7 — VERIFIED.** 286, 387 and 101 are verbatim in YF-EV-0048: "While
286 new single detached houses were built, 387 single detached houses were
demolished, resulting in a net reduction of 101 units." YF-EV-0048 is cited by
this claim at KF-2. "Filed against the 2024 report in the registry at ingest"
checks against the ingest commit, whose YF-EV-0101 `establishes` line reads "286
new single-detached houses built against 387 demolished, a net loss of 101". None
of the three occurs in YF-EV-0101; "net loss of 294" does. The cross-review catch
and the drafting correction are both in `errata.md`. "Wrong-year attribution
rather than a garbled transcription" is now the accurate characterisation.

### Claim: `ip-infill-affordable`

**KF-2 — cited YF-EV-0092, YF-EV-0046, YF-EV-0097, YF-EV-0107 — IMPRECISE.** The
new first half verifies: YF-EV-0107 carries "Frequency: Annual", table
11-10-0222-01, "Geography: Canada, Geographical region of Canada, Province or
territory", and a reference-period selector whose last year is 2023. The second
half now overshoots in the opposite direction. The archived page *does* carry the
line: its embedded row headers include "Water, fuel and electricity for principal
accommodation", and a data row gives it a value under "Average expenditure per
household" — on Canada geography. What the page does not carry is Alberta, which
is the geography the run read: `round1/claude.json` records "Statistics Canada
Table 11-10-0222-01, Alberta, 'Water, fuel and electricity for principal
accommodation', average $4,532 per household in 2023 … divided by twelve," i.e.
the $377.67. Saying the line is nowhere on the page is not what the bytes show.
**Supported wording:** "…and Statistics Canada publishes an annual household
spending table on provincial geography whose latest reference year before the
freeze date is 2023. The archived page carries the water, fuel and electricity
line for the principal accommodation on Canada geography only; the Alberta figure
behind the run's monthly allowance is the run's own read of that table."

This one is on the first pass, not the drafter. The first-pass entry asserted the
page "does not contain 'water', 'fuel', 'electricity' or 'principal
accommodation'". It does, inside the embedded table JSON. The drafter applied the
fix as written. The repair above is a half-sentence.

**KF-4, YF-EV-0059 clause — VERIFIED.** The archive is table 11-10-0190-01,
"Market income, government transfers, total income, income tax and after-tax
income by economic family type", "Frequency: Annual", released 2026-04-29,
"Geography: Canada, Geographical region of Canada, Province or territory, Census
metropolitan area", with "Edmonton, Alberta" present in the geography selector.
"A later Statistics Canada table reported on a different unit, economic families
rather than households, which offers an Edmonton census-metropolitan-area
geography" is exactly what those bytes establish, and no estimate value is now
attributed to them.

**KF-5, land-title clause — VERIFIED.** Same repair as claim 1 KF-5, same bytes.
"Releases each title or registered document on its own single order, whether
through SPIN2, ARLO or a registry agent, rather than as an open dataset" is
carried by the page's ordering sections for titles, document copies and plan
copies.

**KF-6 — cited YF-EV-0049 — VERIFIED.** The category is now the report's own:
"Single and semi-detached homes, which have a benchmark price of $431,100, are
likely out of reach for households earning less than $105,000," against "All
households with an income greater than $60,000 should be able to afford the
benchmark price for townhouses, row houses and apartments." Appendix 2 gives the
same $431,100 under the column heading "Single & Semi-detached". The claim text is
now in step with the GPT seat's own key finding.

**KF-7, REALTORS clause — cited YF-EV-0104 — VERIFIED.** The release is headed
"The Greater Edmonton Area (GEA) real estate market reported 2,535 sales in July
2026"; "city-wide" and "City of Edmonton" do not occur anywhere in it. All four
averages remain verbatim. The CMHC half is unchanged and remains verified: the
type selector offers only Single, Semi-detached and "Single / Semi-detached", and
"Apartment" does not occur.

**KF-10 — cited YF-EV-0054, YF-EV-0093 — VERIFIED.** The condition is now
disjunctive and matches the operative text, s. 5(1.1) as replaced by s. 3(4): "if
any of the borrowers is a first-time home buyer **or** if the eligible residential
property against which the loan is secured is newly built." The date holds:
"Subsections 3(2) and (4), section 7, subsections 10(2) and (4) and section 14 are
deemed to have come into force on December 15, 2024." "Only on insured borrowing"
is now carried explicitly by the RIAS as well: "This measure will only apply to
high-ratio mortgages (mortgages where the loan amount exceeds 80 per cent of the
home price) on owner-occupied properties." One observation for the record rather
than a grade: the trailing "above 20 percent down it is lender policy" is the
residual of that 80-percent threshold rather than something the instrument states;
the operative half of the clause, "not regulation", is what the bytes carry.

### Story: `infill-prices`

**TL;DR 2 — VERIFIED.** The assertion is now attributed on both sides — "One
seat's tabulation of the open building-permit records has recorded house
demolitions thinning out after 2018" and "A second seat documented that the
tabulation does not establish the thinning" — and both halves check against
`round1/claude.json` and `round2/gpt.json` as at claim 1 KF-3. Nothing is now
sourced to the portal page that the portal page does not carry.

**TL;DR 3 — VERIFIED.** The field list was already verified against YF-EV-0041 and
YF-EV-0099. "Alberta's land-title registry works one order at a time, over SPIN2,
ARLO or a registry agent, and offers no bulk download" is the YF-EV-0036 repair.

**TL;DR 5 — VERIFIED.** "The other two seats did not accept the frame in round
one; the Gemini seat moved to Supported in round two" matches `errata.md` under
"Verdict movement between rounds" — "Gemini moved `ip-infill-affordable` from Not
established to Supported … No other seat moved on either claim" — and
`round2/gemini.json`, which carries Not established on claim 1 and Supported on
claim 2. The model inputs and the Census failure were verified in the first pass
and are unchanged.

**Body, permit bullet — VERIFIED.** Same repair as TL;DR 2, carrying both the
seat attribution and the round-two counter-documentation, plus the unchanged and
already-verified "The development permit stream opens in 2019".

**Body, 2023 demolitions — VERIFIED.** "387 single-detached houses among the 524
dwellings demolished the year before" against YF-EV-0048: "Demolitions that made
way for infill housing included 387 single detached houses, 3 semi-detached units,
3 row housing units, and 131 apartment dwellings." 387 + 3 + 3 + 131 = 524. The
524 is the sum of the report's own four counts rather than a printed total, and
the sentence attributes the tally-by-type to the report, which is what it does.

**Body, utility allowance — VERIFIED.** "Statistics Canada an annual household
spending table on provincial geography, from which the run read the $377.67
monthly utility allowance" attributes the read to the run and the table to
Statistics Canada, and both are right: the table offers provincial geography, and
`round1/claude.json` records the Alberta read that produces $377.67. Unlike claim
2 KF-2, this wording makes no claim about what the archived page does not carry,
so it needs no repair.

**Body, City affordability comparison — VERIFIED.** "Could not afford the
benchmark single and semi-detached price of $431,100" is YF-EV-0049's own
category and its own figure.

**Body, land-title sentence — VERIFIED.** "Alberta's land-title registry hands
over a single title at a time, ordered from SPIN2, ARLO or a registry agent, never
as an open dataset" is the YF-EV-0036 repair, fourth and last instance.

### Collateral checks

The two registry `establishes` lines are repaired. YF-EV-0036 no longer says "for
a fee" and no longer asserts that transfer prices exist in the registry; it now
reads "…by legal description, LINC or title number. Establishes that titles are
ordered one at a time and that no bulk or open dataset of them is published; the
page does not mention transfer prices and establishes no price," which is what the
bytes support. YF-EV-0049 no longer says "benchmark single-detached product"; it
now reads "benchmark row and apartment product was affordable and single and
semi-detached product was not," matching the report. No `sha256`, `path`, `url`,
date or rights field was touched in either, and both archives still hash clean.

The errata entry and both of the quality ledger's newest events now describe the
286/387/101 error as a wrong-year attribution rather than a transcription error.
The errata reads "Those three figures are the 2023 report's real ones, sitting
verbatim in YF-EV-0048; they were filed against the 2024 report at ingest, a
wrong-year attribution rather than a garbled transcription." The round-2 GPT event
carries the same correction, and the drafting-stage Gemini event now says the
faithfulness check "traced the draft's 286/387/101 figures to the 2023 report they
actually come from and to the registry line that had filed them against the 2024
report." The three surviving occurrences of the word "transcription" across the
ledger, the errata and the claim are all in the phrase "rather than a garbled
transcription", which is the distinction being drawn rather than the claim being
made.

One repair beyond the eighteen is worth recording, since the first pass graded it
VERIFIED and should not have: claim 1's limitation 9 carried the same land-title
sentence — "Arm's-length sale records do exist parcel by parcel in Alberta's
land-title registry for a fee" — and the drafter repaired it along with the other
four. It now reads "Alberta's land-title registry answers title orders singly, by
way of SPIN2, ARLO or a registry agent." The same is true of missing evidence item
2, which now attributes the post-2018 under-capture to one seat's tabulation and
records the second seat's documentation against it.

### Updated counts

| | Claim 1 | Claim 2 | Story | Total |
|---|---|---|---|---|
| Statements graded | 35 | 29 | 39 | **103** |
| VERIFIED | 35 | 28 | 39 | **102** |
| IMPRECISE | 0 | 1 | 0 | **1** |
| UNSUPPORTED | 0 | 0 | 0 | **0** |

Of the eighteen re-read, seventeen are VERIFIED and one is IMPRECISE.

### Verdict

**GATE FAIL.**

Zero unsupported. The three UNSUPPORTED statements were one fact in three places,
and all three are repaired the way the first pass asked: the post-2018 fall-off is
now attributed to the seat that tabulated it, with the second seat's
counter-documentation carried alongside it, in the claim, in the TL;DR and in the
body. The four land-title sentences, the two single-and-semi-detached categories,
the REALTORS geography, the disjunctive amortization condition, the economic-
families clause, the CPI and New Housing Price Index instruments and the
wrong-year attribution are all repaired against the bytes.

One imprecision remains, and it is the first pass's error rather than the
drafter's: claim 2 KF-2 now says the archived Statistics Canada page carries
nothing of the water, fuel and electricity line, when the page carries that line
on Canada geography and it is the Alberta figure that is the run's read. The
supported wording is given above and the fix is half a sentence. A third pass need
only re-read that one statement.

---

## Third pass, 2026-09-01

Same auditor, same method, no web access. One statement re-read: claim 2 KF-2 in
`src/content/claims/ip-infill-affordable.yaml`. The archive behind it was
re-hashed first — `evidence/private/YF-EV-0107-tv.action` still matches the
`sha256` in `evidence/registry/YF-EV-0107.yaml`, so these are the bytes the
earlier passes graded.

**KF-2 — cited YF-EV-0092, YF-EV-0046, YF-EV-0097, YF-EV-0107 — VERIFIED.** The
drafter applied the second pass's supported wording verbatim, and the bytes carry
it: the archived page's embedded table JSON holds "Water, fuel and electricity for
principal accommodation" on the Canada row with a value of 2,535, the string
"Alberta" appears nowhere in the archive, and neither does 4,532 — while
`reviews/infill-prices/2026-09-01-rerun2/round1/claude.json` attributes the
$4,532 annual Alberta average, and the $377.67 monthly allowance derived from it,
to the run's own read of that table. Canada geography only, Alberta as the run's
read: both halves hold.

### Final counts

| | Claim 1 | Claim 2 | Story | Total |
|---|---|---|---|---|
| Statements graded | 35 | 29 | 39 | **103** |
| VERIFIED | 35 | 29 | 39 | **103** |
| IMPRECISE | 0 | 0 | 0 | **0** |
| UNSUPPORTED | 0 | 0 | 0 | **0** |

### Verdict

**GATE PASS.**

Every statement across both claims and the story now reads against the archived
bytes. Nothing is left open.
