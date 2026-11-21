import React from 'react';

const TextBlock = ({ 
  title, 
  children, 
  color = 'blue', 
  className = '' 
}) => {
  const colorClasses = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
    red: 'text-red-400',
    beige: 'text-red-300',
    indigo: 'text-indigo-400',
    pink: 'text-pink-400',
    orange: 'text-orange-400',
    teal: 'text-teal-400',
    black: 'text-black',
    gray: 'text-gray-500'
  };

  return (
    <div className={`mb-4 ${className}`}>
      <h2 className={`text-xl font-bold mb-2 ${colorClasses[color] || colorClasses.blue}`}>
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed space-y-3 text-sm">
        {children}
      </div>
    </div>
  );
};

export default TextBlock; 