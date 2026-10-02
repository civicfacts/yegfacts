# Run record: council-hearing

Question: "Who showed up to speak on the bike lanes at council, and who
organized them?" Register id `council-hearing`, source
`yegscoop-2026-08-26`, eleven accounts, five under the for-side claim and
six under the two against-side claims. Methodology v1.42. This record
covers stage 1, framing, from the register entry to the brief's final
framing state. No panel has run.

## What was done, in order

1. **Read the register and the capture.** The three claims under the
   question and every captured wording were read from `intake/register.yaml`
   and `intake/captures/yegscoop-2026-08-26/comments.jsonl`, with the
   parent comment of each reply. The comment indexes are in `intake.md`.
   Eleven distinct people; none appears under more than one claim; every
   one writes under a pseudonym, and the editor checked each of the eleven
   against the capture before writing. One wording names a sitting
   office-holder as the person who paid the speakers; that sentence is
   described in `intake.md` and quoted nowhere.

2. **Established what the public record holds before drafting.** The
   triage reason assumed two records: a hearing record that establishes
   the speaker balance and the time limit, and a lobbyist registry that
   could link the supporters to organized lobbying.
   - The hearing record exists and the site already held it: the
     Infrastructure Committee's post-meeting minutes of 2026-08-26
     (YF-EV-0209) and agenda page (YF-EV-0210), archived on 2026-09-25 for
     the council-pause-vote run. The minutes record, under item 1.4, a
     motion adjusting the time limits in section 38 of the Council
     Procedures Bylaw for that meeting, with its mover, the names voting
     and the result; under item 2.3 a Requests to Speak motion listing by
     item and by panel every person the committee agreed to hear, with any
     organization given; and under item 7.6 the lists of public speakers
     who presented, by panel. They record no speaker's position. The
     page's video link points at the portal's player; the site has not
     archived the recording and the panel's tools cannot play it.
   - The standing limit the motion departed from is in Bylaw 18155, the
     Council Procedures Bylaw, section 38(1), in the City's consolidation
     of 2025-10-29, which the site's fetcher reads from edmonton.ca.
   - The lobbyist registry the reason named does not cover this hearing.
     Alberta's Lobbyists Act defines lobbying and public office holders by
     reference to provincial decision-makers (sections 1(1)(f) and (k)),
     and separately exempts municipal officials acting in their official
     capacity (section 3(1)(c) and (d)); the editor first read the
     exemption as the boundary and the framing checker corrected that.
     The City publishes one lobbyist registry on its open data portal, the
     Mayor's Lobbyist Registry, described as voluntary for the 2017-2021
     term; its export on 2026-10-02 holds 758 rows dated 2017-11-07 to
     2021-09-15 and none later. A search of Edmonton's open data for
     lobbyist datasets found nothing else. No registry in force records
     lobbying of City Council or its committees.
   - A per-speaker record of position was looked for and not found. The
     one contemporaneous news report the fetcher could archive, CBC's as
     republished by Yahoo News Canada, describes the balance of the room
     in words and gives no count; CBC's own page refused the fetcher.

3. **Staged and ingested every new source relied on.** Every source was
   fetched with `scripts/evidence-stage.ts --url` and ingested with
   `scripts/evidence-ingest.ts`, rights unclear, so all are private. The
   ids start above the highest on `origin/main` (YF-EV-0250), checked
   against every remote branch first.

   | ID | Source | Used for |
   |---|---|---|
   | YF-EV-0251 | Bylaw 18155, Council Procedures Bylaw, consolidation of 2025-10-29 | the standing limit, section 38; the waiver rule, section 4 |
   | YF-EV-0252 | Lobbyists Act, SA 2007 c L-20.5, consolidation current as of 2022-12-15 | the second parked claim's reason |
   | YF-EV-0253 | Mayor's Lobbyist Registry, dataset metadata | the second parked claim's reason |
   | YF-EV-0254 | Mayor's Lobbyist Registry, all rows exported 2026-10-02 | the second parked claim's reason |
   | YF-EV-0255 | CBC News report of 2026-08-26, as republished by Yahoo News Canada | the first parked claim's reason |

   Already registered and relied on: YF-EV-0209 (the minutes) and
   YF-EV-0210 (the agenda page). Staged and not ingested: the Ethics
   Commissioner's registry page and the Edmonton open data search listing,
   read to confirm no other registry exists; neither is cited.

4. **Drafted `intake.md` and `brief.md`** from the register entries and the
   archived sources only. The brief states no count of speakers, panels or
   minutes and no motion result; those are what the panel would establish.

## The decisions, and why

**One claim framed, two parked at the brief.** The task was to take every
claim whose verdict is reachable from named records in both directions to
the panel, and to park the rest under methodology v1.24 with a reason and
a reopen condition.

