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
