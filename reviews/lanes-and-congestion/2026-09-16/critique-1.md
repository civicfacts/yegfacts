<!-- Dispositions, 2026-09-24, by Stew (drafting seat Claude Opus 5.5). All seven required changes made. Suggestions S1, S2, S3, S4, S6, S7 and S9 adopted; S5, S8 and S10 adopted in part. The finding is unchanged.

R1: on a question with claims parked at framing, the finding strip and the "Claims checked" heading no longer print "Main claim". The strip prints "What the record could check. It does not answer the claims set aside above." (ClaimStrip.astro, for any question with framing parks). R2: TL;DR bullets 4 and 5 are now "The City has taken driving lanes for bike lanes on at least four streets, in three of its fifteen districts." and "Nobody can tell from the records whether it has done so all over the city, and that finding says nothing about traffic." The old bullets' facts stay in the explanation (102 Avenue) and the claim's key facts (the inventory's missing field). R3: the opening says "Twenty-two people" and "Two of them made more than one of these claims", both derived in the calculation module from the register's wordings; 24 is no longer printed. R4: the register's triage reason is unchanged. "How it was registered" labels it "What we expected when it was registered" with the registration date, and on a question with framing parks adds that the check before research found no record of that kind. The same dated label is on every register claim page that shows its question's reason, which covers the three pages named. R5: a register claim named in a published claim's register_claims now shows "Checked as", the published question, its finding and its answer, instead of "No finding yet" (claims/[id].astro and ClaimEntry.astro, for every such claim). R6: the GPT-6 Sol note is the site's summary, not the seat's quote, and now reads "In cross-review it reported a third district, North Central. Round-2 answers do not change a seat's verdict. This page counts North Central from the City's route table, found after the panel ran." R7: each parked claim shows a plain line from the story's new `parked` map, keyed by register claim id and checked by scripts/validate.ts to name a framing park on this question. The register's full reason is one click away on the claim page. "Parked" has a popover (glossary term "parked"), and the repeated sentence is gone from the block. The block's intro says the parked claims come from both sides, computed from the register's side field.

S1: the fallback reopen rule uses border-rule. S2: the flat-denial clause is cut. S3: "Why three of the claims have no answer", "The claims set aside come from both sides", and "all throughout the city" quoted in the heading and the limitation. S4: "Six said the opposite, in 11 comments". S5, in part: the roads claim shows its triage outcome and reason on the question page and its claim page (for any claim two triage readers turned down), and the story says the 79 Street claim was passed to the Holyrood school lane question. The register still files the 79 Street claim here, because moving it changes the account totals the intake scripts derive for both questions, which is intake work rather than this batch. S6: the evidence list now includes any registry entry the story body links, which adds YF-EV-0173 here and no entry on any other question page. S7: "96 Street is the one district-adding street whose district no seat confirmed in round 1. Claude Opus 5.5 guessed North Central from a news report." S8, in part: a published entry lists every check and its report path. The draft-day entry stays, because an article history records what was true on its date, and the paths stay as text because the history renders plain text, as on cycling-volumes. S9: the severity words are gone from Missing evidence. S10, in part: the parked claim pages no longer say "fairness check" in the site's own sentence; the register's reason printed below it keeps its words as the record. The extraction seat nicknames are on every captured claim page across the site and are left for a separate batch. -->

# Rendered-page critique, 2026-09-24, a Claude (Opus 5.5) session separate from the drafter, checkers and gate

Page read: `dist/questions/lanes-and-congestion.html` from `npm run build` on
worktree commit a4b2137, plus every claim page it links:
`lane-removal-increases-congestion`, `bike-infra-reduces-congestion`,
`lanes-removed-for-traffic-calming`, `lc-lanes-taken-citywide`,
`city-removed-traffic-lanes`, `roads-carry-goods-and-services`,
`79-street-relieves-75-street`. Read against DESIGN.md section 12 (plain speech
and "The layers", the D-0039 order) and section 10.

**Bottom line.** The top of the page is honest. The standfirst says the right
thing, and the parked block does keep the one finding from reading as the
answer to the congestion question. Seven changes are required. The biggest
are: the "Main claim" label on the only finding, a TL;DR that never says what
that finding is, the parked-claims text written in method language, and a
"How it was registered" section that says the record can answer the
congestion question when the page says it cannot.

Checked and passing: every internal link and in-page anchor resolves in
`dist/`; no duplicate `id`s; the order is title, standfirst, TL;DR, then the
parked claims, then the finding row and the provenance line, so nothing sits
between the answer and the TL;DR except the pending-review banner, which sits
above the title and goes away at publication; the panel line and the
Unanimous popover both say the two OpenAI seats are not independent; the
finding carries its as-of date and "not the same as proven false".

## 1. Ten-second test

Title, question, standfirst: "Bike lanes and Edmonton traffic" / "Do
Edmonton's bike lanes ease traffic congestion or make it worse?" / "Nobody can
tell from the records we could find whether Edmonton's bike lanes help or hurt
traffic."

A resident can say it back correctly: "they couldn't find proof either way."
That is the most important thing the page has to get across, and it does.

What they would get wrong or miss, from the TL;DR:

- They would not learn the one thing the site did find. Bullet 4 reads "The
  City of Edmonton removed a driving lane on part of 102 Avenue to make room
  for a bike lane." A resident comes away thinking the City did this on one
  street. The finding documents four streets in three districts, and says the
  records cannot show whether it happened "all over" the city. See R2.
- Bullet 4 sits between three bullets about congestion. A reader against the
  lanes will take it as "they took a lane, so traffic got worse", which is the
  causal step the page says it cannot make. See R2.

## Required (misleads)

### R1. "Main claim" on the only finding reads as the answer to the congestion question

Quoted, on the finding row directly under the parked block and again on the
heading under "Claims checked": "Has the City taken driving lanes for bike
lanes all over Edmonton?**Main claim**" followed by the "Not established"
badge.

Why it misleads: on this page the question is about congestion and the parked
claims are the congestion claims. Calling the one remaining claim "Main claim"
tells a skimmer that this is the page's verdict. Because its badge says "Not
established" and the standfirst says "nobody can tell", a skimmer will merge
the two and read the badge as the answer to "do bike lanes cause congestion".
The brief says this finding must never read that way.

Fix: do not print "Main claim" when a question's parked claims are the ones
that answer its question. At minimum, on this page, replace it with a
one-line label on the row such as "The one thing the record could check. This
is not about traffic." (The source is `ClaimStrip.astro:46` and
`questions/[id].astro:449`, keyed on `primary_claim`.)

