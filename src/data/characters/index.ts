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


// NEXUSPRIME: '57xrH2aaFWy9aJXRvDrStXYNvp5W2Y15Ee3N5FSE7ncv',
// XEN0B: '57xrH2aaFWy9aJXRvDrStXYNvp5W2Y15Ee3N5FSE7ncv',
// DRAKON9: '57xrH2aaFWy9aJXRvDrStXYNvp5W2Y15Ee3N5FSE7ncv',
// SPECTR: '57xrH2aaFWy9aJXRvDrStXYNvp5W2Y15Ee3N5FSE7ncv'