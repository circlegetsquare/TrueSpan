import { cn } from '@/lib/utils'
import { POS_COLORS } from '@/lib/constants'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function Badge({ children, className, style }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium',
        className
      )}
      style={style}
    >
      {children}
    </span>
  )
}

export function PosBadge({ pos }: { pos: string }) {
  const color = POS_COLORS[pos] ?? '#6b7280'
  return (
    <Badge style={{ color, backgroundColor: `${color}18` }}>
      {pos}
    </Badge>
  )
}
