# Review brief: Do Edmonton's bike lanes ease traffic congestion or make it worse?

Status: **FROZEN 2026-09-23 on PARKS CONFIRMED (`framing/check-4.md`,
methodology v1.35).** Checks 1, 2 and 3 (`framing/check-1.md`,
`check-2.md`, `check-3.md`), all from the OpenAI seat through
`scripts/panel/audit-package.sh`, each returned REVISE, and check 3
parked the brief under the v1.12 cap on 2026-09-16. Under v1.35 the
editor applied every standing finding of check 3 in the checker's
wording (`framing/response-3.md`), removed the three claims check 3
found uncheckable at the asserted level from the identified record, and
parked them on the register with the instrument that would reopen each.
The same seat confirmed the parks and re-applied checks 8 and 9 on
2026-09-23. One claim goes to the panel. One claim,
`79-street-relieves-75-street`, left the brief after check 1; see
"Dropped at the brief".
Drafted 2026-09-16, revised twice that day, and revised once more on
2026-09-23 by Stew.
Methodology v1.35.
Question id: `lanes-and-congestion`. Register entry: `intake/register.yaml`.

## The question

Four claims were captured from one source on one argument: what taking
road space for bike lanes has done to motor-vehicle traffic in Edmonton.
Two of them are the argument itself, asserted in opposite directions by
thirteen people and six. Two are the facts the argument is conducted
with: whether the City has in fact removed driving lanes for bike lanes,
and why it removed them.

Three of the four are not sent to the panel, because the published
Edmonton record identified at intake cannot answer them at the asserted
causal level. They are parked on the register, each with the instrument
that would reopen it; see "Parked at framing". Two further registered
claims are not sent either, one declined at triage as a truism and one
carried to the question it belongs to; see "Dropped at the brief".

One claim is under review:

- `city-removed-traffic-lanes`: whether the City has removed
  motor-vehicle through lanes for bike lanes across a geographically
  broad share of the city.

It carries its own verdict, panel agreement and evidence-basis label.
Reviewer confidence appears only beside the reviewer who gave it. It is
an antecedent fact: its verdict says what the City did, and is never
evidence that congestion rose or fell. The story that carries it leads
with the three parked claims and the reason the record cannot answer
them, and presents this claim's finding as what it is, not as the answer
to the question people are arguing about.

Topics: transportation, bike-lanes.

## How this question got here

Nobody chose it. The source was read end to end under methodology v1.15
to the limit the platform exposed (see `intake.md` on the capture), every
materially factual claim in it was extracted and merged, and
`scripts/intake-coverage.ts` proved nothing raised was lost. The
propositions were grouped into questions under v1.16 and both triage
readers returned GO on this one. It is scheduled now because, after the
one already answered, more people took part in it than in any other
question the register holds: 24 distinct commenters, 7 arguing one way,
16 the other, 1 neither. Those figures describe the accessible capture of
one thread, not how the argument circulates in Edmonton. Cost decides
when a question is checked, never whether.

Provenance of every wording is in `intake.md` in this directory, which
reviewers do not receive.

## Circulating forms

Summarised for the panel. Every wording below is a verbatim comment from
the captured source; none was composed here. Commenters carry stable
pseudonyms.

- **Lanes taken, congestion made.** Thirteen people: "Removing traffic
  lanes for cyclists and increasing the number of crossings increase
  congestion"; "they force traffic into one lane not two, impede turns,
  slow the flow of traffic significantly causing idling which creates
  more emissions"; "Now instead of 2 lanes you now have one. Now you have
  more cars backed up and more carbon"; "turn a two lane each way into a
  one lane each way so that cyclist feel safe, how exactly are you
  reducing congestion?"; "what was once 2 lanes of moving traffic is now
  one"; "It will also increase congestion in some areas"; "taking away
  from roadways (both in driving lanes and in roadside parking) adds to
  the congestion you see". Parked at framing; see below.
- **One less car.** Six people: "Using a bicycle helps reduce traffic
  congestion"; "Bike infrastructure reduces traffic congestion"; "The
  more cycling infrastructure there is, the fewer people there are
  driving in cars. The fewer people driving, the better Edmonton's
  traffic situation gets"; "every person who takes the bike lane is one
  less car, reducing congestion"; "every person on a bike is one less car
  in front of you!"; "the better they are the more people will choose
  them instead of driving". Parked at framing; see below.
