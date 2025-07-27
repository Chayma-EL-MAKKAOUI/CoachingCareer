// Script pour tester les améliorations de l'interface utilisateur
console.log('🎨 Test des améliorations de l\'interface utilisateur\n');

// Fonction pour tester le dark mode
function testDarkMode() {
  console.log('🌙 Test du mode sombre...');
  
  // Vérifier si le thème est disponible
  const themeToggle = document.querySelector('[data-theme-toggle]') || 
                     document.querySelector('button[class*="theme"]') ||
                     document.querySelector('button[class*="dark"]');
  
  if (themeToggle) {
    console.log('✅ Bouton de thème trouvé');
    
    // Tester le changement de thème
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    console.log(`   Thème actuel: ${currentTheme}`);
    
    // Simuler un clic sur le bouton de thème
    themeToggle.click();
    
    setTimeout(() => {
      const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      console.log(`   Nouveau thème: ${newTheme}`);
      
      if (currentTheme !== newTheme) {
        console.log('✅ Changement de thème fonctionnel');
      } else {
        console.log('⚠️  Changement de thème non détecté');
      }
      
      // Remettre le thème original
      themeToggle.click();
    }, 500);
  } else {
    console.log('❌ Bouton de thème non trouvé');
  }
}

// Fonction pour tester le menu utilisateur
function testUserMenu() {
  console.log('\n👤 Test du menu utilisateur...');
  
  // Chercher le bouton du menu utilisateur
  const userButton = document.querySelector('button[class*="user"]') ||
                    document.querySelector('button:has(svg)') ||
                    document.querySelector('[role="button"]:has(.rounded-full)');
  
  if (userButton) {
    console.log('✅ Bouton utilisateur trouvé');
    
    // Vérifier la présence de la flèche indicatrice
    const arrow = userButton.querySelector('svg[viewBox="0 0 24 24"]');
    if (arrow) {
      console.log('✅ Flèche indicatrice présente');
    } else {
      console.log('⚠️  Flèche indicatrice manquante');
    }
    
    // Simuler un clic pour ouvrir le menu
    userButton.click();
    
    setTimeout(() => {
      // Chercher le menu déroulant
      const dropdown = document.querySelector('[class*="absolute"][class*="right-0"]') ||
                      document.querySelector('.dropdown-menu') ||
                      document.querySelector('[role="menu"]');
      
      if (dropdown) {
        console.log('✅ Menu déroulant ouvert');
        
        // Chercher l'option de déconnexion
        const logoutButton = Array.from(dropdown.querySelectorAll('button, a'))
          .find(el => el.textContent.toLowerCase().includes('déconnect') || 
                     el.textContent.toLowerCase().includes('logout'));
        
        if (logoutButton) {
          console.log('✅ Option de déconnexion trouvée');
          console.log(`   Texte: "${logoutButton.textContent.trim()}"`);
          
          // Vérifier le style (rouge)
          const style = window.getComputedStyle(logoutButton);
          const color = style.color;
          if (color.includes('rgb(220, 38, 38)') || color.includes('red') || 
              logoutButton.className.includes('red')) {
            console.log('✅ Style rouge appliqué');
          } else {
            console.log('⚠️  Style rouge non détecté');
          }
        } else {
          console.log('❌ Option de déconnexion non trouvée');
        }
        
        // Fermer le menu en cliquant ailleurs
        document.body.click();
      } else {
        console.log('❌ Menu déroulant non ouvert');
      }
    }, 300);
  } else {
    console.log('❌ Bouton utilisateur non trouvé');
    console.log('   Vérifiez que vous êtes connecté');
  }
}

// Fonction pour tester la navbar en mode sombre
function testNavbarDarkMode() {
  console.log('\n🌙 Test de la navbar en mode sombre...');
  
  const navbar = document.querySelector('nav');
  if (navbar) {
    console.log('✅ Navbar trouvée');
    
    // Forcer le mode sombre temporairement
    document.documentElement.classList.add('dark');
    
    setTimeout(() => {
      const navbarStyle = window.getComputedStyle(navbar);
      const backgroundColor = navbarStyle.backgroundColor;
      
      console.log(`   Couleur de fond: ${backgroundColor}`);
      
      // Vérifier si la couleur est sombre
      if (backgroundColor.includes('rgba') && backgroundColor.includes('0.8')) {
        console.log('✅ Mode sombre appliqué à la navbar');
      } else {
        console.log('⚠️  Mode sombre non détecté sur la navbar');
      }
      
      // Remettre le mode original
      document.documentElement.classList.remove('dark');
    }, 200);
  } else {
    console.log('❌ Navbar non trouvée');
  }
}

// Fonction pour vérifier l'absence du message "Connecté en tant que"
function testRemovedMessage() {
  console.log('\n🚫 Test de suppression du message "Connecté en tant que"...');
  
  const messageElements = Array.from(document.querySelectorAll('*'))
    .filter(el => el.textContent && el.textContent.includes('Connecté en tant que'));
  
  if (messageElements.length === 0) {
    console.log('✅ Message "Connecté en tant que" supprimé');
  } else {
    console.log('⚠️  Message "Connecté en tant que" encore présent');
    messageElements.forEach((el, index) => {
      console.log(`   ${index + 1}. "${el.textContent.trim()}"`);
    });
  }
}

// Fonction principale de test
function runUITests() {
  console.log('🚀 Démarrage des tests d\'interface utilisateur...\n');
  
  // Attendre que la page soit chargée
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(runTests, 1000);
    });
  } else {
    setTimeout(runTests, 1000);
  }
}

function runTests() {
  testRemovedMessage();
  testNavbarDarkMode();
  testDarkMode();
  testUserMenu();
  
  console.log('\n📋 Résumé des tests:');
  console.log('   1. ✅ Suppression du message redondant');
  console.log('   2. 🌙 Support du mode sombre pour la navbar');
  console.log('   3. 👤 Amélioration du menu utilisateur');
  console.log('   4. 🚪 Option de déconnexion visible');
  
  console.log('\n🎯 Instructions manuelles:');
  console.log('   1. Testez le changement de thème (bouton en bas à droite)');
  console.log('   2. Cliquez sur votre nom en haut à droite');
  console.log('   3. Vérifiez la présence de "Se déconnecter" en rouge');
  console.log('   4. Testez la confirmation de déconnexion');
  
  console.log('\n✅ Tests d\'interface terminés !');
}

// Exporter les fonctions pour utilisation manuelle
window.testUIImprovements = {
  runAll: runUITests,
  testDarkMode,
  testUserMenu,
  testNavbarDarkMode,
  testRemovedMessage
};

// Lancer automatiquement si le script est exécuté
if (typeof window !== 'undefined') {
  runUITests();
} else {
  console.log('📝 Script de test d\'interface utilisateur prêt');
  console.log('   Copiez ce code dans la console du navigateur pour l\'exécuter');
  console.log('   Ou utilisez: window.testUIImprovements.runAll()');
}
