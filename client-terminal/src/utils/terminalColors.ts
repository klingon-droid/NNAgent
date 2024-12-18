export const getLineColor = (line: string | null | undefined): string => {
  if (!line || typeof line !== 'string') {
    return 'text-pink-500';
  }

  // Chat session markers
  if (line === '[CHAT SESSION START]') return 'text-cyan-400';
  if (line === '[CHAT SESSION END]') return 'text-cyan-400';
  if (line === '--------------------------------') return 'text-pink-500/30';

  // Command inputs and prompts
  if (line.startsWith('>')) return 'text-cyan-400';
  if (line.match(/^\[.*?\] Processing input:/)) return 'text-cyan-400';
  
  // Headers and labels
  if (line.match(/^[A-Z][A-Z\s]+:$/)) return 'text-cyan-400';
  if (line.includes(': ')) {
    const [label] = line.split(': ');
    if (label.toUpperCase() === label) return 'text-cyan-400';
  }

  // Status messages
  if (line.includes('Error:')) return 'text-red-400';
  if (line.includes('SUCCESS:')) return 'text-green-400'; 
  if (line.includes('ACCESSING') || line.includes('Loading')) return 'text-cyan-400';
  if (line.includes('WARNING:')) return 'text-yellow-400';

  // Command help sections
  if (line.match(/^Usage:/)) return 'text-cyan-400';
  if (line.match(/^Options:/)) return 'text-cyan-400';
  if (line.match(/^Examples?:/)) return 'text-cyan-400';
  if (line.match(/^Commands?:/)) return 'text-cyan-400';
  if (line.match(/^Note:/)) return 'text-cyan-400';

  // Bullet points and list items
  if (line.match(/^\s*[•-]/)) return 'text-cyan-400';
  if (line.match(/^\s*\d+\./)) return 'text-cyan-400';

  // Model download progress
  if (line.match(/^Downloading:/)) return 'text-cyan-400';
  if (line === 'Download complete!') return 'text-green-400';
  
  // Default text color
  return 'text-pink-500';
};