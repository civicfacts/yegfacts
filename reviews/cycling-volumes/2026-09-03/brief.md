# Review brief: How many people in Edmonton cycle, and how much do the bike lanes get used?

Status: DRAFT, not frozen. Awaiting framing check (`framing/`).
Drafted 2026-09-03 by Stew. Methodology v1.18.
Question id: `cycling-volumes`. Register entry: `intake/register.yaml`.

## The question

Eight claims, all captured from one source, all of them counting
cyclists. They are not restatements of each other. Each one counts a
different thing over a different denominator, and each denominator comes
from a different published instrument. A verdict on one carries no
verdict on any other, and the panel must not treat a finding on one as
corroborating or refuting a finding on another.

Claims in this question, reviewed and reported separately:

- `cycling-trips-1-3-million-2026`: whether Edmonton's automated
  counters recorded nearly 1.3 million cycling trips in the first seven
  months of 2026.
- `bike-lanes-look-empty`: whether Edmonton's bike lanes carry little or
  no bicycle traffic.
- `one-to-two-percent-of-population-rides`: whether only about 1 to 2
  percent of Edmonton's population rides a bicycle.
- `one-percent-year-round-users`: whether only 1 percent of the
  population uses the lanes year-round and fewer than 15 percent the
  rest of the year.
- `two-percent-of-trips-by-bike`: whether about 2 percent of all trips
  in Edmonton are made by bicycle.
- `under-one-percent-of-commuters-cycle`: whether fewer than 1 percent
  of Edmonton commuters travel by bicycle.
- `87-percent-commute-by-car`: whether 87 percent of Edmontonians
  commute by car.
- `riders-are-recreational-not-commuters`: whether the people using the
  lanes are mostly recreational or short-distance riders.

Each claim carries its own verdict, panel agreement and evidence-basis
label. Reviewer confidence appears only beside the reviewer who gave it.

Topics: transportation, bike-lanes.

## How this question got here

Nobody chose it. The source was read end to end under methodology v1.15,
every materially factual claim in it was extracted and merged, and
`scripts/intake-coverage.ts` proved nothing raised was lost. The
propositions were grouped into 34 questions under v1.16 and both triage
readers returned GO on this one. It is scheduled first because more
people took part in it than in any other question the register holds: 25
distinct commenters, 5 arguing one way and 21 the other. Cost decides
when a question is checked, never whether.

Provenance of every wording is in `intake.md` in this directory, which
reviewers do not receive.

## Circulating forms

Summarised for the panel. Every wording below is a verbatim comment from
the captured source; none was composed here. Commenters carry stable
pseudonyms.

- **The counter figure.** One commenter posted the same sentence five
  times: "Through the first seven months of 2026, Edmonton recorded
  nearly 1.3 million cycling trips across its automated counters." Two
  others answered "that never happened" and "The numbers must be
  fudged".
- **The lanes look empty.** Ten people, each offering something they saw:
  "when out I see very few bikes on these very expensive bike lanes";
  "i have seen bike lanes summer and winter with little or no bike
  traffic on them"; "We have had one for the last year on 119 ave and no
  one uses it. In a week there may be 1 rider on the lane"; "there are
  almost no pedestrian or cyclists using it" (of 132 Avenue between 97
  Street and 127 Street); "Driving over to whyte ave, peak bike season
  time mid August, not one bike to be seen"; "I see a cyclist very
  rarely" (of the Hermitage lanes); "They aren't even that busy";
  "Thousands of vehicles vs 10 bikes maybe".
- **A share of the population.** Eight people: "we are talking about huge
  expenditures for only 2.3% of the populations usage"; "2% of
  constituents ride bikes! What about the other 98%?"; "1 percent of
  population to use"; "The 1%"; "The whole 1-2%"; "Waste of money on 1%
  of population"; "bike lanes for the .001% of the population"; "500
  people using the bike lanes 4 months of the year".
- **A share of the population, split by season.** One person: "only 1% of
  the pop use them year round and less than 15% the rest of the year."
- **A share of trips.** One person, correcting the commenter above: "*2%
  of trips are done by bicycle, although it's higher in neighborhoods
  with bike infrastructure", and elsewhere "considering 2% of all trips
  are by bicycle". The same commenter names two documents, a Statistics
  Canada table on "Main mode of commuting for the 10 largest census
  metropolitan areas" and the "2015 Edmonton and Region Household Travel
  Survey".
- **A share of commuters.** Two people, one of them answering the trips
  figure directly: "no your numbers are incorrect. City reports have
  census numbers in 2021 less than 1 percent"; "Less than 1% on bikes."
