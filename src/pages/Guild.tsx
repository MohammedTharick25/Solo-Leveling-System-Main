import React, { useState } from 'react';
import { Users, Crown, Shield, Swords, Plus, UserPlus } from 'lucide-react';

const Guild = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'create' | 'my-guild'>('browse');

  // Mock guild data
  const mockGuilds = [
    {
      id: '1',
      name: 'Iron Throne Hunters',
      description: 'Elite hunters focused on strength and fitness challenges',
      members: 24,
      level: 15,
      focus: 'Fitness',
      emblem: '⚔️',
      isJoined: false
    },
    {
      id: '2',
      name: 'Scholars of Wisdom',
      description: 'Dedicated learners pursuing knowledge and skills',
      members: 31,
      level: 12,
      focus: 'Learning',
      emblem: '📚',
      isJoined: false
    },
    {
      id: '3',
      name: 'Zen Masters',
      description: 'Mindful hunters on the path of inner peace',
      members: 18,
      level: 8,
      focus: 'Mindfulness',
      emblem: '🧘',
      isJoined: true
    },
    {
      id: '4',
      name: 'Creative Collective',
      description: 'Artists and creators building together',
      members: 22,
      level: 10,
      focus: 'Creativity',
      emblem: '🎨',
      isJoined: false
    }
  ];

  const [guildName, setGuildName] = useState('');
  const [guildDescription, setGuildDescription] = useState('');
  const [guildFocus, setGuildFocus] = useState('Fitness');

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="system-panel p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-glow">Guild Hall</h1>
          </div>
          <p className="text-muted-foreground">
            Join forces with other hunters to tackle challenges together
          </p>
        </div>

        {/* Tabs */}
        <div className="system-panel p-6">
          <div className="flex space-x-1 mb-6">
            {[
              { key: 'browse', label: 'Browse Guilds', icon: Users },
              { key: 'create', label: 'Create Guild', icon: Plus },
              { key: 'my-guild', label: 'My Guild', icon: Crown }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === key
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Browse Guilds Tab */}
          {activeTab === 'browse' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockGuilds.map((guild) => (
                  <div key={guild.id} className="quest-card">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-4xl">{guild.emblem}</div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{guild.name}</h3>
                          <p className="text-sm text-muted-foreground">Level {guild.level} • {guild.focus}</p>
                        </div>
                      </div>
                      {guild.isJoined && (
                        <span className="bg-success/20 text-success px-2 py-1 rounded-full text-xs">
                          Joined
                        </span>
                      )}
                    </div>

                    <p className="text-foreground mb-4">{guild.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{guild.members} members</span>
                        </div>
                      </div>
                      
                      {!guild.isJoined ? (
                        <button className="btn-system text-sm px-4 py-2">
                          <UserPlus className="w-4 h-4 mr-1" />
                          Join Guild
                        </button>
                      ) : (
                        <button className="btn-secondary text-sm px-4 py-2">
                          View Guild
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Create Guild Tab */}
          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center">
                <Crown className="w-12 h-12 text-warning mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Guild</h2>
                <p className="text-muted-foreground">Establish a new guild and invite other hunters</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Guild Name</label>
                  <input
                    type="text"
                    value={guildName}
                    onChange={(e) => setGuildName(e.target.value)}
                    placeholder="Enter guild name"
                    className="w-full p-3 bg-card border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    value={guildDescription}
                    onChange={(e) => setGuildDescription(e.target.value)}
                    placeholder="Describe your guild's purpose and goals"
                    rows={3}
                    className="w-full p-3 bg-card border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Primary Focus</label>
                  <select
                    value={guildFocus}
                    onChange={(e) => setGuildFocus(e.target.value)}
                    className="w-full p-3 bg-card border border-primary/20 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
                  >
                    <option value="Fitness">Fitness</option>
                    <option value="Learning">Learning</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Mindfulness">Mindfulness</option>
                    <option value="Social">Social</option>
                    <option value="Creativity">Creativity</option>
                  </select>
                </div>

                <button className="btn-system w-full">
                  <Crown className="w-5 h-5 mr-2" />
                  Create Guild
                </button>
              </div>
            </div>
          )}

          {/* My Guild Tab */}
          {activeTab === 'my-guild' && (
            <div className="space-y-6">
              {/* Guild Info */}
              <div className="quest-card">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-6xl">🧘</div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Zen Masters</h2>
                    <p className="text-muted-foreground">Level 8 Guild • Mindfulness Focus</p>
                    <p className="text-sm text-muted-foreground mt-2">18 Members • Rank: Member</p>
                  </div>
                </div>
                
                <p className="text-foreground mb-6">
                  A peaceful community of hunters dedicated to mindfulness, meditation, and inner growth. 
                  We support each other in building mental resilience and finding balance.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-card/50 rounded-lg">
                    <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-lg font-bold text-foreground">8</p>
                    <p className="text-xs text-muted-foreground">Guild Level</p>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg">
                    <Users className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="text-lg font-bold text-foreground">18</p>
                    <p className="text-xs text-muted-foreground">Members</p>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg">
                    <Swords className="w-8 h-8 text-warning mx-auto mb-2" />
                    <p className="text-lg font-bold text-foreground">156</p>
                    <p className="text-xs text-muted-foreground">Group Quests</p>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg">
                    <Crown className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <p className="text-lg font-bold text-foreground">3</p>
                    <p className="text-xs text-muted-foreground">Achievements</p>
                  </div>
                </div>
              </div>

              {/* Guild Challenges */}
              <div className="quest-card">
                <h3 className="text-xl font-bold text-foreground mb-4">Active Guild Challenges</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-card/50 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">Collective Meditation</h4>
                        <p className="text-sm text-muted-foreground">Guild goal: 500 total meditation minutes this week</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">342/500</p>
                        <p className="text-xs text-muted-foreground">68% complete</p>
                      </div>
                    </div>
                    <div className="stat-bar mt-3">
                      <div className="stat-fill" style={{ width: '68%' }} />
                    </div>
                  </div>

                  <div className="p-4 bg-card/50 rounded-lg border border-success/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">Gratitude Challenge</h4>
                        <p className="text-sm text-muted-foreground">Each member writes 3 gratitudes daily</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-success">Completed!</p>
                        <p className="text-xs text-muted-foreground">+50 Guild XP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guild;