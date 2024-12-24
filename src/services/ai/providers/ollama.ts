import { AIProvider, AICharacter, ProviderConfig } from '../types';
import { terminalStore } from '../../../store/terminalStore';

export class OllamaProvider implements AIProvider {
  private host: string;
  private models: {
    normal: string;
    large: string;
  };

  constructor(config: ProviderConfig) {
    this.host = config.host || 'http://localhost:11434';
    this.models = config.models;
  }

  private async downloadModel(model: string): Promise<void> {
    terminalStore.addOutput([
      'MODEL DOWNLOAD',
      '-------------',
      `Downloading ${model}...`,
      'This may take a few minutes.'
    ]);

    try {
      const response = await fetch(`${this.host}/api/pull`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: model })
      });

      if (!response.ok) throw new Error('Download failed');

      // Stream the download progress
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        const lines = text.split('\n').filter(Boolean);
        
        for (const line of lines) {
          const data = JSON.parse(line);
          if (data.status === 'downloading') {
            terminalStore.addOutput([
              `Downloading: ${Math.round(data.completed / 1024 / 1024)}MB / ${Math.round(data.total / 1024 / 1024)}MB`
            ]);
          }
        }
      }

      terminalStore.addOutput(['Download complete!']);
    } catch (error) {
      console.error('Model download error:', error);
      throw new Error('Failed to download model');
    }
  }

  async validateConfig(): Promise<boolean> {
    try {
      const response = await fetch(`${this.host}/api/version`);
      return response.ok;
    } catch {
      return false;
    }
  }

  async chat(message: string, character: AICharacter): Promise<string> {
    const model = character.model || this.models.normal;

    try {
      // Check if model exists
      const modelResponse = await fetch(`${this.host}/api/show`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: model })
      });

      // If model doesn't exist, download it
      if (!modelResponse.ok) {
        await this.downloadModel(model);
      }

      // Generate response
      const response = await fetch(`${this.host}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          prompt: message,
          system: character.systemPrompt,
          temperature: character.temperature || 0.7,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Ollama');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Ollama API error:', error);
      throw error;
    }
  }
}