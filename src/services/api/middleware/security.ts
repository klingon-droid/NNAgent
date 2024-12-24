import { sanitize } from './sanitize';
import { validate } from './validate';

export const securityMiddleware = {
  // Request validation and sanitization
  validateRequest: async (options: RequestInit) => {
    const sanitizedBody = await sanitize(options.body);
    const validationResult = await validate(sanitizedBody);
    
    if (!validationResult.valid) {
      throw new Error(`Invalid request: ${validationResult.error}`);
    }
    
    return sanitizedBody;
  },

  // Response sanitization
  sanitizeResponse: (res: any) => {
    return sanitize(res);
  },

  // Security headers
  getSecurityHeaders: () => ({
    'Content-Security-Policy': "default-src 'self'",
    'X-Content-Type-Options': 'nosniff', 
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  })
};