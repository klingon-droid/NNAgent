import { AIProvider, AICharacter, ProviderConfig } from '../../../types';

export class GaladrielProvider implements AIProvider {
  private apiKey: string;
  private baseUrl: string;
  private models: {
    normal: string;
    large: string;
  };

  constructor(config: ProviderConfig) {
    this.apiKey = config.apiKey || '';
    this.baseUrl = config.baseUrl || 'https://api.galadriel.com/v1';
    this.models = config.models;
  }

  async validateConfig(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/status`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
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

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: character.systemPrompt },
            { role: 'user', content: message }
          ],
          temperature: character.temperature || 0.7,
          max_tokens: character.maxTokens || 100
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Galadriel API');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('Galadriel API error:', error);
      throw error;
    }
  }
}