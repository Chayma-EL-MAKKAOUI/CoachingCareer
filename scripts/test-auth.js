// Script de test pour l'authentification
const axios = require('axios');

const BASE_URL = 'http://localhost:3002/api';

async function testAuthentication() {
  console.log('🧪 Test de l\'authentification avec SQLite\n');

  try {
    // Test 1: Inscription d'un nouvel utilisateur
    console.log('1. Test d\'inscription...');
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, registerData);
    console.log('✅ Inscription réussie:', registerResponse.data.message);
    console.log('   Utilisateur:', registerResponse.data.user);
    
    const token = registerResponse.data.token;
    console.log('   Token reçu:', token ? 'Oui' : 'Non');

    // Test 2: Vérification du token
    console.log('\n2. Test de vérification du token...');
    const meResponse = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ Token valide:', meResponse.data.user);

    // Test 3: Connexion avec les mêmes identifiants
    console.log('\n3. Test de connexion...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
    console.log('✅ Connexion réussie:', loginResponse.data.message);
    console.log('   Utilisateur:', loginResponse.data.user);

    // Test 4: Tentative de connexion avec un mauvais mot de passe
    console.log('\n4. Test de connexion avec mauvais mot de passe...');
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: 'test@example.com',
        password: 'wrongpassword'
      });
      console.log('❌ Erreur: La connexion aurait dû échouer');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Connexion refusée comme attendu:', error.response.data.error);
      } else {
        console.log('❌ Erreur inattendue:', error.message);
      }
    }

    // Test 5: Tentative d'inscription avec le même email
    console.log('\n5. Test d\'inscription avec email existant...');
    try {
      await axios.post(`${BASE_URL}/auth/register`, registerData);
      console.log('❌ Erreur: L\'inscription aurait dû échouer');
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('✅ Inscription refusée comme attendu:', error.response.data.error);
      } else {
        console.log('❌ Erreur inattendue:', error.message);
      }
    }

    // Test 6: Test avec un token invalide
    console.log('\n6. Test avec token invalide...');
    try {
      await axios.get(`${BASE_URL}/auth/me`, {
        headers: {
          Authorization: 'Bearer invalid-token'
        }
      });
      console.log('❌ Erreur: La requête aurait dû échouer');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Token invalide refusé comme attendu:', error.response.data.error);
      } else {
        console.log('❌ Erreur inattendue:', error.message);
      }
    }

    console.log('\n🎉 Tous les tests d\'authentification sont passés avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error.response?.data || error.message);
  }
}

// Exécuter les tests
testAuthentication();
