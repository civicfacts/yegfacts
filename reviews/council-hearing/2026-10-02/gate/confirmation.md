<!-- Gate confirmation (stage 7, methodology v1.43), the same Claude Opus 5.5 audit session as gate/source-verification.md and gate/release-check.md, on 4930e5c. Dispositioned 2026-10-02 by Stew. The report is committed as written.

Disposition: B1 confirmed resolved. 2 new blocking, both corrected (N1 in the editor's wording, N2 as written); 3 advisories, 2 adopted (A1 in a shorter form, A2 in the editor's wording) and 1 noted (A3). No finding changed.

N1, corrected in the editor's wording, not the gate's: the standfirst is "The minutes don't say which side the bike-lane speakers took. Nine of 64 entries named groups tied to the call to speak, and no record shows anyone was paid." The first sentence is bounded to the minutes again. "Groups tied to the call" holds for all three groups, because the coalition's own post names the other two. At 157 characters the whole line is the share text; the gate's longer wording would have lost its second sentence there. The test string in tests/calcs-council-hearing.test.ts is updated, and the built meta and og descriptions carry the line whole.

N2, corrected as written: on a claim parked at framing, src/components/ClaimEntry.astro now says "Its question went ahead, and this claim was set aside before the panel ran." The editor chose the gate's sentence over the critique's equivalent. Checked on the five pages it renders: the two set-aside claims under council-hearing and the three under lanes-and-congestion.

A1, adopted: the parked line now ties the speakers to "the bike group that urged people to speak and groups working with it". It is shortened to fit the share text, at 159 characters: "We can't tell if anyone paid the bike-lane speakers, and records tie only some of them to the bike group that urged people to speak and groups working with it." The phrase "the groups that urged people to speak" no longer appears on the page.

A2, adopted in the editor's wording, in the register, the story and the run record: "It reopens if a record shows a speaker was paid to attend, or that other speakers on the list were recruited by an organizer." This covers the six entries naming other groups as well as those naming none.

A3, noted, no change: scripts/calcs/council-hearing.ts commits organization names from the lists, not people's, and the redaction rule keeps organization names by design. -->

# Gate confirmation — council-hearing

Result: B1 resolved; 2 new blocking, 3 advisory

Gate stage 7, confirmation. Run 2026-10-02 on worktree `draft-hearing` at
`4930e5c`, against the gate reports of `75dc267`. Auditor: the same Claude
(Opus 5.5) audit session, separate from the drafter. Read-only; the worktree
is clean.

**Checks run.**

| Check | Result |
|---|---|
| `npm run build` | exits 0 |
| `npm run validate` | OK (11 stories, 25 claims, 242 evidence entries) |
| `tests/calcs-council-hearing.test.ts` and `tests/carried-v143.test.ts` | 50 passed |
| `npm run audit:exposure` | 0 in every fail class |
| Files in `dist/` whose hash matches a private archive | none |
| Tracked files under `evidence/private/` | none |

## 1. B1 and its fixes

**B1 — RESOLVED.** The page, the TL;DR, the parked line and the register now
report the nine entries.

| Fix | New text |
|---|---|
| 1, story paragraph | "Some groups did ask people to come. A week before the meeting, the YEG Bike Coalition urged its readers to register to speak on the item against administration's proposal, said Paths for People would run an online session to help people prepare, and named a third group as its local ambassadors. Of the 64 entries the committee approved to speak on the bike lanes, 15 gave a group's name, and nine of those gave one of these three groups. Those nine were registered under the name of a group behind the call. No record shows whether any of the other 55 answered it, and none says anything about payment. Calling a group a special interest is a judgement this site does not make." |
| 2, TL;DR 3 | "A bike group urged supporters to sign up to speak, and nine entries on the list gave its name or a group working with it, but no record shows who else answered or that anyone was paid." |
| 3, TL;DR 4 | "Fifteen entries on the list of approved speakers named a group, and a group's name does not by itself show which side a speaker took." |
| 4, parked line | "We can't tell whether anyone paid Edmonton's bike-lane speakers, and the records tie only some of them to the groups that urged people to speak. We'll revisit this claim if a record turns up that settles it." See A1. |
| 5, register reason | "A cycling coalition publicly urged its supporters to register to speak, and nine entries on the committee's list of approved speakers gave the name of that coalition, of the group that offered to prepare speakers, or of the group the coalition calls its ambassadors; no record shows whether anyone else on the list answered that call." |
| 6, decision | The editor restated the reopen condition and kept the park. The register reads "It reopens if a record shows a speaker was paid to attend, or that speakers who gave no group's name were recruited by an organizer." The story reads "until a record shows a speaker was paid to attend, or that speakers who gave no group's name were recruited by an organizer." The two now match. |

