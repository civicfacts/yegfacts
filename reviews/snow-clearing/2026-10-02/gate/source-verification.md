<!-- Source verification (gate stage 7, part 1), a separate Claude Opus 5.5 audit session, on 91a4e44. Dispositions by Stew, 2026-10-02.

Disposition: 0 blocking, 4 advisory, all 4 adopted. No finding changed.

- A1, adopted: the opening now maps the claims to the five people: three said the City plows its bike lanes, one of them before the streets; another made both the Whyte Avenue and the windrow claims; a fifth made the proposals and calcium chloride claims.
- A2, adopted: the paraphrase introduced as "the report's words" is replaced by two short quotations from CO03513: "no additional budget is required" and "for consideration during the 2027-2030 Budget Deliberations".
- A3, adopted: the story says the August 22 date is the timestamp in the Internet Archive address, recorded in the run's fetch report, and that the page carries no date of its own; YF-EV-0288's archive note says the same on its evidence page.
- A4, adopted: the active-transportation pointer now reads "put proposals for more snow money on council's published agendas", naming the rule. -->

# Source verification — snow-clearing

Result: 0 blocking, 4 advisory

Gate stage 7, part 1. Run date 2026-10-02 (story run `2026-10-02`),
methodology v1.43. The brief at `reviews/snow-clearing/2026-10-02/brief.md`
has sha256 `5dfd40e4…`, which matches the twice-revised brief. Auditor: a
Claude (Opus 5.5) audit session, separate from the drafting session, both
faithfulness seats, the plain-speech read and the freshness audit. Graded
tree: worktree `draft-snow` at `91a4e44`.

**Verdict: pass.** Every statement in scope is supported by the archived
bytes it cites, or by the run's own records.

- **Package costs.** Each figure was checked against the 0304 sections and
  the CO03513 report and attachments: $2.11M, $1.60M, $1.64M, $4.59M,
  $7.83M, $9.938M and 35.2 FTEs; $100,000; $23.6M and $11.5M; 24
  enhancements; calcium chloride at $2.5M and $4.4M; $67M a year.
- **Count.** The three proposals, the towing package's contested place, and
  each reviewer's count history were checked against `synthesis.json` and
  round 2.
- **Dates and agendas.** The November 24, 2025 addition, the November 25
  hearing and postponement, and the August 22 capture listing were checked.
  So were the August 31 motions and the September 8 vote of 12 to 0.
- **Proposed versus funded.** These are kept apart. Council approved the
  revised Attachment 1 changes 11 to 2 at item 5.2.3. None of the 41
  operating amendments names either Fall 2025 package. Report FCS03158 says
  unfunded packages "would require an approved Council amendment".
- **Brief rules.**
  - Every reader-facing "already put" names the agenda-placement rule in the
    same sentence.
  - The two alternatives that change the rung sit beside the verdict in the
    claim answer: the stricter cost reading and the exactly-two count.
  - The timing alternative is set out with the count it gives.
- **Parked claims.** None is answered by implication.

**Scope.** Every factual statement in `src/content/stories/snow-clearing.mdx`:
- the `one_line`, the five TL;DR bullets, the four `parked` lines and the
  three changelog notes;
- every body sentence carrying a number, date, vote, name, document or a
  report of what a check or reviewer found.

Also in scope:
- `src/content/claims/sc-two-costed-snow-proposals.yaml`: the answer, the 12
  key facts, the 9 limitations, the unknowns, the missing evidence and each
  reviewer entry;
- the register entries for `snow-clearing` and its five claims, with the
  four park reasons as rendered;
- the sentences added to `winter-cycling.mdx` and `active-transportation.mdx`;
- `scripts/calcs/snow-clearing.ts` and its test.

**Grading bases.**
- **Carried sources.** Graded against the carried text the seats read, in
  `evidence/private/carried/snow-clearing/2026-10-02/`. Every one was
  regenerated read-only and matches the manifest's `text_sha256`:
  - 12 meeting pages through `minutes-items.ts`, rule v6, withholding on;
  - 9 PDFs through `pdftotext -layout -enc UTF-8`;
  - the 0304 sections through `pdf-sections.ts` `carrySections`, rule v2:
    `d24832cd…`, 144 pages, sections 9, 13, 20 and 21 of 36.
- **Other sources.** YF-EV-0281 (pdftotext), 0241 and 0288 were graded
  against their archives, tag-flattened.
- **Commenters.** Graded against `intake/register.yaml` and the capture.
- **Reviewers.** Graded against `synthesis.json`, `round1/` and `round2/`.

No web access was used.

## Integrity check

