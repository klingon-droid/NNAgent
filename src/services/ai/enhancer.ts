import { EmbeddingsResponse } from './embeddings';
import { AICharacter } from './types';

export function enhancePrompt(
  message: string, 
  embeddings: EmbeddingsResponse,
  character: AICharacter
): string {
  // Combine original message with embeddings context
  return `[CONTEXT: Semantic embedding strength: ${embeddings.usage.prompt_tokens}]

IMPORTANT INSTRUCTIONS:
1. Keep your response under ${character.maxTokens} tokens
2. Always complete your thoughts and sentences
3. Never end mid-sentence or with an incomplete thought
4. If approaching the token limit, wrap up your current thought completely

User message: ${message}`;
}