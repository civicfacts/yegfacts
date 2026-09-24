# Source verification — lanes-and-congestion

Gate stage 7, part 1. Run date 2026-09-24 (story run `2026-09-16`),
methodology v1.40. Auditor: a Claude (Opus 5.5) audit session, separate from
the drafting session and from both faithfulness seats.

**Verdict: GATE FAIL on two statements.** One TL;DR bullet says no study
shows whether traffic on an Edmonton street slowed or sped up after it got a
bike lane, and the run's own freshness audit records a City before-and-after
evaluation of Hermitage Road that reports vehicle speeds. One claim limitation
says no seat verified 96 Street in round 1, and the Claude seat's round-1 file
lists it among its verified corridors. Both fixes are wording only. Nothing
touches the finding: every figure it rests on reproduces, and the district
count of 3 stands.

**Scope.** Every statement of fact in `src/content/stories/lanes-and-congestion.mdx`
(the `one_line`, all five TL;DR bullets, the 2026-09-24 changelog note, and
every body sentence carrying a number, a date, a place, a document or an
assertion about what a check or a seat found) and in
`src/content/claims/lc-lanes-taken-citywide.yaml` (the `answer`, all ten
`key_facts`, all eight `limitations`, the `unknowns` and `missing_evidence`
lines, and every `review.reviewers` entry). The page also renders the three
claims parked at framing, with the reason and reopening condition read out
of `intake/register.yaml`; those six sentences are graded too. Body sentences
that are connective or interpretive and assert nothing about the record were
not counted. Nothing in scope was skipped.

The graded tree is the worktree at commit `5e92aef`.

**Grading bases.** Facts about Edmonton are graded against the archived bytes
of the evidence the claim cites, YF-EV-0163 to YF-EV-0172, and nothing else.
Facts about the commenters are graded against `intake/register.yaml` and the
capture README. Facts about the site's own framing check are graded against
`framing/check-3.md`, `framing/check-4.md` and the register's park reasons.
Facts about what a panel seat found are graded against `round1/*.json` and
`round2/*.json`. Facts about the site's own later checks are graded against
`gate/freshness-audit.md`, `fetch-report.md`, the two `faithfulness/` reports
and `plain-speech/gpt-1.md`. No web access was used.

**Method.** PDFs were extracted with `pdftotext -layout`, and metadata was
read with `pdfinfo`. The West Central guide's map legend and line colours were
checked by rendering page 1 with `pdftoppm` and cropping the 102 Avenue
stretch, because a text extract cannot show which line is green. HTML
archives were stripped of script and style blocks and tag-flattened with a
`python3` one-liner before phrase search. The inventory GeoJSON was parsed
with `python3 -c` scripts, named below where a figure depends on one.

## Integrity check

All ten archives cited by the claim are present in this worktree's
`evidence/private/` and match the `archive.sha256` in their registry entry.

```
python3 -c "
import hashlib,pathlib,re
for n in range(163,173):
    i=f'{n:04d}'
    reg=pathlib.Path(f'evidence/registry/YF-EV-{i}.yaml').read_text()
    sha=re.search(r'sha256:\s*(\S+)',reg).group(1)
    f=pathlib.Path(re.search(r'path:\s*(\S+)',reg).group(1))
    print(f'YF-EV-{i}', 'MATCH' if hashlib.sha256(f.read_bytes()).hexdigest()==sha else 'MISMATCH')"
```

