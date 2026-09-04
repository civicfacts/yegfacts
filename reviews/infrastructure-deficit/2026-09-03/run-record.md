# Run record: `infrastructure-deficit`, drafted 2026-09-03

What is in this directory, what state it is in, what it deliberately does
not do, and what has to happen next.

## State

| Artifact | State |
| --- | --- |
| `intake.md` | Recorded 2026-09-03. Every quoted wording re-checked against the capture in this session and confirmed an exact substring of the comment attributed to it. |
| `brief.md` | DRAFTED 2026-09-03, **not frozen**. |
| Framing check | **Not run.** No report exists. The brief has been through no independent read of any kind. |
| Panel | Not run. No package assembled, no seats invoked, no `run.yaml`. |
| Register | Untouched. `intake/register.yaml` still shows this question at `lifecycle: registered`, and this session did not edit it. |
| Site content | Untouched. Nothing under `src/content/` was created or modified. |

The brief was drafted by a Claude session. The framing check must go to a
model from a different vendor, per `prompts/framing-check.md`; that check
was not run in this session and no non-Anthropic tool was invoked.

## The claims and where they came from

Three claims, from two of the five registered claims on this question.

| Brief claim | Register claim(s) | Accounts behind it |
| --- | --- | --- |
| `infra-roads-alleys-condition` | `basic-services-in-poor-condition` | 10 |
| `infra-bike-money-from-renewal` | `spending-100-million-despite-deficit` | 2 |
| `infra-hundred-million-vs-shortfall` | `spending-100-million-despite-deficit` | 2 |

Two brief claims come out of one register claim. That is deliberate and it
follows v1.16: the register claim asserts one thing (the City is spending
$100 million while claiming a deficit) whose contested content is two
separate assertions with different predicates — where the money came from,
and whether it is big enough to matter. One finding over both would state
neither. They are one question and two claims, which is exactly the shape
v1.16 requires.

Three registered claims are not in the brief. `rec-centre-money-diverted`
needs a named facility's own project history, a different body of
evidence. `drainage-damage-to-homeowners` and
`new-streetlights-added-costs` are, as captured, assertions nobody in the
argument disputes, so no verdict on either would surprise anyone — the
test v1.19 was written about. The reasons are in `intake.md` under "What
was left out of the brief, and why", where the framing check will read
them, and the brief's scope section forbids the story from claiming any of
them anyway.

## Does this supersede `at-100m-vs-snow` and `at-100m-vs-roads`?

**No. It sits beside them, and it supersedes neither.** The argument, in
full, because the answer determines whether two withdrawn claims are ever
re-run:

**1. Different holders, different assertions, different moment.** The two
withdrawn claims are propositions two identified parties made in December
2022 during the budget debate: a campaign page comparing the programme
with a year of snow clearing, and a councillor comparing it with a roads
figure. This question is an argument fifteen people made in a thread in
August 2026, and none of them made either comparison. Nothing in this
brief tests either proposition, and nothing in it could produce a verdict
on either. A finding here cannot be reported as an answer to a question it
never asked.

**2. v1.19 already said what happens to them, and it is not this.** The
v1.19 entry says of both claims that they are "queued for a re-run on a
common, defined basis". That re-run is a re-brief of the claims under
their own question, and it is still owed. If this brief were treated as
their replacement, the site would have retired two published claims by
answering a different question and then pointed at the answer. That is the
manoeuvre the withdrawal notes were written to prevent, and doing it in
the same week would be worse than not withdrawing them at all.

**3. What this question does supersede is the argument underneath them,
and that is a different thing from the claims.** The dated note on both
withdrawn claims says their figures "are the arithmetic under an argument
the site has not checked, which is whether Edmonton is letting roads,
alleys and basic services go while it funds bike lanes". This brief checks
that argument. So the relationship runs the other way from supersession:
the withdrawn claims were arithmetic offered in support of this question,
and the arithmetic still needs its own defined basis whatever this panel
finds. If this question came back Contradicted on all three claims, the
snow and roads comparisons would still be unresolved arithmetic; if it
came back Supported, they would still be unresolved arithmetic.

**4. The overlap is in the basis, not in the findings.** This brief's
section "The basis, fixed before any figure" is written directly out of
what those two claims got wrong: never capital against operating, never a
category the City does not publish, never a span rescaled to match. If the
re-run of the two withdrawn claims is drafted later, it should take the
same basis rules, and the two runs will then be comparable. That is a
shared method, not a shared finding.

