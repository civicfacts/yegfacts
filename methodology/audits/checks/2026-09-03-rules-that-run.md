# Three rules on paper, and the one that cost something

2026-09-03. An audit record: this reports on the method rather than changing
it, which is why it sits under `methodology/audits/` and does not itself bump
the version. The change it describes does, and the entry to paste is drafted at
the bottom.

## What was found

Three public files described checks that did not exist.

1. The register header said the validator checked a question's account splits
   against its total. Fixed under PR #45.
2. The intake README said a withheld claim's wording was held privately. It was
   in seven tracked files. Fixed under PR #44.
3. `methodology/changelog.yaml` said, in its second line: "CI requires an entry
   here for any change under prompts/, scripts/merge*, scripts/synthesize*, or
   methodology/." It did not. The rule sat as a TODO at the bottom of
   `scripts/validate.ts`, correctly noting that it needs a diff against a base
   ref rather than a working-tree snapshot, and it had never run.

And a fourth, which is the one that actually cost something.
`prompts/intake-merge.md` rule 1 says a claim is one assertion: if you are
joining two assertions with "and", they are two claims. Nothing enforced it.
`property-taxes-rising-sharply` reached the public register as "Edmonton
property taxes have risen sharply, by $1,500 in three years for one resident and
$6,000 a year for another" — two people, two remarks, one "and". The second
person had stated a tax bill. The register recorded them asserting a tax rise.

A missing check is a gap. A documented check that does not run is a lie. The
difference is the whole of this change.

## The changelog rule now runs

`npm run validate:diff` (`scripts/validate-diff.ts`, rules in
`scripts/lib/diff-rules.ts`) compares the branch against its merge base with
origin/main and fails when a change owes an entry it did not write. CI runs it
after `npm run validate`, with `fetch-depth: 0` on the checkout so the base
commit is actually in the clone. When it cannot find a merge base it fails
rather than passing: a check that turns itself off on unfamiliar ground is the
same promise-without-a-check being removed here.

Two exemptions, and both are arguments about what the version number means.

**`methodology/audits/` is exempt.** It holds incident and audit records — this
file is one. They report on the method; they do not change it. If writing one
bumped the version, the number would mean "something happened" rather than "the
method changed", and the first person to write an audit during a version freeze
would quietly stop writing audits. The cost of the exemption is that a method
change smuggled into an audit record goes unchecked, which is a thing a reader
can see in the diff.

**`methodology/changelog.yaml` itself is exempt.** The file is the record, not
the method. Correcting a typo in a past entry is not a new version, and
demanding one would make every correction to the record inflate the number the
record exists to explain. This is the same argument as the audits one, and it is
what lets this branch rewrite the header sentence without minting a version for
a sentence.

**What is deliberately not exempt and not included.** The spec names four paths
and the implementation matches them exactly, including the narrow reading of
`scripts/merge*` and `scripts/synthesize*` as top-level scripts whose names
start that way. `scripts/synthesis-matrix.ts` is not one of them. Neither is
`scripts/validate.ts`, which means this very branch — which changes what the
method enforces — is not obliged by its own rule to bump the version. That is a
real gap in the spec's list: the validator is where the method is enforced, so
changing it changes the method. Widening the list is a spec change and not an
implementation detail, so it is named here and left for a decision rather than
taken quietly.

## The other rule in the same TODO

The second rule — a change to a claim's `finding` or `panel_agreement` requires
a matching entry in the parent story's changelog — is genuinely the same work.
Same base ref, same `git show base:path`, same shape of answer. It is
implemented in the same module and covered by the same tests. Both compare
before and after by *content*: for the methodology rule, a new version string
that the base did not have; for the story rule, a changelog entry
(date, type, note) that the base did not have. Re-wording an existing entry
satisfies neither, which is the point — an edit to the record is not a record of
an edit.

A claim added with a finding counts as a finding that changed, because the
published answer went from nothing to something. A deleted claim does not: there
is no longer an answer to account for.

## What the replay says

