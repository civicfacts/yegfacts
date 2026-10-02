# Run record: on-street-parking

Question: "What do bike lanes do to on-street parking, and what does that
parking cost the city?" Register id `on-street-parking`, source
`yegscoop-2026-08-26`, ten accounts, nine against and one for. Methodology
v1.42. This record covers stage 1, framing, from the register entry to the
brief's final framing state. No panel has run.

## What was done, in order

1. **Read the register and the capture.** The three claims under the
   question and every captured wording were read from `intake/register.yaml`
   and `intake/captures/yegscoop-2026-08-26/comments.jsonl`, with the
   parent comment of each reply. The comment indexes are in `intake.md`.
   Ten distinct people; none appears under more than one claim; none is an
   office-holder.

2. **Established what the public record holds before drafting.** The
   triage reason assumed two records: a per-route account of parking
   changes and an account of what providing on-street parking costs the
   City.
   - The first exists. The City's project page for the Active
     Transportation Network Expansion Program carries a table with one row
     per route and a "Parking Change(s)" column stating, for each route,
     what on-street parking it removes, leaves unchanged or has yet to
     confirm. The Internet Archive holds captures of the page from
     2026-02-12 onward (found through its CDX API); the 2026-08-31 capture
     is the one closest to the comments, which were written between
     2026-08-27 and 2026-08-30, and its bytes match the copy the
     consultation run had archived privately on 2026-09-25. The live page
     loads for the site's fetcher (HTTP 200). The 2026-07-07 capture was
     also fetched because the table changed between July and August: the
     Grovenor routes moved from "starting construction" with planned
     parking removals to "deferred" with a note that they were cancelled
     over feedback about the loss of parking, and the 50 Street route moved
     from a both-sides removal to "to be confirmed" after Council's motion
     of 2026-07-07. Between 2026-08-31 and 2026-10-01 the Holyrood,
     Idylwylde, Bonnie Doon and Strathearn routes moved from 2026 to 2027,
     several routes opened, and the 50 Street row split in two; no Parking
     Change(s) cell changed its substance.
   - The second the editor did not find. The City's Curbside Management
     Strategy (2022) says public parking spaces require resources to
     build, maintain and operate, that user fees can offset those costs and
     that pricing can "decrease the subsidy on unpriced or underpriced
     parking", and gives no figure. The City Auditor's Parking Operations
     Audit of 2026-06-29 reports 6,000 City parking spaces, 2,700 of them
     on-street, and about $13 million of 2025 revenue from paid parking, and
     states no cost of unpaid parking. The Residential Parking Program page
     states no cost. The Urban Planning Committee's agenda of 2026-06-09
     lists report CO03347, "Transforming Edmonton's Curbside and Parking
     Program", with seven attachments, and report CO03517 on high-frequency
     transit routes and on-street parking; those are eScribe filestream
     files behind the portal's browser check, and the site has not read
     them. They are listed below for the founder to download if the parked
     claim is to be revisited.
   - 132 Avenue, which one commenter named, was found to be a neighbourhood
     renewal project (the 132 Avenue Collector Renewal), not a programme
     route; its design record, the What We Decided Report of September
     2022, states the aim "to maintain parking as much as possible", with
     parking moved from service roads to the avenue and raised one-way bike
     paths on both sides. The City's project page for it was fetched and
     the report staged.

3. **Staged and ingested every source relied on.** Every source was fetched
   with `scripts/evidence-stage.ts --url` and ingested with
   `scripts/evidence-ingest.ts`, rights unclear, so all are private. The
   Internet Archive captures were fetched through the archive's raw-content
   (`id_`) endpoint so the bytes are the City's page and not the archive's
   wrapper; the 2026-08-31 capture's hash matches the private copy made on
   2026-09-25.

   | ID | Source | Used for |
   |---|---|---|
   | YF-EV-0240 | Route table, Internet Archive capture 2026-08-31 | claim 1, primary snapshot |
   | YF-EV-0241 | Route table, live page as fetched 2026-10-01 | the editor's comparison copy; the brief names the capture below instead |
   | YF-EV-0242 | Route table, Internet Archive capture 2026-07-07 | claim 1, qualification 4 |
   | YF-EV-0243 | Parking Operations Audit, Office of the City Auditor, 2026-06-29 | the parked subsidy claim |
   | YF-EV-0244 | Curbside Management Strategy, 2022 | the parked subsidy claim |
   | YF-EV-0245 | Residential Parking Program page, 2026-10-01 | the parked subsidy claim |
   | YF-EV-0246 | 132 Avenue Renewal project page, 2026-10-01 | claim 1, qualification 2 |
   | YF-EV-0247 | 132 Avenue Collector Renewal, What We Decided Report, September 2022 | claim 1, qualification 2 |
   | YF-EV-0248 | Urban Planning Committee 2026-06-09, agenda (attachment list with DocumentIds) | the parked subsidy claim's reopen condition |
   | YF-EV-0249 | Urban Planning Committee 2026-06-09, post-meeting minutes | the parked subsidy claim's reopen condition |
   | YF-EV-0250 | Route table, Internet Archive capture 2026-10-02 05:56 UTC, requested by the site after check 1 | claim 1, alternative snapshot |

   Already registered and relied on for qualification 8: YF-EV-0118
   (report IS03688, DocumentId 304024), YF-EV-0222, YF-EV-0223 and
   YF-EV-0140 (Attachment 5, DocumentIds 304032, 304031 and 304030).

