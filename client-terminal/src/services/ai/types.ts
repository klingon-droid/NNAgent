// Provider Types
export interface AIProvider {
  chat(message: string, character: AICharacter): Promise<string>;
  validateConfig(): Promise<boolean>;
}

export interface ProviderConfig {
  apiKey?: string;
  host?: string;
  baseUrl?: string;
  models: {
    normal: string;
    large: string;
  };
}

// Character Types
export interface AICharacter {
  id: string;
  name: string;
  personality: string;
  systemPrompt: string;
  temperature: number;
  minTokens: number;
  maxTokens: number;
  model?: string;
  modelProvider?: string;
}

// Chat Types
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}