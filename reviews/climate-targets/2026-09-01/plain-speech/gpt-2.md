<!-- Plain-speech read 2 (stage 6, docs/DESIGN.md section 12). Reading seat: OpenAI, run as `codex exec -m gpt-5.6-sol -c model_reasoning_effort=high -s read-only --skip-git-repo-check`; the model name in the report's own header is the reader's self-report, the pinned command is the record. Drafting seat: Claude Opus 5, Anthropic. The two are different vendors, which the stage requires. Run 2026-09-04 by Stew over the 2026-09-03 plain-speech rewrite, which covered thirty reader-facing strings across six questions and ten claims, so the read is keyed by string and not only by answer: question titles, standfirsts, claim questions, claim answers, the dated notes for claims and questions that came off the findings board, and one limitation. The package the reader received was the prompt, section 12 of docs/DESIGN.md, every old and new string with its claim id, finding, panel agreement and evidence basis, each claim's key facts and limitations, and docs/plain-speech-rewrite-2026-09-03.md, which is the trail the rewrite left. The reader passed 21 strings and rewrote 16. Of the 16: 5 adopted verbatim, 7 adopted in part or in substance with the wording changed, 4 rejected in writing under their own sections. The report is split across the seven review runs that produced the claims, one file per run, the way the 2026-09-03 read before it was; this file carries `climate-targets — title`, `climate-targets — standfirst`, `climate-on-track — question`, `climate-on-track — answer`, `climate-on-track — board note`. The other sections are in reviews/active-transportation/2026-09-02-rerun/plain-speech/gpt-2.md, reviews/electric-buses/2026-08-31/plain-speech/gpt-2.md, reviews/electric-buses/2026-09-01-rerun/plain-speech/gpt-2.md, reviews/fifteen-minute-districts/2026-09-01/plain-speech/gpt-2.md, reviews/infill-prices/2026-09-01-rerun2/plain-speech/gpt-2.md, reviews/infill-prices/2026-09-02-magnitude/plain-speech/gpt-2.md, reviews/winter-cycling/2026-09-01/plain-speech/gpt-2.md. Every section of the reader's report appears verbatim in exactly one of them, and each carries the reader's header and its closing line. -->


# Plain-speech read — 2026-09-03

- **Drafting seat:** Claude Opus 5, Anthropic
- **Reading seat:** Codex, GPT-5, OpenAI
- **Claims covered:** `at-100m-vs-snow`, `at-100m-vs-roads`, `climate-on-track`, `ebus-procurement-failure`, `ebus-82m-loss`, `ebus-cold-cities`, `districts-travel-restrictions`, `ip-teardown-price-gap`, `ip-infill-affordable`, `wc-too-cold`

### climate-targets — title

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** It asserts no result, and its subject and present-tense scope are carried.
4. **Has anything true been dropped?** No.

Clause accounting:

- **Old, kept:** Edmonton’s climate targets remain the subject.
- **Draft, kept:** The noun phrase becomes the neutral question the claim answers.

**OK**

The resulting three-line stutter with the register wording and claim question is real, but changing a correct title to compensate would damage the wording. The page template should suppress the register line when it duplicates the title.

### climate-targets — standfirst

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** Yes.
4. **Has anything true been dropped?** No, but the draft repeats the claim answer in substantially the same words.

Clause accounting:

- **Old, moved to the answer:** The direct “not on track” conclusion is already the answer’s job.
- **Old, moved to the answer:** Council’s adoption of the targets remains in the answer and explanation.
- **Old, kept:** The 2024 community-emissions count was 3.0 million tonnes above the planned path.
- **Draft, dropped:** The near-verbatim restatement of “Edmonton is not on track” fails the separation required between standfirst and answer.
- **Draft, kept:** The community-wide scope and City-reported nature of the figure remain.

**REWRITE**

> The City's count of Edmonton's community emissions for 2024 was 3.0 million tonnes above the path set in its plan.

**Editor, 2026-09-04: rewrite rejected, in writing.** The reader would replace
the standfirst with "The City's count of Edmonton's community emissions for 2024
was 3.0 million tonnes above the path set in its plan", dropping "Edmonton is
not on track" as a repeat of the answer. That sentence is the second rule of
section 12 of docs/DESIGN.md and it is refused on the standard's own example:
"Say the finding, do not imply it. 'Edmonton is not on track' states it. 'The
latest inventory sits above its trajectory' makes the reader do the work." The
rewrite is that second sentence. The finding is Contradicted and the page's top
line may not stop stating it. On the duplication point the reader is describing
a risk the build measures directly: the repeated run between this standfirst and
this answer is under the in-page threshold and the audit passes it.

### climate-on-track — question

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** It asserts no finding, and the target scope is carried.
4. **Has anything true been dropped?** No.

Clause accounting:

- **Draft, kept:** The question asks one neutral, present-tense thing.

**OK**

### climate-on-track — answer

1. **Would a person say this out loud?** Yes.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** Yes.
4. **Has anything true been dropped?** No; the measured shortfall remains in the explanation.

Clause accounting:

- **Draft, kept:** The No stance.
- **Draft, kept:** The City’s own conclusion that Edmonton is off track.
- **Draft, kept:** Council is named as the body that adopted the targets.

**OK**

### climate-on-track — board note

1. **Would a person say this out loud?** Yes, including the deliberately blunt second sentence.
2. **Does it stand alone?** Yes.
3. **Is every fact carried?** The City’s prior off-track statement is carried. The lack of dispute and board test are editorial-process statements supplied with the note.
4. **Has anything true been dropped?** No.

Clause accounting:

- **Old, kept:** The City had already publicly said Edmonton was off track.
- **Old, kept:** The result could not have been surprising.
- **Old, kept:** Nobody was arguing about it, which is why it failed the board test.
- **Draft, kept:** “Already says” strengthens clarity without softening the admission.

**OK**

**Counts:** 21 strings passed and 16 rewritten. No single rule is broken by every string. The recurring failures are standfirsts repeating answers, questions relying on surrounding context, and wording that widens bounded evidence into universal claims.
