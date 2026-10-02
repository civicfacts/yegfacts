# Finding-to-edit table (methodology v1.39)

Brief: `brief.md`. Third report: `framing/check-3.md` (checker gpt-6-sol at
high, codex-cli 0.159.3). Brief sha256 before the edits:
`ba2a027e728ba6fc1b588983355c6ec2b02826e2a21e3e6f0659deb845798da0`. After:
`b4849964c97345acc00cb0991e7e048b7343dc081663f941d6b1a9a8a44a373f`.

Every standing finding of the third report, its replacement text as the
checker wrote it, and the text applied. Nothing else in the brief changed
except the status block at its head, which records the brief's state and
not its framing; it is listed last so the confirmation can trace it.

| Finding (check-3.md) | Checker's replacement text | Applied, where |
|---|---|---|
| Check 4, `[defect]`: the "Count the unknown" instruction put a route in U for an undetermined parking entry even when a determined facility type already excluded it from the denominator | "**Count the unknown.** Under each denominator, put a route in U only if it could belong to that denominator and its facility type or parking entry prevents classification. A route excluded by a determined facility type is not in U for that denominator, even if its parking entry is undetermined. The bounds under the completeness rule carry U; a share that leaves eligible unknown routes out is not a finding." | Verbatim, replacing the entire "Count the unknown" bullet under "Reviewer instructions of special note". |
| Check 9, `[framing]`, first quoted passage: "The City does not publish a count of stalls removed by route," | "The route table sometimes estimates stalls for a particular change, but it does not provide comparable stall totals across the programme. This record cannot answer how many stalls the programme removed." | Verbatim, under "Who asks this", replacing the whole sentence "The City does not publish a count of stalls removed by route, so the record cannot answer "how much" in stalls." The second clause of the old sentence went with the first because the replacement already carries the "cannot answer" statement; no word outside the checker's text was added. |
| Check 9, `[framing]`, second quoted passage: "No City record identified at intake counts the on-street stalls a route removed," | "Some route entries give an approximate stall count for a particular removal, but no identified City record gives comparable stall totals for every programme route." | Verbatim, under "What the City does not publish". The old clause was followed by ", and this brief states no count of stalls, routes or shares; ..."; because the replacement is a complete sentence, that continuation now begins "This brief states no count ..." with the words "and" dropped and "this" capitalised. No other word changed. |
| Check 9, `[framing]`, third quoted passage: "how many stalls any route removed, which no identified City record counts" | "a programme-wide stall total or a comparable total for every route; report any route-specific estimate the City does give." | Verbatim, as the Scope bullet that held the old passage, keeping the bullet's trailing semicolon in place of the replacement's full stop so the list reads on. |
| (State, not a finding) | none | The status block at the head of the brief now says the brief went to a v1.39 wording confirmation after check 3 and freezes on CONFIRMED or parks on REJECTED, naming this table and `framing/eligibility.md`. The lanes-and-congestion and infrastructure-deficit records show why the state line is updated in the text sent for confirmation: a panel refused to run on a brief whose status line still said it was parked. |

Every other finding in check-3.md is marked RESOLVED or OK by the checker.
No quotation, calculation, source, lookup or drafting was added.
