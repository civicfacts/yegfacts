# Review context: control corners, panel depth, forest footer, round 1

Repository root: the design-controls worktree of civicfacts/yegfacts
(branch `design-controls`, cut from `130865c`). Inspect the change with
`git diff 130865c HEAD -- <files>`; do not diff against origin/main. Do
not edit anything.

## Files to review

- src/styles/global.css
- src/components/Footer.astro
- src/components/Header.astro
- src/components/CopyButton.astro
- src/pages/index.astro
- src/pages/search.astro
- docs/DESIGN.md
- any other file the diff touches (list them with `git diff --stat 130865c HEAD`)

Screenshots of the built pages are attached (desktop 1280 and phone 390).

## What this is

A second execution pass on yegfacts.ca after the founder saw the first
refresh (PR #38). Three changes, all his direction:

- interactive controls (chips, buttons, fields, the copy button, the
  Pagefind search UI) take a 3px radius, `--radius-control`; badges,
  tiles, panels, tables, rules and the ledger edges stay square;
- white panels (`.panel`, `.strip`) and the home search field carry one
  soft shadow, `--shadow-panel`; the glossary popover keeps its own;
  nothing else has one;
- the footer becomes a forest block bookending the masthead: compact
  wordmark and a one-line descriptor at its head, gold column labels,
  link lists in the same treatment as the masthead nav (class renamed
  `.masthead-nav` to `.forest-nav` since it now serves two blocks), and
  a paper colophon with underlined running-text links.

docs/DESIGN.md §10 and the header comment in global.css were rewritten
to describe this.

## Constraints that must hold

- No wording, number, date or link-target changes except the footer
  colophon's em dash becoming a colon.
- WCAG AA on every pair: gold labels on forest (4.88:1 at 11px/700 is AA
  for that size only if you judge it large text; if not, say so and
  propose the fix), paper at 82% on forest, paper at 70% on forest for
  the colophon, white on brick.
- Every link and control looks interactive without hover; visible focus
  on forest (white ring) in the footer as well as the masthead.
- No horizontal scroll at 390px on any page.
- Footer landmark (`<footer>` as contentinfo) intact; nav landmarks
  labelled.
- Tailwind 4 layering: nothing in global.css outranks a utility by
  accident; the renamed `.forest-nav` rule still beats the generic
  paper-link colour at equal specificity where it must.
- docs/DESIGN.md §10 and the global.css header comment describe the code
  truthfully, including the radius and shadow exceptions and the four
  load-bearing uses of gold.

## Review focus

Contrast on the new forest footer, focus visibility there, the radius
applied to every control and to nothing that is not a control, the
shadow applied to exactly the named surfaces, responsive footer at
390px, specificity conflicts from the rename, and whether the docs match
the code. Concrete findings with file:line. No praise. End with REVISE
or APPROVED.
