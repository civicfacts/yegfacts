# Source note: cycling-safety draft of 2026-10-21

What the editor read, what is archived, and what remains unread or
unresolved. Updated 2026-10-21 after the coordinator's second and third
retrieval passes. Three private, gitignored archives in the main checkout
hold the bytes, each with a JSON manifest recording URL, retrieval time,
status, byte length and SHA-256:

- **Packet archive**, `evidence/private/source-prep-2026-10-21/`: the ten
  files the coordinator retrieved before drafting began.
- **Editor archive**, `evidence/private/cycling-editor-2026-10-21/`: 45
  files and manifests retrieved or copied on 2026-10-21 after the first
  draft. Six of its PDFs are byte copies of documents the editor's own
  fetch tool had already downloaded and read; the manifest says so for
  each. Everything else in it is a separately dated coordinator
  retrieval of the same public address, not a copy of the editor's
  session response.
- **Prerequisite-pass archive**,
  `evidence/private/cycling-prerequisite-pass-2026-10-21/`: 55 retained
  files from the third pass, listed in its own section below. The pass
  made 29 HTTP attempts and saved 27 records, one of them the login page
  that the enforcement dashboard redirected to, archived and not read;
  the other 2 attempts, both Council meeting attachments, were refused
  with HTTP 403 and nothing was saved. The rest of the 55 are derived
  reading copies (extracted text of archived PDFs) and the pass's
  coordination records, not further retrievals.

Status words: **Archived** (bytes in one of the three archives, hash
shown); **Read** (the editor read the document, from the archive or from
the same bytes before they were archived); **Screened** (the coordinator
inspected it mechanically and the editor relied on the recorded result);
**Unread**; and the retrieval outcome where a fetch failed. A failed
fetch is a fact about one address on one day. It is not evidence that
the document does not exist or was never published.

## Law

