<!-- Dispositions, 2026-10-02, by Stew (drafting seat Claude Opus 5.5). All four blocking items adopted as the gate wrote them, one merged with critique R4; advisories A1 to A5 and A7 adopted, A6 not. No finding changed.

B1, adopted, with the editor's decision on release-check B1 on top. The story no longer calls the commenter a city councillor. Her comment is shown under a pseudonym (release-check B1), and where the page reports her motions and votes it says she and Principe were both councillors then and that she sat on Council until the October 2025 election. B2, adopted with one word changed: "Partly. Administration's latest version of its plan set 14 bike routes aside for a second look without saying they would wait. Its two earlier versions held them back, and the original would have dropped them for 2026 and 2027." The gate's "the first" is "the original", because the critique (R4) found "first version" and "Version 1" read as the same document. B3, adopted: the story, limitation 1 and limitation 2 of claim 2 in the gate's words, and claim 1's version limitation now agrees (all three, not two). B4, adopted in the gate's words.

A1, adopted: the open-voting-record sentence says one reviewer looked. A2, adopted in the gate's suggested wording. A3, adopted: "would not alter the program's capital budget or its borrowing". A4, adopted: "Three other recorded motions that one or both of them moved or seconded were not votes on cutting the program", and the limitation now says "that bear on the program". A5, adopted: "In the records read". A6, not adopted: the plain-speech read moved the $100 million base out of claim 3's answer because it interrupted the sentence; the base sits in TL;DR 4, the key facts and a limitation, and the answer is not stronger than the synthesis, as the gate says. A7, adopted: last_verified is 2026-10-02 with a changelog entry, and TL;DR 3 now carries the original version (critique R3). -->

# Source verification — council-pause-vote

Result: 4 blocking, 7 advisory

Gate stage 7, part 1. Run date 2026-10-02 (story run `2026-09-25`),
methodology v1.42. Auditor: a Claude (Opus 5.5) audit session, separate from
the drafting session, both faithfulness seats, the plain-speech read and the
freshness audit. Graded tree: worktree `draft-cpv` at commit `0840853`.

**Verdict: GATE FAIL on four statements.** Every vote tally, mover, seconder,
amount and date on the page matches the archived minutes, and every figure
reproduces in the calculation module. The failures are elsewhere:

1. The story calls Jennifer Rice "a city councillor" in August 2026. The
   archived 2026 Council minutes list 13 members without her. She sat on
   Council until the October 2025 election.
2. Claim 2's answer says administration "did not say they would wait".
   Two of administration's three versions did say so, and the answer names
   only one of them.
3. The page says two of the three reviewers read Version 1 as a freeze. In
   round 2 all three did.
4. A claim 1 key fact says one motion carried on item 7.6. Three did.

Each fix is a wording change. No finding changes.

**Scope.** Every factual statement in
`src/content/stories/council-pause-vote.mdx`: the `one_line`, the five TL;DR
bullets, the changelog note, and every body sentence that carries a number,
date, vote, name, document or report of what a check or reviewer found. Every
statement in the three claim files: `answer`, `key_facts`, `limitations`,
`unknowns`, `missing_evidence` and each `review.reviewers` entry. The parked
claim as rendered under "Claims with no finding". The one added sentence in
`infrastructure-deficit.mdx`. `scripts/calcs/council-pause-vote.ts` and its
test. Connective or interpretive sentences that assert nothing about the
record were not counted. Nothing in scope was skipped.

**Grading bases.** Facts about Edmonton were graded against the archived
bytes of the evidence each claim cites. For the 15 carried sources, the
carried text was regenerated read-only with `scripts/panel/minutes-items.ts`
(rule v2, withholding on) for the meeting pages and with `pdftotext -layout`
for the PDFs. Facts about commenters were graded against
`intake/register.yaml` and capture record 449. Facts about what a reviewer
found were graded against `round1/*.json`, `round2/*.json` and
`synthesis.json`. Facts about the site's later checks were graded against
`faithfulness/`, `plain-speech/gpt-1.md`, `gate/freshness-audit.md`,
`carried/checks/gate.md` and `run-record.md`. No web access was used.

## Integrity check

All 21 archives the three claims cite are present and match their registry
`archive.sha256`: YF-EV-0118, 0140, 0204, 0209, 0210, 0211, 0212, 0213, 0214,
0216, 0221, 0222, 0223, 0225, 0226, 0227, 0228, 0229, 0230, 0231 and 0232.
YF-EV-0228 to 0232 exist only in this worktree's `evidence/private/`, not in
the main checkout (release check A2).

The carried text of the nine carried meeting pages was regenerated. Every
hash equals the manifest's `text.sha256`:

