# Finding-to-edit table (methodology v1.39)

Brief: `brief.md`. Third report: `framing/check-3.md` (checker gpt-6-sol at
high, codex-cli 0.159.3). Brief sha256 before the edit:
`c6f81692df5b85013ef88109a105bb56304efb2bb0cd3ec4bedc11b8cd41a48d`. After:
`3ff9e7279ecb8e2576d4c74d9cf87128349985f3f103877a3b47bdca34405863`.

Every standing finding of the third report, its replacement text as the
checker wrote it, and the text applied. Nothing else in the brief changed:
the status block at its head still reads as it did when check 3 read it,
and is changed only after the confirmation. The unified diff between the
two briefs is four lines of context and one changed line.

| Finding (check-3.md) | Checker's replacement text | Applied, where |
|---|---|---|
| Check 9, `[framing]`, carried from check 2 as WEAKENED: the brief's first line still read "# Review brief: How does Edmonton clear snow from its streets and bike lanes?" while the brief said it does not promise a verdict about clearing streets and bike lanes | "# Review brief: Had City administration already put two snow-clearing proposals that need more spending before council?" | Verbatim, as the first line of `brief.md`, replacing the old first line and nothing else. The editor diffed the applied line against the checker's text before this table was written and they are identical. The `snow-clearing` register id and the explanation that the four other claims under the registered question are parked are kept, as the checker directed. |

Every other finding in check-3.md is marked RESOLVED or OK by the checker.
No quotation, calculation, source, lookup or drafting was added.
