# Review brief: Do Edmonton's bike lanes ease traffic congestion or make it worse?

Status: **DRAFT, not frozen.** Awaiting the framing check (stage 1). The
freeze is the sha256 of this file, recorded in `run-record.md` with the
one line that recomputes it, once the check returns FRAME OK.
Drafted 2026-09-16 by Stew.
Methodology v1.32.
Question id: `lanes-and-congestion`. Register entry: `intake/register.yaml`.

## The question

Five claims, all captured from one source, on one argument: what taking
road space for bike lanes has done to motor-vehicle traffic in Edmonton.
Two of them are the argument itself, asserted in opposite directions by
thirteen people and six. Three are the facts the argument is conducted
with: whether the City has in fact removed driving lanes for bike lanes,
why it removed them, and what one named street does. A sixth registered
claim, that roads carry goods and services, was declined at triage as a
truism and is not sent to the panel; see "Dropped at the brief".

Claims in this question, reviewed and reported separately:

- `lane-removal-increases-congestion`: whether converting a motor-vehicle
  lane to a bike lane has increased motor-vehicle congestion on the
  Edmonton corridors where it was done.
- `bike-infra-reduces-congestion`: whether Edmonton's cycling
  infrastructure has reduced motor-vehicle congestion by moving people
  out of cars.
- `city-removed-traffic-lanes`: whether the City has removed
  motor-vehicle through lanes and replaced them with bike lanes on
  streets across the city.
- `lanes-removed-for-traffic-calming`: whether, where the City removed a
  through lane and added a bike lane, its stated reason for the lane
  removal was something other than the bike lane.
- `79-street-relieves-75-street`: whether 79 Street carries through
  traffic that would otherwise use 75 Street and serves as a route to
  school.

Each claim carries its own verdict, panel agreement and evidence-basis
label. Reviewer confidence appears only beside the reviewer who gave it.

The first two claims are not each other's negation and must not be
treated as one finding read twice. A corridor can carry more cyclists and
the same number of cars; a corridor can lose a lane and lose nothing in
travel time; a corridor can lose travel time while a parallel street gains
the traffic. Each claim is reached on its own instrument, and where the
same City document serves both, each claim's `limitations` says so.

Topics: transportation, bike-lanes.

## How this question got here

Nobody chose it. The source was read end to end under methodology v1.15,
every materially factual claim in it was extracted and merged, and
`scripts/intake-coverage.ts` proved nothing raised was lost. The
propositions were grouped into questions under v1.16 and both triage
readers returned GO on this one. It is scheduled now because, after the
one already answered, more people took part in it than in any other
question the register holds: 24 distinct commenters, 7 arguing one way,
16 the other, 1 neither. Cost decides when a question is checked, never
whether.

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
- **79 Street.** One person: "It is an important street for alleviating
  traffic from 75 St and for people to navigate & drive their kids to
  school before work."

## Who asks this

A driver stuck on a street that lost a lane asks: did the bike lane do
this? A person who rides asks: is it true that we're making traffic
worse, or better? A reporter asks: has the City measured what its lane
conversions did to traffic, and what did it find? The propositions below
answer those questions at the level the record answers them, which is
corridor by corridor where the City measured, and they say so where the
record does not reach the level people ask at, the whole city.

## What is measured, and by whom

Four instruments recur, fixed here so that every claim names the same
thing by the same name.

1. **The City's own before-and-after evaluations of lane conversions.**
   Where the City converted a motor-vehicle lane to a bike lane it has,
   for some corridors, published evaluation reports or council reports
   carrying vehicle counts, travel times or delay before and after the
   change: the Downtown Bike Network evaluation programme begun in 2017,
   project pages and "what we heard" reports for later routes, and the
   administration reports to Council and its committees on the bike-lane
   program, including the 2026-08-26 Infrastructure Committee package
   already in this site's evidence registry. These are the primary
   instrument for the two congestion claims. Reviewers establish which
   corridors have such a measurement published by the as-of date.
2. **Average Annual Weekday Traffic (AAWDT).** The City publishes
   corridor vehicle volumes on the Open Data Portal ("Average Annual
   Weekday Traffic Volumes", covering 2011 to 2022 in the dataset as
   titled on the as-of date) and on its Traffic Volumes and Turning
   Movements page. Volume is not congestion; a corridor that lost half
   its cars may be less congested or may have sent them to the next
   street. AAWDT is the instrument for how much traffic a street carries
   (claim 5) and a required alternative reading for the congestion
   claims, never their primary.
