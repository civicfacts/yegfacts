# Review brief: Do Edmonton's bike lanes ease traffic congestion or make it worse?

Status: **REVISED after framing check 2, not frozen.** Check 1
(`framing/check-1.md`) and check 2 (`framing/check-2.md`), both from the
OpenAI seat through `scripts/panel/audit-package.sh`, returned REVISE.
Each report's defect findings are corrected in the checker's exact
wording and each report's framing findings are answered, with what
changed, in `framing/response-1.md` and `framing/response-2.md`. One
claim, `79-street-relieves-75-street`, left the brief after check 1; see
"Dropped at the brief". The brief goes back for check 3, the last the cap
allows. The freeze is the sha256 of this file, recorded in
`run-record.md` with the one line that recomputes it, once a check
returns FRAME OK.
Drafted 2026-09-16 and revised twice the same day by Stew.
Methodology v1.32.
Question id: `lanes-and-congestion`. Register entry: `intake/register.yaml`.

## The question

Four claims, all captured from one source, on one argument: what taking
road space for bike lanes has done to motor-vehicle traffic in Edmonton.
Two of them are the argument itself, asserted in opposite directions by
thirteen people and six. Two are the facts the argument is conducted
with: whether the City has in fact removed driving lanes for bike lanes,
and why it removed them. Two further registered claims are not sent to
the panel, one declined at triage as a truism and one carried to the
question it belongs to; see "Dropped at the brief".

Claims in this question, reviewed and reported separately:

- `lane-removal-increases-congestion`: whether converting a motor-vehicle
  through lane to a bike lane caused motor-vehicle congestion to rise on
  the Edmonton corridors where it was done.
- `bike-infra-reduces-congestion`: whether Edmonton's cycling
  infrastructure has been shown to reduce motor-vehicle congestion across
  the city by moving trips out of cars.
- `city-removed-traffic-lanes`: whether the City has removed
  motor-vehicle through lanes for bike lanes across a geographically
  broad share of the city.
- `lanes-removed-for-traffic-calming`: whether, where the City removed a
  through lane and added a bike lane, its own record says the lane would
  have gone for traffic calming anyway and the bike lane was added to
  work already proceeding to combine projects or save money.

Each claim carries its own verdict, panel agreement and evidence-basis
label. Reviewer confidence appears only beside the reviewer who gave it.

The first two claims are not each other's negation and must not be
treated as one finding read twice. A corridor can carry more cyclists and
the same number of cars; a corridor can lose a lane and lose nothing in
travel time; a corridor can lose travel time while a parallel street gains
the traffic. Each claim is reached on its own instrument, and where the
same City document serves both, each claim's `limitations` says so. The
last two claims are antecedent facts: their verdicts say what the City did
and why, and are never evidence that congestion rose or fell.

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
  the congestion you see".
- **One less car.** Six people: "Using a bicycle helps reduce traffic
  congestion"; "Bike infrastructure reduces traffic congestion"; "The
  more cycling infrastructure there is, the fewer people there are
  driving in cars. The fewer people driving, the better Edmonton's
  traffic situation gets"; "every person who takes the bike lane is one
  less car, reducing congestion"; "every person on a bike is one less car
  in front of you!"; "the better they are the more people will choose
  them instead of driving".
- **They took the lanes.** Four people, answering someone who said the
  City has not removed driving lanes: "102nd Ave between 121st and 111th.
  Used to be 2 ways, now one way with a bike lane. 102 Ave east of 109 St
  also reduced traffic lanes for bicycle lanes"; "they absolutely have
  removed traffic lanes all throughout the city"; "they sure have removed
  Traffic lanes and replaced with bike lanes! Just check out what they
  did on 132nd ave!"
- **Not for the bikes.** One person, answering the three above: "they are
  not removing lanes for cyclists. They are removing lanes for traffic
  calming measures and in places where applicable putting bike Lanes
  there to save money combining the two"; "Even if they had never planned
  bike lanes for hermatige road they are still getting traffic calming
  measures".
- **79 Street.** One person, whose claim is carried to the 79 Street
  question and is not tested here: "It is an important street for
  alleviating traffic from 75 St and for people to navigate & drive their
  kids to school before work."

## Who asks this

