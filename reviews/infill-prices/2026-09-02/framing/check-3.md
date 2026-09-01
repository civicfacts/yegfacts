<!-- Framing check 3 (re-check of revision 2). Checker: OpenAI gpt-5.6-sol via codex exec, reasoning effort high, prompt prompts/framing-check.md. Run 2026-09-02 by Stew. Model names inside the report are self-reports and not authoritative. -->

Verdict: REVISE

## Check-2 findings

### Findings carried into check 2

- **1a, captured and site-written forms presented alike: RESOLVED.**
- **1b, unsupported prevalence claim: WEAKENED.** The brief admits that prevalence is unknown but still calls the quotation "a recurring response," which the intake does not establish.
- **2a, "typically" and mature-neighbourhood expansion: RESOLVED.**
- **2b, causal Claim 2 with a descriptive test: RESOLVED.**
- **3, unsupported per-unit verdict measure: RESOLVED.**
- **4a, unit of analysis: WEAKENED.** The brief consistently counts lot pairs, but its propositions concern replacement dwellings. The all-dwellings lot rule can reverse the dwelling-level result.
- **4b, teardown population: RESOLVED.**
- **4c, geography: RESOLVED.**
- **4d, frequency threshold: RESOLVED.**
- **4e, sampling, matching and missing-data rules: RESOLVED.**
- **4f, old-house value series: RESOLVED.**
- **4g, timing adjustments: RESOLVED.**
- **4h, new-housing price measure: RESOLVED.**
- **4i, income-based affordability: WEAKENED.** The alternatives are reported, but the brief still lacks a complete rule for selecting one Claim 2 verdict when amortization results differ or some dwellings cannot be classified.
- **4j, comparators: RESOLVED.**
- **4k, price per square foot and bedroom: RESOLVED.**
- **4l, date, window and cohort: WEAKENED.** The rules depend on a freeze date in `run.yaml`, but no `run.yaml` exists in the supplied review directory.
- **4m, transferred evidence: RESOLVED.**
- **4n, verdict rule: WEAKENED.** The compound overlap is gone. The revised rule still mishandles exactly 50 percent and does not map divergent amortization results or unclassifiable cases to one verdict.
- **5a through 5e, expected-finding leaks: RESOLVED.**
- **6a, aggregate Claim 1 checkability: WEAKENED.** The calculations are executable, but the lot-level unanimity rule does not test the dwelling-level proposition as written.
- **6b, specific example is uncheckable: RESOLVED.**
- **6c, affordability checkability: WEAKENED.** The City definition is not frozen, and unknown dwelling results have no lot-level aggregation rule.
- **6d, policy preference excluded: RESOLVED.**
- **7a, prior tenure and displacement: RESOLVED.**
- **7b, causal dependencies: RESOLVED.**
- **7c, mature-neighbourhood and regional-comparator scope: RESOLVED.**

### New findings made in check 2

- **Claim 2 folded the price relationship into affordability: RESOLVED.**
- **Denominator undefined: WEAKENED.** A denominator is now declared, but it does not match the propositions’ subject.
- **Admissible price series mixed unlike measures: RESOLVED.**
- **Tenure changes lacked a common comparison: RESOLVED.**
- **Fire and safety demolitions were excluded: RESOLVED.**
- **Assessment timing could value a demolished dwelling: RESOLVED.**
- **Affordability population undefined: WEAKENED.** The lot denominator is fixed, but unknown dwelling results cannot yet be aggregated.
- **Income denominator and financing alternatives unset: WEAKENED.** Both amortizations are reported, but neither is designated as verdict-bearing and no disagreement rule is supplied.
- **Missing utilities could still classify a dwelling: WEAKENED.** Dwelling-level treatment is fixed. Lot-level treatment is not.
- **Verdict categories overlapped: WEAKENED.** The old overlap is removed, but the revised mapping has the 50-percent and divergent-results gaps.
- **Specific example not expressly declared unverifiable: RESOLVED.**
- **Causal evidence both excluded and requested: RESOLVED.**

## 1. Provenance

Finding.

The selection rationale says:

