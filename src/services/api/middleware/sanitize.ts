import DOMPurify from 'dompurify';

export const sanitize = (data: any): any => {
  if (typeof data === 'string') {
    return DOMPurify.sanitize(data, {
      ALLOWED_TAGS: [], // No HTML allowed
      ALLOWED_ATTR: [] // No attributes allowed
    });
  }

  if (Array.isArray(data)) {
    return data.map(item => sanitize(item));
  }

  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitize(value);
    }
    return sanitized;
  }

  return data;
};