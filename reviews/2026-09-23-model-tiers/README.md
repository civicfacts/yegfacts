# Independent review of methodology v1.34 (PR #78)

Reviewer: GPT-6 Sol at high through `codex exec`, read-only sandbox, session
01a0cedb-eda2-7652-83af-eba2f4768fe3, three rounds on 2026-09-23. The editor
(Stew, Claude Fable 5.1) wrote the change; the reviewer is from another vendor,
as D-0033 asks of checks on the editor's work. Each round's context file and
the reviewer's full output are beside this file, unedited.

| Round | Finding | Disposition |
|---|---|---|
| 1 | `origin/main` had moved to v1.35; the branch's changelog hunk replaced it. | Rebased; v1.35 (and later v1.36) sit above v1.34. |
| 1 | The shadow-seat guard required `--into` but accepted `--into round1`, so the answer could still land where the merge reads. | Guard now requires a `shadow-*` name and refuses round 2. |
| 1 | No tests for the guard or the two-model pin list. | Two run-reviewer tests (every refusal case; a dry run showing gpt-6-luna, high, and its own destination) and three pin rows added. |
| 1 | Current commands were written into the table DESIGN.md labels historical. | Table restored as on main; "Current pins" and shadow-seat paragraphs follow it. |
| 1 | Vendor accuracy claims and an independent index cited without links. | Removed from the public entry; the two price sources are linked instead. |
| 2 | A `shadow-*` directory that is a symbolic link into `round1/` still gets through. | The runner refuses any symlinked `--into`; tested with a link into `round1/`. |
| 3 | None. | APPROVED. |

Between rounds 1 and 2 the session running the v1.35 park confirmation asked
that `gpt-5.6-sol` stay on the launcher's pinned list, never as default, while a
framing check that ran on it is open; taken, and stated in the entry.
