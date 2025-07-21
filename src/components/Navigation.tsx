import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Scroll, Package, Users, Settings } from 'lucide-react';
import { useCharacter } from '../contexts/CharacterContext';

const Navigation = () => {
  const { character } = useCharacter();

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/character', icon: User, label: 'Character' },
    { to: '/quests', icon: Scroll, label: 'Quests' },
    { to: '/inventory', icon: Package, label: 'Inventory' },
    { to: '/guild', icon: Users, label: 'Guild' },
  ];

  return (
    <nav className="glass-panel border-b border-primary/20 px-3 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
            <span className="text-background font-bold text-sm sm:text-lg">S</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg sm:text-xl font-bold text-glow">System Awakening</h1>
            <p className="text-xs text-muted-foreground">Solo Leveling RPG</p>
          </div>
        </div>

        {/* Navigation Items - Mobile: Icons only, Desktop: Full */}
        <div className="flex items-center space-x-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden md:block font-medium text-sm">{label}</span>
            </NavLink>
          ))}
        </div>

        {/* Character Info */}
        {character && (
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-foreground">{character.name}</p>
              <p className="text-xs text-muted-foreground">{character.class}</p>
            </div>
            <div className="level-badge text-xs sm:text-sm">
              Lv.{character.level}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;