Run over the last fourteen commits on main, the rules flag one:

    002c1ab  The withheld claim leaked into the run artifacts (#44)
             methodology/exposure-audit.md changed; no new version entry.

Everything else is clean, including 3d8069e, which changed `methodology/` and
added the version entry it owed. So the rule discriminates: it fires on the real
omission and stays quiet on the branch that did it right. The one it fires on is
last night's PR — the one that fixed the second false promise on this list.

## The merge bound

`scripts/intake-claim-bound.ts`, with the judgement in
`scripts/lib/claim-bound.ts`. Run it on a merged run before it becomes register
entries, or with no argument to audit the live register.

`scripts/intake-quote-gate.ts` was the model, and the difference between them
has to be said plainly. The quote gate decides a substring question — are these
words in that comment — and because that question is decidable it acts on the
answer, cutting the form and naming the loss. This one is about entailment: does
this wording assert this proposition. No string test decides entailment. So this
does not implement rule 1. It implements one mechanically decidable corner of
it, chosen to be the shape that got through:

> A proposition whose coordinated halves each name a numeral, where the halves'
> numerals are disjoint, and where no single captured wording carries a numeral
> from both halves.

Read that as: the proposition asserts two quantities, and nobody in the source
said both. Either it is two claims, or the merge wrote a sentence for the
register that no person in the capture ever uttered.

It does not edit anything, and that is the second difference from the quote
gate. A wrong citation has one correct fate, so the quote gate can cut it. A
compound claim has to be *split*, and splitting decides which wording goes under
which half and what each half now claims. A script doing that silently would be
inventing propositions, which is the defect. So this refuses, names, and a
person re-merges.

Numbers are read as digits only. `two`, `five` and `a quarter` are not numerals
here, because `one` and `no one` are everywhere in ordinary prose and a word
list would make the check noisy enough to be ignored, which is how a check dies.
`$100 million` and `100 metres` both reduce to `100`, so the check treats them as
the same quantity — a collision suppresses a flag and never invents one.

### What it cannot do

Stated here and printed in every report the gate writes, because a partial check
described as the whole rule is the exact failure being fixed.

- A compound proposition with no numerals. "Taking traffic lanes for bike lanes
  increases congestion, slows traffic and causes idling and emissions" is four
  assertions and this is silent on it.
- A compound proposition where one person happened to use both numbers in two
  separate assertions.
- Rule 2 entirely — a form must assert the claim, not the topic. "Bicycles
  reduce congestion" and "removing a traffic lane increases congestion" are
  opposite claims sharing every content word. Nothing about their surface tells
  them apart.

Rule 2 needs a model read. No seat is invoked for it here, and no harness is
shipped for one either. A harness with no caller is another rule on paper that
does not run, which is what this record is about; the report format carries a
`Not checked here` section that names rule 2 explicitly, so the gate's own
output never reads as a rule-1 clearance.

### What it flags today

On the live register, 111 claims read, one flagged:
`property-taxes-rising-sharply`. Nothing else. On the merged run it came from
(`reviews/intake/yegscoop-2026-08-26/merged.json`), 112 claims read, the same
one flagged under its run id — so the gate would have caught it before it
reached the register, which is where it belongs.

The claim is not split here. `intake/register.yaml` is held by another branch,
and splitting is an editorial act on published wording that needs its own
change. So `scripts/validate.ts` carries it in `KNOWN_UNSPLIT_CLAIMS`: a named,
dated, one-line-reasoned entry that still prints a `warn:` on every run.
Everything not on that list fails. The list is a debt, not a dispensation, and
the validator fails if it names a claim that is not in the register — so it
cannot outlive the split.

## The changelog entry this earns

1.20 and 1.21 are spoken for by branches already queued on the file, so this
should take **1.22**. Drafted, not written into `methodology/changelog.yaml`,
because a third branch touching that file is how this gets messy.

```yaml
- version: "1.22"
  date: "2026-09-03"
  scope: enforcement
  summary: >
    Three of this project's own files described checks that did not exist. Two
    were fixed in the preceding changes; this one makes the third rule actually
    run, and adds the first mechanical guard on the rule whose absence put words
    in a real person's mouth.
  highlights:
    - "The methodology changelog's own header claimed CI required a version entry for any change under prompts/, scripts/merge*, scripts/synthesize* or methodology/. It did not; the rule was a TODO in the validator. It runs now, in npm run validate:diff, which CI runs against the branch's base commit."
    - "Two paths under methodology/ are exempt and the header says so: methodology/audits/ holds records that report on the method rather than change it, and the changelog is the record itself. Without those, the version number would come to mean something happened rather than the method changed."
    - "The second rule in the same TODO runs too: a change to a claim's finding or panel_agreement now requires a matching entry in the parent story's changelog. Re-wording an existing entry does not satisfy either rule."
    - "A claim is one assertion is a rule the merge prompt has always carried and nothing ever checked. One claim reached the public register joining two people's remarks with the word the rule names, recording someone as asserting a tax rise when their words stated a tax bill. A gate now refuses a merge whose proposition asserts two quantities that no single captured wording carries together."
    - "That gate is a corner of the rule, not the rule, and it says so in every report it writes. Whether a wording asserts a proposition is entailment, and no string test decides entailment. The compound propositions with no numbers in them, and the whole of rule 2, still need a reader."
    - "The one claim the gate flags on the live register is named in the validator with the date it was found and the reason it is not fixed yet, and prints on every run. Everything else fails."
  links:
    - label: How the site works
      href: /about
    - label: Every question we've considered
      href: /questions
  note: >
    The uncomfortable part is not that a check was missing. It is that the file
    said the check was there. A gap is something a reader can weigh; a
    documented check that does not run tells them not to bother weighing it. The
    fourth finding here is what that costs when it is a rule about attribution:
    a real person, quoted under a pseudonym, recorded as asserting a sentence
    they did not say.
```
