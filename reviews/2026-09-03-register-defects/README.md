# Independent critique: the register defect repairs, PR #45

Reader-facing copy gets a critique from a model that did not write it
before it merges (D-0018). This directory is the record for the repairs
the first triage audit sent back: the split property-tax claim, the
eleven claims carrying `prior_triage`, three corrected account splits,
six rewritten question reasons, and the methodology entry that says what
happened. The entry is v1.25; it was drafted as v1.21 and renumbered
after PR #37 landed with five versions while this branch was open.

- Reviewer: OpenAI Codex CLI, `codex exec -m gpt-5.6-sol -c
  model_reasoning_effort=high -s read-only --skip-git-repo-check`, run
  from a scratch directory outside the repository, a fresh session per
  round. The model names in the outputs are the reviewer's own
  self-report; the pinned command above is the record.
- `codex-review_N.md` is the package Stew handed the reviewer for round
  N; `codex-output_N.md` is the reviewer's report for that round, with
  local machine paths removed before commit. The packages carry the
  rendered page text extracted from `dist/`, never the source, plus the
  underlying record for anything the reviewer was asked to test: the two
  captured comments, both triage seats' raw outputs, the merge prompt's
  rule, the audit's own findings.
- The early packages call the entry v1.21, because that is what it was
  called when the reviewer read it. They are left as they were sent.
  Editing an archived critique to match a later renumber is the kind of
  quiet correction this project does not make.

## The rounds

Twelve rounds. The reviewer returned REVISE eleven times.

**Round 1 (REVISE, ~40 findings).** The broadest pass. Applied: the
narrowed claim said "property taxes" where the commenter wrote "my
taxes"; `infill-luxury` swept "or any other City document", against the
site's own rule that absence is bounded; the four split disclosures
asserted one reader's conclusion in the register's own voice; the
register header claimed the validator proves each person is counted
once, which it cannot; the changelog said the quote gate "exists to stop
exactly that", contradicting its own next paragraph; "really typed by
the person credited with them" claimed more than a pseudonym can carry.

Two findings were checked against the repository and turned out to be
false alarms, and are recorded as refusals below. One was the best
finding of the round: `prior_triage.reason` was described as "the
sentence they gave", crediting two seats with one seat's words. Checked
against both seats' raw outputs, all eleven stored reasons are GPT-5.6
Sol's wording verbatim and Gemini 3.1 Pro wrote something different
every time. That is the same defect the version exists to fix, committed
inside the fix. Corrected in the register header and the changelog.

The round also forced two chronology corrections the reviewer could only
guess at. The entry said the audit came "three weeks after the project's
own open questions asked for one" and that the defects had been in
shipped work "for days". The methodology version that recorded the open
question is dated 2026-09-02 and the audit ran 2026-09-03: one day. The
register carrying the defects reached main at 12:50 and the repairs went
in at 21:45 the same day: nine hours.

**Round 2 (REVISE, 9 findings).** Applied all but one. The best of them:
the changelog said GPT-5.6 Sol "declined the one that became
downtown-business", which is what the published audit report says, and
both are wrong. The seat outputs have Sol parking it and Gemini
declining it. The changelog now says what the seat outputs say; the
audit's error is on the follow-up list because that file is outside this
branch. Also applied: the arithmetic check cannot prove nobody was
counted twice; a panel run is spent on a question, not on a claim; "this
failure" read as the tax claim when the earlier critique had caught the
same shape in a different one.

**Round 3 (REVISE, 6 findings).** All applied. "The rules that decide
fault in a collision" overstates a municipal traffic bylaw. The full
change note blamed the fault on direction when two different holes were
missing, one forwards and one backwards, and now says so. `prior_triage`
does not record whose sentence it stores, and the header now says that
rather than implying otherwise.

**Round 4 (REVISE, 5 findings).** All applied. "An undisputed budget
fact" asserted the $100 million approval was true while declining to
check it; the reason now says checking the vote would settle nothing
anybody in the source is arguing about. "Two validator rules hold that
field to being a record" overstated what shape checks prove.

**Round 5 (REVISE, 1 finding).** Applied, and it was the entry's own
thesis turned back on it: a sentence saying no rule *can* check the
values against the run turned an unbuilt check into an impossible one.

**Round 6 (REVISE, 2 findings).** Both applied. The grouping note said
"the limit both readers put on the question" when the caution about the
residents' own tax notices is GPT-5.6 Sol's alone. Same defect class
again, committed again, in the repair for it. And three of the four
splits said GO and PARK; `downtown-business` said NO and PARK.

