import React, { useState } from 'react';
import { Terminal as TerminalIcon, Power } from 'lucide-react';
import { characters } from '../../data/characters';
import { AgentCard } from '../agents/AgentCard';
import { AgentModal } from '../AgentModal';
import { Character } from '../../types';
import { SocialLinks } from '../SocialLinks';
import { UsernameDisplay } from '../Terminal/components/UsernameDisplay';
import { UsernamePopup } from '../Terminal/components/UsernamePopup';
import { userService } from '../../services/user';

export const Gallery: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Character | null>(null);
  const [showUsernameInput, setShowUsernameInput] = React.useState(false);
  const [usernameInput, setUsernameInput] = React.useState('');

  return (
    <div className="w-full">
      <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20 h-[600px]">
        {/* Header */}
        <div className="flex items-center gap-1.5 xs:gap-2 p-2 xs:p-3 border-b border-pink-500/30 bg-black/40">
          <TerminalIcon className="w-3 h-3 xs:w-4 xs:h-4 text-pink-500" />
          <span className="text-pink-500 font-mono text-xs xs:text-sm sm:text-base">s9000://agents</span>
          <div className="ml-auto flex items-center gap-2">
            <UsernameDisplay onClick={() => setShowUsernameInput(true)} />
            <Power className="w-3 h-3 xs:w-4 xs:h-4 text-cyan-400" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 xs:p-4 sm:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 h-full">
            {characters.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onClick={setSelectedAgent}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedAgent && (
        <AgentModal
          character={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
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
      
      <SocialLinks />
    </div>
  );
};