"use client"
import * as React from "react"
import { LayoutList, Plus, Users, BookOpen } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function AdminClassesPage() {
  const [open, setOpen] = React.useState(false)
  const [classes, setClasses] = React.useState([
    { id: 1, name: "11-A sinf", studentsCount: 24, teacher: "Aliyeva Nargiza" },
    { id: 2, name: "10-B sinf", studentsCount: 28, teacher: "Rustamov Jasur" },
    { id: 3, name: "9-A sinf", studentsCount: 30, teacher: "Karimova Salima" },
  ])

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get("name") as string
    const teacher = formData.get("teacher") as string
    
    setClasses([...classes, {
      id: Date.now(),
      name,
      teacher,
      studentsCount: 0
    }])
    
    toast.success("Yangi sinf muvaffaqiyatli qo'shildi!")
    setOpen(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sinflar</h1>
          <p className="text-slate-500">Maktabdagi barcha sinflar va guruhlarni boshqarish.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 bg-mentor-primary text-white px-4 py-2 rounded-xl hover:bg-mentor-primary/90 transition-all font-medium text-sm shadow-sm whitespace-nowrap">
              <Plus className="w-4 h-4" /> Yangi sinf qo'shish
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-6 rounded-3xl bg-white border-none shadow-2xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold">Yangi sinf</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Sinf nomi</Label>
                <Input id="name" name="name" required placeholder="Masalan: 5-V sinf" className="rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher">Sinf rahbari</Label>
                <select id="teacher" name="teacher" required className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-mentor-primary/20">
                  <option value="">O'qituvchini tanlang</option>
                  <option value="Aliyeva Nargiza">Aliyeva Nargiza</option>
                  <option value="Rustamov Jasur">Rustamov Jasur</option>
                  <option value="Karimova Salima">Karimova Salima</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  Bekor qilish
                </button>
                <button type="submit" className="bg-mentor-primary text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-mentor-primary/90 transition-colors shadow-sm">
                  Saqlash
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(cls => (
          <div key={cls.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-mentor-primary-light text-mentor-primary flex items-center justify-center">
                <LayoutList className="w-6 h-6" />
              </div>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">
                Faol
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{cls.name}</h3>
            <p className="text-slate-500 text-sm mb-6">Sinf rahbari: {cls.teacher}</p>
            
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 text-slate-600">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">{cls.studentsCount} o'quvchi</span>
              </div>
              <button className="text-mentor-primary font-medium text-sm hover:underline">Ko'rish</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