**Claim 1, `more-speakers-in-favour-at-hearing`: parked.** Five people,
one asserting that supporters outnumbered opponents and four answering
that the supporters were few or only there because they do not work. The
record that could settle it is a per-speaker record of position, and none
exists that the panel can read: the minutes list who spoke and not which
way; the City's video recording is not archived and the panel's tools
cannot play it, and the editor transcribing every speaker's position from
it would be the editor's research standing in for the panel's; the news
report describes the balance in words without a count, and a news report
is a lead to the City record behind it, never the source of a
classification, and here there is no City record behind it. So the only
verdict available is Not established, decided by the shape of the record.
It reopens on a record of each public speaker's position on item 7.6 that
the panel can read: the City's recording archived by the site with each
speaker's position transcribed and checked by someone other than the
editor, a City record of positions, or the speakers' own written
submissions covering enough of the list to count. What the minutes do say
about who showed up, how many spoke and how many under an organization's
name, is reported under the claim under review.

**Claim 2, `hearing-supporters-and-lobby-groups`: parked.** Three strands.
"Paid": no public record states who, if anyone, paid any speaker, and no
record could show nobody did; two triage readers refused the claim on that
ground before the question was grouped, and the question's GO reason said
to drop it unless a lobbyist registry linked the groups directly.
"Lobbyists": the registries that exist do not cover lobbying of City
Council, as set out above. "Special interest groups": that organizations
spoke is what the minutes show where a speaker gave one, and nobody in the
source disputes it; that they are "special interest" is a
characterisation. It reopens if a registry covering lobbying of City
Council or its committees comes into force and links a named organization
to this hearing, or if a public record states that any speaker was paid to
attend. The sentence naming an office-holder as the payer is neither tested
nor quoted.

**Claim 3, `speaking-time-cut-to-three-minutes`: tested.** One person, in
an aside inside a reply about arterial roads. Two of its four assertions
are checkable against named records in both directions: the cut from five
minutes to three, against section 38(1) of the bylaw and the item 1.4
motion, and the size of the queue, against the Requests to Speak motion.
The reason the holder gives, "due to a high volume of complaints from all
over the city", is motive and characterisation and is excluded; "most
concerns from the area have been ignored" is the outcome council-pause-vote
tested. The magnitude is tested as a band around the holder's figure of
seventy, 60 to 80 entries on the item's list with 50 to 90 as the
alternative, after the framing checker found the editor's one-sided
threshold of 60 or more tested "a large queue" rather than the figure
given. Counts are entries, not persons, because the names of members of the
public in carried minutes items are all replaced with one identical label,
so a person cannot be matched across lists; the checker allowed that
alternative. Whole-meeting and spoke-only counts are required alternatives.

**Privacy.** The minutes name dozens of members of the public. The brief,
the intake record and this record name none of them and never will;
reviewers report counts and organizations only, and the carried text
withholds the names mechanically under methodology v1.42. Names of members
of Council and City staff in role stay. The news report names several
speakers; the registry entry's rights note says the site withholds them.

**As-of date 2026-08-26**, the meeting, because the claim is about what
one committee did at one meeting and the standing rule is the bylaw as it
stood that day.

## What the panel will need carried

The panel seats cannot open eScribe pages (the framing checker was refused
there too). The brief names the minutes and agenda pages by the portal's
`Meeting.aspx?Agenda=PostMinutes&Id=<meeting id>&lang=English` template
with meeting id `55300824-2d70-4b6a-a504-df43ace1c6b4`, so both can be
carried under methodology v1.42. The items the claim needs are 1.4
(adoption of the agenda, which holds the time-limit motion), 2.3 (Requests
to Speak) and 7.6; each names the programme or contains "bike", so the
published selection rule picks them, and the completeness check by someone
other than the editor runs before any package. The bylaw is on edmonton.ca
and the fetcher reads it; the seats' tools should too. No eScribe filestream
document is essential to this brief.

## Hashes

- `intake.md`, unchanged throughout:
  `90102f9332a9a7fdf85a3bdc5846b64675621330ee2586a90a57b6b38cef5123`
- `brief.md` as sent to check 1:
  `66d0fd1e09621920631cca8fbf4dc16f151722f2e210b5497ca7e077ec9736e2`;
  check 1 package
  `539aff85ec2061161ea80fad646a406a7f1f6753a57ba5c881ab5e9fbfb7bf3f`
- `brief.md` as sent to check 2:
  `023e63c673f3a4d754d1fd5c771c4d8b1cf4c0417a1894ccb978a37d3a4f63a6`;
  check 2 package
  `6a1aeb162ec409e0ae1541f39f28e2e9dbb276977e88f64dda9c8dfa1be12c5c`
- `brief.md` as sent to check 3:
  `2b4e4926adfb4c8aeddfe9945e05d851e55ae09bcd00c3993c418b692b8f5205`;
  check 3 package
  `37f9bd4c8491655cbb01bf37e6695fdb96e08a0d6e0212e3e5d5557c2a011727`
- `brief.md` as frozen: the check 3 text with only the status block
  changed,
  `292e2d7d1a214fdd29985d483dc2c95e15da217311716ef86057be8a00ec5c0f`

