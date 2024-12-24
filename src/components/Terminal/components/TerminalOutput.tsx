import React from 'react';
import { useTerminalScroll } from '../../../hooks/useTerminalScroll';
import { TerminalLine } from './TerminalLine';
import { ColoredLine } from '../../../types';

interface TerminalOutputProps {
  lines: (string | ColoredLine)[];
  children?: React.ReactNode;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ lines, children }) => {
  const outputRef = useTerminalScroll();

  return (
    <div 
      ref={outputRef}
      className="flex-1 overflow-y-auto terminal-output px-3 py-2 font-mono text-xs sm:text-sm"
      style={{ scrollBehavior: 'smooth' }}
    >
      {lines.map((line, i) => (
        <TerminalLine key={`${i}-${typeof line === 'string' ? line : line.text}`} content={line} />
      ))}
      {children}
      <div className="h-2" /> {/* Bottom padding for better scrolling */}
    </div>
  );
};