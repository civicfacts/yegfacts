# Run record: `infrastructure-deficit`, drafted and parked 2026-09-03

What is in this directory, what state it is in, what it deliberately does
not do, and what has to happen next.

## State

| Artifact | State |
| --- | --- |
| `intake.md` | Recorded 2026-09-03. Every quoted wording re-checked against the capture and confirmed an exact substring of the comment attributed to it. Unchanged by the framing check. |
| `brief.md` | **PARKED 2026-09-03 on framing check 3 REVISE. Not frozen.** Three drafts: drafted, revised under check 1, revised again under the editor's resolution after check 2. |
| Framing check | **Run three times, the full cap.** check-1.md REVISE, response-1.md, check-2.md REVISE, resolution.md, check-3.md REVISE. All three reports are verbatim. |
| Panel | Not run. No package assembled, no seats invoked, no `run.yaml`. Nothing here may go to a panel while the brief is parked. |
| Register | Untouched. `intake/register.yaml` still shows this question at `lifecycle: registered`. See "Why the register was not touched". |
| Site content | Untouched. Nothing under `src/content/` was created or modified. |

The brief was drafted by a Claude session. Every framing check went to
OpenAI gpt-5.6-sol, a different vendor, per `prompts/framing-check.md`.
The pinned command is recorded in the HTML comment at the top of each
report; the model name inside a report is the checker's self-report and
the command is what the run log records.

## Why it is parked

`prompts/framing-check.md` caps the check at three reports for one brief
(methodology v1.12, carried into v1.19). The third report is a
confirmation: FRAME OK freezes the brief with the editor's resolution
beside it; REVISE parks it, and it reopens only on new intake evidence,
never on a further revision of the same brief.

Report 3 came back REVISE. Twenty-eight findings across the three reports
are marked RESOLVED. Exactly one stands.

### The one finding that stands

Check 9, on Claim 1's proposition. The brief asks the panel to classify:

> Edmonton's roads are in poor condition.

The City's latest published condition rating describes the network as of a
date well before the claims were made in August 2026. The brief says so at
four places — the Dates section, "Who asks this", a paragraph inside Claim
1, and the scope section — and binds the story to print the inventory date
wherever it prints the verdict. The checker's finding is that none of that
changes what the reviewer is formally asked to classify: a present-tense
proposition, on evidence that stops earlier, which a reviewer could return
Supported on while the brief separately forbids the story from saying the
roads were in that condition in 2026.

Its proposed replacement:

> The City's latest published condition ratings available by 2026-09-03
> show that Edmonton's Roads asset class was in poor condition as of the
> inventory date those ratings describe.

**The editor's position, for the record: the checker is right and the
resolution was wrong.** The refusal in `framing/resolution.md` rested on
check 9's own warning against propositions stated in the units the record
happens to publish. The checker answered that directly — the replacement
is more precise, not weaker, which is what the framing prompt's override
rule requires, and it leaves the natural present-tense question in the
title and in "Who asks this", where a reader meets it. That is the better
argument. The resolution spent the one editorial intervention the cap
allows defending the weaker position, and the park is the honest
consequence of that, not a defect in the check.

### What this is not

It is **not** an arithmetic ladder defect. Check 4 is fully RESOLVED
across all three claims: every cutoff has one alternative with results
required under both, every ladder is exhaustive and disjoint, the
divide-by-zero band in Claim 3 and the empty-set routing in Claims 1 and 2
were walked boundary by boundary and survive. So the correction-plus-one-
confirmation route that v1.20 opens for arithmetic defects (PR #37, not on
this branch) does not reach this finding, and this run did not try to use
it.

## What would unpark it, and what would not

Under the rule as written, a further revision of this brief would not.
Only new intake evidence reopens it.

Three routes exist, and the choice is the founder's, not this session's:

1. **Leave it parked.** The cap did what a cap is for. The cost is that a
   question fifteen people argued goes unanswered over one sentence's
   tense, when the editor agrees with the fix.
2. **New intake evidence.** If a later capture records somebody making the
   road-condition claim in a form tied to a date, that is new intake, and
   the question reopens with a new brief on the normal route.
