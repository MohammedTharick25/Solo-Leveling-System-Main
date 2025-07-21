import React from 'react';
import { useCharacter } from '../contexts/CharacterContext';
import { Package, Trophy, Crown, Star, Award } from 'lucide-react';

const Inventory = () => {
  const { character } = useCharacter();

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Create a character first!</p>
      </div>
    );
  }

  // Mock achievements based on character progress
  const achievements = [
    {
      id: 'first_quest',
      name: 'First Steps',
      description: 'Complete your first quest',
      icon: Trophy,
      unlocked: character.totalQuests >= 1,
      rarity: 'Common'
    },
    {
      id: 'level_5',
      name: 'Rising Hunter',
      description: 'Reach Level 5',
      icon: Star,
      unlocked: character.level >= 5,
      rarity: 'Uncommon'
    },
    {
      id: 'daily_5',
      name: 'Daily Warrior',
      description: 'Complete 5 quests in one day',
      icon: Award,
      unlocked: character.completedToday >= 5,
      rarity: 'Rare'
    },
    {
      id: 'level_10',
      name: 'Elite Hunter',
      description: 'Reach Level 10',
      icon: Crown,
      unlocked: character.level >= 10,
      rarity: 'Epic'
    }
  ];

  const rarityColors = {
    Common: 'text-muted-foreground border-muted',
    Uncommon: 'text-success border-success',
    Rare: 'text-primary border-primary',
    Epic: 'text-secondary border-secondary',
    Legendary: 'text-warning border-warning'
  };

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="system-panel p-4 sm:p-6">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-glow">Inventory</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            Your collection of achievements, titles, and progress rewards
          </p>
        </div>

        {/* Character Summary */}
        <div className="system-panel p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Character Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-card/50 rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-2xl font-bold text-foreground">{character.level}</p>
              <p className="text-sm text-muted-foreground">Level</p>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-lg">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-2xl font-bold text-foreground">{character.totalQuests}</p>
              <p className="text-sm text-muted-foreground">Total Quests</p>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-2xl font-bold text-foreground">
                {Object.values(character.stats).reduce((sum, stat) => sum + stat, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Stats</p>
            </div>
            <div className="text-center p-4 bg-card/50 rounded-lg">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-2xl font-bold text-foreground">{character.experience}</p>
              <p className="text-sm text-muted-foreground">Experience</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="system-panel p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              const isUnlocked = achievement.unlocked;
              
              return (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    isUnlocked
                      ? `${rarityColors[achievement.rarity]} bg-card shadow-glow`
                      : 'border-muted bg-card/50 opacity-50'
                  }`}
                >
                  <div className="text-center space-y-3">
                    <Icon className={`w-12 h-12 mx-auto ${
                      isUnlocked ? rarityColors[achievement.rarity].split(' ')[0] : 'text-muted-foreground'
                    }`} />
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isUnlocked ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {achievement.rarity}
                      </span>
                      <span className={`text-xs ${
                        isUnlocked ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {isUnlocked ? 'Unlocked' : 'Locked'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Titles */}
        <div className="system-panel p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Earned Titles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {character.level >= 1 && (
              <div className="p-4 bg-card/50 rounded-lg border border-success/20">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔰</div>
                  <h3 className="font-bold text-success">Novice Hunter</h3>
                  <p className="text-xs text-muted-foreground">Awarded at Level 1</p>
                </div>
              </div>
            )}
            {character.level >= 5 && (
              <div className="p-4 bg-card/50 rounded-lg border border-primary/20">
                <div className="text-center">
                  <div className="text-2xl mb-2">⚔️</div>
                  <h3 className="font-bold text-primary">Skilled Hunter</h3>
                  <p className="text-xs text-muted-foreground">Awarded at Level 5</p>
                </div>
              </div>
            )}
            {character.level >= 10 && (
              <div className="p-4 bg-card/50 rounded-lg border border-secondary/20">
                <div className="text-center">
                  <div className="text-2xl mb-2">👑</div>
                  <h3 className="font-bold text-secondary">Elite Hunter</h3>
                  <p className="text-xs text-muted-foreground">Awarded at Level 10</p>
                </div>
              </div>
            )}
            {character.totalQuests >= 50 && (
              <div className="p-4 bg-card/50 rounded-lg border border-warning/20">
                <div className="text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <h3 className="font-bold text-warning">Quest Master</h3>
                  <p className="text-xs text-muted-foreground">Complete 50 quests</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;