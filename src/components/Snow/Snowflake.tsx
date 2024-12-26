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
  const windowSizeRef = useRef({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });
  const visibilityRef = useRef(true);

  useEffect(() => {
    let startTime = performance.now();

    // Handle window resize
    const handleResize = () => {
      const oldWidth = windowSizeRef.current.width;
      windowSizeRef.current = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      // Reset position if outside bounds
      const ratio = windowSizeRef.current.width / oldWidth;
      positionRef.current.x *= ratio;
      if (positionRef.current.x > windowSizeRef.current.width || positionRef.current.x < 0) {
        positionRef.current.x = Math.random() * windowSizeRef.current.width;
      }
    };

    // Handle visibility changes
    const handleVisibilityChange = () => {
      visibilityRef.current = document.visibilityState === 'visible';
      if (visibilityRef.current) {
        startTime = performance.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);
    
    const animate = (currentTime: number) => {
      if (!visibilityRef.current) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (currentTime - startTime) / 1000;
      startTime = currentTime;

      if (flakeRef.current) {
        // Update position
        positionRef.current.y += speed * deltaTime * 20;
        positionRef.current.x += wind * deltaTime * 20;

        // Add slight wobble
        const wobble = Math.sin(currentTime / 1500) * 1.5;
        
        // Check if snowflake has reached bottom
        const maxY = windowSizeRef.current.height + size;
        if (positionRef.current.y >= maxY) {
          // Reset to top with random x position
          positionRef.current.y = -size;
          positionRef.current.x = Math.random() * windowSizeRef.current.width;
        }

        // Wrap horizontally
        if (positionRef.current.x < -size) {
          positionRef.current.x = windowSizeRef.current.width + size;
        } else if (positionRef.current.x > windowSizeRef.current.width + size) {
          positionRef.current.x = -size;
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
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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