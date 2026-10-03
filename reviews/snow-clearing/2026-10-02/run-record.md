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

## 2026-10-02: rebased onto the per-seat ceilings (D-0049); fresh probes; within the budget

**Under D-0049 the same package fits.** D-0049 sets each seat's package
ceiling from its measured context: 521,838 bytes for the two GPT-6 seats
and 1,203,500 for Claude. The build holds the round-1 estimate to the
smallest, so the 423,656-byte estimate that was over the old 400,000-byte
ceiling is now within it, with the same carried section of 353,188 bytes.
Nothing in the brief, the rules or the selection changed.

**Fresh probes.** The same 34 addresses were probed through all three
seats from 22:22:34Z to 22:28:12Z (`carried/seat-probes.yaml`, appended).
The results match the earlier probe: the Claude seat's WebFetch was
refused with HTTP 403 at every eScribe address, with HTTP 502 at every
edmonton.ca address, and with no status at both web.archive.org
addresses; both GPT-6 seats were unclear everywhere.

**The manifest, rebuilt** (minutes rule v5, section rule v2). Every
document carried before is still carried, with the same texts and items.
The site's fetcher now gets HTTP 200 from the filestream files of report
CO03513 and its Attachment 9 (YF-EV-0294, 0295), so those two rest on
the Claude seat's refusal there instead of the fetcher's challenge. The
founder's download provenance and public-open checks are kept. Each
meeting page's public-open check is now the site fetcher's own HTTP 200
on the live page at build time, as #118 allows for pages carried by item,
and its download provenance names the site fetcher. Every extraction,
completeness, section and personal-information check, and every
checker's reason, is pending for the independent checker.

## 2026-10-02: completeness check fails under v5; selection rule v6

**The independent checker's completeness check failed under rule v5,
and the editor adopted the checker's rule v6.** v5 missed four relevant
items: YF-EV-0299 item 7.1, YF-EV-0301 item 5.1, and YF-EV-0302 items
5.1 and 5.1.3. These are the Fall 2025 Supplemental Capital Budget
Adjustment items. Their report, FCS03159, is the one whose Attachments 7
and 8 the brief names, and qualifications 3 and 4 ask what Council did
with the Fall 2025 proposals and on which agenda. v6 is v5 plus
"FCS03159". "Supplemental Capital Budget Adjustment" was rejected
because it would also select the Blatchford utility items, which are not
relevant.

**Rebuilt on fresh probes** (22:45:15Z to 22:50:46Z, the same 34
addresses with the same results). v6 selects v5's items plus exactly
those four, and nothing else changed. The three pages' carried texts
grow by 6,074 bytes, and the carried section by 6,108. The estimated
round-1 package is 429,764 bytes, within the 521,838-byte ceiling. The
checker rechecks the four new items before any check is recorded.

## 2026-10-02: round 1 under rule v6, stopped on a framing concern

**Round 1 ran on all three seats and stopped because GPT-6 Luna raised a
MATERIAL FRAMING CONCERN.** All three seats answer Supported. Luna's
concern is the brief's timing rule. Under the primary rule, an item
listed on a published agenda counts as put to a body, which gives two
proposals and Supported. Requiring a body to have dealt with the item by
2026-08-27 gives one proposal and Partially supported. Luna asks that the
reader-facing phrase "already asked council" carry that qualification.
Synthesis halts on any such flag, so the merge, round 2 and synthesis
were not run. Whether this concern needs a brief revision or an editor's
response is the editor's call.

**The checks.** The independent checker's stage B was transcribed into
the manifest at 767da34, mechanically. Before each entry was copied, its
index, number, title and carried flag were matched against the manifest
(`carried/checks/`). Extraction passed on every pdf, and so did the
sections and context check on YF-EV-0304. Every personal-information
screen is clear. Completeness passed under rule v6 after the v5 failure,
and its record is kept as `carried/checks/completeness-v5.yaml`. The
seven second downloads are recorded as not made: only the founder has
downloaded these files, and the portal answers automated tools with a
browser check, so no other copy can be made. `package` passed.

