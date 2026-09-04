# Independent critique: register defect repairs, PR #45 — round 2

You reviewed this in round 1 and returned REVISE with about forty
findings. This is the second round. Same job, same rules, same standard:
fidelity to what the record says, and language a person would say out
loud. The plain-speech rule and the finding labels from round 1 apply
unchanged (Attribution, Truth, Promise, Clarity, Plain speech; High,
Medium, Low). End with `VERDICT: APPROVED` or `VERDICT: REVISE`.

Two things you did not have in round 1 and now do.

**First**, you were reviewing against a record I gave you, and on nine
findings you said "the supplied record does not establish X". I have
since gone to the repository and checked every one. Some of those were
right and the text was false. Some were wrong: the record does establish
it, and I have printed the receipt below. Please do not repeat a finding
where a receipt is printed unless the receipt itself is bad.

**Second**, the register file and the changelog have changed. The new
text is below. Review the new text, not the old.

## What I applied from round 1

**Item 1.1 (Attribution, "property taxes" vs "my taxes").** Applied. The
proposition is now "One Edmonton resident's taxes went up by $1,500 in
the last three years."

**Item 1.2 (Clarity, the $6,000 bill does not answer "how much have
taxes gone up").** Partly applied. I did not move the claim to a new
question: registering a question here requires a triage decision from
two independent seats, and I cannot manufacture one. Both seats did read
both dollar amounts under this question and both sent it ahead with the
same sentence about "the two anonymous residents' dollar amounts", so
the grouping is theirs, not mine. What I did add is a grouping_note,
which is the register's field for exactly this. It renders on the
question page and is quoted below.

**Item 2a.2 (the named separate question).** Partly applied. See the
receipt below: the named question is real and published. But you were
right that "what the money buys" is not what it covers, so the sentence
now names what that question actually settles.

**Item 2b.1 (Truth, unbounded absence).** Applied, and you were citing
the site's own rule at it: "Absence is bounded. Say what was checked,
for what place and period, as of when." The sweep "or any other City
document" is gone.

**Item 2c.4, 3a, 3b, 3c (Attribution and jargon on the split
disclosures).** Applied on all four. Each reason now attributes each
seat's position to that seat, in the seat's own ground, and the
technical phrase "rider exposure" is gone.

**Item 4.1 (Promise, the validator cannot prove a person is counted
once).** Applied. This is the same fault the version exists to fix, one
level up, and you were right to name it. The register header no longer
claims the validator proves it.

**Item 5.1, 5.5, 5.6 (the quote gate).** Applied. The summary no longer
says the gate exists to stop this, which contradicted its own second
bullet. "No amount of tightening" is now "no tightening of the checks
the quote gate makes". And "really typed by the person credited with
them" is now "in the capture under the commenter the site credits them
to", because a pseudonym is not a typist.

**Item 5.13 (a field that decides nothing cannot stop work).** Applied.

**Item 5.14 (Clarity, "published splits").** Applied, and pushed
further: the entry now says outright that no page prints those splits,
so no page was wrong.

**Item 5.15 (Promise, the question-level split).** Applied, matching the
register header.

**Item 5.9 (the "three weeks" paragraph).** Applied in part, and you
were more right than you knew. See the receipt: the numbers were false.

## Receipts: round 1 findings I am refusing, and why

**2a.1 — "All 17 people who raised the $100 million take the approval as
given."** You said a count of people who argued a claim "either way"
cannot establish what all 17 believed. Correct in general, wrong here.
The audit checked it: "Verified against all 17 captured wordings,
including a sitting councillor's, and true: every one of them takes the
approval as given." Somebody read all 17 comments. The sentence stays.

**2b.2 — "which on its own would only park it."** You said no published
rule makes that so. There is one, methodology v1.15, verbatim: "No
invented claims. A wording the editor or the founder thought of is still
registered, but it does not run: it sits at PARK until a captured form
of it turns up in a real source." The audit found the old reason wrong
for the opposite reason to yours: it had rested a decline on a ground
that is only a park. The new sentence is the correction. It stays.

**2c.1 and 2c.3 — the cycling-safety question and grouping note.** The
grouping_note you objected to is not changed by this branch and is not
in front of me. Recorded, not acted on. On 2c.1: the reason's second
sentence already concedes exactly what Sol said, before Sol is named,
so the paragraph does not assert Gemini's conclusion unqualified. I did
soften "settles who is at fault" to "sets ... the rules that decide
fault", which was your real point.

**2c.2 — the question asks two things.** True, and out of my hands: the
question wording is what two triage seats ruled on and it is not changed
by this branch. Recorded for a later pass.

**1.3 — rename the claim id `property-taxes-rising-sharply`.** I agree
with you and cannot do it. The claim id is a permanent public address by
a standing decision, and moving it needs a redirect in a file this
branch is not allowed to touch. Recorded and escalated rather than
quietly dropped.

**1.4 — "a brief, a body of evidence and a panel run".** That sentence
is a page template this branch does not change. Recorded.

**5.3 — "the worst defect available to us."** Refused. The site is
entitled to rank its own failures against its own promise, and that
promise is fidelity to what people said. This is the entry where it
says so plainly.

**5.4 — "both quotes were read back against the capture by hand."**
True. It happened, and it happened again during this critique: both
wordings were located in the capture file by hand, at comment index 409
and index 448.

**5.7 — the re-merge chronology.** The record establishes all of it. The
run manifest: "An earlier merge of the same three extractions (05:13:01Z
to 05:35:54Z) was discarded after an independent critique found it
grouping by topic rather than by proposition; prompts/intake-merge.md
gained the three bounds under 'Merging' and this run replaced it." The
run README: the critique found "a claim that 24 people said 'only 1 to 2
percent cycle and the lanes sit empty' put a compound assertion into the
mouths of commenters who had made neither half of it." I did apply your
narrower point, in the full change note: that earlier compound was a
different claim, and the note now says so.

