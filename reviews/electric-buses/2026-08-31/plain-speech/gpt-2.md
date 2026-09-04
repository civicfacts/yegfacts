<!-- Plain-speech read 2 (stage 6, docs/DESIGN.md section 12). Reading seat: OpenAI, run as `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`; the model name in the report's own header is the reader's self-report, the pinned command is the record. Drafting seat: Claude Opus 5, Anthropic. The two are different vendors, which the stage requires. Run 2026-09-04 by Stew over the 2026-09-03 plain-speech rewrite, which covered thirty reader-facing strings across six questions and ten claims, so the read is keyed by string and not only by answer: question titles, standfirsts, claim questions, claim answers, the dated notes for claims and questions that came off the findings board, and one limitation. The package the reader received was the prompt, section 12 of docs/DESIGN.md, every old and new string with its claim id, finding, panel agreement and evidence basis, each claim's key facts and limitations, and docs/plain-speech-rewrite-2026-09-03.md, which is the trail the rewrite left. The reader passed 21 strings and rewrote 16. Of the 16: 5 adopted verbatim, 7 adopted in part or in substance with the wording changed, 4 rejected in writing under their own sections. The report is split across the seven review runs that produced the claims, one file per run, the way the 2026-09-03 read before it was; this file carries `electric-buses — title`, `electric-buses — standfirst`, `ebus-82m-loss — question`, `ebus-82m-loss — answer`, `ebus-82m-loss — limitation`, `ebus-cold-cities — question`, `ebus-cold-cities — answer`. The other sections are in reviews/active-transportation/2026-09-02-rerun/plain-speech/gpt-2.md, reviews/climate-targets/2026-09-01/plain-speech/gpt-2.md, reviews/electric-buses/2026-09-01-rerun/plain-speech/gpt-2.md, reviews/fifteen-minute-districts/2026-09-01/plain-speech/gpt-2.md, reviews/infill-prices/2026-09-01-rerun2/plain-speech/gpt-2.md, reviews/infill-prices/2026-09-02-magnitude/plain-speech/gpt-2.md, reviews/winter-cycling/2026-09-01/plain-speech/gpt-2.md. Every section of the reader's report appears verbatim in exactly one of them, and each carries the reader's header and its closing line. -->


# Plain-speech read — 2026-09-03

- **Drafting seat:** Claude Opus 5, Anthropic
- **Reading seat:** Codex, GPT-5, OpenAI
- **Claims covered:** `at-100m-vs-snow`, `at-100m-vs-roads`, `climate-on-track`, `ebus-procurement-failure`, `ebus-82m-loss`, `ebus-cold-cities`, `districts-travel-restrictions`, `ip-teardown-price-gap`, `ip-infill-affordable`, `wc-too-cold`

### electric-buses — title

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** The procurement evidence carries that serious problems occurred.
4. **Has anything true been dropped?** No, but the wording presupposes a negative judgement before the claims appear.

Clause accounting:

- **Old, kept:** Edmonton’s electric buses remain the subject.
- **Draft, dropped:** “What went wrong” is removed because an `h1` should not frame every claim on the page as part of one established failure.
- **Draft, kept:** The title remains broad enough to introduce the procurement, loss and cold-city questions.

**REWRITE**

> What happened with Edmonton's electric buses?

The Supported procurement finding carries the proposition that something went wrong. It does not remove the editorial problem of placing that judgement in the page title while two other claims remain disputed or contradicted.

**Editor, 2026-09-04: rewrite adopted verbatim.** The title is now "What
happened with Edmonton's electric buses?" This was the drafter's own first
doubt and the reader landed on it for the reason the drafter feared. The
Supported procurement finding does carry that something went wrong, and the
reader says so; it is the other two claims that make the old title wrong. One of
them is Not established and one is Contradicted, and a heading that frames all
three as parts of a single established failure prejudges both of those before a
reader reaches them.

### electric-buses — standfirst

1. **Would a person say this out loud?** Mostly.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** Everything except the description “one bad contract,” which could mean defective contract terms rather than failed performance by one supplier.
4. **Has anything true been dropped?** No.

