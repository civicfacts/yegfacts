# Run record: council-pause-vote

Question: "Did council pause the future bike routes when its own
administration recommended it?" Register id `council-pause-vote`, source
`yegscoop-2026-08-26`, six accounts, all against. Methodology v1.40. This
record covers stage 1, framing, from the register entry to the brief's
final framing state: frozen on 2026-09-25 under methodology v1.20 after
three REVISE reports and a defect confirmation. No panel has run.

## What was done, in order

1. **Read the register and the capture.** The four claims under the
   question and every captured wording were read from `intake/register.yaml`
   and `intake/captures/yegscoop-2026-08-26/comments.jsonl`. The comment
   indexes are in `intake.md`. Six distinct people; one is a sitting
   councillor writing under her own name and appears under three of the
   four claims.

2. **Established what the public record holds before drafting.** The
   commenters say "council"; the meeting they were writing about was the
   Infrastructure Committee. So the first job was to find out what City
   Council, as distinct from the committee, did with report IS03688, and
   where the other two claims' facts live.
   - The committee's agenda and minutes of 2026-08-26 were already
     archived by the consultation run on 2026-09-25 and read there
     (`reviews/consultation-and-opposition/2026-09-03/verification/`). They
     were fetched again and ingested here so this run has its own record.
   - The eScribe calendar endpoint
     (`MeetingsCalendarView.aspx/GetCalendarMeetings`, a JSON request with a
     date range) lists every meeting. Every City Council and Executive
     Committee post-meeting minutes page from 2025-11-18 to 2026-09-22 was
     fetched and searched for "Active Transportation", "CM-20-0330",
     "IS03688", "Bike Plan" and "$50"; then every City Council minutes page
     from 2022-10-01 to 2025-10-01 was fetched and searched the same way.
     Meeting.aspx pages load for the site's fetcher; filestream.ashx files
     do not (HTTP 403, a browser check).
   - The searches found the recorded votes the brief names as the floor
     for claims 3 and 4: the December 2022 budget vote creating capital
     profile CM-20-0330, the borrowing bylaw readings of March and April
     2023 and of August and September 2025, the Fall 2023 and Fall 2024
     supplemental capital budget adjustment amendments moved by Principe
     and seconded by Rice, the September 2025 motion to cease construction
     pending a review, and the June and July 2026 motions on the 50 Street
     route. They found no City Council item on report IS03688 or its
     Attachment 5 between 2026-08-26 and the as-of date, only A. Salvador's
     notice of motion on programme funding, laid over from 2026-09-08 to
     2026-10-06, and the 2026-10-06 agenda as published on 2026-09-25
     carries the same notice and no report item.
   - Report IS03688, Attachment 3 and the three versions of Attachment 5
     were read with pdftotext from the browser download archived by the
     consultation run on 2026-09-25 and identified by hash in that run's
     `verification/escribe-archive-2026-09-25.md`. The archived committee
     agenda page maps each title to its DocumentId, which settles a point
     the consultation audit left open: 304032 is the original Attachment 5,
     304031 the replacement labelled Version 1 and 304030 the replacement
     labelled Version 2; the bytes registered as YF-EV-0140 (304030) match
     the Version 2 file.

3. **Staged and ingested every source relied on.** Thirteen meeting pages
   were fetched with `scripts/evidence-stage.ts --url` and ingested with
   `scripts/evidence-ingest.ts`, rights unclear, so all are private. The
   two Attachment 5 files that the fetcher cannot reach (original, 304032;
   Version 1, 304031) were placed in staging by hand from the 2026-09-25
   browser download, with manifest entries carrying the recorded hashes,
   and ingested the same way; the ingest script verified each hash against
   the bytes. Their registry notes say how they were obtained. The report
   (YF-EV-0118) and Version 2 of Attachment 5 (YF-EV-0140) were already in
   the registry from the consultation run and were not re-ingested.

   | ID | Source | Used for |
   |---|---|---|
   | YF-EV-0209 | Infrastructure Committee 2026-08-26, minutes | claim 1, V+ for claim 4 |
   | YF-EV-0210 | Infrastructure Committee 2026-08-26, agenda (attachment list with DocumentIds) | claim 2 |
   | YF-EV-0211 | City Council Budget 2023-11-21 to 28, minutes | claims 3, 4 |
   | YF-EV-0212 | City Council Budget 2024-12-02 to 03, minutes | claims 3, 4 |
   | YF-EV-0213 | City Council 2025-09-16 to 17, minutes | claims 3, 4 |
   | YF-EV-0214 | City Council 2026-07-07 to 08, minutes | V+ for claim 4 |
   | YF-EV-0215 | City Council 2026-09-08 to 16, minutes | claim 1 |
   | YF-EV-0216 | Executive Committee 2026-09-02, minutes | claim 1 |
   | YF-EV-0217 | Executive Committee 2026-06-30, minutes | V+ for claim 4 |
   | YF-EV-0218 | City Council 2023-03-14, minutes | claim 4 |
   | YF-EV-0219 | City Council 2023-04-17, minutes | claim 4 |
   | YF-EV-0220 | City Council 2025-08-19, minutes | claim 4 |
   | YF-EV-0221 | City Council 2026-10-06, agenda as published 2026-09-25 | claim 1 |
   | YF-EV-0222 | Attachment 5 to IS03688, original (304032) | claim 2 |
   | YF-EV-0223 | Attachment 5 to IS03688, replacement Version 1 (304031) | claim 2 |

   Already registered and relied on: YF-EV-0118 (report IS03688, 304024),
   YF-EV-0140 (Attachment 5 replacement Version 2, 304030), YF-EV-0131 and
   YF-EV-0204 (City Council Budget 2022-11-30 to 12-16, minutes).

