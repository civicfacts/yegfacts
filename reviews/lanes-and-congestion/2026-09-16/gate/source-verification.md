<!-- Dispositions, 2026-09-24, by Stew (drafting seat Claude Opus 5.5). Both blocking findings and all six advisories adopted; the finding, its basis and the district count of 3 are unchanged.

B1 adopted as the gate wrote it. TL;DR 1 is now "We found no study that shows whether a bike lane itself made traffic delays on an Edmonton street better or worse." The explanation already carried the attribution qualifier; it now also names the City's September 2025 evaluation of Hermitage Road and 40 Street, archived and ingested as YF-EV-0173, as a study that compares volumes and speeds before and after and notes queues but does not measure delay in a way that shows what the bike lane itself did. The sentence says the framing check did not name it.

B2 adopted as the gate wrote it. Limitation 5 now ends "96 Street is the one district-adding street that no seat placed in a district in round 1. The Claude seat counted it from a news report and called its district likely North Central without checking." Its first sentence says the Claude seat counted all three streets, and the Claude review entry says the same. scripts/calcs/lanes-and-congestion.ts now gives 96 Street round1Seats ['Claude Opus 5.5'], with a comment, and describes the field as the seats that listed a corridor among their verified ones.

A3 adopted with the first wording: both streets are "listed as a 2025 route and now open for use" in the story and key facts 3 and 4; no opening or build date is claimed. The inventory's 2025 construction years were not used, because 96 Street carries features of several years and the editor did not filter them by geometry. A4 adopted: key fact 10 says the reconfiguration freed space for walking, rolling and biking, and that neither record places a bike facility in former driving-lane space. A5 adopted: key fact 6 cites YF-EV-0164 and YF-EV-0165. A6 adopted: the story dates check 3 to 2026-09-16 and links check 4, the confirmation of 2026-09-23. A7 adopted: the opening says some people made more than one of these claims and the four groups hold 22 different people, derived in the calculation module from the register's variations and pinned by the test; the changelog now says "the four claims … that the page takes up". A8 adopted: the reviewer paragraph links the round-one answers and the 83 Avenue sentence links the freshness audit.

Confirmation, 2026-09-24. C1 adopted verbatim: the GPT-6 Sol note now reads "No change in verdict. In cross-review it reported a third district, North Central, from the City's route table. The finding is computed from the round-one answers, so round two cannot move it. This page counts North Central from that same table, which the freshness audit brought into the record." C2 adopted with the register move, not the fallback: `79-street-relieves-75-street` now sits under `holyrood-school-lane`, with a dated comment in intake/register.yaml citing register-note.md, since the register has no move field. Its one commenter made no other claim under lanes-and-congestion, so lanes-and-congestion's accounts go from 24 (7 for, 16 against, 1 neither) to 23 (7, 15, 1), and holyrood-school-lane's from 1 (1 against) to 2 (2 against). The story now says the claim "has been moved to the question about the Holyrood school lane, where it will be tested or dropped", and its claim page says it waits on that question. D1 adopted: "both corrected as the audit asked". D2 adopted generically: the two-sided note says "checked" only when every claim under the question is checked, and otherwise "shown here with what became of it". D3 left as is; limitation 3 states the rule. -->

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

## Confirmation, 2026-09-24

Graded tree: worktree commit `65a5b02`, rebased onto `main` after
infrastructure-deficit was published, with the story set to `published`.
Auditor: the same Claude (Opus 5.5) audit session, still separate from the
drafter, the faithfulness seats, the plain-speech seat and the critique
session.

**Result: 2 blocking.** B1 and B2 are both corrected in a form the sources
support. The new sentences add two blocking items. One is a reviewer note
that says the route table was found after the panel ran, when a seat cited
it in round 2. The other is that the published pages disagree about where
the 79 Street claim stands. Neither touches the finding.

**Scope.** Every sentence of the story and claim changed since `997294d`
(`git diff 997294d -- src/content/stories/lanes-and-congestion.mdx
src/content/claims/lc-lanes-taken-citywide.yaml
scripts/calcs/lanes-and-congestion.ts`), and the new `parked` lines. It also
covers three built pages that show the branch's site-wide changes. Sources:
the archived bytes, the framing reports, `intake/register.yaml`,
`register-note.md`, the round files and the run's committed reports.

