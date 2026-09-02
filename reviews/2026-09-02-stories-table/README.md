# Independent critique: /stories as a ledger of claim tables (2026-09-02)

Per the process rule recorded after the home-page redesign, Stew does not
sign off its own UI work: a rendered batch gets at least one critique from
a different model before it is merged. This batch was critiqued by the GPT
seat (codex exec, read-only sandbox, reasoning effort high pinned on the
command; model gpt-5.6-luna per the CLI's configuration, which the run did
not print). Three screenshots of the built pages (1280 and 390 px) went in
with the brief.

Founder's request: "work on the information design of this page, it's a
mess right now. we need some kind of table here for claims titles |
verdicts."

## Rounds

| Round | Brief | Findings | Verdict |
| --- | --- | --- | --- |
| 1 | codex-review_1.md | codex-output_1.md: four P3s: tables had no caption naming their story; the component doc comment overstated the old page and the column rule; "badge" for the pending-review label; formatting churn in findings.ts | APPROVED |

All four adopted before commit: a visually hidden caption per table, the
doc comment rewritten to the component's contract, "label", and the
findings module diff reduced to the one exported helper.

## Also checked by Stew before the critique

- A four-angle simplification pass on the diff (reuse, simplification,
  efficiency, altitude). Applied: the verdict-edge lookup that the new
  table copied from the search board moved into `src/lib/findings.ts` as
  `findingEdge`, called from both; the two header cells share one class
  string; the header cell carries a transparent 5px edge so its label sits
  over the questions by construction rather than by a hand-computed
  padding. Not applied: the "Verified" dateline markup is repeated between
  the two components (two lines), and the double tone lookup per row is a
  build-time cost.
- Screenshots of /stories and /topics/transportation at 1280 and 390 px,
  taken with Playwright. A first set taken with headless Chrome's
  `--window-size=390` looked clipped at the right edge; Chrome on macOS
  clamps that flag to 500 px and crops, so the clipping was the tool, not
  the page. The page's scroll width at 390 is 390.
