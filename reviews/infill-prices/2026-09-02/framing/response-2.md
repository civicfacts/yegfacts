# Response to framing check 2

Brief: reviews/infill-prices/2026-09-02/brief.md, Revision 2 after framing
check 2. Every finding in framing/check-2.md that is WEAKENED, OPEN or new
is answered below in the checker's order. The findings marked RESOLVED are
untouched, and no wording that met check 1 has been narrowed.

## Check 2, new finding: Claim 2 folded the price relationship into the affordability proposition

Met. The compound proposition is gone. The story now carries three claims,
each verdict-bearing on its own:

> - `ip-teardown-price-gap`: the price relationship on linked
>   demolition-and-replacement lots.
> - `ip-infill-shelter-cost-test`: whether replacement housing on those
>   lots fails the predeclared 30 percent shelter-cost-to-income test.
> - `ip-infill-city-definition-test`: whether replacement housing on those
>   lots fails the City of Edmonton's own affordable-housing definition.
>
> Each claim carries its own verdict, confidence and evidence-basis label.
> The price relationship stays in Claim 1 and is not part of either
> affordability proposition. Where the three findings disagree, report the
> disagreement in synthesis; do not join them into one proposition.

The two affordability propositions:

Claim 2, `ip-infill-shelter-cost-test`:

> **Normalized proposition (descriptive):** Among matched lot pairs on
> linked teardown-infill lots, more than 50 percent carry replacement
> housing that exceeds the declared 30 percent shelter-cost-to-income
> threshold. A lot pair counts as exceeding the threshold only when every
> separately saleable replacement dwelling on that lot exceeds it.

Claim 3, `ip-infill-city-definition-test`:

> **Normalized proposition (descriptive):** Among matched lot pairs on
> linked teardown-infill lots, more than 50 percent carry replacement
> housing that does not meet the City of Edmonton affordable-housing
> definition in force on the freeze date recorded in run.yaml. A lot pair
> counts as not meeting the definition only when no separately saleable
> replacement dwelling on that lot meets it.

and the separation is stated explicitly:

> A replacement dwelling can exceed an affordability threshold while
> costing less than the dwelling it replaced, and it can cost far more than
> the dwelling it replaced while passing the threshold. The comparison with
> what was demolished is Claim 1, and it is verdict-bearing there and
> nowhere else.

**Where this departs from the replacement wording, and why.** The checker's
2a and 2b are stated over replacement dwellings; the brief states them over
matched lot pairs, with the lot-pair rule written into each proposition and
the dwelling-level share required alongside every lot-pair share. The
reason is the next finding: one unit has to be held through every measure,
and the dwelling-level result is reported in full rather than dropped.

## Earlier findings 3 and 4a, WEAKENED, and check 3: the verdict measure and the unit of analysis

Met. One unit is fixed for the whole brief:

> The unit of analysis is the matched lot pair: one lot on which one
> existing dwelling was demolished, paired with the replacement dwelling or
> dwellings built on that same lot. Every verdict in this brief is stated
> at the lot-pair level, and every denominator that carries a verdict is a
> count of matched lot pairs. Per-dwelling and per-unit figures are
> reported for multi-unit replacements, and a dwelling-level share is
> reported alongside every lot-pair share, but neither replaces the
> lot-pair rule.

The weighting and direction rules the checker demanded before any share is
calculated:

> How several replacement dwellings on one lot are weighted, fixed here:
> the lot pair counts once. Its direction on the total-price-per-dwelling
> basis is the higher-price direction only when every separately saleable
> replacement dwelling on that lot has a higher price than the demolished
> dwelling's value. Report as declared sensitivities the lot-pair share
> under a rule that counts a lot pair when at least one replacement
> dwelling has a higher price, and the dwelling-level share that counts
> every separately saleable replacement dwelling once. These rules are
> fixed before any share is calculated and may not be changed after the
> results are seen.

Lots with more than one demolished dwelling are handled as a separate
series under a stated rule and do not enter a verdict denominator.

The sentence the checker quoted against itself is deleted. Per-unit price
no longer controls the verdict:

