## Standards

1. **Medium.** [SeenCards.astro:57](src/components/SeenCards.astro:57) adds `transition-colors`, but the anchor matches none of the reduced-motion reset selectors at [global.css:126](src/styles/global.css:126). Its colour transition remains active under `prefers-reduced-motion`, contrary to [DESIGN.md:510](docs/DESIGN.md:510).

2. **Low.** [DESIGN.md:510](docs/DESIGN.md:510) limits motion to colour and border transitions “and nothing else,” while round 3 adds `text-decoration-thickness` and `stroke-width` transitions at [global.css:117](src/styles/global.css:117). The documentation no longer describes the implementation truthfully.

No baseline code smells found.

## Spec

1. **Medium.** The “Source post” fix is partial because it omits the required reduced-motion shutdown.
2. **Low.** The new transition properties were not reflected in `docs/DESIGN.md`, violating the inherited documentation constraint.

The evidence titles use `.link-title`; all four spacing reductions are present and total 12px; the glyph transition is disabled under reduced motion. `git diff --check` passes.

Standards: 2 findings. Spec: 2 findings. Worst issue: “Source post” still animates under reduced motion.

REVISE