**Commands.**

- `npx tsx scripts/calcs/lanes-and-congestion.ts` prints
  `builtRecordCorridors` 3, `verifiedCorridors` 4, `verifiedDistricts`
  Central, Scona and North Central, `distinctAcrossFourClaims` 22,
  `inMoreThanOneClaim` 2, `snapshotFeatureCount` 3175.
- `npx vitest run tests/calcs-lanes-and-congestion.test.ts`: 4 passed.
- `npm run validate`: OK, 9 stories, 21 claims, 182 evidence entries.
- `npm run build`: exit 0. Pages were read from `dist/` as flattened text.
- The YF-EV-0173 archive matches its registry `sha256`. It is 24 pages, with
  PDF metadata "Evaluation Report - Towards 40 - 40 Street and Hermitage
  Road", created 2025-09-09. Its text was extracted with `pdftotext`.

### B1 and B2

- **B1: corrected.** TL;DR 1 now reads: "We found no study showing whether a
  bike lane itself made drivers on an Edmonton street wait more or less."
  The second plain-speech read reworded the gate's text but kept the
  attribution ("itself") and the measure (waiting, which is delay). Check 3
  identified no attribution-capable delay study. YF-EV-0173 reports queues
  and speeds but has no delay or travel-time measure: the text has no
  "delay" and no "travel time" anywhere. So the bullet is true against both.
- **B2: corrected.** Limitation 5 now reads: "96 Street is the one
  district-adding street whose district no seat confirmed in round 1.
  Claude Opus 5.5 guessed North Central from a news report."
  `round1/claude.json` says of 96 Street "District not verified; likely
  North Central", and its only source for that street is the Taproot
  report. Round 1 of GPT-6 Sol and GPT-6 Luna does not mention 96 Street.
  The same limitation's "counted 100 Street, 96 Street and 132 Avenue" and
  the matching review entry agree with `round1/claude.json`. The
  calculation module now gives 96 Street `round1Seats: ['Claude Opus 5.5']`.

### Changed sentences

