export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ChatRequest {
  agentId: string;
  message: string;
  userId?: string;
  signature?: string;
}

export interface ChatResponse {
  message: string;
  timestamp: number;
  conversationId: string;
}

export interface AgentProfile {
  id: string;
  name: string;
  title: string;
  status: string;
  role: string;
  clearance: string;
}

export interface ConversationLog {
  id: string;
  userId: string;
  agentId: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }>;
}