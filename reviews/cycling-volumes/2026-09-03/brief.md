# Review brief: How many people in Edmonton cycle, and how much do the bike lanes get used?

Status: **AWAITING DEFECT CONFIRMATION 2026-09-03, not frozen.** The
framing check returned REVISE on all three permitted reports
(`framing/check-1.md`, `framing/check-2.md`, `framing/check-3.md`), and
all three findings it left standing are arithmetic defects inside verdict
ladders. Under methodology v1.20 a defect finding does not park a brief:
the three are corrected here in the checker's own words, each correction
is recorded in `run-record.md` against the finding it answers, and the
brief goes back for one defect confirmation. Nothing else in the brief is
changed. No panel runs on this brief until that report says so.
Drafted, twice revised and once corrected 2026-09-03 by Stew.
Methodology v1.20.
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
- `bike-lanes-look-empty`: whether the bike lanes Edmonton meters carry
  little or no bicycle traffic.
- `one-to-two-percent-of-population-rides`: whether no more than about 2
  percent of Edmonton's population rides a bicycle.
- `one-percent-year-round-users`: whether no more than 1 percent of the
  population rides year-round and fewer than 15 percent in the rest of
  the year.
- `two-percent-of-trips-by-bike`: whether about 2 percent of all trips
  in Edmonton are made by bicycle.
- `under-one-percent-of-commuters-cycle`: whether fewer than 1 percent
  of Edmonton commuters travel by bicycle.
- `87-percent-commute-by-car`: whether 87 percent of Edmontonians
  commute by car.
- `riders-are-recreational-not-commuters`: whether most cycling in
  Edmonton is recreational rather than commuting.

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

A resident or a reporter would ask: "How many Edmontonians actually ride,
and are the bike lanes being used?" Behind it sits the argument the
thread is having, which is that several people are quoting different
percentages at each other and treating them as the same number.

**The record does not answer that question directly, and the brief says
so up front.** No published instrument counts the distinct people who use
Edmonton's bike lanes. A counter records passages, not people and not
lane users specifically. A travel survey records trips. The census
records journeys to work. A participation survey records whether somebody
rides, not whether they ride in a lane.

So the brief does what the framing check requires where the record cannot
answer at the level people ask: it tests the nearest levels the record
does answer, and each claim's section names that level in words a reader
would use. The eight claims test the counter figure, the corridor
volumes, the participation shares, the trip share, the trip purpose and
the two commuting shares, each against the instrument that measures that
thing. The story will state plainly that none of them is a count of
distinct bike-lane users, and that the reader's question is answered by
the set of eight and by their limits, not by any one figure.

## The denominators, and which claims share a source

| Claim | What is counted | Divided by | Source family |
| --- | --- | --- | --- |
| `cycling-trips-1-3-million-2026` | bicycle passages past the City's automated counters, Jan-Jul 2026 | nothing; a raw count | Eco-Counter open data |
| `bike-lanes-look-empty` | bicycle passages per day past the counter on a named corridor | nothing; a daily rate per corridor | Eco-Counter open data |
| `one-to-two-percent-of-population-rides` | residents who ride a bicycle at all in a reference period | all Edmonton residents | population survey |
| `one-percent-year-round-users` | residents who ride a bicycle year-round; residents who ride in the rest of the year | all Edmonton residents | population survey with a seasonal split |
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

**Riding a bicycle and using a bike lane are not the same measure, and
the brief keeps them apart.** Some captured wordings are about people who
ride ("2% of constituents ride bikes"); others are about people who use
the lanes ("only 1% of the pop use them year round"). No published
Edmonton instrument measures the distinct residents who use bike lanes.

Two rules follow, and they apply everywhere in this brief.

- **A participation measure may carry a verdict only on a form about
  residents who ride.** A form about how many people use the lanes is
  reported as made and described as unmeasured. No participation figure
  is set against it, in either direction. Disclosure does not make two
  numerators comparable.
- **Where a claim's own wording says "use the lanes" and only a riding
  measure exists**, the substitution is made openly, named in the claim's
  normalized proposition in the words a reader would use, and reported in
  `limitations` as the difference between what was asserted and what was
  measured. It is never made silently, and no finding describes a riding
  measure as a lane-use measure.

## Dates fixed in this brief

