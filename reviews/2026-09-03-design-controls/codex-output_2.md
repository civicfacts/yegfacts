## Standards

1. [src/pages/search.astro:145](src/pages/search.astro:145) leaves Pagefind’s filter checkboxes and load-more button square. Pagefind’s unlayered CSS derives both radii from the shared variable, now `0`, and overrides the base-layer rule at [global.css:115](src/styles/global.css:115). The direct override at line 149 covers only the search input and clear button. This violates [DESIGN.md:505](docs/DESIGN.md:505).

## Spec

1. The Pagefind fix is incomplete for the filter checkboxes and load-more button, as described above.

2. [DESIGN.md:513](docs/DESIGN.md:513) says the strip has hairlines “on all four sides,” but [global.css:594](src/styles/global.css:594) gives it a 3px forest top rule. Only its bottom and sides are hairlines.

Standards: 1 finding. Spec: 2 findings. The incomplete Pagefind control radius is the blocking issue in both axes.

REVISE
