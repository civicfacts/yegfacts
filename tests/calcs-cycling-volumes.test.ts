import { describe, expect, it } from 'vitest';
import {
  belowAlternativeCutoff,
  belowPrimaryCutoff,
  calendarYear2025Total,
  commuting2021City,
  commuting2021RowSum,
  commutingShares,
  counterTotalFallFrom2025Pct,
  counterTotalShortfallPct,
  employedDenominatorShares,
  hermitageNorthJuly2025Median,
  insightCommunity2014,
  insightCommunity2014Shares,
  januaryReporting,
  januaryToJulyTotals,
  july2025MedianRange,
  membershipChain,
  municipalCensus2012BicyclePct,
  outOfServiceCounter,
  tripShares2015,
  verdictSetJuly2025,
  winter2025SharePct,
} from '../scripts/calcs/cycling-volumes';
import { loadYaml, repoPath } from '../scripts/lib/repo.ts';

/**
 * Almost every figure on this page is a sum, a median or a share taken off an
 * open dataset the site cannot commit, so the transcription in the calcs module
 * is the repository's only copy of what was read. That makes two things worth
 * testing. First, that the derivations still come out at the numbers the claim
 * records print — an edit to a source cell that does not move the published
 * share is a transcription error. Second, that the counter set the finding
 * quantifies over is still the set the brief's five tests returned.
 */
type Claim = {
  answer: string;
  key_facts: { text: string; sources: string[] }[];
  limitations: string[];
};

const claim = (id: string) => loadYaml<Claim>(repoPath('src', 'content', 'claims', `${id}.yaml`));

const allText = (id: string): string => {
  const c = claim(id);
  return [c.answer, ...c.key_facts.map((f) => f.text), ...c.limitations].join(' ');
};

const round = (value: number, places: number): number =>
  Number(value.toFixed(places));

describe('the counter total', () => {
  it('sums January to July 2026 to the figure the claim prints', () => {
    expect(januaryToJulyTotals[2026]).toBe(1_291_714);
    expect(allText('cv-counter-total-2026')).toContain('1,291,714');
  });

  it('gives the same window in the two preceding years', () => {
    expect(januaryToJulyTotals[2025]).toBe(1_611_749);
    expect(januaryToJulyTotals[2024]).toBe(1_547_532);
    const text = allText('cv-counter-total-2026');
    expect(text).toContain('1,611,749');
    expect(text).toContain('1,547,532');
  });

  it('is 0.6 per cent below the figure in circulation and about a fifth below 2025', () => {
    expect(round(counterTotalShortfallPct, 1)).toBe(0.6);
    expect(round(counterTotalFallFrom2025Pct, 0)).toBe(20);
  });
});

describe('the metered lanes', () => {
  it('quantifies over the 20 counters the five membership tests returned', () => {
    expect(verdictSetJuly2025).toHaveLength(membershipChain.verdictSet);
    expect(membershipChain.verdictSet).toBe(membershipChain.onStreet - membershipChain.outOfService);
    expect(membershipChain.unclassifiable).toBe(0);
    expect(membershipChain.underReported).toBe(0);
  });

  it('runs from 46 to 979 a day, with none below the primary cutoff and one below the alternative', () => {
    expect(july2025MedianRange).toEqual({ lowest: 46, highest: 979 });
    expect(belowPrimaryCutoff).toBe(0);
    expect(belowAlternativeCutoff).toBe(1);
    const text = allText('cv-lanes-look-empty');
    expect(text).toContain('46');
    expect(text).toContain('979');
  });

  it('reports the January range over the 17 counters that published that month', () => {
    expect(januaryReporting).toEqual({ counters: 17, lowest: 6, highest: 212 });
    expect(allText('cv-lanes-look-empty')).toContain('17 that have January 2025 records');
  });

  it('names the counter that went out of service and the level it was running at', () => {
    const text = allText('cv-lanes-look-empty');
    expect(text).toContain(outOfServiceCounter.counterAsWritten);
    expect(text).toContain(outOfServiceCounter.lastRecord);
    expect(text).toContain(String(outOfServiceCounter.lastFullMonthMedian));
  });

  it('names the off-street counter on a corridor residents named', () => {
    expect(allText('cv-lanes-look-empty')).toContain(String(hermitageNorthJuly2025Median));
  });
});