**As-of date (freeze date):** 2026-09-03. Anything decided or published
after this date is out of scope.

**Per-claim reference periods**, each fixed in the claim's own section
below. In summary: the counter claim takes the window its holder stated
(2026-01-01 to 2026-07-31); the corridor claim takes the 2025 calendar
year, and inside it the July and January measures its section defines;
the participation claims take the twelve months their instrument's
question asks about; the census claims take the 2021 Census reference
week; the travel-survey claims take the most recent Edmonton survey
published by the as-of date, whose date reviewers state.

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
window. The City publishes this on its open data portal at
`data.edmonton.ca` as "Bike and Pedestrian Counts (Eco Counter)",
dataset identifier `tq23-qn4m`, and publishes a separate counter-location
dataset beside it. Reviewers name the dataset and location dataset they
actually used, with their identifiers and their last update dates, and
state how many counters reported in the window. No other view of the
same data is relied on here; where a reviewer uses one, they name it and
say how it relates to the base dataset.

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
  1.10 million, or at least 1.50 million and at most 1.95 million. The
  failing part is the figure "nearly 1.3 million"; the counters record
  cycling at the order of magnitude the holder claimed.
- **Contradicted** if the total is below 0.65 million or above 1.95
  million. Either way the published record is half again away from the
  stated figure and does not carry it.
- **Not established** if the published record does not permit a network
  total to be computed, or if the published record does not cover
  2026-01-01 through 2026-07-31.

Alternative cutoffs, results required under both: Supported if the total
is at least 1.17 million and below 1.43 million (within a tenth of the
stated figure); Partially supported if the total is at least 0.65
million and below 1.17 million, or at least 1.43 million and at most
1.95 million; Contradicted if the total is below 0.65 million or above
1.95 million.

**If the published window is short, fixed here before the data is
seen.** The dataset's last update may fall before 2026-07-31. There is
no allowance for a short window. Missing days can only add to a total,
so a subtotal cannot carry any verdict that turns on where the total
sits between the cutoffs: a subtotal inside the Supported band could
cross 1.50 million once the missing days arrive, and a subtotal in the
Partially-supported band above it could cross 1.95 million.

- If the published records cover 2026-01-01 through 2026-07-31, the
  verdict is as above.
- If the published record does not cover 2026-01-01 through 2026-07-31,
  return Not established. Report the available subtotal, exact dates and
  direction of uncertainty as qualifications.

Neither set comes from an identified pre-existing standard. The primary
band is the stated figure plus or minus about fifteen percent, which is
the range in which "nearly 1.3 million" is a fair description of a
number, and half the stated figure either side is where the record stops
being about the same quantity, in both directions: a total three times
the stated figure points against "nearly 1.3 million" as surely as a
total a third of it does. No cutoff may be changed after the figures are
seen.

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

**Normalized proposition:** The Edmonton bike lanes that are metered,
including the lanes residents named as empty, carry little or no bicycle
traffic.

**Why this reading, and why it is not tested as an observation.** Ten
people each offered something they saw as evidence for a statement about
the lanes in general. Under the standing rule that a claim is tested as
its holders assert it, the general statement is the claim, and it is not
softened into a claim about four particular streets. It is not tested as
a claim about what anyone saw, because nothing in the public record can
establish what a person driving past noticed, and a proposition about
that would be unanswerable in either direction. It is tested instead as a
claim about how much traffic the lanes carry, measured by the instrument
that measures exactly that.

**What the counters can and cannot settle, fixed here.** The City's
counters sit at monitoring locations it chose. They are not a random or
representative sample of Edmonton's bike lanes, and no representative
sample of Edmonton's lanes is published. So the proposition names the
level the record answers, which is the metered lanes, and the verdict
covers those lanes and no others. Reviewers state how many City
automated bicycle counters exist, how many sit on on-street bike lanes,
and what share of Edmonton's on-street bike-lane kilometres those
counters sit on, where the City publishes a network length. Every
statement of the finding, in the panel output and on the page, says it is
about the lanes the City counts. A holder who means every lane in the
city is told, beside the verdict, that the unmetered lanes were not
measured and that nobody publishes a measure of them.

**Which lanes, fixed here.** The verdict set is every City automated
bicycle counter that was in service on 2025-07-01 and is sited on an
on-street bike lane rather than on a river valley or shared-use
recreational path, each reported individually. Reviewers classify each
counter from the City's published locations data, say how they classified
it, and list the set before reporting any figure.

