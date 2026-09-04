# Independent critique: register defect repairs, PR #45

You are the outside reader. This site publishes claims made by real
Edmontonians, taken from a captured Facebook comment thread, and checks
them against the public record. A branch called `register-defects`
repairs four defects an audit found, and this is the critique that has
to happen before reader-facing copy ships (a standing rule: rendered
copy gets at least one critique from a model that did not write it).

Everything you need is in this file. You cannot read the repository;
do not try. All page text below was extracted from the built site, not
from source. Where you need the underlying record to test a sentence,
it is quoted here in full.

## The defect this branch exists to fix

A published claim read:

> Edmonton property taxes have risen sharply, by $1,500 in three years
> for one resident and $6,000 a year for another.

Two different commenters' remarks had been welded into one proposition
and attributed to both. One of them had said what her tax bill *is*,
not that it went up, and neither used the word "sharply". The branch
splits it into two claims, each carrying only what its own quote
supports.

So the standard you are holding this to is fidelity. Not caution, not
politeness. Does every sentence say exactly what the record says.

## Your job

Test each item below against the record printed beside it, and against
the site's plain-speech rule (printed after this). For each:

1. Is every sentence **true** of the underlying record?
2. Is anything a real person, or a named model seat, is recorded as
   saying **not what they said** — quoted, paraphrased or implied?
3. Where a sentence is a promise the register has to keep (a reason for
   declining or parking a question is a promise about what would be
   checked and why it was not), **can the register keep it**?
4. Is the language **how a person speaks**? Would somebody say this out
   loud?

Rank each finding **High**, **Medium** or **Low**, and label it as one
of:

- **Attribution** — words put in someone's mouth that are not theirs, or
  a person or seat credited with a position they did not take.
- **Truth** — a sentence that does not match the record.
- **Promise** — a reason or a claim about the method the site cannot
  keep.
- **Clarity** — true, but a reader will misread it or has to work.
- **Plain speech** — a rule in section "The plain-speech rule" broken.

Give the exact sentence you are objecting to. No praise, no summary of
what is good. If a rewrite is warranted, propose the exact words and say
which record sentence licenses them.

End your report with a line reading `VERDICT: APPROVED` or
`VERDICT: REVISE`.

## What is NOT under review, and will not be changed

Three dispositions are the editor's judgement call and are settled:
whether `property-taxes` goes ahead, whether `city-hall-pay-and-interests`
goes ahead, and whether `83-avenue-lane` goes ahead. If you think one is
wrong, say so once in a section headed "Out of scope" and move on; it
will be recorded and not acted on.

The methodology changelog entry for v1.21 is written to be
uncomfortable on purpose. It is the site's account of its own worst
failure. It may be made **clearer, shorter or more accurate**. It may
not be made **softer**, and "this is blunt" is not a finding. "This is
blunt and also not true" is.

## The plain-speech rule (docs/DESIGN.md section 12, abridged)

### What the writing has to do

1. **Answer first.** The answer arrives in the first clause, before evidence,
   source or qualification.
2. **Say the finding, do not imply it.** A reader must never have to work out
   whether a claim held up. "Edmonton is not on track" states it. "The latest
   inventory sits above its trajectory" makes the reader do the work.
3. **Stand alone.** Somebody arrives from a search result having never seen the
   question. The answer has to make sense to them on its own.
4. **One sentence, one idea.** Three findings is three sentences or three
   claims, never one sentence with semicolons.
5. **Name who did it.** The City decided, Council voted, the contractor
   delivered late. Not "an amendment was carried", not "the price gap is Not
   established".
6. **Words people use.** No method vocabulary in reader-facing text where a
   plain word exists.
7. **Sayable out loud.** If nobody would say it to another person, rewrite it.
8. **Confident where the evidence is, plainly uncertain where it is not.** The
   uncertainty is stated, never smuggled in as hedging.
9. **Do not waste time.** No restating the question, no method explanation
   inside the answer, nothing the reader already knows.
10. **Numbers as people say them.** "About $2 billion", not "$1,946,000
    thousands". The exact figure belongs in the explanation and the record.
11. **No cap that becomes a target.** A limit every instance sits on is
    generating the failure rather than preventing it. If a new limit starts
    collecting instances at its ceiling, it is wrong and it goes.

### The question

The sentence a resident would type into a search box.

- It begins with a question word or an auxiliary: who, what, where, when, why,
  how, is, does, did, can, has.
- It asks one thing. A question that can honestly be answered "yes and no" is
  two questions.
- It can be answered in either direction. "Do the lanes help or hinder
  emergency vehicles" is a question. "Do bike lanes block emergency vehicles"
  is a prompt for the answer we expect.
- No method words: no proposition, materially factual, operationalised, as-of.
- No colon.

