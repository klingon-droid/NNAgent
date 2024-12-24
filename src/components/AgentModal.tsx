import React from 'react';
import { X, ExternalLink, Brain, User, Zap, Copy, Check } from 'lucide-react';
import { Character } from '../types';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

interface AgentModalProps {
  character: Character;
  onClose: () => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ character, onClose }) => {
  const { copied, copyToClipboard } = useCopyToClipboard();

  const getTypeInfo = () => {
    switch (character.id) {
      case 'symbiex':
        return {
          type: 'HUMAN',
          icon: User,
          bgColor: 'bg-black/80',
          textColor: 'text-cyan-400',
          borderColor: 'border-cyan-400'
        };
      case 'symbaiex':
        return {
          type: 'SYMX',
          icon: Zap,
          bgColor: 'bg-gradient-to-r from-cyan-950/80 to-pink-950/80',
          textColor: 'bg-gradient-to-r from-cyan-400 to-pink-400 text-transparent bg-clip-text',
          borderColor: 'border-cyan-400/50 border-r-pink-400/50'
        };
      default:
        return {
          type: 'AI',
          icon: Brain,
          bgColor: 'bg-black/80',
          textColor: 'text-pink-400',
          borderColor: 'border-pink-400'
        };
    }
  };

  const { type, icon: Icon, bgColor, textColor, borderColor } = getTypeInfo();

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getSolscanUrl = (address: string) => {
    return `https://solscan.io/account/${address}`;
  };

  const getChatCommand = () => `symx chat ${character.id}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl h-[90vh] bg-black/90 border border-pink-500/30 
                    rounded-lg shadow-lg shadow-pink-500/20 animate-slide-in overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-pink-500/30">
          <div className="flex items-center gap-3">
            <h3 className="text-cyan-400 font-mono text-xl">{character.name}</h3>
            <div className="relative">
              {/* Black background layer */}
              <div className="absolute inset-0 bg-black/90 rounded-full" />
              {/* Gradient layer */}
              <div className={`relative flex items-center gap-1.5 px-2 py-1 rounded-full 
                           ${bgColor} border ${borderColor}`}>
                <Icon className={character.id === 'symbaiex' ? 'w-3 h-3 text-cyan-400' : `w-3 h-3 ${textColor}`} />
                <span className={`font-mono text-xs font-semibold ${textColor}`}>
                  {type}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-pink-500 hover:text-pink-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="relative rounded-lg border border-pink-500/30 overflow-hidden bg-black/40 max-h-[280px]">
                <img
                  src={character.imageUrl}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-pink-500 font-mono text-base">{character.title}</span>
                  <span className="px-2.5 py-0.5 bg-pink-500/20 rounded-full text-pink-500 text-sm font-mono">
                    {character.status}
                  </span>
                </div>
                
                <div className="space-y-1.5 text-sm font-mono">
                  <p className="text-cyan-400">Role: {character.role}</p>
                  <p className="text-cyan-400">Clearance: {character.clearance}</p>
                  {character.lastSeen && (
                    <p className="text-cyan-400">Last Seen: {character.lastSeen}</p>
                  )}
                  {character.wallet && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-4">
                        <span className="text-cyan-400">Wallet:</span>
                        <div className="flex items-center gap-2">
                          <a
                            href={getSolscanUrl(character.wallet)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-500 hover:text-pink-400 transition-colors flex items-center gap-1.5"
                          >
                            <span className="text-sm">{shortenAddress(character.wallet)}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <button
                            onClick={() => copyToClipboard(character.wallet!)}
                            className="text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            {copied ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <a
                    href={character.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-500/20 rounded-lg 
                             text-pink-500 hover:bg-pink-500/30 transition-colors font-mono text-sm"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Profile
                  </a>

                  <button
                    onClick={() => copyToClipboard(getChatCommand())}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-lg 
                             border border-pink-500/30 hover:border-cyan-400/50 transition-colors"
                  >
                    <span className="text-pink-500 font-mono text-sm">
                      {getChatCommand()}
                    </span>
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-cyan-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Bio */}
            <div className="h-full overflow-y-auto pr-2 md:max-h-[calc(90vh-8rem)]">
              <div className="font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {character.bio}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};