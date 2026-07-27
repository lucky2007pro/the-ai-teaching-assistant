import * as React from "react"
import { cn } from "@/lib/utils"

export interface ActivityListItemProps {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  rightElement?: React.ReactNode;
  className?: string;
}

export function ActivityListItem({ icon, title, subtitle, rightElement, className }: ActivityListItemProps) {
  return (
    <div className={cn("flex items-center justify-between py-3 border-b border-slate-100 last:border-0", className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
            {icon}
          </div>
        )}
        <div>
          <h4 className="text-sm font-medium text-slate-900">{title}</h4>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      {rightElement && (
        <div className="flex-shrink-0">
          {rightElement}
        </div>
      )}
    </div>
  )
}
