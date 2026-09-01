# Public-exposure audit

The repository is public. Everything tracked in git is published, whether or not
the site links to it. This is the standing process for checking that nothing
tracked should have stayed private. It runs in three layers, at three rates.

## 1. Deterministic scan — every push

`npm run audit:exposure` (`scripts/exposure-audit.ts`) scans the tracked tree —
`git ls-files`, so untracked scratch files and gitignored archives are out of
scope by construction — and reports findings by class with `file:line`.

| Class | Severity | What it matches |
|---|---|---|
| SECRETS | fail | Private key blocks; API-key, token and credential-assignment formats |
| PRIVATE-EVIDENCE LEAK | fail | Tracked paths under `evidence/private/` or `evidence/staging/`; any registry entry marked `visibility: private` whose archive is tracked |
| RIGHTS | fail | A file in `evidence/files/` with no registry entry saying `rights.redistribution: allowed` |
| LOCAL PATHS | fail | Absolute home-directory paths from a contributor's machine |
| PII | warn | Email addresses outside the site's own domain, phone numbers, postal codes, street addresses |
| LONG QUOTES | warn | A `quote` field in a committed review JSON over 75 words |

Fail classes are mechanical — a match is a defect — so CI blocks on them, after
`validate` and before `build`. Their patterns are narrow by design: a false
positive blocks every push, so they anchor to real formats, not to entropy.

Warn classes need judgement a regex cannot supply. A councillor's name in a
`publisher` field is fine; a resident's home address is not. Warns are printed,
never auto-blocked, and are dispositioned in the audit record. `--strict` fails
on warns too, for use during a full-tree audit.

**Known limits.** The scan skips binary files, and the pattern classes skip
`scripts/exposure-audit.ts`, which necessarily contains the patterns it hunts
for. It finds formats, not meaning — hence layers 2 and 3.

## 2. Per-run release check — every story

Every story's publication gate already includes a privacy and copyright release
check over that run's raw artifacts, committed as `gate/release-check.md`
(methodology v1.1). That layer is unchanged by this document. It covers new
material when the context needed to judge it is freshest.

## 3. Full-tree audit — monthly, and after any new content type

At least monthly, and whenever a new kind of content ships (a new artifact type,
directory, or pipeline stage), a full audit runs:

1. `npm run audit:exposure -- --strict` over the whole tracked tree.
2. An AI review pass reading everything committed since the previous audit
   record — not just the classes above, but names, addresses, quoted volume per
   source, filesystem and infrastructure detail, and anything a regex has no
   concept of.

The result is a dated record in `methodology/audits/exposure/YYYY-MM-DD.md`
containing the command run, the class summary, and an explicit disposition for
every warn: accepted, fixed, or escalated. A warn that recurs across records
gets fixed or documented as permanently accepted, not re-noted each time.

Records quote matched lines in redacted form. A record that pasted a live match
verbatim would republish the thing the audit exists to find, and would flag
itself on the next run.
