import React, { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, Power, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { db } from '../../services/db';
import { Memory } from '../../types';
import { characters } from '../../data/characters';
import { SocialLinks } from '../SocialLinks';

interface LogsProps {
  onNavigate: (section: string) => void;
}

export const Logs: React.FC<LogsProps> = ({ onNavigate }) => {
  const [conversations, setConversations] = useState<Memory[][]>([]);
  const [expandedConversations, setExpandedConversations] = useState<string[]>([]);

  useEffect(() => {
    loadConversations();
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

  return (
    <div className="w-full">
      <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20 h-[600px]">
        <div className="flex items-center gap-2 p-3 border-b border-pink-500/30 bg-black/40">
          <TerminalIcon className="w-4 h-4 text-pink-500" />
          <span className="text-pink-500 font-mono text-base">SYMBaiEX://logs</span>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => onNavigate('terminal')}
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <Power className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4 max-w-3xl">
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
      <SocialLinks />
    </div>
  );
};