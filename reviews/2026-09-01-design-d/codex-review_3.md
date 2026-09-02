# Review context: design D (broadsheet ledger), round 3

Same worktree and file list as rounds 1 and 2. Diff base ae94fd0; the
round-2 fix commit is 32d45f8.

## What changed since round 2

1. src/components/AiReview.astro: its private verdict colour map is gone;
   the seat and panel dots take their fill from FINDING_TONE (one mapping).
2. The "Reviewer notes" summary carries a persistent Show/Hide word via a
   generalised `.disclosure-state` rule in global.css (also used by the
   outline bar).
3. Libre Franklin now loads 400/500/600/700/800.
4. DESIGN.md §10 and the global.css header state the rounding rule
   truthfully (chrome square, 2px on inline code, three named circles).
