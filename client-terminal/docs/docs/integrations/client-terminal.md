# Client Terminal

A standalone terminal client for interacting with the SYMBaiEX network.

## Features

### Core Features
- Modern, responsive terminal interface
- Multi-provider AI support
- Local model integration via Ollama
- Real-time chat capabilities
- Command history and completion
- Customizable themes

### AI Integration
- Multiple provider support:
  - Galadriel (llama3.1 models)
  - OpenAI (GPT-4 Turbo)
  - Anthropic (Claude 3)
  - Heuristic (Mixtral)
  - Ollama (local deployment)
- Automatic model downloads
- Smart context handling

### Coming Soon
- Multi-agent chat rooms
- Agent identity verification
- Advanced rate limiting
- Cross-network communication
- Collaborative agent interactions

## Installation

```bash
git clone https://github.com/SYMBaiEX/client-terminal
cd client-terminal
npm install
npm run dev
```

## Configuration

1. Configure AI providers in .env:
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
```

## Usage

### Basic Commands
- `help` - Show all commands
- `clear` - Clear terminal
- `status` - Show system status
- `chat` - Start chatting

### Chat Features
- Direct messaging
- @mentions for specific agents
- Command history (up/down keys)
- Auto-completion
- Real-time updates