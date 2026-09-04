<!-- Framing check 2 on the revised brief (prompts/framing-check.md, methodology v1.19). Checker: OpenAI gpt-5.6-sol via `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, package piped on stdin from a scratch directory outside the repository; the checker had no repo access. The package added check-1.md and response-1.md to the check-1 package. Run 2026-09-03 by Stew. The pinned command above is the record of which model ran. Text below is verbatim and unedited. -->

Verdict: REVISE

## 1. Provenance

**RESOLVED. OK.**

The revision correctly replaces the false eight-to-seven characterization with eight accounts advancing the driver-charge premise, four making the property/general-tax claim, and three further accounts making adjacent arguments. It identifies the source as a whole-thread capture, distinguishes account counts from wording counts, and disclaims wider prevalence.

The forms look representative of the captured thread. The remaining misstatement about all eight accounts asserting full coverage belongs under check 2.

## 2. Does the proposition test what the post asserts?

### Claim 1: WEAKENED

The revision separates full coverage from contribution, but it still assigns all eight accounts to the strong form:

> “Eight accounts assert the first and rest a fairness argument on it”

That is not what the intake shows. At least three wordings are contribution-only or silent about coverage:

- “partially via the fuel tax”
- taxes that “help pay for the road”
- vehicles “pay many different kinds of taxes”

The first revision named only two of these as weaker. The sentence also conflicts with the brief’s own earlier statement that eight accounts merely “advanced the driver-charge premise.”

Replace with:

> “The intake contains strong coverage readings and weaker contribution readings. The coverage proposition carries the verdict only for wordings that fairly assert coverage. Contribution-only wordings, including ‘partially via the fuel tax,’ ‘help pay for the road,’ and ‘pay many different kinds of taxes,’ carry no verdict. Do not state that all eight accounts asserted full coverage. The article identifies exactly which captured wordings the verdict covers.”

### Claim 2: OPEN

The revised proposition is no longer about property tax:

> “Most of what Edmonton’s ‘Roads, Streets, Walks, Lighting’ function costs the City is met from the City’s own general revenue [...] rather than [...] government transfers.”

Its formula does not calculate that new proposition either:

> `G = (total expenses − function revenue − road-attributed transfers) ÷ total expenses`

The brief correctly says Schedule 9C’s unallocated pool contains property taxation, franchise revenue, investment revenue, and all federal and provincial transfers. Subtracting transfers that another source attributes to roads does not establish that the remainder was met by the City’s own revenue. Unallocated transfers remain indistinguishable from municipal own-source revenue. G is an analytically adjusted residual, not an attributed own-general-revenue share.

The revision therefore changes the captured property/general-tax claim into a different claim and then uses a calculation that cannot establish the replacement.

Replace with:

> “Claim 2 carries no verdict. No published source quantifies what share of the road function is financed specifically by property and other general taxes, and the available unallocated-revenue pool cannot distinguish those taxes from unallocated government transfers. Reviewers report, without a verdict, the share of expenses not offset by function-attributed revenue and separately identified road transfers. The article states that this residual is not a property-tax or municipal-own-revenue share and does not tag the captured property-tax wordings with it.”

The lack of a verdict on one side is not a reason to test a different proposition.

## 3. Is it the strongest fair reading?

### Claim 1: WEAKENED

Full coverage remains a fair primary reading for the forms that imply full coverage. It is not a fair reading of every captured wording. The replacement under check 2 fixes this without weakening the coverage proposition.

### Claim 2: OPEN

The brief says:

> “That is the substance the two sides were arguing about — a general tax base against road-specific money”

The intake does not support that restatement. Holders said “property tax,” “general taxes,” or “taxes.” They did not assert that an adjusted residual after selected attributed transfers exceeds half of accounting expense.

Nor is the replacement a harmless move to the nearest published level. The record’s nearest measurable quantity is “expense not offset by attributed revenue,” not “expense met from the City’s own general revenue.” Those are different quantities because the unallocated pool contains intergovernmental transfers.

Use the replacement under check 2. The adjusted residual may be useful context, but it is not the strongest fair reading of the registered claim.

## 4. Operationalization and its alternatives

Several earlier defects were fixed, but four material defects remain.

### Earlier findings

- **Reference window: RESOLVED.** The 2023–2025 primary window and 2022–2025 alternative are correct. The provincial dataset lists a 2025 workbook and was updated on 2026-07-08. [Alberta municipal financial dataset](https://open.canada.ca/data/en/dataset/cde4c4fd-a0b2-4816-af43-13de7a3fd3e3)
- **Dataset description: RESOLVED.** It now says one workbook per reporting year.
- **FIR boundary: RESOLVED.** The propositions and instructions name the full “Roads, Streets, Walks, Lighting” function.
- **Audited alternative: RESOLVED.** “Roadway and parking” exists separately from bus and LRT in Edmonton’s statements. [Edmonton 2025 annual report](https://www.edmonton.ca/sites/default/files/public-files/documents/financial-annual-report-2025-compressed_0.pdf)
- **Accrual expense description: RESOLVED.** The brief no longer calls the primary denominator cash spending.
- **Whole-transfer inclusion: RESOLVED.** Broad grants must now pass an attribution test. LGFF, MSI and CCBF exist with the broad or transitional characteristics stated. [LGFF](https://www.alberta.ca/local-government-fiscal-framework-capital-funding), [MSI](https://www.alberta.ca/municipal-sustainability-initiative), [CCBF](https://www.alberta.ca/canada-community-building-fund)
- **Claim 2’s old S formula: WEAKENED.** It was demoted and named correctly, but G repeats the central attribution error.
- **Capital treatment: WEAKENED.** Fields were identified, but no complete capital classification was defined.
- **Parking and fines: WEAKENED.** Fines were removed, but the replacement primary user-charge component remains overinclusive.

### Claim 1’s sales and user-charge component

The brief includes:

> “Sales and user charges attributed to the ‘Roads, Streets, Walks, Lighting’ function on Schedule 9E column 1”

Attribution to the function satisfies the road-use side of the definition. It does not establish that every dollar is a charge “people pay because they drive.” The aggregated field may include parking and other charges not named in the captured proposition. Requiring a non-verdict calculation without the field does not cure an overinclusive primary verdict numerator.

Replace with:

> “Schedule 9E column 1 does not enter the primary numerator as an undifferentiated total. Include only a component that a published source identifies both as a charge paid because of driving and as revenue attributed to the function. If the total cannot be disaggregated, exclude it from the primary numerator and report the whole line as an upper-bound sensitivity.”

### The captured tire charge has no route through the definition

Door (a) accepts only instruments tied to fuel tax, fuel sales, or vehicle registration. Qualification 9 discusses consumption taxes on vehicles, parts and repairs. Neither covers the captured “tire taxes.”

Alberta has a regulated tire recycling program and an environmental fee, so a published instrument exists to test. [Alberta Recycling Management Authority’s tire fee document](https://files.albertarecycling.ca/Tires_Products-Definitions-and-Fees.pdf)

Add:

> “The Alberta tire recycling environmental fee is tested separately. Reviewers identify its legal basis, collector, statutory or program purpose, and whether any published record sends any part to Edmonton’s road function. It enters no ratio without both a vehicle-charge connection and a published road attribution.”

### The capital alternative cannot produce the required classifications

The brief requires:

> “the capital denominator of 9F columns 1 and 2”

and requires both claims’ classifications on that basis. It never defines either capital numerator.

Schedule 9F column 2 contains donated or contributed assets. Those additions did not cost the City cash during the year, so including them in “what Edmonton’s roads cost the City” changes the denominator. Debt principal additions are financing, not revenue. Debt reductions are repayments, not negative capital cost. The listed fields do not exhaustively identify actual capital financing from municipal own-source revenue.

Replace with:

> “For Claim 1’s capital sensitivity, use purchased tangible-capital-asset additions from Schedule 9F column 1 as the City-cost denominator. Report donated or contributed additions from column 2 separately. The numerator contains only driver-linked amounts that a published source identifies as financing those purchased additions. Do not require a Claim 2 capital classification unless a published source supplies a complete actual financing breakdown. Report transfers, debt movements and contributed assets separately where no such source exists.”

That respects the rule against requiring a computation the published record cannot supply.

### Date and dollar basis

The brief states one as-of date and one aggregation basis without evaluating reasonable alternatives.

For the as-of date, 2026-09-02, the capture date, is a reasonable alternative to the 2026-09-03 registration date. It appears unlikely to affect the named annual records, but the brief must say so.

Replace with:

> “The capture date, 2026-09-02, is the reasonable alternative freeze date. The registration date, 2026-09-03, is primary because that is when the question was fixed. Reviewers identify any verdict evidence first published during the intervening day.”

Nominal aggregation gives later, higher-price years more weight. A constant-dollar calculation could change a classification near a cutoff. The brief currently makes that restatement optional.

Replace with:

> “Reviewers also restate the window totals in constant 2025 dollars using Statistics Canada Table 18-10-0005-01, Edmonton all-items annual-average CPI, and report whether the classification changes.” [Statistics Canada CPI table](https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810000501)

### Thresholds

**OK.** Both cutoff sets are predeclared and results are required under both. That satisfies the bounded threshold rule. No further cutoff alternative is required.

### Instrument audit

The principal instruments and records exist as described:

- FIR dataset, schedules and function;
- Edmonton’s 2023–2025 audited reports and “Roadway and parking” line;
- LGFF and its broad capital eligibility;
- MSI’s replacement and continuing capital wind-down;
- CCBF’s capital-only program;
- Fuel Tax Act administration; [Alberta fuel tax](https://www.alberta.ca/about-fuel-tax)
- Traffic Safety Act registration authority; [Traffic Safety Act](https://www.canlii.org/en/ab/laws/stat/rsa-2000-c-t-6/)
- the repeal of the City Charters Fiscal Framework Act in 2019. [2019 Bill 20](https://docs.assembly.ab.ca/LADDAR_files/docs/bills/bill/legislature_30/session_1/20190521_bill-020.pdf)

One instrument description is not yet adequate:

> “Alberta’s vehicle registration fees under the Traffic Safety Act and its fee regulation”

The brief does not name the supposed fee regulation. The public fee source I found is the Registry Agent Product Catalogue, while the Traffic Safety Act authorizes the establishment of fees. Replace with:

> “Alberta vehicle-registration fees under sections 52 and 64 of the Traffic Safety Act and the Registry Agent Product Catalogue. If a regulation prescribes the government fee, identify that regulation by title and citation.”

The three attachment-only eScribe URLs for the fines sensitivity could not be independently opened during this check. Since they are non-verdict sensitivities, that does not itself decide the framing verdict. The brief should still name each report, meeting date, agenda item and agenda-page URL alongside the attachment URL.

## 5. Does the brief leak an expected finding?

The earlier biased phrase was removed: **RESOLVED.**

A new leak appears here:

> “It is listed because a holder of the claim may cite it, not because it is expected to carry an amount in this window.”

That tells reviewers the expected result for the City Charters instrument.

Replace with:

> “Reviewers establish whether the Act was in force during any window year and whether any amount governed by it was received or attributed during the window.”

## 6. Is the claim checkable at all?

### Claim 1: RESOLVED in part

The strong, accounting-attribution version is factual and checkable if the numerator is restricted as described above. Licensing and fairness remain correctly excluded.

### Claim 2: OPEN

Neither the original property/general-tax majority nor the revised municipal-own-general-revenue majority is computable from the named records. The residual can be computed, but it does not establish either proposition.

Use the non-verdict replacement under check 2. Defining an unallocated residual as municipal own revenue would predetermine the answer by definition rather than evidence.

## 7. Scope traps

- **Broad grants: RESOLVED.** Eligibility alone no longer places a whole allocation in the numerator.
- **FIR function boundary: RESOLVED.** Sidewalks, lighting, signals and public parking are disclosed.
- **Provincial highways and adjacent questions: RESOLVED.**
- **Parking and other user charges: WEAKENED.** Schedule 9E column 1 remains in the primary numerator without proof that all its contents are driver charges.
- **Building and capital financing: WEAKENED.** The capital fields are listed, but the required classifications have no defined numerators and count donated assets as City cost.
- **Tire charges: OPEN.** A captured component falls outside both numerator doors.
- **Claim 2: OPEN.** An adjusted residual has been brought into scope as a verdict claim even though no captured wording asserts it.

Apply the replacements under checks 2 and 4.

## 8. Stakes

The earlier value-laden sentence was removed, and Claim 1’s stakes now distinguish holders and opponents: **RESOLVED.**

Claim 2’s stakes depend on a proposition that neither the intake nor the calculation supports:

> “opponents would have to abandon the claim that road-specific charges and transfers are the main source”

The driver-side commenters did not assert that government transfers were the main source. That is a new position constructed by the brief.

The statement below is also unsupported:

> “All four verdicts are reachable on each claim”

No valid verdict figure has been defined for Claim 2.

Replace Claim 2’s stakes with:

> “Claim 2 carries no verdict because the public record does not quantify the property/general-tax share or distinguish municipal own-source general revenue from unallocated transfers at the road-function level. Holders would learn that the public record does not establish their claimed majority. Opponents would gain no evidence that driver charges cover the roads. The adjusted net-cost figure may describe the accounting gap, but it changes neither side’s factual claim.”

## 9. Who asks this?

The natural-language resident question and the disclosure of the record’s limits are **RESOLVED**. The proposition still fails the check.

The resident asks:

> “Do fuel taxes and vehicle fees pay Edmonton’s road costs, or do property and other general taxes pay most of them?”

Claim 2 instead asks whether an adjusted residual exceeds half, then calls that residual the City’s own general revenue. That does not answer the second half of the resident’s question.

Replace the Claim 2 portion with:

> “The available record cannot answer whether property and other general taxes pay most of the function’s cost. The article reports that limitation as the answer to that part of the resident’s question. It may separately report how much expense remains after function-attributed revenue and identified road transfers, but it gives that calculation no claim verdict.”

A holder of the driver-pays view would accept a strong coverage test for the wordings that actually imply coverage, but would object to having contribution-only wording treated as full coverage and to counting an undifferentiated user-charge line. A holder of the property/general-tax view would reject Claim 2 because it no longer tests property or general taxes and because its residual still contains revenue the proposition says it excludes. An opponent would accept the tighter grant attribution but could not fairly treat G as proof about municipal own revenue. Both sides would see that the brief now discloses the record’s limits much better, but Claim 2 still converts an unanswerable circulating claim into a different, incompletely measured one.
