// Game data structures and constants for the Solo Leveling RPG system

export interface PlayerStats {
  strength: number;
  intelligence: number;
  dexterity: number;
  constitution: number;
  luck: number;
}

export interface Character {
  id: string;
  name: string;
  class: CharacterClass;
  level: number;
  experience: number;
  experienceToNext: number;
  stats: PlayerStats;
  avatar: string;
  totalQuests: number;
  completedToday: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  rewards: QuestRewards;
  timeEstimate: string;
  statBonus: Partial<PlayerStats>;
}

export interface QuestRewards {
  experience: number;
  statPoints: number;
}

export type CharacterClass = 'Warrior' | 'Mage' | 'Assassin' | 'Tank' | 'Support';
export type QuestCategory = 'Fitness' | 'Learning' | 'Productivity' | 'Mindfulness' | 'Social' | 'Creativity';
export type QuestDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Elite';

// Character Classes with bonuses
export const CHARACTER_CLASSES: Record<CharacterClass, {
  name: string;
  description: string;
  startingStats: PlayerStats;
  color: string;
}> = {
  Warrior: {
    name: 'Warrior',
    description: 'Masters of physical strength and endurance. Excels in fitness and strength-based challenges.',
    startingStats: { strength: 15, intelligence: 8, dexterity: 10, constitution: 12, luck: 5 },
    color: 'from-red-600 to-red-400'
  },
  Mage: {
    name: 'Mage',
    description: 'Wielders of knowledge and wisdom. Excels in learning and intellectual pursuits.',
    startingStats: { strength: 5, intelligence: 15, dexterity: 8, constitution: 10, luck: 12 },
    color: 'from-blue-600 to-blue-400'
  },
  Assassin: {
    name: 'Assassin',
    description: 'Masters of precision and agility. Excels in skill-based and creative tasks.',
    startingStats: { strength: 10, intelligence: 10, dexterity: 15, constitution: 8, luck: 7 },
    color: 'from-purple-600 to-purple-400'
  },
  Tank: {
    name: 'Tank',
    description: 'Defenders with incredible resilience. Excels in endurance and consistency.',
    startingStats: { strength: 12, intelligence: 8, dexterity: 7, constitution: 15, luck: 8 },
    color: 'from-green-600 to-green-400'
  },
  Support: {
    name: 'Support',
    description: 'Balanced individuals who help others. Excels in social and mindfulness activities.',
    startingStats: { strength: 8, intelligence: 12, dexterity: 10, constitution: 10, luck: 10 },
    color: 'from-yellow-600 to-yellow-400'
  }
};

