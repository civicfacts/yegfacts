<!-- Plain-speech read 2 (stage 6, docs/DESIGN.md section 12). Reading seat: OpenAI, run as `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`; the model name in the report's own header is the reader's self-report, the pinned command is the record. Drafting seat: Claude Opus 5, Anthropic. The two are different vendors, which the stage requires. Run 2026-09-04 by Stew over the 2026-09-03 plain-speech rewrite, which covered thirty reader-facing strings across six questions and ten claims, so the read is keyed by string and not only by answer: question titles, standfirsts, claim questions, claim answers, the dated notes for claims and questions that came off the findings board, and one limitation. The package the reader received was the prompt, section 12 of docs/DESIGN.md, every old and new string with its claim id, finding, panel agreement and evidence basis, each claim's key facts and limitations, and docs/plain-speech-rewrite-2026-09-03.md, which is the trail the rewrite left. The reader passed 21 strings and rewrote 16. Of the 16: 5 adopted verbatim, 7 adopted in part or in substance with the wording changed, 4 rejected in writing under their own sections. The report is split across the seven review runs that produced the claims, one file per run, the way the 2026-09-03 read before it was; this file carries `ip-teardown-price-gap — question`, `ip-teardown-price-gap — answer`. The other sections are in reviews/active-transportation/2026-09-02-rerun/plain-speech/gpt-2.md, reviews/climate-targets/2026-09-01/plain-speech/gpt-2.md, reviews/electric-buses/2026-08-31/plain-speech/gpt-2.md, reviews/electric-buses/2026-09-01-rerun/plain-speech/gpt-2.md, reviews/fifteen-minute-districts/2026-09-01/plain-speech/gpt-2.md, reviews/infill-prices/2026-09-01-rerun2/plain-speech/gpt-2.md, reviews/winter-cycling/2026-09-01/plain-speech/gpt-2.md. Every section of the reader's report appears verbatim in exactly one of them, and each carries the reader's header and its closing line. -->


# Plain-speech read — 2026-09-03

- **Drafting seat:** Claude Opus 5, Anthropic
- **Reading seat:** Codex, GPT-5, OpenAI
- **Claims covered:** `at-100m-vs-snow`, `at-100m-vs-roads`, `climate-on-track`, `ebus-procurement-failure`, `ebus-82m-loss`, `ebus-cold-cities`, `districts-travel-restrictions`, `ip-teardown-price-gap`, `ip-infill-affordable`, `wc-too-cold`

### ip-teardown-price-gap — question

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** It asserts no result, and the fixed magnitude is preserved.
4. **Has anything true been dropped?** No.

Clause accounting:

- **Old, kept:** An Edmonton house is replaced after an infill teardown.
- **Old, kept:** The question asks whether the usual replacement is worth about three times as much.
- **Draft, kept:** “Torn down” and “usually” simplify the wording without moving the threshold.

**OK**

### ip-teardown-price-gap — answer

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** Yes; it makes the narrower statement about City records.
4. **Has anything true been dropped?** No; the absence of a wider published series remains in the explanation and limitation.

Clause accounting:

- **Draft, kept:** The uncertain stance.
- **Draft, kept:** City records do not follow a demolished house to its replacement.
- **Draft, kept:** Those records therefore cannot establish whether replacements are usually worth about three times as much.

**OK**

“The City’s records” should remain. Changing it to “nobody keeps a record” would make a broader assertion than this answer and the supplied evidence safely carry.

**Counts:** 21 strings passed and 16 rewritten. No single rule is broken by every string. The recurring failures are standfirsts repeating answers, questions relying on surrounding context, and wording that widens bounded evidence into universal claims.