4. **Drafted `intake.md` and `brief.md`** from the register entries and the
   archived sources only. The brief states no stall count, route count or
   share; those are what the panel would establish.

## The decisions, and why

**One claim framed, two parked at the brief.** The task was to take every
claim whose verdict is reachable from named records in both directions to
the panel, and to park the rest under methodology v1.24 with a reason and
a reopen condition.

**Claim 1, `bike-lanes-remove-street-parking`: tested as a generalisation
over the programme's route table.** Eight people say bike lanes take street
parking; two name a place and every one offers the loss as what a bike lane
does. The framing prompt's rule is that when a post offers examples for a
pattern, the pattern is the claim. The City's own per-route record can
reach every verdict: Supported if most on-street routes carry a permanent
block-length removal, Contradicted if few do, Partially supported between.
The brief fixes the 2026-08-31 capture as the primary snapshot because it
is the record as it stood when the claims were made, with the live page on
2026-10-01 as the required alternative; the row as the unit; on-street
routes as the denominator, with every route as the alternative, because the
opponent would say the programme is mostly pathways; a block-length
removal as the primary reading of "takes away", with any removal as the
alternative, because the holders describe losing the parking on their
street and a corner clearance is not that; all routes with a determined
entry as the primary set, with built routes as the alternative, because the
Holyrood and Idylwylde commenters were describing planned routes; and
bands at one half and one fifth, with two thirds and one third as the
alternative. None of the thresholds comes from a pre-existing standard and
the brief says so. The two named places are checked as stated and reported
as qualifications; 132 Avenue enters no count because it was built under a
different programme.

**Claim 2, `business-lost-customer-parking`: parked.** One person, one
unnamed street, one summer, no cause named. No City record can be matched
to a street nobody has named, so the only verdict available is Not
established, decided by the gap in the account and not by anything about
Edmonton. It reopens if the street and period are identified.

**Claim 3, `free-parking-is-a-subsidy`: parked, after checking what
"subsidy" turns on.** The factual content, that unpaid curb parking costs
the City money the people who park do not pay back, is not disputed by
anyone in the source: the people on the other side call themselves
residents "who are paying taxes for parking", and the City's own strategy
says pricing can decrease "the subsidy on unpriced or underpriced parking".
The two sides disagree about whether that is a waste, which is an opinion.
Contradicted would need a City record showing unpaid curb parking imposes
no cost or that drivers pay it back, and none is identified; the magnitude
the question asks about, what the parking costs, no identified record
states. A verdict would tell neither side anything, which is the stakes
test the framing prompt sets. It reopens on a City record stating what
providing unpaid on-street parking costs the City or what share drivers
pay back; the first places to look are report CO03347 and its attachments,
which the site has not read.

**As-of date 2026-08-31**, the primary snapshot, because the claims were
made that week and the City's table is a moving record.

## Portal files the founder would need to download

Named here so nobody guesses their contents. All are served at
`https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=<id>`,
which answers the site's fetcher and the panel seats with a browser check.
None is needed for the claim under review. They are the first places to
look if the parked subsidy claim is revisited:

- 298385: Report CO03347, Curbside and Parking Program - Transforming
  Edmonton's Curbside and Parking Program (Urban Planning Committee,
  2026-06-09, item 7.3)
- 298386: Attachment 1 - CO03347 - Current Programs, Data and Resourcing
- 298388: Attachment 3 - CO03347 - Financial Performance of City of
  Edmonton Paid Parking