A driver stuck on a street that lost a lane asks: did the bike lane do
this? A person who rides asks: is it true that we're making traffic
worse, or better? A reporter asks: has the City measured what its lane
conversions did to traffic, and what did it find? A resident also asks:
did Edmonton really remove through lanes for bike lanes across much of
the city? Another asks: were those lanes going to be removed for traffic
calming anyway, with bike lanes added to work already proceeding to
combine projects or save money? Claims 3 and 4 answer those two questions
separately; they do not answer whether congestion changed. The
propositions below answer these questions at the level the record answers
them, which is corridor by corridor where the City measured, and they say
so where the record does not reach the level people ask at, the whole
city.

## What is measured, and by whom

Four instruments recur, fixed here so that every claim names the same
thing by the same name.

1. **The City's own before-and-after evaluations of lane conversions.**
   Where the City converted a motor-vehicle lane to a bike lane it has,
   for some corridors, published evaluation reports or council reports
   carrying vehicle counts, travel times or delay before and after the
   change: the Downtown Bike Network evaluation programme begun in 2017
   and its interim report, project pages and "what we heard" reports for
   later routes, and the administration reports to Council and its
   committees on the bike-lane program, including the 2026-08-26
   Infrastructure Committee package already in this site's evidence
   registry. These are the primary instrument for the two congestion
   claims. Reviewers establish which corridors have such a measurement
   published by the as-of date, and for each, whether the evaluation's
   design can support attributing a change to the conversion.
2. **Average Annual Weekday Traffic (AAWDT).** Use the Open Data AAWDT
   dataset ("Average Annual Weekday Traffic Volumes", covering 2011 to
   2022 in the dataset as titled on the as-of date) and the AAWDT map and
   spreadsheet on the City's Transportation Data page for seasonally
   adjusted weekday volumes. Treat files on the Traffic Volumes and
   Turning Movements page as survey-period ADT or turning-movement counts
   unless the file itself identifies an AAWDT measure, and report them
   under that name. Volume is not congestion; a corridor that lost half
   its cars may be less congested or may have sent them to the next
   street. AAWDT is context for the congestion claims, never their
   primary.
3. **The City's record of what it built.** Bike route project pages,
   design drawings, council and committee reports, and the Bike Plan and
   its 2021 to 2026 Implementation Guide establish which corridors had a
   motor-vehicle lane removed and a bike lane added, and what reason the
   City gave. These are the instrument for claims 3 and 4.
4. **Cycling counts and mode share.** The City's automated bicycle
   counters and the current Navigating Tomorrow Household Travel Survey,
   and the historical 2015 Edmonton and Region Household Travel Survey
   where that is the release used, both already tested under the question
   `cycling-volumes`, are context for claim 2 and never carry a verdict
   here. The travel survey measures regional travel patterns and modes;
   it is not a route-user counterfactual instrument and does not count
   toward claim 2's S.

**The counting unit.** Use the City's Bike Routes - On Street GIS layer
as the inventory, snapshotted on the as-of date. A corridor is one route
identified as a single project with stated endpoints in the City's
project record. Where no project route exists, group contiguous inventory
features with the same street name and facility type between documented
endpoints; split at a physical gap or change of street. Report the result
again using individual inventory features as the reasonable alternative
unit and state whether it changes any classification. Claims 1, 3 and 4
count in this unit.

**Congestion** is fixed for this brief as motor-vehicle delay on a
corridor. Primary definition: change in peak-period average travel time
or delay. Alternative definition, reported where the City publishes the
inputs: change in peak-period queue or level of service, or in
travel-time reliability; reviewers state whether the alternative changes
the claim's classification. Where a City document reports one of those
measures instead of travel time, reviewers report the document's own
measure and say how it maps. Vehicle volume remains contextual and is not
itself congestion.

**Peak period and windows.** Primary: use the peak period and before and
after windows expressly defined by the City evaluation, because those are
pre-existing published windows rather than periods selected after seeing
the result. Alternative: where the same publication supplies the inputs,
report the result for matched calendar periods and for all-day or other
published periods. State whether either alternative changes the
classification; where the inputs are not published, identify the
unavailable alternative without imputing a result.

## Dates fixed in this brief

