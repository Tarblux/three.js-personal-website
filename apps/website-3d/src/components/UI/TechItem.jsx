import React from 'react';

const TechItem = ({ 
  title, 
  description, 
  color = 'blue',
  className = '' 
}) => {
  const colorClasses = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    red: 'text-red-600',
    indigo: 'text-indigo-600',
    pink: 'text-pink-600',
    orange: 'text-orange-600',
    teal: 'text-teal-600',
    amber: 'text-amber-600',
    emerald: 'text-emerald-600',
    cyan: 'text-cyan-600',
    violet: 'text-violet-600'
  };

  return (
    <div className={`${className}`}>
      <span className={`font-semibold ${colorClasses[color] || colorClasses.blue}`}>
        {title}
      </span>
      {description && (
        <span className="text-gray-700 ml-1">
          - {description}
        </span>
      )}
    </div>
  );
};

export default TechItem; 