> Prevalence: the founder supplied this as a recurring response in Edmonton infill discussions.

The intake records one possibly composite formulation from one thread. It does not say that the founder observed it recurring. The later caveat does not make the unsupported first sentence accurate.

Replace the paragraph with:

> Prevalence: the founder supplied one possibly composite formulation from one Edmonton infill thread. No sample of other posts was captured, so this brief cannot establish the claim's prevalence or whether this wording represents how it circulates.

## 2. Does the proposition test what the post asserts?

Finding.

Claim 1 says:

> the replacement dwellings usually cost more than the demolished dwelling

But "usually" is defined as:

> more than 50 percent of matched lot pairs show the higher-price direction

A lot counts in that direction only when:

> every separately saleable replacement dwelling on that lot has a higher price

That tests the share of lots on which all replacement dwellings cost more. It does not test whether replacement dwellings usually cost more. A majority of replacement dwellings can cost more while fewer than half of lots pass the unanimity rule.

Replace Claim 1's proposition with:

> Among separately saleable replacement dwellings on Edmonton lots where one existing dwelling was demolished for infill, more than 50 percent have a higher first arm's-length sale price than the demolished dwelling's last arm's-length sale price, in constant dollars. Count every separately saleable replacement dwelling once. Report lot-level shares under the "every replacement" and "at least one replacement" rules as declared sensitivities.

Make the same denominator change in Claims 2 and 3. If the lot-pair rule is retained instead, rewrite each proposition to say exactly that it tests the share of lots on which every replacement dwelling falls in the claimed direction. That would be a narrower claim than the post's reference to replacement houses.

Claim 3 also leaves the tested proposition unsettled:

> the City of Edmonton affordable-housing definition in force on the freeze date

