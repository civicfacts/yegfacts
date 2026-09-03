/**
 * Named individuals (v1 excludes right-of-reply, docs/DESIGN.md §2).
 *
 * Some captured claims accuse a named person of wrongdoing. Triage declines
 * those on a standing rule: the site has no right of reply to offer, so it does
 * not repeat the accusation. What it withholds is the proposition and the words
 * it was said in; the row, its decision and its reason stay public.
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
 * A claim carries no state of its own — triage rules on the question it belongs
 * to — so the trigger is the question's decline, which is what the fixture below
 * reads through `parseRegister`. No claim in the live register is in that
 * position, and a test that only looked at the live register would therefore
 * prove nothing.
 *
 * Both register pages print `claim.side` and `claim.accounts` straight, each
 * inside a test for the field being there, so a field the redaction removes is a
 * line the page does not render. That is why the "does the page print it"
 * question is answered here, against the claim the page is handed, rather than
 * against built HTML.
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPO_ROOT } from '../scripts/lib/repo.ts';
import {
  WITHHELD_LABEL,
  claimRegister,
  claimText,
  parseRegister,
  questionOf,
  redact,
  withholdsWording,
  type Claim,
} from '../src/lib/intake.ts';

function entry(overrides: Partial<Claim> = {}): Claim {
  return {
    id: 'named-individual-allegation',
    recorded: '2026-09-02',
    origin: 'captured',
    question: 'developer-payment',
    wording: 'Councillor Someone took a bribe from a developer.',
    proposition: 'Councillor Someone accepted a payment from a developer.',
    side: 'against',
    accounts: 3,
    names_person: true,
    reason:
      'An allegation against a named individual, which this site has no process to put to them.',
    variations: [
      {
        wording: 'took a bribe',
        source_id: 'thread',
        author_name: 'Snowy Hare F.',
      },
    ],
    ...overrides,
  };
}

describe('withholdsWording', () => {
  it('withholds an accusation the readers declined', () => {
    expect(withholdsWording({ names_person: true, triage: 'no' })).toBe(true);
  });

  // Parking is a decision about when to check something, not a refusal to
  // repeat it, and most claims that name a person name an office-holder doing
  // something the public record already carries.
  for (const triage of ['go', 'park'] as const) {
    it(`prints a named-individual claim on ${triage}`, () => {
      expect(withholdsWording({ names_person: true, triage })).toBe(false);
    });
  }

  it('does not withhold a claim that names nobody', () => {
    expect(withholdsWording({ names_person: false, triage: 'no' })).toBe(false);
  });
});

describe('redact', () => {
  it('puts a neutral heading where the claim would be, not the reason for withholding it', () => {
    const redacted = redact(entry(), 'no');
    expect(redacted.proposition).toBe(WITHHELD_LABEL);
    expect(redacted.wording).toBe(WITHHELD_LABEL);
    expect(claimText(redacted)).toBe(WITHHELD_LABEL);
    expect(redacted.withheld).toBe(true);
  });

  it('does not stand the reason in for the claim, which read as though somebody said it', () => {
    expect(claimText(redact(entry(), 'no'))).not.toBe(entry().reason);
  });

  it('drops the side and the account count, which describe the claim it will not show', () => {
    const redacted = redact(entry(), 'no');
    expect(redacted.side).toBeUndefined();
    expect(redacted.accounts).toBeUndefined();
  });

  it('keeps the id and the reason, so the entry is still on the register', () => {
    const redacted = redact(entry(), 'no');
    expect(redacted.id).toBe(entry().id);
    expect(redacted.reason).toBe(entry().reason);
  });

  it('drops every captured wording, so no quote survives to be rendered', () => {
    expect(redact(entry(), 'no').variations).toEqual([]);
  });

  it('leaves nothing of the allegation anywhere in the entry', () => {
    expect(JSON.stringify(redact(entry(), 'no'))).not.toContain('bribe');
  });

  it('has a heading even when the entry somehow carries no reason', () => {
    expect(redact(entry({ reason: undefined }), 'no').proposition).toBe(WITHHELD_LABEL);
  });

  it('passes a claim under a go-ahead question through untouched, quotes included', () => {
    const going = entry();
    expect(redact(going, 'go')).toBe(going);
  });

  it('passes a claim that names nobody through untouched', () => {
    const ordinary = entry({ names_person: false });
    expect(redact(ordinary, 'no')).toBe(ordinary);
  });
});

/**
 * Two questions from one source, one declined and one going ahead, each with a
 * claim naming a person. The claims carry no state, because triage ruled on the
 * questions; the decline has to reach the claim under it all the same.
 */