4. **Drafted `intake.md` and `brief.md`** from the register entries and the
   archived sources only. The brief states no vote count, route count or
   bloc size; those are what the panel would establish.

## The decisions, and why

**Four claims, all framed, none parked at the brief.** Each has an
instrument that can reach every verdict: the minutes record motions and
named votes, and the report records what administration recommended. The
triage reason excluded councillors' motives, and the brief excludes them in
so many words; what is left of the "same seven" comments is a voting
pattern, which a vote table can show or fail to show.

**Claim 1: a committee is not Council.** The commenters wrote "council";
the body that sat was a committee of Council, and a recommendation that
committee does not carry never reaches Council. The brief fixes the
committee as the primary body because that is the meeting the commenters
were describing, and requires City Council as the alternative, with the
rule that a body that has not received a recommendation cannot have
rejected it. It also fixes three dispositions, adopting, rejecting and
leaving without a decision, because the holders' words ("ignore", "go
their own route") assert a choice, and a body that neither adopts nor
rejects has not been shown to have made one. Supported requires a
rejection as defined; non-adoption alone is Partially supported under the
primary reading and Supported under the required alternative, both
reported.

**Claim 2: three versions of one attachment.** The recommended approach
exists in three texts with the same title, and they differ in how firmly
they hold the routes back. The brief fixes the last replacement (Version
2) as the operative version, on the ground that a replacement supersedes
what it replaces, and requires the other two reported, with a
version-sensitivity statement. "Freezing" gets a primary reading (held
from proceeding pending evaluation or a further decision) and a stricter
alternative (removed from scope or not proceeding for a stated period).
The brief does not state how many routes are listed apart; the count is
part of the claim.

**Claim 3: the councillor's own account of her record.** The two named
councillors are named for motions moved and seconded and votes cast, which
the methodology treats as minutes questions, not accusations. "To $50M" is
given a band ($45 million to $55 million remaining) and an alternative (a
cut of at least half), because a motion that cuts more than half is a real
motion to cut and is still not "to $50M". "Redirect the rest to core
priorities" is a qualification, because whether a destination is a core
priority is not something the record answers.

**Claim 4: a pattern, not a motive.** The vote set is defined by a
mechanical rule over motion text (funding up or down; pause, cease,
continue or re-evaluate the programme as a whole), so that which side is
"the programme's side" is read off the motion and not off anyone's
intention. Single-route votes and committee votes go into an alternative
set, because the former cut both ways on their face and the latter cannot
show seven members but can break a member's pattern. Absences are the
verdict-sensitive rule: the primary rule lets an absence neither count for
nor against, the alternative breaks the pattern on an absence, and both
are reported. The bands (Supported at 7 or more, Partially supported at 4
to 6, Contradicted at 3 or fewer; alternative Partially at 5 or 6) are
judgement, and the brief says so.

**As-of date 2026-09-25**, the date of drafting, because the record for
claim 1 was still moving: a notice of motion naming Attachment 5 sat on
the 2026-10-06 Council agenda when the brief was written.

## Hashes

- `intake.md`, unchanged throughout:
  `702c82a833823f6a9e58f862094adb611220be49622ea3e6524f44fcce92a414`
- `brief.md` as sent to check 1:
  `f734a44c48e7a623065e6e85acdb2d94b542ce857152110d1fef9de2ce5e9611`;
  check 1 package
  `2b0c9300cfa2c7d61055898006c0500c93460e6638af5cb337d86912ea617df5`
- `brief.md` as sent to check 2:
  `117e3d6e4dfc629527895635f181ac73f1310d723e07f9e00e67eded93488f77`;
  check 2 package
  `56f1a80099e015bcf7fc7587625e8a2ac706cc7b1b7e53736144ff2c76b50d50`
- `brief.md` as sent to check 3:
  `b19f2740f50c13f41bd090930075d1f0f95d3807dea28aa7c13911b503d06eb8`;
  check 3 package
  `70b89d3c0704766b3441d38792d9525f37ae37f5df901f1fdb3c91298658ded8`
