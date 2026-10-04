# Intake record: Are Edmonton's garbage, green-bin and recycling collection schedules adequate for households?

Recorded 2026-10-04 by Stew. Question id `collection-schedule-and-capacity`.
Status: **DRAFT.** No framing check has read this record or the brief
beside it, the brief is not frozen, and no panel has run.

This question came out of whole-source intake (methodology v1.15) and the
grouping and triage that followed (v1.16); the register
(`intake/register.yaml`) is its primary record. This file exists so the
framing checker has the raw claims, their provenance and their context in
one place. Reviewers do not receive it.

## Provenance

- **Source:** `edmonton-rant-and-rave-2026-09-10`, a post in the public
  Facebook group "Edmonton Rant and Rave" dated 2026-09-10, captured by the
  founder on 2026-09-16 as a browser export of the comment thread,
  pseudonymised the same day and committed at
  `intake/captures/edmonton-rant-and-rave-2026-09-10/comments.jsonl`. The
  source URL and the capture's own terms are in that directory's README.
- **Capture limitation:** the platform displayed 123 comments; the capture
  holds 117 records. The gap of six is unresolved and does not identify six
  missing comments. Every count in this record and in the brief describes
  the accessible capture, not the complete displayed thread, and the
  capture is not described as complete anywhere in this run.
- **The post is not a comment record.** The post's text is in the capture
  README. The thread the extractors read (`scripts/intake-render-thread.ts`)
  holds comments only, so they had the source note's one-paragraph
  description of the post and not its words, and the register's validator
  accepts a wording only when it is a run of a comment in
  `comments.jsonl`. So the post's own sentence, the one the thread is
  answering, is carried on no claim. It is quoted in full below because
  every claim under this question is a reply to it.
