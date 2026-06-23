import { useMemo, useRef, useState, useEffect } from 'react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import type { ComputedPlayer } from '@/lib/metrics'
import { toHeightStr, toSignedHeightStr } from '@/lib/metrics'
import { POS_COLORS } from '@/lib/constants'

const POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C'] as const
type Pos = typeof POSITIONS[number]

function fmtAxis(v: number): string {
  const ft = Math.floor(v / 12)
  const inch = Math.round(v % 12)
  return `${ft}'${inch}"`
}

interface HoverHandlers {
  enter: (name: string) => void
  leave: () => void
}

// Defined at module level so Recharts never remounts it on re-render.
// Hover state arrives via data props, not closure, keeping the reference stable.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ScatterDot = (props: any) => {
  const { cx, cy, fill, dotR = 7, dotOpacity = 1, isHovered = false, playerName, hoverHandlers, clickHandler } = props
  if (cx == null || cy == null) return null
  return (
    <g
      style={{ opacity: dotOpacity, transition: 'opacity 150ms ease-out', cursor: 'pointer' }}
      onMouseEnter={() => (hoverHandlers as HoverHandlers)?.enter(playerName)}
      onMouseLeave={() => (hoverHandlers as HoverHandlers)?.leave()}
      onClick={() => clickHandler?.(playerName)}
    >
      {isHovered && (
        <circle cx={cx} cy={cy} r={16} fill={fill} fillOpacity={0.18} stroke="none" />
      )}
      <circle
        cx={cx}
        cy={cy}
        r={dotR}
        fill={fill}
        fillOpacity={1}
        stroke="#2e3347"
        strokeWidth={isHovered ? 2 : 0.5}
      />
    </g>
  )
}

function TooltipContent({ p }: { p: ComputedPlayer }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg text-xs leading-5">
      <div className="font-semibold text-gray-900 text-sm mb-0.5">{p.name}</div>
      <div className="text-gray-400 mb-2">{p.pos}</div>
      <div className="space-y-0.5">
        <div className="flex justify-between gap-6">
          <span className="text-gray-500">Height</span>
          <span className="tabular-nums">{toHeightStr(p.ht)}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-gray-500">Wingspan</span>
          <span className="tabular-nums">{toHeightStr(p.ws)}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-gray-500">Standing Reach</span>
          <span className="tabular-nums">{toHeightStr(p.sr)}</span>
        </div>
        <div className="flex justify-between gap-6 border-t border-gray-100 pt-1 mt-1">
          <span className="text-gray-500">TrueHeight</span>
          <span className="tabular-nums font-semibold text-accent">{toHeightStr(p.fh)}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-gray-500">vs. Actual</span>
          <span className="tabular-nums font-medium">{toSignedHeightStr(p.vsActual)}</span>
        </div>
      </div>
    </div>
  )
}

interface ScatterPlotProps {
  players: ComputedPlayer[]
  hoveredPlayer: string | null
  onHoverPlayer: (name: string | null) => void
  onClickPlayer: (name: string) => void
}