**As-of date (freeze date):** 2026-09-16. Anything decided or published
after this date is out of scope.

**Reference periods.** Each before-and-after comparison takes the windows
fixed above. AAWDT takes the most recent year published for the corridor
and the year before the conversion, both named. The set of converted
corridors is as it stood on the as-of date; routes under re-evaluation
after the 2026-08-26 committee meeting are in the set if built, out if
not, and named either way.

**Currency of the record.** For every figure, reviewers state the
publication date and the last-updated date of the document or dataset
used, and whether a newer release existed on the as-of date.

## Geography

The City of Edmonton, the municipal boundary, is the geography for every
claim. Claims 1, 3 and 4 are about a set of corridors inside it; claim 2
is about the city, and its ladder says what the record must show at that
level. Where a claim counts areas, an area is one of the 15 district-plan
areas shown in the City's plans in effect and adopted through the
applicable district-plan bylaw; Charter Bylaw 24000 supplies the District
Policy, not the individual area boundaries.

## Claims under review

### Claim 1, id: `lane-removal-increases-congestion`

**Normalized proposition:** Removing a motor-vehicle through lane to
install a bike lane caused peak-period average motor-vehicle travel time
or delay on the converted corridor to rise by at least 10 per cent, with
the result at 5 per cent reported as the alternative.

**Why this reading.** Thirteen people said it, and the mechanism nearly
all of them name is a through lane removed: "two lanes to one", "force
traffic into one lane not two". They say the removal causes the
congestion, so the claim is causal and is tested as one: an uncontrolled
before-and-after difference is not attribution. The claim is about the
corridors where the removal was done and is asserted as a general result
of doing it, so it is tested as a generalisation over the converted
corridors, with a coverage rule so that a few measured corridors cannot
carry a verdict about the program. Idling and emissions are reported as a
separate consequence and do not carry this verdict.

**What is counted, fixed here.** Let Q be the number of qualifying
converted corridors; Q equals C as established under claim 3, in the
counting unit fixed above. Let M be the number of those Q corridors with
a qualifying published measurement: the City's published before-and-after
peak-period motor-vehicle travel time or delay on that corridor. A
corridor counts toward U only where the City evaluation expressly
attributes the change to the conversion or uses a comparison,
counterfactual or other design capable of supporting that attribution;
an unadjusted before-and-after difference is reported as a qualification
and does not by itself carry the causal verdict. A corridor with no
qualifying measurement is in Q but cannot carry evidence either way, and
the story reports how many of the converted corridors the City measured
at all.

**Thresholds.** Let U be the number of the M corridors where, on an
attribution-capable evaluation, peak-period travel time or delay rose by
at least 10 per cent after the conversion, on the City's own figures.

Coverage, applied first and independently for each threshold. For the
primary verdict, if M is less than one-half of Q, the result is **Not
established**; otherwise apply the ladder below. Separately, for the
one-third alternative, if M is less than one-third of Q, the alternative
result is **Not established**; otherwise apply the same ladder. Report
the one-third result only in `interpretation_notes` or `limitations`.

The ladder:

- **Supported** if M is at least 3 and U is more than half of M.
- **Partially supported** if M is at least 3 and U is at least one but
  not more than half of M; or if M is 1 or 2 and U is at least 1.
- **Contradicted** if M is at least 3 and U is zero.
- **Not established** if M is zero, or if M is 1 or 2 and U is zero,
  because one or two measured corridors with no increase cannot carry a
  verdict against a claim made about a program.

Alternative cutoff, results required under both: a rise of at least 5
per cent in place of 10. Neither cutoff comes from an identified
pre-existing standard. Ten and five per cent are predeclared judgment
cutoffs, and results are required under both. The minimum of three
measured corridors is a judgment cutoff; report the ladder again with a
minimum of five as the reasonable alternative and state whether the
result changes; the primary verdict remains the three-corridor result. No
cutoff may be changed after the figures are seen.

**Qualifications reported, never carrying the verdict:**

1. Every unadjusted before-and-after difference on a measured corridor,
   reported as a difference and not as an effect.
2. Vehicle volume (AAWDT) before and after on each measured corridor, and
   where the City reports it, on the parallel streets it names as
   diversion routes. A corridor whose travel time held because its
   traffic went elsewhere is reported as exactly that.
