import * as React from "react"

import { cn } from "lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const OmniInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <div className="omni-bar">
        <input
          type={type}
          className={cn(
            "w-full bg-transparent border-none text-white text-lg font-medium placeholder:text-white/70 focus:outline-none",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
OmniInput.displayName = "OmniInput"

export { Input, OmniInput } 