- `brief.md` as sent to the defect confirmation (check 4), after the one
  correction: `54ab605ceb72258c31a3f2d7967f3dc326518170d8404bc4b02e375a5ac46daf`;
  check 4 package
  `e4af9b92b6413f84bb98fd8f877c5ba2aa8da7c75cb7fc93afde557d6e7db13d`
- `brief.md` as frozen, after the four check 4 corrections and the status
  block: `c0f504b3d6a7ac303abb8f724eda9b415275f13c8e365bc34657da0136b09687`

## Stage 1, framing

**Checked by** `prompts/framing-check.md` on the OpenAI seat, GPT-6 Sol at
high, `codex --search exec -m gpt-6-sol -c model_reasoning_effort=high -s
read-only --skip-git-repo-check`, prompt on stdin, run from an empty
scratch directory with no repository access, live web search enabled. The
editor drafted on an Anthropic model, so the checker is from a different
vendor. Each package was the framing prompt, `intake.md`, the brief, the
verdict vocabulary from `docs/DESIGN.md` section 3 and
`prompts/review-schema.json`; re-checks added every previous report and
every author response. No package carried a local path. Reports are
committed unedited as `framing/check-N.md`; the editor's answers are
`framing/response-N.md`.

**Check 1** (18:39 to 18:44 UTC): REVISE. Three defects, corrected in
the checker's wording: an unclassifiable vote could be excluded from
claim 4's vote set while deciding its verdict (a completeness rule now
gives lower and upper bloc counts); claim 1's Not established row
overlapped Contradicted when committee minutes were missing but Council
had adopted the recommendation; claim 3's ladder left withdrawn or
never-put motions unclassified. Framing findings, all adopted: the budget
proposition dropped "redirect the rest", now tested as a named
destination; "future" was not in claim 2's decision rule, now "unbuilt"
is defined with a status date and required; the committee and Council
were being run together, now kept apart with an override strand reported
separately; re-evaluation could count as a freeze, now an express
deferral is required; "brought forward together" was too narrow, now
either councillor moving or seconding counts; the "same seven" could be
seven people observed thinly, now absence breaks the pattern; the
operative Attachment 5 version got a rule; the programme's budget at each
motion got a source; vote minima got alternatives; bundled motions got a
net-effect rule; the stakes and the reader-facing question were rewritten.
Response: `framing/response-1.md`.

**Check 2** (18:53 to 18:56 UTC): REVISE. One defect, corrected in the
checker's wording: claim 2's Not established row could fire on an
unidentified version that the operative-version rule had already
resolved, and on an unresolved status that was not the only obstacle.
Framing findings, all adopted: claim 1 could answer a question about a
hold without establishing that the recommendation was a hold, so the
claim now tests both and its ladder is split on that condition; the
"same seven" could still be assembled from members who never served
together, so the primary rule now requires service and a vote in both
terms; the as-of rule conflated a decision's date with its minutes'
publication; committee motions need no seconder; the stakes and the
reader-facing question followed. Three check 1 findings had been marked
WEAKENED and were re-answered. Under v1.12 this response is the editor's
written resolution: every finding adopted, none disputed. Response:
`framing/response-2.md`.

**Check 3** (18:59 to 19:02 UTC), the third and last report under the
cap: REVISE. Every earlier finding RESOLVED. One standing finding, a
defect on claim 2: the Partially supported row and the Contradicted row
both fired when Attachment 5 listed no routes for re-evaluation. The
checker supplied exact replacement wording and raised no framing finding,
and said itself that the report is eligible for the v1.20
defect-confirmation route. Response: `framing/response-3.md`.

**The v1.20 correction.** The editor replaced claim 2's Partially
supported bullet with the checker's text, changed the status block at the
head of the brief, and nothing else. The correction is recorded against
check 3's finding in `framing/response-3.md`, and the diff between the
brief check 3 read and the brief sent for confirmation went into the
confirmation package.

**Check 4, the defect confirmation** (19:03 to 19:07 UTC), the same seat
and pinned model as check 3, with a note naming the round and the diff
between the brief check 3 read and the corrected brief in the package:
DEFECTS REMAIN. The check 3 correction RESOLVED. No framing finding, no
cutoff reopened. Four further defects, each with exact replacement
wording: claim 1's no-hold ladder could give Contradicted and Not
established together when the version was unreadable but adoption was
documented; claim 2's Not established row overlapped Contradicted and
left a readable recommendation that did not ask for approval without a
row; claim 3's Not established row overlapped Partially supported when
one meeting's minutes were readable and another's were not; claim 4's
empty-term Not established overlapped Contradicted. Each is an order of
classification or a Not established rewrite, and the editor applied each
in the checker's wording and recorded it against its finding in
`framing/response-4.md`.

## Final state

