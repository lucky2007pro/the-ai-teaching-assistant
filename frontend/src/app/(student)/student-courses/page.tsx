import { BookOpen, PlayCircle, CheckCircle2, Clock } from "lucide-react"

export default function StudentCoursesPage() {
  const courses = [
    { id: 1, title: "Matematika", teacher: "Aliyeva Nargiza", progress: 45, nextTopic: "Tenglamalar sistemasi" },
    { id: 2, title: "Fizika", teacher: "Toshmatov Dilshod", progress: 12, nextTopic: "Nyuton qonunlari" },
    { id: 3, title: "Ona tili", teacher: "Karimova Salima", progress: 88, nextTopic: "Qo'shma gaplar" },
  ]

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mening kurslarim</h1>
        <p className="text-slate-500">Siz a'zo bo'lgan barcha fanlar va kurslar ro'yxati.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-mentor-primary-light text-mentor-primary flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">{course.title}</h3>
              <p className="text-sm text-slate-500 mb-6">O'qituvchi: {course.teacher}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">O'zlashtirish</span>
                  <span className="font-bold text-mentor-primary">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-mentor-primary h-full rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            </div>
            
            <button className="w-full py-3 rounded-xl bg-slate-50 text-mentor-primary font-medium flex items-center justify-center gap-2 group-hover:bg-mentor-primary group-hover:text-white transition-colors">
              <PlayCircle className="w-5 h-5" /> Davom etish
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
