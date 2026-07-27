import * as React from "react"
import { cn } from "@/lib/utils"

export interface AttentionCardProps {
  title: string;
  variant?: "danger" | "warning";
  items: { id: string | number; title: string; description: string; avatar?: string }[];
  className?: string;
}

export function AttentionCard({ title, variant = "danger", items, className }: AttentionCardProps) {
  const bgClass = variant === "danger" ? "bg-mentor-danger-light" : "bg-mentor-warning-light";
  const textClass = variant === "danger" ? "text-mentor-danger" : "text-mentor-warning";

  return (
    <div className={cn("rounded-2xl p-5", bgClass, className)}>
      <h3 className={cn("font-semibold mb-4", textClass)}>{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map(item => (
          <div key={item.id} className="bg-white/80 rounded-xl p-3 flex items-center gap-3 shadow-sm border border-white/50">
            {item.avatar ? (
              <img src={item.avatar} alt={item.title} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold", bgClass, textClass)}>
                {item.title.charAt(0)}
              </div>
            )}
            <div>
              <div className="text-sm font-medium text-slate-900 truncate max-w-[120px]">{item.title}</div>
              <div className="text-xs text-slate-500 truncate max-w-[120px]">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
