"use client"
import * as React from "react"
import { Users, BookOpen, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function GroupsPage() {
  const [open, setOpen] = React.useState(false)
  const [groups, setGroups] = React.useState([
    { id: 1, name: "9-A", students: 28, average: 4.2 },
    { id: 2, name: "11-B", students: 24, average: 3.8 },
    { id: 3, name: "11-C", students: 25, average: 4.5 },
  ])

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get("name") as string
    
    setGroups([...groups, {
      id: Date.now(),
      name: name,
      students: 0,
      average: 0
    }])
    
    toast.success("Yangi guruh muvaffaqiyatli qo'shildi!")
    setOpen(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mening guruhlarim</h1>
          <p className="text-slate-500">Siz dars beradigan sinflar ro'yxati va ularning umumiy o'zlashtirishi.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center justify-center gap-2 bg-mentor-primary text-white px-4 py-2 rounded-xl hover:bg-mentor-primary/90 transition-all font-medium text-sm shadow-sm whitespace-nowrap">
              <Plus className="w-4 h-4" /> Yangi guruh qo'shish
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-6 rounded-3xl bg-white border-none shadow-2xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold">Yangi guruh</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Guruh nomi</Label>
                <Input id="name" name="name" required placeholder="Masalan: 8-D" className="rounded-xl border-slate-200" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map(group => (
          <div key={group.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-mentor-primary">{group.name}</h2>
                <span className="bg-mentor-primary-light text-mentor-primary text-xs font-bold px-2 py-1 rounded-md">Faol</span>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-slate-600 gap-2">
                  <Users className="w-4 h-4 text-slate-400" /> {group.students} nafar o'quvchi
                </div>
                <div className="flex items-center text-sm text-slate-600 gap-2">
                  <BookOpen className="w-4 h-4 text-slate-400" /> O'rtacha ball: {group.average}
                </div>
              </div>
            </div>
            <button className="w-full bg-mentor-primary-light text-mentor-primary hover:bg-mentor-primary hover:text-white transition-colors py-2 rounded-lg font-medium text-sm">
              Guruhga kirish
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
