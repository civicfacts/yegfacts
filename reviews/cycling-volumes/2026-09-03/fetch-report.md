# Evidence fetch report (round 2 input)

Round 1 of the rerun cited 32 distinct sources. Every one was fetched and
hashed into `evidence/staging/`; the manifest is
`evidence/staging/staging-manifest.json`. Twenty-eight returned the
document they were cited as. Seven citations across four sources did not,
in two different ways, and they are listed here so round 2 sees them
rather than defending a finding on bytes nobody holds.

Nothing here is a verdict on a claim. A source that cannot be archived is
a source the site cannot verify, which lowers what a finding may rest on;
it does not make the finding wrong.

## Returned HTTP 200, but the archived bytes are not the cited document

Three Statistics Canada Census Profile URLs return 200 with a body titled
"File not found | Fichier non trouvé", 4,099 bytes, all three identical.
The same failure appeared on the `infill-prices` run, so it is the
Census Profile's own behaviour on a deep-linked query string rather than
anything about these citations.

- `.../2016/dp-pd/prof/details/page.cfm?...Code1=4811061...` — cited by
  GPT-5.6 Sol as challenging evidence on
  `under-one-percent-of-commuters-cycle` and `87-percent-commute-by-car`,
  moderate on both.
- `.../2021/dp-pd/prof/details/page.cfm?DGUIDlist=2021A00054811061...` —
  cited by GPT-5.6 Sol on the same two claims, **strong** on both, as
  supporting and challenging evidence.
- `.../2021/dp-pd/prof/details/page.cfm?DGUIDlist=2021S0503835...` (the
  Edmonton CMA profile) — cited by GPT-5.6 Sol on the same two claims,
  **strong** supporting on both.

**What this affects.** Both census claims are carried on other seats by
the StatCan data tables `9810047901` and `9810048001`, which staged as
their real documents, so the census evidence is not lost. What is lost is
verification of the GPT seat's own strong citations. Round 2 should
either re-cite those figures to a table URL that archives, or record them
as unverified.

## Fetch failed outright

- `https://www.cbc.ca/news/canada/edmonton/edmonton-bike-lane-usage-9.7291168`
  — timed out. Cited by Claude Opus 5 as moderate supporting evidence on
  `cycling-trips-1-3-million-2026`, and explicitly as a media
  restatement of the City dataset rather than a verdict source. A
  syndicated copy of the same article at `nz.news.yahoo.com` staged
  successfully, so the text exists in the staging directory under a
  different publisher; that is a lead, not a substitute, and the CBC
  original is what any published finding would have to cite.
- `https://www.edmonton.ca/transportation/traffic_reports/travel-surveys`
  — HTTP 404. Cited by Gemini 3.1 Pro as moderate challenging evidence on
  `two-percent-of-trips-by-bike`. The City's current page for the same
  material, `.../household-travel-survey`, staged successfully.
- `https://doi.org/10.1080/02723638.2016.1232464` — HTTP 403, a
  publisher paywall. Cited by GPT-5.6 Sol as weak challenging evidence on
  the two participation claims.
- `https://www23.statcan.gc.ca/imdb/p3Instr.pl?...Item_Id=1496615` — timed
  out. Cited by GPT-5.6 Sol as moderate challenging evidence on
  `one-to-two-percent-of-population-rides`.

## Staged clean, and worth naming because the verdicts turn on them

The three datasets claim 2's five membership tests run over all archived
as their real bytes on the as-of date: the counts dataset
`resource/tq23-qn4m.json` (813,032 bytes), the locations dataset
`resource/py7x-4d39.json` (30,626 bytes) and the Bike Routes portal page
for `vd4b-a4iv`. So the set the two executing seats derived is
reproducible from archived bytes rather than from a live query that may
answer differently tomorrow.

---

# Resolutions, 2026-09-03

Added after round 2, before drafting, so the citations are settled in the
record rather than at the publication gate. The sections above are the
staging run's own output and are not edited; this section says what was
done about each of the seven, and every claim below was checked against
the archived bytes rather than asserted.

