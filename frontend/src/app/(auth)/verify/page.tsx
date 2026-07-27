"use client"
import Link from 'next/link'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { apiClient } from '@/lib/api-client'
import { toast } from 'sonner'

const verifySchema = z.object({
  code: z.string().length(6, "Kod 6 xonali bo'lishi kerak"),
})

type VerifyForm = z.infer<typeof verifySchema>

function VerifyFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema)
  })

  const onSubmit = async (data: VerifyForm) => {
    if (!email) {
      setError("Email manzili topilmadi. Iltimos qaytadan ro'yxatdan o'ting.")
      return
    }

    setIsLoading(true)
    setError('')
    try {
      await apiClient.post('/api/v1/auth/verify-email', {
        email: email,
        code: data.code
      })
      
      toast.success("Hisobingiz muvaffaqiyatli tasdiqlandi!")
      router.push('/login?verified=true')
    } catch (err: any) {
      setError(err.response?.data?.detail || "Tasdiqlash kodi noto'g'ri yoki muddati o'tgan")
      setIsLoading(false)
    }
  }

  if (!email) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Xatolik!</h2>
        <p className="text-slate-500 mb-6">Email manzili ko'rsatilmagan.</p>
        <Link href="/register" className="text-mentor-primary hover:underline font-medium">
          Ro'yxatdan o'tish sahifasiga qaytish
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-mentor-primary">Tasdiqlash</h2>
        <p className="text-sm text-slate-500 mt-2">
          <b>{email}</b> manziliga yuborilgan 6 xonali kodni kiriting.
        </p>
        <p className="text-xs text-amber-600 mt-1 bg-amber-50 inline-block px-2 py-1 rounded">
          (Dasturlash rejimida kod backend terminalida chiqadi)
        </p>
      </div>

      {error && (
        <div className="bg-mentor-danger-light text-mentor-danger p-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tasdiqlash kodi</label>
          <input 
            {...register('code')}
            type="text" 
            maxLength={6}
            className="w-full px-4 py-2 text-center tracking-[0.5em] text-lg font-bold rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mentor-primary focus:border-transparent transition-all"
            placeholder="123456"
          />
          {errors.code && <p className="text-red-500 text-xs mt-1 text-center">{errors.code.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-mentor-primary hover:bg-mentor-primary/90 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-70 mt-4"
        >
          {isLoading ? "Tekshirilmoqda..." : "Tasdiqlash"}
        </button>
      </form>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-center py-8 text-slate-500">Kutilmoqda...</div>}>
      <VerifyFormContent />
    </Suspense>
  )
}
