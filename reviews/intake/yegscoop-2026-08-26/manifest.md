# Run manifest: whole-source intake, Yegscoop thread of 2026-08-26

Run of record, 2026-09-03 (UTC). Source `intake/captures/yegscoop-2026-08-26/`,
621 comments. Three cheap seats read the whole thread independently; one strong
seat merged their lists; two seats triaged the result.

`$WORK` is a scratch directory outside the repository holding the files each
seat was given: copies of the committed prompts, `thread.txt` (the capture
rendered by `scripts/intake-render-thread.ts`), and the assembled prompts. The
seats were run from there so no project `CLAUDE.md` entered their context.

    npx tsx scripts/intake-render-thread.ts intake/captures/yegscoop-2026-08-26/comments.jsonl
    # 621 comments, 0 with a parent outside the capture

## Extraction seats

All three received the same prompt: `prompts/intake-extract.md` with the
rendered thread appended. All three ran concurrently.

### haiku

    cat $WORK/extract-prompt.txt | claude -p --model haiku

- Reported by the CLI: `Claude Haiku 4.5`
- Effort: CLI default, none passed
- 2026-09-03T04:32:46Z to 04:34:51Z (2m05s), exit 0, first attempt
- 42 claims, 58 forms as returned; 40 claims and 53 forms after the quote gate

### luna

    cat $WORK/extract-prompt.txt | codex exec -m gpt-5.6-luna \
      -c model_reasoning_effort=low --skip-git-repo-check

- Reported by the CLI: `gpt-5.6-luna`
- Effort: low
- Attempt 1 exited 1 at once: "Not inside a trusted directory and
  --skip-git-repo-check was not specified." No model call was made. Retried
  with the flag.
- Attempt 2, the seat of record: 2026-09-03T04:58Z to 05:00:40Z, exit 0
- 100 claims, 261 forms; 100 claims and 259 forms after the gate

### flash

    agy -p "<read $WORK/intake-extract.md, then $WORK/thread.txt, then follow the instructions>" \
      --model gemini-3.8-flash-high --add-dir $WORK \
      --dangerously-skip-permissions --sandbox --print-timeout 30m

- Reported by the CLI: `Gemini 3.8 Flash`
- Effort: high, carried by the model id
- 2026-09-03T04:32:46Z to 04:39:24Z (6m38s), exit 0, first attempt
- 90 claims, 273 forms; nothing thrown out by the gate

The `--dangerously-skip-permissions` flag inside the sandbox is D-0025, carried
over from the panel seats: this CLI cannot prompt for a tool permission in
headless mode and returns nothing instead.

## Quote gate

    npx tsx scripts/intake-quote-gate.ts reviews/intake/yegscoop-2026-08-26

Rewrites each extraction in place and writes `quote-gate.md`. Seven forms
thrown out, two claims lost with them. Run before the merge; the merge never
saw a quote that fails.

## Merge

    cat $WORK/merge-prompt.txt | claude -p --model opus --effort high \
      --output-format stream-json --verbose

- Reported by the CLI: `Claude Opus 5`
- Effort: high
- Run of record 2026-09-03T05:59:26Z to 06:25:01Z (25m35s), exit 0. An earlier
  merge of the same three extractions (05:13:01Z to 05:35:54Z) was discarded
  after an independent critique found it grouping by topic rather than by
  proposition; `prompts/intake-merge.md` gained the three bounds under
  "Merging" and this run replaced it
- Prompt: `prompts/intake-merge.md` with all three extractions,
  `intake/register.yaml` and the published claim questions inlined, 160 KB
- 112 propositions, 309 forms, 12 dropped extractor claims

The inputs are inlined rather than read from disk because a merge run with file
tools needs a permission the headless CLI cannot grant. `--output-format
stream-json` is what captures the whole answer: an earlier run of this stage
lost the first 18 KB of its JSON because plain `-p` prints only the final
assistant message.

## Coverage

    npx tsx scripts/intake-coverage.ts reviews/intake/yegscoop-2026-08-26

