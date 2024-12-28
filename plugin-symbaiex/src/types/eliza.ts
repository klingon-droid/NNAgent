// Minimal Eliza framework types
export interface Message {
  content: string;
  type?: string;
  metadata?: Record<string, any>;
}

export interface ActionContext {
  message: string;
  metadata?: Record<string, any>;
  character?: Character;
}

export interface ActionResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface Action {
  (context: ActionContext): Promise<ActionResult>;
}

export interface Evaluator {
  (message: Message): Promise<boolean>;
}

export interface Plugin {
  init?(): Promise<void>;
  onMessage?(message: Message): Promise<string | undefined>;
  createCharacter?(prompt: string): Promise<Character>;
  getCharacter?(name: string): Promise<Character | null>;
  evaluateMessage?(message: Message): Promise<string | undefined>;
}

export interface Eliza {
  use(plugin: Plugin): void;
}