3. **The City's record of what it built.** Bike route project pages,
   design drawings, council and committee reports, and the Bike Plan
   implementation reports establish which corridors had a motor-vehicle
   lane removed and a bike lane added, and what reason the City gave.
   These are the instrument for claims 3 and 4.
4. **Cycling counts and mode share.** The City's automated bicycle
   counters and the regional household travel survey, both already
   tested under the question `cycling-volumes`, are context for claim 2
   and never carry a verdict here. Claim 2 is not re-checking how many
   people ride; it is checking whether that riding has been shown to
   take cars off Edmonton roads.

"Congestion" is fixed for this brief as **motor-vehicle delay on a
corridor**, measured as peak-period travel time or intersection delay
along it. Where a City document reports level of service, queue length or
delay in seconds instead, reviewers report the document's own measure and
say how it maps. A change in vehicle volume alone is never a change in
congestion under this brief; it is reported beside the travel-time figure
as the alternative reading.

## Dates fixed in this brief

**As-of date (freeze date):** 2026-09-16. Anything decided or published
after this date is out of scope.

**Reference periods.** Each before-and-after comparison takes the windows
the City's own evaluation defines, and reviewers state them. AAWDT takes
the most recent year published for the corridor and the year before the
conversion, both named. The set of converted corridors is as it stood on
the as-of date; routes under re-evaluation after the 2026-08-26 committee
meeting are in the set if built, out if not, and named either way.

**Currency of the record.** For every figure, reviewers state the
publication date and the last-updated date of the document or dataset
used, and whether a newer release existed on the as-of date.

## Geography

The City of Edmonton, the municipal boundary, is the geography for every
claim. Claims 1, 3 and 4 are about a set of corridors inside it; claim 5
is about one street; claim 2 is about the city, and the brief says below
what the record can answer at that level.

## Claims under review

### Claim 1, id: `lane-removal-increases-congestion`

**Normalized proposition:** Where the City of Edmonton removed a
motor-vehicle through lane to install a bike lane, motor-vehicle
congestion on that corridor increased.

**Why this reading.** Thirteen people said it, and the mechanism nearly
all of them name is a through lane removed: "two lanes to one", "force
traffic into one lane not two". The claim is about the corridors where
that was done, and it is asserted as a general result of doing it, not as
a report on one street. It is tested as a generalisation over the
corridors the City measured. Three holders add idling and emissions as a
consequence; that is reported, not tested, because no Edmonton
measurement of idling on a converted corridor plausibly exists and a
proposition no record can answer predetermines Not established.

**What is counted, fixed here.** The set of corridors is every Edmonton
street segment on which the City removed a motor-vehicle through lane and
installed a bike lane, as established under claim 3 from the City's own
project record. The measure is the City's published before-and-after
motor-vehicle travel time or delay for the peak period on that corridor.
A corridor with no such measurement published is in the set but cannot
carry evidence either way, and the story reports how many of the
converted corridors the City measured at all.

**Thresholds.** Let M be the number of converted corridors with a
published before-and-after travel-time or delay measurement, and of
those let U be the number where peak-period travel time or delay rose by
at least 10 per cent after the conversion, on the City's own figures.

- **Supported** if M is at least 3 and U is more than half of M.
- **Partially supported** if M is at least 3 and U is at least one but
  not more than half of M; or if M is 1 or 2 and U is at least 1.
- **Contradicted** if M is at least 3 and U is zero.
- **Not established** if M is zero, or if M is 1 or 2 and U is zero,
  because one or two measured corridors with no increase cannot carry a
  verdict against a claim made about a program.

Alternative cutoff, results required under both: a rise of at least 5
per cent in place of 10. Neither figure comes from an identified
pre-existing standard; ten per cent is the smallest change in a trip time
a person would notice as "slower", and five is the alternative a holder
would ask for. No cutoff may be changed after the figures are seen.

**Qualifications reported, never carrying the verdict:**

1. Vehicle volume (AAWDT) before and after on each measured corridor, and
   where the City reports it, on the parallel streets it names as
   diversion routes. A corridor whose travel time held because its
   traffic went elsewhere is reported as exactly that.
2. Whether any City evaluation measured the whole network's travel times
   rather than one corridor's, and what it found.
3. The idling and emissions consequence: whether any City or academic
   document measured it for an Edmonton corridor, and if none did, that
   absence, bounded.
4. Whether the measured corridors are the ones commenters named (102
   Avenue, 132 Avenue, Hermitage Road, 79 Street) or others.

