// Script pour ajouter des données de démonstration à un utilisateur
// Utilisation: node scripts/add-demo-data.js [userId]

const userId = process.argv[2] || 1; // Par défaut, utilisateur ID 1

// Simuler localStorage dans Node.js
const localStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null;
  },
  setItem(key, value) {
    this.data[key] = value;
  },
  removeItem(key) {
    delete this.data[key];
  }
};

// Simuler window pour les fonctions userStats
global.window = { localStorage };

// Importer les fonctions (simulation)
function saveUserStats(stats, userId) {
  const key = userId ? `userStats_${userId}` : 'userStats';
  const currentStats = getUserStats(userId);
  const updatedStats = {
    ...currentStats,
    ...stats,
    lastUpdated: new Date().toISOString()
  };
  localStorage.setItem(key, JSON.stringify(updatedStats));
}

function getUserStats(userId) {
  const DEFAULT_STATS = {
    totalAnalyses: 0,
    bulletinAnalyses: 0,
    salaryAnalyses: 0,
    careerCoaching: 0,
    lastUpdated: new Date().toISOString()
  };

  const key = userId ? `userStats_${userId}` : 'userStats';
  const savedStats = localStorage.getItem(key);
  
  if (savedStats) {
    const parsed = JSON.parse(savedStats);
    return { ...DEFAULT_STATS, ...parsed };
  }

  return DEFAULT_STATS;
}

function addRecentActivity(activity, userId) {
  const key = userId ? `recentActivity_${userId}` : 'recentActivity';
  const currentActivity = getRecentActivity(userId);
  
  const updatedActivity = [activity, ...currentActivity].slice(0, 10);
  localStorage.setItem(key, JSON.stringify(updatedActivity));
}

function getRecentActivity(userId) {
  const key = userId ? `recentActivity_${userId}` : 'recentActivity';
  const savedActivity = localStorage.getItem(key);
  
  if (savedActivity) {
    return JSON.parse(savedActivity);
  }

  return [];
}

// Ajouter des données de démonstration
console.log(`🎯 Ajout de données de démonstration pour l'utilisateur ${userId}...`);

// Statistiques de démonstration
const demoStats = {
  totalAnalyses: 5,
  bulletinAnalyses: 2,
  salaryAnalyses: 2,
  careerCoaching: 1
};

saveUserStats(demoStats, userId);

// Activités récentes de démonstration
const demoActivities = [
  {
    title: 'Analyse bulletin de paie - Janvier 2024',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 2 jours
    type: 'bulletin'
  },
  {
    title: 'Analyse salariale - Développeur Full Stack',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 5 jours
    type: 'salary'
  },
  {
    title: 'Plan de carrière personnalisé',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 7 jours
    type: 'coaching'
  },
  {
    title: 'Analyse bulletin de paie - Décembre 2023',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 10 jours
    type: 'bulletin'
  },
  {
    title: 'Analyse salariale - Comparaison marché',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 14 jours
    type: 'salary'
  }
];

// Ajouter chaque activité
demoActivities.forEach(activity => {
  addRecentActivity(activity, userId);
});

console.log('✅ Données de démonstration ajoutées avec succès !');
console.log('\n📊 Statistiques:');
console.log(`- Total analyses: ${demoStats.totalAnalyses}`);
console.log(`- Bulletins analysés: ${demoStats.bulletinAnalyses}`);
console.log(`- Analyses salariales: ${demoStats.salaryAnalyses}`);
console.log(`- Sessions coaching: ${demoStats.careerCoaching}`);

console.log('\n📝 Activités récentes:');
demoActivities.forEach((activity, index) => {
  console.log(`${index + 1}. ${activity.title} (${new Date(activity.date).toLocaleDateString('fr-FR')})`);
});

console.log('\n💾 Données localStorage:');
console.log('userStats:', localStorage.getItem(`userStats_${userId}`));
console.log('recentActivity:', localStorage.getItem(`recentActivity_${userId}`));

console.log('\n🔧 Pour utiliser ces données:');
console.log('1. Copiez les données localStorage ci-dessus');
console.log('2. Ouvrez les DevTools de votre navigateur (F12)');
console.log('3. Allez dans l\'onglet Console');
console.log('4. Exécutez les commandes suivantes:');
console.log(`localStorage.setItem('userStats_${userId}', '${localStorage.getItem(`userStats_${userId}`)}')`);
console.log(`localStorage.setItem('recentActivity_${userId}', '${localStorage.getItem(`recentActivity_${userId}`)}')`);
console.log('5. Rechargez la page du dashboard');
