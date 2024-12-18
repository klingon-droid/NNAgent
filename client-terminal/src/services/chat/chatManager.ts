import { EventEmitter } from '../../utils/EventEmitter';
import type { ChatParticipant, ChatMessage, ChatRoom } from './types';
import { defaultCharacter } from '../../config/defaultCharacter';
import { identityManager } from '../agents/identityManager';
import { getProvider } from '../ai/providers';
import { rateLimiter } from '../api/middleware/rateLimit';
import { v4 as uuidv4 } from 'uuid';
import { AICharacter } from '../ai/types';

export class ChatManager extends EventEmitter {
  private rooms: Map<string, ChatRoom> = new Map();
  private participants: Map<string, ChatParticipant> = new Map();
  private activeRoom: string = 'main';
  private boredomThreshold = 600000; // 10 minutes
  private lastAgentResponse: Map<string, number> = new Map();
  private disposed = false;
  private provider = 'galadriel';
  private model = 'llama3.1:70b';

  constructor() {
    super();
    this.initialize();
  }

  private getModelInfo() {
    return {
      provider: this.provider.toUpperCase(),
      model: this.model
    };
  }

  private async initialize(): Promise<void> {
    try {
      const identity = identityManager.registerAgent(defaultCharacter.name, 'symbaiex');
      if (!identity) throw new Error('Failed to register default agent');

      this.createRoom('main', 'Main Chat');
      this.addParticipant({
        id: identity.id,
        name: identity.name,
        type: 'agent',
        status: 'active'
      });

      this.initializeBoredomChecker();
      this.emit('initialized');
    } catch (error) {
      console.error('Failed to initialize chat manager:', error);
      this.emit('error', error);
    }
  }

  private initializeBoredomChecker(): void {
    if (this.disposed) return;
    
    setInterval(() => {
      if (!this.disposed) this.checkBoredom();
    }, 60000);
  }

  private checkBoredom(): void {
    const now = Date.now();
    const room = this.rooms.get(this.activeRoom);
    if (!room) return;

    room.participants
      .filter(p => p.type === 'agent' && p.status === 'active')
      .forEach(agent => {
        const lastResponse = this.lastAgentResponse.get(agent.id) || 0;
        if (now - lastResponse > this.boredomThreshold) {
          this.generateBoredomResponse(agent.id).catch(console.error);
        }
      });
  }

  private async generateBoredomResponse(agentId: string): Promise<void> {
    if (this.disposed) return;

    try {
      if (!rateLimiter.canMakeRequest()) return;

      const provider = await getProvider('galadriel');
      const character: AICharacter = {
        id: agentId,
        name: defaultCharacter.name,
        personality: 'bored agent',
        systemPrompt: defaultCharacter.systemPrompt || '',
        temperature: defaultCharacter.temperature || 0.7,
        minTokens: 30,
        maxTokens: 100,
        model: 'llama3.1:70b',
        modelProvider: 'galadriel'
      };

      const response = await provider.chat(
        "I notice it's been quiet. Is there anything interesting you'd like to discuss?",
        character
      );

      rateLimiter.incrementRequests();
      const modelInfo = this.getModelInfo();
      await this.addMessage({
        id: uuidv4(),
        senderId: agentId,
        content: response,
        timestamp: Date.now()
      }, modelInfo);
    } catch (error) {
      console.error('Failed to generate boredom response:', error);
    }
  }

  private async addMessage(message: ChatMessage, modelInfo?: { provider: string; model: string }): Promise<void> {
    const room = this.rooms.get(this.activeRoom);
    if (!room) return;

    room.messages.push(message);
    room.lastActivity = Date.now();

    if (modelInfo) {
      this.emit('modelUsed', modelInfo);
    }

    this.emit('messageReceived', { roomId: this.activeRoom, message });
  }

  private createRoom(id: string, name: string): void {
    this.rooms.set(id, {
      id,
      name,
      participants: [],
      messages: [],
      created: Date.now(),
      lastActivity: Date.now()
    });
  }

  private addParticipant(participant: ChatParticipant): void {
    this.participants.set(participant.id, participant);
    const room = this.rooms.get(this.activeRoom);
    if (room) {
      room.participants.push(participant);
      this.emit('participantJoined', { roomId: this.activeRoom, participant });
    }
  }

  dispose(): void {
    this.disposed = true;
    this.removeAllListeners();
    this.rooms.clear();
    this.participants.clear();
  }
}