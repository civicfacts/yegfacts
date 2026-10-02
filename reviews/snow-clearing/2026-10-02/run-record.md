# Run record: snow-clearing

Question: "How does Edmonton clear snow from its streets and bike lanes?"
Register id `snow-clearing`, source `yegscoop-2026-08-26`, five accounts,
four against and one on neither side. Methodology v1.42. This record
covers stage 1, framing, from the register entry to the brief's final
framing state: frozen on 2026-10-02 under methodology v1.39 after three
REVISE reports, an eligibility read and a wording confirmation. No panel
has run.

## What was done, in order

1. **Read the register and the capture.** The five claims under the
   question and every captured wording were read from `intake/register.yaml`
   and `intake/captures/yegscoop-2026-08-26/comments.jsonl`, with the parent
   comment of each reply. The comment indexes are in `intake.md`. Five
   distinct people; two appear under two claims each; none is an
   office-holder. One comment names the mayor in a sentence of opinion that
   neither the register nor the brief quotes.

2. **Established what the public record holds before drafting.** The
   triage reason assumed three records: the snow policy, the service
   schedules and the council reports.
   - The policy and procedure exist and are published on edmonton.ca.
     Council Policy C409K (2021) states outcomes and principles and ranks
     nothing; the Snow and Ice Control Procedure under it, approved by the
     City Manager on 2025-10-15, sets the priority hierarchy with a
     completion standard for each class of roadway and active pathway, the
     rules for where snow is placed and when it is removed, the windrow
     rules, the materials including calcium chloride, and the parking ban.
     The City's Snow Clearing Service Levels page still linked the
     2025-10-15 procedure on 2026-10-02 and also linked the replacement
     policy C409L that Council approved on 2026-09-08, whose web copy shows
     its approval date as TBD. The page and the mailer linked from it
     restate the standard in days, and one figure differs from the
     procedure (the residential completion time); both texts are archived
     and the brief fixes the procedure as controlling with the pages as
     the required alternative instrument.
   - The council record exists and the site's fetcher reads the meeting
     pages. The eScribe calendar endpoint was read for 2025-11-01 to
     2026-10-31 and every City Council, Community and Public Services
     Committee and Executive Committee minutes page in that range was
     searched for "snow", "calcium", "winter" and "windrow". That found the
     notice of motion of 2026-01-19 and the two Council motions of
     2026-03-17 that asked Administration to include options, including
     calcium chloride on roadways and surge capacity, in the policy review;
     the Community and Public Services Committee's item 7.1 of 2026-08-31
     on City Operations report CO03513 with thirteen attachments; and City
     Council's item 7.9 of 2026-09-08, dealt with without debate. The
     Internet Archive holds a capture of the committee's agenda from
     2026-08-22, five days before the first captured comment, and the
     Agenda Review Committee's minutes of 2026-08-18 show the agenda before
     it that day. The report and its attachments are filestream files
     behind the portal's browser check (HTTP 403 to the site's fetcher),
     and the site has not read them.
   - News reports from 2026-08-21 and 2026-08-31 were read as leads only,
     to find the meeting; nothing in the brief rests on them.

3. **Staged and ingested every source relied on.** Every source was fetched
   with `scripts/evidence-stage.ts --url` and ingested with
   `scripts/evidence-ingest.ts`, rights unclear, so all are private. Ids
   start at YF-EV-0280 because another session was ingesting from
   YF-EV-0251 at the same time; the allocator was given a placeholder for
   the ids below 0280, which was deleted and never committed. The archive
   capture was fetched through the archive's raw-content (`id_`) endpoint
   so the bytes are the City's page and not the archive's wrapper.

   | ID | Source | Used for |
   |---|---|---|
   | YF-EV-0280 | Council Policy C409K, Snow and Ice Control Policy (2021-08-16) | claims 1 and 2, that the policy ranks nothing |
   | YF-EV-0281 | Snow and Ice Control Procedure under C409K, approved 2025-10-15 | claims 1 and 2, the controlling standard; claim 4, present uses of calcium chloride |
   | YF-EV-0282 | Snow Clearing Service Levels page, 2026-10-02 | claims 1 and 2, alternative instrument; the parked claim |
   | YF-EV-0283 | Winter Cycling page, 2026-10-02 | claim 1 qualification; claim 2 bike-lane strand |
   | YF-EV-0284 | Winter Travel page, 2026-10-02 (the FAQ address redirects here) | claim 2 |
   | YF-EV-0285 | Service levels mailer, as linked 2026-10-02 | claims 1 and 2, alternative instrument |
   | YF-EV-0286 | Council Policy C409L as published on edmonton.ca, 2026-10-02 | the policy review; that C409L ranks nothing |
   | YF-EV-0287 | Community and Public Services Committee 2026-08-31, agenda (attachment list with DocumentIds) | claims 3 and 4 |
   | YF-EV-0288 | The same agenda, Internet Archive capture 2026-08-22 16:26 UTC | claims 3 and 4, publication date |
   | YF-EV-0289 | Community and Public Services Committee 2026-08-31, minutes | claims 3 and 4 |
   | YF-EV-0290 | City Council 2026-09-08, minutes | claims 3 and 4, alternative body and window |
   | YF-EV-0291 | City Council 2026-03-17, minutes | claims 3 and 4, the motions asking for options |
   | YF-EV-0292 | Community and Public Services Committee 2026-01-19, minutes | claim 4, the notice of motion |
   | YF-EV-0293 | Agenda Review Committee 2026-08-18, minutes | claim 4, publication date |

   Two pages were fetched and not ingested: the `/snow-faq` address, which
   redirects to the Winter Travel page, and the City's Bike Routes - How To
   page, which says nothing about snow or windrows.

