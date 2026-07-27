"use client"
import * as React from "react"
import { Home, Users, LayoutList } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AdminBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: "Asosiy", href: "/admin-dashboard" },
    { icon: <Users className="w-6 h-6" />, label: "Odamlar", href: "/admin-users" },
    { icon: <LayoutList className="w-6 h-6" />, label: "Sinflar", href: "/admin-classes" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-white shadow-[0_-4px_20px_rgba(0,0,0,0.2)] pb-safe z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item, idx) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link key={idx} href={item.href} className={cn("flex flex-col items-center justify-center w-16 transition-colors", active ? "text-mentor-primary" : "text-white/50 hover:text-white/80")}>
              {item.icon}
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