3. The alternative congestion measures, queue or level of service and
   reliability, and the alternative periods, where the City publishes
   them, and whether they change the classification.
4. Whether any City evaluation measured the whole network's travel times
   rather than one corridor's, and what it found.
5. Idling and emissions: reviewers determine whether an Edmonton-specific
   published measurement exists and bound any reported absence by source,
   corridor, period and search date.
6. Whether the measured corridors are the ones commenters named (102
   Avenue, 132 Avenue, Hermitage Road) or others.

**What this claim does not test.** Whether the lanes should have been
built; whether traffic is worse in Edmonton generally; anything a
commenter saw from a car.

### Claim 2, id: `bike-infra-reduces-congestion`

**Normalized proposition:** Edmonton's cycling infrastructure has been
shown to reduce motor-vehicle congestion across the city by moving trips
out of cars.

**Why this reading.** Six people said it, and the mechanism every one
names is substitution: a person on a bike is a person not driving. The
strongest fair reading keeps the consequence they assert, less
congestion, the cause they assert, the infrastructure, and the scale
they assert, the city: "the better Edmonton's traffic situation gets". A
proposition that only said "a bicycle trip is not a car trip" would be a
truism, and a verdict on it would tell no one anything. So the claim is
tested as a claim about a demonstrated causal chain at Edmonton citywide
scale, and local evidence is reported as local.

**What is counted, fixed here.** Two links, both from published Edmonton
evidence. S counts only studies that directly estimate infrastructure-
attributable substitution from driving to cycling through a stated
counterfactual method: a route-user survey asking what the trip would
otherwise have been, a before-and-after design with a comparison
corridor, or an equivalent method the study states. D10 counts linked
studies or network analyses attributing a peak-period travel-time or
delay reduction of at least 10 per cent to that substitution; D5 counts
the same at 5 per cent. The primary verdict uses D10; the D5 result is
required in `interpretation_notes` or `limitations`. For each entry in S
or D, reviewers state the population or network it evaluates and whether
its stated inference covers Edmonton citywide or a corridor or local
population. Unlinked bicycle and vehicle counts, on the same corridor or
elsewhere, are qualifications and count toward neither.

**Thresholds.**

- **Supported** only if published evidence connects infrastructure-
  attributable substitution (S) and reduced delay (D10) in an evaluated
  population or network whose stated inference covers Edmonton citywide.
- **Partially supported** if both links are connected only for a
  corridor or local population, or if citywide evidence establishes one
  or both links without connecting them in one evaluated population or
  network.
- **Contradicted** only if comparable citywide causal or network evidence
  points against the claimed reduction.
- **Not established** if neither citywide link is established and no
  comparable citywide contrary evidence exists.

Local evidence is reported as local; it cannot carry either citywide
endpoint verdict.

**Qualifications reported, never carrying the verdict:**

1. The share of trips made by bicycle in Edmonton from the most recent
   published regional travel survey, already established under
   `cycling-volumes`, as context for what scale of substitution is
   possible.
2. Any City statement of the purpose of the bike network in its own
   plans, and whether reducing congestion is among the purposes it names.
3. Coincident before-and-after counts on converted corridors, bicycle and
   motor-vehicle, reported as counts and not as substitution.
4. Every local or corridor-scale entry in S or D, reported under its own
   scale.

**What this claim does not test.** Whether cycling infrastructure
reduces congestion in other cities; whether it should; the health and
pollution consequences one holder listed.

### Claim 3, id: `city-removed-traffic-lanes`

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
a street for other stated reasons counts here and its reason is claim 4's
business. Reviewers list every corridor they find with the segment, the
year, the document and what the lane was before. The two named examples
are checked as stated: whether 102 Avenue between 121 Street and 111
Street was two-way and is now one-way with a bike lane, whether 102
Avenue east of 109 Street lost through lanes to bike lanes, and what was
done on 132 Avenue.

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
what they did to traffic (claim 1); why they were done (claim 4).

### Claim 4, id: `lanes-removed-for-traffic-calming`

