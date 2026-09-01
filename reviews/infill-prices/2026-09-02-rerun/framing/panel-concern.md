# Panel MATERIAL FRAMING CONCERNs, 2026-09-01 run

Synthesis of the 2026-09-01 run halted here. Under docs/DESIGN.md section 4
stage 4, a material catch in the cross-review round triggers a fresh blind
re-run of the affected claims under a revised brief rather than a quiet
correction inside the same run. This file records the concerns verbatim,
with the seat, round and claim id that raised each, and states what changed
in the v2 brief in `../brief.md`.

Each quotation is the MATERIAL FRAMING CONCERN passage of that reviewer's
`interpretation_notes`, copied without alteration; surrounding notes on
other matters are not reproduced.

## The concerns, verbatim

### GPT-5.6 Sol, round 1, ip-teardown-price-gap

> MATERIAL FRAMING CONCERN: The brief requires a mature-neighbourhood subset
> defined by an official instrument in force on 2026-09-01. The City retired
> the Mature Neighbourhood Overlay when Zoning Bylaw 20001 took effect on
> 2024-01-01 and says The City Plan no longer has a specific policy area for
> the former overlay. Using the former overlay map or the broader current
> redeveloping area would produce different denominators. A replacement
> geography must be frozen before calculation. This concern does not change
> the city-wide verdict.

### GPT-5.6 Sol, round 1, ip-infill-affordable

> MATERIAL FRAMING CONCERN: The shared mature-neighbourhood subset is
> undefined on 2026-09-01 because the City retired the Mature Neighbourhood
> Overlay effective 2024-01-01 and did not replace it with an equivalent
> specific policy area. The former overlay and current redeveloping area
> would produce different denominators, so the geography must be frozen
> before calculation. This concern does not change the city-wide verdict.

### Claude Fable 5.1, round 2, ip-teardown-price-gap

> MATERIAL FRAMING CONCERN (per prompts/reviewer.md): the brief requires the
> mature-neighbourhood subset to be delimited by the City instrument in
> force on 2026-09-01. No such instrument exists: the Mature Neighbourhood
> Overlay in Bylaw 12800 was retired when Zoning Bylaw 20001 took effect
> 2024-01-01, and The City Plan 'no longer applies specific policies to this
> area', identifying instead 'most of the lands within Anthony Henday Drive
> as the redeveloping area'. The retired overlay map and the redeveloping
> area are different boundaries and would give different denominators. Gpt
> reached the same conclusion from the same primary document; my agreement
> rests on that document, not on the panel. The city-wide verdict is
> unaffected. A replacement geography (I would freeze the retired overlay
> map as published in the City's open data, with the redeveloping area as a
> labelled sensitivity) must be fixed before any subset share is computed.

### Claude Fable 5.1, round 2, ip-infill-affordable

> Same MATERIAL FRAMING CONCERN on the mature-neighbourhood boundary as
> Claim 1.

### GPT-5.6 Sol, round 2, ip-teardown-price-gap (first of two)

> MATERIAL FRAMING CONCERN: the Mature Neighbourhood Overlay was retired
> when Zoning Bylaw 20001 took effect on January 1, 2024. The archived
> overlay boundary and the current City Plan redeveloping area are different
> instruments and must not be silently substituted for one another.

### GPT-5.6 Sol, round 2, ip-teardown-price-gap (second of two)

> MATERIAL FRAMING CONCERN: comparing a replacement's first sale with the
> demolished dwelling's possibly decades-old last sale can measure long-run
> property appreciation as well as redevelopment. CPI adjustment does not
> isolate housing-market appreciation. This may differ from the captured
> quotation's apparent contemporaneous value comparison. I answer the
> declared proposition while requiring the sale-date gap and assessed-value
> series to be prominent qualifications.

### Gemini 3.1 Pro, round 2, ip-teardown-price-gap

> MATERIAL FRAMING CONCERN: The required mature-neighbourhood subset is
> undefined as of 2026-09-01 because the Mature Neighbourhood Overlay was
> retired on 2024-01-01. A new boundary must be frozen before calculation.
> This does not change the city-wide verdict.

### Gemini 3.1 Pro, round 2, ip-infill-affordable

> MATERIAL FRAMING CONCERN: The shared mature-neighbourhood subset is
> undefined on 2026-09-01 because the City retired the Mature Neighbourhood
> Overlay effective 2024-01-01.

## What changed in the v2 brief

**The geography, raised by all three seats on both claims.** The v1 brief
delimited the mature-neighbourhood subset by the mature-neighbourhood policy
instrument and the official consolidation in force on the freeze date, and
no such instrument exists: the Mature Neighbourhood Overlay was retired when
Zoning Bylaw 20001 took effect on 2024-01-01. The v2 Geography section
replaces that rule with a frozen historical boundary, the area covered by
the Mature Neighbourhood Overlay as it stood on 2023-12-31, the day before
Zoning Bylaw 20001 retired it, as published in the last consolidation of
Zoning Bylaw 12800. The brief now says plainly that no mature-neighbourhood
instrument is in force on the freeze date and that this boundary is
therefore historical rather than in force. The City Plan's "redeveloping
area" is named as a reported sensitivity with its own share, numerator and
denominator, and the brief forbids substituting it for the frozen boundary,
which answers the point that the two boundaries are different instruments
and would give different denominators. The city-wide set stays the primary
set, consistent with every seat's note that the concern does not touch the
city-wide verdict.

**The appreciation confound, raised by GPT-5.6 Sol in round 2 on Claim 1.**
The v1 verdict series compared the replacement's first arm's-length sale
price with the demolished dwelling's last arm's-length sale price, which for
a long-held house measures that house's own appreciation as much as the
redevelopment, and which CPI deflation does not isolate. In v2 the verdict
series for Claim 1 is the assessed-value pair: the demolished dwelling's
total assessed value on the assessment roll in force in the year before
demolition against the replacement's total assessed value on its first full
assessment roll after completion, both in the City's market-value assessment
basis and compared in constant dollars with the index and base year named.
Both sides are then valued at comparable moments. The sale-to-sale
comparison survives as a named sensitivity that can never carry the verdict:
it must report the gap in years between the two sale dates for every pair,
and pairs whose gap exceeds ten years are excluded from its headline figure
and reported separately. This is the seat's own remedy, that the sale-date
gap and the assessed-value series be prominent qualifications, applied by
moving the verdict onto the contemporaneous measure. The normalized
proposition, the verdict measure, the old-house and replacement value
sections, the admissible verdict series, the tenure, timing and
other-measures rules, the verdict mapping and the required calculations were
all rewritten to match. Claim 2's threshold test is unchanged: it still uses
the replacement's first arm's-length sale price where one exists and
otherwise its first full assessment after completion.
