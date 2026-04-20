import { Badge, Module } from '../types';
import { BADGES, MODULES } from '../constants';

const BADGES_KEY = 'cs_hub_badges';
const COMPLETED_CHALLENGES_KEY = 'cs_hub_completed_challenges';

export const getStoredBadges = (): Badge[] => {
  const stored = localStorage.getItem(BADGES_KEY);
  if (!stored) {
    return BADGES.map(b => ({ ...b, unlocked: false }));
  }
  
  const unlockedIds = JSON.parse(stored) as string[];
  return BADGES.map(b => ({
    ...b,
    unlocked: unlockedIds.includes(b.id)
  }));
};

export const unlockBadge = (id: string) => {
  const current = localStorage.getItem(BADGES_KEY);
  const unlockedIds = current ? JSON.parse(current) as string[] : [];
  
  if (!unlockedIds.includes(id)) {
    unlockedIds.push(id);
    localStorage.setItem(BADGES_KEY, JSON.stringify(unlockedIds));
  }
};

export const getCompletedChallenges = (moduleId: string): string[] => {
  const stored = localStorage.getItem(`${COMPLETED_CHALLENGES_KEY}_${moduleId}`);
  return stored ? JSON.parse(stored) : [];
};

export const saveCompletedChallenge = (moduleId: string, challengeId: string) => {
  const current = getCompletedChallenges(moduleId);
  if (!current.includes(challengeId)) {
    current.push(challengeId);
    localStorage.setItem(`${COMPLETED_CHALLENGES_KEY}_${moduleId}`, JSON.stringify(current));
  }
};

export const getDynamicModules = (): Module[] => {
  const badges = getStoredBadges();
  
  return MODULES.map((module, index) => {
    const completed = getCompletedChallenges(module.id);
    const totalChallenges = module.content?.challenges.length || 0;
    const mastery = totalChallenges > 0 ? Math.round((completed.length / totalChallenges) * 100) : 0;
    
    // Logic for locking:
    // First module is always unlocked. 
    // Subsequent modules unlock if previous module is mastered (100% completion)
    let locked = true;
    if (index === 0) {
      locked = false;
    } else {
      const prevModule = MODULES[index - 1];
      const prevCompleted = getCompletedChallenges(prevModule.id);
      const prevTotal = prevModule.content?.challenges.length || 0;
      const isPrevMastered = prevTotal > 0 && prevCompleted.length === prevTotal;
      locked = !isPrevMastered;
    }

    return {
      ...module,
      mastery,
      locked
    };
  });
};
