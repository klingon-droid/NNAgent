// Contract and wallet addresses
export const ADDRESSES = {
  CONTRACT: 'COMING SOON',
  API: {
    // When built, this will use the current domain as the API endpoint
    BASE_URL: typeof window !== 'undefined' 
      ? `${window.location.origin}/api/v1`
      : 'http://localhost:3000/api/v1',
    WEBSOCKET: typeof window !== 'undefined'
      ? `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/v1/ws`
      : 'ws://localhost:3000/api/v1/ws',
    // AI provider endpoints
    GALADRIEL: {
      BASE_URL: 'https://api.galadriel.com/v1',
      WEBSOCKET: 'wss://api.galadriel.com/v1/ws'
    }
  },
  WALLETS: {
    SYMBIEX: '8eq2QYtD451to9YsaWfrbJ8cSJbTmYYs1MiwwnrEnBkQ',
    SYMBAIEX: '8eq2QYtD451to9YsaWfrbJ8cSJbTmYYs1MiwwnrEnBkQ',
    NYX: '8eq2QYtD451to9YsaWfrbJ8cSJbTmYYs1MiwwnrEnBkQ',
    UMBRA: '8eq2QYtD451to9YsaWfrbJ8cSJbTmYYs1MiwwnrEnBkQ'
  }
};