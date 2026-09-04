## Standards

- **Hard violation:** [index.astro:340](src/pages/methodology/index.astro:340) puts the `h3` inside `summary`. This is valid HTML, but not reliably exposed as a heading. Accessibility APIs may map `summary` as a button-like control, whose descendants become presentational; screen-reader heading navigation can therefore jump from the section `h2` to the group `h4`s. This conflicts with [DESIGN.md:565](docs/DESIGN.md:565). [HTML permits the markup](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-summary-element), but [W3C documents the varying accessibility mappings](https://w3c.github.io/html-aam/#el-summary) and [the loss of nested heading semantics in button-like controls](https://www.w3.org/WAI/ARIA/apg/practices/hiding-semantics/).

## Spec

- The same issue fails the requirement that the heading be “announced.” Its text names the disclosure, but its heading role is not reliable across browser and assistive-technology combinations.

Everything else in scope checks out: one committed file changed; the disclosure is closed by default; compiled CSS contains Show/Hide and the 3px focus ring; the intro and 20 rows are inside it; heading source order remains h2 → h3 → h4; and there are no nested `details`.

Standards: 1 finding. Spec: 1 finding. Worst issue: “The whole table” can disappear from heading navigation.

REVISE


