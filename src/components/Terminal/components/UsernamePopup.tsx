import React, { useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';

interface UsernamePopupProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const UsernamePopup: React.FC<UsernamePopupProps> = ({
  value,
  onChange,
  onSubmit,
  onClose,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative w-full max-w-sm bg-black/90 border border-pink-500/30 
                    rounded-lg shadow-lg shadow-pink-500/20 animate-slide-in overflow-hidden">
        <div className="flex flex-col p-4 gap-4">
          <h3 className="text-cyan-400 font-mono text-base sm:text-lg text-center">Set Username</h3>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter username..."
              className="flex-1 bg-black/40 text-pink-500 placeholder-pink-500/50 px-3 py-2.5 rounded-lg
                       border border-pink-500/30 outline-none font-mono text-sm
                       focus:border-cyan-400/50 transition-colors"
              maxLength={32}
            />
            
            <div className="flex items-center gap-2">
              <button
                onClick={onSubmit}
                disabled={!value.trim()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg 
                         bg-black/40 border border-pink-500/30 text-pink-500 font-mono text-sm
                         hover:text-cyan-400 hover:border-cyan-400/50 transition-colors 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" />
                <span className="sm:hidden">Set Username</span>
              </button>
              
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg
                         bg-black/40 border border-pink-500/30 text-pink-500 font-mono text-sm
                         hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span className="sm:hidden">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};