- 298392: Attachment 7 - CO03347 - Projected Financial Outlook
- 298365: Report CO03517, High-Frequency Transit Routes and Associated
  On-Street Parking (item 8.1)

The agenda page that lists them is archived as YF-EV-0248.

## Hashes

- `intake.md`, unchanged throughout:
  `c9063355af367d1e6f7ef62925f420760d865f1bd21506636df510570c0244d9`
- `brief.md` as sent to check 1:
  `0b0360cd57f4a05801a40ecd2a14584083d817f4bf1f24ead1ced4730a2dc55a`;
  check 1 package
  `c6555245f27de016c28064d9928d1781ba8a4c7a97da14bf3df380da879fba66`
- `brief.md` as sent to check 2:
  `c2a0e46c2b3cc60eeb9063cbb52635c201f4bf0c58af80a6f90d9dd17e322be1`;
  check 2 package
  `f187dcd5d3b1ff0f2546920488df2fb8c74257496d697771abf175f424405d96`
- `brief.md` as sent to check 3:
  `ba2a027e728ba6fc1b588983355c6ec2b02826e2a21e3e6f0659deb845798da0`;
  check 3 package
  `df01ed178b0f5c69877f5f02bca8e2cab4be9dc4c94b1862d4edbb1bdbe48c80`
- `brief.md` with check 3's two replacements applied, as put to the
  eligibility reader:
  `b4849964c97345acc00cb0991e7e048b7343dc081663f941d6b1a9a8a44a373f`
  (never sent to a confirmation; superseded below)
- `brief.md` as parked: the check 3 text with only the status block
  changed,
  `53012d34abfd71a6cad4f6991116f37269dbb8b18721af3c58684cfad80fb15c`

## Stage 1, framing

**Checked by** `prompts/framing-check.md` on the OpenAI seat, GPT-6 Sol at
high, `codex --search exec -m gpt-6-sol -c model_reasoning_effort=high -s
read-only --skip-git-repo-check`, codex-cli 0.159.3, prompt on stdin, run
from an empty scratch directory with no repository access, live web search
enabled. The editor drafted on an Anthropic model, so the checker is from
a different vendor. Each package was the framing prompt, `intake.md`, the
brief, the verdict vocabulary from `docs/DESIGN.md` section 3 and
`prompts/review-schema.json`; re-checks add every previous report and
every author response. No package carried a local path. Reports are
committed unedited as `framing/check-N.md`; the editor's answers are
`framing/response-N.md`. Times below are UTC; the evening of 2026-10-01 in
Edmonton falls on 2026-10-02 UTC.

**Check 1** (05:51 to 05:54 UTC, 2026-10-02): REVISE. Two defects,
corrected in the checker's wording: undetermined routes could be left out
of the share while the result was described as programme-wide (a
completeness rule now gives lower and upper bounds with the undetermined
routes counted both ways, and a straddle is Not established); "at least
one half" was called a simple majority (Supported is now greater than one
half). Framing findings, all adopted: "nobody chose it" overstated the
intake, now the grouping and triage are named and the uncaptured comments
acknowledged; the proposition's limits (no particular resident's loss, no
curb-space quantity, no as-built check) now sit beside the verdict; "at
least a block" was defined as part of a block, now it is a full block face
from one cross street to the next with both ends established; the dated
alternative was a hash of bytes the panel could not retrieve, so the editor
asked the Internet Archive to capture the live page (timestamp
20261002055600), compared its table with the live copy, found them the
same, and the brief names that capture and the archive's index; the scope
now says the verdict covers only the programme's routes and settles nothing
about bike-lane projects outside it; the stakes and the reader-facing
question were rewritten in the checker's words. Response:
`framing/response-1.md`.

**Check 2** (06:00 to 06:04 UTC): REVISE. Every check 1 finding RESOLVED.
One defect, corrected in the checker's wording: the Partially supported
row included exactly one half and called it "a real minority", which
contradicts its own arithmetic; it now says "a substantial share of
routes, but not a majority", and the stakes sentence matches. Framing
findings, both adopted: the 2026-08-31 capture was described as the table
"as it stood when the claims were made" although the comments were written
August 27 to 30, now described as a near-contemporaneous fixed record that
does not establish the table's contents on those days; "built routes"
included routes under construction, now the set is "open-or-underway" and
the brief says its parking changes remain the City's stated plans, not
completed outcomes. Under v1.12 this response is the editor's written
resolution: every finding adopted, none disputed. Response:
`framing/response-2.md`.

