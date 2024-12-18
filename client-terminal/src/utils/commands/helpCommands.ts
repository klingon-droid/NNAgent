import type { Command } from '../../types';
import { getCommandsByCategory, getCategories } from './index';

export const helpCommands: Command[] = [
  {
    command: 'help',
    description: 'Display available commands',
    category: 'system',
    action: (args: string[]) => {
      if (args[0] === '-h') {
        return [
          'HELP SYSTEM',
          '-----------',
          'Usage: help [-h] [category]',
          '',
          'Categories:',
          '• system     - Core commands',
          '• network    - Network operations',
          '• interaction- Chat and communication',
          '',
          'Examples:',
          '• help          - Show all commands',
          '• help system   - Show system commands',
          '• help -h       - Show this help'
        ];
      }

      const category = args[0]?.toLowerCase();
      const commands = getCommandsByCategory(category);
      
      if (category && commands.length === 0) {
        return [
          'ERROR: Category not found',
          '',
          'Available categories:',
          ...getCategories().map(c => `• ${c}`),
          '',
          'Type "help -h" for usage'
        ];
      }

      return [
        'AVAILABLE COMMANDS:',
        '-----------------',
        ...commands.map(cmd => 
          `• ${cmd.command.padEnd(10)} - ${cmd.description}`
        ),
        '',
        'Type "<command> -h" for details'
      ];
    }
  }
];