**FROZEN 2026-09-25 under methodology v1.20.** Under v1.20 a defect
confirmation is the last report a brief gets: if it returns further
defects and no framing finding, the editor corrects them in the checker's
wording, records each, and the brief freezes. That is what happened. The
brief was not frozen on FRAME OK, which this record says plainly; it was
frozen on the fourth report's arithmetic corrections after the third
report had resolved every framing finding. No v1.35 park route and no
v1.39 wording route was needed or used, because no framing finding stood
after check 3.

All four claims go to the panel:

| Claim | Proposition, in short | Disposition |
|---|---|---|
| `council-rejected-pause` | The Infrastructure Committee rejected administration's recommended hold on the remaining routes rather than adopting it, and City Council had not adopted the hold by 2026-09-25; tested together with whether R proposed a hold at all | to the panel |
| `administration-recommended-freezing-14-routes` | In IS03688 administration recommended an approach that expressly defers construction or advancement of 14 named, unbuilt routes until a further evaluation, report or decision | to the panel |
| `motions-to-cut-budget-to-50-million-failed` | Between 2022-11-30 and 2026-09-25 Councillors Principe and Rice brought two motions at City Council that sought to leave about 50 million dollars in the programme and directed the released funds to named destinations, and Council defeated both | to the panel |
| `same-seven-councillors-vote-together` | Across the recorded Council votes on funding or continuing the programme, a fixed set of at least seven members who served before and after the October 2025 election each voted on the programme's side at every such vote while serving | to the panel |

No claim was parked. No panel round has run; the next step, when the
founder schedules it, is round 1 on the frozen brief under the current
pins (v1.37: Opus 5.5, GPT-6 Sol, GPT-6 Luna at high). One thing the
panel will meet that the checker met too: the eScribe file downloads
answer scripts with a browser check. The report and Attachment 5 are held
in the private archive under YF-EV-0118, YF-EV-0140, YF-EV-0222 and
YF-EV-0223, and a reviewer that cannot retrieve them must say so; the
brief says an inaccessible essential source stops a run.

**Register.** `council-pause-vote` moves to lifecycle `briefed`, triage
`go` unchanged, with a note pointing at this brief. The four claims carry
no state of their own.

**What is weak about this brief, said now.** The claims rest on minutes
pages that the site's fetcher can read and a report it cannot; the panel
seats have no shell and may not reach the PDFs either, and the run will
stop rather than guess if they cannot. The "same seven" bloc rule is
strict by design, and a Contradicted or Partially supported under it will
say something narrower than a reader might take it to say, which is why
the qualifications carry the alternatives and the per-member counts. And
the freeze came through v1.20's ending rather than FRAME OK: four ladder
rows were rewritten by the checker after the framing rounds ended, and
the editor's job was to paste them. The reports and the diffs are here
for anyone who wants to check that nothing else moved.

## 2026-09-28: round 1 with carried documents, stopped on an inaccessible essential source

**Round 1 ran on all three seats, and the run stops there.** Every seat
reported that it could not retrieve the controlling City minutes through
its web tool. The brief says an inaccessible essential source stops a run
rather than becoming a finding. No merge, cross-review or synthesis was
run, and no verdict below is a finding of this site.

**The package.** Under methodology v1.41 (D-0046) the package carried the
full extracted text of four council documents that sit behind the
portal's browser check, identical for every seat: report IS03688
(YF-EV-0118) and the three versions of Attachment 5 (YF-EV-0222,
YF-EV-0223, YF-EV-0140). Attachment 3 was excluded because the registry
holds no archived copy of it. The carry manifest was committed at 12e6cb7
before any seat ran, with sha256
`e4942ba37610c47df142a6db9ce96d6fd3486e988b4af897b1025d49ebeeab12`. Its
probe ran at 2026-09-28T16:53:51Z, when every carried document's public
URL answered the site's fetcher with HTTP 403 and a challenge header. The
carried section's sha256 was
`ec76a674ffafcd28f0858b2d49bcf4d237266607cd0dde1d7a05f33e53dd3380` for
every seat. The package was 111,825 bytes, sha256
`18014acfcac994d31d1d71824e1734e1ad6088e9a0596fb5008b2846792a78ec`, the
same for all three. All three seats launched from this checkout at commit
12e6cb7 between 16:57:19Z and 16:57:20Z. The runner refused nothing.

| Seat | Attempt | Outcome |
|---|---|---|
| Claude Opus 5.5 (`claude-opus-5-5`), high, Claude Code 2.1.283 | `9cb042ee7715bcbf`, 16:57Z to 17:10Z | admitted on one attempt; canary, research structure and context proof passed |
| GPT-6 Sol (`gpt-6-sol`), high, codex-cli 0.158.0 | `f8899b8bc92b6ab8`, 16:57Z to 17:07Z | admitted on one attempt; canary, research structure and context proof passed |
| GPT-6 Luna (`gpt-6-luna`), high, codex-cli 0.158.0 | `68bed04c27c6325a`, 16:57Z to 17:06Z | admitted on one attempt; canary, research structure and context proof passed |

