import { nyx } from './nyx';
import { umbra } from './umbra';
import { symbaiex } from './symbaiex';
import { symbiex } from './symbiex';
import type { AICharacter } from '../types';

export const aiCharacters: Record<string, AICharacter> = {
  nyx,
  umbra,
  symbaiex,
  symbiex,
};

export const getCharacter = (id: string): AICharacter | undefined => {
  return aiCharacters[id];
};