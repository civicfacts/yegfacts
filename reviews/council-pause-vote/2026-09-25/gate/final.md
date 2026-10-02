<!-- Dispositions, 2026-10-02, by Stew (drafting seat Claude Opus 5.5). F1 fixed exactly as written; A1 adopted, both parts. With F1 changed the gate passes. This committed copy replaces the commenter's pseudonym with "[the pseudonym]" so that no current file pairs it with her name; nothing else in the report is changed.

F1, adopted as written: the story now says "GPT-6 Sol and GPT-6 Luna cited a September 2024 capital update showing $100 million. Claude Opus 5.5 and GPT-6 Sol got an error when they tried to open it in cross-review, and it is not in our archive."

A1, adopted: the intake README says "no current file states which pseudonym is hers", and the selected-items label says "We have found no permission to republish our copy", with the label test pinning the wording. -->

# Final gate confirmation — council-pause-vote

Result: N2 and N3 resolved; N1 resolved in claim 3 but not in the story; 1 blocking, 1 advisory

Gate stage 7, final confirmation. Run 2026-10-02 on worktree `draft-cpv` at
`57c87b7` (PR #110), against `gate/confirmation.md` of `8b86634`. Auditor:
the same Claude (Opus 5.5) audit session, separate from the drafter.
Read-only. `npm run build` exits 0, `npm run validate` is OK, and
`tests/calcs-council-pause-vote.test.ts` plus `tests/carried-label.test.ts`
pass (16 tests).

## 1. N1, N2, N3

**N1 — NOT RESOLVED in the story; RESOLVED in claim 3 limitation 4.**

Claim 3 limitation 4 now reads: "This site could not open or archive the
budget sheet for the program as it stood at either motion, so both cuts are
measured against the $100,000,000 approved in December 2022." That is
correct.

The story now reads: "This site could not open or archive the program's
budget sheet from either date. Two reviewers cited a September 2024 capital
update showing $100 million. Two others got an error when they tried to open
it, and it is not in our archive."

"Two others" miscounts. The panel has three seats, and the same seat appears
in both groups. GPT-6 Sol cited DocumentId 245911 in round 1 and GPT-6 Luna
cited it in round 2. Claude Opus 5.5 and GPT-6 Sol each reported an HTTP 403
in round 2. So the sentence implies four reviewers where there were three,
and it says Sol did not get an error when it did. The wording "two others"
came from my own fix in `confirmation.md`. The drafter applied it as written,
so the error is mine. See F1.

**N2 — RESOLVED.**

- The earlier capture, `intake/captures/2026-09-02-yegscoop-bike-lanes.md`,
  now heads the comment "**[the pseudonym]**:". Its "a sitting councillor is
  named" sentence is gone, and it carries a dated correction.
- `intake/candidates/rice-50m-motions-and-review/intake.md` now says "Who
  said it: [the pseudonym], in a comment on the same Yegscoop post. (Corrected
  October 2, 2026: …)".
- `run-record.md` and the release-check disposition no longer state the
  mapping; they say "the author of comment 449" and "the commenter".
- My committed `confirmation.md` replaces the pseudonym with "[the
  pseudonym]".

**Search of current files.** `git grep` finds four tracked files that contain
"[the pseudonym]" and also "Rice" or "Jennifer Rice":

- `intake/register.yaml`
- `src/content/stories/council-pause-vote.mdx`
- `scripts/calcs/council-pause-vote.ts`
- `intake/candidates/rice-50m-motions-and-review/intake.md`, whose text
  does not contain "Rice"; it appears only in the directory name.

None of the four says the pseudonym is her. In each, "Rice" is about the
motions she moved or seconded and the votes she cast in office, and "[the
pseudonym]" is about the comment. The comment itself says "Councillor Karen
Principe and I", so a reader can always link the two. That follows from the
claim and is not a disclosure. A search for an explicit pairing finds no
current file stating that the commenter, or comment 449, is Rice.

The real name survives as the commenter only in frozen records:
`reviews/intake/yegscoop-2026-08-26/extract-*.json`, `merged.json` and
`merged.raw.txt`, plus the brief and the run's `intake.md`. The README
discloses this.

**README.** It states the history plainly: "Earlier commits in the
repository's history carry her real name as the commenter, and so do some
frozen run records; no current file pairs her name with her pseudonym." The
first clause is true, and so is the last read as "states the pairing". See
A1.

