# Run record: `cycling-volumes`, run 2026-09-03

Stage: **halted at synthesis**, before drafting. Methodology v1.23.
A blind re-run of claim 8 under v1.22 returned a `MATERIAL FRAMING
CONCERN` from one seat, which under v1.2 halts synthesis. "Stage 8" at
the end of this file is the record of it, and the finding table below is
superseded by it.

This file records what happened to the brief between drafting and
freezing: every framing-check report, what the editor adopted and what
the editor rejected, and the hash the frozen brief sits behind. From
"Stage 2" onward it records what happened after the freeze, including
the panel's own framing concern, the revision it forced under
methodology v1.2, the re-freeze, the blind re-run of claim 1 under
methodology v1.22, and the round 2 that was recovered after the
cross-review prompt was corrected under methodology v1.21.

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

REVISE was the only word the prompt left him. It belongs to the framing
rounds, where it means the brief goes back for another revision, and this
report sends nothing back: under v1.20 it ends in the corrections below
and a freeze. So the word at the head of that report contradicts its own
outcome. The report is not edited, because it is the checker's text.
`prompts/framing-check.md` now heads a defect confirmation `DEFECTS
CONFIRMED` or `DEFECTS REMAIN` and says neither of them parks the brief,
so the next one will not have to borrow a word that means something else.

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
the record and the brief frozen.

**The freeze is the sha256 of `brief.md`, and it is
`b222574225ea300f924240b715a7332398af5d905a2fc2596d6bc067e33ef700`.**
One line recomputes it, from the repository root:

    shasum -a 256 reviews/cycling-volumes/2026-09-03/brief.md

A content hash rather than a commit, because this repository squash-merges
and a branch commit is therefore unreachable from `main`. A reader who
cannot verify the freeze from the published history has not been given
one. The hash survives any merge strategy: the bytes the panel received
are the bytes that command prints, wherever the file comes to rest.

**The branch commit, kept as a convenience and nothing more.** The frozen
text was committed on the `cycling-volumes` branch as
`3e89a6e43ac62ea1632d91bca3c7033f23e0a177`, in PR #37. That SHA is
branch-local, it does not survive the squash, and nothing depends on it.
It is recorded because it says when the freeze happened in the branch's
own history.

**What was in the file when it was hashed.** The brief's status line was
rewritten once more, after that commit and before the digest was taken,
so that it names where the hash lives instead of naming a commit nobody
can reach. A file cannot carry its own hash, which is why the digest sits
here and the brief points at it. That status line is the only text in
`brief.md` that has moved since the freeze: no proposition, no cutoff, no
verdict rule and no instrument description moves again, and any change to
one is a new brief with a new check. The hash is what makes that
checkable instead of asserted.

Each seat's `prompt_sha256` in `run.yaml` corroborates it from the other
end. That digest covers the package the seat was handed, the brief is
inside the package, and a brief edited between the freeze and a seat's
run would show there as well as here.

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

## Stage 2, round 1: run, halted, brief revised, round 1 rerun

The panel ran blind on the frozen brief. Two of the three seats returned
`MATERIAL FRAMING CONCERN` on `bike-lanes-look-empty`, which under
methodology v1.2 halts synthesis, revises the brief and reruns round 1.
That is not the same mechanism as the framing-check cap.

**Why it is not the same mechanism, since the run stopped once over
exactly this question.** Methodology v1.12 caps the *framing checker* at
three reports, and v1.20 gives a corrected brief one defect confirmation
after that. Both bound how many times one reviewing seat may send a
brief back before the editor has to decide in writing and freeze.
Methodology v1.2 governs something else: what happens when the *panel*,
running blind on the frozen text, finds that the operationalisation
changes the honest answer. The freeze is what stops framing being moved
after the answers arrive; it was never a claim that the framing is
right. The panel is asked for a framing concern precisely so a frozen
brief can still be caught, and the answer to a caught brief is the one
v1.2 states: revise and rerun round 1. It has happened twice before on
this site, on `infill-prices` and on `low-density-history`, and both
times the brief was revised and round 1 rerun.

### The first round's answers, and the concern

The first round's three reviews are kept at `round1-superseded/`, with a
copy of the manifest as it stood when they were written. Nothing is
deleted: the rerun writes into `round1/` and the superseded answers stay
readable beside it.

| Claim | Claude Opus 5 | Gemini 3.1 Pro | GPT-5.6 Sol |
| --- | --- | --- | --- |
| `cycling-trips-1-3-million-2026` | Supported | Supported | Not established |
| `bike-lanes-look-empty` | Not established, **concern** | Not established, **concern** | Not established |
| `one-to-two-percent-of-population-rides` | Contradicted | Not established | Not established |
| `one-percent-year-round-users` | Not established | Not established | Not established |
| `two-percent-of-trips-by-bike` | Supported | Supported | Supported |
| `under-one-percent-of-commuters-cycle` | Supported | Supported | Supported |
| `87-percent-commute-by-car` | Supported | Supported | Supported |
| `riders-are-recreational-not-commuters` | Contradicted | Not established | Contradicted |

Both concerns are on the same rule and name the same counter. Claim 2's
coverage rule said that Supported, Partially supported or Contradicted
may be returned only if every counter in the verdict set is
classifiable, and that a counter is classifiable only if it published
bicycle counts for at least 20 of July 2025's 31 days. One counter in
the set fails it: `106 Street N of Jasper Avenue`, which published
around 165 bicycles a day in June 2025, published 16 days of July whose
daily counts decay to zero, has its last record at 2025-07-16, and
appears nowhere afterwards. Both seats identify that as a device that
died rather than a lane that went unmeasured, and both say that one dead
sensor voiding the verdict is not a fair description of a record whose
other counters run in the tens and hundreds a day.

### The correction, and why it is a category error rather than a threshold

The rule came into the brief as the framing checker's own replacement
wording, adopted verbatim under methodology v1.20 to fix a real defect:
the brief had previously allowed an all-set verdict on four fifths of
the set, so an unclassified remainder could decide it. That defect was
real and the correction for it stands. What the correction got wrong is
that it made *classifiable* carry two unrelated jobs — whether a counter
measures an on-street lane at all, and whether its device kept running —
and then voided the verdict on either. The first is a fact the record
may genuinely fail to settle. The second is a fact the record settles
perfectly well: the device stopped, on a stated date, after a stated
level.

