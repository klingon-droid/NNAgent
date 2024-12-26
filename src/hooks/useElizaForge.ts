import { useState, useCallback, KeyboardEvent } from 'react';
import { Character } from '../types/eliza';
import { galadrielAPI } from '../services/ai/galadriel';
import { getProvider } from '../services/ai/providers';
import { db } from '../services/db';
import { RateLimiter } from '../utils/RateLimiter';

// Create rate limiter instance for forge
const forgeLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 20 * 60 * 1000 // 20 minutes
}, 'forge_rate_limit');

type ForgeState = {
  step: number;
  data: Partial<Character>;
  currentField?: string;
};

const INITIAL_STATE: ForgeState = {
  step: 0,
  data: {
    name: '',
    modelProvider: 'ollama',
    clients: [],
    plugins: [],
    settings: {
      secrets: {},
      voice: {
        model: 'en_US-hfc_female-medium'
      }
    },
    bio: [],
    lore: [],
    knowledge: [],
    messageExamples: [],
    postExamples: [''],
    topics: [''],
    style: {
      all: [''],
      chat: [''],
      post: ['']
    },
    adjectives: ['']
  }
};

export const useElizaForge = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    'Welcome to ElizaForge - Character Creation Tool',
    '----------------------------------------',
    `Rate Limit: ${forgeLimiter.getRemainingRequests()}/5 attempts remaining`,
    'Resets every 20 minutes',
    '',
    'Type "start" to begin creating your character.',
    'Type "help" for available commands.',
    ''
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<ForgeState>(INITIAL_STATE);
  const [characterData, setCharacterData] = useState<Character | null>(null);
  const [gender, setGender] = useState<'male' | 'female'>('female');

  const addOutput = (lines: string[]) => {
    setOutput(prev => [...prev, ...lines]);
  };

  const handleCommand = useCallback(async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Check rate limit before processing
    if (!forgeLimiter.canMakeRequest()) {
      const timeLeft = forgeLimiter.getTimeUntilReset();
      const minutes = Math.ceil(timeLeft / 60000);
      addOutput([
        'Rate limit exceeded.',
        `Please try again in ${minutes} minute${minutes > 1 ? 's' : ''}.`,
        `Forge Rate Limit: ${forgeLimiter.getRemainingRequests()}/5 attempts remaining`,
        `Window resets in ${Math.ceil(timeLeft / 60000)} minutes`
      ]);
      setInput('');
      return;
    }

    // Don't process commands while loading
    if (isLoading) return;
    
    // Echo the command
    addOutput([`> ${cmd}`, '']);

    if (trimmedCmd === 'start') {
      setState({
        ...INITIAL_STATE,
        step: 1
      });
      setCharacterData(null);
      addOutput([
        'Starting character creation...',
        'First, select your character\'s voice:',
        '',
        '1. Female',
        '2. Male',
        '',
        'Enter 1 or 2:'
      ]);
      setInput('');
      return;
    }

    if (trimmedCmd === 'help') {
      addOutput([
        'Available Commands:',
        '  start    Begin character creation',
        '  help     Show this help message',
        '  clear    Clear terminal output',
        ''
      ]);
      setInput('');
      return;
    }

    if (trimmedCmd === 'clear') {
      setOutput([]);
      setInput('');
      return;
    }

    if (state.step === 0) {
      addOutput([
        'Type "start" to begin or "help" for commands.',
        ''
      ]);
      setInput('');
      return;
    }

    // Process character creation steps
    setInput(''); // Clear input immediately when processing
    await processStep(cmd);
  }, [state]);

  const processStep = async (value: string) => {
    const { step, data } = state;

    const trimmedValue = value.trim();

    switch (step) {
      case 1: // Gender
        if (!['1', '2'].includes(trimmedValue)) {
          addOutput(['Please enter 1 for Female or 2 for Male', '']);
          break;
        }

        const selectedGender = trimmedValue === '1' ? 'female' : 'male';
        setGender(selectedGender);

        setState({
          step: 2,
          data: {
            ...data,
            settings: {
              ...data.settings,
              voice: {
                model: selectedGender === 'female' ? 'en_US-hfc_female-medium' : 'en_US-male-medium'
              }
            }
          }
        });

        addOutput([
          `Gender set to: ${selectedGender}`,
          '',
          "What's your character's name?"
        ]);
        break;

      case 2: // Name
        setState({
          step: 3,
          data: { 
            ...data, 
            name: trimmedValue,
            bio: []  // Initialize bio array
          }
        });
        addOutput([
          'Name saved.',
          '',
          'Enter a brief biography for your character:',
          'Note: Enter biography lines as comma-separated values',
          ''
        ]);
        break;

      case 3: // Bio
        const bioLines = trimmedValue.split(',').map(line => line.trim()).filter(Boolean);
        
        if (!bioLines.length) {
          addOutput(['Error: Please enter at least one biography line.', '']);
          break;
        }

        setState({
          step: 4,
          data: {
            ...data,
            bio: bioLines
          }
        });
        addOutput([
          'Biography saved.',
          '',
          'Enter a brief lore for your character:',
          'Note: Enter lore lines as comma-separated values',
          ''
        ]);
        break;

      case 4: // Lore
        const loreLines = trimmedValue.split(',').map(line => line.trim()).filter(Boolean);
        
        if (!loreLines.length) {
          addOutput(['Error: Please enter at least one lore line.', '']);
          break;
        }

        setState({
          step: 0,
          data: {
            ...data,
            lore: loreLines
          }
        });
        addOutput([
          'Lore saved.',
          ''
        ]);
        await finalizeCharacter({
          ...data,
          lore: loreLines
        });
        break;
    }
  };

  const finalizeCharacter = async (data: Partial<Character>) => {
    setIsLoading(true);
    try {
      if (!forgeLimiter.canMakeRequest()) {
        const timeLeft = forgeLimiter.getTimeUntilReset();
        const minutes = Math.ceil(timeLeft / 60000);
        addOutput([
          'Rate limit exceeded.',
          `Please try again in ${minutes} minute${minutes > 1 ? 's' : ''}.`,
          '',
          `Remaining attempts: ${forgeLimiter.getRemainingRequests()}/5 per 20 minutes`
        ]);
        setIsLoading(false);
        return;
      }
      addOutput([
        ''
      ]);

      // Format the prompt with clear instructions for Galadriel
      const prompt = `Create a character with the following details:

Name: ${data.name || ''}
Bio: ${data.bio?.join('\n') || ''}

Based on this character, please:
1. Expand the biography into multiple relevant lines
2. Generate appropriate lore entries that add depth to their background
3. Create exactly 2 example message exchanges that demonstrate their personality
4. Generate style guides for chat and posts
5. Add relevant topics and adjectives that fit their character
6. Format everything as a valid JSON object

CRITICAL MESSAGE EXAMPLE FORMAT:
Each message example MUST follow this EXACT format with NO variations:
[
  [
    {
      "user": "{{user1}}",
      "content": {
        "text": "Question for the character"
      }
    },
    {
      "user": "${data.name}",
      "content": {
        "text": "Character's response"
      }
    }
  ]
]

IMPORTANT:
- The character name "${data.name}" must be used exactly as shown
- Each message example must have exactly 2 messages
- First message must have user: "{{user1}}"
- Second message must have user: "${data.name}"
- Keep responses focused and in character`;

      // Send to Galadriel for processing
      const provider = await getProvider('galadriel');
      const response = await galadrielAPI.chat('character', prompt);
      forgeLimiter.incrementRequests();
      if (!response.message) {
        throw new Error('No response received from AI');
      }

      // Try to parse the response as JSON, with error handling
      let character: Character;
      try {
        // Clean up the response to ensure it's valid JSON
        const cleanJson = response.message
          .replace(/```(?:json)?\s*([\s\S]*?)\s*```/g, '$1')
          .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces 
          .replace(/^[^{]*?(\{[\s\S]*\})[^}]*$/, '$1')
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
          .trim();
        
        if (!cleanJson.startsWith('{') || !cleanJson.endsWith('}')) {
          throw new Error('Invalid JSON response format');
        }

        character = JSON.parse(cleanJson);

        // Validate required fields
        const requiredFields = ['name', 'bio', 'style', 'modelProvider', 'messageExamples'];
        const missingFields = requiredFields.filter(field => !character[field]);
        
        if (missingFields.length > 0) {
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // Validate messageExamples format
        if (!Array.isArray(character.messageExamples)) {
          throw new Error('messageExamples must be an array');
        }

        character.messageExamples.forEach((exchange, i) => {
          if (!Array.isArray(exchange) || exchange.length !== 2) {
            throw new Error(`Message example ${i + 1} must be an array with exactly 2 messages`);
          }
          
          const [userMsg, charMsg] = exchange;
          
          if (!userMsg?.user || userMsg.user !== '{{user1}}') {
            throw new Error(`First message user must be {{user1}} in example ${i + 1}`);
          }
          
          if (!charMsg?.user || charMsg.user !== data.name) {
            throw new Error(`Second message user must be character name in example ${i + 1}`);
          }
          
          if (!userMsg?.content?.text || !charMsg?.content?.text) {
            throw new Error(`Invalid message format in example ${i + 1}`);
          }
        });

        // Ensure arrays exist in correct order
        character = {
          ...character,
          clients: [],
          plugins: [],
          settings: {
            secrets: {},
            voice: {
              model: gender === 'female' ? 'en_US-hfc_female-medium' : 'en_US-male-medium'
            }
          },
          style: {
            all: character.style?.all || [],
            chat: character.style?.chat || [],
            post: character.style?.post || []
          },
          messageExamples: character.messageExamples || [],
          postExamples: character.postExamples || [],
          topics: character.topics || [],
          adjectives: character.adjectives || []
        };

      } catch (parseError) {
        console.error('Failed to parse character data:', parseError instanceof Error ? parseError.message : parseError);
        throw new Error('Invalid character data received. Please try again.');
      }

      setCharacterData(character);

      // Log the created character
      await db.addCharacterLog(character);
      
      addOutput([
        'Character creation complete!',
        'You can now download the character file or continue editing.',
        '',
        `Forge Rate Limit: ${forgeLimiter.getRemainingRequests()}/5 attempts remaining`,
        `Window resets in ${Math.ceil(forgeLimiter.getTimeUntilReset() / 60000)} minutes`,
        '',
        'Type "start" to create a new character.'
      ]);

      setState(INITIAL_STATE);
    } catch (error) {
      addOutput([
        'Error creating character:',
        error instanceof Error ? error.message : 'Failed to generate character data',
        'Please try again with a more detailed description.',
        '',
        `Forge Rate Limit: ${forgeLimiter.getRemainingRequests()}/5 attempts remaining`,
        `Window resets in ${Math.ceil(forgeLimiter.getTimeUntilReset() / 60000)} minutes`,
        '',
        'Tip: Try providing more specific details about your character'
      ]);
      console.error('Character creation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    // Don't handle keystrokes while loading
    if (isLoading) return;
    
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input);
    }
  }, [input, handleCommand, isLoading]);

  const downloadCharacter = useCallback(() => {
    if (!characterData) return;

    const blob = new Blob([JSON.stringify(characterData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${characterData.name.toLowerCase().replace(/\s+/g, '_')}.character.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [characterData]);

  return {
    input,
    setInput,
    output,
    isLoading,
    characterData,
    setCharacterData,
    handleCommand,
    handleKeyDown,
    downloadCharacter
  };
};