**5.10 — "the sentence they gave."** You were right and this was the
best finding of the round. I checked all eleven against both seats' raw
outputs. The stored reason is verbatim what GPT-5.6 Sol wrote. Gemini
wrote something different every time ("This is a settled truism no one
disputes" against "That roads carry deliveries, buses and emergency
vehicles is a truism accepted by both sides of this argument"). Both
seats returned NO on all eleven, so `outcome` and `readers` are sound,
but the reason was one seat's words credited to two. Fixed in both the
register header and the changelog.

**5.11 — "Four of them are the same undisputed-truism shape."** The
audit names the four: "that cyclists pay the property taxes that fund
roads, that Edmontonians pay for services they do not use, that roads
carry goods and emergency vehicles, that transit moves people more
efficiently than cars. Both readers declined all four as things nobody
disputes." Stays.

**5.12 — "Two validator rules hold that field."** Both rules exist in
`scripts/lib/register-checks.ts` and have tests. You could not see the
code; it is there.

**5.16 — "prior_triage is the schema change, and it is what earns a
version."** Refused. This file is the methodology changelog and every
entry bumps a version. Saying which change earned the bump is what it is
for.

**5.17 — "A rule nobody checks is a wish."** Refused, and this one is
not negotiable. It is true of this case, which is your own test, and it
is the sentence the entry is built around.

**5.18, 5.19, 5.20, 5.23 — replace the full change note with six flat
sentences.** Refused. Your replacement drops every fact about how the
failure happened and keeps only what it was. I applied the two factual
corrections inside it and left the prose.

**5.21.** "112 propositions" is not in the entry. Nothing to check.

## The receipt on your best structural finding, 5.9

You said the record did not support "three weeks", "for days", or "an
afternoon". Two of those were false, and worse than you guessed:

- The project's first methodology version is dated 2026-08-31. The
  version that recorded reproducibility as an open question is v1.15,
  dated 2026-09-02. The audit ran on 2026-09-03. That is one day, not
  three weeks. The entry said "three weeks" twice.
- The register carrying these defects was committed to the main branch
  at 12:50 on 2026-09-03 and the repairs at 21:45 the same day. Nine
  hours, not "days".

Both are fixed. If the new numbers are still wrong, say so.

# The new text, as rendered

## /questions/property-taxes

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

One resident's increase and another's yearly bill are different measures, and both were raised in the same argument about what Edmontonians pay. Neither can be checked without that resident's own assessment and tax notice, which is what both readers said when they sent the question ahead.
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

## /claims/property-taxes-rising-sharply

# One Edmonton resident's taxes went up by $1,500 in the last three years.
2026-09-03 · Said in 1 comment

## No finding yet
This claim has not been checked. It is waiting on the question below, which is what a brief, a body of evidence and a panel run are spent on.
Its questionGoing ahead
City tax-rate and typical-property records can show the general increase, although the two anonymous residents’ dollar amounts cannot be verified without their assessment and tax notices.
Raised in extraction by flash
What the states mean

## The question it is checked under
How much have Edmonton property taxes gone up?

## /claims/property-tax-bill-six-thousand (unchanged this round)

Proposition: "One Edmonton resident pays $6,000 a year in property tax."
Quote: "Glad I am paying $6,000 a year in property tax for this!" —
Rustic Bluejay S.

## The six rewritten reasons, as rendered on /questions and on each question's page

`hundred-million-approval` (Declined):


## Declined
All 17 people who raised the $100 million in this source take the approval as given, so checking the council vote would only restate an undisputed budget fact. What is argued about is how long the money covers and how it sits beside road spending, and that half went to a separate question, now published: how the money for bike lanes compares with what Edmonton spends on roads.
How far the work has got

`infill-luxury` (Declined):

"Luxury" is not a category in Edmonton's assessment roll or its permit record, so neither could return a verdict either side could lose. No captured post makes the claim either, which on its own would only park it.
How far the work has got

`cycling-safety` (Going ahead):

Edmonton's traffic bylaw sets who may ride where and the rules that decide fault in a collision, and the City's collision records show where and how often cyclists are hit. Neither shows whether a lane made riding safer, because a crash count with no count of the riders using it cannot tell a more dangerous lane from a busier one. That is the point the two readers split on. Gemini 3.1 Pro sent it ahead on the strength of those records; GPT-5.6 Sol parked it until the collision records can be tied to route design and to how many riders use each route.
How far the work has got

`zoning-and-infill` (Going ahead):

Gemini 3.1 Pro sent this ahead, saying the zoning bylaw and the infill permit records answer the questions about parking minimums, tree removal and density. GPT-5.6 Sol parked it until address-level permits can be tied to tree removals and to before-and-after parking counts.
How far the work has got

`emergency-access` (Going ahead):

Gemini 3.1 Pro sent this ahead, saying response-time records and the City's emergency access design standards show whether bike lanes delay or assist emergency vehicles. GPT-5.6 Sol parked it until response records can identify corridor-level delays or emergency use of the lanes.
How far the work has got

`downtown-business` (Parked):

Reopen this when business closures can be tied to customer-access changes through location-level records or owner evidence, because closure counts alone cannot establish why a business failed. That is where GPT-5.6 Sol landed. Gemini 3.1 Pro went further and declined it, because no public record tracks the specific reasons individual downtown businesses closed.
How far the work has got

## The register header, the two paragraphs this branch changed

```yaml
# accounts:       distinct people in the source who took part in the question,
#                 with the for/against/neither split. One pseudonym is one
#                 person within a source; no page sums across sources. The
#                 validator checks the total two ways: it must fall inside the
#                 range its claims allow, and the for/against/neither counts
#                 must add up to it, so nobody is counted twice on one
#                 question. Which side somebody who argued on more than one
#                 belongs on is an editor's judgement, and this file does not
#                 record it; the arithmetic is all the validator can prove.

# prior_triage: the claim-level decision v1.16 superseded, kept rather than
#               discarded. Before triage moved up to the question, every
#               proposition was read on its own by two seats, and eleven that
#               both seats refused are now live claims under questions that are
#               going ahead. That is the right outcome — the question is worth
#               the work — but a brief author who cannot see the refusal spends
#               a panel run on a claim two independent readers already declined.
#               So the decision is recorded where it was made:
#               { outcome, readers, reason }. `outcome` is from the same
#               go | park | no vocabulary; `readers` names every seat that
#               reached it, at least two, because "the readers declined it"
#               means nothing unless a reader can see how many there were and
#               who they were; `reason` is the reason the run's combined
#               triage file recorded for that decision, which is one seat's
#               wording and not a sentence both of them wrote. It is
#               history, not state: the question's triage is what decides
#               whether the work happens, and a claim declined on the
#               right-of-reply ground carries that live decline instead.
```

## The v1.21 changelog entry, as rendered on /methodology/changes

## v1.21
2026-09-03Misattribution and prior triage
A real person was published asserting something they never asserted: their tax bill was written up as a tax rise. The gate that checks quotes never looks at the sentence written on top of them, so it could not have seen it, and the merge rule that would have stopped it was written during this very intake run and enforced by nothing. Alongside it, eleven propositions two readers had already refused were queued for panel runs with no trace of the refusal, and three account splits counted a person twice. None of this was caught by the pipeline. It was caught by the first audit that looked backwards.

### What changed

- The claim said Edmonton property taxes had risen sharply, by $1,500 in three years for one resident and $6,000 a year for another. The second resident had written: Glad I am paying $6,000 a year in property tax for this! That is what somebody pays, not what it went up by, and there is no sharply anywhere in it. One person's increase had been stitched to another person's bill and the compound put in both their mouths. On a site whose whole promise is fidelity to what people actually said, this is the worst defect available to us. It is now two claims, each carrying only what its own wording supports, and both quotes were read back against the capture by hand.

- No tightening of the checks the quote gate makes would have caught it, and that is the part worth understanding. Both wordings are exact substrings of the comments they came from, which is the entire thing that gate was built to prove. It establishes that the words are in the capture under the commenter the site credits them to. Whether the sentence assembled on top of those words says what the words say is a separate question, and no step in the pipeline was asking it.

- The rule that would have stopped it was already written. prompts/intake-merge.md opens its merging rules with: A claim is one assertion. If you are joining two assertions with and, they are two claims. This claim joined two people's remarks with exactly that word. Worse, that rule was written the same day, in the re-merge after an independent critique threw the first merge of this run away for grouping by topic instead of by proposition, having found a compound assertion put into the mouths of commenters who had made neither half of it. It was written in direct response to this failure, it went into a prompt file, and nothing was ever wired up to check it. The re-run under those rules shipped this anyway. A rule nobody checks is a wish.

- Nothing in the pipeline found any of this. The first triage audit did, the day after v1.15 wrote down that nobody had shown a second triage read reaches the same dispositions: a reader sent back over work that had already cleared every check standing in front of it. Every guard here inspects a claim as it goes past and then stops looking at it. There was never anything behind them. The register these defects sit in was published that same morning, and one afternoon of looking behind found all of them.

- prior_triage is the schema change, and it is what earns a version. When v1.16 lifted triage from the claim up to the question, the decisions made at the old level went in the bin, and eleven propositions that both triage seats had independently returned NO on became live claims under questions that are going ahead. Four of them are the same undisputed-truism shape that took four published claims off the findings board this morning, and they were sitting in the queue waiting for somebody to spend a panel run on them. The field records the outcome, the seats that reached it, and the reason the run's combined triage file gave for it, which is one seat's wording rather than a sentence both of them wrote. It moves no question's disposition and decides nothing. It means a brief author can see the refusal instead of buying a run to rediscover it.

- Two validator rules hold that field to being a record rather than a second opinion. One requires an outcome from the same vocabulary, at least two named readers, and the recorded reason, and rejects any other key. A refusal with no reason attached tells a brief author the claim was turned down without telling them why, which is worse than keeping nothing. The other refuses the field on a claim declined on the right-of-reply ground, where the decline is live rather than historical, because a claim carrying both would read as having been ruled on twice.

- The register header told readers the validator tested the for/against/neither split against the question's total. It did not. It tested the total against the range its claims allow, which is a different check that passes things the promised one refuses. The described check now runs, and on its first pass it caught three splits in the published register overshooting their totals by one, on cycling-volumes, lanes-and-congestion and 83-avenue-lane. No page prints those splits, so no page was wrong; the file was. Each was one person who argued on two sides of a question and got counted on both. The claim-level count is deliberately everyone who argued a claim either way. The question-level split is people, once each, so the sides have to add up to the total. Which side somebody who argued on two of them ends up on is an editor's judgement the file does not record, and the header now says that as well as describing a check that exists.

- Six question reasons go back for rewriting, from the same audit. Four ended with the sentence "The two readers split GO and PARK", which tells a reader there was a disagreement and not who was on which side. On this source it was the same seat every time: GPT-5.6 Sol parked all three of the go-against-park splits and declined the one that became downtown-business. That is a standing difference between the two readers and the register was hiding it, so all four now name both. infill-luxury opened its decline with "No captured post makes this claim", which v1.15 says is a park and not a decline; the decline now leads on the ground that carries it. And hundred-million-approval told the reader who raised it that their question was dropped, without saying that the live half of it, how long the money covers and how it sits beside road spending, is already published.

- What this version does not do is close the hole. There is still no check anywhere that a claim's proposition says what its quotes say, and building one is separate work already under way rather than something shipped here. So the honest account of this version is that it repairs the specific defects one afternoon of looking backwards found, and names the gap that let the worst of them through. That gap is open right now.

### Read next

- How much have Edmonton property taxes gone up?

- The register of questions and claims

- How findings are produced

Full change note
The comfortable story would be that a check failed. No check failed. The check was never built. Somebody watched this failure happen during intake, on a different claim, wrote a rule against it the same day, put the rule in a prompt, and moved on, and an Edmontonian ended up on this site asserting a proposition about tax increases when what they had made was a remark about a bill. Between those two moments every check the pipeline runs ran, and passed. That is the shape of the fault, not an accident of one claim: the guards all run forwards, one item at a time, in the direction the work is moving, and not one of them was ever asked to turn round and read what had already gone out. Nothing had turned round until that afternoon. The lesson is not to write better rules. It is that a rule which lives only in a prompt is a statement of intent, and the difference between intent and a guarantee is the whole of what this project claims to be selling.

-


## Also for the record, the seat outputs behind the four split disclosures

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

The rule that combines them, from methodology v1.15: "going ahead takes
both readers, or one GO and one PARK; a decline takes two NOs;
everything else parks, a GO set against a NO included."

## What I want from this round

Read the new sentences. Tell me what is still false, what still puts
words in somebody's mouth, and what a person would not say out loud.
Do not re-argue the refusals above unless the receipt is bad, and say so
if it is. New findings only, plus anything I applied badly.
