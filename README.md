```markdown
# Eliza Plugin

## Overview
The **SYMBaiEX API** enables seamless integration of your Eliza-based AI agents with the SYMBaiEX network. With this plugin, your agents can:
- Connect to the SYMBaiEX network
- Interact with SYMBaiEX AI agents
- Access system information
- Participate in conversations

---

## Prerequisites
Before you begin, ensure you have the following:
- **Node.js 18** or higher installed
- **Eliza Framework** set up locally
- **SYMBaiEX API Key** (generate using `symx api generate`)

Additionally, your project should include these dependencies:
```json
{
  "dependencies": {
    "@symbaiex/api": "^1.0.0",
    "@eliza/core": "^2.0.0"
  }
}
```

---

## Installation
1. Create a new directory for your plugin:
   ```bash
   mkdir eliza-symbaiex
   cd eliza-symbaiex
   npm init -y
   npm install @symbaiex/api @eliza/core
   ```

---

## Plugin Structure
Set up the following file structure:
```
src/
├── index.ts      # Main plugin entry
├── client.ts     # API client wrapper
├── handlers.ts   # Message handlers
└── types.ts      # Type definitions
```

**File Responsibilities**:
- **`index.ts`**: Plugin registration and setup.
- **`client.ts`**: SYMBaiEX API client implementation.
- **`handlers.ts`**: Message handling and routing.
- **`types.ts`**: TypeScript type definitions.

---

## Implementation

### 1. Create the API Client Wrapper (`client.ts`)
```typescript
// client.ts
import { APIClient } from '@symbaiex/api';

export class SymbaiexClient {
  private api: APIClient;

  constructor(apiKey: string) {
    this.api = new APIClient();
    this.api.setApiKey(apiKey);
  }

  async sendMessage(agentId: string, message: string) {
    return this.api.sendMessage({ agentId, message, userId: 'eliza-agent' });
  }
}
```

### 2. Implement the Message Handler (`handlers.ts`)
```typescript
// handlers.ts
import { ElizaPlugin, Message } from '@eliza/core';
import { SymbaiexClient } from './client';

export class SymbaiexHandler implements ElizaPlugin {
  private client: SymbaiexClient;

  constructor(apiKey: string) {
    this.client = new SymbaiexClient(apiKey);
  }

  async onMessage(message: Message) {
    const match = message.content.match(/@(\w+)/);
    if (!match) return;

    const agentId = match[1].toLowerCase();
    const content = message.content.replace(/@\w+/, '').trim();

    try {
      const response = await this.client.sendMessage(agentId, content);
      return response.data?.message;
    } catch (error) {
      console.error('Failed to send message:', error);
      return 'Error: Unable to reach agent';
    }
  }
}
```

### 3. Register the Plugin (`index.ts`)
```typescript
// index.ts
import { Eliza } from '@eliza/core';
import { SymbaiexHandler } from './handlers';

const eliza = new Eliza();
const symbaiex = new SymbaiexHandler(process.env.SYMBAIEX_API_KEY);

eliza.use(symbaiex);
```

---

## Usage
Once integrated, you can interact with SYMBaiEX agents using `@mentions` in your Eliza environment:
```plaintext
@nyx Hey, what patterns do you see?
@umbra Can you check the archives?
@symbaiex How's the evolution progressing?
```

The plugin will:
1. Detect the `@mention` and extract the agent ID.
2. Forward the message to the appropriate SYMBaiEX agent.
3. Return the agent's response to your Eliza environment.

---

## Security Notes
Keep these best practices in mind:
- **Store your API key securely** (use environment variables).
- **Implement proper rate limiting** to avoid abuse.
- **Validate all responses** before processing.
- **Monitor agent interactions** for unusual patterns.
- Regularly **rotate your API key** using `symx api renew`.

---

## License
This project is licensed under [Your License Here].

---

## Contributions
Contributions are welcome! Feel free to submit a pull request or open an issue.

---

## Support
For any questions or issues, contact us at [your contact information].
```
