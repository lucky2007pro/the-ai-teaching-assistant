"use client"
import * as React from "react"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { Search, Filter, MessageSquare, Check, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function HomeworksPage() {
  const [submissions, setSubmissions] = React.useState([
    { id: 1, student: "Aliyev V.", group: "9-A", assignment: "Matematikadan oraliq nazorat", status: "pending", score: null, date: "Bugun 14:30" },
    { id: 2, student: "Karimova S.", group: "11-B", assignment: "Fizika laboratoriya ishi", status: "graded", score: 5, date: "Bugun 10:15" },
    { id: 3, student: "Toshmatov D.", group: "9-A", assignment: "Matematikadan oraliq nazorat", status: "returned", score: null, date: "Kecha 18:20" },
    { id: 4, student: "Qodirova M.", group: "11-C", assignment: "Informatika amaliyot", status: "pending", score: null, date: "Bugun 16:45" },
  ])
  
  const [activeSubmission, setActiveSubmission] = React.useState<any>(null)
  const [open, setOpen] = React.useState(false)

  const handleGrade = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const score = parseInt(formData.get("score") as string)
    
    setSubmissions(submissions.map(sub => 
      sub.id === activeSubmission.id 
        ? { ...sub, status: "graded", score: score } 
        : sub
    ))
    
    toast.success(`${activeSubmission.student} ning vazifasi baholandi: ${score} ball!`)
    setOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <StatusBadge variant="warning">Tekshirilmagan</StatusBadge>
      case 'graded': return <StatusBadge variant="success">Baholangan</StatusBadge>
      case 'returned': return <StatusBadge variant="danger">Qaytarilgan</StatusBadge>
      default: return null
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Uy vazifalarini tekshirish</h1>
        <p className="text-slate-500">O'quvchilar tomonidan yuborilgan yechimlar va ularning holati.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="O'quvchi ismi yoki vazifa nomi..." 
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-mentor-primary/20 text-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" /> Filterlar
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-4 font-semibold text-slate-500">O'quvchi</th>
              <th className="p-4 font-semibold text-slate-500">Sinf</th>
              <th className="p-4 font-semibold text-slate-500">Vazifa</th>
              <th className="p-4 font-semibold text-slate-500">Topshirilgan vaqt</th>
              <th className="p-4 font-semibold text-slate-500">Holat</th>
              <th className="p-4 font-semibold text-slate-500">Baho</th>
              <th className="p-4 font-semibold text-slate-500 text-right">Amal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {submissions.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-900">{sub.student}</td>
                <td className="p-4 text-slate-600">{sub.group}</td>
                <td className="p-4 text-slate-900">{sub.assignment}</td>
                <td className="p-4 text-slate-500">{sub.date}</td>
                <td className="p-4">{getStatusBadge(sub.status)}</td>
                <td className="p-4 font-bold text-slate-900">{sub.score ? sub.score : '-'}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => {
                      setActiveSubmission(sub)
                      setOpen(true)
                    }}
                    className="text-mentor-primary font-medium hover:underline px-3 py-1 bg-mentor-primary-light rounded-lg transition-colors"
                  >
                    Tekshirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grading Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px] p-6 rounded-3xl bg-white border-none shadow-2xl">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-bold">Vazifani tekshirish</DialogTitle>
          </DialogHeader>
          
          {activeSubmission && (
            <div className="grid md:grid-cols-2 gap-6 h-[400px]">
              {/* Submission view */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
                <div className="p-3 border-b border-slate-200 bg-white">
                  <p className="font-semibold text-slate-900 text-sm">{activeSubmission.assignment}</p>
                  <p className="text-xs text-slate-500">{activeSubmission.student} ({activeSubmission.group})</p>
                </div>
                <div className="flex-1 p-4 flex items-center justify-center bg-slate-100 relative">
                  {/* Simulated Image */}
                  <div className="absolute inset-4 bg-white shadow-sm border border-slate-200 rounded-xl flex items-center justify-center">
                    <p className="text-slate-400 rotate-12 font-medium">O'quvchi yuborgan fayl (rasm/pdf)</p>
                  </div>
                </div>
              </div>

              {/* Grading Form */}
              <div className="flex flex-col">
                <form onSubmit={handleGrade} className="flex flex-col h-full space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700">Qo'yiladigan baho (1-5)</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(score => (
                        <label key={score} className="flex-1 cursor-pointer">
                          <input type="radio" name="score" value={score} required className="peer sr-only" defaultChecked={activeSubmission.score === score} />
                          <div className="h-12 rounded-xl border border-slate-200 flex items-center justify-center font-bold text-slate-600 peer-checked:bg-mentor-primary peer-checked:text-white peer-checked:border-mentor-primary transition-all hover:bg-slate-50">
                            {score}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <Label htmlFor="comment" className="text-slate-700">O'qituvchi izohi</Label>
                    <textarea 
                      id="comment" 
                      className="w-full h-full min-h-[100px] rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mentor-primary/20 resize-none"
                      placeholder="Xatolar yoki tavsiyalar haqida yozing..."
                    ></textarea>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button type="button" onClick={() => setOpen(false)} className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors">
                      Bekor qilish
                    </button>
                    <button type="submit" className="flex-1 py-3 rounded-xl bg-mentor-primary text-white font-medium hover:bg-mentor-primary/90 transition-colors shadow-sm">
                      Saqlash
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
