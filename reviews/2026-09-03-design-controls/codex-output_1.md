## Standards

1. [search.astro:144](src/pages/search.astro:144) assigns 3px to Pagefind’s shared radius variable. Pagefind also uses it for noninteractive loading blocks and result tags, while checkboxes receive half the value. This contradicts [DESIGN.md:505](docs/DESIGN.md:505). Keep the shared radius at zero and target Pagefind controls directly.

2. [global.css:211](src/styles/global.css:211) implements the current-page rule with `box-shadow`, while [global.css:9](src/styles/global.css:9) and [DESIGN.md:510](docs/DESIGN.md:510) say nothing beyond the named panels and glossary popover has a shadow. Document this non-depth inset-rule exception or draw it without `box-shadow`.

3. [Footer.astro:132](src/components/Footer.astro:132) removes the comma after “model reviews.” The brief permits only the em-dash-to-colon punctuation change.

No baseline code-smell finding.

## Spec

1. The Pagefind radius affects non-controls and gives filter checkboxes 1.5px rather than the required 3px.
2. [global.css:595](src/styles/global.css:595) adds side borders to `.strip`, changing it from a top-and-bottom strip into a boxed panel. That is outside the three directed changes; remove it unless separately approved.
3. The blanket shadow documentation omits the inset `box-shadow` exception.
4. The footer contains an additional punctuation change.

Contrast passes normal-text AA: gold/forest 4.877:1, paper 82%/forest 7.792:1, paper 70%/forest 6.124:1, and white/brick 8.365:1. Gold does not need large-text treatment. Footer focus rules, labelled nav landmarks, `<footer>` landmark, and the supplied 390px rendering show no further violation.

Validation and test reruns were blocked before execution by the read-only sandbox’s temp/IPC restrictions (`EPERM`); the existing built output and supplied screenshots were inspected.

**Standards: 3 findings. Spec: 4 findings.**

REVISE


