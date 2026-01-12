import React from 'react';

const TechSkills = ({ skills }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-8">
      {skills.map((skill) => (
        <div key={skill.id} className="w-full">
          <div className="flex justify-between items-end mb-1">
            <span className="text-gray-700 font-medium">{skill.name}</span>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div 
              className="h-full bg-asan-gold rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${skill.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechSkills;