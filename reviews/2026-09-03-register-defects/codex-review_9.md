# Independent critique: register defect repairs, PR #45 — round 9

Round 8 returned one finding and it was right. My sentence assigned both
roles to one seat and no seat fits that description. Applied:

> GPT-5.6 Sol parked all four of them. Gemini 3.1 Pro sent three ahead
> and declined the fourth, downtown-business. So Sol is the cautious
> seat in the three go-against-park splits, and Gemini is the stricter
> seat in the one no-against-park split. None of that was visible from
> the register, so all four reasons now name both readers and what each
> of them wanted.

Nothing else changed since round 8. The register text is unchanged from
what you saw; the v1.25 entry as it now stands is below, with the record
after it. New findings only. End with `VERDICT: APPROVED` or
`VERDICT: REVISE`.

### The register header, the two paragraphs this branch changed

```yaml
# accounts:       distinct people in the source who took part in the question,
#                 with the for/against/neither split. One pseudonym is one
#                 person within a source; no page sums across sources. The
#                 validator checks the total two ways: it must fall inside the
#                 range its claims allow, and the for/against/neither counts
#                 must add up to it. That arithmetic is all the validator can
#                 prove; it cannot show that each person was counted once,
#                 because a double count and a missed person cancel out. Which
#                 side somebody who argued on both sides belongs on is an
#                 editor's judgement, and this file does not record it.

# prior_triage: the claim-level decision v1.16 superseded, kept rather than
#               discarded. Before triage moved up to the question, every
#               proposition was read on its own by two seats, and eleven that
#               both seats refused are now live claims under questions that are
#               going ahead. That is the right outcome — the question is worth
#               the work — but a brief author who cannot see the refusal writes
#               up a claim two independent readers already declined, and it
#               gets a published finding.
#               So the decision is recorded where it was made:
#               { outcome, readers, reason }. `outcome` is from the same
#               go | park | no vocabulary; `readers` names every seat that
#               reached it, at least two, because "the readers declined it"
#               means nothing unless a reader can see how many there were and
#               who they were; `reason` is the reason the run's combined
#               triage file recorded for that decision. That file keeps one
#               reason per decision, and on the eleven claims that carry this
#               field the stored sentence copies one seat's wording word for
#               word; the field neither names that seat nor keeps the other
#               seat's reason. It is
#               history, not state: the question's triage is what decides
#               whether the work happens, and a claim declined on the
#               right-of-reply ground carries that live decline instead.
```

### /questions/property-taxes, as rendered

# How much have Edmonton property taxes gone up?
2026-09-03 · Said in 2 comments · 2 claims

## Going ahead
City tax-rate and typical-property records can show the general increase, although the two anonymous residents’ dollar amounts cannot be verified without their assessment and tax notices.
How far the work has got
Registered

Whether it is worth checking
Going ahead

What a reader can see
Not published yet

One resident's increase and another's yearly bill are different measures of the same complaint about what Edmontonians pay, and both were raised in the same argument. The resident who reported the increase wrote "my taxes" and not property taxes, so the claim under her name says taxes. Both readers sent the question ahead on the City's own tax records. Neither resident's own amount can be checked without their assessment and tax notices, which is the limit the combined reason carries.
What the states mean

## Where it came from
Taken from Yegscoop post on council's 2026-08-26 bike lane decision, read end to end. Every factual claim in it was extracted and merged, so this question is listed whatever became of it.
Facebook post · captured 2026-09-02 · 621 comments
The names below are pseudonyms, one to a commenter within this source.
The original post

## The claims under it

-

### One Edmonton resident's taxes went up by $1,500 in the last three years.
Said in 1 comment

- my taxes have gone up $ 1500 in the last 3 years.
Dusty Raven M.

-

### One Edmonton resident pays $6,000 a year in property tax.
Said in 1 comment

- Glad I am paying $6,000 a year in property tax for this!
Rustic Bluejay S.

Every question we've considered


### The six rewritten reasons, verbatim from the register

`hundred-million-approval`: All 17 people who raised the $100 million in this source take the approval as given, so checking the council vote would settle nothing anybody here is arguing about. What is argued about is how long the money covers and how it sits beside road spending, and that half went to a separate question, now published: how the money for bike lanes compares with what Edmonton spends on roads.

`infill-luxury`: "Luxury" is not a category in Edmonton's assessment roll or its permit records, and without a definition somebody could be wrong about, no record could settle this either way. No captured post makes the claim either, which on its own would only park it.

`cycling-safety`: Edmonton's traffic bylaw sets where cyclists may ride and the rules they and drivers have to follow, and the City's collision records show where and how often cyclists are hit. Neither shows whether a lane made riding safer, because a crash count with no count of the riders using it cannot tell a more dangerous lane from a busier one. That is the point the two readers split on. Gemini 3.1 Pro sent it ahead on the strength of those records; GPT-5.6 Sol parked it until the collision records can be tied to route design and to how many riders use each route.

