<!-- Framing check 1 on the rerun brief. Checker: OpenAI gpt-5.6-sol via codex exec, reasoning effort high, prompt prompts/framing-check.md (with the schema limit, checkability limit and existence audit). Run 2026-09-01 by Stew. -->

Verdict: REVISE

## Status of the panel concerns

- **Concern 1, historical built-density rule: WEAKENED.** The dwellings-per-hectare requirement is gone, but its replacement still requires 1926 evidence of an area's predominant dwellings-per-lot pattern. The available occupation records do not necessarily contain that information.
- **Concern 2, historical instruments and GIS: WEAKENED.** The permitted-density calculation is gone. The mandatory historical coverage calculations, complete bylaw texts, maps, and denominators remain unavailable for parts of the period.
- **Concern 3, future date and Claim A classification: WEAKENED.** The endpoint is corrected and observable. The replacement classification still asks the 1926 record for information it may not contain.
- **Concern 4, variant verdicts and future endpoint: RESOLVED.** Each claim now carries one verdict under designated primary readings, alternatives go into schema-supported qualification fields, and the endpoint is corrected.

The earlier escalated findings remain settled and are not reopened.

## 1. Provenance

OK.

The brief identifies the only supplied form, its missing platform, author, and URL, its possible composite status, and the absence of any basis for prevalence or representativeness. The site-written formulations are clearly labelled and excluded from the propositions.

## 2. Does the proposition test what the post asserts?

OK.

The brief preserves the source's two factual assertions as separate claims. It does not substitute detached-only housing, "most neighbourhoods," present-day zoning, or the policy preference in the surrounding post.

## 3. Is it the strongest fair reading?

OK.

The cumulative reading of Claim B and the calendar-year reading of "approximately 1926" are fair primary readings. The exact-date and end-of-window readings are qualifications rather than extra verdicts.

## 4. Operationalization and its alternatives

### Finding: Claim A's replacement classification still asks for an unavailable historical calculation

> "(b) the documented record shows the area consisted predominantly of one or two dwellings per lot"

and:

> "Occupied means the record shows dwellings in use, for example an assessment roll, a census enumeration, a street directory..."

