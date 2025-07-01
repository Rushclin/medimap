import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
})

// Intercepteur pour rafraîchir le token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const refreshToken = localStorage.getItem('refreshToken')

    if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true

      try {
        const { data } = await axios.post('/api/auth/refresh', {
          refreshToken,
        })

        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`

        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)