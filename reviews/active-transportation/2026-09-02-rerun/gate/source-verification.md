# Source verification — active-transportation (rerun)

Gate stage 7, AI-automatable portion. Run date 2026-09-02 (story run
`2026-09-02-rerun`), methodology v1.14. Auditor: Claude (Opus) audit session,
separate from the drafting session.

**Scope.** Every `key_fact` in `src/content/claims/at-100m-vs-snow.yaml` and
`src/content/claims/at-100m-vs-roads.yaml` against every evidence id it lists;
every `limitation`, `unknown` and `missing_evidence` line in both; every
`review.reviewers` entry (verdict, confidence, each `key_finding`,
`changed_between_rounds`) against the six round files. In
`src/content/stories/active-transportation.mdx`, the `one_line`, all five TL;DR
bullets, the 2026-09-02 `changelog` note, and every body sentence carrying a
number, a date, a name, a quotation, or an assertion about what a document or a
seat says. The three `seen` cards are captured quotations recorded at intake,
not statements the story makes, and were not graded. Nothing was skipped.

Both claim files, the story and `scripts/calcs/active-transportation.ts` were
edited by the drafting session while this audit was running, twice. The graded
text is the state at **2026-09-02T22:46Z**: story `md5 1aa77fef…`, snow claim
`afded529…`, roads claim `d3ea538b…`, calcs `c167f9fb…`. Several sentences that
would have been graded IMPRECISE in an earlier state (the "$60.9 million the
City quoted for 2023" attribution, "a little under half of the bike money", "no
other record of the remark exists", "$56.9 million base reported in the press"
inside a key fact) are already repaired in the graded state and are graded on the
wording now in the tree. Four evidence entries appeared during the audit —
YF-EV-0136 to YF-EV-0139 — and are audited here on the same terms as the rest.

**Method.** Statements were checked against the archived bytes of the cited
evidence only, or against the attributed run artifacts. No web access was used.
Registry entries under `evidence/registry/YF-EV-*.yaml` gave every
`archive.path`; all cited archives sit under `evidence/private/`. The fifteen
PDFs were extracted with `pypdf` and normalised to one whitespace-collapsed line
per page before any phrase or cell search; the escribe PDFs come out one word per
line and are unsearchable without it. The three `Meeting.aspx` archives
(YF-EV-0123, YF-EV-0131, YF-EV-0135) are HTML minutes pages and were stripped to
text and whitespace-normalised. The 695-page capital budget and the two 696- and
804-page operating budgets were extracted once to a scratch file and grepped
there. The roads-only sum was **recomputed independently from the archived bytes**,
not taken from the seats: the Service Category field was parsed off all 161
capital profile sheets and joined to the Appendix A rows on printed pages 97-105.
Where a statement is attributed to a run artifact it was checked against
`round1/{claude,gpt,gemini}.json`, `round2/{claude,gpt,gemini}.json`, `brief.md`,
`errata.md`, `fetch-report.md`, `intake.md`, `run.yaml`, `synthesis.json`,
`disagreements.json`, `framing/check-1.md`, `framing/check-2.md`, and, where the
text says so, against `reviews/active-transportation/2026-09-02/` (the halted
first run: `framing/panel-concern.md`, `errata.md`) and `intake/register.yaml`.

**Integrity check.** All twenty-six archives held for this story match the
`archive.sha256` recorded in the registry, including the two the claims do not
cite (YF-EV-0116, the 2023-2026 operating budget, needed to test one limitation's
negative). The bytes audited are the bytes the registry claims. No cited archive
is a soft-404 or an error page: each carries its own document header, folio or
`<title>` and its own content. The one 404 in this run's fetch record
(DocumentId 282482, the framing checker's link for the September 2025 capital
update) was correctly kept out of the registry, and the one fetch timeout (a CBC
budget story) is recorded in `fetch-report.md` and is not cited by either claim —
see the collateral note on the $56.9 million figure below.

| ID | Archive | Form | sha256 |
|---|---|---|---|
| YF-EV-0114 | 2023-2026 Capital Budget (adopted) | 695 pp | match |
| YF-EV-0115 | Approved 2019-2022 Operating Budget | 696 pp | match |
| YF-EV-0116 | 2023-2026 Operating Budget and Plans (uncited; negative test) | 804 pp | match |
| YF-EV-0117 | Capital profile sheet CM-20-0330 | 3 pp | match |
| YF-EV-0118 | IS03688, program update, 2026-08-26 | 9 pp | match |
| YF-EV-0119 | Capital Financial Update, 2023-12-31, Att. 2 | 24 pp | match |
| YF-EV-0120 | Capital Financial Update, 2024-12-31, Att. 2 | 21 pp | match |
| YF-EV-0121 | Global News, 2022-12-12 | HTML | match |
| YF-EV-0122 | Common Sense Edmonton campaign page (Wayback) | HTML | match |
| YF-EV-0123 | Council minutes, 2022-07-04, item 6.6 | HTML | match |
| YF-EV-0124 | Spring 2022 SOBA, Attachment 1 (FCS01143) | 2 pp | match |
| YF-EV-0125 | Operating Financial Update, 2022-12-31 | 45 pp | match |
| YF-EV-0126 | Operating Financial Update, 2023-12-31 | 59 pp | match |
| YF-EV-0127 | Operating Financial Update, 2024-12-31 | 65 pp | match |
| YF-EV-0128 | Operating Financial Update, 2025-12-31 | 61 pp | match |
| YF-EV-0129 | Capital Financial Update, 2025-12-31, Att. 2 | 21 pp | match |
| YF-EV-0130 | Spring 2025 Supplemental Capital Budget Adjustment | 8 pp | match |
| YF-EV-0131 | Council Budget minutes, 2022-11-30 to 12-16 | HTML | match |
| YF-EV-0132 | City project page, active transportation | HTML | match |
| YF-EV-0133 | 2023-2026 Budget engagement fact sheet | 1 p | match |
| YF-EV-0134 | Councillor's own Bike Plan page | HTML | match |
| YF-EV-0135 | Infrastructure Committee minutes, 2026-08-26 | HTML | match |
| YF-EV-0136 | FCS03370 Att. 1, program summary by account category | 12 pp | match |
| YF-EV-0137 | 2025 Infrastructure Report | 48 pp | match |
| YF-EV-0138 | City Budget and Finances page | HTML | match |
| YF-EV-0139 | CO01733 Att. 2, Snow and Ice Control Budget 2022-26 | 2 pp | match |

**Grading.** VERIFIED = the archive, or the attributed run artifact, supports the
statement as written. IMPRECISE = the substance is supported but at least one
asserted detail is not in *that* archive, or is stated more strongly or more
loosely than the source allows; the wording the bytes do support is given.
UNSUPPORTED = the source does not contain it, or contradicts it.

**Headline result first: every dollar figure, ratio, share and count in the
graded text reproduces exactly against its source cell or against
`scripts/calcs/active-transportation.ts`, and the calcs module reproduces against
the archived cells.** 64,466; 63,653; 2,300; 14,300; 4,700; 21.3; 85.766; 6.292;
79,474; 97,571; 63,574; 54,917; 67,090; 72,086; 67,554; 76,648; 60.9; 5,950;
26,750; 33,650; 100,000; 66.35; 807; 10,496; 39,984; 99,570; 430,000; 1,794.0;
622.8; 1,171.2; 1,116.532; 722.289; 106.882; 1,945.703; 493.4; 1,452.303;
7,192.5; 2,256.0; 3,768,000; 274,600; 1.55; 1.17; 1.26; 1.64; 1.55; 9.8; 33.5;
19.5; 5.6; 1.4; 4.4; 40; 35 km; 24 km; 161; 20; 11; 9 to 4 — all check. **The
roads-only total was rebuilt from scratch off the archived bytes and lands on
$1,945.703 million to the thousand**, with the same twenty "Roads" sheets (less
the two named exclusions), the same eleven "Neighbourhood Renewal" sheets and the
same three unlabelled bridge sheets the brief predeclared, including the
two-line profile 19-22-9006 (119,200 + 41,821 = 161,021) that a naive parse
drops. Nothing here is an arithmetic error.

The six non-VERIFIED items are three distinct defects, and two of them are the
same defect in two places.

---

## Claim: `at-100m-vs-snow`

### KF-1 — cited YF-EV-0122 — **VERIFIED**

The archived Wayback capture carries the URL stamp `20221212055823` and the
sentence verbatim: "In fact, it's almost double the City's annual snow-clearing
budget!" The negative holds: no snow dollar figure appears anywhere in the page,
and the only figures on it are "$100 million", "almost 5 times the amount he
wants to spend on affordable housing" and "a 9-4 vote".

### KF-2 — cited YF-EV-0131, YF-EV-0114, YF-EV-0117 — **UNSUPPORTED** (the date)

> "…capital profile CM-20-0330, approved by council on 2022-12-16 (9 to 4) for
> 2023 to 2026: $5.95 million, $26.75 million, $33.65 million and $33.65 million
> by year, funded by tax-supported debt."

Everything but the date verifies exactly and three times over. YF-EV-0131, item
12.9: "Capital Budget Amendment 7, put: … That new capital profile CM-20-0330 …
be approved with the following change: for $100,000,000 ($5,950,000 in 2023,
$26,750,000 in 2024, $33,650,000 in 2025, and $33,650,000 in 2026) … with funding
coming from Tax-Supported Debt. In Favour (9) … Opposed (4) S. Hamilton, T.
Cartmell, J. Rice, and K. Principe Carried (9 to 4)." The same four amounts are
in Appendix A on printed page 103 of YF-EV-0114 and on the profile sheet
YF-EV-0117 ("Current Approved Budget … 5,950 26,750 33,650 33,650 … 100,000",
"Approved Funding Sources Tax-Supported Debt").

