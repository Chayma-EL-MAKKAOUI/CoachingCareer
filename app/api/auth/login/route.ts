import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import database from '../../../../lib/database';
import { generateToken } from '../../../../lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation des données
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Rechercher l'utilisateur par email
    const user = await database.getUserByEmail(email.toLowerCase().trim());
    if (!user) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Créer l'objet utilisateur sans le mot de passe
    const userWithoutPassword = {
      id: user.id!,
      name: user.name,
      email: user.email,
      created_at: user.created_at!,
      updated_at: user.updated_at!
    };

    // Générer le token JWT
    const token = generateToken(userWithoutPassword);

    // Retourner la réponse avec l'utilisateur et le token
    return NextResponse.json({
      success: true,
      message: 'Connexion réussie',
      user: {
        id: userWithoutPassword.id,
        name: userWithoutPassword.name,
        email: userWithoutPassword.email,
        isLoggedIn: true
      },
      token
    }, { status: 200 });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