| Source | Address | Status | Used for |
|---|---|---|---|
| Traffic Safety Act, RSA 2000 c T-6, King's Printer office consolidation current as of 2026-07-02 | `https://kings-printer.alberta.ca/documents/Acts/T06.pdf` | Archived (editor archive, copy of the editor's fetch), 1,017,567 bytes, SHA-256 `65525763bd857b2c11278b3dfe58e5317ef3686af029671a2995288edad0b644`; read in part (s. 1 definitions and subsections, s. 1(11); the s. 13 bylaw powers as recited in Bylaw 5590's preamble) | Claim 1 instrument; terms |
| Traffic Safety Act, City-hosted copy linked from the Bike Routes page | `https://www.edmonton.ca/sites/default/files/public-files/documents/t06-trafficsafetyact.pdf` | Unread; not fetched | Reviewer compares consolidation dates |
| Use of Highway and Rules of the Road Regulation, AR 304/2002, consolidated to AR 167/2025, current as of 2025-08-08 | `https://kings-printer.alberta.ca/documents/Regs/2002_304.pdf` | Archived (editor archive, copy of the editor's fetch), 642,152 bytes, SHA-256 `3fb1e9a8e5b5981f5968599181a64dce8f5d38410ea0028642ff3db41cea51d4`; the coordinator's direct download of the same address answered HTTP 403 and was not retried; read in part (s. 1(1); Part 2 Division 4 ss. 75 to 79; ss. 83, 85; Part 3 ss. 90 to 93; table of contents). Amendment check: the King's Printer's index of regulations subsisting on 2026-09-30 (third-pass archive, below) ends this regulation's amendment list at 167/2025 | Claim 1 instrument, essential |
| Vehicle Equipment Regulation, AR 122/2009, consolidated to AR 129/2025, current as of 2025-06-11 | `https://kings-printer.alberta.ca/documents/Regs/2009_122.pdf` | Archived (editor archive, copy of the editor's fetch), 694,361 bytes, SHA-256 `852c9db46c6a2c8f3c9290655542516e72672bbb71fea63bb9d45d578dc0af9c`; the coordinator's direct download answered HTTP 403 and was not retried; read in part (Part 6 Division 5 ss. 111 to 113; table of contents) | Claim 1 qualification 5 |
| Traffic Bylaw 5590, City of Edmonton, consolidated on May 12, 2025 | `https://www.edmonton.ca/sites/default/files/public-files/documents/Bylaws/C5590.pdf` | Archived (editor archive): the coordinator's direct retrieval at 17:12 UTC (HTTP 200, 514,776 bytes) and the copy of the editor's fetch carry the same SHA-256 `27d722283496655327c3f558b113fb8eef42b0c1ba7c60cc25f9ea86e0629312`; read in the preamble, Part I s. 2 definitions, Part II s. 4(2), Part III pp. 28 to 30, Part V s. 84 and Part VIII s. 107(cc) and (dd); the rest of Parts IV to VIII not read line by line. Amendment check: the City's bylaw index data and the 2026-01-19 committee minutes (third-pass archive, below) list the 2025-05-12 consolidation and record proposed Bylaw 21283 as received for information; not a complete search of Council meetings or sign designations | Claim 1 instrument, essential; E2 and E3 |
| Public Spaces Bylaw 20700, City of Edmonton, consolidated on May 19, 2026, 40 pages | `https://www.edmonton.ca/sites/default/files/public-files/C20700.pdf?cb=1779154039`, linked from the City's Public Spaces Bylaw page; the bylaw index address `https://webdocs.edmonton.ca/bylaws/20700-Public-Spaces-Bylaw-C-20260519.pdf` answered HTTP 403 (cover read by the coordinator's tool as consolidated 2026-10-06), not retried | Archived (third-pass archive), 1,096,442 bytes, SHA-256 `5698f1489c710ee9a73b900a91fa2d9a7c8aa4ecca6e067e92261faf20318476`; read in Part I s. 2 definitions, Part XIV ss. 77 to 82, Part XVI ss. 95 to 97 and the amendment list (21122 of 2025-05-21, 21371 of 2026-02-17, 21424 of 2026-03-17, 21244 of 2026-05-19). Chronology: consolidation predates the as-of date; whether any amendment took effect 2026-05-19 to 2026-08-27 is not established; the next identified, Bylaw 21502, was before Council 2026-10-06 (signed copy labelled published 2026-10-07; DocumentIds 309335 and 309330 answered HTTP 403, unread) | Claim 1 instrument, essential; E2 and qualification 3 |
| Charter Bylaw setting minimum passing distances (number not identified), in effect 2021-09-30 per the City's page | Not identified | Unread | Claim 1 qualification 4; reviewer identifies it |
| Bike Routes: How To (City page) | `https://www.edmonton.ca/transportation/cycling_walking/bike-routes-how-to` | Archived (packet archive), SHA-256 `b73410eb95a421d313217c1ac79ad381aac96b7e3cc445b8b496ad40ab6b2127`; read | City's restatement of the rules; its two sidewalk statements; its citation of deleted s. 50 |
| Rules and Regulations Applying to Small Vehicles (Province booklet, linked from the Bike Routes page) | `https://www.edmonton.ca/sites/default/files/public-files/documents/small-vehicle-booklet-final.pdf` | Unread; not fetched | Background only |

## Collision records

| Source | Address | Status | Used for |
|---|---|---|---|
| Annual Collision Report: Collision Severity (dataset `77sf-j5rj`), metadata | `https://data.edmonton.ca/api/views/77sf-j5rj.json` | Read by the editor via the API on 2026-10-21; separately retrieved by the coordinator at 17:22 UTC and archived (editor archive), 54,489 bytes, SHA-256 `44151830704a890397ef364b786f443101008914cd3fe97f434e547e9029436c` | Claim 2 totals; the September 2022 reporting note |
| Collision Severity, bicycle columns by year | `https://data.edmonton.ca/resource/77sf-j5rj.json?$select=year,bicycle_collisions,fatality_bicyclist,serious_injuries_bicyclist,minor_injuries_bicyclist,total_collisions&$order=year` | Read by the editor via the API (14 rows, 2010 to 2023); coordinator retrieval at 17:22 UTC archived, 2,279 bytes, SHA-256 `bdac280ac89ae43301f9992cdb7acd2a53fae7eb2bee976282766e9288a9eaad` | Claim 2 totals; qualification 2 |
| Annual Collision Report: Collision Cause (dataset `5p44-if3k`), metadata | `https://data.edmonton.ca/api/views/5p44-if3k.json` | Archived (packet archive), SHA-256 `4aa9e40b76a150b66fbf0d0b3079401358c04f038276bcd23838a87f96108ef6`; read | Claim 2 qualification 2 (the cyclist-error column note) |
| Collision Cause, cyclist columns by year | `https://data.edmonton.ca/resource/5p44-if3k.json?$select=year,cyclist_error_violation,failed_to_yield_to_cyclist,opened_door_into_traffic&$order=year` | Read by the editor via the API (6 rows, 2018 to 2023); coordinator retrieval at 17:22 UTC archived, 685 bytes, SHA-256 `a9e2b12829bec98eae0c2bc7521fd014ceb6269c11f5b9f4fc5cd04d079c4e7c` | Claim 2 qualification 2 (floor) |
| Motor Vehicle Collisions annual report, 2018 | `https://www.edmonton.ca/sites/default/files/public-files/assets/PDF/2018MVC_AnnualReport.pdf` | Unread; HTTP 502 to the editor's fetch tool, HTTP 404 to the coordinator's retrieval at 17:30 UTC; not retried. The address came from a search extract; no other address was identified in the third-pass catalogue and page checks | Park 5 candidate instrument; not located |
| Motor Vehicle Collisions annual report, 2017 | `https://www.edmonton.ca/sites/default/files/public-files/assets/PDF/2017MVC_AnnualReport.pdf` | Unread; HTTP 502 to the editor's fetch tool, HTTP 404 to the coordinator's retrieval at 17:38 UTC; not retried | Park 5 candidate instrument; not located |
| Motor Vehicle Collisions annual report, 2016 | `https://www.edmonton.ca/sites/default/files/public-files/assets/RoadsTraffic/2016MVCAnnualReportsm.pdf` | Unread; HTTP 404 to the coordinator's retrieval at 17:38 UTC; not retried | Park 5 candidate instrument; not located |
| Motor Vehicle Collisions annual report, 2015 | `https://www.edmonton.ca/sites/default/files/public-files/assets/RoadsTraffic/OTS_2015_MVC_AnnualReport.pdf` | Unread; HTTP 404 to the coordinator's retrieval at 17:38 UTC; not retried | Park 5 candidate instrument; not located |
| Vulnerable Road User Collisions in Edmonton | `https://www.edmonton.ca/transportation/PDF/Vulnerable-Road-User-Collisions-In-Edmonton.pdf` | Unread; HTTP 502 to the editor's fetch tool; the coordinator's retrievals at 17:12 and 18:45 UTC resolved to the City's page-not-found HTML, not PDF bytes; not retried | Park 5 candidate instrument; not located |
| Vision Zero Edmonton 2019 annual report | Meeting portal `https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=73451` (behind the browser check; not attempted); the same report published by the City's engagement site, see the third-pass table below | Archived from the engagement site; read in full (15 pages). Page 5 gives bicycle collision counts 2015 to 2019 and the data method; no fault share | Park 5 search; Street Labs context |
| Vision Zero Edmonton 2020 annual report | `https://www.edmonton.ca/sites/default/files/public-files/assets/Vision_Zero_Annual_Report_2020.pdf` | Archived (editor archive, copy of the editor's fetch), 2,748,311 bytes, SHA-256 `8b01fc5a5d29867d00408595110a4b3b074df8ac8c51e4dcca0a482d50f49b6b`; read in full (18 pages) | Cyclist serious injury and fatality counts 2015 to 2020; programme description |
| Vision Zero Edmonton 2021 annual report | `https://www.edmonton.ca/sites/default/files/public-files/assets/PDF/Vision_Zero_Annual_Report_2021.pdf` | Archived (editor archive, copy of the editor's fetch), 2,720,601 bytes, SHA-256 `93d91e42aed28d75e2307fe5211827a59ad658f9c752970bbc4d1790c2aac4c1`; read in full: 19 physical PDF pages (a cover, a contents page, then pages carrying printed footers 3 to 19) | Cyclist counts 2015 against 2021; Street Labs first-year counts; Safe Passing Bylaw |
| Crash and Equity Analyses Technical Report, Safe Mobility Strategy 2021-2025 | `https://www.edmonton.ca/sites/default/files/public-files/assets/SMS_Crash-Equity-Technical-Analysis.pdf` | Archived (packet archive), SHA-256 `6ec99fdd994389d455c8fb0e18ccee1ce3ff2f6b95c36ab47efb084cd00470eb`; read in full | Risk parks (facility-type share with the City's caveat; limitations); claim 2 qualification 3 |
| Safe Mobility Strategy 2027-2030, revised May 2026 | `https://www.edmonton.ca/sites/default/files/public-files/documents/vision-zero-safe-mobility-strategy.pdf` | Archived (packet archive), SHA-256 `cd05c35787d14045c62d07a22d15d8658371f16c50a000b48ab672e462aef8ce`; read in the evidence, risk, impact, at-fault, near-miss and perception sections | Risk parks; claim 2 qualification 3; harassment park context; Street Labs context |
| Vision Zero: Traffic Safety (City page) | `https://www.edmonton.ca/transportation/traffic-safety` | Archived (packet archive), SHA-256 `8c639a8d9e6951027d896654f481f38437e2b9588a39ef9ec671297369fa225f`; read | The City's one-sentence description of Street Labs |

No document read for this draft states, for any year, the share of
reported bicycle collisions in which the cyclist was recorded at fault.
That now includes the Vision Zero annual reports for 2016 to 2021, the
two City analyses, the catalogue tables and the pages and configurations
listed in the third-pass table below. The search extracts that said the
2016 and 2018 Motor Vehicle Collisions reports state a cyclist
not-at-fault share remain unverified against any bytes, and the
addresses they led to no longer serve the documents. Whether the City
published such a share, for which years, and where it is now served, is
unresolved; the brief proposes the claim for parking on that bounded
result, not on a claim of absence.

## Exposure

| Source | Address | Status | Used for |
|---|---|---|---|
| Daily Pedestrian and Bike Counts (filter view `sw7k-ptx8` over `tq23-qn4m`), metadata | `https://data.edmonton.ca/api/views/sw7k-ptx8.json` | Archived (packet archive), SHA-256 `904b11d7a334c995f7f1892d743ea790730fdc8b0ee4abdca78b91eff602eb22`; read | Risk parks: the dataset's own quality note |
| Counter location list | `https://data.edmonton.ca/resource/tq23-qn4m.json?$select=counter_location_description,min(log_timestamp),max(log_timestamp),count(*)&$group=counter_location_description&$limit=100` | Read by the editor via the API (62 rows); coordinator retrieval at 17:22 UTC archived, 10,544 bytes, SHA-256 `0e8edb7fdca74e2e5642afc4b17190dbe976a4d6ae68ccf252aad2a20c4df96c` | Risk parks: why the counters are not an exposure record |

## Street Labs

The City's Street Labs page was retrieved by the coordinator at 17:30
UTC (HTTP 200, 172,368 bytes, SHA-256
`3b3c948235507a05c36050734da73aa04498e975973ec890d65882e5ebea02ba`,
archived in the editor archive) and read. Its Assessment section says:
"The City will review traffic data and community feedback received
through 311 to assess if any adjustments are needed over a 6-9 month
period following the completion of the Street Lab installation. An
Assessment Summary will be published when available. It will include
whether any adjustments are needed." It also notes that Street Labs
before 2023 were primarily community-led and did not follow the current
steps or documentation. The page lists many neighbourhoods; for most the
evaluation is marked "Not Available" or the assessment "To Be
Determined". The 24 PDFs below are every link on the page as retrieved
whose title is labelled evaluation or assessment. They are not every lab,
and the page as retrieved on 2026-10-21 is not the page as it stood on
2026-08-27.

Each was retrieved by the coordinator at about 17:34 UTC (all HTTP 200)
and is archived in the editor archive with the hash shown; the editor
read each from its extracted text. The index address of each carries a
cache-busting `?cb=` parameter, omitted here. "Index label" is the date
the page prints beside the link. "What it reports" is the editor's
classification of the document's contents, not a finding.

| Title on the index | Address (under `https://www.edmonton.ca/sites/default/files/public-files/`) | SHA-256 | Index label; survey or report date in the document | What it reports |
|---|---|---|---|---|
| Allard Evaluation Summary | `Allard-Street-Lab-Evaluation-Summary.pdf` | `31dcfcea625a25ddbab15052793d49657391d4920304bd6f8f84803eb017012f` | Evaluation: Winter 2025; survey 2025-02-04 to 02-18 | Resident feedback plus measured before-and-after speed compliance, average speed and volume on named streets |
| Ambleside Evaluation Summary | `Ambleside-Street-Labs-Installation-Evaluation-Summary.pdf` | `f95373c2aa0e2dff12d414cb939dfbd826ba298adb710f414802e87c2fd78c35` | Evaluation: Oct 2024; survey 2024-10-01 to 10-15 | Feedback plus post-installation speed compliance figures and one stated increase; before values not all given |
| Beverly Heights Evaluation Summary | `Beverly-Heights-Street-Lab-Evaluation-Summary-Report.pdf` | `18d27619bdce06220c916ee43059314ab9caedd553e8fa093c79c5934eb3883f` | Evaluation: Fall 2023; report June 2024 | Feedback (98 responses) plus a before-and-after table of speed compliance and daily traffic at one location |
| Bonnie Doon Evaluation Report | `Bonnie-Doon-Street-Labs-Phase-I-Project-Update.pdf` | `aea3d6e0d8af0d94e2b33051bdee8c64040c7815b5475ee00ac604c0e72bd327` | Evaluation: Spring 2025 | Project update: feedback and stated technical findings (diverters not effective, to be removed); no figures |
| Carlton Evaluation Summary | `carlton-street-labs-evaluvation-summary.pdf` | `a7a20639ae0d551b72f24f93c68500e32995be2625fd1da5e7ad989e486cf262` | Evaluation: Winter 2025; survey 2025-02-18 to 03-04 | Feedback only; generic measure benefits; no measurement |
| High Park Assessment Summary | `documents/street-labs-high-park-assessment-summary.pdf` | `b40eacc84d6ba41611d4cb0edb7c8853b29c61de6badc98ab5c15fafe6b42894` | Assessment: September 2026; measures installed October 2025 | Generic measure benefits and decisions; no measurement. Later than the as-of date |
| Idylwylde Evaluation Summary | `Idylwylde-street-labs-evaluvation-summary.pdf` | `79c007c1ea9159c7e6f4c97e32129bc70bab21e8f297bdc2c0718a761dfa4ea3` | Evaluation: Winter 2025; survey 2025-02-04 to 02-18 | Feedback plus before-and-after speed compliance at one location |
| Jackson Heights Assessment Summary | `documents/jackson-heights-assessment-summary.pdf` | `ab2da1dfc7c59a5e2bb8794f9db9a13e3df7876ee0d9b0db4817bdf09df4ca0e` | Assessment: Fall 2026; measures installed August 2025 | Generic measure benefits and decisions; no measurement. Later than the as-of date |
| Laurel Evaluation Summary | `laurel-street-labs-evaluvation-summary.pdf` | `3a3b28a525abaf900da6ba41200209efaf1337703afd86fe6656c8cbe6e57490` | Evaluation: Winter 2025; survey 2025-02-18 to 03-04 | Feedback only; generic measure benefits; no measurement |
| Mayfield Evaluation Summary | `mayfield-street-labs-evaluvation-summary.pdf` | `963377e4dcb070f989a6a2d9573f30d157e0b3b50cd2615db44c470371ba4576` | Evaluation: Winter 2025; survey 2025-02-11 to 02-25 | Feedback plus before-and-after speed compliance and volume at one location |
| McConachie Evaluation Summary | `McConachie-Street-Lab-Evaluation-Summary-Report.pdf` | `631dff3ca43bcedbd1bc6e7fc4a5ec166cb455e1f32fd05c62eb4081da0962d6` | Evaluation: May 23 to Jun 6, 2024; report January 2025 | Feedback (70 responses) plus a before-and-after table of average speed, 85th-percentile speed, compliance and volume across locations |
| McKernan Street Lab Evaluation Summary | `McKernan-Street-Labs-Installation-Evaluation-Summary.pdf` | `8014e3c833c6c9e30dbd981d3e4d132da01c12b6ed59d2d75f513cb5ab4d766d` | Evaluation: Fall 2024; survey 2024-10-22 to 11-05 | Feedback plus speed compliance figures (some before-and-after, some post only) and a stated change in on-road cyclist counts |
| Newton Evaluation Summary | `newton-street-labs-evaluvation-summary.pdf` | `b68642400b3b9a48abd1684ae9af3e9d17fa1d543b2d03a5e17d1aa6e055d47c` | Evaluation: Winter 2025; survey 2025-02-25 to 03-11 | Feedback plus before-and-after traffic volumes and a one-way compliance figure; no speed measurement |
| Northmount Evaluation Summary | `Northmount-Street-Labs-Ext-Evaluation-Project-Update.pdf` | `dc94d6e80b6a1c766135b33dadaa2faf30f0e8c06dba96ec0f6f2f2e769f5b15` | Evaluation: Nov 2024; survey 2024-11-01 to 11-15 | Project update: feedback and stated findings (volume unchanged, speed impact "only marginally"); no figures |
| Parkdale Evaluation Summary | `documents/parkdale-streetlab-evaluation-summary.pdf` | `9d19cd2ce3d609383fe8e796c61fef9f141c49db5a8129f74b83061425215a4b` | Evaluation: Winter 2025; survey 2025-02-25 to 03-11 | Feedback plus before-and-after average speed on one road and post-only compliance at another |
| Parkview Evaluation Summary | `parkview-street-labs-evaluvation-summary.pdf` | `ba9ec1d72f309cb2a810b92e4484f73aa4dddef32068fd5172d4ecdf949dbb78` | Evaluation: Winter 2025; survey 2025-02-11 to 02-25 | Feedback plus post-installation speeds described as a slight reduction and before-and-after compliance at one location |
| Ritchie Evaluation Summary | `Ritchie-Towards40-Evaluation-Summary.pdf` | `dd4deafb0d083c31d1e4fa67ae2a99ebd92cffdc8e2a095a8014048112e3b58c` | Evaluation: Winter 2025; survey 2025-02-04 to 02-14; report September 2025 | Feedback plus before-and-after compliance, a stated speed reduction at a two-stage crossing, a stated change in cyclist counts, and measures removed where volume did not change |
| Silver Berry Evaluation Summary | `Silver-Berry-Street-Lab-Evaluation-Summary-Report.pdf` | `4232a877c17275e250d58f575b4821c530285cf91dff171c03251443fb37d215` | Evaluation: Summer 2024; survey 2024-02-14 to 02-28; report June 2025 | Feedback (88 responses) plus before-and-after average speed and compliance at named locations |
| The Orchards at Ellerslie Evaluation Summary | `the-orchards-at-ellerslie-street-labs-evaluvation-summary.pdf` | `ff9aecf208e837c3cc4d70de5468cc201b2f88b63eb1aa84fea081f042a34a17` | Evaluation: Winter 2025; survey 2025-02-18 to 03-04 | Feedback plus before-and-after average speed at one location |
| Webber Greens Evaluation Public Notice | `Webber-Greens-Street-Labs-Evaluation-Public-Notice.pdf` | `e153eed4121dfbc9fd9cd582b872a3072ea3e1a26fcc9db7bd55d2acfd0f9050` | Survey window Nov 25 to Dec 16 (2025) | A survey invitation and map; not an evaluation |
| Webber Greens Evaluation Summary | `documents/webber-greens-street-labs-evaluation-summary.pdf` | `211a8dcc79b8c400017c31337b9458a386b45d207a29d00ca450c784a33a2e61` | Evaluation: Nov 2025; survey 2025-11-25 to 12-16 | Feedback and decisions; no measurement |
| Wellington Evaluation Summary | `documents/wellington-street-lab-evaluation-summary.pdf` | `690e747a547f595337b99e07dfd565cda38d3101a8e8f760a5730bdfd2c60804` | Evaluation: Winter 2025; survey 2025-02-11 to 02-25; mentions a January 2026 change | Feedback plus one post-only speed figure; no before-and-after |
| Wild Rose Assessment Summary | `documents/street-labs-wild-rose-assessment-summary.pdf` | `34a974259b965172583315353c2d3acf0ec3c66ba6e8a1589d3e32e924c1771d` | Assessment: Summer 2026 on the index; the document says measures installed June 2025 and carries no publication date | Generic measure benefits and decisions; no measurement. Whether "Summer 2026" falls before or after 2026-08-27 is not established |
| Woodcroft Assessment Summary | `documents/street-labs-woodcroft-assessment-summary.pdf` | `9f78fd9f70f8bd0a7ec9b77338e20eac47a047b140d81b88cd8abf7ddffb064c` | Assessment: September 2026 on the index; the document says measures installed August 2025 (the index says Install: Spring 2025) and carries no publication date | Generic measure benefits and decisions; no measurement. The index label is after the as-of date |

Three of these (Silver Berry, Newton, Laurel) were also retrieved
separately at 17:30 UTC with the same hashes. None of the 24 reports a
pedestrian collision count before and after installation. Four are
assessment summaries whose index labels are 2026 seasons or months:
High Park and Woodcroft "September 2026", Jackson Heights "Fall 2026",
Wild Rose "Summer 2026". An index label is a season or month the page
prints, not a publication date; three of the four fall after 2026-08-27
by their label and Wild Rose's straddles it. The other twenty carry
survey or report dates in 2024 or 2025 inside the document, which shows
each existed as dated before the as-of date, not when it was posted.
Which labs had a published evaluation on 2026-08-27 is not established
by this retrieval.

| Other Street Labs material | Address | Status | Used for |
|---|---|---|---|
| Street Lab "What We Heard" reports, 2026 (several neighbourhoods) | Under `https://www.edmonton.ca/sites/default/files/public-files/documents/` with names of the form `<neighbourhood>-street-lab-2026-what-we-heard-report.pdf` | Unread; found by search | Engagement reports, not evaluations; context only |

## Downtown Bike Network

| Source | Address | Status | Used for |
|---|---|---|---|
| One Year In: The Downtown Bike Network Interim Report, November 2018 | `https://www.gov.edmonton.ab.ca/transportation/The_Downtown_Bike_Network_Interim_Report.pdf`, resolving to `https://www.edmonton.ca/sites/default/files/public-files/assets/The_Downtown_Bike_Network_Interim_Report.pdf` | Archived (editor archive), coordinator retrieval at 17:12 UTC, HTTP 200, 25,199,604 bytes, SHA-256 `21387766d5cde5664fe9ed6ad658c68affe497110e4980bc0623a7a24057da3a`; read in full, 12 pages including figures | Sidewalk park and risk parks |
| The comprehensive report targeted for 2019 that the interim report promised | Not found | Not found by search | Reopening lead |

What the interim report holds, for the parks: bicycle counts at 13
locations from May 2017 to July 2018 (Figure 1), a male and female share
before and after opening, survey and Street Team results, and a 311
summary listing "concerns with cyclist behaviour (e.g. cyclists riding on
sidewalks)" among about 300 calls and emails. It holds no count of
cyclists on sidewalks. It says a road safety review of the network was
under way with results to be shared in 2019 and that a 2019
comprehensive report would include collision and safety information.
Neither was found.

## Third pass: prerequisite sources, 2026-10-21

One bounded official-source pass by the coordinator between 18:45 and
18:51 UTC, after the second revision, held in a third private archive
whose `retrieval-manifest.json` records every request, outcome, byte
length and hash. No denied address was retried and no browser check was
bypassed. "Read" below means the editor read it; "screened" means the
coordinator inspected it mechanically and the editor relied on the
recorded result without reading the document.

| Source | Address | Status | Used for |
|---|---|---|---|
| Public Spaces Bylaw page (City explainer) | `https://www.edmonton.ca/city_government/bylaws/public-spaces-bylaw` | Archived, HTTP 200, SHA-256 `ad8e08c7a2044f6c2f3d816c8e6128e27fdcc3c54cccc8d5245da44bf156a940`; read. Says Council approved the bylaw 2025-02-25 and that it continues to permit children under 16 to ride on sidewalks; links the May 19, 2026 consolidation | Route to the archived bylaw; background |
| City bylaw index data (the endpoint the Bylaw Lookup page uses) | `https://www.edmonton.ca/open-data/10406?queryParams=$select=*` | Archived, SHA-256 `e648820e24b850815d4790e355edf8bb6a80abaa007b5bcca5e2c1af5ba4b192`; read for the 5590 and 20700 entries | Amendment checks |
| Bylaw Lookup page | `https://www.edmonton.ca/city_government/bylaws/bylaw-lookup` | Archived, SHA-256 `6e26dd603f59ad560a218c9539c769c0be7c5f9fecdf10af4b62e48d3e087720`; screened | Amendment checks |
| Community and Public Services Committee minutes, 2026-01-19 | `https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=PostMinutes&Id=9b2fc4da-a9fb-4d8a-85e4-b89c25f6c352&lang=English` | Archived, SHA-256 `c1aa83e0afa0bd8b4a96c292e30604f45428a053fe48a7501b89a93e2172ff16`; read for item 7.1 (report CS03123, Bylaw 21283, received for information) | Bylaw 5590 amendment check |
| City Council agenda attachments, 2026-10-06, item 8.2 (Bylaw 21502, one-year review of Bylaw 20700) | `https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=e5f69000-1fd3-482a-ad11-a5b80584865e&Item=21&Tab=attachments&lang=English` | Archived, SHA-256 `12ce9892035d8863a173ca8fb0050317ec4367b6880e35eeaf6439a7c6f99a8f`; read for the item's file list, which includes "Signed Bylaw 21502 - Published October 7, 2026" | Bylaw 20700 chronology |
| Signed Bylaw 21502 and report OCM02976 | `https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=309335` and `...DocumentId=309330` | HTTP 403 on one attempt each; not retried; unread | Chronology limit |
| Alberta regulations index, subsisting 2026-09-30 (King's Printer, Gazette) | `https://kings-printer.alberta.ca/documents/gazette/2026/pdf/Regindex.pdf` | Archived, 381,472 bytes, SHA-256 `2f411d073fc8fc06bd8e484aab4e19b5831d92639dbaf4d3a3fe7da9ca79f716`; read for the AR 304/2002 entry, whose amendment list ends at 167/2025 | AR 304/2002 amendment check |
| Open Alberta record and King's Printer product page for AR 304/2002; Gazette pages | `https://open.alberta.ca/publications/2002_304`; `https://kings-printer.alberta.ca/570.cfm?frm_isbn=9780779856923&search_by=link`; `https://kings-printer.alberta.ca/alberta_gazette.cfm?page=gazette_2026_pt2.cfm` | Archived (hashes in the manifest); screened: current to 167/2025 | Amendment check corroboration |
| Safe Mobility engagement page listing historical annual reports | `https://engaged.edmonton.ca/safestreets` | Archived, SHA-256 `61458e7e7c89180d60d1dbc1748aa4daeb3b3c1b5ed59f71deb7ec77349e7a6b`; screened | Route to the four reports below |
| Vision Zero Edmonton annual report 2016 (46 pages) | `https://engaged.edmonton.ca/download_file/19/486` | Archived, SHA-256 `72d278d21c001882b40dc00ddec6acbefda182593847ddedaff0a798a2d26ec0`; cyclist passages read, whole text screened for "fault" (none) | Park 5 search |
| Vision Zero Edmonton annual report 2017 (28 pages) | `https://engaged.edmonton.ca/download_file/20/486` | Archived, SHA-256 `f23887876f843cdd70f67f080e8fb63231d731bd360e4f5c4cad3578c7319bed`; cyclist passages read, screened (none) | Park 5 search |
| Vision Zero Edmonton annual report 2018 (40 pages) | `https://engaged.edmonton.ca/download_file/16/486` | Archived, SHA-256 `9e1a179ea457cc63640bdf797907fd90b13b761009f9cf646966280f09dbb768`; cyclist passages read, screened (none); gives cyclist injury and fatality counts for 2015 and 2018 | Park 5 search |
| Vision Zero Edmonton annual report 2019 (15 pages) | `https://engaged.edmonton.ca/download_file/17/486` | Archived, 1,974,364 bytes, SHA-256 `0cf097437cac3b5d1ccfc1aaef4effcc444f4b2c43f0d706d6b75c80c18869e7`; read in full | Park 5 search; the 2019 row above |
| Crash and Equity Analyses Technical Report, re-fetched | as in the collision table | Same bytes as the packet archive (SHA-256 matches); its fault discussion is by mode for fatal and serious crashes, not a bicycle denominator | Park 5 search |
| Data catalogue queries: "collision" (14 results), "fault" (1), "vision zero" (5) | `https://api.us.socrata.com/api/catalog/v1?domains=data.edmonton.ca&search_context=data.edmonton.ca&q=<term>&limit=100` | Archived, SHA-256 `2fc1695f8823c495afddb7d5e8d6e8a10bfc220897030e2b11c8af7a78fdf052`, `f7bce8042aea9eabfa4f8d6887111b6d0dc03a82fe2ee97547e36e9cf9e87633`, `9eb768c824bb7c9bfc37f5c6dda9cab89cdae4d965a7e9bc204053b7a75d9c62`; screened: no dataset's column metadata classifies bicycle involvement and fault by party together | Park 5 search |
| Traffic safety and automated enforcement pages; 2025 Automated Traffic Enforcement report (121 pages) | `https://www.edmonton.ca/transportation/traffic-safety`; `https://www.edmonton.ca/transportation/traffic_safety/automated-enforcement`; `https://www.edmonton.ca/sites/default/files/public-files/documents/2025-automated-traffic-enforcement-report.pdf?cb=1777649466` | Archived (SHA-256 `7baf85aad2d3a6ba5e0f4cd7dcbf112ca652f94cddc3652513aaacbca29a172b`, `a701368e02d57075e2ea4531e47f4574ecec9b35aeb28318c0d3f176df99ae7b`, `216bb59fd9c12a48193a80cbce349c5e258fda41cd181ebdc912ee99a3bfa0e4`); screened: no "fault" match in the report; unread by the editor | Park 5 search |
| Safe Streets map and its published app and web map configurations | `https://gis.edmonton.ca/SafeStreetsMap`; `https://gis.edmonton.ca/portal/sharing/rest/content/items/9b34e2f2a4e441e283fab3ff5c2dadc4/data?f=json`; `.../items/d091650477df44e8a2777f4a9567c1b2/data?f=json` | Archived (SHA-256 `25773b71ec8587182cba3aa8d5bdc86342309f4009be14da2a5349acaec9099d`, `f2e7b194fa40ee4a155efe9160972c55d2168680782769ef081baf5085264620`, `aa9ccca58356b22010a0b69d9dd2358ea4145a66d0d881c3e7938e31ff1006f5`); screened: 13 operational layers, no fault-attribution popup field; the underlying services and earlier versions were not inspected | Park 5 search |
| Automated Traffic Enforcement dashboard (data portal story) | `https://data.edmonton.ca/stories/s/Automated-Traffic-Enforcement/8afu-5d24/` | Redirected to a login page; only that page was archived (SHA-256 `4d32963a392bc635fb86a7d862b0c7d75e7a2252e3b9895c42de6e354c53dfea`); no login; content unverified | Park 5 search limit |
## Archived files not used

Four of the ten files in the packet archive do not bear on this question
and are not cited: `waste-collection.html`, `access-and-privacy.html`,
`active-transportation.html` and `bike-land-development-report.pdf`.

## Retrieval limits observed on 2026-10-21

This paragraph records the first two passes as they stood before the
third. The third pass's own outcomes are in its table above; in
particular, the 2019 Vision Zero report that the meeting portal kept
behind its browser check was later retrieved from the City's engagement
site and read in full. The editor's fetch tool could not reach
`web.archive.org`, and most `www.edmonton.ca` document and page
addresses answered it HTTP 502 while a few downloaded. The coordinator
attempted only the addresses whose manifest rows say so. It reached the
Traffic Bylaw, the Downtown Bike
Network interim report, the Street Labs page, all 24 index PDFs and the
four data portal requests; the four historical collision report
addresses answered HTTP 404; the Vulnerable Road User address resolved
to the City's page-not-found HTML; the two King's Printer regulation
addresses and the City's bylaw index address answered HTTP 403. The
addresses marked "not fetched" above (the City-hosted Traffic Safety Act
copy, the small-vehicle booklet) and the meeting portal were not
attempted. No refused or missing address was retried. None of this shows
that any document does not exist.

Still unresolved after the third pass: whether any amendment to Bylaw
20700 took effect between 2026-05-19 and 2026-08-27 (the brief states
this limit and has the reviewer check the index); any City publication
stating fault by party for bicycle collisions, for any year, which the
bounded search did not locate and the brief does not declare absent; a
Vision Zero or Safe Mobility annual report for 2015 or 2022 to 2025; and
the 2019 Downtown Bike Network comprehensive report.
