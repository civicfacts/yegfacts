<!-- Dispositions, 2026-09-24, by Stew (drafting seat Claude Opus 5.5).

Adopted: A, B, C, D, E, F, G, H, I, J. Not taken: K, a site-wide template change outside this page. No finding changed.

A. The standfirst drops "but" and "small" and states the fifteenth neutrally: "Edmonton rated part of its roads poor at the end of 2024, and the $100 million for bike lanes was about a fifteenth of the City's renewal shortfall."
B. TL;DR 3 now carries the eligibility finding and its uncertainty: "The $100 million was general tax-supported borrowing that road or alley renewal could have used, though one AI reviewer of three could not open the budget to check." "General" rather than "ordinary": the brief's term is general municipal capital funding, and a faithfulness seat earlier refused "ordinary" as unsourced.
C. A Partially supported reached from a Split panel now carries its own fixed gloss on every page that glosses a badge (src/lib/findings.ts, SPLIT_PARTIAL_TERM and findingGlossTerm, with a test): "The reviewers split, and the published rule resolves a split cautiously to this finding. It does not mean part of the claim was found to overreach." It is generic, so it also applies to the one other published split Partially supported, cv-counter-total-2026.
D. Claims can now carry wording_notes against their register wordings (schema, validator, both renderers). Councillor Rice's relayed priorities are omitted from infra-roads-condition's wordings with the reason recorded; the register is untouched. The three snow and grass wordings are labelled as not checked by this finding and sort after the roads wordings.
E. The eligibility answer: "Partly. The City's budget lists all $100 million as general borrowing that road or alley renewal could have used, but one of the three AI reviewers could not open that budget to check." The vendor split stays named in the claim's first limitation and in the explanation.
F. The shortfall answer: "Partly. The $100 million came to about a fifteenth of the renewal the City said it could not fund from 2023 to 2026, too much to dismiss and far short of a serious share." Reworded from the suggestion so it does not repeat the standfirst.
G. The page publishes on this branch: status published, the register question gate-complete and published, combined-evidence.json annotated by scripts/annotate-evidence.ts, and a published history entry naming every check and its report.
H. The active-transportation pointer now reads "now checked on its own page", and its changelog note no longer says pending review. Both off-board notes say "which the site checks as its own question" with no date, so the 2026-09-03 stamp stands alone.
I. "The brief" no longer appears undefined in the explanation: the lines are "fixed in advance" by "this check", and the broken "Neither does" now reads "it does not change the finding. Nor does ...".
J. "$100 million in all"; "$3,575,584 thousand (about $3.58 billion)" and "$1,945,673 thousand (about $1.95 billion)".

One further change the publication forced: the findings board repeats each claim's question title and verified date per row, and with this nine-word title on a three-claim question that tripped the duplication audit on / and /search. That row chrome is now marked data-pagefind-ignore in FindingsBoard.astro. The question page itself is indexed as before.

Plain speech: the top-layer edits are the standfirst, TL;DR 3 and the eligibility and shortfall answers, and no other top-layer text changed, so no second plain-speech read was run. -->

# Rendered-page critique, 2026-09-24, a Claude (Opus 5.5) session separate from the drafter, checkers and gate

Pages read, built with `npm run build` at 18eba72 in the `draft-infra`
worktree: `dist/questions/infrastructure-deficit.html`, the three claim pages
it links (`dist/claims/infra-roads-condition.html`,
`infra-bike-money-renewal-eligible.html`,
`infra-hundred-million-vs-shortfall.html`) and
`dist/questions/active-transportation.html`, whose pointer to this question
changed. Read against docs/DESIGN.md §12 and its page order (D-0039).

Four findings are REQUIRED. Two of them are about the top layer: the
standfirst calls the money "small", which reads as the rebuttal the finding
does not make, and the TL;DR never says what the renewal-eligibility finding
found. The other two REQUIRED findings are the "overreaches" gloss on a
Partially supported that comes from a vendor split, and a named councillor's
quote presented as a wording of the roads claim. The stale article-history
entry is REQUIRED if this branch publishes the page. Everything else is
SUGGESTED.

