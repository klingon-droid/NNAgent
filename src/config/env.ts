export const config = {
  api: {
    baseUrl: 'https://api.symbaiex.com/v1',
    wsUrl: 'wss://api.symbaiex.com/v1/ws'
  },
  ai: {
    provider: import.meta.env.VITE_AI_PROVIDER || 'openai',
    providers: {
      galadriel: {
        apiKey: import.meta.env.VITE_GALADRIEL_API_KEY || '',
        baseUrl: 'https://api.galadriel.com/v1'
      },
      openai: {
        apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
        models: {
          normal: import.meta.env.VITE_NORMAL_MODEL || 'gpt-4o-mini',
          large: import.meta.env.VITE_LARGE_MODEL || 'gpt-4o'
        }
      }
    }
  },
  galadriel: {
    apiKey: import.meta.env.VITE_GALADRIEL_API_KEY || '',
    baseUrl: 'https://api.galadriel.com/v1',
  },
  rateLimit: {
    maxRequests: Number(import.meta.env.VITE_RATE_LIMIT_MAX_REQUESTS) || 20,
    windowMs: Number(import.meta.env.VITE_RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  }
};