### R2. The TL;DR never says what the finding is, and understates it

Quoted: "The City of Edmonton removed a driving lane on part of 102 Avenue to
make room for a bike lane." / "Edmonton's bike route list does not say what
road space each bike lane replaced."

Why it misleads: the finding is that the City took driving space for bike
lanes on at least four streets (102 Avenue, 96 Street, 100 Street, 110
Street), and the records cannot show whether that is "all over the city". The
bullets give one street and a sentence about a data field. A resident cannot
say what was found. A resident who argued "they took lanes everywhere" gets
nothing, and one who argued "they didn't take lanes" gets less than the page
proves.

Fix: replace bullets 4 and 5 with, for example, "The City has taken driving
lanes for bike lanes on some streets, 102 Avenue among them." and "Nobody can
tell from the records whether it has done so all over the city, and that
finding says nothing about traffic." The "and" in the second sentence carries
the guard. It could go in its own bullet if the TL;DR has room.

### R3. "Twenty-four people argued" contradicts "22 different people" in the same paragraph

Quoted: "Twenty-four people argued under one Facebook post ... Some people
made more than one of these claims, so the four groups hold 22 different
people."

Why it misleads: 13 + 6 + 4 + 1 = 24 is the sum of the group sizes, not a
count of people. Granite Hare D. and Prairie Waxwing D. are in both the
congestion group and the lanes-taken group. The paragraph opens with a number
it corrects four sentences later, and a journalist checking the counts finds
the first one wrong.

Fix: "Twenty-two people argued under one Facebook post ..." and drop the last
sentence, or keep it as "Two of them made more than one of these claims."

### R4. "How it was registered" says the record can answer the congestion question

Quoted: "Before-and-after traffic counts and travel times on converted
corridors can show whether reallocating lanes changed congestion, while the
general claim about roads carrying services adds nothing checkable." / "The
City's record of which lanes it reallocated, plus traffic counts and travel
times on those corridors, answers both directions and shows what else the road
carries."

