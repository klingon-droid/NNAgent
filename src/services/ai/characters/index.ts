import { nyx } from './nyx';
import { umbra } from './umbra';
import { symbaiex } from './symbaiex';
import { symbiex } from './symbiex';
import { AICharacter } from '../types';

export const characters: Record<string, AICharacter> = {
  nyx,
  umbra,
  symbaiex,
  symbiex,
};

export const getCharacter = (id: string): AICharacter | undefined => {
  return characters[id];
};