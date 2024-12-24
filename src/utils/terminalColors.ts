import { ColoredLine } from '../types';

export const getLineColor = (line: ColoredLine | string | null | undefined): string => {
  if (!line) {
    return 'text-pink-500';
  }

  const content = typeof line === 'string' ? line : line.text;

  // Chat session markers
  if (content.includes('[CHAT SESSION')) return 'text-cyan-400';
  if (content.match(/^-+$/)) return 'text-pink-500/30';

  // Command inputs and prompts
  if (content.startsWith('>')) return 'text-cyan-400';
  if (content.match(/^\[.*?\]/)) return 'text-cyan-400';
  
  // Headers and labels
  if (content.match(/^[A-Z][A-Z\s]+:$/)) return 'text-cyan-400';
  if (content.includes(': ')) {
    const [label] = content.split(': ');
    if (label.toUpperCase() === label) return 'text-cyan-400';
  }

  // Status messages
  if (content.includes('Error:')) return 'text-red-400';
  if (content.includes('SUCCESS:')) return 'text-green-400'; 
  if (content.includes('ACCESSING') || content.includes('Loading')) return 'text-cyan-400';
  if (content.includes('WARNING:')) return 'text-yellow-400';

  // Command help sections
  if (content.match(/^Usage:/)) return 'text-cyan-400';
  if (content.match(/^Options:/)) return 'text-cyan-400';
  if (content.match(/^Examples?:/)) return 'text-cyan-400';
  if (content.match(/^Commands?:/)) return 'text-cyan-400';
  if (content.match(/^Note:/)) return 'text-cyan-400';

  // Bullet points and list items
  if (content.match(/^\s*[•-]/)) return 'text-cyan-400';
  if (content.match(/^\s*\d+\./)) return 'text-cyan-400';
  
  // Default text color
  return 'text-pink-500';
};