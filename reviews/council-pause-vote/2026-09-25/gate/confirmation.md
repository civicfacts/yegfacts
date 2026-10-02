<!-- Dispositions, 2026-10-02, by Stew (drafting seat Claude Opus 5.5). The three new blocking items fixed as the editor decided; advisories A1 and A2 adopted, A3 left. No finding changed. This committed copy replaces the commenter's pseudonym with "[the pseudonym]" wherever the report sets it beside her name, so that no current file pairs the two (N2); nothing else in the report is changed.

N1, adopted in the gate's wording: the story says "This site could not open or archive the program's budget sheet from either date. Two reviewers cited a September 2024 capital update showing $100 million. Two others got an error when they tried to open it, and it is not in our archive." (the gate's semicolon is a full stop, for the site's one-idea-per-sentence rule). Claim 3 limitation 4's first clause now reads "This site could not open or archive the program's budget sheet as it stood at either motion".

N2, fixed by removing the link: run-record.md and the release-check disposition now describe the error generically and never pair the pseudonym with her name. The 2026-09-02 partial capture and the rice-50m candidate intake now give the commenter as the pseudonym, with a dated correction; that candidate's triage report and the bike-100m triage report no longer name her as a commenter. The candidate's directory name, rice-50m-motions-and-review, still carries her surname and was left: it names the claim about her motions in office. The intake README now says earlier commits, and some frozen run records, carry her real name as the commenter, and that no current file pairs the two.

N3, the editor's decision, the gate's wording with one change: the colon became a full stop, because the story schema rejects a colon in the standfirst (the one-idea rule) and the build fails on it. "No. In the records we checked, council did not pause the routes. Its Infrastructure Committee neither adopted nor rejected administration's plan to set 14 bike routes aside, and Council made no decision on it by September 25." The 33-word warning is left as it is.

A1, adopted: "decided nothing on the plan either way". A2, adopted in a few words: the parked line now says some bundled budget votes are not sorted out. A3, left, by the editor's decision. -->

# Gate confirmation — council-pause-vote

Result: all 5 earlier blocking findings resolved; 3 new blocking, 3 advisory