### The claim

The assertion as the people making it assert it, in the plainest words that
keep it testable.

- The wording comes from the captured source. It may be made more precise. It
  may never be made weaker, and it may never be made tidier at the cost of what
  its holders meant.
- One assertion. Two joined with "and" are two claims.
- Numbers in the units the speaker used, with the precise form in the record.

### The answer

One sentence, under the claim, and the thing most readers will read.

- **It opens with the plain-speech stance**, not the finding word: Yes. No.
  Partly. Nobody can tell from the record. The finding word is the badge beside
  it and does the method's job; the answer does the human one.
- **No colon, no semicolon, no em dash or en dash.** Hyphens inside ordinary
  compounds are English and stay. What is banned is the punctuation that lets a
  second idea into the sentence. This is the replacement for the word cap, and
  it is the rule doing the real work. Punctuation that lets a second
  idea in is what produced the thirty-word abstracts.
- **One supporting fact at most**, and only if it is the fact that decides the
  answer.
- **Everything else moves down**, into the explanation or into another claim.
  Nothing is deleted. A rule that deletes true content is worse than the prose
  it replaced, which this project learned the hard way when a
  numbers-in-every-bullet rule gutted a story whose key facts were absences in
  a bylaw's text.
- No word limit. If an answer needs twenty-six words to be a sentence a person
  would say, it takes twenty-six.

### The explanation

The article under the question.

- One idea per sentence. If a reader has to go back to parse it, split it.
- Every fact that could change a finding carries its source in the same
  paragraph, linked to the specific document, not to a homepage.
- The site's own reasoning is labelled as the site's. A source's fact, a
  calculation made here, and a conclusion drawn here are three different
  things and must not read as one.
- A qualification sits beside the statement it limits, never later. If a reader
  can meet the unqualified statement first and leave with the wrong
  impression, it is in the wrong place.
- Necessary technical language is defined in ordinary words on first use, then
  used consistently.
- Absence is bounded. Say what was checked, for what place and period, as of
  when. "We did not find it" never becomes "it does not exist".
- Quote only where the exact words matter. Otherwise say it plainly and link.

### What a script checks, and what a reader checks

## The finding vocabulary this site publishes (docs/DESIGN.md section 3)

## 3. Verdict vocabulary

Two distinct sets, deliberately.

**Reviewer verdicts** — what a model may output:

| Verdict | Meaning |
|---|---|
| Supported | The evidence affirmatively establishes the proposition. |
| Partially supported | A meaningful part is established; the proposition as stated overreaches or needs qualification. |
| Not established | The evidence does not justify the proposition, including "not enough evidence to tell". |
| Contradicted | The evidence affirmatively points against the proposition. |

**Canonical findings** — what synthesis may produce: those four, plus **Mixed**,
which exists only as the materially-split-panel outcome. A reviewer that
outputs "Mixed" is rejected by the schema.

**Panel agreement** — the canonical second dimension, one of Unanimous,
Adjacent or Split. It is computed from the round-1 multiset alone: Unanimous is
one distinct verdict; Adjacent is two distinct verdicts one step apart on the
S–P–N axis (or N–C, which both refuse the claim); Split is everything else.

Agreement measures the panel, not the world. Each value is published with a
fixed gloss saying so — "All three reviewers reached this verdict
independently. Agreement, not a probability of truth."

Until methodology v1.3 this dimension was a canonical **confidence** (High,
Moderate or Low) derived from the reviewers' own confidences. The word
overclaimed: nothing in the method computes a probability that a claim is true,
and readers reasonably took it as one. Confidence survives where it is honest —
per reviewer, beside the reviewer that gave it, inside the AI review.

There are no TRUE/FALSE labels and no numeric scores. Finding, evidence basis
and panel agreement are separate dimensions and all three are shown.


## The register: what its words mean

This is the header comment of `intake/register.yaml`. It is public: the
file is in the open repository and readers of the repo see it. It is
itself under review here, because this branch rewrote two paragraphs of
it (the `accounts` paragraph and the new `prior_triage` paragraph).

