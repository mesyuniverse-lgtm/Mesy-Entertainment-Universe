"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

// Add a custom radial progress component for the payments card
declare module "@radix-ui/react-progress" {
    interface ProgressProps {
        type?: 'linear' | 'radial';
    }
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, type = 'linear', ...props }, ref) => {
  if (type === 'radial') {
    const r = 40;
    const circ = 2 * Math.PI * r;
    const strokePct = ((value || 0) * circ) / 100;
    return (
      <div ref={ref} className={cn("relative", className)}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
                className="stroke-current text-secondary"
                strokeWidth="10"
                cx="50" cy="50" r={r} fill="transparent"
            ></circle>
            <circle
                className="stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50" cy="50" r={r} fill="transparent"
                strokeDasharray={circ}
                strokeDashoffset={circ - strokePct}
            ></circle>
        </svg>
      </div>
    );
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