4. **Drafted `intake.md` and `brief.md`** from the register entries and the
   archived sources only. The brief states no completion time, count of
   proposals or cost; those are what the panel would establish.

## The decisions, and why

**The editor's draft tested four claims and parked one; the checks parked
three more, and the editor agreed each time.** The task was to take every
claim whose verdict is reachable from named records in both directions to
the panel, and to park the rest under methodology v1.24 with a reason and
a reopen condition. The brief sent to check 1 tested the order of
clearing, the windrows, the two proposals and the calcium chloride
forecast, and parked Whyte Avenue. Check 1 asked for the windrow claim to
be parked; check 2 asked for the order claim and the forecast to be
parked. The frozen brief tests one claim and parks four. What follows is
each claim's final disposition and the reasoning that got it there,
including where the editor's first reading was wrong.

**`two-snow-removal-proposals-need-more-money`: the claim under review,
tested against the agendas, the report and the minutes.** "Two" is at
least two, with the exact count reported and "exactly two" as a required
alternative; "to council" is Council or a committee of Council, with
Council alone as the alternative body; "already" closes the window at the
comment date and, after check 1, means considered by a body by that date,
with proposals merely on a published agenda for a later meeting as the
alternative timing rule; the reference period starts at the first regular
meeting of the present Council, with a pre-election start as an
alternative. A councillor's motion asking for options is not a proposal;
Administration's answer is. After check 2 the primary unit counts each
separately presented service package once, with separately costed options
as the alternative unit, and "requires spending increases" is read as new
spending stated in the proposal's text, with an excess over an identified
approved budget as the stricter alternative. The brief names Attachments
9 and 10 to report CO03513 by their agenda titles as the files most likely
to hold the proposals and says it has not read them; they and the report
are essential, so a run that cannot reach them stops.

**`bike-lanes-plowed-before-streets`: parked by check 2.** The editor's
draft tested the claim against the City's published standard, class by
class, on the ground that the standard states the order the City sets for
itself. Check 1 widened the scope to all on-street bike lanes; check 2
found that a completion deadline does not establish which facility crews
plow first, so that the standard answers a different question from the
one the holder asked, and that under the widened scope the Supported rung
could not occur because painted lanes outside the network take their
road's deadline. Both findings were right. The claim is parked with the
checker's wording, the standard's classes and deadlines are given as
background without a verdict, and it reopens on a record of actual
clearing by snowfall, with the Snow and Ice Control Annual Report
(Attachment 5 to CO03513) named as the first place to look. Only one of
the three captured wordings asserted an order; the brief says so, after
check 1 corrected the editor's count.

**`calcium-chloride-debate-coming`: parked by check 2.** The editor's
draft tested the forecast as a statement about the agenda as it stood on
the comment date, reasoning that the record could reach both directions
on the day it was written. The orchestrating brief for this session had
expected a forecast of this shape to be parked, and the editor departed
from that expectation and said so in this record. Check 1 tightened the
test; check 2 found that the captured sentence contains no separate
assertion that an agenda was already published and that a later debate
would not become false because its agenda had not been published yet, so
no reading of the sentence reaches Contradicted. The checker was right
and the orchestrator's expectation was right. The claim is parked with
the checker's wording; what the record shows (the agenda captured on
2026-08-22, the March motion that asked for calcium chloride options, the
minutes of 2026-08-31 and 2026-09-08) is given as context without a
verdict.

**`snow-windrowed-into-parking-spaces`: parked by check 1.** The editor's
draft tested the claim against where the standard puts plowed snow and
when it removes it, by class of road. Check 1 found that a road-class
snow rule is not evidence that snow occupies the remaining parking spaces
beside bike lanes, and asked for a published record locating both the
remaining parking and the snow storage for those streets, or a park. None
exists in the record identified: the City's project page locates the
remaining parking route by route, and no identified City record states
where plowed snow or bike-lane snow is stored relative to it. Parked with
the checker's wording; the general windrow rule is background.

**`whyte-avenue-narrow-in-winter`: parked by the editor before any
check.** "Very narrow and dangerous" has no measurable referent in any
identified City record. The standard's own trigger for removing snow in
business districts, driving lanes narrowed below a stated width, is the
nearest thing to a measure, and no City record reports lane widths,
removal dates or a seasonal collision comparison for 82 Avenue through
Old Strathcona. Check 1 corrected the editor's "disputed by nobody" on
the budget phrase: it could mean no allocation or inadequate funding, and
neither is the claim's point. The checker raised no objection to the park
across three reports.

