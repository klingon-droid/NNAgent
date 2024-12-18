export const validate = async (data: any) => {
  // Input validation rules
  const rules = {
    message: {
      maxLength: 1000,
      pattern: /^[\w\s@.,!?-]+$/
    },
    agentId: {
      pattern: /^[a-zA-Z0-9-_]+$/,
      maxLength: 36
    }
  };

  try {
    // Validate message content
    if (data.message) {
      if (data.message.length > rules.message.maxLength) {
        return { valid: false, error: 'Message too long' };
      }
      if (!rules.message.pattern.test(data.message)) {
        return { valid: false, error: 'Invalid message format' };
      }
    }

    // Validate agent ID
    if (data.agentId) {
      if (!rules.agentId.pattern.test(data.agentId)) {
        return { valid: false, error: 'Invalid agent ID format' };
      }
      if (data.agentId.length > rules.agentId.maxLength) {
        return { valid: false, error: 'Agent ID too long' };
      }
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: 'Validation error' };
  }
};