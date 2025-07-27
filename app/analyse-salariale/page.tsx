'use client'

import { useState } from 'react'
import { useAuth } from '../../lib/useAuth'
import ProtectedRoute from '../../components/Auth/ProtectedRoute'
import SalaryAnalysisResult from '../../components/Results/SalaryAnalysisResult'
import { incrementStat, addRecentActivity } from '../../lib/userStats'

export default function AnalyseSalarialePage() {
  const { user } = useAuth()
  const [showResult, setShowResult] = useState(false)
  const [formData, setFormData] = useState({
    poste: '',
    experience: '',
    localisation: '',
    salaireActuel: 0
  })

  const handleAnalysis = () => {
    // Simulation de données d'analyse salariale
    const mockData = {
      poste: formData.poste || 'Développeur Full-Stack',
      experience: formData.experience || '3-5 ans',
      localisation: formData.localisation || 'Casablanca',
      salaireActuel: formData.salaireActuel || 22000,
      salaireMoyenMarche: 25000,
      salaireMin: 18000,
      salaireMax: 35000,
      percentile: 65
    }
    
    setShowResult(true)
    
    // Incrémenter les statistiques
    if (user?.id) {
      incrementStat('salaryAnalyses', user.id)
      addRecentActivity({
        title: `Analyse salariale - ${mockData.poste}`,
        date: new Date().toISOString(),
        type: 'salary'
      }, user.id)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-6 pb-6 px-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-900 to-gray-900 dark:from-white dark:via-green-300 dark:to-white bg-clip-text text-transparent mb-4">
              Analyse Salariale
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Comparez votre salaire au marché et obtenez des recommandations personnalisées
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Intitulé du poste</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex : Développeur Full-Stack"
                    value={formData.poste}
                    onChange={(e) => setFormData({...formData, poste: e.target.value})}
                    className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Années d'expérience</span>
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md text-gray-900 dark:text-white"
                  >
                    <option value="">Sélectionnez votre expérience</option>
                    <option value="0-1 an">0-1 an</option>
                    <option value="1-3 ans">1-3 ans</option>
                    <option value="3-5 ans">3-5 ans</option>
                    <option value="5-10 ans">5-10 ans</option>
                    <option value="10+ ans">10+ ans</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Localisation</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex : Casablanca, Rabat..."
                    value={formData.localisation}
                    onChange={(e) => setFormData({...formData, localisation: e.target.value})}
                    className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Salaire actuel (MAD/mois)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Ex : 20000"
                    value={formData.salaireActuel || ''}
                    onChange={(e) => setFormData({...formData, salaireActuel: parseInt(e.target.value) || 0})}
                    className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
              
              <button
                onClick={handleAnalysis}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 transform"
              >
                <span className="flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4" />
                  </svg>
                  <span>Analyser mon salaire</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Composant de résultat */}
      {showResult && (
        <SalaryAnalysisResult
          data={formData}
          onClose={() => setShowResult(false)}
        />
      )}
    </ProtectedRoute>
  )
}
