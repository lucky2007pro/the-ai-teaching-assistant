"use client"
import * as React from "react"
import { Home, BookOpen, Trophy, Settings, LogOut, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SettingsModal } from "./SettingsModal"
import Cookies from "js-cookie"

export function StudentSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Bosh sahifa", href: "/student-dashboard" },
    { icon: <BookOpen className="w-5 h-5" />, label: "Mening kurslarim", href: "/student-courses" },
    { icon: <Trophy className="w-5 h-5" />, label: "Reyting", href: "/student-leaderboard" },
  ];

  const handleLogout = () => {
    Cookies.remove('access_token')
    localStorage.removeItem('refresh_token')
    router.push('/')
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 h-screen sticky top-0 left-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-50">
        <h1 className="text-xl font-bold text-mentor-primary tracking-tight">Mentor LMS <span className="text-xs text-slate-400 font-normal ml-1">O'quvchi</span></h1>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Menyu</p>
        {menuItems.map((item, idx) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={idx}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                active 
                  ? "bg-mentor-primary text-white shadow-sm shadow-mentor-primary/20" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-slate-100">
        <SettingsModal 
          triggerComponent={
            <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <Settings className="w-5 h-5" />
              Sozlamalar
            </button>
          } 
        />
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 mt-1 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Tizimdan chiqish
        </button>
      </div>
    </aside>
  )
}
