import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader, JWTPayload } from './jwt';
import database from './database';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

/**
 * Middleware d'authentification pour protéger les routes API
 */
export async function authenticateToken(request: NextRequest): Promise<{
  success: boolean;
  user?: JWTPayload;
  response?: NextResponse;
}> {
  try {
    // Extraire le token du header Authorization
    const authHeader = request.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return {
        success: false,
        response: NextResponse.json(
          { error: 'Token d\'authentification requis' },
          { status: 401 }
        )
      };
    }

    // Vérifier le token
    const payload = verifyToken(token);
    if (!payload) {
      return {
        success: false,
        response: NextResponse.json(
          { error: 'Token invalide ou expiré' },
          { status: 401 }
        )
      };
    }

    // Vérifier que l'utilisateur existe toujours dans la base de données
    const user = await database.getUserById(payload.userId);
    if (!user) {
      return {
        success: false,
        response: NextResponse.json(
          { error: 'Utilisateur non trouvé' },
          { status: 404 }
        )
      };
    }

    return {
      success: true,
      user: payload
    };

  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    
    return {
      success: false,
      response: NextResponse.json(
        { error: 'Erreur interne du serveur' },
        { status: 500 }
      )
    };
  }
}

/**
 * Wrapper pour protéger facilement les routes API
 */
export function withAuth(handler: (request: NextRequest, user: JWTPayload) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const authResult = await authenticateToken(request);
    
    if (!authResult.success) {
      return authResult.response!;
    }

    return handler(request, authResult.user!);
  };
}

/**
 * Middleware optionnel qui n'échoue pas si l'utilisateur n'est pas authentifié
 */
export async function optionalAuth(request: NextRequest): Promise<{
  user?: JWTPayload;
}> {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return {};
    }

    const payload = verifyToken(token);
    if (!payload) {
      return {};
    }

    // Vérifier que l'utilisateur existe
    const user = await database.getUserById(payload.userId);
    if (!user) {
      return {};
    }

    return { user: payload };

  } catch (error) {
    console.error('Erreur lors de l\'authentification optionnelle:', error);
    return {};
  }
}
