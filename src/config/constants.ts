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
    NEXUSPRIME: '57xrH2aaFWy9aJXRvDrStXYNvp5W2Y15Ee3N5FSE7ncv',
    XEN0B: '57xrH2aaFWy9aJXRvDrStXYNvp5W2Y15Ee3N5FSE7ncv',
    DRAKON9: '57xrH2aaFWy9aJXRvDrStXYNvp5W2Y15Ee3N5FSE7ncv',
    SPECTR: '57xrH2aaFWy9aJXRvDrStXYNvp5W2Y15Ee3N5FSE7ncv'
  }
};
