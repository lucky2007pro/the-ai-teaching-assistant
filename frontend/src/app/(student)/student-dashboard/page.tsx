import { StatCard } from "@/components/ui/StatCard"
import { ActivityListItem } from "@/components/ui/ActivityListItem"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { FileText, Trophy, Target, Star } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const assignments = [
    { id: 1, title: "Tenglamalar sistemasi", subject: "Matematika", deadline: "Bugun 23:59", status: "pending", score: null },
    { id: 2, title: "Fizika laboratoriya ishi", subject: "Fizika", deadline: "Ertaga 23:59", status: "pending", score: null },
    { id: 3, title: "Matematikadan oraliq nazorat", subject: "Matematika", deadline: "Kecha yakunlangan", status: "graded", score: 5 },
  ]

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 bg-mentor-primary rounded-3xl p-6 md:p-8 text-white shadow-lg shadow-mentor-primary/20">
        <img src="https://i.pravatar.cc/150?u=student1" alt="Student" className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/20" />
        <div>
          <h1 className="text-xl md:text-3xl font-bold">Salom, Aziza! 🎓</h1>
          <p className="text-white/80 mt-1 text-sm md:text-base">Bugun 2 ta yangi vazifangiz bor, davom etamiz!</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="O'rtacha ball" 
          value="4.8" 
          trend="Zo'r natija"
          icon={<Star className="w-5 h-5 text-mentor-warning" />}
        />
        <StatCard 
          title="Bajarilgan vazifalar" 
          value="45 ta" 
          trend="Sinfda 3-o'rin"
          icon={<Target className="w-5 h-5 text-mentor-success" />}
        />
        <StatCard 
          title="Umumiy reyting" 
          value="Top 5%" 
          trend="Maktab bo'yicha"
          icon={<Trophy className="w-5 h-5 text-mentor-primary" />}
        />
      </div>

      {/* Assignments list */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Mening vazifalarim</h3>
        <div className="space-y-2">
          {assignments.map(assignment => (
            <Link key={assignment.id} href={`/student-assignments/${assignment.id}`} className="block">
              <div className="hover:bg-slate-50 transition-colors rounded-xl p-2 -mx-2">
                <ActivityListItem 
                  icon={<FileText className={assignment.status === 'pending' ? 'text-mentor-primary' : 'text-slate-400'} />}
                  title={assignment.title}
                  subtitle={`${assignment.subject} • Muddat: ${assignment.deadline}`}
                  rightElement={
                    assignment.status === 'pending' 
                      ? <StatusBadge variant="warning">Bajarish kerak</StatusBadge>
                      : <StatusBadge variant="success">Baho: {assignment.score}</StatusBadge>
                  }
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
