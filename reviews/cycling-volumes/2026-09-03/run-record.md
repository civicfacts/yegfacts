# Run record: `cycling-volumes`, run 2026-09-03

Stage: framing. Methodology v1.20.

This file records what happened to the brief between drafting and
freezing: every framing-check report, what the editor adopted and what
the editor rejected, and the commit the frozen brief sits in.

## Stage 1, framing

**Drafted** 2026-09-03 by Stew (Claude Opus 5) from the register entries
for `cycling-volumes` and the captured source `yegscoop-2026-08-26`. The
intake record is `intake.md` in this directory.

**Checked by** `prompts/framing-check.md`, run as
`codex exec -m gpt-5.6-sol -c model_reasoning_effort=high --skip-git-repo-check`,
a different vendor from the drafting seat. Reports are capped at three
(methodology v1.12).

The exact command, recorded because it differs from the seat command in
two ways that are tooling, not method: `--search`, so the checker can
verify that the instruments the brief names exist, which
`prompts/framing-check.md` requires of it, and `-s read-only`, matching
the precedent set on the active-transportation rerun. Both are the same
flags that run carried.

    codex --search exec -m gpt-5.6-sol -c model_reasoning_effort=high \
      -s read-only --skip-git-repo-check

| Report | Verdict | File | Response |
| --- | --- | --- | --- |
| 1 | REVISE, nine findings | `framing/check-1.md` | `framing/response-1.md` |
| 2 | REVISE, 8 of 12 resolved, 3 new findings | `framing/check-2.md` | `framing/resolution-2.md` |
| 3 | REVISE, 12 of 15 resolved, 3 standing | `framing/check-3.md` | this file |
| 4 | defect confirmation (v1.20): REVISE, 3 corrections confirmed, 1 further defect | `framing/check-4-defects.md` | this file |

**Check 1, in one line:** the brief leaked expected findings in its
stakes headings, put floors under two ceiling claims so they could have
failed in their holders' own direction, left an accounting window open on
the participation claim, conflated riding with bike-lane use, and
overstated what the record can answer.

**What the editor did with it:** six findings adopted in full, two
adopted in a different form, one rejected. `framing/response-1.md` has
the reasoning for each. The rejected one is the checker's instruction to
leave `bike-lanes-look-empty` out of the panel; the brief instead
narrows the proposition to the metered lanes and says so on its face,
under the framing check's own rule that a general pattern offered with
examples is tested as the pattern, and check 9's rule that the brief
tests the nearest level the record answers.

**Check 2, in one line:** eight of the twelve first-round findings
resolved, four weakened or open, and three new ones: claim 1 had no upper
Contradicted bound, claim 2 had no rule for partly-reporting counters,
and claim 8's ladder had a gap.

**What the editor did with it:** nine adopted, whole or in substance.
One stands unresolved and is decided in writing under the v1.12 cap:
`framing/resolution-2.md`. The checker would not send
`one-to-two-percent-of-population-rides` or `one-percent-year-round-users`
to the panel, because no verified representative Edmonton instrument has
been identified for either. The editor's decision is that both go, with
Not established predeclared as a real outcome and the editor's own
bounded search written into the brief. The checker's objection stands on
the record.

**Check 3, the confirmation, in one line:** REVISE. Twelve of the fifteen
findings across the three reports are resolved, including the one the
editor decided against the checker on. Three stand, and all three are
arithmetic defects in cutoff ladders rather than framing defects.

## Parked after check 3, then corrected under methodology v1.20

Methodology v1.12 caps the framing check at three reports and says that a
brief still at REVISE after the third is parked, and reopens only on new
intake evidence, never on a further revision of the same brief. Check 3
returned REVISE, so on 2026-09-03 this brief was parked, with no freeze
commit and its status line saying so.

What the cap had caught was three arithmetic defects. They are ones the
editor introduced while adopting the checker's own findings, the checker
supplied replacement wording for each, and none of them is a question
about whether the brief tests the right thing. Freezing anyway would have
put a brief on a panel that the check refused, which is what the cap
exists to prevent. So the brief stayed parked and the cap was amended
instead, in its own change with its own changelog entry: methodology
v1.20, committed before any word of this brief was touched.

