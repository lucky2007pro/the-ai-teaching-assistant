'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/lib/api';
import { Plus, BookOpen, Users, Trash2 } from 'lucide-react';
import useSWR from 'swr';

const fetcher = async () => {
  const response = await apiClient.getCourses();
  return response.data;
};

function CoursesContent() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { data: courses = [], isLoading, mutate } = useSWR('/courses', fetcher);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    setDeleting(id);
    try {
      await apiClient.deleteCourse(id);
      mutate();
    } catch (error) {
      console.error('Failed to delete course:', error);
    } finally {
      setDeleting(null);
    }
  };

  const isTeacherOrAdmin = user?.role === 'teacher' || user?.role === 'admin';

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Courses</h1>
            <p className="text-slate-600">
              {isTeacherOrAdmin ? 'Manage your courses' : 'Browse available courses'}
            </p>
          </div>
          {isTeacherOrAdmin && (
            <button
              onClick={() => router.push('/courses/create')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus size={20} />
              Create Course
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600">
              {isTeacherOrAdmin ? 'No courses yet. Create one to get started!' : 'No courses available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Course Header */}
                <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600"></div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{course.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                  {/* Course Meta */}
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{course.students_count || 0} students</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/courses/${course.id}`)}
                      className="flex-1 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                    >
                      View
                    </button>
                    {isTeacherOrAdmin && (
                      <>
                        <button
                          onClick={() => router.push(`/courses/${course.id}/edit`)}
                          className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          disabled={deleting === course.id}
                          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <ProtectedRoute allowedRoles={['teacher', 'admin', 'student']}>
      <CoursesContent />
    </ProtectedRoute>
  );
}