| ID | Regenerated sha256 (prefix) | Manifest |
|---|---|---|
| YF-EV-0209 | d57c0219… | match |
| YF-EV-0210 | 52b169f6… | match |
| YF-EV-0227 | 4d4b6bae… | match |
| YF-EV-0216 | 000acf8b… | match |
| YF-EV-0204 | 0ed50aa8… | match |
| YF-EV-0211 | f2c76be0… | match |
| YF-EV-0212 | 6d3742aa… | match |
| YF-EV-0213 | ebe6dd77… | match |
| YF-EV-0214 | 1bb56adb… | match |

Every vote, mover and quotation the page draws from those nine pages appears
in the carried text, not only in the full archive. Checked strings:
"Defeated (2 to 2)" ×2, "Carried (4 to 0)", "Will be reevaluated", "5
(Version 2)", "Defeated (4 to 8)", "26,808,000", "towards the tax levy",
"Defeated (4 to 7)", "Carried (9 to 4)", "Defeated (4 to 9)", the 50 Street
motion, "Due to time constraints" and the layover to October 6.

## The calculation

`npx tsx scripts/calcs/council-pause-vote.ts` prints: approved total
100,000,000. The 2023 cut is 50,000,000 and leaves 50,000,000, in band, vote
4 to 8. The 2024 cut is 67,300,000 and leaves 32,700,000 (67.3%), out of
band, vote 4 to 7. Both motions were jointly brought. The base the 2024 cut
would need for a $45–55M remainder is 112.3M to 122.3M. Committee votes are 2
to 2 and 2 to 2, with Knack and Paquette recorded on neither. The 2022
approval is 9 to 4 and the 2025 suspension 4 to 9. Routes: 13 continuing, 14
listed apart, 18 segments, split 3, 6 and 5. People: 6 in the question, with
5, 1, 1 and 1 per claim, and 3 claims carry the councillor's wording.
`npx vitest run tests/calcs-council-pause-vote.test.ts`: 6 passed.

Every transcribed cell was checked against the bytes: year splits, vote
lists by name, movers and seconders, both route lists and the route
statuses. All match. Every number in the prose equals the module or a cell
it transcribes. The June 2024 "2 to 10" and the $26,808,000 figure come
directly from YF-EV-0231 and YF-EV-0211, which spec §5.5 allows.

## Statement by statement

Grades: VERIFIED, CALC (reproduced by the module), **BLOCKING**, ADVISORY.

### Story — standfirst, TL;DR, changelog

| # | Statement | Grade | Basis |
|---|---|---|---|
| 1 | one_line: the committee did not vote on the City's proposal to review 14 routes | VERIFIED | YF-EV-0209 item 7.6: no motion to adopt Recommendation 1 was moved or put; the two votes were on Salvador's motion and Rutherford's amendment |
| 2 | TL;DR 1: a committee motion to continue the program failed on a tied vote | VERIFIED | YF-EV-0209: "Defeated (2 to 2)" |
| 3 | TL;DR 2: the records checked show no Council decision on the proposal by 2026-09-25 | VERIFIED | Bounded to the records read. YF-EV-0227 (whole page, not only the carried item) has no item on IS03688 apart from the notice laid over; YF-EV-0228 and 0229 have none; YF-EV-0221 lists none |
| 4 | TL;DR 3: the latest plan proposed another look at 14 routes without saying work had to wait | VERIFIED | YF-EV-0140 (Version 2). See A7 |
| 5 | TL;DR 4: Council voted down both cuts; only one would have left $50M of the $100M approved in 2022 | VERIFIED / CALC | YF-EV-0211, 0212, 0204; `motions` |
| 6 | TL;DR 5: we have not answered the same-seven claim | VERIFIED | `carried/checks/gate.md`; run-record "parked for this run" |
| 7 | Changelog: drafted from the 2026-09-29 run; four claims, three tested, all Partially supported and unanimous | VERIFIED | `synthesis.json` generated 2026-09-29T23:50Z; three claims, Unanimous |
| 8 | Changelog: the fourth was set aside before the rounds because the full vote set could not be assembled | VERIFIED | `carried/checks/gate.md`; run-record 2026-09-28 |
| 9 | Changelog: the panel read the report and selected minutes items from archived copies because the portal blocked automated access; each is labelled | VERIFIED | manifest `eligibility` (fetcher challenge or seat refusal); 15 labels render (release check) |

### Story — body