`zoning-and-infill`: Gemini 3.1 Pro sent this ahead, saying the zoning bylaw and the infill permit records answer the questions about parking minimums, tree removal and density. GPT-5.6 Sol parked it until address-level permits can be tied to tree removals and to before-and-after parking counts.

`emergency-access`: Gemini 3.1 Pro sent this ahead, saying response-time records and the City's emergency access design standards show whether bike lanes delay or assist emergency vehicles. GPT-5.6 Sol parked it until response records can identify corridor-level delays or emergency use of the lanes.

`downtown-business`: Reopen this when business closures can be tied to customer-access changes through location-level records or owner evidence, because closure counts alone cannot establish why a business failed. That is where GPT-5.6 Sol landed. Gemini 3.1 Pro went further and declined it, because no public record tracks the specific reasons individual downtown businesses closed.

### The v1.25 entry, as rendered on /methodology/changes

## v1.25
2026-09-03Misattribution and prior triage
A real person was published asserting something they never asserted: their tax bill was written up as a tax rise. The gate that checks quotes never looks at the sentence written on top of them, so it could not have seen it, and the merge rule that would have stopped it was written during this very intake run and enforced by nothing. Alongside it, eleven propositions two readers had already refused were queued for published findings with no trace of the refusal, and three account splits counted a person twice. None of this was caught by the pipeline. It was caught by the first audit to go back over the register's own decisions.

### What changed

- The claim said Edmonton property taxes had risen sharply, by $1,500 in three years for one resident and $6,000 a year for another. The second resident had written: Glad I am paying $6,000 a year in property tax for this! That is what somebody pays, not what it went up by, and there is no sharply anywhere in it. One person's increase had been stitched to another person's bill and the compound put in both their mouths. On a site whose whole promise is fidelity to what people actually said, this is the worst defect available to us. It is now two claims, each carrying only what its own wording supports, and both quotes were read back against the capture by hand.

- No tightening of the checks the quote gate makes would have caught it, and that is the part worth understanding. Both quotes are exact substrings of the comments they came from, which is the entire thing that gate was built to prove. It establishes that the words are in the capture under the commenter the site credits them to. Whether the sentence assembled on top of those words says what the words say is a separate question, and no step in the pipeline was asking it.

- The rule that would have stopped it was already written. prompts/intake-merge.md opens its merging rules with: A claim is one assertion. If you are joining two assertions with and, they are two claims. This claim joined two people's remarks with exactly that word. Worse, that rule was written the same day, in the re-merge after an independent critique threw the first merge of this run away for grouping by topic instead of by proposition, having found a compound assertion put into the mouths of commenters who had made neither half of it. It was written in direct response to that failure, the same shape in a different claim, it went into a prompt file, and nothing was ever wired up to check it. The re-run under those rules shipped the tax claim anyway. A rule nobody checks is a wish.

- Nothing in the pipeline found any of this. The first triage audit did, the day after v1.15 wrote down that nobody had yet shown a second triage read reaching the same decisions. A third reader went back over work that had already passed every check standing in front of it. Every guard here inspects a claim as it goes past and then stops looking at it. There was never anything behind them. The register these defects sit in reached the main branch at midday on 2026-09-03 and the repairs went in that night.

- prior_triage is the schema change, and it is what earns a version. When v1.16 lifted triage from the claim up to the question, the decisions made at the old level went in the bin, and eleven propositions that both triage seats had independently returned NO on became live claims under questions that are going ahead. Three of them are the plainest kind: that cyclists pay property taxes, that Edmontonians pay for services they do not use, and that roads carry goods and emergency vehicles. Both readers turned all three down as things nobody disputes, which is the shape that took four published claims off the findings board earlier the same day, and all three were queued to be written up and given published findings. The field records the outcome, the seats that reached it, and the reason the run's combined triage file gave for it. On all eleven that reason copies one seat's wording word for word, and the field neither names that seat nor keeps the other seat's reason, which is a gap this version names and does not close. It moves no question's disposition and decides nothing. It means a brief author can see the refusal instead of rediscovering it.

- Two validator rules hold the shape of that field. One requires an outcome from the same vocabulary, at least two named readers and a reason, and rejects any other key. A refusal with no reason attached tells a brief author the claim was turned down without telling them why, which is worse than keeping nothing. Neither rule checks that those values match the run's combined triage file, which is a check that could be written and has not been, so that comparison is still done by hand. The other refuses the field on a claim declined on the right-of-reply ground, where the decline is live rather than historical, because a claim carrying both would read as having been ruled on twice.

- The register header told readers the validator tested the for/against/neither split against the question's total. It did not. It tested the total against the range its claims allow, which is a different check that passes things the promised one refuses. The described check now runs, and on its first pass it caught three splits in the published register overshooting their totals by one, on cycling-volumes, lanes-and-congestion and 83-avenue-lane. No page prints those splits, so no page was wrong; the file was. Each was one person who argued on two sides of a question and got counted on both. The claim-level count is deliberately everyone who argued a claim either way. The question-level split is people, once each, so the sides have to add up to the total. Which side somebody who argued on both ends up on is an editor's judgement the file does not record, and the header now says that as well as describing a check that exists.

