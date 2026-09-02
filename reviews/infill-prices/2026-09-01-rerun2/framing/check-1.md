<!-- Framing check 1 on the second-rerun brief. Checker: OpenAI gpt-5.6-sol via codex exec, reasoning effort high, prompt prompts/framing-check.md (v1.9). Run 2026-09-01 by Stew. -->

Verdict: REVISE

## 1. Provenance

OK.

The brief preserves the only captured wording, identifies it as founder-supplied and possibly composite, and states that the platform, author, URL, and context were not captured. It makes no unsupported prevalence or representativeness claim.

## 2. Does the proposition test what the post asserts?

Finding.

### Claim 1 contains a contradictory tenure exclusion

The revised rule says:

> This holds whatever the tenure of the replacement, so a purpose-built rental building enters an assessed-value comparison per dwelling unit and never as an undivided building total.

The next sentences say:

> A matched lot pair in which the demolished dwelling and the replacement are of different tenure [...] is reported as a separate series [...] Do not assign such a pair a higher-cost or lower-cost direction and do not count it in a verdict denominator.

Claim 1 compares assessed value with assessed value, including for rental buildings. No rent-to-assessment comparison is needed. Excluding tenure changes contradicts the normalized proposition and could remove exactly the multi-unit replacements that prompted this revision.

Replace with:

> Claim 1 compares assessed value with assessed value for every otherwise eligible replacement dwelling unit, regardless of the tenure of the demolished or replacement housing. A tenure change is reported as a qualification and does not remove the dwelling unit from Claim 1's verdict denominator. Where both sides were rented and comparable contract rents exist, report the rent-to-rent comparison as a separate non-verdict series.

### Claim 2's detailed rule contradicts its normalized proposition

The proposition says rental basis applies:

> where the dwelling unit is rented.

The detailed rule instead says every separately titled dwelling receives:

> The purchase basis, on its own total value per dwelling

This models a rented condominium or titled house as a purchase solely because it has its own title. Conversely, an owner-occupied unit in a single-title building receives a mortgage calculation based on a fractional assessed value that cannot itself be purchased.

Replace with:

> Select the shelter-cost basis by tenure, not title. Test every rented dwelling unit on rent plus utilities. Use the purchase basis only where the modelled household could purchase the separately saleable dwelling represented by the price. A unit that is neither rented nor separately purchasable is unclassified unless a published source provides a valid occupancy-cost basis.

## 3. Is it the strongest fair reading?

Finding.

The brief repeatedly calls a single-title building total divided by its unit count:

> each replacement dwelling unit's assessed value

That calculation is a building average. It is not a City assessment or observed market price for each particular unit. It assigns the same value to a basement suite and a larger principal unit even when they differ substantially.

Replace throughout with:

> building-average assessed value per dwelling unit

Add:

> For a single-title multi-unit building, this calculation assigns the same building-average value to every dwelling unit. It does not estimate the distinct market value of any particular unit.

The City's multi-residential methodology recognizes suite count, room count, and gross building area as possible units of comparison. A suite-count average is reasonable, but size- or suite-mix-weighted allocation could change individual unit directions. No published unit-specific allocation source was identified, so I am not asking reviewers to compute that unavailable alternative. The brief must accurately name what the selected calculation establishes. [City assessment methodology materials](https://www.edmonton.ca/residential_neighbourhoods/property_tax_assessment/reference-materials)

## 4. Operationalization and its alternatives

Finding.

### The changed Claim 1 inputs exist, with one terminology correction

