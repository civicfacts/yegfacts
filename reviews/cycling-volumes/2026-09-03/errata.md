# Errata and run notes: cycling-volumes, run 2026-09-03

Artifacts here are annotated, never edited. Each item names the file it
concerns and what a reader should not take from it.

## 1. The halted round 1, and the round it was replaced by

`round1-superseded/` holds the three reviews written against the brief at
sha256 `b222574225ea300f924240b715a7332398af5d905a2fc2596d6bc067e33ef700`.
Two of them raised a material framing concern, the brief was revised
under methodology v1.2, and round 1 was rerun on all three seats against
the brief at sha256
`86f4df04e2037914fe9dfe81f256f10266635420f8c6aae22a43a5b1d83289fc`.

**Nothing in `round1-superseded/` is part of this run's finding.** It is
kept because the concern that stopped the run is in it, and because a
reader checking the revision needs the answers that prompted it. The
canonical basis is `round1/`. `run.yaml` describes the rerun; the
manifest as it stood for the halted round is copied at
`round1-superseded/run.yaml`.

## 2. The Gemini seat produced no valid round 2

`run.yaml` records the Gemini seat's round 2 as `failed` after two
attempts. That is the second runner invocation: the seat was invoked
twice, made two attempts each under the runner's one-retry rule, and all
four outputs failed validation against `prompts/review-schema.json` on
the same two fields.

- `round2_notes.errors_in_other_reviews` was written as an array of
  objects (`reviewer`, `claim`, `error_type`, `citation_url`, `finding`)
  where the schema requires an array of strings. Present on all four
  attempts.
- `round2_notes.verdict_changes[0]` used `from_verdict`, `to_verdict` and
  `reason` where the schema requires `from`, `to` and `why`. Present on
  the second invocation.

The seat's round-1 output validated on its first attempt, and this same
seat has completed round 2 on earlier runs, so this is a serialisation
failure on this stage rather than a seat that could not do the work.

**What was lost, and what was not.** The last invalid output is kept
verbatim at `round2/gemini-invalid-output.txt`. It is not a review: it
did not validate, it is not loaded by any script, and no finding rests on
it. It is committed so this note can be checked rather than taken on
trust. Read against `round1/gemini.json`, its eight verdicts are
identical to that seat's round-1 verdicts, claim for claim, so nothing in
it would have moved a position even had it validated. What is genuinely
lost is that seat's cross-review of the other two: six findings it wrote
about their citations are in that file in a shape the pipeline cannot
read, and they were not put to the seats they concern.

**Why the run proceeds.** Since methodology v1.3 the canonical basis is
the three locked round-1 positions, which are complete and valid here;
round 2 is documented beside them and does not move a finding.
`synthesis.json` therefore records two round-2 positions rather than
three, and says so. A missing round 1 would have stopped the run; a
missing round 2 is a gap in the record, named here.

One thing in that file is worth recording on its own. Its single
`verdict_changes` entry reports `bike-lanes-look-empty` moving from Not
established to Contradicted, and gives the brief's revision as the
reason. That is a change across the halt, from the superseded round to
the rerun, not a change within the rerun: against its own round-1 answer
on the re-frozen brief, the seat did not move. A reader should not count
it as a cross-review position change.

## 3. Seven citations that did not archive as the document cited

`fetch-report.md` lists them with the seat, the claim and the role. Three
Statistics Canada Census Profile deep links return HTTP 200 over a "File
not found" body and carry the GPT seat's strong citations on both census
claims; four other URLs failed outright. Both census claims are carried
on other seats by StatCan tables that archived clean.