3. **A methodology question worth putting to the founder.** v1.20 was
   written because the cap could park a brief over an arithmetic slip that
   one confirmation would fix. This park is the same shape without being
   the same defect: a single, fully specified wording change that the
   editor accepts and the checker has already drafted, with no route to
   apply it. Whether v1.20's correction-plus-one-confirmation should
   extend beyond arithmetic to any finding the editor concedes is a
   methodology decision. **This session did not make it, did not touch
   `methodology/changelog.yaml`, and did not apply the fix.** It is
   recorded here so the morning can decide with the whole trail in front
   of it.

## Why the register was not touched

The register work — `lifecycle` to `briefed`, the claim dispositions —
belongs to a frozen brief. This brief is parked, and a parked brief cannot
go to a panel, so `briefed` would misdescribe the state. The question
stays at `lifecycle: registered` with its five claims and its GO triage,
exactly as this session found it. No claim id was added, no proposition
edited, no question title changed in the register. If the brief later
freezes, the register work is still owed and is listed under "Next steps".

One consequence worth naming: the brief's title changed twice during the
check and no longer matches the register's question wording, which is
still "Is Edmonton letting roads, alleys and drainage go while it funds
bike lanes?" — the wording the checker found asserts a trend the brief
does not test and names drainage the brief does not test. That mismatch is
deliberate for now. Changing the register's question wording is a change
to a published address's title and belongs with the freeze, not with a
park.

## The claims and where they came from

Three brief claims, from two of the five registered claims on this
question. The ids changed during the check and the mapping is:

| Brief claim (final draft) | Was | Register claim(s) | Accounts |
| --- | --- | --- | --- |
| `infra-roads-condition` | `infra-roads-alleys-condition` | `basic-services-in-poor-condition` | 8 of the 10 |
| `infra-bike-money-renewal-eligible` | `infra-bike-money-from-renewal` | `spending-100-million-despite-deficit` | 2 |
| `infra-hundred-million-vs-shortfall` | unchanged | `spending-100-million-despite-deficit` | 2 |

None of these ids has ever been published, so none of them is an address
that moved.

Three registered claims are not in the brief, for the reasons in
`intake.md` under "What was left out of the brief, and why":
`rec-centre-money-diverted` needs a named facility's own project history;
`drainage-damage-to-homeowners` and `new-streetlights-added-costs` are, as
captured, assertions nobody in the argument disputes.

## What the three checks changed

Recorded because the brief that parked is a much better brief than the one
that was drafted, and the record should say what the check bought.

**Basis rules.** None was loosened at any point. B2 was tightened once — a
verdict-bearing ratio now requires both sides on 2023-2026, and a
differently spanned figure is reported, labelled and left unclassified,
which closed a conflict between B2 and Claim 3 that would have reproduced
the exact defect that withdrew `at-100m-vs-snow`. B3 was tightened twice.
B4 gained an explicit statement that no actual goes on either side of a
classified ratio. B6 was reduced to a pure prohibition.

**Two refusals, both argued in writing.** The check asked that the
magnitude claim also be classified on cumulative actuals through 2025;
refused, because three years of actuals against a four-year requirement is
the span mismatch B2 exists to forbid and no same-span actual exists at
this freeze date. Check 2 and check 3 both marked that refusal justified.
The check also reported the two open-data assets as empty, private or
deleted; refused after testing them, because both resolve publicly, the
dataset carries 137 rows under the name the brief gives it, and the map is
a view derived from it. Check 3 marked that RESOLVED on the editor's
evidence.

**Two defects the check found that the drafter had missed entirely.**
Source 9 named Bylaw 19627 as the instrument under which drainage sits; it
is a rate bylaw, it covered 2022-04-01 to 2025-03-31, and it had been
replaced. And Claim 2's original renewal set counted whole capital
profiles, sweeping in growth allocations and sidewalks, signals and
streetlight work, when the profile sheets publish the split.

**One defect found by checking the check.** Claim 1 originally defined its
asset set as "the paved driving surfaces the City owns" — a boundary the
drafter was drawing, not one the City publishes. That is the same
manoeuvre that took `at-100m-vs-roads` off the findings board, inside the
brief written to prevent it. Claim 1 now takes the City's own road class
at the level the City publishes it and forbids adding, dropping or
carving.