**The title.** Check 3's one standing finding was that the brief's title
still promised an answer to how Edmonton clears snow from its streets and
bike lanes. The checker supplied the replacement line and the editor
applied it byte for byte under v1.39. The register's question text is the
question's permanent address and is unchanged; the question's page leads
with the four parks, as v1.35 requires.

**As-of date 2026-10-02**, the date of drafting, because Council replaced
the policy on 2026-09-08 and the City's pages were updated for the coming
winter in the weeks before drafting. The reference period for the
proposals claim starts at 2025-11-18, the first regular City Council
meeting of the present Council as the portal's calendar listed it when
read on 2026-10-02; the calendar is a POST endpoint and was not archived.

## Portal files the founder would need to download

Named here so nobody guesses their contents. All are served at
`https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=<id>`,
which answers the site's fetcher and the panel seats with a browser check.
The brief names each by title from the archived agenda (YF-EV-0287) and
states nothing about its contents. Under methodology v1.41 a file the
founder downloads in a browser can be carried into the panel package once
its hash is in the registry. The Internet Archive's capture of the agenda
on 2026-08-22 (YF-EV-0288) lists the same titles under DocumentIds 303379
to 303392, so the files were re-posted under new ids between 2026-08-22
and 2026-10-02; the ids below are the live page's on 2026-10-02, and the
brief asks reviewers to report any difference between the two listings
where both can be read.

Essential to the claim under review (the run stops without them):

- 304803: Report CO03513, Snow and Ice Control Policy and Program Review
  (Community and Public Services Committee, 2026-08-31, item 7.1)
- 304812: Attachment 9, Well Maintained City Package Summary
- 304813: Attachment 10, Snow and Ice Enhancements - June 2026

Named as context for the parked claims only, not essential:

- 304814: Attachment 11, Summary of Calcium Chloride Usage
- 304817: Administration presentation for item 7.1
- 304807: Attachment 4, City of Edmonton Snow and Ice Control Program -
  Service Levels
- 304808: Attachment 5, Snow and Ice Control Annual Report 2025-2026 (the
  first place to look if the order claim is to be reopened)

The other attachments (304804 to 304806, 304809 to 304811, 304815 and
304816) are listed in the brief for completeness and are not named as
instruments. The committee's minutes page lists the same files under
DocumentIds 305997 to 306011. The eScribe meeting pages the brief relies
on load for the site's fetcher but were refused to the checker's web
tools; under methodology v1.42 they can be carried into the panel package
by item.

## Hashes

- `intake.md`, unchanged throughout:
  `f6447772b45356731584060a266b688448ab80a15c00637318b05269e576dc04`
- `brief.md` as sent to check 1:
  `17249a98e34f3ecb3041f5691bc637ea374108cd9959efdc9a65ffc86dc4f044`;
  check 1 package
  `c97b4a4f1722976263f59c1e908d5bcbc56fba5c5ea8efb6e8a5b04d3ee462de`
- `brief.md` as sent to check 2:
  `c4f45578ae8f676367c6fc1e9cb5322f181ed12b80c2f29b6f7ade5c4f2c3e38`;
  check 2 package
  `a30fe4b9e5aa0ceea9778c471b808dff30fedd2491efedf3f8a4a1a49fbc0d50`
- `brief.md` as sent to check 3:
  `c6f81692df5b85013ef88109a105bb56304efb2bb0cd3ec4bedc11b8cd41a48d`;
  check 3 package
  `af1d388e1b0fb9512aa8bdfbffd6220cb046cf9c747d25af763f541df3045215`
- `brief.md` with check 3's replacement applied, as put to the
  eligibility reader and to the confirmation:
  `3ff9e7279ecb8e2576d4c74d9cf87128349985f3f103877a3b47bdca34405863`;
  eligibility package
  `5a739e68701184d183ce317bff97531d38455040a804a8aa8d21909aee80dc75`;
  confirmation package
  `2561a809102491bce92a50a00898d935d0ac608ce5555ae56c18f63cd337449b`
- `brief.md` as frozen, after the status block was written:
  `5ceff84da92a0c504880a2c57b873de36e37823bd880dc4ae423d8ac550fa103`

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
`framing/response-N.md`. Times below are UTC.

**Check 1** (08:01 to 08:08 UTC): REVISE. Three defects, two corrected in
the checker's wording and one resolved by removing the ladder it sat in:
claim 1's Partially supported rung drew a conclusion about collectors
that did not follow, and its Not established rung was rewritten with it;
the windrow ladder let the standard and the pages conflict across its
Supported and Contradicted rungs; the calcium chloride ladder left a
readable case unclassified. Framing findings, all adopted: the brief said
three commenters asserted an order when one did; "already put" was read
as listed on an agenda, now considered by a body; "considered" for the
calcium chloride debate was any handling of the item, now the topic
itself raised in the record; "bike lanes" was the winter network only,
now all on-street bike lanes with the network as the alternative; the
Whyte Avenue park's "disputed by nobody" was replaced; the operative
procedure was to be identified rather than assumed; the proposals claim
got two units, a cost reading that does not infer a budget baseline, and
a pre-election window; two expected-finding leaks were removed; the
windrow claim was parked, as the checker asked under checks 4, 7, 8 and
9, because no record locates plowed snow against the parking that remains
beside a bike lane. The checker could not open the C409L PDF, the archive
capture or the eScribe pages and asked for readable copies. Response:
`framing/response-1.md`.

