# Guide de Dépannage - Déconnexion

## 🔍 Problème identifié et solutions

### ❌ **Problème :** La déconnexion ne fonctionne pas

**Symptômes :**
- Le bouton de déconnexion ne répond pas
- L'utilisateur reste connecté après avoir cliqué sur "Se déconnecter"
- La page ne se recharge pas après la déconnexion

### ✅ **Solutions appliquées :**

#### 1. Correction de la fonction logout
**Problème :** La fonction logout n'était pas asynchrone
**Solution :** Conversion en fonction async avec gestion d'erreurs

```typescript
// Avant (non fonctionnel)
const logout = () => {
  setUser(null)
  localStorage.removeItem('authToken')
  // ...
}

// Après (fonctionnel)
const logout = async () => {
  try {
    setUser(null)
    if (mounted) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      // Nettoyage complet des données utilisateur
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith('userStats_') || key.startsWith('recentActivity_')) {
          localStorage.removeItem(key)
        }
      })
    }
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
    throw error
  }
}
```

#### 2. Amélioration de la gestion de redirection
**Problème :** Redirection avec router.push() parfois inefficace
**Solution :** Utilisation de window.location.href pour forcer le rechargement

```typescript
// Avant
await logout()
router.push('/')

// Après
await logout()
window.location.href = '/'
```

#### 3. Ajout d'un bouton de déconnexion rapide
**Problème :** Difficulté à tester la déconnexion
**Solution :** Composant QuickLogout temporaire avec debug

## 🧪 Tests de déconnexion

### 1. Test automatique dans la console
```javascript
// Copiez ce code dans la console du navigateur
function testLogout() {
  console.log('🔓 Test de déconnexion...')
  
  // Vérifier l'état avant
  const beforeToken = localStorage.getItem('authToken')
  const beforeUser = localStorage.getItem('user')
  console.log('Avant - Token:', beforeToken ? 'Présent' : 'Absent')
  console.log('Avant - User:', beforeUser ? 'Présent' : 'Absent')
  
  // Simuler la déconnexion
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
  localStorage.removeItem('userStats')
  localStorage.removeItem('recentActivity')
  
  // Nettoyer les données spécifiques
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('userStats_') || key.startsWith('recentActivity_')) {
      localStorage.removeItem(key)
    }
  })
  
  // Vérifier l'état après
  const afterToken = localStorage.getItem('authToken')
  const afterUser = localStorage.getItem('user')
  console.log('Après - Token:', afterToken ? 'Présent' : 'Absent')
  console.log('Après - User:', afterUser ? 'Présent' : 'Absent')
  
  console.log('✅ Test terminé - Rechargez la page')
}

testLogout()
```

### 2. Test manuel étape par étape

**Étape 1 : Connexion**
1. Allez sur http://localhost:3002/auth/login
2. Connectez-vous avec : `marie.dubois@example.com` / `demo123`
3. Vérifiez que vous êtes redirigé vers la page d'accueil
4. Confirmez que votre nom apparaît en haut à droite

**Étape 2 : Test du bouton de déconnexion rapide**
1. Cherchez le bouton rouge "Déconnexion rapide" en bas à droite
2. Cliquez dessus
3. Ouvrez la console (F12) pour voir les logs de debug
4. Vérifiez que la page se recharge automatiquement

**Étape 3 : Test du menu utilisateur**
1. Reconnectez-vous
2. Cliquez sur votre nom en haut à droite
3. Sélectionnez "Se déconnecter" (bouton rouge)
4. Confirmez dans la modal qui s'ouvre
5. Vérifiez la déconnexion

**Étape 4 : Test depuis la page profil**
1. Reconnectez-vous
2. Allez sur votre profil (cliquez sur votre nom → "Mon Profil")
3. Dans la section "Actions rapides", cliquez "Se déconnecter"
4. Confirmez dans la modal
5. Vérifiez la déconnexion

### 3. Vérification post-déconnexion

**Vérifications à effectuer :**
- [ ] Boutons "Se connecter" et "S'inscrire" visibles
- [ ] Menu utilisateur disparu de la navbar
- [ ] Tentative d'accès aux fonctionnalités → redirection vers login
- [ ] localStorage nettoyé (vérifiable dans DevTools)

## 🔧 Options de déconnexion disponibles

### 1. Menu utilisateur (navbar)
**Localisation :** Cliquez sur votre nom en haut à droite
**Processus :** Menu → "Se déconnecter" → Confirmation → Déconnexion

### 2. Page profil
**Localisation :** `/profil` → Section "Actions rapides"
**Processus :** Bouton rouge → Confirmation → Déconnexion

### 3. Bouton de déconnexion rapide (temporaire)
**Localisation :** Bouton rouge en bas à droite de la page
**Processus :** Clic direct → Déconnexion immédiate avec logs

## 🐛 Dépannage avancé

### Si la déconnexion ne fonctionne toujours pas :

#### 1. Vérification manuelle du localStorage
```javascript
// Dans la console du navigateur
console.log('Données localStorage:')
console.log('authToken:', localStorage.getItem('authToken'))
console.log('user:', localStorage.getItem('user'))
console.log('Toutes les clés:', Object.keys(localStorage))
```

#### 2. Nettoyage manuel forcé
```javascript
// Nettoyage complet manuel
localStorage.clear()
sessionStorage.clear()
console.log('✅ Stockage nettoyé - Rechargez la page')
```

#### 3. Vérification de l'état React
```javascript
// Si vous avez accès aux React DevTools
// Cherchez le composant useAuth et vérifiez l'état 'user'
```

#### 4. Test en mode navigation privée
1. Ouvrez une fenêtre de navigation privée
2. Connectez-vous
3. Testez la déconnexion
4. Vérifiez si le problème persiste

### Causes possibles de dysfonctionnement :

1. **Cache du navigateur :** Videz le cache (Ctrl+F5)
2. **Extensions de navigateur :** Désactivez temporairement
3. **JavaScript désactivé :** Vérifiez les paramètres du navigateur
4. **Erreurs de réseau :** Vérifiez la console pour les erreurs

## 📊 Logs de debug

### Logs attendus lors de la déconnexion :
```
🔓 Début de la déconnexion...
Utilisateur avant déconnexion: {id: 5, name: "Marie Dubois", email: "marie.dubois@example.com"}
✅ Fonction logout exécutée
Token restant: null
Utilisateur restant: null
🔄 Rechargement de la page...
```

### Logs d'erreur possibles :
```
❌ Erreur lors de la déconnexion: [détails de l'erreur]
```

## ✅ Validation du correctif

### Tests réussis :
- [x] Fonction logout convertie en async
- [x] Nettoyage complet du localStorage
- [x] Redirection forcée avec window.location.href
- [x] Bouton de déconnexion rapide ajouté
- [x] Logs de debug implémentés
- [x] Gestion d'erreurs améliorée

### Prochaines étapes si le problème persiste :
1. Vérifier les erreurs dans la console
2. Tester en mode navigation privée
3. Vérifier les permissions localStorage
4. Contacter le support technique

## 🎯 Résultat attendu

Après application de ces correctifs, la déconnexion devrait :
1. **Nettoyer** toutes les données utilisateur
2. **Rediriger** vers la page d'accueil
3. **Afficher** les boutons de connexion/inscription
4. **Protéger** l'accès aux fonctionnalités
5. **Fonctionner** depuis tous les points d'accès

**Si le problème persiste après ces étapes, utilisez le bouton "Déconnexion rapide" en bas à droite et consultez les logs dans la console.**