## Stage 1, framing

**Checked by** `prompts/framing-check.md` on the OpenAI seat, GPT-6 Sol at
high, `codex --search exec -m gpt-6-sol -c model_reasoning_effort=high -s
read-only --skip-git-repo-check`, codex-cli 0.159.3, prompt on stdin, run
from an empty scratch directory with no repository access, live web search
enabled. The editor drafted on an Anthropic model, so the checker is from
a different vendor. Each package was the framing prompt, `intake.md`, the
brief, the verdict vocabulary from `docs/DESIGN.md` section 3 and
`prompts/review-schema.json`; re-checks add every previous report and
every author response. Every package was scanned for local paths before it
was sent and none carried one. Reports are committed unedited as
`framing/check-N.md`; the editor's answers are `framing/response-N.md`.
Times are UTC; the evening of 2026-10-01 in Edmonton falls on 2026-10-02
UTC.

**Check 1** (07:38 to 07:42 UTC, 2026-10-02): REVISE. One defect,
corrected in the checker's wording: the ladder left a cut from five
minutes to four, or from four to three, or a motion covering only some
speakers, in no row; the checker's single classification block replaces
the four rows. Framing findings, all adopted: the holder's reason, "due to
a high volume of complaints", had been converted into queue size and is now
an excluded part of the comment, in the checker's sentences; "about
seventy" had been a one-sided threshold of 60 or more, now bands of 60 to
80 and 50 to 90 in the checker's words; distinct-person counts cannot be
made from carried text whose withheld names are all the same label, so
every count is now a count of entries, the alternative the checker allowed,
because changing the withholding tool is a methodology change; the brief
had misread section 3(1)(c) and (d) of the Lobbyists Act as the boundary
of the registry, now the Act's definitions of lobbying and public office
holder are quoted and the checker's explanation stands in both places; the
title promised an answer to who showed up and who organized them, now the
title is the checker's and the two unanswered questions open the brief;
the stakes said Supported would establish a cut for every speaker when the
ladder did not require it, now the stakes are the checker's. Response:
`framing/response-1.md`.

**Check 2** (07:47 to 07:50 UTC): REVISE. Every check 1 finding RESOLVED
except the ladder defect, marked WEAKENED: the checker's own block from
check 1 still left readable but incomplete minutes without a row, and its
first sentence contradicted the brief's rule that an inaccessible essential
source stops the run. One defect, corrected in the checker's wording: the
ladder's first sentence is replaced with two of the checker's, so an
inaccessible source stops the run with no verdict, and with both sources
readable Not established covers an undeterminable standing limit, an
unknown disposition and minutes too incomplete to establish either that a
reduction was carried or that none was. The editor diffed the applied
passage against the report and they are identical. No framing finding.
Under v1.12 this response is the editor's written resolution: the one
finding adopted, none disputed. Response: `framing/response-2.md`.

**Check 3** (07:51 to 07:53 UTC), the third and last report under the
cap: FRAME OK. Every earlier finding RESOLVED, every check OK, no finding
raised. The checker said again that it could not open the City's meeting
pages through its web access and that this is not evidence they are absent.

## Final state

**FROZEN 2026-10-02 on FRAME OK at framing check 3.** The brief's text is
the text check 3 read, with only the status block changed. No v1.20, v1.35
or v1.39 route was needed or used. The next step, when the founder
schedules it, is round 1 on the frozen brief under the current pins
(v1.37: Opus 5.5, GPT-6 Sol, GPT-6 Luna at high), with the minutes and
agenda pages carried under v1.42 if the seats are refused there, as the
checker was.

| Claim | Proposition, in short | Disposition |
|---|---|---|
| `speaking-time-cut-to-three-minutes` | At its meeting of 2026-08-26 the Infrastructure Committee carried a motion reducing each approved public speaker's time from the bylaw's five minutes to a maximum of three for that meeting, at a meeting for which about seventy people, 60 to 80 entries on its list, had been approved to speak on the bike-lane item | to the panel |
| `more-speakers-in-favour-at-hearing` | More people spoke in favour of the bike lanes at the hearing than against them | parked at framing before any check: the minutes list who spoke and not which way, and no record the panel can read gives each speaker's position; reopens on such a record |
| `hearing-supporters-and-lobby-groups` | The pro bike lane people at the meeting were paid or organized by special interest groups and lobbyists | parked at framing before any check: no public record states who paid any speaker, and no lobbyist registry in force covers lobbying of City Council; reopens on such a registry entry or a payment record |

The checker raised no objection to either park across three reports and
marked checkability and scope OK on the final report.

**Register.** `council-hearing` moves to lifecycle `briefed`, triage `go`
unchanged, with a note pointing at this brief. The two parked claims carry
`triage: park`, `ground: no-instrument`, `parked_at: framing` and their
reasons on their own entries, as methodology v1.35 records a park decided
at framing. The tested claim carries no state of its own.

