import React, { useState } from "react";

const FlipCardDashboard = ({ 
  title, 
  frontSide, 
  backSide, 
  flipButtonText = { front: 'front', back: 'back' },
  className = "h-[80vh] max-h-[92vh]"
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full py-2">
      <div className="flex flex-col items-start w-full">
        {title && (
          <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
            {title}
          </span>
        )}
        
        {/* Flip Card Container */}
        <div className={`flip-card w-full ${className}`}>
          <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
            {/* Front Side */}
            <div className="flip-card-front w-full h-full overflow-visible">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 w-full h-full mx-auto border border-white/30 overflow-visible">
                {frontSide}
              </div>
            </div>
            
            {/* Back Side */}
            <div className="flip-card-back w-full h-full overflow-visible">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 w-full h-full mx-auto border border-white/30 overflow-visible">
                {backSide}
              </div>
            </div>
          </div>
        </div>
        
        {/* Flip Button */}
        <div className="w-full flex justify-center">
          <button
            className="mt-4 text-xs text-blue-500 bg-white/70 px-2 py-1 rounded shadow hover:bg-blue-100 transition-colors"
            onClick={handleFlip}
          >
            {isFlipped ? flipButtonText.back : flipButtonText.front}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipCardDashboard;