> **Verdict measure, fixed here.** Compare the demolished dwelling's value
> with the replacement's price on two bases, and report both for every
> matched lot pair:
>
> 1. **Total price per dwelling.** The whole first arm's-length sale price
>    of each separately saleable replacement dwelling, undivided.
> 2. **Per unit.** The same sale price divided by the number of dwelling
>    units the replacement dwelling contains, where it contains more than
>    one.
>
> Claim 1 is Supported only when the "usually" threshold below is met on
> the total-price-per-dwelling basis. That basis is what the captured
> wording means by "a $1,000,000 house": the price of a whole house someone
> buys. The per-unit result is reported alongside as the qualification on
> the finding, with its own share, median ratio and distribution, and it is
> stated in the interpretation notes whenever the two bases point in
> different directions. A per-unit result does not carry the verdict on its
> own, and neither does a lot total: an added unit count does not erase a
> high purchase price, and a high lot total does not erase a lower
> per-dwelling price.
>
> No per-square-foot, per-bedroom, assessed-value, asking-price,
> aggregate-title or rent measure substitutes for the sale-price comparison
> in Claim 1's verdict.

Both halves of the checker's concern are preserved in that last paragraph,
in the checker's own terms.

## Check 4, new finding: the denominator

Met. The "usually" threshold now runs on the declared unit:

> **"Usually."** "Usually" means more than 50 percent of matched lot pairs
> show the higher-price direction on the total-price-per-dwelling basis,
> with a lot pair's direction determined by the rule in the
> unit-of-analysis section above.

"Matched projects" no longer appears as a denominator anywhere, the
lot-pair direction is defined before any share is calculated, and the
dwelling-level share is a declared sensitivity rather than a substitute.

## Earlier finding 4h, WEAKENED, and check 4: admissible price series

Met. The fallback hierarchy is deleted and replaced by a verdict series and
labelled companion series:

> **Admissible price series, predeclared.** Only matched arm's-length sale
> prices enter Claim 1's verdict series: the last arm's-length sale price
> of the demolished dwelling before demolition, and the first arm's-length
> sale price of each separately saleable replacement dwelling after
> completion. A matched lot pair that lacks either of those sale prices is
> missing from the verdict series. It is not filled in from another
> measure. Report its absence in the missing-data counts.

Assessed values, asking prices, aggregate-title sales, property-level
contract rents and CMHC survey rents are each listed as their own labelled
series, never pooled into the verdict series and never mixed within one
reported figure, with a record of which series supplied each figure and how
many cases it covered.

## Check 4, new finding: tenure changes

Met:

> **Tenure changes, predeclared.** Compare sale price with sale price and
> contract rent with prior contract rent. A matched lot pair in which the
> demolished dwelling and the replacement are of different tenure, for
> example an owner-occupied dwelling replaced by rental housing or a rental
> replaced by ownership, is reported as a separate series with its count.
> Do not assign such a pair a higher-cost or lower-cost direction and do
> not count it in a verdict denominator: a purchase price and a monthly
> rent are not comparable figures, and this brief predeclares no common
> shelter-cost calculation that would make them so.

The rent-to-rent comparison that the deleted conjunct carried is kept, in
Claim 1, as its own series with its own share, median ratio and count.

## Check 4, new finding: fire and safety demolitions

Met, by including them in the primary result rather than justifying an
exclusion:

> - Exclusion: pairs where the replacement is non-residential. Report the
>   excluded count and reason. Fire-order and safety-order demolitions are
>   not excluded. Include every otherwise eligible residential teardown in
>   the primary result, and report as a declared sensitivity the same
>   result with fire-order and safety-order demolitions removed, with their
>   count and the effect on the demolished-dwelling values.

## Check 4, new finding: assessment timing

Met, on both sides of the pair, with both years stated:

> 2. the City assessed total value of the demolished dwelling taken from
>    the assessment roll in force in the year before the demolition, which
>    is the last roll that valued the dwelling while it was standing, with
>    that year stated.

> Where the assessment year nearest the demolition permit date is a
> different year from the roll named above, report that year's figure as a
> labelled sensitivity.

> **Replacement assessed value, predeclared.** Where the assessed series is
> reported for a replacement dwelling, take it from that dwelling's first
> full assessment year after completion, and state that year. Both
> assessment years, the demolished dwelling's and the replacement's, are
> stated for every pair for which the assessed series is reported.

## Earlier finding 4i, WEAKENED, and check 4: the affordability population

Met:

