import { Card, CardLabel, CardValue } from '@/components/ui/card'
import { toHeightStr, toSignedInchesStr } from '@/lib/metrics'
import type { ComputedPlayer } from '@/lib/metrics'

interface SummaryCardsProps {
  players: ComputedPlayer[]
}

function mean(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

export function SummaryCards({ players }: SummaryCardsProps) {
  const avgFh          = players.length ? mean(players.map(p => p.fh)) : 0
  const avgHt          = players.length ? mean(players.map(p => p.ht)) : 0
  const avgWsGapVsMean = players.length ? mean(players.map(p => p.wsGapVsMean)) : 0

  const countVal  = String(players.length)
  const wsGapVal  = players.length ? toSignedInchesStr(avgWsGapVsMean) : '—'
  const fhVal     = players.length ? toHeightStr(avgFh) : '—'
  const htVal     = players.length ? toHeightStr(avgHt) : '—'

  return (
    <div className="grid grid-cols-4 gap-4 px-6 py-4">
      <Card>
        <CardLabel>Players shown</CardLabel>
        <CardValue key={countVal}>{countVal}</CardValue>
      </Card>
      <Card>
        <CardLabel>Avg WS gap vs mean</CardLabel>
        <CardValue key={wsGapVal} className="text-lg">{wsGapVal}</CardValue>
      </Card>
      <Card>
        <CardLabel>Avg TrueHeight</CardLabel>
        <CardValue key={fhVal}>{fhVal}</CardValue>
      </Card>
      <Card>
        <CardLabel>Avg actual height</CardLabel>
        <CardValue key={htVal} className="text-gray-500">{htVal}</CardValue>
      </Card>
    </div>
  )
}
