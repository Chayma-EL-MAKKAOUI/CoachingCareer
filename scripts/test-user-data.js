// Script pour tester l'affichage des données utilisateur
const axios = require('axios');

const BASE_URL = 'http://localhost:3002/api';

async function testUserData() {
  console.log('🧪 Test des données utilisateur personnalisées\n');

  try {
    // 1. Créer un utilisateur de test
    console.log('1. Création d\'un utilisateur de test...');
    const testUser = {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      password: 'password123'
    };

    let token;
    try {
      const registerResponse = await axios.post(`${BASE_URL}/auth/register`, testUser);
      console.log('✅ Utilisateur créé:', registerResponse.data.user.name);
      token = registerResponse.data.token;
    } catch (error) {
      if (error.response?.status === 409) {
        // L'utilisateur existe déjà, essayons de nous connecter
        console.log('ℹ️ Utilisateur existe déjà, connexion...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
          email: testUser.email,
          password: testUser.password
        });
        console.log('✅ Connexion réussie:', loginResponse.data.user.name);
        token = loginResponse.data.token;
      } else {
        throw error;
      }
    }

    // 2. Vérifier les informations utilisateur
    console.log('\n2. Vérification des informations utilisateur...');
    const meResponse = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const user = meResponse.data.user;
    console.log('✅ Informations utilisateur récupérées:');
    console.log(`   - ID: ${user.id}`);
    console.log(`   - Nom: ${user.name}`);
    console.log(`   - Email: ${user.email}`);

    // 3. Instructions pour ajouter des données de test dans le navigateur
    console.log('\n3. 📝 Instructions pour ajouter des données de test:');
    console.log('   Ouvrez les DevTools de votre navigateur (F12) et exécutez:');
    
    const statsData = {
      totalAnalyses: 8,
      bulletinAnalyses: 3,
      salaryAnalyses: 3,
      careerCoaching: 2,
      lastUpdated: new Date().toISOString()
    };

    const activityData = [
      {
        title: 'Analyse bulletin de paie - Février 2024',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'bulletin'
      },
      {
        title: 'Analyse salariale - Ingénieur Logiciel',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'salary'
      },
      {
        title: 'Session coaching - Évolution de carrière',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'coaching'
      },
      {
        title: 'Analyse bulletin de paie - Janvier 2024',
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'bulletin'
      },
      {
        title: 'Analyse salariale - Comparaison secteur',
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'salary'
      }
    ];

    console.log(`\n   // Statistiques pour l'utilisateur ID ${user.id}`);
    console.log(`   localStorage.setItem('userStats_${user.id}', '${JSON.stringify(statsData)}');`);
    console.log(`\n   // Activité récente pour l'utilisateur ID ${user.id}`);
    console.log(`   localStorage.setItem('recentActivity_${user.id}', '${JSON.stringify(activityData)}');`);
    
    console.log('\n   // Puis rechargez la page du dashboard');
    console.log('   window.location.reload();');

    console.log('\n4. 🌐 Liens utiles:');
    console.log(`   - Connexion: http://localhost:3002/auth/login`);
    console.log(`   - Dashboard: http://localhost:3002/dashboard`);
    console.log(`   - Email: ${testUser.email}`);
    console.log(`   - Mot de passe: ${testUser.password}`);

    console.log('\n✅ Test terminé avec succès !');
    console.log('   Connectez-vous avec les identifiants ci-dessus et ajoutez les données de test.');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.response?.data || error.message);
  }
}

// Exécuter le test
testUserData();
