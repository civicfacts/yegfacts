## Standards

No findings.

## Spec and reader behavior

The Round-2 regression is resolved:

- [Base.astro:108](src/layouts/Base.astro:108) scopes `data-page-toc` to `PageToc`; `ReportBox` remains its sibling at [Base.astro:111](src/layouts/Base.astro:111).
- [search.astro:117](src/pages/search.astro:117) hides only those marked outline wrappers.
- The generated mobile DOM confirms this separation at [dist/search/index.html:2](dist/search/index.html:2).

The unchanged desktop `aria-label` at [Base.astro:123](src/layouts/Base.astro:123) becomes imprecise while searching, but the correction links remain labelled and operable. I do not consider transient landmark naming a blocking regression. No new findings.

VERDICT: APPROVED