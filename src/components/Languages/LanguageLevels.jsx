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
<div className="mt-4 pt-4 border-t border-gray-300">
  <p className="text-xs text-gray-600">
    For all my fellow language nerds (or anyone who just *really* loves a good table), here's the official CEFR scale straight from the source:{" "}
    <a 
      href="https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline break-all"
    >
      https://www.coe.int/en/web/common-european-framework-reference-languages
    </a>
    . Nerd out responsibly.
  </p>
</div>

    </div>
  </div>
);

const getCEFRColor = (level) => {
  const colors = {
    'C2': '#19c37d',
    'C1': '#19c37d', 
    'B2': '#5BB751',
    'B1': '#FFD600',
    'A2': '#FF9130',
    'A1': '#FF4A4A'
  };
  return colors[level] || '#9ca3af';
};

const getCEFRDots = (level) => {
  const levels = {
    'C2': 6,
    'C1': 5,
    'B2': 4,
    'B1': 3,
    'A2': 2,
    'A1': 1
  };
  return levels[level] || 0;
};

const SkillDots = ({ level, skillName }) => {
  const filledDots = getCEFRDots(level);
  const color = getCEFRColor(level);
  
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-400 capitalize">{skillName}</span>
      <div className="flex gap-[3px]">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-[5px] h-[10px] rounded-full"
            style={{
              backgroundColor: index < filledDots ? color : '#8A9097'
            }}
          />
        ))}
      </div>
      <div className="w-[4px] h-[4px] rounded-full bg-gray-400"></div>
      <span className="text-gray-400 text-xs">{level}</span>
    </div>
  );
};

const LanguageLevels = ({ languageLevelsData, setHighlightedLanguage, hoverTimeoutRef }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [expandedLanguage, setExpandedLanguage] = useState(null);
  const [hoveredLanguage, setHoveredLanguage] = useState(null);

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
      className="relative bg-white/90 rounded-lg shadow-lg p-4 col-span-1 row-span-3 md:col-span-2 md:row-span-3 flex flex-col gap-2 justify-between transition-transform duration-300 ease-in-out hover:scale-[1.02]"
      onMouseLeave={handleMouseLeaveCard}
    >
      {/* Original Content Wrapper */}
      <div
        className={`flex flex-col gap-3 flex-1 transition-opacity duration-300
          ${showExplanation ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
      >
        {/* Header with icon */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/images/Languages/language-filled-svgrepo-com.svg" alt="Language Icon" className="w-6 h-6" />
          <span className="text-lg font-bold">Language Levels</span>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {languageLevelsData.map((lang) => (
            <div
              key={lang.name}
              className="flex flex-col p-2 rounded-xl bg-gray-200 cursor-pointer transition-all duration-200 hover:bg-gray-300 hover:scale-[1.02]"
              onClick={() => setExpandedLanguage(expandedLanguage === lang.name ? null : lang.name)}
              onMouseEnter={() => {
                clearTimeout(hoverTimeoutRef.current);
                setHighlightedLanguage(lang.name);
                setHoveredLanguage(lang.name);
              }}
              onMouseLeave={() => {
                hoverTimeoutRef.current = setTimeout(() => {
                  setHighlightedLanguage(null);
                  setHoveredLanguage(null);
                }, 150);
              }}
            >
              <div className="flex items-center justify-between">
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
                <div className="flex items-center gap-3">
                  <svg 
                    width="8" 
                    height="6" 
                    viewBox="0 0 8 6" 
                    fill="none" 
                    className="text-gray-400"
                  >
                    <path 
                      d="M1 1.5L4 4.5L7 1.5" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-white font-bold w-10 h-10 flex items-center justify-center rounded-lg text-lg shadow"
                    style={{ background: lang.cefrBg }}
                  >
                    {lang.cefr}
                  </span>
                </div>
              </div>
              
              {/* Expanded Details */}
              <div className={`transition-all duration-300 overflow-hidden ${expandedLanguage === lang.name || hoveredLanguage === lang.name ? 'max-h-[200px] mt-3' : 'max-h-0'}`}>
                {lang.details && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <SkillDots level={lang.details.speaking} skillName="speaking" />
                    <SkillDots level={lang.details.reading} skillName="reading" />
                    <SkillDots level={lang.details.listening} skillName="listening" />
                    <SkillDots level={lang.details.writing} skillName="writing" />
                  </div>
                )}
              </div>
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