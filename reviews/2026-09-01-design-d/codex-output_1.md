## Standards

1. **P1, WCAG AA failure.** [methodology/changes.astro:52](src/pages/methodology/changes.astro:52) renders 12px gold `#C3A35E` text on paper `#F7F5F0`, only **2.21:1** contrast. Reserve gold for backgrounds and rules, or use ink, forest, or brick for text.

2. **P1, landmark regression.** [Header.astro:34](src/components/Header.astro:34) replaces the site `<header>` with a `<div>`, removing the banner landmark. On home, [index.astro:124](src/pages/index.astro:124) places the h1 and primary search before `<main>`, so [Base.astro:92](src/layouts/Base.astro:92)'s skip link bypasses both. Restore the banner landmark and move the skip target before the masthead's unique content, or put that content in `main`.

3. **P2, unsupported font weight.** [Base.astro:88](src/layouts/Base.astro:88) loads Newsreader only through weight 700, but inheriting headings request 800, for example [search.astro:51](src/pages/search.astro:51). Browsers synthesize the weight. Load 800 or change these headings to 700.

## Spec

1. **P1, Tailwind 4 cascade conflict.** The unlayered heading rule at [global.css:58](src/styles/global.css:58) outranks Tailwind's layered `.font-sans` utility. Consequently, intended sans labels such as [index.astro:261](src/pages/index.astro:261), [changes.astro:68](src/pages/methodology/changes.astro:68), and [commitments.astro:53](src/pages/commitments.astro:53) still render in Newsreader. Put the base heading rule in `@layer base` or define an unlayered sans-label class.

2. **P1, inherited link cases remain unfixed.** `/stories` and topic hubs render links from [StoryList.astro:25](src/components/StoryList.astro:25) and [StoryList.astro:42](src/components/StoryList.astro:42) with no persistent underline or other link signal, only a hover colour. [methodology/changes.astro:26](src/pages/methodology/changes.astro:26) has the same problem. Apply the shared `.link` treatment. Other manual underline styles should also be normalized to satisfy the one-link-style requirement.

3. **P2, §10 is not code-true.** [DESIGN.md:386](docs/DESIGN.md:386) claims zero border-radius and no animation, while [global.css:302](src/styles/global.css:302) retains a 2px radius and [changes.astro:96](src/pages/methodology/changes.astro:96) retains a colour transition. It also says section headings sit above a 3px rule at [DESIGN.md:393](docs/DESIGN.md:393), but the shared style at [global.css:317](src/styles/global.css:317) has no rule. Narrow the documentation or implement those assertions.

Verification was sandbox-limited. `validate`, tests, build, and Playwright all failed because the read-only environment denied temporary files, sockets, or generated `.astro` files. These failures do not indicate repository test failures.

VERDICT: REVISE