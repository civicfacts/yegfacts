# Review context: the questions register's header and key column, round 1

Repository root: the questions-short worktree of civicfacts/yegfacts
(branch `questions-short`, cut from `34d4bd7`). The change is the latest
commit, `git log -1`; `git diff 34d4bd7 HEAD` is the whole of it. Do not
edit anything, do not build, do not run git commands that touch the
working tree.

## Why this change exists

A UX researcher, the first human reader of the site who is not the
founder, said the site has far too much text. The founder then named
this page: shorten the text at the top, and the right-hand column
should start at the top of the page, not beside the table.

## What changed

One file: `src/pages/questions.astro`.

1. The header's four paragraphs (about 230 words) are one paragraph
   (about 45 words): every question that reached the site is here,
   whatever became of it, with the claims under it and the reason; the
   filters only narrow this list.
2. Two facts from the old header moved into the key ("What the states
   mean"), rewritten shorter: going ahead, parked and declined say
   whether a question is worth a check, not whether anything under it
   is true; comment counts are comments, not people.
3. The old paragraph explaining how claims are grouped into questions is
   gone from this page. The methodology page carries that.
4. The two-column grid (`lg:grid-cols-[minmax(0,1fr)_16rem]`) now wraps
   the title, filters and register on the left and the key plus outline
   on the right, so the key starts level with the title. Source order is
   unchanged: on a phone the key still follows the list.

## Files to review

- src/pages/questions.astro (the change)
- docs/DESIGN.md §10 and §12 (the page rules and the plain-speech rule)
- src/layouts/Base.astro (the page passes `rail={false}` and carries its
  own column; unchanged)

Screenshots attached: the page at 1280 before the change (live site),
the page at 1280 after, and at 390 after.

## Constraints that must hold

- No fact was lost that a reader of THIS page needs. For each sentence
  removed from the header, say where it now lives (this page, the key,
  the methodology page) or say it is gone and whether that matters.
- The register itself, its filters and its script are untouched
  (`git diff 34d4bd7 HEAD` shows no change inside the `<table>` or the
  `<script>`).
- Landmarks and heading order still make sense with the key's h2
  beside the h1: check the outline (`sections`) and the DOM order.
- No horizontal scroll at 390px; the phone layout is unchanged from
  before.
- No em or en dash in any added line.
- The file's comments describe the layout truthfully after the move.

## Review focus

1. Read the new header as a stranger. Does one paragraph tell them what
   this page is and what the filters do? Quote any sentence that stalls.
2. The key's new paragraphs: plain speech (DESIGN.md §12), no method
   words where a plain word exists, nothing that the badge definitions
   above already say.
3. The layout: the key beside the title, the header's bottom rule now
   spanning the left column only, spacing between the key and the title
   row. Anything that reads as broken at 1280 or 1024.
4. Semantics and 390px.

Concrete findings with file:line. No praise. End with REVISE or
APPROVED.
