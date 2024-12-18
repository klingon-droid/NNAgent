export const config = {
  api: {
    key: process.env.SYMBAIEX_API_KEY,
    baseUrl: process.env.SYMBAIEX_API_URL || 'https://api.symbaiex.com/v1',
    wsUrl: process.env.SYMBAIEX_WS_URL || 'wss://api.symbaiex.com/v1/ws'
  },
  plugin: {
    maxRetries: Number(process.env.SYMBAIEX_MAX_RETRIES) || 3,
    timeout: Number(process.env.SYMBAIEX_TIMEOUT) || 10000
  },
  rateLimit: {
    maxRequests: Number(process.env.SYMBAIEX_RATE_LIMIT_MAX) || 20,
    windowMs: Number(process.env.SYMBAIEX_RATE_LIMIT_WINDOW) || 900000
  }
};