- **How the claims were found:** three extractor seats (Claude Haiku 4.5,
  Claude Sonnet 5, gpt-5.6-luna at low; two vendors, because the Google
  seat's quota was exhausted) read the whole thread and listed every
  materially factual claim in it; `scripts/intake-quote-gate.ts` threw out
  two forms, both from one seat, whose quotes were not an unbroken run of
  the comment cited; a merge seat (gpt-5.6-sol at high) folded the three
  lists into 71 propositions; `scripts/intake-coverage.ts` accounted for
  all 144 extractor claims. Artifacts:
  `reviews/intake/edmonton-rant-and-rave-2026-09-10/`. One of the two
  discarded forms was a stitched version of comment [105], which a
  different seat quoted correctly and which is carried below under
  `green-bin-utilization`; nothing under this question was lost to the
  gate.
- **Set aside at the merge, and relevant here.** Two extractor claims
  drawn from comment [96] were dropped as not claims and are listed on the
  register under the source's `set_aside`: "a prediction that reducing
  winter green-bin collection would provide enough money for weekly
  black-bin pickup" and "a hypothetical policy suggestion to reduce winter
  green-bin collection, not an assertion that the City has done or plans
  it". The factual remainder of the same comment is the
  `green-bin-utilization` claim.
- **How this question was formed:** `prompts/intake-group.md` grouped the
  propositions into 21 questions. Two triage readers, Claude Opus 5 and
  Claude Sonnet 5, neither shown the other, ruled on every question. Both
  returned GO on this one. The public reason on the register is the Opus
  reader's: "The City's collection calendars and program history show how
  often each stream is picked up and whether garbage went from weekly to
  every two weeks, and its waste audits show how full carts get; one
  household's dump runs and one family's diaper volume can't be checked
  and will be dropped." The Sonnet reader's reason, in
  `triage-sonnet.raw.txt`: "Edmonton's published curbside collection
  calendar and waste bylaw set out how often black, green and recycling
  carts are actually collected and when biweekly garbage replaced weekly
  collection, which settles the frequency and history claims the adequacy
  argument rests on."
- **A vendor fact the framing checker should have.** In that intake run
  the merge and grouping ran on an OpenAI model and the two triage readers
  were Anthropic models. The editor drafting this brief is also an
  Anthropic model. So on this question the readers who cleared it and the
  editor who framed it share a vendor; the framing check that follows is
  from OpenAI.
- **Every wording below is captured, not composed.** No wording in this
  question has `origin: editor`. Commenters carry stable pseudonyms; the
  mapping to real names is not in this repository. No commenter under this
  question is an office-holder, and no wording under it names a person.

## The counts, checked

The register gives this question 11 claims and 17 accounts, 7 for and 10
against. The figure of 28 that travels with it is a count of captured
wordings, and it counts overlap.

- **11 claims.** Confirmed against `intake/register.yaml` and
  `groups.json`.
- **28 wordings.** The 11 claims carry 28 `variations` between them. That
  is 28 pairs of (claim, quoted run), not 28 comments. Three quoted runs
  are carried twice, word for word, on two claims each: [10] under
  `black-bin-frequency` and `between-collection-dump-runs`; [88]'s
  "garbage pick every two weeks & recycle every week" under
  `black-bin-frequency` and `recycling-frequency`; [96] under
  `green-bin-frequency` and `green-bin-utilization`. So there are 25
  distinct quoted runs. Several of those overlap inside one comment: the
  short and long runs of [7] and of [8], and three runs each from [69],
  [88] and [110].
- **19 comment records.** The 28 wordings come from 19 distinct comments:
  [7], [8], [10], [18], [21], [22], [45], [68], [69], [76], [85], [87],
  [88], [96], [97], [105], [107], [109] and [110]. Fifteen are top-level
  comments and four are replies ([45], [68], [69], [105]).
- **17 accounts.** Seventeen distinct pseudonyms wrote those 19 comments:
  Sunny Jackrabbit L. wrote [69] and [105], and Amber Bison C. wrote [45]
  and [110]. The post's author is not among the 17.
- **The 7 and 10 split is an editor's rule, and it hides something.**
  Nine people appear only under against-side claims. Eight appear under at
  least one for-side claim. Of those eight, the rule recorded in the
  intake manifest (the side a person gave more wordings to, a tie going
  to the side of their first wording) puts seven on the for side and
  Sunny Jackrabbit L. on the against side, because two of her three
  wordings sit on claims labelled against (`green-bin-utilization`,
  `diaper-waste-volume`). Read in the thread, she argues throughout that
  the service is adequate ([34], [50], [62], [69], [86], [105]). The three
  schedule claims are labelled against, and people on both sides assert
  them. None of this split is evidence about Edmonton; it is a fact about
  who answered one post.
- **Dates.** The post and the first comment are dated Thursday 2026-09-10.
  Of the 19 comments, seven are dated September 10, eight September 11,
  two September 12 and two September 13. The capture's last comment is
  dated 2026-09-16.

## The post, verbatim

Posted by Prairie Nuthatch W. on 2026-09-10 (from the capture README):

> Why do we pay tax’s? Garbage service absolutely sucks!
> 1 bin every two weeks for a large family.
> Spending my days picking up trash because birds dogs and cats just love ripping them open. Snow removal that just does not happen. This city’s greed is just too much.

The same person adds in a reply, [28], that the household is in a condo
that gets "the small black bins", has more than five people and four
young children. That reply is registered under `multi-unit-waste-service`
and is quoted under "Context" below.

## The claims, verbatim, with the comment each sits in

Numbers in brackets are the 1-based comment index in the capture. Each
comment is given whole, as captured, with its spelling. A line break
inside a comment is shown as " / ". The register's wording for a claim is
the run named after each comment. "Top-level" means a direct reply to the
post.

### `biweekly-bin-adequacy` (register claim)

Side: for. 7 accounts. Found by all three seats.

Registered proposition: "Some Edmonton households, including households
with five or more people, find one black bin every two weeks adequate."

- [7] Icy Porcupine S., Thursday, September 10 at 8:39 AM, top-level: "How
  large of a family are we talking? I have no issues with the one bin every
  two weeks. I did up until I started recycling and composting properly. /
  That and you can take two free bags to the Eco station"
  Register wording: the second and third sentences, from "I have no
  issues" to "composting properly." The first sentence, "How large of a
  family are we talking?", is not part of it.
- [8] Icy Nuthatch K., Thursday, September 10 at 8:39 AM, top-level: "5
  people in my house, 4 which are adults and we only have 1 bin every 2
  weeks... you should look into recycling and compost what you can"
  Register wording: the whole comment.
- [21] Willow Merlin T., Thursday, September 10 at 9:31 AM, top-level: "I
  have a large family and the large bin is more than adequate for our needs.
  We rarely fill it. That being said, garbage is not covered by taxes. We
  pay a fee for it on our epcor bill"
  Register wording: the first two sentences.
- [69] Sunny Jackrabbit L., Friday, September 11 at 9:29 AM, in the
  sub-thread under [53] Dusty Raven K.: "Dusty Raven K. I have done the same
  because I recognise that diapers take a lot of space, so families with 2
  kids in diapers have a lot more garbage. We have so little garbage we
  often don't put the black bin out for a month or more in Winter."
  Register wording: the last sentence.
- [76] Frosty Muskrat T., Thursday, September 10 at 9:44 PM, top-level: "Im
  a family of 5 adults. The big black bin is good for us every 2 weeks . We
  usually have aviut 4 garbage bags in it . The recycle is insane tho . In 1
  week its about 3 recycle bags . Its just have to be willing to do the
  work"
  Register wording: the first two sentences, to "every 2 weeks".
- [97] Northern Woodpecker N., Friday, September 11 at 9:39 PM, top-level:
  "Even with one collection every two weeks there's often some room in the
  small black bin we have but then we know how to recycle and minimize the
  waste so🤷"
  Register wording: the run up to "minimize the waste".
- [110] Amber Bison C., Sunday, September 13 at 9:03 AM, top-level: "Thats
  because you dont know how to use the system. Put compost on compost.
  Garbage in garbage. Most shit can go in recycling bags. Those get picked
  up weekly. Anything with the ♻️ (mobius loop) i have 3 adults and 4 kids
  in my house and never have a full black bin or green bin"
  Register wording: the last clause, from "i have 3 adults".

Context: seven people answer the post's "1 bin every two weeks for a large
family" from their own households. Four of them give the household's size
([8] five people, four adults; [21] "a large family"; [76] five adults;
[110] three adults and four children); [7] gives none and asks the post's
author for theirs. Five attach a condition or a cause: [7] "I did up
until I started recycling and composting properly", [8] "you should look
into recycling and compost what you can", [76] "Its just have to be
willing to do the work", [97] "but then we know how to recycle and
minimize the waste", [110] "Thats because you dont know how to use the
system". Three name the cart size they have: [21] and [76] the large
bin, [97] the small one. [69] is a winter statement from a
household that, on its own account, has little garbage, made while
conceding that families with children in diapers have much more. Each is
one household's report of itself. Read together, and as each is offered in
reply to the post, the general assertion is that one black bin every two
weeks is enough for a large household that recycles and composts. The
merge registered it as an existence statement ("some households find"),
which the seven reports satisfy by being made.

### `black-bin-frequency` (register claim)

Side: against. 5 accounts. Found by all three seats.

Registered proposition: "Edmonton's standard residential black bins are
collected every two weeks."

- [7] Icy Porcupine S., quoted above. Register wording: "I have no issues
  with the one bin every two weeks."
- [8] Icy Nuthatch K., quoted above. Register wording: "5 people in my
  house, 4 which are adults and we only have 1 bin every 2 weeks".
- [10] Northern Squirrel T., Thursday, September 10 at 8:58 AM, top-level:
  "Yah, we have to do usually a dump run or two in between garbage weeks.
  It’s crazy to me that it’s bi weekly."
  Register wording: the whole comment from "we have to do".
- [85] Wintry Chickadee D., Friday, September 11 at 8:33 AM, top-level: "I
  don't live in the city , but once every 2 weeks is not enough . We get
  ours picked up weekly ."
  Register wording: "once every 2 weeks is not enough".
- [88] Boreal Pelican P., Friday, September 11 at 11:27 AM, top-level: "I’m
  not sure who the moron was that decided garbage pick every two weeks &
  recycle every week was a good idea 🙄 Does recycle rot in hot sun?, no, but
  the garbage does!! / Just a bunch of clueless idiots running this city!!"
  Register wording: "garbage pick every two weeks & recycle every week".

Context: nobody in the capture disputes the frequency. The post states it
("1 bin every two weeks"), and the five wordings here come from both
sides: [7] and [8] say it while defending the service, [10], [85] and [88]
while attacking it. Two of the five wordings carry more than the
frequency. [85]'s registered run is an adequacy judgement, "once every 2
weeks is not enough", from a person who says they do not live in the city.
[10]'s run is a household's dump runs and "It’s crazy to me that it’s bi
weekly". The assertion that every two weeks is not enough has no
proposition of its own under this question; the merge spread it across
this claim, `between-collection-dump-runs` and `summer-garbage-condition`.

### `green-bin-frequency` (register claim)

Side: against. 3 accounts. Found by all three seats.

Registered proposition: "Edmonton collects residential green bins weekly."

- [22] Cedar Nuthatch S., Thursday, September 10 at 9:31 AM, top-level: "I
  wish they would pick up the black bins every week, like they do the green
  bins."
  Register wording: the whole comment.
- [96] Quiet Squirrel J., Friday, September 11 at 6:53 PM, top-level: "If
  they reduce the green bin pick up to once a month in the winter time,
  they’d have more money to do the black bins every week. I don’t know about
  the rest of you, but when my green bin is picked up every week, I’m lucky
  if 1/8 of it is even filled. Such a waste of manpower going around picking
  that up."
  Register wording: "when my green bin is picked up every week, I'm lucky
  if 1/8 of it is even filled." (the capture has a typographic apostrophe
  in "I’m").