```yaml
# The register (methodology v1.12, regrouped under v1.16, remodelled under D-0029).
#
# Every question the site has considered, every claim inside one, and every
# source they came out of. Nothing that reached this file leaves it: a question
# that was declined keeps its row and its reason, and a proposition the merge
# set aside as not a factual claim is listed under the source it came from.
#
# Three keys, in this order:
#
#   questions:  THE UNIT OF WORK. One brief, one panel run, one gate audit.
#               Carries the article and several claims, and has a permanent
#               address from the day it is registered.
#   sources:    a capture, read end to end. Its entry is the completeness
#               record: what came out of it, and what was set aside.
#   claims:     THE UNIT OF JUDGEMENT. Exactly one finding each. A claim
#               belongs to exactly one question and carries no state of its own.
#
# State lives on the question, in three fields, never one:
#
#   lifecycle    registered | briefed | panel-complete | gate-complete
#   triage       go | park | no
#   publication  unpublished | published | corrected | withdrawn
#
# Triage has three values and only three: they are the answers to "should we
# spend an investigation on this". How far the work has got is the lifecycle,
# and whether readers can see it is the publication.
#
# A question's fields
# ------------------
#
# source:         the id of the `sources` entry it came out of. Absent on the
#                 seven questions registered one at a time, before whole-source
#                 intake existed.
# run:            repo-relative directory holding the grouping and the triage.
# question:       what the brief asks, as a reader would type it.
# topics:         every topic the question is filed under, from the vocabulary
#                 in `src/lib/vocabulary.ts` and the files under
#                 `src/content/topics/`. Written by hand, not generated: a
#                 topic is a reader's way in, and a question belongs under
#                 every label that genuinely applies, broad and narrow alike.
#                 Left off entirely — never an empty list — where none does,
#                 which on a site about Edmonton civic government is what the
#                 out-of-scope questions get. Where the question has an
#                 article, this list and the article's `topics` must be the
#                 same set; the validator checks it.
# reason:         one public sentence saying why triage answered as it did.
#                 Required on park and no — the register is published, so a
#                 declined question never sits here unexplained.
# grouping_note:  why these claims are one question, when that needs saying.
# accounts:       distinct people in the source who took part in the question,
#                 with the for/against/neither split. One pseudonym is one
#                 person within a source; no page sums across sources. The
#                 validator checks the total two ways: it must fall inside the
#                 range its claims allow, and the split must add up to it, so a
#                 person who argued on more than one side is counted once, on
#                 the side their own words put them on.
# registered_as:  the verbatim wording a hand-registered question was filed
#                 under, before the register had claims.
# triage_report:  repo-relative path to the triage report. (`triage` is a state
#                 now, so the path took a different name.)
#
# A claim's fields
# ---------------
#
# question:     the id of the `questions` entry it is checked under.
# proposition:  what would have to be true, in one plain sentence. This is what
#               the site shows as the claim.
# wording:      the representative captured quote, verbatim.
# side:         for | against | neither — which side of the source's argument
#               the claim serves.
# accounts:     how many distinct people argued it, either way. Somebody counted
#               here may have been arguing against it, which is why the site
#               says a claim was discussed by so many and never that it was
#               agreed.
# variations:   every captured wording of the claim, each
#               { wording, source_id, author_name }. `author_name` is the
#               source's stable pseudonym and never a real name. The validator
#               checks each wording is an exact substring of some comment in
#               that source's capture, and each author_name against the
#               commenter labels in it, so a wording attributed to a person is
#               that person's words.
# seats:        which extractor seats found it.
# triage/ground: a claim carries no state, with one exception. An accusation
#               against a named person is declined even inside a question that
#               is going ahead, because the site has no way to put it to them.
#               That is `triage: no` with `ground: right-of-reply`, and such a
#               claim carries no proposition, wording or variations at all.
# names_person: the claim names an identifiable individual.
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
#               who they were; `reason` is the sentence they gave. It is
#               history, not state: the question's triage is what decides
#               whether the work happens, and a claim declined on the
#               right-of-reply ground carries that live decline instead.
#
# A source's fields
# ----------------
#
# set_aside:    the propositions the merge set aside as not factual claims —
#               opinion, prediction, value judgement — with the reason. The
#               completeness promise lives on the source, so they live here.
#
# Questions and claims are generated from a completed run rather than typed:
#
#   npx tsx scripts/intake-register.ts reviews/intake/<slug>

questions:
  - id: cycling-volumes
    recorded: "2026-09-03"
    source: yegscoop-2026-08-26
    question: "How many people in Edmonton cycle, and how much do the bike lanes get used?"
    topics: [transportation, bike-lanes]
```
# ITEM 1 — the split claim, and the question that holds it

## The record: the two captured comments, verbatim and complete

Commenter pseudonym `Rustic Bluejay S.`, 2026-08-27 18:35:

> $100 million on bike lanes but let’s not address the issues with
> downtown or support small businesses while the LRT is being built!
> Glad I am paying $6,000 a year in property tax for this!

Commenter pseudonym `Dusty Raven M.`, 2026-08-27 13:20:

> No reason sidewalks can not be used in most areas the infrastructure
> is already there. Change the bylaw so sidewalks can be used or if
> cyclists wish to they can drive on the road. There is not much
> activity on sidewalks in most neighborhoods at the best of times.
> Being this is a winter city I feel my tax dollars are wasted and my
> taxes have gone up $ 1500 in the last 3 years.

