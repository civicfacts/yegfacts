<!-- Framing check 1 on the draft brief (prompts/framing-check.md, methodology v1.19). Checker: OpenAI gpt-5.6-sol via `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, package piped on stdin from a scratch directory outside the repository; the checker had no repo access. Run 2026-09-03 by Stew. The model name a checker gives itself is a self-report and is never authoritative; the pinned command above is the record. Text below is verbatim and unedited. -->

Verdict: REVISE

## 1. Provenance

**Finding.** The intake captures exact wordings, stable comment identifiers, dates, context, account counts, and the extraction process. That is adequate provenance for this source. It does not support the draft’s description of the two claims as an eight-to-seven split.

Quoted text:

> “eight said drivers already pay for the roads through the taxes and fees they pay to drive, seven said the roads come out of taxes everybody pays”

Only four accounts explicitly made the predominant-property/general-tax claim. The other three made adjacent claims about cyclists paying taxes or taxpayers funding unused services. One account overlaps those groups.

Replace with:

> “Eight accounts advanced the driver-charge premise. Four accounts explicitly said property or general taxes provide most municipal road funding. Three further accounts made adjacent taxpayer or shared-service arguments. Those adjacent claims do not carry verdicts.”

The circulating forms otherwise look representative of this captured thread. The brief correctly disclaims wider Edmonton prevalence.

## 2. Does the proposition test what the post asserts?

**Finding on Claim 1.** The intake contains two materially different claims:

1. Driver charges cover the road bill.
2. Driver charges contribute to the road bill.

Quoted text:

> “The holder who said drivers pay ‘partially’ is not failed by default: the ladder below has a band for a substantial contribution”

That does not solve the folding. A ratio below 0.25 would produce Contradicted even though it would establish the literal “partially via the fuel tax” wording. A single verdict may carry the strong reading, but it must not be presented as a verdict on the weaker wordings.

Replace with:

> “Primary, verdict-carrying proposition: Fuel taxes, vehicle-registration fees and other vehicle taxes named in the captured claims cover Edmonton’s reported road-function cost. The weaker claim that these charges contribute some amount is not assigned a separate verdict. Reviewers report the amount and share as a qualification, and the article does not tag the weaker wordings with the primary verdict.”

**Finding on Claim 2.** The draft changes “property and general taxes” into all residual municipal revenue.

Quoted text:

> “Property taxes and the City of Edmonton’s other general revenue supply most”

Franchise fees, investment income and EPCOR-derived revenue are not property or general taxes. A finding driven by those sources would not answer the captured claim.

Replace with:

> “Property and other general taxes supply more than half of the financing attributed to Edmonton’s road function.”

That proposition may carry a verdict only if a published record directly attributes those tax revenues to the road function. Schedule 9C’s unexplained residual does not do that.

## 3. Is it the strongest fair reading?

**Finding.** Claim 1’s full-coverage reading is a fair primary reading for the strong circulating forms, provided the weaker contribution forms are expressly treated as non-verdict qualifications.

Claim 2 is weakened into an accounting identity. Quoted text:

> “What is left is met from the municipality’s general revenue, of which property taxation is one component.”

Knowing that property taxation is one component does not establish that property or general taxes provide most of the residual. The proposition can be Supported even if most of that residual comes from non-tax revenue. A fair-minded holder who specifically said “predominantly funded through property tax” would reject that test.

Replace the residual calculation with either:

> “Use a published attribution of property and general taxes to the road function.”

or, if no such attribution exists:

> “The public record does not isolate property-tax financing for the road function. The brief therefore cannot assign a verdict to the property-tax proposition. It may report the Schedule 9C net expense as a separate, non-verdict accounting fact.”

## 4. Operationalization and alternatives

**Finding: reference window.** Quoted text:

> “2022 to 2024 is the most recent such window that is certainly filed and published.”

This is false on the 2026-09-03 freeze date. The provincial dataset contains a 2025 financial-year workbook, and Edmonton publishes its 2025 audited report. The dataset record was updated on 2026-07-08. [Alberta municipal dataset record](https://open.canada.ca/data/en/dataset/cde4c4fd-a0b2-4816-af43-13de7a3fd3e3), [City financial reports](https://www.edmonton.ca/city_government/budget_finances/financial-reports)

Replace with:

> “Primary window: 2023 through 2025, the three most recent published fiscal years as of 2026-09-03. Required alternative: 2022 through 2025.”

This can change both classifications.

**Finding: dataset description.** Quoted text:

> “one spreadsheet per schedule per reporting year”

The published dataset provides one workbook per financial year, not one spreadsheet resource per schedule.

Replace with:

> “one workbook per reporting year containing the published FIR schedules and municipal records.”

**Finding: road boundary.** The FIR function is not roads alone. Its definition includes roads, streets, medians, boulevards, sidewalks, lighting, signs, signals, railway-crossing signals and public parking facilities. [FIR Manual](https://municipalaffairs.gov.ab.ca/documents/2018-FIR-manual.pdf)

Quoted text:

> “Both claims are about a share of what Edmonton spends on its roads.”

Replace with:

> “The primary denominator is the reported cost of the FIR function ‘Roads, Streets, Walks, Lighting.’ It includes sidewalks, street lighting, traffic controls and public parking facilities as well as roads. The verdict therefore applies to that published function, not roads alone.”

A reasonable alternative is Edmonton’s audited “Roadway and parking” expense line. The City separately publishes that line while defining its broader Transportation Services segment as bus, LRT, roadway and parking. A Transportation Services total cannot be used as an alternative road denominator because it includes transit. [2024 City annual report](https://www.edmonton.ca/sites/default/files/public-files/2024FinancialAnnualReport.pdf)

Replace:

> “The transportation or roadway expense figure”

with:

> “The audited ‘Roadway and parking’ expense line. Do not use the broader ‘Transportation Services’ total.”

This alternative could change the classifications.

**Finding: “spending” versus accrual expense.** The primary denominator includes amortization of old assets and excludes current capital additions. It therefore measures accounting cost, not “what the City spends” or the financing of a street rebuild.

Replace with:

> “The primary calculation measures the annual accounting cost reported for the FIR function. It does not identify the cash spent building roads during the window or the financing of a particular street rebuild.”

A same-window operating-plus-capital-financing calculation is another reasonable choice and could change the finding. Before requiring it, the brief must identify a published source that supplies both actual road capital additions and their actual financing by source. If none exists, it cannot pretend that the accrual ratio answers the capital-financing question.

**Finding: Claim 1 numerator.** Quoted text:

> “A transfer to the City of Edmonton counts only where the statute, regulation or published program agreement governing it ties the amount, or the source of the amount, to fuel tax, fuel sales, or vehicle registration revenue.”

This counts an entire broad-purpose municipal transfer without requiring any of it to be attributed or applied to roads. LGFF can fund roads, transit, water, emergency facilities and other infrastructure. MSI and the former BMTG also allowed broader transportation or municipal uses. [LGFF program](https://www.alberta.ca/local-government-fiscal-framework-capital-funding), [MSI status](https://www.alberta.ca/municipal-sustainability-initiative)

Replace with:

> “Count only the portion of a driver-charge-linked transfer that a published City or provincial record attributes to Edmonton’s FIR road function or identifies as applied to named Edmonton road projects during the window. Do not count the recipient’s whole allocation merely because roads were an eligible use.”

This could change the verdict materially.

**Finding: parking and fines.** Quoted text:

> “Including these is the reading most favourable to the claim’s holders”

Parking charges and traffic fines were not among the taxes or fees supporting the registered proposition. Fines arise from violations, not merely from driving. Maximizing the numerator for one side is not a neutral primary reading.

Replace with:

> “The primary numerator contains the fuel taxes, registration fees, tire taxes and vehicle-related consumption taxes named in the captured forms, but only to the extent a published instrument sends them to Edmonton roads. Parking revenue and traffic fines are reported as a non-verdict sensitivity calculation.”

**Finding: Claim 2 formula.** Quoted text:

> `S = (total expenses − total revenues) ÷ total expenses`

This calculates the share not covered by function-attributed revenue. It does not calculate the property-tax or general-tax share. The alternative `S'` has the same problem.

