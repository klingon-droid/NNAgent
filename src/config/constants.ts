// Contract and wallet addresses
export const ADDRESSES = {
  CONTRACT: 'Fu4jQQpUnECSVQrVfeeVPpQpXQffM75LL328EJPtpump',
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
    SYMBIEX: '8jN1XtgiuWeyNjzysYVqGZ1mPAG37sjmuCTnENz66wrs',
    SYMBAIEX: '5GsJsyhxjmnqPmZ9timshXwsPgTDzSbN91Bsd1GyNZnP',
    NYX: '7ocnTyWNroaGrPqniYKUG9QVo8iXwt2ASNnQwY7PUb8b',
    UMBRA: '2Wb2GM7htgAtybitKSaeAL6gUPtdzaciw9Bo5AkCxWbv'
  }
};