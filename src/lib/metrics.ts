import type { PlayerRaw } from '@/data/players'
import { SCALE_FACTOR, MEAN_WS_GAP, K } from '@/lib/constants'

export interface ComputedPlayer extends PlayerRaw {
  ht: number
  ws: number
  sr: number
  wsGap: number
  wsRatio: number
  wsGapVsMean: number
  wsAdj: number
  fh: number
  vsActual: number
  year?: number
}

export function parseInches(s: string): number {
  const m = s.match(/(\d+)'(\d+(?:\.\d+)?)"/)
  if (!m) throw new Error(`Cannot parse: ${s}`)
  return parseInt(m[1]) * 12 + parseFloat(m[2])
}

export function toHeightStr(inches: number): string {
  const ft = Math.floor(inches / 12)
  const inc = inches % 12
  const rounded = Math.round(inc * 4) / 4
  const whole = Math.floor(rounded)
  const frac = rounded - whole
  const fracStr = frac === 0.25 ? '¼' : frac === 0.5 ? '½' : frac === 0.75 ? '¾' : ''
  return `${ft}'${whole === 0 && fracStr ? '' : whole}${fracStr}"`
}

export function toSignedHeightStr(inches: number): string {
  return (inches >= 0 ? '+' : '−') + toHeightStr(Math.abs(inches))
}

export function toSignedInchesStr(inches: number): string {
  const sign = inches >= 0 ? '+' : '−'
  return `${sign}${Math.abs(inches).toFixed(1)}"`
}

export function computePlayer(p: PlayerRaw): ComputedPlayer {
  const ht = parseInches(p.height)
  const ws = parseInches(p.wingspan)
  const sr = parseInches(p.standingReach)
  const wsGap       = ws - ht
  const wsRatio     = ws / ht
  const wsGapVsMean = wsGap - MEAN_WS_GAP
  const wsAdj       = K * wsGapVsMean
  const fh          = (sr + wsAdj) / SCALE_FACTOR
  const vsActual    = fh - ht
  return { ...p, ht, ws, sr, wsGap, wsRatio, wsGapVsMean, wsAdj, fh, vsActual }
}
