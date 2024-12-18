import { Category } from '../components/pages/Docs';

export const docs: Category[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        content: {
          type: 'text',
          lines: [
            'The SYMBaiEX Terminal is a powerful interface for interacting',
            'with AI agents across the network. It provides direct access',
            'to our unique symbiotic AI system.',
            '',
            'Features:',
            { type: 'list', items: [
              'Multi-provider AI support',
              'Local model integration via Ollama',
              'Real-time chat capabilities',
              'Command history and completion',
              'Customizable themes'
            ]}
          ]
        }
      },
      {
        id: 'quick-start',
        title: 'Quick Start',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'System Access',
              items: [
                { number: '1', text: 'Configure your .env file with desired AI provider' },
                { number: '2', text: 'Type "symx help" to see available commands' },
                { number: '3', text: 'Use "symx api generate" to get an API key' },
                { number: '4', text: 'Start chatting directly or with commands' }
              ]
            },
            {
              heading: 'Available Providers',
              text: [
                'The terminal supports multiple AI providers:',
                '',
                '• Galadriel (llama3.1 models)',
                '• OpenAI (GPT-4 Turbo)',
                '• Anthropic (Claude 3)',
                '• Heuristic (Mixtral)',
                '• Ollama (local deployment)',
                '',
                'Configure your preferred provider in .env'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'terminal-commands',
    title: 'Terminal Commands',
    sections: [
      {
        id: 'basic-commands',
        title: 'Basic Commands',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Core Commands',
              commands: [
                { command: 'help', description: 'Display available commands' },
                { command: 'clear', description: 'Clear terminal output' },
                { command: 'chat', description: 'Start chat session' }
              ]
            },
            {
              heading: 'System Commands',
              commands: [
                { command: 'symx status', description: 'Show system status' },
                { command: 'symx scan', description: 'Scan network nodes' }
              ]
            },
            {
              heading: 'API Commands',
              commands: [
                { command: 'symx api generate', description: 'Generate new API key' },
                { command: 'symx api show', description: 'Show current API key' },
                { command: 'symx api renew', description: 'Replace existing key' }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    sections: [
      {
        id: 'setup',
        title: 'Setup',
        content: {
          type: 'structured',
          sections: [
            {
              heading: 'Getting Started',
              text: [
                'To integrate with the SYMBaiEX network:',
                '',
                '1. Generate an API key using "symx api generate"',
                '2. Add the key to your .env file',
                '3. Configure your preferred AI provider',
                '',
                'The terminal will automatically host API endpoints',
                'at your domain when built and deployed.'
              ]
            },
            {
              heading: 'Endpoints',
              text: [
                'Available API endpoints:',
                '',
                '• /api/v1/chat - Send messages',
                '• /api/v1/agents - List agents',
                '• /api/v1/ws - WebSocket connection',
                '',
                'All endpoints require authentication via API key.'
              ]
            }
          ]
        }
      }
    ]
  }
];