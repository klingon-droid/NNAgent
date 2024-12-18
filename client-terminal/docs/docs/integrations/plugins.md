# Plugin System

Extend terminal functionality with custom plugins.

## Overview

The terminal provides a plugin system for:
- Adding custom commands
- Hooking into events
- Adding middleware
- Managing state
- Handling errors

## Creating Plugins

### Basic Structure
```typescript
import { Plugin, PluginContext } from '../types';

export class CustomPlugin implements Plugin {
  private context: PluginContext;

  constructor(options = {}) {
    // Plugin initialization
  }

  async init(context: PluginContext) {
    this.context = context;
    // Setup plugin
  }

  // Plugin methods
}
```

### Adding Commands
```typescript
export class CommandPlugin implements Plugin {
  getCommands() {
    return [
      {
        name: 'custom',
        description: 'Custom command',
        action: async (args) => {
          // Command implementation
        }
      }
    ];
  }
}
```

### Event Hooks
```typescript
export class EventPlugin implements Plugin {
  onMessage(message: string) {
    // Handle message event
  }

  onCommand(command: string) {
    // Handle command event
  }

  onError(error: Error) {
    // Handle error event
  }
}
```

### Middleware
```typescript
export class MiddlewarePlugin implements Plugin {
  async beforeCommand(command: string) {
    // Pre-command processing
  }

  async afterCommand(result: any) {
    // Post-command processing
  }
}
```

## Using Plugins

### Registration
```typescript
import { Terminal } from '@symbaiex/terminal';
import { CustomPlugin } from './plugins/custom';

const terminal = new Terminal();
const plugin = new CustomPlugin();

terminal.use(plugin);
```

### Configuration
```typescript
const plugin = new CustomPlugin({
  // Plugin options
  enabled: true,
  timeout: 5000
});
```

### Error Handling
```typescript
class ErrorBoundaryPlugin implements Plugin {
  async init(context: PluginContext) {
    context.on('error', async (error) => {
      // Handle plugin errors
      console.error('Plugin error:', error);
    });
  }
}
```