// 100+ Self-improvement quests
export const QUEST_POOL: Quest[] = [
  // Fitness Quests (Strength & Constitution)
  {
    id: 'fitness_001',
    title: 'Push-up Power',
    description: 'Complete 30 push-ups to build upper body strength',
    category: 'Fitness',
    difficulty: 'Easy',
    rewards: { experience: 50, statPoints: 1 },
    timeEstimate: '10 minutes',
    statBonus: { strength: 1 }
  },
  {
    id: 'fitness_002',
    title: 'Morning Jog',
    description: 'Run for 20 minutes to boost cardiovascular health',
    category: 'Fitness',
    difficulty: 'Medium',
    rewards: { experience: 75, statPoints: 1 },
    timeEstimate: '25 minutes',
    statBonus: { constitution: 1 }
  },
  {
    id: 'fitness_003',
    title: 'Plank Challenge',
    description: 'Hold a plank for 2 minutes straight',
    category: 'Fitness',
    difficulty: 'Medium',
    rewards: { experience: 60, statPoints: 1 },
    timeEstimate: '5 minutes',
    statBonus: { strength: 1, constitution: 1 }
  },
  {
    id: 'fitness_004',
    title: 'Squat Session',
    description: 'Perform 50 squats with proper form',
    category: 'Fitness',
    difficulty: 'Easy',
    rewards: { experience: 45, statPoints: 1 },
    timeEstimate: '8 minutes',
    statBonus: { strength: 1 }
  },
  {
    id: 'fitness_005',
    title: 'Yoga Flow',
    description: 'Complete a 15-minute yoga session',
    category: 'Fitness',
    difficulty: 'Easy',
    rewards: { experience: 55, statPoints: 1 },
    timeEstimate: '15 minutes',
    statBonus: { dexterity: 1, constitution: 1 }
  },
  
  // Learning Quests (Intelligence)
  {
    id: 'learning_001',
    title: 'Knowledge Seeker',
    description: 'Read 20 pages of a non-fiction book',
    category: 'Learning',
    difficulty: 'Easy',
    rewards: { experience: 65, statPoints: 1 },
    timeEstimate: '30 minutes',
    statBonus: { intelligence: 2 }
  },
  {
    id: 'learning_002',
    title: 'Code Warrior',
    description: 'Complete a coding tutorial or practice problem',
    category: 'Learning',
    difficulty: 'Medium',
    rewards: { experience: 80, statPoints: 1 },
    timeEstimate: '45 minutes',
    statBonus: { intelligence: 1, dexterity: 1 }
  },
  {
    id: 'learning_003',
    title: 'Language Quest',
    description: 'Practice a foreign language for 20 minutes',
    category: 'Learning',
    difficulty: 'Easy',
    rewards: { experience: 60, statPoints: 1 },
    timeEstimate: '20 minutes',
    statBonus: { intelligence: 1, luck: 1 }
  },
  {
    id: 'learning_004',
    title: 'Documentary Deep Dive',
    description: 'Watch an educational documentary and take notes',
    category: 'Learning',
    difficulty: 'Medium',
    rewards: { experience: 70, statPoints: 1 },
    timeEstimate: '60 minutes',
    statBonus: { intelligence: 2 }
  },
  {
    id: 'learning_005',
    title: 'Skill Building',
    description: 'Practice a musical instrument for 30 minutes',
    category: 'Learning',
    difficulty: 'Medium',
    rewards: { experience: 75, statPoints: 1 },
    timeEstimate: '30 minutes',
    statBonus: { intelligence: 1, dexterity: 1 }
  },
  
  // Productivity Quests (Dexterity & Intelligence)
  {
    id: 'productivity_001',
    title: 'Workspace Optimization',
    description: 'Clean and organize your workspace completely',
    category: 'Productivity',
    difficulty: 'Easy',
    rewards: { experience: 55, statPoints: 1 },
    timeEstimate: '20 minutes',
    statBonus: { dexterity: 1, intelligence: 1 }
  },
  {
    id: 'productivity_002',
    title: 'Task Master',
    description: 'Complete all items on your to-do list for today',
    category: 'Productivity',
    difficulty: 'Hard',
    rewards: { experience: 100, statPoints: 2 },
    timeEstimate: 'Full day',
    statBonus: { dexterity: 2, intelligence: 1 }
  },
  {
    id: 'productivity_003',
    title: 'Digital Detox',
    description: 'Avoid social media for 3 hours straight',
    category: 'Productivity',
    difficulty: 'Medium',
    rewards: { experience: 80, statPoints: 1 },
    timeEstimate: '3 hours',
    statBonus: { constitution: 1, intelligence: 1 }
  },
  {
    id: 'productivity_004',
    title: 'Email Zero',
    description: 'Clear your email inbox completely',
    category: 'Productivity',
    difficulty: 'Medium',
    rewards: { experience: 65, statPoints: 1 },
    timeEstimate: '30 minutes',
    statBonus: { dexterity: 1 }
  },
  {
    id: 'productivity_005',
    title: 'Budget Tracker',
    description: 'Update and review your financial budget',
    category: 'Productivity',
    difficulty: 'Easy',
    rewards: { experience: 60, statPoints: 1 },
    timeEstimate: '25 minutes',
    statBonus: { intelligence: 1, luck: 1 }
  },
  
  // Mindfulness Quests (Constitution & Luck)
  {
    id: 'mindfulness_001',
    title: 'Meditation Master',
    description: 'Meditate for 15 minutes in silence',
    category: 'Mindfulness',
    difficulty: 'Easy',
    rewards: { experience: 70, statPoints: 1 },
    timeEstimate: '15 minutes',
    statBonus: { constitution: 1, luck: 1 }
  },
  {
    id: 'mindfulness_002',
    title: 'Gratitude Journal',
    description: 'Write down 5 things you\'re grateful for today',
    category: 'Mindfulness',
    difficulty: 'Easy',
    rewards: { experience: 45, statPoints: 1 },
    timeEstimate: '10 minutes',
    statBonus: { luck: 2 }
  },
  {
    id: 'mindfulness_003',
    title: 'Nature Walk',
    description: 'Take a mindful 30-minute walk in nature',
    category: 'Mindfulness',
    difficulty: 'Easy',
    rewards: { experience: 65, statPoints: 1 },
    timeEstimate: '30 minutes',
    statBonus: { constitution: 1, luck: 1 }
  },
  {
    id: 'mindfulness_004',
    title: 'Deep Breathing',
    description: 'Practice deep breathing exercises for 10 minutes',
    category: 'Mindfulness',
    difficulty: 'Easy',
    rewards: { experience: 40, statPoints: 1 },
    timeEstimate: '10 minutes',
    statBonus: { constitution: 1 }
  },
  {
    id: 'mindfulness_005',
    title: 'Digital Sunset',
    description: 'No screens 1 hour before bedtime',
    category: 'Mindfulness',
    difficulty: 'Medium',
    rewards: { experience: 75, statPoints: 1 },
    timeEstimate: '1 hour',
    statBonus: { constitution: 1, luck: 1 }
  },
  
  // Social Quests (Luck & Intelligence)
  {
    id: 'social_001',
    title: 'Connection Builder',
    description: 'Have a meaningful conversation with someone new',
    category: 'Social',
    difficulty: 'Medium',
    rewards: { experience: 85, statPoints: 1 },
    timeEstimate: '20 minutes',
    statBonus: { luck: 1, intelligence: 1 }
  },
  {
    id: 'social_002',
    title: 'Family Bond',
    description: 'Call a family member or old friend',
    category: 'Social',
    difficulty: 'Easy',
    rewards: { experience: 50, statPoints: 1 },
    timeEstimate: '15 minutes',
    statBonus: { luck: 1 }
  },
  {
    id: 'social_003',
    title: 'Helper\'s High',
    description: 'Help someone with a task or problem',
    category: 'Social',
    difficulty: 'Medium',
    rewards: { experience: 90, statPoints: 1 },
    timeEstimate: '30 minutes',
    statBonus: { luck: 2, intelligence: 1 }
  },
  {
    id: 'social_004',
    title: 'Community Warrior',
    description: 'Volunteer or contribute to your community',
    category: 'Social',
    difficulty: 'Hard',
    rewards: { experience: 120, statPoints: 2 },
    timeEstimate: '2 hours',
    statBonus: { luck: 2, constitution: 1 }
  },
  {
    id: 'social_005',
    title: 'Compliment Giver',
    description: 'Give 3 genuine compliments to different people',
    category: 'Social',
    difficulty: 'Easy',
    rewards: { experience: 55, statPoints: 1 },
    timeEstimate: 'Throughout day',
    statBonus: { luck: 1 }
  },
  
  // Creativity Quests (Dexterity & Intelligence)
  {
    id: 'creativity_001',
    title: 'Art Expression',
    description: 'Draw, paint, or create art for 30 minutes',
    category: 'Creativity',
    difficulty: 'Easy',
    rewards: { experience: 70, statPoints: 1 },
    timeEstimate: '30 minutes',
    statBonus: { dexterity: 1, intelligence: 1 }
  },
  {
    id: 'creativity_002',
    title: 'Writer\'s Quest',
    description: 'Write 500 words creatively (story, poem, journal)',
    category: 'Creativity',
    difficulty: 'Medium',
    rewards: { experience: 80, statPoints: 1 },
    timeEstimate: '45 minutes',
    statBonus: { dexterity: 1, intelligence: 1 }
  },
  {
    id: 'creativity_003',
    title: 'Photo Hunter',
    description: 'Take 20 creative photos with different compositions',
    category: 'Creativity',
    difficulty: 'Easy',
    rewards: { experience: 60, statPoints: 1 },
    timeEstimate: '30 minutes',
    statBonus: { dexterity: 1, luck: 1 }
  },
  {
    id: 'creativity_004',
    title: 'Recipe Inventor',
    description: 'Create and cook a new recipe from scratch',
    category: 'Creativity',
    difficulty: 'Medium',
    rewards: { experience: 90, statPoints: 1 },
    timeEstimate: '60 minutes',
    statBonus: { dexterity: 2, intelligence: 1 }
  },
  {
    id: 'creativity_005',
    title: 'Craft Master',
    description: 'Complete a DIY project or craft',
    category: 'Creativity',
    difficulty: 'Medium',
    rewards: { experience: 85, statPoints: 1 },
    timeEstimate: '90 minutes',
    statBonus: { dexterity: 2 }
  }
];

// Utility functions
export const getRandomDailyQuests = (count: number = 5): Quest[] => {
  const shuffled = [...QUEST_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const calculateLevel = (experience: number): number => {
  return Math.floor(experience / 100) + 1;
};

export const getExperienceToNextLevel = (experience: number): number => {
  const currentLevel = calculateLevel(experience);
  return (currentLevel * 100) - experience;
};

export const getTotalStats = (stats: PlayerStats): number => {
  return Object.values(stats).reduce((sum, stat) => sum + stat, 0);
};