<!-- Framing check 1 on the rerun brief. Checker: OpenAI gpt-5.6-sol via codex exec, reasoning effort high, prompt prompts/framing-check.md (v1.8 plus the existence-audit instruction). Run 2026-09-01 by Stew. -->

Verdict: REVISE

## 1. Provenance

OK.

The brief accurately identifies the only captured form as founder-supplied, possibly composite, and missing its platform, author, URL, and original context. It labels every other formulation as site-written and makes no claim about prevalence or representativeness.

## 2. Does the proposition test what the post asserts?

OK.

Claim 1 tests the replacement-house value relationship without claiming to verify the unidentified $350,000-to-$1,000,000 example. Using paired assessments narrows "price" to a disclosed estimate of market value, but the City defines assessments as estimates of open-market value, and the brief calls this an operational choice rather than the speaker's verified intent. Claim 2 separately tests affordability for a declared hypothetical household. Neither finding may substitute for the other.

## 3. Is it the strongest fair reading?

OK.

The dwelling remains the verdict unit. Claim 1 counts every separately saleable replacement dwelling and reports magnitude as well as direction. Claim 2 includes mortgage principal and interest, property taxes, utilities, and condominium fees where applicable. The brief does not weaken the post into a per-square-foot or aggregate-lot comparison.

## 4. Operationalization and its alternatives

Finding.

### Assessment dates and inflation indices are not fully fixed

The revised verdict uses annual assessments, but the timing rule does not identify which date on an assessment controls the CPI and New Housing Price Index calculation:

> **Timing, predeclared.** Report every comparison in nominal dollars and in constant dollars. For the constant-dollar comparison, deflate both sides to the most recent complete calendar year in the window using the Statistics Canada Consumer Price Index, all-items, Edmonton census metropolitan area, and state the base year.

