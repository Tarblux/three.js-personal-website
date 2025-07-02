import React from 'react';

const SkipIntroButton = ({ onSkip }) => {
  return (
    <div className="fixed bottom-12 right-10 z-50">
      {/* Glassmorphic wrapper */}
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-1 border border-white/30 shadow-lg hover:scale-105 hover:shadow-lg transition-all duration-300">
        {/* Main white card */}
        <button
          onClick={onSkip}
          className="bg-white/90 px-4 py-2 rounded-md hover:bg-white transition-all duration-300 flex items-center gap-2 text-gray-800 font-medium"
        >
          {/* Train SVG Icon */}
          <img 
            src= "/images/UI/train.svg"
            alt="Train" 
            className="w-6 h-6 transition-transform duration-300 hover:rotate-12 hover:scale-110"
          />
          <span className="-mb-1 font-bold text-gray-600 transition-all duration-300 hover:translate-x-1">Skip Intro</span>
        </button>
      </div>
    </div>
  );
};

export default SkipIntroButton;