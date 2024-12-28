import { Evaluator } from '../types/eliza';
import { shouldCreateCharacter } from './shouldCreateCharacter';
import { shouldHandleChat } from './shouldHandleChat';
import { shouldScanNetwork } from './shouldScanNetwork';
import { shouldAnalyzePatterns } from './shouldAnalyzePatterns';

export const evaluators: Record<string, Evaluator> = {
  shouldCreateCharacter,
  shouldHandleChat,
  shouldScanNetwork,
  shouldAnalyzePatterns
};