# Panel MATERIAL FRAMING CONCERNs, first run

The concerns below halted synthesis of the first run,
reviews/low-density-history/2026-09-02 (errata.md). Each is quoted
verbatim from the reviewer's round 1 output, from the
interpretation_notes field in which it was raised. Each is followed by
what changed in the revised brief for this re-run.

## Concern 1

Seat: Gemini 3.1 Pro (google). Round: 1. Claim: `ldh-existed-century`. Source:
reviews/low-density-history/2026-09-02/round1/gemini.json,
`claims[].interpretation_notes`.

Verbatim:

> The operationalization requires classifying 1926 housing using an actual built density measure compared against an identified source's threshold and its specific land-area denominator. Since 1926 records (such as the 1926 Census of the Prairie Provinces) do not provide such a strictly defined threshold with a matching denominator, this rule makes it impossible to classify the clearly existing single-detached housing of that era as 'low-density' under the brief's rules. This predetermines a failure to establish the claim. MATERIAL FRAMING CONCERN

**What changed in v2.** The classification rule no longer turns on a
measured density figure. An area counts as low density under either branch
of one rule: the era's own terminology, quoted from the instrument, or a
documented record showing the area consisted predominantly of one or two
dwellings per lot. Occupied single-detached housing documented in 1926 by
a census enumeration, an assessment roll or a street directory therefore
classifies on the record that exists, with no threshold and no matching
land-area denominator required. Dwellings per hectare survives only as a
sensitivity, reported where a published source with a defined denominator
exists, and the brief states that its absence is not a gap in the evidence
and never counts against a claim.

## Concern 2

Seat: Gemini 3.1 Pro (google). Round: 1. Claim: `ldh-planned-around`. Source:
reviews/low-density-history/2026-09-02/round1/gemini.json,
`claims[].interpretation_notes`.

Verbatim:

> The brief requires calculating permitted cross-era density (dwellings per hectare) based on the minimum site area and permitted dwellings in historical instruments. Edmonton's first zoning bylaw (Bylaw 26) was not enacted until 1933, meaning there was no city-wide zoning for the 1926-1933 portion of the exact 100-year window. Furthermore, the full text of Bylaw 26-1933 is not available online to extract the minimum site area and permitted secondary uses. Evaluating the 'many' thresholds (count of 10 or 25% share) across historical boundaries requires GIS and archival data unavailable via web search. The requirement to compute density from minimum site area across all historical instruments is impossible without archival access, predetermining a 'Not established' verdict. MATERIAL FRAMING CONCERN

**What changed in v2.** The permitted-development rule requiring
dwellings per hectare computed from permitted dwellings and minimum site
area is gone. An instrument now classifies under the same two-branch rule,
by the terminology it uses or by whether it permitted principally one or
two dwellings per lot, so an instrument whose full text gives no minimum
site area can still be classified from the text that is available. The
brief also fixes one primary reading for each choice that would otherwise
multiply the required work: the cumulative aggregation, present-day
neighbourhood polygons, the 50 percent coverage rule, the
planned-or-approved denominator, and the count reading of "many" at a cutoff of 10.
The share reading, the contemporaneous unit and the area-weighted
calculation are reported as qualifications where the record supports them,
so a gap in archival or GIS data limits a qualification rather than
deciding the verdict. The 1926 to 1933 gap before the first city-wide
zoning bylaw remains reportable: the brief still requires the actual date
of every instrument found and any gap in which no zoning instrument was in
force, and still requires the first zoning bylaw's year, number and text
to be confirmed from a primary source.

## Concern 3

Seat: GPT-5.6 Sol (openai). Round: 1. Claim: `ldh-existed-century`. Source:
reviews/low-density-history/2026-09-02/round1/gpt.json,
`claims[].interpretation_notes`.

Verbatim:

> The occupation evidence is strong for both the exact 1926 date and calendar year. The unresolved part is the brief's numerical classification rule: none of the consulted records supplies a 1926 dwelling count, matching site or net-residential land area, boundary, and sourced threshold for the same area. The review also occurred on 2026-09-01, one day before the fixed endpoint, so the endpoint cannot yet be observed. MATERIAL FRAMING CONCERN: a future freeze date cannot support a completed historical-window verdict, and the density operationalization changes a readily documented proposition about occupied detached housing into one requiring an unpublished historical geospatial calculation.

**What changed in v2.** Two things. The dates are corrected: the as-of
date is 2026-09-01 and the exact window is 1926-09-01 through 2026-09-01,
which is the actual date of the run rather than a date one day in the
future, so the endpoint is observable. And the numerical classification
rule is removed, so a 1926 dwelling count with a matching site or
net-residential land area, boundary and sourced threshold for the same
area is no longer needed. Documented occupied low-density housing anywhere
in calendar year 1926 or earlier meets the date test, because the brief
now states that calendar year 1926 counts as "approximately 1926". The
exact-date result is still reported, but a difference between it and the
calendar-year result goes to limitations or interpretation_notes rather
than to a second verdict.

## Concern 4

Seat: GPT-5.6 Sol (openai). Round: 1. Claim: `ldh-planned-around`. Source:
reviews/low-density-history/2026-09-02/round1/gpt.json,
`claims[].interpretation_notes`.

Verbatim:

> Supported part: City planning reports establish widespread deliberate inclusion of officially termed low-density lots in neighbourhood plans, and the broad cumulative count comfortably exceeds 10. Failed part: the record consulted does not establish the prescribed 50 percent or area-weighted coverage, permitted-density calculations including every allowed housing form, historical-boundary exclusions, contemporaneous-unit mappings, or the 25 percent and one-third share variants. The current-end variant is also unresolved and may differ because the RS Zone permits 133.3 dwellings per site hectare. The schema permits only one verdict although the brief requires separate verdicts whenever variants differ. MATERIAL FRAMING CONCERN: the future 2026-09-02 endpoint and single-verdict schema prevent faithful reporting of the required variant-specific results.

**What changed in v2.** The brief now matches the one-verdict-per-claim
review schema. Each verdict-sensitive choice has one primary reading that
carries the verdict, and every alternative reading is reported in the
limitations or interpretation_notes fields, which the schema does carry.
For Claim B the primary readings are the cumulative aggregation across the
window, present-day City of Edmonton neighbourhood polygons, the 50
percent coverage rule, the denominator of neighbourhood units planned or
approved by the era end, and the count reading of "many" at a cutoff of
10. The share reading at 25 percent and one third, the count at the
alternative cutoff of 5, the area-weighted coverage calculation, the
contemporaneous unit, the occupied-development denominator and the
end-of-window aggregation are all qualifications. The end-of-window
question the seat raised, where the current RS Zone permits more than two
dwellings on a site, is now a qualification on a verdict carried by the
cumulative reading, and the classification of that zone is settled by
terminology and permitted forms rather than by a permitted-density
figure. The future endpoint is corrected to 2026-09-01.