> **Affordability denominator and the majority threshold, predeclared.**
> For each affordability claim the verdict denominator is matched lot
> pairs, counted on the lot-pair rule stated in that claim's proposition,
> and the majority threshold is more than 50 percent of that denominator.
> Report the numerator and the denominator for that share. Report alongside
> it the dwelling-level share, counting every separately saleable
> replacement dwelling once, and report both shares broken down by tenure
> and by bedroom count, together with the tenure and bedroom-count
> distribution of the matched set. A dwelling whose test result is Not
> established under the utilities rule below is reported in its own
> category, is not counted as meeting or as failing the test, and its count
> and share of the denominator are stated. Fix these rules before any share
> is calculated.

The denominator is the matched lot pair rather than the replacement
dwelling, for the reason given under check 2 above; every figure the
checker asked for, including the dwelling-level share and the tenure and
bedroom-count breakdowns, is required alongside it.

## Check 4, new finding: income denominator and financing

Met:

> Report the test at the City median household income and, in addition, by
> each available household-income band or household type, matched to
> bedroom count where the source permits, labelling which income figure
> produced which result.

> - Amortization: report the test under a 25-year amortization and under a
>   30-year amortization, and label which produced which result. Where a
>   30-year amortization is not available to the purchaser and dwelling
>   class being tested, state the rule that makes it unavailable, with its
>   source and date, and report only the amortization that is available.

## Check 4, new finding: missing utilities

Met, with the checker's rule that a utilities-excluded figure cannot
classify a dwelling:

> Where a required utility input is unavailable for a dwelling, the
> complete shelter-cost test for that dwelling is Not established: report
> the calculation that excludes utilities as a labelled lower-bound
> sensitivity, and do not use it to classify that dwelling for either
> affordability verdict. Do not substitute an unsourced allowance.

## Earlier finding 4n, WEAKENED, and check 4: the verdict mapping overlapped

Met by splitting the proposition, which is the fix the checker proposed.
The compound mapping is deleted:

> **Verdict mapping, predeclared.** Each of the three claims carries its
> own verdict and uses the methodology's four verdict words directly. There
> is no compound rule and no conjunct, and no claim's verdict depends on
> another claim's result:
>
> - **Supported:** the declared majority threshold for that claim is
>   affirmatively established on that claim's verdict denominator.
> - **Contradicted:** the opposite majority is affirmatively established on
>   that denominator.
> - **Not established:** the usable evidence establishes neither.
> - **Partially supported:** only where the stated proposition contains a
>   meaningful part that the evidence establishes while the rest
>   overreaches.

The check-1 guard against a favourable supplementary comparator being
called the "meaningful part" is kept, and extended to the new verdict
measure:

> For Claim 1, a per-unit result that differs from the result on the
> total-price-per-dwelling basis is reported as the qualification on the
> verdict, not as a "meaningful part" that changes it.

## Earlier findings 6a and 6c, WEAKENED: aggregate checkability

Met by the changes above. Claim 1 now has one unit, one verdict
denominator, one admissible verdict series and one declared basis for the
finding. The affordability question is two propositions, each with a
declared test, a declared denominator, a declared majority threshold and a
Not established category for dwellings whose inputs are incomplete.

## Earlier finding 6b, OPEN: the specific example is uncheckable

Met, with the checker's replacement wording:

> The alleged $350,000 to $1,000,000 example cannot be verified as a
> specific case, because its source and its property were not captured. It
> is context only and it receives no verdict, and the findings on the
> claims in this brief must not be presented as verification of it.

The earlier sentence about the round numbers not being cutoffs is kept
after it, since it answers a different question.

## Check 7, new finding: causal evidence both excluded and requested

Met. The instruction to report causal evidence is deleted:

> This brief therefore tests the descriptive propositions above and does
> not test, and no verdict in it may be read as testing, whether infill
> causes housing to be more or less affordable. The causal effect of infill
> on city-wide housing costs is out of scope for this review. Do not
> research or report it here. Test it only in a separate brief with a
> declared counterfactual and period.

Prior tenure, prior rent, prior unit count and recorded displacement stay
in scope, as the checker confirmed they should.

## Findings kept as drafted

None. Every WEAKENED, OPEN and new finding is met with a change. Two are
met on a different unit than the replacement wording used: the affordability
propositions and their denominator are stated over matched lot pairs rather
than replacement dwellings, so that one unit carries every verdict in the
brief, with the dwelling-level share and the tenure and bedroom-count
breakdowns required alongside. The reasons are stated in those entries
rather than left implicit.

Stew, 2026-09-02
