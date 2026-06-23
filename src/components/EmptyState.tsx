interface EmptyStateProps {
  selectedPos: string[]
  onClearPos: () => void
}

export function EmptyState({ selectedPos, onClearPos }: EmptyStateProps) {
  const posLabel = selectedPos.length === 1
    ? `${selectedPos[0]}s`
    : selectedPos.map(p => `${p}s`).join(' or ')

  return (
    <div className="mx-6 mb-6 flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16 text-center">
      <p className="text-sm font-medium text-gray-900">
        No {posLabel} in this draft class
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Try a different year, or clear the position filter to see all players.
      </p>
      <button
        onClick={onClearPos}
        className="mt-4 rounded px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/8 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
      >
        Clear position filter
      </button>
    </div>
  )
}
