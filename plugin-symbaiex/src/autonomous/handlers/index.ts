import { ScanHandler } from './scanHandler';
import { ChatHandler } from './chatHandler';
import { AnalyzeHandler } from './analyzeHandler';
import { MonitorHandler } from './monitorHandler';
import { ActionHandler, AutoAction } from '../types';

const handlers: Record<string, ActionHandler> = {
  scan: new ScanHandler(),
  chat: new ChatHandler(),
  analyze: new AnalyzeHandler(),
  monitor: new MonitorHandler()
};

export function getHandler(action: AutoAction): ActionHandler {
  const handler = handlers[action.type];
  if (!handler) {
    throw new Error(`No handler found for action type: ${action.type}`);
  }
  return handler;
}