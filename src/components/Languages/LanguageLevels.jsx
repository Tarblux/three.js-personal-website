import React from 'react';

const LanguageLevels = ({ languageLevelsData, setHighlightedLanguage, hoverTimeoutRef }) => {
  return (
    <div className="bg-white/90 rounded-lg shadow-lg p-6 col-span-1 row-span-3 md:col-span-1 md:row-span-3 flex flex-col gap-3 justify-between transition-transform duration-300 ease-in-out hover:scale-[1.02]">
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
              }, 150); // 150ms fi slow switch so it doesn't flicker
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
      <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mt-2">
        <span className="text-lg font-bold">?</span>
        <span>What does C2, A1 etc. mean?</span>
      </div>
    </div>
  );
};

export default LanguageLevels; 