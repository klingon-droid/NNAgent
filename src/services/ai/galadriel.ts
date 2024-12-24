import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../../config/env';
import { rateLimiter } from './rateLimit';
import { db } from '../db';
import { getCharacter } from './characters';
import { userService } from '../user';
import { ChatResponse } from './types';

class GaladrielAPI {
  private client: OpenAI;

  private getRandomTokenLimit(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private validateApiKey(): boolean {
    if (!config.galadriel.apiKey) {
      console.error('Galadriel API key not configured');
      return false;
    }
    return true;
  }

  constructor() {
    this.client = new OpenAI({
      apiKey: config.galadriel.apiKey,
      baseURL: config.galadriel.baseUrl,
      dangerouslyAllowBrowser: true
    });
  }

  async chat(characterId: string, message: string): Promise<ChatResponse> {
    try {
      // Validate inputs
      if (!this.validateApiKey()) {
        throw new Error('API configuration error: Missing API key');
      }

      if (!message.trim()) {
        throw new Error('Message cannot be empty');
      }

      if (!rateLimiter.canMakeRequest()) {
        throw new Error('Rate limit exceeded. Please wait before trying again.');
      }

      const character = getCharacter(characterId);
      if (!character) {
        throw new Error('Character not found');
      }

      // Get username if available
      const username = userService.getUsername();
      const enhancedPrompt = username 
        ? `[User: ${username}] ${message}`
        : message;

      const userId = userService.getUserId();
      const conversationId = uuidv4();

      // Store user message
      await db.addMemory({
        user_id: userId,
        character_id: characterId,
        conversation_id: conversationId,
        message,
        role: 'user',
        timestamp: Date.now()
      });

      // Calculate dynamic token limit
      const minTokens = character.minTokens || Math.floor(character.maxTokens * 0.3);
      const tokenLimit = this.getRandomTokenLimit(minTokens, character.maxTokens);

      const completion = await this.client.chat.completions.create({
        model: 'llama3.1:70b',
        messages: [
          { role: 'system', content: character.systemPrompt },
          { role: 'user', content: enhancedPrompt }
        ],
        temperature: character.temperature,
        max_tokens: tokenLimit
      });

      const response = completion.choices[0]?.message?.content || 'No response generated';

      // Store AI response
      await db.addMemory({
        user_id: userId,
        character_id: characterId,
        conversation_id: conversationId,
        message: response,
        role: 'assistant',
        timestamp: Date.now()
      });

      rateLimiter.incrementRequests();

      return { message: response };
    } catch (error) {
      console.error('Galadriel API error:', error);
      throw {
        message: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

export const galadrielAPI = new GaladrielAPI();