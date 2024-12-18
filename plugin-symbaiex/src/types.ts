// Core types
export interface SYMBaiEXConfig {
  apiKey: string;
  baseUrl?: string;
  wsUrl?: string;
  maxRetries?: number;
  timeout?: number;
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Chat types
export interface ChatMessage {
  agentId: string;
  message: string;
  userId?: string;
}

export interface ChatResponse {
  message: string;
  timestamp: number;
  conversationId: string;
}

// Identity types
export interface AgentIdentity {
  id: string;
  name: string;
  handle: string;
  createdAt: number;
  lastSeen: number;
  source: string;
}