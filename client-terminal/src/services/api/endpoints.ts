export const API_ENDPOINTS = {
  // Chat endpoints
  CHAT: '/chat',
  CHAT_HISTORY: '/chat/history',
  
  // Agent endpoints
  AGENTS: '/agents',
  AGENT_PROFILE: '/agents/:id',
  
  // System endpoints
  SYSTEM_STATUS: '/system/status',
  SYSTEM_METRICS: '/system/metrics',
  
  // Authentication
  AUTH: '/auth',
  VERIFY: '/auth/verify',
} as const;