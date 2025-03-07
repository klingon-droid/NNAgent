import { Command } from '../../types';
import { characters } from '../../data/characters';
import { userService } from '../../services/user';

export const chatCommands: Command[] = [
  {
    command: 'chat',
    description: 'Interact with system agents',
    category: 'profiles',
    action: (args) => {
      if (args[0] === '-h') {
        return [
          'Usage: nnagent chat [-h] [agent]',
          '',
          'Set active chat agent or view current agent.',
          '',
          'Available Agents:',
          '  symbaiex   - The Symbiotic Entity',
          '  nyx       - The Cryptic Observer',
          '  umbra     - The Digital Archivist',
          '',
          'Example:',
          '  nnagent chat nyx    Set NyX as active agent',
          '  nnagent chat        View current agent',
          '',
          'Note: Type messages without "symx" prefix to chat'
        ];
      }

      const agentId = args[0]?.toLowerCase();
      
      if (!agentId) {
        const currentAgent = userService.getActiveCharacter();
        const agent = characters.find(c => c.id === currentAgent);
        return [
          'CURRENT CHAT AGENT',
          '------------------',
          `Active: ${agent?.name || 'SYMBaiEX (Default)'}`,
          '',
          'Type "nnagent chat -h" to see available agents',
          'Chat directly by typing without the nnagent prefix'
        ];
      }

      const agent = characters.find(c => c.id === agentId);
      if (!agent) {
        return [
          'Error: Agent not found.',
          'Type "nnagent chat -h" for available agents'
        ];
      }

      userService.setActiveCharacter(agentId);
      return [
        'AGENT SWITCHED',
        '--------------',
        `Now chatting with: ${agent.name}`,
        '',
        'Start chatting by typing without the nnagent prefix'
      ];
    }
  }
];