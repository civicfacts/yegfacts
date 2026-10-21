# Intake record: Do bike lanes make cycling safer in Edmonton, and where do cyclists actually ride?

Recorded 2026-10-21 by Stew. Question id `cycling-safety`.

Status: **DRAFT.** No framing check has read this record or the brief
beside it, the brief is not frozen, no panel has run, and there is no
finding. Nothing in this directory changes the register.

This question came out of whole-source intake (methodology v1.15) and the
grouping and triage that followed (v1.16); the register
(`intake/register.yaml`) is its primary record. This file exists so the
framing checker has the raw claims, their provenance and their context in
one place. Reviewers do not receive it.

## Provenance

- **Source:** `yegscoop-2026-08-26`, a Facebook post by the page Yegscoop
  reporting the Infrastructure Committee's bike-lane decision of
  2026-08-26, captured by the founder on 2026-09-02 as a browser export of
  the comment thread, pseudonymised and committed at
  `intake/captures/yegscoop-2026-08-26/comments.jsonl`. The source URL and
  the capture's own terms are in that directory's README.
- **Capture limitation:** the platform displayed 669 comments; the capture
  holds 621 accessible records. The 48-count gap is unresolved and does not
  identify 48 missing unique comments. Every count in this record and in
  the brief describes the accessible capture, not the complete displayed
  thread, and the capture is not described as complete anywhere in this
  run. See the trace audit at
  `reviews/who-pays-for-roads/2026-09-03/verification/audit-2026-09-09.md`.
- **The post is not a comment record.** The post's text is in the earlier
  partial capture, `intake/captures/2026-09-02-yegscoop-bike-lanes.md`,
  and is quoted below. The thread the extractors read holds comments only.
- **How the claims were found:** three extractor seats (Gemini 3.8 Flash at
  high, gpt-5.6-luna at low, Claude Haiku 4.5; three vendors) read the
  whole thread and listed every materially factual claim; the quote gate
  threw out forms that were not an unbroken run of the comment cited; a
  merge seat (Claude Opus 5 at high) folded the lists into 112
  propositions; `scripts/intake-coverage.ts` accounted for every extractor
  claim. Artifacts: `reviews/intake/yegscoop-2026-08-26/`.
