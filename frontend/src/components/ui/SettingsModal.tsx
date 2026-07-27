"use client"
import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, User, Lock, Bell, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

export function SettingsModal({ triggerComponent }: { triggerComponent: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState("profile")

  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerComponent}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-white rounded-3xl gap-0 border-none shadow-2xl">
        <div className="flex h-[500px]">
          {/* Sidebar */}
          <div className="w-[240px] bg-slate-50 border-r border-slate-100 p-4 space-y-1">
            <DialogHeader className="mb-4 text-left px-2">
              <DialogTitle className="text-xl font-bold text-slate-900">Sozlamalar</DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Profil va tizim sozlamalari
              </DialogDescription>
            </DialogHeader>

            <button 
              onClick={() => setActiveTab("profile")}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all", activeTab === "profile" ? "bg-white text-mentor-primary shadow-sm" : "text-slate-600 hover:bg-white/50")}
            >
              <User className="w-4 h-4" /> Profil
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all", activeTab === "security" ? "bg-white text-mentor-primary shadow-sm" : "text-slate-600 hover:bg-white/50")}
            >
              <Lock className="w-4 h-4" /> Xavfsizlik
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all", activeTab === "notifications" ? "bg-white text-mentor-primary shadow-sm" : "text-slate-600 hover:bg-white/50")}
            >
              <Bell className="w-4 h-4" /> Bildirishnomalar
            </button>
            <button 
              onClick={() => setActiveTab("appearance")}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all", activeTab === "appearance" ? "bg-white text-mentor-primary shadow-sm" : "text-slate-600 hover:bg-white/50")}
            >
              <Palette className="w-4 h-4" /> Tashqi ko'rinish
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-8 bg-white overflow-y-auto">
            {activeTab === "profile" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Shaxsiy ma'lumotlar</h3>
                  <p className="text-sm text-slate-500">Ism va familiyangizni o'zgartirishingiz mumkin.</p>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm ring-2 ring-slate-100">
                    <img src="https://i.pravatar.cc/150?u=user1" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <button className="text-sm font-medium text-mentor-primary hover:underline hover:text-mentor-primary/80 transition-colors">
                    Yangi rasm yuklash
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700">To'liq ism</Label>
                    <Input id="name" defaultValue="Aliyeva Nargiza" className="rounded-xl border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">Email manzili</Label>
                    <Input id="email" type="email" defaultValue="nargiza@maktab.uz" className="rounded-xl border-slate-200" />
                  </div>
                  <div className="pt-2">
                    <button className="bg-mentor-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-mentor-primary/90 transition-colors shadow-sm">
                      O'zgarishlarni saqlash
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "security" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Parolni almashtirish</h3>
                  <p className="text-sm text-slate-500">Hisobingiz xavfsizligini ta'minlash uchun parolni yangilang.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current" className="text-slate-700">Joriy parol</Label>
                    <Input id="current" type="password" placeholder="••••••••" className="rounded-xl border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new" className="text-slate-700">Yangi parol</Label>
                    <Input id="new" type="password" placeholder="Yangi parol" className="rounded-xl border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm" className="text-slate-700">Parolni tasdiqlang</Label>
                    <Input id="confirm" type="password" placeholder="Yangi parolni takrorlang" className="rounded-xl border-slate-200" />
                  </div>
                  <div className="pt-2">
                    <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
                      Parolni yangilash
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
               <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Mavzu va ranglar</h3>
                   <p className="text-sm text-slate-500">Tizimning tashqi ko'rinishini o'zingizga moslashtiring.</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4 pt-2">
                   <div className="border-2 border-mentor-primary rounded-xl p-4 cursor-pointer hover:shadow-md transition-all">
                     <div className="bg-slate-100 w-full h-24 rounded-lg mb-3 flex flex-col gap-2 p-3 shadow-inner">
                        <div className="bg-white w-full h-4 rounded-sm shadow-sm"></div>
                        <div className="bg-white w-2/3 h-4 rounded-sm shadow-sm"></div>
                     </div>
                     <p className="text-sm font-medium text-center text-slate-900">Yorqin (Light)</p>
                   </div>
                   <div className="border-2 border-slate-100 hover:border-slate-300 rounded-xl p-4 cursor-pointer transition-all">
                     <div className="bg-slate-900 w-full h-24 rounded-lg mb-3 flex flex-col gap-2 p-3 shadow-inner">
                        <div className="bg-slate-800 w-full h-4 rounded-sm"></div>
                        <div className="bg-slate-800 w-2/3 h-4 rounded-sm"></div>
                     </div>
                     <p className="text-sm font-medium text-center text-slate-600">Tungi (Dark)</p>
                   </div>
                 </div>
               </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Bildirishnomalar</h3>
                  <p className="text-sm text-slate-500">Qaysi holatlarda xabar olishni tanlang.</p>
                </div>
                <div className="space-y-5 pt-2">
                  <label className="flex items-center justify-between cursor-pointer p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <div>
                      <span className="block font-semibold text-slate-900">Yangi vazifalar va bildirishnomalar</span>
                      <span className="block text-sm text-slate-500">Platforma ichida xabardor qilinish</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-mentor-primary rounded border-slate-300 focus:ring-mentor-primary" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <div>
                      <span className="block font-semibold text-slate-900">Email xabarnomalar</span>
                      <span className="block text-sm text-slate-500">Tizim yangiliklari va o'zgarishlar haqida</span>
                    </div>
                    <input type="checkbox" className="w-5 h-5 text-mentor-primary rounded border-slate-300 focus:ring-mentor-primary" />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