So the brief now separates them, and no cutoff moves.

- **Out of service.** A counter in service on 2025-07-01 whose last
  record anywhere in the dataset falls on or before 2025-07-31 stopped
  and never resumed. It leaves the verdict set, and the brief requires
  it to be named in the finding with the date of its last record and its
  last stable level, the median daily count for the last complete
  calendar month it published in full. A reader sees what was excluded,
  when it stopped and how busy it was.
- **Unclassifiable** returns to its own meaning: a counter whose facility
  type the record does not settle, so it cannot be placed in the set or
  out of it. That still voids the verdict, which is what the original
  defect correction was for.
- **Under-reported** is the third case and keeps the old consequence: a
  counter that is on-street, live and short of 20 of July's 31 days is a
  lane the City meters and the record failed to measure. It voids the
  verdict too. Twenty of thirty-one does not move.

Both cutoffs stay at 25 and 50 a day and results are required under
both. The two seats' own arithmetic, reported alongside their concerns,
lands on different verdicts at the two cutoffs, which is the v1.8
alternative rule doing exactly what it exists for; both are reported.

### Pinning the eligible set, which is a second defect the round exposed

The seats did not agree on how many counters are on-street: one counted
twenty, the other seventeen. A brief whose membership rule three careful
readers resolve three ways is not pinned, whatever verdict it produces.
The cause is that the counter-locations dataset `py7x-4d39` publishes a
description, a counter configuration, a direction of travel, coordinates
and a photograph link, and no facility-type field at all — so each seat
fell back on reading the counters' names as prose, and prose read twice
gave two answers.

The brief now decides membership from published fields in five ordered
tests, and forbids the description text from deciding anything. Facility
type comes from a join to the City's Bike Routes dataset `vd4b-a4iv`,
which does publish a `type` field with two values, `ON ROAD` and `OFF
ROAD`: take the counter's own coordinates, drop route segments flagged
`route_coming_soon`, and take the `type` of the segment whose geometry
passes nearest the counter. Beyond 30 metres, or an exact tie between
the nearest `ON ROAD` and `OFF ROAD` segments, is unclassifiable. The
segment's `classification` is reported beside every counter and decides
nothing, because deciding on it would put the reviewer back to judging
which on-street facilities count as lanes. A counter whose two nearest
segments of opposite type are within ten metres of each other is named
as borderline, with the verdict stated both with and without it.

One seat had already reached for `vd4b-a4iv` as a cross-check on its own
initiative. The brief now either adopts a method or forbids it rather
than leaving it to the seat, and this one is adopted, in the open, as
the only thing that decides facility type.

**The editor tested the rule against the published data before freezing,
which is the part that was missing last time.** The membership rule was
run over all 59 rows of `py7x-4d39` and all 10,417 rows of `vd4b-a4iv`
as published on the as-of date: 50 counters record cyclists, every one
of them has a bike-route segment within 20 metres, none is
unclassifiable, and none is a tie. One counter, `142 Street N of
Whitemud Drive`, is borderline under the ten-metre rule and will be
named as such. No count figure was read while doing it, and no threshold
in this brief was chosen or changed with any figure in view. The point
of the exercise was to establish that the rule terminates on a
determinate set for every counter, which is the property the round-1
disagreement showed the old rule lacked.

### What was not touched

Nothing outside claim 2's membership and coverage rules. Not what any
claim tests, not any cutoff, not any verdict band, not any of the other
seven claims. The seven claims the panel answered without a concern go
back to the panel with their text unchanged.

### The re-freeze

**The freeze is the sha256 of `brief.md`, and it is now
`86f4df04e2037914fe9dfe81f256f10266635420f8c6aae22a43a5b1d83289fc`.**
One line recomputes it, from the repository root:

    shasum -a 256 reviews/cycling-volumes/2026-09-03/brief.md

**The superseded freeze, kept beside it so the change is traceable, is
`b222574225ea300f924240b715a7332398af5d905a2fc2596d6bc067e33ef700`.**
That is the hash of the text the first round was run on. It is the hash
recorded above under "The freeze", it is what
`git show <the commit before the revision>:reviews/cycling-volumes/2026-09-03/brief.md | shasum -a 256`
prints, and the three reviews under `round1-superseded/` are answers to
it. Anyone comparing the two hashes is comparing the halted round's
package with the rerun's.

### The rerun

Round 1 was rerun on all three seats against the re-frozen brief, blind,
each in its own scratch directory, with the pinned commands recorded in
`run.yaml`. All three, not only the claim that drew the concern: a seat
that answered the superseded brief answered a different package, and
mixing answers from two packages in one round would make the round
dishonest. The manifest's round-1 entries are rewritten for the rerun;
the copy at `round1-superseded/run.yaml` holds what they said for the
halted round.

### What the rerun returned

Three seats, blind, identical package: `prompt_sha256`
`6448222da855649d19038ca6656c7e4ef6fd367ba416f2fd601e5a31faae137d`
for all three, against the superseded round's
`8b393172b0ae667128a5ff5f4d3800b10ad9904e25d0b5939530d09d5114aed6`. One
attempt each, all schema-valid. **No seat raised a framing concern on any
claim.**

| Claim | Claude Opus 5 | Gemini 3.1 Pro | GPT-5.6 Sol |
| --- | --- | --- | --- |
| `cycling-trips-1-3-million-2026` | Supported (High) | Supported (High) | Not established (Moderate) |
| `bike-lanes-look-empty` | Contradicted (High) | Contradicted (High) | Not established (Low) |
| `one-to-two-percent-of-population-rides` | Not established (High) | Not established (High) | Not established (High) |
| `one-percent-year-round-users` | Not established (High) | Not established (High) | Not established (High) |
| `two-percent-of-trips-by-bike` | Supported (Moderate) | Supported (High) | Supported (High) |
| `under-one-percent-of-commuters-cycle` | Supported (High) | Supported (High) | Supported (High) |
| `87-percent-commute-by-car` | Supported (High) | Supported (High) | Supported (High) |
| `riders-are-recreational-not-commuters` | Contradicted (Low) | Not established (High) | Contradicted (Moderate) |

