import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/background.jpg';
import { Snow } from './Snow';

export const Background: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload image
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Initial colored gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/30 to-black transition-opacity duration-1000" />

      {/* Background image with blur */}
      <div 
        className={`absolute inset-0 bg-cover bg-center blur-sm transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-purple-900/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      
      {/* Retro sun */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-t from-pink-500 to-pink-600 blur-2xl opacity-50" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-20" />
      
      {/* Snow Effect */}
      <Snow count={150} />
    </div>
  );
};