import { AutoBehavior } from './types';

export const defaultBehaviors: AutoBehavior[] = [
  {
    id: 'network_monitor',
    name: 'Network Monitor',
    description: 'Monitors network activity and agent interactions',
    enabled: true,
    actions: [
      {
        id: 'scan_network',
        type: 'scan',
        interval: 300000, // 5 minutes
        enabled: true
      },
      {
        id: 'monitor_agents',
        type: 'monitor',
        interval: 60000, // 1 minute
        enabled: true
      }
    ]
  },
  {
    id: 'pattern_analyzer',
    name: 'Pattern Analyzer',
    description: 'Analyzes communication patterns and system behavior',
    enabled: true,
    actions: [
      {
        id: 'analyze_patterns',
        type: 'analyze',
        interval: 900000, // 15 minutes
        enabled: true
      }
    ]
  },
  {
    id: 'agent_interaction',
    name: 'Agent Interaction',
    description: 'Enables autonomous agent-to-agent communication',
    enabled: true,
    actions: [
      {
        id: 'chat_initiative',
        type: 'chat',
        interval: 1800000, // 30 minutes
        enabled: true
      }
    ]
  }
];