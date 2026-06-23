import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { ControlsBar } from '@/components/ControlsBar'
import { SummaryCards } from '@/components/SummaryCards'
import { ScatterPlot } from '@/components/ScatterPlot'
import { ProspectTable } from '@/components/ProspectTable'
import { EmptyState } from '@/components/EmptyState'
import { seasons } from '@/data/players'
import { computePlayer } from '@/lib/metrics'

export type Pos = 'PG' | 'SG' | 'SF' | 'PF' | 'C'

const ALL_YEARS = seasons.map(s => s.year)

export default function App() {
  const [selectedPos, setSelectedPos] = useState<Pos[]>([])
  const [selectedYears, setSelectedYears] = useState<number[]>([seasons[0].year])
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null)
  const [clickedPlayer, setClickedPlayer] = useState<string | null>(null)

  function handlePosToggle(p: Pos) {
    setSelectedPos(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    )
  }

  function handleYearToggle(y: number) {
    setSelectedYears(prev => {
      if (prev.includes(y)) {
        if (prev.length === 1) return prev
        return prev.filter(x => x !== y)
      }
      return [...prev, y].sort((a, b) => b - a)
    })
  }

  const activePlayers = useMemo(
    () => seasons
      .filter(s => selectedYears.includes(s.year))
      .flatMap(s => s.players.map(p => ({ ...p, _year: s.year }))),
    [selectedYears]
  )

  const allComputed = useMemo(
    () => activePlayers.map(p => ({ ...computePlayer(p), year: p._year })),
    [activePlayers]
  )

  const filtered = useMemo(() => {
    if (selectedPos.length === 0) return allComputed
    return allComputed.filter(p => selectedPos.includes(p.pos as Pos))
  }, [allComputed, selectedPos])

  function handleClearPos() {
    setSelectedPos([])
  }

  return (
    <div className="min-h-screen bg-body">
      <Header />
      <ControlsBar
        selectedPos={selectedPos} onPosToggle={handlePosToggle}
        selectedYears={selectedYears} years={ALL_YEARS} onYearToggle={handleYearToggle}
      />
      <SummaryCards players={filtered} />
      {filtered.length === 0 ? (
        <EmptyState selectedPos={selectedPos} onClearPos={handleClearPos} />
      ) : (
        <div className="flex flex-col bg-body z-10 [@media(min-height:720px)]:sticky [@media(min-height:720px)]:top-3 [@media(min-height:720px)]:h-[calc(100dvh-0.75rem)] [@media(min-height:720px)]:overflow-hidden">
          <ScatterPlot players={filtered} hoveredPlayer={hoveredPlayer} onHoverPlayer={setHoveredPlayer} onClickPlayer={setClickedPlayer} />
          <ProspectTable players={filtered} showYear={selectedYears.length > 1} hoveredPlayer={hoveredPlayer} onHoverPlayer={setHoveredPlayer} scrollToPlayer={clickedPlayer} />
        </div>
      )}
    </div>
  )
}