**What is weak about this, said now.** The question people asked, who
showed up and who sent them, is the part this brief does not answer; what
goes to the panel is the one checkable aside from a single commenter, and
the page that results must lead with the parks so no reader takes a verdict
on speaking time for an answer about the room. The brief's title was
changed by the checker to say so, and the register keeps the grouped
question's wording as the record of what the thread asked. The parks rest
on the editor's search for a record of positions and a registry in force;
both searches are bounded by what the fetcher could reach on 2026-10-02 and
are stated with their reopen conditions so anyone with the record can
reopen them. The brief froze on FRAME OK after two defect corrections
pasted from the checker and one park alternative the checker allowed; the
reports and the hashes are here for anyone who wants to check that nothing
else moved after check 3.

## 2026-10-02: round 1 with the minutes carried, stopped on an inaccessible essential source

**Round 1 ran on all three seats, and the run stops there.** Every seat
reported that a direct request for the bylaw, Bylaw 18155 at
`https://www.edmonton.ca/sites/default/files/public-files/assets/Bylaws/C18155.pdf`,
returned HTTP 502. Each seat read sections 1, 2, 4 and 38 only through
search-engine extracts and could not read the consolidation's list of
amendments, which the brief requires. The brief makes the bylaw an
essential source, and an inaccessible essential source stops a run rather
than becoming a finding. No merge, round 2 or synthesis was run, and no
verdict below is a finding of this site.

**The carried pages and their checks.** Under methodology v1.42 the
package carried the committee's post-meeting minutes (YF-EV-0209) and
agenda page (YF-EV-0210) of 2026-08-26 as the items selection rule v2
picks: minutes items 1.4, 2.3, 2.4, 7.6, 11.1 and 11.2, and agenda item
7.6. Both pages qualify because the Claude seat's WebFetch was refused
there with HTTP 403 (`carried/seat-probes.yaml`); the GPT-6 seats' probes
were unclear, as v1.42 expects. The other sources the brief names were
probed through all three seats on 2026-10-02 from 08:05Z: the bylaw, the
Lobbyists Act, the open data dataset page and the Yahoo News page each
answered the Claude seat's WebFetch and the site's fetcher with HTTP 200,
so none qualifies, and the reasons are in the manifest's exclusions. The
portal root refused the Claude seat (HTTP 403), but the brief names the
earlier meetings for qualification 9 only by template, so the carry rule
cannot reach them. `carried/gates.yaml` lists no claim, because the one
claim under review turns on one motion, one list and one bylaw section,
not on every recorded vote.

An independent read-only Claude Opus 5.5 session, not the editor, read
every item of both pages against this brief (`carried/checks/`). It found
no relevant item uncarried under rule v2, including minutes items 7.1,
7.3 and 7.4, which list presenters on other items and hold no
speaking-time motion. It found the carried text clear of personal
information: 136 entries read "[member of the public]", and no name from
the unredacted lists survives. Download provenance is the site's evidence
fetcher on the registry's retrieval date. The public-open check is the
fetcher's HTTP 200 on the live page at build time; no person opened
either page in a browser.

**The package.** Before launch both carried pages were probed again; the
Claude seat's WebFetch was refused with HTTP 403 at 08:14:50Z and
08:15:22Z. The rebuilt manifest differs from the checked one only in its
probe times, and was committed at 9cdd025 with sha256
`1ed94e171da6243977f8c10d9329d4555247f4f9d457868314bf6ff53cb33be8`. The
carried section's sha256 was
`33fba2c8d690be9e888be40e599e9abee598a8ab2b89a1e38964f25f6e39b7c7` and
the package's
`dcbb16d09c8398e12a5c338672fec98d169a856cac472c087ccd42870ad90109`,
71,010 bytes, the same for every seat. The earliest probe the package
rests on was 2026-10-02T08:14:50Z. All three seats launched from 9cdd025
at 08:16:27Z. The runner refused nothing.

| Seat | Attempt | Outcome |
|---|---|---|
| Claude Opus 5.5 (`claude-opus-5-5`), high, Claude Code 2.1.287 | `83f35b7860b60fd3`, 08:16Z to 08:20Z | admitted on one attempt under claude-safe-web-candidate-2.1.287 |
| GPT-6 Sol (`gpt-6-sol`), high, codex-cli 0.159.3 | `184fd7d4b8ec578f`, 08:16Z to 08:24Z | admitted on one attempt under codex-captured-read-only-0.159.3 |
| GPT-6 Luna (`gpt-6-luna`), high, codex-cli 0.159.3 | `e62a801f94af77d4`, 08:16Z to 08:23Z | admitted on one attempt under codex-captured-read-only-0.159.3 |

What each seat returned, kept for the record only:

| Claim | Claude | GPT-6 Sol | GPT-6 Luna |
|---|---|---|---|
| `speaking-time-cut-to-three-minutes` | Supported, moderate | Supported, moderate | Supported, high |

No seat raised a MATERIAL FRAMING CONCERN.

