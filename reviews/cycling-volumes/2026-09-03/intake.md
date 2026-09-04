# Intake record: How many people in Edmonton cycle, and how much do the bike lanes get used?

Recorded 2026-09-03 by Stew. Question id `cycling-volumes`.

This is the first question the site has checked that an editor did not
choose. It came out of whole-source intake (methodology v1.15) and the
grouping and triage that followed (v1.16), and the register
(`intake/register.yaml`) is its primary record. This file exists so the
framing checker has the raw claims, their provenance and their context
in one place.

## Provenance

- **Source:** `yegscoop-2026-08-26`, a Facebook post by Yegscoop about
  the Infrastructure Committee's bike-lane decision of 2026-08-26, with
  all 621 comments, captured by the founder on 2026-09-02 and committed
  at `intake/captures/yegscoop-2026-08-26/comments.jsonl`. The source
  URL and the capture's own terms are in that directory's README.
- **How the claims were found:** three extractor seats read the whole
  thread and listed every materially factual claim in it; a merge seat
  folded the three lists into propositions; `scripts/intake-coverage.ts`
  proved nothing raised was lost; `scripts/intake-quote-gate.ts` threw
  out any wording that is not an unbroken run of the comment it cites.
  Artifacts: `reviews/intake/yegscoop-2026-08-26/`.
- **How this question was formed:** `prompts/intake-group.md` grouped
  the propositions into 34 questions. Two triage readers, both from a
  different vendor than the editor and neither shown the other, ruled on
  every question. Both returned GO on this one
  (`reviews/intake/yegscoop-2026-08-26/triage-stories.md`). The register
  records the public reason.
- **Every wording below is captured, not composed.** No wording in this
  question has `origin: editor`. Commenters carry stable pseudonyms;
  the mapping to real names is not in this repository.
- **Accounts:** the register counts 25 distinct people taking part in
  this question, 5 arguing for and 21 against. Those two figures do not
  sum to the total because a person can appear on both sides of
  different claims within the question. The comments that carry the
  claims below are 35 of the thread's 621.

## The claims, verbatim, with the comment each sits in

Numbers in brackets are the 1-based comment index in the capture.

### `cycling-trips-1-3-million-2026`

- [2] Boreal Hare I., replying to a comment asking "All 5 people who ride
  bikes showed up?": "Through the first seven months of 2026, Edmonton
  recorded nearly 1.3 million cycling trips across its automated
  counters. So you only missed by about 1.3 million -5! Way to go champ!
  Thanks for playing"
- [81], [121], [213], [369] the same commenter repeats the sentence
  verbatim in four other places in the thread.
- [4] Snowy Hare F.: "that never happened"
- [403] Misty Jackrabbit D.: "The numbers must be fudged"

Context: this is the thread's own factual rebuttal, and two commenters
dispute it directly. The figure is not attributed to a document in the
comment.

### `bike-lanes-look-empty`

- [21] Rustic Hare L.: "when out I see very few bikes on these very
  expensive bike lanes."
- [35] Hardy Grouse D.: "i have seen bike lanes summer and winter with
  little or no bike traffic on them." (names 132 Avenue in the same
  comment)
- [75] Snowy Crow C.: "These are for a few people while the major don't
  bike"
- [80] Snowy Crow C.: "I drive daily all over this city and hardly ever
  see bikers and sure don't see them in winter."
- [320] Chilly Squirrel O.: "We have had one for the last year on 119 ave
  and no one uses it. In a week there may be 1 rider on the lane."
- [383] Boreal Chickadee M.: "there are almost no pedestrian or cyclists
  using it." (of "132 ave between 97st and 127st")
- [403] Misty Jackrabbit D.: "Driving over to whyte ave, peak bike season
  time mid August, not one bike to be seen"