**What this claim does not test.** Whether the lanes should have been
built; whether traffic is worse in Edmonton generally; anything a
commenter saw from a car.

### Claim 2, id: `bike-infra-reduces-congestion`

**Normalized proposition:** Edmonton's cycling infrastructure has
reduced motor-vehicle congestion in the city by moving trips out of cars.

**Why this reading.** Six people said it, and the mechanism every one
names is substitution: a person on a bike is a person not driving. The
strongest fair reading keeps the consequence they assert, less
congestion, and the cause they assert, the infrastructure. A proposition
that only said "a bicycle trip is not a car trip" would be a truism, and a
verdict on it would tell no one anything. So the claim is tested as a
claim about a measured result in Edmonton, which is how the holders
argue it: "the better Edmonton's traffic situation gets".

**What is counted, fixed here.** Two things, both from the City's own
record. First, whether the City has published evidence that trips on its
bike routes replaced car trips, that is, a measured mode shift attributed
to the infrastructure: survey questions asking route users what they
would otherwise have done, or before-and-after counts on a corridor
showing bicycle volume up and motor-vehicle volume down together. Second,
whether the City has published any corridor or network measurement in
which motor-vehicle travel time or delay fell after cycling
infrastructure went in.

**Thresholds.** Let S be the number of Edmonton corridors or studies, in
the City's published record, that report a measured mode shift from
driving to cycling attributable to the infrastructure, and let D be the
number of converted corridors with a published before-and-after
measurement where peak-period motor-vehicle travel time or delay fell by
at least 10 per cent.

- **Supported** if S is at least 1 and D is at least 1. Whether the two
  are the same corridor is reported, not required.
- **Partially supported** if exactly one of S and D is at least 1.
- **Contradicted** if S and D are both zero, M as defined in claim 1 is
  at least 3, and on every one of those M corridors the City's published
  measurement shows motor-vehicle travel time or delay up by at least 10
  per cent after the conversion.
- **Not established** if S and D are both zero and the condition for
  Contradicted fails.

Alternative cutoff, results required under both: 5 per cent in place of
10, as in claim 1.

**Qualifications reported, never carrying the verdict:**

1. The share of trips made by bicycle in Edmonton from the most recent
   published regional travel survey, already established under
   `cycling-volumes`, as context for what scale of substitution is
   possible.
2. Any City statement of the purpose of the bike network in its own
   plans, and whether reducing congestion is among the purposes it names.
3. Any Edmonton-specific academic study of mode shift on the City's
   routes, reported under its own name and method.

**What this claim does not test.** Whether cycling infrastructure
reduces congestion in other cities; whether it should; the health and
pollution consequences one holder listed.

### Claim 3, id: `city-removed-traffic-lanes`

**Normalized proposition:** The City of Edmonton has removed motor-vehicle
through lanes and replaced them with bike lanes on streets in more than
one part of the city.

**Why this reading.** The holders answer someone who said the City has
not removed traffic lanes for bike lanes. Two name streets, 102 Avenue and
132 Avenue; two say "all throughout the city". The examples are offered
for the generalisation, so the generalisation is the claim. "All
throughout" is fixed as more than one part of the city, which is what a
holder means and what an opponent would have to answer.

**What is counted, fixed here.** A corridor counts if the City's own
project record, design drawings, council or committee reports show that a
lane used by through motor-vehicle traffic was removed and a bike lane
installed in the space, or in space that included it, on that segment. A
parking lane converted to a bike lane does not count; a lane converted
because the City rebuilt a street for other stated reasons counts here
and its reason is claim 4's business. Reviewers list every corridor they
find with the segment, the year, the document and what the lane was
before. The two named examples are checked as stated: whether 102 Avenue
between 121 Street and 111 Street was two-way and is now one-way with a
bike lane, whether 102 Avenue east of 109 Street lost through lanes to
bike lanes, and what was done on 132 Avenue.

**Thresholds.** Let C be the number of corridors that count, and let A be
the number of distinct areas they fall in, an area being one of the
City's district plan areas (Charter Bylaw 24000).

- **Not established** if, for every candidate corridor, the City's record
  does not show what the lane was before the bike lane went in. This row
  is read first: the others apply only where the record speaks.
- **Supported** if C is at least 3 and A is at least 2.
- **Partially supported** if C is 1 or 2, whatever A is; or if C is at
  least 3 and A is 1.
- **Contradicted** if C is zero on a record that does show prior lane use,
  that is, the City's record shows no through lane removed for a bike
  lane anywhere.

