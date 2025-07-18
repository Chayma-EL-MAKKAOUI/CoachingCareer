'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { useAuth } from '../lib/useAuth'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [activeTab, setActiveTab] = useState('bulletin-paie')
  const [message, setMessage] = useState('')
  const { login, isLoggedIn, isLoading } = useAuth()
  const router = useRouter()

  const handleQuickLogin = () => {
    login({
      name: 'Demo User',
      email: 'demo@example.com',
      isLoggedIn: true
    })
    router.push('/dashboard')
  }

  const tabs = [
    { id: 'bulletin-paie', label: 'Bulletin de Paie / contrat' },
    { id: 'analyse-salariale', label: 'Analyse Salariale' },
    { id: 'coaching-carriere', label: 'Coaching Carrière' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bulletin-paie':
        return (
          <div className="space-y-8">
            <div className="relative border-2 border-dashed border-blue-300 rounded-2xl p-12 text-center bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-blue-400 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="text-blue-600 text-xl font-semibold mb-2">
                  Déposez votre bulletin de paie ou contrat ici
                </div>
                <div className="text-gray-500 text-sm">
                  Format acceptés : PDF, JPG, PNG • Taille max : 10MB
                </div>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 transform">
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Analyser mon bulletin ou contrat</span>
              </span>
            </button>
          </div>
        )

      case 'analyse-salariale':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold mb-3 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Intitulé du poste</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex : Développeur Full-Stack"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold mb-3 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Années d'expérience</span>
                </label>
                <select className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md">
                  <option>Sélectionnez</option>
                  <option>0-2 ans</option>
                  <option>3-5 ans</option>
                  <option>5-10 ans</option>
                  <option>10+ ans</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold mb-3 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Localisation</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex : Casa, Rabat, Tanger..."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold mb-3 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Salaire actuel (MAD/mois)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex : 15 000"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
                />
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 transform">
              <span className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>Analyser mon positionnement</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        )

      case 'coaching-carriere':
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold mb-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Objectif professionnel</span>
              </label>
              <textarea
                placeholder="Décrivez votre objectif de carrière..."
                rows={4}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold mb-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Compétences clés</span>
              </label>
              <input
                type="text"
                placeholder="Ex : JavaScript, Python, React..."
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold mb-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Secteur d'activité</span>
              </label>
              <select className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 hover:shadow-md">
                <option>Sélectionnez...</option>
                <option>Technologie</option>
                <option>Finance</option>
                <option>Santé</option>
                <option>Éducation</option>
                <option>Commerce</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-gradient-to-r from-purple-500 to-cyan-400 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 transform">
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Générer mon plan de carrière</span>
                </span>
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 transform">
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Script de négociation</span>
                </span>
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-6 pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-2xl mb-6 shadow-lg animate-float animate-glow">
            <span className="text-white font-bold text-2xl">CF</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent mb-4">
            CareerFinance AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Votre assistant intelligent pour optimiser votre carrière et comprendre vos finances
          </p>
          <div className="mt-6 flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150"></div>
            </div>
            {!isLoading && !isLoggedIn && (
              <button
                onClick={handleQuickLogin}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:shadow-xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300"
              >
                🚀 Connexion rapide (Demo)
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="flex space-x-2 mb-8 bg-white/70 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-white/20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white shadow-xl shadow-purple-500/25'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              {renderTabContent()}
            </div>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Assistant IA
                </h3>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl p-4 mb-6 border border-purple-100">
                <p className="text-gray-700 text-sm font-medium mb-3">
                  👋 Bonjour ! Je suis votre assistant personnel. Vous pouvez me poser des questions sur :
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <span>Vos bulletins de paie</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span>Les négociations salariales</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <span>Votre évolution de carrière</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span>La compréhension de vos documents RH</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tapez votre message ici..."
                  className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white/70 backdrop-blur-sm"
                />
                <button className="bg-gradient-to-r from-purple-500 to-cyan-400 text-white p-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}