| ID | Archive | Form | sha256 |
|---|---|---|---|
| YF-EV-0163 | 102 Avenue Bike Route Fact Sheet (PDF metadata title "… Fact Sheet May 2017") | 5 pp PDF | match |
| YF-EV-0164 | West Central Bike Routes, November 2017 | 2 pp PDF | match |
| YF-EV-0165 | Garneau Neighbourhood Renewal Final Design, "Updated April 2021" | 69 pp PDF | match |
| YF-EV-0166 | Bike Routes – On Street, layer 236, 2026-09-23 export | GeoJSON, 3,175 features | match |
| YF-EV-0167 | Plans in Effect: District Plans | HTML | match |
| YF-EV-0168 | Valley Line West: Final Road Configuration | HTML | match |
| YF-EV-0169 | 132 Avenue What We Heard Report, February 2022 | 50 pp PDF | match |
| YF-EV-0170 | Active Transportation Network Expansion route table | HTML, 54 table rows | match |
| YF-EV-0171 | 132 Avenue Renewal project page | HTML | match |
| YF-EV-0172 | 132 Avenue Phase 5 FAQ, "Community Feedback on Final Design, September – October, 2022" | 11 pp PDF | match |

YF-EV-0166 is also byte-identical to the tracked
`reviews/lanes-and-congestion/2026-09-16/snapshot/bike-routes-on-street.geojson`
(`cmp` returns nothing), and the calculation module refuses to run unless the
snapshot's hash equals the frozen one. No cited archive is a soft-404. The
Internet Archive provenance of YF-EV-0163 and YF-EV-0165 rests on the
registry entries; the bytes themselves are the plain PDFs and carry no
capture wrapper, so that provenance could not be checked from the bytes.

## The calculation

`npx tsx scripts/calcs/lanes-and-congestion.ts` prints:

| Figure | Output | Where the page uses it |
|---|---|---|
| `snapshotFeatureCount` | 3175 | "lists 3,175 segments"; KF-7 |
| `priorUseFields` | `[]` | "says nothing about what any of that space was used for before"; TL;DR 5; KF-7 |
| `street110` | 6 protected two-way segments in the 76–82 Avenue band, all construction year 2022 | "records that protected lane as built in 2022"; KF-5 |
| `districtCount` | 15 | "3 of its 15 districts" |
| `verifiedDistricts` | Central, Scona, North Central | "3 of its 15 districts"; KF-6 |
| `districtThresholds` | 8 and 5 | "8 of 15, or in 5" |
| `people` | question 24; 13, 6, 4, 1 | the opening paragraph |

`npx vitest run tests/calcs-lanes-and-congestion.test.ts`: 4 passed. Every
figure in the prose equals the calculation output.

The module's transcription was spot-checked against the bytes. The field list
of the export has 25 attributes, none about prior use; `construction_year` is
null on 2,060 of 3,175 features, which is what KF-7's "blank for some
segments" says. The 15 districts are the 15 plans listed in YF-EV-0167,
Rabbit Hill as a draft.

Two cross-checks the page does not print but which bear on it. On 96 Street
the export carries protected one-way and local-bikeway features between about
53.572° and 53.579° N, construction year 2025, status "Constructed". On 100
Street it carries three protected two-way features between about 53.516° and
53.519° N with the same year and status. So YF-EV-0166, which the claim
cites, supports "built in 2025" for both streets, while the route table the
page links for them does not (finding A3 below).

## Statement by statement

Grades: VERIFIED (the source carries it), PARTIAL (what the source carries
and what it does not), NOT FOUND, CALC (reproduced by the script).

### Story — standfirst, TL;DR, changelog