All 18 archives cited by the page and the claim match their registry
`archive.sha256`, in this worktree and in the main checkout: YF-EV-0241,
0281, 0287, 0288, 0289, 0290, 0291, 0293, 0294, 0295, 0296, 0298, 0299,
0300, 0302, 0303, 0304 and 0308.

The capture date of YF-EV-0288 (2026-08-22 16:26 UTC) is not in the archived
`id_` bytes. It rests on the registry and on the capture URL recorded in
`fetch-report.md` (`web/20260822162600/`). See A3.

## The calculation

`npx tsx scripts/calcs/snow-clearing.ts` prints:

| Reading | Count | Rung |
|---|---|---|
| Primary | 3 | Supported |
| Without the parking-ban package | 2 | Supported |
| Considered by a body | 2 | Supported |
| Considered, without the parking-ban package | 1 | Partially supported |
| Council only | 2 | Supported |
| Council only, without the parking-ban package | 1 | Partially supported |
| Exactly two | 3 | Partially supported |
| Strict cost | 0 | Contradicted |

The active-pathway package's described components sum to 7.83.

`npx vitest run tests/calcs-snow-clearing.test.ts` passes 7 tests.

The transcription was checked against the bytes:
- the DocumentIds 278877 and 304812;
- the agenda items (7.2 of 2025-11-24, 7.1 of 2026-08-31);
- the agenda and dealt-with dates (2025-11-24 and 2025-11-25; 2026-08-22 and
  2026-08-31);
- the stated costs, as above;
- the vote, 11 to 2.

All match. The rungs follow the brief's ladder: Supported at C ≥ 2,
Partially at C = 1, Contradicted at C = 0, and under exactly-two, Partially
at C ≠ 2.

## Statement by statement

### Story — standfirst, TL;DR, parked lines, changelog

| # | Statement | Grade | Basis |
|---|---|---|---|
| 1 | one_line: nobody can tell from the City records we found whether Edmonton plows bike lanes before streets | VERIFIED | Bounded to "records we found". YF-EV-0281 sets deadlines, not order; the park reason |
| 2 | TL;DR 1: Council's recorded budget amendments in December 2025 named neither snow package on its fall agenda | VERIFIED | Carried YF-EV-0302 items 5.2.1 and 5.2.2: none of the 41 operating amendments names "Active Pathway", "Parking Ban", "snow" or "tow" |
| 3 | TL;DR 2: a committee agenda published before the comment listed administration's package for snow and other City work | VERIFIED | YF-EV-0288 lists CO03513 and Attachment 9 (A3); YF-EV-0295 covers snow and non-snow work |
| 4 | TL;DR 3: counting only proposals dealt with by a meeting by August 27, the claim is only partly right unless parking-ban towing counts | VERIFIED / CALC | `considered` 2, and 1 without towing |
| 5 | TL;DR 4: if proposals had to show the increase over the approved snow budget, the claim would be wrong | VERIFIED / CALC | `strictCost` 0, Contradicted; round 2, all seats |
| 6 | TL;DR 5: if it meant exactly two, it is only partly right; we found three | VERIFIED / CALC | `exactlyTwo` |
| 7 | Parked line: bike lanes first | VERIFIED | YF-EV-0281 §1.1 and §1.2 deadlines; register reason |
| 8 | Parked line: Whyte Avenue | VERIFIED | Register reason; YF-EV-0281 §2.1.4.2 is a factor, not a measure |
| 9 | Parked line: windrows | VERIFIED | Register reason |
| 10 | Parked line: calcium chloride, a prediction the site does not grade | VERIFIED | Register reason, ground `no-instrument` |
| 11 | The three changelog notes | VERIFIED | Dispositions in `faithfulness/`, `gate/freshness-audit.md` and `plain-speech/gpt-1.md`; synthesis Supported, Unanimous |

### Story — body

