# Review brief: /stories as a ledger of claim tables

Repository root: this checkout (a git worktree of civicfacts/yegfacts on
branch stories-table; run git commands from this directory).

## Changed files

- src/components/StoryList.astro (rewritten)
- src/pages/stories.astro
- src/pages/topics/[slug].astro (one class)
- src/lib/findings.ts (one exported helper)
- src/components/FindingsBoard.astro (calls that helper instead of its own copy)

The diff is intentionally not pasted here. Inspect it with
`git diff -- <file>` and read StoryList.astro in full. The built site is in
dist/ (npm run build already ran): dist/stories/index.html and
dist/topics/transportation/index.html are the pages that changed.

## The founder's request (verbatim)

"work on the information design of this page, it's a mess right now. we need
some kind of table here for claims titles | verdicts"

## Decisions already made (do not relitigate)

- Each story is a block: title (display face) linking to the story, a
  dateline under it (topic tags, then Verified date), the one-line answer,
  then a two-column table of the story's claims: Claim | Finding. The table
  keeps two columns at every width, including 390px.
- Rows carry the 5px verdict-coloured left edge and the filled badge that
  the search board (FindingsBoard) already uses, so verdicts read down one
  column; the question is set smaller than on /search because this is a
  dense index.
- The "Newest first" section heading is gone; story titles are the page's
  h2s (headingLevel prop, h3 on topic hubs which keep their own h2). The
  count line moved under the intro and states the order.
- The list no longer draws its own top rule; /stories has the header rule
  above it and the topic hub adds one. Topic hubs share the component and
  inherit the table.

## What to review

This is a UI batch on a civic fact-checking site whose credibility rests on
cautious, accurate copy and on numbers that are computed, never
hand-maintained. Please look at:

1. The pages as a reader would see them: rendered HTML in dist/, heading
   outline, link targets, the count line, table semantics (th scope, a
   screen reader's reading order), the pending-review label path.
2. Anything the batch broke elsewhere: topic hubs, FindingsBoard on / and
   /search after the helper extraction.
3. Copy: anything that overclaims, is ambiguous, or reads as an editorial
   choice on a site that must not look like it has one. Includes the
   component's doc comment, which is public source.
4. Phone width: the badge column shrinks to the widest badge, leaving the
   question column narrow at 390px. Say whether that is acceptable or what
   you would change, inside the decisions above.
5. Simplifications still available inside the changed lines.

Repo checks already green: astro check, validate, vitest (63), build,
duplication audit, exposure audit. Screenshots reviewed at 390 and 1280.

End with a findings list (file:line, what, why it matters) and a single
line VERDICT: APPROVED or VERDICT: REVISE.