**Check 2** (08:16 to 08:21 UTC): REVISE. Every check 1 finding RESOLVED,
three marked RESOLVED with new issues, two WEAKENED (the all-bike-lanes
scope could not reach Supported; the policy-level and prediction
limitations were stated but the verdicts still graded the substitutes)
and one OPEN (readable copies). One defect, resolved by removal: the
calcium chloride ladder could return Contradicted on an unread report.
Framing findings, all adopted: the order claim was parked, because a
completion deadline does not establish which facility crews plow first;
the forecast was parked, because the sentence contains no assertion that
an agenda was already published and a later debate would not become
false for that reason; the operative procedure was fixed by the editor
rather than left to the reviewers; the primary unit for proposals became
each separately presented service package counted once; the scope,
stakes and resident-question passages followed; and the brief was asked
to retitle the remaining graded question. Under v1.12 this response is
the editor's written resolution: every finding adopted, none disputed;
the OPEN finding on readable copies was answered with the text extracted
from the archived bytes, identified by hash, and recorded as answered to
the extent the package format allows. While extending that appendix the
editor found and corrected an error of the editor's own: the archive
capture lists the report and attachments under different DocumentIds
(303379 to 303392) from the live page (304803 to 304817), and the brief,
the capture's registry entry and the response say so. Response:
`framing/response-2.md`.

**Check 3** (08:28 to 08:31 UTC), the third and last report under the
cap: REVISE. Every earlier finding RESOLVED, including the readable-copies
request, which the checker marked resolved for framing by the extracted
items and the explicit stop on unread essential files. One standing
finding, a framing finding under check 9 carried from check 2 as
WEAKENED: the brief's title still read "How does Edmonton clear snow from
its streets and bike lanes?" while the brief graded only the proposals
claim. The checker supplied the replacement line and said the report is
copy-ready for the v1.39 route. Response: `framing/response-3.md`.

**The v1.39 route** (08:34 to 08:36 UTC). The v1.20 route was closed
because the standing finding is a framing finding; the v1.35 route
because it does not say the record cannot carry a claim. The editor
replaced the brief's first line with the checker's text, byte for byte,
and changed nothing else; the status block was left as check 3 read it,
following the on-street-parking record's process fix. The applied line
was diffed against the checker's text before anything was sent and they
are identical (`framing/wording-edits.md`). A separate read-only session
on GPT-6 Sol, not the editor, read the rule, check 3, the table and the
unified diff (labelled without local paths) and returned ELIGIBLE
(`framing/eligibility.md`). The same seat and pinned model as check 3
then read the whole difference against its report and the cited sources
and returned CONFIRMED (`framing/check-4.md`): the diff changes only the
first line, using the exact replacement text; the new title adds no
factual assertion beyond the question the cited record supports; checks
8 and 9 hold. The brief froze on that word. The status block at its head
was written after the confirmation and is the only text changed since.

**Package note.** Each check's package carried, after the brief, every
previous report and response; checks 2 and 3 and the confirmation also
carried an appendix of text extracted from the archived C409L policy and
the archived eScribe pages, with members of the public who spoke at the
committee replaced by "[member of the public]" and office-holders and
City staff acting in role named. No package carried text from the eScribe
filestream files, which the site does not hold, and no package carried a
local path; the eligibility package's diff was labelled `brief.md.check3`
and `brief.md.edited` so the lapse recorded on the on-street-parking run
did not recur. Each codex session reported that it could not write a file
in its own read-only sandbox; every report was captured through the
command's output file.

## Final state

**FROZEN 2026-10-02 under methodology v1.39.** The brief was not frozen
on FRAME OK, which this record says plainly; it was frozen on the wording
confirmation after the third report had resolved every framing finding
but the title. One claim goes to the panel; four are parked at framing.

| Claim | Proposition, in short | Disposition |
|---|---|---|
| `two-snow-removal-proposals-need-more-money` | Between 2025-11-18 and 2026-08-27, City Council or a committee of Council considered at least two distinct proposals from Administration to change snow and ice control service, each of whose text states new spending to deliver it | to the panel |
| `bike-lanes-plowed-before-streets` | The City plows bike lanes in winter before it plows the streets | parked at framing by check 2: the published standard sets deadlines, not the order crews cleared anything, and no record of actual clearing order by snowfall was identified; reopens on such a record, with the Snow and Ice Control Annual Report (Attachment 5 to CO03513) the first place to look |
| `calcium-chloride-debate-coming` | Council will soon debate bringing back calcium chloride as an anti-icer on the roads | parked at framing by check 2: a forecast, which the site does not grade, with no assertion in it that an agenda was already published; what the record shows is given as context; reopens if a later source states the matter as a fact about a named body on a named date |
| `whyte-avenue-narrow-in-winter` | Whyte Avenue becomes very narrow and dangerous in winter because of the snow budget and clearing | parked at framing by the editor before any check, accepted by the checker across three reports: no City record measures the asserted consequence; reopens on a City record of snow removal dates, lane widths or a seasonal collision comparison for 82 Avenue through the Whyte Avenue business district |
| `snow-windrowed-into-parking-spaces` | Plows windrow the snow into the few on-street parking spaces left beside the bike lanes | parked at framing by check 1: no record locates plowed snow against the parking that remains beside a bike lane; reopens if the City publishes where plowed and bike-lane snow is stored relative to that parking on streets with protected bike lanes |

