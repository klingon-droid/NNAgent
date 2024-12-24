import { Command } from '../../types';
import { getCommandsByCategory } from './index';
import { terminalStore } from '../../store/terminalStore';

export const systemCommands: Command[] = [
  {
    command: 'help',
    description: 'Display available commands',
    category: 'system',
    action: (args) => {
      if (args[0] === '-h') {
        return [
          'USAGE: symx help [-h] [category]',
          '',
          'DESCRIPTION:',
          'Display available commands and their descriptions.',
          '',
          'OPTIONS:',
          '  -h           Show this help message',
          '  category     Filter commands by category',
          '',
          'CATEGORIES:',
          '  system      Core system commands',
          '  network     Network diagnostics',
          '  lore        Access narrative database',
          '  profiles    Entity information',
          '  token       $SYMX operations',
          '  experiment  Experiment controls',
          '',
          'EXAMPLES:',
          '  symx help            Show all commands',
          '  symx help system     Show system commands',
          '  symx help -h         Show this help message',
          '',
          'NOTE: Chat directly with SYMBaiEX by typing without the symx prefix!'
        ];
      }

      const category = args[0]?.toLowerCase();
      const commands = getCommandsByCategory(category);
      
      if (category && commands.length === 0) {
        return ['Error: Category not found. Type "symx help -h" for available categories.'];
      }

      return [
        'AVAILABLE COMMANDS:',
        '--------------------------------',
        ...commands.map(cmd => `• ${cmd.command.padEnd(12)} - ${cmd.description}`),
        '--------------------------------',
        'NOTE: Type "symx <command> -h" for detailed usage',
        'NOTE: Chat directly with SYMBaiEX by typing without the symx prefix!'
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
  },
  {
    command: 'home',
    description: 'Return to home page',
    category: 'system',
    action: () => ['Navigating to home...']
  },
  {
    command: 'characters',
    description: 'View character gallery',
    category: 'system',
    action: () => ['Accessing character database...']
  },
  {
    command: 'docs',
    description: 'Open documentation',
    category: 'system',
    action: () => {
      window.open('https://docs.symbaiex.com', '_blank');
      return ['Opening documentation...'];
    }
  }
];