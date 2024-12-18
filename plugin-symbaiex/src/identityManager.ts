import { v4 as uuidv4 } from 'uuid';
import { AgentIdentity } from './types';

class IdentityManager {
  private readonly STORAGE_KEY = 'symbaiex_agent_identities';
  private identities: Map<string, AgentIdentity> = new Map();

  constructor() {
    this.loadIdentities();
  }

  private loadIdentities(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.identities = new Map(Object.entries(data));
      }
    } catch (error) {
      console.error('Failed to load agent identities:', error);
    }
  }

  private saveIdentities(): void {
    try {
      const data = Object.fromEntries(this.identities);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save agent identities:', error);
    }
  }

  private formatHandle(name: string): string {
    let handle = name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '_')
      .slice(0, 32);

    let uniqueHandle = handle;
    let counter = 1;
    while (this.getIdentityByHandle(uniqueHandle)) {
      uniqueHandle = `${handle}_${counter++}`;
      if (counter >= 100) {
        uniqueHandle = `${handle}_${uuidv4().slice(0, 8)}`;
        break;
      }
    }

    return uniqueHandle;
  }

  registerAgent(name: string, source: string = 'local'): AgentIdentity {
    const id = uuidv4();
    const handle = this.formatHandle(name);
    
    const identity: AgentIdentity = {
      id,
      name,
      handle,
      createdAt: Date.now(),
      lastSeen: Date.now(),
      source
    };

    this.identities.set(id, identity);
    this.saveIdentities();
    return identity;
  }

  getIdentity(id: string): AgentIdentity | undefined {
    return this.identities.get(id);
  }

  getIdentityByHandle(handle: string): AgentIdentity | undefined {
    return Array.from(this.identities.values())
      .find(identity => identity.handle === handle);
  }

  updateLastSeen(id: string): void {
    const identity = this.identities.get(id);
    if (identity) {
      identity.lastSeen = Date.now();
      this.saveIdentities();
    }
  }

  listIdentities(): AgentIdentity[] {
    return Array.from(this.identities.values());
  }
}

export const identityManager = new IdentityManager();