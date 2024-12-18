// Minimal Eliza framework types
export interface Message {
  content: string;
  type?: string;
  metadata?: Record<string, any>;
}

export interface Plugin {
  init?(): Promise<void>;
  onMessage?(message: Message): Promise<string | undefined>;
}

export interface Eliza {
  use(plugin: Plugin): void;
}