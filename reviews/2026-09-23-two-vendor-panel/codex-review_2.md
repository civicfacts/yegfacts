# Review context, round 2

Same repository, branch and file list as round 1; compare with
`git diff origin/main -- <file>`. Working tree clean.

What changed since round 1, one item per finding:
1. capture-check.ts: the cut applies only to string values that sit inside
   tool_result blocks (messages[].content[] of type tool_result, string
   content or its text parts), and only to a note whose path is
   `<home>/.claude/projects/<...>/tool-results/<...>`. Tests: note in a tool
   result passes with count 1; the same note in a text block fails; a note
   with another path under home fails; a note naming the repository path
   fails on the repository source.
2. invoke-reviewer.sh: refuses `--provider google` itself unless
   `--finish-frozen-run`, after the model and effort defaults so the refused
   row still names the seat; run-reviewer.sh passes the flag through;
   three-seats tests pass it to exercise the retained profile; the refusal
   rows in invoke-reviewer tests expect the retirement message.
3. glossary.ts panelForClaim: counts only round-1 rows with status ok or no
   status (pre-v1.28 manifests); an unreadable or inconsistent manifest gets
   a neutral "AI panel (seats in the run record)" label and glossary term,
   never the historical vendor list; the build now prints no panel warning.
4. stream-boundary.ts contextProof: with counted notes the sentence says
   "none of it appeared except the operator's home-directory path, which N
   request(s) carried inside the CLI's own note…", never both claims.
5. DESIGN.md line 19 and the present-tense sentence near 1208 no longer say
   independent reviewers or models; the methodology page's capture paragraph
   states the v1.38 exception and its limits.
6. preflight.sh takes the CLI names to check; the runner calls it for the
   seat's CLI before assembling a package (not on --dry-run); Claude's login
   is proven by the canary and the script says so; v1.37's text names the
   canary as the quota probe (no CLI exposes a quota read without a model
   call); the private decision record carries the same note.
