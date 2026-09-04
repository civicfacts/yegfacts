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

## 2. The Gemini seat's round 2, failed then recovered

**Read item 2a first.** The account below is what the record held before
the cross-review prompt was corrected, and it is kept unedited because it
is what a reader checking the failure needs. `round2/gemini.json` now
holds a valid review from that seat; the file described below,
`round2/gemini-invalid-output.txt`, is still committed and is still not a
review.

### 2a. What happened afterwards

`prompts/cross-review.md` was read against `prompts/review-schema.json`
and found underspecified on exactly the two fields that failed. Round 1's
prompt hands the seat every value the schema constrains, verbatim; round
2's named two fields and specified the shape of neither, asked for "the
reason" where the schema's key is `why`, and asked for four attributes
per error in a field the schema types as one bare string. The prompt was
corrected under methodology v1.21; the schema was not touched. The run
record's "Stage 7" has the reasoning in full.

The seat was then re-run once on the same round-2 package construction
under the amended prompt and **validated on its first attempt**. Five
cross-review findings came back: four of the six items in the invalid
output and one new one. The two items not recovered are the two that were
corrections to its own round 1 rather than findings about another seat,
which the valid pass correctly left out of a field named
`errors_in_other_reviews`. They are still readable in the invalid file:
its round-1 citation of `tq23-qn4m` for the 2014 Insight Community survey,
which belongs to `nhbh-yj57`, and its round-1 "1.1 percent, about 4,600"
bicycle-commuter figure for 2016, where the census records 5,575 of
466,230.

**The manifest row that recorded the failure**, replaced by the re-run
because `record-run.ts` keeps one row per seat per round, quoted here so
it is not lost:

    - provider: google
      round: 2
      command: agy --effort high --sandbox --dangerously-skip-permissions --print-timeout 45m -p "$(cat package.md)"
      cli_version: 1.1.25
      model_id: gemini-3.1-pro
      seat: Gemini 3.1 Pro
      reasoning_effort: high
      prompt_sha256: b41d6f5257989238596508385a198a4d03d5ddef5e77866a652fbf0c71d95cef
      methodology_version: "1.20"
      started_at: 2026-09-04T02:42:28Z
      finished_at: 2026-09-04T02:51:49Z
      attempts: 2
      status: failed

**The anachronistic `verdict_changes` entry survived into the valid
file.** Its single entry still reports `bike-lanes-look-empty` moving
from Not established to Contradicted and gives the brief's revision as
the reason. That is a change across the halt, from the superseded round
to the rerun, not a change within the rerun: against its own round-1
answer on the re-frozen brief the seat did not move, and `round1/gemini.json`
records Contradicted. `synthesize.ts` prefers a seat's self-reported
`from` over the committed round-1 file, so `synthesis.json` carries
`changed_from: "Not established"` for that seat on that claim. **It is
wrong, and a drafter must not report it as a cross-review position
change.** The committed round-1 file is the authority; a seat's account of
its own earlier verdict is not.

The two sentences above about `synthesize.ts` describe the script as it
stood when this was written. It was corrected under methodology v1.23 and
the false entry is gone; **item 5** below says what the bug allowed and
what replaced it.

### 2b. The failure as the record held it

Written before the re-run, and left as written. Its present tense
describes the record as it stood then: `run.yaml` now carries the
successful row, and the failed one is quoted above.

`run.yaml` recorded the Gemini seat's round 2 as `failed` after two
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

**All seven were resolved before drafting**, and `fetch-report.md`'s
"Resolutions" section names each with the cited form and the archived
form. Two were never unarchivable: the staging script's ten-second
whole-request deadline was cancelling downloads in progress, and it is
now sixty seconds. Five have a stable archived form. Two cannot be
archived at all — the CBC article, which the publisher refuses to the
archiver's user agent, and a paywalled *Urban Geography* article — and
`fetch-report.md` says which claim each supports and how much of it
rests on them, which in both cases is nothing.

## 4. Claim 1 was answered twice, blind, and the second answers are the basis

`round1-rerun-1/` holds a fresh blind round 1 on
`cycling-trips-1-3-million-2026` alone, run under methodology v1.22 after
round 2 caught one seat resting its verdict on a developer-portal page
rather than the dataset. The frozen brief is unchanged and its hash still
verifies; only the package wrapper differs, naming the one claim to
answer.

**For that claim, `round1/` is the superseded record.** It is not edited
and not deleted, and it remains the canonical basis for the other seven
claims. `synthesis.json` names each claim's basis, so no reader has to
infer which. The re-run's own manifest, with its seat commands and its
own `prompt_sha256`, is `round1-rerun-1/run.yaml`.

**The finding did not change.** All three seats returned what they had
returned before, so the multiset and therefore the verdict and the panel
agreement are the same. The run record's "Stage 6" says what that means
and why it is worth having anyway.

## 5. The self-report the synthesis believed, and the fix

Item 2a records that `synthesis.json` carried
`changed_from: "Not established"` for the Gemini seat on
`bike-lanes-look-empty`, from that seat's own round-2 `verdict_changes`
entry, against a committed round 1 that says Contradicted. The entry is
gone. It was not edited out: `scripts/synthesize.ts` was corrected under
methodology v1.23 and the synthesis regenerated from the same committed
files, which is the only way a deterministic artifact is allowed to
change.

**What the code did.** It computed a reviewer's prior verdict as
`round2_notes.verdict_changes[].from` — the seat's own account — and fell
back to the committed round-1 file only when the seat had claimed
nothing. So a seat's self-report outranked the record, and a movement
nobody made was published as one.

**What it does now.** Movement is read file against file. Where a seat's
`from` disagrees with the committed round, the file decides and the
seat's claim is written out on the same position as
`disputed_self_report`, carrying what it claimed, what the file says and
the reason it gave. A seat misdescribing its own prior verdict is a fact
about the seat, so it is recorded rather than dropped. The Gemini
position on `bike-lanes-look-empty` now reads no movement, with the
disputed self-report beside it.

**How it was found is worth saying.** Not by a review of the script and
not by a test. A seat wrote an account of itself that was true of a round
that had been superseded and false of the round it was answering, and the
synthesis believed it. The anachronism is what exposed the precedence.
