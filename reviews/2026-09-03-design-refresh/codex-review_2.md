# Review context: design refresh, round 2

Repository root: the design-refresh worktree of civicfacts/yegfacts
(branch `design-refresh`, cut from `cb73b39`; commits `fa936ea` then
`480d95f`). Round 1 (your findings, REVISE, 4 standards + 4 spec with
two overlapping) was answered in `480d95f`. Inspect with
`git diff cb73b39 480d95f -- <files>` for the whole change and
`git diff fa936ea 480d95f` for the round-1 fixes alone. Do not edit
anything. Same constraints and review focus as round 1 (below).

## What changed since round 1

1. Nav section marker: `Header.astro` sets `aria-current="page"` on the
   exact page and `aria-current="true"` on the section's word for a
   nested route (`/questions/<id>`, `/journal/<slug>`,
   `/methodology/changes`); `.masthead-nav a[aria-current]` in
   `global.css` draws the gold bar for either.
2. Link rule: the register's claim rows (`questions.astro`), the
   established-background `<h4>` (`questions/[id].astro`) and the
   board's group heading (`FindingsBoard.astro`) now use `.link-title`.
3. Transition selector now also covers `.prose a` and `.masthead a`
   (the compact search link); DESIGN.md §10 says "links and the
   controls that change colour on hover (the chips, the buttons, the
   outline)". Inputs and disclosures do not change colour on hover and
   are deliberately not listed.
4. DESIGN.md §10 now says the three counts sit beside the deck from
   `lg` and under it on a phone, above the search field.
5. Trailing blank line removed.
6. NOT changed, on purpose: the sr-only column heading "Comments and
   claims" replaces "Comments" and "Claims" because the two columns
   were merged into one cell; a heading that names two columns where
   there is one would be the wrong wording. Recorded as a deliberate
   change, not an accident.

## Files to review

- src/styles/global.css
- src/components/Header.astro
- src/components/FindingsBoard.astro
- src/components/QuestionList.astro
- src/layouts/Base.astro
- src/pages/index.astro
- src/pages/questions.astro
- src/pages/questions/[id].astro
- src/pages/claims/[id].astro
- docs/DESIGN.md

Screenshots attached: the register at 1280 and a question page at 1280
after round 2.

## Constraints that must hold

- No wording, number, date or link-target changes anywhere except the
  search placeholder, the helper counts, and the merged column heading.
- WCAG AA contrast on every text/background pair.
- Every link and control looks interactive without hover; visible focus.
- No horizontal scroll at 390px on any page.
- Banner landmark and skip link target intact.
- Tailwind 4 layering: nothing in global.css outranks a utility by
  accident.
- docs/DESIGN.md §10 describes the code truthfully.

## Review focus

Verify each round-1 fix actually lands and introduces nothing new
(`aria-current="true"` on a link is valid; check screen-reader
semantics). Find any remaining headline-sized link underlined at rest,
or running-text link that lost its underline. Concrete findings with
file:line. No praise. End with REVISE or APPROVED.
