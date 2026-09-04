# Review context: design refresh (chrome, links, hierarchy), round 1

Repository root: the design-refresh worktree of civicfacts/yegfacts
(git worktree, branch `design-refresh`, cut from `cb73b39`, one commit `fa936ea`). Inspect the
change with `git diff cb73b39 fa936ea -- <files>`; do not diff against
origin/main. Do not edit anything.

## Files to review

- src/styles/global.css
- src/components/Header.astro
- src/components/Footer.astro
- src/components/FindingsBoard.astro
- src/components/QuestionList.astro
- src/layouts/Base.astro
- src/pages/index.astro
- src/pages/questions.astro
- src/pages/questions/[id].astro
- src/pages/claims/[id].astro
- src/pages/topics/index.astro
- src/pages/journal/index.astro
- docs/DESIGN.md

Read the diff for those files directly. Rendered screenshots (desktop
1280px and phone 390px) of the changed build are attached as images:
home, /questions, a question page, a claim page, /topics, /journal,
/methodology, /about, /search.

## What this is

A refinement pass on yegfacts.ca, a fact-checking site about Edmonton's
city government. The visual system ("broadsheet ledger": paper ground,
forest masthead, Newsreader + Libre Franklin, filled verdict badges,
ledger rows with a verdict-coloured left edge, square corners, no
shadows) is locked by a board decision and is NOT under review. What
changed is execution:

- masthead nav: sentence case, paper at 82% opacity, full opacity plus a
  2px inset gold bar for the current page; no underline;
- two link treatments with a stated rule: a link in running text is
  underlined at rest (`.link`); a headline or list-item title is navy
  with no underline until hover (`.link-title`, and `.link-title-stew`
  for Stew-voiced blocks);
- the pre-launch notice becomes a single gold line with a hairline
  under it (the brick edge is gone); wording unchanged;
- home page: the deck sentence moves under the wordmark row; the search
  field is set in the display face with a real checked question as
  placeholder and a magnifier glyph inside it; a helper line prints
  three live counts under it; lead paragraphs go ink instead of grey;
- filter chips on /questions become `.chip` (white, hairline, ink fill
  when on); the register's question column is widened;
- page h1s go from weight 800 to 700; the footer sits on the wash tone;
- 150ms colour/border transitions on links and controls, off under
  prefers-reduced-motion;
- docs/DESIGN.md §10 updated to describe the above.

## Constraints that must hold

- No wording, number, date or link-target changes anywhere except the
  search placeholder and the new helper line (which is computed).
- WCAG AA contrast on every text/background pair, including paper at
  82% opacity on forest, muted placeholder on white, gold bar on forest.
- Every link and control looks interactive without hover; visible focus
  on the forest masthead and on paper.
- No horizontal scroll at 390px on any page.
- The masthead's banner landmark and the skip link target survive the
  deck moving.
- Tailwind 4 layering: nothing in global.css outranks a utility by
  accident; `.masthead a` and `.masthead-nav a` must not fight.
- docs/DESIGN.md §10 must describe the code truthfully.

## Review focus

Accessibility (contrast, focus, landmark order, aria-current), the
link-rule being applied consistently (find any headline-sized link
still underlined at rest, or any running-text link that lost its
underline), responsiveness of the new masthead and chips at 390px,
specificity conflicts, regressions on pages that only inherit, and
whether DESIGN.md matches the code. Concrete findings with file:line.
No praise. End with REVISE or APPROVED.
