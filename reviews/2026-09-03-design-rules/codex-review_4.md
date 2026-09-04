# Review context: panel radius, home rules, methodology badges, round 4

Repository root: the design-rules worktree of civicfacts/yegfacts
(branch `design-rules`, cut from `f0023e0`). Round 3 approved. The
founder then asked for the synthesis table to be collapsed behind a
disclosure; that is the latest commit, `git log -1`, and `git diff
HEAD~1` shows it alone. Do not edit anything. Same constraints as
rounds 1 to 3.

## What changed since round 3

`src/pages/methodology/index.astro`: the `data-pagefind-ignore` wrapper
around "The whole table" is now a `<details>` closed by default, using
the site's disclosure idiom (`summary.list-none` with a
`.disclosure-state` span that prints Show/Hide from CSS, see
`global.css` and the outline bar in `Base.astro`). The `<h3>` "The whole
table" sits inside the `<summary>`, so the heading order (h2, h3, h4
groups) is unchanged. The intro paragraph and the twenty rows are inside
the disclosure. The wrapper comment now says no nested `details` may
appear inside it (the duplication audit's non-greedy same-tag strip).

## Files to review

- src/pages/methodology/index.astro

Check: a heading inside a `<summary>` is valid and announced; the
disclosure is keyboard-operable with a visible focus ring; the
Show/Hide word renders (it comes from `.disclosure-state::after`); the
closed state at 1280 and 390 (screenshot attached, closed); nothing
else changed. Concrete findings with file:line. No praise. End with
REVISE or APPROVED.
