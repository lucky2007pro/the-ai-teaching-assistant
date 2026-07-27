"use client"
import * as React from "react"
import { Search, Filter, Plus, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function AdminUsersPage() {
  const [open, setOpen] = React.useState(false)
  const [users, setUsers] = React.useState([
    { id: 1, name: "Aliyeva Nargiza", role: "O'qituvchi", email: "nargiza@maktab.uz", status: "faol" },
    { id: 2, name: "Toshmatov Dilshod", role: "O'quvchi", email: "dilshod@maktab.uz", status: "faol" },
    { id: 3, name: "Karimova Salima", role: "O'quvchi", email: "salima@maktab.uz", status: "bloklangan" },
    { id: 4, name: "Rustamov Jasur", role: "O'qituvchi", email: "jasur@maktab.uz", status: "faol" },
  ])

    const fetchUsers = async () => {
      try {
        const res = await apiClient.get('/api/v1/users/')
        setUsers(res.data.items)
      } catch (err) {
        console.error("Foydalanuvchilarni yuklashda xatolik", err)
      }
    }

    React.useEffect(() => {
      fetchUsers()
    }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get("name") as string
    const role = formData.get("role") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
    // Convert role to english matching backend expectation
    const roleMap: Record<string, string> = {
      "O'quvchi": "student",
      "O'qituvchi": "teacher",
      "Admin": "admin"
    }

    try {
      await apiClient.post('/api/v1/auth/register', {
        email: email,
        password: password,
        full_name: name,
        role: roleMap[role] || "student",
        school_id: null,
      })
      toast.success("Yangi foydalanuvchi muvaffaqiyatli qo'shildi!")
      setOpen(false)
      fetchUsers()
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Xatolik yuz berdi")
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Foydalanuvchilar</h1>
          <p className="text-slate-500">Tizimdagi barcha o'qituvchi va o'quvchilarni boshqarish.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 bg-mentor-primary text-white px-4 py-2 rounded-xl hover:bg-mentor-primary/90 transition-all font-medium text-sm shadow-sm whitespace-nowrap">
              <Plus className="w-4 h-4" /> Yangi qo'shish
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-6 rounded-3xl bg-white border-none shadow-2xl">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold">Yangi foydalanuvchi</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">To'liq ism (F.I.Sh)</Label>
                <Input id="name" name="name" required placeholder="Masalan: Aliyev Vali" className="rounded-xl border-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Rolni tanlang</Label>
                  <select id="role" name="role" required className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-mentor-primary/20">
                    <option value="O'quvchi">O'quvchi</option>
                    <option value="O'qituvchi">O'qituvchi</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="vali@maktab.uz" className="rounded-xl border-slate-200" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Vaqtinchalik parol</Label>
                <Input id="password" name="password" required placeholder="********" className="rounded-xl border-slate-200" />
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

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Ism yoki email bo'yicha qidiruv..." 
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-mentor-primary/20 text-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" /> Barcha rollar
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-4 font-semibold text-slate-500">F.I.Sh</th>
              <th className="p-4 font-semibold text-slate-500">Rol</th>
              <th className="p-4 font-semibold text-slate-500">Email</th>
              <th className="p-4 font-semibold text-slate-500">Holat</th>
              <th className="p-4 font-semibold text-slate-500 text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user: any) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-900">{user.full_name}</td>
                <td className="p-4 text-slate-600">
                  <span className={cn(
                    "px-2 py-1 rounded-md text-xs font-medium",
                    user.role === "teacher" ? "bg-blue-50 text-blue-700" : 
                    user.role === "admin" ? "bg-slate-100 text-slate-700" :
                    "bg-purple-50 text-purple-700"
                  )}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-slate-600">{user.email}</td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    user.is_active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  )}>
                    {user.is_active ? "Faol" : "Bloklangan"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
