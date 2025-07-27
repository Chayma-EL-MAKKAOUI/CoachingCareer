// Script pour tester la fonctionnalité de déconnexion
console.log('🔓 Test de la fonctionnalité de déconnexion\n');

// Fonction pour tester la déconnexion
function testLogout() {
  console.log('1. Vérification de l\'état de connexion...');
  
  // Vérifier si l'utilisateur est connecté
  const authToken = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  
  if (!authToken && !user) {
    console.log('❌ Aucun utilisateur connecté trouvé');
    console.log('   Connectez-vous d\'abord pour tester la déconnexion');
    return;
  }
  
  console.log('✅ Utilisateur connecté détecté');
  console.log(`   Token: ${authToken ? 'Présent' : 'Absent'}`);
  console.log(`   Données utilisateur: ${user ? 'Présentes' : 'Absentes'}`);
  
  // Vérifier les données utilisateur spécifiques
  const userObj = user ? JSON.parse(user) : null;
  if (userObj) {
    console.log(`   Nom: ${userObj.name}`);
    console.log(`   Email: ${userObj.email}`);
    
    // Chercher les données spécifiques à cet utilisateur
    const userStatsKey = `userStats_${userObj.id}`;
    const userActivityKey = `recentActivity_${userObj.id}`;
    
    const userStats = localStorage.getItem(userStatsKey);
    const userActivity = localStorage.getItem(userActivityKey);
    
    console.log(`   Statistiques (${userStatsKey}): ${userStats ? 'Présentes' : 'Absentes'}`);
    console.log(`   Activité (${userActivityKey}): ${userActivity ? 'Présente' : 'Absente'}`);
  }
  
  console.log('\n2. Test de la fonction de déconnexion...');
  
  // Simuler la déconnexion
  console.log('   Suppression du token d\'authentification...');
  localStorage.removeItem('authToken');
  
  console.log('   Suppression des données utilisateur...');
  localStorage.removeItem('user');
  
  console.log('   Suppression des statistiques générales...');
  localStorage.removeItem('userStats');
  localStorage.removeItem('recentActivity');
  
  // Nettoyer les données spécifiques à l'utilisateur
  console.log('   Nettoyage des données spécifiques à l\'utilisateur...');
  const keys = Object.keys(localStorage);
  let cleanedKeys = 0;
  
  keys.forEach(key => {
    if (key.startsWith('userStats_') || key.startsWith('recentActivity_')) {
      localStorage.removeItem(key);
      cleanedKeys++;
      console.log(`     Supprimé: ${key}`);
    }
  });
  
  console.log(`   ${cleanedKeys} clés spécifiques supprimées`);
  
  console.log('\n3. Vérification post-déconnexion...');
  
  // Vérifier que tout a été nettoyé
  const remainingToken = localStorage.getItem('authToken');
  const remainingUser = localStorage.getItem('user');
  const remainingStats = localStorage.getItem('userStats');
  const remainingActivity = localStorage.getItem('recentActivity');
  
  console.log(`   Token: ${remainingToken ? '❌ Encore présent' : '✅ Supprimé'}`);
  console.log(`   Utilisateur: ${remainingUser ? '❌ Encore présent' : '✅ Supprimé'}`);
  console.log(`   Statistiques: ${remainingStats ? '❌ Encore présentes' : '✅ Supprimées'}`);
  console.log(`   Activité: ${remainingActivity ? '❌ Encore présente' : '✅ Supprimée'}`);
  
  // Vérifier les clés restantes
  const finalKeys = Object.keys(localStorage);
  const userSpecificKeys = finalKeys.filter(key => 
    key.startsWith('userStats_') || key.startsWith('recentActivity_')
  );
  
  if (userSpecificKeys.length > 0) {
    console.log('   ⚠️  Clés spécifiques utilisateur restantes:');
    userSpecificKeys.forEach(key => console.log(`     - ${key}`));
  } else {
    console.log('   ✅ Toutes les clés spécifiques utilisateur supprimées');
  }
  
  console.log('\n4. 🎯 Résultat du test:');
  
  if (!remainingToken && !remainingUser && !remainingStats && !remainingActivity && userSpecificKeys.length === 0) {
    console.log('✅ SUCCÈS: Déconnexion complète réussie');
    console.log('   Toutes les données ont été correctement supprimées');
  } else {
    console.log('❌ ÉCHEC: Déconnexion incomplète');
    console.log('   Certaines données n\'ont pas été supprimées');
  }
  
  console.log('\n5. 🔄 Instructions pour tester dans l\'application:');
  console.log('   1. Rechargez la page (F5)');
  console.log('   2. Vérifiez que vous êtes déconnecté');
  console.log('   3. Essayez d\'accéder aux fonctionnalités protégées');
  console.log('   4. Vérifiez la redirection vers /auth/login');
}

// Fonction pour restaurer un utilisateur de test
function restoreTestUser() {
  console.log('\n🔄 Restauration d\'un utilisateur de test...');
  
  const testUser = {
    id: 5,
    name: 'Marie Dubois',
    email: 'marie.dubois@example.com',
    isLoggedIn: true
  };
  
  const testToken = 'test-token-' + Date.now();
  
  localStorage.setItem('authToken', testToken);
  localStorage.setItem('user', JSON.stringify(testUser));
  
  // Ajouter des données de test
  const testStats = {
    totalAnalyses: 12,
    bulletinAnalyses: 5,
    salaryAnalyses: 4,
    careerCoaching: 3,
    lastUpdated: new Date().toISOString()
  };
  
  const testActivity = [
    {
      title: 'Test - Analyse bulletin de paie',
      date: new Date().toISOString(),
      type: 'bulletin'
    }
  ];
  
  localStorage.setItem(`userStats_${testUser.id}`, JSON.stringify(testStats));
  localStorage.setItem(`recentActivity_${testUser.id}`, JSON.stringify(testActivity));
  
  console.log('✅ Utilisateur de test restauré');
  console.log(`   Nom: ${testUser.name}`);
  console.log(`   Email: ${testUser.email}`);
  console.log('   Rechargez la page pour voir les changements');
}

// Fonctions disponibles globalement
window.testLogout = testLogout;
window.restoreTestUser = restoreTestUser;

console.log('📋 Fonctions disponibles:');
console.log('   testLogout() - Tester la déconnexion');
console.log('   restoreTestUser() - Restaurer un utilisateur de test');
console.log('\n🚀 Exécutez testLogout() pour commencer le test');

// Auto-exécution si pas dans un navigateur
if (typeof window === 'undefined') {
  console.log('💡 Copiez ce script dans la console du navigateur pour l\'utiliser');
}
