import { describe, expect, it } from 'vitest';
import { figures, results } from '../scripts/calcs/active-transportation';

describe('active-transportation calcs', () => {
  it('the four approved years of CM-20-0330 sum to the claimed $100 million', () => {
    expect(results.cm200330ApprovedTotalMillions).toBe(100);
  });

  it('snow ratios come from the printed 2022 cell and its named alternative', () => {
    expect(results.snowRatioPrimary).toBe(1.551);
    expect(results.snowRatioAmended2022).toBe(1.446);
    expect(results.snowRatioNet2022).toBe(1.571);
    expect(results.snowRatioLikeForLike2023Allocation).toBe(0.092);
    expect(results.snowRatioLikeForLikeAverageYear).toBe(0.388);
  });

  it('the primary ratio sits inside the frozen Partially supported band and the amended one below it', () => {
    expect(results.snowRatioPrimary).toBeGreaterThanOrEqual(1.5);
    expect(results.snowRatioPrimary).toBeLessThan(1.8);
    expect(results.snowRatioAmended2022).toBeLessThan(1.5);
  });

  it('roads ratios follow the frozen boundary and the service-line alternative', () => {
    expect(results.roadsPrimaryMillions).toBe(1945.703);
    expect(results.roadsRatioPrimary).toBe(19.46);
    expect(results.roadsRatioServiceLine).toBe(17.94);
    expect(results.roadsRatioNarrowest).toBe(11.17);
    expect(results.roadsRatioWidest).toBe(20.26);
    expect(results.claimedRoadsRatio).toBe(18);
  });

  it('every roads reading clears the frozen Supported threshold except the narrowest', () => {
    expect(results.roadsPrimaryMillions).toBeGreaterThanOrEqual(1500);
    expect(figures.activePathwaysAndRoadsService2023to2026Millions.total).toBeGreaterThanOrEqual(1500);
    expect(figures.roadsLabelledProfilesThousands / 1000).toBeLessThan(1500);
  });

  it('shares and spending are derived, not retyped', () => {
    expect(results.programShareOfCapitalBudgetPct).toBe(1.39);
    expect(results.programShareOfMovementOfPeopleAndGoodsPct).toBe(4.43);
    expect(results.cm200330ActualByYearMillions[2023]).toBe(0.807);
    expect(results.cm200330ActualByYearMillions[2024]).toBe(9.689);
    expect(results.cm200330ActualByYearMillions[2025]).toBe(29.488);
    expect(results.cm200330SpentShareOfCurrentApprovedPct).toBe(40.2);
    expect(results.cm200330AverageActualYearMillions).toBe(13.33);
  });
});
