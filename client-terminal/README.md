# SYMBaiEX Terminal Client

A powerful, modern terminal interface for interacting with AI agents across the SYMBaiEX network.

![Terminal Screenshot](https://github.com/SYMBaiEX/client-terminal/raw/main/docs/assets/terminal.png)

## Features

### Core Features
- Modern, responsive terminal interface with Tailwind CSS
- Multi-provider AI support with seamless switching
- Local model integration via Ollama
- Real-time chat capabilities with WebSocket support
- Command history and auto-completion
- Customizable themes and styling

### AI Integration
Multiple provider support with optimized configurations:
- **Galadriel**
  - Models: llama3.1:13b (Normal), llama3.1:70b (Large)
  - Features: Optimized inference, low latency
  
- **OpenAI**
  - Models: gpt-4-turbo-preview (Normal), gpt-4-vision-preview (Large)
  - Features: Advanced reasoning, vision capabilities
  
- **Anthropic**
  - Models: claude-3-sonnet (Normal), claude-3-opus (Large)
  - Features: Nuanced responses, long context
  
- **Heuristic**
  - Models: mixtral-8x7b (Normal), mixtral-8x7b-instruct (Large)
  - Features: Efficient processing, domain expertise
  
- **Ollama**
  - Models: hermes3:3b (Normal), hermes3:7b (Large)
  - Features: Local deployment, privacy focused

### Terminal Features
- Command history with up/down navigation
- Tab completion for commands
- Real-time response streaming
- Error handling and recovery
- Rate limiting protection
- Session management
- Conversation logging

## Installation

### Prerequisites
- Node.js 18 or higher
- pnpm (recommended) or npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/SYMBaiEX/client-terminal
cd client-terminal
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment:
Create a `.env` file:
```env
# Default Provider
VITE_AI_PROVIDER=ollama  # galadriel, openai, anthropic, heuristic, ollama

# Model Selection
VITE_NORMAL_MODEL=hermes3:3b  # Default model
VITE_LARGE_MODEL=hermes3:7b   # Complex tasks

# Provider API Keys (if using)
VITE_GALADRIEL_API_KEY=your-key
VITE_OPENAI_API_KEY=your-key
VITE_ANTHROPIC_API_KEY=your-key
VITE_HEURISTIC_API_KEY=your-key

# Ollama Configuration (for local deployment)
VITE_OLLAMA_HOST=http://localhost:11434

# Terminal Configuration
VITE_TERMINAL_HISTORY_SIZE=100
VITE_TERMINAL_MAX_OUTPUT=1000

# Rate Limiting
VITE_RATE_LIMIT_MAX_REQUESTS=20
VITE_RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
```

4. Start development server:
```bash
pnpm run dev
```

## Usage

### Basic Commands

```bash
# Show available commands
help

# Clear terminal
clear

# Show system status
status

# Start chat session
chat

# View character profiles
list
```

### Chat Features

1. Direct Messaging
```bash
# Chat with default agent
Hello, how are you?

# Chat with specific agent
@nyx What patterns do you see?
@umbra Can you check the archives?
```

2. Command History
- Use Up/Down arrows to navigate history
- History persists across sessions

3. Auto-completion
- Tab to complete commands
- Double-tab to show available options

### Advanced Features

1. System Commands
```bash
# Detailed system status
symx status -v

# Network scan
symx scan network

# View logs
symx logs
```

2. Profile Management
```bash
# List all profiles
symx list

# View specific profile
symx view nyx

# Set active chat agent
symx chat umbra
```

3. API Integration
```bash
# Generate API key
symx api generate

# View API status
symx api info

# Renew API key
symx api renew
```

## Development

### Project Structure
```
client-terminal/
├── src/
│   ├── components/    # React components
│   ├── services/      # Core services
│   ├── store/         # State management
│   ├── utils/         # Utilities
│   └── types/         # TypeScript types
├── docs/             # Documentation
└── tests/            # Test files
```

### Key Components

1. Terminal Component
```typescript
import { Terminal } from '@symbaiex/terminal';

<Terminal
  theme="dark"
  history={100}
  maxOutput={1000}
  onCommand={handleCommand}
/>
```

2. AI Provider Integration
```typescript
import { getProvider } from '@symbaiex/terminal';

const provider = await getProvider('galadriel');
const response = await provider.chat(message, options);
```

### Building

1. Development build:
```bash
pnpm run dev
```

2. Production build:
```bash
pnpm run build
```

3. Preview production:
```bash
pnpm run preview
```

## Security

### Best Practices
1. API Key Management
   - Store keys in environment variables
   - Rotate keys regularly
   - Never commit keys to version control

2. Rate Limiting
   - Configure appropriate limits
   - Monitor usage patterns
   - Implement backoff strategies

3. Error Handling
   - Validate all inputs
   - Sanitize outputs
   - Implement proper error boundaries

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain test coverage
- Document new features
- Keep components focused and reusable

## License

MIT License - see [LICENSE](LICENSE) for details