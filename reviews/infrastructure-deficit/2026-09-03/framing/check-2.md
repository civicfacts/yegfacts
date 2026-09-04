<!-- Framing check 2 on the revised brief (prompts/framing-check.md, methodology v1.19). Checker: OpenAI gpt-5.6-sol via `codex --search exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`, live web search enabled (the checker named itself "OpenAI GPT-5"; the run log records gpt-5.6-sol). Package: the framing prompt, intake.md, the revised brief.md, the verdict vocabulary from docs/DESIGN.md section 3, prompts/review-schema.json, check-1.md and response-1.md. Run 2026-09-03 by Stew. Report is verbatim; nothing below this line was edited. -->

Model: OpenAI GPT-5  
Verdict: REVISE

## 1. Provenance

**OK.**

- **RESOLVED:** The brief now describes fifteen accounts making five related claims, gives the correct eight-account and two-account breakdown, and limits prevalence to the captured thread.
- **RESOLVED:** It no longer presents the thread as representative of Edmonton generally.

## 2. Does the proposition test what the post asserts?

- **RESOLVED:** Claim 1 no longer counts the snow-only and grass-and-snow accounts as road-condition claimants.
- **RESOLVED:** Claim 2 now tests funding eligibility rather than a physical transfer.
- **RESOLVED:** Claim 3 uses the captured whole-infrastructure deficit as its primary denominator.

**New finding: Claim 2 contains a second factual component that its ladder does not classify.**

> “At least half of the $100 million council approved for the bike-lane programme was money it could have spent on renewing roads and alleys instead, at a time when the City was reporting an unmet capital renewal requirement.”

The ladder classifies only *E*, the eligible funding. The brief later says the unmet requirement:

> “is reported as fact; it is established in required calculation 4 and is not itself classified here.”

A reviewer could return Supported based solely on *E* even if the second half were not established. One verdict cannot fairly cover a compound proposition when only one component affects it.

**Replacement proposition:**

> “At least half of the $100 million council approved for CM-20-0330 came from funding sources that permitted road or alley renewal instead.”

Then report the existence and size of the renewal gap under Claim 3 and required calculation 4. Do not leave an unclassified component inside Claim 2.

## 3. Is it the strongest fair reading?

- **WEAKENED:** The former title’s trend and drainage errors are gone, but the replacement still promises more than the claims test:

> “Are Edmonton's roads in poor shape, and could the $100 million for bike lanes have fixed them?”

Claim 2 tests whether funding sources permitted road or alley renewal. Claim 3 compares the approval with a whole-infrastructure renewal gap. Neither establishes that spending the money on roads would have “fixed them.” The unit-cost calculation is conditional and carries no verdict.

**Replacement title:**

> “Are Edmonton's roads in poor shape, could the $100 million for bike lanes have gone to road renewal, and how large was it beside Edmonton's infrastructure-renewal gap?”

- **RESOLVED:** Roads and alleys are no longer combined into a verdict-bearing asset set.
- **RESOLVED:** The “larger share” fallback is gone.
- **RESOLVED:** The direct-transfer test no longer substitutes for the opportunity-cost claim.

## 4. Operationalization and its alternatives

