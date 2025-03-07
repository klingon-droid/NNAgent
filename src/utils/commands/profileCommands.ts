import { Command } from '../../types';
import { characters } from '../../data/characters';

export const profileCommands: Command[] = [
  {
    command: 'list',
    description: 'List all available profiles',
    category: 'profiles',
    action: (args) => {
      if (args[0] === '-h') {
        return [
          'Usage: nnagent list [-h]',
          '',
          'List all available character profiles.',
          'Use "nnagent view <id>" to access detailed information.',
          '',
          'Options:',
          '  -h    Show this help message',
          '',
          'Example:',
          '  nnagent list      List all profiles',
          '  nnagent view nyx  View NyX\'s profile'
        ];
      }

      return [
        'SYMBIEX ENTITY DATABASE',
        '---------------------',
        ...characters.map(c => `[${c.id.toUpperCase()}] ${c.name} - ${c.title}`),
        '',
        'Use "nnagent view <id>" for detailed information'
      ];
    }
  },
  {
    command: 'view',
    description: 'View detailed profile',
    category: 'profiles',
    action: (args) => {
      if (args[0] === '-h') {
        return [
          'Usage: nnagent view <id> [-h]',
          '',
          'View detailed information about a character.',
          '',
          'Arguments:',
          '  id    Character identifier (e.g., nyx, umbra)',
          '',
          'Options:',
          '  -h    Show this help message',
          '',
          'Example:',
          '  nnagent view nyx    View NyX\'s profile',
          '  nnagent view umbra  View UmbrA\'s profile'
        ];
      }

      const id = args[0]?.toLowerCase();
      const character = characters.find(c => c.id === id);
      
      if (!character) {
        return ['Error: Profile not found. Use "nnagent list" to see available profiles.'];
      }
      
      return ['ACCESSING RESTRICTED DATA...', `Loading profile: ${character.name}`];
    }
  }
];