230 extractor claims, every one accounted for and none both kept and dropped.
309 quotes checked against the capture, all exact. One seat's claim was split
across three propositions, which the check reports rather than counts as a
fault: a compound claim is one the merge is required to separate.

## Triage

Two seats, both from a different vendor than the editor who runs the merge.
Same prompt, `prompts/intake-triage-batch.md` with all 99 propositions
appended. Neither saw the other's answer.

    cat $WORK/triage-prompt.txt | codex exec -m gpt-5.6-sol \
      -c model_reasoning_effort=high --skip-git-repo-check
    agy -p "<read $WORK/triage-prompt.txt and follow it>" --model gemini-3.1-pro-high \
      --add-dir $WORK --dangerously-skip-permissions --sandbox --print-timeout 30m

- sol: `gpt-5.6-sol`, high, 06:27Z to 06:30:49Z, 112 decisions
- gemini: `Gemini 3.1 Pro (High)`, 06:27Z to 06:31:01Z, 112 decisions
- Agreed on 78 of 112. Combined: 85 GO, 15 PARK, 12 NO.

An earlier pass over the discarded merge agreed on only 58 of 99. Same two
readers, same source: the agreement moved because what they were ruling on had
stopped being compounds. That earlier pass also declined a councillor's
recorded motions as a claim about a named individual, which is why the prompt
now states the named-person rule narrowly.

Combining rule, in `triage.md`: GO takes both readers or one GO and one PARK;
NO takes both; everything else parks, including a straight GO against NO. A
claim one reader would refuse does not jump the queue on the other reader's
word, and one reader's refusal does not discard it either. This is the lean the
verdict matrix takes (D-0011), applied to selection.

## Grouping

    cat $WORK/group-prompt.txt | claude -p --model opus --effort high \
      --output-format stream-json --verbose
    npx tsx scripts/intake-groups.ts reviews/intake/yegscoop-2026-08-26

- Reported by the CLI: `Claude Opus 5`, effort high
- 2026-09-03T15:49:30Z to 15:55:40Z (6m10s), exit 0
- Prompt: `prompts/intake-group.md` with all 112 propositions appended
- 34 investigations, 112 claims, every proposition placed once

The pass wrote its own slugs into `variations` instead of the proposition ids it
was given. Because the prompt requires a claim's wording to be copied verbatim,
all 112 mapped back to their propositions by exact wording and the references
were repaired deterministically rather than by another run; the check then
passed. `groups.raw.txt` holds what the seat actually printed.

An earlier version of this stage had the group itself carry one finding. Two
specialist reads rejected that (board record, reviews/2026-09-03-claim-
variations), so the prompt was rewritten to group twice and this run replaced
it.

## Story triage

Two seats again, ruling on investigations rather than on single claims.

    cat $WORK/triage-stories.txt | codex exec -m gpt-5.6-sol \
      -c model_reasoning_effort=high --skip-git-repo-check
    agy -p "<read $WORK/triage-stories.txt and follow it>" --model gemini-3.1-pro-high \
      --add-dir $WORK --dangerously-skip-permissions --sandbox --print-timeout 30m

- sol: `gpt-5.6-sol`, high, 34 decisions
- gemini: `Gemini 3.1 Pro (High)`, 34 decisions
- Agreed on 30 of 34. Combined: 32 GO, 1 PARK, 1 NO.

The sol seat echoed the example from its own prompt before answering, so the
combiner now takes the largest decisions array in a seat's output rather than
the first, and matches pretty-printed JSON as well as compact.

## Register

    npx tsx scripts/intake-register.ts reviews/intake/yegscoop-2026-08-26

110 new entries. Two propositions matched candidates already on the register,
the 15-minute-city agreement and lanes removed citywide; their captured
wordings were folded into those entries rather than registered a second time,
so a claim suggested twice meets the same answer. One declined proposition
carries a neutral id and its reason only, per the rule in the README.

## Not done in this run

No brief, no panel, no story. Triage says which claims are worth a panel; it
does not schedule one.
