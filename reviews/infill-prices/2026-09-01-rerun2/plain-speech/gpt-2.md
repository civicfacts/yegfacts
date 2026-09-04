<!-- Plain-speech read 2 (stage 6, docs/DESIGN.md section 12). Reading seat: OpenAI, run as `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`; the model name in the report's own header is the reader's self-report, the pinned command is the record. Drafting seat: Claude Opus 5, Anthropic. The two are different vendors, which the stage requires. Run 2026-09-04 by Stew over the 2026-09-03 plain-speech rewrite, which covered thirty reader-facing strings across six questions and ten claims, so the read is keyed by string and not only by answer: question titles, standfirsts, claim questions, claim answers, the dated notes for claims and questions that came off the findings board, and one limitation. The package the reader received was the prompt, section 12 of docs/DESIGN.md, every old and new string with its claim id, finding, panel agreement and evidence basis, each claim's key facts and limitations, and docs/plain-speech-rewrite-2026-09-03.md, which is the trail the rewrite left. The reader passed 21 strings and rewrote 16. Of the 16: 5 adopted verbatim, 7 adopted in part or in substance with the wording changed, 4 rejected in writing under their own sections. The report is split across the seven review runs that produced the claims, one file per run, the way the 2026-09-03 read before it was; this file carries `infill-prices — title`, `infill-prices — standfirst`, `infill-prices — withdrawal note`, `ip-infill-affordable — question`, `ip-infill-affordable — answer`. The other sections are in reviews/active-transportation/2026-09-02-rerun/plain-speech/gpt-2.md, reviews/climate-targets/2026-09-01/plain-speech/gpt-2.md, reviews/electric-buses/2026-08-31/plain-speech/gpt-2.md, reviews/electric-buses/2026-09-01-rerun/plain-speech/gpt-2.md, reviews/fifteen-minute-districts/2026-09-01/plain-speech/gpt-2.md, reviews/infill-prices/2026-09-02-magnitude/plain-speech/gpt-2.md, reviews/winter-cycling/2026-09-01/plain-speech/gpt-2.md. Every section of the reader's report appears verbatim in exactly one of them, and each carries the reader's header and its closing line. -->


# Plain-speech read — 2026-09-03

- **Drafting seat:** Claude Opus 5, Anthropic
- **Reading seat:** Codex, GPT-5, OpenAI
- **Claims covered:** `at-100m-vs-snow`, `at-100m-vs-roads`, `climate-on-track`, `ebus-procurement-failure`, `ebus-82m-loss`, `ebus-cold-cities`, `districts-travel-restrictions`, `ip-teardown-price-gap`, `ip-infill-affordable`, `wc-too-cold`

### infill-prices — title

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** It asks rather than asserts the price relationship, and “far” preserves the magnitude issue.
4. **Has anything true been dropped?** No; the affordability claim remains a related question beneath it.

Clause accounting:

- **Old, kept:** Infill teardown prices remain the subject.
- **Draft, kept:** The new title asks the magnitude question without presuming an answer.
- **Draft, kept:** It has nine normalised words and satisfies the shared-source cap.

**OK**

### infill-prices — standfirst

1. **Would a person say this out loud?** Mostly.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** The absence of a public linkage record is carried. “How much more” presupposes that replacement housing costs more, which the finding does not establish.
4. **Has anything true been dropped?** The fixed median-income scope is weakened to the broader “middle income.”

Clause accounting:

- **Old, kept:** No published series links demolished houses with their replacements.
- **Old, kept:** The record cannot establish the price gap.
- **Old, kept:** The affordability question also remains unanswered.
- **Draft, dropped:** “How much more” is removed because it assumes the direction of an unestablished gap.
- **Draft, dropped:** “Middle income” is removed because it changes the declared median-income test.
- **Replacement, kept:** Both unanswered questions remain, without copying either answer.

**REWRITE**

> Public records do not connect Edmonton teardowns to later housing on the same lots, and they leave out prices and other costs a buyer would face. That leaves both the price gap and affordability unanswered.

**Editor, 2026-09-04: adopted in substance, wording changed.** Both of the
reader's findings are right and both are applied. "How much more the new housing
costs" presupposed that the new housing costs more, and direction is not
established here any more than magnitude is; it now reads "how the price of the
new housing compares". "A household on a middle income" was a different test
from the one the panel ran and now reads "a household on Edmonton's median
income", matching the claim question below it. The reader's own replacement is
not taken: "they leave out prices and other costs a buyer would face" describes
the assessment rolls as leaving out prices, and what the rolls carry is assessed
value, which is not the same thing and is not what the key facts say is
missing.