What each seat returned, kept for the record only:

| Claim | Claude | GPT-6 Sol | GPT-6 Luna |
|---|---|---|---|
| `council-rejected-pause` | Partially supported, moderate | Partially supported, low | Not established, moderate |
| `administration-recommended-freezing-14-routes` | Partially supported, moderate | Partially supported, moderate | Not established, moderate |
| `motions-to-cut-budget-to-50-million-failed` | Partially supported, moderate | Partially supported, moderate | Partially supported, moderate |
| `same-seven-councillors-vote-together` | Not established, moderate | Not established, moderate | Not established, moderate |

No seat raised a framing concern.

**Why the run stops.** Every seat cites the carried report and Attachment 5
Version 2, so the carried documents reached them. The eScribe meeting pages
that the brief makes controlling for the motions and the votes did not.
The Claude seat wrote "ESSENTIAL SOURCE INACCESSIBLE" three times: for the
Infrastructure Committee minutes of 2026-08-26, for the Council minutes
behind the budget motions, and for every meeting in the claim 4 floor list.
Each of those pages answered its web tool with HTTP 403. It rested its
answers on the City's open-data voting record, which the brief allows only
as a cross-check. GPT-6 Sol and GPT-6 Luna wrote that the committee and
Council minutes could not be retrieved, and Luna could not query the
open-data vote rows either. All three also said Attachment 3, which was not
carried, could not be retrieved, so no seat could check each route's
construction status for claim 2.

The minutes pages were not carried because the site's own fetcher can read
them, and the carry rule covers only a document it cannot. The frozen brief
says "Meeting pages load", and at 17:11Z a request for the 2026-08-26
committee minutes page with the site fetcher's user agent got HTTP 200. The
seats' web tools got HTTP 403 from the same host.

**What reopens the run.** A fresh round 1 needs the controlling minutes to
reach the seats. Either the carry rule extends to a meeting page the seats'
tools cannot retrieve even when the site's fetcher can, or the pages become
retrievable to the seats. Claim 2 would also need an archived copy of
Attachment 3 to carry. That is a methodology decision for the editor and
the board, not one this run makes. The round 1 answers stay in `round1/`
as returned, with their rows in `run.yaml`. A restart moves them under a
superseded directory, as earlier runs did.

## 2026-09-28: round 1 superseded; restart under methodology v1.42

**The stopped round 1 is superseded, and round 1 runs again under v1.42
(D-0047), which carries selected agenda items from the eScribe meeting
pages the seats' tools cannot open.** The stopped round's answers
(`round1/`), its rows in `run.yaml` and the v1.41 carry manifest it ran on
(committed at 12e6cb7, sha256
`e4942ba37610c47df142a6db9ce96d6fd3486e988b4af897b1025d49ebeeab12`) move
unchanged to `superseded-2026-09-28/`, as `round1/`, `run.yaml` and
`carried-manifest.yaml`. Their answers are to the v1.41 package and are
kept for the record only; `run.yaml` starts again with no rows. The brief
is unchanged and still frozen at
`c0f504b3d6a7ac303abb8f724eda9b415275f13c8e365bc34657da0136b09687`.

`carried/gates.yaml` lists claim 4, `same-seven-councillors-vote-together`,
as the claim whose test needs every recorded vote, so the package cannot
pass while its vote reconciliation is pending. If that set cannot be
established or does not fit the 400 KB seat budget, claim 4 is parked for
the run and the run proceeds with claims 1 to 3.

**The carry manifest, built with its checks pending.** Under rule v1 the
manifest carries the four v1.41 documents and thirteen eScribe meeting
pages as selected items: the committee agenda and minutes of 2026-08-26,
the Council and Executive Committee minutes the brief names for claim 1,
and every meeting in the claim 4 floor list, including the 2022-11-30
budget minutes (YF-EV-0204). Each page qualifies because the Claude
seat's WebFetch was refused there with HTTP 403 in
`carried/seat-probes.yaml`; the two GPT-6 seats' probes are unclear, as
v1.42 expects, and do not count. The site's fetcher read every meeting
page and, this time, report IS03688 too, so that report is also carried
on the seat-refusal ground. The October 6 agenda (YF-EV-0221), the open
data about page (YF-EV-0224), the item-view duplicates of three minutes
pages and Attachment 3 are excluded, each with its reason in the
manifest. The completeness check, the personal-information screens, the
meeting pages' provenance and public-open checks, and the claim-4 gate
are pending; round 1 does not launch until they pass.