**N3 — RESOLVED.** The standfirst now reads: "No. In the records we checked,
council did not pause the routes. Its Infrastructure Committee neither
adopted nor rejected administration's plan to set 14 bike routes aside, and
Council made no decision on it by September 25." YF-EV-0209 item 7.6 shows no
motion to adopt the plan and Salvador's motion defeated 2 to 2. The Council
records read (YF-EV-0227, 0228, 0229, 0221) show no decision on the plan.
Bounding it by "in the records we checked" leaves room for the City's own
pause of the 50 Street segment (YF-EV-0226, footnote 1), which was not a
Council decision.

## 2. Statements changed since 8b86634

| Statement | Grade | Basis |
|---|---|---|
| Standfirst | VERIFIED | N3 above |
| Claim 2 answer: "Administration's original plan would have taken 14 bike routes out of the program for 2026 and 2027, but its latest only set them aside without saying they would wait. Its two earlier versions both held them back." | VERIFIED | YF-EV-0222 p. 2 ("removed from the scope … for 2026 and 2027"); YF-EV-0140; YF-EV-0223 rule 1. All three seats in round 2 agree |
| Claim 3 limitation 4 | VERIFIED | N1 above; 112.3M and 122.3M reproduce in the module |
| TL;DR 1: the motion failed on a 2 to 2 tie, "so the committee decided nothing on the plan either way" | VERIFIED | YF-EV-0209 item 7.6 |
| Parked claim 4 line: "… not in our archive yet and some bundled budget votes are not sorted out. It can be checked once they are." | VERIFIED | `carried/checks/gate.md`. It renders on the question page and the claim page under "No finding" |
| Story's budget-sheet sentence | **BLOCKING** | F1 |
| Carried labels: "The AI reviewers read our archived copy …", "All the AI reviewers read the same copy.", "We do not have permission to republish our copy …" | VERIFIED | Manifest `eligibility`; registry `redistribution: unclear` (strictly, no grant was found; see A1) |
| Set-aside claim page: heading "No finding"; "One brief covered every claim under that question, and this one was set aside on that run." | VERIFIED | Manifest gate `claim:same-seven-councillors-vote-together` parked |

**Built pages.** "tastawiyiniwak" appears on no built page. "Jennifer Rice"
appears in 12 built files, all in claim 3's question or answer, TL;DR 4 or
the register proposition about the motions, which are acts in office.

## Findings

### Blocking

**F1 — The story miscounts the reviewers who could not open the capital
update.**

> "Two reviewers cited a September 2024 capital update showing $100
> million. Two others got an error when they tried to open it, and it is
> not in our archive."

Exact fix:

> "GPT-6 Sol and GPT-6 Luna cited a September 2024 capital update showing
> $100 million. Claude Opus 5.5 and GPT-6 Sol got an error when they tried
> to open it in cross-review, and it is not in our archive."

Bases: GPT-6 Sol round 1, supporting evidence citing DocumentId 245911.
GPT-6 Luna round 2, two citations. Claude round 2: "On 2026-09-29 I tried to
fetch it and got HTTP 403". GPT-6 Sol round 2: "returned HTTP 403 to my
independent fetch".

### Advisory

- **A1** — The README's "no current file pairs her name with her pseudonym"
  is true of explicit statements. The two remain linkable by reading, in
  three ways: through the comment's own words, through the register entry
  whose proposition names her, and through identical comment text in the
  frozen extraction files. The README already discloses the frozen files.
  Optional wording: "no current file states which pseudonym is hers". The
  label "We do not have permission to republish our copy" says slightly more
  than `redistribution: unclear` does. "We have found no permission to
  republish our copy" would be exact. Optional.

GATE: FAIL

- F1: in `src/content/stories/council-pause-vote.mdx`, replace "Two
  reviewers cited a September 2024 capital update showing $100 million. Two
  others got an error when they tried to open it, and it is not in our
  archive." with "GPT-6 Sol and GPT-6 Luna cited a September 2024 capital
  update showing $100 million. Claude Opus 5.5 and GPT-6 Sol got an error
  when they tried to open it in cross-review, and it is not in our
  archive." With that one sentence changed and nothing else, the gate
  passes; no new check is needed beyond a diff confirming it.
