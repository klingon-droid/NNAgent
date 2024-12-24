import { config } from '../../../config/env';
import type { AIProvider, ProviderConfig } from '../types';
import { modelConfigs } from '../../../config/models';

const providers = {
  openai: async (config: ProviderConfig): Promise<AIProvider> => {
    const { OpenAIProvider } = await import('./openai');
    const provider = new OpenAIProvider(config);
    await provider.validateConfig();
    return provider;
  },
  anthropic: async (config: ProviderConfig): Promise<AIProvider> => {
    const { AnthropicProvider } = await import('./anthropic');
    const provider = new AnthropicProvider(config);
    await provider.validateConfig();
    return provider;
  },
  heuristic: async (config: ProviderConfig): Promise<AIProvider> => {
    const { HeuristicProvider } = await import('./heuristic');
    const provider = new HeuristicProvider(config);
    await provider.validateConfig();
    return provider;
  },
  galadriel: async (config: ProviderConfig): Promise<AIProvider> => {
    const { GaladrielProvider } = await import('./galadriel');
    const provider = new GaladrielProvider(config);
    await provider.validateConfig();
    return provider;
  },
  ollama: async (config: ProviderConfig): Promise<AIProvider> => {
    const { OllamaProvider } = await import('./ollama');
    const provider = new OllamaProvider(config);
    await provider.validateConfig();
    return provider;
  }
};

export async function getProvider(provider?: string): Promise<AIProvider> {
  const selectedProvider = provider || config.ai.provider;
  const providerFactory = providers[selectedProvider as keyof typeof providers];
  
  if (!providerFactory) {
    throw new Error(`Unknown AI provider: ${selectedProvider}. Available providers: ${Object.keys(modelConfigs).join(', ')}`);
  }

  const providerConfig = config.ai.providers[selectedProvider as keyof typeof providers];
  return await providerFactory(providerConfig);
}