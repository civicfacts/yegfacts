# Triage audit — 2026-09-03

Nobody had ever checked whether this site's triage decisions are
reproducible. Methodology v1.15 said so in its own text: "nobody has yet
shown that a second triage read of the same proposition list reaches the
same dispositions." This is a third reader going back over those
decisions and saying, item by item, whether it would have reached the
same answer.

The register does not change because of this document. Nothing here
reopens a question, closes one, or edits a reason. It is a record of
where an independent read agrees and where it does not, so a reader can
see the disagreement rather than take the agreement on trust.

## 1. Who ran this, and why that matters

The two original triage seats were `gpt-5.6-sol` (OpenAI) and Gemini 3.1
Pro (Google). This audit was run by Claude Opus 5. That makes it
independent of both seats that made the decisions, and it is the weakest
thing about the audit, for two reasons stated up front rather than at
the end.

First, one reader is not a control group. Where this audit agrees with
the two seats, the agreement is three language models finding the same
thing plausible. That is not evidence that any of the three is right,
and a reader should not treat the agreement rate below as a measure of
how good the decisions are. It measures how far apart three readers
land, and nothing else.

Second, Claude is not a stranger to this material. A Claude model
(Opus 5) performed the merge that turned three extraction lists into the
112 propositions, and a Claude model (Haiku 4.5) was one of the three
extractor seats. So where the merge misread a comment, this audit starts
from the misreading. Section 6 contains one case where that happened and
was caught only because the capture was opened directly, and there is no
reason to think it is the only one.

## 2. What was audited, and what was not

The register holds 44 questions and 112 claims. Note that the count of
claims sometimes quoted elsewhere is higher; 112 is what the file holds,
and it matches the source entry's own `propositions: 112`.

Dispositions in the register:

| | questions | claims |
|---|---:|---:|
| `go` | 37 | — |
| `park` | 3 | — |
| `no` | 4 | 1 |

The single claim-level `no` is the accusation declined on the
right-of-reply ground. Counting it, the register holds five declines,
and all five were audited.

**Audited in full: every decline and every park.** Five NOs and three
PARKs. These are the decisions with no trace: a question that was never
checked leaves no evidence of the check it did not get, so nobody
reading the site can tell a correct decline from a lazy one.

**Audited by sample: 18 of the 37 GO questions.** The sample was fixed
before any of them was read, by a rule rather than by taste: the seven
largest by `accounts.total` (25, 24, 16, 15, 15, 14, 11), every question
at the minimum of 1 (four of them), every question at 2 (three of them),
and the three where the two original readers split GO against PARK. Two
more (6 and 5 accounts) were added because they sit next to items
already in the sample and excluding them would have looked like
curation. A GO that should have been a NO costs a panel run, and on
2026-09-03 this site took four published claims off its findings board
for exactly that, so this half of the audit is not hypothetical.

**Not audited: 19 GO questions.** They are named in section 8 so nobody
has to reconstruct the gap. This audit covers 26 of the 45 dispositions
in the register.

## 3. Method

Each item was decided from two things and nothing else: the standard in
`prompts/intake-triage-batch.md` (and `prompts/intake-triage.md` for the
four candidates registered before whole-source intake existed), and the
material the original readers had. The four tests are the ones in the
prompt, not a private standard:

1. Someone asks it, in their words.
2. The record can answer it at the level people ask it.
3. Some verdict would surprise someone.
4. An argument in this source rests on it.

For each item the audit read: the question and its `reason` in
`intake/register.yaml`, the claims grouped under it, the two seats' raw
decisions in the run directory, and, where the decision turned on what
somebody actually said, the comment itself in
`intake/captures/yegscoop-2026-08-26/comments.jsonl`.

The audit deliberately did not read the two seats' reasons before
forming its own view on the four tests, but it is a single pass by a
single reader and there is no mechanism enforcing that beyond the
reader's own account of it. Take that for what it is worth.

## 4. The per-item table

`Original` is what the register carries. `Audit` is the disposition this
reader reached from the prompt and the source.

### The five declines

