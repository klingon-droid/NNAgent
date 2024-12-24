import { Memory } from '../../types';

class Database {
  private memories: Memory[] = [];
  private initialized = true;

  async init(): Promise<void> {
    // In-memory initialization is instant
    return Promise.resolve();
  }

  async getMemories(characterId: string, limit?: number): Promise<Memory[]> {
    if (characterId === 'all') {
      return this.memories.sort((a, b) => b.timestamp - a.timestamp);
    }
    
    const filtered = this.memories
      .filter(m => m.character_id === characterId)
      .sort((a, b) => b.timestamp - a.timestamp);
      
    return limit ? filtered.slice(0, limit) : filtered;
  }

  async addMemory(memory: Omit<Memory, 'id'>): Promise<void> {
    this.memories.push({
      id: this.memories.length + 1,
      ...memory
    });
  }

  async getConversation(conversationId: string): Promise<Memory[]> {
    return this.memories
      .filter(m => m.conversation_id === conversationId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  async getConversations(): Promise<string[]> {
    const uniqueConversations = new Set(
      this.memories.map(m => m.conversation_id)
    );
    return Array.from(uniqueConversations);
  }
}

export const db = new Database();