## Spec

### Stranger read

- [NumberedSteps.astro:40](src/components/NumberedSteps.astro:40) `"Leaves here"` is misleading. Rewrites, reruns, Mixed findings, and pre-publication repairs do not leave the process. The eye stalls at step 4, where `"publishes as Mixed"` appears under `"Leaves here"`. The detached borders also read as notes, not branches from the spine. Remove the generic label and prefix outcomes plainly: `Stops here`, `Loops back`, `Continues as`, `Fixed before continuing`, and `Withdrawn later`.
- [index.astro:41](src/pages/methodology/index.astro:41) assigns the fabricated-citation rerun to blind research. The method produces it during cross-review at [index.astro:106](src/pages/methodology/index.astro:106) and [DESIGN.md:260](docs/DESIGN.md:260). Mention cross-review in short step 3, or the diagram misstates where the branch occurs.

The spine establishes sequence, but it does not itself demonstrate that nobody chooses an answer. The S/C-to-Mixed example does that work. Giving it the precise label `Continues as` would make the deterministic rule visible.

### Truth of the nine exits

1. **True.** Decline or park, with a register reason, matches [DESIGN.md:195](docs/DESIGN.md:195).
2. **True.** Named-person accusations are recorded and declined under [DESIGN.md:210](docs/DESIGN.md:210).
3. **Too broad.** [index.astro:34](src/pages/methodology/index.astro:34) says, `"A brief that fails its fairness check is not frozen. It is rewritten first."` After the third `REVISE`, the brief is parked rather than rewritten, per [framing-check.md:144](prompts/framing-check.md:144). Say: `A brief is not frozen unless the check passes. After the allowed revisions, it is parked.`
4. **True.** A missing reviewer after retry halts before synthesis under [DESIGN.md:393](docs/DESIGN.md:393).
5. **True event, wrong short step.** Cross-review triggers the claim-level blind rerun, as noted above.
6. **True, but not an exit.** Supported plus Contradicted becomes Mixed under [DESIGN.md:364](docs/DESIGN.md:364), then continues to publication.
7. **True.** An unrepairable valid framing concern parks the claim with a public reason under [DESIGN.md:284](docs/DESIGN.md:284).
8. **True, but not an exit.** The unsupported statement is repaired and the page continues through the gate, per [index.astro:114](src/pages/methodology/index.astro:114).
9. **Unsupported and contradicted by the documented vocabulary.** [index.astro:57](src/pages/methodology/index.astro:57) says, `"A finding later found wrong is withdrawn."` The correction policy calls for a dated correction on the same page at [about.astro:105](src/pages/about.astro:105). `board_withdrawn` explicitly leaves the finding unchanged and says nothing was corrected at [DESIGN.md:71](docs/DESIGN.md:71). Replace this with the dated-correction rule unless withdrawal for wrong findings is first added to the method.

### Spine construction

- [global.css:683](src/styles/global.css:683) duplicates font metrics in `0.2545 * 1.125rem`. Center the numeral within the existing 2rem grid column only for `.step-flow`, then place the spine at `left: 1rem`. That keeps the shared numeral markup and removes the glyph-width dependency.

### Other constraints

No issue found with 390px width, muted-text contrast, semantics, or scope. Muted text on paper is about 5.87:1. The built HTML contains nine sections and five `"Leaves here"` paragraphs, all `<p>` elements. Flow CSS starts at 40rem. No new colour, gold, fill, icon, arrow, em dash, or en dash was added. The built intake and stages fragments contain no flow classes or exit content; I did not rebuild, as requested.

## Standards

- [NumberedSteps.astro:40](src/components/NumberedSteps.astro:40) uses the reserved 11px uppercase metadata treatment for a process label. [DESIGN.md:599](docs/DESIGN.md:599) reserves that treatment for metadata. Use ordinary sentence-case text for outcome labels.
- [DESIGN.md:646](docs/DESIGN.md:646) claims the shared array means `"the picture cannot drift from what the page says."` It only keeps an exit associated with a step; the independent strings can still contradict the full method, as exits 3 and 9 do. It also omits that connectors disappear below 40rem. Replace the absolute claim and the matching comments at [NumberedSteps.astro:12](src/components/NumberedSteps.astro:12) and [index.astro:17](src/pages/methodology/index.astro:17).

Spec: four findings. The worst is presenting continuations and corrections as exits while adding an undocumented withdrawal rule. Standards: two findings and one CSS construction concern. The worst is claiming the duplicated prose cannot drift when it already has.

**REVISE**