**Why the run stops.** All three seats cite the carried minutes, so the
carried text reached them. The bylaw did not. The Claude seat reports
HTTP 502 on four direct fetches, and the edmonton.ca bylaw index and the
Clerk's FAQ returned 502 too; it writes that if a source read only through
search extracts counts as inaccessible, the stop rule applies. GPT-6 Sol
and GPT-6 Luna each report HTTP 502 on a direct request and say they could
not read the full amendment history. The brief requires reviewers to
confirm from the consolidation's own list of amendments that nothing after
2025-10-29 bears on section 38, so that check was not made from the
source. The bylaw was not carried because it qualified on neither ground:
at 08:06Z the Claude seat's WebFetch and at 08:09Z the site's fetcher both
got HTTP 200. After the round, at 08:25Z and 08:26Z, both got HTTP 200
again, so the failure appears to have been during the round only. The
carry tool also cannot carry it as it stands, since it carries only
eScribe documents.

The Claude seat also notes that item 7.6 lists two presenters under
Panel 4 and none under Panel 5, though item 2.3 approved entries in both,
and asks whether carrying truncated the list. The archived page holds the
same two entries under Panel 4 and no Panel 5 list, so the carried text
matches the record.

**What reopens the run.** Round 1 again, once the seats can read the
bylaw: either the page answers them during the round, or a way is found to
carry a non-eScribe document a seat cannot reach. Which of those, and
whether a transient failure needs a methodology answer, is the editor's
decision. The round 1 answers stay in `round1/` as returned, with their
rows in `run.yaml`. A restart moves them under a superseded directory, as
earlier runs did.

## 2026-10-02: the stopped round 1 superseded; round 1 runs again as it stands

**The editor ruled the bylaw failure a transient outage at edmonton.ca,
not an automated-access block, so the stopped round 1 is superseded and
round 1 runs again with nothing changed.** The bylaw opened for both the
Claude seat's WebFetch (HTTP 200 at 08:06Z) and the site's fetcher (HTTP
200 at 08:09Z) before the round, and for both again after it (the Claude
seat at 08:25Z, the fetcher at 08:26Z). Every seat got HTTP 502 from the
same URL only between 08:16Z and 08:24Z. An outage on the City's side
that lifts within minutes is not a reason to carry the bylaw or change the
carry rule, and the rule stays as it is.

The stopped round's answers (`round1/`), its rows in `run.yaml` and a
copy of the carry manifest it ran on (committed at 9cdd025, sha256
`1ed94e171da6243977f8c10d9329d4555247f4f9d457868314bf6ff53cb33be8`) move
unchanged to `superseded-2026-10-02/`, as `round1/`, `run.yaml` and
`carried-manifest.yaml`. They are kept for the record only and are not an
input to the rerun: no seat sees them, and the merge and synthesis read
only the new rounds. `run.yaml` starts again with no rows. The brief is
unchanged and still frozen at
`292e2d7d1a214fdd29985d483dc2c95e15da217311716ef86057be8a00ec5c0f`.

Immediately before the rerun the bylaw URL is probed with the Claude
seat's tool and with the site's fetcher, and round 1 launches only if
both get HTTP 200. If a seat again reports the bylaw unreadable during
the round, the run stops again.

## 2026-10-02: round 1 rerun, stopped again on the bylaw

**Round 1 ran again on all three seats, and the run stops again for the
same reason: every seat reports that the bylaw PDF answered its web tool
with HTTP 502 during the round.** As the editor directed, a second report
of the bylaw unreadable stops the run rather than starting another rerun.
No merge, round 2 or synthesis was run, and no verdict below is a finding
of this site.

**Before launch.** At 08:28:52Z the Claude seat's WebFetch got HTTP 200
from the bylaw URL (`carried/seat-probes.yaml`), and at 08:29:01Z the
site's fetcher got HTTP 200. The carried pages' probes, from 08:14:50Z,
were inside their 6-hour window, so the manifest was not rebuilt and the
package was the same as the stopped round's: carried section sha256
`33fba2c8d690be9e888be40e599e9abee598a8ab2b89a1e38964f25f6e39b7c7`,
package sha256
`dcbb16d09c8398e12a5c338672fec98d169a856cac472c087ccd42870ad90109`,
earliest probe 08:14:50Z. All three seats launched from 3b0be90 at
08:29:11Z. The runner refused nothing.

| Seat | Attempt | Outcome |
|---|---|---|
| Claude Opus 5.5 (`claude-opus-5-5`), high, Claude Code 2.1.287 | `90bde1173878e906`, 08:29Z to 08:32Z | admitted on one attempt |
| GPT-6 Sol (`gpt-6-sol`), high, codex-cli 0.159.3 | `cde57e2b2da41a6b`, 08:29Z to 08:38Z | admitted on one attempt |
| GPT-6 Luna (`gpt-6-luna`), high, codex-cli 0.159.3 | `0eebf162cbc42460`, 08:29Z to 08:35Z | admitted on one attempt |