The public General Building Permits dataset covers records since 2009 and publishes `units_added`, defined as the change in dwelling units. Historical assessments publish account, suite, year, and total assessed value fields. Current and historical title records can be obtained through Alberta's land-title systems. These provide plausible sources for the revised unit count, title structure, and building total, subject to the brief's missing-count rule. [Building-permit dataset](https://dev.socrata.com/foundry/data.edmonton.ca/24uj-dj8v), [historical assessments](https://dev.socrata.com/foundry/data.edmonton.ca/qi6a-xuwt), [Alberta title access](https://www.alberta.ca/find-land-titles-documents-plans.aspx)

The reasonable denominator alternatives are title totals and lot totals. They could change the finding, and the brief already requires both as non-verdict qualifications. That is sufficient. No alternative to those alternatives is requested.

The equal division must, however, be labelled a building average as described in check 3.

### Claim 2 requires unpublished property-level inputs

The brief requires:

> contract rent plus any utilities not included in rent

and:

> State for every dwelling unit which basis was used and why

No published source was identified that supplies unit-level tenure, contract rent at first occupancy, and utility inclusions for every matched Edmonton property. CMHC publishes average rents by unit size and geographic sector, not identifiable contract rents. Its methodology also says utilities may or may not be included and suppresses estimates for confidentiality. [CMHC Rental Market Survey methodology](https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-research/surveys/methods/methodology-rental-market-survey)

The missing-data bounds do not cure a definition that preassigns an entire housing segment to unclassified status.

Replace with:

> Before freezing the brief, identify a published source that supplies unit-level tenure, contract rent, and utility inclusion for the declared cohort. If none exists, do not present actual property-level rental affordability as the verdict measure. Restate the single primary Claim 2 measure as a disclosed model using an identified published rent series, such as the same-year CMHC bedroom-and-zone cell, and state that it estimates typical rent rather than the replacement unit's actual contract rent. Keep actual property rents, where published, as qualifications. Reviewers still return one Claim 2 verdict.

This respects the schema's one-verdict-per-claim limit and does not ask reviewers to produce an unavailable calculation.

### The required-calculations section names the wrong purchase input

It says:

> giving the per-unit assessed value in the first case

But the purchase rule uses a separately titled dwelling's first sale price when available, otherwise its assessment.

Replace with:

> giving the first arm's-length sale price where used, otherwise the separately titled dwelling's total assessed value. Do not use a fractional assessed value as a purchase price for a dwelling unit that cannot be purchased separately.

Statistics Canada's shelter-cost definition varies components by tenure, not title. Rental shelter cost uses rent and utilities; owner shelter cost uses mortgage payments, taxes, utilities, and applicable condominium fees. The tenure-based choice can change the finding and should be the primary rule. [Statistics Canada shelter-cost definition](https://www12.statcan.gc.ca/census-recensement/2021/ref/dict/98-301-x2021001-eng.pdf)

The previously settled majority threshold, lot sensitivities, geography, cohort, indices, financing assumptions, and missing-data bounds remain sufficient and are not reopened.

### Existence audit for unchanged dependencies

As of 2026-09-01, the unchanged named instruments and sources still exist substantially as described:

- The Mature Neighbourhood Overlay is a historical boundary retired when the new bylaw took effect on 2024-01-01. [City retirement record](https://www.edmonton.ca/sites/default/files/public-files/ZBRI-MNO-Retirement.pdf)
- Current and historical assessments, the City assessment methodology guides, and building-permit data remain published.
- The Edmonton City 2021 Census profile publishes median total household income. [Statistics Canada profile](https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?DGUIDlist=2021A00054811061&Lang=E)
- The federal down-payment rules and Bank of Canada mortgage-rate series remain available. [Down-payment rules](https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html), [mortgage-rate series](https://www.bankofcanada.ca/rates/banking-and-financial-statistics/posted-interest-rates-offered-by-chartered-banks/)
- The City's separate agreement-based affordable-housing definition remains published. [Affordable Housing Guidebook](https://www.edmonton.ca/sites/default/files/public-files/Affordable-Housing-Guidebook.pdf)

## 5. Does the brief leak an expected finding?

OK.

The brief predeclares mappings, sensitivities, and bounds without predicting a result or directing reviewers toward either verdict direction.

## 6. Is the claim checkable at all?

Finding.

Claim 1 is checkable once the tenure contradiction and building-average terminology are corrected.

Claim 2 is not checkable for the declared property-level rental population from the published sources identified. Its actual-rent rule must be replaced by a named published model or supported by a published property-level source before the brief is frozen.

## 7. Scope traps

OK, once checks 2 and 4 are corrected.

The causal effect of infill remains properly excluded. Prior tenure, prior rent, unit count, and recorded displacement remain in scope as evidence. The title-dependent misclassification is an operational defect, not a reason to exclude rented or single-title housing.

A holder of the view would welcome counting every home in a fourplex, but would object that the brief calls a building average the value of each distinct unit and applies purchase costs to rented or non-saleable units. An opponent would accept the unit denominator and the continued title and lot sensitivities, but would object to a verdict resting on unavailable rents or on excluding tenure-change redevelopments. Correcting those points gives neither side a title-based advantage.

## Earlier finding dispositions

1. **Claim 1, whole single-title building counted as one dwelling: RESOLVED.** The revised primary rule counts every self-contained unit once and never puts an undivided building total into the verdict comparison. The conflicting tenure exclusion and building-average terminology are new defects in executing that revision.
2. **Claim 2, median-income household modelled as buying an entire rental building: RESOLVED.** Rented single-title units now receive a rental test in principle. The lack of a published property-level rent source and the remaining title-based treatment of other tenures are new defects.

The framing findings resolved in `2026-09-02-rerun` remain resolved and were not reopened.

## Escalation

This is check 1 of the revised brief. The escalation threshold has not been reached. If any finding remains OPEN or WEAKENED after two revisions, Stew must decide it in writing in the committed framing record, state the checker's remaining objection, and freeze the brief with that record beside it. Ildar Abdulin remains accountable and may revert that decision.