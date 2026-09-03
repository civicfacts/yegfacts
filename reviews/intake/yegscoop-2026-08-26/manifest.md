# Run manifest: whole-source intake, Yegscoop thread of 2026-08-26

Pilot run, 2026-09-03. Source: `intake/captures/yegscoop-2026-08-26/`, 621
comments. Three cheap extractor seats read the whole thread independently; one
strong seat merged their three lists into propositions.

`$WORK` below is a scratch directory outside the repository holding the files
each seat was given: `intake-extract.md` and `intake-merge.md` (copies of the
committed prompts), `thread.txt` (the capture rendered by
`scripts/intake-render-thread.ts`), `extract-prompt.txt` (the extraction prompt
with the thread appended), and `merge-prompt.txt` (the merge prompt with the
three extractions, `intake/register.yaml` and the published claim questions
appended). The seats were run from there rather than from the repository so
that no project `CLAUDE.md` entered their context.

The thread was rendered with:

    npx tsx scripts/intake-render-thread.ts intake/captures/yegscoop-2026-08-26/comments.jsonl
    # 621 comments, 0 with a parent outside the capture

## Extraction seats

### haiku

    cat $WORK/extract-prompt.txt | claude -p --model haiku

- Model as reported by the CLI: `Claude (Haiku 4.5, version claude-haiku-4-5-20251001)`
- Effort: CLI default (no `--effort` passed)
- Start 2026-09-03T03:59:11Z, end 2026-09-03T04:01:25Z (2m14s)
- Exit 0, first attempt
- Raw output `extract-haiku.raw.txt`; the JSON needed a markdown fence and a
  model-identification line stripped, giving `extract-haiku.json`

### flash

    agy -p "<read $WORK/intake-extract.md, then $WORK/thread.txt, then follow the instructions>" \
      --model gemini-3.6-flash-low \
      --add-dir $WORK \
      --dangerously-skip-permissions \
      --sandbox \
      --print-timeout 30m

- Model as reported by the CLI: `Gemini 3.6 Flash (Low)`
- Effort: low, carried by the model id (`agy models` exposes flash at
  high/medium/low; low is the cheapest)
- **Attempt 1** — start 2026-09-03T03:59:13Z, end 2026-09-03T04:01:52Z
  (2m39s), exit 0, **recorded as a failure**. The command passed relative paths
  with `--add-dir .`; agy ran the turn from its own scratch directory and
  opened with "I searched the working directory … but the specified files
  `intake-extract.md` and `thread.txt` were not found", then answered anyway.
  A seat that reports it could not read its input is a failed seat, so it was
  retried. Kept as `superseded-flash-attempt1.raw.txt` and
  `superseded-flash-attempt1.json`. On later inspection the attempt-1
  extraction was in fact quote-clean (65 forms, 0 non-verbatim quotes, 0 bad
  comment indexes), so the failure it declared was not real — see the README's
  note on the flash seat.
- **Attempt 2** (the seat of record) — start 2026-09-03T04:02:31Z, end
  2026-09-03T04:02:44Z (13s), exit 0. Same command with `$WORK` given as an
  absolute path in both `--add-dir` and the prompt, and an instruction to stop
  rather than answer if the files could not be read.
- Raw output `extract-flash.raw.txt`; the JSON needed a
  model-identification line stripped, giving `extract-flash.json`

### luna

    cat $WORK/extract-prompt.txt | codex exec \
      --skip-git-repo-check \
      -m gpt-5.6-luna \
      -c model_reasoning_effort="low"

- Model as reported by the CLI: `model: gpt-5.6-luna`, `reasoning effort: low`,
  `OpenAI Codex v0.153.0` (the run header). The model's own text block names
  itself only as "GPT-5".
- Effort: low (`model_reasoning_effort="low"`)
- Start 2026-09-03T03:59:15Z, end 2026-09-03T04:02:33Z (3m18s)
- Exit 0, first attempt
- Raw output `extract-luna.raw.txt` (codex `-o` last message); the JSON needed
  a model-identification line stripped, giving `extract-luna.json`

The founder redirected the GPT seat from `gpt-5.4-mini` to `gpt-5.6-luna`
before any run started, so no superseded GPT run exists.

## Merge seat

    cat $WORK/merge-prompt.txt | claude -p --model opus --effort high

- Model: `opus` alias, effort `high`
- Start 2026-09-03T04:03:34Z, end 2026-09-03T04:17:56Z (14m22s)
- Exit 0, first attempt
- **The printed output was incomplete.** The answer ran past one assistant
  message: the model emitted 18,193 characters, hit its output cap, continued
  in a second message of 39,454, and `claude -p` printed only that second
  message — a JSON document with its opening 18 KB missing. The two blocks
  were rejoined from the session transcript, which stores each block trimmed,
  so one space was restored at the seam ("bike lanes to" + "bypass traffic
  queues"). Nothing else was altered. `merged.raw.txt` is the rejoined text as
  the model wrote it; `merged.json` is the same content, formatted. This is a
  real gap in the pipeline as specified: a merge whose answer is longer than
  one message cannot be captured from the CLI's stdout alone.

## Coverage check

    npx tsx scripts/intake-coverage.ts reviews/intake/yegscoop-2026-08-26

    intake-coverage: reviews/intake/yegscoop-2026-08-26

      flash      32 claims
      haiku      63 claims
      luna       60 claims
      total     155 extractor claims

      propositions        67
        found by 3 seats   17
        found by 2 seats   24
        found by 1 seat    26
      dropped             5

    intake-coverage: every extractor claim is accounted for exactly once

Exit 0.
