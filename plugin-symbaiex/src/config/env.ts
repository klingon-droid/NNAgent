export const env = {
  api: {
    key: process.env.SYMBAIEX_API_KEY,
    baseUrl: process.env.SYMBAIEX_API_URL,
    wsUrl: process.env.SYMBAIEX_WS_URL
  },
  plugin: {
    maxRetries: Number(process.env.SYMBAIEX_MAX_RETRIES),
    timeout: Number(process.env.SYMBAIEX_TIMEOUT)
  },
  rateLimit: {
    maxRequests: Number(process.env.SYMBAIEX_RATE_LIMIT_MAX),
    windowMs: Number(process.env.SYMBAIEX_RATE_LIMIT_WINDOW)
  }
};