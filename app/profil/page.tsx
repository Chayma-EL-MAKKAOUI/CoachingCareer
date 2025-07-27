'use client'

import { useState } from 'react'
import { useAuth } from '../../lib/useAuth'
import ProtectedRoute from '../../components/Auth/ProtectedRoute'
import { getUserStats, getRecentActivity } from '../../lib/userStats'
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Target,
  Edit3,
  Save,
  X
} from 'lucide-react'

export default function ProfilPage() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || '')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Récupérer les statistiques et l'activité récente
  const stats = getUserStats(user?.id)
  const recentActivity = getRecentActivity(user?.id)

  const handleSave = () => {
    // TODO: Implémenter la mise à jour du profil via API
    console.log('Mise à jour du profil:', editedName)
    setIsEditing(false)
  }

  const handleLogout = async () => {
    await logout()
    window.location.href = '/'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'bulletin': return <FileText className="w-4 h-4" />
      case 'salary': return <TrendingUp className="w-4 h-4" />
      case 'coaching': return <Target className="w-4 h-4" />
      default: return <BarChart3 className="w-4 h-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'bulletin': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30'
      case 'salary': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
      case 'coaching': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30'
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-6 pb-6 px-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-2xl mb-6 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent mb-2">
              Mon Profil
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Gérez vos informations personnelles et consultez votre activité
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations personnelles */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Informations personnelles
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Modifier</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Sauvegarder</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false)
                          setEditedName(user?.name || '')
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Annuler</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Avatar et nom */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          className="w-full text-2xl font-semibold bg-transparent border-b-2 border-purple-500 focus:outline-none text-gray-900 dark:text-white"
                        />
                      ) : (
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {user?.name}
                        </h3>
                      )}
                    </div>
                  </div>

                  {/* Informations de contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Mail className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Membre depuis</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user?.created_at ? formatDate(user.created_at) : 'Non disponible'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activité récente */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 mt-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Activité récente
                </h2>
                {recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(activity.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    Aucune activité récente
                  </p>
                )}
              </div>
            </div>

            {/* Statistiques et actions */}
            <div className="space-y-6">
              {/* Statistiques */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Mes statistiques
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-700 dark:text-gray-300">Total analyses</span>
                    </div>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{stats.totalAnalyses}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-gray-700 dark:text-gray-300">Bulletins</span>
                    </div>
                    <span className="font-bold text-green-600 dark:text-green-400">{stats.bulletinAnalyses}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-gray-700 dark:text-gray-300">Salaires</span>
                    </div>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{stats.salaryAnalyses}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <span className="text-gray-700 dark:text-gray-300">Coaching</span>
                    </div>
                    <span className="font-bold text-orange-600 dark:text-orange-400">{stats.careerCoaching}</span>
                  </div>
                </div>
              </div>

              {/* Actions rapides */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Actions rapides
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Paramètres</span>
                  </button>
                  <button 
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors text-red-600 dark:text-red-400"
                  >
                    <User className="w-5 h-5" />
                    <span>Se déconnecter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation de déconnexion */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Confirmer la déconnexion
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  )
}
