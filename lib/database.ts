import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

// Configuration de la base de données
const DB_PATH = path.join(process.cwd(), 'data', 'coaching_career.db');

// Interface pour l'utilisateur
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserWithoutPassword {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

class Database {
  private db: sqlite3.Database | null = null;
  private isInitialized: boolean = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.initPromise = this.init();
  }

  private async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Créer le dossier data s'il n'existe pas
        const fs = require('fs');
        const dataDir = path.dirname(DB_PATH);
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }

        // Initialiser la base de données
        this.db = new sqlite3.Database(DB_PATH, (err) => {
          if (err) {
            console.error('Erreur lors de l\'ouverture de la base de données:', err);
            reject(err);
          } else {
            console.log('Connexion à la base de données SQLite établie');
            this.createTables().then(() => {
              this.isInitialized = true;
              resolve();
            }).catch(reject);
          }
        });
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
        reject(error);
      }
    });
  }

  private createTables(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de données non initialisée'));
        return;
      }

      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `;

      this.db.run(createUsersTable, (err) => {
        if (err) {
          console.error('Erreur lors de la création de la table users:', err);
          reject(err);
        } else {
          console.log('Table users créée ou existe déjà');
          resolve();
        }
      });
    });
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized && this.initPromise) {
      await this.initPromise;
    }
    if (!this.db) {
      throw new Error('Base de données non initialisée');
    }
  }

  // Méthodes pour les utilisateurs
  async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<UserWithoutPassword> {
    await this.ensureInitialized();
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Base de données non initialisée'));
        return;
      }

      const query = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `;

      this.db.run(query, [user.name, user.email, user.password], function(err) {
        if (err) {
          reject(err);
        } else {
          // Récupérer l'utilisateur créé sans le mot de passe
          database.getUserById(this.lastID).then(resolve).catch(reject);
        }
      });
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    await this.ensureInitialized();
    return new Promise((resolve, reject) => {

      const query = 'SELECT * FROM users WHERE email = ?';
      
      this.db.get(query, [email], (err, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null);
        }
      });
    });
  }

  async getUserById(id: number): Promise<UserWithoutPassword | null> {
    await this.ensureInitialized();
    return new Promise((resolve, reject) => {

      const query = 'SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?';
      
      this.db.get(query, [id], (err, row: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null);
        }
      });
    });
  }

  async updateUser(id: number, updates: Partial<Omit<User, 'id' | 'created_at'>>): Promise<UserWithoutPassword | null> {
    await this.ensureInitialized();
    return new Promise((resolve, reject) => {

      const fields = Object.keys(updates);
      const values = Object.values(updates);
      
      if (fields.length === 0) {
        this.getUserById(id).then(resolve).catch(reject);
        return;
      }

      const setClause = fields.map(field => `${field} = ?`).join(', ');
      const query = `
        UPDATE users 
        SET ${setClause}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

      this.db.run(query, [...values, id], function(err) {
        if (err) {
          reject(err);
        } else {
          database.getUserById(id).then(resolve).catch(reject);
        }
      });
    });
  }

  async deleteUser(id: number): Promise<boolean> {
    await this.ensureInitialized();
    return new Promise((resolve, reject) => {

      const query = 'DELETE FROM users WHERE id = ?';
      
      this.db.run(query, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  // Fermer la connexion à la base de données
  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve();
        return;
      }

      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Connexion à la base de données fermée');
          resolve();
        }
      });
    });
  }
}

// Instance singleton de la base de données
const database = new Database();

export default database;
