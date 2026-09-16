# Three seats verification — September 16, 2026

Editor: Stew, Anthropic Claude Fable 5.1. Probes and implementation: two
separate Opus 5 sessions. This record covers the live diagnostics and
research demonstrations under the released v1.31 launcher and the release
checks. Nothing in it is a finding; the demonstration package is the same
public-record census lookup used on September 15 and is not a YEGFacts
claim.

## Codex seat (`openai`, codex-cli 0.154.0)

Profile `codex-captured-read-only-0.154.0`: per-attempt CODEX_HOME holding
an auth symlink and a two-line config, the vendor binary rather than the
terminal shim, the flags listed in the plan, the model request routed
through the recording program to chatgpt.com, the v1.30 denylist over every
captured request body. The planted canary file is read under this profile
and recorded as allowed.

Diagnostics (implementer's session, two runs, both passed): attempts
`5375dfa7be4dba51` and `e75bfde6dad88ce1`. Each fetched the example.com
heading, searched once and returned the first result title, read the
planted token, and listed its tools; each capture carried a successful
search-endpoint request, the effort field `high`, and no private text from
the ten sources present on this machine.

Research demonstration (editor's session): attempt `f8f1c4db86a6404f`
through the package-in, report-out audit entry point, demonstration package
SHA-256 `56f5b2ce7bb99d201fc2a611b435d09551220182373faf01538c67aab2394e17`.
Canary passed with a passing capture check (16 requests, manifest
`114a8a609656427d8d35910eb9de1650c26e5e19b1e767006494d2203c256024`). The
research run exited 0 with 49 captured requests, 39 with a JSON body
searched, the package seen 25 times, no private text; structural check
pass, capture check pass, admitted for research. Upstream chatgpt.com.
Authorization and account-id headers are redacted in every retained file.
The model returned 1,010,899 for the census subdivision and 1,418,118 for
the metropolitan area, citing Statistics Canada tables, and listed the pages
that failed to load. Those figures are the output of a demonstration, not a
finding.

| Artifact | SHA-256 |
|---|---|
| capture manifest | 704348a347f6885c23b31b5429b0c1593dbdb23a928d890fabab71955369b525 |
| stream stdout | 0162d5d0916615c8e89a9d1b590d0e3b3a93d3647a9e0d4e6be2113ed7940a43 |
| final message | 29bddbb7acbed077801347c0335dff3caccaabbc1348177dcc398abdd8bf39b4 |
| check report | 231dcdc0ab123425388ad40c0808678bb85473ed1b92bd2e5e1ebbe5cda3332a |

Transport note: this build opens a WebSocket first and falls back to HTTPS
after several retries; the fallback is recorded, not gated, and costs about
a minute per invocation.

## Gemini seat (`google`, agy 1.2.4 at release)

Profile `agy-denied-tools-record-only-1.2.4`: per-attempt empty HOME under
an opaque temporary path holding the login token and installation id as
symlinks and a settings file that denies file, write and command tools; no
capture; the v1.30 denylist over the CLI's event stream, its local
transcript and the final response; `context_proof` reported as
`record-only`.

The CLI reported version 1.1.28 in the morning probes and 1.2.4 by the
afternoon runs: it updated itself during the day. The version is recorded,
not gated.

Diagnostics (implementer's session): the first run was refused, correctly.
The CLI's fetch tool saves the fetched page under HOME and tells the model
that absolute path; with the home under the private archive that path
carried the operator's home directory, which is on the denylist, and the
check found it six times. The home was moved to an opaque temporary path
and the second run, attempt `ba2fe4d58dcf61c1`, passed: fetch returned the
heading, the two file reads were refused by the deny rule, the tools that
completed were `read_url_content` and `search_web` only, no private text in
33 record entries.

Research demonstration (editor's session): attempt `50cfc3462bf017e0`
through the same audit entry point and package. Canary passed with a
record-only check over 36 record entries. The research run exited 0; its
local record held 365 entries, all searched, the package seen once, no
private text; the tools that completed were `search_web` and
`read_url_content`; structural check pass, record check `record-only`,
admitted for research under this seat's rule. The model returned 1,010,899
and 1,418,118, citing the Statistics Canada census profile pages, and
reported no failed URLs: its fetch tool reached the pages the other two
seats' tools could not. Those figures are the output of a demonstration,
not a finding.

| Artifact | SHA-256 |
|---|---|
| record manifest | 258f49087691d24eed1d3d90145e04a7421962ffdb05e1baba80e0a80cfea4c3 |
| stream stdout | f89e03f81a5ef56c2749900f949ff272430e4bf312e9cd1678cfd92ea78c1b26 |
| final message | e33e9bf11a31b7d3fc2a4d36b406f67dcebfba4cdafc3e915d21fb83bf8608e6 |
| check report | 4be5b24bd47b16b4b2cb7f5e727c53d86100b7f56b47e0568cf9a321ce2374c0 |

## After the simplify pass

The launcher's run sequence was refactored after the demonstrations above
(one run function for canary and research, every seat's per-attempt home
under the opaque temporary path rather than the archive, one line parser
for the three streams). The two admitted research runs above were produced
by the build before that change; their retained files are unaffected except
that the Codex run's per-attempt home state sits inside its attempt
directory, which later builds no longer keep. Each new seat was then run once
more, as a diagnostic, under the refactored launcher:

- Codex attempt `a7aac25bc4b5ed56`: canary pass, capture check pass, 16
  requests captured, 6 with a JSON body searched, package seen 3 times,
  upstream chatgpt.com, manifest
  `ce4977cfd3b8f112959f7110d08f13353542d6e7bb088626d6ee161630d9e3a9`. The
  real auth file was unchanged afterwards.
- Gemini attempt `f0391e209709d2be`: canary pass, record check `record-only`,
  30 record entries searched, package seen once, fetch returned the heading,
  file reads refused, manifest
  `52d9da809a66cfec05ce3d6d89057b8c66b437fb65e32c211520f9b05a58a9e8`.

## Limits, once more

Codex: the check refuses a run that carried private text; it cannot stop
the read that produced it. Gemini: the check sees what the model produced
and what its tools returned, not what it was sent, and nothing shows where
the request went beyond the fetch tool having really retrieved the page.
Both: one attempt, one build, one day; complete isolation is not available
on subscription CLIs; no historical run is certified.

## Implementation and release checks

Root verification on the final branch head:

- `npm test`: **467 passed, 1 skipped**, across 28 files. The skipped test is
  the opt-in live diagnostic; the live attempts above cover it.
- `npm run validate`: OK, 7 stories, 17 claims, 1 commitment, 8 topics, 162
  evidence entries.
- `npm run validate:diff` against origin/main: every change that owes a
  changelog entry has one (v1.31).
- `npx astro check`: 0 errors, 0 warnings. `npm run build`: pass.
- Exposure audit: no fail-class findings; 40 warnings, all pre-existing.
- Duplication audit: no fail-class findings; 45 cross-page warnings, all shared
  explanatory text between the methodology page and the changelog.
  Sitemap audit: sitemap and built site agree.
