"use client"
import * as React from "react"
import { StatusBadge } from "@/components/ui/StatusBadge"
import { UploadCloud, Clock, CheckCircle2, File, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function AssignmentDetails({ params }: { params: { id: string } }) {
  const [file, setFile] = React.useState<File | null>(null)
  const [status, setStatus] = React.useState<'pending' | 'submitting' | 'submitted'>('pending')
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      toast.info(`Fayl tanlandi: ${e.target.files[0].name}`)
    }
  }

  const handleSubmit = () => {
    if (!file) {
      toast.error("Iltimos, avval fayl tanlang!")
      return
    }
    
    setStatus('submitting')
    
    // Simulating network request
    setTimeout(() => {
      setStatus('submitted')
      toast.success("Vazifa muvaffaqiyatli topshirildi!")
    }, 1500)
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-mentor-primary bg-mentor-primary-light px-3 py-1 rounded-full">Matematika</span>
              {status === 'submitted' ? (
                <StatusBadge variant="success">Topshirildi</StatusBadge>
              ) : (
                <StatusBadge variant="warning">Jarayonda</StatusBadge>
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Tenglamalar sistemasi (№{params.id})</h1>
          </div>
          <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-4 py-2 rounded-xl text-sm font-medium">
            <Clock className="w-4 h-4" />
            Muddat: Bugun 23:59
          </div>
        </div>
        
        <div className="prose prose-slate max-w-none text-slate-600">
          <p>Ushbu vazifada siz ikki noma'lumli chiziqli tenglamalar sistemasini yechish usullarini ko'rib chiqasiz. Qo'shish va o'rniga qo'yish usullaridan foydalanib yeching.</p>
          <p>Yechimlaringizni qog'ozga yozib, rasmga tushiring va ushbu joyga yuklang.</p>
        </div>
      </div>

      {/* Upload area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 text-center">
        <h3 className="font-semibold text-slate-900 mb-6">
          {status === 'submitted' ? 'Yuborilgan javob' : 'Javobni yuklash'}
        </h3>
        
        {status === 'submitted' ? (
          <div className="border border-green-200 bg-green-50 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <p className="font-medium text-green-800">Vazifa muvaffaqiyatli topshirildi!</p>
              <p className="text-sm text-green-600 mt-1">O'qituvchi tekshirishini kuting.</p>
            </div>
          </div>
        ) : (
          <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-mentor-primary/50 hover:bg-slate-50 transition-colors cursor-pointer mb-6 group overflow-hidden">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              onChange={handleFileChange}
            />
            {file ? (
              <>
                <div className="w-16 h-16 bg-mentor-primary-light text-mentor-primary rounded-full flex items-center justify-center">
                  <File className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{file.name}</p>
                  <p className="text-sm text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-mentor-primary-light text-mentor-primary rounded-full flex items-center justify-center">
                  <UploadCloud className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 group-hover:text-mentor-primary transition-colors">Faylni tanlang yoki shu yerga tashlang</p>
                  <p className="text-sm text-slate-500 mt-1">PDF, JPG, PNG formatlari ruxsat etiladi (Max: 10MB)</p>
                </div>
              </>
            )}
          </div>
        )}

        {status !== 'submitted' && (
          <button 
            onClick={handleSubmit}
            disabled={!file || status === 'submitting'}
            className="w-full bg-mentor-primary text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-mentor-primary/90 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Yuklanmoqda...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" /> Vazifani topshirish
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
