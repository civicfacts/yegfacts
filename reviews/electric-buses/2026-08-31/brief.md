# Review brief: Edmonton's electric buses

Status: PROVISIONAL — drafted by the orchestrator 2026-08-31; the founder
ratifies these definitions at the stage-7 gate before publication.
Frozen before round 1. Methodology: v1.0.

## Story

Between 2020 and 2021, Edmonton Transit Service put roughly 60
battery-electric buses from Proterra into service. Proterra entered Chapter
11 bankruptcy in August 2023. Since then, claims about the purchase
circulate widely on Edmonton social media. This story checks the three most
common ones.

## Why this story (selection rationale)

- Prevalence: recurring claim in Edmonton Facebook/Reddit/X threads since
  2023, resurfacing whenever transit or fleet spending is in the news.
- Civic importance: fleet electrification decisions are ongoing; council
  and administration continue to face related procurement choices.
- Verifiability: strong primary record exists (court filings, City reports,
  council materials, comparable-city evaluations).
- Workflow gate: first end-to-end test of the panel process on
  direct-Edmonton evidence.

## Claims under review

### Claim 1 — id: ebus-procurement-failure

**Circulating forms:** "The e-buses were a disaster." "They don't work."
"They break down constantly and can't handle winter."

**Normalized proposition:** Edmonton's Proterra battery-electric buses
substantially failed to deliver the performance the City contracted for
(range, reliability, durability, and vendor support).

**Operationalization:** "Failed to deliver" means documented material
shortfalls against contracted specifications or the City's own published
performance expectations, including post-sale support. Evidence of the
City's formal legal position about vendor breach counts as evidence of the
City's assessment, not by itself proof of the underlying facts; reviewers
must weigh it accordingly.

### Claim 2 — id: ebus-82m-loss

**Circulating forms:** "Edmonton lost $82 million on electric buses."
"The City blew $82M of taxpayer money on buses that don't work."

**Normalized proposition:** The e-bus procurement has cost the public
approximately $82 million on a net basis.

**Operationalization:** "Lost $82M" is TRUE only if public records
establish net public cost of that magnitude: cash outlays attributable to
the procurement (purchase price, charging infrastructure, non-routine
repairs) MINUS recoveries (warranty reimbursements, bankruptcy
distributions, settlements) MINUS the value delivered (service actually
provided; residual/remaining fleet value). The identity of the $82M figure
matters: if it is a legal claim amount (e.g., a bankruptcy proof of
claim), that is evidence of alleged damages, not an audited loss. Grants
from other orders of government count as public money (a federal dollar is
still a taxpayer dollar), but reviewers should report the payer mix.
Accounting window closes 2026-08-31; later recoveries are out of scope.

### Claim 3 — id: ebus-cold-cities

**Circulating forms:** "This proves electric buses don't work in cold
cities." "EVs can't handle real winters, Edmonton showed that."

**Normalized proposition:** Edmonton's experience demonstrates that
battery-electric buses are unsuitable for cold-climate cities in general.

**Operationalization:** The proposition generalizes from one procurement
to a technology category. Reviewers must apply the transferability rules:
Edmonton's fleet was one manufacturer (Proterra) in one period; evidence
from other cold-climate deployments (e.g., Toronto's multi-manufacturer
head-to-head evaluation, prairie and Quebec deployments, St. Albert)
bears directly on whether the generalization holds. Cold-weather range
reduction being real is not the same thing as the technology being
unsuitable; reviewers should separate those.

## Scope

- Geography: City of Edmonton procurement; comparable-city evidence
  explicitly in scope for Claim 3 with transferability assessment.
- Time: procurement decisions (2016 feasibility study onward) through
  2026-08-31.
- Out of scope: named-individual blame, future fleet policy
  recommendations, trolley/hydrogen alternatives.

## Required calculations (scripts/calcs/electric-buses.ts)

- Purchase price context: US$ purchase amount and CAD-converted magnitude
  vs the $82M figure (report both currencies; do not silently convert).
- Range shortfall: reported winter range vs contracted range, as a
  percentage.
- Any availability percentage quoted must trace to a dated source.

## Reviewer instructions of special note

- Verify the $82M figure's identity in primary documents before treating
  it as a loss.
- Search for evidence AGAINST the failure narrative (service delivered,
  buses still operating, recoveries) as diligently as for it.
- Distinguish: what the City expected publicly (2020) vs what it later
  alleged legally (2023-24) vs what independent records establish.
- Record every source URL; you will not have repo access — cite fully.
