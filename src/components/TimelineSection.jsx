import React from 'react';

const TimelineSection = ({ title, items, type }) => {
  // Sort items by date descending (simple string compare or date object)
  const sortedItems = [...items].sort((a, b) => {
    // Basic string sort for now, ideally parse dates
    return -1; 
  });

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-dark-slate mb-8 border-l-4 border-asan-gold pl-4">{title}</h2>
      
      <div className="relative">
        {sortedItems.map((item, index) => (
          <div key={item.id || index} className="relative flex group mb-8 last:mb-0">
            {/* Left: Date */}
            <div className="w-32 md:w-40 pt-1 text-right pr-6 flex-shrink-0">
               <span className="text-xs md:text-sm text-gray-400 font-medium block">{item.startDate} - {item.endDate || 'Present'}</span>
            </div>

            {/* Middle: Line & Dot */}
            <div className="relative flex flex-col items-center">
               {/* Vertical Line */}
               <div className={`absolute top-2 bottom-[-32px] w-0.5 bg-asan-gold/30 group-last:bottom-0`}></div>
               {/* Dot */}
               <div className="w-4 h-4 rounded-full border-2 border-asan-gold bg-white z-10 mt-1.5"></div>
            </div>

            {/* Right: Content */}
            <div className="flex-1 pl-6 pt-0.5 pb-2">
               <h3 className="text-xl font-bold text-asan-green mb-1">{item.title}</h3>
               
               <div className="flex items-center gap-2 mb-2">
                 <span className="font-semibold text-gray-700">{item.organization}</span>
                 {item.location && <span className="text-lg">{item.location}</span>} {/* Emoji flag or text */}
               </div>

               {/* Tags (Education style) */}
               {item.tags && type === 'education' && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-asan-green/10 text-asan-green text-xs rounded-full font-medium border border-asan-green/20">
                        {tag}
                      </span>
                    ))}
                  </div>
               )}

               {/* Description / Bullet Points */}
               {item.description && (
                 <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                   {item.description.startsWith('-') ? item.description : `- ${item.description}`}
                 </div>
               )}

               {/* Grade / Thesis */}
               {item.grade && (
                 <div className="mt-2 text-sm text-gray-500 font-medium">
                   {item.grade}
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;