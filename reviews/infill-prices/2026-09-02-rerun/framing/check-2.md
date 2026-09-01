<!-- Framing check 2 on the rerun brief. Checker: OpenAI gpt-5.6-sol via codex exec, reasoning effort high, prompt prompts/framing-check.md. Run 2026-09-01 by Stew. -->

Verdict: REVISE

## Check-1 finding dispositions

1. **Assessment value dates and indices: RESOLVED.** The brief now fixes July 1 of the preceding year as the assessment value date, uses monthly Edmonton CPI as the primary adjustment, requires the annual-average CPI alternative, and applies the same dates to the NHPI sensitivity.
2. **Thirty-percent boundary: RESOLVED.** The proposition and test now classify less than 30 percent as meeting the threshold and 30 percent or more as failing it, matching the [current Statistics Canada standard](https://www23.statcan.gc.ca/imdb/p3VD.pl?Function=getVD&TVD=1584157&adm=0&dis=0).
3. **Minimum down payment: RESOLVED.** The brief includes all three federal price bands, the 20-percent requirement at $1.5 million or more, and an eligibility check before financing mortgage-default insurance. This matches the [federal down-payment rules](https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html).

## 1. Provenance

OK.

The brief preserves the only captured wording, identifies it as founder-supplied and possibly composite, states that its platform, author, URL, and context were not captured, and labels every other formulation as site-written. It makes no unsupported claim about representativeness or prevalence.

## 2. Does the proposition test what the post asserts?

OK.

The two propositions continue to isolate the replacement-value relationship and the income-based affordability assertion. The unidentified numerical example remains context only. The brief does not turn a finding on one proposition into a finding on the other.

## 3. Is it the strongest fair reading?

OK.

The dwelling remains the verdict unit. Claim 1 reports both direction and magnitude and retains every separately saleable replacement dwelling. Claim 2 includes mortgage payments, taxes, utilities, and condominium fees where applicable. The brief has not weakened the claim into a per-square-foot, aggregate-lot, or incomplete shelter-cost comparison.

## 4. Operationalization and its alternatives

Finding.

### The existence audit cannot certify a future freeze date

The brief says:

> **As-of date (freeze date):** 2026-09-02.
>
> Every rule in this brief that turns on an instrument, a boundary, a window, an income source or a financing rule being in force or available takes it as it stood on 2026-09-02.

The current date in the supplied America/Edmonton environment is 2026-09-01. An existence audit run today can establish the state through September 1, but it cannot certify that every dataset, definition, and financing rule will still exist as described on September 2. The one-day difference does not change the cohort years, but it controls the brief's declared legal and data state.

Replace with:

> **As-of date (freeze date):** 2026-09-01.
>
> Every rule in this brief that turns on an instrument, a boundary, a window, an income source or a financing rule being in force or available takes it as it stood on 2026-09-01.

If September 2 must remain the freeze date, perform and record the existence audit on or after that date before issuing FRAME OK.

### Other operational choices

The earlier denominator, comparator, cohort, financing, missing-data, and geography choices remain sufficient and are not reopened:

- Dwelling-level and both lot-level rules can produce different shares; the brief requires all three.
- Assessed value, per-unit value, and sale-to-sale comparisons can point in different directions; the brief separates them and reserves the verdict for the declared assessed-value series.
- The historical Mature Neighbourhood Overlay and City Plan redeveloping-area boundaries can change the denominator; the brief reports them separately.
- Monthly CPI and annual-average CPI can change borderline directions; both are required. NHPI is an additional sensitivity. No alternative to these alternatives is requested.
- Ten-year and five-year cohorts, plus permit-year and completion-year cohorts where possible, may differ; the brief requires separate results.
- City and CMA income measures, 20-percent and regulatory-minimum down payments, and 25-year and 30-year amortizations can change affordability classifications; the brief identifies the primary case and requires the alternatives.
- Missing utilities can change classification; the brief leaves those dwellings unclassified, reports the no-utilities calculation only as a lower-bound sensitivity, and applies declared bounds.

### Existence audit

As of 2026-09-01, the named dependencies exist substantially as described:

- Zoning Bylaw 12800 and its Mature Neighbourhood Overlay remained effective through 2023-12-31. Zoning Bylaw 20001 repealed it effective 2024-01-01, and the City distinguishes the former overlay from the City Plan redeveloping area. [City retirement rationale](https://www.edmonton.ca/sites/default/files/public-files/ZBRI-MNO-Retirement.pdf), [Bylaw 20001 section 7.10](https://zoningbylaw.edmonton.ca/part-7-administrative-and-interpretive-clauses/general/710-repeal-enactment-and-transition-procedures).
- Edmonton assessments estimate open-market value on July 1 of the preceding year. [City assessment explanation](https://www.edmonton.ca/residential_neighbourhoods/property-assessment).
- The [historical assessment dataset](https://dev.socrata.com/foundry/data.edmonton.ca/qi6a-xuwt), [current-year assessment dataset](https://dev.socrata.com/foundry/data.edmonton.ca/q7d6-ambg/no-redirect), and [General Building Permits dataset](https://dev.socrata.com/foundry/data.edmonton.ca/24uj-dj8v) exist.
- The required [monthly CPI](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810000401) and [monthly NHPI](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810020501) series exist for Edmonton.
- The 2021 Census publishes Edmonton City median household income. The Bank of Canada publishes the [five-year conventional mortgage series](https://www.bankofcanada.ca/rates/banking-and-financial-statistics/posted-interest-rates-offered-by-chartered-banks/).
- CMHC publishes Edmonton construction, absorption, price, and bedroom-level rental data. Its rental methodology says utilities may or may not be included, which the brief handles through its utilities rule. [CMHC housing data](https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-data/data-tables/housing-market-data), [rental methodology](https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-research/surveys/methods/methodology-rental-market-survey).
- The REALTORS® Association of Edmonton publishes [monthly dwelling-type reports](https://realtorsofedmonton.com/stat-type/monthly-market-statistics/).
- The City's separate agreement-based affordable-housing definition exists as described in its [Affordable Housing Guidebook](https://www.edmonton.ca/sites/default/files/public-files/assets/PDF/Affordable-Housing-Guidebook.pdf).

## 5. Does the brief leak an expected finding?

OK.

The brief specifies result mappings and sensitivity handling without predicting which direction the evidence will take or describing evidence as supporting or contradicting either proposition.

## 6. Is the claim checkable at all?

OK, once the as-of date can be audited.

The permit and assessment records support the declared matching exercise. Missing sales, rents, utilities, completion dates, or assessments may limit classification, but the brief requires explicit loss counts and conservative bounds. The unidentified individual example correctly receives no verdict.

## 7. Scope traps

OK.

The brief retains prior tenure, rent, unit count, and recorded displacement as evidence. It excludes the uncaptured causal proposition about infill's city-wide effects and states the counterfactual and time-period information a separate causal review would require.

A holder of the view would recognize the whole-dwelling value comparison, the shelter-cost test, and the accounting for what each teardown replaced. An opponent would see city-wide sampling, separate geography and comparator results, and conservative treatment of missing cases. Neither side should accept a freeze date whose instrument and dataset state has not yet occurred.

## Escalation

The escalation rule does not trigger. All check-1 findings are RESOLVED. The future-date objection first appears in check 2 and has not survived any revision. If it remains OPEN or WEAKENED after two revisions, Stew must decide it in writing in the committed framing record, state the remaining objection, and freeze the brief with that record beside it. Ildar Abdulin remains accountable for the result and may revert that decision.