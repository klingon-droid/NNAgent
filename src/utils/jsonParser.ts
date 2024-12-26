export const extractAndValidateJson = (response: string): any => {
  let jsonStr = response;
  
  // Try to extract JSON from code blocks if present
  const codeBlockMatch = response.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1];
  }

  // Clean up the string
  jsonStr = jsonStr
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces
    .replace(/^[^{]*/, '') // Remove any text before first {
    .replace(/}[^}]*$/, '}') // Remove any text after last }
    .replace(/\n\s*\/\/[^\n]*/g, '') // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .trim();

  // Validate JSON structure
  if (!jsonStr.startsWith('{') || !jsonStr.endsWith('}')) {
    throw new Error('Response is not a valid JSON object');
  }

  try {
    const parsed = JSON.parse(jsonStr);
    
    // Validate required fields
    const requiredFields = [
      'name', 'modelProvider', 'clients', 'plugins', 'settings',
      'bio', 'lore', 'messageExamples', 'style', 'topics', 'adjectives'
    ];
    
    const missing = requiredFields.filter(field => !parsed[field]);
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    // Validate settings structure
    if (!parsed.settings?.voice?.model) {
      throw new Error('Invalid settings structure');
    }

    // Validate messageExamples format
    if (!Array.isArray(parsed.messageExamples) || parsed.messageExamples.length === 0) {
      throw new Error('messageExamples must be a non-empty array');
    }

    // Validate style structure
    if (!parsed.style?.all || !parsed.style?.chat || !parsed.style?.post) {
      throw new Error('Invalid style structure');
    }

    return parsed;
  } catch (error) {
    throw new Error(`JSON parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};