Two of the seven were never unarchivable. `scripts/evidence-stage.ts`
gave every fetch a ten-second whole-request deadline, which is a
connect-and-download deadline rather than a connect one, so a slow
server and a large file both hit it. Statistics Canada's survey-
instrument pages take about eleven seconds to first byte. The deadline
is now sixty seconds. Manufacturing an unverifiable citation out of an
impatient client is the worst way to lose one, and it was doing so.

## The three Census Profile deep links

Each is replaced by a Statistics Canada publication that carries the
same variable for the same geography and archives as its real bytes.
The figures below are read out of the archived files, and every one of
them matches what the GPT seat reported from the deep link.

**1. 2016 Census Profile, City of Edmonton.**

- Cited: `https://www12.statcan.gc.ca/census-recensement/2016/dp-pd/prof/details/page.cfm?B1=All&Code1=4811061&Code2=48&Geo1=CSD&Geo2=PR&GeoCode=4811061&GeoLevel=PR&Lang=E&SearchPR=01&SearchText=Edmonton&SearchType=Begins&TABID=1&type=0`
- Archived: `https://www12.statcan.gc.ca/rest/census-recensement/CPR2016.json?lang=E&dguid=2016A00054811061&topic=0&notes=0` — 398,674 bytes, staged clean on the as-of date. It is the same Census Profile, for the same geography, served from the endpoint the profile page reads rather than the query-string page that does not survive a fetch.
- What it carries, verbatim from the archived file: Edmonton, total main mode of commuting 466,230; Bicycle 5,575; car, truck, van as a driver 342,145; as a passenger 25,080. That is the 1.2 percent bicycle share and the 367,225 combined car figure the seat cited, to the person.

**2. 2021 Census Profile, City of Edmonton** (`DGUIDlist=2021A00054811061`).

- Cited: `https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?DGUIDlist=2021A00054811061&GENDERlist=1%2C2%2C3&HEADERlist=0&Lang=E&STATISTIClist=1&SearchText=edmonton`
- Archived: table 98-10-0479-01, *Place of work status by main mode of commuting, time leaving for work, and commuting duration: Canada, provinces and territories, census divisions and census subdivisions*. The full table at `https://www150.statcan.gc.ca/n1/tbl/csv/98100479-eng.zip` — 46,221,390 bytes — and its landing page at `https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=9810047901`, 283,693 bytes, both staged clean.
- What it carries, read from the archived CSV at DGUID `2021A00054811061`, the same DGUID the dead link names: total main mode of commuting 380,315; Bicycle 3,355; car, truck or van 323,705, of which 298,320 drivers and 25,380 passengers. Every figure the seat cited from the deep link, unchanged.
- There is no 2021 equivalent of the 2016 REST endpoint. `CPR2021.json` and the profile's own download endpoint both return the same 4,099-byte "File not found" body, so the table is the stable form, not a second-best one.

**3. 2021 Census Profile, Edmonton census metropolitan area** (`DGUIDlist=2021S0503835`).

- Cited: `https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?DGUIDlist=2021S0503835&GENDERlist=1%2C2%2C3&HEADERlist=0&Lang=E&STATISTIClist=1%2C4&SearchText=edmonton`
- Archived: table 98-10-0480-01, the same variable for census metropolitan areas. Full table at `https://www150.statcan.gc.ca/n1/tbl/csv/98100480-eng.zip` — 56,316,430 bytes — and its landing page at `https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=9810048001`, 356,185 bytes, both staged clean.
- What it carries, at DGUID `2021S0503835`: Edmonton (CMA) 835, total main mode of commuting 537,645; Bicycle 3,905. Both the figures the seat cited.

So the GPT seat's strong citations on `under-one-percent-of-commuters-cycle` and `87-percent-commute-by-car` are now verified rather than unverified. The numbers were right; the addresses were not archivable.

## The four that failed outright

**4. Statistics Canada survey instrument, `Item_Id=1496615`** — resolved as
cited, no substitution. It is the Canadian Community Health Survey annual
component for 2023. `https://www23.statcan.gc.ca/imdb/p3Instr.pl?Function=assembleInstr&Item_Id=1496615`
now stages at 285,714 bytes. It took about eleven seconds to answer, which
is why ten seconds could not fetch it.