- **A share of commuters, the other way round.** One person, in the same
  comment as the line above: "87% of Edmontonians commute in cars."
- **What riders are doing.** Two people: "Lots of recreational riders..
  commuters not so much"; "usually within a short distance, or for
  recreational purposes."

**Prevalence.** The counts above are of distinct people in this one
source. The brief does not claim any figure is common across Edmonton,
only that each was posted publicly in a thread of 621 comments about
council's bike-lane decision, and that the register's account counts are
counts of participation and never of agreement.

## Who asks this

A resident or a reporter would ask: "How many people in Edmonton
actually ride, and are the bike lanes being used?" Behind it sits the
argument the thread is having, which is that several people are quoting
different percentages at each other and treating them as the same
number.

The record can answer the question, but only one measure at a time, and
the measures are not interchangeable. So the brief tests each circulating
figure against the instrument that measures the thing that figure names,
and every claim's section says in plain words what is being counted and
what it is being divided by. The reader's question is answered by the set
of eight, not by any one of them.

## The denominators, and which claims share a source

| Claim | What is counted | Divided by | Source family |
| --- | --- | --- | --- |
| `cycling-trips-1-3-million-2026` | bicycle passages past the City's automated counters, Jan-Jul 2026 | nothing; a raw count | Eco-Counter open data |
| `bike-lanes-look-empty` | bicycle passages per day past the counter on a named corridor | nothing; a daily rate per corridor | Eco-Counter open data |
| `one-to-two-percent-of-population-rides` | residents who ride a bicycle at all in a reference period | all Edmonton residents | population survey |
| `one-percent-year-round-users` | residents who ride year-round; residents who ride in the rest of the year | all Edmonton residents | population survey with a seasonal split |
| `two-percent-of-trips-by-bike` | trips whose main mode is bicycle | all trips by Edmonton residents | household travel survey |
| `riders-are-recreational-not-commuters` | bicycle trips for recreation | all bicycle trips | household travel survey |
| `under-one-percent-of-commuters-cycle` | commuters whose main mode is bicycle | employed Edmontonians with a usual workplace | 2021 Census, journey to work |
| `87-percent-commute-by-car` | commuters whose main mode is car | employed Edmontonians with a usual workplace | 2021 Census, journey to work |

**Four pairs share a source family, and each pair must be reasoned
separately.**

1. `cycling-trips-1-3-million-2026` and `bike-lanes-look-empty` both come
   out of the Eco-Counter data. One is a network total over seven
   months; the other is a daily rate at a named corridor. A large
   network total does not establish anything about any one corridor, and
   a low corridor count does not establish anything about the network.
2. `two-percent-of-trips-by-bike` and
   `riders-are-recreational-not-commuters` both come out of a household
   travel survey. One is bicycle trips over all trips; the other is
   recreational bicycle trips over all bicycle trips. The second's
   denominator is the first's numerator.
3. `under-one-percent-of-commuters-cycle` and `87-percent-commute-by-car`
   come out of the same census table and, with the other modes, sum to
   100 percent of the same population. A verdict on one is not evidence
   for the other; each has its own threshold and each can fail on its
   own.
4. `one-to-two-percent-of-population-rides` and
   `one-percent-year-round-users` are both participation rates over the
   whole population. The second splits the year; the first does not.

Where a reviewer's evidence for two claims is the same document, that is
stated in each claim's `limitations`, so the reader is not shown two
findings that are one finding twice.

## Dates fixed in this brief

**As-of date (freeze date):** 2026-09-03. Anything decided or published
after this date is out of scope.

**Per-claim reference periods**, each fixed in the claim's own section
below. In summary: the counter claim takes the window its holder stated
(2026-01-01 to 2026-07-31); the corridor claim takes the most recent
complete calendar year plus that same window; the census claims take the
2021 Census reference week; the survey claims take the most recent
Edmonton survey published by the as-of date, whose date reviewers state.

**Currency of the record.** For every claim, reviewers state the
publication date and the last-updated date of the dataset or report they
used, and whether a newer release existed on the as-of date.

## Geography

The City of Edmonton, that is the census subdivision and the municipal
boundary, is the primary geography for every claim. Where a source
publishes only the Edmonton census metropolitan area or the wider
capital region, that figure is reported as a required alternative under
its own name and is never called a City of Edmonton figure.

## Claims under review

### Claim 1, id: `cycling-trips-1-3-million-2026`

**Normalized proposition:** Edmonton's automated counters recorded nearly
1.3 million cycling trips in the first seven months of 2026.

**Why this reading.** The holder gave a period, an instrument and a
figure, and the two commenters answering him disputed the figure itself.
The proposition keeps all three as stated.

