<!-- Source verification (gate stage 7, part 1, methodology v1.43), a Claude Opus 5.5 audit session separate from the drafting session and every check, on 75dc267. Dispositioned 2026-10-02 by Stew. The report is committed as written.

Disposition: 1 blocking, adopted; 3 advisories, adopted. No finding changed.

B1, adopted. Fixes 1 to 5 are made as the gate wrote them: the story paragraph on the groups' call (nine of the 64 approved entries gave one of the three groups behind it, and no record shows whether any of the other 55 answered it or says anything about payment), TL;DR 3, TL;DR 4, the parked line for hearing-supporters-and-lobby-groups, and the register reason's middle sentence. scripts/calcs/council-hearing.ts now transcribes each organization on the approved and presenting lists and counts the nine (seven of them among those recorded as speaking); the test pins 9, 7 and 55 to the prose.

B1 fix 6, the editor's decision. The claim stays parked at framing, because the panel never tested it and the nine entries show whose name each was registered under, not that anyone was recruited or paid. Its reopen condition is restated to what is still missing: "It reopens if a record shows a speaker was paid to attend, or that speakers who gave no group's name were recruited by an organizer." The story's reopen sentence says the same, and a second dated comment above the register entry records the revision. Briefing the organizing question as a claim of its own is a follow-up for a later batch, noted in the run record.

A1, adopted: the first park's reason now reads "the contemporaneous news reports we found describe the balance in words and give no count". A2, adopted: limitation 6 now says the reviewers' web searches turned up no motion cutting public speakers' time since October 2025. A3, adopted together with the critique's R1: the standfirst is now "Nobody can tell which side Edmonton's bike-lane speakers took. Nine of 64 entries named groups that urged people to speak, and no record shows anyone was paid." At 159 characters it is the share text whole.

The report's recount names the organizations on the speaker lists, as the release check notes. Committing it adds no exposure: the same names are in the round files already on main, organization names are kept under the redaction rule, and no member of the public is named. -->

# Source verification — council-hearing

Result: 1 blocking, 3 advisory

Gate stage 7, part 1. Run date 2026-10-02 (story run `2026-10-02`),
methodology v1.43. Auditor: a Claude (Opus 5.5) audit session, separate from
the drafting session, both faithfulness seats, the plain-speech read and the
freshness audit. Graded tree: worktree `draft-hearing` at `75dc267`.

**Verdict: GATE FAIL on one point.** The page says no record ties anyone on
the speaker list to an organizer. The register reason for the second park
says the same, and its reopen condition is "a record links named speakers on
the list to an organizer". The site's own records already tie nine entries on
the list to the groups behind the call to register.

The minutes list four approved entries under the YEG Bike Coalition's name,
two under Paths for People and three under a group the coalition's own post
(YF-EV-0315) calls its "local ambassadors". The coalition urged people to
register, and Paths for People offered to prepare them.

The page should report this. The park's reason and reopen condition must
then be restated, or the organizing strand reopened. That choice is Stew's.

The claim under review checks out against the sources:
- the bylaw's s.38(1) gives each approved speaker five minutes;
- Janz moved the three-minute motion, and it carried 6 to 0;
- the list counts are 64, 79, 52 and 15, with 12 of the 52 naming a group;
- Council's January and February 2026 motions changed only members' time.

**Scope.** Every factual statement in `src/content/stories/council-hearing.mdx`:
- the `one_line`, the five TL;DR bullets, both changelog notes and both
  `parked` lines;
- every body sentence that carries a number, a date, a vote, a name, a
  document or what a check or reviewer found.

Every statement in `src/content/claims/ch-speaking-time-cut.yaml`: the
answer, ten key facts, eight limitations, unknowns, missing evidence, the
wording note and each reviewer entry. Also in scope:
- the register entries for `council-hearing` and its two parked claims, and
  their reasons as rendered on `/claims/…`;
- the added sentence in `council-pause-vote.mdx`;
- `scripts/calcs/council-hearing.ts` and its test.

Connective or interpretive sentences that assert nothing about the record
were not counted.

**Grading bases.**
- The minutes and agenda were graded against the carried text the seats read
  (`evidence/private/carried/council-hearing/2026-10-02/`), and the bylaw
  against its `pdftotext -layout` extraction.
- The other sources were graded against their archives, tag-flattened for
  HTML. The registry dates the lobbyist rows were parsed from the CSV.
