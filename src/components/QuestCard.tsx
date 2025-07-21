import React from 'react';
import { Clock, Star, Trophy, Zap } from 'lucide-react';
import { Quest } from '../data/gameData';

interface QuestCardProps {
  quest: Quest;
  onComplete: (questId: string) => void;
  isCompleted?: boolean;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, onComplete, isCompleted = false }) => {
  const difficultyColors = {
    Easy: 'text-success',
    Medium: 'text-warning',
    Hard: 'text-destructive',
    Elite: 'text-secondary'
  };

  const categoryIcons = {
    Fitness: '💪',
    Learning: '📚',
    Productivity: '⚡',
    Mindfulness: '🧘',
    Social: '👥',
    Creativity: '🎨'
  };

  return (
    <div className={`quest-card ${isCompleted ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <span className="text-xl sm:text-2xl flex-shrink-0">{categoryIcons[quest.category]}</span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground text-sm sm:text-base leading-tight">{quest.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">{quest.category}</p>
          </div>
        </div>
        <span className={`text-xs sm:text-sm font-bold flex-shrink-0 ${difficultyColors[quest.difficulty]}`}>
          {quest.difficulty}
        </span>
      </div>

      <p className="text-foreground mb-4 text-sm sm:text-base leading-relaxed">{quest.description}</p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{quest.timeEstimate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{quest.rewards.experience} XP</span>
          </div>
        </div>
      </div>

      {/* Stat Bonuses */}
      {quest.statBonus && Object.keys(quest.statBonus).length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Stat Bonuses:</p>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {Object.entries(quest.statBonus).map(([stat, bonus]) => (
              bonus && (
                <span
                  key={stat}
                  className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full"
                >
                  {stat.toUpperCase()}: +{bonus}
                </span>
              )
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onComplete(quest.id)}
        disabled={isCompleted}
        className="btn-system w-full disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-2 sm:py-3"
      >
        <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
        {isCompleted ? 'Completed' : 'Complete Quest'}
      </button>
    </div>
  );
};

export default QuestCard;