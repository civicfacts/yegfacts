import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { approvedPanels, figures, presentedPanels, timeLimitVote } from '../scripts/calcs/council-hearing';
import { loadYaml, repoPath } from '../scripts/lib/repo.ts';

/**
 * The council-hearing counts are transcribed from private City minutes and
 * recomputed here, so these tests pin the arithmetic to the prose and fail if
 * the page and the transcription drift apart.
 */
type Claim = { answer: string; key_facts: { text: string }[]; limitations: string[] };

const claim = loadYaml<Claim>(repoPath('src', 'content', 'claims', 'ch-speaking-time-cut.yaml'));
const claimText = [claim.answer, ...claim.key_facts.map((f) => f.text), ...claim.limitations].join(' ');
const story = readFileSync(repoPath('src', 'content', 'stories', 'council-hearing.mdx'), 'utf8').replace(/\s+/g, ' ');

describe('the three counts', () => {
  it('64 approved on the bike-lane item, 79 across the meeting, 52 recorded as speaking', () => {
    expect(figures.n.count).toBe(64);
    expect(figures.nAll.count).toBe(79);
    expect(figures.nSpoke.count).toBe(52);
    expect(approvedPanels.map((p) => p.entries).join(', ')).toBe('15, 15, 15, 15, 4');
    expect(presentedPanels.map((p) => p.entries).join(', ')).toBe('16, 16, 18, 2');
    expect(claimText).toContain('five panels of 15, 15, 15, 15 and 4');
    expect(claimText).toContain('four panels of 16, 16, 18 and 2');
    expect(claimText).toContain('64 entries were listed to speak');
    expect(claimText).toContain('the 52 recorded as speaking');
    expect(claimText).toContain('hold 79 entries');
    expect(story).toContain('for the bike-lane item has 64 entries');
    expect(story).toContain('on the list there are 79');
    expect(story).toContain('The minutes record 52 entries as having spoken');
  });

  it('organizations: 15 of the approved entries and 12 of those recorded as speaking', () => {
    expect(figures.approvedWithOrganization).toBe(15);
    expect(figures.presentedWithOrganization).toBe(12);
    expect(claimText).toContain('Fifteen of the entries give an organization');
    expect(claimText).toContain('Twelve of those entries give an organization');
    expect(story).toContain("show 15 that gave a group's name");
    expect(story).toContain('Fifteen entries on the list of approved speakers named a group');
  });

  it('only the count of those who spoke falls outside 60 to 80, so the finding depends on the count', () => {
    expect(figures.n).toMatchObject({ inPrimary: true, inAlternative: true });
    expect(figures.nAll).toMatchObject({ inPrimary: true, inAlternative: true });
    expect(figures.nSpoke).toMatchObject({ inPrimary: false, inAlternative: true });
    expect(figures.definitionSensitive).toBe(true);
    expect(claimText).toContain('The 52 recorded as speaking is below 60');
  });
});

describe('the groups behind the call to register', () => {
  it('nine approved entries gave one of the three groups, seven of them among those who spoke', () => {
    expect(figures.approvedUnderCallGroups).toBe(9);
    expect(figures.presentedUnderCallGroups).toBe(7);
    expect(figures.n.count - figures.approvedUnderCallGroups).toBe(55);
    expect(story).toContain('nine of those gave one of these three groups');
    expect(story).toContain('any of the other 55 answered it');
    expect(story).toContain('Nine of 64 entries named groups tied to the call to speak');
    expect(story).toContain('nine entries on the list gave its name or a group working with it');
  });
});

describe('the time-limit motion', () => {
  it('carried 6 to 0, above the four votes two-thirds of six requires', () => {
    expect(timeLimitVote.movedBy).toBe('M. Janz');
    expect(figures.vote).toBe('6 to 0');
    expect(figures.specialResolutionNeeds).toBe(4);
    expect(figures.specialResolutionMet).toBe(true);
    expect(claimText).toContain('The motion carried 6 to 0');
    expect(claimText).toContain('Two-thirds of six is four');
    expect(story).toContain('All six committee members present voted for it');
    expect(story).toContain('the four votes two-thirds of six requires');
  });
});
