import Image from 'next/image'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-mentor-neutral">
      {/* Left Side - Image (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-mentor-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mentor-primary to-blue-900/80 mix-blend-multiply z-10" />
        <Image 
          src="/auth-bg.jpg" 
          alt="Mentor LMS" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-12 text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Mentor LMS ga xush kelibsiz</h1>
          <p className="text-lg text-mentor-primary-light max-w-md text-balance">
            Ta'lim jarayonlarini avtomatlashtirish, o'quvchilarni tahlil qilish va eng zo'r natijalarga erishish platformasi.
          </p>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          {children}
        </div>
      </div>
    </div>
  )
}
