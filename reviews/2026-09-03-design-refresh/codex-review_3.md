# Review context: design refresh, round 3

Repository root: the design-refresh worktree of civicfacts/yegfacts
(branch `design-refresh`, cut from `cb73b39`; commits `fa936ea`,
`480d95f`, `44ed013`). Round 2 (REVISE: 2 standards, 3 spec) was
answered in `44ed013`. Inspect with `git diff 480d95f 44ed013` for the
round-2 fixes alone and `git diff cb73b39 44ed013 -- <files>` for the
whole change. Do not edit anything. Same constraints and review focus
as rounds 1 and 2.

## What changed since round 2

1. Transitions: `text-decoration-thickness 0.15s ease` added to the
   transition list in `global.css`; `.masthead a svg` transitions
   `stroke-width`, and is switched off under reduced motion with the
   rest. The one hover-colour link outside the named classes,
   SeenCards' "Source post", carries Tailwind's `transition-colors`.
2. The Edmonton-evidence list titles on a question page
   (`questions/[id].astro`) take `.link-title`.
3. The home masthead is trimmed by 12px of padding (`Header.astro`
   home row `pb-2`; `index.astro` deck `pt-2.5`, form `mt-2.5`, block
   `pb-4`). Measured with Playwright at 1280: 256.2px, against 258px
   before the refresh. The register's question cell measures 361px of
   728px (49.6%). No horizontal overflow at 390px on /, /questions, a
   question page or a claim page (measured).

## Files to review

- src/styles/global.css
- src/components/Header.astro
- src/components/SeenCards.astro
- src/pages/index.astro
- src/pages/questions/[id].astro
- docs/DESIGN.md

Screenshot attached: the home page at 1280 after round 3.

Verify each round-2 fix lands and introduces nothing new. Concrete
findings with file:line. No praise. End with REVISE or APPROVED.
