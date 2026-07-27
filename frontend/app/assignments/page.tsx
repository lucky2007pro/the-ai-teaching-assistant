'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/lib/api';
import { Plus, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import useSWR from 'swr';

const fetcher = async () => {
  const response = await apiClient.getAssignments();
  return response.data;
};

function AssignmentsContent() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { data: assignments = [], isLoading } = useSWR('/assignments', fetcher);
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  const isTeacherOrAdmin = user?.role === 'teacher' || user?.role === 'admin';

  const filteredAssignments = assignments.filter((assignment: any) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return assignment.status === 'pending';
    if (filter === 'submitted') return assignment.status === 'submitted';
    if (filter === 'graded') return assignment.status === 'graded';
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'graded':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'submitted':
        return <Clock size={20} className="text-blue-600" />;
      default:
        return <AlertCircle size={20} className="text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'graded':
        return 'bg-green-100 text-green-700';
      case 'submitted':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Assignments</h1>
            <p className="text-slate-600">
              {isTeacherOrAdmin ? 'Create and grade assignments' : 'View and submit assignments'}
            </p>
          </div>
          {isTeacherOrAdmin && (
            <button
              onClick={() => router.push('/assignments/create')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus size={20} />
              Create Assignment
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {(['all', 'pending', 'submitted', 'graded'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filter === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Assignments List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading assignments...</p>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <FileText size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600">No assignments found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAssignments.map((assignment: any) => (
              <div
                key={assignment.id}
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <FileText size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900">{assignment.title}</h3>
                        <p className="text-slate-600 text-sm mt-1">{assignment.description}</p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <div>
                        <span className="text-slate-600">Course: </span>
                        <span className="font-medium text-slate-900">{assignment.course_name}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Due: </span>
                        <span className="font-medium text-slate-900">
                          {new Date(assignment.due_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col items-end gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(assignment.status)}`}>
                      {getStatusIcon(assignment.status)}
                      {assignment.status}
                    </span>
                    <button
                      onClick={() => router.push(`/assignments/${assignment.id}`)}
                      className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                    >
                      {isTeacherOrAdmin ? 'Review' : 'View'}
                    </button>
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

export default function AssignmentsPage() {
  return (
    <ProtectedRoute allowedRoles={['teacher', 'admin', 'student']}>
      <AssignmentsContent />
    </ProtectedRoute>
  );
}
