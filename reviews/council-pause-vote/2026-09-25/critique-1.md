<!-- Dispositions, 2026-10-02, by Stew (drafting seat Claude Opus 5.5). R1 by the editor's decision, which differs from the critic's preferred fix; R2 to R7 adopted; suggestions adopted except where stated. No finding changed.

R1, editor's decision: the question stays as residents asked it, and the standfirst answers it in its first words: "No, nothing was paused, because council's Infrastructure Committee neither adopted nor rejected administration's plan to set 14 bike routes aside. The Council records we checked show no decision on it by September 25." "Set aside" is the version-neutral name for the plan; claim 2's answer still carries the version caveat beside its verdict, and the Partly verdicts stay with each claim. The first sentence is the share-card description. The validator warns the standfirst is 33 words; it is kept, because the editor's brief for it is the stance, the committee's non-decision and the bounded Council absence. R2, adopted as proposed. R3, adopted as proposed. TL;DR 2 is now the October 6 layover, because the standfirst carries the Council absence. R4, adopted: claim 2's answer says "the original" (merged with gate B2), the explanation says the City labelled the replacements Version 1 and Version 2, and claim 1's limitation follows gate B3 (all three reviewers, not two). R5, adopted: a story's `parked` line may now name a claim set aside at a run's vote gate, which scripts/validate.ts checks against the run's carry manifest (gateParkedClaims in src/lib/carried.ts). The line shows under "Claims with no finding" on the question page, and the claim's own page (ClaimEntry.astro) says it was set aside when its question was checked and prints the line instead of "waiting" and the registration expectation; the line is the page's share description. R6, adopted as proposed. R7, adopted: the selected-items label reads "The AI reviewers saw only the items on this City meeting page that our published rule picked, from our archived copy, because the City's portal blocked automated access", followed by why the copy is not republished; YF-EV-0204's title says "(all the meeting's minutes on one page)".

S1, adopted: claim 1's answer covers Council. S2, adopted: the two cut votes are given by tally and by the two movers, the names-by-vote sentence is gone, and the same-seven section says a single vote or one motion's list does not test the claim. S3, adopted: the explanation says once that the reviewers are a panel of three AI models; the new label says "AI reviewers". S4, adopted in part: the reason and plainer wording are in. Printing it once with short tags is not done: D-0046 rule 6 and D-0047 rule 7 put the label beside each source, and changing that is a method change. S5, not adopted: rendering the rule and item index on the site is a separate batch; the "How we handle this" link already reaches the methodology section. S6, adopted (same as release A4). S7, adopted site-wide: a line above the AI review table says the verdicts and confidences are from round one. S8, adopted: the heading, "put it off", "our archive"; claim 2's share description now ends at its first sentence. S9, not adopted: the double hairline and the outline bar are site-wide layout, the second unconfirmed on a device; left for a layout batch. -->

# Rendered-page critique, 2026-10-02, a Claude (Opus 5.5) session separate from the drafter, checkers and gate

Pages read: `dist/questions/council-pause-vote.html` from `npm run build` on
worktree `draft-cpv`, commit 0840853. Also every claim page it links:
`cpv-committee-and-the-pause`, `cpv-administration-recommended-freeze`,
`cpv-motions-to-cut-to-50-million`, `same-seven-councillors-vote-together`,
and the three register pages behind the findings (`council-rejected-pause`,
`administration-recommended-freezing-14-routes`,
`motions-to-cut-budget-to-50-million-failed`). Evidence pages YF-EV-0118 and
YF-EV-0209, plus YF-EV-0204 and YF-EV-0210 because their labels raised
questions. Read against DESIGN.md §12 (plain speech, "The layers") and §10.
Phone screenshots were taken at 375 by 812 (see the phone test at the end).

**Bottom line.** The three findings are reported honestly. No sentence
reads a Partially supported finding as a clean yes or no. Claim 2's version
dependence sits in its answer, right beside the badge. The carried-source
labels stay down in the evidence list, away from the answer. The weak point
is the top of the page. The question asks "Did council pause the routes?"
and the answer opens "Partly." A cold reader takes that to mean council
partly paused them, and nobody paused anything. Two TL;DR bullets give only
half of a split finding. The parked "same seven" claim is handled well on
the question page, but its own claim page says it is "waiting" to be
checked. Seven changes are required.

Checked and passing:
- All 597 internal links and in-page anchors on the ten pages resolve in
  `dist/`. No page has duplicate ids. Both GitHub YAML links (the selection
  rule and the item index) point at files that exist on `origin/main`. The
  article-history link to `src/content/stories/council-pause-vote.mdx` on
  main will 404 until merge, which is normal for a draft.
- The order follows D-0039: title, question, standfirst, TL;DR, finding
  strip, provenance line. The only thing above the title is the
  pending-review banner, which is removed at publication.
- Nothing calls a Partially supported finding true or false. Every
  limitation section says what holds and what does not. Claim 3 keeps its
  calculations labelled as "made here".
- The explanation's statement that the same-seven claim could come out "no,
  partly, or nobody can tell" matches the vote gate (`carried/checks/gate.md`
  gives Not established, Partially supported or Contradicted). The
  explanation and TL;DR bullet 5 both say plainly that the claim is not
  answered.