**Rule v2.** The independent completeness check of the v1 selection found
four relevant items the rule missed: the Executive Committee's item 10.1
of 2026-09-02 and Council's item 10.7 of 2026-07-07 (both Active
Transportation Implementation motions), the re-stated main budget motions
of 2022 (YF-EV-0204 item 15) and the vote on the Fall 2024 Supplemental
Capital Budget Adjustment (YF-EV-0212 item 5.1.3). Selection rule v2 adds
the terms "Active Transportation Implementation", "Capital Budget motion"
and "Supplemental Capital Budget Adjustment Motion", and the manifest was
rebuilt on every page under it. v2 carries exactly v1's items, the four
missed ones and one more, YF-EV-0212 item 5.1, which holds the same
adjustment motion as moved. The completeness check starts again on v2.
On this rebuild the site's fetcher was refused at report IS03688 again,
so every carried PDF now rests on the fetcher-challenge ground and the
meeting pages on the Claude seat's refusals.

## 2026-09-28: round 1 under methodology v1.42, held before round 2

**Round 1 ran on all three seats with the carried minutes items, and the
run is held there for the editor.** Every seat answered claims 1 to 3
Partially supported. Claim 4 was parked before the round and no seat
answered it. Several seats report City records they could not open that
are not in the carried set, so no merge, round 2 or synthesis has run
until the editor decides whether any of them is an essential source.

**The checks.** An independent read-only Claude Opus 5.5 session, not the
editor, read every item of every carried meeting page under rule v2 and
found no relevant item uncarried, screened the carried text for personal
information and found it clear, and regenerated every carried text to the
manifest's hashes. Its files are in `carried/checks/`. The meeting pages'
download provenance is the site's evidence fetcher on the registry's
retrieval date. Their public-open check is the fetcher's HTTP 200 on the
live page at build time; no person opened them in a browser. Claim 4
(`same-seven-councillors-vote-together`) is parked for this run under its
gate: the full set of relevant recorded votes depends on budget-adjustment
meetings and attachments that are not archived, and on bundled budget
votes whose relevance is unresolved, and depending on those the verdict
ranges from Not established to Contradicted (`carried/checks/gate.md`).
The editor accepted the park. The package told every seat so.

**The package.** The carry manifest was committed at 389ea18 with sha256
`2f29a255f9a7c611dc87491a46aa9027296db67d8fd7bd79ce4b46effd8b2435`. The
carried section's sha256 was
`d4c57f3d44ecc1ff7d5738c0cd797cdbad9c738552e09ec1f97c87e57bd580f0` and the
package's `6e7ed39269e1fc3cd792cd2b98a6ec5a3afb0ce4143a2efa3807dae7f061de1f`,
the same for every seat. The earliest probe the package rests on was the
Claude seat's refusal at 2026-09-28T19:14:35Z. All three seats launched
from this checkout at 389ea18 at 19:43:22Z. The runner refused nothing.

| Seat | Attempt | Outcome |
|---|---|---|
| Claude Opus 5.5 (`claude-opus-5-5`), high, Claude Code 2.1.284 | `aa19dfbc4ccaf72c`, 19:43Z to 19:50Z | admitted on one attempt under claude-safe-web-candidate-2.1.284 |
| GPT-6 Sol (`gpt-6-sol`), high, codex-cli 0.158.0 | `03ca282790e1e0f7`, 19:43Z to 19:53Z | admitted on one attempt |
| GPT-6 Luna (`gpt-6-luna`), high, codex-cli 0.158.0 | `99cd2fce9e5b6027`, 19:43Z to 19:50Z | admitted on one attempt |

| Claim | Claude | GPT-6 Sol | GPT-6 Luna |
|---|---|---|---|
| `council-rejected-pause` | Partially supported, high | Partially supported, moderate | Partially supported, moderate |
| `administration-recommended-freezing-14-routes` | Partially supported, moderate | Partially supported, moderate | Partially supported, moderate |
| `motions-to-cut-budget-to-50-million-failed` | Partially supported, moderate | Partially supported, high | Partially supported, moderate |
| `same-seven-councillors-vote-together` | parked, not asked | parked, not asked | parked, not asked |

No seat raised a MATERIAL FRAMING CONCERN, and no seat wrote that an
essential source was inaccessible.

**Why the run is held.** The seats read the carried minutes this time and
cite them. They also name records they could not open that the package
did not carry:

- Attachment 3, the route status record (DocumentIds 304029 and 304028),
  named by all three seats. It has no archived copy. The manifest excludes
  it as not an essential source, and the Claude seat says its claim 2
  verdict does not depend on it under Version 2.
- The Council public hearings of 2026-09-15 and 2026-09-22 and the
  2026-10-06 Council agenda, named by the Claude and GPT-6 Sol seats for
  claim 1. The brief lists all three. The hearings have no archived copy;
  the agenda is archived as YF-EV-0221 and was excluded from the carried
  set. Sol writes that without them the absence of a Council decision
  through 2026-09-25 remains unverified.
- The portal's meeting calendar, and the capital profile and adjustment
  attachments, named by the Claude seat for claims 1 and 3 and by GPT-6
  Luna for claim 3.