What each seat returned, kept for the record only:

| Claim | Claude | GPT-6 Sol | GPT-6 Luna |
|---|---|---|---|
| `speaking-time-cut-to-three-minutes` | Supported, moderate | Supported, moderate | Supported, high |

No seat raised a MATERIAL FRAMING CONCERN.

**Why the run stops.** The Claude seat's WebFetch retrieved the PDF once
but could not extract its text, and later attempts got HTTP 502. GPT-6 Sol
and GPT-6 Luna each got HTTP 502. All three read sections 38, 2 and 4
from search-engine extracts, and none read the consolidation's list of
amendments from the document itself. At 08:38Z, just after the round, the
site's fetcher got HTTP 200 and the full 423,231 bytes again. The bylaw
has now answered the probes four times out of four and the seats' research
runs not once in two rounds, so this no longer looks like a passing
outage. The cause is not established here: it may be how the City's
server answers the seats' tools under a research run's request pattern,
or a size or format limit in the tools. The decision on how the seats are
to read the bylaw belongs to the editor.

The seats' counts of entries on item 7.6 disagree: Claude and Luna count
64, Sol counts 65 (15, 15, 16, 15 and 4 by panel). That is for the merge
and round 2 to settle and is not resolved here.

The round 1 answers stay in `round1/` as returned, with their rows in
`run.yaml`.

## 2026-10-02: the stopped rerun superseded; round 1 to run again under methodology v1.43

**The stopped rerun of round 1 moves aside, and round 1 runs again with
the bylaw carried on the two-round ground of methodology v1.43 (D-0048).**
Every seat recorded a failure to read the bylaw PDF in both committed
rounds of this run, the first in `superseded-2026-10-02/` and the rerun
in `superseded-2026-10-02b/`, while every quick probe of the same address
opened it. Under v1.43 that qualifies the bylaw to be carried, and since
it sits on edmonton.ca rather than the meeting portal, it is carried as a
document outside the portal, checked against a fresh fetch by the site.

The rerun's answers (`round1/`), its rows in `run.yaml` and a copy of the
carry manifest it ran on (sha256
`1ed94e171da6243977f8c10d9329d4555247f4f9d457868314bf6ff53cb33be8`, the
same file as the first round's) move unchanged to
`superseded-2026-10-02b/`, as `round1/`, `run.yaml` and
`carried-manifest.yaml`. Both superseded rounds stay on the record as the
evidence for the two-round ground and are not an input to the new round:
no seat sees them, and the merge and synthesis read only the new rounds.
`run.yaml` starts again with no rows. The brief is unchanged and still
frozen at
`292e2d7d1a214fdd29985d483dc2c95e15da217311716ef86057be8a00ec5c0f`.

**Fresh probes.** Every URL the brief names was probed again through all
three seats on 2026-10-02 from 18:22:01Z to 18:24:58Z
(`carried/seat-probes.yaml`). The Claude seat's WebFetch was refused with
HTTP 403 at both meeting pages and at the portal root, and opened the
bylaw, the Lobbyists Act, the open data dataset page and the Yahoo News
page with HTTP 200. Both GPT-6 seats' probes were unclear at every
address, as v1.42 expects.

**The manifest, rebuilt under v1.43** (`carried/manifest.yaml`). The
bylaw (YF-EV-0251) is carried whole as a document outside the portal on
the two-round ground, read from the six committed answers; the declared
names are "bylaw" and "Bylaw 18155". The site's fresh fetch at 18:25:45Z
returned the archive's exact bytes (423,231 bytes, sha256
`762a9177...c519`), and its extracted text is 52,071 bytes. The minutes
and agenda pages (YF-EV-0209, YF-EV-0210) are carried by item under rule
v2 as before, on fresh Claude-seat refusals; their archive and text
hashes and rule version are unchanged, so their earlier checks carried
over. `carried/gates.yaml` still lists no claim. The estimated round-1
package is 125,461 of 400,000 bytes.

The founder opened the bylaw's address in an ordinary browser,
unauthenticated, and confirmed it is the Council Procedures Bylaw
(recorded 18:26:14Z). Still pending before a launch: the bylaw's
extraction check and personal-information screen, and, for both meeting
pages, a v1.43 checker and role on the completeness check and a person's
public-open check; their earlier checks were recorded in the v1.42 form,
which v1.43 packaging refuses.

## 2026-10-02: rounds 1 and 2 under methodology v1.43, synthesized

**The panel answered the claim under review Supported, and all three
seats agreed in both rounds.** Synthesis, from round 1 as the method
fixes, gives `speaking-time-cut-to-three-minutes` Supported, Unanimous.
No seat raised a MATERIAL FRAMING CONCERN or wrote that an essential
source was inaccessible: every seat read the bylaw from the carried text.
The two parked claims stay parked. This is the panel's result, not yet a
published finding; drafting and the human gate come next.

