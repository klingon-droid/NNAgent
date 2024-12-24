import React from 'react';
import { Code2, Terminal as TerminalIcon, Users, Network, BookOpen, FileText, FileCode } from 'lucide-react';

interface NavProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export const Navigation: React.FC<NavProps> = ({ onNavigate, activeSection }) => {
  const navItems = [
    { id: 'home', icon: Code2, label: 'HOME' },
    { id: 'terminal', icon: TerminalIcon, label: 'TERMINAL' },
    { id: 'manifesto', icon: BookOpen, label: 'MANIFESTO' },
    { id: 'characters', icon: Users, label: 'AGENTS' },
    { id: 'symx', icon: Network, label: '$SYMX' },
    { id: 'whitepaper', icon: FileCode, label: 'WHITEPAPER' },
    { id: 'docs', icon: FileText, label: 'DOCS' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-sm border-b border-pink-500/30 px-4 py-2 z-50">
      <div className="max-w-5xl mx-auto space-y-2">
        <h1 className="text-center text-xl font-mono mb-3 flex items-center justify-center gap-2">
          <span className="text-glow text-cyan-400">SYMBaiEX TERMINAL</span>
          <span className="text-glow text-cyan-400 text-sm">v1.0.3</span>
        </h1>
        <div className="flex justify-between items-center">
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
        </div>
      </div>
    </nav>
  );
};