
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Award } from 'lucide-react';

const Certifications = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentCert = items[currentIndex];

  return (
    <div className="relative group w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      
      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row h-full min-h-[300px]">
        
        {/* Left: Image Container */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 relative overflow-hidden">
           {/* Decorative background circle */}
           <div className="absolute w-64 h-64 bg-asan-gold/10 rounded-full blur-3xl -top-10 -left-10"></div>
           
           {currentCert.imageUrl ? (
             <img 
               src={currentCert.imageUrl} 
               alt={currentCert.title} 
               className="relative z-10 w-full h-auto object-contain max-h-[200px] drop-shadow-lg transition-transform duration-500 hover:scale-105"
             />
           ) : (
             <Award size={80} className="text-gray-300 relative z-10" />
           )}
        </div>

        {/* Right: Info Container */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center text-center md:text-left">
           <h3 className="text-2xl font-serif font-bold text-asan-green mb-2">{currentCert.title}</h3>
           <p className="text-gray-600 mb-6 leading-relaxed">{currentCert.description}</p>
           
           {currentCert.link && (
             <a 
               href={currentCert.link} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="inline-flex items-center gap-2 text-asan-red hover:text-asan-gold font-bold uppercase text-sm tracking-wider transition-colors self-center md:self-start"
             >
               View Credential <ExternalLink size={16} />
             </a>
           )}
        </div>
      </div>

      {/* Navigation Buttons (Only if > 1 item) */}
      {items.length > 1 && (
        <>
          <button 
            onClick={prevSlide} 
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md text-gray-700 hover:text-asan-green hover:bg-white transition-all z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide} 
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md text-gray-700 hover:text-asan-green hover:bg-white transition-all z-20"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, index) => (
              <div 
                key={index} 
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${currentIndex === index ? 'bg-asan-green w-6' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Certifications;