| # | Statement | Grade | Basis |
|---|---|---|---|
| 10 | The day after the 2026-08-26 meeting, six people under one Facebook post made claims | VERIFIED | register `accounts.total: 6`; every holder's comment dated 2026-08-27 (intake.md) |
| 11 | "One of the six is a city councillor, Jennifer Rice, writing under her own name" | **BLOCKING** | Finding B1 |
| 12 | Her comment carries three of the four claims | CALC | `claimsWithTheCouncillor: 3` |
| 13 | Five said council had not supported the review, ignored it, or passed up a second look | VERIFIED | `council-rejected-pause`: 5 authors; "second look" is Boreal Marmot L.'s wording |
| 14 | Rice wrote administration recommended "freezing 14 future routes to reassess" | VERIFIED | capture record 449, verbatim |
| 15 | She wrote she and Principe twice brought motions to cut to $50M, and lost | VERIFIED | record 449: "brought forward two motions — twice — to cut it to $50M … Council didn't support them" |
| 16 | One person said the same seven councillors voted for the program | VERIFIED | Icy Grebe A.: "The same old 7 councillors … voted for it" |
| 17 | Three claims checked, the fourth set aside; motives and merits not checked | VERIFIED | brief; gate.md |
| 18 | IS03688 went to the committee on 2026-08-26 and asked it to recommend Council approve the Attachment 5 approach | VERIFIED | YF-EV-0118 p. 1, Recommendation 1 |
| 19 | Two reasons: expected provincial change to bike-lane authority; more complaints about trade-offs such as lost parking | VERIFIED | YF-EV-0118 "Next Step": "anticipated municipal bike lane authority changes and considering community feedback about the impacts and trade-offs … (such as parking removal …)" |
| 20 | The change would not alter the program's $100 million budget or its borrowing | ADVISORY | A3 |
| 21 | Attachment 5 came in three versions, all on the agenda; same two lists; 13 continue, 14 set apart | VERIFIED / CALC | YF-EV-0210 items 7, 8, 9; YF-EV-0222, 0223, 0140; `routes` |
| 22 | Status table dated 2026-08-10: 3 contract awarded and not started, 6 "no longer viable", 5 no delivery plan or schedule, with no construction status for those five | VERIFIED / CALC | YF-EV-0226 pp. 1–3 ("accurate as of August 10, 2026") |
| 23 | Original: if Council approved, the 14 "would be removed from the scope" for 2026 and 2027, possibly revisited later | VERIFIED | YF-EV-0222 p. 2 |
| 24 | Version 1 dropped that sentence and kept "would be evaluated to determine if they should proceed" | VERIFIED | YF-EV-0223 p. 1 rule 1; p. 2 list preamble has no removal sentence |
| 25 | Version 2: remaining routes "will be evaluated for trade-offs, alternative design treatments and budget implications", a Q1 2027 report for direction; the 14 "may be re-evaluated using alternate design approaches" | VERIFIED | YF-EV-0140 p. 1 |
| 26 | "Under the original it did, and two of the three reviewers read Version 1 the same way" | **BLOCKING** | Finding B3 |
| 27 | Under Version 2 it recommended another look and a report back without saying the routes would wait | VERIFIED | YF-EV-0140; synthesis: all three seats |
| 28 | The minutes add both replacements without saying which was before members, so the check reads Version 2 | VERIFIED | YF-EV-0209 item 1.4; brief "operative version, fixed here" |
| 29 | The report says unstarted construction is "best postponed to 2027" because of weather, covering every unstarted route | VERIFIED | YF-EV-0118 p. 5 |
| 30 | The status table says the three tendered routes "may be delayed" or removed pending the Council report | VERIFIED | YF-EV-0226 footnote 2 |
| 31 | Before research the check decided a freeze needs the plan's own words; no Version 2 passage says the 14 must wait; one reviewer called it a close call | VERIFIED | brief claim 2 "Expressly … fixed here"; Claude round 1 "I rate it a close call" |
| 32 | The committee has six members, the mayor among them; seven other councillors attended | VERIFIED | YF-EV-0209 roll call: six present, Knack a member under s.15(3); Elliott, Morgan, Parmar, Principe, Stevenson, Tang, Wright also in attendance |
| 33 | No member moved to adopt the recommendation | VERIFIED | YF-EV-0209 item 7.6 |
| 34 | Salvador's motion: keep building within approved scope, advance tender-ready routes, get the rest ready for the earliest chance in 2027 | VERIFIED | YF-EV-0209 item 7.6, three-part motion |
| 35 | Rutherford moved to remove the "maximize remaining construction season" part | VERIFIED | YF-EV-0209 amendment |
| 36 | Both defeated 2 to 2; Salvador and Janz for the main motion, Rutherford and Clarke against; the reverse on the amendment | VERIFIED / CALC | YF-EV-0209; `committeeVotes` |
| 37 | Knack and Paquette are recorded on neither vote, and the minutes do not say why | VERIFIED | YF-EV-0209. The roll call says Paquette was absent for a portion; the claim limitation reports it |
| 38 | The committee neither adopted nor rejected the plan; strict and loose readings | VERIFIED | synthesis, all three seats |
| 39 | The recommendation could reach Council only if the committee carried it | VERIFIED | YF-EV-0118 Recommendation 1 ("That Infrastructure Committee recommend to City Council") |
| 40 | Nothing in the Council minutes the reviewers read decided it by 2026-09-25; those were chosen items | VERIFIED | Bounded. Manifest: YF-EV-0227 carried by items |
| 41 | The open voting record, checked 2026-09-29, listed no Council vote on the report up to 2026-09-22 | VERIFIED (reviewer report) | Claude round 2. Not archived; see A1 |
| 42 | The minutes of the two September public hearings, read after the panel, have no item on it | VERIFIED | YF-EV-0228 (only AT item: UPE02721 due date, 13 to 0), YF-EV-0229 (none) |
| 43 | Salvador gave notice asking for options for more money to finish the 14 routes in the 2027–2030 budget; laid over to October 6 | VERIFIED | YF-EV-0209 11.1; YF-EV-0216 10.1 and 11.1; YF-EV-0227 11.6 |
| 44 | No Council decision overrode the committee, because the committee made no decision on the plan | VERIFIED | Follows from row 33 |
| 45 | Council approved the program in December 2022 at $100M, 9 to 4, Principe and Rice among the four | VERIFIED / CALC | YF-EV-0204 item 12.9, CBA 7 put: "Carried (9 to 4)"; opposed Hamilton, Cartmell, Rice, Principe |
| 46 | November 2023: Principe moved, Rice seconded, a $50M cut from 2024–2026 funding with less borrowing; defeated 4 to 8 | VERIFIED / CALC | YF-EV-0211 5.1.2, CBA 2 re-stated: "with a funding reduction from tax-supported debt"; "Defeated (4 to 8)" |
| 47 | December 2024: Principe moved, Rice seconded, $33.65M in each of 2025 and 2026 to defund planning, design and delivery; defeated 4 to 7 | VERIFIED / CALC | YF-EV-0212 5.1.1 and 5.1.2: "Moved by: K. Principe / Seconded by: J. Rice" both times; "Defeated (4 to 7)". The drafter's account is correct; GPT-6 Luna's round-1 note naming Rice as mover is wrong and the page does not repeat it |
| 48 | The first would have left $50M; the second adds to $67.3M, leaving about $32.7M, about a third; calculations against the 2022 $100M | CALC | `motions` |
| 49 | None of the reviewers could see the budget sheet from either date | ADVISORY | A2 |
| 50 | The August 2026 report still describes the program as $100M approved in the 2023–2026 budget | VERIFIED | YF-EV-0118 Executive Summary: "As part of the 2023-2026 Capital Budget, $100 million was approved" |
| 51 | Only the 2023 cut matches "$50M"; only its text says where the money goes; the 2024 text names the borrowing but no destination; neither says "core priorities" | VERIFIED | YF-EV-0211, 0212 motion texts |
| 52 | "None of three other recorded motions involving one or both of them was a vote on cutting the program" | ADVISORY | A4 |
| 53 | A separate 2023 cut Rice moved, not naming the program, was withdrawn | VERIFIED | YF-EV-0211 CBA 3: "$26,808,000 … Withdrawn" |
| 54 | June 2024: the pair moved an amendment on new funding requests not naming the program; it lost 2 to 10 | VERIFIED | YF-EV-0231 item 7.1: moved by Principe, seconded by Rice, deleting "New Standalone Profiles Requesting Funding" 7.2-4, 7.2-5, 7.2-26, 7.2-30, 7.3-1; "Defeated (2 to 10)" |
| 55 | September 2025: Principe seconded a motion to halt unstarted bike-lane construction until every project was reviewed; lost 4 to 9 | VERIFIED / CALC | YF-EV-0213 item 10.13 |
| 56 | One commenter said the same seven voted for the program; the page tests neither the pattern nor the intentions | VERIFIED | register; brief |
| 57 | Checking it needs every Council vote since late 2022 in both councils; several budget-adjustment meetings are not archived; bundled votes depend on unarchived documents; the answer could be no, partly or nobody can tell | VERIFIED | `carried/checks/gate.md`: Not established, Partially supported (count 4) or Contradicted (count 3), by which votes count. Reports the gate's range, not a finding |
| 58 | Closing pointers to consultation, routes and infrastructure-deficit pages | VERIFIED | All three pages build; navigation only |

