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
 * Both register pages print `candidate.side` and `candidate.commenters`
 * straight, each inside a test for the field being there, so a field the
 * redaction removes is a line the page does not render. That is why the
 * "does the page print it" question is answered here, against the candidate the
 * page is handed, rather than against built HTML.
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { REPO_ROOT } from '../scripts/lib/repo.ts';
import {
  WITHHELD_LABEL,
  candidateRegister,
  claimText,
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
    commenters: 3,
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

  it('drops the side and the commenter count, which describe the claim it will not show', () => {
    const redacted = redact(entry());
    expect(redacted.side).toBeUndefined();
    expect(redacted.commenters).toBeUndefined();
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
   * The register page prints the side and the commenter count from these two
   * fields and only from them, each under a test for the field being present,
   * so an entry that arrives without them renders no such line.
   */
  it('carries no side and no commenter count for a withheld entry', () => {
    for (const candidate of candidateRegister()) {
      if (!candidate.withheld) continue;
      expect(candidate.side).toBeUndefined();
      expect(candidate.commenters).toBeUndefined();
    }
  });

  it('keeps a withheld entry on the register with its outcome and its reason', () => {
    for (const candidate of candidateRegister()) {
      if (!candidate.withheld) continue;
      expect(candidate.id).not.toBe('');
      expect(candidate.outcome).not.toBe('');
      expect(candidate.reason ?? candidate.note).toBeTruthy();
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