The brief stops a run on an inaccessible essential source. Whether any of
these is essential is the editor's decision, so the run waits for it. The
round 1 answers stay in `round1/` with their rows in `run.yaml`.

## 2026-09-28: the held round 1 superseded; Attachment 3 carried

**The editor ruled Attachment 3 essential and the other uncarried records
not essential, so the held round 1 is superseded and round 1 runs again
with Attachment 3 carried.** The held round's answers (`round1/`), its
rows in `run.yaml` and the manifest it ran on move unchanged to
`superseded-2026-09-28b/`, as `round1/`, `run.yaml` and
`carried-manifest.yaml`. They are kept for the record only.

The editor's rulings, with the reasons:

- **Attachment 3, DocumentIds 304029 (original) and 304028 (REPLACEMENT):
  essential.** The brief's primary route-status date for claim 2 is the
  status Attachment 3 states, and the brief names both versions by the
  portal's URL template and their DocumentIds (lines 403 to 404 and 829).
  Both are now carried.
- **The Council public hearings of 2026-09-15 and 2026-09-22: not
  essential.** They bear only on the Council strand of claim 1, which is
  the brief's required alternative; the committee is the primary body.
  The brief names them by date only, with no URL or meeting id, so the
  carry rule cannot reach them. Seats report the gap as a limitation.
- **The 2026-10-06 Council agenda (YF-EV-0221): not essential.** It was
  published on the as-of date and cannot show a decision made before it.
  The manifest's exclusion reason now says so.
- **The portal's meeting calendar, the capital profile sheet and the
  budget-adjustment attachments: not essential.** The brief's floor list
  defines the meeting search, and every seat reached a claim 3 verdict
  without them. Seats report them as limitations.

**Attachment 3 in the registry.** The founder downloaded both versions in
a browser on 2026-09-25, and their SHA-256 values match those recorded in
`reviews/consultation-and-opposition/2026-09-03/verification/escribe-archive-2026-09-25.md`.
They are registered as YF-EV-0225 (original, 304029) and YF-EV-0226
(REPLACEMENT, 304028), private because their redistribution rights are
unclear. The two differ only in their label and in one closing sentence
about routes with no delivery plan.

**The rebuilt manifest.** Every carried URL was probed again through all
three seats at 2026-09-28T19:59Z; the Claude seat's WebFetch was refused
with HTTP 403 at every one, including both Attachment 3 URLs, and the
GPT-6 seats' probes are unclear, as before. The site's fetcher got a
challenge-signed 403 at all six PDFs, and the committee agenda still
lists both Attachment 3 files under their archived titles. Every other
document's checks carried over unchanged because its archive and text
hashes did not change, and claim 4 stays parked. For the two Attachment 3
rows the download provenance is recorded; the public-open check, the
second download, the extraction check and the personal-information screen
are pending, and round 1 does not launch until they pass.

## 2026-09-29: Attachment 3 checked; the 2026-09-08 minutes changed and were archived again

**Attachment 3 passed its checks, but the rebuild before launch found that
the City had changed the Council minutes of 2026-09-08, so round 1 waits
for that page's checks.** The change does not touch the program: the
carried text of the page is byte-identical. The rule still requires the
page to be archived again and checked again, because the completeness
check was made against the earlier copy.

**Attachment 3.** The founder opened both Attachment 3 URLs in an
ordinary browser on 2026-09-29 and downloaded them again. Both downloads
are byte-identical to the 2026-09-25 archive, which shows the City's files
are unchanged, but the same person made both downloads, so the second
download is recorded as not made. The independent read-only checker
found both versions extracted in full: all three pages of each, every
route row and footnotes 1 to 4, and a fresh extraction byte-identical to
the carried text. It found no personal information about a private
individual (`carried/checks/attachment3.md`).

**The re-probe.** The earlier probes had expired, so every carried URL
was probed again through all three seats between 2026-09-29T22:47:05Z and
22:49:53Z. The Claude seat's WebFetch was refused with HTTP 403 at all 19;
the GPT-6 seats' probes were unclear, as before.

**The changed page.** On the rebuild the site's fetcher found that the
live post-meeting minutes of 2026-09-08 (YF-EV-0215) no longer matched
the archived copy in three items: new document links for the
attachments of items 7.7 (public art policy) and 7.11 (climate
priorities), and one restored line of motion wording in item 11.1
(property tax communication). None concerns the program, and the only
carried item, 11.6, is unchanged. The page was archived again on
2026-09-29 as YF-EV-0227, which is carried instead of YF-EV-0215. Its
carried text hashes to the same value as before
(`4d4b6bae8671f5f6ff988e5566d90e7379c9d2df49df3848af0a69bfd4f55538`).
Every other document's archive, text, item index and checks are
unchanged, and claim 4 stays parked. YF-EV-0227's completeness check and
personal-information screen are pending, and the package refuses to
assemble until someone other than the editor makes them.

## 2026-09-29: rounds 1 and 2 under methodology v1.42, stopped on a framing concern

