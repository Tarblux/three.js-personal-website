import React, { useState } from 'react';

const CollapsibleSection = ({ 
  title, 
  children, 
  defaultOpen = false,
  className = '',
  titleClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mb-6 ${className}`}>
      {/* Header with triangle and title */}
      <button
        onClick={toggleOpen}
        className={`flex items-center gap-2 w-full text-left hover:bg-gray-100 p-2 rounded-md transition-colors ${titleClassName}`}
      >
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? 'rotate-90' : 'rotate-0'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium text-gray-800">{title}</span>
      </button>

      {/* Collapsible content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-6 pt-2 pb-4 space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection; 