What passed: the page order follows D-0039 for a multi-claim question
(title, standfirst, TL;DR, then the verdict strip, then provenance). Nothing
sits between the answer and the TL;DR. The roads rating is dated wherever it
appears, including the standfirst and TL;DR bullet 2. The two OpenAI seats are
never presented as independent agreement: the strip's panel label, both
Unanimous glosses and the split explanation all say so. Drainage and the
"should council have" question are excluded in the TL;DR and in their own
section. A script check found no broken internal links or anchors and no empty
sections on any of the five pages.

## 1. Ten-second test

Title, standfirst and TL;DR as rendered:

> Is Edmonton letting roads go while funding bike lanes?
> Is Edmonton letting roads, alleys and drainage go while it funds bike lanes?
> Edmonton rated part of its roads poor at the end of 2024, but the $100
> million for bike lanes was small beside the City's renewal shortfall.
>
> - About a ninth of Edmonton's roads, by what they would cost to replace, were rated poor or very poor at the end of 2024.
> - The City's ratings are older than the argument, so they cannot show how the roads looked in August 2026.
> - Council approved $100 million in borrowing for bike lanes, to be repaid through taxes.
> - The bike-lane budget was about a fifteenth of the City's shortfall for renewing its existing infrastructure.
> - This page does not check drainage, or whether council should have spent the money differently.

What the resident would say: "Some roads were in bad shape a couple of years
ago, but the bike money was tiny next to the backlog, so bike lanes aren't why
the roads are bad." Three parts of that are wrong:

- "Tiny" is wrong. The finding is that $100 million is a real fraction of the
  shortfall, above the line the check set for "too small to count" and well
  below "serious". See finding A.
- "So bike lanes aren't why" is an answer to the question's causal claim,
  which the page says it does not answer. The standfirst's "but" builds that
  inference. See finding A.
- The resident learns nothing about whether the money could have gone to
  roads, which is one of the three findings and the one closest to the
  argument. See finding B.

The dated rating and the drainage exclusion come through correctly.

## Findings

### A. REQUIRED: the standfirst's "small" and "but" read as a rebuttal

> Edmonton rated part of its roads poor at the end of 2024, but the $100
> million for bike lanes was small beside the City's renewal shortfall.

Why it misleads. The shortfall finding is Partially supported because the
money "is a real fraction of the shortfall and well short of a serious one"
(explanation). The check's own line for "too small to count" was a twentieth,
and the money is a fifteenth. "Small" is the reading on the Contradicted side
of that line. The "X, but Y" shape also sets the two findings against each
other, as if the second answered the first. A resident reads it as "the
roads are bad, but not because of bike lanes". Nothing on the page supports
that, and "What this page does not answer" disclaims it. A skeptic against the
bike spending would call this sentence the site taking a side.

Proposed fix: state both facts without the contrast and without "small".
For example: "Edmonton rated about a ninth of its roads poor at the end of
2024, and the $100 million for bike lanes was about a fifteenth of what the
City says it lacks for renewal." If the standfirst can carry only one number,
drop the ninth, which TL;DR bullet 1 already carries, and keep the fifteenth.

### B. REQUIRED: the TL;DR leaves out the renewal-eligibility finding

> Council approved $100 million in borrowing for bike lanes, to be repaid
> through taxes.

Why it misleads. This bullet is the only place the second finding reaches the
top layer, and it states the funding source without the finding. A resident
cannot get from "borrowing repaid through taxes" to "the City's own budget
treats this as general money that could have gone to road or alley renewal,
and the panel split on it". That finding is the one that most supports the
argument the page is about. Leaving it implicit in the top layer, while the
standfirst carries the finding that cuts the other way, is what a skeptic
against the bike spending would point to as slant.

Proposed fix: make the bullet carry the finding, with its uncertainty in the
same plain terms. For example: "The City paid for the $100 million with
ordinary borrowing that was not tied to bike lanes when council approved it,
so it could have gone to road or alley renewal instead." If the split must
show at this depth, add: "One of the three AI reviewers could not open the
budget to check this." The vote, the growth classification and the bylaw stay
in the explanation, where they are now.

