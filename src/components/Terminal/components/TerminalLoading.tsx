import React, { useEffect, useState } from 'react';

interface TerminalLoadingProps {
  text?: string;
  subtext?: string;
  rateLimit?: {
    remaining: number;
    total: number;
    windowMinutes: number;
  };
}

export const TerminalLoading: React.FC<TerminalLoadingProps> = ({ 
  text = 'Processing',
  subtext,
  rateLimit 
}) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 font-mono">
      <div className="flex items-center gap-1 text-cyan-400 animate-pulse">
        <span className="whitespace-nowrap font-bold">{text}</span>
        <span className="w-6 text-left">{dots}</span>
      </div>
      {subtext && (
        <p className="text-pink-500/80 text-xs xs:text-sm whitespace-normal leading-relaxed">{subtext}</p>
      )}
      {rateLimit && (
        <div className="flex flex-col gap-1 mt-2 text-[10px] xs:text-xs">
          <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
            <span className="text-cyan-400">Forge Rate Limit:</span>
            <span className="text-pink-500">{rateLimit.remaining}/{rateLimit.total} attempts remaining this window</span>
          </div>
          <p className="text-pink-500/70 break-words">
            Window resets in {Math.ceil(rateLimit.windowMinutes)} minutes
          </p>
        </div>
      )}
    </div>
  );
};