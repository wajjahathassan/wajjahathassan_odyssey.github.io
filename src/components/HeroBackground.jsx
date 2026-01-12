
import React, { useEffect, useRef } from 'react';

const HeroBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 20000); 
      
      const colors = [
        'rgba(212, 175, 55, 0.3)', // asan-gold
        'rgba(255, 215, 0, 0.2)',   // Gold
        'rgba(255, 223, 0, 0.2)',   // Golden Yellow
        'rgba(218, 165, 32, 0.25)'   // Goldenrod
      ];

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 8 + 6,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const drawGingkoLeaf = (ctx, x, y, size, rotation, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size / 10, size / 10);

      ctx.beginPath();
      
      // Start at bottom of stem
      ctx.moveTo(0, 12);
      
      // Right side of stem to base of leaf
      ctx.quadraticCurveTo(0.5, 6, 0.5, 0);
      
      // Right side of leaf blade (convex outwards)
      ctx.quadraticCurveTo(8, -1, 14, -8);
      
      // Top edge (Wavy with notch)
      // Right lobe peak and dip to notch
      ctx.bezierCurveTo(14, -14, 4, -16, 0, -10);
      
      // Left lobe peak and dip to edge
      ctx.bezierCurveTo(-4, -16, -14, -14, -14, -8);
      
      // Left side of leaf blade
      ctx.quadraticCurveTo(-8, -1, -0.5, 0);
      
      // Left side of stem
      ctx.quadraticCurveTo(-0.5, 6, 0, 12);
      
      ctx.closePath();
      
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        if (mouse.x != null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (maxDistance - distance) / maxDistance;
            
            p.x -= forceDirectionX * force * 2;
            p.y -= forceDirectionY * force * 2;
            p.rotation += 0.1; 
          }
        }

        drawGingkoLeaf(ctx, p.x, p.y, p.size, p.rotation, p.color);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default HeroBackground;
