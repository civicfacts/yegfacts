## Standards

- [src/pages/stories.astro:46](src/pages/stories.astro:46) places `StoryList` directly below the H1, but [StoryList.astro:24](src/components/StoryList.astro:24) emits H3 titles. The built page confirms an H1-to-H3 jump. Add a visually hidden H2 before the list or make the component’s heading level configurable.

## Spec and reader behavior

- [src/pages/index.astro:23](src/pages/index.astro:23) calculates the “read all N stories” link from published stories, while `/stories` includes every public story. Once a pending-review story exists, [the link at line 136](src/pages/index.astro:136) will understate its destination. Likewise, [stories.astro:18](src/pages/stories.astro:18) excludes pending-review claims from the count even though `StoryList` renders them. Count the public stories and rendered claims, or remove the numeric home-link claim.

- [dist/claims/index.html:1](dist/claims/index.html:1) is a client-side meta refresh whose target is exactly `/search`; it does not forward an old query or topic fragment such as `/claims#transportation`. That breaks the stated bookmark-continuity rationale in [astro.config.mjs:27](astro.config.mjs:27). Astro confirms static redirects become meta refreshes, while Cloudflare Pages recommends `public/_redirects` for static HTTP redirects. [Astro documentation](https://docs.astro.build/en/reference/api-reference/), [Cloudflare documentation](https://developers.cloudflare.com/pages/configuration/redirects/).

- [src/pages/search.astro:49](src/pages/search.astro:49) always renders the topic outline, but [the synchronization code at line 112](src/pages/search.astro:112) hides the section containing every outline target during a query. The visible outline links then point into hidden content. Hide/disable the topic outline with the board and restore both on clear.

- [src/pages/search.astro:28](src/pages/search.astro:28) explains only in a source comment that multi-topic claims are filed under their first topic. The old reader-facing explanation was removed. Restore that sentence near “Every checked claim”; otherwise the grouping looks like an unexplained editorial classification.

Direct inspection found no currently broken internal links or missing anchors in the four requested built pages. Browser automation could not start because the read-only sandbox prevented `nodenv` from creating its temporary file.

Summary: 1 standards finding and 4 spec/behavior findings; the pending-state counts and bookmark redirect need correction before merge.

VERDICT: REVISE