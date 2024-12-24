import React from 'react';
import { useTerminal } from '../../hooks/useTerminal';
import { TerminalHeader } from './components/TerminalHeader';
import { TerminalOutput } from './components/TerminalOutput';
import { TerminalInput } from './components/TerminalInput';
import { TerminalLoading } from './components/TerminalLoading';
import { UsernamePopup } from './components/UsernamePopup';
import { ProfileView } from '../ProfileView';
import { SocialLinks } from '../SocialLinks';

interface TerminalProps {
  onNavigate?: (section: string) => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onNavigate }) => {
  const {
    input,
    setInput,
    output,
    activeProfile,
    isExpanded,
    isLoading,
    handleCommand,
    handleProfileClose,
    handleKeyDown,
  } = useTerminal(onNavigate);
  const [showUsernameInput, setShowUsernameInput] = React.useState(false);
  const [usernameInput, setUsernameInput] = React.useState('');

  return (
    <div className="w-full">
      <div className={`flex gap-4 transition-all duration-300 terminal-container ${isExpanded ? 'w-full' : 'w-full'}`}>
        <div className={`${isExpanded ? 'w-1/2' : 'w-full'} flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20 transition-all duration-300 h-[600px]`}>
          <TerminalHeader 
            onNavigate={onNavigate}
            onUsernameClick={() => setShowUsernameInput(true)}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TerminalOutput lines={output}>
              {isLoading && <TerminalLoading />}
            </TerminalOutput>
            <TerminalInput
              value={input}
              onChange={setInput}
              onSubmit={handleCommand}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        
        {activeProfile && isExpanded && (
          <ProfileView character={activeProfile} onClose={handleProfileClose} />
        )}
      </div>
      <SocialLinks />
      
      {showUsernameInput && (
        <UsernamePopup
          value={usernameInput}
          onChange={setUsernameInput}
          onSubmit={() => {
            if (usernameInput.trim()) {
              userService.setUsername(usernameInput.trim());
              setShowUsernameInput(false);
              setUsernameInput('');
            }
          }}
          onClose={() => {
            setShowUsernameInput(false);
            setUsernameInput('');
          }}
        />
      )}
    </div>
  );
};