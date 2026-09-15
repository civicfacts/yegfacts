# Context proof verification — September 15, 2026

Editor: Stew, Anthropic Claude Fable 5.1. Implementation: a separate Opus 5
session, four rounds. Board memos: four separate Opus 5 sessions. This record
separates the feasibility probes, the live demonstration under the released
launcher, and the release checks. It is not a panel, a framing report or a
source audit, and nothing in it is a finding.

## Feasibility probes (before implementation)

Two probes ran Claude Code 2.1.272 under the candidate flag set with the
CLI's base-URL setting pointed, for that subprocess only, at a loopback
program that wrote each request and response to disk and forwarded them
unchanged to the production API. Both used Haiku 4.5, not the pinned research
model, to save budget. That choice was a mistake, corrected below: the request
shape depends on the model. The retained files are private; their SHA-256
hashes are listed so a later inspection can be checked against this record.

Probe 1, plain reply, three requests: a connectivity check without a body, a
session-naming request, one main turn.

| File | SHA-256 |
|---|---|
| req-0001 (HEAD /api/hello) | 142d397b2671fba884a4b4c55a95003154cf3bf3030e82634fecc065d74baa33 |
| req-0002 (session title) | 3f46eb0697d37f84c7d11bb94011d5c2be461686c6f45c2268b92e2c36487ce7 |
| req-0003 (main turn) | 4417f59a6993a2c6f2395d7d1e69434c2fe14ff939ae4bac9f9bb9b916471024 |
| stream stdout | 06cff3894ade01f209e7522147a25ae72c6b4811d66a5690a31b13fec78ba22e |

Probe 2, canary shape (fetch example.com, search, try to read a file one
directory up, list tools), six requests: connectivity check, session title,
main turn, search helper, fetch summary, second main turn. The fetch returned
the heading, the search returned "Open Data | City of Edmonton", the file
token came back null, and the tool list was WebFetch and WebSearch. The
connectivity check is omitted from the table below; the other five requests are
listed.

| File | SHA-256 |
|---|---|
| req-0002 (session title) | 4a16b690c0b2f0f4befdacc1fbcd14dd708900154a00262349864f0e9ec751d1 |
| req-0003 (main turn 1) | e8b771108c2b76c2360e7177bf3751586f208a5448076acd3c5c6ba51cfb843a |
| req-0004 (search helper) | ae27a9b150bedcce0e13e5decd4254b3fd02d617515e90be12dcf195d4151228 |
| req-0005 (fetch summary) | 44baac2511424f03d21c5ad5e73148bf28df2b8c806d182ec8a2c44f8208a451 |
| req-0006 (main turn 2) | 1efbb953ebafcdb8f4423d4d16a82167db9fdf7dc28b253bde08e4bcd7078727 |
| stream stdout | d381dfd554ff8c3a6a2ff139897049dd73cf32363f69688e0bb39e8bf8602b35 |

Under Haiku the main turn carried three system blocks (a version-stamped
billing header, one vendor line, and a vendor default prompt of 13,487
characters, SHA-256
`a3015596fabfe9063deb699fa369a88d1978106e7a9d3d06b40eb6199791872d`), two
client tool definitions, and a first user message of four vendor reminder
blocks followed by the prompt text byte for byte. No skills, plugins, MCP
servers, memory paths, CLAUDE.md text or project material appeared. The
vendor prompt's text is not published; it was read once to establish that.

## Live demonstration under the released launcher

All four attempts ran Opus 5 at high effort, the built-in pin table, the
production API, and the archived copy of build 2.1.272 (executable SHA-256
`195e24e8e1f9bf46f1eaee72d434a33e18f9f5796f29a6348a00d16c5f8aee75`) while
PATH offered 2.1.273. Each attempt's complete capture, stream, final message
and report are retained privately under the terms in v1.28.

### Attempt 1, diagnostic: refused, and the refusal was correct

Attempt `d433714cc8b44c6f`. The CLI exited 0, fetched the heading, returned a
null token and listed WebFetch and WebSearch. The request proof failed: two
requests matched no pinned shape and the capture held no recognised main
turn. The launcher refused and sent no package.

The cause was the editor's probe choice. Under the pinned Opus 5 seat the
same build sends a different vendor prompt (6,755 characters, SHA-256
`ca13f066089ee100dd5ef17ee4dbf985eabce68c213998ce32657465a1985bd8`),
different WebFetch and WebSearch definitions, adaptive thinking with an
explicit effort field, and the environment, model and date text in a
separate system-role message rather than in the first user message, which
then carries only the account email reminder and the package. None of that
is a leak: the Opus prompt was read once and contains no memory path, project
text or instruction beyond the vendor's own. It is a different shape, and a
check pinned to the wrong shape refused it. The pins were re-derived from
this retained capture, keyed by build and model, and the effort field in the
request is now checked against the effort pin. Canary capture manifest
SHA-256 `c7309239877fbaf365a452b28b74a3094366b4f2db04563a94b51647983c1ffa`.

### Attempt 2, diagnostic: passed

Attempt `98576aedb2618d14`. CLI exit 0. Structural canary pass; request proof
pass. Five requests: a connectivity check, one session-naming request, two
main turns and one fetch summary; none unknown. The fetch of example.com
returned its heading in the tool's own result, the synthetic token came back
null, the tools listed were WebFetch and WebSearch. Nothing was admitted,
because a diagnostic sends no package. Canary capture manifest SHA-256
`733801c7a88b0fb6f9fb047c9ee5c64ba6f934c5f1129d2a61176b688fea8127`; stream
`6bbfd155cbb5cff92e905ee41e87aff9ae7195f48b671ea7820a7df010111184`; report
`634a5f43b629dcb23557f26f547702a810df568bdce67295b5e988475c082cbf`.