v1.20 says a defect finding is not a framing finding. A defect finding is
one where the checker states the correction and the correction is
verifiable without judgement, and only three kinds qualify: verdict bands
that overlap or leave a gap, a stated rule whose direction contradicts
its own arithmetic, and a coverage or completeness rule that lets an
unclassified remainder decide a verdict. A defect finding still standing
after the third report does not park the brief; the editor corrects it in
the checker's supplied wording, records the correction, and the brief
goes back for one defect confirmation, which may only confirm the
corrections or name further defects. A framing finding in that fourth
report parks the brief for good. The value of a cutoff is a framing
question under the v1.8 bound, capped at three, and was not reopened
here: no threshold in this brief moved.

The uncomfortable part, recorded because it is the part that matters: the
rule was amended by the editor it had just blocked, on the brief it had
just blocked. The changelog entry says so in the same words.

## The three defects check 3 left standing, with the checker's own replacements

Recorded as check 3 left them, before the corrections below.

**1. Claim 1's verdict ladder assigns two verdicts to the same total.**
The brief says Partially supported at or above 1.50 million and
Contradicted above 1.95 million, so any total above 1.95 million matches
both. The required alternative leaves exactly 1.43 million unclassified.
The checker's replacement: "Partially supported if the total is at least
0.65 million and below 1.10 million, or at least 1.50 million and at most
1.95 million. Contradicted if the total is below 0.65 million or above
1.95 million." For the alternative: "Partially supported if the total is
at least 0.65 million and below 1.17 million, or at least 1.43 million and
at most 1.95 million."

**2. Claim 1's short-window rule has the direction of the error
backwards.** Missing days can only *add* to a total, so it is a
Contradicted-above verdict that is safe on a short window, not a
Supported one: a subtotal inside the Supported band could cross 1.50
million once the missing days arrive, and a Partially-supported-above
subtotal could cross 1.95 million. The editor's fourteen-day allowance
was written on the opposite reasoning and is wrong as written. The
checker's replacement: "If the published record does not cover 2026-01-01
through 2026-07-31, return Not established. Report the available
subtotal, exact dates and direction of uncertainty as qualifications."

**3. Claim 2's coverage rule permits an all-set verdict on four fifths of
the set.** Supported and Contradicted both quantify over every counter,
so one unclassified counter can turn either into Partially supported. The
checker's replacement: "Supported, Partially supported or Contradicted
may be returned only if every counter in the verdict set is
classifiable. Otherwise return Not established and report the observed
counters as qualifications."

## The corrections made, each against the finding it answers

Made 2026-09-03 by Stew under methodology v1.20, in the checker's own
words. No threshold moved, no band boundary moved, and nothing else in
the brief was touched.

**Correction 1 answers defect 1** (check 3, heading 3; report 2 finding
3, marked OPEN). Claim 1's primary ladder.

- Before: "**Partially supported** if the total is at least 0.65 million
  and below 1.10 million, or at or above 1.50 million."
- After: "**Partially supported** if the total is at least 0.65 million
  and below 1.10 million, or at least 1.50 million and at most 1.95
  million."

The alternative ladder, in the same correction.

- Before: "Supported from 1.17 million to below 1.43 million (within a
  tenth of the stated figure); Partially supported from 0.65 million to
  below 1.17 million, or above 1.43 million to 1.95 million; Contradicted
  below 0.65 million or above 1.95 million."
- After: "Supported if the total is at least 1.17 million and below 1.43
  million (within a tenth of the stated figure); Partially supported if
  the total is at least 0.65 million and below 1.17 million, or at least
  1.43 million and at most 1.95 million; Contradicted if the total is
  below 0.65 million or above 1.95 million."

Where the checker's wording did not reach, and what the editor chose.
The checker supplied only the Partially supported clause of the
alternative set. That clause on its own closes the 1.43 million gap,
because Supported already ended below 1.43 million and Partially
supported now begins at it. What it leaves behind is the alternative's
other two clauses in the brief's original prose, where the endpoints are
implicit: "from 1.17 million", "above 1.43 million to 1.95 million",
"below 0.65 million or above 1.95 million". Rather than leave inclusivity
to be read off prose in the one ladder that had already lost a number,
the editor restated all three alternative clauses in the at-least, below,
at-most form the checker used in his own replacement. That is the only
wording in these three corrections the checker did not supply, and it
moves no boundary: 1.17 and 1.43 are inclusive at the lower end, which is
what "from" already meant, and 1.95 stays inside Partially supported,
which is what "to 1.95 million" already meant.

