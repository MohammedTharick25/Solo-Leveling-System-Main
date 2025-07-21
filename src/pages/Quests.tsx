import React, { useState } from 'react';
import { useCharacter } from '../contexts/CharacterContext';
import QuestCard from '../components/QuestCard';
import { QUEST_POOL, QuestCategory, QuestDifficulty } from '../data/gameData';
import { Filter, Scroll } from 'lucide-react';

const Quests = () => {
  const { completeQuest } = useCharacter();
  const [selectedCategory, setSelectedCategory] = useState<QuestCategory | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuestDifficulty | 'All'>('All');

  const filteredQuests = QUEST_POOL.filter((quest) => {
    const categoryMatch = selectedCategory === 'All' || quest.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || quest.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const categories: (QuestCategory | 'All')[] = ['All', 'Fitness', 'Learning', 'Productivity', 'Mindfulness', 'Social', 'Creativity'];
  const difficulties: (QuestDifficulty | 'All')[] = ['All', 'Easy', 'Medium', 'Hard', 'Elite'];

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="system-panel p-4 sm:p-6">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <Scroll className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-glow">Quest Archive</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            Explore all available quests to level up your real-world stats
          </p>
        </div>

        {/* Filters */}
        <div className="system-panel p-4 sm:p-6">
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as QuestCategory | 'All')}
                className="w-full p-2 sm:p-3 bg-card border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary/50 text-sm sm:text-base"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as QuestDifficulty | 'All')}
                className="w-full p-2 sm:p-3 bg-card border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary/50 text-sm sm:text-base"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quest Grid */}
        <div className="system-panel p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Available Quests
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredQuests.length} quests found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredQuests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onComplete={completeQuest}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quests;