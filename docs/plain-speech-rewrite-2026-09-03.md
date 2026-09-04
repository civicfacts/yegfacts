# Plain-speech rewrite, 2026-09-03

The founder's complaint on 2026-09-02 was that the site's language is not how
people speak. `docs/DESIGN.md` section 12 answered it for the claim answers, and
the ten answers were rewritten under it on 2026-09-03. This pass is the half that
was left: the **titles** of the six published questions, the **standfirsts**, the
**question** each claim is written as, and the dated notes that say why a claim
or a question left the findings board.

The rule this pass worked to, in the founder's words: the title is the question a
person actually asks, and the one-line answer is something you could say to a
friend. No method words.

## What this file is for

It was the input to the plain-speech read (`prompts/plain-speech-read.md`).
Every string that changed is below with its old text, its new text, and one line
on why the meaning did not move. The cases where a plainer sentence *would* have
moved a finding, and the wording was therefore left alone, are in their own
section at the end, because those are the ones worth arguing about.

**The read has since run and is applied, and so has the faithfulness check that
follows it.** What each changed is at the bottom of this file, under "What the
read did" and "What the faithfulness check did". Where a string below no longer
matches the page, one of those two is the reason and its own record says why.

## The rule this pass held itself to

A finding may not move. This pass changed how an answer is said and never what it
says. Where a plainer sentence would have changed the strength, the scope or the
hedging of a finding, the wording stayed as it was and the reason is recorded.
Two findings on this list are Not established and two more are Partially
supported or hedged; none of them acquired a sentence that sounds like an answer.

---

## Question titles

Every title was a noun phrase — a subject label, not a question. Section 12 says
a question "begins with a question word or an auxiliary", and none of the six
did. Each is now the question, in the words the argument is had in.

### active-transportation

- **Old:** `The $100 million for bike lanes`
- **New:** `Is $100 million a lot for bike lanes?`
- **Why the meaning is unchanged:** the old title named the sum; the new one asks
  the thing both claims under it are arguments about. One side says $100 million
  is enormous — almost double a year of snow clearing. The other says it is small
  — a nineteenth of what roads got. The title asserts neither and can be answered
  in either direction, which is the whole reason both comparisons are on the page.
  Deliberately not "Is $100 million a lot to *spend* on bike lanes": the claims are
  about money approved, and only $40.0 million of the $99.6 million had gone out by
  the end of 2025.

### climate-targets

- **Old:** `Edmonton's climate targets`
- **New:** `Is Edmonton on track for its climate targets?`
- **Why the meaning is unchanged:** it is the claim's own question
  (`climate-on-track`, "Is Edmonton on track to meet its climate targets?") in
  fewer words. Present state, not forecast — deliberately not "Will Edmonton hit
  its targets?", which would ask something the panel did not answer.

### electric-buses

- **Old:** `Edmonton's electric buses`
- **New:** `What went wrong with Edmonton's electric buses?`
- **Why the meaning is unchanged:** three claims sit under this question and no
  single yes/no covers them, so the title is the open question people ask. That
  something went wrong is not the contested part: `ebus-procurement-failure` is
  Supported, Unanimous, on the City's own court filings. What is contested — the
  $82 million and the cold-cities generalisation — the title does not touch.
  This is the weakest title on the list; see the doubts section.

### fifteen-minute-districts

- **Old:** `Edmonton's 15-minute districts`
- **New:** `Do Edmonton's 15-minute districts limit where people can travel?`
- **Why the meaning is unchanged:** it is the strong form of the claim
  (`districts-travel-restrictions`), asked neutrally and answerable either way.
  The weak form — whether the plans set up a mechanism someone could use later —
  stays in the claim's own question, where the panel tested it.

### infill-prices (withdrawn question)

- **Old:** `Infill teardown prices`
- **New:** `Is Edmonton's infill far pricier than what it replaced?`
- **Why the meaning is unchanged:** the old title named the subject; the new one
  asks the question both claims sit under. Both findings are Not established, and
  a question is the honest shape for a page whose answer is that nobody can tell.
  It does not say the replacements are more expensive; it asks. "Far" keeps the
  magnitude the brief fixed — this was never a question about direction.

### winter-cycling

