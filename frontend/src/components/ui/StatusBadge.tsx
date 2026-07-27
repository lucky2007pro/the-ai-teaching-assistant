import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        success: "bg-mentor-success-light text-mentor-success border-transparent",
        warning: "bg-mentor-warning-light text-mentor-warning border-transparent",
        danger: "bg-mentor-danger-light text-mentor-danger border-transparent",
        neutral: "bg-slate-100 text-slate-600 border-transparent",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function StatusBadge({ className, variant, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { StatusBadge, badgeVariants }