Those are the only two comments in the whole capture (621 comments)
that mention either figure. Pseudonyms are stable within a source and
are never real names.

## The record: what triage decided about this question

Both triage seats, independently, returned GO with the identical
sentence:

> City tax-rate and typical-property records can show the general
> increase, although the two anonymous residents’ dollar amounts cannot
> be verified without their assessment and tax notices.

## Rendered: /questions/property-taxes

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

What the states mean

## Where it came from
Taken from Yegscoop post on council's 2026-08-26 bike lane decision, read end to end. Every factual claim in it was extracted and merged, so this question is listed whatever became of it.
Facebook post · captured 2026-09-02 · 621 comments
The names below are pseudonyms, one to a commenter within this source.
The original post

## The claims under it

-

### One Edmonton resident's property taxes went up by $1,500 over three years.
Said in 1 comment

- my taxes have gone up $ 1500 in the last 3 years.
Dusty Raven M.

-

### One Edmonton resident pays $6,000 a year in property tax.
Said in 1 comment

- Glad I am paying $6,000 a year in property tax for this!
Rustic Bluejay S.

Every question we've considered

## Rendered: /claims/property-taxes-rising-sharply (narrowed by this branch)

# One Edmonton resident's property taxes went up by $1,500 over three years.
2026-09-03 · Said in 1 comment

## No finding yet
This claim has not been checked. It is waiting on the question below, which is what a brief, a body of evidence and a panel run are spent on.
Its questionGoing ahead
City tax-rate and typical-property records can show the general increase, although the two anonymous residents’ dollar amounts cannot be verified without their assessment and tax notices.
Raised in extraction by flash
What the states mean

## The question it is checked under
How much have Edmonton property taxes gone up?
Going ahead. One brief covers every claim under that question, and each claim still gets its own finding. The question's page carries the reason, the grouping and the other claims made about it.

## Where it came from
Taken from Yegscoop post on council's 2026-08-26 bike lane decision, read end to end. Every factual claim in it was extracted and merged, so this one is listed whatever became of it.
Facebook post · captured 2026-09-02 · 621 comments
The original post

## How it was said
Every wording of this claim found in the source, quoted exactly. The names are pseudonyms, one to a person within the source.

- my taxes have gone up $ 1500 in the last 3 years.
Dusty Raven M.

The question it is underEvery question we've considered

## Rendered: /claims/property-tax-bill-six-thousand (new in this branch)

# One Edmonton resident pays $6,000 a year in property tax.
2026-09-03 · Said in 1 comment

## No finding yet
This claim has not been checked. It is waiting on the question below, which is what a brief, a body of evidence and a panel run are spent on.
Its questionGoing ahead
City tax-rate and typical-property records can show the general increase, although the two anonymous residents’ dollar amounts cannot be verified without their assessment and tax notices.
Raised in extraction by flash
What the states mean

## The question it is checked under
How much have Edmonton property taxes gone up?
Going ahead. One brief covers every claim under that question, and each claim still gets its own finding. The question's page carries the reason, the grouping and the other claims made about it.

## Where it came from
Taken from Yegscoop post on council's 2026-08-26 bike lane decision, read end to end. Every factual claim in it was extracted and merged, so this one is listed whatever became of it.
Facebook post · captured 2026-09-02 · 621 comments
The original post

## How it was said
Every wording of this claim found in the source, quoted exactly. The names are pseudonyms, one to a person within the source.

- Glad I am paying $6,000 a year in property tax for this!
Rustic Bluejay S.

The question it is underEvery question we've considered

## What to test here

The two propositions are new sentences written by the site. Each is
supposed to say exactly what its own quote supports and nothing more.
Read each proposition against its quote. In particular: does "went up
by $1,500 over three years" say what "my taxes have gone up $ 1500 in
the last 3 years" says, and does "pays $6,000 a year in property tax"
say what "Glad I am paying $6,000 a year in property tax for this!"
says? Is either narrower or wider than its quote? Is the claim id
`property-taxes-rising-sharply` still honest for a claim whose
proposition no longer contains the word "sharply"? (The id is a
permanent public address; changing it costs a redirect, and one already
exists for the old address, so say if you think it should move.)

# ITEM 2 — the reasons rewritten on three questions

A question's `reason` is one public sentence (or now a short paragraph)
saying why triage answered the way it did. It is required on every
`park` and every `no`, because the register is published and a declined
question must never sit there unexplained. On a `go` it is optional and
is used where the decision needs saying.

The reason is printed twice: on the register index `/questions`, under
the question title, and on the question's own page under the state
heading.

## 2a. `hundred-million-approval` — Declined

BEFORE (what the two seats both wrote, identically):