**Normalized proposition:** Where the City of Edmonton removed a
motor-vehicle through lane and installed a bike lane, its contemporaneous
record says the lane would have been removed for traffic calming even
without the bike lane, and that adding the bike lane during the work
combined projects or saved money.

**Why this reading.** One person, answering the three holders of claim 3:
the lanes went for traffic calming, and bike lanes were added where that
work was already happening, "to save money combining the two". Hermitage
Road is the example. The claim is about the City's stated reasons, which
its own documents answer, and it is tested over the same corridors as
claim 3. Both halves of what the holder said are conditions of the
verdict: that the lane would have gone for calming anyway, and that the
bike lane was added to work already proceeding to combine projects or
save money. Traffic calming is the primary reading, because that is the
reason the holder gave. Street renewal, transit priority, LRT
construction, generic safety and other reasons are reported separately as
qualifications and do not count as traffic calming unless the City
document expressly links them to a traffic-calming lane removal.

**What is counted, fixed here.** For each corridor that counts under
claim 3, the reason the City's own contemporaneous record gives for the
lane removal. "Contemporaneous" means a document published before or at
the approval of the lane-removal design, not a later retrospective
explanation: the project page as it stood, the design rationale, the
council or committee report that approved it. Traffic calming counts
where the document uses that term or expressly says the lane removal was
intended to reduce motor-vehicle speed or through volume. Generic safety,
renewal, streetscaping, multimodal accommodation or operational
improvement does not count without that express link. A document merely
naming traffic calming as one purpose does not establish that the lane
would have been removed without the bike lane. No stated reason is no
evidence.

**Thresholds.** Let C be the qualifying corridors with a contemporaneous
reason record; O those where the record expressly says the through-lane
removal would have proceeded for traffic calming without the bike lane; K
those where the record says the bike lane was added to work already
proceeding to combine projects or save money; and J those satisfying both
O and K on the same corridor.

- **Supported** if C is at least 3 and J is more than half of C.
- **Partially supported** if at least one of O or K is non-zero and
  Supported does not apply.
- **Contradicted** if C is at least 3, O and K are both zero, and the
  records affirmatively give incompatible accounts.
- **Not established** otherwise.

No alternative cutoff on the share: the verdict turns on a majority of
documented corridors, and there is no second way to count a majority. The
minimum of three documented corridors is a judgment cutoff; report the
ladder again with a minimum of five as the reasonable alternative and
state whether the result changes; the primary verdict remains the
three-corridor result. Where claim 3 finds no corridor at all, this claim
is Not established, and the two findings are reported together.

**Qualifications reported, never carrying the verdict:**

1. Hermitage Road specifically: what the City's contemporaneous record
   says was done and why.
2. For each corridor, the record's stated reason in its own words, and
   which of O and K it satisfies.
3. Corridors whose stated reason is renewal, transit priority, LRT
   construction, safety or another purpose without an express
   traffic-calming link, listed under those reasons.
4. Whether the City's active transportation program documents state a
   policy of pairing bike routes with renewal or calming work, and what
   they say.

**What this claim does not test.** Whether the City's stated reasons are
its real reasons; whether calming was needed.

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
of them comes out.

**Claim 1, lanes taken, congestion made.** Supported means holders gain
adequately covered Edmonton evidence attributing the threshold increase
in congestion to the lane conversions; opponents must concede that
attributable result. Contradicted means comparable adequately covered
evidence points against an attributable increase at the fixed cutoff;
holders must abandon the general causal claim and opponents may cite the
record. Partially supported means both sides must accept heterogeneous
corridor results. Not established means neither side gains an effect
conclusion; only the measurement gap is established, and the story
reports it as a fact about the record. A mere temporal increase or
decrease changes neither side's causal position.

**Claim 2, one less car.** Supported requires the connected causal chain
at Edmonton citywide scale, and means holders gain that evidence and
opponents must concede the chain. Contradicted means comparable citywide
evidence points against it; holders must abandon the Edmonton causal
claim. A connected local effect is Partially supported and cannot require
either side to concede the citywide generalisation. Not established means
neither the arithmetic argument nor its rejection has been demonstrated
in Edmonton at that scale; the holders keep their arithmetic and lose the
claim that it has been shown to work here.

