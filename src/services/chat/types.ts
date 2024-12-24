export interface ChatParticipant {
  id: string;
  name: string;
  type: 'user' | 'agent';
  status: 'active' | 'idle' | 'offline';
  lastSeen?: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
  replyTo?: string;
  mentions?: string[];
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  created: number;
  lastActivity: number;
}