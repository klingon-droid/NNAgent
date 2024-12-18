import { useEffect, useRef } from 'react';

export const useTerminalScroll = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    };

    scrollToBottom();

    const observer = new MutationObserver(scrollToBottom);

    if (terminalRef.current) {
      observer.observe(terminalRef.current, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    return () => observer.disconnect();
  }, []);

  return terminalRef;
};