# Errata: active-transportation, run 2026-09-02

## This run did not synthesise

The Claude seat raised a MATERIAL FRAMING CONCERN on `at-100m-vs-snow`
(framing/panel-concern.md). Under methodology v1.2 synthesis halts on
that string and the affected claims are rerun blind under a revised
brief; the rerun directory is `reviews/active-transportation/
2026-09-02-rerun`. Nothing from this run's round 1 is passed to the
rerun's reviewers. Round 2 was not run here.

Round-1 verdicts, for the record and not as a finding: `at-100m-vs-snow`
Contradicted (GPT), Partially supported (Claude, with the concern),
Partially supported (Gemini); `at-100m-vs-roads` Supported by all three
seats, each computing the predeclared roads-only profile set at about
$1.95 billion and reporting that the quotation's "180 times" should be
18.

## Manifest entries written by hand

- **Claude seat, round 1.** The runner script was edited in place
  (methodology v1.14, the Gemini seat's flag) while this seat was
  running; bash reads a script incrementally, so the runner crashed with
  a syntax error after `round1/claude.json` had been extracted and
  validated but before the identity stamp and the manifest entry. Both
  were applied by hand with the same values the runner writes: the
  pinned command, CLI version 2.1.258, the package hash recomputed with
  `--dry-run` against the unchanged frozen brief, and start and finish
  times from the launch log and the file's modification time. The review
  JSON is exactly what the seat returned.
- **Gemini seat, round 1.** Six empty returns under the previous pinned
  command are recorded in the launch logs kept in the session
  scratchpad, not in the manifest, which keeps one row per seat and
  round; the manifest row is the run under the v1.14 command. That run's
  answer failed schema validation twice on one packaging fault only: a
  `$schema` key echoed at the root of the JSON, which the schema's
  `additionalProperties: false` forbids. The key was removed and the
  otherwise unchanged document was passed through
  `scripts/panel/extract-review.ts`, validated, stamped and recorded with
  the runner's own timestamps and package hash and `attempts: 2`,
  `status: ok`. The extractor now drops that key itself.

## Documents named by the seats that the brief did not

The seats located the Approved 2019-2022 Operating Budget (program
summary for Snow and Ice Control, 2022 column), council's 2022-07-04
one-time $4.7 million snow and ice increase, council's December 2022
enhanced-snow-standards amendment ($4.0426 million in 2023), the 2023
year-end and 2024 year-end capital financial updates (CM-20-0330
actuals of $0.807 million in 2023 and $10.496 million cumulative at
2024 year-end), the September 2025 capital performance report ($25.093
million cumulative), and council's 2025-06-10 reduction of CM-20-0330
by $0.430 million. None of these is adjudicated here; they are leads
for the rerun and for staging.
