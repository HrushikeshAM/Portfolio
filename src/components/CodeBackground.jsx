import React, { useEffect, useRef } from 'react';

const CodeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const fontSize = 16;
    let columns = 0;
    let drops = [];

    // Set canvas dimensions to full screen and calculate column layout
    const initializeDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      
      // Initialize drops with random negative starting Y positions (staggered entry)
      drops = Array(columns).fill(0).map(() => Math.floor(Math.random() * -100));
    };

    initializeDimensions();

    // Re-initialize columns on resize
    const handleResize = () => {
      initializeDimensions();
    };
    window.addEventListener('resize', handleResize);

    // Characters to drop (code tokens, binary, and syntax symbols)
    const chars = '01{}[]()<>$;+-=/*!?&|%_#@';
    const charArray = chars.split('');

    // Purple color palette generator
    const getPurpleColor = () => {
      const purples = [
        '#8b5cf6', // Violet
        '#a78bfa', // Light violet
        '#c084fc', // Light purple
        '#6366f1', // Indigo
        '#e0a7ff', // Pale bright purple
        '#d8b4fe'  // Light lavender glow
      ];
      return purples[Math.floor(Math.random() * purples.length)];
    };

    const draw = () => {
      // Fade out frame trailing
      ctx.fillStyle = 'rgba(3, 3, 3, 0.09)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Draw leading drop brighter (white/light lavender) to make the rain pop and look less dim
        ctx.fillStyle = Math.random() > 0.88 ? '#ffffff' : getPurpleColor();
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw only if it is visible on screen (Y is positive)
        if (y >= 0) {
          ctx.fillText(char, x, y);
        }

        // Reset drop to top randomly after it crosses bottom of viewport
        if (y > canvas.height && Math.random() > 0.985) {
          drops[i] = Math.floor(Math.random() * -20);
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Canvas layer for animated code rain */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2,
          pointerEvents: 'none',
          opacity: 0.95
        }}
      />
      {/* Frosted Glass Blur Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(3, 3, 3, 0.12)',
          backdropFilter: 'blur(0.5px)',
          WebkitBackdropFilter: 'blur(0.5px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default CodeBackground;
