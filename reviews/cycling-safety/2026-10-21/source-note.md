# Source note: cycling-safety draft of 2026-10-21

What the editor read, what is archived, and what remains unread or
unresolved. Updated 2026-10-21 after the coordinator's second retrieval
pass. Two private, gitignored archives in the main checkout hold the
bytes, each with a JSON manifest recording URL, retrieval time, status,
byte length and SHA-256:

- **Packet archive**, `evidence/private/source-prep-2026-10-21/`: the ten
  files the coordinator retrieved before drafting began.
- **Editor archive**, `evidence/private/cycling-editor-2026-10-21/`: 45
  files and manifests retrieved or copied on 2026-10-21 after the first
  draft. Six of its PDFs are byte copies of documents the editor's own
  fetch tool had already downloaded and read; the manifest says so for
  each. Everything else in it is a separately dated coordinator
  retrieval of the same public address, not a copy of the editor's
  session response.

Status words: **Archived** (bytes in one of the two archives, hash
shown); **Read** (the editor read the document, from the archive or from
the same bytes before they were archived); **Unread**; and the retrieval
outcome where a fetch failed. A failed fetch is a fact about one address
on one day. It is not evidence that the document does not exist or was
never published.

## Law

| Source | Address | Status | Used for |
|---|---|---|---|
| Traffic Safety Act, RSA 2000 c T-6, King's Printer office consolidation current as of 2026-07-02 | `https://kings-printer.alberta.ca/documents/Acts/T06.pdf` | Archived (editor archive, copy of the editor's fetch), 1,017,567 bytes, SHA-256 `65525763bd857b2c11278b3dfe58e5317ef3686af029671a2995288edad0b644`; read in part (s. 1 definitions and subsections, s. 1(11); the s. 13 bylaw powers as recited in Bylaw 5590's preamble) | Claim 1 instrument; terms |
| Traffic Safety Act, City-hosted copy linked from the Bike Routes page | `https://www.edmonton.ca/sites/default/files/public-files/documents/t06-trafficsafetyact.pdf` | Unread; not fetched | Reviewer compares consolidation dates |
| Use of Highway and Rules of the Road Regulation, AR 304/2002, consolidated to AR 167/2025, current as of 2025-08-08 | `https://kings-printer.alberta.ca/documents/Regs/2002_304.pdf` | Archived (editor archive, copy of the editor's fetch), 642,152 bytes, SHA-256 `3fb1e9a8e5b5981f5968599181a64dce8f5d38410ea0028642ff3db41cea51d4`; the coordinator's direct download of the same address answered HTTP 403 and was not retried; read in part (s. 1(1); Part 2 Division 4 ss. 75 to 79; ss. 83, 85; Part 3 ss. 90 to 93; table of contents) | Claim 1 instrument, essential |
| Vehicle Equipment Regulation, AR 122/2009, consolidated to AR 129/2025, current as of 2025-06-11 | `https://kings-printer.alberta.ca/documents/Regs/2009_122.pdf` | Archived (editor archive, copy of the editor's fetch), 694,361 bytes, SHA-256 `852c9db46c6a2c8f3c9290655542516e72672bbb71fea63bb9d45d578dc0af9c`; the coordinator's direct download answered HTTP 403 and was not retried; read in part (Part 6 Division 5 ss. 111 to 113; table of contents) | Claim 1 qualification 5 |
| Traffic Bylaw 5590, City of Edmonton, consolidated on May 12, 2025 | `https://www.edmonton.ca/sites/default/files/public-files/documents/Bylaws/C5590.pdf` | Archived (editor archive): the coordinator's direct retrieval at 17:12 UTC (HTTP 200, 514,776 bytes) and the copy of the editor's fetch carry the same SHA-256 `27d722283496655327c3f558b113fb8eef42b0c1ba7c60cc25f9ea86e0629312`; read in the preamble, Part I s. 2 definitions, Part II s. 4(2), Part III pp. 28 to 30 (ss. 49 to 52 marked Deleted by Bylaw 20700, May 12, 2025), Part V s. 84 (restricted highway, with bicycles among the classes a highway may be restricted to) and Part VIII s. 107(cc) and (dd) (the City Manager may designate portions of any highway where the use of bicycles is prohibited, or for the use of bicycles only). The rest of Parts IV to VIII not read line by line | Claim 1 instrument, essential; E2 and E3 |
| Public Spaces Bylaw 20700, City of Edmonton | City page `https://www.edmonton.ca/city_government/bylaws/public-spaces-bylaw` (HTTP 502 to the editor's fetch tool); bylaw index address `https://webdocs.edmonton.ca/bylaws/20700-Public-Spaces-Bylaw-C-20260519.pdf` | Not archived; unread by the editor. The coordinator's web tool read the index address before a download was tried and reports a 43-page PDF whose cover says consolidated on October 06, 2026, with October 6 amendment annotations, despite the May 19 date in the file name; the direct download then answered HTTP 403 and was not retried. So the address and a later consolidation are verified; the text in force on 2026-08-27 is not, and no copy of any version exists in either archive | Claim 1 instrument, essential; unresolved |
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
| Motor Vehicle Collisions annual report, 2018 | `https://www.edmonton.ca/sites/default/files/public-files/assets/PDF/2018MVC_AnnualReport.pdf` | Unread; HTTP 502 to the editor's fetch tool, HTTP 404 to the coordinator's retrieval at 17:30 UTC; not retried. The address came from a search extract; no other address for the document was identified | Claim 2 candidate instrument; unresolved |
| Motor Vehicle Collisions annual report, 2017 | `https://www.edmonton.ca/sites/default/files/public-files/assets/PDF/2017MVC_AnnualReport.pdf` | Unread; HTTP 502 to the editor's fetch tool, HTTP 404 to the coordinator's retrieval at 17:38 UTC; not retried | Claim 2 candidate instrument; unresolved |
| Motor Vehicle Collisions annual report, 2016 | `https://www.edmonton.ca/sites/default/files/public-files/assets/RoadsTraffic/2016MVCAnnualReportsm.pdf` | Unread; HTTP 404 to the coordinator's retrieval at 17:38 UTC; not retried | Claim 2 candidate instrument; unresolved |
| Motor Vehicle Collisions annual report, 2015 | `https://www.edmonton.ca/sites/default/files/public-files/assets/RoadsTraffic/OTS_2015_MVC_AnnualReport.pdf` | Unread; HTTP 404 to the coordinator's retrieval at 17:38 UTC; not retried | Claim 2 candidate instrument; unresolved |
| Vulnerable Road User Collisions in Edmonton | `https://www.edmonton.ca/transportation/PDF/Vulnerable-Road-User-Collisions-In-Edmonton.pdf` | Unread; HTTP 502 to the editor's fetch tool; the coordinator's retrieval at 17:12 UTC resolved to the City's page-not-found HTML (`https://www.edmonton.ca/page-not-found`), not PDF bytes; not retried | Claim 2 candidate instrument; unresolved |
| Vision Zero Edmonton 2019 annual report | `https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=73451` | Unread; behind the meeting portal's browser check; not attempted by the coordinator | Claim 2 candidate; Street Labs context |
| Vision Zero Edmonton 2020 annual report | `https://www.edmonton.ca/sites/default/files/public-files/assets/Vision_Zero_Annual_Report_2020.pdf` | Archived (editor archive, copy of the editor's fetch), 2,748,311 bytes, SHA-256 `8b01fc5a5d29867d00408595110a4b3b074df8ac8c51e4dcca0a482d50f49b6b`; read in full (18 pages) | Cyclist serious injury and fatality counts 2015 to 2020; programme description |
| Vision Zero Edmonton 2021 annual report | `https://www.edmonton.ca/sites/default/files/public-files/assets/PDF/Vision_Zero_Annual_Report_2021.pdf` | Archived (editor archive, copy of the editor's fetch), 2,720,601 bytes, SHA-256 `93d91e42aed28d75e2307fe5211827a59ad658f9c752970bbc4d1790c2aac4c1`; read in full: 19 physical PDF pages (a cover, a contents page, then pages carrying printed footers 3 to 19) | Cyclist counts 2015 against 2021; Street Labs first-year counts; Safe Passing Bylaw |
| Crash and Equity Analyses Technical Report, Safe Mobility Strategy 2021-2025 | `https://www.edmonton.ca/sites/default/files/public-files/assets/SMS_Crash-Equity-Technical-Analysis.pdf` | Archived (packet archive), SHA-256 `6ec99fdd994389d455c8fb0e18ccee1ce3ff2f6b95c36ab47efb084cd00470eb`; read in full | Risk parks (facility-type share with the City's caveat; limitations); claim 2 qualification 3 |
| Safe Mobility Strategy 2027-2030, revised May 2026 | `https://www.edmonton.ca/sites/default/files/public-files/documents/vision-zero-safe-mobility-strategy.pdf` | Archived (packet archive), SHA-256 `cd05c35787d14045c62d07a22d15d8658371f16c50a000b48ab672e462aef8ce`; read in the evidence, risk, impact, at-fault, near-miss and perception sections | Risk parks; claim 2 qualification 3; harassment park context; Street Labs context |
| Vision Zero: Traffic Safety (City page) | `https://www.edmonton.ca/transportation/traffic-safety` | Archived (packet archive), SHA-256 `8c639a8d9e6951027d896654f481f38437e2b9588a39ef9ec671297369fa225f`; read | The City's one-sentence description of Street Labs |

No document read for this draft states, for any year, the share of
reported bicycle collisions in which the cyclist was recorded at fault.
The search extracts that said the 2016 and 2018 annual reports state a
cyclist not-at-fault share have not been verified against any bytes, and
the addresses they led to no longer serve the documents. Whether the
City published such a share, for which years, and where it is now
served, is unresolved.

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

## Archived files not used

Four of the ten files in the packet archive do not bear on this question
and are not cited: `waste-collection.html`, `access-and-privacy.html`,
`active-transportation.html` and `bike-land-development-report.pdf`.

## Retrieval limits observed on 2026-10-21

The editor's fetch tool could not reach `web.archive.org`, and most
`www.edmonton.ca` document and page addresses answered it HTTP 502 while
a few downloaded. The coordinator attempted only the addresses whose
manifest rows say so. It reached the Traffic Bylaw, the Downtown Bike
Network interim report, the Street Labs page, all 24 index PDFs and the
four data portal requests; the four historical collision report
addresses answered HTTP 404; the Vulnerable Road User address resolved
to the City's page-not-found HTML; the two King's Printer regulation
addresses and the City's bylaw index address answered HTTP 403. The
addresses marked "not fetched" above (the City-hosted Traffic Safety Act
copy, the small-vehicle booklet) and the meeting portal were not
attempted. No refused or missing address was retried. None of this shows
that any document does not exist.

Still unresolved after this pass: the text of Bylaw 20700 in force on
2026-08-27; any City publication stating fault by party for bicycle
collisions, for any year; the 2019 Vision Zero annual report; and the
2019 Downtown Bike Network comprehensive report.
