import React from 'react';

const FeatureBlock = ({ 
  image, 
  imageAlt, 
  title, 
  description, 
  className = '',
  imageClassName = '',
  reverse = false 
}) => {
  const containerClass = `flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-start gap-4 md:gap-6 ${className}`;
  
  return (
    <div className={containerClass}>
      {/* Image Container */}
      <div className="flex-shrink-0 w-full md:w-auto">
        <div className={`w-full md:w-48 h-32 bg-gray-100 rounded-md overflow-hidden ${imageClassName}`}>
          {image && (
            <img 
              src={image} 
              alt={imageAlt || title} 
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      
      {/* Content Container */}
      <div className="flex-1 min-w-0 w-full md:w-auto">
        <div className="text-gray-600 leading-relaxed text-[13px]">
          <span className="font-bold text-gray-800">{title}</span>
          {' - '}
          {typeof description === 'string' ? (
            description
          ) : (
            description
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureBlock; 