import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacter } from '../contexts/CharacterContext';
import { CHARACTER_CLASSES, CharacterClass } from '../data/gameData';
import { Crown, Sword, Wand2, Zap, Shield, Heart } from 'lucide-react';

const CharacterCreation = () => {
  const navigate = useNavigate();
  const { createCharacter } = useCharacter();
  const [step, setStep] = useState(1);
  const [characterName, setCharacterName] = useState('');
  const [selectedClass, setSelectedClass] = useState<CharacterClass>('Warrior');
  const [selectedAvatar, setSelectedAvatar] = useState('1');

  const classIcons = {
    Warrior: Sword,
    Mage: Wand2,
    Assassin: Zap,
    Tank: Shield,
    Support: Heart
  };

  const avatars = [
    { id: '1', emoji: '⚔️', name: 'Warrior' },
    { id: '2', emoji: '🧙‍♂️', name: 'Mage' },
    { id: '3', emoji: '🥷', name: 'Assassin' },
    { id: '4', emoji: '🛡️', name: 'Tank' },
    { id: '5', emoji: '💫', name: 'Support' },
  ];

  const handleCreateCharacter = () => {
    if (characterName.trim()) {
      createCharacter(characterName, selectedClass, selectedAvatar);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-glow mb-3 sm:mb-4">
            System Awakening
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-4">
            The System has chosen you. Create your hunter profile.
          </p>
        </div>

        <div className="system-panel p-4 sm:p-6 lg:p-8">
          {step === 1 && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center">
                <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-warning mx-auto mb-3 sm:mb-4" />
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Enter Your Name</h2>
                <p className="text-sm sm:text-base text-muted-foreground px-4">What shall the System call you, Hunter?</p>
              </div>

              <div className="max-w-md mx-auto px-4">
                <input
                  type="text"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  placeholder="Enter your hunter name"
                  className="w-full p-3 sm:p-4 bg-card border border-primary/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-sm sm:text-base"
                  maxLength={20}
                />
              </div>

              <div className="text-center">
                <button
                  onClick={() => setStep(2)}
                  disabled={!characterName.trim()}
                  className="btn-system disabled:opacity-50 disabled:cursor-not-allowed px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Choose Your Class</h2>
                <p className="text-sm sm:text-base text-muted-foreground px-4">Each class excels in different areas of self-improvement</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Object.entries(CHARACTER_CLASSES).map(([className, classData]) => {
                  const Icon = classIcons[className as CharacterClass];
                  const isSelected = selectedClass === className;
                  
                  return (
                    <div
                      key={className}
                      onClick={() => setSelectedClass(className as CharacterClass)}
                      className={`p-4 sm:p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-glow'
                          : 'border-border hover:border-primary/50 bg-card'
                      }`}
                    >
                      <div className="text-center space-y-3 sm:space-y-4">
                        <Icon className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <h3 className="text-lg sm:text-xl font-bold text-foreground">{classData.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{classData.description}</p>
                        
                        <div className="space-y-2 text-xs sm:text-sm">
                          <p className="text-foreground font-medium">Starting Stats:</p>
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            <span>STR: {classData.startingStats.strength}</span>
                            <span>INT: {classData.startingStats.intelligence}</span>
                            <span>DEX: {classData.startingStats.dexterity}</span>
                            <span>CON: {classData.startingStats.constitution}</span>
                            <span className="col-span-2 text-center">LUCK: {classData.startingStats.luck}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 px-4">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary w-full sm:w-auto px-6 py-3 text-sm sm:text-base"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-system w-full sm:w-auto px-6 py-3 text-sm sm:text-base"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Choose Your Avatar</h2>
                <p className="text-sm sm:text-base text-muted-foreground px-4">Select your visual representation</p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-6 max-w-2xl mx-auto px-4">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    className={`p-3 sm:p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${
                      selectedAvatar === avatar.id
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">{avatar.emoji}</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{avatar.name}</p>
                  </div>
                ))}
              </div>

              <div className="text-center space-y-4 sm:space-y-6">
                <div className="max-w-md mx-auto p-4 sm:p-6 bg-card/50 rounded-lg mx-4">
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">Character Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Name:</span> <span className="text-foreground font-semibold">{characterName}</span></p>
                    <p><span className="text-muted-foreground">Class:</span> <span className="text-foreground font-semibold">{selectedClass}</span></p>
                    <p><span className="text-muted-foreground">Avatar:</span> <span className="text-xl sm:text-2xl">{avatars.find(a => a.id === selectedAvatar)?.emoji}</span></p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between max-w-md mx-auto gap-4 px-4">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-secondary w-full sm:w-auto px-6 py-3 text-sm sm:text-base"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCreateCharacter}
                    className="btn-system w-full sm:w-auto px-6 py-3 text-sm sm:text-base"
                  >
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Begin Journey
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;