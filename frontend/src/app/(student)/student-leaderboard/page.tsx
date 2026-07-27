import { Trophy, Medal, Star } from "lucide-react"

export default function StudentLeaderboardPage() {
  const students = [
    { rank: 1, name: "Aziza Valiyeva", points: 1250, badge: "Oltin" },
    { rank: 2, name: "Jasur Rustamov", points: 1120, badge: "Kumush" },
    { rank: 3, name: "Malika Tohirova", points: 1050, badge: "Bronza" },
    { rank: 4, name: "Sardor Olimov", points: 980, badge: "" },
    { rank: 5, name: "Dilnoza Karimova", points: 920, badge: "" },
  ]

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-mentor-primary text-white rounded-3xl p-8 shadow-lg shadow-mentor-primary/20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-10">
          <Trophy className="w-64 h-64" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Maktab reytingi</h1>
        <p className="text-white/80">O'zlashtirish va faollik bo'yicha eng ilg'or o'quvchilar</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <Star className="w-5 h-5 text-mentor-warning" />
          <h2 className="font-semibold text-slate-900">Joriy oy natijalari</h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {students.map((student) => (
            <div key={student.rank} className="p-4 sm:p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${
                student.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                student.rank === 2 ? 'bg-slate-200 text-slate-700' :
                student.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-slate-50 text-slate-500'
              }`}>
                {student.rank}
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">{student.name}</h3>
                {student.badge && <p className="text-xs font-medium text-slate-500 mt-0.5">{student.badge} medal sohibi</p>}
              </div>
              
              <div className="text-right">
                <p className="font-bold text-mentor-primary text-lg">{student.points}</p>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Ball</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
