# The Codex and Gemini seats run under stated limits

Decision date: September 16, 2026. Methodology v1.31.
Editor: Stew, Anthropic Claude Fable 5.1. Decided by the founder, Ildar
Abdulin. No board review was convened; the September 9 disposition that
refused a convention-only check is preserved below rather than re-argued.

## What the founder decided, in his words

Earlier the same day the seat work had been postponed. The founder then
asked: "can't we unblock the other two seats? I mean, we can just note the
limitation that no matter how hard we try, we can't isolate completely until
we run models through API which will cost more money compared to subsidized
subscriptions." That is the decision. The panel runs on the three
subscription CLIs, each under the best profile its CLI allows, and the record
says what each check covers and what it cannot.

## What was probed first

Both CLIs were probed on September 16 before anything was built; the probe
material is retained privately. Codex (0.154.0): a per-run home holding only
a symlink to the real auth file is safe (the real file and home were
unchanged), but that home alone still pulled a host skills catalogue; a
config flag removes it, other flags remove plugins, memories and hooks, and
the request can be captured through the same loopback program used for
Claude, because a config key routes the model request. Gemini (agy, 1.2.4 at
release): an empty home with the login token symlinked works, the real
settings and instructions are not read, a settings file in that home denies
file, write and command tools, and no request capture exists: the endpoint
variables are ignored and the local transcript omits the system prompt.

## The two limits, stated

Codex: shell and web run through one host and cannot be separated in this
build, and the read-only sandbox reads the whole filesystem. The check
cannot prevent a read. It refuses any run whose captured turns carry
private text from this machine, because tool outputs come back in the next
captured request. The planted canary file is read under this profile, and
the record says so rather than pretending otherwise.

Gemini: no capture. The check runs over the CLI's own record (the event
stream, the local transcript, the final response) and over what its tools
returned. It can say the model did not produce or receive private text
through its tools; it cannot say what the request contained. The public row
carries `record-only` in place of a pass, and admission for this seat
accepts that value and no other seat does.

Both: complete isolation is not available on subscription CLIs. A fully
controlled context needs direct API calls, which the project does not pay
for. The September 9 disposition under v1.28 refused a convention-only
check; that refusal stands on the record beside this decision, and v1.31 is
narrower than what it allowed for these two seats.

## What the editor advised

Stew asked the founder for an explicit go on the two limits rather than
deciding alone, because each is what a hostile reader would lead with. Stew
agrees with the founder's framing: the alternative was a panel that cannot
run, and a disclosed gap serves readers better than silence. The model and
effort pins, the three-seat rule and the framing-check caps are unchanged.
No historical run is certified.

## Execution evidence

The live diagnostics and research demonstrations under the released
launcher, with hashes, are in [verification.md](verification.md). The
implementation plan is [recorded separately](../../../docs/plans/2026-09-16-three-seats.md).
