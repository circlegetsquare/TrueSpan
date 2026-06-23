import type { Pos } from '@/App'

interface ControlsBarProps {
  selectedPos: Pos[]
  onPosToggle: (p: Pos) => void
  selectedYears: number[]
  years: number[]
  onYearToggle: (y: number) => void
}

const POSITIONS: Pos[] = ['PG', 'SG', 'SF', 'PF', 'C']

function ToggleButton({ active, onClick, children }: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded px-3 py-1 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent ${
        active
          ? 'bg-accent text-[#ffffff]'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  )
}

export function ControlsBar({ selectedPos, onPosToggle, selectedYears, years, onYearToggle }: ControlsBarProps) {
  return (
    <div className="border-b border-gray-200 bg-white px-6 py-3 space-y-3">
      {/* Row 1: position filter */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Position</span>
        <div className="flex items-center gap-2">
          {POSITIONS.map(p => (
            <ToggleButton
              key={p}
              active={selectedPos.includes(p)}
              onClick={() => onPosToggle(p)}
            >
              {p}
            </ToggleButton>
          ))}
        </div>
      </div>

      {/* Row 2: year toggle buttons */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Draft Class</span>
        <div className="flex flex-wrap gap-1">
          {years.map(y => (
            <ToggleButton
              key={y}
              active={selectedYears.includes(y)}
              onClick={() => onYearToggle(y)}
            >
              {y}
            </ToggleButton>
          ))}
        </div>
      </div>
    </div>
  )
}
