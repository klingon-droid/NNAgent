export const modelConfigs = {
  galadriel: {
    normal: 'llama3.1:13b',
    large: 'llama3.1:70b',
    description: 'Galadriel\'s optimized LLaMA models'
  },
  openai: {
    normal: import.meta.env.VITE_NORMAL_MODEL || 'gpt-4o-mini',
    large: import.meta.env.VITE_LARGE_MODEL || 'gpt-4o',
    description: 'OpenAI\'s latest GPT-4 models'
  },
  anthropic: {
    normal: 'claude-3-sonnet',
    large: 'claude-3-opus',
    description: 'Anthropic\'s Claude 3 models'
  },
  heuristic: {
    normal: 'mixtral-8x7b',
    large: 'mixtral-8x7b-instruct',
    description: 'Heuristic\'s optimized Mixtral models'
  },
  ollama: {
    normal: 'hermes3:3b',
    large: 'hermes3:7b',
    description: 'Local Hermes models via Ollama'
  }
};

export function getDefaultModels() {
  return {
    openai: {
      apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
      models: modelConfigs.openai
    },
    anthropic: {
      apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
      models: modelConfigs.anthropic
    },
    heuristic: {
      apiKey: import.meta.env.VITE_HEURISTIC_API_KEY || '',
      models: modelConfigs.heuristic
    },
    galadriel: {
      apiKey: import.meta.env.VITE_GALADRIEL_API_KEY || '',
      baseUrl: import.meta.env.VITE_GALADRIEL_API_URL || 'https://api.galadriel.com/v1',
      models: modelConfigs.galadriel
    },
    ollama: {
      host: import.meta.env.VITE_OLLAMA_HOST || 'http://localhost:11434',
      models: modelConfigs.ollama
    }
  };
}