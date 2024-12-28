private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: import.meta.env.VITE_GALADRIEL_API_KEY,
      baseURL: 'https://api.galadriel.com/v1',
      dangerouslyAllowBrowser: true
    });
  }

  const completion = await this.client.chat.completions.create({
    model: character.model || 'llama3.1:70b', // Default to 70b model
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: enhancedPrompt }
    ],
    max_tokens: options?.maxTokens || tokenLimit,
    temperature: options?.temperature || temperature,
    stop: ["\n\n", "```", "###"], // Multiple stop sequences
    presence_penalty: 0.6, // Encourage more diverse responses
    frequency_penalty: 0.7 // Discourage repetition
  });