| # | Statement | Grade | Basis |
|---|---|---|---|
| 1 | TL;DR 1 | VERIFIED | above |
| 2 | TL;DR 3: no record saying the City would have removed driving lanes to slow traffic even without bike lanes | VERIFIED | check-3 §4; register reason |
| 3 | TL;DR 4: driving lanes taken for bike lanes on at least three streets, in three of fifteen districts | CALC | `builtRecordCorridors` 3 (102 Avenue, 100 Street, 96 Street; 110 Street excluded as design-only), `verifiedDistricts` 3, `districtCount` 15. See advisory D3 |
| 4 | TL;DR 5: records do not show whether it was done all over Edmonton, or what it did to traffic | VERIFIED | `priorUseFields` empty; limitation 1 |
| 5 | Parked line, `lane-removal-increases-congestion` | VERIFIED | check-3 §4 "attributed before-and-after peak-period travel time or delay"; YF-EV-0173 has no travel-time measure |
| 6 | Parked line, `bike-infra-reduces-congestion` | VERIFIED | check-3 §4; register reason |
| 7 | Parked line, `lanes-removed-for-traffic-calming` | VERIFIED | check-3 §4 on the Hermitage Road decision report; register reason ("without saying the lane would have gone without the bike lane or that the bike lane was added to combine projects or save money") |
| 8 | "Twenty-two people argued …" | CALC | `distinctAcrossFourClaims` 22, by distinct `author_name` across the four claims' variations |
| 9 | "Six said the opposite, in 11 comments" | VERIFIED | `bike-infra-reduces-congestion`: 6 accounts, 11 variations |
| 10 | "Two of them made more than one of these claims." | CALC | `inMoreThanOneClaim` 2 (Granite Hare D. and Prairie Waxwing D., each in two groups) |
| 11 | Check 3 made on 2026-09-16 and confirmed on 2026-09-23 | VERIFIED | `run-record.md`; check-4 "PARKS CONFIRMED"; brief "FROZEN 2026-09-23" |
| 12 | The check identified no published study of that kind for any Edmonton street | VERIFIED | check-3 §4 and §6 |
| 13 | The City published an evaluation of Hermitage Road and 40 Street in September 2025 | VERIFIED | YF-EV-0173 page headers "September 2025"; metadata above |
| 14 | … where the changes included bike lanes | VERIFIED | YF-EV-0173 p. 11 "people using bikes/scooters in the bike lanes along 40 Street"; p. 16 cyclist volumes on Hermitage Road |
| 15 | It compares volumes and speeds before and after, and notes some queues at intersections | VERIFIED | YF-EV-0173 p. 3 "traffic volumes, vehicle speeds"; p. 11 and p. 15 "Speed data was collected before the installation … and after"; "Traffic volumes remained consistent" with the volume chart; pp. 17–18 queue observations at Hermitage Road and 50 Street and at 40 Street, in the peak hours |
| 16 | It does not measure delay in a way that could show what the bike lane itself did | VERIFIED | no delay or travel-time measure anywhere in the extracted text; the queue notes are single-day observations with no before-and-after comparison attributed to a measure |
| 17 | The claims set aside come from both sides; each comes back if its record is published | VERIFIED | register `side`; register "It reopens if …" |
| 18 | Two more claims were made under this question and are not on the page's list of checks | VERIFIED | register: six claims under `lanes-and-congestion`, four taken up |
| 19 | The 79 Street claim "was passed to the question about the Holyrood school lane, where it belongs" | **PARTIAL, blocking** | Finding C2 |
| 20 | The roads-carry-goods claim was turned down at triage as something both sides accept | VERIFIED | register `prior_triage`: outcome no, two readers, "a truism accepted by both sides of this argument" |
| 21 | 96 Street "listed as a 2025 route and now open for use" | VERIFIED | YF-EV-0170 row "2025 / Open for use" |
| 22 | 100 Street, 80 to 83 Avenue, "also a 2025 route, as open for use" | VERIFIED | YF-EV-0170 row "2025 / Open for use" |
| 23 | The City has given up driving space for bike lanes on at least some streets; the streets documented are in 3 of 15 districts | VERIFIED / CALC | YF-EV-0163, YF-EV-0170; `verifiedDistricts` |
| 24 | The reviewers' street disagreement, "as their round-one answers show" | VERIFIED | `round1/*.json` |
| 25 | The 83 Avenue plan would not load when the page was checked (now linked) | VERIFIED | `gate/freshness-audit.md` disposition, item 3 |
| 26–32 | Published changelog note: faithfulness checks; freshness audit and 2 to 3 districts; two plain-speech reads; 102 statements and two blocking items; nothing blocking at release; the critique's seven required changes made; no finding changed | VERIFIED | report headers; this report; `release-check.md`; `critique-1.md` disposition "All seven required changes made"; `synthesis.json` |
| 33 | … "both corrected as the audit wrote them" | PARTIAL | Advisory D1 |
| 34 | Updated changelog note: "the four claims … that the page takes up" | VERIFIED | register; row 18 |
| 35 | KF-3: "lists it as a 2025 route and open for use" | VERIFIED | YF-EV-0170 |
| 36 | KF-4: the same for 100 Street | VERIFIED | YF-EV-0170 |
| 37 | KF-6 sources now include YF-EV-0164 and YF-EV-0165 | VERIFIED | Oliver label in YF-EV-0164; Garneau design in YF-EV-0165 |
| 38 | KF-10: "The answers say the reconfiguration freed space for walking, rolling and biking, but neither record says which finished section's bike facility sits in former driving-lane space." | VERIFIED | YF-EV-0172 p. 6 "space is freed up to support other road users, including people who walk, roll and bike" |
| 39 | Limitation 2, quotation marks only | VERIFIED | unchanged in substance |
| 40–42 | Limitation 5: counted three streets; whose district no seat confirmed; guessed North Central from a news report | VERIFIED | B2 above |
| 43 | Missing evidence 1 and 2, holder wording | VERIFIED | round `missing_evidence` |
| 44 | Claude review, key finding 2: "Counted 100 Street in Scona, 96 Street in Delton and 132 Avenue, all three from a community league's notice and news reports …" | VERIFIED | `round1/claude.json` interpretation_notes and limitations[0] |
| 45 | GPT-6 Sol review, after cross-review: "Round-2 answers do not change a seat's verdict." | PARTIAL | Finding C1 |
| 46 | … "This page counts North Central from the City's route table, found after the panel ran." | **NOT FOUND, blocking** | Finding C1 |

