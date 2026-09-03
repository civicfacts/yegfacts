# Run record: `cycling-volumes`, run 2026-09-03

Stage: framing. Methodology v1.18.

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

## The freeze: there is none. The brief is parked.

Methodology v1.12 caps the framing check at three reports and says that a
brief still at REVISE after the third is parked, and reopens only on new
intake evidence, never on a further revision of the same brief. Check 3
returned REVISE. So there is no freeze commit, no panel runs on this
brief, and the brief is left in the repository exactly as the check
refused it, with its status line saying so.

The editor's view of that outcome is on the record here rather than in a
revision: the three standing defects are ones the editor introduced while
adopting the checker's own findings, the checker supplied replacement
wording for each, and none of them is a question about whether the brief
tests the right thing. Freezing anyway would put a brief on a panel that
the check refused, which is the thing the cap exists to prevent, and this
project has twice been in a position where doing so would have been
wrong. Widening the cap for a defect of this kind is a methodology
question and belongs in its own change with its own changelog entry, not
in a brief.

## The three defects still standing, with the checker's own replacements

Recorded so that whoever reopens this question does not have to
reconstruct them.

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
