import { Memory } from '../../types';

export interface DatabaseStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface DatabaseOptions {
  storage?: DatabaseStorage;
  storageKey?: string;
}

export interface IDatabase {
  readonly isInitialized: boolean;
  getMemories(characterId: string, limit?: number): Promise<Memory[]>;
  addMemory(memory: Omit<Memory, 'id'>): Promise<void>;
  getConversation(conversationId: string): Promise<Memory[]>;
  getConversations(): Promise<Memory[][]>;
  getCharacterLogs(): Promise<Memory[]>;
  addCharacterLog(character: any): Promise<void>;
}