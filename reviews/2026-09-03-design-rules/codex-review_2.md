# Review context: panel radius, home rules, methodology badges, round 2

Repository root: the design-rules worktree of civicfacts/yegfacts
(branch `design-rules`, cut from `f0023e0`). Round 1 (REVISE: 2
standards, 1 spec) was answered in the latest commit, `git log -1`,
which also adds the methodology page work described below. `git diff
HEAD~1` shows this commit alone; `git diff f0023e0 HEAD -- <files>` is
the whole change. Do not edit anything. Same constraints as round 1,
plus the ones below.

## What changed since round 1

1. Round-1 fixes: the two stylesheet comments (`global.css` near lines
   52 and 110) now say the white panels take the radius; DESIGN.md §10
   no longer claims no heading on any page sits under a rule, and names
   the journal post's receipts hairline as a section divider.
2. New, on the founder's ask ("use badges with colours; that page needs
   some visual elements"): `src/pages/methodology/index.astro`
   - "The words we use": each `<dt>` is the `Finding` badge (size lg).
   - "Panel agreement": each `<dt>` is an outlined tile (border ink,
     11px uppercase), NOT a filled badge, so the two vocabularies stay
     drawn apart (StateBadge.astro states the idiom).
   - "The whole table": the twenty-row synthesis matrix rendered from
     `scripts/synthesis-matrix.ts` (imported, not copied), grouped by
     agreement in the order Unanimous, Adjacent, Split, each group
     headed by the agreement tile and a panel count. Each row: the three
     reviewer-verdict badges (size sm), an arrow, the finding badge
     (size md), the script's rationale beneath in the muted register.
     The wrapper carries `data-pagefind-ignore`; the inner grid is a
     `<span>` because the duplication audit strips an ignored element
     with a non-greedy same-tag regex (comment in the file says so).
   - DESIGN.md §10's visuals paragraph gains one sentence saying the
     methodology page's visuals are the rule rendered, not decoration.

## Files to review

- src/pages/methodology/index.astro
- src/styles/global.css (comments only changed)
- docs/DESIGN.md
- scripts/synthesis-matrix.ts (read-only reference; must be unchanged)

Screenshots attached: the methodology page's synthesis section at 1280
and at 390.

## Constraints that must hold

- `scripts/synthesis-matrix.ts` is unchanged (`git diff f0023e0 HEAD --
  scripts/` must be empty).
- The rendered table has exactly 20 rows and the groups count 4, 6 and
  10; every finding word is printed in full inside its badge.
- The page outline ("On this page") is unchanged: the new h3 must not
  enter it (check `src/lib/toc.ts` and the page's `sections`).
- No wording change to the existing vocabulary or agreement glosses.
- WCAG AA on the outlined tile (ink on paper) and every badge.
- No horizontal scroll at 390px on /methodology.
- DESIGN.md §10 describes the code truthfully.

## Review focus

Whether the table is truly derived from the script (no literal rows),
heading and landmark semantics of the group labels, the `<dt>` content
model (a badge inside a `<dt>` is fine; a heading inside one is not),
the 390px rendering, and the doc claims. Concrete findings with
file:line. No praise. End with REVISE or APPROVED.
