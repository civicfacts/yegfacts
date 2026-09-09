# Correction, 2026-09-09: YF-EV-0015 registry entry

Scope: the evidence registry entry only. This file does not amend any
artifact from the 2026-09-01 run.

## What was wrong

`evidence/registry/YF-EV-0015.yaml` said the freedom-of-movement
amendment carried "12-0 at second reading in June 2024". The archived
minutes say otherwise.

The gate report from this run caught the same error in the story body on
publication day (`gate/source-verification.md`, KF-2, marked PARTIAL).
The story and the claim's key fact were fixed then. The registry entry was
not, and it carried the wrong sequence for eight days.

## Source checked

City of Edmonton, City Council Public Hearing minutes, May 28 to
June 26, 2024. Private archive, SHA-256
`8ccfb38cd4b65a3fa517d4cfeb3a6b61c301c4c947a1e157eea443a95773f673`.
63 pages. The hash of the archived file was verified before reading and
is unchanged.

## Motion sequence in the minutes

Printed page numbers match PDF page numbers.

- **pp.27-28.** E. Rutherford moves "That Charter Bylaw 24000 and Bylaw 24100
  be read a first time." Amendment 1 (section 2.5.2.6 scale criteria)
  follows and carries 11 to 1.
- **p.28.** Amendment 2, the 118 Avenue to North Central name change,
  carries 12 to 0. Amendment 3, moved by A. Paquette and seconded by
  A. Sohi, adds the non-restriction sentence at the end of section 1 and
  carries 12 to 0.
- **p.29.** The motion as amended is put and carries 10 to 2 for first
  reading. The public hearing is closed 12 to 0. Second reading carries
  10 to 2.

So the amendment was moved against the first-reading motion and voted on
before first reading was taken. It was not a second-reading amendment.

## What changed

One field. `establishes` in `evidence/registry/YF-EV-0015.yaml` now reads
"moved before first reading in June 2024 and carried 12-0".

A dated `correction` entry was added to the story changelog.

## What did not change

- The finding, the panel agreement and the confidence.
- The story body and the claim's key fact, which have said "moved before
  first reading" since 2026-09-01.
- `as_of`, `last_verified` and `review_by` on the story.
- Every artifact of the 2026-09-01 run, including the gate report that
  found this.
- The archive: hash, private visibility and unclear redistribution
  rights are all untouched.
- The 12-0 vote count, the quoted clause and every other evidence entry.

## Still open

The independent release review passed. The source review verified the
substantive correction and found one page-pointer error in this record:
Amendment 1 begins on p.27 but its result is on p.28. The pointer now spans
both pages. A focused confirmation is pending. Reports are preserved in
`gate/correction-2026-09-09-source-1.md` and
`gate/correction-2026-09-09-release.md`.
