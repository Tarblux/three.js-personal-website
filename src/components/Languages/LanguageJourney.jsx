import React from 'react';

const LanguageJourney = ({ languageJourneyData }) => {
  return (
    <div className="bg-white/90 rounded-lg shadow-lg p-6 col-span-1 row-span-1 md:col-span-2 md:row-span-1 flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
      <div className="relative w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src="/images/Languages/student-learn-study-university-life-svgrepo-com.svg" alt="Journey" className="w-7 h-7" />
            <h2 className="text-xl font-bold">Language Journey</h2>
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="8" r="1" fill="currentColor"/>
            </svg>
            <span>Hover for more info</span>
          </div>
        </div>
        {/* Timeline */}
        <div className="relative flex items-center justify-between w-full px-2" style={{minHeight: 100}}>
          {/* Dashed line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 border-t-2 border-dashed border-gray-300 z-0" style={{zIndex: 0}} />
          {/* Steps */}
          {languageJourneyData.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center z-10 group">
              <div className="bg-white rounded-full p-1 shadow-md group-hover:scale-110 transition-transform duration-200">
                <img src={step.icon} alt="" className="w-10 h-10" />
              </div>
              {step.label && (
                <span className="mt-2 text-xs text-gray-500">{step.label}</span>
              )}
            </div>
          ))}
          {/* Arrow at the end */}
          <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LanguageJourney; 