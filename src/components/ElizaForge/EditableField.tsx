import React, { useState, useRef, useEffect } from 'react';

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  className?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onChange,
  multiline = false,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(editValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value);
    }
  };

  if (isEditing) {
    return multiline ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full bg-black/40 text-pink-500 placeholder-pink-500/50 px-2 py-1 rounded 
                   border border-pink-500/30 outline-none font-mono text-[10px] xs:text-xs
                   focus:border-cyan-400/50 transition-colors ${className}`}
        rows={3}
      />
    ) : (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full bg-black/40 text-pink-500 placeholder-pink-500/50 px-2 py-1 rounded
                   border border-pink-500/30 outline-none font-mono text-[10px] xs:text-xs
                   focus:border-cyan-400/50 transition-colors ${className}`}
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-pink-500/10 px-2 py-1 rounded transition-colors ${className}`}
    >
      {value || <span className="text-pink-500/50 italic">Click to edit</span>}
    </div>
  );
};