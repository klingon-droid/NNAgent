import { ActionHandler, AutoAction, ActionResult } from '../types';
import { identityManager } from '../../identityManager';

export class MonitorHandler implements ActionHandler {
  shouldRun(action: AutoAction): boolean {
    if (!action.lastRun) return true;
    return Date.now() - action.lastRun >= (action.interval || 60000);
  }

  async execute(action: AutoAction): Promise<ActionResult> {
    try {
      const agents = identityManager.listIdentities();
      const now = Date.now();

      // Monitor agent states
      const agentStates = agents.map(agent => ({
        id: agent.id,
        name: agent.name,
        status: this.determineAgentStatus(agent.lastSeen, now),
        timeSinceLastSeen: now - agent.lastSeen
      }));

      // Check for anomalies
      const anomalies = this.detectAnomalies(agentStates);

      return {
        success: true,
        data: {
          states: agentStates,
          anomalies,
          timestamp: now
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Monitoring failed'
      };
    }
  }

  private determineAgentStatus(lastSeen: number, now: number): string {
    const minutesSinceActive = (now - lastSeen) / (1000 * 60);
    if (minutesSinceActive < 5) return 'active';
    if (minutesSinceActive < 60) return 'idle';
    return 'inactive';
  }

  private detectAnomalies(states: any[]): any[] {
    return states
      .filter(state => state.status === 'inactive')
      .map(state => ({
        type: 'inactivity',
        agentId: state.id,
        agentName: state.name,
        duration: state.timeSinceLastSeen
      }));
  }
}