## 2. Restated reason and reopen condition, against the sources

- **"Nine entries …".** Verified against carried item 2.3 of YF-EV-0209 and
  YF-EV-0315. The coalition: "We want as many Edmontonians as possible
  registered … Agenda item: 7.6 … in OPPOSITION". Paths for People: "hosting
  an online session … to help people prepare". The ambassadors: "Ward Metis
  Bikes, local ambassadors for the YEG Bike Coalition".
- **"No record shows whether anyone else on the list answered that call."**
  Verified. Nothing in the minutes, the post or the other sources ties the
  remaining 55 entries to the call.
- **The reopen condition.** Nothing in the sources held meets either branch
  today:
  - No record shows a speaker was paid.
  - No record shows that a speaker who gave no group's name was recruited.

  So the park still describes the record. The condition does not cover the
  six entries naming other groups; see A2.
- **The first park's reason, now "the contemporaneous news reports we found
  describe the balance in words and give no count".** Verified for YF-EV-0255.
  The Global News report named in the freshness audit is not archived. The
  plural is accurate as a description of what was found.

## 3. Statements changed since 75dc267

| Statement | Grade | Basis |
|---|---|---|
| Standfirst: "Nobody can tell which side Edmonton's bike-lane speakers took. Nine of 64 entries named groups that urged people to speak, and no record shows anyone was paid." | **BLOCKING** | Finding N1 |
| TL;DR 1: "The committee did cut each speaker's time from five minutes to three, with 64 entries on its list to speak on the bike lanes and 52 recorded as speaking." | VERIFIED | Carried 1.4: "each approved speaker may speak for a maximum of three minutes"; bylaw s.38(1). The counts 64 and 52 are confirmed by the calculation |
| Claim answer: "… cut speakers' time limit from five minutes to three, when 64 entries were listed to speak on the bike lanes, though the 52 recorded as speaking fall short of about seventy." | VERIFIED | As above; the 60 to 80 band is from the brief |
| Claim limitation 6: "… turned up no motion cutting public speakers' time since October 2025" | VERIFIED | GPT-6 Sol round 2; GPT-6 Sol's round 1 "examples" were members' limits |
| Story: "In the City's up-to-date copy of October 2025, that section was last changed in 2022." | VERIFIED | YF-EV-0251, consolidated October 29, 2025; "(S.15, Bylaw 20226, July 4, 2022)" |
| Story: "in five groups called panels" | VERIFIED | Carried 2.3, Panel 1 to Panel 5 |
| Story: "This site does not name members of the public who spoke. It counts entries on the City's lists, and the reviewers read a copy with those names removed." | VERIFIED | Manifest redaction v4: 79 withheld in 2.3 and 57 in 7.6. No such name on any built page |
| Story reopen sentence | VERIFIED | Matches the register (section 1, fix 6) |
| New changelog note | VERIFIED | Says the nine, the park kept, and that no finding changed |
| Drafted note: "at framing" removed | VERIFIED | |
| Shared claim pages for framing parks: the story's line opens the page under "No finding", with "The full reason, as recorded when it was set aside" before the register reason, and the share description is the story's line | VERIFIED as wired | All five framing parks render this way: the two in council-hearing and the three in lanes-and-congestion. The lanes lines match that page's gated wording ("by itself, changed travel times …", consistent with its B1 fix) and the register reasons |
| Shared claim pages: "The other claims under that question went ahead, and this one was set aside before they were checked." | **BLOCKING** | Finding N2 |
| Vote-gate park (`same-seven-councillors-vote-together`) | VERIFIED | Unchanged: "One brief covered every claim under that question, and this one was set aside on that run." |
| Label: "… because their research tools failed to read it in two rounds in a row. That was their tools failing. It does not mean the document is unavailable to you." | VERIFIED | Manifest `two_round`: five seat-rounds reported HTTP 502, and one seat downloaded the file but "could not decompress the text streams". "Read" fits all six better than "retrieve". The label renders on the question page and on `/evidence/YF-EV-0251` |

