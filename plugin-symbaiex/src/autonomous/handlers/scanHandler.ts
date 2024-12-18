import { ActionHandler, AutoAction, ActionResult } from '../types';
import { identityManager } from '../../identityManager';

export class ScanHandler implements ActionHandler {
  shouldRun(action: AutoAction): boolean {
    if (!action.lastRun) return true;
    return Date.now() - action.lastRun >= (action.interval || 300000);
  }

  async execute(action: AutoAction): Promise<ActionResult> {
    try {
      const agents = identityManager.listIdentities();
      const activeAgents = agents.filter(agent => {
        const lastSeenDiff = Date.now() - agent.lastSeen;
        return lastSeenDiff < 3600000; // Active in last hour
      });

      return {
        success: true,
        data: {
          totalAgents: agents.length,
          activeAgents: activeAgents.length,
          timestamp: Date.now()
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Scan failed'
      };
    }
  }
}