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
| 2 | codex-review_2.md | codex-output_2.md: after the founder's preview note, the 3px story rule and larger title; one wording nit in the comment | APPROVED |
| 3 | codex-review_3.md | codex-output_3.md: one link per story, kicker above the title, claims unlinked; two wording nits and one redundant class | APPROVED |
| 4 | codex-review_4.md | codex-output_4.md (reviewed at 5c6c679, which also carries the marker under the badge): bars one per row, headers for screen readers, panel agreement only when contested; no findings | APPROVED |

Round 1, all four adopted before commit: a visually hidden caption per
table, the doc comment rewritten to the component's contract, "label",
and the findings module diff reduced to the one exported helper.

Between the rounds the founder looked at the preview: "we need more visual
separation between stories themselves, hard to see where one story ends
and another starts right now because claims have a lot of visual weight."
Adopted: the home page's 3px ink section rule over each story title, the
title up to 1.625rem, the hairlines between stories gone, and the topic
hub's extra hairline removed. Round 2 approved it; its one wording nit
was applied.

Then the founder asked where a reader should go from the page, whether
topics belong above the title, and whether topics and claims need link
treatment. Stew's answer: to the story. The title is the block's one
link; topics and the verified date are an unlinked kicker above it, as
on the story page; the claim questions are plain text with their badges,
since the story page's verdict strip carries the claim anchors and search
is the route to a single claim. Round 3 approved it; its three nits were
applied.

Then three more from the founder: the Claim | Finding column heads, the
verdict bars fusing into one line (on the home page too), and whether the
boards need "Unanimous panel" at all ("I would drop it"). Adopted: the
header row is for screen readers only; the bar sits on the content
inside the row's padding so each row keeps its own, on the stories table
and on FindingsBoard (home and search); panel agreement prints only when
it is not Unanimous, under the badge it qualifies (the founder's
placement). Stew kept the contested marker rather than dropping the
line entirely: a Split verdict on the front page must not look as firm
as a unanimous one. Round 4 approved it with no findings.

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