**Claim 3, they took the lanes.** Supported means holders establish broad
geographic occurrence and opponents must withdraw a blanket denial.
Contradicted means holders must withdraw the claim that any through lane
was removed and opponents may maintain the denial. Partially supported
means specific removals are established but "all throughout" is not. Not
established means the prior-use record is too incomplete for either
side's generalisation.

**Claim 4, not for the bikes.** Supported means the holder establishes
both that traffic calming would independently have removed the lanes on
the required share and that the bike lanes were added to proceeding work
to combine projects or save money; opponents must answer those records.
Partially supported means only one component or a smaller share is
established. Contradicted means comparable records affirmatively point
against both components. Not established means the records cannot decide
the asserted counterfactual and combination account.

## Scope

**Geography:** the City of Edmonton, as fixed above.

**Time:** as fixed per claim above; nothing published after 2026-09-16.

**Out of scope**, each of these being a separate registered question or a
question the site does not test:

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

Shared across claims:

- For every figure reported: the corridor and segment, the period, the
  instrument, the document and its publication date, stated together. A
  travel time without its corridor and period is not a finding.
- The corridor list built under claim 3 is the same list used in claims
  1 and 4. It is built once, from the City's record in the counting unit
  fixed above, and each claim reads it; the list is reported in full with
  the document behind each entry, and once more in the alternative unit.
- Every ladder with a minimum of three corridors is reported again at a
  minimum of five, with a statement of whether the result changes.

Claim 1: Q; for each of the Q corridors, whether a before-and-after
travel-time or delay measurement is published and whether its design is
attribution-capable; for each measured corridor, the before figure, the
after figure, the periods, and the percentage change; M and U under both
cutoffs; M over Q against both coverage thresholds, each applied
independently.

Claim 2: S, D10 and D5 as defined, each entry with its document, its
method, the population or network it covers and whether its stated
inference is citywide; any contrary citywide study of the same kind; the
cycling mode share figure and survey named as context.

Claim 3: T and R; the corridor list with segment, year, prior lane use,
document and district-plan area; C and A under both thresholds and in
both counting units; the three named examples checked as stated.

Claim 4: for each corridor on the list, the contemporaneous document,
its stated reason in the document's words, and which of O and K it
satisfies; C, O, K and J.

All figures reported to the precision the source publishes, never
further. Where a reviewer computes a change the source does not publish,
the arithmetic is shown and it is labelled as the reviewer's calculation.

## Reviewer instructions of special note

- **Volume is not congestion.** This brief fixes congestion as delay. A
  corridor that lost cars is reported as having lost cars; whether it got
  faster is a separate figure, and a corridor that got faster because its
  cars went to the next street is reported with the next street's figure
  beside it.
- **A difference is not an effect.** A before-and-after difference
  without an attribution-capable design does not establish claim 1's
  causal assertion. A stated co-purpose without an express counterfactual
  does not establish that traffic calming would have removed the lane
  anyway under claim 4. If the required record is absent, return Not
  established rather than substitute the proxy.
- **Build the corridor list once and share it.** Claims 1, 3 and 4 read
  one list, in one counting unit. Report it in full under claim 3 and
  refer to it from the others.
- **Do not let one claim answer another.** A Supported on claim 1 is not
  a Contradicted on claim 2, and the reverse; each has its own
  instrument and thresholds. Claims 3 and 4 are antecedent facts about
  what the City did and why; their verdicts are never evidence that
  congestion rose or fell. Say in `limitations` where one document served
  two claims.
- **The City's document, not the news report.** A news article is a lead
  to the document behind it, never the source of a verdict figure. Name
  the document, its identifier, its page and its date.
- **Report one verdict per claim** under the primary reading and
  thresholds fixed here, and put every alternative reading's result in
  `interpretation_notes` or `limitations`. The schema carries one verdict
  per claim.
- **Record every source URL in full**; you have no repo access.
- **Bound every absence.** If the City published no before-and-after
  measurement for a corridor, say what you searched, for which corridor
  and period, and as of when. "We did not find it" is not "it does not
  exist".
- If a definition, threshold, fallback or date in this brief changes what
  the honest answer is, record a MATERIAL FRAMING CONCERN per
  `prompts/reviewer.md` and answer the claims as posed alongside it.