- **Old:** `Winter cycling in Edmonton`
- **New:** `Is Edmonton too cold for cycling to work?`
- **Why the meaning is unchanged:** it is `wc-too-cold` in the words the claim is
  actually made in ("Edmonton is too cold for cycling to ever work as
  transportation" is one of the captured wordings on the page). Answerable in
  either direction; the finding is Contradicted and the title does not say so.

---

## Standfirsts (`one_line`)

### active-transportation

- **Old:** `The $100 million for bike lanes is spread over four budget years, which works out at 1.55 times the printed 2022 snow budget rather than double, and roads were authorized about 19 times as much.`
- **New:** `Council spread the $100 million for bike lanes across four budget years. Measured against a single year of snow clearing it comes to well over that budget and well short of double it, and Council approved roughly nineteen times as much for roads across the same four years.`
- **Why the meaning is unchanged:** "spread over four budget years" now names
  Council as the one who did it, and the four-year point leads, because it is what
  makes both circulating comparisons misleading. "1.55 times" became "well over
  that budget and well short of double it", which is the same fact and keeps the
  hedge that carries the Partially supported finding; the exact 1.55 is in the
  TL;DR, the claim answer and the claim record. "Roads were authorized" had no
  actor and now names Council. The ratio for roads is unchanged at roughly
  nineteen times.
- **A first draft of this restated the snow answer almost word for word** and the
  duplication audit failed it as a 23-word in-page repeat. That is the audit doing
  its job: the standfirst is the layer above the answer, not a copy of it.

### climate-targets

- **Old:** `Edmonton is not on track for the community emissions targets Council adopted, and the 2024 inventory came in 3.0 million tonnes above the trajectory the City set for itself.`
- **New:** `Edmonton is not on track for the community-wide emissions targets Council adopted, and the City's own count of 2024 emissions came in 3.0 million tonnes above what its own plan called for.`
- **Why the meaning is unchanged:** "inventory" and "trajectory" are the City's
  words for a count of emissions and for the path its plan set, and both are
  replaced by what they mean. "Community" was kept, as "community-wide", because
  dropping it would silently widen the scope onto the City's separate corporate
  targets. The 3.0 million tonnes and the direction are untouched.

### electric-buses

- **Old:** `Edmonton's own court filings say the buses fell short of the contract. The $82 million is a claim filed in a bankruptcy rather than a confirmed loss, and one failed procurement does not show that electric buses fail in cold cities.`
- **New:** `Edmonton's own court filings say the buses fell short of the contract. The $82 million is what the City asked for in the supplier's bankruptcy rather than money it has shown it lost, and one bad contract does not show that electric buses fail in cold cities.`
- **Why the meaning is unchanged:** "a claim filed in a bankruptcy" is what a
  lawyer calls it; "what the City asked for in the supplier's bankruptcy" is what
  it is. "Rather than a confirmed loss" became "rather than money it has shown it
  lost", which is exactly what Not established means here and puts the burden
  where the finding puts it. "One failed procurement" became "one bad contract".

### fifteen-minute-districts

- **Old:** `Edmonton's district plans are land use documents whose adopted text says they 'shall not restrict freedom of movement, association and commerce', wording Council added by amendment carried 12 to 0.`
- **New:** `Edmonton's district plans are planning rules for how land gets used, and Council voted 12 to 0 to write into them that they 'shall not restrict freedom of movement, association and commerce'.`
- **Why the meaning is unchanged:** the quoted clause is untouched, because it is
  the adopted legislative text and the whole point. "Land use documents whose
  adopted text says" became a sentence with Council as its subject doing the
  thing Council did. The 12-0 vote is kept.

### infill-prices

- **Old:** `Nobody publishes a series matching demolished Edmonton houses to what replaced them, so the size of the price gap cannot be worked out, and an earlier run left the affordability question in the same place.`
- **New:** `No public record links a demolished Edmonton house to the housing raised on its lot afterwards, so nobody can say how much more the new housing costs. Whether a household on a middle income could afford it is stuck in the same place.`
- **Why the meaning is unchanged:** "publishes a series matching" is method
  language for a record that links one house to the next. "An earlier run" — "run"
  is a method word — became a plain statement of where the affordability question
  stands, which is Not established, the same place. "Nobody publishes" became "no
  public record", which is the same bound the run reported: none produced in the
  run, none found in print. Both halves still say the record cannot answer, and
  neither says the answer.
- **A first draft of this restated the price-gap answer** for a 12-word run and
  the duplication audit failed it. Rewritten so the standfirst and the answer say
  the same thing in different words, which is what those two layers are for.

### winter-cycling

- **Old:** `Winter thins cycling in every city with measurements, and a subarctic Finnish region still cycles through it, so cold alone does not decide. Edmonton has never measured its own winter share.`
- **New:** `Winter cuts cycling back in every city that has counted, but people in a subarctic Finnish region ride through it anyway, so cold on its own does not settle the question. Edmonton has never measured what share of its own trips are made by bike in winter.`
- **Why the meaning is unchanged:** "every city with measurements" became "every
  city that has counted" — the same bound, which matters, because the claim is
  bounded to cities that have data. "Its own winter share" is a share of what;
  spelling it out ("what share of its own trips are made by bike in winter") is
  the same fact said so a reader can use it.

---

## Claim questions

### at-100m-vs-roads

- **Old:** `Does the 2023-2026 capital budget authorize $1.8 billion for roads, about eighteen times the $100 million for bike lanes? The quotation says 180 times; its own figures imply 18, and that is what was tested.`
- **New:** `Does Edmonton's 2023 to 2026 capital budget put $1.8 billion into roads, about 18 times the $100 million for bike lanes? The remark that started this said 180 times, but its own numbers work out to 18, and 18 is the figure we checked.`
- **Why the meaning is unchanged:** the semicolon is gone and the scoping sentence
  is kept whole. "Eighteen" is now "18" so the reader can compare it against the
  180 in the same breath. "Imply" became "work out to"; "that is what was tested"
  became "18 is the figure we checked", which names who did the checking.

### at-100m-vs-snow

- **Old:** `Is the $100 million approved for bike lanes almost double the City's annual snow-clearing budget? Measured against the City's printed 2022 snow budget; other City figures for 2022 move the answer.`
- **New:** `Is the $100 million approved for bike lanes almost double what the City budgets for clearing snow in a year? We measured against the snow budget the City printed for 2022, and other City figures for that year move the answer.`
- **Why the meaning is unchanged:** the second sentence was a semicolon-joined
  fragment with no subject; it is now a sentence and says the same two things. The
  qualification stays attached to the statement it limits, which is the point of
  it: which snow budget you divide by changes the answer.

### districts-travel-restrictions

- **Old:** `Do Edmonton's district plans restrict, or create a mechanism to restrict, where residents can travel within the city?`
- **New:** `Do Edmonton's district plans limit where people can travel in the city, or set up something that could be used to limit it later?`
- **Why the meaning is unchanged:** both forms the panel tested are still here.
  The strong form is the first clause; the weak form — the panel's own phrase is
  "create a mechanism that could enable restrictions" — is the second, said in
  ordinary words. Nothing was collapsed into one.

### ebus-cold-cities

- **Old:** `Does Edmonton's experience prove that battery-electric buses don't work in cold-climate cities?`
- **New:** `Does what happened in Edmonton prove that electric buses don't work in cold cities?`
- **Why the meaning is unchanged:** "prove" is kept, because the strength of the
  claim is what was tested and softening it to "show" or "suggest" would make the
  Contradicted finding answer a weaker claim than the one people make.
  "Battery-electric" and "cold-climate cities" are the vendor-neutral technical
  forms of "electric" and "cold cities", and the claim's stated limitation
  already carries the precise scope.

### ebus-procurement-failure

- **Old:** `Did Edmonton's Proterra electric buses substantially fail to deliver what the City contracted for?`
- **New:** `Did Edmonton's Proterra electric buses fall well short of what the City's contract called for?`
- **Why the meaning is unchanged:** "substantially fail to deliver" and "fall well
  short" carry the same threshold, which is the one the Supported finding rests
  on — a 38 per cent shortfall against the cold-weather guarantee. "What the
  City's contract called for", not "what the City paid for": the test is the
  contract, not the payment.

### ip-infill-affordable

- **Old:** `Would the housing built on Edmonton teardown lots cost a median-income household 30 percent or more of its income to buy?`
- **New:** `Would a household on Edmonton's median income have to spend 30 percent or more of it to buy a home built on a teardown lot?`
- **Why the meaning is unchanged:** the household comes first and the housing
  second, which is the order a person asks it in. "Median income" and "30 percent"
  are kept exactly: they are Statistics Canada's threshold and the declared income
  the whole test turns on, and any plainer word for either would be a different
  test.

### ip-teardown-price-gap

- **Old:** `When an Edmonton house is demolished for infill, is what replaces it typically worth about three times as much?`
- **New:** `When an Edmonton house is torn down for infill, is what replaces it usually worth about three times as much?`
- **Why the meaning is unchanged:** "demolished" to "torn down", "typically" to
  "usually". "About three times" is untouched: it is the magnitude the brief fixed
  before anyone looked.

### wc-too-cold

- **Old:** `Does Edmonton's winter climate make cycling unworkable as a meaningful transportation mode?`
- **New:** `Does Edmonton's winter make cycling unworkable as a serious way of getting around?`
- **Why the meaning is unchanged:** "unworkable" is kept, because the answer turns
  on it. "Meaningful transportation mode" became "serious way of getting around",
  which keeps the "meaningful" qualifier — the claim is not that nobody cycles,
  it is that cycling cannot be real transportation here.

### Unchanged: climate-on-track, ebus-82m-loss

`Is Edmonton on track to meet its climate targets?` and `Did Edmonton lose $82
million on its electric buses?` are already the sentence a person types into a
search box. Nothing to do.

---

## Answers

Seven of the ten answers were left as they stand: they went through a
different-vendor plain-speech read on 2026-09-03 and they read as spoken English.
Three were changed and all three changes are small.

### at-100m-vs-snow

- **Old:** `Partly. The City approved $100 million for bike lanes over four years, about one and a half times its printed snow budget for 2022 rather than almost double.`
- **New:** `Partly. The City approved $100 million for bike lanes over four years, about one and a half times the snow budget it printed for 2022 rather than almost double.`
- **Why the meaning is unchanged:** word order only. "Its printed snow budget for
  2022" reads as though "printed" describes a kind of budget; "the snow budget it
  printed for 2022" says the City printed it, which is the load-bearing fact —
  which 2022 snow figure you divide by decides the ratio.

### districts-travel-restrictions

- **Old:** `No. Council voted 12 to 0 to state that Edmonton's district plans must not restrict freedom of movement.`
- **New:** `No. Council voted 12 to 0 to write into the district plans that they must not restrict freedom of movement.`
- **Why the meaning is unchanged:** "voted to state" is not a thing Council does.
  It voted to add a sentence to the bylaw, which is stronger and is what the key
  fact says: an amendment moved before first reading, carried 12-0.

### ip-infill-affordable

- **Old:** `Nobody can tell. The Bank of Canada stopped publishing the monthly mortgage series needed to test whether a median income household could afford new homes on Edmonton teardown lots, and the method gives no substitute.`
- **New:** `Nobody can tell. The Bank of Canada stopped publishing the monthly mortgage rate you would need to work out whether a household on Edmonton's median income could afford the new homes built on teardown lots, and nothing was set down to use in its place.`
- **Why the meaning is unchanged:** "monthly mortgage series" is a rate series and
  is now called a rate. "The method gives no substitute" used a method word for
  the same thing the missing-evidence list already says: no rule was written down
  for deriving the price-month rate after the Bank of Canada ended the monthly
  series in 2019. The reason the answer gives is the same reason; the stance
  "Nobody can tell" is untouched.

### ebus-82m-loss, limitation

Not an answer, but the sentence directly under one, and the one that stops a Not
established being read as "nothing happened".

- **Old:** `'Not established' does not mean the loss is zero — real, non-trivial public costs are documented; it means no public record establishes a net loss of approximately $82 million.`
- **New:** `Not established does not mean nothing was lost. Real public costs are on the record and they are not small. It means no public record shows a net loss of about $82 million.`
- **Why the meaning is unchanged:** three sentences instead of one held together
  by an em dash and a semicolon. "Non-trivial" became "not small". "Approximately"
  became "about". Nothing was softened in either direction: it still refuses to
  say the loss is zero and still refuses to say it is $82 million.

---

## The dated notes

These say why a claim or a question left the findings board. Methodology v1.19 is
explicit that the copy does not soften, and this pass did not soften it. What
changed is the vocabulary, not the admission.

### at-100m-vs-roads, `board_withdrawn.reason`

- **Old:** `The adopted budget publishes no roads-only category, so the comparison depends on a category the City does not itself publish, and a re-run with defined categories is queued. …`
- **New:** `The City's adopted budget has no roads-only line, so this comparison rests on a category the City does not publish, and a re-run with the categories fixed in advance is queued. …`
- **Why the meaning is unchanged:** the old sentence said "publishes no roads-only
  category" and then "a category the City does not itself publish" — the same
  admission twice. Once is enough and it is the same admission. "With defined
  categories" became "with the categories fixed in advance", which is what
  defining them before the run means. The second sentence, the one that says
  these figures are the arithmetic under an argument the site has not checked, is
  untouched.

### at-100m-vs-snow, `board_withdrawn.reason`

- **Old:** `The comparison sets four years of capital spending against one year of operating spending, so the ratio does not mean what it looks like it means, …`
- **New:** `The comparison sets four years of capital money, which pays to build things, against one year of operating money, which pays to run a service, so the ratio does not mean what it looks like it means, …`
- **Why the meaning is unchanged:** capital and operating are the words the budget
  uses and they stay; what is added is what each one means, inline, so a reader
  who does not already know can see why the ratio is wrong. Nothing was removed.
  The second sentence is untouched.

### climate-on-track, `board_withdrawn.reason`

- **Old:** `The City's own carbon budget states that Edmonton is off track, …`
- **New:** `The City's own carbon budget already says Edmonton is off track, …`
- **Why the meaning is unchanged:** "states" to "says", plus "already", which is
  the whole force of the admission — the answer was public before the panel ran.
  The second sentence, "Nobody was arguing about it, which is the test this claim
  fails", is untouched, because it is the most uncomfortable sentence on the page
  and it is meant to be.

### infill-prices, `withdrawn.reason`

- **Old:** `Both claims on it are Not established, and a triage read parked both: the price gap needs a lot-by-lot linkage nobody has built, and no public record says what the housing that replaced particular demolished homes costs.`
- **New:** `Both claims on it are Not established, and reading them again parked both. Sizing the price gap needs somebody to follow each lot from the house that came down to what went up in its place, and nobody has built that record. And no public record says what the housing that replaced particular demolished homes costs.`
- **Why the meaning is unchanged:** "a triage read" and "a lot-by-lot linkage" are
  both method words for something plain. "Not established" stays, twice over, and
  both reasons for parking are still here and still stated as failures of the
  record rather than as results.

---

## Where wording was left alone to protect a finding

These are the interesting ones.

1. **`ebus-cold-cities`, the word "prove".** The plain version is "Does Edmonton
   show that electric buses don't work in cold cities?" — but the claim in
   circulation is that Edmonton's experience *proves* it, and the Contradicted
   finding is a finding against that strong claim. Weakening the verb would have
   the site contradicting a claim nobody made.

2. **`ebus-procurement-failure`, "substantially".** "Did the buses fail to deliver
   what the contract called for?" is plainer and is a different, easier question.
   The Supported finding rests on a *substantial* failure — 165 km against a 268
   km guarantee. "Fall well short" was chosen because it carries the threshold in
   ordinary words; dropping the threshold entirely was not an option.

3. **`ip-infill-affordable`, "median income" and "30 percent".** Both are jargon
   and both stay. The 30 per cent line is Statistics Canada's shelter-cost
   classification and the median income is the declared $90,000 the whole model
   turns on. "A typical Edmonton household" would have been plainer and would have
   been a different test.

4. **`ip-teardown-price-gap`, "about three times as much".** "Far more expensive"
   is how people say it and it is not what was tested. The brief fixed the
   magnitude — a median ratio of at least 2.5, with 2.0 declared as the weaker
   alternative — before any result was seen, and a vaguer question would let a
   Not established answer look like it covered more ground than it does.

5. **`climate-targets` title, "on track" not "will hit".** "Will Edmonton hit its
   climate targets?" is the more natural question and is a forecast. The claim is
   about present position against a published trajectory, and the City's own
   statement that the 2025 target will not be met is the City's, not ours.

6. **`ip-teardown-price-gap` answer, "The City's records".** The story's
   standfirst says *nobody* publishes such a record, and the run found none in
   print either, so "nobody keeps a record" would have been closer to the finding.
   It was left as "the City's records" because that is the narrower statement the
   published answer already makes, and widening it — even towards the finding — is
   a change to what the answer asserts, which is not this pass's job.

7. **`evidence_basis` on all ten claims.** "Direct Edmonton evidence", "Mostly
   Edmonton evidence", "Edmonton budget documents", "Edmonton + comparable
   cities". These read like a methodologist because they are a taxonomy, rendered
   under a glossed "Evidence basis" label that lives in a component. Rewriting one
   without the others makes the set incoherent, and rewriting the set is a
   vocabulary change, not a plain-speech edit.

8. **Every `limitations` entry except the one on `ebus-82m-loss`.** They are the
   explanation layer, they are held to the explanation rules rather than the
   answer rules, and several of them are precise in ways a plainer sentence would
   blunt. They use "seat" for "reviewer" throughout, which is a real plain-speech
   defect and a separate pass.

9. **Story `changelog` notes and `tldr` bullets, other than the new entry this
   pass added.** Rewriting a dated record of what happened, after the fact, is not
   a presentation change. The TL;DR bullets are the second disclosure layer and
   carry the exact figures the answers moved down into; they are the right place
   for a colon and a semicolon.

---

## Known consequences a reader of this file should check

- **The title and the register question now both ask a question.** The question
  page prints the story title as its `h1` and the register's own wording of the
  question directly underneath. `/questions/climate-targets` now opens with three
  near-identical lines: the title, the register's wording, and the claim's
  question, which on that page are all the same sentence. Two of the three were
  already there before this pass, because that claim's question equals the
  register's. The title was left as the right question rather than bent into a
  different one to break the stutter, because the fix belongs in
  `src/pages/questions/[id].astro` — print the register's wording only where it
  differs from the title — and that file was out of scope here. The duplication
  audit does not catch it: the register line sits inside a `data-record` region,
  which the audit drops.
- **`methodology/changelog.yaml` v1.19 links two of these questions by their old
  titles** ("Edmonton's electric buses", "The $100 million for bike lanes"). The
  links still resolve; the labels are now stale. That file was out of scope for
  this pass.
- **A question title is capped at nine words in practice, and nothing says so.**
  An evidence page's "Used by" list prints every claim that cites the source and
  tags each with its question's title, so a question with two claims on one source
  prints its title twice on that page. At ten normalised words or more that is an
  in-page duplication failure. It caught the first drafts of the
  `active-transportation` and `infill-prices` titles, both of which were rewritten
  shorter. `fifteen-minute-districts` is currently at the line and survives only
  because it has one claim.
- **Every claim's `plain_speech_read` has since been repointed.** All ten now
  name the 2026-09-04 read, which is the only one that has seen the current
  wording of the page each answer sits on.

---

## What the read did

The read ran on 2026-09-04, as
`codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`,
against a package holding the prompt, section 12 of `docs/DESIGN.md`, every old
and new string with its claim id, finding, panel agreement and evidence basis,
each claim's key facts and limitations, and this file. It read thirty-seven
strings, passed twenty-one and rewrote sixteen. Its report is split across the
seven review runs that produced the claims, at `<run>/plain-speech/gpt-2.md`,
and every editorial disposition is written under the reader's own section there.

Of the sixteen rewrites, five were adopted verbatim, seven in part or in
substance with the wording changed, and four were rejected in writing.

**Adopted verbatim.** The `active-transportation` title, now "How does bike-lane
funding compare with roads and snow?", because "a lot" is not something a record
can answer. The `electric-buses` title, now "What happened with Edmonton's
electric buses?", for the reason the drafter feared when it listed the old one
as its own worst doubt. The `ebus-cold-cities` question, which now names the
Proterra buses so a reader arriving cold has the premise. The
`ip-infill-affordable` question, which now asks what owning costs against income
rather than what buying costs, which is the Statistics Canada threshold the
panel tested and an imprecision older than this pass. The `infill-prices`
withdrawal note, which names both claims instead of pointing at "it" and says
plainly that both came off the findings board.

**Rejected.** The `climate-targets` standfirst, where the reader would have
dropped "Edmonton is not on track" as a repeat of the answer; that is the
sentence section 12 gives as its own example of what a page must state rather
than imply. The `districts-travel-restrictions` answer, where the replacement
dropped Council's 12-0 amendment, which is the fact that decides the answer, and
stated a flat absence broader than the panel's position on the mechanism form.
Half the `fifteen-minute-districts` standfirst, for the same reason. And the two
glosses of capital and operating money in the `at-100m-vs-snow` board note,
which the reader called uncarried and which section 12's explanation rule asks
for.

**The nine deliberate non-changes above.** The reader agreed with six of them
unprompted, including "prove" on `ebus-cold-cities`, the threshold carried by
"fall well short", the fixed magnitude on `ip-teardown-price-gap`, and "the
City's records" rather than "nobody keeps a record", which it said should stay
for the same reason the drafter left it. It did not contest the other three.

**What it caught that this file did not.** Two overclaims in the
`winter-cycling` standfirst, where "every city that has counted" and "Edmonton
has never measured" each state more than the evidence carries. A presupposition
in the `infill-prices` standfirst, where "how much more the new housing costs"
assumed a direction no more established than the magnitude. And "a household on
a middle income" in the same sentence, which is a different test from the median
income the claim below it turns on.

---

## What the faithfulness check did

The check ran later on 2026-09-04, after the plain-speech read and on the wording
that read left behind, as
`codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`,
against a package holding the stage instructions, all thirty-six changed strings
with their old wording, the ten claims in full with their findings, key facts,
limitations and unknowns, the published arithmetic and its output, the six
question pages' frontmatter, and the eighty-nine registry entries behind those
claims with what each source establishes and the excerpts from its archived
bytes. It checked thirty-six strings, passed twenty-four and returned sixteen
items on twelve. Its report is split across the eight review runs that produced
the claims, at `<run>/faithfulness/gpt-<n>.md`, with every editorial disposition
written beneath it.

The read asked whether a person would say the words. This one asked whether the
words are true to the evidence, and it turned out the answer was no in twelve
places. Nine items were adopted in substance with the wording changed, three
adopted as the seat proposed them in substance, and every seat-proposed
replacement was refused as worded, for one of three reasons: it opened an answer
with something other than the four stance openers the validator enforces, it put
method vocabulary into a sentence a reader meets first, or it restated a claim's
answer closely enough to fail the duplication audit.

**The one factual error.** Council did not write the freedom-of-movement clause
into the district plans. It moved an amendment to section 1 of the District
Policy, carried 12 to 0, and the sentence it added binds the Policy and the
plans together. The `fifteen-minute-districts` standfirst and the
`districts-travel-restrictions` answer both said the wrong instrument, and both
now name the District Policy. The vote, the quoted words and the finding did not
move.

**Where a wording said the record cannot answer and the record says nobody
tried.** The `ip-teardown-price-gap` answer said the City's records "cannot
show" the price relationship. That claim's own limitations record a reviewer
documenting that the inputs are published and the join is feasible, so the
honest statement is that nobody has produced the calculation. The answer, the
`infill-prices` standfirst and the withdrawal note's last sentence were all
rewritten to say that instead. This is the one place the two checks of
2026-09-04 disagree: the plain-speech read passed "the City's records" and said
in its own report that it should stay, agreeing with item 6 of the deliberate
non-changes above. The faithfulness check governs, because that wording moved
the finding.

**Unbounded absences.** Four of them: "no public record shows a net loss of about
$82 million" on `ebus-82m-loss`, "Edmonton has no measure" on the
`winter-cycling` standfirst, "No public record says what the housing ... costs"
in the `infill-prices` withdrawal note, and "nobody set a rule" on
`ip-infill-affordable`, where the rule that is missing is this site's own. Each
is now bounded to what has been found or to whose rule it was. None of the
withdrawal notes softened; bounding a search is not the same as admitting less.

**A characterisation with nothing behind it.** No archived source calls Oulu
subarctic, and this claim's own limitations say no source supplied a
standardised Edmonton–Oulu climate comparison at all. The word is gone from both
the `winter-cycling` standfirst and the `wc-too-cold` answer, replaced by what
the claim's own key fact carries: a northern Finnish region.

**A figure that was only true of one reading.** "Well over that budget and well
short of double it" holds at 1.55 against the printed 2022 snow cell and not at
1.17 or 1.26 against the City's other 2022 figures. The rewrite had dropped the
denominator to get a plainer sentence; the standfirst now names it and says the
other figures bring the comparison closer to a single year. The roads figure
gained the admission its claim's dated note already carries, that the City
publishes no roads-only total.

**Two things this check did not reach**, recorded so they are not lost. The
second TL;DR bullet on `fifteen-minute-districts` carries the instrument slip in
weaker form, and the fifth on `winter-cycling` carries the "each of the cities
measured here" overclaim in the same words the read borrowed. Neither TL;DR
changed in this rewrite, so both were context rather than strings under check.
They belong to the next pass on that layer.