**The membership rule did what it was revised to do.** The two seats that
executed it derived the same set, counter for counter, working
independently and blind: 51 counters in the universe, 42 in service on
2025-07-01, 21 on-street against 21 off-street with none unclassifiable
and no tie, one counter out of service, 20 measured with all 31 days of
July 2025 published, and the lowest July median in the set at 46 a day.
The counter that voided the superseded brief, `106 Street N of Jasper
Avenue`, is named by both with its last record at 2025-07-16 and its
last stable level at a median of 177.5 a day in June 2025 — about seven
times the primary cutoff while it worked. On the superseded brief the
same two seats derived twenty on-street counters and seventeen. That
disagreement is gone.

Both also report the claim as definition-sensitive between the cutoffs,
which is the v1.8 alternative doing its job: Contradicted at 25 a day,
Partially supported at 50, where one counter (`96 Street S of Jasper
Ave`, median 46) falls below.

**The third seat could not run the join, and said so rather than
guessing.** GPT-5.6 Sol returned Not established at Low confidence on
claim 2, recording in `limitations` that it could not execute the
nearest-segment spatial join or enumerate tests 1 to 5 from the
interfaces available to it, and listing every quantity it therefore did
not have. It raised no framing concern. That is an honest Not
established from that seat's own evidence, and it is a fact about what a
brief may ask of a seat: this one now asks for a geometric computation
over ten thousand line segments, which two seats did and one could not.
The cost of pinning the set is that the rule is heavier to execute than
reading a counter's name, and this run is the record of what that cost.

## Stage 3, merge and evidence staging

`scripts/merge.ts` over the rerun's round 1: 32 distinct sources, three
contested claims (`cycling-trips-1-3-million-2026`,
`bike-lanes-look-empty`, `riders-are-recreational-not-commuters`).
`scripts/evidence-stage.ts` fetched and hashed all 32. Seven citations
across four sources did not archive as the document cited, and
`fetch-report.md` names each with the seat, the claim and the role.

The three datasets claim 2's membership tests run over archived as their
real bytes, so the verdict set is reproducible from the archive rather
than from a live query.

## Stage 4, round 2 cross-review

Two seats of three returned a valid round 2.

**Claude Opus 5** held every round-1 position, with no verdict change and
one confidence rise on claim 8, Low to Moderate.

**GPT-5.6 Sol moved on two claims, and both moves are the point of
cross-review.** On `cycling-trips-1-3-million-2026` it had returned Not
established on the strength of a developer-portal page giving the
dataset's update date as 2026-07-22, which would have left the window
short; querying the dataset directly it found records through 2026-07-31
and a total of 1,291,714, and moved to Supported. On
`bike-lanes-look-empty` it had returned Not established because it could
not execute the membership join; reading the other two seats' complete
test-by-test enumerations it moved to Contradicted. Both are position
changes on evidence, which is what round 2 exists for, and neither moves
the finding: since methodology v1.3 the canonical basis is the locked
round-1 positions.

**The Gemini seat produced no valid round 2.** Four attempts across two
runner invocations all failed schema validation on the same two fields,
`errors_in_other_reviews` written as objects rather than strings and
`verdict_changes` using `from_verdict`/`to_verdict`/`reason` rather than
`from`/`to`/`why`. The seat's round 1 validated on its first attempt and
this seat has completed round 2 on earlier runs, so this is a
serialisation failure at this stage, not a seat that could not do the
work. It is recorded `failed` in `run.yaml`, the last invalid output is
kept verbatim at `round2/gemini-invalid-output.txt`, and `errata.md`
says what was lost: six cross-review findings about the other seats'
citations, written in a shape the pipeline cannot read and never put to
the seats they concern. Its eight verdicts in that file are identical to
its own round 1, so nothing in it would have moved a position.

The run proceeds because round 2 does not carry the finding. A missing
round 1 stops a run; a missing round 2 is a gap in the record, and it is
named rather than papered over.

## Stage 5, deterministic synthesis

`scripts/synthesize.ts`, basis round 1, round 2 documented, 8 claims.

| Claim | Finding | Panel agreement |
| --- | --- | --- |
| `cycling-trips-1-3-million-2026` | Partially supported | Split |
| `bike-lanes-look-empty` | Contradicted | Adjacent |
| `one-to-two-percent-of-population-rides` | Not established | Unanimous |
| `one-percent-year-round-users` | Not established | Unanimous |
| `two-percent-of-trips-by-bike` | Supported | Unanimous |
| `under-one-percent-of-commuters-cycle` | Supported | Unanimous |
| `87-percent-commute-by-car` | Supported | Unanimous |
| `riders-are-recreational-not-commuters` | Contradicted | Adjacent |

Two of the three Split and Adjacent findings turn on the same seat
returning Not established in round 1 and then moving in round 2 after
the other seats' work reached it. Under v1.3 that seat's round-1
position is what the matrix reads, which is why claim 1 synthesises
Split at Partially supported although all three seats ended at
Supported. That is the rule working as designed — the panel is only
genuinely independent in round 1 — and it is recorded here so the story
does not present three agreeing seats as a split without explaining why.

## Stage 6, the blind re-run of claim 1

Under methodology v1.22, added for this. What follows is the whole
sequence in order, because the point of a re-run is that a reader can
see it rather than be told about it.

### Why it happened

`cycling-trips-1-3-million-2026` synthesised **Partially supported** on a
**Split** panel. The multiset it was computed from is the round-1 one:
Claude Supported, Gemini Supported, GPT Not established. But by the end
of round 2 all three seats stood at Supported. GPT's round-1 Not
established was not a reading of the counts. It rested on a
developer-portal page, `dev.socrata.com/foundry/data.edmonton.ca/tq23-qn4m`,
which gives the dataset's last update as 2026-07-22; under the brief's
short-window rule an update before 2026-07-31 forces Not established. In
round 2, with the other two seats' work in front of it, that seat queried
the dataset directly, found records through 2026-07-31 and a total of
1,291,714, and moved to Supported.

So the suspicion was that the round-1 verdict recorded an omission rather
than a judgement about the evidence: a seat that had not yet looked at the
source, not a seat that had looked and disagreed. That is a material catch
of the kind stage 4 of `docs/DESIGN.md` describes, and stage 4's answer is
a fresh blind re-run of the affected claim, never a correction inside the
run. The editor could not have applied that answer before this run:
`scripts/synthesize.ts` read one directory and had no way of being told a
claim's answers were superseded. So the mechanism was built first, as
methodology v1.22, and then used.

