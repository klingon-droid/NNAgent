# AI Providers

The terminal supports multiple AI providers for flexible integration.

## Available Providers

### Galadriel
Optimized LLaMA models for high-performance inference.

- **Models**:
  - llama3.1:13b (Normal)
  - llama3.1:70b (Large)
- **Features**:
  - Optimized inference
  - Low latency
  - High throughput
  - Custom fine-tuning

### OpenAI
Latest GPT-4 models for advanced reasoning.

- **Models**:
  - gpt-4-turbo-preview (Normal)
  - gpt-4-vision-preview (Large)
- **Features**:
  - Advanced reasoning
  - Context understanding
  - Vision capabilities
  - Tool use

### Anthropic
Claude 3 models for nuanced interactions.

- **Models**:
  - claude-3-sonnet (Normal)
  - claude-3-opus (Large)
- **Features**:
  - Nuanced responses
  - Safety features
  - Long context
  - Code understanding

### Heuristic
Optimized Mixtral models for efficient processing.

- **Models**:
  - mixtral-8x7b (Normal)
  - mixtral-8x7b-instruct (Large)
- **Features**:
  - Efficient processing
  - Multi-expert routing
  - Domain expertise
  - Low resource usage

### Ollama
Local model deployment for complete control.

- **Models**:
  - hermes3:3b (Normal)
  - hermes3:7b (Large)
- **Features**:
  - Local deployment
  - Full control
  - Privacy focused
  - Custom models

## Configuration

Configure providers in your .env file:

```env
# Default Provider
VITE_AI_PROVIDER=ollama  # galadriel, openai, anthropic, heuristic, ollama

# Model Selection
VITE_NORMAL_MODEL=hermes3:3b  # Default model
VITE_LARGE_MODEL=hermes3:7b   # Complex tasks

# Provider API Keys
VITE_GALADRIEL_API_KEY=your-key
VITE_OPENAI_API_KEY=your-key
VITE_ANTHROPIC_API_KEY=your-key
VITE_HEURISTIC_API_KEY=your-key

# Ollama Configuration
VITE_OLLAMA_HOST=http://localhost:11434
```

## Usage

### Provider Selection
```typescript
import { getProvider } from '../services/ai/providers';

const provider = await getProvider('galadriel');
```

### Chat Integration
```typescript
const response = await provider.chat(message, {
  temperature: 0.7,
  maxTokens: 100
});
```

### Error Handling
```typescript
try {
  const provider = await getProvider();
  const response = await provider.chat(message, options);
} catch (error) {
  if (error.code === 'MODEL_NOT_FOUND') {
    await provider.downloadModel(options.model);
  }
}
```