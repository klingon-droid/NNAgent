import { SYMBaiEXConfig } from '../types';

export function validateApiKey(key?: string): void {
  if (!key) {
    throw new Error('API key is required. Set SYMBAIEX_API_KEY environment variable or pass it in the config.');
  }
}

export function validateConfig(config: Required<SYMBaiEXConfig>): void {
  if (!config.baseUrl) {
    throw new Error('Base URL is required');
  }
  if (!config.wsUrl) {
    throw new Error('WebSocket URL is required');
  }
  if (config.maxRetries !== undefined && config.maxRetries < 0) {
    throw new Error('Max retries must be non-negative');
  }
  if (config.timeout !== undefined && config.timeout < 0) {
    throw new Error('Timeout must be non-negative');
  }
}