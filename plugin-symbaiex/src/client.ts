import axios, { AxiosInstance } from 'axios';
import { SYMBaiEXConfig, APIResponse, ChatMessage, ChatResponse } from './types';
import { config } from './config';
import { validateApiKey, validateConfig } from './utils/validation';

export class SYMBaiEXClient {
  private client: AxiosInstance;
  private config: Required<SYMBaiEXConfig>;

  constructor(userConfig: Partial<SYMBaiEXConfig> = {}) {
    this.config = {
      apiKey: userConfig.apiKey || config.api.key || '',
      baseUrl: userConfig.baseUrl || config.api.baseUrl,
      wsUrl: userConfig.wsUrl || config.api.wsUrl,
      maxRetries: userConfig.maxRetries || config.plugin.maxRetries,
      timeout: userConfig.timeout || config.plugin.timeout
    };

    validateApiKey(this.config.apiKey);
    validateConfig(this.config);

    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.config.apiKey
      }
    });
  }

  async chat(message: ChatMessage): Promise<APIResponse<ChatResponse>> {
    try {
      const response = await this.client.post<APIResponse<ChatResponse>>('/chat', message);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return {
          success: false,
          error: err.response?.data?.error || err.message
        };
      }
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error occurred'
      };
    }
  }

  async validateConnection(): Promise<boolean> {
    try {
      const response = await this.client.get<{ success: boolean }>('/system/status');
      return response.data.success === true;
    } catch {
      return false;
    }
  }

  getApiKey(): string {
    return this.config.apiKey;
  }
}