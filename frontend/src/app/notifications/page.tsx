"use client"
import { ArrowLeft, Bell, CheckCircle2, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function NotificationsPage() {
  const router = useRouter()
  
  const notifications = [
    { id: 1, type: "system", title: "Tizim yangilanishi", desc: "Mentor LMS yangi 2.0 versiyasiga o'tdi.", time: "1 soat oldin", read: false },
    { id: 2, type: "grade", title: "Yangi baho", desc: "Matematikadan uy vazifangiz tekshirildi. Baho: 5.", time: "3 soat oldin", read: false },
    { id: 3, type: "message", title: "O'qituvchidan xabar", desc: "Ertangi dars vaqti 14:00 ga ko'chirildi.", time: "Kecha", read: true },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Bildirishnomalar</h1>
          </div>
          <button className="text-sm font-medium text-mentor-primary hover:text-mentor-primary/80 transition-colors">
            Hammasini o'qildi deb belgilash
          </button>
        </div>
        
        <div className="divide-y divide-slate-100">
          {notifications.map(notif => (
            <div key={notif.id} className={cn("p-6 flex gap-4 transition-colors hover:bg-slate-50 cursor-pointer", !notif.read && "bg-mentor-primary-light/30")}>
              <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                {notif.type === 'system' && <Bell className="w-5 h-5 text-slate-600" />}
                {notif.type === 'grade' && <CheckCircle2 className="w-5 h-5 text-mentor-success" />}
                {notif.type === 'message' && <MessageSquare className="w-5 h-5 text-mentor-primary" />}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 flex items-center justify-between">
                  {notif.title}
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-mentor-primary"></span>}
                </h4>
                <p className="text-slate-600 text-sm mt-1">{notif.desc}</p>
                <p className="text-xs text-slate-400 mt-2">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
