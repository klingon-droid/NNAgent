import { Character } from '../../../types';
import { ChatResponse } from '../../../services/ai/types';
import { rateLimiter } from '../../../services/ai/rateLimit';
import { db } from '../../../services/db';

export const handleChatError = (response: ChatResponse): string[] => {
  if (!response.error) {
    return [
      'System initialization in progress...',
      'Please try again in a moment.',
      '',
      rateLimiter.getFormattedStatus()
    ];
  } else if (response.error.includes('Rate limit')) {
    const timeLeft = rateLimiter.getTimeUntilReset();
    return [
      'ERROR: Rate limit exceeded',
      `Please try again in ${timeLeft} minutes`,
      '',
      rateLimiter.getFormattedStatus()
    ];
  }
  return [
    'ERROR: ' + response.error,
    '',
    rateLimiter.getFormattedStatus()
  ];
};

export const handleChatResponse = (
  character: Character,
  userMessage: string,
  response: ChatResponse,
  modelInfo?: { provider: string; model: string }
): string[] => {
  if (response.error) {
    return handleChatError(response);
  }

  // Log the model info with the chat message
  if (modelInfo) {
    db.addMemory({
      user_id: 'system',
      character_id: character.id,
      conversation_id: 'model_logs',
      message: `Using ${modelInfo.provider}/${modelInfo.model}`,
      role: 'assistant',
      timestamp: Date.now()
    });
  }

  return [
    '[CHAT SESSION START]',
    '--------------------------------',
    `[${character.name.toUpperCase()}] Processing input: "${userMessage}"`,
    '',
    response.message,
    '',
    '[CHAT SESSION END]',
    rateLimiter.getFormattedStatus()
  ];
};