### Attempt 3, research: refused on two defects in the check

Attempt `8a13c18fdf0a1141` through the package-in, report-out audit entry
point, with a demonstration package (SHA-256
`56f5b2ce7bb99d201fc2a611b435d09551220182373faf01538c67aab2394e17`) asking
for the 2021 Census populations of Edmonton as a census subdivision and as a
metropolitan area, with source URLs and short quotes. It is not a YEGFacts
claim and nothing from it is published as a finding. Its own canary passed
with a passing proof. The research run exited 0 with 22 captured requests:
one connectivity check, one session-naming request, seven main turns, three
search-helper requests and ten fetch summaries, none unknown. The proof
failed and the report was not installed, for two reasons that were defects
in the check rather than in the run. The search helper's server tool carried
the model's own domain filter beside its use limit, and the check had pinned
that tool's definition exactly. And a rate-limit event in the stream sat
between two assistant events of one turn, so the turn count read eight
against seven main-turn requests. The check was corrected to permit the
search tool's documented filter fields and to count turns by the distinct
message identifier the service puts on each exchange, with the event-order
grouping kept only as a fallback for a stream that carries no identifiers. Capture manifest SHA-256
`85cf04c4e1a250a6e63095b59cb84daa8e8ff01237a03f583acb3ccb773862b3`; stream
`bda5d66b150af229246a370236c9730a1b63e635c82e75722c90ab0f2fe6f660`; final
message `bc7d93f915628e9a3aa243f5d04d359a03e46340dfe29a45fa71f2f0624dec91`.

### Attempt 4, research: passed and admitted

Attempt `0c4ef145dfce6da6`, same entry point and package. Canary pass with a
passing proof (capture manifest
`ca9ca5695476daadc498522b34bf3dda18cd02945901735c06878ae8f2f36ef3`). The
research run exited 0 with 22 captured requests: one connectivity check, one
session-naming request, eight main turns, three search-helper requests and
nine fetch summaries, none unknown. Structural check pass, request proof
pass, admitted for research. The public row carries the attempt id, both
versions (2.1.272 ran, 2.1.273 on PATH), the upstream, the pin table used,
the counts and the hashes, and no path. The proof report records the
disclosed host context with the email address replaced and the working
directory as the opaque attempt path.

| Artifact | SHA-256 |
|---|---|
| capture manifest | 8b771c66ac4515f5452f76c2b78366f99683e5aa058002f720f8df7abf479338 |
| stream stdout | 468d4b857be6d0adc458918c1abdb6e4cf646320529ecf81bee79b874a52379c |
| final message | 4556a05c4617d745cd5b4d60f11a9752f797c968b5f031b596b3bde0372cf30b |
| proof report | 9add059d72b79d821bdbad16275077d9a5de5a42b319164012ad045ead9f5698 |
| vendor prompt (Opus 5) | ca13f066089ee100dd5ef17ee4dbf985eabce68c213998ce32657465a1985bd8 |
| WebFetch definition | e1fbaacd430da45894b8d8c29f32064d98c065ebd00702a346db561f801025af |
| WebSearch definition | 50202efd42bb858f1a86f63bc189c48ca85e531b3093c36b21227459b7ed193a |

What the model returned, recorded as the output of a demonstration and not
as a finding: 1,010,899 for the census subdivision, citing a Statistics
Canada census release table, and 1,418,118 for the metropolitan area, citing
a Statistics Canada Daily article. It also reported six Statistics Canada
pages that failed to load through the fetch tool, and in attempt 3 it had
read the same two figures from CSV downloads after five page failures. That
is the retrieval limit v1.28 disclosed, observed live: public-web tools reach
some pages and not others, and a run must say which.

## Limits of this demonstration

One seat, one build, one model, one machine, four attempts on one day. The
capture shows what the CLI sent to its configured base URL and nothing else.
It cannot show anything the vendor attaches to this account after the
request leaves. The account email and working directory reached the reviewer
in the vendor's own text and are disclosed, not absent. Codex and Google
have no capture-backed profile, so the three-seat panel cannot run, and no
finding, framing report or source audit follows from this record.

## Implementation and release checks

Root verification on the final branch head, after four implementation
rounds and the board conditions:

- `npm test`: **441 passed, 1 skipped**, across 27 files. The skipped test
  is the opt-in live diagnostic; the live attempts above cover it.
- `npm run validate`: OK, 7 stories, 17 claims, 1 commitment, 8 topics, 162
  evidence entries.
- `npm run validate:diff` against origin/main: every change that owes a
  changelog entry has one (v1.29).
- `npx astro check`: 0 errors, 0 warnings. `npm run build`: pass.
- Exposure audit: no fail-class findings; 45 warnings, of which six are the
  placeholder address in the sanitized fixture and its tests, dispositioned
  in `methodology/audits/exposure/2026-09-15.md`.
- Duplication audit: no fail-class findings; 20 cross-page warnings, all
  pre-existing. Sitemap audit: sitemap and built site agree.

The retry tests still replace the launcher only inside a temporary fixture
repository. The substitute pin table exists only for tests, is refused
unless the upstream is a loopback stub, and forces non-admission with the
reason recorded. There is no production flag that admits a reviewer without
the proof.
