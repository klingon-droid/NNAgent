export interface AutoAction {
  id: string;
  type: 'scan' | 'chat' | 'analyze' | 'monitor';
  target?: string;
  interval?: number;
  lastRun?: number;
  enabled: boolean;
}

export interface ActionResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface ActionHandler {
  execute(action: AutoAction): Promise<ActionResult>;
  shouldRun(action: AutoAction): boolean;
}

export interface AutoBehavior {
  id: string;
  name: string;
  description: string;
  actions: AutoAction[];
  enabled: boolean;
}