import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export const Tabs = TabsPrimitive.Root

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <TabsPrimitive.List className={cn('inline-flex rounded-md border border-gray-200 bg-gray-50 p-0.5 gap-0.5', className)}>
      {children}
    </TabsPrimitive.List>
  )
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className="rounded px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm hover:text-gray-900 cursor-pointer"
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}

export const TabsContent = TabsPrimitive.Content
