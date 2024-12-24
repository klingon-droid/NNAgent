import { AIProvider, AICharacter, ProviderConfig } from '../types';

export class AnthropicProvider implements AIProvider {
  private apiKey: string;
  private baseUrl: string;
  private models: {
    normal: string;
    large: string;
  };

  constructor(config: ProviderConfig) {
    this.apiKey = config.apiKey || '';
    this.baseUrl = 'https://api.anthropic.com/v1';
    this.models = config.models;
  }

  async validateConfig(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async chat(message: string, character: AICharacter): Promise<string> {
    try {
      const model = character.model || 
        (character.maxTokens > 100 ? this.models.large : this.models.normal);

      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'user', content: character.systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: character.maxTokens,
          temperature: character.temperature
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Anthropic API');
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Anthropic API error:', error);
      throw error;
    }
  }
}