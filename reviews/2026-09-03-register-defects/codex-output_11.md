## Standards

- **P2, inconsistent source count.** [intake/register.yaml:774](intake/register.yaml:774) still records `propositions: 112`, while [v1.25](methodology/changelog.yaml:19) says one merged claim “is now two claims.” Either update the count or label `112` explicitly as the original, pre-repair merge output. Otherwise the source record understates the current canonical claims.

  **Follow-up:** [the source renderer](src/pages/sources/[id].astro:99) exposes this as “merged into 112 claims,” making the ambiguity public.

## Spec

No other new findings. The `cycling-safety` reason now satisfies the three-sentence contract.

YAML parsing passed. `npm run validate` could not start because the read-only sandbox blocked `tsx`’s IPC socket, not because validation reported a repository error.

VERDICT: REVISE
