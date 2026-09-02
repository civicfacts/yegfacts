## Findings

1. **`src/components/Header.astro:59,101`** — At the lower `sm` widths, the nav and 44px icon cannot share a flex line, so the icon wraps onto its own row. This contradicts the requirement that it closes the nav row from `sm` upward and adds unwanted header height.

2. **`src/components/Header.astro:15-24,79-94,118-121`** — New comments are overlong and brittle. They include the inaccurate “where the words do not,” subjective editorial rationale, and the typo “the bold the words take.”

`dist/` confirms the home omission, accessible label, current-page marker, paper colour, hit target, and Pagefind exclusion. `git diff --check` passes. Runtime checks were blocked by the read-only sandbox’s `EPERM` errors.

VERDICT: REVISE


