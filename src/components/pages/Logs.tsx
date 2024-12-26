import React, { useState, useEffect, useCallback } from 'react';
import { Terminal as TerminalIcon, Power, ChevronDown, ChevronUp, ArrowLeft, Bot, Download } from 'lucide-react';
import { db } from '../../services/db';
import { Memory } from '../../types';
import { characters } from '../../data/characters';
import { SocialLinks } from '../SocialLinks';
import { CharacterPreview } from '../ElizaForge/CharacterPreview';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Character } from '../../types/eliza';

interface LogsProps {
  onNavigate: (section: string) => void;
}

export const Logs: React.FC<LogsProps> = ({ onNavigate }) => {
  const [conversations, setConversations] = useState<Memory[][]>([]);
  const [expandedConversations, setExpandedConversations] = useState<string[]>([]);
  const [characterLogs, setCharacterLogs] = useState<Memory[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const isMobile = useIsMobile();
  
  const downloadCharacter = useCallback(() => {
    if (!selectedCharacter) return;

    const blob = new Blob([JSON.stringify(selectedCharacter, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCharacter.name.toLowerCase().replace(/\s+/g, '_')}.character.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [selectedCharacter]);

  useEffect(() => {
    loadConversations();
    loadCharacterLogs();
  }, []);

  const loadConversations = async () => {
    try {
      const convos = await db.getConversations();
      setConversations(convos);
    } catch (error) {
      console.error('Failed to load conversations:', error);
      setConversations([]);
    }
  };

  const loadCharacterLogs = async () => {
    try {
      const logs = await db.getCharacterLogs();
      setCharacterLogs(logs);
    } catch (error) {
      console.error('Failed to load character logs:', error);
      setCharacterLogs([]);
    }
  };

  const toggleConversation = (conversationId: string) => {
    setExpandedConversations(prev => 
      prev.includes(conversationId)
        ? prev.filter(id => id !== conversationId)
        : [...prev, conversationId]
    );
  };

  const shortenUserId = (userId: string) => {
    return `${userId.slice(0, 4)}...${userId.slice(-4)}`;
  };

  const getCharacterName = (characterId: string) => {
    return characters.find(c => c.id === characterId)?.name || characterId;
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleCharacterClick = (character: Character) => {
    if (isMobile) {
      onNavigate('elizaforge');
      setCharacterData(character);
    } else {
      setSelectedCharacter(character);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-4">
        <div className={`flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20 h-[600px] ${selectedCharacter && !isMobile ? 'w-1/2' : 'w-full'}`}>
          <div className="flex items-center gap-2 p-3 border-b border-pink-500/30 bg-black/40">
            <TerminalIcon className="w-4 h-4 text-pink-500" />
            <span className="text-pink-500 font-mono text-base">SYMBaiEX://logs</span>
            <div className="ml-auto flex items-center gap-2">
              <ArrowLeft 
                className="w-4 h-4 text-cyan-400 hover:text-cyan-300 cursor-pointer"
                onClick={() => onNavigate('terminal')}
              />
              <Power className="w-4 h-4 text-cyan-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Character Logs Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-mono">
                  <Bot className="w-4 h-4" />
                  <span>Created Characters</span>
                </div>
                {characterLogs.map((log) => {
                  const character = JSON.parse(log.message);
                  return (
                    <button
                      key={log.id}
                      onClick={() => handleCharacterClick(character)}
                      className="w-full bg-black/40 rounded-lg border border-pink-500/30 p-3 text-left hover:border-cyan-400/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-400 font-mono text-sm">{character.name}</span>
                        <span className="text-pink-500/60 font-mono text-xs">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-pink-500/80 font-mono text-xs mt-1 line-clamp-2">
                        {Array.isArray(character.bio) ? character.bio[0] : character.bio}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Conversations Section */}
              {conversations.map((conversation) => {
                const [firstMessage] = conversation;
                const lastMessage = conversation[conversation.length - 1];
                const isExpanded = expandedConversations.includes(firstMessage.conversation_id);

                return (
                  <div key={firstMessage.conversation_id} className="bg-black/40 rounded-lg border border-pink-500/30">
                    <button
                      onClick={() => toggleConversation(firstMessage.conversation_id)}
                      className="w-full flex items-start gap-4 p-4"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-pink-500 mt-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-pink-500 mt-1" />
                      )}
                      
                      <div className="flex-1 text-left">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-mono text-sm">
                              {shortenUserId(firstMessage.user_id)} → {getCharacterName(firstMessage.character_id)}
                            </span>
                            <span className="text-pink-500/60 font-mono text-xs">
                              {formatTimestamp(lastMessage.timestamp)}
                            </span>
                          </div>
                          <div className="text-pink-500/80 font-mono text-xs truncate">
                            {firstMessage.message}
                          </div>
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-12 pb-4">
                        <div className="space-y-3 pt-2 border-t border-pink-500/30">
                          {conversation.map((message) => (
                            <div key={message.id} className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-cyan-400 font-mono text-xs">
                                  {message.role === 'user' ? shortenUserId(message.user_id) : getCharacterName(message.character_id)}
                                </span>
                                <span className="text-pink-500/60 font-mono text-xs">
                                  {formatTimestamp(message.timestamp)}
                                </span>
                              </div>
                              <p className="text-pink-500/80 font-mono text-sm">
                                {message.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Character Preview */}
        {selectedCharacter && !isMobile && (
          <div className="w-1/2 flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20 h-[600px]">
            <div className="flex items-center gap-2 p-3 border-b border-pink-500/30 bg-black/40">
              <Bot className="w-4 h-4 text-pink-500" />
              <span className="text-pink-500 font-mono text-base">Character Preview</span>
              <div className="ml-auto flex items-center gap-2">
                {selectedCharacter && (
                  <button
                    onClick={downloadCharacter}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/40 border border-pink-500/30 
                           hover:border-cyan-400/50 transition-colors group"
                  >
                    <Download className="w-3 h-3 xs:w-4 xs:h-4 text-cyan-400 group-hover:text-cyan-300" />
                    <span className="hidden xs:inline text-pink-500 font-mono text-[10px] xs:text-xs group-hover:text-pink-400">Download</span>
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <CharacterPreview data={selectedCharacter} />
            </div>
          </div>
        )}
      </div>
      <SocialLinks />
    </div>
  );
};