### What the seats were given

All three seats, blind, in fresh scratch directories, `claim 1 only`.
The package is the round-1 rerun's construction: the frozen brief, byte
for byte, at sha256
`86f4df04e2037914fe9dfe81f256f10266635420f8c6aae22a43a5b1d83289fc`;
`prompts/reviewer.md`; `prompts/review-schema.json`. The only addition is
a scoping paragraph in the package wrapper naming
`cycling-trips-1-3-million-2026` as the one claim to answer. The scoping
is in the wrapper and not in the brief because editing a frozen brief
makes it a different brief needing a different check, and because the
freeze hash has to keep verifying. Nothing in the package says a prior
round happened, what any seat found, or why the claim came back. The
`prompt_sha256` is
`36abb7db2cb923752b70863391f9254431ce36101f86652ab0cecadd070cfbe4`,
identical for all three seats, and `round1-rerun-1/run.yaml` records each
seat's command, CLI version and timings.

The answers are at `round1-rerun-1/`. `round1/` was not touched: it is
still the three seats' answers to the package whose hash `run.yaml`
records, and for claim 1 it is now the superseded record, sitting beside
what replaced it.

### The superseded verdicts, and the new ones

| Seat | Round 1 (`round1/`, superseded for this claim) | Blind re-run (`round1-rerun-1/`) |
| --- | --- | --- |
| Claude Opus 5 | Supported (High) | Supported (High) |
| Gemini 3.1 Pro | Supported (High) | Supported (High) |
| GPT-5.6 Sol | Not established (Moderate) | Not established (Moderate) |

One attempt each, all schema-valid, no framing concern from any seat.

### What the re-run found, which is not what it was expected to find

**The re-run did not change the finding.** The multiset is the same,
`{Supported, Supported, Not established}`, so claim 1 is still Partially
supported on a Split panel. What changed is what the record can say about
why.

The two seats that queried the dataset directly agree on the number to
the unit. Claude reports 1,291,714 as the sum of `total_cyclist_count`
over 933,576 fifteen-minute records at 48 counter locations for
`log_timestamp` from 2026-01-01 to 2026-07-31 inclusive, and states that
the figure sits inside the Supported band under both cutoff sets, so the
claim is not definition-sensitive here. Gemini reports the same
1,291,714 and the same conclusion under both sets.

GPT-5.6 Sol, blind and with no round-2 work in front of it, went to the
same developer-portal page, read the same 2026-07-22 update date, and
returned Not established again at Moderate confidence, recording in its
limitations that it could not verify a newer dataset update as of
2026-09-03. Its own `what_would_change_my_verdict` says a complete
dataset through 2026-07-31 totalling between 1.10 and 1.50 million would
make it Supported — which is exactly what the other two seats produced
from the dataset itself.

**So the premise the re-run was ordered on was wrong, and saying so is the
point.** The expectation was that the round-1 verdict was a one-off
omission that a fresh pass would not repeat. It repeated. This is a
reproducible position of that seat on this brief: handed the claim twice,
blind, it reaches for the dataset's published metadata rather than the
dataset, and stops there. Only when it is handed another seat's direct
query does it query directly itself. That is a fact about the seat and
about what this brief asks of it, and it is worth more than the verdict
change the re-run was expected to produce. A mechanism that could only
confirm what the editor already believed would not be worth having.

**What a reader should take from the finding.** Partially supported on a
Split panel is now a description of a panel that genuinely splits when
its seats are independent, not an artefact of one seat's first pass. The
split is not about the number: no seat disputes 1,291,714, and the seat
that returned Not established never saw it. It is about whether the
published record could be shown to cover the window. Two seats showed
that it does. The third could not, and said so rather than guessing,
which is the behaviour the reviewer prompt asks for.

`synthesis.json` now names each claim's basis. Claim 1 reads
`round1-rerun-1`; the other seven read `round1`.

## Stage 7, the Gemini round 2 recovered

### The prompt was underspecified, and that is the finding

`errata.md` recorded four attempts all failing schema validation on the
same two fields. Reading `prompts/cross-review.md` against
`prompts/review-schema.json` shows why, and it is not only the seat.

Round 1's prompt hands the seat every value the schema constrains,
verbatim: the four verdict words, the three confidence levels, all six
`evidence_basis` labels. Round 2's prompt named two fields and specified
the shape of neither. It asked the seat to "record every change in
`verdict_changes` with the reason" — where the schema's key is `why`, and
`reason` is what the seat wrote. And it asked, for each error found in
another review, for four things: whose review, which claim, which
citation, what is wrong with it — in `errors_in_other_reviews`, which the
schema types as an array of bare strings. `errors_in_other_reviews` and
`evidence_i_missed` are the only two lists in the whole schema that hold
substantive findings as strings; every comparable list, `verdict_changes`
and `missing_evidence` and the evidence items included, is an array of
objects. A seat generalising from the schema's own conventions would
write objects there, and this one did.

Both fields the seat got wrong are exactly the two the prompt left
unspecified, and one of them it got wrong in the prompt's own noun.
Round 2 is also the only part of the schema round 1 never exercises, so
it is the only part a seat meets cold.

The fix is in the prompt, not the schema (methodology v1.21).
`prompts/cross-review.md` now states that `round2_notes` has three fields
and no others, that two of them are arrays of strings, that the four
attributes go into the one string, and that `verdict_changes` takes
exactly `claim`, `from`, `to` and `why`. **The schema was not relaxed.**
Widening it to accept the objects the seat emitted would make the
contract follow the failure, and would invalidate every round 2 already
committed under it, this run's other two included.

**The seat is not thereby exonerated.** The runner's one retry appends
the validator's exact errors to the package, so the seat was told which
fields were wrong and returned them wrong again. An underspecified prompt
explains a first attempt; it does not explain a fourth.

### The re-run, and what came back

One invocation of `scripts/panel/run-reviewer.sh agy cycling-volumes
2026-09-03 2` under the amended prompt: **valid on the first attempt**.
Same seat, same CLI version, same package construction, one prompt
paragraph different, and the failure did not recur. The review is at
`round2/gemini.json`, `prompt_sha256`
`f562837169ca6e7808bee4361f6faf1e4a1cb20c6553b3c10aa2140e944ada74`. The
manifest row that recorded the failure is quoted in `errata.md`, because
`record-run.ts` keeps one row per seat per round and this re-run replaced
it.

