import { Command } from '../../types';
import { keyManager } from '@/services/api/auth/keyManager';
import { userService } from '../../services/user';
import { ADDRESSES } from '../../config/constants';

export const apiCommands: Command[] = [
  {
    command: 'api',
    description: 'Manage API access',
    category: 'system',
    action: (args) => {
      if (args[0] === '-h') {
        return [
          'Usage: nnagent api [-h] [generate|show|renew]',
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
          '  nnagent api generate    Generate new key',
          '  nnagent api renew       Replace existing key'
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
              'Use "nnagent api show" to view it or',
              '"nnagent api renew" to generate a new one.'
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
            `REST API: ${window.location.origin}/api/v1`,
            `WebSocket: ${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/v1/ws`,
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
            'Current API Key: ' + (userKey?.key || 'No API key found. Use "nnagent api generate" to create one.'),
            '',
            'API Endpoints:',
            `REST API: ${ADDRESSES.API.BASE_URL}`,
            `WebSocket: ${ADDRESSES.API.WEBSOCKET}`,
            '',
            'Documentation: https://docs.neonnexusagent.xyz'
          ];
        }

        case 'show': {
          const key = keyManager.getUserKey(userId);
          if (!key) {
            return [
              'No API key found.',
              'Use "nnagent api generate" to create one.'
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
            'API Endpoints:',
            `REST API: ${ADDRESSES.API.BASE_URL}`,
            key,
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
            '  nnagent api generate    Generate new key',
            '  nnagent api info        Show API details',
            '  nnagent api show        Show current key',
            '  nnagent api renew       Replace existing key',
            '',
            'Type "nnagent api -h" for detailed help'
          ];
      }
    }
  }
];