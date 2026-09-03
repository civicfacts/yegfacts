/**
 * Named individuals (v1 excludes right-of-reply, docs/DESIGN.md §2).
 *
 * Some captured claims accuse a named person of wrongdoing. Triage declines
 * those on a standing rule: the site has no right of reply to offer, so it does
 * not repeat the accusation. What it withholds is the proposition and the words
 * it was said in; the row, its outcome and its reason stay public.
 *
 * A claim about what an office-holder did in office is not in that class and is
 * not withheld. A motion brought, a vote cast, a lane built: council minutes
 * settle those, and the site names office-holders when it reports them. So the
 * trigger is the decline, not the presence of a name.
 *
 * The rule is enforced where the register enters the site rather than on the
 * pages, so what a page never receives it cannot leak. These tests pin that: the
 * redaction itself, the live register, and the structural fact that no page or
 * component reaches around `src/lib/intake.ts` to read the file directly.
 *
 * A claim from a whole source carries no outcome of its own — triage rules on
 * the investigation it belongs to — so the trigger is now the investigation's
 * decline, which is what the fixture below reads through `parseRegister`. No
 * claim in the live register is in that position, and a test that only looks at
 * the live register would therefore prove nothing.
 *
 * Both register pages print `candidate.side` and `candidate.accounts` straight,
 * each inside a test for the field being there, so a field the redaction removes
 * is a line the page does not render. That is why the "does the page print it"
 * question is answered here, against the candidate the page is handed, rather
 * than against built HTML.
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPO_ROOT } from '../scripts/lib/repo.ts';
import {
  WITHHELD_LABEL,
  candidateRegister,
  claimText,
  investigationOf,
  parseRegister,
  redact,
  withholdsWording,
  type Candidate,
} from '../src/lib/intake.ts';

function entry(overrides: Partial<Candidate> = {}): Candidate {
  return {
    id: 'named-individual-allegation',
    recorded: '2026-09-02',
    origin: 'captured',
    wording: 'Councillor Someone took a bribe from a developer.',
    proposition: 'Councillor Someone accepted a payment from a developer.',
    outcome: 'NO',
    side: 'against',
    accounts: 3,
    names_person: true,
    reason: 'An allegation against a named individual, which this site has no process to put to them.',
    forms: [{ commenter: 'Snowy Hare F.', quote: 'took a bribe', comment: 12 }],
    ...overrides,
  };
}

describe('withholdsWording', () => {
  it('withholds an accusation both readers declined', () => {
    expect(withholdsWording(entry({ outcome: 'NO' }))).toBe(true);
  });

  // Parking is a decision about when to check something, not a refusal to
  // repeat it, and most claims that name a person name an office-holder doing
  // something the public record already carries.
  for (const outcome of ['GO', 'PARK', 'variation', 'not-a-claim', 'pre-triage'] as const) {
    it(`prints a named-individual claim on ${outcome}`, () => {
      expect(withholdsWording(entry({ outcome }))).toBe(false);
    });
  }

  it('does not withhold a claim that names nobody', () => {
    expect(withholdsWording(entry({ names_person: false }))).toBe(false);
  });
});

describe('redact', () => {
  it('puts a neutral heading where the claim would be, not the reason for withholding it', () => {
    const redacted = redact(entry());
    expect(redacted.proposition).toBe(WITHHELD_LABEL);
    expect(redacted.wording).toBe(WITHHELD_LABEL);
    expect(claimText(redacted)).toBe(WITHHELD_LABEL);
    expect(redacted.withheld).toBe(true);
  });

  it('does not stand the reason in for the claim, which read as though somebody said it', () => {
    expect(claimText(redact(entry()))).not.toBe(entry().reason);
  });

  it('drops the side and the account count, which describe the claim it will not show', () => {
    const redacted = redact(entry());
    expect(redacted.side).toBeUndefined();
    expect(redacted.accounts).toBeUndefined();
  });

  it('drops the other wordings it was folded from, which are the allegation again', () => {
    expect(redact(entry({ variations: ['Councillor Someone was paid off.'] })).variations)
      .toBeUndefined();
  });

  it('keeps the id, the outcome and the reason, so the entry is still on the register', () => {
    const redacted = redact(entry());
    expect(redacted.id).toBe(entry().id);
    expect(redacted.outcome).toBe(entry().outcome);
    expect(redacted.reason).toBe(entry().reason);
  });

  it('drops every captured wording, so no quote survives to be rendered', () => {
    expect(redact(entry()).forms).toEqual([]);
  });

  it('leaves nothing of the allegation anywhere in the entry', () => {
    const redacted = redact(entry());
    expect(JSON.stringify(redacted)).not.toContain('bribe');
  });

  it('has a heading even when the entry somehow carries no reason', () => {
    const redacted = redact(entry({ reason: undefined }));
    expect(redacted.proposition).toBe(WITHHELD_LABEL);
  });

  it('passes a GO entry through untouched, allegation and quotes included', () => {
    const going = entry({ outcome: 'GO' });
    expect(redact(going)).toBe(going);
  });

  it('passes an entry that names nobody through untouched', () => {
    const ordinary = entry({ names_person: false });
    expect(redact(ordinary)).toBe(ordinary);
  });
});

/**
 * Two questions from one source, one declined and one going ahead, each with a
 * claim naming a person. The claims carry no outcome, because triage ruled on
 * the questions; the decline has to reach the claim under it all the same.
 */