Counts for the changed sentences: 46 checked. VERIFIED 39, CALC 3, PARTIAL
3, NOT FOUND 1, no cited source 0. Row 23 is counted as VERIFIED, and rows
26–32 as seven statements.

### Blocking

**C1 — The GPT-6 Sol reviewer note misstates what that seat found, and how
round 2 works.**

> "No change in verdict. In cross-review it reported a third district,
> North Central. Round-2 answers do not change a seat's verdict. This page
> counts North Central from the City's route table, found after the panel
> ran."

`round2/gpt.json` has a `supporting_evidence` entry whose `source_url` is
the City's Active Transportation Network Expansion page, which is
YF-EV-0170, the route table. It reads: "The City's route table lists 96
Street from 119 to 124 Avenue as open for use in 2025 and says vehicle
traffic was converted to one-way southbound to accommodate a protected
northbound contraflow bike lane". That seat's North Central district rests
on the same table. So the table was found during the panel, in round 2, by
the seat the note is about. The freshness audit later brought it into the
page's record.

Separately, `docs/DESIGN.md` §4 says the cross-review round "cannot move a
canonical finding". A seat's round-2 position is recorded, and can differ
from its round-1 verdict.

Correction the round files and the design support:

> "No change in verdict. In cross-review it reported a third district,
> North Central, from the City's route table. The finding is computed from
> the round-one answers, so round two cannot move it. This page counts
> North Central from that same table, which the freshness audit brought
> into the record."

**C2 — The published pages disagree about where the 79 Street claim is.**

The story says the claim "was passed to the question about the [Holyrood
school lane](/questions/holyrood-school-lane), where it belongs." The
register still files `79-street-relieves-75-street` under
`lanes-and-congestion`. The built claim page
`/claims/79-street-relieves-75-street` says: "This claim has not been
checked. It is waiting on the question below …", and the question below is
*Do Edmonton's bike lanes ease traffic congestion or make it worse?*. That
question is now published and says the claim went elsewhere. The question
page also lists the claim under "Claims with no finding" with no reason
shown.

