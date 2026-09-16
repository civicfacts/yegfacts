# The context check is simplified: capture stays, the pinned shape goes

Decision date: September 16, 2026. Methodology v1.30.
Editor: Stew, Anthropic Claude Fable 5.1. Decided by the founder, Ildar
Abdulin, over the editor's advice. No board review was convened for this
change; the four September 15 memos were written against the design this
replaces, and their objection is preserved below rather than re-argued.

## What the founder decided

v1.29's check was too much machinery for the job. It pinned the vendor's
default prompt and tool definitions by hash for one CLI build and one model,
kept an archived copy of that build, and needed a fresh capture and a new pin
row on every CLI update, which arrive several times a week. The founder's
instinct was to run the CLI from a scratch directory or switch its memory
off. The first was tried in v1.14 and failed, because the CLI loads its
user-level memory and instructions from the home directory whatever folder it
starts in. The second is what the launcher already does with its flags, and
the capture showed the flags work. So the question was only how to verify
that they keep working, at a cost the project can carry.

v1.30 keeps the flags, the recording proxy, the retention, the canary, the
structural stream checks and the runner's refusal to install anything not
admitted. It removes the pinned-shape checker, the version gate and the
archived build. In their place, a check reads the private text that actually
exists on this machine at run time, the user and repository instruction
files, the Codex global instructions, every memory file, the repository path,
the home path and the canary token, and fails if any line of it appears
anywhere in any captured request. It also requires the package to appear in
the capture, so the capture is provably of this run. Reports name a source
and a line number, never the text.

## What the editor advised, and why it was not taken

Stew recommended keeping the v1.29 allowlist and cutting only the pin rot.
A denylist over known text can say what the request does not contain; it
cannot say what it contains, so a new vendor-side injection that carries no
text from this machine passes. The September 9 disposition had already ruled,
under v1.28, that a convention plus disclosure is not enough to admit a
reviewer, and that ruling has not been withdrawn. The September 15 technology
memo asked for something looser than v1.29, with the vendor prompt hash kept as
a dated observation rather than a condition; that release refused it, on the
ground that a prompt which began carrying memory paths would pass a
structure-only gate. v1.30 goes past what that memo asked for, because it keeps
no prompt hash at all. The founder's grounds were cost and maintainability: a check that
rots on every CLI update and takes a day of model budget to re-derive
protects nothing once nobody maintains it. Stew accepts that the capture and
the retention were the part that mattered, and records the disagreement here
rather than softening the limit.

## The limit, stated once more

The check catches known private text from this machine. It does not
describe the request. It cannot see anything the vendor attaches that is not
on this machine, and it would not notice a vendor prompt that changed. The
capture is retained so that a later reader can ask a stronger question of it.
One seat admitted is still not a panel: Codex and Google have no
capture-backed profile, the three-seat rule stands, and no finding, framing
report or source audit follows from this release. The two-week blocked-brief
trigger from v1.28 is unchanged.

## Execution evidence

The live diagnostic and research demonstration under the released check,
with hashes, are in [verification.md](verification.md). The implementation
plan is [recorded separately](../../../docs/plans/2026-09-16-capture-denylist.md).
