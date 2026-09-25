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
