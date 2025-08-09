import React, { useState } from 'react';

const ResumeCard = ({ onImageClick }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleMouseEnter = () => {
    const newTimer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);
    setTimer(newTimer);
  };

  const handleMouseLeave = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setShowMessage(false);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow p-1 md:col-span-2 md:row-span-1 flex flex-col items-center transform transition-transform duration-300 md:hover:scale-105 cursor-pointer relative" 
      onClick={onImageClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src="/images/Introduction/resume-thumbnail.webp"
        alt="Resume"
        className="rounded mb-1 w-full h-auto"
      />
      {showMessage && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fadeIn">
          <p className="text-white text-sm font-medium">Click to view</p>
        </div>
      )}
    </div>
  );
};

export default ResumeCard; 