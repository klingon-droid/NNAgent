import { config } from '../../config/env';

interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export class GaladrielAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = config.api.key;
    this.baseUrl = config.api.baseUrl;
  }

  async chat(characterId: string, message: string, options?: ChatOptions): Promise<{ message?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: options?.model || 'llama3.1:70b',
          messages: [
            { role: 'system', content: 'You are a character creation assistant. Return only valid JSON matching the exact schema provided.' },
            { role: 'user', content: message }
          ],
          temperature: options?.temperature || 0.7,
          max_tokens: options?.maxTokens || 100
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Galadriel API');
      }

      const data = await response.json();
      return { message: data.choices[0]?.message?.content };
    } catch (error) {
      console.error('Galadriel API error:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}