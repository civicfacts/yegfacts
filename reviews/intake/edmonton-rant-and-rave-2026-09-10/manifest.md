# Run manifest: whole-source intake, Edmonton Rant and Rave thread of 2026-09-10

Run of record, 2026-09-16 (UTC). Source
`intake/captures/edmonton-rant-and-rave-2026-09-10/`, 117 comments. Three
cheap seats from two vendors read the whole thread independently; one strong
seat merged their lists and grouped the result; two readers triaged it.

Run by Stew on the seat the founder designated as the Codex seat for this
session. The session itself ran in Claude Code on `claude-fable-5-1`, and
that is recorded here rather than the designation alone. What the designation
governs is the vendor split: the merge and grouping ran on the OpenAI strong
tier, the two triage readers on Anthropic models, and the session's own model
touched no seat output. It wrote the source note, the pseudonymisation, the
combining of the two readers under the section 4 rule, the register append,
the redaction, and these records.

`$WORK` is a scratch directory outside the repository holding the files each
seat was given: copies of the committed prompts, `thread.txt` (the capture
rendered by `scripts/intake-render-thread.ts`), `source-note.txt`, and the
assembled prompts. The seats were run from there so no project `CLAUDE.md`
entered their context. The user-level `~/.claude/CLAUDE.md` still reaches a
Claude seat in this arrangement, as it did in the first run. Codex printed
its own cross-project memory summary to stderr on start; stderr was kept out
of every committed file.

    npx tsx scripts/intake-render-thread.ts intake/captures/edmonton-rant-and-rave-2026-09-10/comments.jsonl
    # 117 comments, 0 with a parent outside the capture

Every assembled prompt is the committed prompt, then a heading "Source note"
with the paragraph recorded verbatim in `source-note.md`, then the material.

## The Google seat, and the first attempt

The first attempt, 2026-09-16T20:13:15Z, launched Haiku 4.5, gpt-5.6-luna
and Gemini 3.8 Flash under the prompts as committed at fe343fd, with the
source note carrying one extra sentence telling the seat to read the
prompt's "bike-lane spending argument" as this source's argument. Haiku
(2m51s, 25 claims) and luna (1m39s, 70 claims) returned. The Gemini seat:

    agy -p "Read $WORK/extract-prompt.txt and follow the instructions in it exactly. ..." \
      --model gemini-3.8-flash-high --add-dir $WORK \
      --dangerously-skip-permissions --sandbox --print-timeout 30m

- agy 1.2.4; 20:13:15Z to 20:30:09Z, exit 1, no output. stderr, in full:
  `error: Individual quota reached. Please upgrade your subscription to
  increase your limits. Resets in 164h0m42s.`
- A one-line probe on the same CLI and model afterwards ran to its print
  timeout with no output. The official Gemini CLI (`gemini` 0.51.0) on this
  machine refuses to authenticate: "This client is no longer supported for
  Gemini Code Assist for individuals".

The founder's decision the same evening: run on two vendors and say so. The
prompts were then changed (methodology v1.33) and every seat re-run; the two
first-attempt extractions were discarded and are not in this directory.

## Extraction seats (run of record)

All three received the same prompt: `prompts/intake-extract.md` as changed
for v1.33, the source note, then the rendered thread under a heading "The
thread" (`$WORK/extract-prompt.txt`, 26,798 bytes). Launched together at
2026-09-16T21:11:35Z.

### haiku

    cat $WORK/extract-prompt.txt | claude -p --model haiku

- Reported by the CLI: `Claude Haiku 4.5`
- Claude Code 2.1.273; effort: CLI default, none passed
- 21:11:35Z to 21:13:15Z (1m40s), exit 0, first attempt
- 35 claims, 51 forms; 35 claims and 51 forms after the quote gate

### sonnet

    cat $WORK/extract-prompt.txt | claude -p --model sonnet

- Reported by the CLI: `Claude (Sonnet 5, model ID claude-sonnet-5)`
- Claude Code 2.1.273; effort: CLI default, none passed
- 21:11:35Z to 21:19:12Z (7m37s), exit 0, first attempt
- 55 claims, 78 forms; 55 claims and 78 forms after the quote gate
- The seat added for the two-vendor run: a third reading of the thread from
  the vendor that has two cheap models, since the Google seat could not run.

### luna

    cat $WORK/extract-prompt.txt | codex exec -m gpt-5.6-luna \
      -c model_reasoning_effort=low --skip-git-repo-check -C $WORK

- Reported by the model in its output: `GPT-5.2`; the CLI ran `gpt-5.6-luna`
  (on the first attempt the same model wrote `GPT-5`)
- codex-cli 0.154.0; effort: low
- 21:11:35Z to 21:13:06Z (1m31s), exit 0, first attempt
- 55 claims, 89 forms; 54 claims and 87 forms after the quote gate

