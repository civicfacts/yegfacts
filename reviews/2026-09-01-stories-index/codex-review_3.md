# Review brief, round 3: /stories index, /search absorbs /claims

Repository root: this checkout
(git worktree on branch worktree-stories-index; run git from here). Earlier
briefs and findings: codex-review_1.md, codex-output_1.md,
codex-review_2.md, codex-output_2.md in this directory.

## What changed since round 2

Round-2 P2, adopted in part:

- The phone disclosure `<details>` no longer carries data-page-toc. Inside
  its panel, only a new `<div data-page-toc>` around PageToc carries it,
  so hiding the outline during a query leaves the report box in place
  (src/layouts/Base.astro). The desktop rail block was already a wrapper
  around the outline only.
- Not adopted: changing the desktop aside's aria-label while a query is
  active. The aside still contains the report box, the label is
  accurate whenever the outline is present, and swapping a landmark
  label at runtime for a transient state adds code for marginal gain.
  If you consider this blocking, say why.

## Changed files

- src/pages/stories.astro (new)
- src/pages/search.astro
- src/pages/claims.astro (deleted)
- src/pages/index.astro
- src/layouts/Base.astro
- src/components/Header.astro
- src/components/Footer.astro
- src/components/TopicTags.astro
- src/lib/content.ts
- public/_redirects (new)

Inspect with git status --short and git diff -- <file>; dist/ is rebuilt.
Repo checks green: astro check, build, duplication audit. End with
VERDICT: APPROVED or VERDICT: REVISE.
