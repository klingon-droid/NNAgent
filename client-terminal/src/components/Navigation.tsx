import React from 'react';
import { Terminal as TerminalIcon, FileText, Power, Users } from 'lucide-react';

interface NavProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export const Navigation: React.FC<NavProps> = ({ onNavigate, activeSection }) => {
  const navItems = [
    { id: 'terminal', icon: TerminalIcon, label: 'TERMINAL' },
    { id: 'agents', icon: Users, label: 'AGENTS' },
    { id: 'docs', icon: FileText, label: 'DOCS' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-sm border-b border-pink-500/30 px-4 py-2 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <span className="text-pink-500 font-mono text-sm">SYMBaiEX Terminal</span>
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm
              ${activeSection === id 
                ? 'text-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-500/20' 
                : 'text-pink-500 hover:text-cyan-400'}`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-mono hidden sm:inline">{label}</span>
          </button>
        ))}
        <Power className="w-4 h-4 text-cyan-400" />
      </div>
    </nav>
  );
};