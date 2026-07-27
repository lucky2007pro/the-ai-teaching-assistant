"use client"
import * as React from "react"
import { BookOpen, Video, FileText, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function CoursesPage() {
  const [open, setOpen] = React.useState(false)
  const [courses, setCourses] = React.useState([
    { id: 1, title: "Matematika 9-sinf", modules: 12, lessons: 48, students: 120, image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400&h=200" },
    { id: 2, title: "Matematika 11-sinf", modules: 15, lessons: 60, students: 85, image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=400&h=200" },
  ])

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const title = formData.get("title") as string
    
    setCourses([...courses, {
      id: Date.now(),
      title: title,
      modules: 0,
      lessons: 0,
      students: 0,
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400&h=200"
    }])
    
    toast.success("Yangi kurs muvaffaqiyatli qo'shildi!")
    setOpen(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mening kurslarim</h1>
          <p className="text-slate-500">Siz olib boradigan o'quv dasturlari va materiallar.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center justify-center gap-2 bg-mentor-primary text-white px-4 py-2 rounded-xl hover:bg-mentor-primary/90 transition-all font-medium text-sm shadow-sm whitespace-nowrap">
              <Plus className="w-4 h-4" /> Yangi kurs yaratish
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-6 rounded-3xl bg-white border-none shadow-2xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold">Yangi kurs</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Kurs nomi</Label>
                <Input id="title" name="title" required placeholder="Masalan: Ingliz tili A2" className="rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Kurs haqida qisqacha</Label>
                <textarea id="description" className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mentor-primary/20 resize-none h-24" placeholder="Ushbu kurs kimlar uchun..."></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  Bekor qilish
                </button>
                <button type="submit" className="bg-mentor-primary text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-mentor-primary/90 transition-colors shadow-sm">
                  Yaratish
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
            <div className="h-40 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {course.modules} modul</span>
                <span className="flex items-center gap-1.5"><Video className="w-4 h-4" /> {course.lessons} dars</span>
                <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> {course.students} o'quvchi</span>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-mentor-primary font-medium text-sm">Materiallarni tahrirlash</span>
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Ochish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