**Two claims substantially reframed.** Claim 2 stopped testing whether a
bookkeeping transfer occurred — a test a holder could lose while going on
making the same argument — and now tests whether the money could have gone
to road or alley renewal at all, which is the answerable half of the
opportunity-cost argument. Claim 3's denominator moved from a
roads-and-alleys shortfall the drafter chose because it favoured the
claim, to the whole-infrastructure shortfall the captured wording actually
invokes.

## Open questions

Six were recorded before the check. Four are settled by it.

1. **The condition denominator — settled.** Replacement value carries the
   verdict, length is the required alternative, count is a last resort. It
   was also confirmed that the City rates roads as a class and does not
   rate alleys as one, which is why Claim 1 narrowed to roads and alleys
   became a required calculation rather than half a subject.
2. **A roads-and-alleys unfunded renewal figure — settled by becoming
   moot.** Claim 3's primary denominator is now the whole-city figure the
   holders' words invoke, which the adopted 2023-2026 Capital Budget
   publishes on the same four years as the numerator. Any
   roads-and-alleys figure is the required alternative, and the brief tells
   the panel to say plainly if there is none.
3. **Drainage — settled.** It is out of the title, out of every claim, out
   of the sources and out of the required calculations. B6 remains as a
   prohibition binding every claim and commissioning nothing.
4. **No captured wording asserts deterioration over time — unchanged.**
   The trend stays a qualification. A later source capturing somebody
   saying the roads are getting worse is new intake, not an edit to this
   brief. It would also be the new intake evidence that reopens this park.
5. **Three registered claims this brief does not test — unchanged.** They
   keep their rows. Nothing was re-triaged and the register was not
   edited.
6. **The re-run of `at-100m-vs-snow` and `at-100m-vs-roads` is still
   owed**, on the basis v1.19 promised. This brief does not discharge it,
   and parking changes nothing about that. The basis section here is the
   one that re-run should take, and it is now three drafts better tested
   than when it was written.

And one new:

7. **Should the cap's park extend to a finding the editor concedes?** See
   "What would unpark it". A decision for the founder, not for this
   session.

## Does this supersede `at-100m-vs-snow` and `at-100m-vs-roads`?

**No. It sits beside them, and it supersedes neither.** The argument in
full, unchanged by the framing check, because the answer determines
whether two withdrawn claims are ever re-run:

**1. Different holders, different assertions, different moment.** The two
withdrawn claims are propositions two identified parties made in December
2022 during the budget debate: a campaign page comparing the programme
with a year of snow clearing, and a councillor comparing it with a roads
figure. This question is an argument fifteen accounts made in a thread in
August 2026, and none of them made either comparison. Nothing in this
brief tests either proposition, and nothing in it could produce a verdict
on either.

**2. v1.19 already said what happens to them, and it is not this.** The
v1.19 entry says of both claims that they are "queued for a re-run on a
common, defined basis". That re-run is a re-brief of the claims under
their own question, and it is still owed. If this brief were treated as
their replacement, the site would have retired two published claims by
answering a different question and then pointed at the answer.

**3. What this question does supersede is the argument underneath them,
and that is a different thing from the claims.** The dated note on both
withdrawn claims says their figures "are the arithmetic under an argument
the site has not checked". This brief checks that argument. The
arithmetic still needs its own defined basis whatever this panel finds —
and this panel has not run.

**4. The overlap is in the basis, not in the findings.** "The basis, fixed
before any figure" is written directly out of what those two claims got
wrong. That is a shared method, not a shared finding.

**Concretely, this session changed nothing about them.** Neither claim
file was edited. Neither `board_withdrawn` note was touched. Nothing in
`methodology/changelog.yaml` was touched.

## Next steps, in order

1. **A decision on the park**, per "What would unpark it". Nothing below
   happens until that is made.
2. If the brief ever freezes: rewrite the status line to FROZEN with its
   history, record the sha256 of `brief.md` computed after that edit, and
   only then do the register work — `lifecycle` to `briefed`, the question
   wording brought into line with the brief's title, and the dispositions
   of the three untested registered claims recorded in the register's own
   schema.
3. Then, and only then, assemble the panel package.

Nothing in this directory may go to a panel in its current state.
