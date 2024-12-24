import React, { KeyboardEvent, useEffect, useRef } from 'react';

interface TerminalInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const TerminalInput: React.FC<TerminalInputProps> = ({
  value,
  onChange,
  onSubmit,
  onKeyDown,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();

    // Re-focus when clicking anywhere in the terminal
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.terminal-container')) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit(value);
      onChange('');
    }
    onKeyDown(e);
  };

  return (
    <div className="flex items-center gap-3 p-4 border-t border-pink-500/30 bg-black/40 cursor-text">
      <span className="text-cyan-400 font-mono text-base select-none">{'>'}</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1 bg-transparent text-pink-500 outline-none font-mono text-xs sm:text-sm lg:text-base placeholder-pink-500/50"
        placeholder="Type a command or chat directly..."
        spellCheck={false}
      />
    </div>
  );
};