**How much data a counter needs, fixed here.** A counter is
*classifiable* if it published bicycle counts for at least 20 of July
2025's 31 days. A counter below that is listed and its partial figures
reported, but it is not classified, and the coverage rule below then
decides what verdict is available.

**The named corridors, inside that set.** Holders of this claim named
four corridors: 119 Avenue; 132 Avenue between 97 Street and 127 Street;
the Hermitage area lanes; and the Whyte Avenue area. Reviewers say for
each whether a City counter sits on or adjacent to it, name the counter
if one does, and report its figures separately as well as inside the
verdict set. A named corridor with no counter is reported as such. This
membership is fixed before any data is read and may not be adjusted
afterwards.

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

Supported, Partially supported or Contradicted may be returned only if
every counter in the verdict set is classifiable. Otherwise return Not
established and report the observed counters as qualifications. Each of
these three verdicts quantifies over the metered lanes as a set, and one
unclassified counter can turn Supported or Contradicted into Partially
supported.

- **Supported** if every classifiable counter is below 25.
- **Partially supported** if at least one classifiable counter is below
  25 and at least one is at or above 25.
- **Contradicted** if no classifiable counter is below 25.
- **Not established** if any counter in the verdict set is not
  classifiable, or if the City's locations data does not allow on-street
  lanes to be told from recreational paths, or if the verdict set is
  empty. Report every counter's figures as qualifications in that case.

Alternative cutoff, results required under both: 50 a day in place of
25. Neither figure comes from an identified pre-existing standard.
Twenty-five bicycles a day is about one every forty minutes across a
sixteen-hour day, which is a rate a person passing a lane could
reasonably describe as seeing almost none, and it is well above every
quantity the holders themselves give (one a week, ten, none). No cutoff
may be changed after the figures are seen.

**Qualifications reported, never carrying the verdict:**

1. For each counter in the verdict set: the July median, the busiest
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

**Normalized proposition:** No more than about 2 percent of Edmonton's
population rides a bicycle.

**Why this reading, and why it is a ceiling.** Every wording of this
claim divides by the population and contrasts riders with "the other
98%". So the claim is a participation rate: the share of people who ride
at all. It is not a share of trips and not a share of commuters; those
are claims 5 and 6, tested separately against their own sources. Reading
this one as a trips or commuting figure would be reading someone else's
claim.

The word every holder uses is "only", and the point being made is that
the share is small. So the proposition is a ceiling, not a band. A
holder who says only 1 to 2 percent ride would not treat a measured 0.4
percent as refuting them, and a threshold that did so would let the claim
fail in the direction its holders are arguing for. The thresholds below
are therefore one-sided.

**Which forms carry the verdict, and which do not.** The merge folded
eight captured wordings into this claim. Six are about residents who
ride, as a share of the population: "2.3% of the populations usage", "2%
of constituents ride bikes", "1 percent of population to use", "The 1%",
"The whole 1-2%" and "Waste of money on 1% of population". Those six
carry the verdict, and the ceiling above is the level they cluster on.

Two are about people using the bike lanes rather than about people who
ride: "bike lanes for the .001% of the population" and "500 people using
the bike lanes 4 months of the year". No published Edmonton instrument
measures distinct bike-lane users, so those two are reported as
qualifications and described as unmeasured. A cycling-participation share
may not be set against them, in either direction: it is a different
numerator and comparing them would present a measure of one thing as
evidence about another. They are not dropped and they are not silently
folded in; the story says they were made and that nothing published
measures them.

**What is counted, fixed here.** The share of Edmonton residents who rode
a bicycle at least once in the twelve months before the instrument's
reference date. Twelve months is fixed here as the primary window,
before any figure is read, because a day, a month, a season and a year
give different participation rates and leaving the window to the reviewer
would leave a verdict-sensitive choice open. A published measure over a
shorter period is reported as an alternative and cannot carry the
verdict. Reviewers name the instrument, its sampling frame, its sample
size, its reference period and its exact question wording, and report the
share as published.

**Which instrument, fixed here.** The primary source is a probability or
otherwise representative sample of Edmonton residents that asks whether
the respondent cycled over a stated period. Reviewers look for and rule
in or out, by name:

- the City of Edmonton's own bike ridership surveys, including the 2014
  survey analysed in the peer-reviewed literature and any later survey in
  the same series, admissible if the published report states the sampling
  method and the share of respondents who ride;
- Statistics Canada's Canadian Community Health Survey, which asks about
  bicycling in the past twelve months. Its public use microdata file
  publishes health-region geography, not the City of Edmonton or the
  Edmonton census metropolitan area, so it may carry the verdict only if
  an identified released product publishes the measure for this brief's
  primary geography. Otherwise it is an inadmissible geographic
  alternative and is reported as one;
- any other Statistics Canada or Alberta Health survey release carrying a
  cycling or active-transportation participation estimate at the City or
  census-metropolitan-area level;
- the Edmonton and Region Household Travel Survey and its Navigating
  Tomorrow successor. Both measure trips rather than participation, the
  2015 survey being a 24-hour travel diary, so they serve this claim only
  if a published report states the share of respondents who made a
  bicycle trip, and then only over the period the diary covers, reported
  as the shorter-period alternative;
- any City of Edmonton survey drawn from a representative sample.

The City's Insight Community is an opt-in online panel, not a
representative sample of Edmontonians. Any figure from it is reported
under that name, labelled as a panel result, and cannot carry the
verdict.

**The editor's own search, recorded so reviewers can correct it rather
than repeat it.** Drafting this brief, the editor looked for a
representative Edmonton twelve-month cycling-participation measure and
did not identify one. The Canadian Community Health Survey's public use
file was ruled out on geography; the 2015 household travel survey was
ruled out as a 24-hour diary rather than a participation instrument; the
Navigating Tomorrow survey had published no results by the as-of date.
Reviewers are not bound by any of that and must search independently. If
a reviewer identifies an instrument the editor missed, that instrument
carries the verdict and the editor's note is wrong, which the story will
say.

**If no representative instrument publishes an Edmonton figure**, the
verdict is Not established, the panel and self-selected figures are
reported as qualifications under their own names, and the reviewer states
what was searched, for what period, as of when. That outcome is not a
technicality and the brief does not treat it as one: eight people in one
thread quoted a population share at each other, and finding that no
published Edmonton measure of it exists tells a reader something they
cannot get anywhere else. It is a real result, reachable alongside the
other three, not the result the definition forces. The proposition is not
the brief's invention: it is what eight people asserted, in those terms,
and a record that cannot answer it is a fact about the record.

**Thresholds.** Let P be the published share.

- **Supported** if P is at most 2.5 percent.
- **Partially supported** if P is above 2.5 percent and at most 5.0
  percent. The failing part is the stated ceiling; the share is still a
  small minority.
- **Contradicted** if P is above 5.0 percent.
- **Not established** if no representative published source measures
  cycling participation among Edmonton residents, as above.

Alternative cutoffs, results required under both: Supported at most 3.0
percent; Partially supported above 3.0 percent to 6.0 percent;
Contradicted above 6.0 percent. Neither set comes from an identified
pre-existing standard. The primary ceiling takes the highest circulating
form, 2.3 percent, and allows the slack "about" carries; five percent is
where a figure is no longer the same order as one or two percent. No
cutoff may be changed after the figures are seen.

**Qualifications reported, never carrying the verdict:**

1. The reference period the instrument used, and the same instrument's
   figure for a shorter period if it publishes one. The share of people
   who ride in a year and the share who ride on a given day are different
   numbers and the story will print both.
2. Whether the instrument covers all ages or only adults, and what it
   counts as a bicycle.
3. Any panel or self-selected figure, under its own name.
4. The equivalent published figure for the census metropolitan area,
   where the City figure is not published separately.
5. The two lane-use wordings, ".001% of the population" and "500 people
   using the bike lanes 4 months of the year", reported as made and
   described as unmeasured, with no participation figure set against
   them.

**What this claim does not test.** How often riders ride; whether riding
is growing; whether a minority share justifies or condemns any spending;
how many distinct people use a bike lane, which no instrument measures
and which the brief says so plainly.

### Claim 4, id: `one-percent-year-round-users`

**Normalized proposition:** No more than 1 percent of Edmonton's
population rides a bicycle year-round, and fewer than 15 percent ride in
the rest of the year.