| id | original | audit | verdict |
|---|---|---|---|
| `hundred-million-approval` | NO | NO | AGREE |
| `infill-luxury` | NO | NO | AGREE |
| `earth-flat` | NO | NO | AGREE |
| `oilers-held-back` | NO | NO | AGREE |
| `withheld-yegscoop-2026-08-26-1` (claim) | NO | NO | AGREE |

### The three parks

| id | original | audit | verdict |
|---|---|---|---|
| `downtown-business` | PARK | PARK | AGREE |
| `infill-teardown-more-affordable` | PARK | PARK | AGREE |
| `infill-not-affordable-median-household` | PARK | PARK | AGREE |

### The GO sample

| id | people | original | audit | verdict |
|---|---:|---|---|---|
| `cycling-volumes` | 25 | GO | GO | AGREE |
| `lanes-and-congestion` | 24 | GO | GO | AGREE |
| `winter-cycling` | 16 | GO | GO | AGREE |
| `infrastructure-deficit` | 15 | GO | GO | AGREE |
| `who-pays-for-roads` | 15 | GO | GO | AGREE |
| `consultation-and-opposition` | 14 | GO | GO | AGREE |
| `council-hearing` | 11 | GO | GO | AGREE |
| `cycling-safety` | 10 | GO (split) | GO | AGREE |
| `councillors-own-commute` | 6 | GO | GO | AGREE |
| `emergency-access` | 5 | GO (split) | GO | AGREE |
| `zoning-and-infill` | 4 | GO (split) | GO | AGREE |
| `converted-roadway` | 2 | GO | GO | AGREE |
| `property-taxes` | 2 | GO | **PARK** | **DISAGREE** |
| `city-hall-pay-and-interests` | 2 | GO | **NO** | **DISAGREE** |
| `83-avenue-lane` | 1 | GO | **PARK** | **DISAGREE** |
| `holyrood-school-lane` | 1 | GO | GO | AGREE |
| `189-street-lane` | 1 | GO | GO | AGREE |
| `other-cities` | 1 | GO | GO | AGREE |

## 5. The number

**23 of 26 agree. 88 percent.**

Three qualifications, because the number on its own is misleading in
three directions.

The declines held up completely: five NOs and three PARKs, eight for
eight. That is the half of the audit that was meant to find a buried
question, and it found none. But it is also the half where the sample is
small and where agreement is cheapest, because a claim that no record
can settle looks the same to every reader.

Every disagreement runs the same way: a GO this reader would have parked
or declined. None runs the other way. So on this evidence the failure
mode is permissiveness, not suppression. Three of eighteen sampled GOs
is a 17 percent error rate on the expensive side, and the sample was
weighted towards the small questions where that error is likeliest, so
17 percent is an upper bound on a biased sample rather than a rate for
the register as a whole.

The reasons fared worse than the dispositions. Six of the 26 published
reasons have a defect serious enough to name, against three wrong
dispositions. Section 7 gives them. The register is public, so the
reason is a promise to the reader, and a reason can be wrong while the
answer is right.

## 6. The three disagreements, argued

### `city-hall-pay-and-interests` — GO, should be NO

"What do city hall salaries and councillors' disclosed interests look
like?" It carries exactly two claims. One is the accusation, correctly
withheld. The other is `staff-paid-over-100k-plus-pension`, raised by
one commenter, whose captured wording is "They are unveiled get paid
over 100k and pension and push their climate, women and anti car
ideaologies."

Strip the part the site cannot check, and what is left is that senior
City staff are paid over $100,000. Alberta publishes a public sector
salary disclosure, so test 2 passes trivially. Test 3 does not: nobody
in the source disputes it, and no verdict on it would surprise anyone on
either side. Test 4 does not either, because the argument in that
comment does not rest on the salary figure. It rests on the ideology
allegation, which the site cannot check and is not proposing to.

Both original readers saw this at the claim level and neither cleared
it. One parked it and one declined it. It is a GO now only because the
regrouping under v1.16 moved the decision up to the question, and the
question existed because the accusation was in it. Withholding the
accusation, which was right, left behind a question whose entire live
content is one undisputed fact raised by one person.

