import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 transition-all shadow-lg"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

const ExecutiveProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    label?: string
  }
>(({ className, value, label, ...props }, ref) => (
  <div className="space-y-2">
    {label && (
      <div className="text-sm font-medium text-white/80">{label}</div>
    )}
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-white/10 shadow-inner",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 transition-all duration-500 shadow-lg rounded-full"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  </div>
))
ExecutiveProgress.displayName = "ExecutiveProgress"

export { Progress, ExecutiveProgress } 