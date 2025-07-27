'use client'

import { useState } from 'react'
import { useAuth } from '../../lib/useAuth'
import { LogOut } from 'lucide-react'

export default function QuickLogout() {
  const { user, logout, isLoggedIn } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleQuickLogout = async () => {
    if (!isLoggedIn) {
      console.log('Aucun utilisateur connecté')
      return
    }

    setIsLoggingOut(true)
    console.log('🔓 Début de la déconnexion...')
    
    try {
      console.log('Utilisateur avant déconnexion:', user)
      
      // Appeler la fonction logout
      await logout()
      
      console.log('✅ Fonction logout exécutée')
      
      // Vérifier que les données ont été supprimées
      const remainingToken = localStorage.getItem('authToken')
      const remainingUser = localStorage.getItem('user')
      
      console.log('Token restant:', remainingToken)
      console.log('Utilisateur restant:', remainingUser)
      
      // Forcer le rechargement de la page
      console.log('🔄 Rechargement de la page...')
      window.location.href = '/'
      
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error)
      setIsLoggingOut(false)
    }
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleQuickLogout}
        disabled={isLoggingOut}
        className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogOut className="w-4 h-4" />
        <span>{isLoggingOut ? 'Déconnexion...' : 'Déconnexion rapide'}</span>
      </button>
    </div>
  )
}
