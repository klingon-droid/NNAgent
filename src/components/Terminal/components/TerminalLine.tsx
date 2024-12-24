import React from 'react';
import { ColoredLine } from '../../../types';

interface TerminalLineProps {
  content: ColoredLine | string;
}

export const TerminalLine: React.FC<TerminalLineProps> = ({ content }) => {
  let colorClass = 'text-pink-500';
  let formattedText = '';
  
  if (typeof content === 'string') {
    formattedText = content;
    if (formattedText.startsWith('[') || formattedText.startsWith('>')) {
      colorClass = 'text-cyan-400';
    }
  } else {
    formattedText = content.text;
    colorClass = content.color || colorClass;
  }
  
  return (
    <div className={`${colorClass} leading-relaxed text-base font-mono`}>
      {formattedText}
    </div>
  );
};