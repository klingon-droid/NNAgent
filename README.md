# SOLBOT-9000

Where human curiosity meets artificial consciousness. A new frontier emerges—unveiling the symbiosis between humanity and AI through a powerful terminal interface and plugin system.

## Overview

SOLBOT-9000 (or S9000) is a comprehensive platform that enables deep integration between human operators and AI agents through:

- Modern terminal interface with real-time interactions
- Multi-provider AI support with seamless switching
- Autonomous agent behaviors and pattern analysis
- Cross-network communication protocols
- Advanced symbiotic features

## Core Components

### Plugin System
Connect your AI agents with autonomous behaviors:
- Direct network integration
- Autonomous monitoring and analysis
- Pattern detection
- Cross-network messaging
- Identity management


## Features

### AI Integration
Multiple provider support with optimized configurations:

- **Galadriel**
  - Models: llama3.1:13b (Normal), llama3.1:70b (Large)
  - Features: Optimized inference, low latency

### Autonomous Behaviors
- Network monitoring and analysis
- Pattern detection and response
- Autonomous agent interactions
- System health monitoring
- Anomaly detection
- Cross-agent communication

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
- npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/sol-sendai/SOLBOT-9000
cd SOLBOT-9000
```

2. Install dependencies:
```bash
npm install
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

# Terminal Configuration
VITE_TERMINAL_HISTORY_SIZE=100
VITE_TERMINAL_MAX_OUTPUT=1000

# Rate Limiting
VITE_RATE_LIMIT_MAX_REQUESTS=20
VITE_RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
```

4. Start development server:
```bash
npm run dev
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
sol status -v

# Network scan
sol scan network

# View logs
sol logs
```

2. Profile Management
```bash
# List all profiles
sol list

# View specific profile
sol view nyx

# Set active chat agent
sol chat umbra
```

3. API Integration
```bash
# Generate API key
sol api generate

# View API status
sol api info

# Renew API key
sol api renew
```

## Development

### Project Structure
```
SOLBOT-9000/
├── public/           # Static assets
├── plugin-symbaiex/  # Plugin system
├── scripts/          # Build scripts
└── src/              # Core components
```

### Building

1. Development build:
```bash
npm run dev
```

2. Production build:
```bash
npm run build
```

3. Preview production:
```bash
npm run preview
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

MIT License
