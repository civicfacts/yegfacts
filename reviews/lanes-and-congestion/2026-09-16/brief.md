# Review brief: Do Edmonton's bike lanes ease traffic congestion or make it worse?

Status: **REVISED after framing check 1, not frozen.** Check 1
(`framing/check-1.md`, OpenAI seat through `scripts/panel/audit-package.sh`)
returned REVISE with two defect findings and nine framing findings. The
defects are corrected in the checker's exact wording; the framing findings
and what changed for each are in `framing/response-1.md`. One claim,
`79-street-relieves-75-street`, left the brief on the checker's finding
that it belongs with the registered 79 Street question; see "Dropped at
the brief". The brief goes back for check 2. The freeze is the sha256 of
this file, recorded in `run-record.md` with the one line that recomputes
it, once a check returns FRAME OK.
Drafted 2026-09-16 and revised the same day by Stew.
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
  lane to a bike lane has increased motor-vehicle congestion on the
  Edmonton corridors where it was done.
- `bike-infra-reduces-congestion`: whether Edmonton's cycling
  infrastructure has been shown to reduce motor-vehicle congestion by
  moving trips out of cars.
- `city-removed-traffic-lanes`: whether the City has removed
  motor-vehicle through lanes for bike lanes across a geographically
  broad share of the city.
- `lanes-removed-for-traffic-calming`: whether, where the City removed a
  through lane and added a bike lane, its own record says the lane would
  have gone for traffic calming anyway.

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
   change: the Downtown Bike Network evaluation programme begun in 2017
   and its interim report, project pages and "what we heard" reports for
   later routes, and the administration reports to Council and its
   committees on the bike-lane program, including the 2026-08-26
   Infrastructure Committee package already in this site's evidence
   registry. These are the primary instrument for the two congestion
   claims. Reviewers establish which corridors have such a measurement
   published by the as-of date.
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
   its implementation guide establish which corridors had a motor-vehicle
   lane removed and a bike lane added, and what reason the City gave.
   These are the instrument for claims 3 and 4.
4. **Cycling counts and mode share.** The City's automated bicycle
   counters and the Edmonton and Region Household Travel Survey, both
   already tested under the question `cycling-volumes`, are context for
   claim 2 and never carry a verdict here. The travel survey measures
   regional travel patterns and modes; it is not a route-user
   counterfactual instrument and does not count toward claim 2's S.

"Congestion" is fixed for this brief as **motor-vehicle delay on a
corridor**. Primary definition: change in peak-period average travel time
or delay. Alternative definition, reported where the City publishes the
inputs: change in peak-period queue or level of service, or in
travel-time reliability; reviewers state whether the alternative changes
the claim's classification. Where a City document reports one of those
measures instead of travel time, reviewers report the document's own
measure and say how it maps. Vehicle volume remains contextual and is not
itself congestion.

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
claim. Claims 1, 3 and 4 are about a set of corridors inside it; claim 2
is about the city, and the brief says below what the record can answer at
that level. Where a claim counts areas, an area is one of the 15
district-plan areas shown in the City's plans in effect and adopted
through the applicable district-plan bylaw; Charter Bylaw 24000 supplies
the District Policy, not the individual area boundaries.

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
converted corridors, with a coverage rule so that a few measured
corridors cannot carry a verdict about the program. Idling and emissions
are reported as a separate consequence and do not carry this verdict.

**What is counted, fixed here.** The set of corridors is every Edmonton
street segment on which the City removed a motor-vehicle through lane and
installed a bike lane, as established under claim 3 from the City's own
project record; its size is T. The measure is the City's published
before-and-after motor-vehicle travel time or delay for the peak period on
that corridor. A corridor with no such measurement published is in the
set but cannot carry evidence either way, and the story reports how many
of the converted corridors the City measured at all.

**Thresholds.** Let T be the total number of qualifying converted
corridors established under claim 3. Let M be the number of those with a
published before-and-after travel-time or delay measurement, and of those
let U be the number where peak-period travel time or delay rose by at
least 10 per cent after the conversion, on the City's own figures.

Coverage rule, read first: Supported requires measurements for at least
half of T. The result is reported again using one-third of T as the
alternative coverage threshold. If neither coverage threshold is met, the
general proposition is Not established, and the measured-corridor results
remain qualifications.

Where the coverage rule is met:

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
2. The alternative congestion measures, queue or level of service and
   reliability, where the City publishes them, and whether they change
   the classification.
3. Whether any City evaluation measured the whole network's travel times
   rather than one corridor's, and what it found.
4. Idling and emissions: reviewers determine whether an Edmonton-specific
   published measurement exists and bound any reported absence by source,
   corridor, period and search date.
5. Whether the measured corridors are the ones commenters named (102
   Avenue, 132 Avenue, Hermitage Road) or others.

**What this claim does not test.** Whether the lanes should have been
built; whether traffic is worse in Edmonton generally; anything a
commenter saw from a car.

### Claim 2, id: `bike-infra-reduces-congestion`

**Normalized proposition:** Edmonton's cycling infrastructure has been
shown to reduce motor-vehicle congestion in the city by moving trips out
of cars.

**Why this reading.** Six people said it, and the mechanism every one
names is substitution: a person on a bike is a person not driving. The
strongest fair reading keeps the consequence they assert, less
congestion, and the cause they assert, the infrastructure. A proposition
that only said "a bicycle trip is not a car trip" would be a truism, and a
verdict on it would tell no one anything. So the claim is tested as a
claim about a demonstrated causal chain in Edmonton, which is how the
holders argue it: "the better Edmonton's traffic situation gets".

