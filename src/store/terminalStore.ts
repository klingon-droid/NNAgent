import { EventEmitter } from '../utils/EventEmitter';
import { defaultCharacter } from '../config/defaultCharacter';
import { ChatManager } from '../services/chat/chatManager';
import { v4 as uuidv4 } from 'uuid';
import { ColoredLine } from '../types';

class TerminalStore extends EventEmitter {
  private output: (string | ColoredLine)[] = [];
  private chatManager: ChatManager;
  private userId: string;
  private currentModel: { provider: string; model: string };

  constructor() {
    super();
    this.userId = localStorage.getItem('terminal_user_id') || uuidv4();
    localStorage.setItem('terminal_user_id', this.userId);

    this.currentModel = {
      provider: defaultCharacter.modelProvider?.toUpperCase() || 'OLLAMA',
      model: defaultCharacter.model || 'hermes3:3b'
    };
    
    // Initialize with default output
    this.initializeBaseOutput();
    
    // Create chat manager
    this.chatManager = new ChatManager();
    
    // Wait for chat manager initialization
    this.chatManager.once('initialized', () => {
      this.addOutput([
        `Provider: ${this.currentModel.provider}`,
        `Model: ${this.currentModel.model}`,
        '',
        '> Connection established'
      ]);
    });
    
    this.chatManager.on('error', (error: Error | unknown) => {
      this.addOutput([
        'ERROR: Failed to initialize chat system',
        error instanceof Error ? error.message : 'Unknown error occurred',
        '',
        'Type "help" for available commands'
      ]);
      console.error('Chat manager error:', error);
    });
    
    // Subscribe to chat events
    this.chatManager.on('messageReceived', this.handleChatMessage.bind(this));
    this.chatManager.on('modelUsed', this.handleModelUpdate.bind(this));
  }

  private initializeBaseOutput(): void {
    this.addOutput([
      { text: 'SYMBaiEX Terminal v1.0.0', color: 'text-cyan-400', type: 'header' },
      { text: '', color: 'text-pink-500', type: 'text' },
      { text: 'Type "help" for available commands', color: 'text-pink-500', type: 'text' },
      { text: 'Chat directly with SYMBaiEX by typing without the symx prefix', color: 'text-pink-500', type: 'text' },
      { text: '', color: 'text-pink-500', type: 'text' },
      { text: `Agent: ${defaultCharacter.name}`, color: 'text-cyan-400', type: 'label' },
      { text: `Provider: ${defaultCharacter.modelProvider?.toUpperCase() || 'GALADRIEL'}`, color: 'text-cyan-400', type: 'label' },
      { text: `Model: ${defaultCharacter.model || 'llama3.1:70b'}`, color: 'text-cyan-400', type: 'label' },
      { text: '', color: 'text-pink-500', type: 'text' },
      { text: '> Initializing system...', color: 'text-pink-500', type: 'prompt' }
    ]);
  }

  private handleModelUpdate(modelInfo: { provider: string; model: string }): void {
    this.currentModel = modelInfo;
    // Only log model changes to debug
    console.debug(`Model updated: ${modelInfo.provider}/${modelInfo.model}`);
  }

  private handleChatMessage({ message }: { message: any }): void {
    const prefix = message.senderId === 'system' 
      ? ''
      : `[${message.senderId.toUpperCase()}] `;
    this.addOutput([`${prefix}${message.content}`]);
  }

  getOutput(): (string | ColoredLine)[] {
    return [...this.output];
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