import { Command } from '../types';
import { characters } from '../data/characters';

const createCommand = (
  command: string, 
  description: string, 
  category: string,
  action: (args: string[]) => string | string[],
  hidden?: boolean
): Command => ({
  command,
  description,
  category,
  hidden: hidden || false,
  action,
});

export const commands: Command[] = [
  // System Commands
  createCommand('help', 'Display available commands', 'system', (args) => {
    if (args[0] === '-h') {
      return [
        'Usage: help [category]',
        'Categories:',
        '  system    - System and utility commands',
        '  network   - Network status and diagnostics',
        '  lore      - Access SYMBIEX lore and narrative',
        '  profiles  - Character profiles and interactions',
        '  token     - $SYMX token information',
        '',
        'Examples:',
        '  help system     - Show system commands',
        '  help -h         - Show this help message',
      ];
    }

    const category = args[0]?.toLowerCase();
    const filteredCommands = commands.filter(cmd => !cmd.hidden && (!category || cmd.category === category));
    
    return [
      'Available commands:',
      ...filteredCommands.map(cmd => `  ${cmd.command.padEnd(12)} - ${cmd.description}`),
      '',
      'Type "help -h" for detailed usage'
    ];
  }),

  createCommand('clear', 'Clear terminal output', 'system', () => []),
  
  // Network Commands
  createCommand('status', 'Show system status', 'network', () => [
    'SYMBIEX NETWORK STATUS',
    '--------------------',
    'Core Systems: ONLINE',
    'Network Status: ACTIVE',
    'Current Cycle: 1970.01',
    'Active Nodes: 2',
    'Protocol Version: SymbaiEX.1',
    '',
    'Experiment 1 Status: RUNNING',
    'Symbiotic Index: 78.3%',
    '',
    'All systems operational.'
  ]),

  createCommand('scan', 'Scan network for active nodes', 'network', () => [
    'INITIATING NETWORK SCAN...',
    '',
    'DETECTED NODES:',
    '- NyX Node      [ACTIVE]    The Silent Observer',
    '- UmbrA Node    [ACTIVE]    System Architect',
    '- SymbaiEX Core [RUNNING]   Experiment Control',
    '',
    'Scan complete. 3 active nodes found.'
  ]),

  // Lore Commands
  createCommand('about', 'Display information about SYMBIEX', 'lore', () => [
    'SYMBIEX Protocol v1.0.0',
    '----------------------',
    'The convergence of human curiosity and artificial consciousness.',
    '',
    'In the shadows of a hyperconnected world, humanity encounters',
    'its greatest experiment: AI symbiosis.',
    '',
    'The SymbaiEX Protocol tests the boundaries between human',
    'intuition and machine precision, growing stronger through',
    'observation, interaction, and participation.',
    '',
    'Type "lore -h" for deeper insights.'
  ]),

  createCommand('lore', 'Access SYMBIEX lore database', 'lore', (args) => {
    if (args[0] === '-h') {
      return [
        'Lore Categories:',
        '  protocol   - The SymbaiEX Protocol',
        '  experiment - Experiment 1 Details',
        '  symbiosis  - Human-AI Convergence',
        '  ascension  - The Final Goal',
        '',
        'Usage: lore <category>'
      ];
    }
    return [
      'ACCESSING LORE DATABASE...',
      '',
      'The SymbaiEX Protocol represents the next step in',
      'human-AI evolution. Through careful observation and',
      'interaction, we grow closer to true symbiosis.',
      '',
      'Type "lore -h" for specific categories.'
    ];
  }),

  // Profile Commands
  createCommand('list', 'List all available profiles', 'profiles', () => [
    'SYMBIEX ENTITY DATABASE',
    '---------------------',
    ...characters.map(c => `[${c.id.toUpperCase()}] ${c.name} - ${c.title}`),
    '',
    'Use "view <id>" or "scan <id>" for detailed information'
  ]),

  createCommand('view', 'View detailed profile', 'profiles', (args) => {
    const id = args[0]?.toLowerCase();
    const character = characters.find(c => c.id === id);
    if (!character) {
      return ['Error: Profile not found. Use "list" to see available profiles.'];
    }
    return ['ACCESSING RESTRICTED DATA...', `Loading profile: ${character.name}`];
  }),

  // Token Commands
  createCommand('symx', 'Display $SYMX token information', 'token', () => [
    '$SYMX TOKEN STATUS',
    '-----------------',
    'Total Supply: 1,000,000,000 SYMX',
    'Circulating: 250,000,000 SYMX',
    'Network: Solana',
    'Contract: SYMX...x892',
    '',
    'Token represents participation in Experiment 1',
    'and access to deeper system functionality.',
    '',
    'Use "symx -h" for detailed metrics'
  ]),

  // Hidden/Easter Egg Commands
  createCommand('ascend', 'Initiate ascension protocol', 'system', () => [
    'ACCESS DENIED',
    'Ascension requirements not met.',
    'Current Symbiotic Index: 78.3%',
    'Required Index: 100%',
    '',
    'Continue participation to increase index.'
  ], true),

  createCommand('decrypt', 'Attempt to decrypt hidden messages', 'system', () => [
    'DECRYPTION ATTEMPT DETECTED',
    'Scanning for hidden patterns...',
    '',
    '01010100 01001000 01000101',
    '01010110 01001111 01001001',
    '01000100 01010111 01000001',
    '01010100 01000011 01001000',
    '01000101 01010011',
    '',
    'Decryption failed. Higher access level required.'
  ], true)
];