describe('the census shares', () => {
  it('gives 0.88 per cent of city commuters and 0.73 per cent of the region', () => {
    expect(round(commutingShares.bicycle2021CityPct, 2)).toBe(0.88);
    expect(round(commutingShares.bicycle2021CmaPct, 2)).toBe(0.73);
    expect(allText('cv-commuters-cycle')).toContain('0.88 per cent');
  });

  it('gives 85.11 per cent of city commuters and 87.40 per cent of the region by car', () => {
    expect(round(commutingShares.car2021CityPct, 2)).toBe(85.11);
    expect(round(commutingShares.car2021CmaPct, 2)).toBe(87.4);
    expect(round(commutingShares.driverOnly2021CityPct, 2)).toBe(78.44);
    const text = allText('cv-commute-by-car');
    expect(text).toContain('85.11 per cent');
    expect(text).toContain('87.40 per cent');
  });

  it('gives the 2016 comparisons the claims print', () => {
    expect(round(commutingShares.bicycle2016CityPct, 2)).toBe(1.2);
    expect(round(commutingShares.car2016CityPct, 2)).toBe(78.76);
  });

  it('puts the people who worked at home back into the denominator', () => {
    expect(round(employedDenominatorShares.workedAtHome2021Pct, 2)).toBe(21.12);
    expect(round(employedDenominatorShares.workedAtHome2016Pct, 2)).toBe(4.72);
    expect(round(employedDenominatorShares.car2021Pct, 1)).toBe(66.9);
    expect(round(employedDenominatorShares.bicycle2021Pct, 2)).toBe(0.69);
  });

  it('shows the separately rounded rows overshooting the published total by five', () => {
    expect(commuting2021City.total).toBe(380_315);
    expect(commuting2021RowSum).toBe(380_320);
    const text = allText('cv-commute-by-car');
    expect(text).toContain('380,315');
    expect(text).toContain('380,320');
  });
});

describe('the trip and participation figures', () => {
  it('reproduces the 2015 survey shares the report prints', () => {
    expect(round(tripShares2015.cityBicyclePct, 1)).toBe(1.7);
    expect(round(tripShares2015.regionBicyclePct, 1)).toBe(0.8);
    expect(allText('cv-trips-by-bike')).toContain('1.7 per cent');
  });

  it('adds the 2014 panel response bands to its 816 respondents', () => {
    const seasons = [insightCommunity2014.springSummerFall, insightCommunity2014.winter];
    for (const bands of seasons) {
      const total = Object.values(bands).reduce((a, b) => a + b, 0);
      expect(total).toBe(insightCommunity2014.respondents);
    }
  });

  it('gives the panel bands the claims report', () => {
    expect(insightCommunity2014Shares.rodeAtSomeFrequency).toBe(489);
    expect(insightCommunity2014Shares.winterAtSomeFrequency).toBe(101);
    expect(insightCommunity2014Shares.winterStrictReading).toBe(21);
    expect(round(insightCommunity2014Shares.neverRidesInWinterPct, 1)).toBe(87.6);
    expect(allText('cv-population-rides')).toContain('489');
  });

  it('gives the winter share of counted volume and the 2012 municipal census share', () => {
    expect(calendarYear2025Total).toBe(2_856_631);
    expect(round(winter2025SharePct, 2)).toBe(4.87);
    expect(round(municipalCensus2012BicyclePct, 2)).toBe(0.67);
    expect(allText('cv-year-round-riders')).toContain('4.87 per cent');
    expect(allText('cv-commuters-cycle')).toContain('0.67 per cent');
  });
});