Why it misleads: the page's own conclusion is that no published Edmonton
record of that kind exists and that neither direction can be answered. These
two sentences are the 2026-09-03 triage expectation, printed without a date
and in the present tense, beside "Going ahead" and "Panel complete". A skeptic
on either side can quote them against the page: "your own page says the
traffic counts answer it." The same sentence also appears under "Its
question" on the `city-removed-traffic-lanes`, `79-street-relieves-75-street`
and `roads-carry-goods-and-services` claim pages.

Fix: label the block with its date and tense ("At registration on 2026-09-03
we expected ..."), and add one sentence: "The check before research found no
such record, so the congestion claims are parked; see above." If the register
reason is meant to stay frozen, the label has to do this work.

### R5. The register claim behind the finding says it "has not been checked"

Quoted, on `/claims/city-removed-traffic-lanes`, which every captured wording
on the question page links to as "in the register": "No finding yet. This
claim has not been checked. It is waiting on the question below ..."

Why it misleads: this is the claim the panel checked, as
`lc-lanes-taken-citywide`. A reader who follows "in the register" from a
quote is told there is no finding and that it is still waiting.

Fix: when a register claim has been checked under a published claim id, its
page should say so and link to it ("Checked as: Has the City taken driving
lanes for bike lanes all over Edmonton? Not established"). If the drafter
knows this is site-wide and handled at publication, say where. I did not
verify whether other questions have the same gap.

### R6. A reviewer note says North Central is "not counted here", and the finding counts it

Quoted, under AI review, GPT-6 Sol: "In cross-review it reported a third
district, North Central, which is not counted here because the round-1 answers
are the basis." The finding and the explanation both count North Central (96
Street in Delton) and reach three districts.

Why it misleads: a journalist reads two opposite statements about the same
district. The note means that the seat's round-2 district was not counted
toward its verdict, and that North Central came in later from the freshness
audit, but the note does not say that.

Fix: "In cross-review it reported a third district, North Central. Round-2
answers do not change a seat's verdict. This page counts North Central from
the City's route table, found after the panel ran."

### R7. The parked-claims text is written for the method, not for a resident

This is the new component, and the brief asks whether a resident can read it.
The frame works: the heading "What the record cannot answer" and the intro
"These claims were set aside before any research ran, so they carry no
finding. Nothing here says whether any of them is true." are clear, and they
come before the finding. The per-claim text, rendered straight from the
register, does not work for a resident:

- "We could not answer this before any research ran." This is printed three
  times, and it reads as if the site tried to answer and gave up, or did not
  bother. The anti-lane reader will take the first claim's version as a dodge.
- "The fairness check found ..." A method name that is not defined anywhere
  on the page and has no popover.
- "counts and monitoring, not the before-and-after studies that could
  attribute a change in travel time to taking the lane, so the published
  Edmonton record cannot answer this claim at the causal level people assert
  it." Nobody would say this sentence out loud.
- "What would reopen it: ... infrastructure-attributable mode substitution
  linked to a citywide delay estimate", "a design capable of supporting the
  attribution", "a contemporaneous City record addresses both the
  without-the-bike-lane counterfactual and the combined-project or savings
  component". These are method words.
- The "Parked" label has no gloss, although every other method word on the
  page has a popover.

Why it misleads: the resident cannot tell from this block why these claims
got no answer. The block's only job is to explain that, and the explanation
under "Why three of the claims are parked" does it in plain words. What
misleads is the repeated "could not answer this before any research ran",
which reads as the site declining to look.

Fix: render a plain reader line per parked claim, with the register reason
moved to the claim page where the hour-layer reader finds it. For example:
- Lanes cause congestion: "No study has measured, for any Edmonton street,
  whether taking a lane for a bike lane is what changed travel times. Reopens
  if one is published."
- Bike lanes ease congestion: "No Edmonton study has measured how many trips
  bike lanes took out of cars, or what that did to traffic across the city.
  Reopens if one is published."
- Traffic calming: "No City record says the lanes would have come out without
  the bike lanes, or that the two were combined to save money. Reopens if one
  does."
Drop "We could not answer this before any research ran" (the intro already
says it) and give "Parked" the same popover as the finding words.

## Suggested

### S1. Gold rule in the parked block breaks the palette rule

`ParkedClaims.astro` draws "What would reopen it" with `border-l-2
border-gold` on paper. DESIGN.md §10 says gold is load-bearing in exactly
four places and only on forest or inside a badge. This would make five, the
first on a light ground. Use the hairline (`border-rule`) or forest.

### S2. "A flat denial that it has done so does not hold" answers a claim the page parked

Quoted: "So the City has given up driving space for bike lanes on at least
some streets, and a flat denial that it has done so does not hold." No claim
on the page makes a flat denial. The nearest one is the parked traffic-calming
claim ("they are not removing lanes for cyclists"). A pro-lane reader will
read this sentence as the page ruling against a claim it said it would not
rule on. Cut the clause, or name the denial and say how it differs from the
parked claim.

### S3. Method words in the explanation's headings and prose

"Why three of the claims are parked" (an h3, so also in the outline), "The
parks fall on both sides.", and "Why that does not settle all throughout the
city" (the claimant's phrase with no quotation marks, so the heading does not
read as a sentence). Suggested: "Why three of the claims have no answer",
"The claims set aside come from both sides.", "Why that does not settle 'all
throughout the city'". The same unquoted phrase opens a Limitations bullet:
"All throughout the city was fixed before the research as ...".