const FIXTURE = `
investigations:
  - id: developer-payment
    recorded: "2026-09-02"
    source: thread
    question: "Was a councillor paid by a developer?"
    outcome: NO
    reason: "An allegation about a named person, which this site has no process to put to them."
    accounts:
      total: 3
      against: 3
    run: reviews/intake/thread
  - id: pause-vote
    recorded: "2026-09-02"
    source: thread
    question: "How did council vote on pausing the routes?"
    outcome: GO
    reason: "The minutes record the motion and the vote."
    accounts:
      total: 1
      against: 1
    run: reviews/intake/thread
candidates:
  - id: developer-paid-councillor
    recorded: "2026-09-02"
    origin: captured
    source: thread
    investigation: developer-payment
    proposition: "Councillor Someone accepted a payment from a developer."
    wording: "Someone took a bribe from a developer."
    side: against
    accounts: 3
    names_person: true
    forms:
      - commenter: "Snowy Hare F."
        quote: "took a bribe"
        comment: 12
  - id: councillor-moved-the-pause
    recorded: "2026-09-02"
    origin: captured
    source: thread
    investigation: pause-vote
    proposition: "Councillor Someone brought the motion to pause the routes."
    wording: "Someone brought the motion to pause them."
    side: against
    accounts: 1
    names_person: true
    forms:
      - commenter: "Snowy Hare F."
        quote: "brought the motion"
        comment: 13
`;

const fixture = (id: string): Candidate => {
  const found = parseRegister(FIXTURE).candidates.find((candidate) => candidate.id === id);
  if (found === undefined) throw new Error(`no ${id} in the fixture`);
  return found;
};

describe('a claim whose investigation was declined', () => {
  it('inherits the decline, because the claim has no outcome of its own', () => {
    expect(fixture('developer-paid-councillor').outcome).toBe('NO');
  });

  it('renders no proposition, no wording and no captured forms', () => {
    const withheld = fixture('developer-paid-councillor');
    expect(withheld.withheld).toBe(true);
    expect(withheld.proposition).toBe(WITHHELD_LABEL);
    expect(withheld.wording).toBe(WITHHELD_LABEL);
    expect(claimText(withheld)).toBe(WITHHELD_LABEL);
    expect(withheld.forms).toEqual([]);
  });

  it('leaves nothing of the allegation anywhere in the entry', () => {
    expect(JSON.stringify(fixture('developer-paid-councillor'))).not.toContain('bribe');
  });

  it('keeps the entry on the register, with its id and the outcome it inherited', () => {
    const withheld = fixture('developer-paid-councillor');
    expect(withheld.id).toBe('developer-paid-councillor');
    expect(withheld.investigation).toBe('developer-payment');
  });

  // The trigger is the decline, not the name: an office-holder's public record
  // is what the site exists to check, and it is named here as in the stories.
  it('prints a named office-holder’s public record when the investigation goes ahead', () => {
    const going = fixture('councillor-moved-the-pause');
    expect(going.withheld).toBeUndefined();
    expect(going.proposition).toContain('brought the motion');
    expect(going.forms).toHaveLength(1);
  });
});

