## Standards

No findings.

## Spec

- **[P2] Preserve a phone route to the state key.** [questions.astro:58](src/pages/questions.astro:58) leaves only two outline entries, so [toc.ts:28](src/lib/toc.ts:28) suppresses the outline and [Base.astro:263](src/layouts/Base.astro:263) omits the phone disclosure. The key remains after the complete 44-question register at [questions.astro:342](src/pages/questions.astro:342). Phone readers now encounter the state badges throughout the list without a direct route to their definitions. Keep the key out of desktop active-section tracking, but provide a phone-only jump to `#states`.

The round-2 active-marker finding itself is closed. Standards: 0 findings. Spec: 1 finding.

REVISE