**The checks.** An independent read-only Claude Opus 5.5 checker session,
not the editor, passed the bylaw's extraction check and
personal-information screen, confirmed each of the six seat sentences the
two-round ground rests on, and passed again the extraction, completeness
and personal-information checks of the minutes and agenda pages, whose
hashes and rule version are unchanged (`carried/checks/checks.yaml`). It
notes that in the second superseded round the Claude seat's tool first
retrieved the PDF but could not decompress its text, and only later
retries returned HTTP 502; the seat still did not read the text, so the
failure stands. The meeting pages' public-open checks are recorded in the
site-fetcher form that PR #118 restored: the fetcher's HTTP 200 on the
live page at build time. The founder's browser check of the bylaw stands,
with the version established by the site's byte-identical fresh fetch.

**Round 1.** The manifest with the checks was committed at 2e9ea52,
sha256 `8ad2627bbde0c041730f7483245152ba2491cdf66b639e748bc5deb202c26621`;
`package` passed on it. The carried section's sha256 was
`ff04c436f8898ec009333b592b1fa85d4c8b4af7aacd77d86826b71e5513cd5f` and
the package's
`23e29a17c633d2f01c7a0e0291fc27b1f761308c1a3349de73f5b18ed16dd4e8`, the
same for every seat; the earliest probe it rests on was
2026-10-02T18:22:29Z. All three seats launched at 19:11:19Z. The runner
refused nothing, and the Codex seats ran under codex-cli 0.160.0, a newer
CLI than the earlier rounds' 0.159.3.

| Seat | Round 1 attempt | Round 2 attempt |
|---|---|---|
| Claude Opus 5.5 (`claude-opus-5-5`), high, Claude Code 2.1.287 | `7cd9a6b49d789c57`, 19:11Z to 19:15Z | `130530fcc60925ed`, 19:21Z to 19:24Z |
| GPT-6 Sol (`gpt-6-sol`), high, codex-cli 0.160.0 | `8f504fb46c6cb606`, 19:11Z to 19:19Z | `e0c8bd8db47dc15c`, 19:21Z to 19:28Z |
| GPT-6 Luna (`gpt-6-luna`), high, codex-cli 0.160.0 | `cc15c53a99050a2c`, 19:11Z to 19:17Z | `1646d5131c869847`, 19:21Z to 19:27Z |

Each seat was admitted on one attempt in each round.

**The bylaw in round 1.** No seat read the bylaw directly. The Claude seat
and GPT-6 Luna each report HTTP 502 from the PDF, and GPT-6 Sol reports
that direct requests for the bylaw failed. All three cite sections 38(1)
and the consolidation's amendment list from the carried text, which is
what the carried label says: the reviewers' tools failed to retrieve it,
and every reviewer read the same site-supplied copy, so their agreement on
it is not independent retrieval.

**Merge.** The round 1 merge found 4 distinct sources and no contested
claim (`combined-evidence.json`, `disagreements.json`). Evidence staging
fetched all 4; the bylaw's bytes are identical to its archive
(`fetch-report.md`).

**Round 2.** After round 1 finished, the three carried URLs were probed
again through all three seats from 19:19:59Z: the Claude seat's WebFetch
was refused with HTTP 403 at both meeting pages and opened the bylaw with
HTTP 200; the GPT-6 seats' probes were unclear. The manifest rebuilt on
those probes (6249014, sha256
`ff03b82f6be64e7672fc79475cadfa51b635799e0f4b257820a6754e9cce010b`)
differs only in probe and fetch times; the carried section is the same,
`ff04c436f889…`, and the earliest probe was 19:20:23Z. The seats launched
at 19:21:38Z and 19:21:39Z.

| Claim | Claude, round 1 / 2 | GPT-6 Sol, round 1 / 2 | GPT-6 Luna, round 1 / 2 | Synthesis |
|---|---|---|---|---|
| `speaking-time-cut-to-three-minutes` | Supported, high / high | Supported, high / high | Supported, high / high | Supported, Unanimous |
| `more-speakers-in-favour-at-hearing` | parked at framing | parked at framing | parked at framing | not tested |
| `hearing-supporters-and-lobby-groups` | parked at framing | parked at framing | parked at framing | not tested |

**What the seats found, in brief.** Section 38(1) of the bylaw sets a
five-minute limit for each approved speaker, last amended in 2022, and no
later amendment on the consolidation's list touches it. Under item 1.4
the committee carried, 6 to 0, a motion setting a three-minute maximum for
every approved speaker at that meeting. The item 2.3 Requests to Speak
motion lists 64 entries for item 7.6 in five panels (15, 15, 15, 15, 4),
15 of them with an organization, inside the 60 to 80 band; 79 entries
across the meeting; 52 recorded as presenting on item 7.6, which is below
the primary band and inside the alternative. The round-1 count split of
the stopped reruns (64 against 65) did not recur. No record states a
reason for the motion.

## 2026-10-02: drafted and checked, before the gate

