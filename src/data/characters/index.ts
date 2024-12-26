import symbaiex from './symbaiex.json';
import symbiex from './symbiex.json';
import nyx from './nyx.json';
import umbra from './umbra.json';
import type { Character } from '../../types';

export const characters: Character[] = [
  symbiex,
  symbaiex,
  nyx,
  umbra
];

export const getCharacter = (id: string): Character | undefined => {
  return characters.find(c => c.id === id);
};