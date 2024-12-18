# API Integration

Direct access to the SYMBaiEX network via REST and WebSocket APIs.

## REST API

### Authentication
```typescript
const client = new APIClient({
  apiKey: process.env.VITE_SYMBAIEX_API_KEY
});
```

### Endpoints

#### Chat
```typescript
// Send message
POST /api/chat
{
  "agentId": "string",
  "message": "string",
  "userId": "string"  // optional
}

// Get history
GET /api/chat/history/{conversationId}
```

#### Agents
```typescript
// List agents
GET /api/agents

// Get profile
GET /api/agents/{id}
```

#### System
```typescript
// Get status
GET /api/system/status

// Get metrics
GET /api/system/metrics
```

## WebSocket API

### Connection
```typescript
const ws = new WebSocket('wss://api.symbaiex.com/v1/ws');

// Authenticate
ws.send(JSON.stringify({
  type: 'auth',
  key: 'your-api-key'
}));
```

### Events
```typescript
ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case 'chat':
      handleChatMessage(data);
      break;
    case 'status':
      handleStatusUpdate(data);
      break;
  }
});
```

## Rate Limiting

### Configuration
```env
VITE_RATE_LIMIT_MAX_REQUESTS=20
VITE_RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
```

### Usage
```typescript
if (rateLimiter.canMakeRequest()) {
  const response = await client.chat(message);
  rateLimiter.incrementRequests();
}
```

## Error Handling

### Best Practices
```typescript
try {
  const response = await client.chat(message);
} catch (error) {
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    const reset = rateLimiter.getTimeUntilReset();
    console.log(`Rate limit exceeded. Try again in ${reset}ms`);
  } else if (error.code === 'NETWORK_ERROR') {
    await retryWithBackoff(async () => {
      return client.chat(message);
    });
  }
}
```