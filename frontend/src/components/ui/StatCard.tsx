import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  trend?: string;
  icon?: React.ReactNode;
}

export function StatCard({ title, value, trend, icon, className, ...props }: StatCardProps) {
  return (
    <div className={cn("bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between", className)} {...props}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        {trend && (
          <p className="text-sm mt-1 text-slate-500">
            {trend}
          </p>
        )}
      </div>
    </div>
  )
}
