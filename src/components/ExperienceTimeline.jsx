
import React from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const ExperienceTimeline = ({ items }) => {
  // Sort items by date (assuming startDate is a string or timestamp)
  // For simplicity, we'll rely on the order passed or basic sorting if we had consistent date objects.
  // We'll assume items come sorted or we sort them here.
  const sortedItems = [...items].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <div className="relative border-l-2 border-asan-gold/30 ml-3 md:ml-6 space-y-12 py-4">
      {sortedItems.map((item, index) => (
        <div key={item.id || index} className="relative pl-8 md:pl-12 group">
          {/* Icon Dot */}
          <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-paper border-2 border-asan-gold text-asan-gold flex items-center justify-center group-hover:bg-asan-gold group-hover:text-white transition-colors shadow-sm">
            {item.type === 'education' ? <GraduationCap size={14} /> : <Briefcase size={14} />}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
            <h3 className="text-xl font-serif font-bold text-asan-green">{item.title}</h3>
            <span className="text-sm text-gray-500 font-mono flex items-center gap-1">
              <Calendar size={12} />
              {item.startDate} - {item.endDate || 'Present'}
            </span>
          </div>
          
          <h4 className="text-lg font-medium text-gray-700 mb-2">{item.organization}</h4>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;