> The $100 million approval is common ground throughout this source, so
> checking the council vote would only restate an undisputed budget
> fact.

AFTER, as rendered:

# Did Edmonton City Council approve $100 million for bike lane expansion?
2026-09-03 · Said in 17 comments · 1 claim

## Declined
All 17 people who raised the $100 million in this source take the approval as given, so checking the council vote would only restate an undisputed budget fact. What the money buys and over how long is argued about, and that half of the question went to a separate question that has since been published: how the money for bike lanes compares with what Edmonton spends on roads.
How far the work has got
Registered

Whether it is worth checking
Declined

What a reader can see
Not published yet

What the states mean

Record for this one: the question has 1 claim, "Edmonton City Council
approved $100 million for bike lane expansion", said in 17 comments,
all on the `against` side of the source's argument. The register's
`accounts` for the question are `total: 17, against: 17`. The separate
question named at the end is `bike-vs-road-spending`, "How does the
money for bike lanes compare with what Edmonton spends on roads?" — it
is one of the published stories on this site.

Test: "All 17 people who raised the $100 million in this source take
the approval as given" — the register records 17 people arguing this
claim, and the register's own definition of a claim's `accounts` is
"how many distinct people argued it, EITHER WAY". Does the sentence
overreach the record? Is "take the approval as given" a statement about
what those 17 people believe, and does the record support a statement
about what they believe?

## 2b. `infill-luxury` — Declined

BEFORE:

> No captured post makes this claim, and "luxury" has no definition on
> which either side could lose.

AFTER, as rendered:

# Is new infill housing in Edmonton luxury housing?
2026-09-02
New infill housing is luxury housing.
our own hypothesis, from the founder, as a suggested claim

## Declined
"Luxury" is not a category in the assessment roll, the permit record or any other City document, so no record could return a verdict either side could lose. No captured post makes the claim either, which on its own would only park it.
How far the work has got
Registered

Whether it is worth checking
Declined

What a reader can see
Not published yet

What the states mean

Record for this one: the question came from the editor, not from a
capture. Its register row says `origin: editor`, `supplied_by:
"founder, as a suggested claim"`, and it has 0 claims. Its
`registered_as` wording is "New infill housing is luxury housing."

Test: "so no record could return a verdict either side could lose" —
the site's own finding vocabulary (printed above) includes "Not
established", which exists precisely for "not enough evidence to tell".
Is the sentence saying something the vocabulary contradicts? And the
second sentence claims that a missing captured post "on its own would
only park it" — is that a promise about how triage works that the
register's rules actually make?

## 2c. `cycling-safety` — Going ahead

BEFORE:

> City collision records and the traffic bylaw answer whether bike
> lanes improve safety and who is at fault in collisions. The two
> readers split GO and PARK.

AFTER, as rendered:

# Do bike lanes make cycling safer in Edmonton, and where do cyclists actually ride?
2026-09-03 · Said in 13 comments · 8 claims

## Going ahead
Edmonton's traffic bylaw settles who may ride where and who is at fault in a collision, and the City's collision records show where and how often cyclists are hit. Neither shows whether a lane made riding safer, because a crash count with no count of the riders using it cannot tell a more dangerous lane from a busier one. The two readers split on that point: Gemini 3.1 Pro said go, GPT-5.6 Sol parked it and asked for collision records linked to route design and rider exposure.
How far the work has got
Registered

Whether it is worth checking
Going ahead

What a reader can see
Not published yet

Edmonton's collision records and the traffic bylaw cover whether the lanes reduce harm, who is at fault and who is riding where.
People arguing in both directions raised this question, and every claim they made about it is checked, whichever way it points.
What the states mean

Record for this one, both seats verbatim:

- `Gemini 3.1 Pro`, outcome GO: "City collision records and the traffic
  bylaw answer whether bike lanes improve safety and who is at fault in
  collisions."
- `gpt-5.6-sol`, outcome PARK: "Reopen this when collision records can
  be linked to route design and cyclist exposure, because raw crash
  totals cannot show whether bike lanes change risk."

Test: the merged reason says Sol "asked for collision records linked to
route design and rider exposure". Sol wrote "cyclist exposure". Does
"rider exposure" put a word in Sol's mouth, or is it an acceptable
paraphrase given it is not presented as a quote? Also: the reason now
runs three sentences on a page where every other reason runs one or
two. Read it aloud. Does it still work as the one-sentence public
answer to "why did you decide this"?

# ITEM 3 — the split disclosures now name which reader said what

Four questions were decided by two triage seats who disagreed. Until
this branch the register said only "The two readers split GO and PARK",
which told a reader there was a disagreement but not who was on which
side. The branch names them. Naming a model seat with a position it did
not take is the same defect as item 1, in a different suit, so check
each against the seat outputs printed here.

