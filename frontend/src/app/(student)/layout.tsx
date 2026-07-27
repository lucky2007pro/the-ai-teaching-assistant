import { StudentSidebar } from "@/components/ui/StudentSidebar"
import { StudentBottomNav } from "@/components/ui/StudentBottomNav"

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <StudentBottomNav />
    </div>
  )
}