Alternative cutoff, results required under both: Supported at C of at
least 5 and A of at least 3. No cutoff comes from a pre-existing
standard; three corridors in two districts is what "all throughout the
city" can fairly be held to, and five in three is what an opponent would
ask for.

**Qualifications reported, never carrying the verdict:**

1. For each named example, whether the change the commenter described
   happened as described, and if the street was changed for a different
   reason (the record on 102 Avenue between 99 Street and 102 Street, for
   instance, attributes its one-way conversion to LRT construction), that
   reason.
2. The total length of bike lanes in the City's inventory that sit in
   former through lanes, as a share of the network, where the City
   publishes it.

**What this claim does not test.** Whether the removals were right;
what they did to traffic (claim 1); why they were done (claim 4).

### Claim 4, id: `lanes-removed-for-traffic-calming`

**Normalized proposition:** Where the City of Edmonton removed a
motor-vehicle through lane and installed a bike lane, its stated reason
for removing the lane was traffic calming or street renewal rather than
the bike lane.

**Why this reading.** One person, answering the three holders of claim 3:
the lanes went for traffic calming, and bike lanes were added where that
work was already happening, "to save money combining the two". Hermitage
Road is the example. The claim is about the City's reasons, which is a
question its own documents answer, and it is tested over the same
corridors as claim 3.

**What is counted, fixed here.** For each corridor that counts under
claim 3, the reason the City's own document gives for the lane removal:
the project page, the design rationale, the council or committee report
that approved it. A document that gives the bike lane as the reason
counts against; a document that gives traffic calming, neighbourhood
renewal, safety, transit priority, LRT construction or any reason other
than the bike lane counts for; a document that gives both counts as both
and is reported as such; no stated reason is no evidence.

**Thresholds.** Let C be the corridors that count under claim 3 with a
stated reason on the record, let O be those whose stated reason is other
than the bike lane, and let B be those whose stated reason is the bike
lane, with "both" corridors counted in both O and B.

- **Supported** if C is at least 3 and O is more than half of C and B is
  less than half of C.
- **Partially supported** if C is at least 3 and O is at least one but
  the condition for Supported fails; or if C is 1 or 2 and O is at least
  1.
- **Contradicted** if C is at least 3 and O is zero.
- **Not established** if C is zero, or if C is 1 or 2 and O is zero.

No alternative cutoff: the verdict turns on a majority of documented
reasons, and there is no second way to count a majority. Where claim 3
finds no corridor at all, this claim is Not established, and the two
findings are reported together.

**Qualifications reported, never carrying the verdict:**

1. Hermitage Road specifically: what the City's project record says was
   done and why.
2. Whether the City's active transportation program documents state a
   policy of pairing bike routes with renewal or calming work, and what
   they say.

**What this claim does not test.** Whether the City's stated reasons are
its real reasons; whether calming was needed.

### Claim 5, id: `79-street-relieves-75-street`

**Normalized proposition:** 79 Street, on the segment where the City
planned or built a bike route, carries through motor-vehicle traffic at
the level of a collector road and has a school on or beside it.

**Why this reading.** One person: 79 Street is "important for alleviating
traffic from 75 St" and is how people "drive their kids to school before
work". "Would otherwise use 75 Street" is a counterfactual no record
measures; what the record can answer is whether 79 Street does the work of
a collector, carrying through traffic between arterials, rather than the
work of a local street, and whether a school sits on it. That is the
nearest level the record answers, and the proposition names it in those
words. The segment is the one the City's route plan names; if the City's
record names no 79 Street segment, reviewers take 79 Street between 82
Avenue and 98 Avenue and say so.

**What is counted, fixed here.** The City's roadway classification for the
segment; the most recent published AAWDT for the segment and for the
parallel segment of 75 Street; and whether a school (public, Catholic or
private, kindergarten to grade 12) fronts or abuts the segment.

**Thresholds.** Let V be the segment's most recent published AAWDT.

Three conditions: (a) the City classifies the segment as a collector or
higher; (b) V is at least 3,000; (c) a school fronts or abuts the
segment.

- **Not established** if neither the classification nor an AAWDT is
  published for the segment. Read first; the rows below apply where at
  least one is published. Where only one of the two is published, the
  unpublished condition counts as not holding and the report says so.
- **Supported** if all three conditions hold.
- **Partially supported** if one or two of the three hold.
- **Contradicted** if none of the three holds.