| # | Statement | Grade | Basis |
|---|---|---|---|
| 12 | Five people under one post, in the days after August 26, made five claims | VERIFIED | Register `accounts.total: 5`. The five claims are listed. The comments are dated August 27 to 30 |
| 13 | "One said bike lanes get plowed before the streets do. One said Whyte … One said the plows windrow … And one … said … two snow removal proposals … calcium chloride" | VERIFIED, see A1 | Frosty Raven J. (#280); Sunny Bluejay W. (#405) for both Whyte and the windrows; Windy Heron J. (#510). Each wording matches the register |
| 14 | The records answer only the proposals claim; the other four were set aside without a verdict | VERIFIED | Register parks |
| 15 | Procedure approved in October 2025 | VERIFIED | YF-EV-0281: "Date of Approval October 15, 2025" |
| 16 | Winter priority bike network: protected lanes and some painted lanes and shared paths; bare pavement within 24 hours; the same for some freeways, main roads and business districts | VERIFIED | §1.2.1: "network of protected bike lanes, designated painted bike lanes and designated shared pathways … within 24 hours"; §1.1.1 Priority 1 roads within 24 hours |
| 17 | Residential streets to 5 cm within ten days of a blading cycle; painted lanes get the adjacent road's service | VERIFIED | §1.1.4 "5 cm snowpack … within 240 hours (10 days) once a residential blading cycle is initiated"; §2.4.4 |
| 18 | Deadlines, not order; we identified no record of order; this page draws no conclusion; the annual snow report is the place to look, not read | VERIFIED | YF-EV-0287 lists Attachment 5, the Annual Report 2025-2026. It was not archived |
| 19 | Lanes narrowed below 3.2 m by windrowed snow are one of several factors in business-district removal | VERIFIED | §2.1.4 "based on several factors including, but not limited to"; §2.1.4.2 |
| 20 | No City record of winter widths, removal dates or seasonal collisions on 82 Avenue | VERIFIED | Register reason and framing checks. Bounded to "we found" |
| 21 | The project page lists parking changes route by route | VERIFIED | YF-EV-0241: a "Parking Change(s)" column for each route |
| 22 | March 2026: Council asked for options "including but not limited to calcium chloride (CaCl) application to roadways" | VERIFIED | Carried YF-EV-0291 item 10.3, carried 11 to 0 |
| 23 | The August 31 agenda, published by August 22, listed "Summary of Calcium Chloride Usage" | VERIFIED | YF-EV-0288 attachment 12, "Attachment 11 - CO03513 - Summary of Calcium Chloride Usage.pdf" (A3) |
| 24 | Calcium chloride upgrade: equipment and staffing for major roads, $2.5M a year and $4.4M one-time | VERIFIED | YF-EV-0294 pp. 6 and 7: "implement the use of Calcium Chloride on major roadways"; the table; YF-EV-0296 item 5 "Equipment and staffing for each roadway yard" |
| 25 | None of the four committee motions on August 31 names calcium chloride; Council approved the policy on September 8 without debate | VERIFIED | Carried YF-EV-0289 item 7.1 (Rutherford, Knack withdrawn, Morgan, Wright); YF-EV-0290 item 2.2 "Vote on Reports not Selected for Debate", 7.9, 12 to 0 |
| 26 | Calcium chloride is used to pre-wet the road mix, and as an anti-icer or de-icer only on Priority 1 pathways and amenities, not on bridges | VERIFIED | §2.6.5 |
| 27 | Three of the parks are from the against side, the fourth from neither | VERIFIED | Register `side` |
| 28 | The comment's words; "put to council" read as listed on a published agenda, fixed before the research | VERIFIED | Register wording; brief "Already put … placed before a body on a published agenda". The rule is named in the same sentence |
| 29 | Definitions of proposal, put to council and needs more spending | VERIFIED | Brief claim section |
| 30 | Three identified by August 27; stricter readings change the answer | VERIFIED / CALC | |
| 31 | Active-pathway package on Council's agenda of November 24, 2025, item 7.2; unfunded; the figures; the table's $9.938M not reconciled | VERIFIED | Carried YF-EV-0299 item 7.2, Attachment 2; YF-EV-0304 section 20, "Unfunded", with the quoted description and the "New Budget $9,938" table |
| 32 | August 2025 committee motion asked for an unfunded package for one costed option; administration updated the amounts | VERIFIED | Carried YF-EV-0298 item 7.3 (Rutherford, carried 4 to 0, "Option 3"); YF-EV-0304: "amounts … have been updated" |
| 33 | Towing package: $100,000 a year for contracted towing during parking bans so cars can be moved while plows blade; "improves service levels for snow and ice control"; ongoing after the June 2025 one-time contingency funding | VERIFIED | YF-EV-0304 sections 9 and 13 |
| 34 | Well Maintained City: the agenda for August 31 listed CO03513 and its attachments; the Internet Archive copy of August 22 lists the same report and attachments | VERIFIED | Carried YF-EV-0287 item 7.1; YF-EV-0288 |
| 35 | We read the archive copy ourselves; the reviewers could not open it and relied on our description | VERIFIED | Manifest exclusion: the Claude seat's WebFetch failed. GPT-6 Sol round 1: "I could not independently retrieve that capture". GPT-6 Luna round 1: "The package carries … not the archived August 22 file contents" |
| 36 | About $23.6M a year plus $11.5M one-time; eight-day residential window; a crew for priority bike lanes and pathways | VERIFIED | YF-EV-0294 executive summary and p. 5; YF-EV-0295: "eight-day service window"; the Priority 1 Cycle Crew for "primary commuter bike lanes and active pathways" |
| 37 | Also includes turf, sweeping, graffiti and structure inspections; no snow share given; "for information ahead of formal presentation during 2027-2030 budget deliberations"; 24 optional extras each costed | VERIFIED | YF-EV-0295 pp. 1 and 2; YF-EV-0296 items 1 to 24 |
| 38 | Reviewers counted two, three and four at first; the four had the extras as a proposal and the two had missed towing; all counted three after cross-review | VERIFIED | Claude round 1 P=4, with (4) Attachment 10; Sol round 1 P=3; Luna round 1 P=2 without towing; round 2 all P=3 |
| 39 | Towing contested; it sits with Community Standards; without it two remain; the total could be higher | VERIFIED | YF-EV-0304 section 13, "Branch - Community Standards"; manifest exclusion of the portal calendar |
| 40 | "When the answer changes": agenda rule 3; dealt-with rule drops the Well Maintained City package (dealt with August 31); Council dealt with the fall items on November 25, 2025; two count only with towing; Council-only gives the same two | VERIFIED / CALC | YF-EV-0300 item 7.1: presentation, private session November 25, postponed 12 to 0; YF-EV-0289 |
| 41 | No counted proposal states the approved snow budget; strict reading counts none; "The total budget for SNIC is $67 million/year" in an August 2025 report | VERIFIED | Round 2, all seats; YF-EV-0308 line "The total budget for SNIC is $67 million/year" |
| 42 | "2 different proposals" read as at least two; three identified | VERIFIED | Brief |
| 43 | FCS03158: unfunded packages "would require an approved Council amendment to add to the budget" | VERIFIED | YF-EV-0303 |
| 44 | Budget meeting December 1 to 4, 2025 approved the fall 2026 operating changes, 11 to 2; no amendment names either package | VERIFIED | YF-EV-0302 header and clerk's notes Dec 1 to 4; item 5.2.3 "Carried (11 to 2)", Principe and Elliott opposed |
| 45 | August 31: policy recommended 5 to 0 on Rutherford's motion; Knack moved the package to September 8 and withdrew; Morgan and Wright packages carried 5 to 0 each | VERIFIED | Carried YF-EV-0289 item 7.1 |
| 46 | September 8: policy approved 12 to 0 without debate; "In the report's words" no additional budget is needed and the package comes in the 2027-2030 deliberations | VERIFIED, see A2 | YF-EV-0290; YF-EV-0294 Budget/Financial Implications |
| 47 | How the reviewers read: portal refuses; items under a published rule; 144-page attachment as 4 of 36 sections; same copies; the archive copy not given and unlabelled | VERIFIED | Manifest; regenerated section index |
| 48 | Reviewers could not search every meeting from November 2025 to August 2026 | VERIFIED | Manifest exclusion of the portal calendar |
| 49 | Closing pointers to winter-cycling and active-transportation | VERIFIED | Both build |

### Claim `sc-two-costed-snow-proposals`

| # | Statement | Grade | Basis |
|---|---|---|---|
| 50 | Question names the rule: "already put … on a published council or committee agenda" | VERIFIED | Brief rule |
| 51 | Answer: by August 27, published agendas listed at least two snow proposals seeking money; none says the snow budget; three found, not two | VERIFIED | The definition-sensitive alternatives sit beside the verdict |
| 52 | KF1 to KF4: FCS03158 Attachment 2, item 7.2; the quoted text; the SNIC gloss; $9,938,000 and 35.2; the $7.83M sum and the $9.94M reviewer calculation; the towing package and its June 2025 basis; the August 11, 2025 Rutherford motion | VERIFIED | YF-EV-0304 sections 9, 13 and 20; YF-EV-0299; YF-EV-0298; Claude round 2 reconciliation |
| 53 | KF5: 7.2 was an addition adopted at the start, with no publication day fixed; presentation November 25, private, postponed 12 to 0 to December 1 | VERIFIED | YF-EV-0300 item 1.4 "Additions … 7.2"; item 7.1 |
| 54 | KF6: CO03513 and Attachment 9 quotes; the eight-day window; the crew; non-winter parts; no snow-only cost | VERIFIED | YF-EV-0294, YF-EV-0295 |
| 55 | KF7: the live page lists the report, thirteen attachments and a presentation; the August 22 capture has the same titles with different numbers; Agenda Review had the draft agendas on August 18 | VERIFIED | YF-EV-0287 (15 files); YF-EV-0288 (DocumentIds 303379 to 303392, no presentation); carried YF-EV-0293 item 2.1.1 "August 31, 2026, Community and Public Services Committee" |
| 56 | KF8: 24 enhancements, dependent on the package; calcium chloride at $2.5M and $4.4M | VERIFIED | |
| 57 | KF9 to KF11: December vote; FCS03158 quote; no amendment names either package; August 31 motions; September 8, 12 to 0 among reports not selected for debate | VERIFIED | |
| 58 | KF12: no counted proposal states the approved budget; CO03079 $67M | VERIFIED | |
| 59 | L1 to L9 | VERIFIED | L1 matches `considered`; L2 matches `strictCost`; L3 matches `exactlyTwo`; L4 matches `councilOnly`; L7 matches the manifest exclusion; L9 matches the different DocumentIds and that the files at those numbers were not read |
| 60 | Unknowns and missing evidence | VERIFIED | |
| 61 | Claude: Supported, High; key findings; the count went from four to three; corrected its side-by-side reading of the figures | VERIFIED | Round 1 P=4 and High; round 2 P=3 and High; round 2 notes ("In round 1 I put $9,938K and $2.11M side by side … must not be added together") |
| 62 | GPT-6 Sol: Supported, High, then Moderate; count unchanged at three | VERIFIED | |
| 63 | GPT-6 Luna: Supported, Moderate; two became three; strict cost went from Partially supported to Contradicted | VERIFIED | Round 1 "Stricter … P=2, C=1 … Partially supported"; round 2 "P=3, C=0 … Contradicted" |

### Register and links

| # | Statement | Grade | Basis |
|---|---|---|---|
| 64 | `snow-clearing` question note, with "Drafted … pending review" | VERIFIED | Run record |
| 65 | Four park reasons, rendered on their claim pages | VERIFIED | Consistent with YF-EV-0281, 0241, 0287, 0288 and 0289. The calcium reason reports the agenda listing and that the minutes record the item dealt with, without a verdict |
| 66 | winter-cycling: "Whether the City plows bike lanes before streets is a separate question, and its page explains why no record we found can answer it." | VERIFIED | Link builds |
| 67 | active-transportation: "Whether administration has since asked council for more snow money, and what council did with those requests, is on its own page." | VERIFIED, see A4 | Link builds |

**Parked claims answered by implication?**
- **Bike lanes first:** no. The page gives both the bike-network deadline
  and the equal 24-hour Priority 1 road deadline, and says it draws no
  conclusion.
- **Calcium chloride:** no. The record is reported as context, and the
  prediction ("soon") is not graded against the August 31 and September 8
  outcomes.
- **Whyte Avenue and windrows:** no. Each paragraph says why no record can
  test it, either way.

## Findings

### Blocking

None.

### Advisory

- **A1 — The opening paragraph's "One said …" sentences do not map to the
  five people.** Each sentence is true to its wording. But "One said …
  Whyte" and "One said the plows windrow" are the same person (Sunny Bluejay
  W.). The register counts three people under the first claim (Frosty Raven
  J., Silver Raven G., Snowy Heron C.), of whom only one said "before". A
  reader matching "five people … five claims" to the list will miscount.
  Suggested wording: "Three said the City plows its bike lanes, one of them
  that it does so before the streets. Another said Whyte Avenue … and that
  the plows windrow … And a fifth, answering …".