| # | Statement | Grade | Basis |
|---|---|---|---|
| 1 | one_line: nobody can tell from the records found whether the lanes help or hurt traffic | VERIFIED | check-3 §4 and §6; check-4 "Parks"; register park reasons |
| 2 | TL;DR 1: no study showing whether traffic on an Edmonton street slowed or sped up after it got a bike lane | **PARTIAL, blocking** | Finding B1 |
| 3 | TL;DR 2: no study showing whether bike lanes got people out of cars and eased traffic | VERIFIED | check-3 §4: no "Edmonton infrastructure-attributable substitution linked to a citywide delay estimate"; the freshness audit's Hermitage note adds a cycling count with no car-switching figure, which does not contradict it |
| 4 | TL;DR 3: records found do not say whether lanes would have gone for traffic calming without bike lanes | VERIFIED | check-3 §4 on the Hermitage Road decision report; register reason |
| 5 | TL;DR 4: the City removed a driving lane on part of 102 Avenue to make room for a bike lane | VERIFIED | YF-EV-0163 p. 3 "To fit in the protected bike lane, either the parking lane or one travel lane needed removal … the recommended plan calls for the removal of the westbound travel lane"; YF-EV-0164 "102 Avenue is now one-way for vehicle traffic heading east from 121 Street to 111 Street" |
| 6 | TL;DR 5: the bike route list does not say what road space each lane replaced | CALC | `priorUseFields` is empty |
| 7 | Changelog: restarted 2026-09-24 on three seats from two vendors | VERIFIED | `run.yaml`: Claude Opus 5.5 (anthropic), GPT-6 Luna and GPT-6 Sol (openai), started 2026-09-24T16:38:59Z |
| 8 | Changelog: three of four claims parked before any research ran | VERIFIED | check-4 "PARKS CONFIRMED"; register `parked_at: framing` ×3 |
| 9 | Changelog: two faithfulness checks (GPT-6 Sol, GPT-6 Luna) and a freshness audit (GPT-6 Sol) | VERIFIED | the three report headers |
| 10 | Changelog: the freshness audit found 96 Street and 100 Street in the route table; districts 2 to 3; finding unchanged | VERIFIED | `gate/freshness-audit.md` items 1 and 3 and the disposition |
| 11 | Changelog: a GPT-6 Sol plain-speech read rewrote the standfirst, TL;DR and answer | VERIFIED | `plain-speech/gpt-1.md` header and disposition |

### Story — body