Clause accounting:

- **Old, kept:** City court filings say the buses missed contract requirements.
- **Old, kept:** The $82 million is a bankruptcy claim, not a demonstrated loss.
- **Old, kept:** One procurement failure does not establish failure across cold cities.
- **Draft, dropped:** “One bad contract” is ambiguous and not the finding.
- **Draft, kept:** The legal phrasing is otherwise made more conversational.

**REWRITE**

> Edmonton's own court filings say the buses fell short of the contract. The $82 million is what the City claimed in the supplier's bankruptcy rather than a proven loss, and one failed purchase from one supplier does not show that electric buses fail in cold cities.

**Editor, 2026-09-04: adopted in part.** "One bad contract" became "one failed
purchase from one supplier", which is the reader's finding and a real one: a bad
contract is ordinarily a contract with bad terms, and the finding is about a
supplier that did not deliver against terms the City's own filings rely on. The
rest of the rewrite is refused. "What the City claimed in the supplier's
bankruptcy rather than a proven loss" reverts two words this pass deliberately
replaced: "asked for" and "money it has shown it lost" are how a person says
"filed a proof of claim" and "established a net loss", and they put the burden
where Not established puts it.

### ebus-82m-loss — question

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** It asks rather than asserts the $82 million loss.
4. **Has anything true been dropped?** No.

Clause accounting:

- **Draft, kept:** The question asks exactly the disputed loss claim.

**OK**

### ebus-82m-loss — answer

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** Yes.
4. **Has anything true been dropped?** No; documented costs and residual value remain in the evidence and limitation.

Clause accounting:

- **Draft, kept:** The uncertain stance.
- **Draft, kept:** Edmonton filed an $82 million bankruptcy claim.
- **Draft, kept:** Filing that claim does not establish an $82 million loss.

**OK**

### ebus-82m-loss — limitation

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** Yes.
4. **Has anything true been dropped?** No; it refuses both a zero-loss conclusion and an established $82 million loss.

Clause accounting:

- **Old, kept:** Not established does not mean the loss was zero.
- **Old, kept:** Real and significant public costs are documented.
- **Old, kept:** No public record establishes a net loss of about $82 million.
- **Draft, kept:** The three shorter sentences preserve both boundaries without the banned punctuation.

**OK**

### ebus-cold-cities — question

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Not fully; “what happened in Edmonton” withholds the event the question relies on.
3. **Is every fact carried?** The record carries serious problems with Edmonton’s Proterra buses.
4. **Has anything true been dropped?** No; “prove” must remain because it preserves the claim’s strength.

Clause accounting:

- **Old, kept:** Edmonton’s experience remains the proposed proof.
- **Old, kept:** The proposition concerns electric buses in cold cities.
- **Old, kept:** The strong verb “prove” remains.
- **Draft, dropped:** “What happened” is replaced with the specific premise needed by a reader arriving cold.

**REWRITE**

> Do Edmonton's problems with Proterra buses prove that electric buses don't work in cold cities?

**Editor, 2026-09-04: rewrite adopted verbatim.** The question is now "Do
Edmonton's problems with Proterra buses prove that electric buses don't work in
cold cities?" The reader is right that "what happened in Edmonton" withholds
from a reader arriving cold the premise the question runs on. Proterra is
Edmonton's whole electric bus experience in this record, sixty buses on one
contract, so naming it narrows nothing. "Prove" survives, which is the word the
Contradicted finding is a finding against, and the reader said so unprompted.

### ebus-cold-cities — answer

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** Yes.
4. **Has anything true been dropped?** No; real winter range loss remains in the limitation.

Clause accounting:

- **Draft, kept:** The No stance.
- **Draft, kept:** Toronto found no fundamental technology barrier.
- **Draft, kept:** One Edmonton contract cannot settle the category-wide cold-city claim.

**OK**

**Counts:** 21 strings passed and 16 rewritten. No single rule is broken by every string. The recurring failures are standfirsts repeating answers, questions relying on surrounding context, and wording that widens bounded evidence into universal claims.
