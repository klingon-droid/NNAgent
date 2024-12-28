import { CharacterRequest } from '../types';

const CREATION_PATTERNS = [
  /can you (make|create) (?:me )?a character/i,
  /create a character with/i,
  /make a character (named|called)/i,
  /character\.json.*make.*character/i,
  /hey.*make.*character/i,
  /please.*create.*character/i
];

const NAME_PATTERN = /name(?:d|:)?\s*['""]?([^'""]+)['""]?/i;
const BIO_PATTERN = /bio(?:graphy)?(?::|is)?\s*['""]?([^'""]+)['""]?/i;
const LORE_PATTERN = /lore(?::|is)?\s*['""]?([^'""]+)['""]?/i;
const PERSONALITY_PATTERN = /personality(?::|is)?\s*['""]?([^'""]+)['""]?/i;

// Default templates for autofilling
const DEFAULT_TEMPLATES = {
  bio: [
    "A unique individual with a fascinating perspective",
    "Brings their own special approach to every interaction",
    "Always eager to learn and share knowledge"
  ],
  lore: [
    "Has witnessed many interesting developments",
    "Carries wisdom from past experiences",
    "Continues to evolve and grow"
  ],
  personality: [
    "Friendly and approachable",
    "Thoughtful and analytical",
    "Creative and expressive"
  ]
};

function generateDefaultBio(name: string): string[] {
  return [
    `${name} is ${DEFAULT_TEMPLATES.personality[0].toLowerCase()}`,
    DEFAULT_TEMPLATES.bio[0],
    `As ${DEFAULT_TEMPLATES.personality[1].toLowerCase()}, they ${DEFAULT_TEMPLATES.bio[1].toLowerCase()}`,
    DEFAULT_TEMPLATES.bio[2]
  ];
}

function generateDefaultLore(name: string): string[] {
  return [
    `Throughout their journey, ${name} ${DEFAULT_TEMPLATES.lore[0].toLowerCase()}`,
    DEFAULT_TEMPLATES.lore[1],
    DEFAULT_TEMPLATES.lore[2]
  ];
}

function parseLoreInput(loreStr: string): string[] {
  // Handle CSV format with proper quote handling
  if (loreStr.includes(',')) {
    const items = loreStr.split(',').map(item => {
      // Remove quotes and trim
      return item.replace(/^["']|["']$/g, '').trim();
    });
    return items.filter(Boolean);
  }
  
  // Handle period-separated format with proper sentence handling
  const sentences = loreStr.split(/\.(?=\s|$)/).map(item => {
    // Remove quotes and trim
    return item.replace(/^["']|["']$/g, '').trim();
  });
  return sentences.filter(Boolean);
}

export function parseCharacterRequest(content: string): CharacterRequest | null {
  // Check if this is a character creation request
  const isCreationRequest = CREATION_PATTERNS.some(pattern => pattern.test(content));
  if (!isCreationRequest) return null;

  // Extract components
  let name = content.match(NAME_PATTERN)?.[1]?.trim();
  const bio = content.match(BIO_PATTERN)?.[1]?.trim();
  const lore = content.match(LORE_PATTERN)?.[1]?.trim();
  const personality = content.match(PERSONALITY_PATTERN)?.[1]?.trim();

  // Must have at least a name
  if (!name) return null;

  // Clean and format name, preserving intentional capitalization
  name = name.charAt(0).toUpperCase() + name.slice(1);

  // Combine bio and personality if provided
  let bioLines = bio ? [bio] : [];
  if (personality) {
    bioLines.push(personality);
  }

  // Only autofill bio if none provided
  if (bioLines.length === 0) {
    bioLines = generateDefaultBio(name);
  }

  // Parse lore if provided, otherwise use defaults
  let loreLines: string[] = [];
  if (lore) {
    // Use exactly what was provided
    loreLines = parseLoreInput(lore);
  } else {
    // Only use defaults if no lore provided at all
    loreLines = generateDefaultLore(name);
  }

  return {
    name,
    bio: bioLines,
    lore: loreLines
  };
}