This is the same shape as the four claims that came off the findings
board on 2026-09-03, and it is the shape `hundred-million-approval` was
correctly declined for. The two were treated differently and this reader
cannot see the distinction.

### `property-taxes` — GO, should be PARK

"How much have Edmonton property taxes gone up?" One claim, from two
people, which the original readers split GO against NO and which the
combining rule therefore parked at claim level.

The register's own reason concedes the problem: "City tax-rate and
typical-property records can show the general increase, although the two
anonymous residents' dollar amounts cannot be verified without their
assessment and tax notices." That sentence argues for a PARK and ends in
a GO. What can be checked (the general increase) is not disputed by
anyone in the source, and what is disputed (two residents' specific
dollar figures) cannot be checked without documents the site does not
have. Test 3 fails on the first half and test 2 fails on the second.

PARK rather than NO, because the reopening condition is concrete and
already written into the reason: a resident supplying assessment and tax
notices would make it checkable at the level it is asked.

There is a second problem in the claim itself, which is not a triage
matter but is worse. The merged proposition reads "Edmonton property
taxes have risen sharply, by $1,500 in three years for one resident and
$6,000 a year for another." The second commenter said "Glad I am paying
$6,000 a year in property tax for this!" That is a tax bill, not a rise.
The proposition attributes to a real person an assertion they did not
make, and the `wording` field shown beside the claim is that same quote.
The quote gate checks that the words are really in the comment, which
they are. Nothing checks that the proposition matches the words.

### `83-avenue-lane` — GO, should be PARK

"Where is the bike lane near Whyte Avenue, and has it drawn complaints
since it went in?" Both claims under it come from the same commenter.
One is `83-avenue-decade-no-complaints`, which both original readers
declined at claim level. The other is `no-bike-lane-on-whyte-avenue`,
which is a correction of somebody's street name and which the two
readers split.

So the question is built entirely from one person's two remarks, one of
which two independent readers refused. Test 1 is thin: it is hard to
write the question a resident would type, because the second claim is a
geography correction inside a thread rather than something anyone is
asking. Test 4 is thinner: no argument in the source rests on which
avenue the lane is on.

The reason also promises something the record will not deliver. "The
street-level complaint log can establish ... whether complaints were
recorded after it opened." A complaint log can show complaints. It
cannot establish that there were none over a decade, because an empty
log is equally consistent with nobody complaining and with the log not
reaching back that far in a usable form. The claim as worded is an
absence, and the named document cannot settle an absence.

PARK rather than NO, since the location question is trivially settleable
and could be folded into another question at no cost.

## 7. Reason defects

The register is published, so a reason is a promise. Six of the 26 have
a defect. Three sit under dispositions this reader otherwise agreed
with, which is the point of listing them separately.

**`cycling-safety`.** The published reason is "City collision records
and the traffic bylaw answer whether bike lanes improve safety and who
is at fault in collisions." Collision records do not answer whether bike
lanes improve safety. Counting crashes without knowing how many people
rode, and where, cannot distinguish a lane that is more dangerous from
one that is more used. One of the two original readers said exactly that
and parked the question on it: "raw crash totals cannot show whether
bike lanes change risk." The register published the other reader's
sentence, which promises a document that will not settle the question it
names. The disposition stands, because the question also carries claims
the traffic bylaw settles outright. The headline promise does not.

**`infill-luxury`.** The reason opens "No captured post makes this
claim." That is a true statement and it is not a permitted ground for a
NO. Methodology v1.15 is explicit about what an uncaptured wording gets:
it "sits at PARK until a captured form of it turns up in a real source."
The reason's second clause, that "luxury" has no definition on which
either side could lose, is a valid ground and carries the decision on
its own. But a reader who takes the first clause as the operative one is
being told something untrue about how this site works.