- [109] Windy Porcupine R., Saturday, September 12 at 5:44 PM, top-level:
  "Every week for the Green bin. Lol I need Every week garbage pick up"
  Register wording: "Every week for the Green bin."

Context: all three were written between September 10 and 12, in the
present tense, with no season named for the green bin's own schedule.
[22] and [109] use the green bin's weekly pickup as the comparison for
what the black bin should get. [96] goes further and proposes cutting the
green bin "to once a month in the winter time", which treats the winter
pickup as more frequent than monthly and, as written, as weekly. The one
reply to [96], [105] below, agrees about winter and adds "Summer is
entirely a different story though". Nobody in the capture says the green
bin's frequency changes with the season.

### `recycling-frequency` (register claim)

Side: against. 2 accounts. Found by all three seats.

Registered proposition: "Edmonton collects residential recycling or blue
bags weekly."

- [45] Amber Bison C., Sunday, September 13 at 9:06 AM, in the sub-thread
  under [17] Boreal Sparrow J.: "Sunny Pelican T. I blue bags because they
  take them weekly. I never run out of room in my bins"
  Register wording: the first sentence, after the name.
- [88] Boreal Pelican P., quoted above. Register wording: "garbage pick
  every two weeks & recycle every week".
- [110] Amber Bison C., quoted above. Register wording: "Those get picked
  up weekly."

