'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { apiClient } from '@/lib/api';
import { Users, Search, Mail, Calendar } from 'lucide-react';
import useSWR from 'swr';

const fetcher = async () => {
  const response = await apiClient.getStudents();
  return response.data;
};

function StudentsContent() {
  const { data: students = [], isLoading } = useSWR('/students', fetcher);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((student: any) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Students</h1>
          <p className="text-slate-600">Manage and monitor all students</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Students Table/Cards */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading students...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <Users size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-600">
              {students.length === 0 ? 'No students yet' : 'No matching students'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student: any) => (
              <div key={student.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                {/* Student Avatar */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">
                      {student.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    Active
                  </span>
                </div>

                {/* Student Info */}
                <h3 className="text-lg font-bold text-slate-900 mb-1">{student.name}</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail size={16} />
                    <span>{student.email}</span>
                  </div>
                  {student.joined_date && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={16} />
                      <span>Joined {new Date(student.joined_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-900">{student.courses_count || 0}</p>
                    <p className="text-xs text-slate-600">Courses</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-900">{student.assignments_count || 0}</p>
                    <p className="text-xs text-slate-600">Assignments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-900">{student.grade || 'N/A'}</p>
                    <p className="text-xs text-slate-600">Grade</p>
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

export default function StudentsPage() {
  return (
    <ProtectedRoute allowedRoles={['teacher', 'admin']}>
      <StudentsContent />
    </ProtectedRoute>
  );
}
