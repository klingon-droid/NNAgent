import type { Plugin as ElizaPlugin, Message as ElizaMessage } from './types/eliza';
import { parseCharacterRequest } from './utils/characterParser';
import { galadrielAPI } from './services/ai/galadriel';
import { RateLimiter } from './utils/RateLimiter';

export class SYMBaiEXPlugin implements ElizaPlugin {
  private forgeLimiter: RateLimiter;

  constructor() {
    // Initialize forge-specific rate limiter
    this.forgeLimiter = new RateLimiter({
      maxRequests: 5,
      windowMs: 20 * 60 * 1000 // 20 minutes
    }, 'forge_rate_limit');
  }

  async onMessage(message: ElizaMessage): Promise<string | undefined> {
    const request = parseCharacterRequest(message.content);
    if (!request) return;

    try {
      if (!this.forgeLimiter.canMakeRequest()) {
        const timeLeft = this.forgeLimiter.getTimeUntilReset();
        return `Rate limit exceeded. Try again in ${Math.ceil(timeLeft / 60000)} minutes.`;
      }

      // Generate character using Galadriel
      const response = await galadrielAPI.chat('character', JSON.stringify(request), {
        model: 'llama3.1:70b',
        temperature: 0.1,
        maxTokens: 2000
      });

      this.forgeLimiter.incrementRequests();

      if (!response.message) {
        throw new Error('No response received from AI');
      }

      return response.message;
    } catch (error) {
      console.error('Character creation error:', error);
      return error instanceof Error ? error.message : 'Failed to create character';
    }
  }
}