Both ladders now give every total exactly one verdict. Primary: below
0.65 Contradicted, 0.65 up to but not including 1.10 Partially
supported, 1.10 up to but not including 1.50 Supported, 1.50 through
1.95 inclusive Partially supported, above 1.95 Contradicted.
Alternative: below 0.65 Contradicted, 0.65 up to but not including 1.17
Partially supported, 1.17 up to but not including 1.43 Supported, 1.43
through 1.95 inclusive Partially supported, above 1.95 Contradicted.

**Correction 2 answers defect 2** (report 1 finding 4c and report 2's
short-window finding, marked WEAKENED). Claim 1's short-window rule.

- Before: "The allowance is fourteen days ... If they are short by
  fourteen days or fewer, the verdict is computed on the days published
  ... Because a short window can only lower a total, a Supported verdict,
  a Partially-supported-above verdict and a Contradicted-above verdict
  all stand on a short window ... If they are short by more than fourteen
  days, the verdict is Not established."
- After: "If the published record does not cover 2026-01-01 through
  2026-07-31, return Not established. Report the available subtotal,
  exact dates and direction of uncertainty as qualifications." The
  allowance is gone, and the sentence that justified it now states the
  direction of the error the right way round: missing days can only add
  to a total, so a subtotal inside the Supported band could cross 1.50
  million and one in the Partially-supported band above it could cross
  1.95 million.

Consequential, in the same correction: claim 1's Not established clause
pointed at "the allowance below", which no longer exists, and now reads
"or if the published record does not cover 2026-01-01 through
2026-07-31".

**Correction 3 answers defect 3** (report 2's Claim 2 coverage finding,
marked WEAKENED). Claim 2's coverage rule.

- Before: "Supported, Partially supported and Contradicted all require at
  least four fifths of the verdict set to be classifiable", and "**Not
  established** if fewer than four fifths of the verdict set is
  classifiable".
- After: "Supported, Partially supported or Contradicted may be returned
  only if every counter in the verdict set is classifiable. Otherwise
  return Not established and report the observed counters as
  qualifications", and "**Not established** if any counter in the verdict
  set is not classifiable".

Consequential, in the same correction: the sentence describing an
unclassifiable counter said it "does not carry the verdict", which read
as though a verdict were still available, and now says the coverage rule
decides what verdict is available.

A fourth correction follows, below the defect confirmation, because it
answers a finding that report raised.

## The defect confirmation: three confirmed, a fourth defect named

`framing/check-4-defects.md`, run 2026-09-03 with the amended prompt, the
corrected brief, the run record and all three prior reports. Verdict
REVISE.

All three corrections are confirmed, each labelled `[defect]` by the
checker. He worked both of claim 1's ladders boundary by boundary and
states that each assigns exactly one verdict to every possible total; he
confirms that the short-window rule now runs in the direction the
arithmetic runs; and he confirms that no unclassified counter can decide
claim 2's verdict. He raised no framing finding, new or revived.

He named one further defect, and it is a real one. Claim 2's ladder is
still ambiguous on an empty verdict set: with no classifiable counters,
"every classifiable counter is below 25" and "no classifiable counter is
below 25" are both vacuously true, so Supported, Contradicted and the Not
established bullet for an empty set all match at once. It is not a defect
the corrections introduced. It sat in the brief through all three framing
rounds and nobody caught it, the checker included. It is corrected below,
as correction 4, in his wording.

**v1.20 as first written did not say what happens next, and the first run
of the rule found the hole.** The amendment gave a corrected brief one
defect confirmation and said what a framing finding in it costs: the
brief is parked for good. It said nothing about a confirmation that
accepts every correction and names a further defect. Read strictly, one
round is one round and the brief had no round left; read loosely, a
defect earns another correction, which is the reading that turns a narrow
exception into an unbounded loop.

**The rule now says which, and the entry says it in the same version.**
One defect confirmation is all a brief gets. A confirmation that returns
further defects and no framing finding ends with the editor correcting
them in writing in the checker's supplied wording, recording each against
the finding it answers, and freezing the brief. There is no fifth report.
It is the shape v1.12 already uses one level up, where the editor
resolves the open findings in writing after the second framing report and
the brief goes on: the check gets its rounds, then the editor is
accountable in the record. Ending in a second park was never available,
because a brief parked on a known ladder bug is unusable and no intake
evidence can ever release it, which is the failure v1.20 exists to fix.