- Commenter facts were graded against `intake/register.yaml` and the capture.
- Reviewer facts were graded against `synthesis.json` and `round1/` and
  `round2/`.

No web access was used.

## Integrity check

All ten cited archives are present and match their registry `archive.sha256`
in this worktree and in the main checkout: YF-EV-0209, 0210, 0251, 0252,
0253, 0254, 0255, 0315, 0316 and 0317.

The carried text regenerates to the manifest's hashes:
- the bylaw: `pdftotext -layout -enc UTF-8` gives `b8bd4a16…`, which matches;
- 0209 and 0210: `scripts/panel/minutes-items.ts`, rule v2 with withholding
  on, gives `d57c0219…` and `52b169f6…`, which match. These are the same
  texts the council-pause-vote run carried.

## The calculation

`npx tsx scripts/calcs/council-hearing.ts` prints:

| Figure | Value |
|---|---|
| n | 64, inside the primary band and inside the alternative band |
| nAll | 79, inside both bands |
| nSpoke | 52, outside the primary band, inside the alternative band |
| approvedWithOrganization | 15 |
| presentedWithOrganization | 12 |
| vote | 6 to 0 |
| specialResolutionNeeds | 4 |
| definitionSensitive | true |

`npx vitest run tests/calcs-council-hearing.test.ts` passes 4 tests.

The transcription was recounted line by line from the carried item 2.3 and
item 7.6.

Approved list:
- Panels: 15, 15, 15, 15 and 4.
- Entries with a group, by panel: 2 (Edmonton Bike Coalition; YEG Bike
  Coalition), 8 (Bike Bus Alberta; Holyrood Voice; Holyrood Community 79 St
  Action Group; YEG Bike Coalition; Paths for People; Ward Métis Bikes ×3),
  3 (Let's Bike There YEG; Bike Edmonton; YEG Bike Coalition), 2 (Paths for
  People; YEG Bike Coalition) and 0. That makes 15.
- The other items: 7.1 has 5, 7.3 has 1 and 7.4 has 8, plus 1 more approved
  4 to 0. That makes 79.

Presented:
- Panels: 16, 16, 18 and 2, which makes 52.
- Entries with a group: 5, 6, 1 and 0, which makes 12.

All match. The six-member denominator rests on the roll call. That six
members were present and the mayor is a member under s.15(3) is in the
carried attendance. The Claude seat noted that six votes meet two-thirds of
any committee of up to nine, so the result does not hang on the exact
membership.

## Statement by statement

### Story — standfirst, TL;DR, parked lines, changelog

| # | Statement | Grade | Basis |
|---|---|---|---|
| 1 | one_line: nobody can tell from the minutes which side speakers took, or who, if anyone, organized them | VERIFIED as bounded to the minutes, see A3 | carried 2.3 and 7.6: no position recorded. Groups are recorded per entry |
| 2 | TL;DR 1: one list of approved speakers and another of those who spoke | VERIFIED | items 2.3 and 7.6 |
| 3 | TL;DR 2: we found no public record showing anyone was paid | VERIFIED | bounded to "we found"; freshness audit "Nothing material found … payment" |
| 4 | TL;DR 3: "A bike group urged supporters to sign up to speak, but no record shows who on the list answered." | **BLOCKING** | B1 |
| 5 | TL;DR 4: fifteen entries named a group, "which shows neither their side nor whether anyone organized them" | **BLOCKING** (with B1) | B1 |
| 6 | TL;DR 5: the committee gave no reason in its minutes for the cut | VERIFIED | carried item 1.4. The full archive also shows no reason |
| 7 | parked line 1: the minutes do not record which side speakers took | VERIFIED | |
| 8 | parked line 2: "we found no record establishing either" (organized or paid) | **BLOCKING** (with B1) | B1 |
| 9 | Changelog notes, revised and drafted | VERIFIED | dispositions in `faithfulness/`, `gate/freshness-audit.md`, `plain-speech/gpt-1.md`; synthesis Supported, Unanimous; registry YF-EV-0315 to 0317 |

### Story — body