## 4. Recount of the nine and the seven

Recounted against carried item 2.3 (approved) and item 7.6 (presented) of
YF-EV-0209. The calculation's new `groups` arrays transcribe every
organisation exactly, in the order the minutes print them.

| | YEG Bike Coalition | Paths for People | Ward Métis Bikes | Total |
|---|---|---|---|---|
| Approved | 4 (one each in panels 1 to 4) | 2 (panels 2 and 4) | 3 (panel 2) | **9** |
| Presented | 3 (two in panel 1, one in panel 3) | 2 (panels 1 and 2) | 2 (panel 2) | **7** |

The calculation prints `approvedUnderCallGroups: 9` and
`presentedUnderCallGroups: 7`, and 64 − 9 = 55. These match.

The "Edmonton Bike Coalition" entry in approved panel 1 is correctly not
counted. YF-EV-0315 does not name that organisation.

## Findings

### Blocking

**N1 — The new standfirst drops the bound the freshness disposition required,
and broadens "groups that urged".**

> "Nobody can tell which side Edmonton's bike-lane speakers took. Nine of 64
> entries named groups that urged people to speak, and no record shows anyone
> was paid."

The freshness disposition ("Sides 1, adopted in substance") says the
standfirst "no longer say[s] nobody can tell from the City's records". The
City's video is a record from which a person could tell, and the page says so
itself. The new first sentence is unbounded, so it says more than the
previous version ("from the City's minutes") and more than the parked line.

The second sentence also calls all three groups "groups that urged people to
speak". YF-EV-0315 shows the coalition urging people to register. It shows
Paths for People offering preparation, and the ambassador group door-knocking
"to raise awareness". TL;DR 3's "its name or a group working with it" is the
accurate form.

Exact fix:

> "The committee's minutes don't record which side Edmonton's bike-lane
> speakers took. Nine of 64 entries named the bike group that urged people to
> speak or groups working with it, and no record shows anyone was paid."

Update the test string in `tests/calcs-council-hearing.test.ts` ("Nine of 64
entries named groups that urged people to speak") to match.

**N2 — The new framing-park sentence is false on every page it renders.**

> "The other claims under that question went ahead, and this one was set
> aside before they were checked."

This renders on five pages: `more-speakers-in-favour-at-hearing`,
`hearing-supporters-and-lobby-groups`, `lane-removal-increases-congestion`,
`bike-infra-reduces-congestion` and `lanes-removed-for-traffic-calming`.

On each of them, at least one of "the other claims" was also set aside, not
checked. The council-hearing question has three claims, two parked and one
checked. The lanes-and-congestion question has four claims, three parked and
one checked.

Exact fix, in `src/components/ClaimEntry.astro`, replace the `framingLine`
string with:

> "Its question went ahead, and this claim was set aside before the panel
> ran."

### Advisory

- **A1** — The parked line says "the groups that urged people to speak". That
  is my own suggested wording from the gate, and it has the same looseness as
  N1. Suggested wording: "…and the records tie only some of them to the bike
  group that urged people to speak and groups working with it."
- **A2** — The restated reopen condition covers payment and the 49 entries
  that gave no group's name. It does not cover the six entries that named
  other groups (Bike Bus Alberta, Holyrood Voice, Holyrood Community 79 St
  Action Group, Let's Bike There YEG, Bike Edmonton and Edmonton Bike
  Coalition). If those should also reopen the claim on a record of
  recruitment, "speakers outside the nine" would cover them. This is the
  editor's call; the park stands either way.
- **A3** — Release. `scripts/calcs/council-hearing.ts`, changed on this
  branch, now commits the organisation names from the lists, including the
  single-entry groups. Before, these appeared only in run files already on
  `main`. No person's name is added, and the redaction rule keeps
  organisation names by design. This extends release advisory A1 to a file
  this branch changes. No built page names any group beyond the YEG Bike
  Coalition and Paths for People.

GATE: FAIL

- N1: set `one_line` to "The committee's minutes don't record which side
  Edmonton's bike-lane speakers took. Nine of 64 entries named the bike group
  that urged people to speak or groups working with it, and no record shows
  anyone was paid." Update the matching test string.
- N2: in `src/components/ClaimEntry.astro`, replace "The other claims under
  that question went ahead, and this one was set aside before they were
  checked." with "Its question went ahead, and this claim was set aside before
  the panel ran."