**The page was drafted from the round files, the synthesis, the carry
manifest, the register and the archived sources, then read by two
faithfulness checks, a freshness audit and a plain-speech read; no finding
changed and both parks stand.** The question page leads with the two claims
parked at framing, as lanes-and-congestion does, and its standfirst answers
the question people asked: nobody can tell from the City's minutes which side
the speakers took, or who, if anyone, organized them. The one finding,
`ch-speaking-time-cut` (register `speaking-time-cut-to-three-minutes`), is
Supported, Unanimous, and its answer carries the definition sensitivity
beside the verdict: 64 entries on the list of approved speakers, the 52
recorded as speaking short of about seventy. Members of the public appear
only as counts; office-holders are named for the motion and the vote. Counts
and the two-thirds threshold are in `scripts/calcs/council-hearing.ts`, with
a test pinning them to the prose. The status is `pending-review`.

Each report is committed with the editor's dispositions at its top:
`faithfulness/gpt-1.md` (GPT-6 Sol, 24 items, 22 adopted),
`faithfulness/gpt-luna-1.md` (GPT-6 Luna, 17 items, 15 adopted, 2 in part),
`gate/freshness-audit.md` (GPT-6 Sol, 6 items) and `plain-speech/gpt-1.md`
(GPT-6 Sol, 9 rewrites, 2 as written and 7 modified). The faithfulness
package carried the carried text of the minutes, agenda and bylaw whole,
privately; nothing carried is committed.

**Sources added after the panel ran**, from the freshness audit, all private:
YF-EV-0315, the YEG Bike Coalition's newsletter post of 2026-08-19 urging
readers to register to speak on item 7.6, with a Paths for People session to
help them prepare; YF-EV-0316 and YF-EV-0317, the City Council minutes of
2026-01-27 and 2026-02-17, at which Council adjusted its own members' section
38 limits and set none for public speakers. Their ids start above the highest
on any remote branch (YF-EV-0309). The 2025-12-04 and 2026-03-17 minutes the
audit also named are filestream files, which answered the site's fetcher with
HTTP 403, and are not relied on. The City video and an unreviewed machine
transcript of it, which the audit says may record a reason for the motion,
are not archived or relied on; the page says the video was not watched.

**For the editor: the organizing strand of the second park.** The park's
reason says no record links the supporters to an organizer, and its reopen
condition is a registry covering City Council or a record of payment. The
coalition's public call is a record that groups encouraged supporters to
register, though not that any listed speaker answered it. The page reports
it and keeps the park. Whether the reason and the reopen condition still
describe that strand, or the claim should be split or re-examined, is the
editor's call.

**The editor's decision.** The claim stays parked at framing, and the frozen
brief is unchanged. Its register reason is revised to say that a cycling
coalition urged supporters to register but no record links that call to
anyone on the list, and it now reopens on a record that a speaker was paid, or
a record linking named speakers on the list to an organizer. A dated comment
above the register entry says so. The page's parked line is the story's own
and still matches.

**Quality ledger (D-0048 rule 7).** The recorded failure modes in
`methodology/quality-ledger.yaml` were checked against the draft:

| Recorded failure mode | Earlier case | Result here |
|---|---|---|
| Fabricated citation, or a figure attributed to a source that lacks it | electric-buses, winter-cycling, infill-prices | Every count was recounted from the carried minutes into the calculation; 64, 79, 52, 15 and 12 and the 6 to 0 vote match the text every seat read. |
| A seat's miscount carried into the draft | (new in this run's round 2) | The draft uses the cross-review counts: GPT-6 Sol's round-one 50 is 52, GPT-6 Luna's round-one 14 is 15; the review notes say so. |
| A stated rule presented as an outcome | winter-cycling (service standard as achieved) | The motion is reported as a maximum; the page says the minutes do not record how long anyone spoke. |
| A funded or proposed figure presented as approved or achieved | climate-targets; D-0048 rule 6 | No budget document is cited. |
| A media report treated as the document behind it | climate-targets | The CBC report is cited only for what it said about the room, with no count, and never as a source of a classification. |
| A source misclassified | fifteen-minute-districts | The minutes are `legal-audited` from the registry, not a seat's label. |
| Committee action described as Council's | active-transportation (gate) | The page names the Infrastructure Committee and says it is not Council. |
| Categorical wording beyond the instrument | fifteen-minute-districts | Absences are bounded to what we found and what the reviewers read; the faithfulness checks' bounding items were adopted. |

Nothing in the ledger's recorded modes is present in the draft as committed.
The two seat miscounts above are round-two catches this run's records
corroborate. The editor had them entered in the ledger as self-corrections.

**Labels.** On the built question page every carried source cited carries
its v1.43 label: YF-EV-0209 and YF-EV-0210 the selected-items label, and
YF-EV-0251 the two-round label. The claim page tags the same three. No
uncarried source carries one.

**Not yet done.** The publication gate and the critique of the rendered page,
which run as separate sessions. This is the first story under the two-round
ground, so the critique includes the cold-reader phone test (D-0048 rule 7).