No panel round has run; the next step, when the founder schedules it, is
round 1 on the frozen brief under the current pins (v1.37: Opus 5.5,
GPT-6 Sol, GPT-6 Luna at high). Before it can run the founder must
download the three essential portal files named above in a browser so
they can be carried under methodology v1.41, and the eScribe meeting
pages the brief relies on will need carrying by item under v1.42, since
the checker's web tools were refused at them and the panel seats' tools
have been refused at the same host before.

**Register.** `snow-clearing` moves to lifecycle `briefed`, triage `go`
unchanged, with a note pointing at this brief. The four parked claims
carry `triage: park`, `ground: no-instrument`, `parked_at: framing` and a
reason with the reopen condition, as methodology v1.35 provides; the
claim under review carries no state of its own.

**What is weak about this brief, said now.** The question as registered
asks how Edmonton clears snow from its streets and bike lanes, and the
one verdict the brief will produce is about whether Administration had
asked council for snow money twice by late August. That is the honest
result of three checks that each found the editor grading a substitute
for the claim people made, and the brief's title now says what it grades;
but a reader who comes for the plowing order will find four parks and a
budget finding, and the question's page must lead with the parks so the
finding is never taken for an answer to the question it came from. The
claim under review rests on files the site has not read and the seats
cannot fetch, so the run depends on the founder's downloads and on the
carry machinery. And the editor's first draft tested two claims the
checker parked for reasons the editor accepted on reading them, which is
the framing check doing its job and is recorded here for that reason.

## 2026-10-02: round 1 with report CO03513 and the meeting pages carried, stopped on two framing concerns and an unread budget package

**Round 1 ran on all three seats, and the run stops there.** Two seats
raised a MATERIAL FRAMING CONCERN on the brief's timing rule. All three
seats found a snow-clearing proposal in the Fall 2025 budget adjustment
that the brief does not name, and none could read its text. The Claude
seat calls that source essential and inaccessible. No merge, round 2 or
synthesis was run, and no verdict below is a finding of this site.

**What was carried, and how it was checked.** Under methodology v1.41 the
package carried the full text of three files the founder downloaded in a
browser on 2026-10-02. They are report CO03513 (YF-EV-0294, DocumentId
304803), Attachment 9, Well Maintained City Package Summary (YF-EV-0295,
304812), and Attachment 10, Snow and Ice Enhancements - June 2026
(YF-EV-0296, 304813). The committee's agenda page for 2026-08-31
(YF-EV-0287) lists each DocumentId under the same title, live and
archived. Each carried PDF answered the site's fetcher with a
challenge-signed HTTP 403.

Under v1.42 the package also carried the items selection rule v4 picks
from six meeting pages, each refused by the Claude seat's WebFetch with
HTTP 403 (`carried/seat-probes.yaml`):
- YF-EV-0287, the committee agenda of 2026-08-31: item 7.1;
- YF-EV-0289, the committee minutes of 2026-08-31: items 1.4, 2.3, 7.1,
  7.2 and 11.1;
- YF-EV-0290, the Council minutes of 2026-09-08: items 2.2, 7.9, 11.4 and
  11.6;
- YF-EV-0291, the Council minutes of 2026-03-17: items 10.2, 10.3 and
  10.4;
- YF-EV-0292, the committee minutes of 2026-01-19: items 7.1 and 11.1;
- YF-EV-0293, the Agenda Review Committee minutes of 2026-08-18: items 2.1
  and 2.1.1.

Rule v3 added snow-service terms, because the D-0047 addendum of
2026-10-02 judges relevance against each run's own claims. Rule v4 added
"draft agendas" and the 2026-08-31 meeting title, after the completeness
check found v3 missed the Agenda Review Committee record of the draft
agenda (qualification 4).

An independent read-only Claude Opus 5.5 session, not the editor, checked
the carried set (`carried/checks/`). It passed every item of every page
under v4, found the three PDFs extracted in full, including their cost
tables, and found all nine carried texts clear of personal information.
The second download is recorded as not made, because only the founder
has downloaded the files. The other CO03513 attachments, the edmonton.ca
policy pages and the Internet Archive capture were not carried, each for
the reason in the manifest's exclusions.

**The package.** The carry manifest was committed at 4b62c1b with sha256
`1d58f40816c6a049000c2e89ab462a6848da0e6ee9335fdd350dc68402d9f203`. The
carried section's sha256 was
`95cdfb60869a6888cf1842dfcd36893dfe957bf96c45c359f67b22370a39bfc9` and the
package's `9cbf0c5b198b95e2d207799f32d1bb0595ef706f0553afe13bb3a2f58a1ae638`,
the same for every seat. The earliest probe it rests on was the Claude
seat's refusal at 2026-10-02T14:44:40Z. All three seats launched from
4b62c1b at 15:12:51Z. The runner refused nothing.

