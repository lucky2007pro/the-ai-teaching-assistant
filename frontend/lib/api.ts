import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '@/store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000');

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use((config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(email: string, password: string, name: string, role: string) {
    return this.client.post('/auth/register', { email, password, name, role });
  }

  async login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password });
  }

  // Dashboard endpoints
  async getDashboardStats() {
    return this.client.get('/dashboard/stats');
  }

  // Courses endpoints
  async getCourses() {
    return this.client.get('/courses');
  }

  async getCourseById(id: string) {
    return this.client.get(`/courses/${id}`);
  }

  async createCourse(data: any) {
    return this.client.post('/courses', data);
  }

  async updateCourse(id: string, data: any) {
    return this.client.put(`/courses/${id}`, data);
  }

  async deleteCourse(id: string) {
    return this.client.delete(`/courses/${id}`);
  }

  // Lessons endpoints
  async getLessons(courseId: string) {
    return this.client.get(`/courses/${courseId}/lessons`);
  }

  async createLesson(courseId: string, data: any) {
    return this.client.post(`/courses/${courseId}/lessons`, data);
  }

  async updateLesson(courseId: string, lessonId: string, data: any) {
    return this.client.put(`/courses/${courseId}/lessons/${lessonId}`, data);
  }

  // Students endpoints
  async getStudents() {
    return this.client.get('/students');
  }

  async getStudentById(id: string) {
    return this.client.get(`/students/${id}`);
  }

  // Assignments endpoints
  async getAssignments(courseId?: string) {
    const url = courseId ? `/assignments?course=${courseId}` : '/assignments';
    return this.client.get(url);
  }

  async submitAssignment(assignmentId: string, data: any) {
    return this.client.post(`/assignments/${assignmentId}/submit`, data);
  }

  // AI endpoints
  async getAIFeedback(content: string) {
    return this.client.post('/ai/feedback', { content });
  }

  async generateLessonPlan(topic: string) {
    return this.client.post('/ai/generate-lesson', { topic });
  }
}

export const apiClient = new ApiClient();
