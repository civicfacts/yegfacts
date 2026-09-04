# Independent critique: register defect repairs, PR #45 — round 4

Round 3 returned six findings. All six are applied. Same rules, same
labels. End with `VERDICT: APPROVED` or `VERDICT: REVISE`.

## What I did with round 3

**1 (Truth, the traffic bylaw does not decide fault).** Applied, and
your second point landed harder than your first: my refusal reasoning
argued that neither seat disputed the sentence, which shows agreement
and not truth. The opening is now "Edmonton's traffic bylaw sets where
cyclists may ride and the rules they and drivers have to follow". Note
that the question's grouping note, one line further down the page, still
says the records cover "who is at fault". That line is not changed by
this branch and I have not touched it; it is recorded for a later pass.

**2 (Attribution, prior_triage does not say whose wording the reason
is).** Applied as far as this branch can go. Adding a `reason_reader`
key means changing the validator, which is not a file this branch may
touch, so the register header and the changelog now say plainly that the
field does not record which seat's sentence it is, and the changelog
names it as a gap this version does not close. The schema change is
being reported as follow-up work rather than quietly skipped.

**3 (Clarity, the grouping note reversed the logic).** Applied. The
private amounts are now stated as the limit both readers put on the
question, not as the reason they sent it ahead.

**4 (Truth, direction was not what let the defect through).** Applied.
The full change note now separates two holes: forwards, nothing compared
the sentence with the quotes, and a check that did would have caught
this before it shipped; backwards, there was nothing at all.

**5 (Clarity, "wordings").** Applied, now "quotes".

**6 (Plain speech, "argued on more than one").** Applied in both places,
now "both sides" and "both".

## The new text

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
#               reason per decision, so the sentence is one seat's wording
#               rather than something both wrote, and the field does not say
#               which seat's it is. It is
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

One resident's increase and another's yearly bill are different measures of the same complaint about what Edmontonians pay, and both were raised in the same argument. Neither private amount can be checked without that resident's own assessment and tax notices, which is the limit both readers put on the question when they sent it ahead.
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


### /questions/cycling-safety, as rendered (the state block only)

# Do bike lanes make cycling safer in Edmonton, and where do cyclists actually ride?
2026-09-03 · Said in 13 comments · 8 claims

## Going ahead
Edmonton's traffic bylaw sets where cyclists may ride and the rules they and drivers have to follow, and the City's collision records show where and how often cyclists are hit. Neither shows whether a lane made riding safer, because a crash count with no count of the riders using it cannot tell a more dangerous lane from a busier one. That is the point the two readers split on. Gemini 3.1 Pro sent it ahead on the strength of those records; GPT-5.6 Sol parked it until the collision records can be tied to route design and to how many riders use each route.
How far the work has got
Registered

Whether it is worth checking
Going ahead

What a reader can see
Not published yet

Edmonton's collision records and the traffic bylaw cover whether the lanes reduce harm, who is at fault and who is riding where.
People arguing in both directions raised this question, and every claim they made about it is checked, whichever way it points.
What the states mean

### The v1.21 entry, as rendered on /methodology/changes

## v1.21
2026-09-03Misattribution and prior triage
A real person was published asserting something they never asserted: their tax bill was written up as a tax rise. The gate that checks quotes never looks at the sentence written on top of them, so it could not have seen it, and the merge rule that would have stopped it was written during this very intake run and enforced by nothing. Alongside it, eleven propositions two readers had already refused were queued for published findings with no trace of the refusal, and three account splits counted a person twice. None of this was caught by the pipeline. It was caught by the first audit that looked backwards.

### What changed

- The claim said Edmonton property taxes had risen sharply, by $1,500 in three years for one resident and $6,000 a year for another. The second resident had written: Glad I am paying $6,000 a year in property tax for this! That is what somebody pays, not what it went up by, and there is no sharply anywhere in it. One person's increase had been stitched to another person's bill and the compound put in both their mouths. On a site whose whole promise is fidelity to what people actually said, this is the worst defect available to us. It is now two claims, each carrying only what its own wording supports, and both quotes were read back against the capture by hand.