const FIXTURE = `
questions:
  - id: developer-payment
    recorded: "2026-09-02"
    source: thread
    question: "Was a councillor paid by a developer?"
    lifecycle: registered
    triage: no
    publication: unpublished
    reason: "An allegation about a named person, which this site has no process to put to them."
    accounts:
      total: 3
      against: 3
    run: reviews/intake/thread
  - id: pause-vote
    recorded: "2026-09-02"
    source: thread
    question: "How did council vote on pausing the routes?"
    lifecycle: registered
    triage: go
    publication: unpublished
    reason: "The minutes record the motion and the vote."
    accounts:
      total: 1
      against: 1
    run: reviews/intake/thread
claims:
  - id: developer-paid-councillor
    recorded: "2026-09-02"
    origin: captured
    source: thread
    question: developer-payment
    proposition: "Councillor Someone accepted a payment from a developer."
    wording: "Someone took a bribe from a developer."
    side: against
    accounts: 3
    names_person: true
    variations:
      - wording: "took a bribe"
        source_id: thread
        author_name: "Snowy Hare F."
  - id: councillor-moved-the-pause
    recorded: "2026-09-02"
    origin: captured
    source: thread
    question: pause-vote
    proposition: "Councillor Someone brought the motion to pause the routes."
    wording: "Someone brought the motion to pause them."
    side: against
    accounts: 1
    names_person: true
    variations:
      - wording: "brought the motion"
        source_id: thread
        author_name: "Snowy Hare F."
`;

const fixture = (id: string): Claim => {
  const found = parseRegister(FIXTURE).claims.find((claim) => claim.id === id);
  if (found === undefined) throw new Error(`no ${id} in the fixture`);
  return found;
};

describe('a claim whose question was declined', () => {
  it('inherits the decline, because the claim has no triage of its own', () => {
    expect(fixture('developer-paid-councillor').withheld).toBe(true);
  });

  it('renders no proposition, no wording and no captured variations', () => {
    const withheld = fixture('developer-paid-councillor');
    expect(withheld.proposition).toBe(WITHHELD_LABEL);
    expect(withheld.wording).toBe(WITHHELD_LABEL);
    expect(claimText(withheld)).toBe(WITHHELD_LABEL);
    expect(withheld.variations).toEqual([]);
  });

  it('leaves nothing of the allegation anywhere in the entry', () => {
    expect(JSON.stringify(fixture('developer-paid-councillor'))).not.toContain('bribe');
  });

  it('keeps the entry on the register, with its id and the question it belongs to', () => {
    const withheld = fixture('developer-paid-councillor');
    expect(withheld.id).toBe('developer-paid-councillor');
    expect(withheld.question).toBe('developer-payment');
  });

  // The trigger is the decline, not the name: an office-holder's public record
  // is what the site exists to check, and it is named here as in the stories.
  it('prints a named office-holder’s public record when the question goes ahead', () => {
    const going = fixture('councillor-moved-the-pause');
    expect(going.withheld).toBeUndefined();
    expect(going.proposition).toContain('brought the motion');
    expect(going.variations).toHaveLength(1);
  });
});

