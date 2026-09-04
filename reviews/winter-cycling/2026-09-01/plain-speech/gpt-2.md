<!-- Plain-speech read 2 (stage 6, docs/DESIGN.md section 12). Reading seat: OpenAI, run as `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`; the model name in the report's own header is the reader's self-report, the pinned command is the record. Drafting seat: Claude Opus 5, Anthropic. The two are different vendors, which the stage requires. Run 2026-09-04 by Stew over the 2026-09-03 plain-speech rewrite, which covered thirty reader-facing strings across six questions and ten claims, so the read is keyed by string and not only by answer: question titles, standfirsts, claim questions, claim answers, the dated notes for claims and questions that came off the findings board, and one limitation. The package the reader received was the prompt, section 12 of docs/DESIGN.md, every old and new string with its claim id, finding, panel agreement and evidence basis, each claim's key facts and limitations, and docs/plain-speech-rewrite-2026-09-03.md, which is the trail the rewrite left. The reader passed 21 strings and rewrote 16. Of the 16: 5 adopted verbatim, 7 adopted in part or in substance with the wording changed, 4 rejected in writing under their own sections. The report is split across the seven review runs that produced the claims, one file per run, the way the 2026-09-03 read before it was; this file carries `winter-cycling — title`, `winter-cycling — standfirst`, `wc-too-cold — question`, `wc-too-cold — answer`. The other sections are in reviews/active-transportation/2026-09-02-rerun/plain-speech/gpt-2.md, reviews/climate-targets/2026-09-01/plain-speech/gpt-2.md, reviews/electric-buses/2026-08-31/plain-speech/gpt-2.md, reviews/electric-buses/2026-09-01-rerun/plain-speech/gpt-2.md, reviews/fifteen-minute-districts/2026-09-01/plain-speech/gpt-2.md, reviews/infill-prices/2026-09-01-rerun2/plain-speech/gpt-2.md, reviews/infill-prices/2026-09-02-magnitude/plain-speech/gpt-2.md. Every section of the reader's report appears verbatim in exactly one of them, and each carries the reader's header and its closing line. -->


# Plain-speech read — 2026-09-03

- **Drafting seat:** Claude Opus 5, Anthropic
- **Reading seat:** Codex, GPT-5, OpenAI
- **Claims covered:** `at-100m-vs-snow`, `at-100m-vs-roads`, `climate-on-track`, `ebus-procurement-failure`, `ebus-82m-loss`, `ebus-cold-cities`, `districts-travel-restrictions`, `ip-teardown-price-gap`, `ip-infill-affordable`, `wc-too-cold`

### winter-cycling — title

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** It asks rather than asserts the cold-barrier claim.
4. **Has anything true been dropped?** No; “to work” preserves the claim’s meaningful-transportation threshold.

Clause accounting:

- **Old, kept:** Winter cycling in Edmonton remains the subject.
- **Draft, kept:** The noun phrase becomes the neutral question residents argue about.

**OK**

### winter-cycling — standfirst

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** No. The supplied facts do not establish what happens in every city that has counted, and “Edmonton has never measured” is stronger than the evidence that no citywide winter share is published.
4. **Has anything true been dropped?** No, but two bounded absences were widened into universal statements.

Clause accounting:

- **Old, dropped:** “Every city with measurements” is not carried by the supplied sample.
- **Old, kept:** A subarctic Finnish region supplies counter-evidence to cold being decisive.
- **Old, replaced:** “Never measured” becomes the supported claim that Edmonton does not publish winter cycling’s share of all trips.
- **Draft, dropped:** “Every city that has counted” repeats the unsupported universal.
- **Draft, moved to the answer:** Oulu’s exact winter performance remains the answer’s deciding fact.
- **Replacement, kept:** Winter cycling is observed locally and in cold comparators, while Edmonton lacks a published all-trips winter share.

**REWRITE**

> Cold weather reduces cycling, but Edmonton and Calgary still count winter riders, and Oulu shows that a northern city can sustain winter cycling. Edmonton publishes local counts, not winter cycling's share of all trips.

**Editor, 2026-09-04: adopted in part.** Both of the reader's findings are
right and both are applied. "Every city that has counted" claimed more than the
sample carries and now reads "each of the cities measured here", which is the
bound the TL;DR already uses. "Edmonton has never measured" is a claim about all
of history and the record supports the present tense; it now reads "Edmonton has
no measure of what share of its own trips are made by bike in winter", which is
this claim's own most important missing number. The reader's replacement is
refused: it drops "cold on its own does not settle the question", which is the
Contradicted finding stated rather than implied, and the standard requires the
finding to be stated.

### wc-too-cold — question

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** It asserts no result, and “unworkable” preserves the tested strength.
4. **Has anything true been dropped?** No.

Clause accounting:

- **Old, kept:** Edmonton’s winter is the proposed cause.
- **Old, kept:** The claim is that cycling is unworkable as meaningful transportation.
- **Draft, kept:** “A serious way of getting around” states that threshold in ordinary language.

**OK**

### wc-too-cold — answer

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** Yes.
4. **Has anything true been dropped?** No; Oulu’s unusual infrastructure and the thin evidence below extreme temperatures remain in the limitations.

Clause accounting:

- **Draft, kept:** The No stance.
- **Draft, kept:** Oulu residents make about one winter trip in ten by bicycle.
- **Draft, kept:** That result contradicts cold alone making cycling unworkable.

**OK**

**Counts:** 21 strings passed and 16 rewritten. No single rule is broken by every string. The recurring failures are standfirsts repeating answers, questions relying on surrounding context, and wording that widens bounded evidence into universal claims.