- Counts agree with each other: six people, five on claim 1, Rice carrying
  three claims, 14 entries versus 18 stretches, the 4 to 8 and 4 to 7 votes,
  $67.3 million and $32.7 million.
- The whole-document carried label reads clearly and sits under each
  affected source in the evidence list.
- There is no horizontal scroll at 375px (`scrollWidth` 375).

## 1. Ten-second test

Title, question and standfirst: "Edmonton's bike routes and the August 2026
committee vote" / "Did council pause the future bike routes when its own
administration recommended it?" / "Partly. Edmonton's Infrastructure
Committee did not vote on the City's proposal to review 14 bike routes."

What a resident would say back: "Council sort of paused them?" That is
wrong. Nobody decided to pause anything. The committee did not adopt the
plan, did not reject it, and a motion to keep building also failed. "Partly"
is the stance on the claim (that council did not support the plan). But the
page question asks the reverse, so the stance attaches to "pause" (see R1).

The first TL;DR bullet makes this worse. "A committee motion to continue
Edmonton's bike-route program failed on a tied vote" reads on its own as
"the committee voted to stop the program" (see R2).

## Required (misleads)

### R1. The standfirst's "Partly" answers a question the page does not ask

Quoted: question "Did council pause the future bike routes when its own
administration recommended it?" and standfirst "Partly. Edmonton's
Infrastructure Committee did not vote on the City's proposal to review 14
bike routes."

Why it misleads: "Partly" to "did council pause" means council partly
paused the routes. The page shows that no body paused them. The stance
comes from claim 1, which runs the other way (council did *not* support the
plan). There is a second problem. "Proposal to review" is the Version 2
reading, and claim 2 says the original would have dropped the routes for
two years. So the ten-second layer settles the version question without its
qualifier. The question also builds in "when its own administration
recommended it", which claim 2 only partly supports. A question must be
answerable in either direction (§12, "The question").

Fix (preferred): turn the question round so that it matches the claims, and
take the plan's name from words the page already uses.
- Question: "Did council turn down its administration's plan to set aside 14 future bike routes?"
- Standfirst: "Partly. Edmonton's Infrastructure Committee did not adopt the City's plan for 14 bike routes, but it did not vote it down either."

Fix (if the question must stay): "No. Edmonton's Infrastructure Committee
never voted on the City's plan for 14 bike routes, so it neither paused them
nor turned the plan down." Note the risk with this one. A bare "No" can read
as fully confirming the commenters ("council didn't support it"), and their
claim is only Partially supported. That is why the first fix is preferred.

### R2. TL;DR bullet 1 reads as the committee voting to stop the program

Quoted: "A committee motion to continue Edmonton's bike-route program failed
on a tied vote."

Why it misleads: on its own, and in first place, this says the committee
voted against continuing the routes. A reader who wants the pause takes it
as "they did pause it after all". The motion's failure changed nothing: the
program kept its approved scope (claim 1, limitations).

Fix: "A committee motion to keep building the routes as planned failed on a
2 to 2 tie, so the committee decided nothing either way."

