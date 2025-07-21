import React from 'react';
import { useCharacter } from '../contexts/CharacterContext';
import StatBar from '../components/StatBar';
import QuestCard from '../components/QuestCard';
import { Trophy, Zap, Target, Crown, Play } from 'lucide-react';
import heroImage from '../assets/hero-image.jpg';

const Dashboard = () => {
  const { character, dailyQuests, completeQuest } = useCharacter();

  if (!character) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Hero Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.4) saturate(1.2)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background/90" />
        
        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="space-y-6 sm:space-y-8">
              <div className="animate-float">
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-glow mb-4 sm:mb-6">
                  SYSTEM AWAKENING
                </h1>
                <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-primary-glow mx-auto mb-4 sm:mb-6 animate-pulse-glow" />
              </div>
              
              <div className="space-y-3 sm:space-y-4 animate-fade-in">
                <p className="text-lg sm:text-2xl md:text-3xl font-semibold text-glow-secondary">
                  "You've entered the Dungeon of Life..."
                </p>
                <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                  Transform your reality through the power of the System. Level up your real-world stats, 
                  complete epic quests, and become the strongest version of yourself.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <a
                  href="/character"
                  className="btn-system inline-flex items-center text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 animate-pulse-glow"
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Begin Your Journey
                </a>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
                    <span>Create Character</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span>Level Up Stats</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                    <span>Complete Quests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const experiencePercentage = ((character.experience % 100) / 100) * 100;

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <div className="system-panel p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Character Info */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-glow mb-2">
                  Welcome back, {character.name}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground">
                  Level {character.level} {character.class}
                </p>
              </div>

              {/* Experience Bar */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Experience</span>
                  <span className="text-sm text-muted-foreground">
                    {character.experience % 100}/100
                  </span>
                </div>
                <div className="stat-bar h-3 sm:h-4">
                  <div
                    className="stat-fill bg-gradient-to-r from-warning to-warning-glow h-full"
                    style={{ width: `${experiencePercentage}%` }}
                  />
                </div>
              </div>

              {/* Daily Progress */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="text-center p-2 sm:p-4 bg-card/50 rounded-lg">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-warning mx-auto mb-1 sm:mb-2" />
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{character.totalQuests}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Quests</p>
                </div>
                <div className="text-center p-2 sm:p-4 bg-card/50 rounded-lg">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-1 sm:mb-2" />
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{character.completedToday}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Today</p>
                </div>
                <div className="text-center p-2 sm:p-4 bg-card/50 rounded-lg">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-secondary mx-auto mb-1 sm:mb-2" />
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{character.level}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Level</p>
                </div>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Character Stats</h3>
              <StatBar label="Strength" value={character.stats.strength} maxValue={50} color="primary" />
              <StatBar label="Intelligence" value={character.stats.intelligence} maxValue={50} color="secondary" />
              <StatBar label="Dexterity" value={character.stats.dexterity} maxValue={50} color="success" />
              <StatBar label="Constitution" value={character.stats.constitution} maxValue={50} color="warning" />
              <StatBar label="Luck" value={character.stats.luck} maxValue={50} color="primary" />
            </div>
          </div>
        </div>

        {/* Daily Quests */}
        <div className="system-panel p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-glow">Today's Quests</h2>
            <span className="text-sm text-muted-foreground">
              {dailyQuests.length} remaining
            </span>
          </div>
          
          {dailyQuests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {dailyQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={completeQuest}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-warning mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">All Quests Complete!</h3>
              <p className="text-sm sm:text-base text-muted-foreground px-4">
                You've completed all daily quests. Check back tomorrow for new challenges!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;