**Round 1.** The manifest's sha256 was
`585251cfc9ca7c6b93496b9838d4a7284ffdcaa22cea91acf275ce7832a08c4b`, the
carried section's
`a3ca8843a458fedde167ca0fb1176c2e436860ba1e4b3426c351248710e3303c` and
the package's
`94a4ada0539341c3d29c1785b85e5ccfef3426af841eaa84ebc224f3a6c29e5f`, the
same for every seat. The package was 428,299 bytes, against ceilings of
521,838 for the GPT-6 seats and 1,203,500 for Claude. The earliest probe
it rests on was 22:45:15Z. Each seat was admitted on one attempt.

| Seat | Attempt | Time | Verdict |
|---|---|---|---|
| Claude Opus 5.5, high, Claude Code 2.1.288 | `d4113f6aa51f8afd` | 22:56Z to 22:59Z | Supported, high |
| GPT-6 Sol, high, codex-cli 0.160.0 | `65666047a7c61ad6` | 22:56Z to 23:03Z | Supported, moderate |
| GPT-6 Luna, high, codex-cli 0.160.0 | `27ae178162d916d1` | 22:56Z to 23:09Z | Supported, moderate; MATERIAL FRAMING CONCERN |

**What the seats counted.** Claude and Sol count three proposals:
- the Fall 2025 active pathway snow removal and sidewalk repair package;
- the parking ban enforcement package, from FCS03158 Attachment 2;
- the Well Maintained City package in CO03513.

Luna counts two, leaving out the parking ban package. Every seat reports
that no proposal states its cost against an identified approved snow
budget. Under that stricter cost reading the result is Not established
(Claude), Contradicted (Sol) or not established on the strict test
(Luna). No seat wrote that an essential source it could not read is
missing. The seats' tools were refused at the portal, and every seat read
the carried texts.

## 2026-10-02: the brief revised again under v1.2; the stopped round 1 superseded

**The editor upheld GPT-6 Luna's framing concern and revised the brief
under v1.2. The stopped round 1 is superseded into
`superseded-2026-10-02b/` and is not an input to the rerun.** The
concern, quoted from Luna's interpretation notes:

> MATERIAL FRAMING CONCERN: The primary rule treats an item published on
> a future meeting agenda as already put to a body. That makes the count
> two and the verdict Supported; requiring a body to have dealt with the
> item by 2026-08-27 leaves one and changes the verdict to Partially
> supported. The reader-facing phrase "already asked council" should
> carry that timing qualification.

The editor's reason: the brief's existing sensitivity rule (lines 532-534
of the earlier text) already requires the qualification. Where any
alternative changes the rung, the finding is definition-sensitive, the
story says so beside the verdict, and neither side can fairly cite the
verdict without it. The method still asks for a revision when a framing
concern is raised against a claim being published. So the revision
(bdb8423) makes the rule explicit for timing. Wherever the verdict
differs between the primary timing rule (placed on a published agenda)
and the alternative (considered by a body), every reader-facing use of
"already asked" or "already put" names its timing rule in the same
sentence. The status note says so. Nothing else changed. The brief's
sha256 was
`a9b8fa0ef241235c02336509784a4166e45dfd33ab6313bc7b7edb41294c37f5` and
is now `5dfd40e4afb6a4559052f42bbfd6948b1ad465645609b75d5a9dd79b3df7d79a`.

The superseded directory holds the three round-1 answers, the run.yaml
rows and a copy of the manifest they ran on. No seat in the rerun sees
them, and the merge and synthesis read only the new rounds. `run.yaml`
starts again with no rows.

## 2026-10-02: rounds 1 and 2 on the revised brief, synthesized

**The panel answered the claim under review Supported, and all three
seats agreed in both rounds.** Synthesis is taken from round 1, as the
method fixes, and gives `two-snow-removal-proposals-need-more-money`
Supported, Unanimous. No seat raised a MATERIAL FRAMING CONCERN, and no
seat wrote that an essential source it could not read was missing. Every
seat's web tool was refused at the eScribe portal, and every seat read
the carried texts. The four parked claims stay parked. This is the
panel's result, not yet a published finding. Drafting and the human gate
come next.

**Round 1.** The manifest at fa08a43 (sha256
`6f976ce395ae005cba1a6093933d2b50ba7c9ce147dd3defdba4363b70c5c584`) was
rebuilt on probes from 23:13:31Z, and every check carried over. `package`
passed on it. The carried section's sha256 was
`a3ca8843a458fedde167ca0fb1176c2e436860ba1e4b3426c351248710e3303c`,
unchanged by the brief revision. The package's sha256 was
`7124a828867b26ddf102edc0708e89a7587eb68a618e37a923e63f0c44ec2e50`, and
it was 428,753 bytes, the same for every seat. GPT-6 Luna's first
attempt failed schema validation, because its output had none of the
review's top-level fields. The runner's one retry sends the same package
plus the validator's errors, and the second attempt was admitted. No
runner refused anything.

