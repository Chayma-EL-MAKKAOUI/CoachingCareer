export interface UserStats {
  totalAnalyses: number;
  bulletinAnalyses: number;
  salaryAnalyses: number;
  careerCoaching: number;
  lastUpdated: string;
}

export interface RecentActivity {
  title: string;
  date: string;
  type: 'bulletin' | 'salary' | 'coaching';
}

const DEFAULT_STATS: UserStats = {
  totalAnalyses: 0,
  bulletinAnalyses: 0,
  salaryAnalyses: 0,
  careerCoaching: 0,
  lastUpdated: new Date().toISOString()
};

/**
 * Récupère les statistiques de l'utilisateur depuis localStorage
 */
export function getUserStats(userId?: number): UserStats {
  if (typeof window === 'undefined') {
    return DEFAULT_STATS;
  }

  try {
    const key = userId ? `userStats_${userId}` : 'userStats';
    const savedStats = localStorage.getItem(key);
    
    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      return { ...DEFAULT_STATS, ...parsed };
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
  }

  return DEFAULT_STATS;
}

/**
 * Sauvegarde les statistiques de l'utilisateur dans localStorage
 */
export function saveUserStats(stats: Partial<UserStats>, userId?: number): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const key = userId ? `userStats_${userId}` : 'userStats';
    const currentStats = getUserStats(userId);
    const updatedStats: UserStats = {
      ...currentStats,
      ...stats,
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem(key, JSON.stringify(updatedStats));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des statistiques:', error);
  }
}

/**
 * Incrémente une statistique spécifique
 */
export function incrementStat(statType: keyof Omit<UserStats, 'lastUpdated'>, userId?: number): void {
  const currentStats = getUserStats(userId);
  const updatedStats = { ...currentStats };
  
  updatedStats[statType] = (updatedStats[statType] || 0) + 1;
  updatedStats.totalAnalyses = updatedStats.bulletinAnalyses + updatedStats.salaryAnalyses + updatedStats.careerCoaching;
  
  saveUserStats(updatedStats, userId);
}

/**
 * Récupère l'activité récente de l'utilisateur
 */
export function getRecentActivity(userId?: number): RecentActivity[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const key = userId ? `recentActivity_${userId}` : 'recentActivity';
    const savedActivity = localStorage.getItem(key);
    
    if (savedActivity) {
      return JSON.parse(savedActivity);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'activité récente:', error);
  }

  return [];
}

/**
 * Ajoute une nouvelle activité à l'historique
 */
export function addRecentActivity(activity: RecentActivity, userId?: number): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const key = userId ? `recentActivity_${userId}` : 'recentActivity';
    const currentActivity = getRecentActivity(userId);
    
    // Ajouter la nouvelle activité au début et limiter à 10 éléments
    const updatedActivity = [activity, ...currentActivity].slice(0, 10);
    
    localStorage.setItem(key, JSON.stringify(updatedActivity));
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'activité récente:', error);
  }
}

/**
 * Nettoie les données utilisateur lors de la déconnexion
 */
export function clearUserData(userId?: number): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (userId) {
      localStorage.removeItem(`userStats_${userId}`);
      localStorage.removeItem(`recentActivity_${userId}`);
    } else {
      localStorage.removeItem('userStats');
      localStorage.removeItem('recentActivity');
    }
  } catch (error) {
    console.error('Erreur lors du nettoyage des données utilisateur:', error);
  }
}

/**
 * Migre les anciennes données vers le nouveau format avec ID utilisateur
 */
export function migrateUserData(userId: number): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Migrer les statistiques
    const oldStats = localStorage.getItem('userStats');
    if (oldStats && !localStorage.getItem(`userStats_${userId}`)) {
      localStorage.setItem(`userStats_${userId}`, oldStats);
    }

    // Migrer l'activité récente
    const oldActivity = localStorage.getItem('recentActivity');
    if (oldActivity && !localStorage.getItem(`recentActivity_${userId}`)) {
      localStorage.setItem(`recentActivity_${userId}`, oldActivity);
    }
  } catch (error) {
    console.error('Erreur lors de la migration des données utilisateur:', error);
  }
}
