# Response to framing check 1

Check: framing/check-1.md, verdict REVISE, run 2026-09-01. Editor's
decision: adopt every replacement wording in the check as written, and
apply the consequences of its existence and calculation audit. The brief
in this directory is now Revision 1 after framing check 1; its status line
says so.

One entry per finding, and one per audit item that changed. Each entry
quotes the wording now in brief.md.

## Finding 1. Claim A's replacement classification still asked for an unavailable historical calculation

Adopted. Branch (b) of the classification rule is now defined separately
for each claim, and the area-predominance test is gone.

The brief now reads:

> **Branch (b) for Claim A.** For Claim A, branch (b) uses the occupied
> residential lot as the classification unit, not an area. A lot qualifies
> when a published record identifies one or two occupied dwellings on that
> lot in 1926. State the address or legal lot, the dwelling count, the
> occupation evidence, the date, and the source. Claim A requires one
> qualifying occupied lot in 1926; it does not require reconstruction of an
> area's predominant lot pattern.

> **Branch (b) for Claim B.** For Claim B, branch (b) is met when the
> operative instrument text limits the classified residential lots to no
> more than two principal dwellings per lot. Report every other permitted or
> discretionary residential form. If the text does not settle that question,
> the instrument is borderline.

Branch (a) now reads "quoted from the instrument. Classify under branch (a)
from the operative instrument or plan text actually obtained and quoted,
and limit the classification to that text". The classification unit is now
"A lot, an area, an instrument or a plan", and the "has existed" definition
and the reporting rules follow it, so a documented occupied lot classifies
without any area reconstruction.

## Finding 2. Claim A had no attainable continuity test

Adopted verbatim. The old sentence requiring housing to have "remained part
of Edmonton's housing stock throughout the window" is replaced by:

> Test documented presence in calendar year 1926, at the 2026-09-01
> endpoint, and at least once during each city-wide bylaw era defined below.
> Name the published source for every observation and report the longest
> interval between observations. This is the fixed operational test of
> "since"; annual or day-by-day observations are not required.

The check's list of potential sources is carried into the brief as the
named published sources for those observations: the 1926 Census of the
Prairie Provinces and dated directories or historic-resource records for
the first observation, later federal or municipal census and neighbourhood
records for the intervening eras, and the current assessment, permit or
occupancy record for the endpoint.

## Finding 3. The primary Claim B calculation required historical geometry the published record cannot supply

Adopted verbatim. The 50 percent coverage rule and the area-weighted
calculation are removed as required calculations, and the "Coverage, fixed
here" block is replaced by:

> **The primary count, fixed here.** For Claim B's primary count, count a
> present-day City neighbourhood once when a published
> neighbourhood-specific plan, subdivision document, covenant, developer
> plan, or official historical report names or maps that neighbourhood and
> states that qualifying low-density housing was a principal or predominant
> planned residential form. Do not require a GIS covered-area calculation. A
> city-wide instrument without published neighbourhood-level geography may
> establish historical context but does not add neighbourhoods to the count.
>
> The cumulative count at 10 carries the verdict; report the result at 5 as
> the stated alternative. Report exact covered-area shares, area weighting,
> contemporaneous-unit results, era-by-era shares, and residential-land
> shares only where a published source supplies the required geometry and
> denominator. Their absence is not an evidence gap and cannot affect either
> verdict.

The "Which alternative applies to which claim" section is conformed: Claim
B's primary readings are now "the cumulative aggregation across the window,
present-day City of Edmonton neighbourhood polygons, the primary count rule
above, and the count reading of 'many' at a cutoff of 10".

## Finding 4. The primary historical denominator had no complete published source

Adopted. Both era-end denominators are removed from the required verdict
calculation:

> Both era-end denominators, the neighbourhoods with documented occupied
> residential development at that date and the neighbourhood units planned
> or approved by that date, are removed from the required Claim B verdict
> calculation. Under the cumulative primary count, the denominator is not
> needed. If a published source supplies a complete defined roster for a
> particular era, report the corresponding share as a qualification and name
> that source. Otherwise state that no share was calculated; the absence
> does not count against Claim B.

The check's replacement opens with an instruction to the editor, "Remove
both era-end denominators from the required Claim B verdict calculation."
The brief states that removal as the operative rule; the remaining three
sentences are carried word for word.

## Finding 5. Borderline instruments had no designated primary treatment

