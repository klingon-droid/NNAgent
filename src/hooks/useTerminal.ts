import { useState, useCallback, KeyboardEvent, useEffect } from 'react';
import { useIsMobile } from './useIsMobile';
import { commands } from '../utils/commands';
import { characters } from '../data/characters';
import { Character, ColoredLine } from '../types';
import { galadrielAPI } from '../services/ai/galadriel';
import { userService } from '../services/user';
import { handleChatResponse } from '../utils/commands/helpers/chatHelpers';
import { terminalStore } from '../store/terminalStore';

export const useTerminal = (onNavigate?: (section: string) => void) => {
  const isMobile = useIsMobile();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<(string | ColoredLine)[]>(terminalStore.getOutput());
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeProfile, setActiveProfile] = useState<Character | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Subscribe to store changes
    const unsubscribe = terminalStore.subscribe((newOutput: (string | ColoredLine)[]) => {
      setOutput(newOutput);
    });

    return () => unsubscribe();
  }, []);
  const handleCommand = useCallback(async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    
    // Handle standalone help command
    if (trimmedCmd.toLowerCase() === 'help') {
      const helpCommand = commands.find(c => c.command === 'help');
      if (helpCommand) {
        terminalStore.addOutput([`> ${cmd}`, ...helpCommand.action([])]);
        return;
      }
    }

    // Add command to history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add command to output
    terminalStore.addOutput([`> ${cmd}`]);

    // Check if this is a symx command
    if (trimmedCmd.toLowerCase().startsWith('symx ')) {
      const [, command, ...args] = trimmedCmd.split(' ');

      // Handle navigation commands
      if (['home', 'characters', 'symx', 'logs'].includes(command) && onNavigate) {
        onNavigate(command);
        return;
      }

      // Find and execute command
      const commandHandler = commands.find(c => c.command === command);
      if (commandHandler) {
        const result = await commandHandler.action(args);
        
        // Handle profile viewing
        if (command === 'view' && args[0]) {
          const character = characters.find(c => c.id === args[0]);
          if (character && isMobile && onNavigate) {
            terminalStore.addOutput(['Note: View command is optimized for desktop experience']);
            onNavigate('characters');
            return;
          } else if (character) {
            setActiveProfile(character);
            setIsExpanded(true);
          }
        }

        terminalStore.addOutput(Array.isArray(result) ? result : [result]);
      } else {
        terminalStore.addOutput(['Command not recognized. Type "symx help" for available commands.']);
      }
    } else {
      // Handle direct chat with AI
      setIsLoading(true);
      try {
        const activeCharacter = characters.find(c => c.id === userService.getActiveCharacter());
        if (!activeCharacter) {
          throw new Error('No active character found');
        }

        const response = await galadrielAPI.chat(activeCharacter.id, trimmedCmd);
        const result = handleChatResponse(activeCharacter, trimmedCmd, response);
        terminalStore.addOutput(result);
      } catch (error) {
        console.error('Chat error:', error);
        terminalStore.addOutput(['Error processing chat. Please try again.']);
      } finally {
        setIsLoading(false);
      }
    }
  }, [onNavigate, isMobile]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  }, [historyIndex, commandHistory]);

  const handleProfileClose = useCallback(() => {
    setActiveProfile(null);
    setIsExpanded(false);
  }, []);

  return {
    input,
    setInput,
    output,
    activeProfile,
    isExpanded,
    isLoading,
    handleCommand,
    handleProfileClose,
    handleKeyDown,
  };
};