`register-note.md` records the decision ("The claim goes to the 79 Street
question, to be tested there or dropped there for want of a record"). It
also records that the register move was deferred to that question's
brief. So the story reports a decision whose register change has not been
made, and the claim page, whose wording this branch changed, still gives
the pre-publication status.

Correction: make the register move now, setting the claim's `question`
to `holyrood-school-lane`, which the register note names as the
destination. The story sentence and the claim page then both become true.
If the move stays deferred, the story must say "is to be tested with the
question about the Holyrood school lane, and the register files it here
until that question's brief is drafted". In that case the claim page must
also stop saying the claim is waiting on this question.

### Site-wide changes, spot-checked in the built site

1. **`/questions/lanes-and-congestion`.**
   - "Main claim" does not appear. The strip instead prints "What the
     record could check. It does not answer the claims set aside above."
     That is true, since `lc-lanes-taken-citywide` does not answer any of
     the three parks.
   - The dated label reads "What we expected when it was registered,
     2026-09-03" above the question's reason. `git log -G` on that reason
     returns only `8cbe246`, dated 2026-09-03, so the sentence is the one
     written at registration and has not been edited since.
   - The follow-on sentence, "The check before any research found no
     record of that kind for the claims set aside above", matches check 3.
   - The parked block's three lines render from the story's `parked` map
     (rows 5–7). The comment counts are 13, 11 and 2, the variation counts.
   - The roads claim shows "Turned down at triage, so it will not be
     checked", with the register's `prior_triage` reason.
   - One sentence overstates; see D2.
2. **`/claims/city-removed-traffic-lanes`**, a register claim answered by a
   published claim. It shows "Checked as" with the published question *Has
   the City taken driving lanes for bike lanes all over Edmonton?*, the
   Not established badge and the claim's answer. It no longer says "No
   finding yet". That is true: `lc-lanes-taken-citywide` lists
   `city-removed-traffic-lanes` in `register_claims`.
3. **`/claims/cyclists-pay-property-taxes`**, one of the 11 claims with
   `prior_triage.outcome: no`. It shows "This claim has not been checked
   and will not be. Two triage readers turned it down on its own before
   the question went ahead", followed by the register's reason.
   - All 11 such claims carry exactly two `readers`.
   - None has its own `triage`, and none is named in any published claim's
     `register_claims`, so no page shows both states.
   - The label is true for all 11.

The 79 Street claim page, read while tracing C2, shows the dated label
correctly ("What we expected when the question was registered,
2026-09-03"). Its status sentence is the C2 defect.

### Advisory

- **D1.** The published changelog says both blocking items were "corrected
  as the audit wrote them". Limitation 5 and TL;DR 1 now use other wording.
  The second plain-speech read reworded both, and the Stew disposition
  above says "adopted as the gate wrote it" of the earlier text. The
  meaning holds. Suggested: "both corrected as the audit asked".
- **D2.** On the question page: "every claim they made about it is checked
  or parked with its reason, whichever way it points." On this question,
  one claim was turned down at triage (its reason is shown) and one was
  sent to another question (see C2). The sentence is a statement about
  even-handedness, and its pre-branch form ("is checked") was already loose
  on every two-sided question. Suggested for pages with parks: "every
  claim they made about it is shown here with what became of it, whichever
  way it points."
- **D3.** TL;DR 4 counts 96 Street and 100 Street as streets where driving
  lanes were taken. The City's record is a one-way conversion "to
  accommodate" the bike lane. That counts under the brief's rule, as a
  through movement removed "in space that included it", and limitation 3
  says so beside the finding. In round 2 the Claude seat flagged that the
  96 Street contraflow lane may sit in former parking space. The bullet is
  true under the rule the page states. It is noted here because it is the
  ten-second layer.

GATE: FAIL — C1 (GPT-6 Sol reviewer note: "found after the panel ran" is contradicted by round2/gpt.json, and "Round-2 answers do not change a seat's verdict" misstates DESIGN §4); C2 (the story says the 79 Street claim "was passed to" the Holyrood school lane question while the register and its built claim page say it is waiting on this, now published, question)

## Second confirmation, 2026-09-24

Graded tree: worktree commit `fd7dfe9`. Auditor: the same Claude (Opus 5.5)
audit session.

**Result: pass.** C1 and C2 are corrected as the sources support. So are D1
and D2. The ten statements changed since `cd36248` all verify, and the three
built pages state nothing false.

**Commands.**

- `git diff cd36248 -- src/ scripts/calcs/ intake/register.yaml`: four files.
  They are the register, the claim, the story and
  `src/pages/questions/[id].astro`. Nothing under `scripts/calcs/` changed.
- `npx tsx scripts/calcs/lanes-and-congestion.ts` prints
  `distinctAcrossFourClaims` 22, `inMoreThanOneClaim` 2,
  `builtRecordCorridors` 3, and `people.question` 23. The page prints no
  question total.
- `npx vitest run tests/calcs-lanes-and-congestion.test.ts`: 4 passed.
- `npm run validate`: OK, 9 stories, 21 claims, 182 evidence entries.
- `npm run build`: exit 0. The pages below were read from the fresh `dist/`
  as flattened text.

### C1 and C2

- **C1: corrected.** GPT-6 Sol's `changed_between_rounds` now reads: "No
  change in verdict. In cross-review it reported a third district, North
  Central, from the City's route table. The finding is computed from the
  round-one answers, so round two cannot move it. This page counts North
  Central from that same table, which the freshness audit brought into the
  record."
  - `round2/gpt.json` cites the route table: its `supporting_evidence` entry
    for 96 Street has the Active Transportation Network Expansion URL.
  - `docs/DESIGN.md` §4 and §5 say round two "cannot move a canonical
    finding", and that synthesis reads the round-1 verdicts.
  - `gate/freshness-audit.md` item 1 brought the table in as YF-EV-0170.
- **C2: corrected.** In `intake/register.yaml`, `79-street-relieves-75-street`
  now has `question: holyrood-school-lane`. That is the destination
  `register-note.md` names ("the register already holds a question about
  the planned route on 79 Street outside the Holyrood school … The claim
  goes to the 79 Street question").
  - The claim's one wording is by Hardy Vole C. Across the register,
    Hardy Vole C. appears only in that claim and in two claims under other
    questions (`consultation-and-opposition` and `transit-alternative`). So
    the commenter made no other claim under `lanes-and-congestion`.
  - Recounted from the variations, `lanes-and-congestion` now holds 23
    distinct commenters: 7 for, 15 against, 1 neither. Granite Hare D. is
    counted against, and the one neither is Bright Elk G. That matches the
    new `accounts` of 23 (7/15/1).
  - `holyrood-school-lane` now holds Hardy Vole C. and Icy Grebe A., both
    against, which matches 2 (0/2/0).
  - The story's figures do not depend on the question total. "Twenty-two",
    13, 6, 4, 1 and "two of them" are all counted over the four claims the
    page takes up, and they are unchanged.

### Changed sentences

| # | Statement | Grade | Basis |
|---|---|---|---|
| 1–3 | GPT-6 Sol note: North Central from the route table; round two cannot move the finding; the freshness audit brought the table into the record | VERIFIED | C1 above |
| 4 | Published changelog: "both corrected as the audit asked" | VERIFIED | D1 taken; the first and second confirmations |
| 5 | "Two more claims came up in the same argument and are not checked here." | VERIFIED | register: `roads-carry-goods-and-services` under this question, and `79-street-relieves-75-street` from the same captured source; neither has a finding |
| 6 | The 79 Street claim "has been moved to the question about the Holyrood school lane, where it will be tested or dropped" | VERIFIED | register `question: holyrood-school-lane`; `register-note.md` "to be tested there or dropped there for want of a record" |
| 7 | Register `lanes-and-congestion` accounts 23 (7/15/1) | VERIFIED | recount above |
| 8 | Register `holyrood-school-lane` accounts 2 (0/2/0) | VERIFIED | recount above |
| 9 | Register comment: "Its one commenter made no other claim under lanes-and-congestion" | VERIFIED | Hardy Vole C. search above |
| 10 | Question pages: the two-sided note says "checked" only when no claim is parked or unchecked, and "shown here with what became of it" otherwise | VERIFIED | rendered pages below |

Counts: 10 checked. VERIFIED 10, CALC 0, PARTIAL 0, NOT FOUND 0, no cited
source 0.

### Built pages

1. **`/claims/79-street-relieves-75-street`** says "It is waiting on the
   question below". The question below is now *What was planned for the
   bike lane outside the Holyrood school, and what stopped it?*, which is
   "Going ahead", "Registered" and "Not published yet". The dated label
   shows that question's own reason, "What we expected when the question
   was registered, 2026-09-03". Every statement on the page is now true.
2. **`/questions/holyrood-school-lane`** shows "Said in 3 comments · 3
   claims" and lists the 79 Street claim with Hardy Vole C.'s wording beside
   the two claims that were already there. That matches the register: 3
   claims, 3 variations, 2 commenters. The page's other two claims are
   unchanged from `main`, and this branch adds nothing else to it.
3. **`/questions/winter-cycling`** prints: "People arguing in both
   directions raised this question, and every claim they made about it is
   shown here with what became of it, whichever way it points." The page
   has one claim under "Claims with no finding", so the new wording is the
   correct branch and it is true. There is no stray space before the comma
   in the HTML. The dated label "What we expected when it was registered,
   2026-09-03" sits above a reason that `git log -G` shows unchanged since
   `8cbe246` (2026-09-03).

The lanes-and-congestion question page, reread in the same build, now
lists only the roads claim under "Claims with no finding". It shows "Said
in 33 comments" and the same two-sided wording.

GATE: PASS
