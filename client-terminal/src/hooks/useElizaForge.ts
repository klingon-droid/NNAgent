interface ElizaForgeConfig {
  aiProvider: string;
  normalModel: string;
  largeModel: string;
  apiKey?: string;
  rateLimit: {
    maxRequests: number;
    windowMs: number;
  };
}

export const useElizaForge = (config: ElizaForgeConfig) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    'Welcome to ElizaForge - Character Creation Tool',
    '----------------------------------------',
    `Rate Limit: ${forgeLimiter.getRemainingRequests()}/${config.rateLimit.maxRequests} attempts remaining`,
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

  // Initialize rate limiter with config
  const forgeLimiter = useMemo(() => new RateLimiter({
    maxRequests: config.rateLimit.maxRequests,
    windowMs: config.rateLimit.windowMs
  }, 'forge_rate_limit'), [config.rateLimit]);

  // Update initial state with config
  useEffect(() => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        modelProvider: config.aiProvider,
        model: config.normalModel
      }
    }));
  }, [config.aiProvider, config.normalModel]);

  const finalizeCharacter = async (data: Partial<Character>) => {
    setIsLoading(true);
    try {
      // Format the prompt with clear instructions for Galadriel
      const prompt = `Create a character with the following details:
      // Send to Galadriel for processing
      const provider = await getProvider('galadriel');
      const response = await galadrielAPI.chat('character', prompt, {
        model: 'llama3.1:70b', // Use most capable model for character creation
        temperature: 0.1,
        maxTokens: 2000
      });