The two seats, from the run manifest: `gpt-5.6-sol` (OpenAI Codex CLI,
reasoning effort high) and `Gemini 3.1 Pro (High)` (Google). They ran at
the same time and did not see each other's answers.

## 3a. `zoning-and-infill` — Going ahead

AFTER, as rendered:

> The zoning bylaw and infill permit records answer questions about
> parking minimums, tree removal, and density. The two readers split:
> Gemini 3.1 Pro said go, GPT-5.6 Sol parked it.

Record:

- `Gemini 3.1 Pro`, GO: "The zoning bylaw and infill permit records
  answer questions about parking minimums, tree removal, and density."
- `gpt-5.6-sol`, PARK: "Reopen this when address-level infill permits
  can be linked to tree removals and before-and-after parking
  inventories, because the zoning bylaw alone cannot show what density
  displaced."

## 3b. `emergency-access` — Going ahead

AFTER, as rendered:

> Response-time records and emergency access design standards show
> whether bike lanes delay or assist emergency vehicles. The two readers
> split: Gemini 3.1 Pro said go, GPT-5.6 Sol parked it.

Record:

- `Gemini 3.1 Pro`, GO: "Response-time records and emergency access
  design standards show whether bike lanes delay or assist emergency
  vehicles."
- `gpt-5.6-sol`, PARK: "Reopen this when response records identify
  corridor-level delays or emergency use of bike lanes, because design
  standards alone cannot show whether the lanes help or hinder actual
  responses."

## 3c. `downtown-business` — Parked

AFTER, as rendered:

> Reopen this when business closures can be linked to customer-access
> changes through location-level records or owner evidence, because
> closure counts alone cannot establish why businesses failed. The two
> readers split: Gemini 3.1 Pro declined it, because no public record
> tracks why an individual business closed, and GPT-5.6 Sol parked it.

Record:

- `Gemini 3.1 Pro`, NO: "No public record tracks the specific reasons
  why individual downtown businesses have closed."
- `gpt-5.6-sol`, PARK: "Reopen this when business closures can be
  linked to customer-access changes through location-level records or
  owner evidence, because closure counts alone cannot establish why
  businesses failed."

## 3d. `cycling-safety` — see item 2c above.

## What to test across all four

- Is each seat credited with the outcome it actually reached?
- Where a seat's reason is paraphrased, does the paraphrase say what
  the seat said? Gemini's downtown-business sentence names "downtown
  businesses"; the register's paraphrase says "an individual business".
- The first sentence of 3a and 3b is Gemini's reason, reproduced word
  for word, and it is presented as the register's own sentence with no
  attribution, while Gemini is then named as one of two disagreeing
  readers a sentence later. Does that read as the register asserting
  what only one of its two readers concluded?
- On 3c the first sentence is Sol's reason word for word, and the
  register then says Sol "parked it" without saying anything more,
  while Gemini's ground is spelled out. Is the disclosure even-handed?
- The seats are written as "Gemini 3.1 Pro" and "GPT-5.6 Sol". One is a
  product name and one is a model id in title case. Is that a problem
  for a reader who has to trust these as identifiers?
- These are model names in reader-facing copy on a civic fact-checking
  site. Does naming them help a reader, or does it read as inside
  baseball? Say which, and why.

# ITEM 4 — three account splits that counted a person twice

`accounts` on a question is the count of distinct people in the source
who took part in it, with a for/against/neither split. The register's
header (printed above) used to promise the validator checked the split
against the total. It did not. The check now exists, and on its first
run it failed three questions whose split added up to one more than
their total. Each was one person who argued on both sides of a question
and was counted on both.

The three corrections, as they now stand in the register:

- `cycling-volumes` ("How many people in Edmonton cycle, and how much
  do the bike lanes get used?"): was `total: 25, for: 5, against: 21`
  (which adds to 26). Now `total: 25, for: 4, against: 21`.
- `lanes-and-congestion` ("Do Edmonton's bike lanes ease traffic congestion or make it worse?"): was
  `total: 24, for: 7, against: 16, neither: 2` (adds to 25). Now
  `total: 24, for: 7, against: 16, neither: 1`.
- `83-avenue-lane` ("Where is the bike lane near Whyte Avenue, and has it drawn complaints since it went in?"): was `total: 1, for: 1, neither: 1` (adds to 2). Now
  `total: 1, for: 1`.

Important and please account for it in your findings: **the
for/against/neither split is not printed on any page.** No template
reads it. It lives in the published register file, which readers of the
repository see, and it is described in the changelog entry in item 5.
The only reader-facing consequence of the split is a sentence — "People
arguing in both directions raised this question, and every claim they
made about it is checked, whichever way it points" — and that sentence
is computed from the *claims'* sides, not from this split, so none of
the three corrections changed a page.

Test: is the header comment's new description of the check (printed in
the register header above, under `accounts`) true of the check as
described here? Is "a person who argued on more than one side is
counted once, on the side their own words put them on" a promise the
register can keep, given that nothing in the file records which side a
person was put on or why? And in item 5, is the changelog's account of
this correct and not overstated, given that no page changed?