**"On 2022-12-16" is not in the archive and two archives in this claim's own
evidence list contradict it.** YF-EV-0131 is a composite record of a meeting held
over ten days — its own clerk's note: "The November 30, 2022, City Council -
Budget meeting was held over 10 days: November 30, 2022, December 1, 2022,
December 2, 2022, December 7, 2022, December 9, 2022, December 12, 2022,
December 13, 2022, December 14, 2022, December 15, 2022, and December 16, 2022"
— and it nowhere dates the Amendment 7 vote to a day. 2022-12-16 is the day the
meeting adjourned ("The meeting adjourned at 3:08 p.m., Friday, December 16,
2022"). Against that: YF-EV-0122, captured 2022-12-12 05:58:23 UTC, already
reports the result — "$100 million of spending, requested by Mayor Sohi, and
approved as an amendment to the budget by a 9-4 vote **on Friday**" (the Friday
before that capture is 2022-12-09, which is in the clerk's ten-day list); and
YF-EV-0121, published 2022-12-12, opens "Edmonton city council's decision to put
$100 million towards bike infrastructure across the city **has opened** a
conversation" and links back to an earlier piece, "Edmonton council approves
$100M for bike infrastructure across city". The vote therefore happened on or
before 2022-12-11, not on 2022-12-16. No seat asserted 2022-12-16 as the vote
date either: all three used it only as the *document's* date, and `round2/claude.json`
is careful — "Capital Budget Amendment 7, carried 9 to 4, minutes of City Council
- Budget November 30 to December 16, 2022".

**Fix:** date it to the record, not to a day the record does not carry — "approved
by council 9 to 4 during the 2023-2026 budget deliberations (City Council –
Budget, 30 November to 16 December 2022)". The same repair is needed in the
story's TL;DR bullet 1. If a day is wanted, it needs an archive that states one;
none in the set does.

### KF-3 — cited YF-EV-0115 — **VERIFIED**

The cell is where the claim says it is. Printed page 212 (PDF page 216), header
"Branch - Parks & Roads Services / Approved 2019 - 2022 Budget - Program Summary
/ Program Name - Snow and Ice Control", resources table in $000s: "Expenditure &
Transfers 51,571 67,025 65,962 65,466 64,966 **64,466**" under the columns "2017
Actual / 2018 Adjusted Budget / 2019 Budget / 2020 Budget / 2021 Budget / **2022
Budget**". The same row block gives "Revenue & Transfers … $13" and "Total Net
Operating Requirement … $63,653". 100,000 / 64,466 = 1.551.

### KF-4 — cited YF-EV-0124, YF-EV-0123, YF-EV-0115 — **VERIFIED**

YF-EV-0124, page 1, under "3. Council Directed / Parks and Roads Services":
"Enhanced Snow Clearing Pilot costs (total costs of $16.6 M, less $2.3M from 2021
program surplus **approved by Council on March 14, 2022** to offset additional
costs) ( 14,300) … Transfer from unappropriated Financial Stabilization Reserve
(FSR) ( 14,300)", footer "1 April 19, 2022 - City Council | FCS01143". YF-EV-0123,
item 6.6: "Moved by: T. Cartmell Seconded by: A. Paquette … That the Parks and
Roads Services Branch budget be increased by $4.7 million, from the Financial
Stabilization Reserve, **on a one time basis** to fund the Snow and Ice Control
program for the 2022 portion of the upcoming winter season … Carried (13 to 0)",
minutes headed "City Council Minutes Monday, July 04, 2022". 64,466 + 2,300 +
14,300 + 4,700 = 85,766; 100,000 / 85,766 = 1.166. The sentence's care is
correct and worth naming: it says "Under the brief's calculation", not that
$85.766 million is the City's amended budget, which is exactly the distinction
GPT flagged in round 2 and limitation 3 carries. *Observation, not a grade:* the
March 2022 carry-forward is established only by the April report's parenthetical;
no 2022-03-14 minutes archive is in the set.

### KF-5 — cited YF-EV-0125 — **VERIFIED**