**Concretely, this session changed nothing about them.** Neither claim
file was edited. Neither `board_withdrawn` note was touched. Nothing in
`methodology/changelog.yaml` was touched. Both claims remain at their
addresses with their findings, their evidence and their dated notes, as
v1.19 left them.

## What the brief is betting on, and could be wrong about

Written down before the framing check, so the check can hit them rather
than discover them.

- **Claim 2 may be the weak form of the claim.** The holders' argument is
  about fungibility — you had the money, you should have fixed my street.
  The record cannot answer a counterfactual, so the brief tests whether
  the approval reduced budgeted renewal, and reports the funding
  instrument and whether it permitted renewal use as the qualification
  that answers what the verdict cannot. A framing checker may reasonably
  say that this makes Contradicted the likely and near-empty answer. The
  brief's response, stated inside it, is that the qualification carries
  the fungibility answer and the story must print it with the verdict. If
  the checker does not accept that, the honest fix is to make the funding
  instrument the verdict figure rather than a qualification, and that
  would be a rewrite of the claim rather than an edit to it.
- **Claim 3's likely answer is Contradicted, and that is the point.** If
  Edmonton's reported shortfall for roads and alleys runs to the billions,
  $100 million will not reach a twentieth of it. That verdict is not
  uninformative — it is the answer the people who raised this claim most
  need and least expect — but a framing checker should test whether
  Supported is genuinely reachable, which is why the primary denominator
  is the narrower roads-and-alleys shortfall rather than the whole-city
  gap the holders actually invoked.
- **Claim 1's cutoffs are judgements.** 25 and 10 per cent are not drawn
  from any standard. The brief requires reviewers to report the City's own
  condition target if one exists, on the view that a published target
  beats an invented cutoff and the story should say so.
- **The intake is one-sided.** All fifteen accounts argue the same way.
  The brief names this as a hazard and requires every ladder to be able to
  reach Contradicted on City documents. Whether it has succeeded at that
  is a thing to check, not a thing to assert.

## Open questions

1. **The condition denominator is not confirmed.** The brief sets a
   priority order — replacement value, then length, then count — without
   knowing which of them the City publishes for roadways and alleys, or
   whether alleys are rated as a class at all. If they are not, Claim 1
   loses half its subject and the proposition needs narrowing to roads. A
   framing checker is required by `prompts/framing-check.md` to verify
   that every dataset and definition a brief relies on exists as described
   on the as-of date; this is the item most likely to fail that.
2. **Whether the City publishes a roads-and-alleys-specific unfunded
   renewal figure at all.** Claim 3's primary denominator depends on it.
   If only a whole-asset gap is published, the required alternative
   becomes the only figure and the claim should be re-worded to match
   rather than left with a primary definition the record cannot meet.
3. **Drainage sits in the question's title and in no claim.** Required
   calculation 5 makes the panel establish which body funds Edmonton's
   drainage and under which bylaw, and report it without a verdict. That
   may well be the single most useful fact this question produces for a
   reader, and it will arrive as a reported calculation rather than as a
   finding. Whether that is the right home for it is worth a decision.
4. **No captured wording asserts deterioration over time**, so the trend
   is a qualification rather than a claim, even though "letting go" in the
   question's own title is a trend word. If a later source captures
   somebody saying the roads are getting worse, that is a new claim for
   intake, not an edit to this brief.
5. **The register still shows three claims on this question that this
   brief does not test.** They keep their rows. Whether they should be
   re-triaged, briefed separately or left is not decided here, and this
   session did not edit `intake/register.yaml`.
6. **The re-run of `at-100m-vs-snow` and `at-100m-vs-roads` is still
   owed**, on the basis v1.19 promised. This brief does not discharge it.

## Next steps, in order

1. Framing check, a model from a different vendor than the drafter, on
   `prompts/framing-check.md`, with `intake.md` and `brief.md` as input.
   Report committed beside the brief as `framing/check-1.md`.
2. Revise, re-check; the check is capped at three reports under v1.12.
3. Freeze the brief only on FRAME OK, then assemble the panel package.

Nothing in this directory may go to a panel before step 3.