Its eight verdicts are identical to its own round 1, so nothing it
returned moves a position, and round 2 could not move one anyway.

**Five cross-review findings, four of them recovered and one new.** The
invalid output held six items; two of those were corrections to its own
round 1 rather than findings about another seat, and on the valid pass
the seat put only other seats' errors in a field named for them. So four
of the six are recovered, one is new, and the two self-corrections are
not in the valid file. What the five say:

1. **GPT on `cycling-trips-1-3-million-2026`**, citation does not
   establish what it was cited for. The developer-portal page carries
   static documentation metadata, not the dataset; the dataset itself
   covers the window and totals 1,291,714. This is the same catch that
   sent claim 1 back for its blind re-run, found independently by a third
   seat.
2. **GPT on `bike-lanes-look-empty`**, method not executed. It answered
   from 2017–2021 annual counts in a Bike Plan implementation PDF rather
   than the brief's five membership tests over `tq23-qn4m` and
   `vd4b-a4iv` for July 2025. GPT's own round 1 says it could not run the
   spatial join, so the two accounts agree on what happened.
3. **GPT on `one-percent-year-round-users`**, wrong denominator. The
   City's "one in four cyclists rides all year" divides by cyclists, not
   by residents, and cannot bound a whole-population share. GPT had noted
   the same thing in its limitations.
4. **Claude on `riders-are-recreational-not-commuters`**, priority rule
   bypassed. It derived roughly 21,379 commute against 11,994
   recreational bicycle trips by multiplying the 2015 household travel
   survey's rounded integer modal shares by all-mode totals. The brief's
   ladder says to return Not established first if no published Edmonton
   source breaks bicycle trips down by purpose or if the categories
   cannot be mapped completely onto recreation and commuting, and Table
   3-10 does neither.
5. **GPT on the same claim**, the same objection to the same derivation.

Findings 4 and 5 bear on a published finding: `riders-are-recreational-
not-commuters` synthesised Contradicted on an Adjacent panel from
Claude's Contradicted, GPT's Contradicted and Gemini's Not established,
and this says both Contradicted verdicts reached the substantive question
by arithmetic the brief's own priority rule forbids. **Round 2 documents
errors and never moves a finding** (methodology v1.3), so the finding
stands as computed and this objection is recorded against it rather than
applied to it. It is the third seat's reason for its own Not established,
now written out against the other two, and a drafter must not write that
claim as though the panel merely disagreed about evidence. Whether it is
a material catch of the kind that earns a blind re-run under v1.22 is a
question for the editor before drafting, and it is not answered here.

The seat also listed seven pieces of evidence it had missed, six of them
Claude's or GPT's Statistics Canada and City open-data work, including
the systematic check across 8,269 released StatCan tables that no
published table carries a cycling participation rate for Edmonton — which
is what the two participation claims' unanimous Not established rests on.

## The finding table as it now stands

| Claim | Finding | Panel agreement | Basis |
| --- | --- | --- | --- |
| `cycling-trips-1-3-million-2026` | Partially supported | Split | `round1-rerun-1` |
| `bike-lanes-look-empty` | Contradicted | Adjacent | `round1` |
| `one-to-two-percent-of-population-rides` | Not established | Unanimous | `round1` |
| `one-percent-year-round-users` | Not established | Unanimous | `round1` |
| `two-percent-of-trips-by-bike` | Supported | Unanimous | `round1` |
| `under-one-percent-of-commuters-cycle` | Supported | Unanimous | `round1` |
| `87-percent-commute-by-car` | Supported | Unanimous | `round1` |
| `riders-are-recreational-not-commuters` | Contradicted | Adjacent | `round1` |

No finding changed. Round 2 is now complete on all three seats, and the
citations are resolved in `fetch-report.md` rather than left for the
gate.

**That table is no longer current.** It describes the run before claim 8
went back to three blind seats under v1.22. That re-run halted synthesis,
and "Stage 8" below says what it returned and what the record can and
cannot claim now. The current table, of seven claims, is in "Stage 9",
which is where the halt is answered and claim 8 leaves the run.

No story, answers or reader-facing copy have been drafted. The next
stages are drafting, faithfulness and the publication gate, none of them
started.

## Stage 8, the blind re-run of claim 8, and the halt it produced

Ordered under methodology v1.22 and stage 4 of `docs/DESIGN.md`. It did
not end in a finding. It ended in a `MATERIAL FRAMING CONCERN` and a
halted synthesis, and this section is the record of that.

### Why it was ordered, and how that differs from claim 1's re-run

Both re-runs on this run were ordered under the same rule, and a reader
should be able to see that they were ordered on very different strengths
of evidence. The two are recorded side by side for that reason.

**Claim 1's re-run rested on the editor's inference.** No seat said the
claim's finding was unsound. The editor read GPT's round-1 Not
established beside its round-2 move to Supported and inferred that the
first verdict recorded an omission rather than a judgement — a seat that
had not queried the dataset, not a seat that had queried it and
disagreed. That inference was the whole trigger. Blind, on the same
frozen brief, the seat reached the same developer-portal page and
returned Not established again. **The premise was wrong and the finding
stood.** The editor was overruled by the method, which is what the method
is for.

**Claim 8's re-run rested on two seats' findings, in writing, against a
published-path finding.** Cross-review recovered them from the Gemini
seat: `riders-are-recreational-not-commuters` synthesised Contradicted
from Claude's Contradicted and GPT's Contradicted, and both of those
verdicts reached the substantive question by multiplying the 2015
household travel survey's rounded integer modal shares by all-mode
totals — about 21,379 commute trips against about 11,994 recreational —
where the brief's own priority rule requires Not established first if
the source does not break bicycle trips down by purpose or if its
categories cannot be mapped completely onto recreation and commuting.
One of the two findings is Claude's, against its own work. Two seats,
independently, saying the reasoning under a published-path finding does
not hold, one of them the seat that made the error, is the case stage 4
is written for, and it is a stronger trigger than an editor's inference
by a wide margin.

### What the seats were given

