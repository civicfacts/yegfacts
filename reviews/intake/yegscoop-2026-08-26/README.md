# Whole-source intake, run once: the Yegscoop thread of 2026-08-26

The unit of intake here is the source, not a claim. Three cheap extractor
seats each read all 621 comments and listed every factual claim they found;
one strong seat merged the three lists into propositions and had to account
for every claim id it was given. Nothing was selected for interest, by a
model or by anyone else.

Run commands, models and timings: `manifest.md`. Raw seat outputs:
`extract-<seat>.json`, with the CLI text alongside as `extract-<seat>.raw.txt`.

| | |
| --- | --- |
| Extractor claims | 155 — haiku 63, luna 60, flash 32 |
| Propositions after merge | 67 |
| Found by all three seats | 17 |
| Found by two seats | 24 |
| Found by one seat | 26 |
| Dropped | 5 |
| Coverage check | passes: every extractor claim accounted for exactly once |

A caution that applies to every row below: these are things people asserted,
recorded as asserted. Nothing here has been checked, and the merge was
forbidden to judge truth.

## Propositions

`Seats` is which extractors found the proposition; `Commenters` is how many
distinct people asserted it. `Relation` says whether the project has already
registered this proposition (`variation-of <id>`) or has not (`new`).

| # | Proposition | Side | Commenters | Seats | Relation | A quote |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Edmonton's automated counters recorded nearly 1.3 million cycling trips through the first seven months of 2026. | for | 2 | haiku, flash, luna | new | "Through the first seven months of 2026, Edmonton recorded nearly 1.3 million cycling trip…" — [2] |
| 2 | Edmonton's bike lanes reduce traffic congestion rather than causing it. | for | 17 | haiku, flash, luna | variation-of at-congestion-reduced | "If you turn a two lane each way into a one lane each way so that cyclist feel safe, how e…" — [36] |
| 3 | The $100 million for bike lanes is about 1 percent of Edmonton's road capital budget, with roughly 99 percent of road spending going to car infrastructure. | for | 2 | haiku, flash, luna | variation-of bike-100m-one-percent-of-roads | "we currently spend 99% of our road budget on roads for cars" — [187] |
| 4 | Edmonton is removing traffic lanes all across the city to make room for bike lanes. | against | 4 | haiku, flash, luna | variation-of lanes-removed-citywide | "they absolutely have removed traffic lanes all throughout the city" — [15] |
| 5 | Only a tiny share of Edmontonians cycle, somewhere between less than 1 percent and 2.3 percent, while 87 percent commute by car. | against | 8 | haiku, flash, luna | variation-of bike-lanes-nobody-rides | "we are talking about huge expenditures for only 2.3% of the populations usage." — [60] |
| 6 | Ninety-five percent of Edmonton's cycling network is shared pathways or wide sidewalks, with the rest on low-traffic side streets. | for | 1 | haiku, flash, luna | new | "95% of the cycling network is shared pathways or wide sidewalks. The rest is on low traff…" — [193] |
| 7 | Maintaining Edmonton's bike lanes costs about three quarters of a million dollars a year. | against | 2 | haiku, flash, luna | new | "It costs around three quarters of a million to maintain them every year" — [513] |
| 8 | City Administration recommended freezing 14 future bike-lane routes for reassessment, and Council did not support that review. | against | 2 | haiku, flash, luna | variation-of rice-50m-motions-and-review | "Yesterday, City Administration recommended freezing 14 future routes to reassess — exactl…" — [449] |
| 9 | Councillor Karen Principe and a fellow councillor brought two motions, twice, to cut the bike-lane budget to $50 million and redirect the rest, and Council did not support them. | against | 1 | haiku, flash, luna | variation-of rice-50m-motions-and-review | "Councillor Karen Principe and I brought forward two motions — twice — to cut it to $50M a…" — [449] |
| 10 | Council voted to press ahead with the bike-lane expansion rather than pause it, carried by the same seven councillors who never intended to pause. | against | 3 | haiku, flash, luna | new | "the core 7 councillors never had an intention of pausing it." — [39] |
| 11 | Councillor Ashley Salvador had an approved plan to put bike lanes in front of Holyrood school and move the yellow buses across the street, which the school principal got stopped. | neither | 1 | haiku, flash, luna | new | "Ashley Salvatore wanted to put bike lanes in front of Holyrood school and move the yellow…" — [202] |
| 12 | Edmonton council signed an agreement to make Edmonton a 15-minute city. | against | 4 | haiku, flash, luna | variation-of fifteen-minute-city-agreement | "They signed a agreement to make Edmonton a 15 minute city...Google it it's true." — [90] |
| 13 | Edmonton city councillors receive a vehicle allowance. | against | 2 | haiku, flash, luna | new | "Our city councillors, who vote for stupidity to continue, get a very generous vehicle all…" — [58] |
| 14 | Cyclists pay the taxes that fund Edmonton's roads and bike infrastructure. | for | 6 | haiku, flash, luna | new | "people without cars still pay taxes in other ways that help to fund roads" — [73] |
| 15 | Drivers already pay for the roads through fuel tax, vehicle registration and other vehicle taxes. | against | 6 | haiku, flash, luna | new | "very few use the bike lanes and drivers pay the fuel tax to maintain the roads" — [365] |
| 16 | Turnout in Edmonton's last municipal election was under 40 percent. | neither | 2 | haiku, flash, luna | new | "Voter turnout in the last election was less than 40%" — [412] |
| 17 | Emergency services can drive down two-way protected bike lanes to bypass traffic queues. | for | 1 | haiku, flash, luna | new | "for two-way protected bike lanes, emergency services can actually travel down the bike la…" — [253] |
| 18 | Edmonton has committed about $100 million to bike lanes and the active transportation network. | neither | 9 | haiku, luna | variation-of at-100m-a-year | "$100,000,000 could be far better spent than wasting it on bike lanes" — [408] |
| 19 | The $100 million for bike lanes is spread over four years, not spent in one. | for | 2 | haiku, luna | variation-of bike-100m-one-percent-of-roads | "It's $100 million over 4 years." — [339] |
| 20 | Edmonton removes traffic lanes for traffic calming, not for cyclists, and adds bike lanes where the two can be combined. | for | 1 | haiku, flash | variation-of lanes-removed-citywide | "they are not removing lanes for cyclists. They are removing lanes for traffic calming mea…" — [12] |
| 21 | 102 Avenue lost traffic lanes to bike lanes, becoming one-way between 121 Street and 111 Street and losing lanes east of 109 Street. | against | 1 | haiku, flash | variation-of lanes-removed-citywide | "102nd Ave between 121st and 111th. Used to be 2 ways, now one way with a bike lane. 102 A…" — [13] |
| 22 | 132 Avenue lost traffic lanes to bike lanes built on both sides of the road. | against | 6 | flash, luna | variation-of lanes-removed-citywide | "they sure have removed Traffic lanes and replaced with bike lanes! Just check out what th…" — [18] |
| 23 | Edmonton's bike lanes sit nearly empty, with barely any riders on them summer or winter. | against | 8 | haiku, luna | variation-of bike-lanes-nobody-rides | "I see a cyclist very rarely. On 40th Ave between Hermitage and 137 st., there is a bike l…" — [415] |
| 24 | About 2 percent of all trips in Edmonton are made by bicycle, and higher in neighbourhoods with bike infrastructure. | for | 2 | haiku, flash | variation-of bike-lanes-nobody-rides | "*2% of trips are done by bicycle, although it's higher in neighborhoods with bike infrast…" — [187] |
| 25 | Edmonton's winter runs six to eight months, so the bike lanes are usable only a few months of the year. | against | 14 | haiku, luna | variation-of wc-too-cold | "In a city that spends most of the year battling winter they are expanding bike lanes" — [283] |
| 26 | Cycling in Edmonton has risen over the past few years, including in winter and on the new lanes. | for | 2 | haiku, luna | new | "There's been an impressive increase in winter riders over the past few years and I'm no l…" — [135] |
| 27 | The bike-lane expansion takes away on-street parking in established neighbourhoods. | against | 6 | haiku, luna | new | "people that have had these put in on both sides of the road talking about 132 ave you los…" — [395] |
| 28 | Edmonton plows the bike lanes in winter before it clears the streets. | against | 2 | haiku, luna | new | "bike lanes get plowed in the winter before the streets do" — [280] |
| 29 | The City planned bike routes on old data with no community consultation, without informing residents or engaging parents of school children. | against | 2 | haiku, luna | new | "none of the residents were actually informed by Ashley Salvador of the proposed bike plan…" — [393] |
| 30 | Most Edmonton residents oppose the bike-lane expansion, including whole neighbourhoods that voted no. | against | 6 | haiku, luna | new | "the majority of voters elected the current city council knowing they were pro bike lane." — [207] |
| 31 | The pro bike-lane people at the council meeting were paid to be there, with taxpayers' money. | against | 1 | haiku, luna | new | "Those pro bike lane people were orivably paid to be,at that meeting." — [416] |
| 32 | City administration staff paid over $100,000 plus pension are pushing climate and anti-car ideologies through bike-lane policy. | against | 1 | haiku, flash | new | "rabid ideologues in city admin. They are unveiled get paid over 100k and pension and push…" — [8] |
| 33 | The Province has directed that future Edmonton bike lanes stop until the city has a plan for moving traffic, and will legislate to restrict them. | against | 5 | haiku, luna | new | "Province's direction to stop future bike lanes from proceeding until they have a plan whe…" — [221] |
| 34 | Edmonton's municipal roads are funded mainly out of property taxes, not car payments, gas or insurance. | for | 3 | haiku, luna | new | "The majority of municipal roads are funded through property tax." — [193] |
| 35 | Edmonton's roads and basic services are in poor shape, with potholes, unpaved streets, uncut grass and inadequate snow removal. | against | 11 | haiku, luna | new | "Half the city is barely able to move because road quality is so low!." — [228] |
| 36 | A recall election is allowed 18 months after the municipal election and one is already in the works for April. | neither | 1 | haiku, luna | new | "18 months after the election is the when it's allowed. It's already in the works" — [238] |
| 37 | Concrete bike-lane barriers and narrowed lanes block ambulances, fire trucks, DATS pickups, deliveries and access for disabled residents. | against | 5 | haiku, luna | new | "how do bike lanes- with concrete barriers- allow emergency vehicles/ ambulances etc direc…" — [244] |
| 38 | 83 Avenue has had its bike lane for over a decade with no complaints. | for | 1 | haiku, flash | new | "It's been like this on 83 Ave for over a decade and there have been no complaints." — [247] |
| 39 | Professional engineers approve bike routes for safety before they are built. | for | 1 | flash, luna | new | "routes are approved for safety by professional engineers before they are constructed" — [201] |
| 40 | Roads carry the goods, services, buses and emergency vehicles society depends on, including delivering the bikes themselves. | against | 2 | haiku, luna | new | "Roads also move the goods and services need by society, including getting the bike to you" — [301] |
| 41 | Edmonton spent $181 million grade-separating 600 metres of 50 Street, and spends billions on road projects such as the Yellowhead. | for | 2 | flash, luna | variation-of fifty-street-181m-600m | "a pittance compared to the billions for road building." — [266] |
| 42 | The City's $100 million for the active transportation network is close to proportional to the number of cyclists. | for | 1 | flash | new | "the City's 100M for the active transportation network is close to proportional to cyclist…" — [26] |
| 43 | Some Edmontonians ride year-round, through January, snow, rain and blizzards at -30. | for | 3 | luna | variation-of wc-too-cold | "rides every single day, rain, shine, or blizzard" — [165] |
| 44 | Edmonton does not put bike lanes on arterial roads. | for | 1 | flash | new | "there are none on arterial roads" — [600] |
| 45 | The council sessions on bike lanes were held when working residents were at work and could not attend. | against | 2 | haiku | new | "why not put in a session for people who can actually attend! This was not fair to 98% of …" — [177] |
| 46 | More people showed up at the council meeting in support of the bike lanes than against them. | for | 3 | haiku | new | "Supposedly this happened because more people for the bike lanes showed up, then those who…" — [38] |
| 47 | There are seven schools on 132 Avenue. | against | 1 | haiku | new | "132 Ave with 7 schools on the Ave is insane !" — [361] |
| 48 | Council and administration are trying to end car use in Edmonton. | against | 3 | haiku | new | "people are driven by insane socialist ideas. Climate change and the environment is more i…" — [84] |
| 49 | Edmonton cyclists typically have higher-paying jobs and more education than people who do not cycle. | for | 1 | flash | new | "cyclist are taxpayers and typically have higher paying jobs are more education than those…" — [43] |
| 50 | Edmonton property taxes keep rising while city services decline. | against | 5 | luna | new | "continually increase property taxes while services are decreasing" — [431] |
| 51 | The City says it has a huge infrastructure deficit and cannot pay for what it has already committed to. | against | 5 | luna | new | "the city claims they have a huge infestructure deficit." — [125] |
| 52 | Administration has put two snow-removal proposals to council, both requiring spending increases, and council will debate bringing back calcium chloride as an anti-icer. | neither | 1 | luna | new | "administration has already put 2 different proposals to council for snow removal" — [510] |
| 53 | Mayor Andrew Knack backed the bike-lane expansion. | neither | 2 | haiku | new | "Can't wait for election hopefully Mr. Bike lane knack doesn't destroy the city" — [414] |
| 54 | Councillor Ashley Salvador's husband owns an infill company. | against | 1 | haiku | new | "Can blame Ashley Salvador for this. Husband has an infill company" — [362] |
| 55 | Edmonton subsidizes free parking for motor vehicles. | for | 1 | flash | new | "Subsidizing free parking for vehicles is a waste of mine." — [99] |
| 56 | The city no longer requires minimum parking. | neither | 1 | luna | new | "The city doesn't require minimum parking anymore" — [104] |
| 57 | Bike lanes make riding safer, open travel to people who cannot drive, and improve health while cutting noise and air pollution. | for | 7 | luna | new | "adds accessibility for those who don't or can't drive, in addition to improving health fo…" — [56] |
| 58 | Cyclists have the same legal right to the road as drivers and face hostile driving without protected lanes. | for | 3 | luna | new | "I've been honked at, buzzed by too closely and veered at when I've been riding lawfully o…" — [70] |
| 59 | Edmonton cyclists ride on sidewalks and run red and yellow lights without signalling, even where bike lanes exist. | against | 4 | luna | new | "Most dangerous encounters I have daily are cyclists and scooter riders on downtown sidewa…" — [13] |
| 60 | Edmonton transit is far slower than driving or cycling on some routes and needs better frequency, priority and safety. | against | 5 | luna | new | "Driving to work 15min, busing to work 1 hour 45 minutes, biking to work 1 hour 5 minutes." — [531] |
| 61 | Downtown restaurants and businesses are closing because customers cannot get to them. | against | 1 | luna | new | "restaurants and businesses will and are failing downtown already - closing doors because …" — [315] |
| 62 | The City has already paid for the designs and contracts, so cancelling or ripping out the lanes would cost more money. | for | 3 | luna | new | "We've already paid for the design, and many contracts and shouldn't be cancelling them no…" — [183] |
| 63 | The bike-lane program was driven by lobbyists and special-interest groups rather than residents. | against | 3 | luna | new | "corrupt city administration with kickbacks from the federal government and large corporat…" — [575] |
| 64 | The City has moved from painted lines to small jersey curb barriers to full redesigns of sidewalks, bike lane and road. | neither | 1 | luna | new | "The city went to painted on lines to small jersey curb barriers to full redesign of sidew…" — [127] |
| 65 | Edmonton's bike routes include 113 Street, 83 Avenue, 103 Avenue, 76 Avenue, 110 Street, 119 Avenue and Hermitage. | neither | 3 | luna | new | "like 76 Ave, 83 Ave, 103 Axe, 113 St , 110st." — [193] |
| 66 | Edmonton's cycling network is made of disconnected stretches with missing connections, including along the LRT line. | neither | 7 | luna | new | "Let's link up all the orphans stretches of bike infrastructure." — [7] |
| 67 | Cycling lets people avoid the cost of car ownership, fuel and insurance. | for | 3 | luna | new | "Healthy methods of transport where we dont have to spend half our income on gas, and insu…" — [87] |

