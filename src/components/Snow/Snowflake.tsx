import React, { useEffect, useRef } from 'react';

interface SnowflakeProps {
  size: number;
  opacity: number;
  speed: number;
  wind: number;
  initialX: number;
  initialY: number;
  color: string;
  glow: number;
}

export const Snowflake: React.FC<SnowflakeProps> = ({ 
  size, 
  opacity, 
  speed,
  wind,
  initialX,
  initialY,
  color,
  glow
}) => {
  const flakeRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: initialX, y: initialY });
  const frameRef = useRef<number>();

  useEffect(() => {
    let startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - startTime) / 1000;
      startTime = currentTime;

      if (flakeRef.current) {
        // Update position
        positionRef.current.y += speed * deltaTime * 30;
        positionRef.current.x += wind * deltaTime * 30;

        // Add slight wobble
        const wobble = Math.sin(currentTime / 1500) * 1.5;
        
        // Check if snowflake has reached bottom
        const maxY = window.innerHeight - size - 20; // Leave room for pile
        if (positionRef.current.y >= maxY) {
          // Reset to top with random x position
          positionRef.current.y = -size;
          positionRef.current.x = Math.random() * window.innerWidth;
        }

        // Apply position
        flakeRef.current.style.transform = `translate(${positionRef.current.x + wobble}px, ${positionRef.current.y}px)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [size, speed, wind]);

  return (
    <div
      ref={flakeRef}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        opacity,
        backgroundColor: color,
        filter: `blur(${Math.max(1, size / 3)}px)`,
        boxShadow: `0 0 ${size * glow}px ${color}, 0 0 ${size * glow * 2}px ${color}`,
      }}
    />
  );
};