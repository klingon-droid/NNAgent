export const DEFAULTS = {
  API: {
    BASE_URL: 'https://api.symbaiex.com/v1',
    WEBSOCKET: 'wss://api.symbaiex.com/v1/ws'
  },
  PLUGIN: {
    MAX_RETRIES: 3,
    TIMEOUT: 10000
  },
  RATE_LIMIT: {
    MAX_REQUESTS: 20,
    WINDOW_MS: 900000 // 15 minutes
  }
} as const;