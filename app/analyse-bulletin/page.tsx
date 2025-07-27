'use client'

import { useState } from 'react'
import { useAuth } from '../../lib/useAuth'
import ProtectedRoute from '../../components/Auth/ProtectedRoute'
import BulletinAnalysisResult from '../../components/Results/BulletinAnalysisResult'
import { incrementStat, addRecentActivity } from '../../lib/userStats'

export default function AnalyseBulletinPage() {
  const { user } = useAuth()
  const [showResult, setShowResult] = useState(false)
  const [bulletinData, setBulletinData] = useState({
    fileName: '',
    salaireBrut: 0,
    salaireNet: 0,
    cotisations: 0,
    impots: 0,
    primes: 0,
    heuresSupp: 0
  })

  const handleAnalysis = () => {
    // Simulation de données d'analyse de bulletin
    const mockData = {
      fileName: 'bulletin_juillet_2025.pdf',
      salaireBrut: 25000,
      salaireNet: 18500,
      cotisations: 4500,
      impots: 2000,
      primes: 3000,
      heuresSupp: 1500
    }
    
    setBulletinData(mockData)
    setShowResult(true)
    
    // Incrémenter les statistiques
    if (user?.id) {
      incrementStat('bulletinAnalyses', user.id)
      addRecentActivity({
        title: `Analyse bulletin de paie - ${mockData.fileName}`,
        date: new Date().toISOString(),
        type: 'bulletin'
      }, user.id)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-6 pb-6 px-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white bg-clip-text text-transparent mb-4">
              Analyse de Bulletin de Paie
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Téléchargez votre bulletin de paie pour une analyse détaillée et des conseils personnalisés
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="space-y-6">
              <div className="relative border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 dark:from-blue-600/20 dark:to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 text-xl font-semibold mb-3">
                    Déposez votre bulletin de paie ou contrat ici
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    Format acceptés : PDF, JPG, PNG • Taille max : 10MB
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleAnalysis}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 transform"
              >
                <span className="flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Analyser mon bulletin ou contrat</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Composant de résultat */}
      {showResult && (
        <BulletinAnalysisResult
          data={bulletinData}
          onClose={() => setShowResult(false)}
        />
      )}
    </ProtectedRoute>
  )
}