- No tightening of the checks the quote gate makes would have caught it, and that is the part worth understanding. Both quotes are exact substrings of the comments they came from, which is the entire thing that gate was built to prove. It establishes that the words are in the capture under the commenter the site credits them to. Whether the sentence assembled on top of those words says what the words say is a separate question, and no step in the pipeline was asking it.

- The rule that would have stopped it was already written. prompts/intake-merge.md opens its merging rules with: A claim is one assertion. If you are joining two assertions with and, they are two claims. This claim joined two people's remarks with exactly that word. Worse, that rule was written the same day, in the re-merge after an independent critique threw the first merge of this run away for grouping by topic instead of by proposition, having found a compound assertion put into the mouths of commenters who had made neither half of it. It was written in direct response to that failure, the same shape in a different claim, it went into a prompt file, and nothing was ever wired up to check it. The re-run under those rules shipped the tax claim anyway. A rule nobody checks is a wish.

- Nothing in the pipeline found any of this. The first triage audit did, the day after v1.15 wrote down that nobody had yet shown a second triage read reaching the same decisions. A third reader went back over work that had already passed every check standing in front of it. Every guard here inspects a claim as it goes past and then stops looking at it. There was never anything behind them. The register these defects sit in reached the main branch at midday on 2026-09-03 and the repairs went in that night.

- prior_triage is the schema change, and it is what earns a version. When v1.16 lifted triage from the claim up to the question, the decisions made at the old level went in the bin, and eleven propositions that both triage seats had independently returned NO on became live claims under questions that are going ahead. Four of them are the same undisputed-truism shape that took four published claims off the findings board earlier the same day, and they were queued to be written up and given published findings. The field records the outcome, the seats that reached it, and the reason the run's combined triage file gave for it. That reason is one seat's wording rather than a sentence both of them wrote, and the field does not yet say which seat's, which is a gap this version names and does not close. It moves no question's disposition and decides nothing. It means a brief author can see the refusal instead of rediscovering it.

- Two validator rules hold that field to being a record rather than a second opinion. One requires an outcome from the same vocabulary, at least two named readers, and the recorded reason, and rejects any other key. A refusal with no reason attached tells a brief author the claim was turned down without telling them why, which is worse than keeping nothing. The other refuses the field on a claim declined on the right-of-reply ground, where the decline is live rather than historical, because a claim carrying both would read as having been ruled on twice.

- The register header told readers the validator tested the for/against/neither split against the question's total. It did not. It tested the total against the range its claims allow, which is a different check that passes things the promised one refuses. The described check now runs, and on its first pass it caught three splits in the published register overshooting their totals by one, on cycling-volumes, lanes-and-congestion and 83-avenue-lane. No page prints those splits, so no page was wrong; the file was. Each was one person who argued on two sides of a question and got counted on both. The claim-level count is deliberately everyone who argued a claim either way. The question-level split is people, once each, so the sides have to add up to the total. Which side somebody who argued on both ends up on is an editor's judgement the file does not record, and the header now says that as well as describing a check that exists.

- Six question reasons go back for rewriting, from the same audit. Four ended with the sentence "The two readers split GO and PARK", which tells a reader there was a disagreement and not who was on which side. GPT-5.6 Sol parked all four of them. Gemini 3.1 Pro sent three ahead and declined the fourth, downtown-business. One seat is the cautious one three times out of four and the strict one on the fourth, and none of that was visible from the register, so all four reasons now name both readers and what each of them wanted. infill-luxury opened its decline with "No captured post makes this claim", which v1.15 says is a park and not a decline; the decline now leads on the ground that carries it. And hundred-million-approval told the reader who raised it that their question was dropped, without saying that the live half of it, how long the money covers and how it sits beside road spending, is already published.

- What this version does not do is close the hole. There is still no check anywhere that a claim's proposition says what its quotes say, and building one is separate work already under way rather than something shipped here. So the honest account of this version is that it repairs the specific defects that day's audit found, and names the gap that let the worst of them through. That gap is open as this is published.

### Read next

- How much have Edmonton property taxes gone up?

- The register of questions and claims

