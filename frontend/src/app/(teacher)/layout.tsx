import { Sidebar } from "@/components/ui/Sidebar"
import { BottomNav } from "@/components/ui/BottomNav"

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