# ITEM 5 — the methodology changelog entry for v1.21

This renders on `/methodology/changes`, a public page. Every entry has
a summary, a "What changed" list, links, and a "Full change note".

## The record you need to check it against

- **The claim as published** was: "Edmonton property taxes have risen
  sharply, by $1,500 in three years for one resident and $6,000 a year
  for another." The two comments behind it are quoted verbatim in item 1.
- **The quote gate** checks that each captured wording is an exact
  substring of some comment in the capture, and that the pseudonym
  attached to it matches the commenter label on that comment. Both
  wordings pass it. It says nothing about the proposition written on
  top of them.
- **The merge prompt** (`prompts/intake-merge.md`) opens its merging
  rules with, verbatim: "**A claim is one assertion.** If you are
  joining two assertions with "and" or "while", they are two claims.
  "Only 2 percent of Edmontonians cycle" and "the lanes sit empty" have
  different populations, periods and measures; split them even when one
  commenter said both in a breath."
- **`prior_triage`**: 11 claims in the register now carry it. Every one
  records `outcome: no`, `readers: [gpt-5.6-sol, Gemini 3.1 Pro]`, and
  a reason. All 11 reasons are the exact merged triage reason from the
  run, and both seats independently returned NO on all 11. The field is
  **not rendered on any page**; it exists in the register file for the
  next brief author.
- **The audit**: a third reader (Claude Opus 5, independent of both
  triage seats) went back over the register's dispositions on
  2026-09-03. It audited every decline and every park (5 NOs, 3 PARKs)
  and 18 of 37 GO questions, 26 of 45 dispositions in all. Its own text
  says a Claude model performed the merge that produced the 112
  propositions, so where the merge misread a comment the audit starts
  from the misreading, and it names one case where that happened.
- **Earlier that day**, four published claims were taken off the
  findings board because they were undisputed truisms that should never
  have had a panel run spent on them.
- **The account-split check**: described in item 4. Nothing it changed
  is printed on a page.
- **Still missing**: there is no check anywhere that a claim's
  proposition says what its quotes say.

## Rendered: the v1.21 entry on /methodology/changes

## v1.21
2026-09-03Misattribution and prior triage
A real person was published asserting something they never asserted: their tax bill was written up as a tax rise. The gate that exists to stop exactly that could not have seen it, and the merge rule that would have stopped it was written during this very intake run and enforced by nothing. Alongside it, eleven propositions two readers had already refused were queued for panel runs with no trace of the refusal, and three account splits counted a person twice. None of this was caught by the pipeline. It was caught by the first audit that looked backwards.

### What changed

- The claim said Edmonton property taxes had risen sharply, by $1,500 in three years for one resident and $6,000 a year for another. The second resident had written: Glad I am paying $6,000 a year in property tax for this! That is what somebody pays, not what it went up by, and there is no sharply anywhere in it. One person's increase had been stitched to another person's bill and the compound put in both their mouths. On a site whose whole promise is fidelity to what people actually said, this is the worst defect available to us. It is now two claims, each carrying only what its own wording supports, and both quotes were read back against the capture by hand.

- No amount of tightening the quote gate would have caught it, and that is the part worth understanding. Both wordings are exact substrings of the comments they came from, which is the entire thing that gate was built to prove. It establishes that the words were really typed by the person credited with them. Whether the sentence assembled on top of those words says what the words say is a separate question, and no step in the pipeline was asking it.

- The rule that would have stopped it was already written. prompts/intake-merge.md opens its merging rules with: A claim is one assertion. If you are joining two assertions with and, they are two claims. This claim joined two people's remarks with exactly that word. Worse, that rule was written the same day, in the re-merge after an independent critique threw the first merge of this run away for grouping by topic instead of by proposition, having found a compound assertion put into the mouths of commenters who had made neither half of it. It was written in direct response to this failure, it went into a prompt file, and nothing was ever wired up to check it. The re-run under those rules shipped this anyway. A rule nobody checks is a wish.

- Nothing in the pipeline found any of this. The first triage audit did, three weeks after the project's own open questions asked for one and nobody scheduled it: a reader sent back over work that had already cleared every check standing in front of it. Every guard here inspects a claim as it goes past and then stops looking at it. There was never anything behind them. Four defects had been sitting in shipped or queued work for days, and an afternoon of looking behind found all four.

