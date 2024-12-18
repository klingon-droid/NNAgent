import { getDefaultModels } from './models';
import { ADDRESSES } from './constants';

export const config = {
  api: {
    key: import.meta.env.VITE_SYMBAIEX_API_KEY || '',
    // When building, use the current domain as API endpoint
    baseUrl: import.meta.env.PROD 
      ? `${window.location.origin}/api/v1`
      : ADDRESSES.API.BASE_URL,
    wsUrl: import.meta.env.VITE_SYMBAIEX_WS_URL || 'wss://api.symbaiex.com/v1/ws',
    isNode: typeof window !== 'undefined' && window.location.hostname !== 'localhost',
    // AI provider endpoints
    galadriel: {
      baseUrl: ADDRESSES.API.GALADRIEL.BASE_URL,
      wsUrl: ADDRESSES.API.GALADRIEL.WEBSOCKET
    }
  },
  ai: {
    provider: import.meta.env.VITE_AI_PROVIDER || 'galadriel',
    normalModel: import.meta.env.VITE_NORMAL_MODEL || 'llama3.1:13b',
    largeModel: import.meta.env.VITE_LARGE_MODEL || 'llama3.1:70b',
    providers: getDefaultModels()
  },
  terminal: {
    historySize: Number(import.meta.env.VITE_TERMINAL_HISTORY_SIZE) || 100,
    maxOutput: Number(import.meta.env.VITE_TERMINAL_MAX_OUTPUT) || 1000
  },
  rateLimit: {
    maxRequests: Number(import.meta.env.VITE_RATE_LIMIT_MAX_REQUESTS) || 20,
    windowMs: Number(import.meta.env.VITE_RATE_LIMIT_WINDOW_MS) || 900000
  }
};