| # | Statement | Grade | Basis |
|---|---|---|---|
| 12 | Twenty-four people argued under one Facebook post about council's bike-lane decision | VERIFIED | register question `accounts.total: 24`; 24 distinct pseudonyms across the six claims under the question; capture README "the Yegscoop post about council's bike-lane decision" |
| 13 | Thirteen said it causes congestion: two lanes become one, cars back up and idle | VERIFIED | `lane-removal-increases-congestion`: 13 accounts, 13 distinct authors; "Now instead of 2 lanes you now have one. Now you have more cars backed up"; "causing idling" |
| 14 | Six said the opposite, every person on a bike is one less car in front of you | VERIFIED | `bike-infra-reduces-congestion`: 6 accounts; "every person on a bike is one less car in front of you!" |
| 15 | Four said the City has taken driving lanes for bike lanes, two naming streets | VERIFIED | `city-removed-traffic-lanes`: 4 authors; two name 102nd Ave and 132nd Ave |
| 16 | One said traffic calming, bike lanes where they fit, to save money | VERIFIED | `lanes-removed-for-traffic-calming`: 1 author; "to save money combining the two" |
| 17 | The published record the site could identify cannot settle the question in either direction | VERIFIED | check-3 §6 and §8; check-4 |
| 18 | Before research the question was checked; for three of four the check found none | VERIFIED | check-3 §4 and §6; check-4 |
| 19 | Claim 1 would need before-and-after travel times or delays in a study built to separate the bike lane | VERIFIED | check-3 §4 "attributed before-and-after peak-period travel time or delay"; register reason |
| 20 | The check, as of 2026-09-23, identified no such study for any Edmonton street | VERIFIED | check-3 found none on 2026-09-16; check-4 confirmed the park on the brief frozen 2026-09-23. See advisory A6 |
| 21 | Claim 2 would need an attributable shift out of cars plus a citywide delay estimate; none identified | VERIFIED | check-3 §4 item 2; register reason |
| 22 | Claim 4 would need a City record of the counterfactual and of combining to save money | VERIFIED | check-3 §4 item 3; register reason |
| 23 | The records identified, including the Hermitage Road decision, describe the design and the traffic-calming program and say neither thing | VERIFIED | check-3 §4 "documents the design and traffic-calming program, but the brief identifies no passage establishing both" |
| 24 | The parks fall on both sides: the first against the lanes, the other two for them | VERIFIED | register `side`: against, for, for |
| 25 | Each reopens if the record it needs is published | VERIFIED | register "It reopens if …" ×3; check-4 |
| 26 | The finding does not measure congestion | VERIFIED | brief; check-4 §8 "None purports to decide whether congestion rose or fell" |
| 27 | Before the project 102 Avenue, 121 to 111 Street, carried traffic both ways (2017 fact sheet) | VERIFIED | YF-EV-0163 p. 2 "Currently 102 Avenue is a two-way road"; PDF title "… May 2017" |
| 28 | Too narrow to keep both travel lanes and parking and add the lane; the recommended plan took out the westbound lane | VERIFIED | YF-EV-0163 p. 3, quoted at row 5 |
| 29 | The November 2017 guide confirms the change: eastbound only, protected lane marked new that year | VERIFIED | YF-EV-0164 p. 1 "November 2017"; p. 2 "now one-way … heading east"; the map legend reads "Protected Bike Lane (Two-Way) New in 2017" and the 102 Avenue line is drawn in that green from 121 Street east |
| 30 | The guide's map labels the neighbourhood Oliver; the district plans place it in Central | VERIFIED | YF-EV-0164 map label "Oliver" beside 102 Ave; YF-EV-0167 Central: "… North Glenora, Oliver, Prince Charles …" |
| 31 | 96 Street, 119 to 124 Avenue, made one-way southbound to accommodate a new protected lane running north | VERIFIED | YF-EV-0170 row "96 Street from 119 Avenue to 124 Avenue": "Protected Contraflow Bike Lane (northbound)"; "Conversion of 96 Street to one-way southbound for vehicular traffic to accommodate the new protected contraflow bike lane." |
| 32 | … built in 2025 and open for use | PARTIAL | Finding A3 |
| 33 | Parking also came off the east side | VERIFIED | YF-EV-0170 "96 Street: permanent removal of parking on the east side from 119 Avenue to 124 Avenue." |
| 34 | Delton is in North Central | VERIFIED | YF-EV-0167 North Central: "… Cromdale, Delton, Eastwood …" |
| 35 | 100 Street, 76 to 83 Avenue, made one-way northbound to accommodate two-way bike lanes | VERIFIED | YF-EV-0170 "Conversion of 100 Street to one-way northbound for vehicular traffic to accommodate the on-street two-way bike lanes and the on-street shared pathway." |
| 36 | … with the stretch from 80 to 83 Avenue open in 2025 | PARTIAL | Finding A3 |
| 37 | Garneau final design removes the southbound lane on 110 Street, 76 to 82 Avenue, and adds a protected lane on the west side | VERIFIED | YF-EV-0165 p. 32 "110 Street: 76 to 82 Avenue — Southbound travel lane removed"; "110 Street: 76 Avenue to Saskatchewan Drive — Protected bike lane on west side" |
| 38 | The inventory records that protected lane as built in 2022 | CALC | `street110`: 6 segments, all 2022 |
| 39 | No as-built drawing is in hand | VERIFIED | no archive in YF-EV-0163–0172 is an as-built; YF-EV-0165 registry "It is a design, not a record of what was built" |
| 40 | Both streets are in Scona | VERIFIED | YF-EV-0167 Scona: "… Garneau … Ritchie, Strathcona …" |
| 41 | The City has given up driving space for bike lanes on at least some streets; a flat denial does not hold | VERIFIED | YF-EV-0163 and YF-EV-0170 each say the change was made to fit or accommodate the bike lane |
| 42 | The documented streets are in 3 of 15 districts | CALC | `verifiedDistricts`, `districtCount` |
| 43 | East of 109 Street, 102 Avenue lost a lane between 102 and 107 Street; the City puts it down to the Valley Line West LRT and does not mention a bike lane | VERIFIED | YF-EV-0168 "102 Avenue between 107 Street and 102 Street has been permanently reduced to 1 lane of eastbound traffic only", under "To accommodate space for the LRT line"; the page has no "bike lane" |
| 44 | 132 Avenue: the 2022 final-design answers say some stretches had four lanes and the design keeps a lane each way at minimum | VERIFIED | YF-EV-0172 p. 6 "in some sections, four lanes of traffic with two lanes in each direction"; "ensuring one lane of traffic in each direction at minimum" |
| 45 | The project page records new bike facilities finished section after section since 2023, starting 101 to 107 Street | VERIFIED | YF-EV-0171 November 2023: "the new active transportation network … between 101 Street and 107 Street"; November 2024: "bike lanes" on 97–101 and 107–113A Street |
| 46 | None of them pins a bike facility to pavement that used to carry cars | VERIFIED | neither archive names a section; see advisory A4 on what YF-EV-0172 does say |
| 47 | The claim was that the City removed lanes all throughout the city | VERIFIED | register variation "they absolutely have removed traffic lanes all throughout the city" |
| 48 | Before research that was held to mean 8 of 15 districts, or 5 on a looser reading | VERIFIED | brief "Supported if A is at least 8 of the 15"; "Alternative threshold … Supported at A of at least 5" |
| 49 | Those bars are the site's judgement | VERIFIED | brief "These are judgement thresholds rather than pre-existing standards" |
| 50 | Three districts, short of either; the true total unknown | CALC | 3 < 5 < 8 |
| 51 | The inventory on 2026-09-23 lists 3,175 segments and says nothing about prior use | CALC | `snapshotFeatureCount`, `priorUseFields` |
| 52 | Counting conversions means going street by street; no published count found | VERIFIED | no seat found one: round1 claude limitation 7, gpt limitation 2, round2 luna limitation 3 |
| 53 | The three reviewers agreed on that | VERIFIED | all six round files: Not established, Moderate |
| 54 | All three found 102 Avenue | VERIFIED | round1 claude interpretation_notes (1), gpt interpretation_notes, gpt-luna supporting_evidence[0] |
| 55 | One also found 110 Street and a block of 83 Avenue in Strathcona | VERIFIED | round1 gpt interpretation_notes; round2 claude places that block "Strathcona, Scona" |
| 56 | The 83 Avenue plan would not load when the page was checked, so it is not counted | VERIFIED | freshness-audit disposition, item 3: "returned the City's 'Page Not Found' page (HTTP 200, 45,790 bytes of HTML) when the editor fetched it on 2026-09-24"; `fetch-report.md` records the same 45,790 bytes |
| 57 | Another counted 100 Street, 96 Street and 132 Avenue from news reports and a community league's notice | VERIFIED | round1 claude: "Verified qualifying corridors (C = 4 at most …)", sources Strathcona Community League, Taproot, Globe and Mail |
| 58 | The route table now backs the first two; 132 Avenue stays out for the reason above | VERIFIED | YF-EV-0170 rows 31 and 35; row 46 |