## Quote gate

    npx tsx scripts/intake-quote-gate.ts reviews/intake/edmonton-rant-and-rave-2026-09-10

Two forms thrown out, both from `luna`, one claim lost with them. Run before
the merge; the merge never saw a quote that fails.

## Merge

    cat $WORK/merge-prompt.txt | codex exec -m gpt-5.6-sol \
      -c model_reasoning_effort=high --skip-git-repo-check -C $WORK

- Model: `gpt-5.6-sol`, codex-cli 0.154.0, effort high, no web search (the
  merge does no research)
- 21:19:36Z to 21:32:00Z (12m24s), exit 0, first attempt
- Prompt: `prompts/intake-merge.md` (v1.33), the source note, the three
  extractions after the gate, and `intake/register.yaml` inlined; 223,021
  bytes
- 71 claims, 104 forms, 5 dropped extractor claims

## Coverage

    npx tsx scripts/intake-coverage.ts reviews/intake/edmonton-rant-and-rave-2026-09-10

144 extractor claims, every one accounted for and none both kept and dropped.
104 quotes checked against the capture, all exact. 26 extractor claims were
split across merged claims, which the check reports rather than counts as a
fault. Run before the redaction below; a re-run after it reports the one
redacted quote as not in the capture, by design.

## Grouping

    cat $WORK/group-prompt.txt | codex exec -m gpt-5.6-sol \
      -c model_reasoning_effort=high --skip-git-repo-check -C $WORK
    npx tsx scripts/intake-groups.ts reviews/intake/edmonton-rant-and-rave-2026-09-10

- Model: `gpt-5.6-sol`, effort high
- 21:33:04Z to 21:36:26Z (3m22s), exit 0, first attempt
- Prompt: `prompts/intake-group.md`, the source note, all 71 merged claims
- 21 questions, 71 claims, every merged claim placed once, no claim mixing
  sides; the check passed on the first pass

## Triage

Two readers, both Anthropic, the vendor the merge did not run on. Same
prompt: `prompts/intake-triage-batch.md`, the source note, the "ruling on
investigations" framing copied from the first run's story triage, then one
section per question with up to two wordings per claim
(`$WORK/triage-prompt.txt`, 29,489 bytes). Neither saw the other's answer.
Launched together at 21:36:53Z.

    cat $WORK/triage-prompt.txt | claude -p --model opus --effort high --allowedTools WebSearch
    cat $WORK/triage-prompt.txt | claude -p --model sonnet --effort high --allowedTools WebSearch

- opus: `Claude Opus 5 (claude-opus-5)`, high, 21:36:53Z to 21:38:20Z
  (1m27s), 21 decisions, 3 searches run and listed in its output
- sonnet: `Claude Sonnet 5 (claude-sonnet-5)`, high, 21:36:53Z to 21:40:35Z
  (3m42s), 21 decisions, searches listed in its output
- Agreed on 17 of 21. Combined: 17 GO, 2 PARK, 2 NO.

Combining rule, recorded in `triage-stories.md`: GO takes both readers or one
GO and one PARK; NO takes both; everything else parks, including a straight
GO against NO (D-0011's lean applied to selection). Where the readers agreed
the register carries the Opus reader's reason; where they split it carries
both, saying who wanted what.

## Redaction

Both readers declined one question on right-of-reply grounds. Before
commit, the merged claim id, the grouped claim id, the question id, the
proposition, the question text, the commenter's wording and one clause of a
reader's reason were replaced in `extract-haiku.*`, `extract-sonnet.*`,
`merged.*`, `groups.*`, `triage-*.raw.txt`, `triage-stories.*` with the
neutral ids and marked placeholders; each raw output carries a notice at the
top. Fingerprints of the seven strings are in
`intake/withheld-fingerprints.yaml` so `scripts/exposure-audit.ts` fails the
build if any of them reappears in a tracked file. The plain strings are in
the private board record only.

## Register

    npx tsx scripts/intake-register.ts reviews/intake/edmonton-rant-and-rave-2026-09-10

21 questions and 71 claims appended, with a `sources` entry carrying the five
set-aside propositions. Topics were assigned by hand from the vocabulary; the
nine questions only about waste collection carry none, there being no such
topic. Where one person argued on both sides of a question the generator
counts them on both, and the validator requires the sides to add up; the
editor's rule applied was the side the person gave more wordings to, a tie
going to the side of their first wording, which changed four questions'
splits and no totals. The two withheld rows were rewritten to the shape the
register documents: the question with a neutral text and a public reason,
the claim with no proposition, wording or variations, `names_person`,
`triage: no` and `ground: right-of-reply`. `npm run redirects` regenerated
`public/_redirects` for the new addresses. No existing entry was edited.

## Not done in this run

No brief, no panel, no story. Triage says which questions are worth a panel;
it does not schedule one.
