<!-- Framing check 3, the confirmation check under the v1.12 cap (prompts/framing-check.md, methodology v1.19). Checker: OpenAI gpt-5.6-sol via `codex --search exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, live web search enabled (the checker named itself "OpenAI GPT-5"; the run log records gpt-5.6-sol). Package: the framing prompt, intake.md, the third draft of brief.md, the verdict vocabulary from docs/DESIGN.md section 3, prompts/review-schema.json, check-1.md, response-1.md, check-2.md and resolution.md. Run 2026-09-03 by Stew. REVISE with one finding standing: the brief is PARKED, not frozen. Report is verbatim; nothing below this line was edited. -->

Model: OpenAI GPT-5  
Verdict: REVISE

## 1. Provenance

**OK.**

- **RESOLVED:** The brief accurately describes fifteen accounts making five related claims.
- **RESOLVED:** It attributes the road-condition wording to eight accounts, not all ten accounts in the broader basic-services claim.
- **RESOLVED:** It limits representativeness to the captured thread and disclaims prevalence across Edmonton.

## 2. Does the proposition test what the post asserts?

**OK.**

- **RESOLVED:** Claim 1 excludes the snow-only and grass-and-snow accounts from the road proposition.
- **RESOLVED:** Claim 2 tests funding eligibility, not whether an accounting transfer occurred.
- **RESOLVED:** Claim 2 no longer contains an unclassified renewal-gap component.
- **RESOLVED:** Claim 3 uses the whole-infrastructure renewal shortfall invoked by the captured wording. Any roads-and-alleys figure is an alternative qualification.

## 3. Is it the strongest fair reading?

**OK.**

- **RESOLVED:** The title no longer asserts deterioration, includes drainage, or promises that $100 million would have "fixed" the roads.
- **RESOLVED:** Its three clauses now correspond to the three propositions.
- **RESOLVED:** Roads and alleys are not combined into a verdict-bearing asset set.
- **RESOLVED:** The fallback that could have produced a roads-and-alleys verdict without measuring alleys is gone.
- **RESOLVED:** Funding eligibility now carries Claim 2's verdict. Direct transfers remain a calculation.

## 4. Operationalization and its alternatives

**OK.**

- **RESOLVED:** Every numerical cutoff has one reasonable alternative, with results required under both. The brief need not add another alternative.
- **RESOLVED:** Replacement value carries the road-condition verdict, with length as the required alternative where the City publishes it.
- **RESOLVED:** B2 prohibits classification when the numerator and denominator cover different periods.
- **RESOLVED:** The refusal to classify cumulative actual expenditure through 2025 is justified. It cannot be placed against a four-year requirement without recreating the span mismatch.
- **RESOLVED:** Transfer calculations use published growth and renewal splits and prohibit translating an unallocated mixed-profile transfer into a road or alley cut.
- **RESOLVED:** The obsolete drainage bylaw reference and drainage research source have been removed.
- **RESOLVED:** The whole-infrastructure denominator exists on the required 2023-2026 basis. The adopted budget calls the difference a "$1.63 billion" "Renewal Funding Gap." [City of Edmonton 2023-2026 Capital Budget](https://www.edmonton.ca/sites/default/files/public-files/2023-2026CapitalBudget.pdf)
- **RESOLVED:** CM-20-0330, its four-year $100 million approval, and its funding-source field exist in the adopted budget.
- **RESOLVED:** The City's A-to-F system, replacement-value basis, and D/F definitions exist as described. [Infrastructure State and Condition](https://www.edmonton.ca/city_government/initiatives_innovation/infrastructure-state-and-condition)
- **RESOLVED:** The 2025 condition report and its committee record exist. [Infrastructure Committee agenda](https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=6e208552-6c5f-494a-90ef-838910965e22&Item=26&Tab=attachments&lang=English)
- **RESOLVED:** The earlier conclusion that `dtuf-twc2` was empty, private, or deleted rested on its visualization surface. The editor's anonymous API check identifies a 137-row primary dataset and the listed fields. The revised brief correctly treats `4s3w-mdwf` as a derived map, requires reviewers to disclose access failures, and does not treat either asset as a condition rating. [Neighbourhood and Alley Renewal dataset](https://data.edmonton.ca/dataset/Neighbourhood-and-Alley-Renewal/dtuf-twc2), [derived map](https://data.edmonton.ca/dataset/Neighbourhood-and-Alley-Renewal-Map/4s3w-mdwf)
- **RESOLVED:** The meeting portal, capital-adjustment pages, infrastructure reports, and Neighbourhood Renewal programme page exist as described. The programme page confirms that renewal covers several asset types and that selection or construction status is not itself a condition distribution. [Neighbourhood Renewal](https://www.edmonton.ca/transportation/on_your_streets/neighbourhood-renewal), [Budget and Finances](https://www.edmonton.ca/city_government/budget-and-finances)

## 5. Does the brief leak an expected finding?

**OK.**

- **RESOLVED:** The whole-infrastructure denominator is selected because it matches the captured wording, not because it favours either side.
- **RESOLVED:** Reviewers are not told that a City target is inherently better.
- **RESOLVED:** Claim 2 no longer states that an unmet renewal requirement has already been established.
- The remaining source descriptions identify documents and calculations without directing the verdict.

## 6. Is the claim checkable at all?

**OK.**

- **RESOLVED:** The brief does not test deterioration, deliberate neglect, policy preference, or whether Council should have preferred road renewal.
- **RESOLVED:** Claim 3 says the approval "equalled" a share of the shortfall. It does not assume the money could have covered it.
- Road condition on the published inventory date, funding-source eligibility, and a same-period ratio are factual questions the named record can carry.

## 7. Scope traps

**OK.**

- **RESOLVED:** Drainage financing research has been deleted.
- **RESOLVED:** Retaining B6 as a prohibition does not preserve the former scope expansion. It commissions no finding and prevents the panel or story from drawing an unsupported drainage inference.
- **RESOLVED:** The mixed-profile transfer rule prevents sidewalks, signals, streetlights, growth allocations, or other components from becoming road or alley cuts without supporting records.
- The remaining exclusions match the intake and the propositions.

## 8. Stakes

**OK.**

- **RESOLVED:** Every verdict for every claim now states separate consequences for a holder and an opponent.
- **RESOLVED:** Contradicted on Claim 2 addresses funding eligibility rather than the absence of a bookkeeping transfer.
- **RESOLVED:** The Claim 2 stakes no longer imply that ineligible money existed "for bike lanes or for nothing."
- **RESOLVED:** Claim 3's primary denominator makes Supported and Contradicted meaningful to opposing sides.
- Each ladder can reach Supported and Contradicted on the evidence structure specified by the brief.

## 9. Who asks this?

- **RESOLVED:** The brief states the question a resident or reporter would ask.
- **RESOLVED:** It says a citywide inventory cannot determine the condition of a particular street or alley.
- **WEAKENED:** The revision now repeats the inventory-date limitation and binds the published story to it, but the verdict-bearing proposition remains:

> "Edmonton's roads are in poor condition."

The brief concedes that the latest inventory describes an earlier date and cannot establish road condition when the claims circulated in August 2026. Check 9 requires the proposition itself to name the nearest level the record can answer. Placing the limitation around the proposition reduces the risk of overstatement, but it does not change what the reviewer is formally asked to classify.

This is not a disagreement about where an optional caveat should appear. The proposition uses the present tense for a period the named evidence cannot reach. A reviewer could return "Supported" for "Edmonton's roads are in poor condition" using an earlier inventory even though the brief expressly forbids the story from asserting that the roads remained in that condition in August 2026.

**Replacement wording:**

> "The City's latest published condition ratings available by 2026-09-03 show that Edmonton's Roads asset class was in poor condition as of the inventory date those ratings describe."

If the established inventory date is fixed before freezing, use the date directly:

> "The City's latest published condition ratings available by 2026-09-03 show that Edmonton's Roads asset class was in poor condition as of December 31, 2024."

This remains in words a reader can understand. It makes the proposition more precise, not weaker, and leaves the natural present-tense question in the title and "Who asks this" section.

## Reaction from each side

A holder would recognize the condition complaint, opportunity-cost argument, and magnitude comparison in the revised brief. They could still object that a verdict on the present-tense road proposition will appear to settle conditions in 2026 even though the evidence stops earlier. An opponent would accept the corrected funding and shortfall tests but could make the same temporal objection: a dated inventory cannot affirm a present-tense proposition. The surrounding caveats are strong, yet the formal proposition still asks the panel to classify more than the record can establish. Under the final-report rule, that remaining WEAKENED finding requires REVISE and parks the brief.
