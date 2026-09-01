# Response to framing check 3

Brief: reviews/infill-prices/2026-09-02/brief.md, revision 3.

Check 3 returned REVISE. The founder declined to arbitrate editorial
content and placed it with Stew as editor (board decision D-0020,
methodology v1.8). The editor's resolution is in framing/escalation.md:
adopt items 1 to 8 as written, including dropping Claim 3. This response
records one entry per escalation item, with the wording now in the brief.
The checker's standing objections remain on the record in check-3.md;
check 4 is a confirmation run.

## Item 1, prevalence sentence still overstates

Adopted with the checker's replacement wording. "A recurring response" is
gone from the selection rationale:

> - Prevalence: the founder supplied one possibly composite formulation
>   from one Edmonton infill thread. No sample of other posts was captured,
>   so this brief cannot establish the claim's prevalence or whether this
>   wording represents how it circulates.

## Item 2, verdict denominator

Adopted. Separately saleable replacement dwellings are the verdict
denominator for both claims, each counted once; the two lot rules become
named sensitivities:

> The verdict denominator for every claim in this brief is separately
> saleable replacement dwellings, each counted once. Both propositions are
> about the price and the affordability of replacement houses, so the
> dwelling is the unit they are stated in and the unit they are counted in.

> Two lot-level rules are reported as named sensitivities and never carry a
> verdict:
>
> 1. **The "every replacement" rule:** the share of matched lot pairs on
>    which every separately saleable replacement dwelling falls in the
>    claimed direction.
> 2. **The "at least one replacement" rule:** the share of matched lot
>    pairs on which at least one separately saleable replacement dwelling
>    falls in the claimed direction.

> Neither lot rule may displace the dwelling-level result: a rule under
> which one lower-priced dwelling removes the other replacement dwellings
> on that lot from the verdict does not test the proposition as written.

Claim 1's proposition is replaced with the checker's wording:

> **Normalized proposition:** Among separately saleable replacement
> dwellings on Edmonton lots where one existing dwelling was demolished for
> infill, more than 50 percent have a higher first arm's-length sale price
> than the demolished dwelling's last arm's-length sale price, in constant
> dollars. Count every separately saleable replacement dwelling once.
> Report lot-level shares under the "every replacement" and "at least one
> replacement" rules as declared sensitivities.

The "usually" section is restated on the dwelling denominator:

> **The majority threshold.** Claim 1 asks whether more than 50 percent of
> separately saleable replacement dwellings show the higher-price direction
> on the total-price-per-dwelling basis, each such dwelling counted once.

The same finding's second replacement, on the overclaimed reading of the
quotation, is also taken:

> Total price per separately saleable dwelling is the closest predeclared
> measure to the quotation's reference to the price of a replacement house.
> This is an operational choice, not a verified statement of the original
> speaker's intent.

## Item 3, Claim 3 and the City's affordable-housing definition

Adopted: Claim 3 is dropped. Its id, its claim section, its half of the
"two tests" paragraph, its line in the verdict mapping and its line in the
story's claim list are all removed. The story is two claims:

> - `ip-teardown-price-gap`: the price relationship on linked
>   demolition-and-replacement lots.
> - `ip-infill-affordable`: whether replacement housing on those lots fails
>   the predeclared 30 percent shelter-cost-to-income test.

Why it was dropped is on the record in the brief rather than only here:

> The City of Edmonton's own affordable-housing definition is not tested in
> this story. That definition concerns housing receiving government
> financial assistance or operating under a government agreement, and the
> City's guidebook says it does not apply to market home ownership, so it
> is not a second reading of a captured objection to market replacement
> prices. Qualification as City-defined affordable housing needs its own
> captured source and its own brief. Do not classify replacement dwellings
> against it here.

## Item 4, missing classifications

Adopted with the checker's bounds rule, now in the verdict mapping:

> Unclassified cases are handled by bounds. Calculate lower and upper
> bounds over the complete verdict denominator. The lower bound treats
> every unclassified case as not satisfying the claimed direction; the
> upper bound treats every unclassified case as satisfying it. Report the
> unclassified count and share separately.
>
> - **Supported:** the lower bound exceeds 50 percent of that claim's
>   verdict denominator.
> - **Contradicted:** the usable evidence affirmatively establishes that 50
>   percent or fewer of the verdict denominator satisfy the proposition,
>   that is, the upper bound is 50 percent or less.
> - **Not established:** the usable evidence establishes neither.

The utilities rule now feeds that bound instead of dead-ending:

> That dwelling is unclassified and enters the bounds rule below.

## Item 5, Claim 2's hypothetical household and financing case

Adopted with the checker's replacement proposition:

> **Normalized proposition (descriptive):** Among separately saleable
> replacement dwellings in the matched set, more than 50 percent would
> require shelter costs exceeding 30 percent of before-tax income for a
> hypothetical household earning the declared City median income, under the
> 25-year amortization and the other primary assumptions below.

The brief says plainly that the household is modelled:

> The household is a modelled household, not the household that bought or
> rented the dwelling. The standard 30 percent measure compares one
> household's shelter costs with that household's own income; this brief
> cannot do that, because the record does not carry purchaser incomes, so
> the proposition says what it tests. The 30-year amortization, other
> household incomes and other household types are named sensitivities,
> reported with their own results and labelled, and none of them carries
> the verdict.

The assumptions are amended to match, so no amortization or income
disagreement is left unresolved:

> - Amortization: the 25-year amortization is the primary case and it alone
>   carries the Claim 2 verdict. Report the 30-year amortization as a named
>   sensitivity and label which produced which result.

> The declared City median household income is the primary case and it
> alone carries the Claim 2 verdict.

## Item 6, as-of date

Adopted. The exact freeze date is inserted wherever the `run.yaml` pointer
stood, and a dates section fixes it once for the whole brief:

> ## Dates fixed in this brief
>
> **As-of date (freeze date):** 2026-09-02.
>
> Every rule in this brief that turns on an instrument, a boundary, a
> window, an income source or a financing rule being in force or available
> takes it as it stood on 2026-09-02. That date is fixed here, in the text
> reviewers receive. A run manifest may repeat it; it does not define it
> and does not replace it.

The two surviving pointers now read:

> mature-neighbourhood policy instrument and the official consolidation in
> force on 2026-09-02, quote the definition, and state the date and version
> reviewed.

> complete calendar year before the freeze date, 2026-09-02, matched to
> replacements recorded up to that date.

The other two `run.yaml` references were in Claim 3 and its test, and left
with it. No `run.yaml` reference remains in the brief.

## Item 7, verdict mapping at exactly 50 percent

Adopted with the checker's Contradicted wording, quoted under item 4 above:

> **Contradicted:** the usable evidence affirmatively establishes that 50
> percent or fewer of the verdict denominator satisfy the proposition, that
> is, the upper bound is 50 percent or less.

## Item 8, "confidence" vocabulary

Adopted. The per-claim confidence sentence is replaced:

> Each claim carries its own finding, panel agreement and evidence-basis
> label. Reviewer confidence appears only beside the reviewer who assigned
> it.

Stew, 2026-09-02
