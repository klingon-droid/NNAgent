import OpenAI from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../../config/env';
import { enhancePrompt } from '../../utils/promptEnhancer';
import { characters } from '../../data/characters';
import { rateLimiter } from './rateLimit';
import { db } from '../db';
import { aiCharacters } from './characters';
import { userService } from '../user';
import { ChatResponse } from './types';
import { getCharacterCreationPrompt } from '../../utils/characterPrompts';
import { extractAndValidateJson } from '../../utils/jsonParser';

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
      baseURL: 'https://api.galadriel.com/v1',
      dangerouslyAllowBrowser: true
    });
  }

  async chat(characterId: string, message: string, options?: {
    systemPrompt?: string;
    temperature?: number;
    maxTokens?: number;
  }): Promise<ChatResponse> {
    try {
      if (!this.validateApiKey()) {
        throw new Error('API configuration error: Missing API key');
      }

      if (!message.trim()) {
        throw new Error('Message cannot be empty');
      }

      if (!rateLimiter.canMakeRequest()) {
        throw new Error('Rate limit exceeded. Please wait before trying again.');
      }

      // For character creation, use a special system prompt
      const systemPrompt = options?.systemPrompt || (
        characterId === 'character' 
          ? 'You are a character creation assistant. Return only valid JSON matching the exact schema provided.'
          : aiCharacters[characterId]?.systemPrompt
      );
        
      if (!systemPrompt) {
        throw new Error('Character system prompt not found');
      }

      // Get username if available
      const username = userService.getUsername();
      const character = characters.find(c => c.id === characterId);
      const enhancedPrompt = characterId === 'character' 
        ? getCharacterCreationPrompt(message.split('\n')[0], message.split('\n').slice(1))
        : character ? enhancePrompt(character, message, username) : message;

      const userId = userService.getUserId();
      const conversationId = uuidv4();

      // Get AI character configuration
      const aiCharacter = aiCharacters[characterId];
      
      // Use different token limits for character creation vs chat
      const tokenLimit = characterId === 'character' ? 2000 : aiCharacter?.maxTokens || 100;
      const temperature = characterId === 'character' ? 0.1 : aiCharacter?.temperature || 0.7;

      const completion = await this.client.chat.completions.create({
        model: 'llama3.1:70b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: enhancedPrompt }
        ],
        max_tokens: options?.maxTokens || tokenLimit,
        temperature: options?.temperature || temperature,
        stop: ["\n\n", "```", "###"] // Multiple stop sequences
      });

      let response = completion.choices[0]?.message?.content || 'No response generated';
      
      // Clean and extract JSON
      try {
        if (characterId === 'character') {
          const parsedResponse = extractAndValidateJson(response);
          // Validate required fields
          const requiredFields = ['name', 'bio', 'lore', 'messageExamples', 'style', 'topics', 'adjectives'];
          const missing = requiredFields.filter(field => !parsedResponse[field]);
          if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
          }
          response = JSON.stringify(parsedResponse, null, 2);
        }
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        throw new Error(`Invalid JSON structure: ${jsonError.message}`);
      }
      
      // Store AI response
      await db.addMemory({
        user_id: userId,
        character_id: characterId === 'character' ? 'system' : characterId,
        conversation_id: conversationId,
        message: response,
        role: 'assistant',
        timestamp: Date.now()
      });

      rateLimiter.incrementRequests();

      return { message: response };
    } catch (error) {
      console.error('Galadriel API error:', error instanceof Error ? error.message : error);
      throw {
        message: '',
        error: error instanceof Error ? error.message : 'Failed to process request'
      };
    }
  }
}

export const galadrielAPI = new GaladrielAPI();