- [415] Quiet Marmot J.: "I see a cyclist very rarely." (of "the bike
  lanes on Hermitage"; the same comment names "40th Ave between
  Hermitage and 137 st.")
- [430] Granite Bluejay B.: "They aren't even that busy."
- [440] Sunny Grebe K.: "The vast majority of cyclists don't even use the
  lanes still"
- [589] Icy Bluejay C.: "Thousands of vehicles vs 10 bikes maybe."

Context: ten distinct people. Every one of them offers a personal
observation as evidence for a general statement about the lanes. Four
name a corridor: 119 Avenue, 132 Avenue between 97 Street and 127
Street, Hermitage, and Whyte Avenue.

### `one-to-two-percent-of-population-rides`

- [60] Bright Bluejay K.: "we are talking about huge expenditures for
  only 2.3% of the populations usage."
- [186] Willow Nuthatch C.: "2% of constituents ride bikes! What about
  the other 98%?"
- [330] Wintry Raven B.: "1 percent of population to use."
- [363] Bright Woodpecker B.: "500 people using the bike lanes 4 months
  of the year."
- [368] Snowy Grouse D.: "The 1%"
- [399] Sunny Sparrow M.: "bike lanes for the .001% of the population"
- [426] Misty Sparrow P.: "The whole 1-2%"
- [433] Chilly Beaver B.: "Waste of money on 1% of population"

Context: eight distinct people. In every case the denominator is stated
as the population, and in most the point is the contrast with "the other
98%". None cites a source.

### `one-percent-year-round-users`

- [179] Dusty Marmot K.: "only 1% of the pop use them year round and less
  than 15% the rest of the year."

Context: one person, and the only wording in the question that splits
the year.

### `two-percent-of-trips-by-bike`

- [187] Cedar Pelican C.: "*2% of trips are done by bicycle, although
  it's higher in neighborhoods with bike infrastructure."
- [295] the same commenter: "transportation that includes >2% of trips"
- [333] the same commenter: "considering 2% of all trips are by bicycle"
- [335] the same commenter names a source: "stats Canada document titled
  \"Main mode of commuting for the 10 largest census metropolitan
  areas\""
- [337] the same commenter names a second: "the 2% figure is corroborated
  by \"2015 Edmonton and Region Household Travel Survey\"."

Context: one person, correcting another commenter's "2% of constituents
ride bikes" to "2% of trips". This is the only place in the thread where
anyone distinguishes the two, and the only place anyone names a
document.

### `under-one-percent-of-commuters-cycle`

- [338] Wintry Raven B., replying to the commenter above: "no your
  numbers are incorrect. City reports have census numbers in 2021 less
  than 1 percent. Wishful thinking on your part.."
- [456] Amber Merlin A.: "Less than 1% on bikes."

Context: offered as a refutation of the 2% trips figure. The two figures
are not about the same thing, which neither commenter says.

### `87-percent-commute-by-car`

- [456] Amber Merlin A.: "87% of Edmontonians commute in cars." (same
  comment as the line above)

### `riders-are-recreational-not-commuters`

- [338] Wintry Raven B.: "Lots of recreational riders.. commuters not so
  much."
- [375] Bright Elk G.: "usually within a short distance, or for
  recreational purposes."

### `heritage-days-bike-arrivals` (dropped at the brief)

- [70] Mossy Beaver J.: "Looks like more than 5 rode to Heritage Days
  (this was within an hour of opening on the Saturday)."

Context: a reply to the thread's opening joke, "All 5 people who ride
bikes showed up?" The comment appears to accompany a photograph. The
brief's "Dropped at the brief" section gives the reason it is not
checked, and `register-note.md` in this directory records the same for
the register.

## Are these forms representative

The extraction read every comment in the source and the coverage script
proves nothing raised by a seat was lost, so these are not a selection
from the thread. They are every wording in it that carries a count, a
share or an observation of use. The balance is what the source's balance
is: 21 of the 25 people here argue that few people ride, 5 that many do.
The brief does not treat that balance as evidence either way.

## What the drafter had seen before the cutoffs were fixed

The cutoffs in the brief were written before any search. Afterwards, to
satisfy the framing check's requirement that a brief name instruments
that exist, the drafter confirmed the existence and current publication
of four families of source: the City's Eco-Counter open data, the
Edmonton and Region Household Travel Survey and its 2025 successor, the
2021 Census commuting tables, and the City's Insight Community cycling
surveys. Two figures were visible in those search results in passing.
No cutoff was changed after that point, and none of those figures is
repeated in the brief or in this file.
