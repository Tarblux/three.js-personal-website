import React, { useEffect, useState, useMemo, useRef } from 'react';
import { languageCountries } from '../../data/languageCountries.js';
import { languagesMapData } from '../../data/languagesMapData.js';
import { languageLevelsData } from '../../data/languageLevelsData.js';
import { languageJourneyData } from '../../data/languageJourneyData.js';
import LanguageCoverageMap from './LanguageCoverageMap';
import LanguageLevels from './LanguageLevels';
import LanguageJourney from './LanguageJourney';

const { languageList, languageColors } = languagesMapData;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false); // 768px for md

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const languageData = [];
Object.entries(languageCountries).forEach(([language, data]) => {
  const value = languageList.indexOf(language);
  data.countries.forEach(code => {
    languageData.push({ id: code, value });
  });
});

const Languages = () => {
  const [features, setFeatures] = useState([]);
  const [highlightedLanguage, setHighlightedLanguage] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetch('/data/world_countries.json')
      .then(res => res.json())
      .then(data => setFeatures(data.features));
  }, []);

  const mapData = useMemo(() => {
    if (!highlightedLanguage) {
      return languageData;
    }

    const languageIndex = languageList.indexOf(highlightedLanguage);
    if (languageIndex === -1) {
      return languageData; // Fallback to all data if language not found
    }

    return languageData.filter(d => d.value === languageIndex);
  }, [highlightedLanguage, languageList]);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-0 p-3">
      <div className="flex flex-col items-start w-full max-w-[1100px] max-h-[85vh] overflow-y-auto">
        <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
          Languages
        </span>
        {/* Glassmorphic Container */}
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 w-full border border-white/30">
          {isMobile ? (
            <div className="flex flex-col gap-4">
              <LanguageLevels 
                languageLevelsData={languageLevelsData} 
                setHighlightedLanguage={setHighlightedLanguage} 
                hoverTimeoutRef={hoverTimeoutRef} 
              />
              <LanguageJourney languageJourneyData={languageJourneyData} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-3 gap-4 h-[65vh]">
              <LanguageCoverageMap 
                mapData={mapData} 
                features={features} 
                languageColors={languageColors} 
                languageList={languageList} 
              />
              <LanguageLevels 
                languageLevelsData={languageLevelsData} 
                setHighlightedLanguage={setHighlightedLanguage} 
                hoverTimeoutRef={hoverTimeoutRef} 
              />
              <LanguageJourney languageJourneyData={languageJourneyData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Languages);