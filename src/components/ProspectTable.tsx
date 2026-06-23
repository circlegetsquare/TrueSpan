import { useState, useMemo, useRef, useEffect } from 'react'
import { PosBadge } from '@/components/ui/badge'
import { toHeightStr, toSignedHeightStr } from '@/lib/metrics'
import type { ComputedPlayer } from '@/lib/metrics'
import { cn } from '@/lib/utils'

type SortKey = 'rank' | 'name' | 'pos' | 'year' | 'ht' | 'ws' | 'sr' | 'wsGap' | 'wsRatio' | 'fh' | 'vsActual'
type SortDir = 'asc' | 'desc'

// WS−Ht coloring: >0.5" above mean (4.702") = green, >0.5" below = red
const WS_GAP_GREEN = 5.2
const WS_GAP_RED   = 4.2

function wsGapColor(wsGap: number) {
  if (wsGap > WS_GAP_GREEN) return 'text-green-600'
  if (wsGap < WS_GAP_RED)   return 'text-red-500'
  return 'text-gray-400'
}

// vs. Actual column: quartile-based (top 25% green, bottom 25% red)
// p75 = +1.30", p25 = −1.32" across 1,121 players
function vsActualColor(val: number) {
  if (val >  1.30) return 'text-green-600'
  if (val < -1.32) return 'text-red-500'
  return 'text-gray-400'
}

function SortIcon({ dir }: { dir: SortDir | null }) {
  if (!dir) return <span className="ml-1 text-gray-300" aria-hidden="true">↕</span>
  return <span className="ml-1" aria-hidden="true">{dir === 'asc' ? '↑' : '↓'}</span>
}

interface ThProps {
  children: React.ReactNode
  sortKey: SortKey
  currentKey: SortKey
  dir: SortDir
  onSort: (k: SortKey) => void
  className?: string
  align?: 'left' | 'right'
  title?: string
}

function Th({ children, sortKey, currentKey, dir, onSort, className, align = 'right', title }: ThProps) {
  const active = sortKey === currentKey
  return (
    <th
      onClick={() => onSort(sortKey)}
      title={title}
      className={cn(
        'sticky top-0 z-10 cursor-pointer select-none border-b border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium uppercase tracking-wide text-gray-500 whitespace-nowrap hover:bg-gray-100',
        align === 'left' ? 'text-left' : 'text-right',
        active && 'text-gray-900',
        className
      )}
    >
      {children}
      <SortIcon dir={active ? dir : null} />
    </th>
  )
}

interface ProspectTableProps {
  players: ComputedPlayer[]
  showYear?: boolean
  hoveredPlayer: string | null
  onHoverPlayer: (name: string | null) => void
  scrollToPlayer?: string | null
}

