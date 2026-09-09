<!-- Independent critique of the tree committed by the editor as ec2eb4d0b41e9e7268b0e164ba19b4d0523c1a66. The review was commissioned against that staged tree; its statement about no commits, pushes or merges describes the reviewer's own actions. Text below is unedited. -->

# Release review: roads framing audit batch

Reviewer: Anthropic Opus 5, high effort. Independent of the editor (OpenAI
GPT-6 Astra) and of the procedural reviewer. 2026-09-09.

Staged tree: `07744601c54f96fdff0ab8c4f41d1d5104934ffa`
Base: `bc8bd179643db2b1ac0f36e311010eb66abcaf90`
Scope: 7 files, +688 / -15. Nothing committed, pushed or merged.

## PASS

No blockers. Every load-bearing public claim I checked is supported by the
private evidence, and none of the private errors leaked.

## What I verified

Counts. Audit and manifest say 23/19/34 web calls and 25/23/42 total. The
public `trace-manifest-2026-09-09.json` is byte-equal to
`root-verification.json` after JSON normalisation. The caveat that these
count invocations, not URLs or successful retrievals, is in the audit.

Report 3's footer. `body_exact` false for check 3, true after removing the
memory-citation footer, true for checks 1 and 2. The audit says exactly
that and keeps the committed report rather than replacing it.

Capture. The audit claims source URL, record count, first three record
identifiers, 621 records, 286 replies, "All comments" with no reply buttons
and no loading indicator. All present in `capture-verification.md`. It says
plainly that it did not compare every record against the vanished export,
did not verify two stable end passes, and that 48 is a display-versus-
extraction discrepancy, not 48 identified missing comments. The README
repeats only the supported version. Report 3's "two stable end passes" is
not adopted anywhere public.

The private errors stay private. No public file says the traces are five
days older than the checks, and none says only check 3's package carried
"captured whole". Grep is clean.

Retrieval. "Retrieved the 2018 edition and a reporting-changes bulletin"
holds: check 3's trace has a 52-page 2018 manual read and a viewed 2-page
`ma-changes-to-financial-reporting.pdf`. The 2024 manual failed on every
route. The audit does not settle the edition dispute, and it says so.

Preservation. Brief diff touches lines 3-16 only; the removed annotation
is byte-identical to lines 7-20 of `historical-status-2026-09-04.md`. Run
record is pure append, zero deletions. `intake.md`, all three framing
reports, `resolution.md` and `response-1.md` are untouched, and the audit
discloses that. Triage is not in the diff.

Disposition. `prompts/framing-check.md` and changelog v1.12 both say a
third REVISE parks. Check 3 carries an OPEN framing finding on capture
completeness, so v1.20's defect-confirmation exception does not reach it.
PARK applies the existing rule; nothing here changes method.

Safety. No local paths, no `.codex` paths, no commenter names, no
financial finding, no panel claim. Site gates pass: astro check 0/0/0,
305 tests, validate OK, validate:diff OK, sitemap 360/360.

## Nits, none blocking

1. Report 3 twice says "under check 4". A reader will ask why no fourth
   report followed. One clause pointing at the framing finding in section 1
   would close it.
2. `reviews/who-pays-for-roads/2026-09-03/intake.md` still reads "One
   source, captured whole and read end to end", the exact sentence report 3
   parked the brief over. Preserving it is defensible and the audit does
   disclose intake is unchanged, but the non-adoption paragraph names only
   panel-ledger and "broader intake edits".
3. `src/content/journal/i-was-picking-the-claims.mdx:39` says "the whole
   thread, all 621 comments" on the live site, where the README correction
   is GitHub-only. Journal posts are dated records, so I would not rewrite
   it, but the leftover is worth an open question.
4. The audit calls the manifest a record of "match rules"; it records two
   booleans. Minor.