| Seat | Attempt | Outcome |
|---|---|---|
| Claude Opus 5.5 (`claude-opus-5-5`), high, Claude Code 2.1.287 | `39baaadc68643583`, 15:12Z to 15:20Z | admitted on one attempt under claude-safe-web-candidate-2.1.287 |
| GPT-6 Sol (`gpt-6-sol`), high, codex-cli 0.160.0 | `ca07317bebe56b98`, 15:12Z to 15:26Z | admitted on one attempt under codex-captured-read-only-0.160.0 |
| GPT-6 Luna (`gpt-6-luna`), high, codex-cli 0.160.0 | `e97880ecaa8dd97a`, 15:12Z to 15:20Z | admitted on one attempt under codex-captured-read-only-0.160.0 |

What each seat returned, kept for the record only:

| Claim | Claude | GPT-6 Sol | GPT-6 Luna |
|---|---|---|---|
| `two-snow-removal-proposals-need-more-money` | Not established, moderate | Not established, high | Partially supported, moderate |

**Why the run stops.**

1. **Two framing concerns.** The Claude seat and the GPT-6 Luna seat each
   wrote MATERIAL FRAMING CONCERN on the primary timing rule.
   - The brief reads "already put ... to council" as "considered by a body
     by the comment date".
   - Both seats say that in ordinary usage, putting a proposal to council
     means submitting it. Report CO03513 and its attachments were on the
     committee's published agenda by 2026-08-22, before the comment.
   - Both find that the brief's alternative timing rule counts Attachments
     9 and 10 and reaches a different rung from the primary rule.
   - The Claude seat proposes "listed on a published agenda by the comment
     date" as the primary rule, with "considered" as the alternative.

2. **A proposal the brief does not name, unread.** All three seats
   identified a snow-clearing service package in the Fall 2025
   Supplemental Operating Budget Adjustment.
   - The seats place it in Council's budget meetings of late November and
     early December 2025, inside the reference period. Sol puts it under
     item 7.2 of 2025-11-24/25 and Claude under meeting ids
     `8321e64d-6394-469b-8653-65641562497c` and
     `2925a7f5-32a8-49a6-be15-fc1cf157c764`.
   - Sol names report FCS03158 and its Attachment 2 (DocumentId 278877),
     and Luna names FCS03158 too; Claude and Luna trace the package to
     report CO03079, heard by the committee on 2025-08-11.
   - No seat could read its text: the portal refused every seat's tool.
     They worked from search extracts and news reports.
   - Claude writes that the source is essential and inaccessible. Sol's
     Not established rests on the same unread report. Luna counts one
     package from it and finds no second.
   - The site holds no copy, the brief does not name it, and so it was
     not carried.

The brief says an inaccessible essential source stops a run rather than
becoming a finding, and a framing concern stops a run for the editor.

**Noted, not a stop.**
- No seat said the graded verdict turns on the edmonton.ca pages or the
  uncarried CO03513 attachments. Sol lists the other attachments as a
  limitation of the later-window alternatives only.
- Every seat reports that CO03513 states no approved snow and ice budget,
  so the stricter cost reading cannot be met from it.
- The Claude seat reports, as parked-claim context, that the report lists
  "Calcium Chloride System Upgrades" with a cost.

**What reopens the run is the editor's decision.**
- The two concerns go to the timing rule, which is a framing matter.
- The Fall 2025 package would need its report and attachment downloaded
  by a person, registered, named in the brief and carried before a seat
  could read it.
- The round 1 answers stay in `round1/` as returned, with their rows in
  `run.yaml`. A restart moves them under a superseded directory, as
  earlier runs did.

## 2026-10-02: the brief revised after the framing concerns; round 1 to run again

**The editor found the round-1 framing concern real, revised the brief
under methodology v1.2, and round 1 runs again on the revised brief once
the new files can be carried.** Methodology v1.2 answers a framing concern
from the panel by revising the brief and rerunning round 1, as the
council-pause-vote run did on 2026-09-29. This is not a framing check, and
the framing-check cap does not apply. No framing check, panel or seat ran
for this revision.

**The concern.** The frozen brief read "already put ... to council" as
considered by a body by the comment date, with a proposal merely on a
published agenda for a later meeting as the alternative timing rule. Two
seats said that in ordinary usage putting a proposal to council means
submitting it; that report CO03513 and its attachments were on the
committee's published agenda from 2026-08-22, before the comment was
written; and that the brief's two timing rules reach different rungs, so
the primary rule decided the verdict. All three seats also found a
snow-clearing service package in the Fall 2025 Supplemental Operating
Budget Adjustment, inside the reference period, which the brief did not
name, the site held no copy of, and no seat could read.

**The editor's reason.** The holder's words are "put ... to council".
Administration puts a proposal to a body when it submits it, and the
body's published agenda is the public record of that submission; whether
the body has yet dealt with it is a second question, which the minutes
answer. The frozen brief made the second question carry the verdict and
put the first in the alternative, so the verdict turned on when a meeting
fell against the comment date rather than on what Administration had
asked for by then. The revision swaps them: placed before Council or a
committee of Council on a published agenda by the comment date is the
primary rule, and considered by a body by that date is the required
alternative, reported beside it. On the Fall 2025 package, the brief's
instrument already reached every meeting in the period, but the files
that would hold such a proposal sit behind the portal's browser check and
the site held none, so the brief now names them and their meetings so
they can be carried under v1.41 and v1.42; what they say is for the
panel.