export function ProspectTable({ players, showYear = false, hoveredPlayer, onHoverPlayer, scrollToPlayer }: ProspectTableProps) {
  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map())

  useEffect(() => {
    if (scrollToPlayer) {
      rowRefs.current.get(scrollToPlayer)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [scrollToPlayer])
  const [sortKey, setSortKey] = useState<SortKey>('fh')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'name' || key === 'pos' ? 'asc' : 'desc')
    }
  }

  const sorted = useMemo(() => {
    const base = [...players].sort((a, b) => b.fh - a.fh)
    const ranked = base.map((p, i) => ({ ...p, rank: i + 1 }))

    return ranked.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'rank': cmp = a.rank - b.rank; break
        case 'name': cmp = a.name.localeCompare(b.name); break
        case 'pos':  cmp = a.pos.localeCompare(b.pos); break
        case 'year': cmp = (a.year ?? 0) - (b.year ?? 0); break
        case 'ht':   cmp = a.ht - b.ht; break
        case 'ws':   cmp = a.ws - b.ws; break
        case 'sr':   cmp = a.sr - b.sr; break
        case 'wsGap':    cmp = a.wsGap - b.wsGap; break
        case 'wsRatio':  cmp = a.wsRatio - b.wsRatio; break
        case 'fh':       cmp = a.fh - b.fh; break
        case 'vsActual': cmp = a.vsActual - b.vsActual; break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [players, sortKey, sortDir])

  const thProps = { currentKey: sortKey, dir: sortDir, onSort: handleSort }

  return (
    <>
      <div className="mx-6 mb-2 overflow-auto rounded-lg border border-gray-200 bg-white flex-1 min-h-72" onMouseLeave={() => onHoverPlayer(null)}>
        <table className="w-full border-separate border-spacing-0 text-base">
          <thead>
            <tr>
              <Th sortKey="rank" {...thProps} className="w-10 text-right" title="Rank by True Size in the current selection">#</Th>
              <Th sortKey="name" {...thProps} align="left" className="min-w-36">Player</Th>
              <Th sortKey="pos"  {...thProps} className="w-14">Pos</Th>
              {showYear && <Th sortKey="year" {...thProps} className="w-16" title="NBA Draft Combine year">Class</Th>}
              <Th sortKey="ht"   {...thProps} className="w-24" title="Measured height without shoes">Height</Th>
              <Th sortKey="ws"   {...thProps} className="w-24" title="Wingspan: fingertip to fingertip with arms outstretched">Wingspan</Th>
              <Th sortKey="sr"   {...thProps} className="w-32" title="Standing reach: height of fingertips with arm raised, feet flat on the floor">Standing Reach</Th>
              <Th sortKey="fh"       {...thProps} className="w-28" title="TrueHeight: the effective size a player occupies on the court, derived from standing reach and wingspan. The core metric of this tool.">TrueHeight</Th>
              <Th sortKey="vsActual" {...thProps} className="w-24" title="True Size minus actual height. How much larger or smaller a player plays relative to their listed height.">vs. Actual</Th>
              <Th sortKey="wsGap"    {...thProps} className="w-20" title={'Wingspan minus height. The NBA draft combine average is ~4.7″. Higher values indicate a physical advantage beyond height alone.'}>WS−Ht</Th>
              <Th sortKey="wsRatio"  {...thProps} className="w-20" title="Wingspan-to-height ratio. Values above 100% mean the player's reach exceeds their standing height.">WS/Ht</Th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr
                key={`${p.year}-${p.name}-${i}`}
                ref={el => { if (el) rowRefs.current.set(p.name, el); else rowRefs.current.delete(p.name) }}
                style={{ scrollMarginTop: '2.5rem' }}
                className={cn(
                  'border-b border-gray-100 transition-colors',
                  hoveredPlayer === p.name ? 'bg-accent/10' : 'hover:bg-accent/6'
                )}
                onMouseEnter={() => onHoverPlayer(p.name)}
              >
                <td className="px-3 py-2 text-right text-gray-400 tabular-nums text-xs">{p.rank}</td>
                <td className="px-3 py-2 font-medium text-gray-900">{p.name}</td>
                <td className="px-3 py-2 text-right">
                  <PosBadge pos={p.pos} />
                </td>
                {showYear && (
                  <td className="px-3 py-2 text-right text-gray-400 tabular-nums text-xs">{p.year}</td>
                )}
                <td className="px-3 py-2 text-right text-gray-400 tabular-nums">{toHeightStr(p.ht)}</td>
                <td className="px-3 py-2 text-right text-gray-400 tabular-nums">{toHeightStr(p.ws)}</td>
                <td className="px-3 py-2 text-right text-gray-400 tabular-nums">{toHeightStr(p.sr)}</td>
                <td className="px-3 py-2 text-right font-semibold text-accent tabular-nums">
                  {toHeightStr(p.fh)}
                </td>
                <td className={cn('px-3 py-2 text-right tabular-nums font-medium', vsActualColor(p.vsActual))}>
                  {toSignedHeightStr(p.vsActual)}
                </td>
                <td className={cn('px-3 py-2 text-right tabular-nums font-medium', wsGapColor(p.wsGap))}>
                  {toSignedHeightStr(p.wsGap)}
                </td>
                <td className={cn('px-3 py-2 text-right tabular-nums font-medium', wsGapColor(p.wsGap))}>
                  {(p.wsRatio * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-6 mb-6 text-xs text-gray-400">
        Based on 1,121 players, 2010–2026 NBA Draft Combines. Wemby's data added manually.
      </p>
    </>
  )
}
