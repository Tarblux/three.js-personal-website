import React from 'react';

const SkipIntroButton = ({ onSkip }) => {
  return (
    <button
      onClick={onSkip}
      className="fixed bottom-9 right-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors z-50"
    >
      Skip Intro
    </button>
  );
};

export default SkipIntroButton;