Gate stage 7, confirmation. Run 2026-10-02 on worktree `draft-cpv` at
`8b86634` (PR #110), against the gate reports of `0840853`. Auditor: the same
Claude (Opus 5.5) audit session that wrote the gate reports, separate from the
drafter. Read-only; nothing in the repository was edited.

**Checks run.** `npm run build` exits 0. `npm run validate` is OK. Its only
note on this page is that the new `one_line` is 33 words long.
`npx vitest run tests/calcs-council-pause-vote.test.ts tests/carried-label.test.ts`:
16 passed. `npm run audit:exposure` shows 0 in every fail class, and the PII
warnings are unchanged at 90. In `dist/`, no file matches the hash of a
private archive. The question page carries the 15 carried-source labels, and
the claim pages now tag each carried citation as "(selected items)" or
"(archived copy)". Uncarried sources (0221, 0228, 0229) correctly get no
tag.

## 1. The earlier blocking findings

| Finding | Status | New text |
|---|---|---|
| Source B1, Rice called a sitting councillor | RESOLVED | Story: "One comment, by [the pseudonym], carries three of the four claims on this page." and "with Principe and Rice, both councillors then, among the four against. Rice sat on Council until the October 2025 election." The 2026 attendance lists (YF-EV-0214, 0227, 0228, 0229) omit her and the 2025-09-16 roll call (YF-EV-0213) includes her. |
| Source B2, claim 2 answer | RESOLVED | "Partly. Administration's latest version of its plan set 14 bike routes aside for a second look without saying they would wait. Its two earlier versions held them back, and the original would have dropped them for 2026 and 2027." Checked against YF-EV-0140, 0223 and 0222. |
| Source B3, Version 1 reviewer count | RESOLVED | Story: "in cross-review all three reviewers read Version 1 as holding the routes back too". Limitation 1: "In cross-review all three reviewers said Version 1 would meet it too". Limitation 2 now reads as the gate wrote it. Claim 1 limitation 4: "all three reviewers came to see Version 1 as one too". All match round 2. |
| Source B4, motions carried on item 7.6 | RESOLVED | "Apart from two procedural motions to go into and out of a private session, the only motion on the item that carried kept a confidential attachment private, 4 to 0." Checked against YF-EV-0209 item 7.6. |
| Release B1, Rice named as commenter | RESOLVED on the site; see N2 for the repository | Her comment is now attributed to "[the pseudonym]" on every built page. See section 3. |

## 2. Statements changed since 0840853

| Statement | Grade | Basis |
|---|---|---|
| one_line: "No, nothing was paused, because council's Infrastructure Committee neither adopted nor rejected … The Council records we checked show no decision on it by September 25." | **BLOCKING** | Finding N3 |
| TL;DR 1: a committee motion to keep building the routes as planned failed 2 to 2, "so the committee decided nothing either way" | VERIFIED, see A1 | YF-EV-0209 item 7.6 |
| TL;DR 2: a councillor has since asked Council to look at more money for the 14 routes, and Council put that motion off to October 6 | VERIFIED | YF-EV-0209 11.1 (notice given at the meeting), YF-EV-0216 11.1, and YF-EV-0227 11.6: "Laid Over: September 8, 2026, City Council to October 6, 2026" |
| TL;DR 3: the original plan would have dropped 14 routes for 2026 and 2027; the latest only proposed another look | VERIFIED | YF-EV-0222 p. 2; YF-EV-0140 |
| Claim 1 answer: neither adopted nor voted down; full Council had not decided it by September 25 in the records the reviewers read | VERIFIED | YF-EV-0209; bounded as required |
| Claim 1 key fact 5 and limitations 4 and 7 | VERIFIED | Section 1; "In the records read" now bounds limitation 7 |
| Claim 2 answer and limitations 1 and 2 | VERIFIED | Section 1 |
| Claim 3 key fact 3: defeated 4 to 8, Principe and Rice among the four in favour, one councillor not recorded | VERIFIED | YF-EV-0211: Janz not recorded |
| Claim 3 key fact 6: defeated 4 to 7, Principe and Rice with two others, one absent, another not recorded | VERIFIED | YF-EV-0212: Cartmell and Rutherford with them; Paquette "absent with notice"; Hamilton not recorded |
| Claim 3 limitation 5: "that bear on the program" | VERIFIED | |
| Story: "The checks were made by a panel of three AI models, called the reviewers below, under rules fixed before they started." | VERIFIED | `run.yaml`; the brief was frozen before round 1 |
| AI review caption: each reviewer's verdict and confidence are from round one | VERIFIED | `synthesis.json` `basis: round1`; the matrix values match round 1 |
| Story: "It said the change would not alter the program's capital budget or its borrowing." | VERIFIED | YF-EV-0118 Budget/Financial Implications |
| Story: "The City labelled the two replacements Version 1 and Version 2." | VERIFIED | YF-EV-0210 items 7 and 8 |
| Story: the report asked the committee to send the plan to Council with a recommendation, and the committee carried no motion on it | VERIFIED | YF-EV-0118 Recommendation 1; YF-EV-0209 |
| Story: one reviewer's look at the open voting record on 2026-09-29 found no Council vote up to 2026-09-22 | VERIFIED | Claude round 2 |
| Story: "Council … put it off to its meeting of October 6" | VERIFIED | YF-EV-0227 |
| Story: "No reviewer could open the program's budget sheet from either date. Two cited a September 2024 capital update showing $100 million, which none could open in cross-review and this site could not archive." | **BLOCKING** | Finding N1 |
| Story: "Three other recorded motions that one or both of them moved or seconded were not votes on cutting the program." | VERIFIED | YF-EV-0211 CBA 3, YF-EV-0231 7.1, YF-EV-0213 10.13 |
| Story: "Neither text uses the comment's words 'core priorities'" | VERIFIED | |
| Story, same-seven section: the pattern shows only across all votes in both councils; a single vote or a list on one motion does not test it | VERIFIED | Interpretive, consistent with `carried/checks/gate.md`. Nothing presents the other findings as an answer |
| Parked line (rendered under "Claims with no finding" and on the claim page): "Set aside for this check, because some Council votes it needs, from late 2022 on, are not in our archive yet. It can be checked once they are." | VERIFIED, see A2 | `carried/checks/gate.md` |
| Story changelog note of 2026-10-02 | VERIFIED | Matches the dispositions and run-record |
| `last_verified: 2026-10-02` | VERIFIED | |
| Story: "[the pseudonym] wrote … that she and Councillor Karen Principe had twice brought motions …, and lost" | VERIFIED | Capture record 449 (now under the pseudonym) |
| Carried label text: "The AI reviewers saw only the items on this City meeting page that our published rule picked, from our archived copy, because the City's portal blocked automated access"; "Our copy carries no grant to republish it" | VERIFIED | Manifest `eligibility` (seat refusal or fetcher challenge); registry `redistribution: unclear` |
| infra-roads-condition wording note, now "the commenter, a former councillor"; active-transportation `seen` card attribution removed | VERIFIED | |

## 3. Release: the pseudonym

- **Built pages.** Searching `dist/` for "Jennifer Rice" returns 12 files: the
  questions index, the question page, two claim pages and eight evidence
  pages. In every occurrence her name sits in claim 3's question or answer,
  TL;DR 4, or the register proposition about the two motions, which is about
  her votes and motions in office. "tastawiyiniwak" appears on no built
  page. Every captured wording of comment 449 renders as "[the pseudonym]", so
  the caption "Each name is a pseudonym" is now true. PASS.
- **Capture and register.** In `comments.jsonl`, record 449 and the four
  replies that addressed her (450, 454, 455, 456) all read "[the pseudonym]".
  The register's five `author_name` entries match. No other commenter in the
  capture carries that label. The capture's full-file hash is pinned nowhere
  in the repository, so the edit breaks no frozen record. The
  "hash rule" that produced the label lives in the private board repo and
  could not be checked from here. Consistent within these two files.
- **Elsewhere in the repository, not consistent.** See N2.

## 4. Archives in the main checkout

YF-EV-0228, 0229, 0230, 0231 and 0232 are present in
the main checkout's `evidence/private/` and each matches its
registry `archive.sha256`. Each registry entry now has the standard rights
note. PASS.

## New findings

### Blocking

**N1 — The new budget-sheet sentence says something about GPT-6 Luna that
its round-2 file does not support.** (The wording came from my own advisory
A2, which was wrong on this point.)

> "No reviewer could open the program's budget sheet from either date. Two
> cited a September 2024 capital update showing $100 million, which none
> could open in cross-review and this site could not archive."

GPT-6 Luna's round-2 file cites DocumentId 245911 twice, as "strong" evidence
that "the September 30, 2024 capital update reports the current approved
CM-20-0330 budget as $100,000,000", and records no failure to open it. Only
Claude (round 2: "got HTTP 403") and GPT-6 Sol (round 2: "returned HTTP 403
to my independent fetch") report that they could not open it. The record
therefore supports neither "none could open in cross-review" nor "no
reviewer could open the program's budget sheet". Claim 3 limitation 4
("No reviewer could open the program's budget sheet as it stood at either
motion") has the same problem.

Exact fix, story:

> "This site could not open or archive the program's budget sheet from
> either date. Two reviewers cited a September 2024 capital update showing
> $100 million; two others got an error when they tried to open it, and it
> is not in our archive."

Claim 3 limitation 4, first clause:

> "This site could not open or archive the program's budget sheet as it
> stood at either motion, so both cuts are measured against the
> $100,000,000 approved in December 2022."

The rest of the limitation is unchanged.

**N2 — The pseudonym is undone elsewhere in the public repository.** The
yegscoop capture README says the mapping from pseudonym to real name "is held
privately and is not in this repository". This branch publishes that
mapping, and an earlier file still names her as the commenter:

- `intake/captures/2026-09-02-yegscoop-bike-lanes.md` line 30 attributes the
  same comment to "**Councillor Jennifer Rice** (Ward tastawiyiniwak)", and
  its header says "A sitting councillor is named". That is the premise this
  branch corrected. The new README note points readers to this file.
- `reviews/council-pause-vote/2026-09-25/run-record.md` (new on this
  branch): "the author of comment 449, Jennifer Rice … the pseudonym …
  [the pseudonym]".
- The disposition header of `gate/release-check.md` (new on this branch)
  states the same mapping.
- `intake/candidates/rice-50m-motions-and-review/intake.md` line 17: "Who
  said it: Councillor Jennifer Rice … a sitting councillor".

No built page is affected. But the repository is the site's public record,
and the README's privacy statement is now false for this commenter. The page
itself lets a reader infer the link ("she and Councillor Karen Principe"),
so this is a consistency and honesty defect, not a new exposure of hidden
identity. That is also why the cheaper fix is available.

Exact fix, owner Stew. Choose one:

1. Remove the mapping. In `2026-09-02-yegscoop-bike-lanes.md`, replace the
   line-30 heading with "**[the pseudonym]**", and replace "A sitting councillor
   is named, as a public …" with a dated correction like the README's. In
   `intake/candidates/rice-50m-motions-and-review/intake.md` line 17, put
   "[the pseudonym], a former councillor". In `run-record.md` and the
   release-check disposition, write "the author of comment 449, a former
   councillor" in place of her name.
2. Or decide the mapping may stay public, because she commented under her
   own public page and her comment names her role in the motions. Then
   record that decision in `run-record.md`, and amend the README's sentence
   to "The mapping is held privately, except for one former councillor whose
   comment identifies her (see the correction below)". Also add a correction
   note to `2026-09-02-yegscoop-bike-lanes.md` saying its "sitting
   councillor" premise was wrong.

**N3 — The new standfirst says "nothing was paused". The cited status table
says part of a listed route was.**

> "No, nothing was paused, because council's Infrastructure Committee
> neither adopted nor rejected administration's plan …"

The replacement Attachment 3 (YF-EV-0226, footnote 1), cited by claim 2,
says: "The section from 101 Avenue to 109A Avenue has been paused for
reconsideration, pending confirmation of funding availability and review of
anticipated legislative changes." That segment is one of the 14 routes set
apart. The report also says unstarted construction is "best postponed to
2027". What the record supports is that council did not pause the routes,
within the records read. It does not support the claim that nothing was
paused.

Exact fix:

> "No. In the records we checked, council did not pause the routes: its
> Infrastructure Committee neither adopted nor rejected administration's
> plan to set 14 bike routes aside, and Council made no decision on it by
> September 25."

### Advisory

- **A1** — TL;DR 1's "decided nothing either way" is true of the plan but not
  of the item, because the committee kept Attachment 4 private, 4 to 0.
  "decided nothing on the plan either way" would be exact.
- **A2** — The parked line ends "It can be checked once they are". The gate
  record (`carried/checks/gate.md`) also needs the relevance of bundled
  budget votes resolved, which the story body says. Suggested wording: "It
  can be checked once they are archived and the bundled budget votes are
  sorted out."
- **A3** — The `one_line` is 33 words and draws the validator's length
  warning. N3's fix keeps it about the same length. Shortening it is
  optional.

GATE: FAIL

- N1: the story sentence and the first clause of claim 3 limitation 4 should
  say "This site could not open or archive the program's budget sheet …"
  and report that two reviewers cited the September 2024 update and two
  others got an error opening it (wording above).
- N2: remove the published pseudonym-to-name mapping and pseudonymise the
  2026-09-02 capture and the candidate intake, or record the decision to
  keep it public and correct the README and the 2026-09-02 capture (both
  options above).
- N3: the `one_line` should read "No. In the records we checked, council
  did not pause the routes: its Infrastructure Committee neither adopted nor
  rejected administration's plan to set 14 bike routes aside, and Council
  made no decision on it by September 25."
