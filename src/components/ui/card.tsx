import { cn } from '@/lib/utils'

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('rounded-lg border border-gray-200 bg-white p-4 shadow-sm', className)}>
      {children}
    </div>
  )
}

export function CardLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{children}</p>
}

export function CardValue({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn('mt-1 text-2xl font-semibold text-gray-900 tabular-nums', className)}
      style={{ animation: 'fade-in 300ms ease-out' }}
    >
      {children}
    </p>
  )
}
