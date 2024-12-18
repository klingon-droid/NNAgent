import { useState, useCallback, KeyboardEvent, useEffect } from 'react';
import { commands } from '../utils/commands';
import { ColoredLine } from '../types';
import { terminalStore } from '../store/terminalStore';

export const useTerminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<(string | ColoredLine)[]>(terminalStore.getOutput());
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

      // Find and execute command
      const commandHandler = commands.find(c => c.command === command);
      if (commandHandler) {
        const result = await commandHandler.action(args);
        terminalStore.addOutput(Array.isArray(result) ? result : [result]);
      } else {
        terminalStore.addOutput(['Command not recognized. Type "symx help" for available commands.']);
      }
    } else {
      // Handle direct chat
      setIsLoading(true);
      try {
        const response = await terminalStore.handleChat(trimmedCmd);
        terminalStore.addOutput(response);
      } catch (error) {
        console.error('Chat error:', error);
        terminalStore.addOutput(['Error processing chat. Please try again.']);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

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

  return {
    input,
    setInput,
    output,
    isLoading,
    handleCommand,
    handleKeyDown,
  };
};