- How findings are produced

Full change note
The comfortable story would be that a check failed. No check failed. The check was never built. Somebody watched this failure happen during intake, on a different claim, wrote a rule against it the same day, put the rule in a prompt, and moved on, and an Edmontonian ended up on this site asserting a proposition about tax increases when what they had made was a remark about a bill. Between those two moments every check the pipeline runs ran, and passed. That is the shape of the fault, not an accident of one claim, and it is two holes and not one. Going forwards, nothing compared the sentence with the quotes, and a check that did would have caught this before it shipped. Going backwards, there was nothing at all: the guards run one item at a time, in the direction the work is moving, and not one of them was ever asked to turn round and read what had already gone out. Nothing had turned round until that day. The lesson is not to write better rules. It is that a rule which lives only in a prompt is a statement of intent, and the difference between intent and a guarantee is the whole of what this project claims to be selling.

### The other four rewritten reasons, as rendered

`zoning-and-infill` (Going ahead): Gemini 3.1 Pro sent this ahead,
saying the zoning bylaw and the infill permit records answer the
questions about parking minimums, tree removal and density. GPT-5.6 Sol
parked it until address-level permits can be tied to tree removals and
to before-and-after parking counts.

`emergency-access` (Going ahead): Gemini 3.1 Pro sent this ahead, saying
response-time records and the City's emergency access design standards
show whether bike lanes delay or assist emergency vehicles. GPT-5.6 Sol
parked it until response records can identify corridor-level delays or
emergency use of the lanes.

`downtown-business` (Parked): Reopen this when business closures can be
tied to customer-access changes through location-level records or owner
evidence, because closure counts alone cannot establish why a business
failed. That is where GPT-5.6 Sol landed. Gemini 3.1 Pro went further
and declined it, because no public record tracks the specific reasons
individual downtown businesses closed.

`infill-luxury` (Declined): "Luxury" is not a category in Edmonton's
assessment roll or its permit record, so neither could return a verdict
either side could lose. No captured post makes the claim either, which
on its own would only park it.

`hundred-million-approval` (Declined): All 17 people who raised the $100
million in this source take the approval as given, so checking the
council vote would only restate an undisputed budget fact. What is
argued about is how long the money covers and how it sits beside road
spending, and that half went to a separate question, now published: how
the money for bike lanes compares with what Edmonton spends on roads.

### The seat outputs, for checking the attributions

- `zoning-and-infill`. Gemini 3.1 Pro, GO: "The zoning bylaw and infill
  permit records answer questions about parking minimums, tree removal,
  and density." GPT-5.6 Sol, PARK: "Reopen this when address-level
  infill permits can be linked to tree removals and before-and-after
  parking inventories, because the zoning bylaw alone cannot show what
  density displaced."
- `emergency-access`. Gemini, GO: "Response-time records and emergency
  access design standards show whether bike lanes delay or assist
  emergency vehicles." Sol, PARK: "Reopen this when response records
  identify corridor-level delays or emergency use of bike lanes, because
  design standards alone cannot show whether the lanes help or hinder
  actual responses."
- `cycling-safety`. Gemini, GO: "City collision records and the traffic
  bylaw answer whether bike lanes improve safety and who is at fault in
  collisions." Sol, PARK: "Reopen this when collision records can be
  linked to route design and cyclist exposure, because raw crash totals
  cannot show whether bike lanes change risk."
- `downtown-business`. Gemini, NO: "No public record tracks the specific
  reasons why individual downtown businesses have closed." Sol, PARK:
  "Reopen this when business closures can be linked to customer-access
  changes through location-level records or owner evidence, because
  closure counts alone cannot establish why businesses failed."

### The two captured comments behind the tax claims

Rustic Bluejay S.: "$100 million on bike lanes but let's not address the
issues with downtown or support small businesses while the LRT is being
built! Glad I am paying $6,000 a year in property tax for this!"

Dusty Raven M.: "... Being this is a winter city I feel my tax dollars
are wasted and my taxes have gone up $ 1500 in the last 3 years."

## What I want from this round

New findings only, on the text as it now stands.
