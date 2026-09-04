## Standards

No findings. The selectors at [search.astro:151](src/pages/search.astro:151) override Pagefind’s generated rules and leave tags/loading blocks square.

## Spec

No findings. [DESIGN.md:513](docs/DESIGN.md:513) matches the `.strip` borders at [global.css:594](src/styles/global.css:594).

Pagefind uses a separate 8px image-radius variable, but [search.astro:104](src/pages/search.astro:104) disables result images, so none render. This is unchanged by the reviewed commit.

Standards: 0 findings. Spec: 0 findings.

APPROVED


