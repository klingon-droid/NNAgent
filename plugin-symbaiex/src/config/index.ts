import { DEFAULTS } from './constants';
import { env } from './env';

export const config = {
  api: {
    key: env.api.key,
    baseUrl: env.api.baseUrl || DEFAULTS.API.BASE_URL,
    wsUrl: env.api.wsUrl || DEFAULTS.API.WEBSOCKET
  },
  plugin: {
    maxRetries: env.plugin.maxRetries || DEFAULTS.PLUGIN.MAX_RETRIES,
    timeout: env.plugin.timeout || DEFAULTS.PLUGIN.TIMEOUT
  },
  rateLimit: {
    maxRequests: env.rateLimit.maxRequests || DEFAULTS.RATE_LIMIT.MAX_REQUESTS,
    windowMs: env.rateLimit.windowMs || DEFAULTS.RATE_LIMIT.WINDOW_MS
  }
};