describe('the register as the site receives it', () => {
  const declined = (claim: Claim) =>
    claim.names_person === true && (claim.triage ?? questionOf(claim)?.triage) === 'no';

  it('carries no proposition or quote for a withheld entry', () => {
    for (const claim of claimRegister()) {
      if (!declined(claim)) continue;
      expect(claim.withheld).toBe(true);
      expect(claim.variations ?? []).toEqual([]);
      expect(claim.proposition).toBe(WITHHELD_LABEL);
      expect(claim.wording).toBe(WITHHELD_LABEL);
    }
  });

  /**
   * The register page prints the side and the account count from these two
   * fields and only from them, each under a test for the field being present,
   * so an entry that arrives without them renders no such line.
   */
  it('carries no side and no account count for a withheld entry', () => {
    for (const claim of claimRegister()) {
      if (!claim.withheld) continue;
      expect(claim.side).toBeUndefined();
      expect(claim.accounts).toBeUndefined();
    }
  });

  /**
   * The row stays public, with somewhere to read the reason: its own, for a
   * claim declined on the right-of-reply ground, and its question's otherwise.
   */
  it('keeps a withheld entry on the register with a reason to read', () => {
    for (const claim of claimRegister()) {
      if (!claim.withheld) continue;
      expect(claim.id).not.toBe('');
      expect(claim.reason ?? questionOf(claim)?.reason).toBeTruthy();
    }
  });

  /** The live register holds one, and it is the right-of-reply decline. */
  it('holds at least one withheld entry, so the rules above are not vacuous', () => {
    expect(claimRegister().filter((claim) => claim.withheld).length).toBeGreaterThan(0);
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
 * An accusation declined inside a question that is going ahead.
 *
 * The first version of grouping keyed withholding off the question's answer, so
 * a question worth investigating published the accusation sitting inside it.
 * The decline is a property of the claim.
 */
describe('a claim declined while its question goes ahead', () => {
  const yaml = `
questions:
  - id: disclosed-interests
    recorded: "2026-09-03"
    source: a-thread
    question: "What do councillors' filed disclosures show?"
    lifecycle: registered
    triage: go
    publication: unpublished
    reason: "Filed disclosure statements can answer it."
    accounts:
      total: 2
      against: 2
    run: reviews/intake/a-thread
sources: []
claims:
  - id: withheld-a-thread-1
    recorded: "2026-09-03"
    origin: captured
    source: a-thread
    question: disclosed-interests
    side: against
    accounts: 1
    names_person: true
    triage: no
    ground: right-of-reply
    reason: "The question around it is going ahead; this claim is not."
  - id: motion-brought
    recorded: "2026-09-03"
    origin: captured
    source: a-thread
    question: disclosed-interests
    proposition: "A councillor brought a motion to cut the budget."
    wording: "she moved to cut it"
    side: against
    accounts: 1
    names_person: true
    variations:
      - wording: "she moved to cut it"
        source_id: a-thread
        author_name: "Snowy Hare F."
`;

  const byId = () => new Map(parseRegister(yaml).claims.map((claim) => [claim.id, claim]));

  it('keeps its own decline rather than inheriting the go-ahead', () => {
    expect(byId().get('withheld-a-thread-1')!.triage).toBe('no');
  });

  it('is withheld even though the question around it goes ahead', () => {
    expect(byId().get('withheld-a-thread-1')!.withheld).toBe(true);
  });

  it('renders no proposition, wording or variations', () => {
    const entry = byId().get('withheld-a-thread-1')!;
    expect(entry.proposition).toBe(WITHHELD_LABEL);
    expect(entry.wording).toBe(WITHHELD_LABEL);
    expect(entry.variations ?? []).toEqual([]);
  });

  it('leaves a claim about what an office-holder did in office intact', () => {
    const entry = byId().get('motion-brought')!;
    expect(entry.withheld).toBeFalsy();
    expect(entry.proposition).toContain('brought a motion');
    expect(entry.variations).toHaveLength(1);
  });
});