Context: nobody in the capture disputes it. [88] states it to attack the
schedule; [45] and [110], both by one person, state it to explain why
their household does not run out of room. [45] sits in a sub-thread under
[17] about whether recycling is really recycled, and is addressed to the
author of [43], who had written "I don’t really recycle anymore". The
same person's next comment, [46], reads in full: "Sunny Pelican T. blue
bags are the new black bags!! Lmao".

### `collection-frequency-change` (register claim)

Side: against. 2 accounts. Found by all three seats.

Registered proposition: "Edmonton previously collected garbage weekly
before changing to collection every two weeks."

- [87] Brisk Pelican B., Friday, September 11 at 10:49 AM, top-level: "I
  agree. The. People complain about litters. People don't have anywhere to
  dump garbage. It used to a weekly collection. Then the stupid planners
  made it every two weeks."
  Register wording: the last two sentences.
- [107] Golden Raven T., Saturday, September 12 at 12:42 PM, top-level:
  "They used to collect garbage every week then raised taxes and cut back to
  every two weeks. But dont worry they are raising taxes substantially over
  next 4 years lol"
  Register wording: the first sentence.

Context: both state a sequence as fact. [87] names who did it ("the
stupid planners") and ties it to litter ("People don't have anywhere to
dump garbage"). [107] puts a tax increase between the two schedules
("then raised taxes and cut back") and adds a forecast about the next
four years. The tax sequence is registered as its own question,
`taxes-and-collection-cut`, and the forecast as `four-year-tax-plan`.
Neither says when the change happened. Nobody in the capture disputes
that collection used to be weekly. Related and not registered under this
question: [18] below, which refers to a time "when there was no limit".

### `green-bin-utilization` (register claim)

Side: against. 2 accounts. Found by all three seats.

Registered proposition: "Some residents report that their weekly green
bins are only slightly filled or are not put out."

- [96] Quiet Squirrel J., quoted above. Register wording: the same run as
  under `green-bin-frequency`.
- [105] Sunny Jackrabbit L., Friday, September 11 at 10:12 PM, in the
  sub-thread under [96] Quiet Squirrel J.: "Quiet Squirrel J. you do have a
  point in Winter. Except for the week when I have a turkey carcass and 20
  lbs of vegetable feelings, there's not much in there and often we don't
  even put it out on garbage day if the weather is cold. / Summer is
  entirely a different story though."
  Register wording: "there's not much in there and often we don't even
  put it out on garbage day if the weather is cold".

Context: [96] offers one household's green bin ("I’m lucky if 1/8 of it
is even filled") as the ground for a general conclusion, "Such a waste of
manpower going around picking that up", and for a proposal to move the
effort to weekly black-bin pickup. [105] agrees for winter only, from one
household, names an exception (a week with a turkey carcass), and says
summer is different. The proposal and its predicted saving were set aside
at the merge as not claims. What is left is two households' reports of
their own bins, offered by the first as typical.

### `summer-garbage-condition` (register claim)

Side: against. 2 accounts. Found by one seat (Sonnet).

Registered proposition: "Black-bin garbage can rot or become especially
bad during summer heat when collected every two weeks."

- [68] Amber Woodpecker M., Friday, September 11 at 8:14 PM, in the
  sub-thread under [22] Cedar Nuthatch S.: "Cedar Nuthatch S. or instead of
  recycling, because blue bags can wait another week, there is no smell, but
  black bin should be picked up every week, it's pretty bad in the summer,
  especially families with babies or multiple dogs. This city makes no
  sense"
  Register wording: from "black bin should be picked up" to "multiple
  dogs".
- [88] Boreal Pelican P., quoted above. Register wording: "Does recycle
  rot in hot sun?, no, but the garbage does!!"

Context: both argue that the City has the frequencies the wrong way
round: the stream that smells should be the weekly one. [68] is a reply
to [22] and names who has it worst, "families with babies or multiple
dogs". [88] puts it as a rhetorical question and blames whoever "decided
garbage pick every two weeks & recycle every week was a good idea". Each
asserts a consequence and a degree ("pretty bad", "rot in hot sun"), and
[68] asserts a remedy ("should be picked up every week"). The registered
proposition keeps "can rot", which no one would deny, and drops the
degree, who is affected and the comparison with recycling.

### `between-collection-dump-runs` (register claim)

Side: against. 1 account. Found by two seats.

Registered proposition: "Some Edmonton households make one or two dump
trips between biweekly garbage collections because the bin service is
insufficient."

- [10] Northern Squirrel T., quoted above. Register wording: the whole
  comment from "we have to do".

Context: one household's account of itself, with a frequency ("usually a
dump run or two in between garbage weeks") and a necessity ("have to").
The household's size, cart size and sorting are not given. The registered
proposition generalises one account to "some households" and supplies the
cause, "because the bin service is insufficient", which the comment
implies and does not state. The comment at [11], recorded by the platform
in another sub-thread and addressed to this commenter, reads in full:
"Northern Squirrel T. you realize this is an Edmonton Rant and Rave…
right?" Other comments mention taking garbage away as an option, not as
something they do: [4] and [7] (two free bags at the Eco Station,
registered under `eco-station-garbage-allowance`) and [39] ("better than
driving to dump with my extra bags", on no claim).

### `diaper-waste-volume` (register claim)

Side: against. 1 account. Found by one seat (Sonnet).

Registered proposition: "Diapers take substantial bin space, so families
with two children in diapers produce more garbage."

- [69] Sunny Jackrabbit L., quoted above. Register wording: "diapers take
  a lot of space, so families with 2 kids in diapers have a lot more
  garbage".

Context: a reply to [53], where a two-adult household says it told
neighbours with two small children "they were welcome to put their
overload into my bin". [69] says she has done the same, gives the reason
quoted, and then says her own household often skips a month of black-bin
pickups in winter. It is a concession from a person who otherwise argues
the service is adequate: the families she describes have "a lot more
garbage" than a household like hers, enough that she shares her bin with
them. The comment gives no quantity. [68] names "families with babies",
[100] lists diapers among the few things that are not recyclable, and the
post's author describes "four young children" in [28].

### `past-weekly-bag-volume` (register claim)

Side: for. 1 account. Found by one seat (Sonnet).

Registered proposition: "Before garbage limits were introduced, some
residents put out as many as 20 bags a week."

- [18] Amber Goose D., Thursday, September 10 at 9:17 AM, top-level: "There
  is a garbage dump run business opportunity no one is considering. For
  house hold and worker. Make bin similar to that with dump truck private.
  Charge houses a fee per dump. I get it. People would dump 20 bags a week
  when there was no limit. Renovation guys"
  Register wording: "People would dump 20 bags a week when there was no
  limit."

Context: the comment proposes a private pay-per-dump service and then
explains why the City limits garbage: "I get it. People would dump 20
bags a week when there was no limit. Renovation guys". It asserts three
things: that there was a time with no limit, that people then put out
about 20 bags a week, and that the people doing so were renovators. It
gives no period, source or place. The registered proposition keeps the
first two and drops "Renovation guys". It is labelled for because it
gives the City a reason for the limit.

### `blue-bag-capacity-offset` (register claim)

Side: for. 1 account. Found by one seat (Luna).

Registered proposition: "One resident uses weekly blue-bag collection to
avoid running out of bin space."

- [45] Amber Bison C., quoted above. Register wording: "I blue bags
  because they take them weekly. I never run out of room in my bins".

Context: one household's account of itself, in reply to a person who had
stopped recycling. The same person's top-level comment [110] gives the
general form: "Most shit can go in recycling bags. Those get picked up
weekly." and reports a household of seven that never fills its black or
green bin. Whether a household can cut its garbage by recycling and
composting is registered as its own question, `household-waste-diversion`
(10 accounts), which holds [100], [117], [31] and others.

## Context: comments about adequacy that sit under other questions or under no claim

Quoted so the framing checker can judge whether the 28 wordings are
representative of how the thread argues about adequacy. None of these is
a wording of a claim under this question.

- [28] Prairie Nuthatch W., Thursday, September 10 at 9:14 AM, in the
  sub-thread under [8] Icy Nuthatch K.: "Icy Nuthatch K. I have more than
  five people in my house. The bins that are condo uses or gets are the
  small black bins big enough to fit two garbage bags I have four young
  children here one birthday party and the compost and the garbage bin is
  full."
  Registered under `multi-unit-waste-service`.
- [33] Bright Hare M., Friday, September 11 at 6:21 AM, in the sub-thread
  under [8] Icy Nuthatch K.: "Icy Nuthatch K. I have dialysis tubing and 5
  people in my home and it’s not enough."
  Registered under `cart-sizes-and-eligibility`.
- [19] Hardy Elk A., Thursday, September 10 at 9:18 AM, top-level: "Yes
  garbage pick up in Edmonton sucks we have 4 people in our home and we
  recycle as much as we can but still we fill the bin the garbage pick up is
  horrible if it even happens we can phone 311 and still we wait for another
  week before our garbage is picked up!!! The new garbage system is a mess
  and our city is dirtier than it has ever been before. I am not about to
  pay an extra $15 dollars a month for and larger or extra bin. They need to
  make sure that garbages are picked up when they are supposed to be picked
  up!!"
  Its clauses about 311, the $15 fee and the city being dirtier are
  registered under `collection-reliability`, `waste-service-billing` and
  `waste-system-cleanliness`. The clause "we have 4 people in our home and
  we recycle as much as we can but still we fill the bin" is on no claim.
- [91] Foggy Raven T., Friday, September 11 at 11:50 AM, top-level: "Yea I
  mean I’m the last one to complain about stuff like this usually but it is
  really strange that it wouldn’t be every week. / We can only put a limited
  amount of garbage out AND garbage is collected less frequently. I think we
  need to pick a struggle. If you’re going to pick up only every 2 weeks,
  then you should pick up whatever bags I put out there, not just whatever
  fits in the bin."
  Its last sentence is registered under `curbside-waste-rules`. "We can
  only put a limited amount of garbage out AND garbage is collected less
  frequently" is on no claim.
- [78] Bright Porcupine J., Friday, September 11 at 5:20 AM, top-level: "In
  small towns- they collect the bins weekly!"
  On no claim.
- [116] Rustic Bluejay C., Tuesday, September 15 at 5:03 PM, top-level:
  "It's exactly the same thing in Calgary"
  On no claim.
- [53] Dusty Raven K., Thursday, September 10 at 10:17 AM, top-level: "Have
  you talked to your neighbors. My house has 2 adults my new neighbors have
  2 adults and 2 small children. I told them when they moved in they were
  welcome to put their overload into my bin"
  On no claim; it is the comment [69] replies to.
- [34] Sunny Jackrabbit L., Friday, September 11 at 9:25 AM, in the
  sub-thread under [8] Icy Nuthatch K.: "Prairie Nuthatch W. from the
  birthday party all the boxes and most wrapping paper get flattened and go
  in the blue bag. Leftover food in compost. The black bin just gets popped
  balloons, streamers and paper plates. How does that fill your bin?"
  Registered under `household-waste-diversion`.
- [99] Hardy Owl R., Saturday, September 12 at 9:27 AM, top-level: "Rent a
  bigger Bin from the city or two or quit throwing so much out"
  Registered under `cart-sizes-and-eligibility`.

What these add. Three more people say the bin is not enough for their own
household ([28], [33], [19]), one of them a household of four that says
it recycles as much as it can. So the against side's adequacy assertion
rests on more accounts than the three claims under this question show,
and the for side's on the seven above plus the diversion claims next
door. Both sides argue from their own bins.

## What the editor makes of the 28 wordings

Stated here so the framing checker can test it against the comments
above; the brief's reasoning is in the brief.

- **Published schedule and history, checkable against City records:**
  `black-bin-frequency`, `green-bin-frequency`, `recycling-frequency`,
  `collection-frequency-change`, and the "when there was no limit" premise
  inside `past-weekly-bag-volume`.
- **One household's report of itself, which no public record holds:**
  the seven reports under `biweekly-bin-adequacy`, the dump runs in [10],
  the two green bins in [96] and [105], and [45].
- **A truism once the degree is taken out:** "garbage can rot" and
  "diapers take space". As written by the commenters both carry a degree
  and a consequence, and the brief may not test them without it.
- **Opinion or proposal, which the site does not test:** "should be
  picked up every week" in [68], "It’s crazy to me" in [10], "This city
  makes no sense" in [68], "Such a waste of manpower" in [96].

## Selection

Nobody chose these wordings. They are every wording the merge carried
onto the 11 claims the grouping placed under this question. Of the 20
questions this source still has on the register, this one has the most
people taking part (17; the next has 10), and it is a GO with no brief.