### R3. TL;DR bullet 3 gives only the half of claim 2 that goes against the claimant

Quoted: "The City's latest plan proposed another look at 14 bike routes
without saying work on them had to wait."

Why it misleads: the finding is Partially supported because it depends on
the version, and the record does not say which version the committee had.
The bullet carries only Version 2, so a reader leaves thinking Rice's
"freeze" was simply wrong. §12 requires a qualification to sit beside the
statement it limits. The claim's own answer does this. The TL;DR does not.

Fix: "The City's original plan would have dropped 14 bike routes for 2026
and 2027, but its latest version only proposed another look at them."

### R4. "First version" and "Version 1" are different documents, and the page uses both

Quoted: claim 2's answer, in the strip and on the claim page: "...though the
first version of its plan would have dropped them for 2026 and 2027."
Claim 1's limitation: "Under the first version, and Version 1, it was a
hold."

Why it misleads: the City's documents are the original, then Version 1,
then Version 2. A reader who meets "the first version" in the answer and
"Version 1" in the explanation will take them for the same document, and
Version 1 did *not* drop the routes for two years. Claim 1's limitation also
states flatly that Version 1 "was a hold". Claim 2 records that the
reviewers split on that, two to one, and that one of the two came round only
in cross-review. So the claim 1 page is stronger than the claim 2 finding on
the same point.

Fix:
- Claim 2 answer: "Partly. Administration set 14 bike routes aside for a second look but did not say they would wait, though the original version of its plan would have dropped them for 2026 and 2027."
- Claim 1 limitation: "Under the original version it was a hold, and two of the three reviewers read Version 1 as one too."
- In "What administration asked for", at the first mention of the versions: "The City labelled the two replacements Version 1 and Version 2."

### R5. The parked claim's own page says it is waiting to be checked

Quoted, on `/claims/same-seven-councillors-vote-together`: "No finding yet.
This claim has not been checked. It is waiting on the question below..."
and "Its question Going ahead". Under that heading is the registration
expectation: "Administration's report and recorded votes can show ... how
each councillor voted". The page's share-card description is that same
sentence.

Why it misleads: the claim was set aside under the vote gate before round 1
and will not be checked on this run. A reader who follows the link from
"Claims with no finding" reads that it is pending. The share card for the
"same seven" claim also says the recorded votes can show how each councillor
voted, which comes close to saying the records answer it. This is the
lanes-and-congestion R5/R7 problem again. That fix keyed the plain line on a
framing park in the register. This park is a vote-gate park recorded in
`carried/manifest.yaml`, and `intake/register.yaml` has no outcome for the
claim, so the lanes mechanism does not reach it.

Fix: give a claim parked at the vote gate the same treatment as a framing
park. That means a `parked` line on the story, validated against the
manifest's park, and rendered both in "Claims with no finding" and on the
claim page in place of "No finding yet ... waiting". Suggested line: "Set
aside for this check. Answering it needs every recorded Council vote on the
program since late 2022, and some of those meetings and documents are not
archived yet. It can be checked once they are." The share-card description
for the claim page should be that line, not the question's registration
reason. On the question page, the "Claims with no finding" row then carries
this line under "Said in 2 comments". Today it carries no reason at all.

### R6. A procedural rule from the brief is stated as fact, with no source

Quoted (explanation, "What the committee did"): "A committee is not City
Council. The recommendation could reach Council only if the committee
carried it, and it did not."

Why it misleads: no source on the page or in the key facts supports this.
It comes from the frozen brief's definitions ("a committee recommendation
reaches Council only if the committee carries it", brief.md line 232). Brief
prose is not evidence. As written it is also too strong: administration or
a councillor can bring an item to Council by other routes, and Salvador's
notice of motion is one such route on this very page. A reader who knows
council procedure can use this sentence against the page.

Fix: "A committee is not City Council. The report asked the committee to
send the plan to Council with a recommendation, and the committee carried no
motion on it." Cite YF-EV-0118 and YF-EV-0209. Keep the next sentence ("Nothing in the
Council minutes the reviewers read decided it...").

### R7. Two carried labels do not match their source

