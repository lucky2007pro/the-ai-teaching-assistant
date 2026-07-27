import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle, BrainCircuit, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-mentor-primary/20">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-mentor-primary tracking-tight">Mentor LMS</div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-mentor-primary transition-colors">Imkoniyatlar</a>
            <a href="#how-it-works" className="hover:text-mentor-primary transition-colors">Qanday ishlaydi?</a>
            <a href="#pricing" className="hover:text-mentor-primary transition-colors">Narxlar</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-mentor-primary transition-colors hidden md:block">
              Kirish
            </Link>
            <Link href="/register" className="bg-mentor-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-mentor-primary/90 transition-all shadow-lg shadow-mentor-primary/30 flex items-center gap-2">
              Ro'yxatdan o'tish <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-mentor-primary-light/50 via-slate-50 to-white -z-10" />
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mentor-primary/5 text-mentor-primary font-medium text-sm border border-mentor-primary/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mentor-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mentor-primary"></span>
            </span>
            Sun'iy intellekt yordamida ta'lim
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
            O'quv markazingizni <span className="text-transparent bg-clip-text bg-gradient-to-r from-mentor-primary to-blue-500">yangi bosqichga</span> olib chiqing
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            Uy vazifalarini avtomatik tekshirish, o'quvchilar reytingi va qulay boshqaruv paneli. Hammasi bitta platformada.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href="/register" className="w-full sm:w-auto bg-mentor-primary text-white px-8 py-4 rounded-2xl text-lg font-medium hover:bg-mentor-primary/90 transition-all shadow-xl shadow-mentor-primary/30 flex items-center justify-center gap-2">
              Bepul boshlash
            </Link>
            <Link href="/login" className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-slate-50 transition-all flex items-center justify-center">
              Demo versiyani ko'rish
            </Link>
          </div>
        </div>
      </header>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nima uchun Mentor LMS?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Bizning platforma o'qituvchilar va o'quvchilar uchun eng zamonaviy texnologiyalarni taqdim etadi.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BrainCircuit className="w-8 h-8 text-mentor-primary" />,
                title: "AI Yordamida tekshirish",
                desc: "Uy vazifalarini qo'lda tekshirishga ketadigan vaqtni 80% ga qisqartiring. AI yordamida avtomatik baholash tizimi."
              },
              {
                icon: <Users className="w-8 h-8 text-mentor-success" />,
                title: "O'quvchilar reytingi",
                desc: "Raqobatbardosh muhit yaratish uchun avtomatik hisoblanuvchi ballar va liderbord tizimi."
              },
              {
                icon: <BookOpen className="w-8 h-8 text-mentor-warning" />,
                title: "Oson boshqaruv",
                desc: "Sinflar, kurslar va to'lovlarni bitta qulay paneldan boshqaring. Murakkab jarayonlar endi juda oddiy."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Mentor LMS. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
