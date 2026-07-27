"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { apiClient } from '@/lib/api-client'
import Cookies from 'js-cookie'

const loginSchema = z.object({
  email: z.string().email("Noto'g'ri email formati"),
  password: z.string().min(6, "Parol kamida 6 ta belgi bo'lishi kerak"),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    setError('')
    try {
      const res = await apiClient.post('/api/v1/auth/login', {
        login: data.email,
        password: data.password
      })
      
      Cookies.set('access_token', res.data.access_token)
      if (res.data.refresh_token) {
        localStorage.setItem('refresh_token', res.data.refresh_token)
      }
      
      // Fetch user profile to determine role
      const meRes = await apiClient.get('/api/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`
        }
      })
      const userRole = meRes.data.role
      
      if (userRole === 'admin') {
        router.push('/admin-dashboard')
      } else if (userRole === 'teacher') {
        router.push('/dashboard')
      } else {
        router.push('/student-dashboard')
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Kiritilgan ma'lumotlar noto'g'ri")
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-mentor-primary">Tizimga kirish</h2>
        <p className="text-sm text-slate-500 mt-2">Ma'lumotlaringizni kiritib profilingizga kiring</p>
      </div>

      {error && (
        <div className="bg-mentor-danger-light text-mentor-danger p-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-slate-700">Parol</label>
            <Link href="#" className="text-xs text-mentor-primary hover:underline">Parolni unutdingizmi?</Link>
          </div>
          <input 
            {...register('password')}
            type="password" 
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mentor-primary focus:border-transparent transition-all"
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-mentor-primary hover:bg-mentor-primary/90 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-70 mt-4"
        >
          {isLoading ? "Kutilmoqda..." : "Kirish"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-500">
        Akkauntingiz yo'qmi?{" "}
        <Link href="/register" className="text-mentor-primary font-medium hover:underline">
          Ro'yxatdan o'tish
        </Link>
      </div>
    </div>
  )
}