**The revision.** The timing rule changed everywhere it shaped the brief:
the claim's description in the opening section, the who-asks text, the
controlling-source sentence under "What is measured", the reference
period's alternatives, the definition (now "Put to the body", with
"considered by the body" as the required alternative), the normalized
proposition, the "Why this reading" paragraph, the "what this verdict
establishes" sentence, the instrument, the order of classification, the
ladder's Partially supported and Contradicted rungs, the
required-alternatives list, qualifications 1 to 3, the stakes, the
documents list and the first reviewer instruction. Every place the word
"considered" remains is now explicitly the alternative. The Fall 2025
documents were added: the three meetings' ids and page hashes under "What
is measured", a paragraph naming each file by the filestream template and
DocumentId, items 7 to 10 of the documents list, and the essential-source
sentence extended to report FCS03158 with its Attachment 2 and report
CO03079 with its Attachment 5. The reference period gained one sentence
saying a proposal is inside it when the meeting whose agenda lists it
falls on or after 2025-11-18 and the agenda was published by the comment
date. A status note at the head records the revision. The reference
period, body, unit, cost and count rules, the parks and everything else
are unchanged. The brief's sha256 was
`5ceff84da92a0c504880a2c57b873de36e37823bd880dc4ae423d8ac550fa103` and is
now `afd75d059c5eff67c197f6587c256df242ca7bb4027f27c981ff234a27efc320`.
Nothing from any seat's answer went into the brief: no count, cost,
verdict or reading of any file. The rerun stays blind.

**The documents registered.** The meeting pages were archived and
registered at 200252f as YF-EV-0297 to 0302: the Community and Public
Services Committee's agenda and minutes of 2025-08-11, City Council's
agenda and minutes of 2025-11-24 and the City Council - Budget agenda and
minutes of 2025-12-01. The founder downloaded eight portal files in a
browser on 2026-10-02 at about 17:09Z; they are registered here, private,
rights unclear, in the form of YF-EV-0294 to 0296. DocumentIds 278877 and
280346 have identical bytes, so one entry covers both.

| ID | DocumentId | File |
|---|---|---|
| YF-EV-0303 | 278875 | Report FCS03158, Fall 2025 Supplemental Operating Budget Adjustment - 2023-2026 Operating Budget (19 pages) |
| YF-EV-0304 | 278877, re-listed as 280346 | Attachment 2 to FCS03158, Operating Budget - Fall 2025 Supplemental Operating Budget Adjustment (144 pages) |
| YF-EV-0305 | 280345 | Replacement Page 53 of Attachment 2 to FCS03158 (1 page) |
| YF-EV-0306 | 278865 | Attachment 7 to FCS03159, Emerging Items - Fall 2025 (Unfunded) (2 pages) |
| YF-EV-0307 | 278866 | Attachment 8 to FCS03159, Unfunded Capital Profiles or Projects (2 pages) |
| YF-EV-0308 | 268207 | Report CO03079, Improved Accessibility - Active Pathway Snow Removal and Sidewalk Repair (10 pages) |
| YF-EV-0309 | 268212 | Attachment 5 to CO03079, Options and Costs to Increase Service Levels (4 pages) |

The site has read none of them; each entry records identity and
provenance only.

**The stopped answers.** Round 1 of 2026-10-02 stays in `round1/` with its
rows in `run.yaml`, as returned. Its answers are to the earlier brief and
are not an input to the rerun: no seat sees them, and the merge and
synthesis read only the new rounds. They move under a superseded
directory when the rerun is set up. The rerun waits on the carry: the
Fall 2025 Attachment 2 runs to 144 pages, longer than any file carried
so far, and the tooling for it (v1.43) is being decided separately.

## 2026-10-02: the stopped round 1 superseded; fresh probes for the rerun under v1.43

**Round 1 of 2026-10-02, run on the brief as first frozen, moves aside,
and round 1 runs again on the v1.2-revised brief** (sha256
`afd75d059c5eff67c197f6587c256df242ca7bb4027f27c981ff234a27efc320`)
under methodology v1.43, with FCS03158 Attachment 2 carried by section.
The stopped round's answers (`round1/`), its rows in `run.yaml` and a
copy of the carry manifest it ran on (sha256
`1d58f40816c6a049000c2e89ab462a6848da0e6ee9335fdd350dc68402d9f203`, the
hash its rows record) move unchanged to `superseded-2026-10-02/`, as
`round1/`, `run.yaml` and `carried-manifest.yaml`. They answer a brief
that has since changed, are kept for the record only, and are not an
input to the rerun: no seat sees them, and the merge and synthesis read
only the new rounds. `run.yaml` starts again with no rows.

**Fresh probes.** Every URL the brief names, exactly or by the portal's
template with a meeting id or DocumentId, was probed through all three
seats on 2026-10-02 from 18:23:41Z to 18:29:18Z, 34 addresses
(`carried/seat-probes.yaml`, appended). The Claude seat's WebFetch was
refused with HTTP 403 at every eScribe meeting page and filestream file
and at the portal root, with HTTP 502 at every edmonton.ca address, and
failed with no status at both web.archive.org addresses. Both GPT-6
seats' probes were unclear at every address, as v1.42 expects.

