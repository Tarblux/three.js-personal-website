import React, { useState } from 'react';

const TechStack = ({ 
  title = "Tech Stack",
  techItems = [],
  className = "",
  defaultSelectedIndex = 0,
  showWhyChoseIt = true
}) => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [selectedTech, setSelectedTech] = useState(techItems[defaultSelectedIndex] || techItems[0]);

  const handleMouseEnter = (tech) => {
    setHoveredTech(tech);
    setSelectedTech(tech);
  };

  const handleMouseLeave = () => {
    setHoveredTech(null);
  };

  if (!techItems.length) return null;

  // Helper function to check if a tech item should show border
  const shouldShowBorder = (tech) => {
    return hoveredTech?.id === tech.id || (!hoveredTech && selectedTech?.id === tech.id);
  };

  return (
    <div className={`${className}`}>
      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">{title}</h3>
      
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        {/* Tech Icons - Top on mobile, Left on desktop */}
        <div className="flex flex-row md:flex-col gap-2 w-full md:w-32 overflow-x-auto md:overflow-x-visible">
          {techItems.map((tech, index) => (
            <div
              key={tech.id || index}
              onMouseEnter={() => handleMouseEnter(tech)}
              onMouseLeave={handleMouseLeave}
              className="group relative h-14 w-14 md:w-auto flex-shrink-0 overflow-hidden cursor-pointer rounded-lg transition-all duration-500 bg-gray-100 flex items-center justify-center hover:h-20 hover:shadow-md border-2 border-transparent"
              style={{
                borderColor: shouldShowBorder(tech) ? (tech.color || '#6B7280') : 'transparent'
              }}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-8 h-8 md:w-10 md:h-10 object-contain transition-all duration-300 group-hover:w-10 group-hover:h-10 md:group-hover:w-12 md:group-hover:h-12"
              />
              
              {/* Hover overlay - removed the blue pulse dot */}
              {hoveredTech?.id === tech.id && (
                <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center rounded-lg">
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tech Details - Bottom on mobile, Right on desktop */}
        <div className="flex-1 min-w-0 w-full md:w-auto">
          {selectedTech && (
            <div>
              {/* Tech Name and Description */}
              <h4 
                className="text-xl md:text-2xl font-bold"
                style={{ color: selectedTech.color || '#9333EA' }}
              >
                {selectedTech.name}
              </h4>
              
              {selectedTech.description && (
                <p className="text-gray-600 mb-3 leading-relaxed text-xs md:text-sm">
                  {selectedTech.description}
                </p>
              )}

              {/* How I used it section */}
              {selectedTech.howIUsedIt && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">?</span>
                    </div>
                    <h5 className="font-bold text-gray-800 text-sm">How I used it</h5>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-gray-600 leading-relaxed text-xs">
                      {selectedTech.howIUsedIt}
                    </p>
                  </div>
                </div>
              )}

              {/* Why I chose it section */}
              {selectedTech.whyIChoseIt && showWhyChoseIt && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">?</span>
                    </div>
                    <h5 className="font-bold text-gray-800 text-sm">Why I chose it</h5>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-gray-600 leading-relaxed text-xs">
                      {selectedTech.whyIChoseIt}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechStack; 