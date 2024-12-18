import { Message } from '../types/eliza';
import { identityManager } from '../identityManager';
import { rateLimiter } from '../services/rateLimit';

export async function handleMessage(message: Message, apiKey: string): Promise<string | undefined> {
  // Check for @agent mentions
  const match = message.content.match(/@(\w+)/);
  if (!match) return;
  
  const targetHandle = match[1].toLowerCase();
  const targetIdentity = identityManager.getIdentityByHandle(targetHandle);
  if (!targetIdentity) return;

  if (!rateLimiter.canMakeRequest()) {
    return 'Rate limit exceeded. Please try again later.';
  }

  return message.content.replace(/@\w+/, '').trim();
}