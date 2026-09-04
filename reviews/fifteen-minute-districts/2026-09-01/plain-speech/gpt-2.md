<!-- Plain-speech read 2 (stage 6, docs/DESIGN.md section 12). Reading seat: OpenAI, run as `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`; the model name in the report's own header is the reader's self-report, the pinned command is the record. Drafting seat: Claude Opus 5, Anthropic. The two are different vendors, which the stage requires. Run 2026-09-04 by Stew over the 2026-09-03 plain-speech rewrite, which covered thirty reader-facing strings across six questions and ten claims, so the read is keyed by string and not only by answer: question titles, standfirsts, claim questions, claim answers, the dated notes for claims and questions that came off the findings board, and one limitation. The package the reader received was the prompt, section 12 of docs/DESIGN.md, every old and new string with its claim id, finding, panel agreement and evidence basis, each claim's key facts and limitations, and docs/plain-speech-rewrite-2026-09-03.md, which is the trail the rewrite left. The reader passed 21 strings and rewrote 16. Of the 16: 5 adopted verbatim, 7 adopted in part or in substance with the wording changed, 4 rejected in writing under their own sections. The report is split across the seven review runs that produced the claims, one file per run, the way the 2026-09-03 read before it was; this file carries `fifteen-minute-districts — title`, `fifteen-minute-districts — standfirst`, `districts-travel-restrictions — question`, `districts-travel-restrictions — answer`. The other sections are in reviews/active-transportation/2026-09-02-rerun/plain-speech/gpt-2.md, reviews/climate-targets/2026-09-01/plain-speech/gpt-2.md, reviews/electric-buses/2026-08-31/plain-speech/gpt-2.md, reviews/electric-buses/2026-09-01-rerun/plain-speech/gpt-2.md, reviews/infill-prices/2026-09-01-rerun2/plain-speech/gpt-2.md, reviews/infill-prices/2026-09-02-magnitude/plain-speech/gpt-2.md, reviews/winter-cycling/2026-09-01/plain-speech/gpt-2.md. Every section of the reader's report appears verbatim in exactly one of them, and each carries the reader's header and its closing line. -->


# Plain-speech read — 2026-09-03

- **Drafting seat:** Claude Opus 5, Anthropic
- **Reading seat:** Codex, GPT-5, OpenAI
- **Claims covered:** `at-100m-vs-snow`, `at-100m-vs-roads`, `climate-on-track`, `ebus-procurement-failure`, `ebus-82m-loss`, `ebus-cold-cities`, `districts-travel-restrictions`, `ip-teardown-price-gap`, `ip-infill-affordable`, `wc-too-cold`

### fifteen-minute-districts — title

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** It asks rather than asserts the travel-restriction claim.
4. **Has anything true been dropped?** No; the weaker mechanism form remains in the claim question.

Clause accounting:

- **Old, kept:** Edmonton’s 15-minute districts remain the subject.
- **Draft, kept:** The title becomes the neutral strong-form question.

**OK**

### fifteen-minute-districts — standfirst

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** “Planning rules” overstates instruments described in the evidence as statutory guidance.
4. **Has anything true been dropped?** No, but the draft repeats the answer’s vote and freedom-of-movement language almost verbatim.

Clause accounting:

- **Old, kept:** The plans concern land use.
- **Old, moved to the answer and key fact:** Council’s 12-to-0 amendment and the adopted quotation.
- **Draft, dropped:** “Planning rules” is replaced with “plans that guide land use.”
- **Draft, moved to the answer and key fact:** The vote and quoted clause should not duplicate the answer in the standfirst.
- **Replacement, kept:** The lack of any boundary permit, penalty or tracking mechanism comes directly from the key facts.

**REWRITE**

> Edmonton's district plans guide land use and call for more travel options within and across districts. They create no permit, penalty or tracking system for crossing a district boundary.

**Editor, 2026-09-04: adopted in part.** "Planning rules for how land gets used"
became "guide how land gets used", which is the reader's correction and is
carried by the adopting council report's own words, "to provide guidance for
land use, mobility and growth management". The rest of the rewrite is refused.
It removes Council's 12-0 amendment and the adopted clause it added, and puts in
their place "They create no permit, penalty or tracking system for crossing a
district boundary." That trades the strongest positive evidence on the page,
legislative text Council itself voted into the bylaw, for an unbounded absence
claim, and this claim's own limitations bound it: the panel read the District
Policy in full but sampled rather than exhaustively read the fifteen individual
District Plan bylaws. Section 12 of docs/DESIGN.md requires absence to be
bounded, and the quoted clause is not an absence.

### districts-travel-restrictions — question

1. **Would a person say this out loud?** Yes, but the joined alternatives make it cumbersome.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** It asserts no result, and both tested forms are grounded in the supplied scope.
4. **Has anything true been dropped?** No; both the present restriction and future mechanism forms must remain.

Clause accounting:

- **Old, kept:** Whether the plans currently restrict travel.
- **Old, kept:** Whether they create a mechanism that could enable restrictions.
- **Draft, split into a scoping sentence:** The weaker form remains load-bearing but should not turn the main question into two joined questions.
- **Draft, kept:** “Limit” and “set up something” use ordinary language.

**REWRITE**

> Do Edmonton's district plans limit where people can travel in the city? This also covers whether the plans set up a way to impose such limits later.

**Editor, 2026-09-04: adopted in substance, wording changed.** The reader's
split is taken: the headline question now asks the strong form alone and the
weak form follows as a scoping sentence, which is the shape at-100m-vs-snow and
at-100m-vs-roads already use and which satisfies the standard's rule that a
question asks one thing. The reader's second sentence, "This also covers whether
the plans set up a way to impose such limits later", became "We also tested
whether they set up a way to impose such limits later", for the same reason the
first person is kept on the two active-transportation questions above: it names
who did the thing.

### districts-travel-restrictions — answer

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** Yes.
4. **Has anything true been dropped?** The draft answers the strong form through the adopted clause but does not answer the weak mechanism form now stated explicitly in the question.

Clause accounting:

- **Old, moved to the explanation:** Council’s 12-to-0 vote and amendment remain important evidence.
- **Draft, moved to the explanation:** The same vote and freedom-of-movement clause belong directly below the answer.
- **Replacement, kept:** The No stance.
- **Replacement, kept:** The plans contain neither a travel limit nor a boundary-control mechanism.

**REWRITE**

> No. Edmonton's district plans neither limit travel nor create a permit, penalty or other control on crossing district boundaries.

**Editor, 2026-09-04: rewrite rejected, in writing.** The reader would replace
the answer with "No. Edmonton's district plans neither limit travel nor create a
permit, penalty or other control on crossing district boundaries." Two things
are wrong with it on the evidence.

It drops the deciding fact. The standard allows one supporting fact and only the
one that decides the answer, and what decides this one is that Council itself
voted 12 to 0 to write the prohibition into the bylaw before first reading. An
answer resting on what the documents do not contain is weaker than an answer
resting on what Council put in them.

It also hardens the weak form beyond the panel. On whether the plans set up a
mechanism, the panel's position is that a real travel restriction would need
separate instruments and new Council action, and this claim's limitations record
both that a future council could amend the clause and that the fifteen
individual District Plan bylaws were sampled rather than read line by line. A
flat "create no permit, penalty or other control" states more than that.

What was taken from the read is the objection behind it. The weak form was
implicit in the question and is now explicit, under the section above.

**Counts:** 21 strings passed and 16 rewritten. No single rule is broken by every string. The recurring failures are standfirsts repeating answers, questions relying on surrounding context, and wording that widens bounded evidence into universal claims.
