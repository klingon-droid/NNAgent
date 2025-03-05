import { EventEmitter } from '../utils/EventEmitter';
import { defaultCharacter } from '../config/defaultCharacter';
import { characters } from '../data/characters';
import { aiCharacters } from '../services/ai/characters';
import { userService } from '../services/user';
import { galadrielAPI } from '../services/ai/galadriel';
import { db } from '../services/db';
import { ChatManager } from '../services/chat/chatManager';
import { v4 as uuidv4 } from 'uuid';
import { ColoredLine } from '../types';

class TerminalStore extends EventEmitter {
  private output: (string | ColoredLine)[] = [];
  private chatManager: ChatManager;
  private userId: string;
  private activeCharacter: string = userService.getActiveCharacter();
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
    const activeCharacter = characters.find(c => c.id === userService.getActiveCharacter());
    const username = userService.getUsername();
    const usernameDisplay = username ? `User: ${username}` : 'User: Set Username';
    this.addOutput([
      { text: 'NNAgent Terminal v1.0.5', color: 'text-cyan-400', type: 'header' },
      { text: '', color: 'text-pink-500', type: 'text' },
      { text: 'Type "help" for available commands', color: 'text-pink-500', type: 'text' },
      { text: 'Chat directly with NNAgent by typing without the symx prefix', color: 'text-pink-500', type: 'text' },
      { text: '', color: 'text-pink-500', type: 'text' },
      { text: usernameDisplay, color: 'text-cyan-400', type: 'label' },
      { text: `Agent: ${activeCharacter?.name || defaultCharacter.name}`, color: 'text-cyan-400', type: 'label' },
      { text: `Provider: ${defaultCharacter.modelProvider?.toUpperCase() || 'GALADRIEL'}`, color: 'text-cyan-400', type: 'label' },
      { text: `Model: ${defaultCharacter.model || 'llama3.1:70b'}`, color: 'text-cyan-400', type: 'label' },
      { text: '', color: 'text-pink-500', type: 'text' },
      { text: '> Initializing system...', color: 'text-pink-500', type: 'prompt' }
    ]);
  }

  async handleChat(message: string): Promise<(string | ColoredLine)[]> {
    const character = characters.find(c => c.id === this.activeCharacter);
    const aiCharacter = aiCharacters[this.activeCharacter];
    
    if (!character) {
      return [
        { text: 'ERROR: No active character selected', type: 'error', color: 'text-red-400' },
        { text: 'Use "symx chat <agent>" to select a character', type: 'text', color: 'text-pink-500' }
      ];
    }

    if (!aiCharacter) {
      return [
        { text: 'ERROR: Character AI profile not found', type: 'error', color: 'text-red-400' },
        { text: 'Please report this error', type: 'text', color: 'text-pink-500' }
      ];
    }
    try {
      const response = await galadrielAPI.chat(character.id, message);
      
      // Store user message
      await db.addMemory({
        user_id: this.userId,
        character_id: character.id,
        conversation_id: uuidv4(),
        message: message,
        role: 'user',
        timestamp: Date.now()
      });

      return [
        { text: '[CHAT SESSION START]', type: 'header', color: 'text-cyan-400' },
        { text: '--------------------------------', type: 'separator', color: 'text-pink-500/30' },
        { text: `[${character.name.toUpperCase()}] Processing input: "${message}"`, type: 'text', color: 'text-cyan-400' },
        { text: '', type: 'text', color: 'text-pink-500' },
        { text: response.message, type: 'text', color: 'text-pink-500' },
        { text: '', type: 'text', color: 'text-pink-500' },
        { text: '[CHAT SESSION END]', type: 'header', color: 'text-cyan-400' }
      ];
    } catch (error) {
      return [
        { text: 'ERROR: Failed to process chat', type: 'error', color: 'text-red-400' },
        { text: error instanceof Error ? error.message : 'Unknown error occurred', type: 'error', color: 'text-red-400' }
      ];
    }
  }

  updateActiveAgent(characterId: string): void {
    this.activeCharacter = characterId;
    const character = characters.find(c => c.id === characterId);
    if (character) {
      this.addOutput([
        { text: '', type: 'text', color: 'text-pink-500' },
        { text: 'AGENT SWITCHED', type: 'header', color: 'text-cyan-400' },
        { text: '--------------', type: 'separator', color: 'text-pink-500/30' },
        { text: `Now chatting with: ${character.name}`, type: 'text', color: 'text-pink-500' },
        { text: '', type: 'text', color: 'text-pink-500' }
      ]);
    }
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
    const activeCharacter = characters.find(c => c.id === userService.getActiveCharacter());
    const username = userService.getUsername();
    const usernameDisplay = username ? `User: ${username}` : 'User: Set Username';
    this.output = [
      { text: 'NNAgent Terminal v1.0.5', color: 'text-cyan-400', type: 'header' },
      { text: '', color: 'text-pink-500', type: 'text' },
      { text: 'Type "help" for available commands', color: 'text-pink-500', type: 'text' },
      { text: 'Chat directly with NNAgent by typing without the symx prefix', color: 'text-pink-500', type: 'text' },
      { text: '', color: 'text-pink-500', type: 'text' },
      { text: usernameDisplay, color: 'text-cyan-400', type: 'label' },
      { text: `Agent: ${activeCharacter?.name || defaultCharacter.name}`, color: 'text-cyan-400', type: 'label' },
      { text: `Provider: ${defaultCharacter.modelProvider?.toUpperCase() || 'GALADRIEL'}`, color: 'text-cyan-400', type: 'label' },
      { text: `Model: ${defaultCharacter.model || 'llama3.1:70b'}`, color: 'text-cyan-400', type: 'label' },
      { text: '', color: 'text-pink-500', type: 'text' }
    ];
    this.emit('change', this.getOutput());
  }
}

export const terminalStore = new TerminalStore();