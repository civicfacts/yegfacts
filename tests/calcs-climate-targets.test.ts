import { describe, expect, it } from 'vitest';
import { figures, results } from '../scripts/calcs/climate-targets';

describe('climate-targets calculations', () => {
  it('2024 emissions were 3.0 Mt above the trajectory value', () => {
    expect(results.gapAboveTrajectory2024Mt).toBe(3.0);
  });
  it('that gap is 25% above the trajectory value', () => {
    expect(results.pctAboveTrajectory2024).toBe(25);
  });
  it('the 2025 milestone is still 26 percentage points away', () => {
    expect(results.reductionShortfallPoints).toBe(26);
  });

  // The City publishes these three itself; the arithmetic below reproduces
  // them from the raw values, so a mismatch means one of the figures is wrong.
  it('reduction since 2005 reproduces the City-reported 9%', () => {
    expect(results.reductionSince2005Pct).toBe(figures.cityReportedReductionSince2005Pct);
  });
  it('the 2025 one-year cut reproduces the City-reported 29%', () => {
    expect(results.required2025CutFrom2024Pct).toBe(figures.cityReportedRequired2025CutPct);
  });
  it('the 2025 target reproduces the adopted 35% reduction from 2005', () => {
    expect(results.target2025ReductionFromBaselinePct).toBe(figures.target2025ReductionPct);
  });
  it('the corporate overshoot reproduces the City-reported 68,000 tonnes', () => {
    expect(results.corporateDeficitT).toBe(figures.cityReportedCorporateDeficitT);
  });

  it('source figures are the verbatim published values', () => {
    expect(figures.inventory2024Mt).toBe(15.2);
    expect(figures.trajectory2024Mt).toBe(12.2);
    expect(figures.target2025Mt).toBe(10.8);
    expect(figures.baseline2005Mt).toBe(16.7);
    expect(figures.communityCarbonBudgetMt).toBe(176);
  });
});
