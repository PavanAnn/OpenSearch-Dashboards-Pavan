import { EuiBadge } from '@elastic/eui';
import React from 'react';
interface BadgeProps {
  text?: string | number;
  level: string | number;
}

const levelToColor: Record<string, string> = {
  ERROR: '#FF525E',
  FATAL: '#FF525E',
  INFO: '#4C9DF9',
  WARN: '#f5bb44',
  DEBUG: '#C4C4C4',
  TRACE: '#000000',
};

const getLevelFromNumber = (number: number): string => {
  if (number >= 1 && number <= 4) return 'trace';
  if (number >= 5 && number <= 8) return 'debug';
  if (number >= 9 && number <= 12) return 'info';
  if (number >= 13 && number <= 16) return 'warn';
  if (number >= 17 && number <= 20) return 'error';
  if (number >= 21 && number <= 24) return 'fatal';

  return 'UNKNOWN';
};

const Badge: React.FC<BadgeProps> = ({ text, level }) => {
  let levelText: string = '';
  let levelNumber: number | undefined;

  if (typeof level === 'string') {
    levelText = level;
  } else {
    levelNumber = level;
    levelText = getLevelFromNumber(levelNumber);
  }

  const color = levelToColor[levelText ?? 'UNKNOWN'] ?? 'white';

  return (
    <EuiBadge
      color={color}
      className="eui-custom-badge"
      style={{ borderRadius: '8px', padding: '4px 8px' }}
    >
      <p style={{ color: '#ffffff', textTransform: 'uppercase' }} className="custom-text-badge">
        {levelText}
      </p>
    </EuiBadge>
  );
};

export { Badge };
