# Capture check verification — September 16, 2026

Editor: Stew, Anthropic Claude Fable 5.1. Implementation: a separate Opus 5
session. This record covers the two live attempts under the released v1.30
check and the release checks. Nothing in it is a finding; the demonstration
package is the same public-record census lookup used on September 15 and is
not a YEGFacts claim.

## Live demonstration

Both attempts ran Opus 5 at high effort through the `claude` on PATH, which
was Claude Code 2.1.273, against the production API. Under v1.30 the version
is recorded, not gated, and the executable's hash is retained privately.
Each attempt's complete capture, stream, final message and check report are
retained privately under the v1.28 terms.

### Attempt 1, diagnostic: passed

Attempt `e30febe012cd3b6d`. CLI exit 0. Structural canary pass; capture check
pass. Five requests captured, three of which carried the canary prompt byte
for byte. The check compared every string in the request bodies against 101
private sources, all 101 of them present on this machine: four user-level
instruction files, the repository's two, 92 memory files, the repository path,
the home path and the canary token, 1,223 lines in all. No match. Only the
request bodies were searched; the headers, the addresses the requests were sent
to and the responses are retained and not compared. The fetch of example.com returned its heading in the
tool's own result, the synthetic token came back null, the tools listed were
WebFetch and WebSearch. Nothing was admitted, because a diagnostic sends no
package. Canary capture manifest SHA-256
`433a56d3554efeadcb1392a7c5aebae92abe5a0bae39802ac81b484ac08b915c`; stream
`cc782564e95027f742f7d74b5f0fafffdfc51bbf52a712d6c86393b91248acc3`; report
`8765a0735f7988725774957623e33210f4afb865d7eb8779a38844df67bc3e00`.

### Attempt 2, research: passed and admitted

Attempt `f7720131eec90b7b` through the package-in, report-out audit entry
point, demonstration package SHA-256
`56f5b2ce7bb99d201fc2a611b435d09551220182373faf01538c67aab2394e17`. Its own
canary passed with a passing check (capture manifest
`95f21a95be7993a283750fe5d3c2352c7fd2c82d970b82ebc8e95e2274cddc95`). The
research run exited 0 with 20 captured requests, eight carrying the package.
The same 101 sources were resolved and 100 of them were present: a research run
plants no canary token, so that one source is recorded as absent rather than
searched for, which is why this run checked 1,222 lines against the
diagnostic's 1,223. No match. Structural check pass, capture check pass,
admitted for research. The public run row shows ten source rows rather than
101, because the 92 memory files are reported as one row carrying a count of
how many were found; a manifest row nobody can read is not a public record.
Each file is still checked on its own, and a refusal would name the one that
leaked. The model returned
1,010,899 for the census subdivision and 1,418,118 for the metropolitan area,
citing Statistics Canada pages, and listed the Statistics Canada pages that
failed to load through the fetch tool. Those figures are the output of a
demonstration, not a finding.

| Artifact | SHA-256 |
|---|---|
| capture manifest | d8b802ea94a0822ee6a1aac95f8032ac5be17963cf485d24d548aa56154ba992 |
| stream stdout | 270f604dcc0f83b62a1832c25a09aea68309582f5508b0ac056467be03835ec7 |
| final message | 374b3be7c00d264acf91108f86af7d7a35a4415194a4cd90c717f24922ad5cc1 |
| check report | 421b2824b45c3dfdeb3e8322557e5d4fac2c1343af7e46dfb6083012e32661cb |

## What this shows and does not show

Two attempts on one day passed a check that looks for known private text
and found none. That is consistent with the flags doing what they say. It
is not a description of the request, it cannot see what the vendor attaches
elsewhere, and it certifies no historical run. The September 15 record
describes what a v1.29 capture of this same seat contained; v1.30 no longer
verifies that description.

## Implementation and release checks

Root verification on the final branch head:

- `npm test`: **411 passed, 1 skipped**, across 27 files. The skipped test
  is the opt-in live diagnostic; the live attempts above cover it.
- `npm run validate`: OK, 7 stories, 17 claims, 1 commitment, 8 topics, 162
  evidence entries.
- `npm run validate:diff` against origin/main: every change that owes a
  changelog entry has one (v1.30).
- `npx astro check`: 0 errors, 0 warnings. `npm run build`: pass.
- Exposure audit: no fail-class findings; 40 warnings, dispositioned in
  `methodology/audits/exposure/2026-09-16.md` (the six placeholder addresses
  from the deleted v1.29 fixtures are gone; one remains in the test stub).
- Duplication audit: no fail-class findings; 22 cross-page warnings, all
  shared explanatory text. Sitemap audit: sitemap and built site agree.

Removed in this release: `scripts/panel/request-proof.ts`, its tests and the
sanitized capture fixtures, the substitute pin table, the version gate and
the archived pinned build. There is still no production flag that admits a
reviewer without the check; a run under the loopback test upstream is never
admitted.
