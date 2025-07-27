// Script pour examiner la structure de la base de données
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(process.cwd(), 'data', 'coaching_career.db');

async function checkDatabaseStructure() {
  console.log('🔍 Examen de la structure de la base de données\n');
  
  try {
    // Vérifier si le fichier de base de données existe
    if (!fs.existsSync(DB_PATH)) {
      console.log('❌ Fichier de base de données non trouvé:', DB_PATH);
      console.log('   La base de données sera créée au premier démarrage de l\'application');
      return;
    }

    console.log('✅ Fichier de base de données trouvé:', DB_PATH);
    console.log(`📊 Taille du fichier: ${(fs.statSync(DB_PATH).size / 1024).toFixed(2)} KB\n`);

    // Ouvrir la connexion à la base de données
    const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        console.error('❌ Erreur lors de l\'ouverture de la base de données:', err.message);
        return;
      }
      console.log('✅ Connexion à la base de données établie\n');
    });

    // Fonction pour exécuter une requête et retourner une promesse
    const runQuery = (query, params = []) => {
      return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    };

    // 1. Lister toutes les tables
    console.log('📋 Tables dans la base de données:');
    const tables = await runQuery(`
      SELECT name, type, sql 
      FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `);

    if (tables.length === 0) {
      console.log('   Aucune table trouvée');
    } else {
      tables.forEach((table, index) => {
        console.log(`   ${index + 1}. ${table.name} (${table.type})`);
      });
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // 2. Examiner chaque table en détail
    for (const table of tables) {
      console.log(`📊 Structure de la table "${table.name}":`);
      console.log('─'.repeat(40));
      
      // Afficher le SQL de création
      console.log('🔧 SQL de création:');
      console.log(table.sql);
      console.log('');

      // Obtenir les informations sur les colonnes
      const columns = await runQuery(`PRAGMA table_info(${table.name})`);
      
      console.log('📝 Colonnes:');
      columns.forEach(col => {
        const nullable = col.notnull ? 'NOT NULL' : 'NULL';
        const defaultVal = col.dflt_value ? ` DEFAULT ${col.dflt_value}` : '';
        const primaryKey = col.pk ? ' (PRIMARY KEY)' : '';
        console.log(`   - ${col.name}: ${col.type} ${nullable}${defaultVal}${primaryKey}`);
      });

      // Compter les enregistrements
      const countResult = await runQuery(`SELECT COUNT(*) as count FROM ${table.name}`);
      const recordCount = countResult[0].count;
      console.log(`\n📊 Nombre d'enregistrements: ${recordCount}`);

      // Si c'est la table users, afficher quelques exemples (sans mots de passe)
      if (table.name === 'users' && recordCount > 0) {
        console.log('\n👥 Exemples d\'utilisateurs:');
        const users = await runQuery(`
          SELECT id, name, email, created_at, updated_at 
          FROM users 
          ORDER BY created_at DESC 
          LIMIT 5
        `);
        
        users.forEach((user, index) => {
          console.log(`   ${index + 1}. ID: ${user.id} | ${user.name} (${user.email})`);
          console.log(`      Créé: ${user.created_at} | Modifié: ${user.updated_at}`);
        });
      }

      console.log('\n' + '='.repeat(60) + '\n');
    }

    // 3. Vérifier les index
    console.log('🔍 Index dans la base de données:');
    const indexes = await runQuery(`
      SELECT name, tbl_name, sql 
      FROM sqlite_master 
      WHERE type='index' AND name NOT LIKE 'sqlite_%'
      ORDER BY tbl_name, name
    `);

    if (indexes.length === 0) {
      console.log('   Aucun index personnalisé trouvé');
    } else {
      indexes.forEach((index, i) => {
        console.log(`   ${i + 1}. ${index.name} sur ${index.tbl_name}`);
        if (index.sql) {
          console.log(`      SQL: ${index.sql}`);
        }
      });
    }

    // 4. Statistiques générales
    console.log('\n📈 Statistiques générales:');
    console.log(`   - Nombre de tables: ${tables.length}`);
    console.log(`   - Nombre d'index: ${indexes.length}`);
    
    // Taille totale des données
    let totalRecords = 0;
    for (const table of tables) {
      const countResult = await runQuery(`SELECT COUNT(*) as count FROM ${table.name}`);
      totalRecords += countResult[0].count;
    }
    console.log(`   - Total d'enregistrements: ${totalRecords}`);

    // 5. Vérifications de cohérence
    console.log('\n🔍 Vérifications de cohérence:');
    
    // Vérifier les contraintes UNIQUE
    if (tables.some(t => t.name === 'users')) {
      const duplicateEmails = await runQuery(`
        SELECT email, COUNT(*) as count 
        FROM users 
        GROUP BY email 
        HAVING COUNT(*) > 1
      `);
      
      if (duplicateEmails.length === 0) {
        console.log('   ✅ Pas de doublons d\'email dans la table users');
      } else {
        console.log('   ⚠️  Doublons d\'email détectés:');
        duplicateEmails.forEach(dup => {
          console.log(`      - ${dup.email}: ${dup.count} occurrences`);
        });
      }
    }

    // Fermer la connexion
    db.close((err) => {
      if (err) {
        console.error('❌ Erreur lors de la fermeture:', err.message);
      } else {
        console.log('\n✅ Connexion fermée');
      }
    });

    console.log('\n🎯 Résumé:');
    console.log('   La base de données utilise SQLite3');
    console.log('   Structure simple avec authentification basique');
    console.log('   Prête pour l\'extension avec de nouvelles tables');

  } catch (error) {
    console.error('❌ Erreur lors de l\'examen de la base de données:', error);
  }
}

// Fonction pour suggérer des améliorations
function suggestImprovements() {
  console.log('\n💡 Suggestions d\'améliorations:');
  console.log('   1. Ajouter une table "analyses" pour stocker les résultats');
  console.log('   2. Créer une table "user_sessions" pour gérer les sessions');
  console.log('   3. Ajouter une table "user_preferences" pour les paramètres');
  console.log('   4. Implémenter une table "audit_log" pour tracer les actions');
  console.log('   5. Créer des index sur les colonnes fréquemment recherchées');
  
  console.log('\n📋 Tables suggérées pour l\'avenir:');
  console.log(`
  -- Table pour stocker les analyses
  CREATE TABLE analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'bulletin', 'salary', 'coaching'
    data TEXT NOT NULL, -- JSON des données d'analyse
    result TEXT, -- JSON du résultat
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Table pour les préférences utilisateur
  CREATE TABLE user_preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    theme TEXT DEFAULT 'light',
    language TEXT DEFAULT 'fr',
    notifications BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Table pour l'audit
  CREATE TABLE audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
  `);
}

// Exécuter l'analyse
console.log('🚀 Démarrage de l\'analyse de la base de données...\n');
checkDatabaseStructure().then(() => {
  suggestImprovements();
}).catch(error => {
  console.error('❌ Erreur fatale:', error);
});