### Claim `cpv-committee-and-the-pause`

| # | Statement | Grade | Basis |
|---|---|---|---|
| 59 | Answer: the committee left the plan to take another look at 14 routes undecided, neither adopting nor voting it down | VERIFIED | rows 33, 36 |
| 60 | KF1: Recommendation 1; "Council decision required" | VERIFIED | YF-EV-0118 p. 1 |
| 61 | KF2: Version 2 content; 14 projects that may be re-evaluated | VERIFIED / CALC | YF-EV-0140 |
| 62 | KF3: no motion to adopt, moved or put | VERIFIED | YF-EV-0209 |
| 63 | KF4: Salvador's motion, 2 to 2, by name | VERIFIED | YF-EV-0209 |
| 64 | KF5a: Rutherford's amendment 2 to 2; Knack and Paquette on neither | VERIFIED | YF-EV-0209 |
| 65 | KF5b: "The only motion on the item that carried kept a confidential attachment private, 4 to 0" | **BLOCKING** | Finding B4 |
| 66 | KF6: Executive Committee 2026-09-02, notice restated for lack of time; Council 2026-09-08 laid it over to October 6 | VERIFIED | YF-EV-0216 10.1, 11.1; YF-EV-0227 11.6 |
| 67 | KF7: October 6 agenda as published 2026-09-25 lists Salvador's motion and no IS03688 item | VERIFIED | YF-EV-0221 item 10.6; no "IS03688" string on the page |
| 68 | KF8: September 15 and 22 public-hearing minutes hold no IS03688 item; September 15 2.1 set a new due date for UPE02721 | VERIFIED | YF-EV-0228 item 2.1 (Dec 8, 2026, 13 to 0); YF-EV-0229 |
| 69 | L1: a committee of six; records reviewed show no Council decision; some meetings not reviewed | VERIFIED | Bounded as required |
| 70 | L2: strict and loose readings of "did not support" | VERIFIED | synthesis: all three seats give Supported on the alternative reading |
| 71 | L3: no override; no later Council decision in the records read | VERIFIED | row 44 |
| 72 | L4: operative version unrecorded; Version 2 no hold; original and Version 1 a hold; same finding either way | VERIFIED | synthesis and round 2, all three seats |
| 73 | L5: minutes do not say why the mayor and Paquette are absent from the votes; Paquette absent for part of the meeting | VERIFIED | YF-EV-0209 roll call |
| 74 | L6: reviewers read selected items; the September 15 and 22 minutes were not among them; the site read them later; the open record checked by one reviewer on 2026-09-29 showed no vote through 2026-09-22 | VERIFIED | manifest; Claude round 2 |
| 75 | L7: the program kept its December 2022 scope, as changed for 50 Street on 2026-07-07; the weather sentence is administration's assessment | VERIFIED | YF-EV-0214 item 7.5 (carried 9 to 3); YF-EV-0118. Unbounded "kept"; see A5 |
| 76 | Unknowns and missing evidence | VERIFIED | consistent with rows 40–43 |
| 77 | Claude: High, no verdict change, corrected the open-record reach to 2026-09-22 | VERIFIED | round 1 "latest row 2026-08-26"; round 2 "rows up to 2026-09-22" |
| 78 | GPT-6 Sol: Moderate; in cross-review said one meeting's selected minutes cannot show Council never received it | VERIFIED | round 2 gpt `errors_in_other_reviews` |
| 79 | GPT-6 Luna: High, no change; notice laid over to October 6 | VERIFIED | synthesis; round 2 gpt-luna |