**What is counted, fixed here.** The sum of bicycle counts recorded by
the City of Edmonton's automated bicycle counters between 2026-01-01 and
2026-07-31 inclusive, across every counter the City publishes in that
window. The City publishes this on its open data portal as the
Eco-Counter bike and pedestrian count data (the dataset at
`data.edmonton.ca` identified as "Bike and Pedestrian Counts (Eco
Counter)", with a locations map and a monthly-by-location view published
beside it). Reviewers name the dataset they used, its portal
identifier, its last update date, and the number of counters that
reported in the window.

**What a counter count is, and is not.** A counter records a passage
past a fixed point. It is not a person and it is not a journey. One
person riding to work and home again past the same counter is two
counts; one journey past two counters is two counts; a person who rides
where there is no counter is none. The City's own dataset description
says the data is raw and has not been through quality assurance.
Reviewers state whether the City labels these records as trips, counts
or passages, and use the City's own word when reporting the figure.

**"Nearly 1.3 million", fixed here with thresholds.** The verdict figure
is the network total defined above.

- **Supported** if the total is at least 1.10 million and below 1.50
  million.
- **Partially supported** if the total is at least 0.65 million and below
  1.10 million, or at or above 1.50 million. The failing part is the
  figure "nearly 1.3 million"; the counters record cycling at the order
  of magnitude the holder claimed.
- **Contradicted** if the total is below 0.65 million.
- **Not established** if the City's published counter data does not cover
  January to July 2026, or does not permit a network total to be
  computed.

Alternative cutoffs, results required under both: Supported from 1.17
million to below 1.43 million (within a tenth of the stated figure);
Partially supported from 0.65 million to below 1.17 million, or at or
above 1.43 million; Contradicted below 0.65 million. Neither set comes
from an identified pre-existing standard. The primary band is the stated
figure plus or minus about fifteen percent, which is the range in which
"nearly 1.3 million" is a fair description of a number, and half the
stated figure is where the claim stops being about the same quantity. No
cutoff may be changed after the figures are seen.

**Qualifications reported, never carrying the verdict:**

1. How many counters reported in the window, whether any were added,
   moved or removed during it, and how many days of data are missing.
   State the total both as published and, if the City or the reviewer
   fills gaps, with the method named.
2. The same total for the same window in the two preceding years, so the
   figure has a scale beside it.
3. Whether the City itself has published this figure or one like it, and
   where.
4. The share of the total contributed by the busiest counter and by the
   river-valley and shared-path counters as against on-street bike-lane
   counters, if the City's locations data allows the split.

**What this claim does not test.** Whether the counters are accurately
sited or calibrated; whether the number is large or small; whether the
spending was worth it; how many distinct people the count represents,
which no counter can establish and which is reported as an unknown.

### Claim 2, id: `bike-lanes-look-empty`

**Normalized proposition:** Edmonton's bike lanes carry little or no
bicycle traffic.

**Why this reading, and why it is not tested as an observation.** Ten
people each offered something they saw as evidence for a statement about
the lanes in general. Under the standing rule that a claim is tested as
its holders assert it, the general statement is the claim. It is not
tested as a claim about what anyone saw, because nothing in the public
record can establish what a person driving past noticed, and a
proposition about that would be unanswerable in either direction. It is
tested instead as a claim about how much traffic the lanes carry, on the
lanes these holders named, measured by the instrument that measures
exactly that.

**Which lanes, fixed here.** The corridors named by holders of this claim
in the captured source: 119 Avenue; 132 Avenue between 97 Street and 127
Street; the Hermitage area lanes; and the Whyte Avenue area. Reviewers
identify, from the City's published counter locations, which of these
corridors has a City automated bicycle counter on or adjacent to it,
name each counter, and say which named corridors have none.

**Predeclared fallback.** If fewer than two of the four named corridors
have a City counter, the verdict falls to the full set of City automated
bicycle counters sited on on-street bike lanes rather than on river
valley or shared-use recreational paths, each reported individually.
This fallback is fixed here, before any data is read, so that it cannot
be chosen after the figures are seen. Reviewers state which set carried
the verdict and why.

