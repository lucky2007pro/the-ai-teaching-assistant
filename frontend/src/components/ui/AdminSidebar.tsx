"use client"
import * as React from "react"
import { Home, Users, LayoutList, BookOpen, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SettingsModal } from "./SettingsModal"
import Cookies from "js-cookie"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Asosiy", href: "/admin-dashboard" },
    { icon: <Users className="w-5 h-5" />, label: "Foydalanuvchilar", href: "/admin-users" },
    { icon: <LayoutList className="w-5 h-5" />, label: "Sinflar", href: "/admin-classes" },
    { icon: <BookOpen className="w-5 h-5" />, label: "Fanlar", href: "/admin-subjects" },
  ];

  const handleLogout = () => {
    Cookies.remove('access_token')
    localStorage.removeItem('refresh_token')
    router.push('/')
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 h-screen sticky top-0 left-0 text-white">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight">Mentor LMS <span className="text-xs text-white/50 font-normal ml-1">Admin</span></h1>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <p className="px-2 text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Boshqaruv</p>
        {menuItems.map((item, idx) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={idx}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                active 
                  ? "bg-mentor-primary text-white shadow-lg shadow-mentor-primary/30" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <SettingsModal 
          triggerComponent={
            <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
              Tizim sozlamalari
            </button>
          } 
        />
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 mt-1 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Chiqish
        </button>
      </div>
    </aside>
  )
}
