'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Menu, LogOut, User } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="font-bold text-slate-900 hidden sm:inline">Teaching Assistant</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 font-medium">
              Dashboard
            </Link>
            {(user.role === 'teacher' || user.role === 'admin') && (
              <>
                <Link href="/courses" className="text-slate-600 hover:text-slate-900 font-medium">
                  Courses
                </Link>
                <Link href="/students" className="text-slate-600 hover:text-slate-900 font-medium">
                  Students
                </Link>
              </>
            )}
            {user.role === 'student' && (
              <Link href="/my-courses" className="text-slate-600 hover:text-slate-900 font-medium">
                My Courses
              </Link>
            )}
            <Link href="/assignments" className="text-slate-600 hover:text-slate-900 font-medium">
              Assignments
            </Link>
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg">
              <User size={16} className="text-slate-600" />
              <span className="text-sm text-slate-700">{user.name}</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize font-medium">
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-2">
            <Link href="/dashboard" className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              Dashboard
            </Link>
            {(user.role === 'teacher' || user.role === 'admin') && (
              <>
                <Link href="/courses" className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                  Courses
                </Link>
                <Link href="/students" className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                  Students
                </Link>
              </>
            )}
            {user.role === 'student' && (
              <Link href="/my-courses" className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                My Courses
              </Link>
            )}
            <Link href="/assignments" className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              Assignments
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