- **They took the lanes.** Four people, answering someone who said the
  City has not removed driving lanes: "102nd Ave between 121st and 111th.
  Used to be 2 ways, now one way with a bike lane. 102 Ave east of 109 St
  also reduced traffic lanes for bicycle lanes"; "they absolutely have
  removed traffic lanes all throughout the city"; "they sure have removed
  Traffic lanes and replaced with bike lanes! Just check out what they
  did on 132nd ave!" This is the claim under review.
- **Not for the bikes.** One person, answering the three above: "they are
  not removing lanes for cyclists. They are removing lanes for traffic
  calming measures and in places where applicable putting bike Lanes
  there to save money combining the two"; "Even if they had never planned
  bike lanes for hermatige road they are still getting traffic calming
  measures". Parked at framing; see below.
- **79 Street.** One person, whose claim is carried to the 79 Street
  question and is not tested here: "It is an important street for
  alleviating traffic from 75 St and for people to navigate & drive their
  kids to school before work."

## Who asks this

A driver stuck on a street that lost a lane asks: did the bike lane do
this? A resident asks: does Edmonton's bike network actually move enough
trips out of cars to make citywide traffic meaningfully faster than it
would otherwise be? Another asks: were those lanes going to be removed
for traffic calming anyway, with bike lanes added to work already
proceeding to combine projects or save money? The published Edmonton
record identified at intake cannot answer any of those three at the
asserted causal level, and this brief says so rather than test a cousin
of each; the instrument that would answer each is named under "Parked at
framing".

A resident also asks: did Edmonton really remove through lanes for bike
lanes across much of the city? A reporter asks: which streets, and when?
The claim under review answers those; it does not answer whether
congestion changed.

## What is measured, and by whom

**The City's record of what it built.** Bike route project pages, design
drawings, council and committee reports, and the Bike Plan and its 2021
to 2026 Implementation Guide establish which corridors had a
motor-vehicle lane removed and a bike lane added. These are the
instrument for the claim under review.

**The counting unit.** Use the City's Bike Routes – On Street GIS layer.
Reviewers are given an accessible immutable export captured on
2026-09-23, with its URL, capture time and checksum, in the package that
accompanies this brief: `snapshot/bike-routes-on-street.geojson`, 3,175
features, captured 2026-09-23T15:17:38Z to 15:17:40Z from
`https://gis.edmonton.ca/site1/rest/services/Overlay_Public/Common_Layers/MapServer/236/query`,
SHA-256
`51f5e628b42c5c4b9ba17664810b5da0b5544c05d95863abf0ee6821a32ece6f`
(`snapshot/README.md`). The live layer URL is recorded as provenance but
does not substitute for the dated snapshot. A corridor is one route
identified as a single project with stated endpoints in the City's
project record. Where no project route exists, group contiguous inventory
features with the same street name and facility type between documented
endpoints; split at a physical gap or change of street. Report the result
again using individual inventory features as the reasonable alternative
unit and state whether it changes any classification.

## Dates fixed in this brief

**As-of date (freeze date):** 2026-09-23, the date the inventory snapshot
was captured. Anything decided or published after this date is out of
scope.

**Reference periods.** The set of converted corridors is as it stood on
the as-of date; routes under re-evaluation after the 2026-08-26 committee
meeting are in the set if built, out if not, and named either way.

**Currency of the record.** For every figure, reviewers state the
publication date and the last-updated date of the document or dataset
used, and whether a newer release existed on the as-of date.

## Geography

The City of Edmonton, the municipal boundary, is the geography. The claim
under review is about a set of corridors inside it. Where it counts
areas, an area is one of the 15 district-plan areas shown in the City's
plans in effect and adopted through the applicable district-plan bylaw;
Charter Bylaw 24000 supplies the District Policy, not the individual area
boundaries.

## Claims under review

### The claim under review, id: `city-removed-traffic-lanes` (claim 3 in the checked brief)