### Claim `cpv-administration-recommended-freeze`

| # | Statement | Grade | Basis |
|---|---|---|---|
| 80 | Answer: "Administration set 14 bike routes aside for a second look but did not say they would wait, though the first version of its plan would have dropped them for 2026 and 2027" | **BLOCKING** | Finding B2 |
| 81 | KF1: recommendation | VERIFIED | YF-EV-0118 |
| 82 | KF2: three versions on the agenda; same 13 and 14; 14 entries or 18 stretches; three entries of two or three stretches | VERIFIED / CALC | YF-EV-0210, 0222, 0223, 0140; `listedApartSegments: 18` |
| 83 | KF3: original "would be removed from the scope … for 2026 and 2027" | VERIFIED | YF-EV-0222 p. 2 |
| 84 | KF4: Version 1 drops it; evaluation rule; lane or parking routes removed; "may be revisited" | VERIFIED | YF-EV-0223 |
| 85 | KF5: Version 2 text, Q1 2027 report, "may be re-evaluated using alternate design approaches" | VERIFIED | YF-EV-0140 |
| 86 | KF6: "construction is best postponed to 2027" covers every unstarted route | VERIFIED | YF-EV-0118 |
| 87 | KF7: status table as of 2026-08-10: 3, 6, 5 | VERIFIED / CALC | YF-EV-0226 (YF-EV-0225 identical in these rows) |
| 88 | KF8: tendered routes "may be delayed (in whole or in part) to 2027 or removed"; next steps for the six "will depend on Council's direction" | VERIFIED | YF-EV-0226 footnote 2 and p. 2 |
| 89 | KF9: approval would not change the capital profile or borrowing bylaws | VERIFIED | YF-EV-0118 Budget/Financial Implications |
| 90 | L1: version dependence; Version 2 fails, original meets; "Two of the three reviewers said Version 1 would meet it too" | **BLOCKING** (last sentence) | Finding B3 |
| 91 | L2: "On Version 1 the reviewers did not all agree … GPT-6 Sol first read it as falling short and in cross-review agreed it was one" | **BLOCKING** | Finding B3 |
| 92 | L3: freeze test fixed before research; inference not enough; Claude called it a close call | VERIFIED | brief; Claude round 1 |
| 93 | L4: Salvador's notice names a heading found only in the original and Version 1 | VERIFIED | "Will be reevaluated for feasibility and subject to funding availability" is in YF-EV-0222 and 0223, absent from 0140; quoted in YF-EV-0209 11.1, 0216, 0227 |
| 94 | L5: table dated 2026-08-10, sixteen days before; no reviewer found an 08-26 record | VERIFIED | round 2, all three seats |
| 95 | L6: Luna said "no delivery plan" does not show five routes unstarted; the other two counted all 14 | VERIFIED | round 2 gpt-luna; Claude round 2 "All 14 are unbuilt"; Sol round 2 "support an unbuilt count of 14 … less explicit" |
| 96 | L7: whether to freeze or build is not tested | VERIFIED | brief |
| 97 | Unknowns and missing evidence | VERIFIED | YF-EV-0209 lists the presentation as attachment 10; no seat read it |
| 98 | Claude: Moderate; key findings; no change; pointed out the notice's heading | VERIFIED | round 1 and round 2 claude |
| 99 | GPT-6 Sol: Moderate; in cross-review accepted that Version 1 meets the test | VERIFIED | round 1 gpt: Version 1 "Partially supported under both readings"; round 2: "meeting the primary deferral reading" |
| 100 | GPT-6 Luna: raised confidence to High; said five routes' status unresolved, so no yes under earlier versions | VERIFIED as far as it goes | round 2 gpt-luna. It omits that Luna also found Version 1's deferral met; see B3 |

