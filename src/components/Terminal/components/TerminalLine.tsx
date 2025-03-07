import React from 'react';
import { ColoredLine } from '../../../types';

interface TerminalLineProps {
  content: ColoredLine | string;
}

export const TerminalLine: React.FC<TerminalLineProps> = ({ content }) => {
  const formatContent = (text: string) => {
    // Format section headers
    if (text.match(/^[A-Z][A-Z\s]+:$/)) {
      return `<span class="text-cyan-400">${text}</span>`;
    }

    // Format command names in help output
    if (text.match(/^\s+\w+:/)) {
      const [command, ...rest] = text.split(':');
      return `<span class="text-cyan-400">${command}:</span>${rest.join(':')}`;
    }

    // Replace command patterns
    let formattedText = text.replace(
      /(nnagent \w+(?:\s+-[a-z])?)/gi,
      '<span class="text-cyan-400">$1</span>'
    );
    
    // Replace label patterns
    formattedText = formattedText.replace(
      /^([A-Z][A-Z\s]+):/gm,
      '<span class="text-cyan-400">$1:</span>'
    );

    // Format bullet points
    formattedText = formattedText.replace(
      /^(\s*[•-])/gm,
      '<span class="text-cyan-400">$1</span>'
    );
    
    return formattedText;
  };

  let colorClass = 'text-pink-500';
  let displayText = '';

  if (typeof content === 'string') {
    displayText = content;
    // Basic color rules for string content
    if (content.startsWith('[') || content.startsWith('>')) {
      colorClass = 'text-cyan-400';
    }
  } else {
    displayText = content.text;
    colorClass = content.color || colorClass;
  }

  return (
    <div 
      className={`${colorClass} leading-relaxed text-xs sm:text-sm lg:text-base`}
      dangerouslySetInnerHTML={{ __html: formatContent(displayText) }}
    />
  );
};