import { AutoBehavior, AutoAction, ActionResult } from './types';
import { defaultBehaviors } from './behaviors';
import { getHandler } from './handlers';
import { EventEmitter } from 'events';

export class AutonomousManager extends EventEmitter {
  private behaviors: AutoBehavior[] = [];
  private running: boolean = false;
  private actionResults: Map<string, ActionResult> = new Map();

  constructor() {
    super();
    this.behaviors = [...defaultBehaviors];
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.scheduleActions();
  }

  stop(): void {
    this.running = false;
  }

  private scheduleActions(): void {
    if (!this.running) return;

    // Check and execute all actions
    this.behaviors.forEach(behavior => {
      if (!behavior.enabled) return;

      behavior.actions.forEach(async action => {
        if (!action.enabled) return;

        const handler = getHandler(action);
        if (handler.shouldRun(action)) {
          try {
            const result = await handler.execute(action);
            this.handleActionResult(action, result);
          } catch (error) {
            console.error(`Action ${action.id} failed:`, error);
          }
        }
      });
    });

    // Schedule next check
    setTimeout(() => this.scheduleActions(), 1000);
  }

  private handleActionResult(action: AutoAction, result: ActionResult): void {
    action.lastRun = Date.now();
    this.actionResults.set(action.id, result);
    
    // Emit events based on result
    if (result.success) {
      this.emit(`${action.type}:success`, {
        actionId: action.id,
        data: result.data
      });
    } else {
      this.emit(`${action.type}:error`, {
        actionId: action.id,
        error: result.error
      });
    }

    // Clean up old results
    if (this.actionResults.size > 1000) {
      const oldestKey = Array.from(this.actionResults.keys())[0];
      this.actionResults.delete(oldestKey);
    }
  }

  getActionResults(): Map<string, ActionResult> {
    return new Map(this.actionResults);
  }

  getBehaviors(): AutoBehavior[] {
    return [...this.behaviors];
  }

  setBehaviorEnabled(id: string, enabled: boolean): void {
    const behavior = this.behaviors.find(b => b.id === id);
    if (behavior) {
      behavior.enabled = enabled;
    }
  }

  setActionEnabled(behaviorId: string, actionId: string, enabled: boolean): void {
    const behavior = this.behaviors.find(b => b.id === behaviorId);
    if (behavior) {
      const action = behavior.actions.find(a => a.id === actionId);
      if (action) {
        action.enabled = enabled;
      }
    }
  }
}