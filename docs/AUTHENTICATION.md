# Configuration de l'Authentification avec SQLite

## Vue d'ensemble

L'application CoachingCareer utilise maintenant un système d'authentification robuste basé sur SQLite et JWT (JSON Web Tokens). Cette configuration remplace le système précédent basé uniquement sur localStorage.

## Architecture

### Base de données SQLite
- **Fichier**: `data/coaching_career.db`
- **Table users**: Stocke les informations des utilisateurs avec mots de passe hashés
- **Champs**: id, name, email, password (hashé), created_at, updated_at

### Sécurité
- **Hachage des mots de passe**: bcryptjs avec 12 rounds de salt
- **Tokens JWT**: Signés avec une clé secrète, expiration de 7 jours
- **Validation**: Vérification des tokens à chaque requête protégée

## Fichiers principaux

### Configuration de base de données
- `lib/database.ts`: Gestion de la connexion SQLite et opérations CRUD
- `lib/jwt.ts`: Utilitaires pour la génération et vérification des tokens JWT
- `lib/auth-middleware.ts`: Middleware d'authentification pour les routes API

### Routes API
- `app/api/auth/register/route.ts`: Inscription des nouveaux utilisateurs
- `app/api/auth/login/route.ts`: Connexion des utilisateurs existants
- `app/api/auth/me/route.ts`: Vérification du token et récupération du profil

### Frontend
- `lib/useAuth.ts`: Hook React pour la gestion de l'authentification
- `lib/api.ts`: Client API avec intercepteurs pour l'authentification automatique

## Variables d'environnement

Créez un fichier `.env.local` avec :

```env
JWT_SECRET=votre-cle-secrete-super-securisee
JWT_EXPIRES_IN=7d
DB_PATH=./data/coaching_career.db
```

## Utilisation

### Inscription
```typescript
const { register } = useAuth();

const result = await register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'motdepasse123'
});

if (result.success) {
  // Utilisateur connecté automatiquement
  router.push('/dashboard');
} else {
  console.error(result.error);
}
```

### Connexion
```typescript
const { login } = useAuth();

const result = await login({
  email: 'john@example.com',
  password: 'motdepasse123'
});

if (result.success) {
  router.push('/dashboard');
} else {
  console.error(result.error);
}
```

### Déconnexion
```typescript
const { logout } = useAuth();
logout(); // Nettoie le token et redirige
```

### Protection des routes
```typescript
import ProtectedRoute from '../components/Auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Contenu protégé</div>
    </ProtectedRoute>
  );
}
```

## API Endpoints

### POST /api/auth/register
Inscription d'un nouvel utilisateur.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "motdepasse123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Compte créé avec succès",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "isLoggedIn": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /api/auth/login
Connexion d'un utilisateur existant.

**Body:**
```json
{
  "email": "john@example.com",
  "password": "motdepasse123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Connexion réussie",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "isLoggedIn": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /api/auth/me
Vérification du token et récupération du profil utilisateur.

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "isLoggedIn": true
  }
}
```

## Tests

Exécutez le script de test pour vérifier le bon fonctionnement :

```bash
node scripts/test-auth.js
```

Ce script teste :
- Inscription d'un nouvel utilisateur
- Vérification du token
- Connexion avec identifiants valides
- Rejet des identifiants invalides
- Prévention des doublons d'email
- Gestion des tokens invalides

## Migration depuis l'ancien système

L'ancien système basé sur localStorage est automatiquement remplacé. Les utilisateurs existants devront se reconnecter pour bénéficier du nouveau système sécurisé.

## Sécurité

- Les mots de passe ne sont jamais stockés en clair
- Les tokens JWT ont une durée de vie limitée
- Les routes API sont protégées par middleware
- Validation stricte des données d'entrée
- Gestion appropriée des erreurs sans exposition d'informations sensibles