All three seats, blind, in fresh scratch directories,
`riders-are-recreational-not-commuters` only. Package construction
identical to `round1-rerun-1/`: the frozen brief byte for byte at sha256
`86f4df04e2037914fe9dfe81f256f10266635420f8c6aae22a43a5b1d83289fc`,
`prompts/reviewer.md`, `prompts/review-schema.json`, and one scoping
paragraph in the wrapper naming the claim. Nothing about why it came
back, what any seat found, or that a prior round happened. The
`prompt_sha256` is
`24e7c7a64978aeeefc3f7a7609d7b2a45d88256b355261f34541394dc27e18eb`,
identical for all three seats. `round1-rerun-2/run.yaml` records each
seat's command, CLI version and timings. The answers are at
`round1-rerun-2/`; `round1/` is untouched.

**Two things about the run itself, recorded because they are the editor's
own mistakes and the seats' packages are only as clean as the operator.**

1. The Gemini seat was invoked once before the run that produced the
   committed answer. Its first attempt ran to completion, and the write
   failed with `ENOENT` because the editor had deleted the output
   directory while the seat was running, to get an unrelated synthesis
   command past a guard. `extract-review.ts` could not write, the runner
   read that as a validation failure and started its one retry, and the
   whole invocation was killed rather than allowed to finish on a
   package that now carried a retry notice the other two seats' packages
   did not. **No bytes from that attempt survive anywhere**, and nothing
   was written under `reviews/`. All three seats were then re-invoked
   from scratch, which is why the committed manifest shows one attempt
   each on identical package hashes. The CLIs are stateless and each ran
   in a fresh scratch directory, so the committed pass is blind; the
   incident is recorded because a seat that has seen a claim once is a
   fact about the run whether or not its answer was kept.
2. The Gemini seat's CLI moved from 1.1.25 to 1.1.26 between round 1 and
   this re-run. `run.yaml` records both. Nothing here controls a
   vendor's CLI releases; the manifest is what makes the drift visible.

### The superseded verdicts, and the new ones

| Seat | Round 1 (`round1/`) | Blind re-run (`round1-rerun-2/`) |
| --- | --- | --- |
| Claude Opus 5 | Contradicted (Low) | Contradicted (Moderate), **MATERIAL FRAMING CONCERN** |
| Gemini 3.1 Pro | Not established (High) | Not established (High) |
| GPT-5.6 Sol | Contradicted (Moderate) | Contradicted (Moderate) |

One attempt each, all schema-valid. Every seat held its round-1 verdict.
The multiset is unchanged, so had nothing else happened this claim would
have synthesised Contradicted on an Adjacent panel exactly as before.

**Something else happened.** The Claude seat raised a material framing
concern against the brief, and under methodology v1.2 that halts
synthesis. `scripts/synthesize.ts` scans re-run directories for the
marker as well as `round1/` and `round2/`, so it now exits nonzero on
this run and writes nothing.

### What the concern says

Two objections, both about claim 8's own section of the brief. The seat
answered the claim as posed anyway and recorded them beside its answer,
which is what `prompts/reviewer.md` asks for.

**First, the instrument's season and day type.** The proposition is
about cycling in Edmonton without qualification. The brief fixes the
2015 Edmonton and Region Household Travel Survey, whose fieldwork ran
2015-09-14 to 2015-12-11, weekdays only. Both restrictions cut the same
way, against the recreational side. The seat reports from the City's own
Eco-Counter records that the 89 days matching that window in 2025
carried 614,757 bicycle passages, about 6,908 a day, against 436,863 in
July 2025, about 14,092 a day, and that weekends — excluded outright —
carry about a fifth of a July week's passages with a midday-humped shape
rather than the weekday twin commute peaks. Its point is that the same
brief fixes July for claim 2 on the express ground that a claim is
tested at its strongest for the side asserting it, and claim 8 does the
opposite. It does not claim a full-week, full-year measure would flip
the verdict, and says so.

**Second, the verdict ladder contradicts itself.** The ladder's first
gate returns Not established where "the source's categories cannot be
mapped completely onto recreation and commuting". Its Contradicted
branch expressly contemplates "where Rec is above 35 percent but some
third purpose category is larger". If every category mapped onto
recreation or commuting there could be no third purpose category, so the
two clauses cannot both be operative — and which one governs decides
this claim. Six of the survey's ten categories map to neither bucket.
Under the gate the verdict is Not established; under the reading the
Contradicted branch implies, residual categories are permitted so long
as Rec and Com are each computable, and the verdict is Contradicted. The
seat took the second reading and returned Contradicted, and says the
brief leaves a two-verdict ambiguity to the reviewer.

**This is the same fault the cross-review findings named, seen from the
other side.** Findings 4 and 5 said the two Contradicted verdicts
bypassed the priority rule. This says the priority rule and the
Contradicted branch cannot both be read as written. The re-run was
ordered to test whether the finding survived the objection; what came
back is that the objection is a defect in the brief, not only in the
seats' arithmetic.

### What the re-run also settled about the arithmetic

Worth recording, because it is the part the objection was originally
about. Both Contradicted seats re-derived the shares and both tested
them against the rounding this time, unprompted.

- **Claude** takes every whole-percent cell at plus or minus 0.5 points:
  HB-Work bicycle trips fall between 16,268 and 22,775 and HB-Social /
  Recreation between 9,995 and 13,993. The floor of the work range
  exceeds the ceiling of the recreation range, so commuting beats
  recreation under every admissible rounding combination.
- **GPT** reports the recreational estimate at about 22 percent against
  work at about 39 percent, with rounding bounds of about 18.2 to 25.6
  percent for recreation and 31.4 to 46.7 percent for work, and notes
  that the ten derived cells sum to about 56,600 against a published
  54,800.
- **Gemini** reports the same derivation and the same direction, and
  still returns Not established, because it reads the priority gate as
  blocking: Table 3-10 publishes mode share within purpose rather than a
  purpose distribution of bicycle trips, and "HB-Social / Recreation"
  bundles social visits with recreation.

So the direction of the derived arithmetic is robust to the rounding, and
the disagreement between the seats is not about the numbers at all. It is
about whether the brief's priority gate lets the numbers be used.

### Where this leaves the run

**Synthesis is halted and no finding for this run is current.** The
`synthesis.json` committed in this directory was regenerated under
methodology v1.23 before `round1-rerun-2/` existed, so it still names
`round1` as claim 8's basis and does not know the re-run happened.
Re-running `scripts/synthesize.ts` on this directory today exits nonzero
and writes nothing. A deterministic artifact that cannot be reproduced
from the directory it describes is not a finding a story may be drafted
from, and nothing here should be read as one until the halt is resolved.