**Check 3** (06:06 to 06:10 UTC), the third and last report under the
cap: REVISE. Every earlier finding RESOLVED. Two standing findings, each
with copy-ready replacement text: a defect under check 4, that the "Count
the unknown" instruction could put a route already excluded by a
determined facility type into U and let an ineligible row decide Not
established; and a framing finding under check 9, that three statements
saying the City counts no stalls were too absolute, because one Holyrood
route entry gives an approximate two-stall figure. The checker said itself
that both have copy-ready replacements and that a third REVISE parks the
brief unless the v1.39 route is used. Response: `framing/response-3.md`.

**The v1.39 attempt** (06:13 UTC). The v1.20 route was closed because a
framing finding stood; the v1.35 route because no finding said the record
cannot carry the remaining claim. The editor applied both replacements
(`framing/wording-edits.md`), joining them to the surviving text by
dropping one "and", capitalising one "this" and turning one full stop into
the list's semicolon, and updated the status block to say where the brief
stood, as the lanes-and-congestion brief had done. A separate read-only
session on GPT-6 Sol, not the editor, read check 3, the rule, the table and
the diff, and returned INELIGIBLE (`framing/eligibility.md`): the defect
replacement was applied verbatim and is eligible; the check 9 replacements
were not applied verbatim because of the join words; and the status-block
change is not exempt from "nothing else changed". The reader is right on
the rule as the board wrote it, which is copy-ready text only, pasted and
nothing more. Under v1.39 an ineligible brief stays parked under v1.12, and
the route provides no second read, so none was run.

**One lapse in the package rule, disclosed.** The eligibility package
carried the unified diff between the two briefs, and the diff's two header
lines named the scratch-directory paths of the files compared. That
directory's name encodes the repository path in mangled form. No home
directory path, repository path in its plain form, or private file content
went with it; the framing packages carried no local path. The lapse is the
editor's.

## Final state

**PARKED 2026-10-01 under the methodology v1.12 cap.** The brief's text is
the text check 3 read, with only the status block changed; check 3's two
standing findings stand against it. It reopens only on new intake
evidence, never on a further revision of this brief. No panel may run on
it.

| Claim | Proposition, in short | Disposition |
|---|---|---|
| `bike-lanes-remove-street-parking` | On most of the on-street routes of the City's Active Transportation Network Expansion Program, as listed on 2026-08-31, installing the route permanently removes on-street parking along at least one side of the street for at least one full block face, from one cross street to the next | the claim under review; parked with the brief at the cap |
| `business-lost-customer-parking` | A business could not use its street for customer parking all summer, and the City had put up no parking signs | parked at the brief before any check: the commenter names no street, so no City record can be matched to the account; reopens if the street and period are identified |
| `free-parking-is-a-subsidy` | Free on-street parking for vehicles is a subsidy paid for by taxpayers | parked at the brief before any check: nobody in the source disputes it and no identified City record states what unpaid on-street parking costs the City; reopens on a City record stating that cost or the share drivers pay back, with report CO03347 and its attachments named as the first places to look |

The checker raised no objection to either park across three reports and
marked checkability OK each time.

**Register.** `on-street-parking` moves to lifecycle `briefed`, triage
`park`, with the reason and a note pointing at this brief. The claims
carry no state of their own; their dispositions are in the question's note
and in this record.

**What is weak about this, said now.** The brief was two pasted sentences
from a confirmation, and what parked it was the editor's hand: three join
edits and a status line that the rule does not allow and that a stricter
editor would not have made. The founder could decide that an editor may
correct its own application and obtain one more eligibility read; that is
a methodology question for him and the board, not for this record, and it
is raised in the handover. Everything needed to take the brief forward is
here: the applied text is `wording-edits.md`, the sources are in the
registry, and the two claims parked inside the brief were accepted by the
checker as parked.

## 2026-10-02: the editor's decision on the park

The park stands, and the cause was ours, not the checker's. Check 3 left two
findings with copy-ready text, so the v1.39 route was open; the editor's
session joined the replacements to the surrounding words instead of applying
them exactly, and the eligibility reader was right to rule that ineligible.
v1.39 gives one read, and the editor does not ask for a second: an exception
made because the editor slipped is the loosening the board warned against.
The question reopens on new intake evidence, as who-pays-for-roads does.
Process fix for every later v1.39 attempt: before the eligibility read, the
editor diffs each applied passage against the checker's replacement text and
sends nothing unless they are identical; any status-block change waits until
after the confirmation.
