"use client"
import * as React from "react"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { ActivityListItem } from "@/components/ui/ActivityListItem"
import { FileText, Plus, UploadCloud } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function AssignmentsPage() {
  const [open, setOpen] = React.useState(false)
  const [assignments, setAssignments] = React.useState([
    { id: 1, title: "Matematikadan oraliq nazorat", group: "9-A", deadline: "Bugun 23:59", status: "active", submitted: 18, total: 28 },
    { id: 2, title: "Fizika laboratoriya ishi", group: "11-B", deadline: "Ertaga 23:59", status: "active", submitted: 5, total: 24 },
    { id: 3, title: "Tenglamalar sistemasi (Uy vazifasi)", group: "9-A", deadline: "2 kun oldin", status: "completed", submitted: 28, total: 28 },
  ])

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const title = formData.get("title") as string
    
    // Simulating creation
    setAssignments([{
      id: Date.now(),
      title: title,
      group: "9-A",
      deadline: "Keyingi hafta",
      status: "active",
      submitted: 0,
      total: 30
    }, ...assignments])
    
    toast.success("Yangi vazifa muvaffaqiyatli yaratildi!")
    setOpen(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vazifalar</h1>
          <p className="text-slate-500">Barcha berilgan uy vazifalari va nazorat ishlari.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 bg-mentor-primary text-white px-4 py-2 rounded-xl hover:bg-mentor-primary/90 transition-all font-medium text-sm shadow-sm">
              <Plus className="w-4 h-4" /> Yangi vazifa yaratish
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-6 rounded-3xl bg-white border-none shadow-2xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold">Yangi vazifa</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Vazifa nomi</Label>
                <Input id="title" name="title" required placeholder="Masalan: 3-chorak nazorat ishi" className="rounded-xl border-slate-200" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="group">Sinf/Guruh</Label>
                  <select id="group" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-mentor-primary/20">
                    <option>9-A sinf</option>
                    <option>10-B sinf</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Tugash muddati</Label>
                  <Input id="deadline" type="date" required className="rounded-xl border-slate-200" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Qo'shimcha fayl yuklash</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-mentor-primary/50 transition-colors cursor-pointer relative overflow-hidden group">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => {
                    if (e.target.files?.length) {
                      toast.info(`Fayl tanlandi: ${e.target.files[0].name}`)
                    }
                  }} />
                  <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-mentor-primary transition-colors" />
                  <p className="text-sm font-medium text-slate-700 group-hover:text-mentor-primary transition-colors">Fayl tanlang yoki tashlang</p>
                  <p className="text-xs text-slate-400">PDF, DOCX, JPG (Max 10MB)</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  Bekor qilish
                </button>
                <button type="submit" className="bg-mentor-primary text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-mentor-primary/90 transition-colors shadow-sm">
                  Vazifani yaratish
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 text-sm font-semibold text-slate-500">
          Faol vazifalar
        </div>
        <div className="p-2 space-y-1">
          {assignments.filter(a => a.status === 'active').map(assignment => (
            <ActivityListItem 
              key={assignment.id}
              icon={<FileText className="text-mentor-primary" />}
              title={assignment.title}
              subtitle={`${assignment.group} • Muddat: ${assignment.deadline}`}
              rightElement={
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900">{assignment.submitted} / {assignment.total}</div>
                  <div className="text-xs text-slate-500">topshirganlar</div>
                </div>
              }
            />
          ))}
        </div>
        <div className="p-4 border-b border-t border-slate-100 bg-slate-50/50 text-sm font-semibold text-slate-500 mt-4">
          Yakunlangan vazifalar
        </div>
        <div className="p-2 space-y-1">
          {assignments.filter(a => a.status === 'completed').map(assignment => (
            <ActivityListItem 
              key={assignment.id}
              icon={<FileText className="text-slate-400" />}
              title={assignment.title}
              subtitle={`${assignment.group} • Muddat: ${assignment.deadline}`}
              rightElement={<StatusBadge variant="success">Yakunlangan</StatusBadge>}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
