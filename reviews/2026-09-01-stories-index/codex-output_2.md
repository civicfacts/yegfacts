## Spec and reader behavior

- **[P2] The outline fix hides the mobile correction controls.** [Base.astro:83](src/layouts/Base.astro:83) marks the entire mobile `<details>` as `data-page-toc`, including `ReportBox` at [Base.astro:112](src/layouts/Base.astro:112). [search.astro:117](src/pages/search.astro:117) hides every marked element during a query. Below `lg`, this removes “Something wrong on this page?” along with the outline. The built structure confirms that nesting at [dist/search/index.html:2](dist/search/index.html:2). Desktop also retains an aside labelled “On this page” after its outline disappears at [Base.astro:122](src/layouts/Base.astro:122). Preserve the report control and correct the remaining landmark label while hiding only the outline.

## Round-1 findings

All five are otherwise resolved:

1. `/stories` now renders H1 → H2 → H3 at [stories.astro:37](src/pages/stories.astro:37).
2. `/stories` counts its rendered public stories and claims at [stories.astro:11](src/pages/stories.astro:11); the home link uses `publicStories()` at [index.astro:33](src/pages/index.astro:33).
3. [public/_redirects:3](public/_redirects:3) contains the 301 rule, `dist/_redirects` contains it, and `dist/claims/index.html` is absent. `astro.config.mjs` matches `main`.
4. Both outlines now synchronize with the board at [search.astro:116](src/pages/search.astro:116), subject to the regression above.
5. The reader-facing grouping explanation is restored at [search.astro:63](src/pages/search.astro:63).

No other new findings.

VERDICT: REVISE