**`hundred-million-approval`.** "The $100 million approval is common
ground throughout this source, so checking the council vote would only
restate an undisputed budget fact." Verified against all 17 captured
wordings, including a sitting councillor's, and true: every one of them
takes the approval as given. But the reader who suggested this is being
told their question was dropped, when the live part of it was not. What
the money is for, and over what period, is argued in the source at
comments 265 to 266, 330 to 339 and 449 to 450, where one commenter
corrects three separate people with "It's $100 million over 4 years" and
another corrects a councillor. Those are going ahead under
`active-transportation`. The reason does not say so, and a decline that
does not tell the reader where the surviving half went reads as a
refusal of the whole thing.

**`property-taxes`** and **`83-avenue-lane`**, argued in section 6.

**Splits are disclosed but not attributed.** Four reasons end with a
sentence naming the disagreement, such as "The two readers split GO and
PARK." That is good and rare, and it should stay. But it does not say
which reader took which side, so a reader cannot tell whether the
permissive seat or the cautious seat prevailed, or whether the same seat
is permissive every time. On this run it is the same seat every time:
the OpenAI seat parked all three of the GO-against-PARK splits, and it
also parked `downtown-business`; it was the Gemini seat that declined
it. That is a systematic difference between the two readers, and it is
not visible from the register.

**Correction, 2026-09-04.** The paragraph above originally said the
OpenAI seat declined `downtown-business`. The seat outputs show the
opposite: the OpenAI seat (gpt-5.6-sol) parked it and the Gemini seat
(Gemini 3.1 Pro) declined it. This was caught by the independent
critique of PR #45. The larger claim above, that the same seat parked
all three GO-against-PARK splits, is unaffected.

## 8. The four extra checks

### Does any decline turn on a person's name rather than the ground?

No. None of the four question-level declines involves a named person at
all. The one claim-level decline turns on a name by design, and the
ground is right. The comment it came from does not merely state a fact
about a councillor's household; it names her, asserts a private motive
and calls the whole thing corrupt. That is an accusation of improper
motive, the site has no right-of-reply process, and the narrowed rule
applies exactly as written. The words are not quoted here for the same
reason the register does not carry them.

Five other claims name identifiable people and were all cleared. Every
one is about what an office-holder did in office: two motions brought,
a lane installed, a school design proposed, whether councillors bike to
work. Council minutes and project records settle them. The rule was
applied at its narrow width in all six cases, which is what the
methodology says it should be and which is not what happened on the
first triage run.

**But the withholding leaks, and the run's own README misdescribes
where.** The README states that the wording and the comments are "held
in the private board record." They are not. In this public repository:

- `reviews/intake/yegscoop-2026-08-26/triage.md` prints the row under a
  descriptive slug naming the councillor, with the proposition in full.
- The same slug and wording appear in `triage.json`, `merged.json`,
  `groups.json` and all three `extract-*` files.
- `intake/captures/yegscoop-2026-08-26/comments.jsonl` carries the whole
  comment verbatim at index 362, including the accusation.

The capture is deliberate and defensible; its README says it is a
verbatim archive including things the site declined to check. The rest
is not. The register goes to the trouble of a neutral id
(`withheld-yegscoop-2026-08-26-1`) on the reasoning that "a slug is
published as surely as a paragraph is," and a sibling file three
directories away publishes the slug it was protecting against. The
withholding is real on the site and absent from the repository, and the
sentence claiming otherwise is false as written.

### Is any GO question a compound that should have been split, or are any
two questions the same question?

Four GO questions join two things settled by different documents.
`council-mandate` asks about election turnout (election results) and
about recall (provincial statute). `councillors-own-commute` asks
whether councillors cycle (no record) and whether they get a vehicle
allowance (the remuneration bylaw). `83-avenue-lane` asks where a lane
is and whether it drew complaints. `city-hall-pay-and-interests` joins a
salary disclosure to a conflict-of-interest filing. The grouping rule is
that propositions belong together when "a reviewer reading the same
documents would settle both," and in these four the documents differ.
None of the four is serious enough on its own to change a disposition,
and two of them changed one for other reasons.