**What is counted, fixed here.** Two links, both from published Edmonton
evidence. S counts only studies that directly estimate infrastructure-
attributable substitution from driving to cycling through a stated
counterfactual method: a route-user survey asking what the trip would
otherwise have been, a before-and-after design with a comparison
corridor, or an equivalent method the study states. D counts only
reductions in peak-period motor-vehicle travel time or delay that the
same study, or a network analysis linked to it, attributes to that
substitution. Unlinked bicycle and vehicle counts, on the same corridor
or elsewhere, are qualifications and count toward neither.

**Thresholds.**

- **Supported** if S is at least 1 and D is at least 1 and the evidence
  connects both links in the same evaluated population or network.
- **Partially supported** if evidence establishes only one link, that is,
  exactly one of S and D is at least 1, or both are but in unconnected
  populations.
- **Contradicted** if S and D are both zero and comparable causal or
  network evidence in Edmonton points against the claimed reduction: a
  study of the same kind finding no substitution, or a network analysis
  attributing higher delay to the infrastructure.
- **Not established** if S and D are both zero and no such contrary
  evidence exists.

Alternative cutoff, results required under both: for D, a reduction of
at least 5 per cent in place of 10 where the study reports a magnitude.

**Qualifications reported, never carrying the verdict:**

1. The share of trips made by bicycle in Edmonton from the most recent
   published regional travel survey, already established under
   `cycling-volumes`, as context for what scale of substitution is
   possible.
2. Any City statement of the purpose of the bike network in its own
   plans, and whether reducing congestion is among the purposes it names.
3. Coincident before-and-after counts on converted corridors, bicycle and
   motor-vehicle, reported as counts and not as substitution.

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
standards, which is why both are reported.

**Qualifications reported, never carrying the verdict:**

1. For each named example, whether the change the commenter described
   happened as described, and if the street was changed for a different
   reason (the record on 102 Avenue between 99 Street and 102 Street, for
   instance, attributes its one-way conversion to LRT construction), that
   reason.
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
claim 3. Traffic calming is the primary reading, because that is the
reason the holder gave. Street renewal, transit priority, LRT
construction, generic safety and other reasons are reported separately as
qualifications and do not count as traffic calming unless the City
document expressly links them to a traffic-calming lane removal.

**What is counted, fixed here.** For each corridor that counts under
claim 3, the reason the City's own contemporaneous document gives for the
lane removal: the project page, the design rationale, the council or
committee report that approved it. A corridor counts for the claim (O)
where the document gives traffic calming, in those words or in the City's
equivalent terms for it, as a purpose of the lane removal in its own
right, not as a consequence of fitting the bike lane. A corridor counts
against (B) where the document gives the bike lane as the reason for the
lane removal. A document that gives both counts in both and is reported
as such. Whether the document also says the bike lane was combined with
the work or saved money is reported per corridor as a qualification, not
as a condition. No stated reason is no evidence.

**Thresholds.** Let C be the corridors that count under claim 3 with a
stated reason on the record, let O be those whose stated reason is
traffic calming as defined above, and let B be those whose stated reason
is the bike lane, with "both" corridors counted in both O and B.

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
2. For each corridor, whether the record says the bike lane was combined
   with the work or saved money.
3. Corridors whose stated reason is renewal, transit priority, LRT
   construction or safety without an express traffic-calming link, listed
   under those reasons.
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

**Claim 1, lanes taken, congestion made.** Supported means holders may
say an adequately covered set of City measurements shows the claimed
general increase; opponents must concede that measured result.
Contradicted means holders must abandon that general measured claim at
the fixed cutoff; opponents may say the adequately covered record points
against it. Partially supported means both sides must accept
heterogeneous corridor results. Not established means neither side gains
an effect conclusion; only the measurement gap is established, and the
story reports it as a fact about the record.

**Claim 2, one less car.** Supported means holders gain Edmonton evidence
connecting infrastructure, car-trip substitution and lower motor-vehicle
delay; opponents must concede that causal chain. Contradicted means
holders must abandon that Edmonton causal claim and opponents gain
comparable evidence pointing against it. Partially supported means only
one link or a local effect is established. Not established means neither
the arithmetic argument nor its rejection has been demonstrated in
Edmonton; the holders keep their arithmetic and lose the claim that it has
been shown to work here.

**Claim 3, they took the lanes.** Supported means holders establish broad
geographic occurrence and opponents must withdraw a blanket denial.
Contradicted means holders must withdraw the claim that any through lane
was removed and opponents may maintain the denial. Partially supported
means specific removals are established but "all throughout" is not. Not
established means the prior-use record is too incomplete for either
side's generalisation.

**Claim 4, not for the bikes.** Supported means the holder establishes
that the documented reason was traffic calming on the required share of
corridors; opponents must answer those records. Contradicted means the
holder must withdraw that general account and opponents may say the
documented reasons point against it. Partially supported means the
reasons vary by corridor. Not established means neither side may infer a
reason from undocumented projects.

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
  1 and 4. It is built once, from the City's record, and each claim
  reads it; the list is reported in full with the document behind each
  entry.

Claim 1: T; for each converted corridor, whether a before-and-after
travel-time or delay measurement is published; for each that is, the
before figure, the after figure, the periods, and the percentage change;
M and U under both cutoffs; the coverage ratio M over T against both
coverage thresholds.

Claim 2: S and D as defined, each entry with its document, its method and
the population or network it covers; any contrary study of the same kind;
the cycling mode share figure and survey named as context.

Claim 3: T and R; the corridor list with segment, year, prior lane use,
document and district-plan area; C and A under both thresholds; the three
named examples checked as stated.

Claim 4: for each corridor on the list, the stated reason in the
document's words, whether it is traffic calming under this brief's
definition, and whether the document says the bike lane was combined or
saved money; C, O and B.

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
