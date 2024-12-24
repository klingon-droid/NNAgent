import { config } from '../../config/env';

class RateLimiter {
  private readonly STORAGE_KEY = 'symbaiex_rate_limit';
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor() {
    this.maxRequests = config.rateLimit.maxRequests;
    this.windowMs = config.rateLimit.windowMs;
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      this.requests = stored ? JSON.parse(stored) : [];
      this.clearOldRequests();
    } catch (error) {
      console.error('Failed to load rate limit data:', error);
      this.requests = [];
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.requests));
    } catch (error) {
      console.error('Failed to save rate limit data:', error);
    }
  }

  canMakeRequest(): boolean {
    this.clearOldRequests();
    return this.requests.length < this.maxRequests;
  }

  incrementRequests(): void {
    this.clearOldRequests();
    this.requests.push(Date.now());
    this.saveToStorage();
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
    this.saveToStorage();
  }
}

export const rateLimiter = new RateLimiter();