- **RESOLVED:** Bylaw 20865 replaced Bylaw 19627 effective April 1, 2025, and the brief now distinguishes the rate bylaw from the 2017 transfer decision. The current City bylaw list and council record support that correction. [Bylaw 20865](https://www.edmonton.ca/sites/default/files/public-files/BL20865.pdf), [2017 transfer record](https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=108177)
- **RESOLVED:** B2 now prohibits classification across mismatched accounting periods.
- **RESOLVED:** The 2023–2026 whole-infrastructure denominator exists. The adopted budget publishes a $1.63-billion “Renewal Funding Gap” for that cycle. This confirms that the definition is computable without constructing or rescaling a figure. [2023–2026 Capital Budget](https://www.edmonton.ca/sites/default/files/public-files/2023-2026CapitalBudget.pdf)
- **RESOLVED:** The refusal to classify cumulative actuals through 2025 is justified. A three-year actual against a four-year requirement would violate B2. Reporting actuals separately is sufficient.
- **RESOLVED:** Transfer calculations now distinguish growth from renewal and prohibit translating mixed service-category funding into road or alley cuts.
- **RESOLVED:** Replacement value is primary, with length as the alternative where the City publishes a condition distribution on that denominator.
- **RESOLVED:** The condition system and a published Roads class exist as described. The 2025 report publishes Roads, Paved Roads, Unpaved Roads and Curbs under the City’s hierarchy. [2025 Infrastructure State and Condition materials](https://pub-edmonton.escribemeetings.com/Meeting.aspx?Agenda=Agenda&Id=6e208552-6c5f-494a-90ef-838910965e22&Item=26&Tab=attachments&lang=English)

**New finding: Source 3 does not exist as a usable public dataset in the form the brief describes.**

> “City of Edmonton Open Data, ‘Neighbourhood and Alley Renewal’ … and its companion ‘Neighbourhood and Alley Renewal Map’”

The supplied `dtuf-twc2` asset’s visualization reports that the dataset is empty, private or deleted. The `4s3w-mdwf` landing page exposes no dataset content. The brief nevertheless tells reviewers to report their fields and last-updated dates. A source audit cannot confirm that either was a usable public dataset on the freeze date. [Open-data asset status](https://data.edmonton.ca/d/dtuf-twc2/visualization)

**Replacement wording:**

> “The previously identified open-data assets `dtuf-twc2` and `4s3w-mdwf` could not be confirmed as publicly accessible on 2026-09-03 and are not relied upon. Reviewers search the current City catalogue and the 2025 Infrastructure State and Condition materials for any published alley condition measure, naming any usable replacement source. If none exists, they report that no public condition distribution was located.”

Do not require reviewers to report fields or update dates from inaccessible assets.

## 5. Does the brief leak an expected finding?

- **RESOLVED:** The denominator is no longer chosen because it favours the claim.
- **RESOLVED:** Reviewers are no longer told that a City target is inherently “better.”

**New finding: Claim 2 tells reviewers that one component is already established.**

> “This is the second half of the proposition and is reported as fact; it is established in required calculation 4 and is not itself classified here.”

That states the expected finding and compounds the Claim 2 ladder defect.

**Replacement wording:**

> “Reviewers determine whether the City published an unmet capital-renewal requirement for 2023–2026 and report the City’s figure and terminology. If no same-period pair is published, they report the nearest published figures without classification.”

## 6. Is the claim checkable at all?

**OK.**

- **RESOLVED:** The brief no longer tests deterioration, deliberate neglect or whether Council should have preferred roads.
- **RESOLVED:** Claim 3 now says “equalled,” leaving funding eligibility to Claim 2.
- Road condition, funding eligibility and the same-period magnitude calculation are factual and checkable once the Claim 2 compound proposition is separated.

## 7. Scope traps

- **RESOLVED:** The broad mixed-profile boundary has been corrected.
- **OPEN:** Drainage financing remains a separate, uncaptured proposition inside the required research:

> “Where drainage money comes from.”

The captured drainage claim concerns damage to homeowners. Nobody asserted that bike-lane and drainage funding came from the same budget. Required calculation 6 asks every reviewer to research ownership, rate regulation, funding and the legal mechanism for moving money between them. That belongs to a separate explanatory story. Calling it context does not cure the scope expansion.

**Replacement wording:**

> “Delete B6, source 9 and required calculation 6. Retain the scope statement that drainage damage, drainage financing and drainage management are not tested in this brief.”

## 8. Stakes

- **RESOLVED:** All four verdicts now state consequences separately for holders and opponents.
- **RESOLVED:** Contradicted on Claim 2 now addresses funding eligibility rather than bookkeeping transfers.
- **RESOLVED:** Claim 3’s whole-infrastructure denominator gives both Supported and Contradicted consequences that could surprise one side.

**New finding: Claim 2’s Contradicted stakes overstate what ineligibility proves.**

> “it was money that existed for this purpose or for nothing.”

An ineligible source might permit other capital uses while prohibiting road or alley renewal. The ladder establishes “not available for roads or alleys,” not “bike lanes or nothing.”

**Replacement wording:**

> “A holder must abandon the premise that any of this programme’s identified funding could have been used for road or alley renewal.”

## 9. Who asks this?

- **RESOLVED:** The brief now states the resident’s question and explains that the evidence cannot determine the condition of a particular street or alley.

**New finding: The proposition still uses the present tense for a materially earlier inventory.**

> “The claims are about the state of the city at that time”

> “Edmonton's roads are in poor condition.”

The 2025 report was presented in 2026, but its inventory describes assets as of December 31, 2024. That is the latest published measure, not a measurement of road condition during the August–September 2026 claim period. The brief explains the citywide limitation but not this time limitation. [Official report materials](https://pub-edmonton.escribemeetings.com/filestream.ashx?DocumentId=284322)

**Replacement wording:**

> “The City’s latest published condition inventory available by 2026-09-03 describes assets as of December 31, 2024. It cannot establish whether road condition changed before the claims circulated in August 2026.”

**Replacement proposition:**

> “In Edmonton’s latest published condition inventory, based on data as of December 31, 2024, the City’s Roads asset class was in poor condition under the brief’s predeclared thresholds.”

## Likely reaction from each side

A holder would recognize the opportunity-cost argument far better than in draft 1, but could still object that “could have fixed them” promises an outcome the brief never tests and that a 2024 inventory is being presented as the condition of roads in 2026. An opponent would accept the whole-infrastructure denominator and the corrected funding-source test, but could fairly object that Claim 2 embeds an already-declared renewal-gap finding and that “bike lanes or nothing” overstates restricted funding. Both sides would also see the drainage investigation as a separate question. The core design is close, but the remaining proposition, date, source and scope defects require revision.
