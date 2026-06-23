export const SCALE_FACTOR = 1.3317  // mean(SR / Ht) across 1,121 players
export const MEAN_WS_GAP  = 4.702   // mean(WS − Ht) across 1,121 players, inches
export const K            = 0.5     // OLS-implied: β(wsGap→SR) = 0.532 across 1,121 players → pure wingspan term = 1 − 0.532 ≈ 0.47, rounded to 0.5

export const POS_COLORS: Record<string, string> = {
  PG: '#3b82f6',
  SG: '#22c55e',
  SF: '#f59e0b',
  PF: '#f43f5e',
  C:  '#8b5cf6',
}
