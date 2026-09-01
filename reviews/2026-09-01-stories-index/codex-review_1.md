# Review brief: /stories index, /search absorbs /claims

Repository root: this checkout
(a git worktree of civicfacts/yegfacts on branch worktree-stories-index; run
git commands from this directory).

## Changed files

- src/pages/stories.astro (new)
- src/pages/search.astro
- src/pages/claims.astro (deleted)
- src/pages/index.astro
- src/components/Header.astro
- src/components/Footer.astro
- src/components/TopicTags.astro
- src/lib/content.ts
- astro.config.mjs

The diff is intentionally not pasted here. Inspect it yourself with
`git status --short`, `git diff -- <file>` for the listed files, and read
the new file directly. The built site is in dist/ (npm run build already
ran): dist/stories/index.html, dist/search/index.html, dist/index.html,
dist/claims/index.html (redirect stub).

## The founder's request (verbatim)

"I think we need /stories, and a prominent link to it. /claims can be
combined with /search."

## Decisions already made (do not relitigate)

- The home page keeps claims as its list (board decision D-0018). Stories
  get their own index rather than displacing claims on the front page.
- /stories lists every public story newest verified first using the
  existing StoryList component (title, one-line answer, nested claim
  questions with finding words, topic tags, verified date).
- "Stories" is the first header nav item and sits in the footer. The
  home page's search helper line links to /stories; the recently-checked
  section links to /search#every-claim.
- /search keeps the Pagefind box on top and renders the whole record
  grouped by topic underneath (the old /claims board, with the topic
  outline in the rail). A small inline script hides the board while a
  query is active and shows it again when the box is cleared, by typing
  or by Pagefind's Clear button (which fires no input event, hence the
  click listener). /claims redirects to /search.
- The Search nav link hides below the md breakpoint so six labels never
  wrap at tablet widths; it was sm before.
- TopicTags now shows topic names instead of slugs; the Pagefind filter
  value stays the slug.

## What to review

This is a UI batch on a civic fact-checking site whose credibility rests
on cautious, accurate copy and on numbers that are computed, never
hand-maintained. Please look at:

1. Correctness of the pages as a reader would see them: rendered HTML in
   dist/, link targets, counts, the redirect.
2. The inline hide/show script in search.astro: edge cases (back/forward
   cache, ?q= on load, Clear button, JS disabled).
3. Copy: anything that overclaims, is ambiguous, or reads as an
   editorial choice on a site that must not look like it has one.
4. Anything the batch broke elsewhere (topic hubs and story pages also
   use TopicTags and StoryList).
5. Simplifications still available inside the changed lines.

Repo checks already green: astro check, validate, vitest (63), build,
duplication audit. Screenshots were reviewed at 375, 700 and 1024 px.
