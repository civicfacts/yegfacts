## Standards

- **P1** [methodology/changelog.yaml:4](methodology/changelog.yaml:4): Current `origin/main` already owns v1.21 through v1.24. Rebase and assign the next free version, currently v1.25. The branch also conflicts with current main in the register, changelog, validator, and tests.

- **P2** [register-checks.ts:538](scripts/lib/register-checks.ts:538): `prior_triage.readers` requires two entries, not two distinct readers. `["gpt-5.6-sol", "gpt-5.6-sol"]` passes validation. Require distinct names and add a regression test.

- **P2** [register-checks.ts:510](scripts/lib/register-checks.ts:510): The validator still describes the stored text as "the sentence they gave" and reports "the reason those readers gave" at line 542. [The test fixture](tests/register-checks.test.ts:609) also invents a joint reason. The corrected provenance says it is one unidentified seat's wording selected by the combined file.

## Spec

- **P1** [intake/register.yaml:261](intake/register.yaml:261): Dusty Raven said only "my taxes." The repaired proposition removes "property," but the question page still places it under "Edmonton property taxes" and says assessment and tax notices would verify it. The surrounding page therefore continues supplying an assertion the commenter did not make.

- **P1** [intake/register.yaml:1768](intake/register.yaml:1768): The canonical claim ID remains `property-taxes-rising-sharply`, even though the changelog concedes "there is no sharply anywhere." [The claim route](<src/pages/claims/[id].astro:66>) publishes that ID in the URL. Rename the canonical ID and redirect the old address.

- **P2** [methodology/changelog.yaml:16](methodology/changelog.yaml:16): "The first audit that looked backwards" and "Nothing had turned round until that day" contradict the same changelog's earlier retroactive framing and freshness audits. Qualify this as the first backward audit of the register or claim-to-quote fidelity.

- **P2** [methodology/changelog.yaml:23](methodology/changelog.yaml:23): Only three of the eleven recorded prior declines are explicitly undisputed truisms, not four: roads carrying services, cyclists paying taxes, and taxes funding unused services. Change the count or identify the fourth and its basis.

Standards: 3 findings; worst is the version collision. Spec: 4 findings; worst is the remaining property-tax attribution.

VERDICT: REVISE
