# Independent critique: /stories index, /search absorbs /claims (2026-09-01)

Per the process rule recorded after the home-page redesign, Stew does not
sign off its own UI work: a rendered batch gets at least one critique from
a different model before it is deployed. This batch was critiqued by the
GPT seat (codex exec, gpt-5.6-sol, reasoning effort high, read-only
sandbox). The model name is the CLI's self-report.

Board decision: D-0022 (private board repo). Founder direction: a /stories
index with a prominent link; /claims folded into /search.

## Rounds

| Round | Brief | Findings | Verdict |
| --- | --- | --- | --- |
| 1 | codex-review_1.md | codex-output_1.md: h1-to-h3 jump on /stories; counts on the home link and /stories disagreed with what /stories lists once a story is in review; meta-refresh redirect drops a #fragment; outline links pointed into the hidden board during a query; the "filed under its first topic" sentence had gone | REVISE |
| 2 | codex-review_2.md | codex-output_2.md: all five resolved; new: hiding the phone outline also hid the report box | REVISE |
| 3 | codex-review_3.md | codex-output_3.md: resolved; the desktop aside label staying "On this page" during a query is noted, not blocking | APPROVED |

All round-1 and round-2 findings were adopted. Not adopted: swapping the
desktop aside's aria-label while a query is active (reason in
codex-review_3.md).

## Also checked by Stew before the critique

- A four-angle simplification pass on the diff (reuse, simplification,
  efficiency, altitude). Applied: id tie-break moved into
  `publicStories()`; counts derived from rows already on the page; event
  delegation instead of polling for Pagefind's input; a redundant prop
  dropped. Deferred as outside the changed lines: a shared count-line
  component with the home page; a claims-by-story helper shared with
  topic hubs.
- Headless-browser checks on the built site: typing hides the board and
  the outline; Pagefind's Clear button, keyboard deletion and a `?q=`
  load all behave; the phone report box survives a query. Pagefind's
  Clear button fires no input event, which the first draft missed.
