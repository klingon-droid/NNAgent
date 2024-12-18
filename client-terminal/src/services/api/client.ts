import { API_ENDPOINTS } from './endpoints';
import { securityMiddleware } from './middleware/security';
import { APIResponse, ChatRequest, ChatResponse, AgentProfile, ConversationLog } from './types';
import { config } from '../../config/env';

export class APIClient {
  private baseUrl: string;
  private apiKey: string | null = null;
  private ws: WebSocket | null = null;
  private messageHandlers: Set<(data: any) => void> = new Set();

  constructor(baseUrl: string = config.api.baseUrl) {
    this.baseUrl = baseUrl;
    this.apiKey = config.api.key;
    
    // If this is a node, register with the network
    if (typeof window !== 'undefined' && config.api.isNode) {
      this.registerNode();
    }
  }

  private async registerNode(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/node/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'X-API-Key': this.apiKey })
        },
        body: JSON.stringify({
          url: window.location.origin,
          wsUrl: `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/v1/ws`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to register node');
      }

      console.log('Successfully registered as network node');
    } catch (error) {
      console.error('Failed to register node:', error);
    }
  }

  async connect(): Promise<void> {
    if (this.ws) return;

    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(config.api.wsUrl);
      
      this.ws.addEventListener('open', () => {
        if (this.apiKey && this.ws) {
          this.ws.send(JSON.stringify({ type: 'auth', key: this.apiKey }));
        }
        resolve();
      });

      this.ws.addEventListener('message', (data: MessageEvent) => {
        const message = JSON.parse(data.data);
        this.messageHandlers.forEach(handler => handler(message));
      });

      this.ws.addEventListener('error', reject);
    });
  }

  onMessage(handler: (data: any) => void): () => void {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  setApiKey(key: string) {
    this.apiKey = key;
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'auth', key }));
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    try {
      const headers = {
        ...securityMiddleware.getSecurityHeaders(),
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'X-API-Key': this.apiKey }),
        ...options.headers,
      };

      // Validate and sanitize request
      const sanitizedBody = await securityMiddleware.validateRequest(options);
      
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        body: JSON.stringify(sanitizedBody),
        headers,
      });

      const data = await response.json();
      const sanitizedData = await securityMiddleware.sanitizeResponse(data);

      if (!response.ok) {
        throw new Error(sanitizedData.error || 'API request failed');
      }

      return sanitizedData;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Chat endpoints
  async sendMessage(request: ChatRequest): Promise<APIResponse<ChatResponse>> {
    return this.request<ChatResponse>(API_ENDPOINTS.CHAT, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getChatHistory(conversationId: string): Promise<APIResponse<ConversationLog>> {
    return this.request<ConversationLog>(`${API_ENDPOINTS.CHAT_HISTORY}/${conversationId}`);
  }

  // Agent endpoints
  async getAgents(): Promise<APIResponse<AgentProfile[]>> {
    return this.request<AgentProfile[]>(API_ENDPOINTS.AGENTS);
  }

  async getAgentProfile(agentId: string): Promise<APIResponse<AgentProfile>> {
    return this.request<AgentProfile>(API_ENDPOINTS.AGENT_PROFILE.replace(':id', agentId));
  }

  // System endpoints
  async getSystemStatus(): Promise<APIResponse<any>> {
    return this.request(API_ENDPOINTS.SYSTEM_STATUS);
  }

  async getSystemMetrics(): Promise<APIResponse<any>> {
    return this.request(API_ENDPOINTS.SYSTEM_METRICS);
  }
}