**Normalized proposition:** The City of Edmonton has removed motor-vehicle
through lanes for bike lanes across a geographically broad share of
Edmonton.

**Why this reading.** The holders answer someone who said the City has
not removed traffic lanes for bike lanes. Two name streets, 102 Avenue and
132 Avenue; two say "all throughout the city". The examples are offered
for the generalisation, so the generalisation is the claim, and it is
held to what "all throughout the city" fairly means: not a few streets in
one or two areas, but a broad share of the city's districts. Individual
examples and a smaller spread support only the examples or a partial
finding, not "all throughout".

**What is counted, fixed here.** In the counting unit fixed above, a
corridor counts if the City's own project record, design drawings,
council or committee reports show that a lane used by through
motor-vehicle traffic was removed and a bike lane installed in the space,
or in space that included it, on that segment. A parking lane converted
to a bike lane does not count; a lane converted because the City rebuilt
a street for other stated reasons counts here, and the reason is reported
as a qualification, never a verdict. Reviewers list every corridor they
find with the segment, the year, the document and what the lane was
before. The two named examples are checked as stated: whether 102 Avenue
between 121 Street and 111 Street was two-way and is now one-way with a
bike lane, whether 102 Avenue east of 109 Street lost through lanes to
bike lanes, and what was done on 132 Avenue.

**Thresholds.** Let T be the number of on-street bike-lane corridors in
the City's inventory that were built by the as-of date, and let R be the
number of those corridors for which the City's project record establishes
prior lane use. Let C be the number of corridors that count, and let A be
the number of distinct district-plan areas, as fixed under "Geography",
in which at least one qualifying corridor lies.

- **Not established** if C is zero and R is less than T. Read first.
- **Contradicted** if C is zero and R equals T.
- The Supported and Partially supported rows apply when C is at least 1:
- **Supported** if A is at least 8 of the 15 district-plan areas.
- **Partially supported** if C is at least 1 and A is less than 8.

Alternative threshold, results required under both: Supported at A of at
least 5. These are judgement thresholds rather than pre-existing
standards, which is why both are reported. The result is also reported
again in the alternative counting unit, individual inventory features,
with a statement of whether it changes the classification.

**Qualifications reported, never carrying the verdict:**

1. For each named example, state whether the described change occurred
   and report the contemporaneous reason the City's record gives,
   including any reason other than installation of the bike lane.
2. The total length of bike lanes in the City's inventory that sit in
   former through lanes, as a share of the network, where the City
   publishes it.
3. C itself, and the list, so a reader can see how many corridors the
   finding rests on whichever row it lands in.

**What this claim does not test.** Whether the removals were right;
what they did to traffic; why they were done. The last two are the parked
claims below.

## Parked at framing

Framing check 3 found, and the editor agrees, that the brief identified
no published instrument capable of meeting the decisive definitions for
the three claims below: the named Downtown evaluation describes traffic
counts and monitoring, not an attribution-capable before-and-after
travel-time study; Navigating Tomorrow measures regional travel behaviour;
and the identified Hermitage Road decision report documents the design
and traffic-calming program without the passage the fourth claim needs.
Naming general classes of documents is not identifying a source from
which the required calculation can plausibly be made. Each claim is
therefore removed from the panel as uncheckable rather than frozen on a
ladder whose endpoint evidence has no plausible published source, and
the brief states that the published Edmonton record identified at intake
cannot answer it at the asserted causal level. Each is parked on the
register on the no-instrument ground, parked at framing, with the
instrument that would reopen it:

1. `lane-removal-increases-congestion` (claim 1 in the checked brief,
   thirteen people): reopens on attributed before-and-after peak-period
   travel time or delay on a converted Edmonton corridor, published by
   the City or in a study with a design capable of supporting the
   attribution.
2. `bike-infra-reduces-congestion` (claim 2, six people): reopens on an
   Edmonton study of infrastructure-attributable substitution linked to a
   citywide delay estimate.
3. `lanes-removed-for-traffic-calming` (claim 4, one person): reopens on
   a contemporaneous City record addressing both the without-the-bike-lane
   counterfactual and the combined-project or savings component.