Alternative cutoff, results required under both: V of at least 5,000 in
place of 3,000 in condition (b). The 3,000 figure is not from an
identified standard; it is read from the City's own Complete Streets
design and construction standards, which reviewers locate and quote, and
if that document gives a different volume band for collectors the
document's band replaces it and the report says so.

**Qualifications reported, never carrying the verdict:**

1. What the City's bike route plan for 79 Street is, its status on the
   as-of date, and whether it removes a through lane.
2. The AAWDT on 75 Street beside it, so the reader can see the two
   streets side by side.
3. School start times are not in scope; "before work" is reported as the
   commenter's framing.

**What this claim does not test.** Whether a bike lane on 79 Street would
be good or bad; what happened at the Holyrood school, which is a separate
registered question.

## Dropped at the brief

`roads-carry-goods-and-services` (register claim 22) is not sent to the
panel. Both triage readers declined it, independently, as a truism: that
roads carry deliveries, buses and emergency vehicles is accepted by both
sides of this argument, and a verdict on it would tell a reader nothing.
The register carries that decision with its reason. The two commenters'
words stay in `intake.md`, and the story will say the claim was declined
and why.

## Stakes

What each verdict would change, for the person making the claim and for
the person arguing against it. Stated without any view of which way any
of them comes out.

**Claim 1, lanes taken, congestion made.** Supported lets thirteen people
say the City's own measurements show its lane conversions slowed traffic,
and requires the other side to answer those figures rather than the
argument. Contradicted requires the holders to accept that where the City
measured, travel times did not rise, and lets the other side say the
two-lanes-to-one picture is not what the record shows. Partially
supported lets each side keep a corridor. Not established means the City
did not measure what its conversions did to travel time, or measured too
few to say, which the story reports as a fact about the record and which
neither side can quote as a result.

**Claim 2, one less car.** Supported lets six people say the City has
measured trips moving out of cars and traffic easing where it built for
bikes. Contradicted requires them to accept that where the City measured,
more bikes came with slower cars. Partially supported lets them keep the
mode shift or the travel time, not both. Not established means the City
has not measured whether its routes take cars off the road, which the
story reports as a fact about the record; the holders keep their
arithmetic and lose the claim that it has been shown to work here.

**Claim 3, they took the lanes.** Supported requires the person who said
the City has not removed lanes to withdraw it, with a list. Contradicted
requires the four holders to withdraw "all throughout the city" and lets
the other side say no through lane went to a bike lane anywhere.
Partially supported gives the holders their examples and not their
generalisation.

**Claim 4, not for the bikes.** Supported lets the one holder say the
City's own documents give calming or renewal as the reason on most
converted corridors, and turns claim 3's list into a list of streets that
were being rebuilt anyway. Contradicted lets the claim 3 holders say the
City's documents give the bike lane as the reason. Partially supported
means the record is mixed corridor by corridor.

**Claim 5, 79 Street.** Supported lets the holder say the street does
collector work and serves a school, from the City's own classification
and counts. Contradicted means the City classes it as a local street with
local volumes and no school on it. Partially supported gives the holder
the part that held.

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
- what the City did or planned outside the Holyrood school;
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
  1 and 4. It is built once, from the City's record, and each claim
  reads it; the list is reported in full with the document behind each
  entry.

Claim 1: for each converted corridor, whether a before-and-after
travel-time or delay measurement is published; for each that is, the
before figure, the after figure, the periods, and the percentage change;
M and U under both cutoffs.

Claim 2: S and D as defined, each entry with its document; the cycling
mode share figure and survey named as context.

Claim 3: the corridor list with segment, year, prior lane use, document;
C and A under both cutoffs; the three named examples checked as stated.

Claim 4: for each corridor on the list, the stated reason and the
document; C, O and B.

Claim 5: the segment; the classification and its source; V and the year;
the 75 Street figure; the school and its address.

All figures reported to the precision the source publishes, never
further. Where a reviewer computes a change the source does not publish,
the arithmetic is shown and it is labelled as the reviewer's calculation.

## Reviewer instructions of special note

- **Volume is not congestion.** This brief fixes congestion as delay. A
  corridor that lost cars is reported as having lost cars; whether it got
  faster is a separate figure, and a corridor that got faster because its
  cars went to the next street is reported with the next street's figure
  beside it.
- **Build the corridor list once and share it.** Claims 1, 3 and 4 read
  one list. Report it in full under claim 3 and refer to it from the
  others.
- **Do not let one claim answer another.** A Supported on claim 1 is not
  a Contradicted on claim 2, and the reverse; each has its own
  instrument and thresholds. Say in `limitations` where one document
  served two claims.
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