One claim is a compound the merge should have set aside.
`population-exploded-still-single-family` reads "Edmonton's population
has exploded while the city is still predominantly single family homes,
so continued sprawl is unsustainable." The first two limbs are census
arithmetic. The third is a value judgement, which the merge prompt
treats as not a claim, and it sits inside a GO question.

On duplicate questions: `city-plan-commitments` (registered, GO) asks
whether Edmonton committed to becoming a 15-minute city. The published
question `fifteen-minute-districts` already answers whether the district
plans restrict travel. They are not the same question, but they share
their evidence, and neither page mentions the other. More generally, the
run's README states that "nineteen restate claims the register or a
published story already carries," and the register records no such flag
on any claim. A reader cannot check the nineteen. `npm run
audit:duplication` finds no failing overlap between the built pages, so
this is a provenance gap rather than a rendering one.

### Does any reason promise a document that does not exist or would not
settle it?

Two, both given in section 7: the collision records under
`cycling-safety`, and the complaint log under `83-avenue-lane`. The
other 24 name documents that exist and are the right documents. Several
are unusually specific and good: the tender calendar under
`routes-already-committed`, the lobbyist registry under `council-hearing`,
the matched demolition-and-replacement record that does not exist under
`infill-teardown-more-affordable`, which is the correct shape for a PARK
because it names the thing whose appearance would reopen the question.

### Do founder- or editor-originated candidates fare differently?

They can be tested, and they do. The register's `origin` field is set on
seven questions and absent on the rest, which is enough.

| origin | GO | PARK | NO | GO rate |
|---|---:|---:|---:|---:|
| captured from a source | 32 | 1 | 1 | 94% |
| supplied by the founder | 2 | 0 | 2 | 50% |
| suggested by the editor | 0 | 2 | 1 | 0% |
| pre-triage legacy | 3 | 0 | 0 | — |

The direction is the opposite of the concern. Founder- and
editor-originated candidates fare **worse**, not better: 2 of 7 cleared,
against 32 of 34 for the captured ones. And the two that cleared are not
really counter-examples, because both were checked before triage existed
and were given a `go` retrospectively; one of them has since been
withdrawn.

Two things stop this being a finding. Seven is too few to say anything
with, and two of the four founder-supplied candidates were submitted as
deliberate test cases for the register, chosen to be declined. Auditing
those two is close to circular: they were built to produce a NO and they
produced one. What can be said is narrow and worth saying anyway.
Nothing in this register shows triage favouring the house's own ideas,
and the only structural pressure visible runs the other way, because
v1.15 requires a captured wording and the house's own ideas do not have
one.

## 9. What this audit cannot show

**It is not a reproducibility test.** The question v1.15 left open was
whether re-running the triage prompt on the same proposition list
produces the same dispositions. This audit does not answer that. A third
reader reasoning about the outcome is a different experiment from
running the same prompt twice, and only the second one measures the
thing OQ-18 asks about. That run has still not happened.

**One reader is a weak control.** Stated in section 1 and repeated here
because it is the load-bearing limitation. Agreement between this reader
and the two seats is not evidence that the decisions are correct. All
three are language models with overlapping training data, and there is
no reason to expect their errors to be independent. If all three share a
blind spot, this audit will not find it, and will report a high
agreement rate that looks like reassurance.

**Same-family contamination.** A Claude model performed the merge that
produced the propositions this audit read, and a Claude model was one of
the three extractor seats. The `property-taxes` misattribution in
section 6 was caught only by opening the capture. Anywhere the audit
worked from the merged proposition rather than the comment, it inherited
whatever the merge decided.

**Coverage.** 26 of 45 dispositions. The 19 GO questions not audited
are: `who-cycles`, `snow-clearing`, `active-transportation`,
`council-pause-vote`, `routes-already-committed`, `council-mandate`,
`on-street-parking`, `city-plan-commitments`, `access-across-barriers`,
`transit-alternative`, `street-types-and-design`, `network-connections`,
`132-avenue`, `provincial-direction`, `climate-targets`,
`electric-buses`, `fifteen-minute-districts`, `infill-prices`,
`low-density-century`.

