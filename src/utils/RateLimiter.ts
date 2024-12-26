export interface RateLimiterConfig {
  maxRequests: number;
  windowMs: number;
}

export class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly storageKey: string;
  private lastReset: number;

  constructor(config: RateLimiterConfig, storageKey?: string) {
    this.maxRequests = config.maxRequests;
    this.windowMs = config.windowMs;
    this.storageKey = storageKey || 'rate_limit_requests';
    this.lastReset = Date.now();
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) { 
        const data = JSON.parse(stored);
        this.requests = data.requests || [];
        this.lastReset = data.lastReset || Date.now();
      }
    } catch (error) {
      console.error('Failed to load rate limit data:', error);
      this.requests = [];
      this.lastReset = Date.now();
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({
        requests: this.requests,
        lastReset: this.lastReset
      }));
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

  getRemainingRequests(): number {
    this.clearOldRequests();
    return Math.max(0, this.maxRequests - this.requests.length);
  }

  getTimeUntilReset(): number {
    if (this.requests.length === 0) return 0;
    const oldestRequest = Math.min(...this.requests);
    return Math.max(0, this.windowMs - (Date.now() - oldestRequest));
  }

  private clearOldRequests(): void {
    const now = Date.now();
    if (now - this.lastReset >= this.windowMs) {
      this.requests = [];
      this.lastReset = now;
    }
    this.saveToStorage();
  }
}