import React, { useState } from 'react';
import languageLevelsExplanation from '../../data/languageLevelsExplanation.js';

const CEFRExplanationCard = ({ onClose }) => (
  <div className="bg-white/90 rounded-lg shadow-lg p-6 w-full h-full flex flex-col gap-3 justify-between max-h-full overflow-y-auto">
    {/* Header for explanation */}
    <div className="flex items-center justify-between mb-3">
      <span className="text-xl font-bold flex items-center gap-2">
        <img src="/images/Languages/language-filled-svgrepo-com.svg" alt="Language Icon" className="w-7 h-7" />
        CEFR Language Levels
      </span>
      <button
        className="text-gray-500 hover:text-gray-800 text-2xl font-semibold focus:outline-none"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
    </div>
    <div className="flex flex-col gap-4 text-gray-700 text-sm flex-1">
      {languageLevelsExplanation.map(({ level, title, description }) => (
        <div key={level}>
          <span className="font-bold text-base">{level} – {title}</span>
          <p>{description}</p>
        </div>
      ))}
    </div>
  </div>
);

const LanguageLevels = ({ languageLevelsData, setHighlightedLanguage, hoverTimeoutRef }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const handleMouseEnterHelp = () => {
    if (!isPinned) {
      setShowExplanation(true);
    }
  };

  const handleMouseLeaveCard = () => {
    if (!isPinned) {
      setShowExplanation(false);
    }
  };

  const handleClickHelp = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    setShowExplanation(newPinnedState);
  };

  const handleCloseExplanation = () => {
    setIsPinned(false);
    setShowExplanation(false);
  };

  return (
    <div
      className="relative bg-white/90 rounded-lg shadow-lg p-6 col-span-1 row-span-3 md:col-span-1 md:row-span-3 flex flex-col gap-3 justify-between transition-transform duration-300 ease-in-out hover:scale-[1.02]"
      onMouseLeave={handleMouseLeaveCard}
    >
      {/* Original Content Wrapper */}
      <div
        className={`flex flex-col gap-3 flex-1 transition-opacity duration-300
          ${showExplanation ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
      >
        {/* Header with icon */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <img src="/images/Languages/language-filled-svgrepo-com.svg" alt="Language Icon" className="w-7 h-7" />
          <span className="text-xl font-bold">Language Levels</span>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          {languageLevelsData.map((lang) => (
            <div
              key={lang.name}
              className="flex items-center justify-between p-2 rounded-xl bg-gray-200 cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:scale-[1.05]"
              onMouseEnter={() => {
                clearTimeout(hoverTimeoutRef.current);
                setHighlightedLanguage(lang.name);
              }}
              onMouseLeave={() => {
                hoverTimeoutRef.current = setTimeout(() => {
                  setHighlightedLanguage(null);
                }, 150);
              }}
            >
              <div className="flex items-center gap-3">
                <img src={lang.flag} alt={lang.name} className="w-8 h-8 rounded-full border" />
                <div>
                  <div className="font-bold text-lg">{lang.name}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <img src={lang.icon} alt="icon" className="w-[13px] h-[13px] mr-1" />
                    {lang.level}
                  </div>
                </div>
              </div>
              <span
                className="text-white font-bold w-10 h-10 flex items-center justify-center rounded-lg text-lg shadow"
                style={{ background: lang.cefrBg }}
              >
                {lang.cefr}
              </span>
            </div>
          ))}
        </div>
        {/* Help row */}
        <div
          className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-2 cursor-pointer"
          onMouseEnter={handleMouseEnterHelp}
          onClick={handleClickHelp} // Click toggles pinned state
        >
          <span className="text-lg font-bold">?</span>
          <span className="underline">What does C2, A1 etc. mean?</span>
        </div>
      </div>

      {/* Explanation Card Wrapper - positioned on top */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 rounded-lg
          ${showExplanation ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {showExplanation && <CEFRExplanationCard onClose={handleCloseExplanation} />}
      </div>
    </div>
  );
};

export default LanguageLevels; 