> Final independent code/editorial review, preserved unchanged below. SHA-256 of the original report: `d5fd903c6326981bd843a8ab1bf9d178bab841cae1d3cada16535545b6b593a4`. “Live Google refusal” below means the local launcher refused the Google selector; no vendor request or consultation source audit was made. The optional DESIGN.md tense consistency edit was subsequently applied.

# Quality re-review: reviewer isolation batch, final

**Verdict: PASS. No remaining Critical or Important findings.**

**Model provenance:** `claude-opus-5`, high effort. Code and editorial review
only. This does not certify that any reviewer runs in isolation; the batch's own
context-proof question stays open by design.

**Scope.** Root's post-review changes, read as the working diff against the
index, plus the appended `verification.md`. Nine files, all small. The staged
batch I reviewed first is unchanged underneath.

## Checks I ran on the current tree

- `npx vitest run` → **367 passed, 1 skipped**, 25 files. Unchanged.
- `npx tsc --noEmit` clean. `npm run validate` OK. `npm run check` → 136 files,
  0 errors, 0 warnings, 0 hints.
- `attempt-record.ts` CLI against a live Google refusal: emits the row with
  `provider`-correct model, `status: blocked`, `admitted_for_research: false`.
  The `sha256File` swap produces a hash identical to `shasum -a 256` on the same
  `validation-errors.txt`.
- `stream-boundary.ts --check research` still refuses with the context-proof
  reason, so the contract lock is intact. `--check structure` now exits 2 with
  the corrected message; `--check canary`, the only caller, is untouched, and
  `checkStructure` remains exported for `checkCanary`, `admitForResearch` and the
  tests.
- `install-output.ts` CLI installs once, then refuses the second write.
- No live model call. `invoke-reviewer.sh` is not in the diff: no runtime
  admission change.

## Both Important points resolved

**Retention tense.** `src/pages/methodology/index.astro:375` now separates what
happens today from what a future run must do, and `methodology/changelog.yaml`
adds "Historical run records are not backfilled." Nothing claims a historical
response was retained or a past manifest enriched. That was the specific risk;
it is gone.

**CLI version.** `docs/DESIGN.md:338` and the changelog highlight both read
"2.1.266/2.1.267", matching `PROBED_VERSIONS`, the launcher's refusal strings and
the `cli_version` in `candidate-diagnostic.json`.

## Declined cuts, dispositioned

The explicit metadata whitelist is the better call, and I'd have argued for it:
that list is the private-to-public boundary, and a generic `opt()` would make the
one place worth reading by hand harder to read. The named custodian follows an
adopted retention decision that requires a responsible person, on a page that
already names him twice for accountability. Leaving four copies of
`isEntryPoint()` is accepted duplication, cosmetic, no behaviour attached.

## One optional consistency note, not a blocker

`docs/DESIGN.md:354` still reads "Every attempt has an immutable private archive
… exact package, stdout, stderr, complete final response …" in the present tense.
It survives because it is an engineering contract and line 343 of the same block
already says no provider has an approved research profile, so no reader of that
section is misled. If root wants the tense uniform with the changelog, that is
the last spot. It does not hold the merge.

Four accepted Minor fixes (README phrasing, race log line, `sha256File` reuse,
dropped exports and the `--check structure` branch) verified in place, plus the
pre-created archive-root 0700 runbook line under "Recovery note".
