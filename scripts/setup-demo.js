// Script pour configurer une démonstration complète
const axios = require('axios');

const BASE_URL = 'http://localhost:3002/api';

async function setupDemo() {
  console.log('🎯 Configuration de la démonstration CareerFinance AI\n');

  try {
    // 1. Créer plusieurs utilisateurs de démonstration
    console.log('1. Création des utilisateurs de démonstration...');
    
    const demoUsers = [
      {
        name: 'Marie Dubois',
        email: 'marie.dubois@example.com',
        password: 'demo123',
        role: 'Développeuse Senior',
        stats: {
          totalAnalyses: 12,
          bulletinAnalyses: 5,
          salaryAnalyses: 4,
          careerCoaching: 3
        }
      },
      {
        name: 'Ahmed Benali',
        email: 'ahmed.benali@example.com', 
        password: 'demo123',
        role: 'Chef de Projet',
        stats: {
          totalAnalyses: 8,
          bulletinAnalyses: 3,
          salaryAnalyses: 3,
          careerCoaching: 2
        }
      },
      {
        name: 'Sophie Martin',
        email: 'sophie.martin@example.com',
        password: 'demo123',
        role: 'Consultante RH',
        stats: {
          totalAnalyses: 15,
          bulletinAnalyses: 6,
          salaryAnalyses: 5,
          careerCoaching: 4
        }
      }
    ];

    const createdUsers = [];

    for (const user of demoUsers) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/register`, {
          name: user.name,
          email: user.email,
          password: user.password
        });
        
        console.log(`   ✅ ${user.name} créé(e) - ID: ${response.data.user.id}`);
        createdUsers.push({
          ...response.data.user,
          stats: user.stats,
          role: user.role,
          password: user.password
        });
      } catch (error) {
        if (error.response?.status === 409) {
          console.log(`   ℹ️  ${user.name} existe déjà`);
          // Essayer de se connecter pour récupérer l'ID
          try {
            const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
              email: user.email,
              password: user.password
            });
            createdUsers.push({
              ...loginResponse.data.user,
              stats: user.stats,
              role: user.role,
              password: user.password
            });
          } catch (loginError) {
            console.log(`   ⚠️  Impossible de récupérer ${user.name}`);
          }
        } else {
          console.log(`   ❌ Erreur pour ${user.name}:`, error.response?.data?.message || error.message);
        }
      }
    }

    // 2. Générer des données de test pour chaque utilisateur
    console.log('\n2. Génération des données de test...');
    
    for (const user of createdUsers) {
      if (!user.id) continue;

      // Générer des activités récentes réalistes
      const activities = [];
      const now = new Date();
      
      // Activités des 30 derniers jours
      for (let i = 0; i < user.stats.totalAnalyses; i++) {
        const daysAgo = Math.floor(Math.random() * 30);
        const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
        
        let activity;
        if (i < user.stats.bulletinAnalyses) {
          activity = {
            title: `Analyse bulletin de paie - ${date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`,
            date: date.toISOString(),
            type: 'bulletin'
          };
        } else if (i < user.stats.bulletinAnalyses + user.stats.salaryAnalyses) {
          const postes = ['Développeur Full Stack', 'Chef de Projet', 'Consultant', 'Manager', 'Analyste'];
          activity = {
            title: `Analyse salariale - ${postes[Math.floor(Math.random() * postes.length)]}`,
            date: date.toISOString(),
            type: 'salary'
          };
        } else {
          const objectifs = ['Évolution managériale', 'Changement de secteur', 'Négociation salariale', 'Développement compétences'];
          activity = {
            title: `Session coaching - ${objectifs[Math.floor(Math.random() * objectifs.length)]}`,
            date: date.toISOString(),
            type: 'coaching'
          };
        }
        
        activities.push(activity);
      }

      // Trier par date décroissante
      activities.sort((a, b) => new Date(b.date) - new Date(a.date));

      console.log(`   📊 Données générées pour ${user.name}:`);
      console.log(`      - ${user.stats.totalAnalyses} analyses au total`);
      console.log(`      - ${activities.length} activités récentes`);
    }

    // 3. Instructions pour la démonstration
    console.log('\n3. 🎬 Instructions pour la démonstration:');
    console.log('\n   📋 Comptes de démonstration créés:');
    
    createdUsers.forEach((user, index) => {
      console.log(`\n   ${index + 1}. ${user.name} (${user.role || 'Utilisateur'})`);
      console.log(`      - Email: ${user.email}`);
      console.log(`      - Mot de passe: ${user.password}`);
      console.log(`      - Analyses: ${user.stats.totalAnalyses} (${user.stats.bulletinAnalyses} bulletins, ${user.stats.salaryAnalyses} salaires, ${user.stats.careerCoaching} coaching)`);
      
      if (user.id) {
        const statsData = {
          ...user.stats,
          lastUpdated: new Date().toISOString()
        };

        // Générer des activités pour cet utilisateur
        const userActivities = [];
        const now = new Date();
        
        for (let i = 0; i < Math.min(user.stats.totalAnalyses, 10); i++) {
          const daysAgo = Math.floor(Math.random() * 30);
          const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
          
          let activity;
          if (i < user.stats.bulletinAnalyses) {
            activity = {
              title: `Analyse bulletin - ${date.toLocaleDateString('fr-FR', { month: 'short' })}`,
              date: date.toISOString(),
              type: 'bulletin'
            };
          } else if (i < user.stats.bulletinAnalyses + user.stats.salaryAnalyses) {
            activity = {
              title: `Analyse salariale - ${user.role || 'Poste'}`,
              date: date.toISOString(),
              type: 'salary'
            };
          } else {
            activity = {
              title: `Session coaching - Évolution carrière`,
              date: date.toISOString(),
              type: 'coaching'
            };
          }
          
          userActivities.push(activity);
        }

        userActivities.sort((a, b) => new Date(b.date) - new Date(a.date));

        console.log(`\n      💾 Commandes localStorage pour ${user.name}:`);
        console.log(`      localStorage.setItem('userStats_${user.id}', '${JSON.stringify(statsData)}');`);
        console.log(`      localStorage.setItem('recentActivity_${user.id}', '${JSON.stringify(userActivities)}');`);
      }
    });

    // 4. Scénarios de démonstration
    console.log('\n4. 🎭 Scénarios de démonstration suggérés:');
    
    console.log('\n   📖 Scénario 1 - Nouvel utilisateur:');
    console.log('      1. Visitez la page d\'accueil sans être connecté');
    console.log('      2. Essayez d\'utiliser une fonctionnalité');
    console.log('      3. Montrez la redirection vers la connexion');
    console.log('      4. Créez un nouveau compte ou utilisez un compte de démo');
    console.log('      5. Montrez l\'accès aux fonctionnalités après connexion');

    console.log('\n   📊 Scénario 2 - Utilisateur expérimenté:');
    console.log('      1. Connectez-vous avec Marie Dubois (utilisatrice active)');
    console.log('      2. Montrez le dashboard avec les statistiques');
    console.log('      3. Utilisez une fonctionnalité (analyse bulletin)');
    console.log('      4. Montrez la mise à jour des statistiques');
    console.log('      5. Explorez l\'historique des activités');

    console.log('\n   🔄 Scénario 3 - Déconnexion:');
    console.log('      1. Depuis un compte connecté, cliquez sur le menu utilisateur');
    console.log('      2. Montrez les informations du profil');
    console.log('      3. Cliquez sur "Déconnexion"');
    console.log('      4. Montrez la confirmation de déconnexion');
    console.log('      5. Confirmez et montrez le retour à l\'état non connecté');

    // 5. URLs importantes
    console.log('\n5. 🌐 URLs importantes pour la démo:');
    console.log(`      - Accueil: http://localhost:3002`);
    console.log(`      - Connexion: http://localhost:3002/auth/login`);
    console.log(`      - Dashboard: http://localhost:3002/dashboard`);
    console.log(`      - Analyse bulletin: http://localhost:3002/analyse-bulletin`);
    console.log(`      - Analyse salariale: http://localhost:3002/analyse-salariale`);
    console.log(`      - Coaching: http://localhost:3002/coaching-carriere`);

    console.log('\n✅ Configuration de la démonstration terminée !');
    console.log('\n🎯 Points clés à démontrer:');
    console.log('   ✅ Protection des fonctionnalités par authentification');
    console.log('   ✅ Expérience utilisateur fluide');
    console.log('   ✅ Données personnalisées par utilisateur');
    console.log('   ✅ Interface moderne et responsive');
    console.log('   ✅ Déconnexion sécurisée');

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.response?.data || error.message);
  }
}

// Exécuter la configuration
setupDemo();
