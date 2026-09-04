## Standards

1. **Low.** [global.css:9](src/styles/global.css:9) says motion is limited to colour and border transitions, but the file also transitions underline thickness, opacity, and stroke width at [global.css:117](src/styles/global.css:117).

## Spec

1. **Low.** The §10 fix remains partial. [DESIGN.md:510](docs/DESIGN.md:510) claims to name every transitioned property but omits opacity. [global.css:118](src/styles/global.css:118) transitions opacity, and masthead navigation changes it from `0.82` to `1` at [global.css:169](src/styles/global.css:169).

The SeenCards reduced-motion fix lands at [SeenCards.astro:57](src/components/SeenCards.astro:57). Diff checks pass.

**Standards: 1 finding. Spec: 1 finding.**

REVISE