**The manifest, rebuilt under v1.43** (`carried/manifest.yaml`, minutes
rule v4, section rule v2). Carried whole, each on the fetcher's
challenge-signed HTTP 403: report CO03513 with Attachments 9 and 10
(YF-EV-0294 to 0296), report FCS03158 (0303), the replacement page 53
(0305), Attachments 7 and 8 to FCS03159 (0306, 0307), and report CO03079
with its Attachment 5 (0308, 0309). Carried by section: FCS03158
Attachment 2 (0304), 144 pages and 453,562 bytes of text, split into 36
sections, of which rule v2 carries 4 (pages 24-30, 34, 43-44 and 45-46;
41,515 bytes). Carried by item on fresh Claude-seat refusals: the six
2026 meeting pages, unchanged, and the minutes pages of 2025-08-11 (2 of
26 items), 2025-11-24 (0 of 37) and 2025-12-01 (3 of 46).

**What refused or needs the editor.**
- The three 2025 agenda pages (YF-EV-0297, 0299, 0301) fail: the brief
  writes out only the minutes template and says "`Agenda=Agenda`
  (agenda)", so it names none of them by the tool's naming rule. They are
  listed as failed, which refuses the package; the brief is not changed
  here. Their archived copies still serve the filestream title checks.
- Rule v4 selects no item about FCS03158 on the 2025-11-24 minutes (item
  7.2 is not carried) and none of items 5.2 to 5.2.3 on the 2025-12-01
  minutes. No v5 is written here.
- The estimated round-1 package is 330,283 of 400,000 bytes (carried
  section 259,995). Round 2 swaps the reviewer prompt for the shorter
  cross-review prompt and adds the merged evidence and the other seats'
  round-1 answers; on the first round's answer sizes that is about 380 to
  430 KB, at or over the ceiling.

The founder's browser downloads of 0303 to 0309 (2026-10-02, about
17:09Z) are recorded as download provenance and public-open checks, with
the founder as "person (not the editor)"; the public-open checks of 0294
to 0296, recorded under v1.42, are restated in the v1.43 form. Every
other check is pending.

## 2026-10-02: the revised brief corrected to name the agenda pages; selection rule v5; over the budget

**The v1.2 revision is corrected the same day, before any seat read it,
so that the three Fall 2025 agenda pages can be carried.** The brief gave
the minutes address in full but the agenda address only as
"`Agenda=Agenda` (agenda)", which does not name a page by the carry rule,
so the build refused the agendas of 2025-08-11, 2025-11-24 and
2025-12-01 (YF-EV-0297, 0299, 0301). The agenda template is now written
out in full beside the minutes template,
`https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=<meeting id>&lang=English`,
and the brief already gives each meeting id. The 2026-08-31 agenda
(YF-EV-0287) was already named by its exact address. The status note
gains one clause saying so. Nothing else changed. No seat has read the
revision, so this is part of the same revision, not a new one. The
brief's sha256 was
`afd75d059c5eff67c197f6587c256df242ca7bb4027f27c981ff234a27efc320` and
is now `a9b8fa0ef241235c02336509784a4166e45dfd33ab6313bc7b7edb41294c37f5`.

**Selection rule v5** is v4 plus "FCS03158", "CO03079" and "Operating
Budget Adjustment". The revised brief names the Fall 2025 operating budget
adjustment and the 2025-08-11 committee report, and v4 had no term for
either, so it selected no item on report FCS03158. What v5 selects on the
2025 pages:

| Page | Items carried | Items |
|---|---|---|
| YF-EV-0297, committee agenda 2025-08-11 | 1 of 26 | 7.3 (CO03079) |
| YF-EV-0298, committee minutes 2025-08-11 | 2 of 26 | 2.3, 7.3 |
| YF-EV-0299, Council agenda 2025-11-24 | 1 of 37 | 7.2 (FCS03158) |
| YF-EV-0300, Council minutes 2025-11-24 | 3 of 37 | 1.4, 7.1, 7.2 |
| YF-EV-0301, Budget agenda 2025-12-01 | 2 of 44 | 5.2, 5.2.3 |
| YF-EV-0302, Budget minutes 2025-12-01 | 10 of 46 | 1.4, 5.1.1, 5.1.2, 5.2, 5.2.1, 5.2.2, 5.2.3, 8, 9.1, 9.3 |

The 2026 pages select the same items as under v4.

**The rebuilt package is over the seat budget, so the run stops here.**
Every document the brief needs now qualifies and is carried, but the
estimated round-1 package is 423,656 bytes against the 400,000-byte
ceiling, with a carried section of 353,188 bytes. Most of the growth is
the 2025-12-01 budget minutes, now 92,103 bytes, because items 5.2.1 and
5.2.3 hold the operating budget amendments and their votes. Under v1.43
nothing is trimmed to fit. Narrowing the rule by a new version or
revising the brief is the editor's decision. The manifest is committed as
built, with its budget recorded as over. Every check is pending except
the founder's download and browser checks on the files he downloaded.