**The measure, fixed here.** For each counter in the verdict set, the
median daily bicycle count for July of the most recent complete calendar
year, that is 2025. July is fixed because it is inside the riding season
that holders themselves name ("peak bike season time mid August", "4
months of the year"), so the claim is tested at its strongest for the
lanes rather than at its weakest. A median is fixed rather than a mean
because one event day would move a mean.

**"Little or no", fixed here with a threshold.** A corridor counts as
carrying little or no traffic if its July median daily bicycle count is
below 25.

- **Supported** if every corridor in the verdict set is below 25.
- **Partially supported** if at least one corridor is below 25 and at
  least one is at or above 25.
- **Contradicted** if no corridor in the verdict set is below 25.
- **Not established** if no corridor in either the named set or the
  fallback set has published counter data covering July 2025.

Alternative cutoff, results required under both: 50 a day in place of
25. Neither figure comes from an identified pre-existing standard.
Twenty-five bicycles a day is about one every forty minutes across a
sixteen-hour day, which is a rate a person passing a lane could
reasonably describe as seeing almost none, and it is well above every
quantity the holders themselves give (one a week, ten, none). No cutoff
may be changed after the figures are seen.

**Qualifications reported, never carrying the verdict:**

1. For each corridor in the verdict set: the July median, the busiest
   single day, the January median, and the calendar-year total.
2. For each named corridor with no counter, say so plainly. An absence
   of measurement is not a measurement of absence, and the story will
   say which of the lanes people named cannot be checked this way.
3. Whether any counter in the set was installed part-way through the
   period, or reported no data for part of it.
4. Whether the City publishes any manual or short-duration count for a
   named corridor, and what it says.
5. Motor vehicle counts on the same corridors where the City publishes
   them, reported as context for the "thousands of vehicles vs 10 bikes"
   form, and never as part of the verdict.

**What this claim does not test.** Whether any lane should have been
built; whether the traffic a lane carries justifies its cost; whether
riders use the sidewalk or the road instead of the lane, which is a
separate registered question; whether use is growing or falling.

### Claim 3, id: `one-to-two-percent-of-population-rides`

**Normalized proposition:** Only about 1 to 2 percent of Edmonton's
population rides a bicycle.

**Why this reading.** Every wording of this claim divides by the
population and contrasts riders with "the other 98%". So the claim is a
participation rate: the share of people who ride at all. It is not a
share of trips and not a share of commuters; those are claims 5 and 6,
and they are tested separately against their own sources. Reading this
one as a trips or commuting figure would be reading someone else's claim.

**What is counted, fixed here.** The share of Edmonton residents who rode
a bicycle at all within the reference period of the best available
published measure. Reviewers name the instrument, its sampling frame,
its sample size, its reference period and its exact question wording,
and report the share as published.

**Which instrument, and the order of preference, fixed here.** The
primary source is a probability or representative sample of Edmonton
residents that asks about any cycling over a stated period. Candidates
reviewers should look for and rule in or out by name include the
Edmonton and Region Household Travel Survey and its 2025 successor
survey, Statistics Canada surveys carrying an Edmonton-level cycling or
active-transportation estimate, and any City of Edmonton survey with a
representative sample.

The City's Insight Community is an opt-in online panel, not a
representative sample. Any figure from it is reported under that name,
labelled as a panel result, and may not carry the verdict. If the only
Edmonton measure available is a panel or another self-selected sample,
the verdict is Not established and the panel figure is reported as a
qualification.

**Thresholds.** Let P be the published share.

- **Supported** if P is at least 1.0 percent and at most 2.5 percent.
- **Partially supported** if P is at least 0.5 percent and below 1.0
  percent, or above 2.5 percent and at most 5.0 percent. The failing
  part is the stated range; the order of magnitude holds.
- **Contradicted** if P is below 0.5 percent or above 5.0 percent.
- **Not established** if no representative published source measures
  cycling participation among Edmonton residents.

Alternative cutoffs, results required under both: Supported from 0.8
percent to 3.0 percent; Partially supported from 0.4 to below 0.8
percent, or above 3.0 percent to 6.0 percent; Contradicted outside those.
Neither set comes from an identified pre-existing standard. The primary
band takes the claim's own range and allows the quarter-point of slack
"about" carries; five percent is where a figure is no longer the same
order as one or two percent. No cutoff may be changed after the figures
are seen.

**Qualifications reported, never carrying the verdict:**

1. The reference period the instrument used, and the same instrument's
   figure for a single day if it publishes one. The share of people who
   ride in a year and the share who ride on a given day are different
   numbers and the story will print both.
2. Whether the instrument covers all ages or only adults, and what it
   counts as a bicycle.
3. Any panel or self-selected figure, under its own name.
4. The equivalent published figure for the census metropolitan area,
   where the City figure is not published separately.

**What this claim does not test.** How often riders ride; whether riding
is growing; whether a minority share justifies or condemns any spending;
the "500 people" and ".001%" forms, which no instrument measures and
which are reported as the range of the circulating figures, not tested.

### Claim 4, id: `one-percent-year-round-users`

**Normalized proposition:** Only 1 percent of Edmonton's population uses
the bike lanes year-round, and fewer than 15 percent use them the rest of
the year.

**Why this reading.** The holder made one statement with two quantities
in it, and both are about the same population over the same year. They
are kept together because separating them would leave two claims neither
of which is what was said. The schema carries one verdict, so the verdict
is defined over both parts below, and a Partially supported verdict must
name which part fails.

**What is counted, fixed here.** From a published measure with a seasonal
split: (A) the share of Edmonton residents who ride through the winter
as well as the rest of the year, and (B) the share who ride during the
non-winter part of the year. The same instrument-quality rule as claim 3
applies: a representative sample carries the verdict; an opt-in panel is
reported under its own name and cannot.

Where the instrument reports frequency bands rather than a year-round
share, reviewers state the band they read as year-round and why, and
report the adjacent band as well.

**Thresholds.** Part A holds if the published year-round share is at
least 0.5 percent and at most 2.0 percent. Part B holds if the published
non-winter share is below 15 percent.

- **Supported** if both parts hold.
- **Partially supported** if exactly one part holds. Name which.
- **Contradicted** if neither part holds.
- **Not established** if no published source measures Edmonton cycling
  participation with a seasonal split.

Alternative cutoff for Part A, results required under both: at least 0.25
percent and at most 3.0 percent. Part B's threshold is the holder's own
stated ceiling and is not varied. Neither set comes from an identified
pre-existing standard. No cutoff may be changed after the figures are
seen.

**Qualifications reported, never carrying the verdict:**

1. That Part B is a ceiling, not an estimate: any figure below 15 percent
   satisfies it, so a finding on Part B says less than a finding on Part
   A. State the published figure so the reader sees how far below the
   ceiling it falls, if it does.
2. The share of annual counter volume recorded in the winter months, as
   context and not as a participation rate. Counter volume is passages,
   not people, and may not be substituted for either part.
3. The instrument's definition of winter or year-round, in its own words.

**What this claim does not test.** Whether winter cycling is practical,
which is a separate published finding; whether the lanes are cleared;
whether year-round riding is growing.

### Claim 5, id: `two-percent-of-trips-by-bike`

**Normalized proposition:** About 2 percent of all trips in Edmonton are
made by bicycle.

**Why this reading.** The holder was correcting another commenter's "2%
of constituents ride bikes" and said explicitly "*2% of trips are done by
bicycle". The proposition keeps the correction, because that is the
distinction the holder was drawing.

**What is counted, fixed here.** Trips whose main mode is bicycle, as a
share of all trips made by Edmonton residents, from the most recent
Edmonton region household travel survey published by the as-of date. The
2015 Edmonton and Region Household Travel Survey summary report is
published by the City; a successor survey under the name Navigating
Tomorrow was launched in 2025. Reviewers establish which survey's
results were published on the as-of date, use the most recent, and name
it, its fieldwork period and its publication date.

**Boundary rules.** The primary figure is for City of Edmonton residents.
Where the survey publishes only a regional figure, the regional figure
is the required alternative, reported under the region's name.
Where the survey reports weekday trips only, say so; where it reports all
days, say so. Do not mix the two.

**Thresholds.** Let B be the published bicycle share of all trips.

- **Supported** if B is at least 1.5 percent and at most 2.5 percent.
- **Partially supported** if B is at least 1.0 percent and below 1.5
  percent, or above 2.5 percent and at most 3.5 percent.
- **Contradicted** if B is below 1.0 percent or above 3.5 percent.
- **Not established** if no published Edmonton travel survey gives a
  bicycle share of all trips.

Alternative cutoffs, results required under both: Supported from 1.2 to
3.0 percent; Partially supported from 0.8 to below 1.2 percent, or above
3.0 to 4.0 percent; Contradicted outside those. Neither set comes from an
identified pre-existing standard; half a point either side of a
one-figure percentage is what "about" carries in ordinary speech. No
cutoff may be changed after the figures are seen.

**Qualifications reported, never carrying the verdict:**

1. The survey's date. A 2015 figure is eleven years old on the as-of
   date, and the story will say so beside the number.
2. The second half of the holder's own sentence, "although it's higher in
   neighborhoods with bike infrastructure": whether the survey publishes
   a sub-area breakdown and what it shows. Reported, not tested.
3. The document the holder named, a Statistics Canada table on main mode
   of commuting for the ten largest census metropolitan areas: whether it
   exists as described and what it actually measures. That table, if it
   is a commuting table, does not measure trips, and the story reports
   that as a fact about the citation.
4. Whether any newer regional survey had published results by the as-of
   date, and its status if not.

**What this claim does not test.** Whether 2 percent is a lot; the
holder's argument about budget shares, which belongs to a separate
registered question; mode share in any other city.

### Claim 6, id: `under-one-percent-of-commuters-cycle`

**Normalized proposition:** Fewer than 1 percent of Edmonton commuters
travel to work by bicycle, according to 2021 census figures.

**Why this reading.** The holder cited "census numbers in 2021" as the
source, so the census figure is what is tested. The holder also said
"City reports have" those numbers; whether a City report repeats the
census figure is reported as a qualification rather than tested,
because the census is the identifiable published source and the one a
reader can check.

**What is counted, fixed here.** The bicycle share of main mode of
commuting for the City of Edmonton census subdivision, from the 2021
Census of Population, reference week 2021-05-02 to 2021-05-08. The
denominator is the census universe for that variable: employed persons
aged 15 and over with a usual place of work or no fixed workplace,
excluding those who worked at home. Reviewers name the Statistics Canada
product they used, whether the Census Profile for the City of Edmonton
or a data table such as 98-10-0464-01, quote the figure as published,
and give the universe in the census's own words.

**Required alternative.** The same variable for the Edmonton census
metropolitan area, reported under that name.

**Thresholds.** Let C be the published bicycle share.

- **Supported** if C is below 1.0 percent.
- **Partially supported** if C is at least 1.0 percent and below 1.5
  percent. The failing part is the "fewer than 1 percent" threshold; the
  substance, that the share is very small, holds.
- **Contradicted** if C is at or above 1.5 percent.
- **Not established** if the 2021 Census does not publish a bicycle
  commuting share for Edmonton.

Alternative cutoffs, results required under both: Supported below 1.1
percent; Partially supported from 1.1 to below 2.0 percent; Contradicted
at or above 2.0 percent. Neither set comes from an identified
pre-existing standard. No cutoff may be changed after the figures are
seen.

**Qualifications reported, never carrying the verdict:**

1. The 2021 census reference week fell during pandemic restrictions and
   the census recorded an unusually high share of people working at
   home, which changes the denominator. Report the work-at-home share
   for Edmonton in 2021 and in 2016, and the 2016 bicycle commuting
   share, so the reader can see the effect. This is a qualification on
   what the number means, never a reason to move the verdict.
2. Whether commuting data from a later census had been released by the
   as-of date, and if so, what it says.
3. Whether the City publishes a commuting cycling share of its own, and
   whether it matches.
4. That this figure counts journeys to work only. It does not count
   riding to school, to the shops, or for any other purpose, and it is
   not the same measure as claim 5 or claim 3.

**What this claim does not test.** Whether the share should be higher;
whether infrastructure changes it; commuting in any year other than
those named.

### Claim 7, id: `87-percent-commute-by-car`

**Normalized proposition:** 87 percent of Edmontonians commute by car.

**Why this reading.** The holder gave this figure in the same sentence as
claim 6's, as the other side of the same table. The proposition keeps the
figure as stated. "Edmontonians" is read as commuters, because the
sentence says "commute"; the census universe below makes that precise.

**What is counted, fixed here.** The share of main mode of commuting
recorded as "car, truck or van, as a driver" plus "car, truck or van, as
a passenger", for the City of Edmonton census subdivision, 2021 Census,
same universe and reference week as claim 6.

**Required alternatives.** (a) The driver-only share, without passengers.
(b) The same combined share for the Edmonton census metropolitan area.
Both reported under their own names.

**Thresholds.** Let A be the published combined car share.

- **Supported** if A is at least 84 percent and at most 90 percent.
- **Partially supported** if A is at least 78 percent and below 84
  percent, or above 90 percent and at most 94 percent.
- **Contradicted** if A is below 78 percent or above 94 percent.
- **Not established** if the census does not publish the share for
  Edmonton.

Alternative cutoffs, results required under both: Supported from 82 to 92
percent; Partially supported from 75 to below 82 percent, or above 92 to
95 percent; Contradicted outside those. Neither set comes from an
identified pre-existing standard; three points either side of a stated
whole-number percentage is the range in which the stated figure is a fair
report of it. No cutoff may be changed after the figures are seen.

**Qualifications reported, never carrying the verdict:**

1. This claim and claim 6 come from the same table and the same
   universe. Say so in `limitations` on both.
2. The full breakdown of main mode of commuting for Edmonton in 2021, so
   the reader sees every mode and what they sum to.
3. The work-at-home share, and what the car share becomes if people
   working at home are put back into the denominator.
4. The 2016 figure for the same variable.

**What this claim does not test.** Whether car commuting should be lower;
whether the 87 percent figure was quoted from the census or from
somewhere else, beyond reporting whether any published Edmonton source
prints that exact number.

### Claim 8, id: `riders-are-recreational-not-commuters`

**Normalized proposition:** Most cycling in Edmonton is recreational
rather than commuting.

**Why this reading.** Two holders said the riders are recreational and
"commuters not so much", one adding "usually within a short distance".
The claim is about what riders are doing, so it is tested on trip
purpose. The short-distance half is reported as a qualification, because
distance and purpose are different measures and the holders' point was
purpose.

**What is counted, fixed here.** Bicycle trips whose purpose the source
classifies as recreation, exercise or leisure, as a share of all bicycle
trips, from the most recent Edmonton region household travel survey
published by the as-of date, that is the same survey as claim 5. Where
that survey publishes trip purpose only for all modes and not for
bicycles, reviewers say so and look for a City or Statistics Canada
source that publishes cycling trip purpose for Edmonton, naming it.

Reviewers state the source's own purpose categories verbatim and say
which they counted as recreational and which as commuting, before giving
the figures.

**Thresholds.** Let Rec be the recreational share of bicycle trips and
Com the commuting or work share, on the source's own categories. Apply
in this order:

- **Contradicted** if Com is greater than Rec.
- **Supported** if Rec is above 50 percent.
- **Partially supported** if Rec is above 35 percent and at most 50
  percent, and Rec is the largest single purpose category.
- **Contradicted** if Rec is at most 35 percent.
- **Not established** if no published Edmonton source breaks bicycle
  trips down by purpose, or if the categories cannot be mapped onto
  recreation and commuting without a judgement the reviewer is unwilling
  to make, in which case say what the obstacle is.

Alternative cutoffs, results required under both: Supported above 45
percent; Partially supported above 30 percent to 45 percent and largest;
otherwise as above. Neither set comes from an identified pre-existing
standard; "most" in ordinary speech is more than half, and a plurality
above a third is the weaker reading of the same word. No cutoff may be
changed after the figures are seen.

**Qualifications reported, never carrying the verdict:**

1. Median and mean bicycle trip distance, if the source publishes it,
   for the "usually within a short distance" form.
2. The same breakdown for all modes, so the reader can see whether
   cycling's purpose mix is unusual.
3. Whether the counter data shows a weekday commute-hour peak, a weekend
   peak, or neither, at any counter that publishes hourly data. Reported
   as context. Counter shape is not trip purpose and cannot carry the
   verdict.
4. The survey's date and sample size for bicycle trips specifically,
   which may be small.

**What this claim does not test.** Whether recreational riding is a
legitimate use of a bike lane; who cycles, which is a separate registered
question; trip purpose in any other city.

## Dropped at the brief

One claim in this question is not sent to the panel.

`heritage-days-bike-arrivals`, registered from the wording "Looks like
more than 5 rode to Heritage Days (this was within an hour of opening on
the Saturday)."

**Reason.** No public record counts bicycle arrivals at one event within
one hour of its opening, so the proposition cannot be established or
refuted by any evidence a reviewer could find, in either direction. It is
also a rhetorical rebuttal rather than a proposition: the comment answers
the thread's opening line, "All 5 people who ride bikes showed up?", and
its work is to deny that joke, not to assert a countable fact anybody is
arguing about. Sending it to a panel would spend a run to return Not
established on a question nobody asked.

The wording, its author's pseudonym and this reason stay in the record.
`register-note.md` in this directory carries the same for the register,
so the drop is visible on `/considered` rather than silent.

## Stakes

**The pair that could surprise the "nobody rides them" side.** If the
counters carry a very large number of trips, then Supported on claim 1
means the volume argument fails on the City's own instrument, and the
people saying "that never happened" and "the numbers must be fudged"
would have to answer the dataset. Contradicted on claim 1 would mean a
figure being repeated five times in a public thread is wrong, and the
people repeating it would have to stop. On claim 2, Contradicted would
mean the lanes people named carry real traffic and the observation
argument fails where it is checkable; Supported would mean those lanes
really are close to empty and the counters say so, which is the strongest
thing the record could say for that side.

**The pair that could surprise the "loads of people ride" side.**
Supported on claim 6 or claim 5 means the shares are as small as their
critics say, and the people citing the counter total would have to accept
that a large raw count and a small share are both true at once.
Contradicted on either means the small-share figures being quoted are
wrong and the people quoting them would have to drop them.

**Both can hold at once, and neither verdict decides the other.** A
million passages past a counter and a share of trips under one percent
are not in conflict; they are different measures of different things.
The stakes for a reader are therefore not only in the eight verdicts but
in what each number counts. Whoever quotes one of these figures without
its denominator is telling a reader something the figure does not say,
and that is true of a figure from either side.

**Every verdict is reachable on every claim.** For each of the eight, the
instrument is published, the period is fixed, and the threshold is set in
advance, so Supported, Partially supported and Contradicted are all
possible before any evidence is read. Not established is a real outcome
only where a claim's instrument may not exist for Edmonton, which is
claims 3, 4 and 8; those sections say what would have to be missing, and
finding it missing would itself tell a reader something, namely that a
figure many people repeat has no published Edmonton measure behind it.

**Definition sensitivity.** Each verdict applies under the primary
instrument, geography and threshold named in its own section. Where a
required alternative produces a different classification, the finding is
definition-sensitive, the story says so beside the verdict, and neither
side can fairly cite the verdict without that qualification.

## Scope

**Geography:** the City of Edmonton, as fixed above.

**Time:** as fixed per claim above; nothing published after 2026-09-03.

**Out of scope**, each of these being a separate registered question or a
question the site does not test:

- whether bike lanes should be built, paused or removed;
- what the lanes cost and how that compares with road spending;
- whether the lanes ease or worsen congestion;
- whether cycling is safe, and where cyclists ride;
- whether Edmonton winters make cycling practical;
- who cycles, by income, occupation or car ownership;
- snow clearing on lanes or streets;
- what council decided, when, and on whose recommendation;
- any claim about an identifiable individual's conduct or motives;
- whether any of these figures justifies any decision. The site tests
  what the figures are, not what should follow from them.

## Required calculations

Shared across claims, so the story can print the denominators beside the
numbers:

- For every figure reported: the numerator, the denominator, the
  geography, the period, the instrument and the instrument's publication
  date, stated together. A percentage without its denominator is not a
  finding.
- Where two claims rest on the same document, name the document once in
  each claim's `limitations` and say what each takes from it.

Claim 1: the network total for 2026-01-01 to 2026-07-31; the counter
count and any gaps; the same window for the two preceding years.

Claim 2: per corridor in the verdict set, the July 2025 median daily
count, the busiest day, the January 2025 median and the 2025 total; the
list of named corridors with no counter.

Claim 3: the published participation share with its reference period and
sampling frame; the single-day equivalent where published.

Claim 4: the year-round share and the non-winter share, each with the
instrument's own band definitions; the winter share of annual counter
volume as context.

Claim 5: the bicycle share of all trips with the survey's date, universe
and day-type.

Claim 6: the bicycle share of main mode of commuting for the City of
Edmonton and for the census metropolitan area; the 2016 figure; the
work-at-home share for 2021 and 2016.

Claim 7: the combined car share, the driver-only share, the full mode
breakdown and what it sums to.

Claim 8: the recreational and commuting shares of bicycle trips on the
source's own categories, with the mapping stated; trip distance where
published.

All shares reported to the precision the source publishes, never further.
Where a reviewer computes a share the source does not publish, the
arithmetic is shown and it is labelled as the reviewer's calculation.

## Reviewer instructions of special note

- **Name the denominator every time.** This question exists because
  several figures that divide by different things are being quoted at
  each other as if they were the same figure. Every number you report
  carries what it counts and what it counts over.
- **Do not let one claim answer another.** Four pairs of these claims
  share a source family. Reach each verdict on its own evidence, and
  where the same document serves two claims, say so in `limitations` on
  both.
- **A counter passage is not a person and not a trip.** Use the City's
  own word for what its counters record and say what the record cannot
  establish.
- **A panel is not a sample.** Any figure from an opt-in online panel is
  reported under that name and cannot carry a verdict on a population
  share.
- **Quote figures from the publishing body's own document or dataset**,
  naming it, its identifier or table number, its page or view, its
  publication date and its last update date. A news report or a comment
  is a lead to the source behind it, never the source of a verdict
  figure.
- **Report one verdict per claim** under the primary reading and
  thresholds fixed here, and put every alternative reading's result in
  `interpretation_notes` or `limitations`. The schema carries one verdict
  per claim.
- **Record every source URL in full**; you have no repo access.
- **Bound every absence.** If a figure is not published, say what you
  searched, for what place and period, and as of when. "We did not find
  it" is not "it does not exist".
- If a definition, threshold, fallback or date in this brief changes what
  the honest answer is, record a MATERIAL FRAMING CONCERN per
  `prompts/reviewer.md` and answer the claims as posed alongside it.