### Claim `cpv-motions-to-cut-to-50-million`

| # | Statement | Grade | Basis |
|---|---|---|---|
| 101 | Answer: they brought two cuts, council voted both down, only one would have left about $50M | VERIFIED | rows 46–48. See A6 on the base |
| 102 | KF1: December 2022, CM-20-0330, $100,000,000 for 2023–2026, tax-supported debt, 9 to 4 | VERIFIED | YF-EV-0204 12.9 |
| 103 | KF2: Nov 2023 amendment $50,000,000 (16,350,000 / 16,825,000 / 16,825,000) "with a funding reduction from tax-supported debt"; first moved "towards the tax levy"; re-stated by Principe | VERIFIED | YF-EV-0211 5.1.1 and 5.1.2 |
| 104 | KF3: 4 to 8 by name; Janz not recorded | VERIFIED / CALC | YF-EV-0211 |
| 105 | KF4: 2023 cut leaves $50,000,000 | CALC | |
| 106 | KF5: December 2024, Principe moved, Rice seconded, 33,650,000 ×2, quoted text | VERIFIED | YF-EV-0212 |
| 107 | KF6: 4 to 7 by name; Hamilton not recorded; Paquette absent | VERIFIED / CALC | YF-EV-0212 roll call: "Councillor A. Paquette was absent with notice" |
| 108 | KF7: 67,300,000; leaves 32,700,000, about a third | CALC | |
| 109 | KF8: August 2026, still $100M approved in 2023–2026 | VERIFIED | YF-EV-0118 |
| 110 | KF9: spring 2023, 2024 and 2025 minutes hold no motion naming the program; June 2024 amendment 2 to 10 | VERIFIED | YF-EV-0230, 0231, 0232: no "CM-20-0330", "Active Transportation" or "bike" anywhere on any of the three pages; YF-EV-0231 as row 54 |
| 111 | L1: holds and fails; 2024 outside the $45–55M band fixed before research | VERIFIED | brief claim 3 band |
| 112 | L2: destinations; neither says "core priorities" | VERIFIED | row 51 |
| 113 | L3: looser reading; Luna first said yes, then agreed 2024 names no destination | VERIFIED | Luna round 1 "the classification is Supported"; round 2 "lacks a named destination" |
| 114 | L4: no reviewer could open the budget sheet; 112.3–122.3M; 2026 report still $100M | CALC / ADVISORY | A2 |
| 115 | L5: other motions; 2023 Rice $26,808,000 withdrawn; Sept 2025 4 to 9 | VERIFIED | rows 53, 55. Wording, see A4 |
| 116 | L6: meetings read; spring adjustments not searchable by reviewers, read later by the site, no motion naming the program | VERIFIED | row 110 |
| 117 | Unknowns and missing evidence | VERIFIED | |
| 118 | Claude: Moderate to High; both moved by Principe, seconded by Rice; 4 to 8, 4 to 7; $50M and $32.7M | VERIFIED | round 1 and round 2 claude |
| 119 | GPT-6 Sol: High to Moderate; base rests on the 2022 approval | VERIFIED | round 2 gpt |
| 120 | GPT-6 Luna: High; corrected its round-1 mover to Principe; no destination in 2024 | VERIFIED | Luna round 1: "Rice moved the December 2, 2024 amendment"; round 2: "Principe moved and Rice seconded both" |

