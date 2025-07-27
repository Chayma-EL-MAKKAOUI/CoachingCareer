'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'
import { useAuth } from '../../../lib/useAuth'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      })

      if (result.success) {
        router.push('/dashboard')
      } else {
        setError(result.error || 'Email ou mot de passe incorrect')
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl mb-6 shadow-lg">
              <span className="text-white font-bold text-2xl">CF</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent mb-4">
              CareerFinance AI
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Votre assistant intelligent pour optimiser votre carrière
            </p>
          </div>

          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 dark:bg-gray-700/50 rounded-2xl p-1">
            <button className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-xl font-medium shadow-lg">
              Connexion
            </button>
            <Link
              href="/auth/register"
              className="flex-1 py-3 px-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-center font-medium rounded-xl"
            >
              Inscription
            </Link>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-4 pr-12 border border-gray-200 dark:border-gray-600 rounded-2xl placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>

            <div className="text-center">
              <span className="text-gray-500 dark:text-gray-400">ou</span>
            </div>

            {/* Connexion avec email rapide */}
            <button
              type="button"
              className="w-full py-4 px-6 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 font-medium rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>Connexion rapide avec email</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