### infill-prices — withdrawal note

1. **Would a person say this out loud?** Mostly, though “claims on it” and “parked both” depend on editorial context.
2. **Does it stand alone?** Not fully; “it” has no antecedent for a reader arriving directly.
3. **Is every fact carried?** The two findings and missing records are carried. The rereading and board removal are editorial-process facts supplied with the note.
4. **Has anything true been dropped?** No; neither reason for withdrawal may be removed.

Clause accounting:

- **Old, kept:** Both claims are Not established.
- **Old, kept:** A further reading removed both from the board.
- **Old, kept:** The price-gap claim needs lot-by-lot linkage that has not been produced.
- **Old, kept:** No public record gives the cost of the housing replacing particular demolished homes.
- **Draft, dropped:** “Claims on it” and “parked” are replaced for clarity, not softened.
- **Draft, kept:** Both failures of the record remain explicit.

**REWRITE**

> Both claims about infill prices are Not established, and another reading removed both from the findings board. Sizing the price gap requires following each lot from the house that came down to what went up in its place, and nobody has built that record. No public record says what the housing that replaced particular demolished homes costs.

**Editor, 2026-09-04: rewrite adopted verbatim.** The reader fixed a pronoun
with no antecedent, named the two claims, and said plainly what "parked" meant,
which is that both came off the findings board. Nothing was softened: both
findings are still Not established in the first clause, both failures of the
record are still stated as failures of the record, and the sentence saying
nobody has built the linkage is intact.

### ip-infill-affordable — question

1. **Would a person say this out loud?** Nearly, but “spend 30 percent or more of it to buy” can sound like 30 percent of annual income is the purchase price.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** Median income and the 30 percent threshold are carried.
4. **Has anything true been dropped?** No, but the shelter-cost meaning has become less clear.

Clause accounting:

- **Old, kept:** The subject is housing built on Edmonton teardown lots.
- **Old, kept:** The household is at Edmonton’s median income.
- **Old, kept:** The threshold is 30 percent of income.
- **Draft, dropped:** “Spend … to buy” is replaced because it can be read as the home’s price rather than the cost of owning it.
- **Draft, kept:** The household-first structure remains.

**REWRITE**

> Would owning a home built on an Edmonton teardown lot cost a household on Edmonton's median income 30 percent or more of its income?

**Editor, 2026-09-04: rewrite adopted verbatim.** The reader caught an
imprecision older than this pass. "Spend 30 percent or more of it to buy" can be
read as 30 percent of a year's income being the purchase price, and the test is
the Statistics Canada shelter-cost threshold, which is what owning costs against
income. "Would owning a home built on an Edmonton teardown lot cost a household
on Edmonton's median income 30 percent or more of its income?" is the test the
panel ran. The declared median income and the 30 percent line both survive
untouched.

### ip-infill-affordable — answer

1. **Would a person say this out loud?** The opening does; the final clause sounds like a document avoiding the word “method.”
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** Yes, provided the missing item is the required monthly series, not the still-published weekly series.
4. **Has anything true been dropped?** No.

Clause accounting:

- **Old, kept:** The uncertain stance.
- **Old, kept:** The Bank of Canada stopped publishing the required monthly mortgage-rate series.
- **Old, kept:** No replacement rule was supplied.
- **Draft, dropped:** “Nothing was set down to use in its place” is passive and unnatural.
- **Draft, kept:** The household, median-income and teardown-home scope remain.

**REWRITE**

> Nobody can tell. The Bank of Canada stopped publishing the monthly mortgage rate needed to judge whether median-income households could afford homes on Edmonton teardown lots, and no replacement rate was chosen.

**Editor, 2026-09-04: adopted in substance, wording changed.** "Nothing was set
down to use in its place" was the reader's objection and it is a fair one. The
reader's replacement, "no replacement rate was chosen", names the wrong missing
thing: the Bank of Canada kept the weekly posted series, and what nobody wrote
down is the rule for deriving a price-month rate from it, which is what this
claim's missing-evidence list calls for. The answer now ends "and nobody set a
rule for using the weekly rate instead", which is that gap exactly. "Needed to
judge whether" is the reader's and is taken.

**Counts:** 21 strings passed and 16 rewritten. No single rule is broken by every string. The recurring failures are standfirsts repeating answers, questions relying on surrounding context, and wording that widens bounded evidence into universal claims.
