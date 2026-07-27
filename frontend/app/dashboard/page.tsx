'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/lib/api';
import { BookOpen, Users, FileText, Brain } from 'lucide-react';
import useSWR from 'swr';

const fetcher = async (url: string) => {
  try {
    const response = await apiClient.getDashboardStats();
    return response.data;
  } catch (error) {
    throw error;
  }
};

function DashboardContent() {
  const user = useAuthStore((state) => state.user);
  const { data, error, isLoading } = useSWR('/dashboard/stats', fetcher);

  const stats = [
    {
      title: 'Total Courses',
      value: data?.courses || 0,
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Students',
      value: data?.students || 0,
      icon: Users,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Assignments',
      value: data?.assignments || 0,
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'AI Feedback',
      value: data?.feedback || 0,
      icon: Brain,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-slate-600">
            {user?.role === 'admin'
              ? 'Manage your institution and monitor progress'
              : user?.role === 'teacher'
              ? 'Create courses and manage your students'
              : 'View your courses and assignments'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-sm font-medium text-slate-600">{stat.title}</h3>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon size={20} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-slate-900">
                  {isLoading ? '-' : stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
            {isLoading ? (
              <p className="text-slate-600">Loading...</p>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-600 text-sm">No recent activity yet</p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {(user?.role === 'teacher' || user?.role === 'admin') && (
                <>
                  <a
                    href="/courses/create"
                    className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                  >
                    Create Course
                  </a>
                  <a
                    href="/students"
                    className="block px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors text-center font-medium"
                  >
                    View Students
                  </a>
                </>
              )}
              {user?.role === 'student' && (
                <>
                  <a
                    href="/my-courses"
                    className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                  >
                    Browse Courses
                  </a>
                  <a
                    href="/assignments"
                    className="block px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors text-center font-medium"
                  >
                    My Assignments
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