**The halt is not the editor's to resolve in passing.** Methodology v1.2
answers a framing concern by revising the brief and rerunning round 1,
and the brief is frozen. A revision means a new freeze hash, a fresh
framing check on the revised section, and a decision about how many of
the eight claims go back to the panel — the last time this happened on
this run, all three seats answered all eight claims again, on the
reasoning that mixing answers from two packages in one round makes the
round dishonest. None of that is decided here, and no word of it is
started.

**What the record holds right now.** Three blind answers on claim 8, one
of them carrying a framing concern; the round-1 answers they sit beside,
unedited; the manifest for both; and a synthesis that predates the
re-run and says so. No story, answers or reader-facing copy have been
drafted.

**This section is left as it was written, and stage 9 is where the halt
is answered.** It was answered by parking claim 8 rather than by
revising the brief, for the reason stage 9 gives: no revision was
available that did not make the claim weaker. `synthesis.json` was then
regenerated and does reproduce from this directory, on seven claims.

## Stage 9, the claim parked and the run synthesised on seven

The halt in stage 8 is resolved, and not by revising the brief.
`riders-are-recreational-not-commuters` leaves this run, parked, and the
other seven synthesise. This section is the whole sequence, because a
reader following the run has to be able to see that a claim was dropped
at the last stage and why.

### The concern, verbatim

From `round1-rerun-2/claude.json`, the `interpretation_notes` on
`riders-are-recreational-not-commuters`, from the marker to the end,
unedited:

> MATERIAL FRAMING CONCERN
>
> Two problems in this claim's section change what the honest answer
> is, and I record them while still answering the claim as posed.
>
> First, the instrument's season and day type. The proposition is
> about cycling in Edmonton without qualification, but the brief
> fixes an instrument that surveyed weekdays only, between
> mid-September and mid-December. Both restrictions cut in one
> direction, against the recreational side. On the City's own
> Eco-Counter records, the 89 days matching the 2015 fieldwork
> window in 2025 (2025-09-14 to 2025-12-11) carried 614,757 bicycle
> passages, about 6,908 a day, against 436,863 in July 2025, about
> 14,092 a day: the survey window sits at roughly half of July's
> riding. Weekends, which the survey excludes outright, carried
> about 20 percent of a July 2025 week's passages and show a
> midday-humped daily shape rather than the weekday twin commute
> peaks. A measure taken on autumn weekdays is the least
> recreational slice of the Edmonton cycling year, and the same
> brief fixes July for claim 2 on the express ground that a claim
> should be tested at its strongest for the side asserting it, not
> at its weakest. Claim 8 does the opposite without noticing. I
> cannot show that a full-week, full-year measure would flip the
> verdict, and a rough extrapolation of weekend volume alone does
> not, but the combined seasonal and day-type effect is large enough
> that the direction of the honest answer is genuinely open. The
> framing I would use instead: either state the proposition as being
> about bicycle trips on autumn weekdays, in those words, beside the
> verdict, or return Not established on the ground that no Edmonton
> instrument measures cycling purpose across the full week and the
> full year. Both are more honest than an unqualified Contradicted,
> and the choice between them changes what the story says.
>
> Second, the verdict ladder contradicts itself. Its first gate
> returns Not established where "the source's categories cannot be
> mapped completely onto recreation and commuting", but its
> Contradicted branch expressly contemplates the case "where Rec is
> above 35 percent but some third purpose category is larger". If
> every category mapped onto recreation or commuting there could be
> no third purpose category. The two clauses cannot both be
> operative, and which one governs decides this claim: under the
> strict reading of the gate, six of the ten categories here
> (Post-Secondary, School, Shopping, Personal Business, Pick up/Drop
> off, Other, plus NHB-Other) map to neither bucket, the mapping is
> not complete, and the verdict is Not established rather than
> Contradicted. I have taken the reading the Contradicted branch
> implies, that residual categories are permitted so long as Rec and
> Com are each computable, and returned Contradicted. A brief that
> decides this in one place would remove a two-verdict ambiguity
> that is currently left to the reviewer.

### The concern is right, and the fault is the brief's

The seat is not being overruled and it is not being re-framed a third
time. Both objections hold.

The proposition is about cycling in Edmonton with no season and no day
type named. The brief fixed an instrument that surveyed weekdays only,
between 2015-09-14 and 2015-12-11. Both restrictions cut the same way,
against the recreational side, and the seat's Eco-Counter figures put
the survey window at roughly half of July's daily riding with the
weekends that carry the recreational shape excluded outright. The same
brief fixed July for claim 2, and said in terms why: a claim is tested
at its strongest for the side asserting it. Claim 8 does the opposite.
That inconsistency is not the seat's and not the panel's. It is the
editor's, written into the brief and frozen there.

The second objection is the same fault from the other side. The ladder's
first gate returns Not established where the source's categories cannot
be mapped completely onto recreation and commuting, and its Contradicted
branch expressly contemplates a third purpose category being larger.
Both cannot be operative, and which one governs decides the claim: six
of the survey's ten categories map to neither bucket. Findings 4 and 5
of the round-2 cross-review said the two Contradicted verdicts bypassed
the priority rule. The seat says the priority rule and the Contradicted
branch cannot both be read as written. They are describing one defect.

### Why no re-frame was available

Methodology v1.2 answers a framing concern by revising the brief and
rerunning round 1. Both revisions available here are worse than not
publishing.

**Qualifying the claim to what the instrument measures makes it
weaker.** The seat's own first option is to state the proposition as
being about bicycle trips on autumn weekdays, in those words. That is a
different and easier proposition than the one two commenters made, and
the standing rule is that a proposition may be made more precise and
never weaker. A site that narrows a claim until its instrument can
carry it is answering a question nobody asked.

**Finding a better instrument means finding one that does not exist.**
What the claim needs is an Edmonton travel survey recording trip purpose
across a representative period. The brief's own source search looked for
one: the successor survey, Navigating Tomorrow, launched in September
2025 and had published nothing by the as-of date, and no other Edmonton
instrument measures cycling purpose across the full week and the full
year. The seat's second option, returning Not established on that
ground, is the honest verdict — but it is a verdict about the record
reached by a brief the panel has already said is defective, and stage 4
does not let the editor pick a verdict out of a halted claim.