**Round 7 (REVISE, 7 findings).** Four applied, three recorded as
follow-up. The reviewer independently found the version collision with
`origin/main`. It also found that "the first audit that looked
backwards" was too broad, since this site had already pulled published
claims off its findings board, and that only three of the eleven
`prior_triage` claims carry a reason saying the thing is undisputed,
against the audit's claim of four. The count now names the three and
drops the number. On the property-tax page the reviewer pressed again
that the question supplies "property" where the commenter wrote "my
taxes"; the grouping note now says that outright.

**Round 8 (REVISE, 1 finding).** Applied. A sentence about the two seats
assigned both roles to one seat, and no seat fits.

**Round 9 (REVISE, 2 findings).** Both applied. The header promised a
reason of one public sentence while six of them now run to three, so the
contract says what the file does. And GO and PARK *are* the sides; what
the old reasons left out was which reader took which.

**Round 10 (REVISE, 1 finding).** Applied by cutting, not by widening
the contract: `cycling-safety` ran to four sentences and is now three.

**Round 11 (REVISE, 1 finding).** Applied. `propositions: 112` on the
source is what the merge produced and now understates what the register
holds, because the repair split one claim in two and main had already
added another. The number stays, since moving it would make the source
record lie about the run. The field gained a documented meaning instead.
The package sent for that round put the register's own count at 113; it
is 114, and the package is archived as it was sent.

**Round 12: APPROVED, no findings.**

## Refused, with reasons

- **"All 17 people who raised the $100 million take the approval as
  given"** (round 1). The reviewer said a count of people who argued a
  claim either way cannot establish what all 17 believed. True in
  general. The audit checked this one against all 17 captured wordings,
  including a sitting councillor's, and found every one of them takes
  the approval as given.
- **"which on its own would only park it"** on `infill-luxury` (round
  1). The reviewer said no published rule makes an uncaptured wording a
  park. Methodology v1.15 does, in those words. The audit found the old
  reason wrong for the opposite reason: it had rested a decline on a
  ground that only parks.
- **"The worst defect available to us"** (round 1). The site is entitled
  to rank its own failures against its own promise.
- **The re-merge chronology** (round 1). Established by the run manifest
  and the run README. The reviewer's narrower point, that the earlier
  compound was a different claim, was applied.
- **"A rule nobody checks is a wish"** (round 1). Refused. It is true of
  this case, which is the reviewer's own test.
- **Replacing the full change note with six flat sentences** (round 1).
  The replacement dropped every fact about how the failure happened. The
  two factual corrections inside it were applied and the prose kept.
- **"prior_triage is the schema change, and it is what earns a
  version"** (round 1). This is the methodology changelog; saying which
  change earned the bump is what it is for.
- **The `cycling-safety` opening in the register's voice** (round 2). A
  reason speaks in the register's voice by design, and the sentence that
  follows concedes GPT-5.6 Sol's position before Sol is named. The
  reviewer's substantive point, that a bylaw does not decide fault, came
  back in round 3 and was applied.

## Recorded and out of scope

The three disputed dispositions the audit argued, `property-taxes`,
`city-hall-pay-and-interests` and `83-avenue-lane`, are the editor's
call and were declared out of scope for this critique. The reviewer did
not reopen them.

## Follow-up, none of it in files this branch may change

1. **The claim id `property-taxes-rising-sharply`.** Raised in round 1
   and again in round 7, and agreed both times. The proposition no
   longer contains "sharply" and the id is a public address in the URL.
   Renaming it needs a line in `public/_redirects`.
2. **The audit report is wrong about which seat declined
   `downtown-business`.** `methodology/audits/triage/2026-09-03-first-triage-audit.md`
   says the OpenAI seat declined it. The seat outputs say Gemini 3.1 Pro
   did and GPT-5.6 Sol parked it.
3. **`prior_triage.readers` accepts the same name twice.**
   `["gpt-5.6-sol", "gpt-5.6-sol"]` passes. It needs distinct names and
   a regression test.
4. **The validator still says "the sentence they gave".** The doc
   comment and the failure message in `scripts/lib/register-checks.ts`,
   and a fixture in `tests/register-checks.test.ts` that invents a joint
   reason, all describe the stored text as something both readers wrote.
   It is one seat's wording.
5. **The source page says "merged into 112 claims".** True of the merge
   and no longer true of the register. The template wording should say
   which it means.
6. **`cycling-safety` asks two questions**, and its grouping note still
   says the records cover "who is at fault". Neither is changed by this
   branch.
