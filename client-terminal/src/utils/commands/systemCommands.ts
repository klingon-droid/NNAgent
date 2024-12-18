import type { Command } from '../../types';
import { terminalStore } from '../../store/terminalStore';

export const systemCommands: Command[] = [
  {
    command: 'help',
    description: 'Display available commands',
    category: 'system',
    action: (args: string[]) => {
      if (args[0] === '-h') {
        return [
          'Usage: help [category]',
          'Categories:',
          '  system    - System and utility commands',
          '  network   - Network status and diagnostics',
          '',
          'Examples:',
          '  help system     - Show system commands',
          '  help -h         - Show this help message',
        ];
      }

      return [
        'Available commands:',
        '  help      - Show this help message',
        '  clear     - Clear terminal output',
        '  chat      - Start chat session',
        '',
        'Type "<command> -h" for details'
      ];
    }
  },
  {
    command: 'clear',
    description: 'Clear terminal output',
    category: 'system',
    action: () => {
      terminalStore.clear();
      return [];
    }
  }
];