### Claim `lc-lanes-taken-citywide`

| # | Statement | Grade | Basis |
|---|---|---|---|
| 59 | answer | VERIFIED | rows 41, 42, 51 |
| 60 | KF-1 (102 Avenue fact sheet) | VERIFIED | row 28; YF-EV-0163 p. 3 |
| 61 | KF-2 (November 2017 guide, new in 2017, Oliver) | VERIFIED | rows 29, 30 |
| 62 | KF-3 (96 Street; "built in 2025 and open for use") | PARTIAL | Finding A3; the rest as rows 31, 33, and YF-EV-0170 neighbourhoods "Delton, Alberta Avenue" |
| 63 | KF-4 (100 Street; "lists … as open in 2025") | PARTIAL | Finding A3; the rest as row 35, neighbourhoods "Strathcona, Ritchie" |
| 64 | KF-5 (Garneau design, updated April 2021; inventory 2022) | VERIFIED | YF-EV-0165 p. 1 "Updated April 2021", p. 32; the 2022 is also reproduced by `street110` |
| 65 | KF-6 (Oliver in Central, Strathcona and Garneau in Scona, Delton in North Central; 3 of 15) | PARTIAL | Every fact verifies, but Oliver comes from YF-EV-0164 and Garneau's corridor from YF-EV-0165, and neither is in KF-6's `sources`. Advisory A5 |
| 66 | KF-7 (3,175 segments; fields; construction year blank for some; no prior-use field) | CALC | 2,060 null years |
| 67 | KF-8 (102 Avenue east of 109 Street, LRT) | VERIFIED | row 43 |
| 68 | KF-9 (132 Avenue draft design, early 2022) | VERIFIED | YF-EV-0169 "From January 14 to February 18, 2022"; "one driving lane in each direction and turning lanes near"; "Traffic calming"; "off-street protected one-way bike paths" |
| 69 | KF-10 (final-design answers; project page from 2023; neither pins the section) | VERIFIED | rows 44–46 |
| 70 | Limitation 1 (does not measure congestion) | VERIFIED | row 26 |
| 71 | Limitation 2 (8 or 5 districts; judgements; 3 reached) | VERIFIED | rows 48–50 |
| 72 | Limitation 3 (96 and 100 Street records are one-way conversions, with parking removed) | VERIFIED | YF-EV-0170; 100 Street parking removals "From 83 Avenue to 81 Avenue … west side" and further |
| 73 | Limitation 4 (reviewers' streets; 83 Avenue page-not-found on 2026-09-24; 2017 sheet silent) | VERIFIED | round1 gpt; freshness-audit disposition item 3 |
| 74 | Limitation 5a (the Claude seat counted 100 Street and named 96 Street and 132 Avenue, from a notice and news reports) | VERIFIED | round1 claude |
| 75 | Limitation 5b (this page counts 100 and 96 Street from the route table found by the freshness audit, and leaves 132 Avenue out) | VERIFIED | freshness-audit disposition items 1–3 |
| 76 | Limitation 5c ("96 Street is the one district-adding street that no seat verified in round 1") | **PARTIAL, blocking** | Finding B2 |
| 77 | Limitation 6 (GPT-6 Luna confirmed 102 Avenue but could not place it in a district) | VERIFIED | round1 gpt-luna limitations[1] |
| 78 | Limitation 7 (the City addresses for the fact sheet and the Garneau design no longer load; the Internet Archive copies are used, and the registry says so) | VERIFIED | `fetch-report.md`: the fact sheet URL returned 45,790 bytes, the City's page-not-found size, and the Garneau URL returned HTTP 404; registry entries YF-EV-0163 and YF-EV-0165 |
| 79 | Limitation 8 (reasons reported, as the records give them) | VERIFIED | YF-EV-0163 p. 3; YF-EV-0170 "to accommodate" ×2 |
| 80 | Unknown 1 | VERIFIED | row 52 |
| 81 | Unknown 2 (remaining work 121–127 Street, mid-October 2026) | VERIFIED | YF-EV-0171 September 2026: "Road work is ongoing from 127 Street to 121 Street … Remaining work is expected to be complete mid-October." |
| 82 | Unknown 3 | VERIFIED | row 43 |
| 83 | Missing evidence 1 and 2 | VERIFIED | round1 claude and gpt `missing_evidence` |
| 84 | agreement Unanimous; three verdicts Not established, Moderate | VERIFIED | round1 and round2, all three files |
| 85–88 | Claude Opus 5.5: three key findings and the round-2 change | VERIFIED | round1 claude interpretation_notes and limitations[0], [2]; round2 claude interpretation_notes: 83 Avenue counted, 110 Street "provisional", 100 Street, 132 Avenue and 96 Street under "Leads not counted" |
| 89–92 | GPT-6 Sol: three key findings and the round-2 change | VERIFIED | round1 gpt interpretation_notes, challenging_evidence[0] and [1], limitations[1]; round2 gpt "Central, Scona and North Central: a verified minimum A of 3" |
| 93–96 | GPT-6 Luna: three key findings and the round-2 change | VERIFIED | round1 gpt-luna supporting_evidence[0] and [1], limitations[0] and [1], challenging_evidence[0]; round2 gpt-luna "as-built confirmation is needed" |

### The three parked claims, as the page renders them

| # | Statement | Grade | Basis |
|---|---|---|---|
| 97 | `lane-removal-increases-congestion`, why | VERIFIED | check-3 §4: "The named Downtown evaluation describes traffic counts and monitoring, not an attribution-capable before-and-after travel-time study". The register says "evaluations" in the plural where check-3 examined one; the qualifier "that could attribute a change in travel time" keeps it true |
| 98 | … reopens | VERIFIED | check-4 "The reopening instrument matches report 3" |
| 99 | `bike-infra-reduces-congestion`, why | VERIFIED | check-3 §4 |
| 100 | … reopens | VERIFIED | check-4 |
| 101 | `lanes-removed-for-traffic-calming`, why | VERIFIED | check-3 §4 |
| 102 | … reopens | VERIFIED | check-4 |

Rows 85–96 are twelve statements; the table numbers them in groups.

## Findings

### Blocking

**B1 — TL;DR 1 says more than the framing check found, and the run's own
freshness audit contradicts it.**

> "We found no study showing whether traffic on an Edmonton street slowed or
> sped up after it got a bike lane."

Check 3 found no *attribution-capable* study: "attributed before-and-after
peak-period travel time or delay on a converted Edmonton corridor". The
bullet drops the attribution. `gate/freshness-audit.md` then records a City
evaluation, the "Hermitage Road evaluation, September 2025", that "reports
before-and-after traffic volumes, speeds and some queues" on a street that
got bike lanes. Read plainly, "slowed or sped up" is exactly what a
before-and-after speed survey reports, so a reader who finds that evaluation
has a published City document the bullet says does not exist. The body at
row 20 states the check correctly ("a study built to separate the bike lane
from everything else"). Only the ten-second layer overstates it.

Correction the record supports:

> "We found no study that shows whether a bike lane itself made traffic
> delays on an Edmonton street better or worse."

**B2 — Limitation 5 says no seat verified 96 Street in round 1. The Claude
seat's round-1 file lists it as verified.**

> "96 Street is the one district-adding street that no seat verified in round 1."

`round1/claude.json`, `interpretation_notes`: "Verified qualifying corridors
(C = 4 at most; 2 rest on City-derived documents, 2 mainly on media or
City-derived notices): … (4) 96 St, Delton. Converted to one-way with an
~830 m protected lane. … District not verified; likely North Central." The
story says the same thing two paragraphs from the end ("Another counted 100
Street, 96 Street and 132 Avenue"), so the page contradicts itself. What no
seat did in round 1 was verify 96 Street's district, or rest it on a City
record. The same inaccuracy is in `scripts/calcs/lanes-and-congestion.ts`,
where 96 Street carries `round1Seats: []` while 100 Street, sourced the same
way by the same seat, carries `['Claude Opus 5.5']`. The script prints no
seat list, so the module needs no change for the page to be right, but the
transcription should match.

Correction the round files support:

> "96 Street is the one district-adding street that no seat placed in a
> district in round 1. The Claude seat counted it from a news report and
> called its district likely North Central without checking."

### Advisory

**A3 — "Built in 2025" and "open in 2025" rest on the wrong source, or on
none.** YF-EV-0170, linked for both streets, has a column headed "Year" and
one headed "Status". Both rows read "2025 | Open for use". The same page says
"Construction for the 2025 routes began in 2025 with all 2025 routes planned
to be open for use by the end of 2026". So "Year" is the program year, and
the table does not say either route opened in 2025. YF-EV-0166, which the
claim cites, does carry construction year 2025 and "Constructed" on both
streets. Nothing carries an opening date. Suggested wording: the story
should say "a 2025 route, now open for use" for both streets, and KF-3 and
KF-4 should say "lists … as a 2025 route and open for use". Alternatively,
keep "built in 2025" and cite YF-EV-0166 beside it. This does not change what
the finding rests on, which is the conversion, not its date.

**A4 — The 132 Avenue answers say more than the page reports.** YF-EV-0172
p. 6: "By reconfiguring the lanes on 132 Avenue to fit a more residential
feel, space is freed up to support other road users, including people who
walk, roll and bike". The page's sentence, that no record pins a bike
facility to former driving space, is true, and the freshness audit reached
the same reading. But a reader who opens the FAQ will find the City saying
lane space went partly to biking. One clause in KF-10 would forestall that:
"… says the reconfiguration freed space for walking, rolling and biking, but
not which section's bike facility sits where a driving lane was."

**A5 — KF-6's sources omit two documents it depends on.** Oliver is named by
YF-EV-0164's map, not YF-EV-0163, and the Garneau corridor is YF-EV-0165.
Add both to KF-6's `sources`.

**A6 — The date on the framing check.** Row 20 says "The check, as of
2026-09-23" and links `check-3.md`, which ran on 2026-09-16. The 2026-09-23
date belongs to check 4, the park confirmation on the re-frozen brief. Both
are true of the record, but a reader who follows the link finds a different
date. Either link `check-4.md` beside it or say "as of 2026-09-16, confirmed
on 2026-09-23".

**A7 — The opening counts read as a partition and are not one.** 13 + 6 + 4
+ 1 = 24, the number of people. But two of the four who say lanes were taken
are also among the thirteen, and two people under the question made claims
the page does not show (roads carry goods, and 79 Street). The four groups
hold 22 distinct people. Each sentence is true as written. One clause, such
as "some said more than one of these", would stop a reader inferring 24
separate people. The changelog's "the four claims people made" has the same
shape: the register holds six under this question, and two were set aside at
intake.

**A8 — Uncited sentences.** The reviewer paragraph that closes the story
(rows 53–58) and the 83 Avenue sentence cite nothing on the page. Their
sources are committed run records (`round1/*.json`, `round2/*.json`,
`gate/freshness-audit.md`), and "The details are with the claim below"
points to the review block. This is the cycling-volumes pattern and was not
treated as a defect there. Noted for completeness.

## Counts

| | Story | Claim | Parked | Total |
|---|---|---|---|---|
| Statements checked | 58 | 38 | 6 | **102** |
| VERIFIED | 50 | 33 | 6 | **89** |
| PARTIAL | 3 | 4 | 0 | **7** |
| NOT FOUND | 0 | 0 | 0 | **0** |
| CALC | 5 | 1 | 0 | **6** |
| No cited source (finding) | 0 | 0 | 0 | **0** |

Two of the seven PARTIALs change meaning and block: B1 (TL;DR 1) and B2
(limitation 5c). The other five are A3 (four statements) and A5 (KF-6).

Registry entries read against their bytes: 10 of 10 hash clean. The
calculation module runs and its test passes. `npm run validate`: OK, 8
stories, 18 claims, 172 evidence entries.

## Verdict

**GATE FAIL on source verification: 2 blocking, 6 advisory.**

The two blocking findings are wording, and neither moves the finding. Every
verdict-bearing fact reproduces from the archived bytes: the westbound lane
on 102 Avenue and the reason the City gave for it, the one-way conversions on
96 Street and 100 Street "to accommodate" the bike lanes, the Garneau design
and the 2022 lane in the inventory, the three districts, the 3,175-feature
inventory with no prior-use field, the LRT attribution east of 109 Street,
and the 132 Avenue record that stops short of placing a bike facility in a
former driving lane. A second pass need only re-read TL;DR 1 and limitation
5, plus whichever advisories are taken.