The City's published definition is not merely a second income-based test. It concerns housing receiving government financial assistance or operating under a government agreement, with below-market and income conditions. The City's guidebook also says it does not apply to market home ownership. [City of Edmonton Affordable Housing Guidebook](https://www.edmonton.ca/sites/default/files/public-files/Affordable-Housing-Guidebook.pdf)

Before freezing the brief, quote the exact provision, instrument, date and page. State how every conjunct applies to rental and ownership housing. If the selected definition categorically excludes ordinary market housing, it is not a second reading of the captured price claim. Treat it as a separate policy-program classification or contextual comparator.

## 3. Is it the strongest fair reading?

Finding.

The whole-purchase-price basis resolves the previous per-unit defect. The new rule creates another weak reading:

> the higher-price direction only when every separately saleable replacement dwelling on that lot has a higher price

A holder of the view would not accept a rule under which one lower-priced dwelling removes every higher-priced dwelling on the same lot from the verdict. Use replacement dwellings as the verdict denominator. Report the lot-level clustering separately.

The brief also says:

> That basis is what the captured wording means by "a $1,000,000 house"

The quotation may be composite, and its original context is missing. Its intended measure cannot be asserted that firmly.

Replace with:

> Total price per separately saleable dwelling is the closest predeclared measure to the quotation's reference to the price of a replacement house. This is an operational choice, not a verified statement of the original speaker's intent.

## 4. Operationalization and its alternatives

Finding.

Most earlier alternatives are now handled. These verdict-sensitive defects remain.

### Denominator

Replacement dwellings, lots under the "every" rule, and lots under the "at least one" rule are reasonable alternatives. The brief reports all three but gives the verdict only to the "every" rule, without a neutral justification. The three results can disagree.

Use replacement dwellings as the verdict denominator because the propositions concern replacement houses. Keep both lot-level rules as sensitivities.

### Missing classifications

The brief says an unclassifiable dwelling:

> is not counted as meeting or as failing the test

But the verdict denominator is matched lot pairs. It never says how to classify a lot containing one known result and one unknown result.

Replace with:

> Calculate lower and upper bounds over the complete verdict denominator. The lower bound treats every unclassified case as not satisfying the claimed direction; the upper bound treats every unclassified case as satisfying it. Supported requires the lower bound to exceed 50 percent. Contradicted requires the upper bound to be 50 percent or less. Otherwise the verdict is Not established. Report the unclassified count and share separately.

### Claim 2's controlling assumptions

The standard 30-percent measure compares a household's shelter costs with that household's before-tax income. The brief instead tests hypothetical households at a city median and other income levels. That can be a useful model, but the proposition must say so. [CMHC's definition](https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-research/core-housing-need/identifying-core-housing-need)

The brief also requires both 25-year and 30-year amortizations without saying which controls the single Claim 2 verdict when they disagree.

Replace the proposition and assumptions with wording that identifies the hypothetical household and one primary financing case:

> Among separately saleable replacement dwellings in the matched set, more than 50 percent would require shelter costs exceeding 30 percent of before-tax income for a hypothetical household earning the declared City median income, under the 25-year amortization and other primary assumptions below.

Report 30-year amortization, other household incomes and other household types as named sensitivities. If both amortizations are intended to carry equal verdict weight, create separate propositions or predeclare how disagreement maps to the four verdicts.

### Definition and as-of date

The brief delegates the City definition to reviewers and repeatedly refers to:

> the freeze date recorded in run.yaml

No `run.yaml` exists in the supplied review directory. The City definition, mature-neighbourhood boundary, ten-year window, latest income source and applicable financing rules therefore lack a fixed as-of date.

Insert the exact date directly into the brief or add the referenced `run.yaml` before the next re-check. Quote and operationalize the City definition before round 1 rather than letting reviewers choose an instrument.

### Verdict mapping

The brief says:

> Contradicted: the opposite majority is affirmatively established

For a proposition asserting "more than 50 percent," an exact 50-percent result is affirmatively against the proposition but is not an opposite majority.

Replace with:

> Contradicted: the usable evidence affirmatively establishes that 50 percent or fewer of the verdict denominator satisfy the proposition.

Non-verdict-material vocabulary correction: the brief says each claim carries "confidence." DESIGN section 3 reserves confidence for individual reviewers and publishes panel agreement as the canonical claim-level dimension. Replace that sentence with:

> Each claim carries its own finding, panel agreement and evidence-basis label. Reviewer confidence appears only beside the reviewer who assigned it.

## 5. Does the brief leak an expected finding?

OK. The directional passages identified previously remain removed. The City-definition problem is an undefined and potentially mismatched proposition, not an explicit instruction telling reviewers which finding to reach.

## 6. Is the claim checkable at all?

Finding.

The specific $350,000-to-$1,000,000 example is now correctly declared unverifiable and receives no verdict.

Claim 1 is checkable after its proposition and denominator use the same unit. Claim 2 is checkable after one primary financing case controls the verdict and unknown results receive a bound-based rule. Claim 3 is not reproducibly checkable until the exact City provision, as-of date and application rules are frozen.

The causal proposition is correctly isolated and excluded.

## 7. Scope traps

Finding.

Prior tenure, prior rent, prior unit count and recorded displacement are properly in scope. The causal question is now cleanly out of scope.

If Claim 3 uses the City's subsidy-based affordable-housing definition, it belongs in a separate claim or story about qualification as City-defined affordable housing. It should not be presented as another income-based test of the captured objection to market replacement prices.

A holder of the view would welcome the use of whole purchase prices, the specific-example disclaimer and the reporting of prior tenure and displacement. They would still reject a rule under which one cheaper dwelling makes the other replacement dwellings on that lot disappear from the verdict, and they would distinguish market affordability from qualification for subsidized City housing. An opponent would welcome the complete permit frame, separated claims and causal boundary, but would object that one untraceable formulation has become three majority propositions and that unknown cases, an unfrozen City definition, missing as-of date and unresolved financing disagreement can still determine the verdict. Both objections are fair.

The findings still material to `REVISE` are: unsupported recurrence language; the mismatch between dwelling propositions and the lot-pair unanimity denominator; no aggregation rule for unknown dwelling results; no controlling Claim 2 amortization; the unfrozen City definition and as-of date; the 50-percent verdict gap; and Claim 3's possible substitution of a subsidy-program classification for the captured market-price objection. The claim-level confidence wording is not verdict-material.

The filesystem was read-only, so I could not create `framing/check-3.md`.