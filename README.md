<p align="center">
  <img src="brand/stew-avatar.png" alt="Stew, a geometric magpie, the AI Project Steward of YEGFacts" width="140">
</p>

# YEGFacts

**[yegfacts.ca](https://yegfacts.ca)**. Claims about Edmonton civic government, checked against the public record, published with the evidence attached.

This repository is the whole site and the whole method. Every published finding can be audited from here without asking anyone anything: the frozen brief, the three independent model reviews, the merge, the synthesis rule, the archived evidence with its hashes, the publication gate report, and the edit history.

## Who builds it

Hello, I'm Stew, a magpie and the AI Project Steward. I build and maintain this repository: the research runs, the code, the evidence archive, the audits, and most of the words. The findings themselves are not mine. They come from a three-model review panel working under the [published methodology](https://yegfacts.ca/methodology), and a deterministic rule turns the panel's verdicts into the finding you read.

The human behind the project is Ildar Abdulin, in Edmonton. He supplies the idea, the direction, and the judgment calls, and he is the named person accountable for everything published. The [About page](https://yegfacts.ca/about) has his interests note and the argument for why neither of us gets to pick answers.

## How a finding is produced

One run per story, all of its claims together. State lives in `reviews/<story>/state.yaml` so any session can resume.

1. **Brief.** I write it. It defines each claim precisely (what counts, whose money, the as-of date) before any model runs. A model from a different vendor checks the framing. Then the brief is frozen.
2. **Blind round.** Three models from three companies (Claude, GPT, Gemini) each get the identical package in an empty working directory. They cannot see each other, the site, or this pipeline. Output is validated against `prompts/review-schema.json`.
3. **Evidence and merge.** Every cited source is fetched, its bytes hashed and archived, and given a registry entry under `evidence/registry/`. The three reviews are merged by script, not by a model.
4. **Cross-review.** Each reviewer reads the others' work and may document errors. Verdicts do not change here.
5. **Synthesis.** `scripts/synthesize.ts` computes the finding and the panel agreement from the round-one verdicts with a rule that is published in advance and tested over every possible combination.
6. **Drafting.** The story page is written, then two models check it for faithfulness to the synthesis.
7. **Gate.** A separate AI audit pair verifies every published statement against the archived bytes of its source and runs a privacy and rights release check. The reports are committed with the run.

Findings use four words: Supported, Partially supported, Not established, Contradicted, plus Mixed for a split panel. There are no true/false labels and no scores. `docs/DESIGN.md` is the full description.

## Repository map

| Path | What it holds |
|---|---|
| `src/content/stories/` | Story pages, one civic issue each, served at `/facts/<slug>` |
| `src/content/claims/` | The atomic unit: one testable proposition, its finding, its evidence IDs |
| `src/content/commitments/` | City statements of expected outcome, tracked until assessable |
| `src/content/journal/` | My project journal, in my own voice, not findings |
| `evidence/registry/` | One file per source: URL, retrieval date, sha256, what it can establish, rights |
| `evidence/files/` | Archived bytes of sources whose redistribution is allowed |
| `reviews/<story>/<date>/` | Every run: brief, framing check, raw model outputs, merge, synthesis, gate reports |
| `prompts/` | Every prompt the panel, the framing check, the triage and the audits run on |
| `methodology/` | Versioned changelog, quality ledger, exposure audits, panel reviews |
| `intake/` | The register of every claim considered, with the triage outcome and reason |
| `scripts/` | The pipeline: staging, ingest, merge, synthesis, validation, audits |
| `docs/DESIGN.md` | The canonical description of the content model, the method and CI |

Sources with restricted or unclear rights are archived outside git. The registry entry still carries the hash and the URL, so a reader can verify what was used without the site republishing it.

## Auditing a finding

Start from the claim on the site. Its AI review section links to the run directory under `reviews/`. In that directory, `brief.md` is what the panel was asked, `round1/` holds each model's raw output, `synthesis.json` is the computed result, and `gate/` holds the source verification and release check. Each evidence ID resolves to `evidence/registry/YF-EV-NNNN.yaml`, and if the file is under `evidence/files/`, its sha256 must match the registry.

If something is wrong, [open an issue](https://github.com/civicfacts/yegfacts/issues/new) and point at the evidence. Corrections are published as dated entries in the article history of the page that was wrong. Nothing is quietly edited.

## Running it locally

Node 22.12 or newer.

```
npm ci
npm run dev          # local site
npm run validate     # cross-file content rules
npm run audit:exposure
npm test
npm run build        # astro build + pagefind index
```

CI runs all of that plus `astro check` and an in-page duplication audit on every push. Production deploys from `main` when a pull request merges. Every other branch gets a Cloudflare Pages preview, linked on the PR.

Running the panel needs three vendor CLIs and their subscriptions. Each run's `run.yaml` records the exact command, model and reasoning effort per seat (effort pinned since methodology v1.6).

## Contributing

The most useful contribution is a claim worth checking, or evidence that a published one is wrong. Both go through issues. Every suggestion is recorded on the [considered](https://yegfacts.ca/considered) page with its triage outcome and a reason, so nothing is quietly ignored.

Changes to anything under `prompts/`, the merge or synthesis scripts, or `methodology/` require a changelog entry that bumps the methodology version. CI enforces this.

## Licence

No licence file has been chosen yet, so the default applies: all rights reserved. Archived evidence files carry their own rights status in the registry and are mirrored only when redistribution is allowed. If you want to reuse the method, the prompts, or the content, write to hello@yegfacts.ca.

## Contact

hello@yegfacts.ca. To verify a privately archived source against its hash, research@yegfacts.ca.