| # | Statement | Grade | Basis |
|---|---|---|---|
| 10 | Eleven people under one post; most wrote the next day | VERIFIED | register `accounts.total: 11`. Of the 11, 10 posted on August 27 and Quiet Moose J. on August 30 |
| 11 | One said more spoke for the lanes; four answered that supporters were few or did not work | VERIFIED | `more-speakers-in-favour-at-hearing`: Mossy Crow K.; Silver Moose D., Willow Nuthatch C., Windy Otter P. and Boreal Grouse K. |
| 12 | Five said special interests, lobbyists or paid | VERIFIED | `hearing-supporters-and-lobby-groups`: six wordings by five authors |
| 13 | One said cut from five to three with seventy in the queue | VERIFIED | Golden Pelican H.: "limiting concerns to 3min from 5min … 70 is in the current cue" |
| 14 | The minutes list those agreed to be heard and those who spoke, with any group, and no side | VERIFIED | items 2.3 and 7.6 |
| 15 | The City's video is the only City record of what each speaker said; not archived; reviewers' tools cannot play it | VERIFIED | run record; freshness disposition "Sides 1" |
| 16 | CBC said that day that advocates outnumbered opponents, with no count | VERIFIED | YF-EV-0255: "Bike lane advocates outnumbered opponents at Edmonton City Hall on Wednesday". "Dozens of cyclists" is not a count |
| 17 | Lobbyists Act covers the provincial government, not City Council | VERIFIED | YF-EV-0252 s.1(1)(k) "public office holder" is provincial. The exclusions list municipal council members |
| 18 | Only City lobbyist registry: voluntary, Mayor's Office, 2017–2021 term; last entry September 2021 | VERIFIED | YF-EV-0253 description; YF-EV-0254: 758 rows, 2017-11-07 to 2021-09-15 |
| 19 | A week before, the YEG Bike Coalition urged readers to register against administration's proposal; Paths for People would run an online session | VERIFIED | YF-EV-0315, dated Aug 19, 2026: "Agenda item: 7.6 … in OPPOSITION"; "Paths for People is hosting an online session on Monday, August 24" |
| 20 | "It does not show which people on the committee's list answered that call" | **BLOCKING** (with B1) | B1 |
| 21 | Of the 64, 15 gave a group's name | CALC | |
| 22 | "A group's name beside a speaker does not say which side they took, or whether anyone organized them." | **BLOCKING** (with B1) | B1 |
| 23 | Parked "until a lobbyist registry covering City Council ties a group to this hearing, or a public record says a speaker was paid" | **BLOCKING** (with B1) | It no longer matches the register's revised reopen condition. See B1 |
| 24 | The two parked claims come from opposite sides | VERIFIED | register `side`: for, against |
| 25 | s.38 gives each approved speaker five minutes; last changed in 2022 in the October 2025 consolidation | VERIFIED | YF-EV-0251: "(CONSOLIDATED ON OCTOBER 29, 2025)"; s.38(1); "(S.15, Bylaw 20226, July 4, 2022)" |
| 26 | Council or a standing committee may change its rules by a two-thirds-of-all-members vote, if provincial law allows | VERIFIED | s.4 and s.2(2)(m) |
| 27 | Janz moved a three-minute maximum for each approved speaker that day; councillors went from five to three minutes for questions and speaking to a motion | VERIFIED | carried 1.4. Bylaw s.38(5) and s.38(6) give 5 minutes |
| 28 | All six members voted for it, named | VERIFIED | "In Favour (6) … Carried (6 to 0)" |
| 29 | More than the four that two-thirds of six requires | CALC | |
| 30 | It covered every approved speaker; the bike-lane item came first, so the limit preceded its first speaker | VERIFIED | 1.4 wording; 2.4 "7.6 … First item of business" |
| 31 | Committee, not Council; one meeting; a maximum; actual durations not recorded | VERIFIED | |
| 32 | 64 entries in five panels; 79 across four items; 52 spoke, in four panels | CALC | |
| 33 | Counts are of lines; someone listed twice counts twice | VERIFIED | carried text withholds names |
| 34 | "About seventy" was set as 60 to 80 before research, with 50 to 90 as the looser range; 64 and 79 inside; 52 outside; all three reviewers found Supported on 64 and said 52 changes the result | VERIFIED | brief; synthesis, all three seats |
| 35 | The comment's reason; no reason in the minutes items read; no reviewer found a City record of one; video not watched | VERIFIED | round 2, all seats |
| 36 | Reviewers read selected items supplied by the site; their tools failed on the bylaw in two earlier attempts though our checks opened it; one seat downloaded but could not read the text; all read the same copies | VERIFIED | manifest `eligibility.two_round`: superseded rounds, all three seats, HTTP 502 or "could not decompress the text streams"; probes 200 |
| 37 | January 27 and February 17, 2026: Council changed its own members' limits under s.38 and set none for public speakers | VERIFIED | YF-EV-0316 and 0317, item 1.4 adjustments, 13 to 0 each |
| 38 | What the page does not answer; links | VERIFIED | `/questions/council-pause-vote` and `/questions/consultation-and-opposition` build |