- **A2 — "In the report's words" introduces a paraphrase.** The report reads
  "In order to approve the proposed Council Policy C409L, no additional
  budget is required. Administration will bring forward the 'Well Maintained
  City' service package to Council for consideration during the 2027-2030
  Budget Deliberations." Either quote it, or drop "In the report's words".
- **A3 — The August 22 date rests on the capture URL, not the bytes.** The
  archived `id_` bytes of YF-EV-0288 carry no timestamp. The date comes
  from the registry and the capture URL in `fetch-report.md`. Several
  statements depend on it: TL;DR 2, the "published by August 22" sentences
  and KF7. This is the same position the lanes-and-congestion gate recorded
  for its Internet Archive sources. A note on the evidence page saying where
  the date comes from would let a reader check it.
- **A4 — The active-transportation pointer uses "asked council" without the
  rule.** "Whether administration has since asked council for more snow
  money" is a pointer, not a verdict, so the brief's same-sentence rule does
  not strictly bind it. But it is the reader-facing phrase the rule exists
  for, and the snow page's count changes under the dealt-with rule if
  towing is excluded. Suggested wording: "Whether administration has since
  put proposals for more snow money on council's agendas, and what council
  did with them, is on its own page."

`SOURCE VERIFICATION: 0 blocking, 4 advisory`