### C. REQUIRED: "as stated it overreaches" misdescribes the split finding

On the question page's verdict strip, its Claims checked list and the claim
page, the badge for `infra-bike-money-renewal-eligible` carries the fixed
gloss:

> Partially supported
> Part holds; as stated it overreaches.

Why it misleads. This Partially supported does not come from part of the
claim overreaching. It comes from the fixed rule combining one Not
established with two Supported. The page itself says the documents match the
OpenAI seats' account. A reader who opens the gloss is told the claim went
too far, which no seat and no document says. Beside it, the answer's "Partly."
invites the same wrong reading.

Proposed fix: where the finding came from a split, gloss the badge as what
happened. For example: "The reviewers disagreed, and the published rule gives
this finding for that combination." This is a template change for every
split-derived Partially supported, not only this claim. If a site-wide change
is out of scope for this batch, the claim's answer should say why it is
Partly without relying on the gloss (see finding E).

### D. REQUIRED: a named councillor's words are listed as a wording of the roads claim

Under `infra-roads-condition` (question page and claim page), "Also said as —
11 captured wordings" includes:

> What you DID tell me: Fix our roads and sidewalks. Improve snow clearing.
> Community safety. Quality of life.
> Councillor Jennifer Rice

Why it misleads. The councillor is reporting what residents told her their
priorities were. She is not asserting that the roads are in poor condition.
Listing her by name as someone who made the claim misstates what a named
public official said. Several other wordings in the same list are about snow
and grass ("The city can't even cut the grass or remove snow", "Try removing
the snow."), which this finding does not check and which the page sends to a
separate question. The list's first entry is one of these, so the first
"wording" of a roads-condition claim a reader meets is about grass and snow.

Proposed fix: drop the councillor's quote from this claim's wordings, or show
it only under a register claim it actually states. Show the roads and
pothole wordings under this finding, and leave the snow and grass wordings to
the register claim, or give them a label saying this finding does not check
them.

### E. SUGGESTED: the split claim's answer names vendors and leaves out the record

> Partly. Council approved all $100 million for bike lanes as borrowing
> repaid through taxes, which the two OpenAI reviewers found could have gone
> to road or alley renewal and the Anthropic reviewer could not check.

Why it fails. It is accurate, and it avoids the two-against-one framing. But
it leads with vendors, which are method words at the answer layer, and it is
one long sentence carrying two ideas. It also leaves out the fact that decides
the question: the City's own profile sheet and minutes name one source,
general borrowing, with no restriction. A reader of the strip alone sees an
unresolved two-to-one, when what actually happened is that one reviewer could
not open the file.

Proposed fix: "Partly. The City's budget lists all $100 million as ordinary
borrowing that could have gone to road or alley renewal, but one of the three
AI reviewers could not open that budget, and the published rule turns that
disagreement into Partly." If that is too long for the plain-speech rule,
leave out the clause about the rule and rely on a corrected gloss (finding C).

### F. SUGGESTED: the shortfall answer does not say what "Partly" means

> Partly. The City's $100 million for bike lanes was about a fifteenth of
> what it said it lacked for renewing its existing infrastructure from 2023
> to 2026.

Why it fails. The question asks whether the money was "a serious share". A
resident reads "Partly" and a fifteenth and cannot tell whether a fifteenth
counts as serious. The answer states the figure but not the finding (DESIGN
§12 rule 2).

Proposed fix: add the judgement in plain words. For example: "Partly. The
$100 million was about a fifteenth of what the City said it lacked for
renewal from 2023 to 2026, too much to dismiss and far short of a serious
share."

### G. REQUIRED if this branch publishes the page, otherwise SUGGESTED: stale process text

Article history:

> Drafted from the panel run of 2026-09-24 and deployed for review ahead of
> the faithfulness check, the plain-speech read and the publication gate.

Banner on the question page and all three claim pages:

> the publication gate is not finished: the cited sources have not all been
> checked against their archived bytes, and the wording has not had a final
> edit.

Why it fails. The branch now carries the faithfulness reports, the
plain-speech read and the gate reports (`gate/source-verification.md`,
`gate/release-check.md`). The history entry says those checks are still to
come. If the page publishes in this state, its only history entry describes
checks that have not run, which is false. If `status: pending-review` is being
kept on purpose, the banner is correct, but the history still needs an entry
for the checks.

Proposed fix: add a history entry recording the faithfulness check, the
plain-speech read and the gate, with what each changed. When the page
publishes, flip `status` so the banner goes.

### H. SUGGESTED: the active-transportation pointer and notes will go stale, and one carries a date that contradicts its stamp

On the active-transportation page:

> that is a separate question, now checked on its own page with its findings
> awaiting review

and both off-board notes, each stamped "Off the board · 2026-09-03", say:

> which the site checked as its own question on 2026-09-24 and does not
> settle here.

Why it fails. "Awaiting review" becomes false as soon as the question
publishes, and nothing links the two changes. A note stamped 2026-09-03 that
describes something done on 2026-09-24 shows two dates that contradict each
other. The question page's own "as of" is 2026-09-03, so a reader now has two
dates for one check. The pointer's link text now matches the new title. The
active-transportation changelog records the change honestly.

Proposed fix: drop "with its findings awaiting review" from the pointer, or
change it in the same PR that publishes the question. In the two notes, say
"which the site checks as its own question" with no date, or give the note a
2026-09-24 stamp if the template allows one.

### I. SUGGESTED: method words and a broken sentence in the explanation

> The brief drew its lines in advance, a quarter rated poor for yes and a
> tenth for no

> The brief set a quarter of the shortfall as a serious share

"The brief" appears in the ten-minute layer without a definition. A
journalist can guess what it means. A resident cannot.

> That check is ours, and the finding stays where the rule put it. Neither
> does the Anthropic seat's second answer, in which it found another City
> record ... and moved to supported

"Neither does" refers back to a verb, "change the finding", that the sentence
before it never uses, so the reader has to go back to parse it.

Proposed fix: "Before any figure was seen, this check fixed its lines: a
quarter rated poor would mean yes, under a tenth would mean no." For the
second: "That check is ours, and it does not change the finding. Nor does the
Anthropic seat's second answer, ..."

### J. SUGGESTED: figures without a unit in claim detail

> ... Tax-Supported Debt, at 5,950, 26,750, 33,650 and 33,650 thousand dollars
> for 2023 to 2026, 100,000 in all.

> ... ideal renewal investment for those four years at $3,575,584 thousand

Why it fails. "100,000 in all" has no unit, so it reads as $100,000.
"$3,575,584 thousand" is the budget book's notation, which the claim-detail
layer can keep, but it needs the plain figure beside it.

Proposed fix: "$100 million in all". Give "$3,575,584 thousand (about $3.58
billion)" and "$1,945,673 thousand (about $1.95 billion)".

