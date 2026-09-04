## Standards

1. **Hard:** [docs/DESIGN.md:565](docs/DESIGN.md:565>) says no section heading on any page sits under a rule. [src/pages/journal/[slug].astro:75](src/pages/journal/[slug].astro:75>) still places a top border directly above the `Receipts` `<h2>` on line 76. It is only 1px, but it contradicts the absolute documentation claim.

2. **Hard:** [src/styles/global.css:52](src/styles/global.css:52>) and [src/styles/global.css:110](src/styles/global.css:110>) still say the radius is for interactive controls only and panels remain square. That contradicts `.panel, .strip { border-radius: var(--radius-control) }` at [global.css:572](src/styles/global.css:572>).

## Spec

1. The two stale CSS comments above fail the requirement that the stylesheet describe exactly which elements remain square and which receive the radius.

No other findings in the named diff. Live source has no `border-t-[3px]` matches; `.section-heading` itself has no rule; visible wording and link targets are unchanged. The screenshots show intact desktop/mobile ordering, no 390px overflow, and continuous curved panel borders.

`git diff --check` passed. The restricted sandbox blocked `npm run validate` at `tsx` IPC startup with `EPERM`, so tests did not run.

Standards: 2 findings. Spec: 1 finding. Worst issue in both axes is documentation contradicting the rendered CSS.

REVISE
