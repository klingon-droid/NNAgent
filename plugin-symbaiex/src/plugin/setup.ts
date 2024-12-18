import { AutonomousManager } from '../autonomous/manager';

export function setupAutonomousListeners(manager: AutonomousManager): void {
  // Handle successful scans
  manager.on('scan:success', ({ data }) => {
    console.log('Network scan completed:', data);
  });

  // Handle successful analysis
  manager.on('analyze:success', ({ data }) => {
    console.log('Pattern analysis completed:', data);
  });

  // Handle monitoring alerts
  manager.on('monitor:success', ({ data }) => {
    if (data.anomalies?.length > 0) {
      console.warn('Monitoring anomalies detected:', data.anomalies);
    }
  });

  // Handle autonomous chat results
  manager.on('chat:success', ({ data }) => {
    console.log('Autonomous chat completed:', data);
  });

  // Handle errors
  ['scan', 'analyze', 'monitor', 'chat'].forEach(type => {
    manager.on(`${type}:error`, ({ error }) => {
      console.error(`${type} action failed:`, error);
    });
  });
}