### S4. People and comments are counted in different units side by side

The explanation says "Six said the opposite". The parked card for the same
claim says "Said in 11 comments". Both are right (Cedar Pelican C. wrote six
of the comments), but a reader sees 6 and 11 for the same group. The
explanation could add "in 11 comments", or the card could add the number of
people.

### S5. Claims with no finding are shown as waiting when they are not

Quoted: "These were made about this question and have not been through the
panel." `79-street-relieves-75-street` was carried to the 79 Street question,
according to `register-note.md`, but the register still assigns it here.
`roads-carry-goods-and-services` was declined at triage as a truism. Neither
is waiting on this panel. Update the register's `question` for the 79 Street
claim and show the triage outcome for the roads claim, or change the intro
line to cover both cases.

### S6. The Hermitage Road evaluation is cited in the text and missing from "Edmonton evidence"

The explanation links `/evidence/YF-EV-0173` ("evaluation of Hermitage Road
and 40 Street"), and that page exists. The Edmonton evidence list stops at
YF-EV-0172. It is the one before-and-after record the congestion discussion
rests on, so it belongs in the list.

### S7. Limitations bullet contradicts itself on 96 Street

Quoted: "96 Street is the one district-adding street that no seat placed in a
district in round 1. The Claude seat counted it from a news report and called
its district likely North Central without checking." The second sentence
says a seat did place it, tentatively. Suggested: "No seat confirmed its
district in round 1; the Claude seat guessed North Central from a news
report." The same bullet says "The Claude seat" where the table says "Claude
Opus 5.5". Use one name.

### S8. Article history carries a raw path and pre-publication wording

Quoted: "... are at reviews/lanes-and-congestion/2026-09-16/plain-speech/gpt-1.md."
and "deployed for review ahead of the publication gate". Link the path, and
update the entry at publication so the permanent record does not describe a
draft state.

### S9. Unexplained severity words in Missing evidence

Quoted: "(City of Edmonton transportation and project records; critical)" and
"(City of Edmonton; high)". A resident does not know what "critical" or
"high" ranks. Gloss them or drop them from the reader text.

### S10. The claim pages repeat the parked-block jargon, plus extraction seat names

Each parked claim page reads "The fairness check found that no published
record can answer it at the level people assert it, so it is parked rather
than answered on something that would not carry it." It also shows "Raised
in extraction by flash, haiku, luna", which are internal seat nicknames with
no gloss. Apply the R7 rewrite here too, and either gloss the seat names or
drop them.

## Answers to the six questions, in brief

1. Ten-second test: passes on the congestion answer, fails on the finding
   (R2).
2. Overclaim above the fold: the "Main claim" label (R1) and bullet 4's
   placement among the congestion bullets (R2). Nothing reads Not established
   as false, the rating is dated, and the page says the seats come from two
   vendors.
3. Method words in the top layers: the parked block (R7), "Parked" with no
   gloss, and the explanation's headings (S3). The standfirst and TL;DR are
   plain.
4. Page order: follows D-0039, with the parked block before the finding as
   v1.35 requires. Nothing sits between the answer and the TL;DR.
5. Slant: R4 can be quoted against the page by either side. S2 reads as
   ruling on a parked pro-lane claim. R7's "could not answer this before any
   research ran" reads to the anti-lane side as a dodge. The explanation's
   "The parks fall on both sides" is the right thing to say, and it should
   say it in the block itself.
6. Faults: count contradiction (R3), district contradiction (R6), a stale
   register page (R5), a cited source missing from the evidence list (S6). No
   broken links and no empty sections.