**5. City of Edmonton travel surveys page** — 404, replaced by the City's
current page for the same material.

- Cited: `https://www.edmonton.ca/transportation/traffic_reports/travel-surveys`
- Archived: `https://www.edmonton.ca/transportation/traffic_reports/household-travel-survey`, 51,979 bytes, staged clean, and the survey report itself at `https://www.edmonton.ca/sites/default/files/public-files/2015_HTS_SummaryReport.pdf`, 2,853,078 bytes, also clean.
- Cited by Gemini 3.1 Pro as moderate challenging evidence on `two-percent-of-trips-by-bike`. The document that claim turns on is the survey report, which archived as its real bytes; the dead link was the City's index page in front of it.

**6. CBC News, "Are people actually using Edmonton's bike lanes?"** — not
archivable, and not for a reason a substitution fixes.

- `https://www.cbc.ca/news/canada/edmonton/edmonton-bike-lane-usage-9.7291168`
- The first report recorded a timeout. It is not one. CBC refuses the archiver by its user agent: with `YEGFacts evidence archiver` the connection is reset before any bytes arrive, and the same URL served with a browser's user agent returns the article. The archiver was not made to pretend to be a browser to get around that, because whether this site defeats a publisher's block is an editorial question and not a staging detail.
- **What rests on it.** Claude Opus 5 cited it as moderate supporting evidence on `cycling-trips-1-3-million-2026`, and said in the citation itself that it is a media restatement of the City dataset rather than a verdict source. That claim's verdict is computed from `data.edmonton.ca/resource/tq23-qn4m.json`, which archived clean at 813,032 bytes. No finding rests on the article. What is lost is the ability to verify the wording of the media report the question came from, which the story may want to quote; a syndicated copy of the same article staged clean at `nz.news.yahoo.com`, and that is a lead rather than a substitute.

**7. *Urban Geography* article, `doi.org/10.1080/02723638.2016.1232464`** —
not archivable. The publisher answers 403 behind a bot challenge, which
is a paywall doing its job.

- **What rests on it.** GPT-5.6 Sol cited it as **weak** challenging evidence on `one-to-two-percent-of-population-rides` and on `one-percent-year-round-users`. Both claims were returned Not established by all three seats, so it is cited against propositions the panel did not establish in the first place. Nothing in either finding rests on it, and it should not be cited in published copy the site cannot verify.

## What the evidence record now says about all seven

`combined-evidence.json` is annotated (methodology v1.2), so the seven
are visible in the artifact rather than only in this prose. Every item
carries a `fetch_status` and an `evidence_id`: 26 `ok`, 3
`content-mismatch`, 3 `failed`, none `not-attempted`; one item, the
City's "Cycling in a winter wonderland" page, resolves to a registry
entry already held from the `winter-cycling` run, `YF-EV-0026`, and the
other 31 read `unregistered`.

The three Census Profile deep links read `content-mismatch` rather than
`ok`. They answered HTTP 200 and the archiver kept what came back, but
what came back is the 4,099-byte "File not found" body described above
and not the profile they were cited as. An item whose archived bytes are
not the cited document must not read the same as one whose are.

`https://www.edmonton.ca/transportation/traffic_reports/travel-surveys`
reads `failed`, which is the 404 it returned; the resolution above
substitutes the City's current page and the survey report itself, and
both of those are `ok` items in their own right.

**The two that cannot be archived read `failed` and stay that way.**
Neither enters the evidence registry, because a registry entry keeps the
bytes and there are no bytes to keep, and neither carries a finding.

- **The CBC article.** CBC refuses this archiver by its user agent: the
  connection is reset before any bytes arrive. The same URL served with a
  browser's user agent returns the article, and the archiver was not
  changed to send one. A site that gets its evidence by pretending to be
  something else is doing the thing it exists to check. It is a media
  restatement of `data.edmonton.ca/resource/tq23-qn4m.json`, which
  archived clean at 813,032 bytes, and the verdict on
  `cycling-trips-1-3-million-2026` is computed from that dataset. What is
  lost is the ability to quote the article's own wording from bytes the
  site holds.
- **The *Urban Geography* article.** The publisher answers 403 behind a
  paywall. It was cited as weak challenging evidence on two claims the
  whole panel returned Not established, so nothing rests on it, and it
  should not appear in published copy.

