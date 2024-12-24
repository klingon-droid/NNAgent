import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Character } from '../types';

interface ProfileViewProps {
  character: Character;
  onClose: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ character, onClose }) => {
  return (
    <div className="flex-1 ml-4 bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 p-4 animate-slide-in">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={onClose}
          className="text-pink-500 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-mono text-cyan-400">{character.name}</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <img
            src={character.imageUrl}
            alt={character.name}
            className="w-full h-48 object-cover rounded-lg border border-pink-500/30"
          />
          <div className="space-y-2">
            <p className="text-pink-500 text-sm font-mono">{character.title}</p>
            <p className="text-cyan-400 text-sm font-mono">Status: {character.status}</p>
            <p className="text-cyan-400 text-sm font-mono">Role: {character.role}</p>
            <p className="text-cyan-400 text-sm font-mono">Clearance: {character.clearance}</p>
            {character.lastSeen && (
              <p className="text-cyan-400 text-sm font-mono">Last seen: {character.lastSeen}</p>
            )}
            <a
              href={character.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/20 rounded-lg text-pink-500 hover:bg-pink-500/30 transition-colors font-mono text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              View Profile
            </a>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="h-full overflow-y-auto text-sm font-mono text-gray-300 leading-relaxed">
            {character.bio}
          </div>
        </div>
      </div>
    </div>
  );
};