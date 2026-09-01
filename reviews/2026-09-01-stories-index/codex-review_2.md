# Review brief, round 2: /stories index, /search absorbs /claims

Repository root: this checkout
(git worktree on branch worktree-stories-index; run git from here). Round 1
brief: codex-review_1.md in this directory; round 1 findings:
codex-output_1.md.

## What changed since round 1

All five round-1 findings were adopted.

1. Heading order on /stories: the list now sits in a section with a
   visible h2 "Newest first"; the count line is its lead
   (src/pages/stories.astro).
2. Pending-state counts: /stories counts what it renders (every public
   story and every claim listed under them); the home page's "read all
   N stories" link now counts public stories, the same set /stories
   lists (src/pages/index.astro, publicStoryCount).
3. Redirect: the Astro meta-refresh redirect is gone. public/_redirects
   carries `/claims /search 301`, which Cloudflare Pages serves before
   static files and which lets the browser keep a #fragment; the topic
   anchors on /search are the same slugs /claims used.
4. Outline during a query: Base.astro marks both outline renderings
   (the phone disclosure and the desktop rail block) with data-page-toc;
   the search page's sync hides them with the board and restores both on
   clear. Verified in a headless browser at 1024 px: typing hides the
   board and the rail outline, Clear restores both.
5. Reader-facing explanation restored under the "Every checked claim" h2:
   "Grouped by topic. A claim with more than one topic is filed under
   its first, so the counts add up."

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
- astro.config.mjs (now unchanged from main except formatting; confirm)
- public/_redirects (new)

Inspect with git status --short and git diff -- <file>; dist/ is rebuilt.
Repo checks green: astro check, validate, vitest (63), build, duplication
audit. Please re-review and end with VERDICT: APPROVED or VERDICT: REVISE.
