'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/types'
import { axiosInstance } from '@/config/axios'
// import { axiosInstance } from '@/configs/axios'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: User) => Promise<void>
  logout: () => void
  isAuthenticated: () => boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Initialisation - vérification du token au mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')

      if (storedToken && storedUser) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const register = async (userData: User) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.post('/auth/register', userData)
      
      if (data.user && data.token) {
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('refreshToken', data.refreshToken)
        
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
        setToken(data.accessToken)
        setUser(data.user)
        router.push('/')
      }
    } catch (error) {
      console.error('Registration failed:', error)
      // throw error
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.post('/auth/login', { email, password })
      
      if (data.user && data.token) {
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('refreshToken', data.refreshToken)
        
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
        setToken(data.accessToken)
        setUser(data.user)
        router.push('/')
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('refreshToken')
    delete axiosInstance.defaults.headers.common['Authorization']
    setToken(null)
    setUser(null)
    router.push('/login')
  }

  const isAuthenticated = () => {
    return !!token
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}