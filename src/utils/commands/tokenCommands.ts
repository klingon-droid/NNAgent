import { Command } from '../../types';

export const tokenCommands: Command[] = [
  {
    command: 'symx',
    description: 'Display $SYMX token information',
    category: 'token',
    action: (args) => {
      if (args[0] === '-h') {
        return [
          'Usage: symx [-h] [info|stats|supply]',
          '',
          'Display information about the $SYMX token.',
          '',
          'Options:',
          '  -h           Show this help message',
          '  info         Show general token information',
          '  stats        Display current statistics',
          '  supply       Show supply distribution',
          '',
          'Example:',
          '  symx info    Show token information',
          '  symx stats   Show current statistics'
        ];
      }

      const subcommand = args[0]?.toLowerCase();

      switch (subcommand) {
        case 'info':
          return [
            '$SYMX TOKEN INFORMATION',
            '---------------------',
            'Name: SYMBIEX Token',
            'Symbol: $SYMX',
            'Network: Solana',
            'Contract: SYMX...x892',
            '',
            'The key to deeper system access',
            'and participation in Experiment 1.'
          ];

        case 'stats':
          return [
            '$SYMX TOKEN METRICS',
            '-----------------',
            'Current Price: ◎0.00042',
            'Market Cap: ◎42,000',
            'Volume (24h): ◎1,337',
            'Holders: 247',
            '',
            'Network participation: HIGH'
          ];

        case 'supply':
          return [
            '$SYMX SUPPLY DISTRIBUTION',
            '-----------------------',
            'Total Supply: 1,000,000,000 SYMX',
            'Circulating: 250,000,000 SYMX',
            '',
            'Distribution:',
            '- Community: 40%',
            '- Development: 30%',
            '- Treasury: 20%',
            '- Team: 10%'
          ];

        default:
          return [
            '$SYMX TOKEN STATUS',
            '-----------------',
            'Total Supply: 1,000,000,000 SYMX',
            'Circulating: 250,000,000 SYMX',
            'Network: Solana',
            'Contract: SYMX...x892',
            '',
            'Type "symx -h" for more options'
          ];
      }
    }
  }
];