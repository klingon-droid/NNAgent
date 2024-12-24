import React, { useEffect, useState } from 'react';

interface TerminalLoadingProps {
  text?: string;
}

export const TerminalLoading: React.FC<TerminalLoadingProps> = ({ 
  text = 'Processing'
}) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1 text-cyan-400 font-mono text-xs sm:text-sm animate-pulse">
      <span>{text}</span>
      <span className="w-6 text-left">{dots}</span>
    </div>
  );
};