**Merge.** The round-1 merge found 15 distinct sources and no contested
claim (`combined-evidence.json`, `disagreements.json`). Evidence staging
fetched ten. The five eScribe filestream files failed with HTTP 403, and
each of them is carried (`fetch-report.md`).

**Round 2.** After round 1 finished, all 34 addresses were probed again
through all three seats from 23:38:22Z, with the same results as before.
The manifest rebuilt on those probes (sha256
`8f89d3456ddb2d7a394a3ce48d368cb66ca02a89ec045690bd84d23a7e3dee35`)
differs only in probe and check times, and its carried section is
unchanged. The round-2 packages were 491,853 bytes for Claude (ceiling
1,203,500), 498,968 for GPT-6 Sol and 501,063 for GPT-6 Luna (ceiling
521,838). Luna's first attempt again failed schema validation, and its
retry was admitted.

| Seat | Round 1 attempt | Round 2 attempt |
|---|---|---|
| Claude Opus 5.5 (`claude-opus-5-5`), high, Claude Code 2.1.288 | `b86e6aacd11ceaf9`, 23:19Z to 23:24Z | `4c959c56aa2920be`, 23:44Z to 23:49Z |
| GPT-6 Sol (`gpt-6-sol`), high, codex-cli 0.160.0 | `7d2863155a4389ae`, 23:19Z to 23:29Z | `44770c3c90762708`, 23:44Z to 23:51Z |
| GPT-6 Luna (`gpt-6-luna`), high, codex-cli 0.160.0 | `cf8b77abdf7d5806` (retry of `813b92d23fedc722`), 23:19Z to 23:37Z | `5f91f7b40e38340e` (retry of `0fccd64c0c9308ad`), 23:44Z to 23:57Z |

| Claim | Claude, round 1 / 2 | GPT-6 Sol, round 1 / 2 | GPT-6 Luna, round 1 / 2 | Synthesis |
|---|---|---|---|---|
| `two-snow-removal-proposals-need-more-money` | Supported, high / high | Supported, high / moderate | Supported, moderate / moderate | Supported, Unanimous |

**What the seats found, in brief.** Under the primary readings, three
Administration proposals with stated new spending were on a published
agenda by 2026-08-27:
- the Fall 2025 active pathway snow removal and sidewalk repair package
  (FCS03158 Attachment 2, Council 2025-11-24, item 7.2);
- the parking ban enforcement package, from the same attachment and
  item;
- the Well Maintained City package (CO03513, on the 2026-08-31 committee
  agenda captured 2026-08-22).

In round 1 the seats counted differently: Claude counted four, with the
Attachment 10 enhancements once; Sol counted three; Luna counted two,
leaving out the parking ban package. In round 2 all three count three.

The result is definition-sensitive. Under the stricter cost reading,
which needs an identified approved budget and the increase against it,
the result is Contradicted, because no counted text states a baseline.
Under "exactly two" it is Partially supported. Under "considered by a
body" it stays Supported only if the parking ban package counts. Every
seat says a reader-facing "already put" or "already asked" must name the
agenda-placement rule. The amounts are proposals, not approvals or
spending. The Well Maintained City figures cover more than snow.

## 2026-10-02: drafted and checked, before the gate

**The page was drafted from the round files, the synthesis, the carry
manifest, the register and the archived sources, then read by two
faithfulness checks, a freshness audit and a plain-speech read; no finding
changed and the four parks stand.** The question page leads with the four
claims parked at framing, as lanes-and-congestion and council-hearing do,
and its standfirst answers the question people asked: nobody can tell from
the City records we found whether Edmonton plows bike lanes before streets.
The one finding, `sc-two-costed-snow-proposals` (register
`two-snow-removal-proposals-need-more-money`), is Supported, Unanimous. Its
question and answer name the timing rule, placement on a published council
or committee agenda, in the same sentence, and the answer carries the two
readings that change the result beside the verdict: no proposal states the
snow budget it would add to (Contradicted on the stricter cost reading), and
three were found where the comment said two (Partially supported on exactly
two). The body sets out every required alternative under "When the answer
changes", including that on the considered-by-a-body rule two still count
only with the parking-ban towing package. What administration proposed is
kept apart from what Council did: the minutes of the December 2025 budget
meeting record approval of the fall operating changes, 11 to 2, and no
operating budget amendment naming either snow package; the September 8,
2026 minutes record approval of policy C409L, not a funding decision.
Office-holders are named only for motions and votes; members of the public
do not appear. Counts under each reading are in
`scripts/calcs/snow-clearing.ts`, with a test pinning them to the prose.
The status is `pending-review`. winter-cycling and active-transportation
link to the page.

