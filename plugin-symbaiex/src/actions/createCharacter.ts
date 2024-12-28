import { Action, ActionContext, ActionResult } from '../types/eliza';
import { parseCharacterRequest } from '../utils/characterParser';
import { galadrielAPI } from '../services/ai/galadriel';
import { RateLimiter } from '../utils/RateLimiter';

// Create forge-specific rate limiter
const forgeLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 20 * 60 * 1000 // 20 minutes
}, 'forge_rate_limit');

export const createCharacter: Action = async (
  context: ActionContext
): Promise<ActionResult> => {
  try {
    if (!forgeLimiter.canMakeRequest()) {
      const timeLeft = forgeLimiter.getTimeUntilReset();
      return {
        success: false,
        error: `Rate limit exceeded. Try again in ${Math.ceil(timeLeft / 60000)} minutes.`
      };
    }

    const request = parseCharacterRequest(context.message);
    if (!request) {
      return {
        success: false,
        error: 'Invalid character request format'
      };
    }

    const character = await galadrielAPI.chat('character', JSON.stringify(request));
    forgeLimiter.incrementRequests();

    return {
      success: true,
      data: character
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Character creation failed'
    };
  }
};