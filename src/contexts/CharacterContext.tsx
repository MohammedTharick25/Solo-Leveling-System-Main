import React, { createContext, useContext, useState, useEffect } from 'react';
import { Character, Quest, PlayerStats, getRandomDailyQuests, calculateLevel, getExperienceToNextLevel } from '../data/gameData';

interface CharacterContextType {
  character: Character | null;
  dailyQuests: Quest[];
  createCharacter: (name: string, characterClass: string, avatar: string) => void;
  completeQuest: (questId: string) => void;
  updateStats: (statUpdates: Partial<PlayerStats>) => void;
  isLoading: boolean;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [dailyQuests, setDailyQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load character from localStorage on mount
  useEffect(() => {
    const savedCharacter = localStorage.getItem('solo-leveling-character');
    const savedDate = localStorage.getItem('solo-leveling-last-date');
    const today = new Date().toDateString();

    if (savedCharacter) {
      setCharacter(JSON.parse(savedCharacter));
    }

    // Generate new daily quests if it's a new day or first time
    if (savedDate !== today) {
      const newQuests = getRandomDailyQuests(5);
      setDailyQuests(newQuests);
      localStorage.setItem('solo-leveling-daily-quests', JSON.stringify(newQuests));
      localStorage.setItem('solo-leveling-last-date', today);
    } else {
      const savedQuests = localStorage.getItem('solo-leveling-daily-quests');
      if (savedQuests) {
        setDailyQuests(JSON.parse(savedQuests));
      } else {
        const newQuests = getRandomDailyQuests(5);
        setDailyQuests(newQuests);
        localStorage.setItem('solo-leveling-daily-quests', JSON.stringify(newQuests));
      }
    }

    setIsLoading(false);
  }, []);

  // Save character to localStorage whenever it changes
  useEffect(() => {
    if (character) {
      localStorage.setItem('solo-leveling-character', JSON.stringify(character));
    }
  }, [character]);

  const createCharacter = (name: string, characterClass: string, avatar: string) => {
    const newCharacter: Character = {
      id: `char_${Date.now()}`,
      name,
      class: characterClass as any,
      level: 1,
      experience: 0,
      experienceToNext: 100,
      stats: {
        strength: 10,
        intelligence: 10,
        dexterity: 10,
        constitution: 10,
        luck: 10
      },
      avatar,
      totalQuests: 0,
      completedToday: 0
    };

    setCharacter(newCharacter);
  };

  const completeQuest = (questId: string) => {
    if (!character) return;

    const quest = dailyQuests.find(q => q.id === questId);
    if (!quest) return;

    const newExperience = character.experience + quest.rewards.experience;
    const newLevel = calculateLevel(newExperience);
    const leveledUp = newLevel > character.level;

    // Apply stat bonuses
    const newStats = { ...character.stats };
    if (quest.statBonus) {
      Object.entries(quest.statBonus).forEach(([stat, bonus]) => {
        if (bonus && stat in newStats) {
          (newStats as any)[stat] += bonus;
        }
      });
    }

    const updatedCharacter: Character = {
      ...character,
      experience: newExperience,
      level: newLevel,
      experienceToNext: getExperienceToNextLevel(newExperience),
      stats: newStats,
      totalQuests: character.totalQuests + 1,
      completedToday: character.completedToday + 1
    };

    setCharacter(updatedCharacter);

    // Remove completed quest from daily quests
    setDailyQuests(prev => prev.filter(q => q.id !== questId));

    // Show level up notification if leveled up
    if (leveledUp) {
      // You can add a toast notification here
      console.log('LEVEL UP! 🎉');
    }
  };

  const updateStats = (statUpdates: Partial<PlayerStats>) => {
    if (!character) return;

    const newStats = { ...character.stats };
    Object.entries(statUpdates).forEach(([stat, value]) => {
      if (value !== undefined && stat in newStats) {
        (newStats as any)[stat] = value;
      }
    });

    setCharacter({
      ...character,
      stats: newStats
    });
  };

  return (
    <CharacterContext.Provider
      value={{
        character,
        dailyQuests,
        createCharacter,
        completeQuest,
        updateStats,
        isLoading
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};