import jwt from 'jsonwebtoken';
import { UserWithoutPassword } from './database';

// Clé secrète pour signer les tokens JWT
// En production, cette clé devrait être dans les variables d'environnement
const JWT_SECRET = process.env.JWT_SECRET || 'coaching-career-secret-key-2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  userId: number;
  email: string;
  name: string;
}

/**
 * Génère un token JWT pour un utilisateur
 */
export function generateToken(user: UserWithoutPassword): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    name: user.name
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'coaching-career',
    subject: user.id.toString()
  });
}

/**
 * Vérifie et décode un token JWT
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return null;
  }
}

/**
 * Extrait le token du header Authorization
 */
export function extractTokenFromHeader(authHeader: string | undefined): string | null {
  if (!authHeader) {
    return null;
  }

  // Format attendu: "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}

/**
 * Génère un token de rafraîchissement (optionnel pour une implémentation future)
 */
export function generateRefreshToken(user: UserWithoutPassword): string {
  const payload = {
    userId: user.id,
    type: 'refresh'
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '30d',
    issuer: 'coaching-career',
    subject: user.id.toString()
  });
}
