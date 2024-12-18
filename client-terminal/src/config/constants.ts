// API endpoints and configuration
export const ADDRESSES = {
  API: {
    // Default to localhost for development
    BASE_URL: 'http://localhost:3000/api/v1',
    WEBSOCKET: 'ws://localhost:3000/api/v1/ws',
    // AI provider endpoints
    GALADRIEL: {
      BASE_URL: 'https://api.galadriel.com/v1',
      WEBSOCKET: 'wss://api.galadriel.com/v1/ws'
    }
  }
};