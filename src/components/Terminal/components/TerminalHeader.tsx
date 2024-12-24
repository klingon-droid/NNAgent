import React from 'react';
import { Terminal as TerminalIcon, Power, ArrowLeft } from 'lucide-react';
import { UsernameDisplay } from './UsernameDisplay';

interface TerminalHeaderProps {
  onNavigate?: (section: string) => void;
  onUsernameClick?: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({ onNavigate, onUsernameClick }) => (
  <div className="flex items-center gap-1.5 xs:gap-2 p-2 xs:p-3 border-b border-pink-500/30 bg-black/40">
    <TerminalIcon className="w-3 h-3 xs:w-4 xs:h-4 text-pink-500" />
    <span className="text-pink-500 font-mono text-xs xs:text-sm sm:text-base">SYMBaiEX://terminal</span>
    <div className="ml-auto flex items-center gap-2">
      <UsernameDisplay onClick={onUsernameClick} />
      {onNavigate && (
        <button
          onClick={() => onNavigate('terminal')}
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-3 h-3 xs:w-4 xs:h-4" />
        </button>
      )}
      <Power className="w-3 h-3 xs:w-4 xs:h-4 text-cyan-400" />
    </div>
  </div>
);