"Predominantly" has no fixed threshold, and "area" has no boundary or sampling rule. More importantly, the occupation sources named by the brief do not ordinarily establish the number of dwellings on every lot in an area. The [1926 Census of the Prairie Provinces](https://publications.gc.ca/collections/collection_2017/statcan/CS98-1926.pdf) can establish Edmonton dwellings and occupation, while a street directory or historic-resource record can establish an occupied address. None supplies, for a defined 1926 area, the occupied lot universe and the share containing one or two dwellings.

The revision therefore removed one unavailable historical calculation and introduced another. An occupied detached residence does not satisfy the rule as written because it does not establish area-wide predominance. This is the defect raised in panel concerns 1 and 3.

**Replacement wording:**

> For Claim A, branch (b) uses the occupied residential lot as the classification unit, not an area. A lot qualifies when a published record identifies one or two occupied dwellings on that lot in 1926. State the address or legal lot, the dwelling count, the occupation evidence, the date, and the source. Claim A requires one qualifying occupied lot in 1926; it does not require reconstruction of an area's predominant lot pattern.

For Claim B, replace "principally" with a rule that can be checked directly:

> For Claim B, branch (b) is met when the operative instrument text limits the classified residential lots to no more than two principal dwellings per lot. Report every other permitted or discretionary residential form. If the text does not settle that question, the instrument is borderline.

### Finding: Claim A has no attainable continuity test

> "Test whether such housing was present at the start of the exact 100-year window, whether it was present at any point in calendar year 1926, and whether it remained part of Edmonton's housing stock throughout the window."

The brief does not say how many observations establish "throughout." No published source provides a continuous or annual city-wide series of occupied qualifying lots from 1926 through 2026. The previous panel explicitly identified this missing series. Leaving the observation interval undefined lets reviewers apply different tests, while requiring literal continuous observation predetermines Not established.

**Replacement wording:**

> Test documented presence in calendar year 1926, at the 2026-09-01 endpoint, and at least once during each city-wide bylaw era defined below. Name the published source for every observation and report the longest interval between observations. This is the fixed operational test of "since"; annual or day-by-day observations are not required.

Potential published sources include the 1926 census and dated directories or historic-resource records for the first observation, later federal or municipal census and neighbourhood records for the intervening eras, and the current assessment, permit, or occupancy record for the endpoint.

### Finding: the primary Claim B calculation still requires historical geometry that the published record cannot supply

> "Report each neighbourhood's exact covered-area share."

> "The 50 percent rule is primary and carries the verdict."

> "Report the exact count and the exact share for every era and for each aggregation reading."

The current input exists. The City publishes a queryable [present-day neighbourhood polygon layer](https://gis.edmonton.ca/site1/rest/services/ZoningWebApp/Zoning_Map/FeatureServer/35).

The historical inputs do not exist in a complete published form. The City's [Historical Land Use Bylaws resource guide](https://www.edmonton.ca/sites/default/files/public-files/ResourceGuide-HistoricalLandUseBylaws.pdf) identifies cabinet-only maps, an east-side-only 1961 map, a 1971 map with the west missing, and a 1985 map with one sheet unavailable. The City's [Historic Planning Tools](https://www.edmonton.ca/city_government/urban_planning_and_design/historic-planning-tools) page also warns that archived plan maps may be low quality and directs users to contact the City for quality copies.

Those sources prove that the instruments existed. They cannot supply exact, century-wide polygon intersections against present-day neighbourhoods. The primary 50 percent result, the area-weighted qualification, and the required exact era results therefore remain uncomputable. This is the unresolved GIS part of panel concern 2.

**Replacement wording:**

> For Claim B's primary count, count a present-day City neighbourhood once when a published neighbourhood-specific plan, subdivision document, covenant, developer plan, or official historical report names or maps that neighbourhood and states that qualifying low-density housing was a principal or predominant planned residential form. Do not require a GIS covered-area calculation. A city-wide instrument without published neighbourhood-level geography may establish historical context but does not add neighbourhoods to the count.
>
> The cumulative count at 10 carries the verdict; report the result at 5 as the stated alternative. Report exact covered-area shares, area weighting, contemporaneous-unit results, era-by-era shares, and residential-land shares only where a published source supplies the required geometry and denominator. Their absence is not an evidence gap and cannot affect either verdict.

This keeps the cutoff and its one alternative. It does not ask for an alternative to the alternative.

### Finding: the primary historical denominator has no complete published source

> "Neighbourhood units planned or approved by that date, whether or not they were occupied."

> "The second denominator is therefore primary and carries the verdict."

Neither the present-day polygon layer nor the City's current and historic plan indexes provide a complete roster of every neighbourhood unit planned or approved at each era end. Registered subdivisions and historical zoning maps are distributed across archival and registry records. The brief names no published dataset from which a reviewer can construct that denominator.

The occupied-development denominator has the same problem. No complete published source connects every historical neighbourhood polygon, city boundary, and occupied-development status at every era end.

**Replacement wording:**

> Remove both era-end denominators from the required Claim B verdict calculation. Under the cumulative primary count, the denominator is not needed. If a published source supplies a complete defined roster for a particular era, report the corresponding share as a qualification and name that source. Otherwise state that no share was calculated; the absence does not count against Claim B.

### Finding: borderline instruments have no designated primary treatment

> "Report the results with borderline instruments included and excluded."

The schema can carry both results as qualifications, but the brief does not say which one contributes to the single verdict. If the count crosses 10 only when borderline instruments are included, reviewers could produce different verdicts while following the brief.

**Replacement wording:**

> An instrument contributes to the primary calculation only when branch (a) or branch (b) is satisfied without an unresolved interpretation. Exclude borderline instruments from the primary result. Report the included result as a qualification in limitations or interpretation_notes.

### Existence and calculation audit

- **1926-09-01 through 2026-09-01:** Derived from the intake's recorded 2026-09-01 date. It is an editorial window rather than an empirical threshold. The calendar-year alternative is also required, so the choice is bounded fairly.
- **First zoning bylaw and bylaw eras:** The City's [History of Zoning in Edmonton](https://www.edmonton.ca/sites/default/files/public-files/HistoryofZoninginEdmonton.pdf) identifies Bylaw 26, enacted October 10, 1933, and the later 1950, 1961, 1980, and 2001 instruments. The historical resource guide identifies the texts and maps, but several are physical, partial, or missing. Era dates exist; complete web-reviewable operative text and geometry do not.
- **Current instrument:** Zoning Bylaw 20001 exists, and the official [amendment register](https://zoningbylaw.edmonton.ca/amendments) identifies amendments in force by 2026-09-01. This part passes.
- **Branch (a) classification:** Compute from the quoted operative instrument or plan text. Published current and historic plan collections exist, though not for every historical instrument. Classification must be limited to text actually obtained.
- **Branch (b) classification:** No identified published source supports the current 1926 area-predominance calculation. It fails until changed to a lot-level rule.
- **Dwellings-per-hectare sensitivity:** Fair as written. The source must publish the figure and denominator, and absence is expressly harmless.
- **Borderline included and excluded results:** The cited instrument supplies the facts, but the primary treatment is missing. The replacement above fixes the schema problem.
- **Present-day neighbourhood unit:** Compute from the official City polygon layer. It exists.
- **Contemporaneous unit:** Compute from the cited historical plan or subdivision boundary where published. The brief already makes this conditional, so absence is harmless.
- **Historical city boundaries and annexation dates:** The City publishes an annexation-history map, and Alberta provides a [Municipal Boundary Document Search](https://municipalaffairs.gov.ab.ca/mc_boundary_search). Alberta warns that city records in that search are incomplete and that legal descriptions require the Gazette or original documents. These sources can establish dates, but not a complete ready-made GIS series for exact intersections.
- **Exact covered share, 50 percent result, and area weighting:** Require present-day polygons plus complete historical instrument geometry. No complete published source exists. They fail.
- **Count cutoffs of 10 and 5:** Neither comes from a standard, but the brief gives one reasonable alternative and requires both. This satisfies the check 4 bound. The numerator must be changed to one computable from named published plans or records.
- **Share cutoffs of 25 percent and one third:** The alternative is sufficient, but the required historical denominator has no complete published source. Make these conditional or remove them.
- **Planned-or-approved and occupied denominators:** No complete published era-by-era roster was identified. They fail as mandatory calculations.
- **Residential-land share and housing-mix figures:** Fair only under the existing condition that the cited publication supplies the numerator, denominator, geography, and year.
- **Current, cumulative, and era-by-era aggregation:** These are arithmetic over classified neighbourhoods. Cumulative counting is feasible after the GIS and denominator requirements are removed. The exact era-by-era shares are not.

## 5. Does the brief leak an expected finding?

OK.

The brief specifies evidence and reporting rules without naming which evidence should support or contradict either proposition. Its statement that no cutoff was selected with a result in view does not reveal an expected finding.

## 6. Is the claim checkable at all?

OK, once the operational defects above are fixed.

Both propositions are factual. Claim A can be tested with dated occupation and housing-form records. Claim B can be tested through named neighbourhood plans and other documented planning evidence. Neither proposition inherently requires an unavailable century-wide GIS reconstruction.

## 7. Scope traps

OK.

The brief consistently limits Claim B to Edmonton's historical boundaries and treats pre-annexation planning as context. The policy preference, current-zoning comparison, price effects, and council-priority judgement remain outside the story.

A holder of the view would recognize both claims and would welcome removal of the old density calculation, but would still object that an occupied 1926 house cannot pass an undefined area-predominance test and that missing historical map sheets control Claim B. An opponent would accept a count based on named published neighbourhood plans, provided a city-wide bylaw cannot silently add neighbourhoods without neighbourhood-level evidence and borderline instruments do not enter the primary count. Both sides can accept the cutoffs once the brief uses evidence the published record can actually supply.

Escalation is not triggered. This is the first framing check of the revised rerun. If the same finding remains OPEN or WEAKENED after two revisions, Stew must decide it in writing in the committed framing record, state the remaining objection, and freeze the brief with that record beside it.