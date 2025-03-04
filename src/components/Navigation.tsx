import React from 'react';
import { Terminal as TerminalIcon, FileText, Users, Bot, Home, BookOpen, Network, FileCode, Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

interface NavProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export const Navigation: React.FC<NavProps> = ({ onNavigate, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { id: 'home', icon: Home, label: 'HOME' },
    { id: 'manifesto', icon: BookOpen, label: 'MANIFESTO' },
    { id: 'terminal', icon: TerminalIcon, label: 'TERMINAL' },
    { id: 'characters', icon: Users, label: 'AGENTS' },
    { id: 'elizaforge', icon: Bot, label: 'FORGE' },
    // { id: 'symx', icon: Network, label: '$SYMX' },
    { id: 'whitepaper', icon: FileCode, label: 'WHITEPAPER' },
    { id: 'docs', icon: FileText, label: 'DOCS' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-sm border-b border-pink-500/30 px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 z-50">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-2">
        <div className="hidden sm:flex justify-center mb-2">
          <h1 className="text-base xs:text-lg sm:text-xl font-mono text-center">
            <span className="text-glow text-cyan-400">s9000 TERMINAL v1.0.5</span>
          </h1>
        </div>
        <div className="flex items-center justify-between w-full sm:justify-center">
          <h1 className="text-xl font-mono flex items-center gap-2 sm:hidden">
            <span className="text-glow text-cyan-400 text-xs xs:text-sm">s9000 TERMINAL v1.0.5</span>
          </h1>
          {isMobile ? (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-pink-500 hover:text-cyan-400 transition-colors p-1 xs:p-1.5"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="w-4 h-4 xs:w-5 xs:h-5" /> : <Menu className="w-4 h-4 xs:w-5 xs:h-5" />}
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2">
              {navItems.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`flex items-center gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-md transition-all text-xs xs:text-sm
                    ${activeSection === id 
                      ? 'text-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-500/20' 
                      : 'text-pink-500 hover:text-cyan-400'}`}
                  aria-label={label}
                  role="menuitem"
                >
                  <Icon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                  <span className="font-mono hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div 
            className="absolute left-0 right-0 top-full bg-black/95 border-b border-pink-500/30 py-2 animate-slide-in"
            role="menu"
          >
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 w-full transition-all text-xs xs:text-sm
                  ${activeSection === id 
                    ? 'text-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-500/20' 
                    : 'text-pink-500 hover:text-cyan-400'}`}
                aria-label={label}
                role="menuitem"
              >
                <Icon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                <span className="font-mono">{label}</span>
              </button>
          ))}
          </div>
        )}
      </div>
    </nav>
  );
};