### K. SUGGESTED, site-wide: two near-identical questions are stacked under the title

> Is Edmonton letting roads go while funding bike lanes?
> Is Edmonton letting roads, alleys and drainage go while it funds bike lanes?

Why it fails. The second line repeats the first with two words added and
another verb form, and it takes the first ten seconds. The active-transportation
page has the same pattern, so it comes from the template. Here the second line
also names drainage, which the page does not check, and a reader sees that
before the TL;DR says so.

Proposed fix: no change on this page. For the template: show the register
wording only where it differs in substance, or label it, for example "As
people asked it:".

## Skeptic reads, both sides

- Against the bike spending: finding A (the standfirst's "small ... but"),
  finding B (the eligibility finding is missing from the top layer) and
  finding C (a gloss saying the claim "overreaches"). Together they make the
  top of the page lean toward the bike lanes. Fixing A to C removes that.
- For the bike spending: the page reports the growth classification, the
  borrowing bylaw, the $430,000 that moved from bikes to alley renewal, and
  that no reviewer found a transfer out of renewal into bike lanes. Under the
  roads finding it says 11.2 per cent sits only just above the lower line and
  that neither line comes from a published standard. I found nothing on this
  side that needs a fix. Finding D affects both sides, because it credits a
  named official with a claim she did not make.
