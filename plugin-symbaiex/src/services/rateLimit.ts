import { config } from '../config';

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

  getTimeUntilReset(): number {
    if (this.requests.length === 0) return 0;
    const oldestRequest = Math.min(...this.requests);
    return Math.max(0, this.windowMs - (Date.now() - oldestRequest));
  }

  getFormattedStatus(): string {
    const remaining = this.maxRequests - this.requests.length;
    const timeUntilReset = this.getTimeUntilReset();
    const minutesLeft = Math.ceil(timeUntilReset / 60000);
    
    return `Requests remaining: ${remaining}${
      minutesLeft > 0 ? ` (Reset in ${minutesLeft} minutes)` : ''
    }`;
  }

  private clearOldRequests(): void {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
  }
}

export const rateLimiter = new RateLimiter();