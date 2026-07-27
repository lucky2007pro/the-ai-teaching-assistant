import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request Interceptor: add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor: handle 401s (token refresh would go here)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    // If the error is 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          // Assuming backend has a /auth/refresh endpoint
          const { data } = await axios.post(`${apiClient.defaults.baseURL}/auth/refresh`, { refresh_token: refreshToken })
          
          localStorage.setItem('access_token', data.access_token)
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh token invalid or expired
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)