So the honest outcome is the one the site already has a mechanism for:
the claim is parked, in public, with its reason, and the run publishes
the seven claims whose framing nobody has faulted.

### What was used to scope the synthesis

`run.yaml` now carries a `synthesis_scope` block: the seven claim ids
this run synthesises, and one `parked` entry naming
`riders-are-recreational-not-commuters`, its basis directory and the
reason it was parked. `scripts/synthesize.ts` reads it under methodology
v1.24.

The mechanism was written so that parking cannot be a quiet way past a
halt, which is the obvious way for this to go wrong:

- The two lists together must account for every claim round 1 asked,
  exactly once. A claim cannot leave a run by going unmentioned.
- A parked claim must carry a reason. Without one, a claim dropped
  because the record cannot answer it reads exactly like a claim dropped
  for the answer it gave.
- A framing concern against a claim the run still publishes halts the
  run exactly as before. Only the parked claim's concern is passed over,
  and it is copied into `synthesis.json` under `parked_claims` rather
  than discarded with the claim.

**Nothing was deleted.** `round1/`, `round1-rerun-2/` and both rounds of
the seats' reviews stay exactly where they were written. A claim the
site tried and could not answer is part of the record of trying.

### The seven findings

Regenerated by `npx tsx scripts/synthesize.ts
reviews/cycling-volumes/2026-09-03` under methodology v1.24. This
supersedes the table earlier in this record.

| Claim | Finding | Panel agreement | Basis |
| --- | --- | --- | --- |
| `cycling-trips-1-3-million-2026` | Partially supported | Split | `round1-rerun-1` |
| `bike-lanes-look-empty` | Contradicted | Adjacent | `round1` |
| `one-to-two-percent-of-population-rides` | Not established | Unanimous | `round1` |
| `one-percent-year-round-users` | Not established | Unanimous | `round1` |
| `two-percent-of-trips-by-bike` | Supported | Unanimous | `round1` |
| `under-one-percent-of-commuters-cycle` | Supported | Unanimous | `round1` |
| `87-percent-commute-by-car` | Supported | Unanimous | `round1` |

No finding changed from what the record already held. What changed is
that there are seven of them.

**What parking cost.** Had the claim synthesised it would have returned
Contradicted on an Adjacent panel, from Contradicted, Contradicted and
Not established. That is a finding against the people who made the
claim, so parking it is not the convenient outcome; it is the one the
brief's defect leaves.

### On the register

`intake/register.yaml` carries the claim as `triage: park` with
`ground: no-instrument` and the reason a reader is shown, which says
plainly that the site tried, that the only instrument it could find
covers autumn weekdays, that this cannot carry a claim about who rides
in general, and that it reopens if a travel survey covering a
representative period and recording trip purpose is published for
Edmonton. The claim keeps its wording, its two commenters and its
provenance: nothing here is withheld.

### An observation, offered as an observation

Four framing reports passed this brief. The panel then found two
material framing defects in it: claim 2's coverage rule, which voided a
verdict on a dead sensor, and claim 8's instrument-and-ladder mismatch.
Both halts were correct. Neither was caught by the check that exists to
catch exactly that.

On this brief the panel was a better framing check than the framing
check. The four reports did substantial work — they are what fixed the
one-sided readings on claims 3 and 4, and check 2 is why claim 4's
instrument was pinned — but a large share of their findings are
threshold and cutoff arithmetic, and on claim 8 the reasoning they
applied elsewhere was not applied at all. Check 1 waved claims 5 to 8
through as "checkable in principle" because the 2015 report has a
mode-by-purpose table. No report asked whether that table's fieldwork
window matched the proposition it was being fixed for, which is the same
instrument-coverage question the same checks pressed hard on claims 3
and 4; and no report noticed that claim 8's ladder contradicts itself,
though the ladders are what those reports spent most of their attention
on.

**This is one run, and it is not a proposed rule change.** Whether a
seat reading a claim in order to answer it will generally see framing
defects a checker reading the brief will not needs more than a single
brief to say. It is recorded here so that if it happens again there is
something to compare it to, and it should not be turned into a
methodology change on the strength of this one.

### The state of the run at the end of stage 9

Seven findings, synthesised deterministically and reproducible from the
files in this directory. One claim parked, on the register, with its
reason and its reopening condition. No story, answers or reader-facing
copy have been drafted: the next stages are drafting, the faithfulness
check, the plain-speech read and the publication gate, none of them
started.

## Stage 10, drafting to the gate

Written after the fact, closing the section above.

The story and the seven claim records were drafted, read for plain speech
by GPT-5.6 Sol (`plain-speech/gpt-1.md`, five rewrites taken and one
refused), and checked for faithfulness twice: by GPT-5.6 Sol
(`faithfulness/gpt-1.md`, 25 findings, all adopted) and by the Gemini
seat (`faithfulness/gemini-1.md`, 8 findings, 7 adopted and 1 refused on
the record). The second seat ran on the CLI's current default rather than
Gemini 3.1 Pro, which was retired under D-0034 the day before; its report
header says so, and so does the freshness seat's.

The publication gate ran on 2026-09-04 and its three reports are under
`gate/`. Source verification graded 320 statements against the archived
bytes, found 12 unsupported and 3 imprecise, and passed 322 of 322 on the
second pass. The release check returned no blocking findings and one
advisory. The freshness audit returned no correction to any finding.

Two things the gate found are worth carrying forward rather than leaving
in a report.

**The brief is not evidence, again.** The 2021 census reference week, "2
to 8 May", appears in `brief.md` line 857 and in no archived source this
run holds; from there it had reached a key fact, four limitations, an
unknown and two sentences of the story. The 2026-09-02 gate on the $100
million story named the same failure mode about a route count in that
brief's selection rationale. Two runs in a row is a pattern, and the
cheap guard is that a drafter takes figures and dates from registry
entries and round files and never from the brief's prose.

**A brief-required disclosure can be complied with by every seat and
still miss the page.** The brief requires a named corridor whose only
counter is off-street to be reported as such, with its figures and the
reason. Two seats reported Hermitage North in cross-review. The drafter
reported the corridor only as absent from the 2009-2016 historic count
dataset, which is true and reads as unmeasured. The gate and the
freshness seat found it independently on the same day.
