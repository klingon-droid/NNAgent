import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { characters } from '../../data/characters';
import { AgentCard } from '../agents/AgentCard';
import { AgentModal } from '../AgentModal';
import { Character } from '../../types';
import { SocialLinks } from '../SocialLinks';

export const Gallery: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Character | null>(null);

  return (
    <div className="w-full">
      <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20 h-[600px]">
        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b border-pink-500/30 bg-black/40">
          <Terminal className="w-5 h-5 text-pink-500" />
          <span className="text-pink-500 font-mono text-base">SYMBaiEX://agents</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
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
      
      <SocialLinks />
    </div>
  );
};