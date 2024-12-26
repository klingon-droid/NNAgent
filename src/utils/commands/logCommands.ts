import { Command } from '../../types';

import { db } from '../../services/db';

export const logCommands: Command[] = [
  {
    command: 'logs',
    description: 'View system conversation logs',
    category: 'system',
    action: async (args) => {
      if (args[0] === '-h') {
        return [
          'Usage: symx logs [-h] [characters]',
          '',
          'View system logs.',
          '',
          'Options:',
          '  -h          Show this help message',
          '  characters  Show created character logs',
          '',
          'Example:',
          '  symx logs           View conversation logs',
          '  symx logs characters View created characters'
        ];
      }

      const subcommand = args[0]?.toLowerCase();
      
      if (subcommand === 'characters') {
        const logs = await db.getCharacterLogs();
        
        if (logs.length === 0) {
          return [
            'CHARACTER FORGE LOGS',
            '-----------------',
            'No characters have been created yet.',
            '',
            'Use ElizaForge to create characters!'
          ];
        }

        return [
          'CHARACTER FORGE LOGS',
          '-----------------',
          ...logs.map(log => {
            const character = JSON.parse(log.message);
            const date = new Date(log.timestamp).toLocaleString();
            return `[${date}] Created: ${character.name}`;
          }),
          '',
          `Total characters created: ${logs.length}`
        ];
      }

      return ['Accessing system logs...'];
    }
  }
];