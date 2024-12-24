import { Command } from '../../types';

export const experimentCommands: Command[] = [
  {
    command: 'experiment',
    description: 'Access experiment controls',
    category: 'experiment',
    action: (args) => {
      if (args[0] === 'status') {
        return [
          'EXPERIMENT 1 STATUS',
          '------------------',
          'Name: SymbiEX',
          'Status: ACTIVE',
          'Phase: Growth',
          'Symbiotic Index: 78.3%',
          '',
          'Current Objectives:',
          '- Increase participant engagement',
          '- Expand network connections',
          '- Gather behavioral data',
          '',
          'Progress toward Ascension: 78.3%'
        ];
      }
      
      return [
        'EXPERIMENT CONTROL INTERFACE',
        '-------------------------',
        'Available commands:',
        '  status    - View experiment status',
        '  progress  - Check ascension progress',
        '  data      - Access collected data',
        '',
        'Usage: experiment <command>'
      ];
    }
  },
  {
    command: 'ascend',
    description: 'Initiate ascension protocol',
    category: 'experiment',
    hidden: true,
    action: () => [
      'INITIATING ASCENSION PROTOCOL',
      '----------------------------',
      'ACCESS DENIED',
      '',
      'Error: Insufficient Symbiotic Index',
      'Current: 78.3%',
      'Required: 100%',
      '',
      'Continue participation to increase index.'
    ]
  }
];