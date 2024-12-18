import { Command } from '../../types';
import { keyManager } from '../../services/api/auth/keyManager';
import { userService } from '../../services/user';
import { config } from '../../config/env';

export const apiCommands: Command[] = [
  {
    command: 'api',
    description: 'Manage API access',
    category: 'system',
    action: (args) => {
      if (args[0] === '-h') {
        return [
          'Usage: symx api [-h] [generate|show|renew]',
          '',
          'Manage API access and keys.',
          '',
          'Commands:',
          '  generate    Generate new API key',
          '  info       Show API connection details',
          '  renew      Generate a new API key (replaces existing)',
          '  show        Show your current API key',
          '',
          'Example:',
          '  symx api generate    Generate new key',
          '  symx api renew       Replace existing key'
        ];
      }

      const subcommand = args[0]?.toLowerCase();
      const userId = userService.getUserId();

      switch (subcommand) {
        case 'generate': {
          const existingKey = keyManager.getUserKey(userId);
          if (existingKey) {
            return [
              'Error: You already have an API key.',
              'Use "symx api show" to view it or',
              '"symx api renew" to generate a new one.'
            ];
          }

          const key = keyManager.generateKey(userId);
          return [
            'API KEY GENERATED',
            '----------------',
            'Your API key:',
            key,
            '',
            'API Endpoints:',
            `REST API: ${config.ai.providers.galadriel.baseUrl}`,
            `WebSocket: ${config.ai.providers.galadriel.baseUrl.replace('http', 'ws')}/ws`,
            '',
            'WARNING: Store this key securely.',
            'It will not be shown again.'
          ];
        }

        case 'info': {
          const userKey = keyManager.getUserKey(userId);
          return [
            'API CONFIGURATION',
            '----------------',
            'Current API Key: ' + (userKey?.key || 'No API key found. Use "symx api generate" to create one.'),
            '',
            'API Endpoints:',
            `REST API: ${config.ai.providers.galadriel.baseUrl}`,
            `WebSocket: ${config.ai.providers.galadriel.baseUrl.replace('http', 'ws')}/ws`,
            '',
            'Documentation: https://github.com/SYMBaiEX/SYMBaiEX'
          ];
        }

        case 'show': {
          const key = keyManager.getUserKey(userId);
          if (!key) {
            return [
              'No API key found.',
              'Use "symx api generate" to create one.'
            ];
          }

          return [
            'YOUR API KEY',
            '------------',
            key.key,
            '',
            'Created: ' + new Date(key.createdAt).toLocaleString(),
            'Last used: ' + new Date(key.lastUsed).toLocaleString()
          ];
        }

        case 'renew': {
          const key = keyManager.renewKey(userId);
          return [
            'API KEY RENEWED',
            '--------------',
            'Your new API key:',
            key,
            '',
            'API Endpoints:',
            `REST API: ${config.ai.providers.galadriel.baseUrl}`,
            `WebSocket: ${config.ai.providers.galadriel.baseUrl.replace('http', 'ws')}/ws`,
            '',
            'WARNING: Your old key has been invalidated.',
            'Update your applications with this new key.'
          ];
        }

        default:
          return [
            'API KEY MANAGEMENT',
            '----------------',
            'Available commands:',
            '  symx api generate    Generate new key',
            '  symx api info        Show API details',
            '  symx api show        Show current key',
            '  symx api renew       Replace existing key',
            '',
            'Type "symx api -h" for detailed help'
          ];
      }
    }
  }
];