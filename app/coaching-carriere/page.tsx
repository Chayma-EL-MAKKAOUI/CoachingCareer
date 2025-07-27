'use client'

import { useState } from 'react'
import { useAuth } from '../../lib/useAuth'
import ProtectedRoute from '../../components/Auth/ProtectedRoute'
import CareerCoachingResult from '../../components/Results/CareerCoachingResult'
import { incrementStat, addRecentActivity } from '../../lib/userStats'

export default function CoachingCarrierePage() {
  const { user } = useAuth()
  const [showResult, setShowResult] = useState(false)
  const [formData, setFormData] = useState({
    objectif: '',
    competences: '',
    secteur: ''
  })

  const handleAnalysis = () => {
    // Simulation de données de coaching carrière
    const mockData = {
      objectif: formData.objectif || 'Évoluer vers un poste de management',
      competences: formData.competences ? formData.competences.split(',').map(c => c.trim()) : ['JavaScript', 'React', 'Node.js'],
      secteur: formData.secteur || 'Technologie',
      planCarriere: {
        etapes: [
          {
            titre: 'Senior Developer',
            duree: '6-12 mois',
            description: 'Renforcer vos compétences techniques et prendre plus de responsabilités',
            competencesRequises: ['Leadership technique', 'Mentoring', 'Architecture'],
            salaireEstime: 28000
          },
          {
            titre: 'Team Lead',
            duree: '1-2 ans',
            description: 'Diriger une équipe de développeurs et gérer des projets',
            competencesRequises: ['Management', 'Communication', 'Planification'],
            salaireEstime: 35000
          },
          {
            titre: 'Engineering Manager',
            duree: '2-3 ans',
            description: 'Gérer plusieurs équipes et définir la stratégie technique',
            competencesRequises: ['Strategic thinking', 'Budget management', 'Hiring'],
            salaireEstime: 45000
          }
        ]
      },
      scriptNegociation: {
        points: [
          'Mes réalisations et contributions à l\'équipe',
          'Mon engagement dans la formation continue',
          'Ma capacité à prendre des initiatives',
          'Les résultats mesurables de mon travail'
        ],
        arguments: [
          'J\'ai mené avec succès 3 projets majeurs cette année',
          'J\'ai formé 2 nouveaux développeurs juniors',
          'J\'ai proposé et implémenté des améliorations qui ont réduit les bugs de 30%',
          'Je souhaite évoluer vers plus de responsabilités managériales'
        ]
      }
    }
    
    setShowResult(true)
    
    // Incrémenter les statistiques
    if (user?.id) {
      incrementStat('careerCoaching', user.id)
      addRecentActivity({
        title: `Session coaching - ${mockData.objectif}`,
        date: new Date().toISOString(),
        type: 'coaching'
      }, user.id)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-6 pb-6 px-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent mb-4">
              Coaching Carrière
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Obtenez un plan de carrière personnalisé et des conseils pour négocier votre évolution
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Objectif de carrière</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex : Devenir Team Lead, Évoluer vers le management..."
                  value={formData.objectif}
                  onChange={(e) => setFormData({...formData, objectif: e.target.value})}
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Compétences actuelles</span>
                </label>
                <textarea
                  placeholder="Ex : JavaScript, React, Node.js, Leadership, Communication..."
                  value={formData.competences}
                  onChange={(e) => setFormData({...formData, competences: e.target.value})}
                  rows={3}
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span>Secteur d'activité</span>
                </label>
                <select
                  value={formData.secteur}
                  onChange={(e) => setFormData({...formData, secteur: e.target.value})}
                  className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md text-gray-900 dark:text-white"
                >
                  <option value="">Sélectionnez votre secteur</option>
                  <option value="Technologie">Technologie</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Ressources Humaines">Ressources Humaines</option>
                  <option value="Vente">Vente</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              
              <button
                onClick={handleAnalysis}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 transform"
              >
                <span className="flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Générer mon plan de carrière</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Composant de résultat */}
      {showResult && (
        <CareerCoachingResult
          data={formData}
          onClose={() => setShowResult(false)}
        />
      )}
    </ProtectedRoute>
  )
}