describe('the register as the site receives it', () => {
  it('carries no proposition or quote for a withheld entry', () => {
    for (const candidate of candidateRegister()) {
      if (!candidate.names_person || candidate.outcome !== 'NO') continue;
      expect(candidate.withheld).toBe(true);
      expect(candidate.forms ?? []).toEqual([]);
      expect(candidate.proposition).toBe(WITHHELD_LABEL);
      expect(candidate.wording).toBe(WITHHELD_LABEL);
    }
  });

  /**
   * The register page prints the side and the account count from these two
   * fields and only from them, each under a test for the field being present,
   * so an entry that arrives without them renders no such line.
   */
  it('carries no side and no account count for a withheld entry', () => {
    for (const candidate of candidateRegister()) {
      if (!candidate.withheld) continue;
      expect(candidate.side).toBeUndefined();
      expect(candidate.accounts).toBeUndefined();
    }
  });

  /**
   * The row stays public, with somewhere to read the reason: its own, for an
   * entry registered on its own, and its investigation's for a claim from a
   * source, which is where the reason for that decision lives.
   */
  it('keeps a withheld entry on the register with its outcome and a reason to read', () => {
    for (const candidate of candidateRegister()) {
      if (!candidate.withheld) continue;
      expect(candidate.id).not.toBe('');
      expect(candidate.outcome).not.toBe('');
      expect(
        candidate.reason ?? candidate.note ?? investigationOf(candidate)?.reason,
      ).toBeTruthy();
    }
  });
});

/** Every `.astro` and `.ts` file under a directory, recursively. */
function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((item) => {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) return sourceFiles(full);
    return /\.(astro|ts)$/.test(item.name) ? [full] : [];
  });
}

describe('the register has one way in', () => {
  it('is never read by a page or a component, only through the loader', () => {
    const readers = ['pages', 'components']
      .flatMap((dir) => sourceFiles(path.join(REPO_ROOT, 'src', dir)))
      .filter((file) => readFileSync(file, 'utf8').includes('intake/register.yaml'))
      .map((file) => path.relative(REPO_ROOT, file));
    expect(readers).toEqual([]);
  });
});

/**
 * An accusation declined inside an investigation that is going ahead.
 *
 * The first version of grouping keyed withholding off the investigation's
 * outcome, so a question worth investigating published the accusation sitting
 * inside it. The decline is a property of the claim.
 */
describe('a claim declined while its question goes ahead', () => {
  const yaml = `
investigations:
  - id: disclosed-interests
    recorded: "2026-09-03"
    source: a-thread
    question: "What do councillors' filed disclosures show?"
    outcome: GO
    reason: "Filed disclosure statements can answer it."
    accounts:
      total: 2
      against: 2
    run: reviews/intake/a-thread
sources: []
candidates:
  - id: withheld-a-thread-1
    recorded: "2026-09-03"
    origin: captured
    source: a-thread
    investigation: disclosed-interests
    side: against
    accounts: 1
    names_person: true
    outcome: NO
    ground: right-of-reply
    reason: "The question around it is going ahead; this claim is not."
  - id: motion-brought
    recorded: "2026-09-03"
    origin: captured
    source: a-thread
    investigation: disclosed-interests
    proposition: "A councillor brought a motion to cut the budget."
    wording: "she moved to cut it"
    side: against
    accounts: 1
    names_person: true
    forms:
      - commenter: "Snowy Hare F."
        quote: "she moved to cut it"
        comment: 3
`;

  const byId = () => new Map(parseRegister(yaml).candidates.map((c) => [c.id, c]));

  it('keeps its own decline rather than inheriting the go-ahead', () => {
    expect(byId().get('withheld-a-thread-1')!.outcome).toBe('NO');
  });

  it('is withheld even though the investigation around it goes ahead', () => {
    expect(byId().get('withheld-a-thread-1')!.withheld).toBe(true);
  });

  it('renders no proposition, wording or forms', () => {
    const entry = byId().get('withheld-a-thread-1')!;
    expect(entry.proposition).toBe(WITHHELD_LABEL);
    expect(entry.wording).toBe(WITHHELD_LABEL);
    expect(entry.forms ?? []).toEqual([]);
  });

  it('leaves a claim about what an office-holder did in office intact', () => {
    const entry = byId().get('motion-brought')!;
    expect(entry.withheld).toBeFalsy();
    expect(entry.proposition).toContain('brought a motion');
    expect(entry.forms).toHaveLength(1);
  });
});