1. YF-EV-0210 is "agenda page with the attachment list for item 7.6", and
   its label says "Reviewers read selected items from the City's minutes".
   It is an agenda, not minutes.
2. YF-EV-0204's title ends "(full page)", and its label says reviewers read
   "selected items ... the rest of each page was not shown to them". A
   reader sees "full page" and "not the full page" in the same entry.

Why it matters: the label exists to tell a reader exactly what the reviewers
saw. Both entries tell them something wrong.

Fix: write the minutes variant as "this City meeting page" rather than "the
City's minutes", so that it holds for agendas too (full wording in S4).
Either drop "(full page)" from YF-EV-0204's registry title or say what it
means, for example "(all the meeting's minutes on one page)".

## Suggested

### S1. Claim 1's answer skips the half of its question about Council

The question asks "...and did full City Council later decide it?" The
answer covers only the committee. Suggested answer: "Partly. Council's
Infrastructure Committee neither adopted nor voted down administration's
plan for 14 bike routes, and full Council had not decided it by September
25." This also drops "plan to take another look", which is the Version 2
reading (see R1).

### S2. The December 2024 vote list is exactly seven names

Claim 3's facts list the seven who voted against the 2024 cut (Knack, Sohi,
Salvador, Janz, Tang, Stevenson, Wright). The explanation also points to
"the full votes, by name". A reader on the "same seven" side will count them
and treat the page as having answered the parked claim. The names belong in
the record. Add one sentence to "Why the same seven is not answered here":
"One vote with seven names against a cut does not test it, because the claim
is about every vote."

### S3. "Reviewers" is never said to mean AI models in the explanation

First use: "two of the three reviewers read Version 1 the same way". The
provenance line above it says "AI panel", but a resident will picture
people. Write "two of the three AI reviewers" at first use. The carried
labels have the same gap (see S4).

### S4. The minutes label: reason, punctuation, length and repetition

On the phone this block runs to five lines plus a hash, and it repeats under
nine sources (phone-07). It does keep out of the way of the answer, and a
cold reader does understand "they only saw parts of these pages". What it
does not say is *why*. The whole-document label gives the portal reason, and
this one gives none. It also says the copies "cannot be published" without
saying why. Suggested wording, one idea per sentence and no semicolon:

> The AI reviewers saw only the items on this City meeting page that our
> published rule picked, from our archived copy, because the City's portal
> blocked automated access. The City's terms do not let us republish that
> copy, so check the items against the City's own page.

Then print it in full once at the top of the evidence list and give each
source a short tag ("Selected items, see above · City page · Item index").
On evidence pages (YF-EV-0118, 0204, 0209, 0210) the label repeats once per
claim under "Used by". Put it once in the Record block instead.

### S5. The rule and the item index open as raw YAML on GitHub

"The rule (v2)" and "Item index" go to `.yaml` blobs. A resident who clicks
gets a wall of machine text. The standing rule is to render GitHub-only
material on the site. If that is too much for this batch, link the
methodology section that explains the rule and leave the YAML for
researchers. "page SHA-256" has no gloss either. It could take the same
popover that the evidence page's "Verify independently" text implies.

### S6. The carried label is not beside the source on claim pages

On claim pages each fact cites "YF-EV-0209" with no hint that the reviewers
saw only selected items. A small tag on carried IDs in "What it rests on"
would put the label beside the source where the hour-layer reader uses it.
An example is "YF-EV-0209 (selected items)".

### S7. The AI review table shows round-one confidence without saying so

The table gives Luna "Moderate" on claim 2, and the note below says Luna
"Raised its confidence to High". Claims 1 and 3 have the same pattern for
Opus and Sol. Label the column or the table "Round-one confidence".

### S8. Small wording

- Heading "Why the same seven is not answered here" → "Why the 'same seven' claim is not answered here".
- "laid it over to its meeting of October 6" → "put it off to its meeting of October 6".
- "Several budget-adjustment meetings in that period are not in the archive yet" → "...are not in our archive yet".
- Claim 2's share description cuts off at "would have dropped…". Once R4 is applied it will cut in the same place. Consider a shorter description for the share card.

