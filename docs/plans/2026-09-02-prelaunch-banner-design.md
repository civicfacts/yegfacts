# Pre-launch banner design

## Purpose

Tell every visitor, before they reach the masthead or page content, that YEGFacts has not launched and that its methodology is still being worked out.

## Design

Add one permanent, non-dismissible notice to the shared `Base.astro` layout. It appears on every reader-facing HTML page above the forest masthead and scrolls with the page rather than occupying the viewport.

The notice uses the existing gold, ink, brick, paper, and navy palette. A full-width gold field and strong brick rule distinguish it from both the branch-preview notice and ordinary page content. The copy is large enough to read as a site status, with a bold opening sentence followed by a plain explanation and a link to `/methodology`.

Copy:

> **YEGFacts has not launched yet.** This site is still a work in progress. We have not yet found the right methodology. See the current methodology.

The notice is an `aside` labelled "Site status" and is excluded from Pagefind because it is repeated site chrome. It has no close control, state, animation, script, dependency, or separate component.

## Verification

- Run the repository validation, test, type-check, and build commands.
- Inspect representative desktop and phone pages in a browser, including the home page and a story page.
- Confirm the notice appears above the masthead, wraps cleanly, remains legible, and coexists with the branch-preview notice.