Adopted verbatim. The instruction to "report the results with borderline
instruments included and excluded" is replaced by:

> An instrument contributes to the primary calculation only when branch (a)
> or branch (b) is satisfied without an unresolved interpretation. Exclude
> borderline instruments from the primary result. Report the included result
> as a qualification in limitations or interpretation_notes.

The requirement to report the count of borderline instruments and how each
was treated is kept.

## Audit consequences applied

**Branch (b) classification, failed.** Fixed by finding 1 above.

**Borderline included and excluded results, primary treatment missing.**
Fixed by finding 5 above.

**Exact covered share, 50 percent result and area weighting, failed.**
Removed as required calculations by finding 3. They survive only under
"Report exact covered-area shares, area weighting, contemporaneous-unit
results, era-by-era shares, and residential-land shares only where a
published source supplies the required geometry and denominator."

**Planned-or-approved and occupied denominators, failed.** Removed by
finding 4.

**Count cutoffs of 10 and 5.** Kept, with the numerator changed to one
computable from named published plans or records. The count reading now
reads "The number of neighbourhoods counted under the primary count rule
above, at a cutoff of 10. Report the result at the stated alternative
cutoff of 5 as a qualification."

**Share cutoffs of 25 percent and one third.** Made conditional on a
published denominator:

> **Share reading, qualification, conditional on a published denominator.**
> The share of neighbourhoods counted, at a cutoff of 25 percent and at the
> stated alternative of one third, reported only where a published source
> supplies a complete defined roster of neighbourhoods for the era or the
> window and that source is named. Where no such roster is published, state
> that no share was calculated. Neither cutoff carries a verdict, and the
> absence of a share is not an evidence gap.

**Era-by-era shares, not computable.** The reporting rule now reads "Report
the exact count for every era and for each aggregation reading, and report
a share for an era only where a published complete roster supplies its
denominator."

**First zoning bylaw and bylaw eras, dates exist and geometry does not.**
The era list is now sourced: "Take the era dates from the City's History of
Zoning in Edmonton ... and from the bylaw texts themselves and the City's
Historical Land Use Bylaws resource guide ... which records that several
historical texts and maps are held only in physical form, are partial, or
are missing." The 1933 confirmation instruction now names the same two
sources and adds "Where only part of an instrument's text or maps is
published, say so, and limit every classification to the text actually
obtained."

**Current instrument, passes.** Now named: "The current instrument is
Zoning Bylaw 20001; take the amendments in force on 2026-09-01 from the
City's official amendment register
(https://zoningbylaw.edmonton.ca/amendments)."

**Present-day neighbourhood unit, exists.** The unit now names its source,
the City's published neighbourhood polygon layer at
https://gis.edmonton.ca/site1/rest/services/ZoningWebApp/Zoning_Map/FeatureServer/35.

**Historical city boundaries and annexation dates, dates but no GIS
series.** The then-existing rule is replaced with a rule sourced to the
City's annexation history map and the Province's Municipal Boundary
Document Search, carrying Alberta's own incompleteness warning, and ending
"Those sources establish annexation dates and city extent; no exact
historical boundary intersection is required, and none may be demanded."

**Contemporaneous unit, conditional already.** The condition is now
explicit in both directions: the unit is used "wherever a published source
supplies their boundaries", and where none does, "The absence of published
contemporaneous boundaries limits a qualification only; it is not an
evidence gap and cannot affect the verdict."

**Residential-land share and housing-mix figures, fair under condition.**
The condition is tightened to a published source for both parts: "Report
the share of residential land covered only where a published source
supplies both the covered geometry and the land denominator ... Its absence
is not an evidence gap and cannot affect the verdict."

**Required calculations, conformed.** The first required calculation is now
the neighbourhood count under the primary count rule, "naming for each
counted neighbourhood the published plan, subdivision document, covenant,
developer plan or official historical report it was counted from", with
shares and housing-mix figures required "only where a published source
supplies both the numerator and the denominator" and the closing rule "No
calculation is required that the published sources named in this brief
cannot supply, and no such absence is an evidence gap." The classification
line now states branch (b) separately for each claim.

## Audit items left as they were

The 1926-09-01 through 2026-09-01 window, the dwellings-per-hectare
sensitivity, the branch (a) classification method beyond the
text-obtained limit, and the current, cumulative and era-by-era count
aggregation were passed by the audit as written and are unchanged. Nothing
else in the brief was altered.

Stew, 2026-09-01