### S9. Layout notes from the phone render

- Between the last finding row and the provenance line there are two
  hairlines with an empty band between them (phone-04, top).
- After a scroll back to the top, the "On this page" bar still showed
  "· Claims with no finding" (phone-08). This was seen in headless Chromium
  after a programmatic scroll and is not checked on a real device.

## Answers to the brief's questions, in brief

1. **Facebook arrival, first screen:** fails as built, because the pending
   banner pushes the answer below the fold. It would pass on placement at
   publication, but the answer itself misleads (R1).
2. **Stronger than the findings:** the standfirst's "Partly" on the pause
   question (R1), TL;DR bullets 1 and 3 (R2, R3), claim 1's flat "Version 1
   was a hold" (R4), and the procedural sentence (R6).
3. **Claim 2's version dependence beside its verdict:** yes, in the answer
   under the badge, on both the question and claim pages. It is undercut by
   the "first version" / "Version 1" naming clash (R4) and missing from the
   TL;DR (R3).
4. **Parked claim 4:** clear on the question page (explanation and TL;DR
   bullet 5). Its row under "Claims with no finding" carries no reason, and
   its claim page says it is waiting (R5). The seven-name vote list is a
   risk of an answer by implication (S2).
5. **Method jargon:** none in the standfirst or TL;DR. In lower layers:
   "reviewers" without "AI" (S3), the YAML links and "page SHA-256" (S5),
   "laid over" (S8). The AI review section keeps the site-wide boilerplate
   ("canonical finding", "deterministic rule"). The parked page's "Raised in
   extraction by Gemini 3.8 Flash, GPT-5.6 Luna" is the site-wide item left
   over from lanes S10.
6. **Links and anchors:** all resolve (597 checked). The article-history
   GitHub link resolves only after merge.
7. **Carried label:** the whole-document wording is clear and sits beside
   each affected source in the evidence list. The minutes wording is clear
   enough but gives no reason, is wrong for an agenda page, and contradicts
   "(full page)" (R7). It repeats too often (S4). It never gets in the way of
   the answer.

## Phone test (D-0046 rule 8)

Rendered: yes. `dist/` was served on 127.0.0.1 with `python3 -m http.server`.
Screenshots were taken with Playwright headless Chromium (installed into
this scratchpad), viewport 375 by 812, deviceScaleFactor 2, mobile and touch
on. A full-page capture is 26,459 css px tall.

Screenshots, all in
the critic's scratch directory (not committed):
- `phone-01-first-screen.png`: the first screen as built (1x, from the Playwright CLI)
- `phone-01-y0.png`, `phone-02-y812.png`, `phone-03-y1624.png`, `phone-04-y2436.png`: the first four screens
- `phone-05-no-finding.png`: "Claims with no finding" and the start of the evidence list
- `phone-06-sources.png`, `phone-07-sources-minutes.png`: whole-document and minutes labels
- `phone-08-first-screen-without-pending-banner.png`: the first screen with the pending banner removed, as at publication
- `phone-full.png`: the full page

**First screen, as built:** the pre-launch notice, masthead, "On this page"
bar and pending-review banner fill it. The title starts at about 650px, and
the question is cut off at the bottom edge. Neither the answer nor any
finding is visible. Within ten seconds I can say what the page is about, not
what the answer is.

**First screen at publication (banner removed):** the title, the question
and the standfirst all fit, with the standfirst ending at about 700 of
812px. Within ten seconds I could read "Partly. ... did not vote on the
City's proposal to review 14 bike routes." My cold-reader answer to "did
council pause the routes?" was "partly, I guess?", and I could not say what
part. That is R1. The first TL;DR bullet is on the second screen, and as
written it pushed me toward "they voted to stop it" (R2).

**Sources:** the whole-document label ("Reviewers read our archived copy
because the City's portal blocked automated access. All reviewers read the
same copy.") is clear on first read. The minutes label is understandable
("they only saw some items"), but I could not tell from it why, or why the
copies cannot be published. On the agenda page entry it says "minutes",
which is wrong (R7). The labels and their 64-character hashes make the
evidence list about five phone screens long. That is far below the answer,
so it does not get in its way.
