
import React, { useEffect, useState, useRef } from 'react';

const Mascot = ({ className, compact = false }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const maxMove = 10;
      const dx = Math.min(Math.max((event.clientX - centerX) / 10, -maxMove), maxMove);
      const dy = Math.min(Math.max((event.clientY - centerY) / 10, -maxMove), maxMove);

      setMousePos({ x: dx, y: dy });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    // Keep eyes closed for a bit longer than the scale animation
    setTimeout(() => setIsClicked(false), 300); 
  };

  const eyeOffsetX = mousePos.x * 0.6;
  const eyeOffsetY = mousePos.y * 0.6;

  return (
    <div 
      className={`relative cursor-pointer transition-transform duration-300 ${className} ${isHovered ? 'scale-110' : ''} ${isClicked ? 'scale-90' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      ref={svgRef}
    >
      <svg 
        viewBox="0 0 200 200" 
        className={`w-full h-full drop-shadow-2xl ${compact ? '' : 'animate-float'}`} 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- CUTE WHITE TIGER SHAPE --- */}

        {/* EARS */}
        <circle cx="45" cy="65" r="22" fill="#F5F5F0" stroke="#D4AF37" strokeWidth="4" />
        <circle cx="155" cy="65" r="22" fill="#F5F5F0" stroke="#D4AF37" strokeWidth="4" />
        {/* Inner Ears */}
        <circle cx="45" cy="65" r="10" fill="#FFB7B2" opacity="0.8" />
        <circle cx="155" cy="65" r="10" fill="#FFB7B2" opacity="0.8" />

        {/* HEAD */}
        <path 
          d="M 40 100 
             Q 40 40 100 40 
             Q 160 40 160 100 
             Q 160 170 100 170 
             Q 40 170 40 100 Z"
          fill="#F5F5F0" 
          stroke="#D4AF37" 
          strokeWidth="4"
        />

        {/* STRIPES */}
        <path d="M 100 50 L 100 65" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" />
        <path d="M 85 55 L 90 65" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" />
        <path d="M 115 55 L 110 65" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" />

        <path d="M 45 110 L 60 110" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <path d="M 48 120 L 60 120" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        
        <path d="M 155 110 L 140 110" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <path d="M 152 120 L 140 120" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" opacity="0.5" />

        {/* FACE GROUP - Interactive */}
        <g transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
          
          {/* EYES LOGIC */}
          {isClicked ? (
            // Closed Eyes (Happy Arches) > <
            <>
              <path d="M 65 95 L 75 100 L 65 105" fill="none" stroke="#2C2C2C" strokeWidth="3" strokeLinecap="round" />
              <path d="M 135 95 L 125 100 L 135 105" fill="none" stroke="#2C2C2C" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            // Normal Eyes
            <>
              <ellipse cx="75" cy="95" rx="10" ry="13" fill="#2C2C2C" />
              <ellipse cx="125" cy="95" rx="10" ry="13" fill="#2C2C2C" />
              {/* Pupils */}
              <circle cx={75 + eyeOffsetX * 0.3} cy={93 + eyeOffsetY * 0.3} r="4" fill="white" />
              <circle cx={125 + eyeOffsetX * 0.3} cy={93 + eyeOffsetY * 0.3} r="4" fill="white" />
            </>
          )}

          {/* SNOUT AREA */}
          <ellipse cx="100" cy="115" rx="25" ry="15" fill="white" opacity="0.5" />

          {/* NOSE */}
          <path d="M 94 110 Q 100 116 106 110 Q 100 105 94 110 Z" fill="#FFB7B2" />

          {/* BLUSH */}
          <ellipse cx="65" cy="115" rx="8" ry="5" fill="#FFB7B2" opacity="0.6" />
          <ellipse cx="135" cy="115" rx="8" ry="5" fill="#FFB7B2" opacity="0.6" />

          {/* MOUTH LOGIC */}
          {isHovered ? (
             // 'O' Mouth
             <circle cx="100" cy="130" r="8" fill="#2C2C2C" />
          ) : (
             // Normal '3' Mouth
             <path d="M 92 125 Q 96 128 100 125 Q 104 128 108 125" fill="none" stroke="#2C2C2C" strokeWidth="2.5" strokeLinecap="round" />
          )}
        </g>

        {/* TALISMAN TAG */}
        <g transform="rotate(-5, 100, 100)">
           <path d="M125 40 L125 10 L155 10 L155 40" fill="#8B3A3A" />
           <text x="140" y="30" fontSize="14" fill="white" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">꿈</text>
        </g>
      </svg>
    </div>
  );
};

export default Mascot;