### Claim `ch-speaking-time-cut`

| # | Statement | Grade | Basis |
|---|---|---|---|
| 39 | Answer: cut from five to three; 64 on the list; 52 fall short of about seventy | VERIFIED / CALC | |
| 40 | KF1 and KF2: s.38(1), the note under s.38, s.4 and s.2 | VERIFIED | YF-EV-0251 |
| 41 | KF3 and KF4: item 1.4 motion, quoted; 6 to 0 by name; the six members present; the two-thirds calculation | VERIFIED / CALC | |
| 42 | KF5: covers all four items; 2.4 took the bike-lane item first | VERIFIED | |
| 43 | KF6 to KF8: 64 entries (15, 15, 15, 15, 4), 15 with a group; 79 entries; 52 entries (16, 16, 18, 2), 12 with a group | CALC | |
| 44 | KF9: no reason, no extra-time motion and no positions in the items read; five public-speaker files under 7.6 in the minutes; the agenda lists ten files, none from the public | VERIFIED | carried 7.6 attachments 11 to 15; YF-EV-0210 item 7.6 attachments 1 to 10 |
| 45 | KF10: Jan 27 and Feb 17, 13 to 0; three minutes to ask and to close; three minutes and then two to introduce; no public-speaker limit; read after the panel | VERIFIED | YF-EV-0316, 0317 |
| 46 | L1 to L5 | VERIFIED | |
| 47 | L6: "their web searches turned up none since October 2025" | ADVISORY | A2 |
| 48 | L7 and L8 | VERIFIED | manifest; YF-EV-0209 retrieved 2026-09-25 |
| 49 | Unknowns, missing evidence, wording note | VERIFIED | |
| 50 | Claude: Supported, High; no change; flagged a miscount in each other review; dropped the CBC report | VERIFIED | round 2 claude `errors_in_other_reviews`: Sol's 50, Luna's 14, and its own CBC citation |
| 51 | GPT-6 Sol: Supported, High; corrected 50 to 52 | VERIFIED | round 2 gpt |
| 52 | GPT-6 Luna: Supported, High; 14 became 15 | VERIFIED | round 2 gpt and claude identify the error. Luna's own round 2 lists "14 … the citation supports 15" among its noted errors |

### Register entries as rendered

| # | Statement | Grade | Basis |
|---|---|---|---|
| 53 | `more-speakers-in-favour-at-hearing` reason | VERIFIED except A1 | "the one contemporaneous news report" |
| 54 | `hearing-supporters-and-lobby-groups` reason: "no record links that call to anyone on the committee's list of approved speakers"; reopens "if a record links named speakers on the list to an organizer" | **BLOCKING** | B1 |
| 55 | `council-hearing` question entry: accounts 11 (5 for, 6 against); `story` link | VERIFIED | |
| 56 | council-pause-vote: "Who spoke at the committee's hearing that day, and how it cut their speaking time, is on its own page" | VERIFIED | link builds |

**Parked claims answered by implication?**

Parked claim 1, sides: no. The CBC line is reported as a reporter's sense of
the room and expressly not a count. No group's side is inferred.

Parked claim 2, payment and organizing: the page answers it by under-reporting
rather than implying. It denies a link the records hold (B1). Nothing on the
page implies payment.

## Findings

### Blocking

**B1 — The page and the second park's reason deny a link the site's own
records show.** These statements are the problem:

> TL;DR 3: "A bike group urged supporters to sign up to speak, but no record
> shows who on the list answered."
>
> Story: "It does not show which people on the committee's list answered that
> call … A group's name beside a speaker does not say which side they took,
> or whether anyone organized them."
>
> Parked line: "… because we found no record establishing either."
>
> Register reason: "A cycling coalition publicly urged its supporters to
> register to speak, but no record links that call to anyone on the
> committee's list of approved speakers. … It reopens if a record shows that
> a speaker was paid to attend, or if a record links named speakers on the
> list to an organizer."