- prior_triage is the schema change, and it is what earns a version. When v1.16 lifted triage from the claim up to the question, the decisions made at the old level went in the bin, and eleven propositions that both triage seats had independently returned NO on became live claims under questions that are going ahead. Four of them are the same undisputed-truism shape that took four published claims off the findings board this morning, and they were sitting in the queue waiting for somebody to spend a panel run on them. The field records the outcome, the seats that reached it and the sentence they gave. It moves no question's disposition and decides nothing. It means a brief author can see the refusal instead of buying a run to rediscover it.

- Two validator rules hold that field to being a record rather than a second opinion. One requires an outcome from the same vocabulary, at least two named readers, and the reason those readers gave, and rejects any other key: a superseded decision with no reason attached stops work without saying why, which is worse than keeping nothing. The other refuses the field on a claim declined on the right-of-reply ground, where the decline is live rather than historical, because a claim carrying both would read as having been ruled on twice.

- The register header told readers the validator tested the for/against/neither split against the question's total. It did not. It tested the total against the range its claims allow, which is a different check that passes things the promised one refuses. The described check now runs, and on its first pass it caught three published splits overshooting their totals by one, on cycling-volumes, lanes-and-congestion and 83-avenue-lane. Each was one person who argued on two sides of a question and got counted on both. The claim-level count is deliberately everyone who argued a claim either way; the question-level split is people, once each, on the side their own words put them. The totals were right and the sides were wrong, and the header now describes a check that exists.

- What this version does not do is close the hole. There is still no check anywhere that a claim's proposition says what its quotes say, and building one is separate work already under way rather than something shipped here. So the honest account of this version is that it repairs four specific defects and names the gap that let the worst of them through. That gap is open right now.

### Read next

- How much have Edmonton property taxes gone up?

- The register of questions and claims

- How findings are produced

Full change note
The comfortable story would be that a check failed. No check failed. The check was never built. Somebody watched this exact failure happen during intake, wrote a rule against it the same day, put the rule in a prompt, and moved on, and an Edmontonian ended up on this site asserting a proposition about tax increases when what they had made was a remark about a bill. Between those two moments every guard the pipeline has ran, and passed. That is the shape of the fault, not an accident of one claim: the guards all run forwards, one item at a time, in the direction the work is moving, and not one of them was ever asked to turn round and read what had already gone out. The audit that did turn round was three weeks late. The lesson is not to write better rules. It is that a rule which lives only in a prompt is a statement of intent, and the difference between intent and a guarantee is the whole of what this project claims to be selling.

## What to test here

This is the site publishing an account of its own worst failure. Test
it as reporting, hard:

- **Every factual assertion.** "eleven propositions", "three account
  splits", "four published claims", "112 propositions", "three weeks",
  "an afternoon", "Four of them are the same undisputed-truism shape",
  "the first triage audit". Any of these that the record above does not
  support is a High finding.
- **"the merge rule that would have stopped it was written during this
  very intake run and enforced by nothing"** and the third bullet's
  fuller version. Is the causal story right — that the rule already
  existed, in a prompt, and nothing checked it?
- **"No amount of tightening the quote gate would have caught it"** —
  is that true of what the quote gate does?
- **"A rule nobody checks is a wish."** Do not object to its tone. Test
  whether it is true as stated of this case.
- **"On a site whose whole promise is fidelity to what people actually
  said, this is the worst defect available to us."** Is "the worst
  defect available to us" a claim the site can support, or is it the
  kind of superlative that will look silly next to a worse one?
- **"Nothing in the pipeline found any of this."** and "Every guard
  here inspects a claim as it goes past and then stops looking at it.
  There was never anything behind them." Are those true of the pipeline
  as described above, or too absolute?
- **The audit is credited as independent.** It was run by a Claude model
  and a Claude model did the merge it was auditing. The entry does not
  say so. Should it?
- **The account-split bullet** says "it caught three published splits
  overshooting their totals by one". Are those splits "published"? They
  are in the published register file and are not on any page. Is the
  word doing more work than it should?
- **The "not published yet" question**: the claim that carried the
  misattribution — is it currently visible to readers? Item 1's pages
  show the state. Does the entry's language ("A real person was
  published asserting something they never asserted") match that state,
  or does it overstate the exposure? Say which, and what the honest
  wording is. Note: it may not be softened into a hedge; if the claim
  was on the public site, "published" stands.
- **Plain speech.** Read the summary and the full change note aloud.
  Section 12's rules apply: one idea per sentence, answer first, no
  method vocabulary where a plain word exists, nothing the reader
  already knows. Point at the sentences that fail, quote them.
- **Length.** The entry is long. Say which sentences carry nothing, and
  which paragraph could go without losing a fact. Cutting is welcome;
  softening is not.
