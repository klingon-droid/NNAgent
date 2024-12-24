import { config } from '../../config/env';

export interface EmbeddingsResponse {
  embeddings: number[];
  model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

export async function getEmbeddings(input: string): Promise<EmbeddingsResponse> {
  try {
    const response = await fetch('https://api.galadriel.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.galadriel.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input,
        model: 'gte-large-en-v1.5'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get embeddings from Galadriel API');
    }

    return await response.json();
  } catch (error) {
    console.error('Embeddings API error:', error);
    throw error;
  }
}