## Dropped

Five of the 155 extractor claims were not propositions. Every one was dropped
as `not a claim`; nothing was dropped as a duplicate or as out of scope.

- `haiku/e-035` — not a claim — a value judgement that Karen Principe is the only councillor listening.
- `haiku/e-055` — not a claim — a policy proposal that cyclists should pay registration and insurance, not an assertion of fact.
- `luna/e-039` — not a claim — the same policy demand that bikes be licensed and insured, stated as what should happen rather than what is.
- `luna/e-046` — not a claim — a prediction that the expansion will push taxes up next year.
- `luna/e-052` — not a claim — a value judgement that the money should have gone to roads, housing, hospitals and other services instead.

## Comparison: the seven the editor registered by hand

On 2026-09-02 an editor read this same thread and registered seven candidates
from it. Every one of the seven is here.

| Hand-registered candidate | Matched by | Seats |
| --- | --- | --- |
| `bike-lanes-nobody-rides` | 5 `almost-nobody-cycles`, and 23 `bike-lanes-seldom-used`, 24 `two-percent-of-trips-by-bike` | 3, 2, 2 |
| `commute-87-cars-1-bikes` | 5 `almost-nobody-cycles` — the merge folded the mode-share forms into the same proposition, which is the fold the editor made by hand the same day | 3 |
| `bike-100m-one-percent-of-roads` | 3 `hundred-million-one-percent-of-road-budget`, and 19 `hundred-million-over-four-years` | 3, 2 |
| `fifty-street-181m-600m` | 41 `fifty-street-181-million` | 2 |
| `lanes-removed-citywide` | 4 `traffic-lanes-removed-citywide`, and 20, 21, 22 (traffic calming, 102 Avenue, 132 Avenue) | 3, 2, 2, 2 |
| `rice-50m-motions-and-review` | 8 `administration-freeze-14-routes` and 9 `fifty-million-motions` — the merge split the councillor's single registered wording into the two separate propositions it actually makes | 3, 3 |
| `fifteen-minute-city-agreement` | 12 `fifteen-minute-city-agreement` | 3 |

