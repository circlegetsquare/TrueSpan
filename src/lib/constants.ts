// TrueHeight = SR_WEIGHT × (SR / SR_SCALE) + WS_WEIGHT × (WS / WS_SCALE)
// Derived from 1,121 combine players, 2010–2026
export const SR_SCALE  = 1.3317  // mean(standing reach / height)
export const WS_SCALE  = 1.0606  // mean(wingspan / height)
export const SR_WEIGHT = 0.75    // standing reach carries 75% of TrueHeight
export const WS_WEIGHT = 0.25    // wingspan carries 25% of TrueHeight

export const POS_COLORS: Record<string, string> = {
  PG: '#3b82f6',
  SG: '#22c55e',
  SF: '#f59e0b',
  PF: '#f43f5e',
  C:  '#8b5cf6',
}
