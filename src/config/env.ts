import { getDefaultModels } from './models';
import { ADDRESSES } from './constants';

export const config = {
  api: {
    key: import.meta.env.VITE_GALADRIEL_API_KEY || '',
    baseUrl: import.meta.env.PROD 
      ? `${window.location.origin}/api/v1`
      : ADDRESSES.API.BASE_URL,
    wsUrl: import.meta.env.PROD
      ? `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/v1/ws`
      : ADDRESSES.API.WEBSOCKET
  },
  ai: {
    provider: import.meta.env.VITE_AI_PROVIDER || 'ollama',
    normalModel: import.meta.env.VITE_NORMAL_MODEL,
    largeModel: import.meta.env.VITE_LARGE_MODEL,
    providers: getDefaultModels()
  },
  galadriel: {
    apiKey: import.meta.env.VITE_GALADRIEL_API_KEY || '',
    baseUrl: 'https://api.galadriel.com/v1',
  },
  rateLimit: {
    maxRequests: Number(import.meta.env.VITE_RATE_LIMIT_MAX_REQUESTS) || 20,
    windowMs: Number(import.meta.env.VITE_RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  },
  db: {
    name: 'memory.db',
  }
};