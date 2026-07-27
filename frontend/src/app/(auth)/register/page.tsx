"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { apiClient } from '@/lib/api-client'

const registerSchema = z.object({
  email: z.string().email("Noto'g'ri email formati"),
  password: z.string().min(6, "Parol kamida 6 ta belgi bo'lishi kerak"),
  confirm_password: z.string().min(6, "Parolni tasdiqlash majburiy"),
  full_name: z.string().min(3, "Ism kamida 3 ta belgi bo'lishi kerak"),
}).refine((data) => data.password === data.confirm_password, {
  message: "Parollar mos kelmadi",
  path: ["confirm_password"],
})

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true)
    setError('')
    try {
      await apiClient.post('/api/v1/auth/register', {
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        role: "student" // default mock role
      })
      
      router.push(`/verify?email=${encodeURIComponent(data.email)}`)
    } catch (err: any) {
      setError(err.response?.data?.detail || "Xatolik yuz berdi")
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-mentor-primary">Ro'yxatdan o'tish</h2>
        <p className="text-sm text-slate-500 mt-2">Yangi akkaunt yaratish uchun ma'lumotlarni kiriting</p>
      </div>

      {error && (
        <div className="bg-mentor-danger-light text-mentor-danger p-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">To'liq ism (F.I.O)</label>
          <input 
            {...register('full_name')}
            type="text" 
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mentor-primary focus:border-transparent transition-all"
            placeholder="Eshmatov Toshmat"
          />
          {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input 
            {...register('email')}
            type="email" 
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mentor-primary focus:border-transparent transition-all"
            placeholder="admin@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Parol</label>
          <input 
            {...register('password')}
            type="password" 
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mentor-primary focus:border-transparent transition-all"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Parolni tasdiqlang</label>
          <input 
            {...register('confirm_password')}
            type="password" 
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mentor-primary focus:border-transparent transition-all"
            placeholder="••••••••"
          />
          {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-mentor-primary hover:bg-mentor-primary/90 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-70 mt-4"
        >
          {isLoading ? "Kutilmoqda..." : "Ro'yxatdan o'tish"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-500">
        Akkauntingiz bormi?{" "}
        <Link href="/login" className="text-mentor-primary font-medium hover:underline">
          Kirish
        </Link>
      </div>
    </div>
  )
}