The minutes' Requests to Speak list (YF-EV-0209 item 2.3, the carried text)
gives the following group names on approved bike-lane entries:
- "YEG Bike Coalition" on four entries, one in each of panels 1 to 4;
- "Paths for People" on two entries;
- "Ward Métis Bikes" on three entries.

The coalition's own post of August 19 (YF-EV-0315) does three things:
- it urges readers to register for item 7.6 "in OPPOSITION";
- it says Paths for People will run a session "to help people prepare";
- it says "Ward Metis Bikes, local ambassadors for the YEG Bike Coalition,
  are door knocking along 79 Street".

So nine of the 64 approved entries were registered under the name of one of
the groups that organized the call. Of those, seven are recorded as having
spoken: three YEG Bike Coalition, two Paths for People and two Ward Métis
Bikes.

That is a record linking named speakers on the list to an organizer, which
is the register's own reopen condition. It also shows, for those entries,
whom they spoke for and the group's public position.

Whether the nine "answered that call" is not shown. They may have registered
on their own account. But the denials as written are wider than that.

Nothing here touches payment, and nothing touches the 55 other entries. The
story's reopen condition (a registry, or a record of payment) also no longer
matches the register's revised one.

Exact fixes:

1. Story paragraph, replace from "Some groups did ask people to come." to
   "…is a judgement this site does not make." with:

   > "Some groups did ask people to come. A week before the meeting, the YEG
   > Bike Coalition [urged its readers](/evidence/YF-EV-0315) to register to
   > speak on the item against administration's proposal, said Paths for
   > People would run an online session to help people prepare, and named a
   > third group as its local ambassadors. Of the 64 entries the committee
   > approved to speak on the bike lanes, 15 gave a group's name, and nine of
   > those gave one of these three groups. Those nine were registered under
   > the name of a group behind the call. No record shows whether any of the
   > other 55 answered it, and none says anything about payment. Calling a
   > group a special interest is a judgement this site does not make."

2. TL;DR 3:

   > "A bike group urged supporters to sign up to speak, and nine entries on
   > the list gave its name or a group working with it, but no record shows
   > who else answered or that anyone was paid."

3. TL;DR 4:

   > "Fifteen entries on the list of approved speakers named a group, and a
   > group's name does not by itself show which side a speaker took."

4. Parked line 2:

   > "We can't tell whether anyone paid Edmonton's bike-lane speakers, and the
   > records tie only some of them to the groups that urged people to speak.
   > We'll revisit this claim if a record turns up that settles it."

5. Register reason, middle sentence:

   > "A cycling coalition publicly urged its supporters to register to speak,
   > and nine entries on the committee's list of approved speakers gave the
   > name of that coalition, of the group that offered to prepare speakers, or
   > of the group the coalition calls its ambassadors; no record shows whether
   > anyone else on the list answered that call."

6. To decide, owner Stew: the reopen condition "a record links named speakers
   on the list to an organizer" is met for those nine entries by YF-EV-0209
   together with YF-EV-0315. Either reopen the organizing strand, or restate
   the condition to what is still missing. For example: "a record that
   speakers who gave no group's name were recruited or paid". Then make the
   story's reopen sentence ("That claim is parked too, until …") say the same.

### Advisory

- **A1** — The first park's register reason, rendered on its claim page, says
  "the one contemporaneous news report describes the balance in words". The
  freshness audit found a second, Global News, and the disposition kept it
  out. Suggested wording: "the contemporaneous news reports we found describe
  the balance in words and give no count".
- **A2** — Claim limitation 6 says the reviewers' "web searches turned up
  none since October 2025". GPT-6 Sol's round 1 refers to "the examples
  found" in Council minutes of January 27, February 17 and March 17, which
  were adjustments to members' limits. Suggested wording: "…turned up no
  motion cutting public speakers' time since October 2025".
- **A3** — The standfirst's "or who, if anyone, organized them" is true of
  the minutes alone. After B1's fix, consider "…which side Edmonton's
  bike-lane speakers took, and no record shows that anyone was paid to speak"
  so that the headline does not undercut the organizing evidence the body
  reports.

`SOURCE VERIFICATION: 1 blocking, 3 advisory`