### Parked claim and other changed text

| # | Statement | Grade | Basis |
|---|---|---|---|
| 121 | "The same seven councillors vote together …", said in 2 comments, under "Claims with no finding" with the disclaimer that nothing there says whether it is true | VERIFIED | register: two wordings by Icy Grebe A. |
| 122 | Nothing on the page offers the other findings as an answer to claim 4 | VERIFIED | The story's own section disclaims it. The vote lists in claim 3's key facts are reported as votes on those motions only. No sentence counts a bloc or names a recurring seven. The 2024 "Opposed (7)" list is a different seven from the 2023 opponents (Janz in, Paquette and Rutherford out), and the page draws nothing from it |
| 123 | infrastructure-deficit.mdx: "That motion and an earlier one in 2023 are checked on a separate page" | VERIFIED | Link builds to `/questions/council-pause-vote`; the 2023 motion is row 46 |

## Findings

### Blocking

**B1 — The story says Jennifer Rice is a city councillor in August 2026. The
archived records show she was not.**

> "One of the six is a city councillor, Jennifer Rice, writing under her own
> name."

The Council's 2026 attendance lists name 13 members: the mayor and 12
councillors. Rice is not among them. The lists are in YF-EV-0214 (July 7),
YF-EV-0227 (September 8) and YF-EV-0228 (September 15), and the September 22
list (YF-EV-0229) also lacks her. The Infrastructure Committee minutes
(YF-EV-0209) name the seven non-member councillors who attended, and she is
not one of them. The last archived roll call that includes her is September
16, 2025 (YF-EV-0213), before the October 2025 election that the page itself
mentions. The Claude seat noted this in round 1: "Rice appears as a member
in the 2022-2025 minutes, not in the 2026 attendance lists." Her Facebook
display name, "Councillor Jennifer Rice" (capture record 449), is where the
title came from, and the brief (line 81) and `intake.md` (line 41) carry the
same error ("a sitting councillor").

Correction the record supports:

> "One of the six is Jennifer Rice, a city councillor until the October 2025
> election, commenting under the name 'Councillor Jennifer Rice'."

The TL;DR, claim 3's question and its answer call her "Councillor" in
describing the 2023 and 2024 motions, when she was one. Those can stay. The
naming question this raises is release-check B1.

**B2 — Claim 2's answer says administration did not say the routes would
wait. Two of its three versions did, and the answer names only one of them.**

> "Partly. Administration set 14 bike routes aside for a second look but did
> not say they would wait, though the first version of its plan would have
> dropped them for 2026 and 2027."

The brief requires a version-sensitive finding to "say so beside the
verdict". The original would have removed the 14 from the program for 2026
and 2027 (YF-EV-0222). Version 1 says routes not yet built "would be
evaluated to determine if they should proceed" (YF-EV-0223). By round 2,
every seat said that wording meets the deferral test (B3). Only Version 2
lacks such wording. The main clause attributes Version 2's silence to
"administration" as a whole, and the "though" clause covers only the first
version. The answer is therefore stronger than synthesis. The run record and
the synthesis notes say the finding is Partially supported under Version 2
and that the result is version-sensitive.

Correction the record supports:

> "Partly. Administration's latest version of its plan set 14 bike routes
> aside for a second look without saying they would wait. Its two earlier
> versions held them back, and the first would have dropped them for 2026
> and 2027."

**B3 — The page says two of the three reviewers read Version 1 as a freeze.
In round 2, all three did.**

> Story: "Under the original it did, and two of the three reviewers read
> Version 1 the same way."
> Limitation 1: "Two of the three reviewers said Version 1 would meet it
> too, because under it proceeding waits on the evaluation."
> Limitation 2: "On Version 1 the reviewers did not all agree. Claude Opus
> 5.5 read its rule … as a freeze. GPT-6 Sol first read it as falling short
> and in cross-review agreed it was one."

Round 1: Claude said Version 1 met the primary deferral reading. Sol said
Version 1 was "Partially supported under both readings". Luna said only
"Version 1 says they may be revisited". In round 2, Luna says the original
and Version 1 both say the routes would be evaluated before proceeding, and
"unresolved status is the only obstacle where their express-deferral and
count conditions are met". So Luna, too, found the deferral (freeze) element
met under Version 1, and withheld a full yes only because five routes'
construction status is unresolved. The count is one of three in round 1 and
three of three in round 2. "Two of the three" matches neither round, and
"did not all agree" holds only for round 1. Faithfulness item 20, which
introduced the wording, named only "the final Claude and Sol reviews". It did
not have Luna's round-2 text in view.