**The count.** Reported as the rounds support it: in round 1 the seats
counted two (GPT-6 Luna, which missed the towing package), three (GPT-6
Sol) and four (Claude Opus 5.5, which counted Attachment 10's optional
enhancements as a proposal of their own); in round 2 all three counted
three. The page calls the towing package the one contested classification
among the three identified, says the answer under the agenda rule does not
depend on it, and says the total could be higher because no seat could
search the whole meeting calendar.

Each report is committed with the editor's dispositions at its top:
`faithfulness/gpt-1.md` (GPT-6 Sol, 31 items, 29 adopted, 1 in part, 1
refused), `faithfulness/gpt-luna-1.md` (GPT-6 Luna, 15 items, all adopted),
`gate/freshness-audit.md` (GPT-6 Sol, 6 items, none changing the finding or
a park; no source added) and `plain-speech/gpt-1.md` (GPT-6 Sol, 11
rewrites, 2 as written and 9 modified). The faithfulness package carried the
carried texts whole except three long ones given as stated excerpts (the
budget minutes YF-EV-0302, report FCS03158 YF-EV-0303 and report CO03079
YF-EV-0308), to stay inside the GPT-6 seats' measured ceiling (D-0049); it
was 485,163 bytes. Nothing carried is committed.

**For the editor.**
- The claim's question, given as "Had City administration already put two
  snow-clearing proposals that need more spending before council?", now ends
  "on a published council or committee agenda?", because the brief's second
  revision requires every reader-facing "already put" to name its timing
  rule in the same sentence (faithfulness Sol 22).
- The freshness audit names the City's 2027-2030 budget timetable
  (proposed budget November 2026, deliberations December 2026) and two
  leads for the bike-lane park (the live clearing maps and the route-status
  dataset). None is archived or relied on. Whether the gate should archive
  the budget page and name the window, and whether the bike-lane park's
  reopen condition should name the dataset, are the editor's calls.

**Quality ledger (D-0048 rule 7).** The recorded failure modes in
`methodology/quality-ledger.yaml` were checked against the draft:

| Recorded failure mode | Earlier case | Result here |
|---|---|---|
| Fabricated citation, or a figure attributed to a source that lacks it | electric-buses, winter-cycling, infill-prices | Every figure was read from the carried texts into the calculation; the $9.94 million is labelled a calculation and the text's own figures are reported as printed. |
| A seat's miscount carried into the draft | council-hearing round 2 | The draft uses the round-2 count of three and reports the round-1 counts of two and four as the seats' own, with the reasons the round files give. |
| A stated rule presented as an outcome | winter-cycling | The procedure's deadlines are reported as deadlines, never as the order crews cleared; the bike-lane claim stays parked. |
| A funded or proposed figure presented as approved or achieved | climate-targets; D-0048 rule 6 | Every package figure is called proposed; Council's actions are limited to what its minutes record, and no amendment is said to have funded or refused a package beyond "none names either". |
| A media report treated as the document behind it | climate-targets | No media report is cited. |
| A source misclassified | fifteen-minute-districts | Labels come from the carry manifest; the uncarried Internet Archive copy carries none and the page says the reviewers did not read it. |
| Committee action described as Council's | active-transportation (gate) | The page names the Community and Public Services Committee for August 31 and City Council for November 25, December 1 to 4 and September 8, and reports the Council-alone reading separately. |
| Categorical wording beyond the instrument | fifteen-minute-districts | Absences are bounded to the records we found and the meetings searched; the count is "identified" and could be higher (faithfulness Luna 4, 5, 10). |

