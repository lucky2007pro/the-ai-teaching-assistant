"use client"
import * as React from "react"
import { Home, Users, BookOpen, FileText, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()

  const navItemsLeft = [
    { icon: <Home className="w-6 h-6" />, label: "Asosiy", href: "/dashboard" },
    { icon: <Users className="w-6 h-6" />, label: "Guruhlar", href: "/groups" },
  ];
  
  const navItemsRight = [
    { icon: <BookOpen className="w-6 h-6" />, label: "Kurslar", href: "/courses" },
    { icon: <FileText className="w-6 h-6" />, label: "Vazifalar", href: "/assignments" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe z-50">
      <div className="flex items-center justify-around h-16 px-2 relative">
        {navItemsLeft.map((item, idx) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link key={idx} href={item.href} className={cn("flex flex-col items-center justify-center w-12 transition-colors", active ? "text-mentor-primary" : "text-slate-400 hover:text-slate-600")}>
              {item.icon}
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          )
        })}
        
        {/* Center Action Button */}
        <div className="relative -top-5 flex justify-center w-14">
          <button className="w-14 h-14 bg-mentor-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-mentor-primary/30 active:scale-95 transition-transform">
            <Plus className="w-7 h-7" />
          </button>
        </div>

        {navItemsRight.map((item, idx) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link key={idx} href={item.href} className={cn("flex flex-col items-center justify-center w-12 transition-colors", active ? "text-mentor-primary" : "text-slate-400 hover:text-slate-600")}>
              {item.icon}
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
