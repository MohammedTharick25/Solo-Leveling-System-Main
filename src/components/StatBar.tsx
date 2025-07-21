import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  showValue?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning';
}

const StatBar: React.FC<StatBarProps> = ({
  label,
  value,
  maxValue = 100,
  showValue = true,
  color = 'primary'
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  const colorClasses = {
    primary: 'from-primary to-primary-glow',
    secondary: 'from-secondary to-secondary-glow',
    success: 'from-success to-success-glow',
    warning: 'from-warning to-warning-glow'
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {showValue && (
          <span className="text-sm text-muted-foreground">
            {value}{maxValue !== 100 && `/${maxValue}`}
          </span>
        )}
      </div>
      <div className="stat-bar">
        <div
          className={`stat-fill bg-gradient-to-r ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StatBar;