---

# Resolutions, 2026-09-04, at drafting

Added at stage 6, before the claim records were written, for the same
reason the 2026-09-03 section exists: a citation the site cannot verify
from bytes it holds should be settled in the record and not left for the
publication gate.

## 8. The counter dataset archived as a first page, not as the dataset

The 2026-09-03 report says the counts dataset
`data.edmonton.ca/resource/tq23-qn4m.json` "archived clean at 813,032
bytes". The bytes are clean and the sentence is wrong about what they
are. Socrata's resource endpoint returns its default first page, and the
archived file holds 1,000 fifteen-minute records running from
2018-08-06 to 2024-06-12. It does not contain the 2026 window claim 1
turns on, and it does not contain July 2025 at all.

So neither counter claim was reproducible from archived bytes: the
network total, every July median, every January median and the
membership tests all rested on live queries that would answer
differently tomorrow. Three aggregates of the same endpoint were staged
on 2026-09-04 and entered the registry. They are the City's own
endpoint with a `$select` and a `$group`, not a different source.

- **Monthly network totals, whole dataset** (`YF-EV-0141`, 7,896 bytes).
  Sums to 1,291,714 for 2026-01 to 2026-07, 1,611,749 for the same
  months of 2025, 1,547,532 for 2024, 2,856,631 for calendar 2025 and
  436,863 for July 2025. Every figure the two executing seats reported,
  to the unit.
- **Daily bicycle counts by counter, calendar 2025** (`YF-EV-0142`,
  2,933,091 bytes, 16,982 rows). Every July median in the verdict set
  recomputes exactly, 46 at 96 Street S of Jasper Ave through 979 at 83
  Avenue W of 99 Street, as do the January medians (6 to 212), the
  calendar-year totals and the June 2025 median of 177.5 at the counter
  test 4 removed.
- **First and last record per counter** (`YF-EV-0143`, 12,712 bytes).
  Confirms 106 Street N of Jasper Avenue last recorded 2025-07-16, and
  carries the service dates tests 2 and 4 turn on.

Two further datasets were archived in the same form, for the same
reason. `YF-EV-0162` is the Bike Routes type, classification and line
geometry for all 10,417 segments, which is what test 3 joins to: taking
the nearest built segment to each counter's published coordinates
reproduces the seats' distances (96 Street S of Jasper Ave at 6.7 m ON
ROAD against 55.2 m OFF ROAD; Hermitage North at 0.8 m OFF ROAD; High
Level Bridge East at 1.9 m OFF ROAD). `YF-EV-0161` is all 1,296 rows of
the historic short-duration counts, which carry the four 82 Avenue
observations of 27 and 28 September 2016 (187 and 150 east of 104
Street, 175 and 141 west) and establish that no such count exists for
119 Avenue, 132 Avenue or Hermitage.

## 9. Table 98-10-0467-01 staged as its data

The work-at-home figures that qualify both census claims were read by
the seats through the Web Data Service; what staged on 2026-09-03 was
the table's landing page, which does not carry them. The full table
(`https://www150.statcan.gc.ca/n1/tbl/csv/98100467-eng.zip`,
109,957,496 bytes) was staged on 2026-09-04 and is `YF-EV-0157`. It
carries 102,210 of 483,855 employed Edmontonians working at home in
2021, at DGUID `2021A00054811061`.

## What was checked against archived bytes before drafting

Every figure in the seven claim records was read out of the archived
file it cites, not out of a seat's report of it. The census counts
(380,315, 3,355, 323,705, 298,320, 25,380, 30,860, 13,430, 335, 8,635;
537,645, 469,900, 3,905; 466,230, 5,575, 342,145, 25,080, 67,990,
19,025, 6,405, 23,160 of 490,665), the travel survey shares (1.7 and
0.8 per cent, 54,800 of 3,139,100, 10,600 of 1,331,800, the
2015-09-14 to 2015-12-11 fieldwork and the 21,000 households), the 2014
panel's response counts (327 and 715 of 816, and the recruitment note)
and every counter figure named above all reproduce from the registry's
own files.
