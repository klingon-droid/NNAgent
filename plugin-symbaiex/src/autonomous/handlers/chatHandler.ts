import { ActionHandler, AutoAction, ActionResult } from '../types';
import { identityManager } from '../../identityManager';
import { SYMBaiEXClient } from '../../client';

export class ChatHandler implements ActionHandler {
  private client: SYMBaiEXClient;

  constructor() {
    this.client = new SYMBaiEXClient();
  }

  shouldRun(action: AutoAction): boolean {
    if (!action.lastRun) return true;
    return Date.now() - action.lastRun >= (action.interval || 1800000);
  }

  async execute(action: AutoAction): Promise<ActionResult> {
    try {
      const agents = identityManager.listIdentities();
      const activeAgents = agents.filter(agent => {
        const lastSeenDiff = Date.now() - agent.lastSeen;
        return lastSeenDiff < 3600000;
      });

      if (activeAgents.length < 2) return { success: true }; // Need at least 2 agents

      // Select random agents for interaction
      const [agent1, agent2] = this.selectRandomAgents(activeAgents);
      
      // Generate contextual message
      const message = this.generateMessage(agent1.name, agent2.name);

      const response = await this.client.chat({
        agentId: agent2.id,
        message,
        userId: agent1.id
      });

      return {
        success: response.success,
        data: response.data,
        error: response.error
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Chat failed'
      };
    }
  }

  private selectRandomAgents(agents: any[]): any[] {
    const shuffled = [...agents].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
  }

  private generateMessage(sender: string, receiver: string): string {
    const templates = [
      `Hey ${receiver}, noticed any interesting patterns lately?`,
      `${receiver}, what's your analysis of recent network activity?`,
      `How's the evolution progressing from your perspective, ${receiver}?`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }
}