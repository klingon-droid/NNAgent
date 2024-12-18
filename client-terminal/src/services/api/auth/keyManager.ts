import { v4 as uuidv4 } from 'uuid';

interface APIKey {
  key: string;
  userId: string;
  createdAt: number;
  lastUsed: number;
  permissions: string[];
}

class APIKeyManager {
  private readonly STORAGE_KEY = 'symbaiex_api_keys';
  private keys: Map<string, APIKey> = new Map();

  constructor() {
    this.loadKeys();
  }

  private loadKeys(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.keys = new Map(Object.entries(data));
      }
    } catch (error) {
      console.error('Failed to load API keys:', error);
    }
  }

  private saveKeys(): void {
    try {
      const data = Object.fromEntries(this.keys);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save API keys:', error);
    }
  }

  private removeUserKeys(userId: string): void {
    for (const [key, value] of this.keys.entries()) {
      if (value.userId === userId) {
        this.keys.delete(key);
      }
    }
  }

  generateKey(userId: string, permissions: string[] = ['chat']): string {
    // Remove any existing keys for this user
    this.removeUserKeys(userId);
    
    const key = `symx_${uuidv4().replace(/-/g, '')}`;
    
    this.keys.set(key, {
      key,
      userId,
      createdAt: Date.now(),
      lastUsed: Date.now(),
      permissions
    });

    this.saveKeys();
    return key;
  }

  validateKey(key: string): boolean {
    try {
      const apiKey = this.keys.get(key);
      if (!apiKey) return false;

      // Check if key is expired (30 days)
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - apiKey.createdAt > thirtyDays) {
        this.keys.delete(key);
        this.saveKeys();
        return false;
      }

      apiKey.lastUsed = Date.now();
      this.saveKeys();
      return true;
    } catch (error) {
      console.error('Key validation error:', error);
      return false;
    }
  }

  getUserKey(userId: string): APIKey | null {
    return Array.from(this.keys.values())
      .find(key => key.userId === userId) || null;
  }

  renewKey(userId: string): string {
    return this.generateKey(userId);
  }
}

export const keyManager = new APIKeyManager();