**Why this reading.** The holder made one statement with two quantities
in it, and both are about the same population over the same year. They
are kept together because separating them would leave two claims neither
of which is what was said. The schema carries one verdict, so the verdict
is defined over both parts below, and a Partially supported verdict must
name which part fails. As in claim 3, "only" makes each part a ceiling
rather than a band, and the thresholds are one-sided.

**Rides, not uses the lanes, and why the proposition says so.** The
holder wrote "use them year round", where "them" is the bike lanes. No
published Edmonton instrument measures the distinct residents who use
bike lanes, in any season. Under check 9 of the framing check, where the
record cannot answer at the level people ask, the brief tests the nearest
level it does answer and the proposition names that level in words a
reader would use. So the proposition says "rides a bicycle". The
substitution is stated in `limitations` on this claim, it is stated
beside the verdict on the page, and no finding here may be described as a
finding about lane use.

**What is counted, fixed here.** From a published measure with a seasonal
split: (A) the share of Edmonton residents who ride through the winter as
well as the rest of the year, and (B) the share who ride during the
non-winter part of the year. Both parts must come from one instrument and
one sample, because two shares drawn from different samples are not a
seasonal split.

The same instrument rule as claim 3 applies, and it is stricter here: a
representative sample of Edmonton residents carries the verdict, the
candidate instruments are the ones claim 3 names, an opt-in panel is
reported under its own name and cannot carry the verdict. The editor's
bounded search recorded under claim 3 identified no instrument publishing
both seasonal shares from one Edmonton sample; reviewers are not bound by
that and must search independently. If none is identified, the verdict is
Not established, the search is bounded and stated, and any panel or
engagement figure is reported under its own name.

Where the instrument reports frequency bands rather than a year-round
share, reviewers state the band they read as year-round and why, and
report the adjacent band as well.

**Thresholds.** Part A holds if the published year-round share is at most
2.0 percent. Part B holds if the published non-winter share is below 15
percent.

- **Supported** if both parts hold.
- **Partially supported** if exactly one part holds. Name which.
- **Contradicted** if neither part holds.
- **Not established** if no published source measures Edmonton cycling
  participation with a seasonal split.

Alternative cutoff for Part A, results required under both: at most 3.0
percent. Part B's threshold is the holder's own stated ceiling and is not
varied. Neither figure comes from an identified pre-existing standard;
2.0 percent is where a measured share stops being a fair report of a
stated 1 percent. No cutoff may be changed after the figures are seen.

**Qualifications reported, never carrying the verdict:**

1. That Part B is a ceiling, not an estimate: any figure below 15 percent
   satisfies it, so a finding on Part B says less than a finding on Part
   A. State the published figure so the reader sees how far below the
   ceiling it falls, if it does.
2. The share of annual counter volume recorded in the winter months, as
   context and not as a participation rate. Counter volume is passages,
   not people, and may not be substituted for either part.
3. The instrument's definition of winter or year-round, in its own words.

**What this claim does not test.** How many distinct people use a bike
lane in either season, which no instrument measures; whether winter
cycling is practical, which is a separate published finding; whether the
lanes are cleared; whether year-round riding is growing.

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

- **Not established** if no published Edmonton source breaks bicycle
  trips down by purpose, or if the source's categories cannot be mapped
  completely onto recreation and commuting. Say what the obstacle is.
- Otherwise, where a complete mapping is possible:
  - **Supported** if Rec is above 50 percent.
  - **Partially supported** if Rec is above 35 percent, at most 50
    percent, and is the largest single purpose category.
  - **Contradicted** in every other case, including where Com is greater
    than Rec, where Rec is at most 35 percent, and where Rec is above 35
    percent but some third purpose category is larger.

Alternative cutoffs, results required under both, with the same exhaustive
structure: Supported above 45 percent; Partially supported above 30
percent, at most 45 percent, and largest; Contradicted otherwise. Neither
set comes from an identified pre-existing standard; "most" in ordinary
speech is more than half, and a plurality above a third is the weaker
reading of the same word. No cutoff may be changed after the figures are
seen.

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
`register-note.md` in this directory records the drop beside this brief
and says what the register would need before `/considered` could display
it, which it cannot today. The story for this question will state that
one captured claim was dropped and why.

## Stakes

What each verdict would change, for the person making the claim and for
the person arguing against it. Stated per claim, and stated without any
view of which way any of them comes out.

