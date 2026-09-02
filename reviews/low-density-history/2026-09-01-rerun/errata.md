# Errata and run record: low-density-history, rerun 2026-09-01

Gemini seat, round 1. Six attempts across three runner invocations
produced no output: the model reached for a shell command, which the
isolation rule (web tools only, headless, sandboxed) denies, and it did
not fall back to its web tools. Recorded as failed in run.yaml. The first
low-density run and both infill runs completed on this seat with the
same command, so the failure is specific to this brief's asks (lot-level
1926 records, historical instruments), not to the runner.

The methodology does not synthesise over two seats. This run therefore
cannot proceed past round 1 until the Gemini seat completes. The seat is not retried further today. Options, none taken without a
decision on the record: retry on another day, since seat behaviour is
not deterministic; add a pre-fetched packet of the primary documents
the brief names to the package so no seat needs to fetch them, which
would be a methodology change to the blind round; or permit a shell in
the sandbox, which would be a larger one. The GPT seat completed this
brief on its first attempt with Supported on both claims and no framing
concern, so the brief is answerable under the isolation rule.
