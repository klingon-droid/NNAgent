import React from 'react';
import { Terminal as TerminalIcon, Power, ArrowLeft } from 'lucide-react';

interface TerminalHeaderProps {
  onNavigate?: (section: string) => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({ onNavigate }) => (
  <div className="flex items-center gap-2 p-3 border-b border-pink-500/30 bg-black/40">
    <TerminalIcon className="w-4 h-4 text-pink-500" />
    <span className="text-pink-500 font-mono text-base">SYMBaiEX://terminal</span>
    <div className="ml-auto flex items-center gap-2">
      {onNavigate && (
        <button
          onClick={() => onNavigate('terminal')}
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      )}
      <Power className="w-4 h-4 text-cyan-400" />
    </div>
  </div>
);