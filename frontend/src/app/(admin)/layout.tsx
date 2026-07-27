import { AdminSidebar } from "@/components/ui/AdminSidebar"
import { AdminBottomNav } from "@/components/ui/AdminBottomNav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <AdminBottomNav />
    </div>
  )
}
