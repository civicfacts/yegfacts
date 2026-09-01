import { describe, expect, it } from 'vitest';
import { figures, results } from '../scripts/calcs/electric-buses';

describe('electric-buses calculations', () => {
  it('winter shortfall vs extreme-cold guarantee is 38%', () => {
    expect(results.winterShortfallVsColdGuaranteePct).toBe(38);
  });
  it('winter shortfall vs normal contract range is 50%', () => {
    expect(results.winterShortfallVsNormalContractPct).toBe(50);
  });
  it('warm best vs announced 350 km is a 29% shortfall', () => {
    expect(results.warmShortfallVsAnnouncedPct).toBe(29);
  });
  it('winter range is 62% of the cold guarantee', () => {
    expect(results.winterRangeVsColdGuaranteePct).toBe(62);
  });
  it('source figures are the verbatim published values', () => {
    expect(figures.purchasePriceUSD).toBe(58_761_600);
    expect(figures.contractRangeColdKm).toBe(268);
    expect(figures.observedWinterAvgKm).toBe(165);
  });
});