- **How this question was formed:** `prompts/intake-group.md` grouped the
  propositions into 34 questions. Two triage readers, GPT-5.6 Sol and
  Gemini 3.1 Pro, neither shown the other, ruled on every question. They
  split on this one: Gemini 3.1 Pro returned GO ("City collision records
  and the traffic bylaw answer whether bike lanes improve safety and who is
  at fault in collisions.") and GPT-5.6 Sol returned PARK ("Reopen this
  when collision records can be linked to route design and cyclist
  exposure, because raw crash totals cannot show whether bike lanes change
  risk."). Under the combining rule one GO and one PARK is a GO. The
  register's public reason records the split and the missing exposure link
  in its own words.
- **Prior per-claim triage.** Before the questions were formed, the same
  two readers ruled on each proposition (`triage.md` in the intake run).
  Their per-claim outcomes are carried below under each claim because two
  of them differ from the question-level GO: `cyclists-ride-on-sidewalks`
  (PARK/NO, parked) and `lanes-keep-riders-out-of-traffic` (GO/NO,
  parked), and one was declined by both readers,
  `drivers-harass-cyclists-without-lanes` (NO/NO), which the register
  preserves on `cyclists-harassed-on-roads-without-lanes` as a
  `prior_triage` note. The question-level GO did not overturn those
  rulings claim by claim; it placed every claim in the group under one
  investigation. This record keeps the `prior_triage` note exactly as the
  register carries it.
- **A vendor fact the framing checker should have.** The two triage readers
  were from two vendors, neither Anthropic. The merge seat was Anthropic,
  as is the editor drafting this brief. The framing check that follows is
  from OpenAI.
- **Every wording below is captured, not composed.** No wording in this
  question has `origin: editor`. Commenters carry stable pseudonyms; the
  mapping to real names is not in this repository and the editor did not
  consult it. The capture's own rule leaves office-holders' real names in
  place, and every commenter under this question carries a pseudonym;
  that is the only basis for saying none was treated as an office-holder
  at capture, and no office-holder check was made in this draft. No
  wording under this question names a private person. Two comments
  ([13], [184]) open by addressing another pseudonymised commenter, and
  [13] refers to "the Mayor and Council" by office, not by name.

## The counts, checked

The register gives this question 8 claims and 10 accounts, 4 for and 6
against. The figure of 13 that travels with it is a count of captured
wordings.

- **8 claims.** Confirmed against `intake/register.yaml` and `groups.json`.
- **13 wordings.** The 8 claims carry 13 `variations` between them: 3, 3,
  2, 1, 1, 1, 1 and 1. No quoted run is carried on two claims.
- **10 comment records.** The 13 wordings come from 10 distinct comments:
  [13], [70], [184], [288], [328], [415], [444], [446], [459] and [505].
  One comment, [70], carries three wordings on three claims; one, [444],
  carries two wordings on two claims. Three are replies ([13], [70],
  [184]) and seven are top-level comments.
- **10 accounts.** Ten distinct pseudonyms wrote those 10 comments; no
  account appears twice. The post's author is not among them.
- **The 4 and 6 split.** Four people appear only under for-side claims
  (Mossy Beaver J., Copper Deer C., Misty Bluejay J., Nimble Fox M.) and
  six only under against-side claims (Granite Hare D., Hardy Pelican S.,
  Quiet Marmot J., Misty Goose C., Mossy Fox K., Cedar Elk B.). The split
  needed no tie rule. None of it is evidence about Edmonton; it is a fact
  about who answered one post.
- **Dates.** All ten comments are dated Thursday 2026-08-27, between 9:06
  AM and 8:24 PM as the platform displayed them. The post reports the
  committee decision of 2026-08-26.

## The post, verbatim

From `intake/captures/2026-09-02-yegscoop-bike-lanes.md`:

> Edmonton's bike lane expansion is moving forward.
>
> Councillors rejected a proposal to drop 14 planned routes from the
> city's $100-million bike network expansion plan. The infrastructure
> committee instead chose not to pursue the city's recommendation, while
> some residents continued opposing specific routes.
>
> Do you support Edmonton's bike lane expansion?

## The claims, verbatim, with the comment each sits in

Numbers in brackets are the 1-based comment index in the capture. Each
comment is given whole, as captured, with its spelling and punctuation.
The register's wording for a claim is the run named after each comment.
"Top-level" means a direct reply to the post. Where a comment is a reply,
the parent was resolved from the platform comment id.

### `lanes-keep-riders-out-of-traffic` (register claim)

Side: for. 3 accounts. Found by one seat (Luna). Prior per-claim triage:
PARK (GO/NO).

Registered proposition: "Bike lanes keep riders, including children and
families, out of traffic."

- [70] Mossy Beaver J., Thursday, August 27 at 3:59 PM, in the sub-thread
  under [67] Mossy Chickadee B. ("What a waste of money!! The city can’t
  even cut the grass or remove snow and yet we need bike lanes. So much
  for listening to the tax payers!!!!"): "Looks like more than 5 rode to
  Heritage Days (this was within an hour of opening on the Saturday). Just
  because you don’t use a piece of infrastructure doesn’t mean that it
  shouldn’t exist. Loads of Edmontonians don’t or won’t use certain
  services, but they exist because many do and some people see them as
  essential: Parks. Transit. Benches. Rec centres. Pet licensing.
  Libraries. City owned golf courses. Sidewalks (do you see an empty
  sidewalk and think we should remove it? Do we get rid of the shovelling
  bylaw because you don’t walk in your neighbourhood?). I just can’t
  comprehend why you’d want bikes back on the road where the riders will
  be more likely to get injured and slow the flow of traffic. I’ve been
  honked at, buzzed by too closely and veered at when I’ve been riding
  lawfully on roads without bike lanes or shared paths. We all live here.
  We all pay taxes. We may not use all of the services our taxes fund."
  Register wording: "where the riders will be more likely to get injured".
- [444] Copper Deer C., Thursday, August 27 at 1:59 PM, top-level:
  "Beautiful … living downtown with a 4-year old. He’s not going into
  traffic :.. and how long do you think that he’s going to be on the
  sidewalk? Bike lanes are essential. Once he starts Mortising, we can go
  from 104 street to 124 … SAFELY. Edmonton drivers are worse than ever,
  if you haven’t noticed. And this ain’t suburbia."
  Register wording: "He’s not going into traffic".
- [505] Misty Bluejay J., Thursday, August 27 at 10:41 AM, top-level: "All
  these angry men in the comments cant understand why a family wants a
  safe place to ride. get outta your metal boxes and try it! lose a little
  weight, stop smoking, stop drinking and try a bike yourself."
  Register wording: "a family wants a safe place to ride."

Context: three people on the for side, each with a different thing in
view. [70] asserts a comparison of risk: riders on the road without a lane
"will be more likely to get injured" than riders in a lane. [444] is a
parent downtown who will not take a four-year-old into traffic and expects
the lanes to make a route rideable. [505] asserts the want, not the
effect. The registered proposition, read literally, is close to a
definition (a separated lane is not a traffic lane). What the holders
argue is the comparison in [70]: riders are safer in lanes than on roads
without them. That is the same empirical question as
`bike-lanes-dont-improve-safety` below, from the opposite side.

### `cyclists-ride-on-sidewalks` (register claim)

Side: against. 3 accounts. Found by two seats (Flash, Luna). Prior
per-claim triage: PARK (PARK/NO).

Registered proposition: "Cyclists and scooter riders in Edmonton ride on
the sidewalks instead of the bike lanes."

- [13] Granite Hare D., Thursday, August 27 at 3:15 PM, in the sub-thread
  under [7] Quiet Goose B., answering [12] Riverside Muskrat A.: "Riverside
  Muskrat A. Feel free to to check out 102nd Ave between 121st and 111th.
  Used to be 2 ways, now one way with a bike lane. 102 Ave east of 109 St
  also reduced traffic lanes for bicycle lanes. Just a sample Edmontonians
  need to remember personal responsibility and the fact people survived on
  these roads when cars were less maneuverable and lacked many of today’s
  safety features.I don’t need the nanny state bubble wrapping my
  neighborhood. Most dangerous encounters I have daily are cyclists and
  scooter riders on downtown sidewalks, and the Mayor and Council seem
  unworried that there is no enforcement of that."
  Register wording: the last sentence. The lane-removal sentences are
  registered under `lanes-and-congestion`.
- [328] Hardy Pelican S., Thursday, August 27 at 8:24 PM, top-level: "I
  would support if more, if cyclist use the bike lanes not the sidewalks.
  Just walk down the Victoria Promenade and see for yourself"
  Register wording: from "cyclist use the bike lanes" to the end.
- [415] Quiet Marmot J., Thursday, August 27 at 5:04 PM, top-level: "I
  watch the bike lanes on Hermitage. I see a cyclist very rarely. On 40th
  Ave between Hermitage and 137 st., there is a bike lane, but cyclists
  still ride on the sidewalk. Useless waste of money."
  Register wording: the third sentence. The first two sentences are
  registered under `cycling-volumes`.

Context: three observations, each from one place: downtown sidewalks
([13], who also names scooters and the absence of enforcement), the
Victoria Promenade ([328]) and a street the commenter calls "40th Ave
between Hermitage and 137 st." ([415]). Each is offered as evidence that
cyclists do not use the lanes built for them, and [328] makes that the
condition of support. The general claim is a pattern: where lanes exist,
cyclists ride on the sidewalk instead. The reply to [13], [14] Granite
Beaver P., turns the observation the other way: "Sounds like downtown
needs more bike lanes if you're having daily encounters with cyclists on
sidewalks."

### `cyclists-have-right-to-the-road` (register claim)

Side: for. 2 accounts. Found by one seat (Flash). Prior per-claim triage:
GO (GO/GO).

Registered proposition: "Cyclists have the same legal right to ride on
the road as drivers, with or without a bike lane."

- [70] Mossy Beaver J., quoted above. Register wording: "when I’ve been
  riding lawfully on roads without bike lanes or shared paths."
- [446] Nimble Fox M., Thursday, August 27 at 1:36 PM, top-level: "Bunch a
  whiny babies. Cyclist have the same legal right to be on the road as you
  do. Remove bike lanes and they will be cycling right down the middle of
  your lane. How is thay for congestion."
  Register wording: the second and third sentences.

Context: [446] states the law as a warning: remove the lanes and cyclists
are in the traffic lane by right. [70] states it in passing, "riding
lawfully", to describe the roads where the honking happens. Nobody in the
capture asserts the contrary as a statement of law, but several
commenters propose the opposite arrangement as if it were available:
[270] asks "Why can't bike riders ride on the sidewalk?" and "If they are
adults and want to be faster, they can use the roads"; [448] says "Change
the bylaw so sidewalks can be used or if cyclists wish to they can drive
on the road"; [539] says "make them ride on the roads and NOT the
Sidewalks"; [276] asks "Why they just ride on the sidewalk anyways". The
claim's point in the thread is the consequence: what the law puts on the
road when a lane is removed.

### `bike-lanes-dont-improve-safety` (register claim)

Side: against. 1 account. Found by one seat (Luna). Prior per-claim
triage: GO (GO/GO).

Registered proposition: "It is a myth that bike lanes make cycling safer."

- [459] Misty Goose C., Thursday, August 27 at 1:09 PM, top-level: "City
  council has to go it is a myth that bike lanes make it safer"
  Register wording: from "it is a myth" to the end.

Context: a bare assertion with no source, place or measure. "Safer" is
read as safer for the people cycling, which is the comparison [70] makes
from the other side. The first clause is a political opinion and is not a
claim.

### `bike-collision-fault-share` (register claim)

Side: against. 1 account. Found by one seat (Flash). Prior per-claim
triage: GO (GO/GO).

Registered proposition: "About 90 percent of the reported collisions
involving bikes happened because the cyclist was in the wrong."

- [288] Mossy Fox K., Thursday, August 27 at 9:06 AM, top-level: "It's the
  stupidest thing I've heard .That kind of money for bike's just because
  the people that don't want them don't go to meetings is because it's
  stupid and because there are so many other things that need done before
  bike lane's . They had on the news how many accident's there has been
  with bike's and I can bet that 90 percent are because the biker's were
  in the wrong. I can say that when I am out in a car I see biker's going
  through yellow or red light's and never using signals ."
  Register wording: the third sentence.

Context: the commenter refers to a news report of a count of bicycle
collisions, which the capture does not identify, and offers "I can bet"
on the share that are the cyclist's fault, with their own observation of
cyclists running lights and not signalling as the reason. "I can bet" is a
guess stated as a figure; the figure is the claim. No period is named;
"how many accident's there has been" reads as recent.

### `cyclists-harassed-on-roads-without-lanes` (register claim)

Side: for. 1 account. Found by two seats (Flash, Luna). Prior per-claim
triage: NO (NO/NO). The register carries this on the claim as
`prior_triage`, outcome `no`, readers gpt-5.6-sol and Gemini 3.1 Pro,
reason: "No public record can settle whether the unreported encounters
described by one rider occurred." The Gemini reader's own words in its raw
output were: "No public record tracks everyday harassment or honking
incidents."

Registered proposition: "Cyclists riding lawfully on roads without bike
lanes get honked at, passed too closely and veered at."

- [70] Mossy Beaver J., quoted above. Register wording: "I’ve been honked
  at, buzzed by too closely and veered at when I’ve been riding lawfully
  on roads without bike lanes or shared paths."

Context: one rider's account of their own experience, offered as the
reason bikes should not go "back on the road". The same person adds in
[73] (a reply in the same sub-thread): "If that was what ends people
veering at me or buzzing a foot from me, I’m in." The registered
proposition generalises the account to cyclists.

### `street-labs-no-safety-value` (register claim)

Side: against. 1 account. Found by one seat (Flash). Prior per-claim
triage: GO (GO/GO).

Registered proposition: "Edmonton's Vision Zero Street Labs hinder normal
street traffic and have no safety value for pedestrians."

- [184] Cedar Elk B., Thursday, August 27 at 12:32 PM, in the sub-thread
  under [183] Cedar Pelican C. ("Thanks to the city Council for actually
  supporting their constituents and not caving in to perceived threats
  from the province. We've already paid for the design, and many contracts
  and shouldn't be cancelling them now. Safety should be more important
  than parking"): "Cedar Pelican C. and what is safe about bike lanes in
  the middle of major road travel lanes. Shake your head. Makes a much
  sense as the "vision zero - Street Labs " that hinder normal street
  traffic and have no safety value for pedestrians what so ever."
  Register wording: from the quoted programme name to the end. The first
  sentence is registered under `street-types-and-design`
  (`lane-on-provincially-arterial-road`).

Context: the Street Labs are offered as a comparison: as pointless, in
the commenter's view, as bike lanes on major roads. Two assertions sit in
the wording: that the labs hinder traffic, and that they have no safety
value for pedestrians "what so ever". The reply [185] from Cedar Pelican
C. answers the bike-lane half ("which bike lanes are on major roads?")
and not the Street Labs half.

### `downtown-network-safe-family-route` (register claim)

Side: for. 1 account. Found by one seat (Flash). Prior per-claim triage:
GO (GO/GO).

Registered proposition: "The downtown network lets a family ride safely
from 104 Street to 124 Street."

- [444] Copper Deer C., quoted above. Register wording: "Once he starts
  Mortising, we can go from 104 street to 124 … SAFELY."

Context: a parent's forecast about riding with a child who does not yet
ride ("Once he starts"), between two downtown streets twenty blocks
apart. Two things sit in it: that a route exists between those streets
on the network, and that it will be safe for a family. The first is a
fact about the network's extent; the second is the holder's judgement of
what "safely" means for a child, and the capture gives no measure for
it.

## Context: comments on safety, sidewalks and fault that sit under other questions or under no claim

Quoted so the framing checker can judge whether the 13 wordings are
representative of how the thread argues about safety and where cyclists
ride. None is a wording of a claim under this question. Six of the nine
([12], [14], [185], [276], [391], [539]) are quoted whole. Three ([193],
[270], [448]) are excerpts, marked as such, because the rest of each
comment is about road funding, cost or taxes and sits under other
questions.

- [12] Riverside Muskrat A., Thursday, August 27 at 2:23 PM, in the
  sub-thread under [7]: "Granite Hare D. they are not removing lanes for
  cyclists. They are removing lanes for traffic calming measures and in
  places where applicable putting bike Lanes there to save money combining
  the two. If you're getting a lane removed, it's happening whether
  there's a bike lane there or not because of dangerous driving
  statistics. If you want to keep your wide open roads, Edmonton needs to
  learn to follow the rules of the road." Registered under
  `lanes-and-congestion`. It is the comment [13] answers.
- [14] Granite Beaver P., Thursday, August 27 at 5:32 PM, in the
  sub-thread under [7]: "Granite Hare D. Sounds like downtown needs more
  bike lanes if you're having daily encounters with cyclists on
  sidewalks." On no claim.
- [185] Cedar Pelican C., Thursday, August 27 at 1:03 PM, in the
  sub-thread under [183]: "Cedar Elk B. which bike lanes are on major
  roads? All bike lanes in the city are on side streets. For example
  113st, 83ave, 103ave." Registered under `street-types-and-design`.
- [193] Cedar Pelican C., Thursday, August 27 at 9:25 PM, in the
  sub-thread under [183]. Excerpt; the comment opens on who pays for
  roads and closes on congestion, both registered under other questions:
  "... The city also has the foresight to not put bike lanes on arterial
  roads. 95% of the cycling network is shared pathways or wide sidewalks.
  The rest is on low traffic side roads like 76 Ave, 83 Ave, 103 Axe, 113
  St , 110st. ..." Registered under `street-types-and-design`
  (`cycling-network-95-percent-pathways`).
- [270] Nimble Hare E., Friday, August 28 at 11:37 PM, top-level: "Edmonton
  is a winter city! Why can't bike riders ride on the sidewalk? Why can't
  they be considerate riders,? When they come up on pedestrians, they get
  off the bike and let them pass, rather then coming up at high speed and
  ringing the bell incessantly?? If they are adults and want to be faster,
  they can use the roads, to cross the roads, get off the bike, use
  pedestrian cross walks!! If you ride in the middle of the road, car
  drivers have to use the other lane to pass you!! WHY can't we all just
  share all the roadways and sidewalks???? ..." (the comment continues on
  cost). On no claim under this question.
- [276] Icy Chickadee T., Thursday, August 27 at 3:50 PM, top-level: "Why
  they just ride on the sidewalk anyways". On no claim.
- [391] Mossy Waxwing A., Friday, August 28 at 9:33 AM, top-level: "Going
  to have more angry drivers than there already are, causing more
  accidents... People are going to be even more angry at pedal bike
  riders." On no claim.
- [448] Dusty Raven M., Thursday, August 27 at 1:20 PM, top-level: "No
  reason sidewalks can not be used in most areas the infrastructure is
  already there. Change the bylaw so sidewalks can be used or if cyclists
  wish to they can drive on the road. There is not much activity on
  sidewalks in most neighborhoods at the best of times. ..." (the comment
  continues on taxes). On no claim under this question.
- [539] Icy Crow A., Thursday, August 27 at 9:25 AM, top-level: "Remove
  all Bike lanes in downtown Edmonton,they are safe to motorists, make
  them ride on the roads and NOT the Sidewalks". On no claim.

What these add. The thread argues about where cyclists belong at least as
much as about whether lanes are safe. Three commenters outside this
question ([270], [276], [448]) treat the sidewalk as a place cyclists
could or should ride, or ask why they are not there, one of them ([448])
saying the bylaw should be changed to allow it; one ([539]) wants them on
the road and not the sidewalk; and the three sidewalk wordings under this
question complain that cyclists are on sidewalks when they should be in
the lanes. So the question of which surface the law puts a cyclist on is
live in the thread on more than one side, which bears on the stakes of
`cyclists-have-right-to-the-road`. On risk, the thread holds one
comparison each way ([70] against [459]) and one commenter's forecast that
lanes will cause more collisions through driver anger ([391]), which is on
no claim.

## What the editor makes of the 13 wordings

Stated here so the framing checker can test it against the comments
above; the brief's reasoning is in the brief.

- **A statement of law, checkable against the statute, the regulation and
  the bylaws in force:** `cyclists-have-right-to-the-road`.
- **A share of a City-recorded quantity, checkable if the City publishes
  fault by party for bicycle collisions:** `bike-collision-fault-share`.
- **A claim about a City programme's measured effect, checkable only if the
  City's evaluations report measured outcomes:** the second half of
  `street-labs-no-safety-value`; its first half describes what traffic
  calming is for.
- **A comparison of injury risk between riding in a lane and riding without
  one, which needs collisions and riders counted on the same facilities:**
  `lanes-keep-riders-out-of-traffic` and `bike-lanes-dont-improve-safety`,
  and the "SAFELY" in `downtown-network-safe-family-route`.
- **A pattern of behaviour asserted from three observations, which needs
  an observational count:** `cyclists-ride-on-sidewalks`.
- **One rider's experience, which no public record holds:**
  `cyclists-harassed-on-roads-without-lanes`, declined at per-claim triage
  by both readers.
- **Opinion or proposal, which the site does not test:** "City council has
  to go" in [459], "Bunch a whiny babies" in [446], "nanny state" in [13],
  "Useless waste of money" in [415], "Shake your head" in [184].

## Selection before framing

The editor chose none of these wordings and dropped none. Selection did
happen upstream, and the record shows where: three extractor seats each
decided which comment runs were materially factual claims; the quote gate
discarded runs that were not an unbroken part of the comment cited; the
merge seat decided which propositions to form and which runs to carry
onto each; and the grouping placed propositions under questions. What is
here is every wording the merge carried onto the 8 claims the grouping
placed under this question, with nothing added or removed by the editor.
The editor's own selection in this run is which claims to propose for
the panel and which to propose for parking; that reasoning is in the
brief, not here. Of the questions this source still has on the register
with no brief, this one is the next ordinary GO by summed form count, as
the board's state record of 2026-10-04 ranked it.
