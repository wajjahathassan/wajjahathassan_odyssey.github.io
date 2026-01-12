import React, { useEffect, useState, useRef } from 'react';

const FullBodyMascot = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isRoaring, setIsRoaring] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Calculate mouse position relative to the center of the viewport
      // This makes the mascot follow the mouse even if not hovering directly over it
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // We dampen the movement so it doesn't rotate too wildly
      const maxMove = 20;
      const dx = Math.min(Math.max((event.clientX - centerX) / 20, -maxMove), maxMove);
      const dy = Math.min(Math.max((event.clientY - centerY) / 20, -maxMove), maxMove);

      setMousePos({ x: dx, y: dy });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    setIsRoaring(true);
    setTimeout(() => setIsRoaring(false), 2000);
  };

  const eyeOffsetX = mousePos.x * 0.6;
  const eyeOffsetY = mousePos.y * 0.6;
  const headRotate = mousePos.x * 0.8;

  return (
    <div 
      className="relative w-72 h-80 cursor-pointer group select-none mx-auto"
      onClick={handleClick}
      ref={containerRef}
    >
       {/* Speech Bubble */}
       <div 
         className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-white border-2 border-asan-gold text-asan-green px-6 py-2 rounded-2xl shadow-xl transition-all duration-300 transform z-20 ${
           isRoaring ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-4 pointer-events-none'
         }`}
       >
        <p className="font-bold text-lg whitespace-nowrap">Rawr! 🐯</p>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-asan-gold transform rotate-45"></div>
      </div>

      <svg 
        viewBox="0 0 300 350" 
        className="w-full h-full drop-shadow-2xl transition-transform duration-300 hover:scale-105" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-body" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- TAIL (Animated) --- */}
        <path 
            d="M 200 280 Q 260 250 240 200" 
            fill="none" 
            stroke="#F5F5F0" 
            strokeWidth="18" 
            strokeLinecap="round"
            className="origin-bottom-left"
            style={{ 
                transformOrigin: '200px 280px',
                animation: 'tailWiggle 3s ease-in-out infinite'
            }}
        />
        <path 
            d="M 200 280 Q 260 250 240 200" 
            fill="none" 
            stroke="#D4AF37" 
            strokeWidth="18" 
            strokeLinecap="round"
            strokeDasharray="0 30"
            className="origin-bottom-left"
            style={{ 
                transformOrigin: '200px 280px',
                animation: 'tailWiggle 3s ease-in-out infinite'
            }}
            opacity="0.3"
        />

        {/* --- BODY --- */}
        <ellipse cx="150" cy="260" rx="60" ry="70" fill="#F5F5F0" stroke="#D4AF37" strokeWidth="4" />
        <ellipse cx="150" cy="260" rx="35" ry="50" fill="#FFB7B2" opacity="0.3" /> {/* Belly */}

        {/* --- FEET --- */}
        <ellipse cx="120" cy="325" rx="20" ry="15" fill="#F5F5F0" stroke="#D4AF37" strokeWidth="4" />
        <ellipse cx="180" cy="325" rx="20" ry="15" fill="#F5F5F0" stroke="#D4AF37" strokeWidth="4" />
        {/* Pads */}
        <circle cx="120" cy="325" r="5" fill="#FFB7B2" opacity="0.5" />
        <circle cx="180" cy="325" r="5" fill="#FFB7B2" opacity="0.5" />

        {/* --- ARMS --- */}
        {/* Left Arm */}
        <path d="M 95 240 Q 80 260 90 280" stroke="#F5F5F0" strokeWidth="25" strokeLinecap="round" fill="none" />
        <path d="M 95 240 Q 80 260 90 280" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" /> 
        
        {/* Right Arm (Waving) */}
        <g 
            style={{ 
                transformOrigin: '205px 240px',
                animation: isRoaring ? 'wave 0.5s ease-in-out infinite' : 'none'
            }}
        >
             <path d="M 205 240 Q 220 260 210 280" stroke="#F5F5F0" strokeWidth="25" strokeLinecap="round" fill="none" />
             <path d="M 205 240 Q 220 260 210 280" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
        </g>

        {/* --- HEAD GROUP (Interactive) --- */}
        <g transform={`translate(${mousePos.x * 0.4}, ${mousePos.y * 0.4}) rotate(${headRotate}, 150, 160)`}>
            
            {/* EARS */}
            <circle cx="100" cy="110" r="20" fill="#F5F5F0" stroke="#D4AF37" strokeWidth="4" />
            <circle cx="200" cy="110" r="20" fill="#F5F5F0" stroke="#D4AF37" strokeWidth="4" />
            <circle cx="100" cy="110" r="10" fill="#FFB7B2" opacity="0.8" />
            <circle cx="200" cy="110" r="10" fill="#FFB7B2" opacity="0.8" />

            {/* HEAD SHAPE */}
            <path 
                d="M 90 150 
                   Q 90 90 150 90 
                   Q 210 90 210 150 
                   Q 210 220 150 220 
                   Q 90 220 90 150 Z"
                fill="#F5F5F0" 
                stroke="#D4AF37" 
                strokeWidth="4"
            />

            {/* STRIPES */}
            <path d="M 150 95 L 150 110" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" />
            <path d="M 135 100 L 140 110" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" />
            <path d="M 165 100 L 160 110" stroke="#2C2C2C" strokeWidth="4" strokeLinecap="round" />

            <path d="M 95 160 L 110 160" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
            <path d="M 205 160 L 190 160" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" opacity="0.5" />

            {/* FACE FEATURES (Eyes move more) */}
            <g transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
                 
                 {/* EYES */}
                 {isRoaring ? (
                    // > < Eyes (Happy/Roar)
                    <>
                        <path d="M 115 140 L 125 150 L 115 160" fill="none" stroke="#2C2C2C" strokeWidth="3" strokeLinecap="round" />
                        <path d="M 185 140 L 175 150 L 185 160" fill="none" stroke="#2C2C2C" strokeWidth="3" strokeLinecap="round" />
                    </>
                 ) : (
                    // Normal Eyes
                    <>
                        <ellipse cx="125" cy="145" rx="10" ry="14" fill="#2C2C2C" />
                        <ellipse cx="175" cy="145" rx="10" ry="14" fill="#2C2C2C" />
                        <circle cx={125 + eyeOffsetX * 0.2} cy={143 + eyeOffsetY * 0.2} r="4" fill="white" />
                        <circle cx={175 + eyeOffsetX * 0.2} cy={143 + eyeOffsetY * 0.2} r="4" fill="white" />
                    </>
                 )}

                 {/* SNOUT */}
                 <ellipse cx="150" cy="170" rx="20" ry="14" fill="white" opacity="0.6" />
                 
                 {/* NOSE */}
                 <path d="M 144 165 Q 150 171 156 165 Q 150 160 144 165 Z" fill="#FFB7B2" />

                 {/* MOUTH */}
                 {isRoaring ? (
                     // Open Mouth
                     <path d="M 140 175 Q 150 195 160 175" fill="#FFB7B2" stroke="#2C2C2C" strokeWidth="2" />
                 ) : (
                     // :3 Mouth
                     <path d="M 142 175 Q 146 178 150 175 Q 154 178 158 175" fill="none" stroke="#2C2C2C" strokeWidth="2.5" strokeLinecap="round" />
                 )}
                 
                 {/* BLUSH */}
                 <ellipse cx="115" cy="170" rx="8" ry="5" fill="#FFB7B2" opacity="0.5" />
                 <ellipse cx="185" cy="170" rx="8" ry="5" fill="#FFB7B2" opacity="0.5" />
            </g>
        </g>
        
        {/* CSS Keyframes injected here for simplicity */}
        <style>
          {`
            @keyframes tailWiggle {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(5deg); }
            }
            @keyframes wave {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(-15deg); }
              75% { transform: rotate(5deg); }
            }
          `}
        </style>
      </svg>
    </div>
  );
};

export default FullBodyMascot;