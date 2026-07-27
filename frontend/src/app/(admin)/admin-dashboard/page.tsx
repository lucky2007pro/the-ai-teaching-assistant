import { StatCard } from "@/components/ui/StatCard"
import { Users, BookOpen, LayoutList, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Boshqaruv paneli</h1>
        <p className="text-slate-500">Tizimning umumiy holati va statistikasi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Jami o'quvchilar" 
          value="1,245" 
          trend="+12% o'tgan oydan"
          icon={<Users className="w-5 h-5 text-mentor-primary" />}
        />
        <StatCard 
          title="Faol o'qituvchilar" 
          value="48" 
          trend="Hamma o'qituvchi faol"
          icon={<BookOpen className="w-5 h-5 text-mentor-success" />}
        />
        <StatCard 
          title="Sinflar soni" 
          value="64" 
          trend="+2 ta yangi sinf"
          icon={<LayoutList className="w-5 h-5 text-mentor-warning" />}
        />
        <StatCard 
          title="Platformaga kirishlar" 
          value="8.4k" 
          trend="Bugungi statistika"
          icon={<TrendingUp className="w-5 h-5 text-mentor-danger" />}
        />
      </div>

      {/* Placeholder for charts or recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-64 flex items-center justify-center text-slate-400">
          Bu yerda faollik grafigi bo'ladi
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-64 flex items-center justify-center text-slate-400">
          Oxirgi tizim amaliyotlari (Logs)
        </div>
      </div>
    </div>
  )
}