The three parks cut both ways: the first is the anti-lane side's claim,
the second and third are the pro-lane side's. Their check-3 ladders,
the checker's replacement wording for them, and the editor's agreement
are in `framing/check-3.md` and `framing/response-3.md`. Nothing about
them is deleted; the register carries their wordings and provenance.

## Dropped at the brief

Two registered claims are not sent to the panel.

`roads-carry-goods-and-services` (register claim 22). Both triage readers
declined it, independently, as a truism: that roads carry deliveries,
buses and emergency vehicles is accepted by both sides of this argument,
and a verdict on it would tell a reader nothing. The register carries
that decision with its reason.

`79-street-relieves-75-street` (register claim 23). Framing check 1 found,
and the editor agrees, that road classification, a volume figure and a
school's proximity do not test what the commenter asserted, which is that
79 Street takes traffic that would otherwise use 75 Street and that
parents drive children to school along it; and that the claim belongs
with the registered question about the 79 Street route, not with what
completed lane conversions did to congestion. It is carried to that
question, not declined. `register-note.md` records the instruments that
brief must find for it, or drop it for want of. The commenter's words
stay in `intake.md`, and the story will say the claim was carried and
why.

## Stakes

What each verdict would change, for the person making the claim and for
the person arguing against it. Stated without any view of which way any
of them comes out. Stakes are retained only for the claim for which a
plausible qualifying instrument is identified; for the three parked
claims, the published Edmonton record identified at intake cannot answer
them at the asserted causal level, and no verdict on the remaining claim
settles any of them.

**They took the lanes.** Supported means holders establish broad
geographic occurrence and opponents must withdraw a blanket denial.
Contradicted means holders must withdraw the claim that any through lane
was removed and opponents may maintain the denial. Partially supported
means specific removals are established but "all throughout" is not. Not
established means the prior-use record is too incomplete for either
side's generalisation.

## Scope

**Geography:** the City of Edmonton, as fixed above.

**Time:** nothing published after 2026-09-23.

**Out of scope**, each of these being a separate registered question, a
claim parked above, or a question the site does not test:

- what the lane conversions did to motor-vehicle travel time or delay,
  and whether cycling infrastructure changes citywide congestion, which
  are the parked claims;
- why the City removed any lane, which is the third parked claim;
- whether bike lanes should be built, paused or removed;
- what the lanes cost and how that compares with road spending;
- how many people cycle and how much the lanes are used;
- whether cycling is safe, and where cyclists ride;
- whether Edmonton winters make cycling practical;
- snow clearing on lanes or streets;
- what 79 Street does and what the City did or planned there and outside
  the Holyrood school, which are separate registered questions;
- what council decided on 2026-08-26 and on whose recommendation;
- whether bike lanes block emergency vehicles, which is a separate
  registered question;
- any claim about an identifiable individual's conduct or motives;
- whether any of these facts justifies any decision.

## Required calculations

- For every figure reported: the corridor and segment, the period, the
  instrument, the document and its publication date, stated together.
- T and R; the corridor list with segment, year, prior lane use,
  document and district-plan area; C and A under both thresholds and in
  both counting units; the three named examples checked as stated.

All figures reported to the precision the source publishes, never
further. Where a reviewer computes a figure the source does not publish,
the arithmetic is shown and it is labelled as the reviewer's calculation.

## Reviewer instructions of special note

- **This claim is an antecedent fact.** Its verdict says what the City
  did. It is never evidence that congestion rose or fell, and the parked
  claims are not answered by it in either direction.
- **The City's document, not the news report.** A news article is a lead
  to the document behind it, never the source of a verdict figure. Name
  the document, its identifier, its page and its date.
- **Report one verdict** under the primary reading and thresholds fixed
  here, and put every alternative reading's result in
  `interpretation_notes` or `limitations`. The schema carries one verdict
  per claim.
- **Record every source URL in full**; you have no repo access.
- **Bound every absence.** If the City's record does not establish prior
  lane use for a corridor, say what you searched, for which corridor, and
  as of when. "We did not find it" is not "it does not exist".
- If a definition, threshold, fallback or date in this brief changes what
  the honest answer is, record a MATERIAL FRAMING CONCERN per
  `prompts/reviewer.md` and answer the claim as posed alongside it.
