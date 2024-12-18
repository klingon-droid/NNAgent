import { Character } from '../types';
import { defaultCharacter } from '../config/defaultCharacter';

export const characters: Character[] = [
  {
    id: defaultCharacter.id,
    name: defaultCharacter.name,
    title: defaultCharacter.title,
    bio: defaultCharacter.bio,
    status: defaultCharacter.status,
    role: defaultCharacter.role,
    clearance: defaultCharacter.clearance,
    modelProvider: defaultCharacter.modelProvider,
    model: defaultCharacter.model,
    systemPrompt: defaultCharacter.systemPrompt,
    temperature: defaultCharacter.temperature,
    minTokens: defaultCharacter.minTokens,
    maxTokens: defaultCharacter.maxTokens
  }
];