**One source.** Thirty-four of the 44 questions come from a single
Facebook thread on a single subject. Nothing here says how triage
behaves on a different kind of source, a different topic, or a source
whose commenters are not overwhelmingly on one side.

**The decisions before the register.** Four candidates were triaged
under the older one-claim prompt, and for two of them there is no
captured source to re-derive anything from. Auditing those is auditing a
report, not a decision.

## 10. One thing the audit found that is not about triage

Eleven propositions that both original readers declined at the claim
level are now carried in the register as live claims under GO questions,
with no disposition of their own and no record anywhere that they were
ever refused.

This follows from the v1.16 redesign, under which triage rules on the
question and "a claim carries no state of its own." The claim-level
decisions were superseded, deliberately and for good reasons. But the
consequence is that eleven claims two independent readers refused will
go to a panel and receive published findings, and eight of the eleven
have no trace of the refusal anywhere a reader can see. Three are
mentioned in the prose of their question's reason, which is why the
other eight stand out.

Four of the eleven are the same shape as the claims that came off the
findings board on 2026-09-03: that cyclists pay the property taxes that
fund roads, that Edmontonians pay for services they do not use, that
roads carry goods and emergency vehicles, that transit moves people more
efficiently than cars. Both readers declined all four as things nobody
disputes. Each is now queued for a panel run.

This is not a triage failure. It is what happens when the unit of
decision moves up a level and the decisions at the old level are
discarded rather than carried. The eleven are, in register ids:
`heritage-days-bike-arrivals`, `roads-carry-goods-and-services`,
`hearing-supporters-and-lobby-groups`, `voters-elected-pro-bike-council`,
`councillors-dont-bike-to-work`, `cyclists-pay-property-taxes`,
`taxes-fund-services-you-dont-use`, `lrt-barely-functions`,
`transit-more-efficient-than-cars`,
`cyclists-harassed-on-roads-without-lanes`,
`83-avenue-decade-no-complaints`.

## 11. A smaller inaccuracy

The register's header says of the account counts: "The split is what the
validator checks the total against." It is not. `scripts/validate.ts`
checks that `accounts.total` falls between the largest single claim's
count and the sum of all of them. The for/against/neither split is
checked only for being whole numbers, and nothing requires it to sum to
the total.

On three questions it does not. `cycling-volumes` has a total of 25
against a split summing to 26, `lanes-and-congestion` 24 against 25, and
`83-avenue-lane` 1 against 2. On the first two, one person argued both
ways, which is honest and worth keeping. On the third, the same
commenter is the whole question and is counted on two sides of it. None
of this changes a disposition. The sentence describing the check should
describe the check.

## 12. Checks run

```
$ npm run validate
validate: OK — 6 stories, 10 claims, 1 commitments, 8 topics, 140 evidence entries

$ npm run audit:exposure
exposure-audit: 665 tracked text files scanned (16 binary skipped, 681 tracked total), 140 registry entries
  fail  SECRETS               0
  fail  PRIVATE-EVIDENCE LEAK 0
  fail  RIGHTS                0
  fail  LOCAL PATHS           0
  warn  PII                   36
  warn  LONG QUOTES           0
exposure-audit: OK — no fail-class findings; 36 warning(s) need disposition in the audit record

$ npm run build && npm run audit:duplication
duplication-audit: 366 built pages in dist
  fail  IN-PAGE      0
  fail  PAGE+FOOTER  0
  warn  CROSS-PAGE   18
duplication-audit: OK — no fail-class findings; 18 cross-page warning(s) need a judgement
```

The 36 PII warnings and 18 cross-page warnings are the pre-existing
baseline and are unchanged by this document, which adds no quotations,
no addresses and no names. They are dispositioned in
`methodology/audits/exposure/`.

## 13. What this document does not do

It does not change the register, the methodology or any version number.
Three questions this reader would have parked or declined are still GO,
and should stay GO until somebody with the authority to decide has read
the argument and answered it. Six reasons this reader thinks are
defective are still published as written.

An audit that quietly edits what it audits is not an audit.
