## Standards

1. **Medium:** [Header.astro:76](src/components/Header.astro:76) uses exact-path matching. Nested routes such as `/questions/<id>`, `/journal/<slug>`, and `/methodology/changes` have neither a gold current-section marker nor an `aria-current` indication.

2. **Medium:** The documented link rule is not site-wide. This overlaps the first Spec finding below.

3. **Low:** [DESIGN.md:510](docs/DESIGN.md:510) says transitions apply to links and controls, but [global.css:102](src/styles/global.css:102) covers selected classes only, excluding `.prose a`, the compact search link, inputs, and disclosures.

4. **Low:** `git diff --check` reports a trailing blank line at [questions.astro:513](src/pages/questions.astro:513).

## Spec

1. **Medium:** List-item and headline links still use `.link`, leaving them underlined at rest. Examples include claim rows at [questions.astro:283](src/pages/questions.astro:283) and [questions.astro:312](src/pages/questions.astro:312), the `<h4>` at [questions/[id].astro:569](src/pages/questions/[id].astro:569), and the group heading at [FindingsBoard.astro:44](src/components/FindingsBoard.astro:44).

2. **Medium:** [questions.astro:233](src/pages/questions.astro:233) replaces the screen-reader headings “Comments” and “Claims” with “Comments and claims.” That is a wording change outside the two permitted exceptions.

3. **Low:** [DESIGN.md:538](docs/DESIGN.md:538) says the helper counts appear under the search field. They render before the search form at [index.astro:190](src/pages/index.astro:190), above it on phones and beside the deck on desktop.

4. **Low:** The transition coverage documented in §10 does not match the selectors in `global.css`, as noted under Standards.

The specified contrast pairs pass: 82% paper on forest 7.79:1, muted placeholder on white 6.29:1, and gold on forest 4.88:1. The supplied 390px screenshots show no horizontal overflow, and the banner landmark and home skip target remain intact.

**Standards: 4 findings. Spec: 4 findings, with 2 overlapping.**

**REVISE**


