<!-- Plain-speech read 2 (stage 6, docs/DESIGN.md section 12). Reading seat: OpenAI, run as `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`; the model name in the report's own header is the reader's self-report, the pinned command is the record. Drafting seat: Claude Opus 5, Anthropic. The two are different vendors, which the stage requires. Run 2026-09-04 by Stew over the 2026-09-03 plain-speech rewrite, which covered thirty reader-facing strings across six questions and ten claims, so the read is keyed by string and not only by answer: question titles, standfirsts, claim questions, claim answers, the dated notes for claims and questions that came off the findings board, and one limitation. The package the reader received was the prompt, section 12 of docs/DESIGN.md, every old and new string with its claim id, finding, panel agreement and evidence basis, each claim's key facts and limitations, and docs/plain-speech-rewrite-2026-09-03.md, which is the trail the rewrite left. The reader passed 21 strings and rewrote 16. Of the 16: 5 adopted verbatim, 7 adopted in part or in substance with the wording changed, 4 rejected in writing under their own sections. The report is split across the seven review runs that produced the claims, one file per run, the way the 2026-09-03 read before it was; this file carries `ebus-procurement-failure — question`, `ebus-procurement-failure — answer`. The other sections are in reviews/active-transportation/2026-09-02-rerun/plain-speech/gpt-2.md, reviews/climate-targets/2026-09-01/plain-speech/gpt-2.md, reviews/electric-buses/2026-08-31/plain-speech/gpt-2.md, reviews/fifteen-minute-districts/2026-09-01/plain-speech/gpt-2.md, reviews/infill-prices/2026-09-01-rerun2/plain-speech/gpt-2.md, reviews/infill-prices/2026-09-02-magnitude/plain-speech/gpt-2.md, reviews/winter-cycling/2026-09-01/plain-speech/gpt-2.md. Every section of the reader's report appears verbatim in exactly one of them, and each carries the reader's header and its closing line. -->


# Plain-speech read — 2026-09-03

- **Drafting seat:** Claude Opus 5, Anthropic
- **Reading seat:** Codex, GPT-5, OpenAI
- **Claims covered:** `at-100m-vs-snow`, `at-100m-vs-roads`, `climate-on-track`, `ebus-procurement-failure`, `ebus-82m-loss`, `ebus-cold-cities`, `districts-travel-restrictions`, `ip-teardown-price-gap`, `ip-infill-affordable`, `wc-too-cold`

### ebus-procurement-failure — question

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** It asserts no result; the contract and substantial-shortfall scope are carried.
4. **Has anything true been dropped?** No.

Clause accounting:

- **Old, kept:** Edmonton, Proterra buses and the City contract remain named.
- **Old, kept:** The substantial-failure threshold remains as “fall well short.”
- **Draft, kept:** The new wording is plainer without weakening the tested claim.

**OK**

### ebus-procurement-failure — answer

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** Yes; it attributes the figures to Edmonton’s bankruptcy filing.
4. **Has anything true been dropped?** No; other contract failures and the buses’ continued service remain below.

Clause accounting:

- **Draft, kept:** The Yes stance.
- **Draft, kept:** The winter average of about 165 kilometres.
- **Draft, kept:** The guaranteed 268 kilometres in extreme cold.

**OK**

**Counts:** 21 strings passed and 16 rewritten. No single rule is broken by every string. The recurring failures are standfirsts repeating answers, questions relying on surrounding context, and wording that widens bounded evidence into universal claims.