The confirmation earned its place, and that belongs in the record next to
the hole it exposed. The checker labelled every finding, used the labels
the rule defines, raised no framing objection at the moment a framing
objection would have ended the brief for good, and found a fourth
arithmetic error that three framing rounds had walked straight past.

## Correction 4, and the freeze

**Correction 4 answers the defect confirmation's own further finding**
(`framing/check-4-defects.md`, labelled `[defect]`). Claim 2's ladder on
an empty verdict set.

- Before: "Supported, Partially supported or Contradicted may be returned
  only if every counter in the verdict set is classifiable ...
  **Supported** if every classifiable counter is below 25 ...
  **Contradicted** if no classifiable counter is below 25 ... **Not
  established** if any counter in the verdict set is not classifiable, or
  if the City's locations data does not allow on-street lanes to be told
  from recreational paths, or if the verdict set is empty."
- After, in the checker's wording: "Apply the primary and alternative
  cutoffs only when the verdict set is non-empty and every counter in it
  is classifiable. If the verdict set is empty, any counter in it is not
  classifiable, or the City's locations data does not allow on-street
  lanes to be told from recreational paths, return Not established and
  report every counter's figures as qualifications. Otherwise, Supported
  applies if every counter is below the applicable cutoff; Partially
  supported applies if at least one counter is below it and at least one
  is at or above it; Contradicted applies if no counter is below it."

The three verdict rules are laid out as bullets in the brief, in the
checker's words, so the ladder reads the way the other seven do. The
wording closes a second thing the old bullets left implicit: they now say
"the applicable cutoff", so they govern the alternative of 50 exactly as
they govern the primary of 25, which is what "results required under
both" always meant.

Worth recording plainly. This defect had been in the brief since it was
drafted. Three framing reports read that ladder and none of them saw it,
and neither did the editor who wrote it. The round that found it is the
one v1.20 added, on the first brief ever to run it.

**The freeze.** Made by the editor under v1.20, which ends a defect
confirmation that returns further defects with the editor's correction on
the record and the brief frozen. The frozen text of this brief is the one
carried by the commit that introduced this line; its SHA is written into
this record and into the brief's status line by the next commit, which
touches nothing else. Every change to `brief.md` after the freeze commit
is that status line and nothing else: no
proposition, no cutoff, no verdict rule and no instrument description
moves again, and any change to one is a new brief with a new check.

The checker's standing objection from report 2, that
`one-to-two-percent-of-population-rides` and
`one-percent-year-round-users` should not go to the panel without a
verified representative instrument, is frozen with the brief rather than
resolved by it. Check 3 marked it RESOLVED as a defensible editorial call
and it is recorded above; the panel runs those two claims with Not
established predeclared as a real outcome.

## What check 3 did settle

Worth recording, because it is the substantive part. The confirmation
report marks RESOLVED the finding the editor decided against the checker
on: sending `one-to-two-percent-of-population-rides` and
`one-percent-year-round-users` to the panel without a verified
instrument, with Not established predeclared and the editor's own bounded
search written into the brief, is accepted as "a defensible editorial
call". It also marks resolved the metered-lane narrowing of
`bike-lanes-look-empty`, the separation of riding from lane use, the
one-sided ceilings on the two "only" claims, the removal of the leaked
expected findings from the stakes section, and every instrument
description in the brief, each of which the checker verified against the
live source on the as-of date.

So the framing of this question is settled and the brief's arithmetic is
not. That is the state the record now holds.


## Editorial decisions taken before the check

Recorded here so the check is checking a stated position rather than
guessing at one.

1. **Eight claims, not one.** The eight surviving claims measure
   different things over different denominators. They are briefed
   together because one body of evidence settles them, and they are
   reported separately because each is one assertion with one finding.
2. **`bike-lanes-look-empty` is tested as traffic volume, not as
   observation.** Ten people offered what they saw as evidence for a
   general statement about the lanes. The general statement is the claim.
   Nothing in the record can establish what a person driving past
   noticed, so the claim is operationalised on counter volumes at the
   corridors those holders named, with a predeclared fallback set.
3. **`heritage-days-bike-arrivals` is dropped at the brief.** Reason in
   `register-note.md` and in the brief.
4. **Cutoffs were fixed before any search.** The drafter wrote every
   threshold before looking anything up, then searched only to confirm
   the named instruments exist and are still published. `intake.md`
   records the two figures that appeared in those results in passing and
   that no cutoff moved afterwards.
