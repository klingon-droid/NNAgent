import { config } from '../../../config/env';

class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor() {
    this.maxRequests = config.rateLimit.maxRequests;
    this.windowMs = config.rateLimit.windowMs;
  }

  canMakeRequest(): boolean {
    this.clearOldRequests();
    return this.requests.length < this.maxRequests;
  }

  incrementRequests(): void {
    this.clearOldRequests();
    this.requests.push(Date.now());
  }

  private clearOldRequests(): void {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
  }
}

export const rateLimiter = new RateLimiter();