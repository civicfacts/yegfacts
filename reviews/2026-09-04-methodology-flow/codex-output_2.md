## Spec

### Round 1 findings

- **CLOSED:** The misleading `Leaves here` label and metadata styling are gone. Outcomes now have typed sentence-case labels at [NumberedSteps.astro:23](src/components/NumberedSteps.astro:23).
- **CLOSED:** The fabricated-citation rerun now follows the three reviewers reading each other’s work, correctly placing it at cross-review at [index.astro:45](src/pages/methodology/index.astro:45).
- **NOT CLOSED:** The fairness-check wording now says every brief still failing after three reports is parked at [index.astro:37](src/pages/methodology/index.astro:37), but v1.20 sends surviving defect findings to a fourth defect-confirmation report at [framing-check.md:154](prompts/framing-check.md:154).
- **CLOSED:** The invented withdrawal rule is replaced with the dated page-history correction rule at [index.astro:61](src/pages/methodology/index.astro:61).

### Outcome truth

The implementation contains **ten outcomes**, not nine.

1. **True:** Two-reader triage can decline or park, with a published reason. [index.astro:28](src/pages/methodology/index.astro:28)
2. **True:** Named-person accusations are recorded and then declined. [index.astro:29](src/pages/methodology/index.astro:29)
3. **True for the ordinary revision rounds:** A `REVISE` report returns the brief for revision before freezing. [framing-check.md:144](prompts/framing-check.md:144)
4. **False as written:** A surviving defect after report three is corrected and receives a fourth confirmation; it is not parked. [framing-check.md:154](prompts/framing-check.md:154)
5. **True:** Missing valid reviewer output after retry prevents synthesis and therefore any canonical finding. [DESIGN.md:393](docs/DESIGN.md:393)
6. **True:** A material fabricated citation found during cross-review triggers a fresh claim-level blind round. [DESIGN.md:260](docs/DESIGN.md:260)
7. **True:** Any panel containing Supported and Contradicted resolves to Mixed, with the split shown. [DESIGN.md:364](docs/DESIGN.md:364)
8. **True, but hard to parse:** “A claim a framing concern was right about” at [index.astro:53](src/pages/methodology/index.astro:53) should become “If a framing concern is right and there is no fair repair, the claim is parked with a public reason.”
9. **True:** Unsupported or imprecise statements are fixed before publication. [DESIGN.md:293](docs/DESIGN.md:293)
10. **True:** A changed finding receives a typed, dated entry in the page’s history. [DESIGN.md:118](docs/DESIGN.md:118)

### Labels

`Stops here`, `Loops back`, `Continues`, and `Corrected later` are plain. `Fixed first` at [NumberedSteps.astro:24](src/components/NumberedSteps.astro:24) does not say “first” before what. `Fixed before publication` is self-contained.

### New verification issue

[dist/methodology.html:2](dist/methodology.html:2) identifies itself as deployed from `9e4d530`, while reviewed HEAD is `7c9b6f0`. The artifact contains the new copy, but its own provenance shows it was produced before the latest commit, so it is not an exact-HEAD build.

## Standards

- **CLOSED:** The reserved uppercase metadata treatment was removed.
- **CLOSED:** The three drift claims now say only that outcomes remain attached to their steps and that critique checks their truth. [DESIGN.md:646](docs/DESIGN.md:646)
- **CLOSED:** The spine now uses the centred 2rem track and structural end caps, without glyph metrics. [global.css:691](src/styles/global.css:691)
- No new documented-standard violations or baseline code smells found.

Spec: two reader-facing findings, led by the false three-report outcome. Standards: zero open findings. The supplied build also needs regeneration from exact HEAD.

**REVISE**
