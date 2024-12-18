// Command Types
export interface Command {
  command: string;
  description: string;
  category: string;
  hidden?: boolean;
  action: (args: string[]) => string | string[];
}

// Character Types
export interface Character {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
  status: string;
  lastSeen?: string;
  twitter?: string;
  role: string;
  clearance: string;
  wallet?: string;
  modelProvider?: string;
  model?: string;
  systemPrompt: string;
  temperature?: number;
  maxTokens?: number;
  minTokens?: number;
}

// Memory Types
export interface Memory {
  id: number;
  user_id: string;
  character_id: string;
  conversation_id: string;
  message: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

// Chat Types
export interface ChatParticipant {
  id: string;
  name: string;
  type: 'user' | 'agent';
  status: 'active' | 'idle' | 'offline';
  lastSeen?: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
  replyTo?: string;
  mentions?: string[];
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  created: number;
  lastActivity: number;
}

// Terminal Types
export interface ColoredLine {
  text: string;
  color: string;
  type: string;
  label?: string;  // For labelValue type
  value?: string;  // For labelValue type
}

// AI Types
export interface AIProvider {
  chat(message: string, character: AICharacter): Promise<string>;
  validateConfig(): Promise<boolean>;
}

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

export interface ProviderConfig {
  apiKey?: string;
  host?: string;
  baseUrl?: string;
  models: {
    normal: string;
    large: string;
  };
}