export function ScatterPlot({ players, hoveredPlayer, onHoverPlayer, onClickPlayer }: ScatterPlotProps) {
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null)

  // Tooltip mount/fade state — we control this ourselves so we can delay
  // unmounting until the fade-out animation completes.
  // tooltipName is set only by dot hover — table row hover must not trigger the tooltip.
  const [tooltipName, setTooltipName] = useState<string | null>(null)
  const [tooltipMounted, setTooltipMounted] = useState(false)
  const [tooltipFading, setTooltipFading] = useState(false)
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (tooltipName) {
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
      setTooltipFading(false)
      setTooltipMounted(true)
    } else {
      setTooltipFading(true)
      fadeTimer.current = setTimeout(() => {
        setTooltipMounted(false)
        setTooltipFading(false)
      }, 150)
    }
    return () => { if (fadeTimer.current) clearTimeout(fadeTimer.current) }
  }, [tooltipName])

  // Keep the last dot-hovered player's data so content stays visible during fade-out.
  const tooltipPlayerData = useMemo(
    () => players.find(p => p.name === tooltipName) ?? null,
    [players, tooltipName]
  )
  const lastTooltipPlayer = useRef<ComputedPlayer | null>(null)
  if (tooltipPlayerData) lastTooltipPlayer.current = tooltipPlayerData
  const tooltipPlayer = lastTooltipPlayer.current

  const hoverHandlers = useMemo<HoverHandlers>(() => ({
    enter: (name: string) => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current)
      setTooltipName(name)
      onHoverPlayer(name)
    },
    leave: () => {
      leaveTimer.current = setTimeout(() => {
        setTooltipName(null)
        onHoverPlayer(null)
      }, 60)
    },
  }), [onHoverPlayer])

  const byPos = useMemo(() => {
    const map: Partial<Record<Pos, Array<{
      x: number; y: number; player: ComputedPlayer
      dotR: number; dotOpacity: number; isHovered: boolean
      playerName: string; hoverHandlers: HoverHandlers
      clickHandler: (name: string) => void
    }>>> = {}
    for (const p of players) {
      const pos = p.pos as Pos
      if (!map[pos]) map[pos] = []
      const isHov = hoveredPlayer === p.name
      const isDimmed = hoveredPlayer !== null && !isHov
      map[pos]!.push({
        x: p.ht, y: p.fh, player: p,
        dotR: isHov ? 10 : 7,
        dotOpacity: isDimmed ? 0.25 : 1,
        isHovered: isHov,
        playerName: p.name,
        hoverHandlers,
        clickHandler: onClickPlayer,
      })
    }
    return map
  }, [players, hoveredPlayer, hoverHandlers, onClickPlayer])

  const X_MIN = 66
  const X_MAX = 90

  const { xDomain, xTicks, yDomain, yTicks } = useMemo(() => {
    const makeTicks = (lo: number, hi: number) => {
      const t: number[] = []
      for (let v = lo; v <= hi; v += 6) t.push(v)
      return t
    }
    return {
      xDomain: [X_MIN, X_MAX] as [number, number], xTicks: makeTicks(X_MIN, X_MAX),
      yDomain: [X_MIN, X_MAX] as [number, number], yTicks: makeTicks(X_MIN, X_MAX),
    }
  }, [])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      className="mx-6 mb-4 shrink-0 relative"
      onMouseLeave={() => onHoverPlayer(null)}
      onMouseMove={handleMouseMove}
    >
      {/* Custom overlay tooltip — animation fires on mount (fade-in) and we
          delay unmounting by 150ms so the fade-out keyframe can complete. */}
      {tooltipMounted && tooltipPlayer && cursorPos && (
        <div
          style={{
            position: 'absolute',
            left: cursorPos.x + 16,
            top: Math.max(8, cursorPos.y - 90),
            animation: tooltipFading
              ? 'fade-out 150ms ease-out forwards'
              : 'fade-in 300ms ease-out forwards',
            pointerEvents: 'none',
            zIndex: 50,
          }}
        >
          <TooltipContent p={tooltipPlayer} />
        </div>
      )}

      <div className="rounded-lg border border-gray-200 bg-white p-4 pb-3">
        <ResponsiveContainer width="100%" height={360}>
          <ScatterChart margin={{ top: 20, right: 24, bottom: 48, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#252a3d" />
            <XAxis
              type="number"
              dataKey="x"
              name="height"
              domain={xDomain}
              ticks={xTicks}
              tickFormatter={fmtAxis}
              tick={{ fontSize: 11, fill: '#6b7a9a' }}
              axisLine={{ stroke: '#2e3347' }}
              tickLine={{ stroke: '#2e3347' }}
              label={{
                value: 'Actual Height',
                position: 'insideBottom',
                offset: -14,
                fontSize: 11,
                fill: '#5a6480',
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="trueSize"
              domain={yDomain}
              ticks={yTicks}
              tickFormatter={fmtAxis}
              tick={{ fontSize: 11, fill: '#6b7a9a' }}
              axisLine={{ stroke: '#2e3347' }}
              tickLine={{ stroke: '#2e3347' }}
              width={52}
              label={{
                value: 'TrueHeight',
                angle: -90,
                position: 'insideLeft',
                offset: 16,
                fontSize: 11,
                fill: '#5a6480',
              }}
            />
            <ReferenceLine
              segment={[
                { x: xDomain[0], y: xDomain[0] },
                { x: xDomain[1], y: xDomain[1] },
              ]}
              stroke="#3a4162"
              strokeDasharray="5 4"
              strokeWidth={1.5}
              label={{
                value: 'plays as listed',
                position: 'insideTopLeft',
                fontSize: 10,
                fill: '#4d5578',
                fontStyle: 'italic',
              }}
            />
            {POSITIONS.map(pos => (
              <Scatter
                key={pos}
                name={pos}
                data={byPos[pos] ?? []}
                fill={POS_COLORS[pos]}
                shape={ScatterDot}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex justify-center gap-6">
          {POSITIONS.map(pos => (
            <div key={pos} className="flex items-center gap-1.5">
              <div
                className="rounded-full"
                style={{ width: 10, height: 10, backgroundColor: POS_COLORS[pos], opacity: 0.85 }}
              />
              <span className="text-xs text-gray-500">{pos}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
