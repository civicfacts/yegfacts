# Review brief: the header's Search link becomes an icon

Repository root: this checkout (a git worktree of civicfacts/yegfacts on
branch search-icon; run git commands from this directory).

## Changed files

- src/components/Header.astro
- src/layouts/Base.astro (one class on the home page's deck wrapper)

Inspect with `git diff`. The built site is in dist/ (npm run build already
ran): dist/index.html, dist/stories/index.html, dist/search/index.html.
Nine screenshots of the built header (home, /stories, /search at 1280,
768 and 390 px) accompany this brief.

## The founder's request (verbatim)

"maybe 'search' item in the menu should be just an icon? wdyt?" then, after
Stew's advice, "yes for search icon".

## Decisions already made (do not relitigate)

- Search is the one nav item that is an action rather than a section, so
  it is drawn as a magnifier icon, outside the `<nav>`, last in source.
- 44px hit target, accessible name "Search", paper colour, hover thickens
  the stroke, a 2px paper rule under the glyph marks the current page on
  /search. No new colour; gold stays restricted to its two uses.
- Below `sm` the icon rides beside the wordmark on the first row and the
  words wrap under it; from `sm` up it closes the nav row. The old
  `narrowHidden` mechanism (Search hidden below `lg`) is gone.
- The home page omits the icon: its masthead is the search field.
- The row's baseline alignment and the nav words' positions were measured
  before and after: identical vertical positions at every width; the words
  shift right by the width the word Search used to take at `lg` on non-home
  pages, which is inherent.

## What to review

1. The rendered header as a reader and as a screen-reader user would meet
   it: accessible name, tab order, current-page signalling, the icon's
   visibility on forest, the hit target, wrapping between 640 and 1024 px.
2. Anything the batch broke: the home page's masthead and deck at `lg` and
   below, the footer, Pagefind (`data-pagefind-ignore` on the header).
3. The source comments, which are public: anything inaccurate, overlong, or
   editorial.
4. Simplifications still available inside the changed lines.

Repo checks already green: astro check, build, vitest (63), validate,
duplication audit, exposure audit.

End with a findings list (file:line, what, why it matters) and a single
line VERDICT: APPROVED or VERDICT: REVISE. Any file reference must be
repo-relative, never an absolute path.