Seven for seven, and the split of `rice-50m-motions-and-review` into two
propositions is a better cut than the hand entry: a record of the two budget
motions and a record of the route-freeze review are separate documents with
separate answers.

### What the hand pass did not register

Of the 41 propositions found by two or more seats, 28 are not among the seven.
Three of those are already registered from elsewhere: 2
`congestion-and-bike-lanes` (`at-congestion-reduced`, PARKed), 18
`hundred-million-for-bike-lanes` (`at-100m-a-year`, PARKed) and 25
`winter-limits-bike-lane-use` (the published `wc-too-cold`). The thread is
holder-provenance for all three, which the register already notes for two of
them.

That leaves **25 propositions that two or more seats found, that no one has
registered**:

| # | Proposition | Side | Commenters | Seats |
| --- | --- | --- | --- | --- |
| 1 | Edmonton's automated counters recorded nearly 1.3 million cycling trips through the first seven months of 2026. | for | 2 | haiku, flash, luna |
| 6 | Ninety-five percent of Edmonton's cycling network is shared pathways or wide sidewalks, with the rest on low-traffic side streets. | for | 1 | haiku, flash, luna |
| 7 | Maintaining Edmonton's bike lanes costs about three quarters of a million dollars a year. | against | 2 | haiku, flash, luna |
| 10 | Council voted to press ahead with the bike-lane expansion rather than pause it, carried by the same seven councillors who never intended to pause. | against | 3 | haiku, flash, luna |
| 11 | Councillor Ashley Salvador had an approved plan to put bike lanes in front of Holyrood school and move the yellow buses across the street, which the school principal got stopped. | neither | 1 | haiku, flash, luna |
| 13 | Edmonton city councillors receive a vehicle allowance. | against | 2 | haiku, flash, luna |
| 14 | Cyclists pay the taxes that fund Edmonton's roads and bike infrastructure. | for | 6 | haiku, flash, luna |
| 15 | Drivers already pay for the roads through fuel tax, vehicle registration and other vehicle taxes. | against | 6 | haiku, flash, luna |
| 16 | Turnout in Edmonton's last municipal election was under 40 percent. | neither | 2 | haiku, flash, luna |
| 17 | Emergency services can drive down two-way protected bike lanes to bypass traffic queues. | for | 1 | haiku, flash, luna |
| 26 | Cycling in Edmonton has risen over the past few years, including in winter and on the new lanes. | for | 2 | haiku, luna |
| 27 | The bike-lane expansion takes away on-street parking in established neighbourhoods. | against | 6 | haiku, luna |
| 28 | Edmonton plows the bike lanes in winter before it clears the streets. | against | 2 | haiku, luna |
| 29 | The City planned bike routes on old data with no community consultation, without informing residents or engaging parents of school children. | against | 2 | haiku, luna |
| 30 | Most Edmonton residents oppose the bike-lane expansion, including whole neighbourhoods that voted no. | against | 6 | haiku, luna |
| 31 | The pro bike-lane people at the council meeting were paid to be there, with taxpayers' money. | against | 1 | haiku, luna |
| 32 | City administration staff paid over $100,000 plus pension are pushing climate and anti-car ideologies through bike-lane policy. | against | 1 | haiku, flash |
| 33 | The Province has directed that future Edmonton bike lanes stop until the city has a plan for moving traffic, and will legislate to restrict them. | against | 5 | haiku, luna |
| 34 | Edmonton's municipal roads are funded mainly out of property taxes, not car payments, gas or insurance. | for | 3 | haiku, luna |
| 35 | Edmonton's roads and basic services are in poor shape, with potholes, unpaved streets, uncut grass and inadequate snow removal. | against | 11 | haiku, luna |
| 36 | A recall election is allowed 18 months after the municipal election and one is already in the works for April. | neither | 1 | haiku, luna |
| 37 | Concrete bike-lane barriers and narrowed lanes block ambulances, fire trucks, DATS pickups, deliveries and access for disabled residents. | against | 5 | haiku, luna |
| 38 | 83 Avenue has had its bike lane for over a decade with no complaints. | for | 1 | haiku, flash |
| 39 | Professional engineers approve bike routes for safety before they are built. | for | 1 | flash, luna |
| 40 | Roads carry the goods, services, buses and emergency vehicles society depends on, including delivering the bikes themselves. | against | 2 | haiku, luna |