Corrections the record supports:

> Story: "Under the original it did, and in cross-review all three reviewers
> read Version 1 as holding the routes back too."
>
> Limitation 1, last sentence: "In cross-review all three reviewers said
> Version 1 would meet it too, because under it proceeding waits on the
> evaluation."
>
> Limitation 2: "On Version 1 the reviewers first disagreed. Claude Opus 5.5
> read its rule, that routes not yet built would be evaluated to decide
> whether they should proceed, as a freeze from the start. GPT-6 Sol and
> GPT-6 Luna first read it as falling short, and in cross-review both agreed
> it met the test. GPT-6 Luna still would not call the claim Supported under
> Version 1, because the construction status of five routes is unresolved."

The GPT-6 Luna reviewer entry's `changed_between_rounds` can stay as written.

**B4 — A claim 1 key fact says one motion carried on item 7.6. Three did.**

> "The only motion on the item that carried kept a confidential attachment
> private, 4 to 0."

Item 7.6 of YF-EV-0209 also records "That Infrastructure Committee meet in
private … for the discussion of item 7.6", carried 5 to 0, and "That
Infrastructure Committee meet in public", carried 5 to 0. The Claude seat
wrote "Only procedural motions and the Attachment 4 privacy motion carried."

Correction the record supports:

> "Apart from two procedural motions to go into and out of a private
> session, the only motion on the item that carried kept a confidential
> attachment private, 4 to 0."

### Advisory

**A1 — The story's open-voting-record sentence lacks the attribution the
claim gives it.** The story says "the City's open voting record, checked on
September 29, listed no Council vote on the report up to September 22". That
check was one reviewer's round-2 query. The data rows are not archived, and
YF-EV-0224 is only the dataset's about page. Claim 1's limitation says
"checked by one reviewer". Add "by one reviewer" to the story.

**A2 — "None of the reviewers could see the program's budget sheet" is
contested by the seats' own files.** GPT-6 Sol in round 1 and GPT-6 Luna in
round 2 cite DocumentId 245911, a September 30, 2024 capital update, as
showing $100,000,000 as the current approved budget. Sol withdrew it in round
2 ("returned HTTP 403 to my independent fetch; I do not rely on its
unverified claim"). The freshness disposition records that it was cited
"from search text it could not open". Suggested story wording: "No reviewer
could open the program's budget sheet from either date; two cited a
September 2024 capital update showing $100 million that none could open in
cross-review and this site could not archive." Claim 3 limitation 4 already
says "could open", which is defensible.

**A3 — "The change would not alter the program's $100 million budget" goes
beyond the report.** IS03688 says approval would not change "the existing
capital profile CM-20-0330 … or associated borrowing bylaws". It does not
give $100 million as the current budget in that sentence. The site's own
infrastructure-deficit page says the June 2025 adjustment left the program
at $99.57 million, and the freshness audit (motions 2) asked the page to
avoid implying $100 million was the current total throughout 2026. Suggested
wording: "It said the change would not alter the program's capital budget or
its borrowing."

**A4 — Two sentences about the councillors' other motions misdescribe their
scope.** The story says "None of three other recorded motions involving one
or both of them …", which reads as if only three exist, when the minutes
record many unrelated motions by both. Claim 3 limitation 5 opens "Other
recorded motions by the two councillors on the program", then lists a cut
"that did not name the program". Suggested wording: "Three other recorded
motions that one or both of them moved or seconded were not votes on cutting
the program." The limitation should say "Other recorded motions by the two
councillors that bear on the program".

**A5 — Claim 1 limitation 7's "The program kept the scope Council approved
in December 2022" is not bounded.** It is true of the records read, which
show only the 50 Street change. Add "in the records read".

**A6 — Claim 3's answer drops the 2022 base.** Faithfulness dispositions 5
and 22 put the base in the answer, and the plain-speech read later moved it
to TL;DR 4, the key facts and a limitation. The answer is not stronger than
synthesis, because every seat used the $100 million base, but a reader
landing on the claim page sees "would have left about $50 million" without
it. This is optional.

**A7 — Dating and TL;DR 3.** `last_verified` is 2026-10-01, but YF-EV-0228
to 0232 were retrieved and read on 2026-10-02, and the 2026-10-01 changelog
note predates those additions. Set `last_verified` to 2026-10-02 and add a
changelog line. TL;DR 3 is accurate ("latest plan"); adding "Its first
version would have dropped them for 2026 and 2027" would carry the version
sensitivity into the ten-second layer.

`SOURCE VERIFICATION: 4 blocking, 7 advisory`
