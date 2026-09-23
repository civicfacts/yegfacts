# Review context, round 3

Same repository, branch and file list as round 2. Working tree clean; compare
with `git diff origin/main -- <file>`.

Change since round 2: run-reviewer.sh refuses any `--into` whose directory is a
symbolic link, right after OUT_DIR is computed and before the dry-run block or
any invocation (`test -n "$INTO" && test -L "$OUT_DIR"`). The guard test in
tests/invoke-reviewer.test.ts creates `<run>/shadow-linked -> <run>/round1` and
expects the refusal with no launcher call. DESIGN.md's shadow paragraph now says
"or that is a symbolic link".
