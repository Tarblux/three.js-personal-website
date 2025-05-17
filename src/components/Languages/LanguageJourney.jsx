import React, { useState } from 'react';

const viewBoxWidth = 800;
const viewBoxHeight = 100;

const dotPositions = [
  { cx: 90, cy: 55 },
  { cx: 250, cy: 50 },
  { cx: 330, cy: 64 },
  { cx: 410, cy: 36 },
  { cx: 570, cy: 64 },
  { cx: 650, cy: 36 },
];

const LanguageJourney = ({ languageJourneyData }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <div className="bg-white/90 rounded-lg shadow-lg p-6 col-span-1 row-span-1 md:col-span-2 md:row-span-1 flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
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

      <div className="ml-4 mt-4 relative w-full" style={{ paddingTop: `${(viewBoxHeight / viewBoxWidth) * 100}%` }}>
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="arrowhead" markerWidth="24" markerHeight="24" refX="12" refY="12" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#bbb" />
            </marker>
          </defs>
          <path
            d="M10 50 C 50 30, 90 70, 130 50 S 210 30, 250 50 S 330 70, 370 50 S 450 30, 490 50 S 570 70, 610 50 S 690 30, 730 50"
            fill="none"
            stroke="#bbb"
            strokeWidth="3"
            strokeDasharray="10,6"
            markerEnd="url(#arrowhead)"
          />
          {dotPositions.map((pos, idx) => (
            <g key={`dot-${idx}`}>
              <circle cx={pos.cx} cy={pos.cy} r="6" fill="#bbb" />
              <circle cx={pos.cx} cy={pos.cy} r="3" fill="white" />
            </g>
          ))}
        </svg>

        {languageJourneyData.map((step, idx) => {
          const pos = dotPositions[idx];
          if (!pos) return null;

          return (
            <div
              key={`overlay-${idx}`}
              className="absolute pointer-events-none"
              style={{
                left: `${(pos.cx / viewBoxWidth) * 100}%`,
                top: `${(pos.cy / viewBoxHeight) * 100}%`,
                width: '32px',
                transform: 'translateX(-50%)',
              }}
            >
              <div 
                className="relative cursor-pointer pointer-events-auto"
                onMouseEnter={() => setActiveTooltip(idx)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <img
                  src={step.icon}
                  alt={step.label || 'flag'}
                  className="block absolute"
                  style={{
                    width: '32px',
                    height: '24px',
                    bottom: '10px',
                    left: '10px',
                  }}
                />
                {activeTooltip === idx && (
                  <div className="absolute z-[9999] w-64 p-3 bg-white rounded-lg shadow-lg -translate-x-1/2 -translate-y-full -top-11 left-1/2">
                    <div className="text-sm text-gray-700">{step.story}</div>
                    <div className="absolute w-2 h-2 bg-white transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
                  </div>
                )}
              </div>
              <span
                className="block text-center text-gray-500 text-xs absolute w-full"
                style={{
                  top: '10px',
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}

        <div
          className="absolute pointer-events-none"
          style={{
            left: `${((dotPositions[0].cx - 72) / viewBoxWidth) * 100}%`,
            top: `${((dotPositions[0].cy - 35) / viewBoxHeight) * 100}%`,
            width: '40px',
            height: '40px',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="flex items-center justify-center bg-blue-400 rounded-full w-9 h-9">
            <img
              src="/images/Languages/baby-10-svgrepo-com.svg"
              alt="baby"
              className="block w-8 h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageJourney; 