Nothing in the ledger's recorded modes is present in the draft as committed.
Four entries from this run's rounds are in the ledger as round-2
self-corrections (see the editor's decisions below): GPT-6 Luna's round-1
omission of the towing package and its reading of "unfunded" as a stated
increase; Claude Opus 5.5's round-1 count of the optional enhancements as a
fourth proposal and its side-by-side presentation of the active-pathway
figures.

**Labels.** On the built question page every carried source cited carries
its v1.43 label: YF-EV-0304 the sections label; YF-EV-0287, 0289, 0290,
0291, 0293, 0298, 0299, 0300 and 0302 the selected-items label; YF-EV-0294,
0295, 0296, 0303 and 0308 the document label. The claim page tags the same
sources. The uncarried sources (YF-EV-0241, 0281, 0288) carry none.

**Not yet done.** The publication gate and the critique of the rendered
page, which run as separate sessions.

## 2026-10-02: the editor's decisions on the drafting questions

- **The claim's question** ends "on a published council or committee
  agenda?". Accepted: the brief's second revision requires every
  reader-facing "already put" to name its timing rule in the same sentence.
- **The faithfulness package's excerpts** of YF-EV-0302, 0303 and 0308 are
  accepted as disclosed in the reports' headers.
- **The 2027-2030 budget timetable** from the freshness audit (proposed
  budget November 2026, deliberations December 2026) is not archived and not
  added: nothing on the page depends on those dates, which says only what
  report CO03513 says, that administration will bring the package to the
  2027-2030 budget deliberations.
- **The bike-lane park's reopen condition** stays as it is. The audit's
  route-status dataset and live maps have not been checked for
  snowfall-by-snowfall completion times, so naming them would describe a
  record nobody has read.
- **Quality ledger.** The four round-2 self-corrections above are entered in
  `methodology/quality-ledger.yaml` on this branch, which the ledger's
  exemption from the version rule (#120) allows.

## 2026-10-02: gate and critique, first pass; corrected

**The publication gate found nothing blocking and the critique three
required changes; all are corrected, no finding changed, and the four parks
stand.** Reports, each with the editor's dispositions at its top:
`gate/source-verification.md` (0 blocking, 4 advisory, all adopted),
`gate/release-check.md` (0 blocking, 1 advisory, adopted) and
`critique-1.md` (3 required, 5 suggested; phone test at 375 by 812). The
phone screenshots are kept outside the repository.

**What changed on the page.**
- The standfirst answers the question asked from the City's own procedure
  (YF-EV-0281) and keeps the bound: "Main bike lanes and some main roads
  have 24-hour targets, residential streets 10 days once plowing starts,
  but no record shows which crews actually clear first." The residential
  figure runs from the start of a blading cycle, not from the snowfall, as
  the procedure says.
- The TL;DR states the finding first: at least three proposals on council
  and committee agendas by August 27, 2026, what the December budget
  amendments did not name, the larger package that administration says it
  will bring to the 2027-2030 budget (CO03513), and that the match to "two"
  depends on how you count.
- The answer opens with the agenda rule and keeps the strict-budget and
  exactly-two readings in its next sentence. The claim page's share card is
  truncated by the site at about 160 characters, so the caveats are not on
  that card.
- The opening maps the five claims to the five people (gate A1), the CO03513
  wording is quoted rather than paraphrased as a quotation (A2), the August
  22 capture date is sourced to the archive address in `fetch-report.md`
  (A3, also on YF-EV-0288's archive note), and the active-transportation
  pointer names the agenda rule (A4). The 42-word quotation of FCS03158
  Attachment 2 is cut to 16 words in the claim and to the site's own words
  in the story (release A1). "The brief" is gone from reader text.

**Shared code.** The sections label reads the carried and total section
counts from the run's manifest: YF-EV-0304's label now says the reviewers
"saw only 4 of this document's 36 sections". A test covers it.

**Registry.** "The founder" is replaced with "a person" in the rights notes
of YF-EV-0294, 0295, 0296, 0303, 0304, 0305, 0306, 0307, 0308 and 0309, and
in YF-EV-0304's establishes text. The "site has not read its contents"
sentence is replaced in YF-EV-0294, 0295, 0296, 0303, 0304 and 0308, which
the page quotes. YF-EV-0288 gains an archive note on where its date comes
from. The carry manifests and this record keep the founder as the
downloader, since they are not rendered.

**Not changed, for the editor.** Other rendered pages still name the
founder: the changelogs of several published stories, the two source
capture pages, the earth-flat question and the methodology pages. They are
outside the registry and label scope of this pass.

**Not yet done.** The gate's and the critique's confirmations.
