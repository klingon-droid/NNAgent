import { Command } from '../../types';

export const logCommands: Command[] = [
  {
    command: 'logs',
    description: 'View system conversation logs',
    category: 'system',
    action: (args) => {
      if (args[0] === '-h') {
        return [
          'Usage: nnagent logs [-h] [characters]',
          '',
          'View system logs.',
          '',
          'Options:',
          '  -h          Show this help message',
          '  characters  Show created character logs',
          '',
          'Example:',
          '  nnagent logs           View conversation logs',
          '  nnagent logs characters View created characters'
        ];
      }

      return ['Accessing system logs...'];
    }
  }
];