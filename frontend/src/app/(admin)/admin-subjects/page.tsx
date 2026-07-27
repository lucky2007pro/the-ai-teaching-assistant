"use client"
import * as React from "react"
import { BookOpen, Plus, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function AdminSubjectsPage() {
  const [open, setOpen] = React.useState(false)
  const [subjects, setSubjects] = React.useState([
    { id: 1, name: "Matematika", code: "MAT101", coursesCount: 12 },
    { id: 2, name: "Fizika", code: "PHY101", coursesCount: 8 },
    { id: 3, name: "Ona tili", code: "LAN101", coursesCount: 15 },
    { id: 4, name: "Tarix", code: "HIS101", coursesCount: 6 },
  ])

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get("name") as string
    const code = formData.get("code") as string
    
    setSubjects([...subjects, {
      id: Date.now(),
      name,
      code,
      coursesCount: 0
    }])
    
    toast.success("Yangi fan muvaffaqiyatli qo'shildi!")
    setOpen(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fanlar</h1>
          <p className="text-slate-500">Maktabda o'tiladigan barcha fanlar ro'yxati.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 bg-mentor-primary text-white px-4 py-2 rounded-xl hover:bg-mentor-primary/90 transition-all font-medium text-sm shadow-sm whitespace-nowrap">
              <Plus className="w-4 h-4" /> Yangi fan qo'shish
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-6 rounded-3xl bg-white border-none shadow-2xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold">Yangi fan</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Fan nomi</Label>
                <Input id="name" name="name" required placeholder="Masalan: Biologiya" className="rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Fan kodi (ixtiyoriy)</Label>
                <Input id="code" name="code" placeholder="BIO101" className="rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Qisqacha tavsif</Label>
                <textarea id="desc" className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mentor-primary/20 resize-none h-20" placeholder="Fan nimalarni o'z ichiga oladi..."></textarea>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  Bekor qilish
                </button>
                <button type="submit" className="bg-mentor-primary text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-mentor-primary/90 transition-colors shadow-sm">
                  Qo'shish
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(subject => (
          <div key={subject.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-mentor-success/10 text-mentor-success flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{subject.name}</h3>
                <p className="text-sm text-slate-400 font-mono mt-0.5">{subject.code}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
              <div className="flex items-center gap-2 text-slate-600">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">{subject.coursesCount} ta kurs materiallari</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
