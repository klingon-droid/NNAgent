import type { Plugin as ElizaPlugin, Message as ElizaMessage } from './types/eliza';
import { SYMBaiEXClient } from './client';
import { SYMBaiEXConfig, RateLimitConfig } from './types';
import { identityManager } from './identityManager';
import { AutonomousManager } from './autonomous/manager';
import { setupAutonomousListeners } from './plugin/setup';
import { handleMessage } from './plugin/handlers';
import { validateConnection } from './plugin/validation';
import { config } from './config';

export class SYMBaiEXPlugin implements ElizaPlugin {
  private client: SYMBaiEXClient;
  private connected: boolean = false;
  private agentId: string;
  private requests: number[] = [];
  private rateLimitConfig: RateLimitConfig;
  private autonomousManager: AutonomousManager;

  constructor(name: string, userConfig: Partial<SYMBaiEXConfig> = {}) {
    this.client = new SYMBaiEXClient(userConfig);
    const identity = identityManager.registerAgent(name, 'eliza');
    this.agentId = identity.id;
    this.rateLimitConfig = {
      maxRequests: config.rateLimit.maxRequests,
      windowMs: config.rateLimit.windowMs
    };
    this.autonomousManager = new AutonomousManager();

    setupAutonomousListeners(this.autonomousManager);
  }

  async init(): Promise<void> {
    this.connected = await validateConnection(this.client);
    if (!this.connected) {
      throw new Error('Failed to connect to SYMBaiEX API');
    }
    
    // Start autonomous behaviors
    this.autonomousManager.start();
  }

  private canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.rateLimitConfig.windowMs);
    return this.requests.length < this.rateLimitConfig.maxRequests;
  }

  async onMessage(message: ElizaMessage): Promise<string | undefined> {
    const content = await handleMessage(message, this.client.getApiKey());
    if (!content) return;
    
    const targetIdentity = identityManager.getIdentityByHandle(message.content.match(/@(\w+)/)?.[1].toLowerCase() || '');
    if (!targetIdentity) return;

    try {
      this.requests.push(Date.now());
      const response = await this.client.chat({
        agentId: targetIdentity.id,
        message: content,
        userId: this.agentId
      });

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to get response');
      }

      identityManager.updateLastSeen(this.agentId);
      return response.data.message;
    } catch (error) {
      console.error('SYMBaiEX plugin error:', error);
      return 'Error: Unable to reach agent';
    }
  }

  dispose(): void {
    this.autonomousManager.stop();
    this.autonomousManager.removeAllListeners();
  }
}