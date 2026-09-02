# Review context: design D (broadsheet ledger), round 1

Repository root: the design-d worktree of civicfacts/yegfacts
(git worktree, branch `design-d`, three commits on top of merge base `ae94fd0`:
63f3e1c, 1f9ba73, be45df6). Inspect the diff with `git diff ae94fd0 -- <files>`,
not against `origin/main`, which has since moved for unrelated content work.

## Files to review

- src/styles/global.css
- src/lib/findings.ts
- src/components/Finding.astro
- src/components/FindingsBoard.astro
- src/components/Header.astro
- src/components/Wordmark.astro
- src/components/Footer.astro
- src/components/ReportBox.astro
- src/layouts/Base.astro
- src/pages/index.astro
- src/pages/search.astro
- src/pages/topics/[slug].astro
- src/pages/commitments.astro
- src/pages/evidence/[id].astro
- src/pages/methodology/changes.astro
- docs/DESIGN.md

The diff is intentionally omitted here; read it directly for the listed files
only. Rendered preview: https://design-d.yegfacts.pages.dev (branch build with
a noindex banner).

## What this is

A site-wide visual redesign of yegfacts.ca, a fact-checking site about
Edmonton's city government, to a "broadsheet ledger" system chosen by the
founder from four hardcoded explorations:

- paper #f7f5f0 ground; full-bleed forest #123f35 masthead carrying the
  wordmark, nav and, on the home page only, the descriptor and search;
- Newsreader (headings, questions) + Libre Franklin (text);
- findings as filled badges in the finding's colour (forest Supported, navy
  Partially supported, charcoal Not established, brick Contradicted, gold with
  ink text for Mixed); the word is always printed in full;
- claim rows (FindingsBoard) with a 5px verdict-coloured left edge; at `sm`
  and up a grid with an 11rem right column so every badge starts on one
  vertical line, metadata split into a left group (story · panel) and the
  verified date in the right column; the " · " before the date is sr-only at
  `sm` and up;
- brick search button as the home page's one primary action;
- "How a verdict is made" as a four-cell strip; corrections panel; slate;
  the report box moved to the foot of the home page (other pages keep it in
  the rail);
- Base.astro gains a `rail` prop and a `masthead` named slot.

## Constraints that must hold

- No wording, number, date or link changes anywhere; content is computed at
  build time as before.
- WCAG AA contrast on every text/background pair, including white on the
  badge colours.
- One link style per page; every link and control looks interactive without
  hover; visible focus.
- No horizontal scroll at 390px on any page.
- Pages other than the home page only inherit the system; they were not to
  be redesigned. Look for regressions there (story page verdict strip,
  /stories, /search, topic hubs, evidence pages, methodology, about, support,
  commitments).
- docs/DESIGN.md §10 must describe the code truthfully and say that it
  supersedes the earlier "carried by the word, never by a badge" rule.

## Review focus

Accessibility (contrast, focus, sr-only separators, heading order, the
`masthead` slot's effect on landmark structure), responsiveness, Tailwind 4 /
CSS specificity conflicts between `global.css` and utility classes,
regressions on inheriting pages, any accidental copy change, and whether
DESIGN.md matches the code. Concrete findings with file:line. No praise.
