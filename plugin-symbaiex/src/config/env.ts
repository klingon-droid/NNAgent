export const config = {
  api: {
    key: process.env.SYMX_API_KEY || '',
    baseUrl: process.env.SYMX_API_URL || 'https://api.galadriel.com/v1'
  },
  rateLimit: {
    maxRequests: 5,
    windowMs: 20 * 60 * 1000 // 20 minutes
  }
};