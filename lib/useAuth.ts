'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { migrateUserData } from './userStats'

interface User {
  id?: number
  name: string
  email: string
  isLoggedIn: boolean
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Vérifier si un token existe et valider l'utilisateur
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (token) {
          // Vérifier le token avec l'API
          const response = await axios.get('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          if (response.data.success) {
            const userData = { ...response.data.user, isLoggedIn: true }
            setUser(userData)

            // Migrer les anciennes données vers le nouveau format avec ID utilisateur
            if (userData.id) {
              migrateUserData(userData.id)
            }
          } else {
            // Token invalide, nettoyer le localStorage
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du token:', error)
        // Token invalide ou erreur réseau, nettoyer le localStorage
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      }

      setIsLoading(false)
    }

    checkAuthStatus()
  }, [mounted])

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await axios.post('/api/auth/login', credentials)

      if (response.data.success) {
        const { user: userData, token } = response.data
        const userWithLoginStatus = { ...userData, isLoggedIn: true }

        // Stocker le token et les données utilisateur
        localStorage.setItem('authToken', token)
        localStorage.setItem('user', JSON.stringify(userWithLoginStatus))

        setUser(userWithLoginStatus)

        // Migrer les anciennes données vers le nouveau format avec ID utilisateur
        if (userData.id) {
          migrateUserData(userData.id)
        }

        return { success: true }
      } else {
        return { success: false, error: response.data.error || 'Erreur de connexion' }
      }
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error)
      const errorMessage = error.response?.data?.error || 'Erreur de connexion'
      return { success: false, error: errorMessage }
    }
  }

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await axios.post('/api/auth/register', userData)

      if (response.data.success) {
        const { user: newUser, token } = response.data
        const userWithLoginStatus = { ...newUser, isLoggedIn: true }

        // Stocker le token et les données utilisateur
        localStorage.setItem('authToken', token)
        localStorage.setItem('user', JSON.stringify(userWithLoginStatus))

        setUser(userWithLoginStatus)

        // Migrer les anciennes données vers le nouveau format avec ID utilisateur
        if (newUser.id) {
          migrateUserData(newUser.id)
        }

        return { success: true }
      } else {
        return { success: false, error: response.data.error || 'Erreur lors de l\'inscription' }
      }
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error)
      const errorMessage = error.response?.data?.error || 'Erreur lors de l\'inscription'
      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      setUser(null)
      if (mounted) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        localStorage.removeItem('userStats')
        localStorage.removeItem('recentActivity')

        // Nettoyer aussi les données spécifiques à l'utilisateur
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
          if (key.startsWith('userStats_') || key.startsWith('recentActivity_')) {
            localStorage.removeItem(key)
          }
        })
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      throw error
    }
  }

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedData }
      setUser(newUser)
      if (mounted) {
        localStorage.setItem('user', JSON.stringify(newUser))
      }
    }
  }

  // Fonction pour obtenir le token d'authentification
  const getAuthToken = (): string | null => {
    if (!mounted) return null
    return localStorage.getItem('authToken')
  }

  return {
    user,
    isLoading: isLoading || !mounted,
    isLoggedIn: mounted && !!user?.isLoggedIn,
    login,
    register,
    logout,
    updateUser,
    getAuthToken
  }
}
