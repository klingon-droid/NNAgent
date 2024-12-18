import React from 'react';
import { Terminal as TerminalIcon, Power } from 'lucide-react';
import { useTerminal } from '../../hooks/useTerminal';
import { TerminalOutput } from './components/TerminalOutput';
import { TerminalInput } from './components/TerminalInput';
import { TerminalLoading } from './components/TerminalLoading';

export const Terminal: React.FC = () => {
  const {
    input,
    setInput,
    output,
    isLoading,
    handleCommand,
    handleKeyDown,
  } = useTerminal();

  return (
    <div className="w-full">
      <div className="flex flex-col bg-black/80 backdrop-blur-md rounded-lg border border-pink-500/30 shadow-lg shadow-pink-500/20 h-[600px]">
        <div className="flex items-center gap-2 p-3 border-b border-pink-500/30 bg-black/40">
          <TerminalIcon className="w-4 h-4 text-pink-500" />
          <span className="text-pink-500 font-mono text-base">SYMBaiEX://terminal</span>
          <Power className="w-4 h-4 text-cyan-400 ml-auto" />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <TerminalOutput lines={output}>
            {isLoading && <TerminalLoading />}
          </TerminalOutput>
          <TerminalInput
            value={input}
            onChange={setInput}
            onSubmit={handleCommand}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};