## Standards

- **Hard violation.** [index.astro:348](src/pages/methodology/index.astro:348) renders each matrix group label as a `<p>`. It does not semantically head or label the following `<ul>` at line 354. Heading navigation exposes only “The whole table,” not Unanimous, Adjacent, and Split. This conflicts with [DESIGN.md:565](docs/DESIGN.md:565), which says a section heading is a heading. Use an `h4` or an explicit labelled-section relationship.

No other standards or over-engineering findings.

## Spec

- **Missing semantics.** [index.astro:348](src/pages/methodology/index.astro:348) visually heads each group but does not provide the required heading or landmark semantics.
- **Wrong tile size.** [index.astro:98](src/pages/methodology/index.astro:98) uses `text-[0.75rem]`, which is 12px at the default root size. The requirement says 11px. The matching value is `0.6875rem`, already used by the panel-count label and `StateBadge.astro`.

No scope creep found.

## Verification

- `scripts/` is unchanged.
- Matrix source has 20 rows grouped 4, 6, and 10.
- Rows are imported from `SYNTHESIS_MATRIX`; no literal rows appear in the page.
- Existing built HTML contains 20 matrix `<li>` elements.
- Vocabulary/gloss wording and TOC declarations are unchanged.
- Contrast ratios range from 6.75:1 to 14.91:1, passing AA.
- Exact-head PR #47 CI and Cloudflare checks are green.
- The supplied 390px screenshot shows no overflow, and fixed grid widths activate only at `sm`. Browser permission blocked an independent `scrollWidth` measurement.
- Local validation could not start because the read-only sandbox blocked `tsx` IPC.

Standards: 1 finding. Spec: 2 findings. The unlabelled matrix groups are the worst issue on both axes.

**REVISE**


