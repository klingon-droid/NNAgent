import React from 'react';
import { userService } from '../../../services/user';

interface UsernameDisplayProps {
  onClick?: () => void;
  className?: string;
}

export const UsernameDisplay: React.FC<UsernameDisplayProps> = ({ onClick, className = '' }) => {
  const username = userService.getUsername();
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 xs:gap-1.5 px-1.5 xs:px-2 py-0.5 xs:py-1 rounded text-pink-500 text-[10px] xs:text-xs sm:text-sm
                 hover:text-cyan-400 transition-colors font-mono flex-col xs:flex-row ${className}`}
    >
      <span className="truncate max-w-[80px] xs:max-w-[120px] sm:max-w-none">
        <span className="block xs:hidden">User:</span>
        <span className="hidden xs:inline">User: </span>
        {username || 'Set Username'}
      </span>
    </button>
  );
};