# Panel MATERIAL FRAMING CONCERN, round one of the 2026-09-02-rerun run

Round one of `reviews/infill-prices/2026-09-02-rerun` stopped here. Under
docs/DESIGN.md section 4 stage 4, a material catch triggers a fresh blind
re-run of the affected claims under a revised brief rather than a quiet
correction inside the same run. This file records the concern verbatim, with
the seat, round and claim id that raised it, records as context the seat that
raised no concern, and states what changed in the brief in `../brief.md`.

Each quotation is the MATERIAL FRAMING CONCERN passage of that reviewer's
`interpretation_notes` in `../../2026-09-02-rerun/round1/gemini.json`, copied
without alteration; surrounding notes on other matters are not reproduced.

## The concern, verbatim

### Gemini 3.1 Pro, round 1, ip-teardown-price-gap

> The brief defines the unit of analysis as 'separately saleable
> replacement dwellings' and uses the undivided total assessed value per
> dwelling. For purpose-built rental or any multi-unit housing held on a
> single title, the entire building (e.g., a fourplex) is treated as one
> 'separately saleable dwelling.' Comparing the assessed value of an
> entire multi-unit building to a single demolished bungalow
> mathematically guarantees a massive price increase, ignoring the
> per-unit price. This distorts the result for all single-title multi-unit
> rentals. I would frame the comparison on a per-unit basis universally.
> MATERIAL FRAMING CONCERN

### Gemini 3.1 Pro, round 1, ip-infill-affordable

> The brief tests affordability by applying a single median household's
> income to purchase a 'separately saleable replacement dwelling.' Because
> purpose-built rental buildings are sold on a single title, the brief
> models a single median-income household buying an entire apartment
> building to live in, which predictably fails the 30% shelter-cost test.
> This materially distorts the affordability of rental infill, measuring
> the affordability of acquiring an entire building rather than renting a
> unit within it. I would apply a rental shelter-cost test (rent vs.
> income) to units within rental buildings. MATERIAL FRAMING CONCERN

## Context, not a concern

The Claude Fable 5.1 seat recorded no MATERIAL FRAMING CONCERN on either
claim in the same round. Its notes are reproduced here as context on how the
brief read to another seat, and they are not a concern and did not trigger
this re-run. The closing passage of each note, from
`../../2026-09-02-rerun/round1/claude.json`:

### Claude Fable 5.1, round 1, ip-teardown-price-gap

> No MATERIAL FRAMING CONCERN: the brief's rules could be applied, and the
> departures above were data-driven and are reported with their effect.

### Claude Fable 5.1, round 1, ip-infill-affordable

> No MATERIAL FRAMING CONCERN, but the unindexed 2020 income is the
> assumption most likely to be challenged; the result survives every
> income sensitivity available.

The GPT-5.6 Sol seat's round-one notes contain no MATERIAL FRAMING CONCERN
passage on either claim.

## What changed in the brief

**The verdict unit, raised on both claims.** The previous brief fixed the
verdict denominator as separately saleable replacement dwellings. A
purpose-built rental fourplex or any other multi-unit building held on one
title is one separately saleable dwelling under that rule, so Claim 1 set an
entire building's undivided assessed value against one demolished house, and
Claim 2 modelled one median-income household buying that whole building to
live in. Both comparisons answer a different question from the one the
captured quotation asks about the price of a replacement house.

The verdict unit for every claim is now the replacement dwelling unit: each
self-contained dwelling unit in the replacement housing on the lot, counted
once, whether it is separately titled or held with other units on one title.
A single-title fourplex is four replacement dwelling units and not one. Each
unit is valued on one of two rules, fixed before any share is calculated. A
separately titled dwelling is valued at its own total assessed value, or its
own sale price where a sale series is in use; this is the "total value per
dwelling" measure, and that language now applies to separately titled
dwellings and to no other case. A dwelling unit inside a single-title
multi-unit building takes as its assessed value the building's total assessed
value divided by the number of dwelling units the building contains, and its
price basis for Claim 2 is the rental test, contract rent plus utilities
against income, where the unit is rented, or the per-unit assessed value
where it is owner occupied or unlet. No household is modelled as buying a
whole single-title building.

The rule is stated in the unit-of-analysis section, in Claim 1's verdict
measure and majority threshold, in the replacement-assessed-value and
admissible-verdict-series rules, in the sale-to-sale sensitivity, in the
tenure section, in Claim 2's test, denominator and required reporting, and in
the required calculations, so that every figure states which of the two rules
produced it. Undivided title totals and lot totals are still reported, now as
qualifications that can never carry a verdict.

Everything else stays. The demolished dwelling's value is still its total
assessed value on the roll in force in the year before demolition, undivided.
The two lot-level sensitivities, the "every replacement" and "at least one
replacement" rules, are unchanged and still never carry a verdict. The frozen
historical mature-neighbourhood boundary, the assessed-value verdict series
for Claim 1 and the ten-year rule on the sale-to-sale sensitivity, all
adopted after the earlier run's concerns, are unchanged, and the as-of date
stays 2026-09-01.