The load-bearing ones, in the sense that the argument in the thread turns on
them:

- **1, the counter number.** "All 5 people who ride bikes showed up?" is
  answered in the very next comment with "nearly 1.3 million cycling trips
  across its automated counters", and that exchange is then re-fought at
  comments 81, 111, 121, 213 and 369, with a flat "that never happened" among
  the replies. The hand pass registered the "nobody rides" side of that
  exchange and not the number offered against it. It is the single most
  checkable thing in the thread and the only one where both sides put a
  figure on the table.
- **15 and 14, who pays for the roads.** "Drivers already pay through fuel
  tax and registration" against "municipal roads come out of property taxes,
  which cyclists pay too" — six commenters each, and the premise under most of
  the "cyclists should pay their share" argument.
- **7, the maintenance figure.** "three quarters of a million a year" is a
  specific number that two commenters used and no one contested.
- **33, the Province.** Five commenters assert the Province has directed that
  future lanes stop, or will legislate them away. That is a checkable
  statement about an intergovernmental fact and it drives the "this is all
  moot" strand of the thread.
- **30 and 31, who wanted this.** "Most residents oppose it" (six commenters)
  and "the supporters at council were paid to be there" are the claims that
  give the opposition its democratic footing.
- **37 and 17, emergency access.** Both sides make a factual claim about
  whether barriers block ambulances or let them through; five commenters on
  one side, one on the other.