**Claim 1, the counter total.** Supported lets the holder cite a
published counter total near the figure he posted, and requires the two
commenters who answered "that never happened" and "the numbers must be
fudged" to answer the dataset instead. Contradicted requires the holder
to withdraw a figure he posted five times, and lets the other side say
the City's own data does not carry it. Partially supported lets each side
keep the part that held: the order of magnitude for him, the precision
for them. Not established would mean the City publishes counter data a
resident cannot total, which the story would report as a fact about the
open data.

**Claim 2, the metered lanes.** Supported lets the holders say the City's
own counters record the lanes as close to empty at the height of the
riding season, and requires the other side to answer the meters rather
than the anecdote. Contradicted requires the holders to drop the low-use
statement for the lanes that are measured, and lets the other side cite
the meters against it. Partially supported means the metered lanes differ
from each other, which would tell both sides that "the bike lanes" is not
one thing. Under every verdict the finding covers the metered lanes only,
and the story says which named lanes have no counter.

**Claim 3, the participation share.** Supported lets the holders cite a
published participation share at or below the ceiling they assert.
Contradicted requires them to drop it and lets the other side say
substantially more Edmontonians ride than the figure being repeated.
Partially supported means the share is larger than stated but still a
minority. Not established would mean eight people quoted a population
share that no published Edmonton instrument measures, which is a finding
about the argument itself.

**Claim 4, the seasonal shares.** Supported lets the holder cite both
seasonal ceilings. Contradicted requires both to be withdrawn.
Partially supported names which of the two failed, which matters because
the two halves of the sentence are doing different work. Not established
carries the same meaning as on claim 3.

**Claim 5, the share of trips.** Supported lets the holder cite a
published bicycle share of all trips near 2 percent, and requires those
answering with a commuting figure to accept that the two measure
different things. Contradicted requires the 2 percent figure to be
withdrawn. Partially supported means the figure is in the right region
and wrong in its value.

**Claim 6, the share of commuters.** Supported lets the holders cite a
census bicycle commuting share below 1 percent. Contradicted requires
that figure to be withdrawn and lets the other side cite the census
against it. Partially supported means the share is very small and the
stated threshold is still wrong.

**Claim 7, the share commuting by car.** Supported lets the holder cite
87 percent as a fair report of the census. Contradicted requires the
figure to be withdrawn. Partially supported means car commuting
dominates and the number is off.

**Claim 8, trip purpose.** Supported lets the holders say most cycling
is recreational on the source's own categories, and requires the other
side to answer it. Contradicted requires the recreational majority claim
to be dropped and lets the other side cite the purpose breakdown against
it. Partially supported means recreation is the largest purpose without
being most of it. Not established would mean nobody publishes what
Edmonton's bicycle trips are for.

**On every claim,** Partially supported permits only the part that held
to be repeated, and Not established means neither the claim nor its
negation was established, not that the claim is false. No verdict here
decides whether any bike lane, or any spending on one, was worth it.

**Reachability, claim by claim.** On claims 1, 2, 5, 6 and 7 the
instrument is published, the period is fixed and the threshold is set in
advance, so Supported, Partially supported and Contradicted are all
possible before any evidence is read. On claims 3, 4 and 8 those three
are possible if a representative Edmonton instrument publishes the
measure, and Not established is a genuine fourth outcome if none does;
each of those sections says exactly what would have to be missing, and
each says why finding it missing would itself tell a reader something.
No claim here has a verdict that cannot happen.

**Both kinds of number can hold at once, and neither decides the
other.** A count of passages past a counter and a share of trips or of
commuters are different measures of different things, and one being high
or low implies nothing about the other. That is why the eight claims are
briefed together and reported separately. Whoever quotes one of these
figures without its denominator is telling a reader something the figure
does not say, and that is true of a figure from either side.

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

Claim 2: per counter in the verdict set, the July 2025 median daily
count, the busiest day, the January 2025 median and the 2025 total; how
many counters exist, how many sit on on-street lanes, and what share of
the City's on-street bike-lane length they sit on where it is published;
the list of named corridors with no counter.

Claim 3: the published twelve-month participation share with its
instrument, sampling frame and question wording; any shorter-period
figure beside it; the two lane-use wordings listed as made and
unmeasured, with no share set against them.

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
