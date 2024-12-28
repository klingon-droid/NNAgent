import { Action, ActionContext, ActionResult } from '../types/eliza';
import { createCharacter } from './createCharacter';
import { handleChat } from './handleChat';
import { scanNetwork } from './scanNetwork';
import { analyzePatterns } from './analyzePatterns';

export const actions: Record<string, Action> = {
  createCharacter,
  handleChat,
  scanNetwork,
  analyzePatterns
};