- Six question reasons go back for rewriting, from the same audit. Four ended by naming a split and not the sides of it: three said "The two readers split GO and PARK" and downtown-business said "The two readers split NO and PARK", which tells a reader there was a disagreement and not who was on which side of it. GPT-5.6 Sol parked all four of them. Gemini 3.1 Pro sent three ahead and declined the fourth, downtown-business. So Sol is the cautious seat in the three go-against-park splits, and Gemini is the stricter seat in the one no-against-park split. None of that was visible from the register, so all four reasons now name both readers and what each of them wanted. infill-luxury opened its decline with "No captured post makes this claim", which v1.15 says is a park and not a decline; the decline now leads on the ground that carries it. And hundred-million-approval told the reader who raised it that their question was dropped, without saying that the live half of it, how long the money covers and how it sits beside road spending, is already published.

- What this version does not do is close the hole. There is still no check anywhere that a claim's proposition says what its quotes say, and building one is separate work already under way rather than something shipped here. So the honest account of this version is that it repairs the specific defects that day's audit found, and names the gap that let the worst of them through. That gap is open as this is published.

### Read next

- How much have Edmonton property taxes gone up?

- The register of questions and claims

- How findings are produced

Full change note
The comfortable story would be that a check failed. No check failed. The check was never built. Somebody watched this failure happen during intake, on a different claim, wrote a rule against it the same day, put the rule in a prompt, and moved on, and an Edmontonian ended up on this site asserting a proposition about tax increases when what they had made was a remark about a bill. Between those two moments every check the pipeline runs ran, and passed. That is the shape of the fault, not an accident of one claim, and it is two holes rather than one. Going forwards, nothing compared the sentence with the quotes, and a check that did would have caught this before it shipped. Going backwards, there was nothing at all: the guards run one item at a time, in the direction the work is moving, and not one of them was ever asked to turn round and read what had already gone out. Nothing had gone back over these decisions until that day. The lesson is not to write better rules. It is that a rule which lives only in a prompt is a statement of intent, and the difference between intent and a guarantee is the whole of what this project claims to be selling.

### The record, for checking

Both seats on `property-taxes`. Gemini 3.1 Pro, GO: "The City's property
tax rate history and assessments can show the typical increase for
residents." GPT-5.6 Sol, GO: "City tax-rate and typical-property records
can show the general increase, although the two anonymous residents'
dollar amounts cannot be verified without their assessment and tax
notices." The combined reason is Sol's sentence verbatim.

The four splits. `zoning-and-infill`: Gemini GO ("The zoning bylaw and
infill permit records answer questions about parking minimums, tree
removal, and density"), Sol PARK ("Reopen this when address-level infill
permits can be linked to tree removals and before-and-after parking
inventories, because the zoning bylaw alone cannot show what density
displaced"). `emergency-access`: Gemini GO ("Response-time records and
emergency access design standards show whether bike lanes delay or
assist emergency vehicles"), Sol PARK ("Reopen this when response
records identify corridor-level delays or emergency use of bike lanes,
because design standards alone cannot show whether the lanes help or
hinder actual responses"). `cycling-safety`: Gemini GO ("City collision
records and the traffic bylaw answer whether bike lanes improve safety
and who is at fault in collisions"), Sol PARK ("Reopen this when
collision records can be linked to route design and cyclist exposure,
because raw crash totals cannot show whether bike lanes change risk").
`downtown-business`: Gemini NO ("No public record tracks the specific
reasons why individual downtown businesses have closed"), Sol PARK
("Reopen this when business closures can be linked to customer-access
changes through location-level records or owner evidence, because
closure counts alone cannot establish why businesses failed").

The three prior_triage reasons the entry now names. Roads carrying
goods: "That roads carry deliveries, buses and emergency vehicles is a
truism accepted by both sides of this argument." Cyclists paying
property taxes: "Residents paying general taxes while also riding
bicycles is an ordinary feature of the tax system that neither side
meaningfully disputes." Taxes funding unused services: "Municipal taxes
funding shared services regardless of each resident's personal use is an
undisputed feature of public finance."

The two captured comments. Rustic Bluejay S.: "$100 million on bike
lanes but let's not address the issues with downtown or support small
businesses while the LRT is being built! Glad I am paying $6,000 a year
in property tax for this!" Dusty Raven M.: "... Being this is a winter
city I feel my tax dollars are wasted and my taxes have gone up $ 1500
in the last 3 years."

## What I want from this round

New findings on the text as it now stands, inside the register and the
v1.25 changelog entry. Anything you find outside those two files, say so
and mark it follow-up.
