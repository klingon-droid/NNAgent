import { AIProvider, AICharacter, ProviderConfig } from '../types';
import OpenAI from 'openai';

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;
  private models: {
    normal: string;
    large: string;
  };

  constructor(config: ProviderConfig) {
    if (!config.apiKey) {
      throw new Error('OpenAI API key is required');
    }

    this.client = new OpenAI({
      apiKey: config.apiKey,
      dangerouslyAllowBrowser: true
    });
    this.models = config.models;
  }

  async validateConfig(): Promise<boolean> {
    try {
      await this.client.models.list();
      return true;
    } catch {
      return false;
    }
  }

  async chat(message: string, character: AICharacter): Promise<string> {
    try {
      const model = character.model || 
        (character.maxTokens > 100 ? this.models.large : this.models.normal);

      const completion = await this.client.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: character.systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: character.temperature || 0.7,
        max_tokens: character.maxTokens || 100
      });

      return completion.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }
}