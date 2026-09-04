## Standards

1. **Medium.** The transition fix does not animate the properties that ordinary links change. [global.css](src/styles/global.css:102) transitions colour, border, decoration colour, and opacity, while link hover states change underline thickness at [global.css](src/styles/global.css:307) and [global.css](src/styles/global.css:455). The compact search link changes its child SVG’s `stroke-width` at [Header.astro](src/components/Header.astro:105). These effects still snap despite §10’s 150ms link-transition rule.

2. **Low.** Edmonton-evidence list titles still use the underlined `.link` treatment at [questions/[id].astro](src/pages/questions/[id].astro:665). [DESIGN.md](docs/DESIGN.md:530) assigns list-item titles to `.link-title`.

No baseline code smells found.

## Spec

1. **Medium.** The home-page forest block is 268px at 1280px, versus 258px before, through [index.astro](src/pages/index.astro:176) and [Header.astro](src/components/Header.astro:123). D-0031 requires it to be no taller than before.

2. **Medium.** The Edmonton-evidence links at [questions/[id].astro](src/pages/questions/[id].astro:665) remain underlined list-item titles, contrary to the stated link rule.

3. **Low.** The transition selector still misses colour-changing links outside the named classes. “Source post” at [SeenCards.astro](src/components/SeenCards.astro:57) changes to `text-ink` on hover but matches none of [global.css](src/styles/global.css:102), so its colour snaps.

The other round-one responses land. `aria-current="true"` gives the appropriate generic “current” semantic for a parent-section link. Contrast checks pass. `git diff --check` passes. Runtime validation was blocked by the read-only sandbox’s `tsx` IPC restriction, and browser access to the preview was denied.

Standards: 2 findings; worst is the ineffective transition fix. Spec: 3 findings; worst is the masthead-height regression.

REVISE