An Edmonton assessment roll estimates market value on July 1 of the preceding year, with physical condition updated to December 31. Using the roll year, the valuation year’s annual average, or the July valuation month can produce different adjustments near the direction cutoff. The brief’s move from dated sales to assessments introduced this ambiguity. The City confirms the July 1 valuation date in its [annual assessment explanation](https://www.edmonton.ca/residential_neighbourhoods/property-assessment).

Replace with:

> For an annual assessment roll, treat July 1 of the preceding calendar year as the value date. The primary constant-dollar calculation uses the Edmonton all-items monthly CPI for that July and July 2025 as the base period. Report the result using the annual-average CPI for the valuation year and 2025 as the declared alternative, with its own numerator and denominator. Apply the same July value dates to the New Housing Price Index sensitivity. State whether either alternative changes any dwelling’s direction or the verdict share.

This supplies one reasonable alternative. Under the check-4 bound, no further alternative is required. The Edmonton series exist in Statistics Canada’s [CPI table 18-10-0004-01](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810000401) and [NHPI table 18-10-0205-01](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810020501).

### The 30-percent boundary contradicts the named standard

The brief says:

> A dwelling meets the threshold if monthly shelter cost is 30 percent or less of the modelled household's monthly before-tax income. A dwelling that exceeds 30 percent does not meet the threshold.

Statistics Canada’s standard in force on 2026-09-02 classifies **less than 30 percent** as meeting the threshold and **30 percent or more** as not meeting it. This is not a request for another threshold. The identified standard is described incorrectly. See Statistics Canada’s [current classification](https://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=1584157&adm=0&dis=0).

Replace the proposition and test with:

> **Normalized proposition:** Among separately saleable replacement dwellings in the matched set, more than 50 percent would require shelter costs equal to or greater than 30 percent of before-tax income for the declared hypothetical household under the primary assumptions below.
>
> **The test.** A dwelling meets the affordability threshold when monthly shelter cost is less than 30 percent of monthly before-tax income. A dwelling at 30 percent or more does not meet it.

### The regulatory minimum down payment is incomplete

The brief says:

> Declared sensitivity: the regulatory minimum of 5 percent on the first $500,000 of purchase price and 10 percent on the portion above $500,000, with mortgage default insurance included in the financed amount.

That rule applies below $1.5 million. At $1.5 million or more, the stated regulatory minimum is 20 percent. Because the study does not cap replacement prices below $1.5 million, the current wording misclassifies part of the possible population. The applicable federal bands appear in the [Financial Consumer Agency of Canada’s down-payment rules](https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html).

Replace with:

> Declared sensitivity: apply the regulatory minimum in force on 2026-09-02. For a price of $500,000 or less, use 5 percent. For a price above $500,000 but below $1.5 million, use 5 percent on the first $500,000 and 10 percent on the remainder. For a price of $1.5 million or more, use 20 percent. Include mortgage-default insurance in the financed amount only where the mortgage is eligible for it, and state the applicable eligibility rule.

### Existence audit

The other instruments and datasets exist substantially as described:

- Zoning Bylaw 12800 contained Section 814 and its Mature Neighbourhood Overlay appendix. The City’s [retirement rationale](https://www.edmonton.ca/sites/default/files/public-files/ZBRI-MNO-Retirement.pdf) confirms that it remained effective through 2023-12-31. [Zoning Bylaw 20001 section 7.10](https://zoningbylaw.edmonton.ca/part-7-administrative-and-interpretive-clauses/general/710-repeal-enactment-transition-procedures) repealed Bylaw 12800 effective 2024-01-01. The City Plan’s separate redeveloping-area boundary appears in the [official City Plan maps](https://www.edmonton.ca/sites/default/files/public-files/City_Plan_Maps.pdf).
- The City’s [historical assessment dataset](https://dev.socrata.com/foundry/data.edmonton.ca/qi6a-xuwt) covers 2012 through 2025 and includes assessment year, account number, address, and total assessed value. The current-year assessment dataset supplies 2026 values.
- The [General Building Permits dataset](https://dev.socrata.com/foundry/data.edmonton.ca/24uj-dj8v) begins in 2009 and includes issue date, work type, address, legal description, units added, and occupancy date. Its occupancy dates are blank for historical residential permits before 2022. The brief’s missing-data rules cover that limitation.
- The City median household-income measure exists in the [2021 Census Profile for Edmonton City](https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?DGUIDlist=2021A00054811061&Lang=E).
- The [Bank of Canada five-year conventional mortgage series](https://www.bankofcanada.ca/rates/banking-and-financial-statistics/posted-interest-rates-offered-by-chartered-banks/), City historical residential tax rates, CMHC construction, absorption, and rental data, and REALTORS Association of Edmonton dwelling-type reports exist.
- CMHC’s rental convention exists, but it expressly says utilities may or may not be included in reported rent. Reviewers must report inclusion as unknown where the source does not identify it. See the [Rental Market Survey methodology](https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-research/surveys/methods/methodology-rental-market-survey).

The already resolved denominator, geography, cohort, financing, missing-data, and comparator alternatives remain sufficient. No alternative to an alternative is requested.

## 5. Does the brief leak an expected finding?

OK.

The brief explains why assessments replace dated sales and how missing evidence maps to bounds. It does not tell reviewers which factual result to reach or describe evidence as supporting or contradicting either claim.

## 6. Is the claim checkable at all?

OK, once the three check-4 defects are corrected.

The historical assessment and permit series cover the declared cohort. Missing completion dates, property-level sales, rents, utilities, and tax levies can reduce classification coverage, but the brief requires explicit missing-data counts and conservative bounds. The unidentified individual example remains correctly excluded from verdicts.

## 7. Scope traps

OK.

The brief keeps the causal effect of infill out of scope because the intake supplies no counterfactual or period. It retains prior tenure, rent, unit count, and recorded displacement as evidence. The City’s agreement-based affordable-housing classification remains separate from this market-price claim.

A holder of the view would recognize the whole-dwelling comparison, the income-based affordability test, and the accounting for what each teardown replaced. They would object if exactly 30 percent were called affordable or if a million-dollar-plus purchase received an inapplicable down-payment calculation. An opponent would see city-wide sampling, the historical boundary clearly labelled, conservative missing-data bounds, and declared sensitivities. Correcting the three rules removes definitional advantages that could affect borderline cases.

## Earlier panel findings

1. **Retired mature-neighbourhood instrument: RESOLVED.** The brief no longer claims that a mature-neighbourhood instrument exists on the freeze date. It freezes the official 2023-12-31 historical boundary and reports the City Plan redeveloping area separately.
2. **Sale-to-sale holding-period appreciation: RESOLVED.** The verdict now uses the last standing-house assessment and first full replacement assessment. The sale comparison is a non-verdict sensitivity, reports every sale-date gap, excludes gaps over ten years from its headline figure, and reports those exclusions separately. The new index-date finding above concerns how to execute the revised assessment calculation, not a reopening of the sale-series objection.

## Escalation

This is check 1 of the revised brief. The escalation threshold has not been reached. If any finding remains OPEN or WEAKENED after two revisions, Stew must decide it in writing in the committed framing record, state the checker’s remaining objection, and freeze the brief with that record beside it. Ildar Abdulin remains accountable and may revert that decision.