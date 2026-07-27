"use client"
import { useState, useEffect } from "react"
import { StatCard } from "@/components/ui/StatCard"
import { ChipSelector } from "@/components/ui/ChipSelector"
import { AttentionCard } from "@/components/ui/AttentionCard"
import { ActivityListItem } from "@/components/ui/ActivityListItem"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { FileText, CheckCircle, Clock, Sparkles, Loader2, BarChart2 } from "lucide-react"
import { apiClient } from "@/lib/api-client"

export default function TeacherDashboard() {
  const [selectedClass, setSelectedClass] = useState<string | number>(1)
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [aiReport, setAiReport] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const classes = [
    { id: 1, label: "9-A" },
    { id: 2, label: "11-B" },
    { id: 3, label: "11-C" },
  ]

  const atRiskStudents = [
    { id: 1, title: "Aliyev V.", description: "3 ta vazifa topshirmadi", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, title: "Karimova S.", description: "O'rtacha ball 2.3", avatar: "https://i.pravatar.cc/150?u=2" },
  ]

  const hardTopics = [
    { id: 1, title: "Trigonometriya", description: "O'zlashtirish 45%" },
    { id: 2, title: "Kvadrat tenglamalar", description: "O'zlashtirish 52%" },
  ]

  const generateAiReport = async () => {
    setIsLoadingAI(true)
    setError(null)
    try {
      const res = await apiClient.post('/api/v1/ai/analyze-class', { class_id: selectedClass })
      setAiReport(res.data.analysis)
      setIsLoadingAI(false)
    } catch (error: any) {
      console.error(error)
      setError("Hisobot yaratishda xatolik yuz berdi")
      setIsLoadingAI(false)
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img src="https://i.pravatar.cc/150?u=teacher" alt="Teacher" className="w-16 h-16 rounded-full shadow-sm" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Xush kelibsiz, Rustam o'qituvchi! 👋</h1>
          <p className="text-slate-500">Bugungi darslaringiz va statistikangiz bilan tanishing.</p>
        </div>
      </div>

      {/* Class Selector */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Sinflar</h2>
        <ChipSelector 
          options={classes} 
          selectedId={selectedClass} 
          onSelect={setSelectedClass} 
        />
      </div>

      {/* AI Analytics Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-1 shadow-sm border border-indigo-100/50">
        <div className="bg-white/60 backdrop-blur-sm rounded-[1.4rem] p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  AI Sinf Tahlili
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md">BETA</span>
                </h2>
                <p className="text-sm text-slate-500">Sun'iy intellekt yordamida o'quvchilarning o'zlashtirishini chuqur tahlil qiling.</p>
              </div>
            </div>
            
            <button 
              onClick={generateAiReport}
              disabled={isLoadingAI}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoadingAI ? <><Loader2 className="w-4 h-4 animate-spin" /> Tahlil qilinmoqda...</> : <><BarChart2 className="w-4 h-4" /> Hisobot yaratish</>}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 rounded-2xl p-4 mt-4 border border-red-100 shadow-sm text-sm">
              {error}
            </div>
          )}

          {aiReport && !error && (
            <div className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm animate-in fade-in zoom-in-95 duration-300 mt-4">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" /> AI Xulosasi va Tavsiyalar
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {aiReport}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard 
          title="Tekshirish kutilayotganlar" 
          value="12 ta" 
          trend="Keçagiga nisbatan 3 ta kam"
          icon={<Clock className="w-5 h-5" />}
        />
        <StatCard 
          title="Sinfning o'rtacha balli" 
          value="4.2" 
          trend="+0.3 o'sish bor"
          icon={<CheckCircle className="w-5 h-5 text-mentor-success" />}
        />
      </div>

      {/* Attention Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AttentionCard 
          title="⚠️ Xavf ostidagi o'quvchilar" 
          variant="danger" 
          items={atRiskStudents} 
        />
        <AttentionCard 
          title="🎯 Eng qiyin mavzular" 
          variant="warning" 
          items={hardTopics} 
        />
      </div>

      {/* Recent Assignments */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">So'nggi vazifalar</h3>
        <div className="space-y-1">
          <ActivityListItem 
            icon={<FileText />}
            title="Matematikadan test - 9-A"
            subtitle="Bugun 14:00 da yakunlandi"
            rightElement={<StatusBadge variant="warning">8 ta tekshirilmagan</StatusBadge>}
          />
          <ActivityListItem 
            icon={<FileText />}
            title="Fizika amaliy mashg'ulot - 11-B"
            subtitle="Kecha 18:00 da yakunlandi"
            rightElement={<StatusBadge variant="success">Barchasi tekshirildi</StatusBadge>}
          />
        </div>
      </div>
      
    </div>
  )
}
