import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

interface SliderProps {
  value: number
  onValueChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function Slider({ value, onValueChange, min = 0, max = 2, step = 0.05, className }: SliderProps) {
  return (
    <SliderPrimitive.Root
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      value={[value]}
      onValueChange={([v]) => onValueChange(v)}
      min={min}
      max={max}
      step={step}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full bg-blue-600" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-blue-600 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-grab active:cursor-grabbing" />
    </SliderPrimitive.Root>
  )
}
