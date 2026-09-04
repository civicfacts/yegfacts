## Visual and Markup

Screenshot [reviews/2026-09-04-methodology-flow/flow-1280.png](reviews/2026-09-04-methodology-flow/flow-1280.png) was inspected directly alongside [src/components/NumberedSteps.astro:45](src/components/NumberedSteps.astro#L45) and [src/styles/global.css:691-718](src/styles/global.css#L691-L718).

- The spine is one continuous vertical line from numeral 1 down to numeral 5, broken only behind each digit.
- With `sm:self-start` added at [src/components/NumberedSteps.astro:45](src/components/NumberedSteps.astro#L45), the numeral span no longer stretches across the grid row height. Its `sm:bg-paper` ground covers only the line box of the digit itself.
- Below each digit, `.step-flow::before` remains exposed down the full body and exit items of steps 1 through 4 into the subsequent step.
- The spine starts at `var(--flow-node-y)` behind numeral 1 ([src/styles/global.css:712](src/styles/global.css#L712)) and terminates at `calc(100% - var(--flow-node-y))` behind numeral 5 ([src/styles/global.css:716](src/styles/global.css#L716)). It does not extend above step 1 or below step 5.
- No horizontal row dividers cross the spine column ([src/components/NumberedSteps.astro:39](src/components/NumberedSteps.astro#L39)).

---

## Provenance and Git State

- **Working tree:** Clean of modified tracked files. Only the untracked reviewer capture `reviews/2026-09-04-methodology-flow/gemini-output_1.raw.md` from the current session is present in `git status --porcelain`.
- **Finding (Provenance mismatch):** The footer SHA in [dist/methodology.html:1](dist/methodology.html#L1) is `fcdb744` (`Deployed from commit/fcdb744`), whereas HEAD is `d66dc05` (`d66dc05010f1c0fb9e97c1a347c565f0fe4bb38a`).
  - Commit `fcdb744` applied the `sm:self-start` fix to [src/components/NumberedSteps.astro:45](src/components/NumberedSteps.astro#L45).
  - Commit `d66dc05` added the critique record and screenshots ([reviews/2026-09-04-methodology-flow/README.md:58-68](reviews/2026-09-04-methodology-flow/README.md#L58-L68)), advancing HEAD.
  - [dist/methodology.html:1](dist/methodology.html#L1) was not rebuilt after commit `d66dc05`, so the footer SHA does not equal HEAD.
- **Context note:** [reviews/2026-09-04-methodology-flow/codex-review_7.md:8](reviews/2026-09-04-methodology-flow/codex-review_7.md#L8) states that `git log -1` contains the `sm:self-start` fix. `git log -1` is `d66dc05` (critique record); the code fix is at `HEAD~1` (`fcdb744`).

---

REVISE
