import { config } from '../../../config/env';
import type { AIProvider, ProviderConfig } from '../../../types';
import { GaladrielProvider } from './galadriel';
import { OllamaProvider } from './ollama';

const providers = {
  galadriel: async (config: ProviderConfig): Promise<AIProvider> => {
    const provider = new GaladrielProvider(config);
    await provider.validateConfig();
    return provider;
  },
  ollama: async (config: ProviderConfig): Promise<AIProvider> => {
    const provider = new OllamaProvider(config);
    await provider.validateConfig();
    return provider;
  }
};

export async function getProvider(provider?: string): Promise<AIProvider> {
  const selectedProvider = provider || config.ai.provider;
  const providerFactory = providers[selectedProvider as keyof typeof providers];
  
  if (!providerFactory) {
    throw new Error(`Unknown AI provider: ${selectedProvider}. Available providers: galadriel, ollama`);
  }

  const providerConfig = config.ai.providers[selectedProvider as keyof typeof config.ai.providers];
  return await providerFactory(providerConfig);
}