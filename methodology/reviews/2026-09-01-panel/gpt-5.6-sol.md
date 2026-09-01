 trustability, honesty gap**

Null `evidence_id` values prevent readers from tracing raw reviews into the canonical registry. Unfetchable citations are even worse: the pipeline records the failure but does not clearly disqualify or flag the evidence, while the method promises working URLs and retained bytes. A later snapshot also proves what staging fetched, not what the reviewer actually read.

**Recommendation:** Block publication whenever load-bearing evidence lacks a registry ID, successful snapshot and hash; show a red "not verified" status for non-load-bearing failures.

### 2. The advertised human gate no longer exists

**CRITICAL / honesty gap**

The design says authority includes a human who verifies every cited source and that "no publish path skips this." Methodology v1.1 says the founder's manual review was replaced by two AI audits. Founder accountability and the power to revert are not human source verification.

**Recommendation:** Replace every "human verified" claim with the actual v1.1 process and show the gate type, audit reports and completion date on each published claim.

### 3. Result balancing compromises claim selection

**CRITICAL / methodology, trustability**

The founder controls which claims enter the system, their wording, scope and accounting date. The launch rule then requires verdicts that "cut in multiple political directions." That creates pressure to select or retain claims based on the desired distribution, even if no verdict is manually altered.

**Recommendation:** Launch from a dated, pre-registered claim slate selected for topic coverage, never from a required verdict distribution.

### 4. The final panel is not independent

**IMPORTANT / methodology**

Round 1 is isolated, but synthesis uses round-2 verdicts issued after every reviewer sees the others' evidence and conclusions. Instructions against convergence cannot remove anchoring, deference or shared-error reinforcement. The deterministic matrix then combines three dependent judgments as though they were independent votes.

**Recommendation:** Synthesize the locked round-1 verdicts; use cross-review only to document errors and trigger a fresh blind run when a material correction is accepted.

### 5. A bad brief produces a precisely wrong answer

**IMPORTANT / methodology**

Reviewers must accept the founder's normalization, while the frozen brief controls definitions, denominators, time windows and what counts as success. `interpretation_notes` can record trouble, but nothing described forces the pipeline to stop. Three careful reviewers can therefore answer the wrong proposition consistently.

**Recommendation:** Halt synthesis when any reviewer flags a material framing ambiguity, revise the brief and rerun round 1.

### 6. "Confidence" measures panel shape, not truth

**IMPORTANT / methodology**

The matrix assigns Moderate or Low confidence from verdict combinations, regardless of evidence quality. Unanimous reviewers can all repeat the same search-result error and still produce High confidence. There is no published calibration showing that these labels predict correctness.

**Recommendation:** Replace canonical "confidence" with an accurately named "panel agreement" field and retain reviewer-level confidence separately.

### 7. Known falsehoods remain inside the audit trail

**IMPORTANT / trustability**

One round-2 artifact contains a false accusation that is corrected only in a separate gate report. A journalist opening the raw review encounters the false statement without an adjacent warning and must already know which later document corrects it. An audit trail should preserve errors, but it should not leave known errors unmarked.

**Recommendation:** Render an append-only correction annotation beside every gate-rejected statement while preserving the original raw file.

### 8. Repository visibility is overstated as tamper evidence

**IMPORTANT / honesty gap**

The claim that an editorial override "would be visible" is too strong. The founder controls the briefs, repository, deployment and public history; a repository shows what is currently committed, not omitted evidence, discarded drafts or deleted history. Openness improves inspectability but does not prove editorial independence.

**Recommendation:** Show the deployed commit SHA on every page and change the promise to "published changes are inspectable in the current public history."

### 9. Models are being allowed to attest their own identity

**IMPORTANT / honesty gap**

A reviewer-generated ID such as `gpt-5` conflicts with a runner manifest claiming `gpt-5.6-sol`. Model output is not trustworthy runtime provenance, and readers should not have to decide which label is authoritative. This weakens the site's reproducibility claim for no benefit.

**Recommendation:** Reject model-supplied identity fields and inject the seat, resolved model, CLI version and command from the runner manifest.

### 10. Composite paraphrases can manufacture the target

**IMPORTANT / trustability**

Calling the cards composite paraphrases discloses that they are not quotations, but "Claims we're seeing" still implies observed prevalence. Combining several posts can create a stronger or cleaner proposition than anyone actually made. That gives the founder substantial, unaudited control over the apparent public argument.

**Recommendation:** Rename the section "Claims this story checks" and remove any implication of frequency unless captured examples and dates are provided.

### 11. The audit trail is structured for repository archaeology

**IMPORTANT / presentation**

A complete audit may require moving among the claim, evidence registry, archived file, two review rounds, combined evidence, synthesis rule, gate reports, run manifest and changelog. That may be technically public while still failing the journalist-in-10-minutes test. Null IDs and separate corrections make the path harder.

**Recommendation:** Generate one "Audit this claim" page containing direct links and statuses for every stage in that chain.

### 12. The stated reading hierarchy has too many competing answers

**MINOR / presentation**

The design calls for a one-line summary, short answer, TL;DR, "Claims we're seeing," "What actually happened" and checked-claim cards. Because stories have no verdict but claims do, readers may encounter several summaries before finding the exact proposition and result. On a multi-claim story or narrow screen, this is especially likely to obscure the answer.

**Recommendation:** Put a compact claim card first: exact proposition, verdict, one-sentence reason and as-of date, with every disclosure below it.

## The three changes I would make first

1. Make evidence IDs, successful capture and verification status publication-blocking.
2. Reconcile all trust copy with methodology v1.1 and expose the actual gate reports on every claim.
3. Pre-register claim framing and selection, then remove verdict distribution from the launch criteria.
