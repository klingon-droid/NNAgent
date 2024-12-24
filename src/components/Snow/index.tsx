import React, { useMemo } from 'react';
import { Snowflake } from './Snowflake';

interface SnowProps {
  count?: number;
}

export const Snow: React.FC<SnowProps> = ({ count = 100 }) => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 2, // 2-5px
      opacity: Math.random() * 0.5 + 0.5, // 0.5-1
      speed: Math.random() * 1 + 0.5, // 0.5-1.5
      wind: Math.random() * 0.5 - 0.25, // -0.25-0.25
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
    }));
  }, [count]);

  return (
    <>
      {/* Snow Container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map((flake) => (
          <Snowflake key={flake.id} {...flake} />
        ))}
      </div>
    </>
  );
};