**Both rounds ran on all three seats, and the run stops before synthesis
because the Claude seat raised a MATERIAL FRAMING CONCERN in round 2 on
claim 2.** Every seat answered claims 1 to 3 Partially supported in both
rounds. Claim 4 was parked for the run under its gate and no seat
answered it. `scripts/synthesize.ts` halts on the concern and wrote
nothing. No verdict below is a finding of this site.

**The checks.** After the independent checker passed YF-EV-0227
(`carried/checks/completeness-0227.yaml` and `check-0227.md`), its item
reasons, completeness check and personal-information screen went into the
manifest, which was committed at dd8d16c. All three seats launched from
that commit.

**Round 1.** The package's earliest probe was the Claude seat's refusal
at 2026-09-29T22:47:26Z. The carried section's sha256 was
`da1fa193d84fd3ad1e24902b6e4153b2ea76494b77c099a3909c651f29015a22` and
the package's
`08fc784a340719e7c0cf2a12a7f93e655628a68ecf1161c030c69b6e49881e9e`, the
same for every seat. The runner refused nothing.

| Seat | Attempt | Outcome |
|---|---|---|
| Claude Opus 5.5 (`claude-opus-5-5`), high, Claude Code 2.1.285 | `eb8ebfb5d1a60f24`, 22:55Z to 23:02Z | admitted on one attempt under claude-safe-web-candidate-2.1.285 |
| GPT-6 Sol (`gpt-6-sol`), high, codex-cli 0.159.0 | `1642738e69cfc73d`, 22:55Z to 23:04Z | admitted on one attempt |
| GPT-6 Luna (`gpt-6-luna`), high, codex-cli 0.159.0 | `3e3f0e8ebc1eeffb`, 22:55Z to 23:02Z | admitted on one attempt |

No seat raised a framing concern in round 1 or wrote that an essential
source was inaccessible. The seats named as limitations the records the
editor had ruled not essential: the September public hearings, the
October 6 agenda, the portal calendar and the capital profile and
budget-adjustment attachments. The Claude seat also could not open a City
project page that a news report cites; it treated that report as a lead
only. The merge found 14 distinct sources and no contested claim
(`combined-evidence.json`, `disagreements.json`); evidence staging
archived 8 and not the 6 portal file downloads (`fetch-report.md`).

**Round 2.** Before round 2 every carried URL was probed again through
all three seats, from 2026-09-29T23:05:50Z; the Claude seat's WebFetch was
refused with HTTP 403 at all 19 and the GPT-6 seats' probes were unclear.
The rebuilt manifest, committed at 2e52ee7, has the same hashes, checks,
item indexes, gate and exclusions as round 1's, and the same carried
section, sha256 `da1fa193d84f…`. Its earliest probe was 23:06:10Z. All
three seats launched from 2e52ee7 at 23:09:23Z and each was admitted on
one attempt: Claude `60ab218c56c14d23` (to 23:14Z), GPT-6 Sol
`5612f3846cb27d57` (to 23:18Z) and GPT-6 Luna `c5e932bc24cc8aa8` (to
23:16Z).

| Claim | Claude, round 1 / 2 | GPT-6 Sol, round 1 / 2 | GPT-6 Luna, round 1 / 2 |
|---|---|---|---|
| `council-rejected-pause` | Partially supported, high / moderate | Partially supported, moderate / moderate | Partially supported, moderate / moderate |
| `administration-recommended-freezing-14-routes` | Partially supported, moderate / moderate | Partially supported, moderate / moderate | Partially supported, moderate / moderate |
| `motions-to-cut-budget-to-50-million-failed` | Partially supported, moderate / moderate | Partially supported, high / moderate | Partially supported, moderate / moderate |
| `same-seven-councillors-vote-together` | parked, not asked | parked, not asked | parked, not asked |

**The concern.** In round 2 the Claude seat kept claim 2 at Partially
supported and raised a MATERIAL FRAMING CONCERN against the brief's
express-deferral test. Version 2 of Attachment 5 says the routes that do
not affect travel lanes or parking "will continue as planned" and that
"the remaining routes" will be evaluated and reported on in Q1 2027 "for
Council direction and approval". Read with the report's "best postponed to
2027" and Attachment 3's footnote 2, which says tendered routes "may be
delayed ... or removed ... pending this Council report", the seat reads
the practical effect as the 14 routes not proceeding as planned until
Council gives direction. The brief's requirement that the deferral be
express excludes that implication, and the seat says that exclusion is
what separates Partially supported from Supported. It asks that any story
say Version 2 implies, but does not state, that the 14 wait. The concern
rests on Attachment 3, which this round carried for the first time.

Under the brief and the method, a framing concern stops synthesis until
the brief is revised or the concern is answered. That decision belongs to
the editor. The answers stay in `round1/` and `round2/` with their rows
in `run.yaml`.
