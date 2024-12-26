import { Character } from '../types/eliza';

export const getCharacterCreationPrompt = (name: string, bio: string[]): string => {
  return `Create a character profile with the following details:

Initial Info:
${bio.join('\n')}

Return a valid JSON object with these EXACT fields and structure:
{
  "name": "${name}",
  "modelProvider": "ollama",
  "clients": [],
  "plugins": [],
  "settings": {
    "secrets": {},
    "voice": {
      "model": "en_US-hfc_female-medium"
    }
  },
  "bio": ["Expand this into 5-8 relevant character background details"],
  "lore": ["Add 5-8 relevant background details"],
  "messageExamples": [
    [
      {
        "user": "{{user1}}",
        "content": {
          "text": "Write a relevant question"
        }
      },
      {
        "user": "${name}",
        "content": {
          "text": "Write a character-appropriate response"
        }
      }
    ]
  ],
  "postExamples": ["Add 5-8 example social media posts that showcase the character's personality"],
  "topics": ["Add 5-8 relevant topics"],
  "style": {
    "all": ["Add 5 general style traits"],
    "chat": ["Add 5 chat-specific traits"],
    "post": ["Add 5 post-specific traits"]
  },
  "adjectives": ["Add 5-8 defining traits"]
}

CRITICAL REQUIREMENTS:
1. Return ONLY the JSON object, no explanations or code blocks
2. Generate new bio entries based on the initial info, don't repeat verbatim
3. Ensure all arrays have meaningful, unique entries
4. Include at least 5 unique post examples that demonstrate different aspects of personality
5. Keep responses concise but character-appropriate
6. Make each post example distinct and showcase different writing styles/moods`;
};