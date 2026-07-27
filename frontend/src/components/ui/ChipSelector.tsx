import * as React from "react"
import { cn } from "@/lib/utils"

export interface ChipSelectorProps {
  options: { id: string | number; label: string }[];
  selectedId: string | number | null;
  onSelect: (id: string | number) => void;
  className?: string;
}

export function ChipSelector({ options, selectedId, onSelect, className }: ChipSelectorProps) {
  return (
    <div className={cn("flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide", className)}>
      {options.map((opt) => {
        const isSelected = selectedId === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border",
              isSelected 
                ? "bg-mentor-primary text-white border-mentor-primary shadow-sm"
                : "bg-mentor-primary-light text-slate-700 border-transparent hover:bg-slate-200"
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