### Reading the seats

- **haiku** found the most claims (63) and read the argument's structure best:
  it is the only seat that caught assertion-and-denial pairs as separate
  claims and the only one that resolved "that never happened" to the thing
  being denied. Fifteen of its 101 quotes are not verbatim substrings of the
  comment cited, usually a paraphrase or a quote stitched from two sentences.
- **luna** found 60 claims but carried far more evidence — 298 forms, and it
  cited 206 distinct comments where haiku cited 94 and flash 90. Twelve quotes
  are not verbatim. Its weakness is the opposite of thin: several of its
  claims are aggregations rather than propositions ("Edmonton's road,
  sidewalk, snow-removal, drainage, transit and other basic infrastructure and
  services have significant unresolved problems"), and a few are meta-claims
  about what commenters assert rather than claims themselves.
- **flash was the worst seat**, and not only because it found half as many
  claims (32). It fabricated comment indexes: 15 of its 101 forms cite comment
  numbers that do not exist in a 621-comment thread — 1148, 1184, 1211, 1307,
  1757. Four of those survived the merge into propositions 22 and 38, which is
  the reason those two rows carry a citation that cannot be followed. A seat
  that invents a citation is worse than a seat that finds less, and this is
  the finding that should decide whether flash stays in the panel. Its first
  attempt also opened by declaring it could not read the input and then
  answered anyway (see `manifest.md`); that answer, kept as
  `superseded-flash-attempt1.json`, has no fabricated indexes at all.

Quote fidelity is not checked by `scripts/intake-coverage.ts`, which only
checks that no claim goes missing. On this run, 31 of the merged file's 272
forms are not exact substrings of the comment they cite and 4 cite a comment
that does not exist. If whole-source intake is adopted, that check belongs in
the script before any of this reaches a brief.