YF-EV-0125 page 38, "Supplemental Information - Attachment 1, Tax-Supported
Operations - December 31, 2022 Financial Results and Projections (in $000's)",
columns Budget / COVID-19 Budget Adjustments / Adjusted Budget / Actual /
Variance: "Snow and Ice Control Revenue 23,108 - 23,108 22,964 (144) (0.6)
**Expense 79,474 - 79,474 97,571 (18,097) (22.8)** Net Position (56,366) -
(56,366) (74,607) (18,241) (32.4)". Footer: "March 14, 2023 - City Council |
FCS01656". 100,000 / 79,474 = 1.258, printed as 1.26. The non-reconciliation is
the panel's own: `round2/gpt.json`, "the adjusted budget does not equal the
printed cell plus the three identified council additions".

### KF-6 — cited YF-EV-0133, YF-EV-0131 — **IMPRECISE**

> "The City's budget fact sheet gives $60.9 million for snow clearing, without a
> year. The panel read it as the 2023 approved total, the base budget plus the
> enhanced snow and ice control package council funded **on 2022-12-16**
> ($3.768 million to Parks and Roads Services and $274,600 to Community Standards
> and Neighbourhoods for 2023). Against $60.9 million the ratio is 1.64."

The substance is right in every part but the date. YF-EV-0133 prints "$60.9
million for snow clearing" with no year attached, in a bulleted list under "4. We
have a lot to renew" beside "$200 million for the High Level Bridge
rehabilitation" and "$127 million for William Hawrelak Park rehabilitation" — so
"without a year" is exactly right, and is the repair `errata.md` records against
GPT's round-1 wording. YF-EV-0131, item 13.18: "Operating Budget Amendment 18,
put: … be funded at 20 per cent on an ongoing basis … 2023 - $274,600 (Community
Standards and Neighbourhoods), and $3,768,000 (Parks and Roads Services) …
Carried (12 to 1)". 100,000 / 60,900 = 1.642, printed as 1.64.

But "on 2022-12-16" has the same defect as KF-2: the composite minutes date no
individual vote, and this one is not even bounded by the other two archives, so
it is unsupported rather than contradicted. The reconciliation figure is sound
against the artifacts — `round1/claude.json`, "CBC 2022-12-16: base $56.9 million
plus $4 million", and `round2/claude.json`, "$60.9 million reconciles with CBC's
reported 2023 base of $56.9 million plus the amendment's $4.04 million for 2023"
(3,768.0 + 274.6 = 4,042.6).

**Supported wording:** "…plus the enhanced snow and ice control package council
funded in the December 2022 budget deliberations (Operating Budget Amendment 18,
carried 12 to 1: $3.768 million to Parks and Roads Services and $274,600 to
Community Standards and Neighbourhoods for 2023)."

*Collateral, not a grade:* the "$56.9 million base" this reconciliation rests on
has no archive at all. `fetch-report.md` records that the CBC page carrying it
timed out and it was correctly not registered. The key fact no longer asserts the
figure — it now says only "the base budget", which is the safer form — and
limitation 4 discloses the dependence in terms ("press reports of the $56.9
million base that the panel used to reconcile them"). That is the right
disclosure; naming the outlet and date there, as `errata.md` does ("CBC
2022-12-16: base $56.9 million plus $4 million"), would let a reader follow it.

### KF-7 — cited YF-EV-0114, YF-EV-0133, YF-EV-0126, YF-EV-0127, YF-EV-0128 — **VERIFIED**

5,950 / 60,900 = 9.77 per cent, printed 9.8. 5,950 + 26,750 + 33,650 = 66,350;
63,574 + 67,090 + 67,554 = 198,218; 66,350 / 198,218 = 33.47 per cent, printed
33.5. Each of the three adjusted budgets is verbatim in its own archive (below).
The label "Same year against same year" is honest about what this is: it is not
the brief's qualification 1(b), which asked for four years of snow budget, and
the claim does not pretend otherwise.

### KF-8 — cited YF-EV-0126, YF-EV-0127, YF-EV-0128 — **VERIFIED**

Verbatim, one row per archive. YF-EV-0126: "Snow and Ice Control Revenue 2,401
2,362 (39) (1.6) **Expense 63,574 54,917** 8,657 13.6". YF-EV-0127 page 59: "Snow
and Ice Control Revenue 2,143 2,116 (27) (1.3) **Expense 67,090 72,086** (4,996)
(7.4)". YF-EV-0128 page 55: "Snow and Ice Control Revenue 967 935 (32) (3.3)
**Expense 67,554 76,648** (9,094) (13.5)". "Under budget in 2023, over it in 2024
and 2025" is the sign of each variance.

### Limitations 1 to 5 — **VERIFIED (5 of 5)**

- **1** (definition-sensitive; 1.55 Partially supported, 1.17 Contradicted, 1.64
  Partially supported). `brief.md` fixes the cutoffs in advance — "Supported if
  the ratio is at least 1.8… Partially supported if… at least 1.5 and below 1.8…
  Contradicted if the ratio is below 1.5" — and says in advance that a differing
  alternative makes the finding definition-sensitive. All three round-2 files
  classify each reading the same way.
- **2** (four years of capital against one year of operating; tested as made).
  `brief.md`, "the proposition keeps both as stated, because a fair-minded holder
  would say that is what they said".
- **3** (the $6.292 million gap, unresolved). 85,766 − 79,474 = 6,292 exactly;
  `round2/gpt.json` raised it and `round2/claude.json` did not close it.
- **4** (no program summary in the 2023-2026 operating budget). Tested directly
  against the uncited archive YF-EV-0116: the string "Program Summary" occurs
  **zero** times in all 804 pages, and Snow and Ice Control appears there only as
  a service description and as service-package tables (pages 105-106, 289, 364).
  The rest of the sentence — fact sheet, December amendment, press base — matches
  KF-6.
- **5** (two City bases differing by $3 million to $10 million a year; the second
  now cited as YF-EV-0136). Verbatim in that archive: "Snow & Ice Control Program
  Summary by Account Category ($000) 2023 Actual 2024 Actual 2025 Actual 2025
  Approved Budget 2026 Approved Budget … **Subtotal 51,750 64,749 66,588** 68,618
  72,645", footer "FCS03370 Attachment 1". Against the year-end series the
  differences are 3,167, 7,337 and 10,060 — "$3 million to $10 million" is exact.
  The archive also carries the reason: "Note: 1) FTEs are not shown separately
  under Snow & Ice Control", where the 2022 primary cell carried 225.9 FTE.

### Unknowns 1 and 2 — **VERIFIED (2 of 2)**

Unknown 1 is `round2/gpt.json`'s own open item, "The exact reconciliation from the
printed $64.466 million 2022 cell to the $79.474 million year-end adjusted expense
budget". Unknown 2 is `round1/claude.json`'s, "Which figure the advocacy page's
author had in mind… (no figure appears on the page)", and I confirmed the absence
in the archive.

### Missing evidence 1 — **VERIFIED**

The single-basis annual series is what every seat's own missing-evidence and
unknowns lists ask for, and it follows from limitations 4 and 5. Holder and
importance match the seats' fields. The near-miss it now names checks out
exactly: YF-EV-0139 is two pages headed "Attachment 2 Snow and Ice Control Budget
(2022-26)" and "Attachment 2 Projected Service Levels (2022-26)", footer "June
19, 2023 - Community and Public Services Committee | CO01733", and those two
headers plus a page-number line are **the entire extractable text of both pages**
— the figures really are drawn, not printed, so "from which no figure can be read
to the precision the ratio needs" is right, and registering the near-miss rather
than omitting it is the stronger form.

### Review block — 11 statements, **10 VERIFIED, 1 IMPRECISE**

Verdict and confidence for all three seats: `round1` and `round2` files all
return `Partially supported` / `High`; all three `verdict_changes` arrays are
empty; `synthesis.json` records `basis: round1`, `round2_documented: true`,
`Partially supported` / `Unanimous`; `disagreements.json` is empty. Claude's two
key findings and its `changed_between_rounds` are its own round-1 and round-2
text (1.551, 85.766/1.166, 79.474/1.258, the two-bases bullet). GPT's two key
findings and its `changed_between_rounds` are its own ("recomputed Alternative A
at 1.166" is in `round2/gpt.json`). Gemini's `changed_between_rounds` matches its
`evidence_i_missed` list bullet for bullet.

**IMPRECISE — Gemini key finding.**

> "The word double is an overstatement under every reading: 1.55 on the printed
> cell, 1.45 with the July addition, 1.64 on the 2023 figure."

This is Gemini's **round-1** set, verbatim in substance: `round1/gemini.json`,
"Under Alternative A, the ratio drops to 1.45 (Contradicted). Under Alternative
B, it is 1.64 (Partially supported). The word 'double' is an overstatement under
all readings." Gemini superseded both figures in round 2: `round2/gemini.json`
gives "ALTERNATIVE A … $85.766M. Ratio: **1.166**" and "ALTERNATIVE B … the ratio
is **1.573**"; 1.64 appears nowhere in its round-2 file. Presenting 1.45 and 1.64
as this seat's live findings, beside a `changed_between_rounds` line saying it
acknowledged the very additions that move 1.45 to 1.166, tells the reader two
things that do not sit together. The synthesis basis is round 1, so quoting round
1 is legitimate; not saying so is not.

**Supported wording:** "The word double is an overstatement under every reading:
1.55 on the printed cell, and 1.45 in round 1 on the July addition alone,
recomputed to 1.17 in round 2 once the March and April additions were counted."

---

## Claim: `at-100m-vs-roads` — 26 statements, **26 VERIFIED**

### KF-1 — cited YF-EV-0121, YF-EV-0131 — **VERIFIED**

Verbatim in the archive: "Ward papastew Coun. Michael Janz said comparing the
funding for bike lanes to funding for homelessness is a red herring. 'Only $100
million is going to bike lanes but $1.8 billion, 180 times as much, is going
towards roads.'" 1,800 / 100 = 18. "No other record of the remark was found" is
correctly passive and matches `round1/claude.json`: "the figure appears only in
that article; the council minutes do not record debate speech, and no other
coverage I found repeats the sentence with either number." The minutes negative is
the minutes' own form: motions, movers, recorded votes, no speech.

### KF-2 — cited YF-EV-0114 — **VERIFIED**

Printed page 56, Table 8 "Adopted Capital Budget by Service", under "Movement of
People and Goods": "**Active Pathways and Roads Service 622.8 1,171.2 1,794.0**
5.6 103.0 108.6 1,902.6". No roads-only line appears anywhere in Table 8 or its
continuation on page 57. That the line contains CM-20-0330 follows from the
profile's own placement in Appendix B under "MOVEMENT OF PEOPLE AND GOODS /
Active Pathways and Roads Service" and is the point every seat insists on
(`round2/gpt.json`: "Its published name is Active Pathways and Roads Service, and
it includes CM-20-0330 and other active-pathway funding").

### KF-3 — cited YF-EV-0114 — **VERIFIED**

Reproduced independently from the archive rather than taken from the seats. The
161 profile sheets carry 20 "Roads" and 11 "Neighbourhood Renewal" labels; the
three bridge profiles and CM-20-0330 carry none. Excluding 21-20-2100 (170 Street
Pedestrian Bridge, 471) and 14-66-2570 (Parking Control Technology, 2,100), the
Roads profiles sum to **1,116,532**; the Neighbourhood Renewal profiles to
**722,289**; and 23-24-0300 (97,000) + 21-24-9301 (9,832) + 21-24-9302 (50) to
**106,882**. Total **1,945,703** ($000s), 19.457 times. Every figure lands to the
thousand. "All three seats reached the same total; two of them reproduced it
profile by profile" is precisely right and is the repair the record calls for:
`errata.md` under Claude records that Gemini's "per-profile list with Appendix A
pages are absent. Omissions, not wrong figures; the sums gemini does give (1,945.7;
1,116.5; 722.3; 106.9; 1,794.0) match mine and gpt's."

### KF-4 — cited YF-EV-0114 — **VERIFIED**

The four Yellowhead profiles carry the "Roads" label on their sheets and sum to
21-20-9301 54,634 + 21-20-9302 54,597 + CM-99-0060 7,914 + CM-99-9600 376,255 =
**493,400** — identical to Table 8's own "Yellowhead Trail Freeway Conversion
493.4", which sits under "TRANSFORMING FOR THE FUTURE / Total Transformational
Projects", not under the Active Pathways and Roads line. 1,945,703 − 493,400 =
1,452,303, "about $1.45 billion". The narrowest reading is 1,116,532, "$1.117
billion".

### KF-5 — cited YF-EV-0134 — **VERIFIED**

Verbatim on the archived page under "Correcting misinformation about the $100
Million expenditure": "The $100M represents half a percent of the $1.8 Billion
dollar capital budget over the same period." 100 / 1,800 = 5.56 per cent.

### KF-6 — cited YF-EV-0114, YF-EV-0132, YF-EV-0137 — **VERIFIED**

7,192.5 is Table 8's own "Grand Total 4,997.6 2,194.9 **7,192.5**" on printed page
57; 100 / 7,192.5 = 1.39 per cent, printed 1.4. 2,256.0 is "Total Movement of
People and Goods 915.4 1,340.6 **2,256.0**" on page 56; 100 / 2,256.0 = 4.43 per
cent, printed 4.4. YF-EV-0132 verbatim: "$100 million for the active
transportation network expansion. It makes up 2% of the approximately $5 billion
capital budget for transportation projects, including roads and bridges." The
third citation added during the audit corroborates it in a dated document rather
than an undated web page — YF-EV-0137, the 2025 Infrastructure Report: "This
funding makes up just two per cent of the $5 billion from the 2023-2026 Capital
Budget for transportation projects, including roads and bridges." That is the
right direction of repair. *Observation:* the three City sources disagree on the
forward route figure — YF-EV-0118 says "an additional 24 km estimated to be
complete in 2026", YF-EV-0132 "an additional 33 kilometres planned for
construction in 2026 and beyond", YF-EV-0137 "an additional 30 kilometres planned
for construction". The claim publishes only the report's own 24 km, which is the
right one to take, but the spread is worth knowing if the figure is ever reused.

### KF-7 — cited YF-EV-0119, YF-EV-0120, YF-EV-0129, YF-EV-0130 — **VERIFIED**

Each cumulative figure sits in its own year's report on the CM-20-0330 line:
YF-EV-0119 "Active Transportation Implementation Acceleration - Approach 3
100,000 **807** 100,000"; YF-EV-0120 "… 100,000 **10,496** 100,000"; YF-EV-0129
"… **99,570 39,984** 99,570 … Budget Status - % within acceptable tolerance: 100%
Schedule Status - % within acceptable tolerance: 100%". YF-EV-0130 carries the
transfer line "**430,000** CM-20-0330 Active Transportation Implementation
Acceleration - Approach 3 … Tax-Supported Debt (20,000) (410,000) - - - (430,000)".
"Cumulative spending remains below the approved amount" is the right, neutral
form for a capital profile with a 2030 completion date.

### KF-8 — cited YF-EV-0118, YF-EV-0135 — **VERIFIED**

Verbatim in YF-EV-0118, executive summary: "Throughout 2024 and 2025,
approximately 35 km of new routes were installed, with an additional 24 km
estimated to be complete in 2026." The report is headed "August 26, 2026,
Infrastructure Services report IS03688" and YF-EV-0135 is the minutes of the
2026-08-26 committee meeting that received it as item 7.6, which is what makes
"reported to the Infrastructure Committee on 2026-08-26" true. *Collateral:* the
km figures are **not** in YF-EV-0135's bytes — the string "km" occurs nowhere in
it — so that entry's `establishes` line overclaims; see the collateral section.

### Limitations 1 to 4 — **VERIFIED (4 of 4)**

- **1** (a construction under a predeclared rule, not a City figure; both
  readings clear $1.5 billion, the narrowest does not). `brief.md` fixes the
  boundary, the exception list and the $1.5 billion cutoff before any result;
  1,945.703 and 1,794.0 clear it, 1,116.532 does not. `round2/gpt.json` says the
  same in terms: "it is not a City-published roads-only total".
- **2** (the verdict is on the two dollar figures; "180 times" not tested
  separately). `brief.md`: "The brief does not test '180 times' as a separate
  claim."
- **3** (approvals not spending; roads actuals by year not compiled).
  `round2/claude.json`: "Qualification 3, actuals: no consistent published series
  for the whole roads set." The to-date figures it does give are cumulative, not
  annual, and cover six profiles, not the set.
- **4** (later adjustments; no roads-only as-amended total). The June 2026 figure
  is now cited to an archive and is verbatim in it — YF-EV-0138: "On June 16,
  2026, Council discussed the final capital budget adjustment for the 2023 to
  2026 budget cycle… Council approved the recommended adjustments resulting in a
  **$126.6 million (1.10%) net increase to the $11.56 billion capital budget**."
  The 2024 and 2025 increases rest on `round2/claude.json` ("Fall 2024 SCBA …
  recommended net increase of $151.8 million; Fall 2025 SCBA … net increase $98.2
  million"), and the negative on the same file: "no roads-only as-amended total
  is published and I did not rebuild it profile by profile". *Observation:* the
  two supplemental adjustment reports themselves are still unregistered; the
  limitation asserts only that increases happened, which the seat establishes,
  and names no unarchived figure for either.

### Unknowns 1 and 2 — **VERIFIED (2 of 2)**

"The reviewers found only one record of the remark" matches KF-1's basis exactly.
Unknown 2 is `round2/gpt.json`'s own gap.

### Missing evidence 1 — **VERIFIED**

A City-published roads-only total or a profile-to-Table-8 mapping is exactly what
limitation 1 and every seat's construction imply is absent; `round2/gpt.json`
states the absence.

### Review block — 11 statements, **11 VERIFIED**

All six round files return `Supported` / `High`; `verdict_changes` empty in all
three round-2 files; `synthesis.json` gives `Supported` / `Unanimous`. Claude's
"161 profile sheets" is its own — `round2/claude.json`, "161 profile sheets
(pages 376-670): 20 'Roads', 11 'Neighbourhood Renewal'; the three bridges and
CM-20-0330 blank" — and my independent parse returns the same three counts and
the same 19.46. Its second finding and its `changed_between_rounds` (page-number
and citation slips; the project page's 2 per cent) are in its round-2
`errors_in_other_reviews` and its evidence list. GPT's two findings and its
reworded `changed_between_rounds` ("took the complete per-profile membership and
the widest-reading total from the cross-review") match `round2/gpt.json` bullet
for bullet. Gemini's finding and "No change" match `round2/gemini.json`.

---

## Story: `active-transportation`

### `one_line` — **VERIFIED**

> "The $100 million for bike lanes is approved over four budget years: about 1.5
> times one year's snow-clearing budget, not double, and roads get about 19 times
> as much."

1.551 and 19.457 on the two primary readings; "approved over four budget years"
is Appendix A's own 2023-2026 schedule and is the correction of the launch
slate's parked "a year" wording.

### TL;DR 1 — **UNSUPPORTED** (the date)

Same defect as KF-2, in the same words: "on 2022-12-16". Amounts, the 9-to-4
split and the tax-supported debt all verify; the date is not in YF-EV-0131 and is
contradicted by YF-EV-0122 and YF-EV-0121. **Fix:** as at KF-2 — "Council
approved capital profile CM-20-0330 in the December 2022 budget deliberations, 9
to 4, at…".

### TL;DR 2 — **VERIFIED**

64,466 → "$64.5 million"; 1.551 → 1.55; 85,766 → "$85.8 million"; 1.166 → 1.17.
"The brief's calculation" is the right hedge and matches limitation 3.

### TL;DR 3 — **VERIFIED**

1,945.703 → "$1.95 billion"; 1,794.0 → "$1.79 billion"; the combined line
contains CM-20-0330.

### TL;DR 4 — **VERIFIED**

The quotation, the arithmetic, the councillor's page and 5.6 per cent, as at
roads KF-1 and KF-5.

### TL;DR 5 — **VERIFIED**

39,984 → "$40.0 million"; 99,570 → "$99.6 million"; 807 / 9,689 / 29,488 →
"$0.8 million in 2023, $9.7 million in 2024, $29.5 million in 2025"; 66,350 →
"$66.35 million"; 35 km from YF-EV-0118. Every one of those is a differenced or
transcribed figure in `scripts/calcs/active-transportation.ts`, and the module
reproduces them from the archived cells.

### Changelog, 2026-09-02, published — **VERIFIED**

Both registered wordings are on `intake/register.yaml` as `outcome: PARK` with
reasons and reopening conditions, attributed there to framing check 1 exactly as
the note says ("framing check 1 … found the annual form uncaptured"; "framing
check 1 reached the same conclusion independently"). The halt is verbatim in
`reviews/active-transportation/2026-09-02/framing/panel-concern.md`: "MATERIAL
FRAMING CONCERN. The brief fixes the primary denominator as 'the approved 2022
gross Snow and Ice Control expenditure budget…'. The public record holds two
different 'approved 2022' gross figures and the verdict word flips between them",
and the same file records "Three seats, three denominators, two verdict words".
"The brief was fixed to a printed cell and rerun blind" is `intake.md`'s own
account and `run.yaml`'s six blind seat runs; `framing/check-2.md` reads "Verdict:
FRAME OK".

### Body — 40 statements, **38 VERIFIED, 1 IMPRECISE, 1 UNSUPPORTED**

**VERIFIED (38).** The opening framing (the brief's own "the figure is almost
always stated as a comparison"); "an approval, not a rate"; the profile's full
name and number, against Appendix A page 103 and the sheet on page 540; "in what
the City calls the redeveloping area, inside Anthony Henday Drive", which is the
City's own parenthesis twice over — YF-EV-0132, "redeveloping areas of the city
(inside Anthony Henday Drive)", and YF-EV-0118, "redeveloping areas of the city
(within Anthony Henday Drive)" — resting on the sheet's "the bike network in the
redeveloping area"; "The vote split nine to four"; "allocated unevenly: a small
first year, then three larger ones" (5,950 against 26,750 / 33,650 / 33,650);
the project page's 2 per cent of roughly $5 billion; "permission to spend, not
money out the door", which is the brief's own instruction and the profile's own
form; "$40.0 million had gone out by the close of 2025 against the $66.35 million
allocated to 2023, 2024 and 2025, most of it in 2025" (29,488 of 39,984 is 74 per
cent); "Administration told council that the less complex routes were designed
and installed first and the complex ones planned for later", which is IS03688
almost verbatim — "Implement routes of low complexity first… Less complex
locations, with fewer options or trade-offs requiring evaluation, were designed
and installed first. Routes that require more complex design solutions… were
planned for later delivery"; "the City's own year-end update reports the profile
within its schedule tolerance" (YF-EV-0129, "Schedule Status - % within
acceptable tolerance: 100%"); "The City's next financial updates, covering the
first half of 2026, are scheduled for council on 2026-09-08, after this story's
as-of date", added during the audit and verbatim in YF-EV-0138 ("September 8,
2026, the City will present Council with our latest operating and capital
financial updates (current to June 30, 2026)"), with `as_of: "2026-09-02"` in the
story's own front matter; the whole snow section — the 2022-12-12 capture and
its silence on a snow figure, the brief's cell fixed before any reviewer looked,
1.55, "all three model reviewers classified the claim the same way", "Winter 2022
was expensive" (an $18.097 million overspend), the three one-time additions
totalling $21.3 million, 1.17 on the brief's calculation, $79.5 million and 1.26,
$60.9 million and 1.64 with the fact-sheet attribution now correct, "None of
these readings reaches double" (1.55, 1.17, 1.26, 1.64, and the context readings
1.571 net and 1.446 July-only, all below the 1.8 cutoff), definition-sensitivity;
"one year of operating money" against four years of capital; "about a tenth" and
"about a third" (9.8 and 33.5 per cent); "actual snow and ice control expense
exceeded the adjusted budget in 2022, 2024 and 2025, and came in under it in
2023"; the Global News quotation and "$1.8 billion is eighteen times $100
million"; "The reviewers found no other record of the remark; council minutes
record motions and votes rather than debate"; "The City publishes no roads-only
total… which at $1.79 billion closely matches the councillor's figure, and which
contains the bike program itself"; the predeclared boundary and its two named
exclusions; the Yellowhead explanation, $1.45 billion and $1.12 billion and the
$1.5 billion line; "half a percent" and 5.6 per cent; "$7.2 billion capital
budget… 1.4 per cent"; the parked congestion claim with the register's own reason
and reopening condition; "Whether the lanes are used is a separate registered
claim" (`intake/register.yaml`, `bike-lanes-nobody-rides`, `outcome: GO`, "brief
to follow"); and the closing paragraph's "1.55 … between 1.17 and 1.64 … never
double … about 40 per cent" (39,984 / 99,570 = 40.2 per cent).

**UNSUPPORTED — "in August 2026 the Infrastructure Committee declined
administration's recommendation to re-evaluate 14 of the routes still to come."**

Two separate failures, and neither figure nor verb is in any archive.

*The 14.* The string "14" does not occur in YF-EV-0118 at all, nor in
YF-EV-0135, nor in any of the six round files. Its only occurrence anywhere in
the run is `brief.md`'s own selection-rationale prose — "a recommendation to
re-evaluate 14 of the program's remaining routes and declined it" — which is the
editor's framing text, not evidence, and which the story has inherited whole. The
number of routes in the report's Attachment 5 cannot be checked because
Attachment 5 was not archived; only the main report body was.

*The verb.* The minutes record the opposite shape of event. Administration's
recommendation was "That the updated approach for the remaining routes… as
outlined in Attachment 5… be approved". YF-EV-0135 shows that recommendation was
**never put**. Councillor Salvador moved a substitute — "That Administration:
Continue implementation of the Active Transportation Network Expansion Program in
accordance with the previously approved scope of Capital Profile CM-20-0330;
Immediately advance procurement for tender-ready routes…" — an amendment to it
was defeated 2 to 2, and then the substitute itself was defeated: "In Favour (2)
A. Salvador, and M. Janz Opposed (2) E. Rutherford, and R. Clarke **Defeated (2 to
2)**". The only motion on item 7.6 that carried was the one keeping Attachment 4
private (4 to 0). The committee made no recommendation either way. If anything
the defeated motion was the one that would have overridden administration, so
"declined administration's recommendation" reads backwards.

**Fix:** replace with what the minutes carry, or drop the sentence. Supported
wording: "and in August 2026 the Infrastructure Committee took no decision on the
routes still to come: administration's recommended new approach was not put, and
a motion to continue the program under its approved scope was defeated on a tied
vote." If "14" is wanted, Attachment 5 of IS03688 must be captured and registered
first. The same repair is owed to `brief.md`'s selection rationale, which is where
the error entered.

**IMPRECISE — "All three seats summed the same profiles to the same total, $1.95
billion, about nineteen times the bike program."**

The total is right and all three seats did reach it. "Summed the same profiles"
says more than that: it says each seat did the profile-level sum, and the run's
own record says one did not. `errata.md` under Claude: Gemini's "per-profile list
with Appendix A pages are absent. Omissions, not wrong figures; the sums gemini
does give (1,945.7; 1,116.5; 722.3; 106.9; 1,794.0) match mine and gpt's." The
roads claim's KF-3 was repaired for exactly this and now reads "All three seats
reached the same total; two of them reproduced it profile by profile" — the story
has not been brought into step with it.

**Fix:** "All three seats reached the same total, $1.95 billion, about nineteen
times the bike program, and two of them reproduced it profile by profile."

---

## Collateral checks

**YF-EV-0135's `establishes` line overclaims.** It reads "…and the report's
statement that approximately 35 km of new routes were installed through 2024 and
2025 with an additional 24 km estimated for 2026." Those figures are in
YF-EV-0118; the minutes archive contains no "km" and no route counts at all. It
also says the entry establishes "the disposition of report IS03688", which is
true but thinner than the claim pairing suggests. Recommended: "The committee's
record of its 2026-08-26 meeting, including that report IS03688 was before it as
item 7.6, the speakers heard, and the defeat on a tied vote of a motion to
continue the program under its approved scope. Establishes what the committee did
with the report; it carries no route lengths and no route counts."

**YF-EV-0118's `establishes` line names a document the report does not.** It says
the report recommends "a modified approach for routes not yet under
construction". The recommendation as printed is "That the updated approach for
the remaining routes… as outlined in Attachment 5… be approved" — and Attachment
5 is not in the archive. The rest of the entry (the $100 million, the 35 km and
24 km, the rapid-implementation trade-offs, "over 1,000 email and phone
inquiries", "would not change capital profile CM-20-0330") verifies against the
bytes. Recommended: quote the recommendation's own wording and say Attachment 5,
which carries the route-level detail, is not captured.

**The four registry entries added during the audit are clean.** Each hashes
against its recorded `sha256` and each `establishes` line is carried by its own
bytes. YF-EV-0136: "Subtotal 51,750 64,749 66,588", and the entry correctly stops
short of saying which basis the year-end tables use. YF-EV-0137: "Budget $100
million / Target Construction Completion 2027" on printed page 15, and "This
funding makes up just two per cent of the $5 billion from the 2023-2026 Capital
Budget for transportation projects, including roads and bridges" — the entry's
claim that it is "a stronger record than the project web page that says the same"
holds, since this one is dated and paginated. YF-EV-0138: the June 16 adjustment
and the 2026-09-08 update date, both verbatim, and the entry says in terms that
"the adjustment report itself is the instrument", which is the right hedge for a
landing page. YF-EV-0139: two pages whose entire extractable text is two headers
and a folio, which is exactly what "the archived bytes carry no extractable
numbers" claims — a registered near-miss rather than a silent gap, and the
better practice.

**`scripts/calcs/active-transportation.ts` cites a wrong report number.** The
comment on `snowYearEndThousands` says the 2022 figures come from the December 31
operating financial update "(FCS01636 attachment)". The archive's own page footer
reads "March 14, 2023 - City Council | **FCS01656**", and both `round1/claude.json`
and `errata.md` use FCS01656. A one-digit slip in a comment, but it is the
pointer a future auditor follows. The same comment block's "Table 7 / Table 8
totals" is loose: 7,192.5 is the Grand Total on printed page 57, the continuation
of Table 8, and the same figure appears as "Total Adopted Capital Budget"
7,192,540 in $000s earlier in the document.

**YF-EV-0125 carries no `published_on`.** Every sibling year-end update
(YF-EV-0126 to 0128) has one. The archive dates itself: "March 14, 2023 - City
Council | FCS01656".

**The profile's name differs between the minutes and the budget.** YF-EV-0131
approves "CM-20-0330 - Bike Plan Implementation - Approach 3"; YF-EV-0114 and
YF-EV-0117 print "Active Transportation Implementation Acceleration - Approach
3". Neither claim nor the story asserts the minutes use the budget's name, so
nothing here is wrong; `round2/claude.json` flags the difference in terms, and it
is worth keeping visible if anyone later cites the minutes for the name.

**No private individual is named and no residential identifier appears anywhere
in the audited text.** The only individuals named are Councillor Michael Janz and
Councillor Jennifer Rice, both public officials, and Mayor Sohi does not appear.
(The archives themselves carry public speakers' and commenters' names — YF-EV-0135
lists the delegation and public speakers, YF-EV-0122 carries a comment thread —
but none of that reaches the published text.)

**No absolute local path appears in the audited text.** The one `file://` in
`scripts/calcs/active-transportation.ts` is the standard
`import.meta.url === \`file://${process.argv[1]}\`` main-module guard, a template
literal evaluated at run time, not a captured path.

**Run metadata is consistent.** `run.yaml` records six seat runs, three per
round, each with its pinned command, CLI version, model id, reasoning effort and
prompt hash under methodology v1.14; `disagreements.json` is empty;
`synthesis.json` records `basis: round1` with `round2_documented: true`; all
three round-2 files carry empty `verdict_changes`; `framing/check-2.md` reads
"Verdict: FRAME OK". `errata.md` discloses the Gemini seat's two attempts and the
`$schema`-key packaging fault, and `run.yaml` records `attempts: 2` for that row.

---

## Counts

| | Snow claim | Roads claim | Story | Total |
|---|---|---|---|---|
| Statements checked | 27 | 26 | 47 | **100** |
| VERIFIED | 24 | 26 | 44 | **94** |
| IMPRECISE | 2 | 0 | 1 | **3** |
| UNSUPPORTED | 1 | 0 | 2 | **3** |
| SKIPPED | 0 | 0 | 0 | **0** |

Registry entries read against their bytes: 26 of 26 hash clean; two
`establishes` lines need repair (below). `npm run validate` passes: 6 stories,
10 claims, 1 commitment, 6 topics, 139 evidence entries.

The six are three defects:

1. **A vote date the record does not carry, in three places** (snow KF-2, snow
   KF-6, story TL;DR 1). The archived minutes are a composite of a ten-day
   meeting and date no individual vote; 2022-12-16 is the adjournment date. For
   the capital amendment the date is not merely absent but contradicted by two
   archives in the claim's own evidence list, which put the 9-to-4 vote on or
   before 2022-12-11.
2. **A committee decision and a route count with no source** (story body). "14"
   exists only in the brief's selection rationale; the minutes show administration's
   recommendation was never put and the substitute motion was defeated on a tie.
3. **Two attribution slips already fixed on one side of the pair but not the
   other**: the Gemini seat's superseded round-1 ratios presented as live
   findings, and "all three seats summed the same profiles" in the story where
   the claim now says two of the three did.

## Verdict

**GATE FAIL.**

Three unsupported statements, and one of them — the Infrastructure Committee
sentence — asserts a decision the archived minutes do not record and a number no
archive contains. That is the defect this gate exists to catch, and it entered
through the brief's own selection-rationale prose rather than through any seat,
which is worth naming: **the brief's framing and rationale sections are not
evidence, and a figure that appears only there has not been sourced.** The
$100 million story is otherwise unusually clean. Every dollar figure, ratio and
share in the graded text reproduces against a source cell, the roads-only sum
rebuilds to the thousand from the archived profile sheets under a boundary fixed
before any result was seen, and the two claims are candid about the one thing
that could have been buried — that the snow verdict word moves with the
denominator, and that the roads total is a construction the City does not
publish.

None of the six touches either finding. The snow ratio is 1.551 on the cell the
brief named whatever day the vote fell on; the roads total is $1,945.703 million
whether three seats or two reproduced it profile by profile; and neither the 14
routes nor the committee's disposition bears on any verdict figure. All six are
repairable in one pass, and four of them by copying wording that already exists
elsewhere in the same tree.

A second pass need only re-read the six statements above, plus the two registry
`establishes` lines and the calcs comment named under collateral.

---

## Pass 2, 2026-09-02

Scope: the six non-VERIFIED items above in the wording now in the tree, the new
archive YF-EV-0140, the two registry `establishes` lines and the calcs comment
named under collateral, the `errata.md` record of the brief's error, and the four
sentences the page critique changed after pass 1 (the opening paragraph, the
snow section's "1.55 times a year of snow clearing" sentence, the roads section's
"Both of those fall short" sentence, and the closing paragraph). Same method,
same archives, same run artifacts, no web access. Graded state: commit `f9160fc`,
story `md5 ee8a3cff…`, snow claim `0fe40620…`, roads claim `454259f3…`, calcs
`447a8882…`.

**Integrity.** YF-EV-0140 hashes clean against its registry entry
(`7acca16e…`), as do the five entries this pass touches or leans on (YF-EV-0114,
0115, 0118, 0135, 0140). `npm run validate` passes: 6 stories, 10 claims, 1
commitment, 6 topics, 140 evidence entries. `scripts/calcs/active-transportation.ts`
still reproduces every published ratio from the archived cells: 1.551, 1.166,
1.258, 1,945.703, 19.46, 40.2.

### The new archive, YF-EV-0140 — **VERIFIED**

Two pages, headed "REPLACEMENT Attachment 5 / Modified Approach for the Active
Transportation Network Expansion Program", footer "August 26, 2026 -
Infrastructure Committee | IS03688". Both counts are in the bytes and I counted
the bullets rather than taking the registry's word:

- **13 continuing.** "The following projects will continue as planned:" is
  followed by exactly thirteen bullets, 50 Street (109A Avenue to Goldbar Park
  Road) through Victoria Park Road (116 Street to River Valley Road).
- **14 re-evaluated.** "If Council approves the approach, the following projects
  may be re-evaluated using alternate design approaches." is followed by exactly
  fourteen bullets, 50 Street (101 Avenue to 109A Avenue) through the Grovenor
  group.

The rest of the entry's `establishes` line is verbatim too: "The modified
approach would apply only to routes under the Active Transportation Network
Expansion Program (Capital Profile CM-20-0330) that have not yet started
construction"; "Routes that are planned, and where plans do not impact travel
lanes or parking will continue as planned"; "In Q1 2027, Administration will
bring forward a report outlining trade-offs and options for the remaining routes,
including an update on the remaining funding and budget implications". The
closing negative — "it does not establish what the committee decided" — is right,
and the document's own conditional ("**If** Council approves the approach") is
what makes it right.

### The six items

**1. Snow KF-2 — was UNSUPPORTED, now VERIFIED.** "approved by council in its
December 2022 budget deliberations (9 to 4)". The date is now the record's own
scope rather than a day the record does not carry, and the vote was in December
2022 on every reading available: the minutes' clerk's note lists the ten sitting
days, and the two archives that bound the vote (YF-EV-0122's "9-4 vote on Friday"
captured 2022-12-12, YF-EV-0121 of 2022-12-12 treating the decision as made) put
it at 2022-12-09 or thereabouts. The first run's own intake record says so
independently: "Council approved the $100 million on **2022-12-09** as part of
the 2023-2026 capital budget (vote reported as 9 to 4)." *Observation, not a
grade:* the deliberations opened 2022-11-30, so "December 2022 budget
deliberations" names the round by the month it concluded and voted, which is the
brief's own phrasing ("during council's 2023-2026 budget deliberations in
December 2022") and is not misleading.

**2. Story TL;DR 1 — was UNSUPPORTED, now VERIFIED.** "during its 2023-2026
budget deliberations in December 2022, 9 to 4". Better than the claim's wording,
in fact: it names the budget cycle, which is the minutes' own subject.

**3. Story committee sentence — was UNSUPPORTED, now VERIFIED.**

> "On 2026-08-26 administration asked the Infrastructure Committee to let it
> re-evaluate 14 named routes that had not started construction; the minutes show
> no decision was taken, because the recommendation was never put and a motion to
> carry on under the approved scope was defeated on a tied vote."

Every element now sits on bytes. The 14 and "not yet started construction" are
YF-EV-0140, counted above. The recommendation is YF-EV-0118 page 1, "That the
updated approach for the remaining routes… as outlined in Attachment 5… be
approved". "Never put" is a clean negative in YF-EV-0135: the string "updated
approach" occurs **nowhere** in the minutes, so the recommendation was not merely
lost on a vote, it was never moved. The defeat is verbatim: "In Favour (2) A.
Salvador, and M. Janz Opposed (2) E. Rutherford, and R. Clarke **Defeated (2 to
2)**", on a motion to "Continue implementation… in accordance with the previously
approved scope of Capital Profile CM-20-0330". The only motion carried on item
7.6 kept Attachment 4 private, 4 to 0. This is the strongest repair in the batch:
the sentence went from an unsourced number and an inverted verb to a
route-by-route count and the minutes' own sequence.

**4. Snow KF-6 — was IMPRECISE, now VERIFIED.** "council funded in the same
December 2022 deliberations" replaces the unsupported day. Operating Budget
Amendment 18 and its two 2023 amounts are verbatim in YF-EV-0131 and carried 12
to 1 in the same minutes, so "the same deliberations" is exactly what the archive
supports.

**5. Snow, Gemini key finding — was IMPRECISE, now VERIFIED.**

> "In round 1: the word double is an overstatement under every reading, 1.55 on
> the printed cell, 1.45 with the July addition, 1.64 on the 2023 figure;
> recomputed in round 2 to 1.17 and 1.57 after the additions it had missed."

Both halves check. `round1/gemini.json`: "The ratio under the primary denominator
is 1.55… Under Alternative A, the ratio drops to 1.45 (Contradicted). Under
Alternative B, it is 1.64… The word 'double' is an overstatement under all
readings." `round2/gemini.json`: "adding council amendments of $2.3M (March 14),
$14.3M (April 19), and $4.7M (July 4)… Ratio: **1.166**" and "the ratio is
**1.573**". The round is now labelled and the supersession is on the page.
*Observation:* the round-2 1.573 is against a different denominator as well as a
different amendment list — Gemini switched Alternative B from the fact sheet's
$60.9 million to the 2023 adjusted expense budget of $63.574 million — so the
1.64 → 1.57 pairing is a recomputation of the same *slot*, not of the same
division. "Recomputed" is the right verb for that and the sentence claims no more.

**6. Story "summed the same profiles" — was IMPRECISE, now VERIFIED.** Now "All
three seats reached the same total, $1.95 billion, about nineteen times the bike
program, and two of them rebuilt it profile by profile", which matches the roads
claim's KF-3 and `errata.md`'s record that Gemini's per-profile list was absent
while its five sums matched.

### The four sentences the critique changed

**Opening paragraph — IMPRECISE.** New finding, and one I under-graded in pass 1
rather than a regression the critique introduced.

> "Since council's budget vote of December 2022, **opponents** of Edmonton's bike
> lanes **have compared** the $100 million program with what the City spends
> clearing snow, and **supporters have compared** it with what the City spends on
> roads."

The rest of the paragraph is right and is an improvement: "This story tests one
comparison from each side, in the words each was captured using" is the brief's
own scope, and "Neither comparison says whether the program is worth it, well
used or good for traffic, and neither verdict does" is the brief's out-of-scope
list. The rewrite also dropped two unmeasured claims the earlier draft carried
("have travelled together", "almost never stated on its own"), so on balance it
is a net gain.

But the plural group attribution is the one thing `brief.md` predeclares it will
not say: "Each comparison was captured from one identified holder; **the brief
does not claim either comparison is common**, only that each was made publicly,
in the budget debate, by a party to it." The snow comparison rests on exactly one
captured holder, the Common Sense Edmonton campaign page (YF-EV-0122); the
roads comparison on one councillor, in a news quotation and on his own page
(YF-EV-0121, YF-EV-0134). The captured Facebook thread carries no second holder
of either comparison — its only "snow clearing" line is "Fix our roads and
sidewalks. Improve snow clearing", which is not the budget comparison, and its
roads line is the separate "around 1% of the capital expansion budget for roads"
form, registered as its own candidate. Writing "opponents… have compared" and
"supporters have compared" tells a reader the comparisons are group habits where
the frozen brief refused to claim it.

**Fix:** say what the body already says. "Since council's budget vote of December
2022, a campaign against Edmonton's bike lanes has compared the $100 million
program with what the City spends clearing snow, and a councillor who backed it
has compared the same figure with what the City spends on roads."

**Snow, "1.55 times a year of snow clearing" — VERIFIED.** "Against that cell,
$100 million is 1.55 times a year of snow clearing: more than a year of snow
clearing, and not almost double." 100,000 / 64,466 = 1.551. Naming the figure
rather than rounding it to "about one and a half times" is the stronger form. The
gloss "more than a year of snow clearing" understates the brief's own band
description ("well above the snow budget"), which is a safe direction to err in.
The following sentence — "Whether the figure counts as 'partially supported' or
'contradicted' under the thresholds fixed in advance depends on which snow budget
you divide by" — is verified against `brief.md`'s cutoffs and against the three
round-2 files, which classify 1.551 Partially supported and 1.166 Contradicted.

**Roads, "Both of those fall short" — VERIFIED, unchanged from pass 1 and
re-confirmed.** 1,452.303 and 1,116.532 are each below the brief's $1.5 billion
Supported line; 1,945.703 and 1,794.0 each clear it. `round2/gpt.json` classifies
the narrowest reading as Partially supported and `round2/claude.json` the
Yellowhead-stripped reading the same way, so "fall short" is the seats' own
result and not the drafter's inference.

**Closing "What remains open" — VERIFIED.** "which of the City's several 2022
snow figures a fair comparison should use" is the snow claim's unknown 1 and
limitation 1; "what roads spending, as opposed to roads approvals, has been" is
the roads claim's unknown 2 and limitation 3, and `round2/claude.json`'s "no
consistent published series for the whole roads set". The paragraph no longer
restates the findings, which now live in the `one_line` and the TL;DRs, and both
of those verify (1.55 and about 19 times).

### Registry lines, calcs and errata

**YF-EV-0135 — VERIFIED.** The line now describes only what the minutes carry —
"the recommendation to approve administration's updated approach was not put; a
substitute motion… was defeated on a tied vote (2 to 2), and the only motion
carried kept Attachment 4 private (4 to 0)" — and closes with the correct
negative, "It carries no route lengths or spending figures." Both the vote counts
and the absence of any "km" string check.

**YF-EV-0118 — VERIFIED.** The recommendation is now quoted from the bytes rather
than paraphrased as "a modified approach", and "Attachment 5 is archived
separately" points at YF-EV-0140. The rest of the line was already sound.

**Calcs comment — VERIFIED.** Now "FCS01656 attachment", matching the archive's
own footer "March 14, 2023 - City Council | FCS01656".

**`errata.md`, "Found at the gate" — VERIFIED, with one over-attribution.** The
record is accurate on the substance and correctly scoped: the brief is frozen and
not edited, the error "sits in the rationale and not in any proposition or
definition", and "no seat relied on it" — which I confirmed, since "declined"
appears in no round file. One correction for the record: the entry also blames
"the first run's intake record, which the brief drew on", but that record is not
wrong. `reviews/active-transportation/2026-09-02/intake.md` says "the committee
**did not adopt it and the program stands as approved**", which is consistent
with the minutes. The escalation from "did not adopt" to "declined it" is the
brief's alone. The intake's 13-and-14 route split is likewise correct and is now
confirmed by YF-EV-0140.

### Collateral

**Which Attachment 5 is archived cannot be settled from the bytes.** YF-EV-0135's
agenda list carries three versions — "REPLACEMENT (Version 2) Attachment 5",
"REPLACEMENT (Version 1) Attachment 5" and a plain "Attachment 5" — and the
archived document's own header reads only "REPLACEMENT Attachment 5", with no
version number anywhere in its two pages. The route counts could differ between
versions, and the 13 and 14 now sit in a story sentence and a key fact. The
registry title calls it "replacement Attachment 5", which is honest but does not
resolve it. Recommended: add a note to YF-EV-0140 recording that the meeting
posted three Attachment 5 files, that DocumentId 304030 is the one captured, and
that its bytes carry no version marker.

### Counts

Pass 2 re-enumerated the story body at a finer grain than pass 1, so the story
total below is not comparable line-for-line with the pass-1 table; the claim
totals are unchanged in structure.

| | Snow claim | Roads claim | Story | Total |
|---|---|---|---|---|
| Statements checked | 27 | 26 | 54 | **107** |
| VERIFIED | 27 | 26 | 53 | **106** |
| IMPRECISE | 0 | 0 | 1 | **1** |
| UNSUPPORTED | 0 | 0 | 0 | **0** |
| SKIPPED | 0 | 0 | 0 | **0** |

Both claim files are now clean end to end. All six pass-1 items are repaired at
the source rather than papered over, and the three that changed a fact rather
than an attribution — the vote date, the committee's disposition, the 14 routes —
each moved toward the archive: two of them onto a document that did not exist in
the registry at pass 1 and now does.

### Verdict

**GATE FAIL, on one sentence.**

Zero unsupported, down from three, and the repairs are the right kind. The
committee sentence in particular went from an unsourced number and an inverted
verb to a count I could reproduce bullet by bullet and a sequence the minutes
state in terms, which is what registering Attachment 5 bought. The vote date is
now scoped to the record instead of asserting a day two archives contradict, and
the two registry `establishes` lines no longer claim content their own bytes do
not hold.

The single remaining imprecision is the opening paragraph's plural attribution,
and it is mine as much as the drafter's: the earlier wording carried the same
generalisation and I passed it. It matters for the same reason the rest of this
audit does — the brief predeclared that it would not claim either comparison is
common, and the story's first sentence claims it — but it touches no figure and
no verdict, and the body already says the supported thing.

A third pass need only re-read one sentence.

### Addendum: re-grade at commit `32b3db6`

The story and both claims moved twice more while pass 2 was being written (page
critique 2, then a one-line trim). Re-graded state: commit `32b3db6`, story
`md5 3ecc5b2c…`, snow claim `4c4db470…`, roads claim `c9990cd8…`. Nothing in the
diff touches an archive, a figure or an attribution, and **the opening paragraph
is unchanged, so the single IMPRECISE above stands as written.** The nine changed
or new statements all verify:

- **`one_line`** — "spread over four budget years… 1.55 times the printed 2022
  snow budget, not double, and roads were **authorized** about 19 times as much."
  1.551 and 19.457. "Authorized" is more accurate than the previous "get": Table
  8 and Appendix A are approvals, which is the roads claim's own limitation 3.
- **TL;DR 1** — "No single year gets $100 million: council authorized it across
  2023 to 2026 ($5.95 million, $26.75 million, $33.65 million, $33.65 million),
  9 to 4, in its December 2022 budget deliberations." The lead clause is a new
  assertion and it checks: the largest single year in Appendix A and on the
  profile sheet is $33.65 million. The date scoping from pass 2 survives.
- **TL;DR 2** — adds "The comparison sets four years of capital against one year
  of operating money", which is the snow claim's limitation 2 verbatim in
  substance.
- **TL;DR 4** — "'180 times as much' is **wrong**" for "is an arithmetic slip".
  Same fact, plainer; 1,800 / 100 = 18.
- **Snow paragraph** — "against the base budget plus those three additions the
  $100 million is 1.17 times a year of snow", and "which the **reviewers** could
  not reconcile with the base budget plus the three additions". The dropped
  "brief's calculation" hedge costs nothing: the new wording describes the
  arithmetic (64,466 + 2,300 + 14,300 + 4,700 = 85,766) rather than calling the
  result the City's amended budget, which is the distinction GPT raised in round 2
  and limitation 3 still carries.
- **Snow paragraph close** — "the verdict should always be quoted with the budget
  figure it was measured against" is limitation 1's "Neither side can cite the
  verdict word without saying which budget it compares against."
- **Roads paragraph** — "All three **reviewers** reached the same total… and two
  of them rebuilt it profile by profile." The pass-2 repair is intact; only the
  house word for a seat changed.
- **Closing** — "This page does not assess safety, usage, congestion,
  cost-effectiveness or whether the program should have been approved" is
  `brief.md`'s own out-of-scope list ("whether $100 million is too much or too
  little"; "whether bike lanes affect congestion, safety, parking or business";
  "ridership"; "the value or cost-effectiveness of any spending"). The two open
  items are unchanged and still match the claims' unknowns.
- **Both claims' `question` fields** — newly carrying assertions, so newly graded.
  Snow: "Measured against the City's printed 2022 snow budget; other City figures
  for 2022 move the answer" is limitation 1. Roads: "The quotation says 180 times;
  its own figures imply 18, and that is what was tested" is `brief.md`'s "The
  proposition tests the two dollar figures the councillor gave and the ratio they
  imply… The brief does not test '180 times' as a separate claim." Both VERIFIED.

`npm run validate` passes at this commit: 6 stories, 10 claims, 1 commitment, 6
topics, 140 evidence entries.

**Out-of-scope observation, flagged for whoever owns the glossary.** The same
commits reworded the site-wide `three-model AI panel` entry to say the three
reviewers work "without seeing one another's work". That describes round 1 only:
`run.yaml` records each round-2 package as carrying `other-review-*.json`, and
round 2 is the cross-review round by design. The previous wording ("blind to each
other") had the same gap. This story does not render that term — it uses only
`capital profile` and `frozen brief` — so it is outside this audit, but it is
published copy about the method and is worth a line such as "independently and
blind in the first round, then cross-reviewing each other's work in the second".

### Counts, final

| | Snow claim | Roads claim | Story | Total |
|---|---|---|---|---|
| Statements checked | 28 | 27 | 54 | **109** |
| VERIFIED | 28 | 27 | 53 | **108** |
| IMPRECISE | 0 | 0 | 1 | **1** |
| UNSUPPORTED | 0 | 0 | 0 | **0** |
| SKIPPED | 0 | 0 | 0 | **0** |

Verdict unchanged: **GATE FAIL, on one sentence** — the opening paragraph's
plural attribution. Everything else in both claims and the story now verifies
against the archived bytes or the run artifacts.

---

## Pass 3, 2026-09-02

Scope: the one IMPRECISE item from pass 2 (the opening sentence), the `one_line`,
the five TL;DR bullets and the two claim `question` lines, plus confirmation that
the two collateral notes are applied. Same method, archived bytes and run
artifacts only, no web access. Graded state: commit `31eaa6a`, story
`md5 9cbd0798…`, snow claim `4c4db470…`, roads claim `c9990cd8…`.

**Integrity.** The three archives this pass turns on rehash clean: YF-EV-0121
`2d5ff770…`, YF-EV-0122 `64d26760…`, YF-EV-0131 `62f2c082…`. `npm run validate`
passes: 6 stories, 10 claims, 1 commitment, 6 topics, 140 evidence entries.

**What actually moved.** The diff against the pass-2 state is one paragraph. The
`one_line`, all five TL;DR bullets and both `question` lines are byte-identical to
the text graded in the pass-2 addendum (the claim files hash unchanged), so the
re-grade below is a re-read against the archives rather than a new comparison.

### Opening sentence — was IMPRECISE, now **VERIFIED**

> "Since council's budget vote of December 2022, **a campaign against Edmonton's
> bike lanes** has compared the $100 million program with what the City spends
> clearing snow, and **a councillor who backed the program** has compared the same
> figure with what the City spends on roads."

Both holders are now singular and both descriptions are carried by the bytes.

*The campaign.* YF-EV-0122 is titled "Stop The Bike Lane Boondoggle - Common
Sense Edmonton" and its petition text is "We the undersigned call on Edmonton
Council to **drop their plan to spend $100 million on bike lanes**", introduced by
"If you agree that $100 million is too much money to spend on bike lanes, please
sign our petition". "A campaign against Edmonton's bike lanes" is what the page
is on its face. The comparison it makes is the archived sentence graded at KF-1,
"it's almost double the City's annual snow-clearing budget!"

*The councillor.* "Backed the program" is on the record twice over. YF-EV-0131
records him in the majority on the very amendment that created the profile: "In
Favour (9) A. Knack, A. Paquette, A. Sohi, A. Salvador, **M. Janz**, K. Tang, E.
Rutherford, A. Stevenson, and J. Wright". YF-EV-0121 has him arguing for it —
"Janz said it's vital to invest in infrastructure that will encourage people to
choose biking and walking over driving" — immediately after the quoted roads
comparison. The same minutes also record him moving an amendment to raise the
profile to $201,000,000, which is backing it in the strongest available form.

This closes the last open item. The sentence now says exactly what `brief.md`
predeclared it could say — "each was made publicly, in the budget debate, by a
party to it" — and no longer claims either comparison is a group habit.

### `one_line` — **VERIFIED**

> "The $100 million for bike lanes is spread over four budget years: 1.55 times
> the printed 2022 snow budget, not double, and roads were authorized about 19
> times as much."

100,000 / 64,466 = 1.551; 1,945,703 / 100,000 = 19.457. "Spread over four budget
years" is Appendix A's own 2023-2026 schedule, and "authorized" is the right verb
for a capital budget, which is the roads claim's limitation 3.

### TL;DR 1 to 5 — **VERIFIED (5 of 5)**

- **1** — "No single year gets $100 million: council authorized it across 2023 to
  2026 ($5.95 million, $26.75 million, $33.65 million, $33.65 million), 9 to 4, in
  its December 2022 budget deliberations, as capital profile CM-20-0330." The lead
  clause checks against the schedule itself: the largest single year in Appendix A
  (printed page 103) and on the profile sheet (page 540) is 33,650. The four
  amounts, the 9-to-4 split and the profile number are the minutes' own, and the
  date is scoped to the deliberations, which is the pass-2 repair holding.
- **2** — "The comparison sets four years of capital against one year of operating
  money. Against the printed 2022 snow-clearing budget of $64.5 million the ratio
  is 1.55; add the three one-time top-ups council approved during 2022 and the
  same calculation gives $85.8 million and 1.17. Which snow budget you divide by
  changes the answer, and no reading reaches double." 64,466 → $64.5M; 1.551 →
  1.55; 64,466 + 2,300 + 14,300 + 4,700 = 85,766 → $85.8M; 1.166 → 1.17. The
  mismatch sentence is the claim's limitation 2. "No reading reaches double" holds
  across every figure the run produced: 1.551, 1.166, 1.258, 1.642, and the two
  context readings 1.571 (net) and 1.446 (July addition only), all far below 2.
- **3** — 1,945,703 → "$1.95 billion" and Table 8's "Active Pathways and Roads
  Service … 1,794.0" → "$1.79 billion", which contains CM-20-0330.
- **4** — the Global News quotation, 1,800 / 100 = 18, and the councillor's page
  verbatim ("The $100M represents half a percent of the $1.8 Billion dollar
  capital budget over the same period"), against 100 / 1,800 = 5.56 per cent.
- **5** — 39,984 → "$40.0 million"; 99,570 → "$99.6 million"; 807, 10,496 − 807 =
  9,689, 39,984 − 10,496 = 29,488 → "$0.8 / $9.7 / $29.5 million"; 5,950 + 26,750
  + 33,650 = 66,350 → "$66.35 million"; and YF-EV-0118's "approximately 35 km of
  new routes were installed".

### Claim `question` lines — **VERIFIED (2 of 2)**

Snow: the qualification "Measured against the City's printed 2022 snow budget;
other City figures for 2022 move the answer" is limitation 1 compressed, and it
puts the definition-sensitivity in front of the reader at the top of the record
rather than at the bottom. Roads: "The quotation says 180 times; its own figures
imply 18, and that is what was tested" is `brief.md` in terms — "The proposition
tests the two dollar figures the councillor gave and the ratio they imply… The
brief does not test '180 times' as a separate claim."

### Collateral, both applied

**`errata.md` — VERIFIED.** The "Found at the gate" entry no longer lays the
error at the intake's door: "(the first run's intake record says only that the
committee did not adopt it, which the minutes bear out)". That matches
`reviews/active-transportation/2026-09-02/intake.md` exactly, and the rest of the
entry — brief frozen, error in the rationale only, no seat relied on it — still
checks.

**YF-EV-0140 — VERIFIED.** The `establishes` line now pins the capture: "The
committee agenda lists three versions of Attachment 5 (original, replacement
version 1, replacement version 2); the archived bytes are DocumentId 304030,
headed REPLACEMENT Attachment 5 with no version marker, and the 13 and 14 counts
are read from those bytes." Every part of that is checkable against YF-EV-0135's
agenda list and against the archived document's own header, and it tells a future
reader precisely how far the 13 and 14 can be trusted.

### Counts, final

| | Snow claim | Roads claim | Story | Total |
|---|---|---|---|---|
| Statements checked | 28 | 27 | 54 | **109** |
| VERIFIED | 28 | 27 | 54 | **109** |
| IMPRECISE | 0 | 0 | 0 | **0** |
| UNSUPPORTED | 0 | 0 | 0 | **0** |
| SKIPPED | 0 | 0 | 0 | **0** |

Across the three passes: 3 unsupported and 3 imprecise found, 6 repaired at the
source, 0 remaining. Registry entries read against their bytes: 27 of 27 hash
clean; three `establishes` lines corrected (YF-EV-0118, YF-EV-0135, YF-EV-0140).

### Verdict

**GATE PASS.**

Every published statement in the story and both claim records now reproduces
against the archived bytes of its cited evidence or against the run artifact it
attributes. The three repairs that changed a fact rather than a phrase all moved
toward the archive: the vote is scoped to the record instead of asserting a day
two archives contradict; the committee's disposition follows the minutes' own
sequence, including the negative that administration's recommendation was never
moved; and the 14 routes now rest on a document that was fetched, hashed and
registered because this gate asked for it, with its version ambiguity disclosed
rather than hidden.

The rule worth carrying forward from this story is the one the last defect turned
on: **a brief's framing and selection-rationale prose is not evidence.** The
committee error entered there, survived a framing check and two review rounds
untouched because no seat had reason to read it, and reached the page as a number
and a verb with nothing under either. `errata.md` now records it against the
frozen brief. The counterpart rule from the opening sentence is its mirror: where
a brief predeclares what it will *not* claim — here, that neither comparison is
common — the story may not claim it either.
