import { EventEmitter } from '../utils/EventEmitter';
import { defaultCharacter } from '../config/defaultCharacter';
import { ChatManager } from '../services/chat/chatManager';
import { ColoredLine } from '../types';

class TerminalStore extends EventEmitter {
  private output: (string | ColoredLine)[] = [];
  private chatManager: ChatManager;
  private currentModel: { provider: string; model: string };

  constructor() {
    super();
    
    this.currentModel = {
      provider: defaultCharacter.modelProvider?.toUpperCase() || 'GALADRIEL',
      model: defaultCharacter.model || 'llama3.1:70b'
    };
    
    // Initialize with default output
    this.initializeBaseOutput();
    
    // Create chat manager
    this.chatManager = new ChatManager();
    
    // Wait for chat manager initialization
    this.chatManager.once('initialized', () => {
      this.addOutput([
        { text: 'Provider:', type: 'labelValue', label: 'Provider', value: this.currentModel.provider, color: 'text-cyan-400' },
        { text: 'Model:', type: 'labelValue', label: 'Model', value: this.currentModel.model, color: 'text-cyan-400' },
        { text: '', type: 'text', color: 'text-pink-500' },
        { text: '> Connection established', type: 'prompt', color: 'text-cyan-400' }
      ]);
    });
    
    this.chatManager.on('error', (error: Error | unknown) => {
      this.addOutput([
        { text: 'ERROR: Failed to initialize chat system', type: 'error', color: 'text-red-400' },
        { text: error instanceof Error ? error.message : 'Unknown error occurred', type: 'error', color: 'text-red-400' },
        { text: '', type: 'text', color: 'text-pink-500' },
        { text: 'Type "help" for available commands', type: 'text', color: 'text-pink-500' }
      ]);
      console.error('Chat manager error:', error);
    });
  }

  private initializeBaseOutput(): void {
    this.addOutput([
      { text: 'SYMBaiEX Terminal v1.0.0', type: 'header', color: 'text-cyan-400' },
      { text: '', type: 'text', color: 'text-pink-500' },
      { text: 'Type "help" for available commands', type: 'text', color: 'text-pink-500' },
      { text: 'Chat directly with SYMBaiEX by typing without the symx prefix', type: 'text', color: 'text-pink-500' },
      { text: '', type: 'text', color: 'text-pink-500' },
      { text: 'Agent:', type: 'labelValue', label: 'Agent', value: defaultCharacter.name, color: 'text-cyan-400' },
      { text: 'Provider:', type: 'labelValue', label: 'Provider', value: this.currentModel.provider, color: 'text-cyan-400' },
      { text: 'Model:', type: 'labelValue', label: 'Model', value: this.currentModel.model, color: 'text-cyan-400' },
      { text: '', type: 'text', color: 'text-pink-500' },
      { text: '> Initializing system...', type: 'prompt', color: 'text-cyan-400' }
    ]);
  }

  getOutput(): (string | ColoredLine)[] {
    return [...this.output];
  }

  async handleChat(message: string): Promise<(string | ColoredLine)[]> {
    return [
      { text: '[CHAT SESSION START]', type: 'header', color: 'text-cyan-400' },
      { text: '--------------------------------', type: 'separator', color: 'text-pink-500/30' },
      { text: `Processing: ${message}`, type: 'text', color: 'text-pink-500' },
      { text: '', type: 'text', color: 'text-pink-500' },
      { text: 'Response coming soon...', type: 'text', color: 'text-pink-500' },
      { text: '', type: 'text', color: 'text-pink-500' },
      { text: '[CHAT SESSION END]', type: 'header', color: 'text-cyan-400' }
    ];
  }

  addOutput(lines: (string | ColoredLine)[]): void {
    this.output = [...this.output, ...lines];
    this.emit('change', this.getOutput());
  }

  subscribe(callback: (output: (string | ColoredLine)[]) => void): () => void {
    this.on('change', callback);
    return () => this.off('change', callback);
  }

  clear(): void {
    this.output = [];
    this.emit('change', this.getOutput());
  }
}

export const terminalStore = new TerminalStore();