Replace with:

> “Call this the net-expense share, not the general-revenue or property-tax share. It may be reported as context but does not carry the verdict on Claim 2.”

**Instrument check.** Schedule 9C and the named FIR function exist. The current LGFF, MSI wind-down, CCBF, Fuel Tax Act, Traffic Safety Act registration system, City annual reports and City budget documents also exist. The City Charters Fiscal Framework Act was repealed in 2019, before every window year; the draft properly asks reviewers to establish that history rather than assuming it remained operative. [2019 Bill 20](https://docs.assembly.ab.ca/LADDAR_files/docs/bills/bill/legislature_30/session_1/20190521_bill-020.pdf), [CCBF program](https://www.alberta.ca/canada-community-building-fund), [Alberta fuel-tax administration](https://www.alberta.ca/about-fuel-tax), [vehicle registration](https://www.alberta.ca/register-vehicle)

The two cutoff sets satisfy the stated bound for thresholds. I am not asking for another alternative cutoff.

## 5. Does the brief leak an expected finding?

**OK.** The brief explains the implications of possible results but does not tell reviewers which classification the evidence should produce. “Most favourable to the claim’s holders” should still be removed because it explains a biased numerator choice, as addressed under check 4.

## 6. Is the claim checkable at all?

**Finding.** Both circulating claims are factual rather than opinion or policy preference. Claim 1 is checkable only if published records connect driver-linked City receipts to the road function or road projects. The current whole-transfer numerator does not make that connection.

Claim 2 is not checkable at the claimed road-specific property-tax level using `S`. If no published source directly attributes property/general taxes to the road function, Claim 2 must be parked or reported as Not established under its actual proposition. It cannot be converted into a verdict on the net-expense residual.

Replace with:

> “The licensing and fairness arguments are excluded as opinions. The factual coverage claim is tested only where published records connect revenue source, City receipt and road use. The property-tax proposition carries no verdict unless a published road-level tax attribution exists.”

## 7. Scope traps

**Finding.**

- Parking and traffic-enforcement revenue are separate matters added to Claim 1’s primary numerator.
- Broad capital grants are counted even when used for transit, water or other infrastructure.
- Claim 2 says “building and maintaining,” but current capital additions and their financing are excluded from the verdict while debt is relegated to a qualification.
- The FIR boundary includes sidewalks, lighting, signals and public parking without naming them in the proposition.

Replace with:

> “The verdict covers only the published boundary named in the proposition. A transfer enters the numerator only to the extent a published record applies it to that boundary. If the proposition remains about both building and maintaining, matched-period capital financing must be part of the primary test; otherwise the proposition must say that it concerns annual accounting cost.”

The exclusion of provincial highways and the adjacent bike-lane, road-condition, parking-subsidy and bicycle-licensing questions is otherwise sound.

## 8. Stakes

**Finding.** The section does not consistently state what each verdict means separately to a holder and an opponent. It also overreaches here:

> “the people who object to paying for infrastructure they do not use would be objecting to how municipal finance works rather than to a bike lane”

That is a value-laden conclusion about an excluded fairness argument.

Replace the stakes with:

> **Claim 1.** Supported would require holders to accept the defined accounting boundary but would establish their full-coverage premise; opponents would have to abandon the claim that driver-linked charges do not cover that cost. Contradicted would require holders to abandon full coverage; opponents would gain evidence against that premise, without settling who ought to pay. Partially supported would preserve a measured contribution while rejecting full coverage. Not established would leave both sides without a defensible public-record answer.
>
> **Claim 2.** Supported would establish the defined property/general-tax majority for holders; opponents would have to abandon the claim that those taxes are not the main source under that boundary. Contradicted would require holders to abandon the majority claim; opponents would still need to identify the actual leading source. Partially supported would establish a material tax contribution but not predominance. Not established would mean the public record does not provide the needed road-level attribution.

All four verdicts remain logically reachable only after the numerator defects are fixed.

## 9. Who asks this?

**Finding.** The resident question is natural, but the propositions do not answer it.

Quoted text:

> “When the City rebuilds my street, whose money is that?”

The primary denominator excludes the rebuild’s current capital addition, includes amortization from earlier projects, and covers sidewalks, lighting, signals and public parking. Claim 2’s residual does not identify whose tax money financed anything.

Replace with:

> “A resident would ask: ‘Do fuel taxes and vehicle fees pay Edmonton’s road costs, or do property and other general taxes pay most of them?’ The available FIR record answers a narrower accounting question about the ‘Roads, Streets, Walks, Lighting’ function. It does not trace the financing of a particular street rebuild and does not, by subtraction alone, identify property taxes as the source. The propositions and published article must name that narrower level plainly.”

A holder of the driver-pays view would appreciate that the brief refuses to reduce the claim to the existence of one fuel-tax dollar, but would object to having weaker contribution statements judged against a full-coverage verdict and to counting broad grants, fines and parking receipts as if they were all road funding. An opponent would object more strongly to the whole-transfer numerator and to a property-tax finding produced from an unexplained residual. Both sides could reasonably say that the current calculations answer different accounting questions from the one they argued about.
