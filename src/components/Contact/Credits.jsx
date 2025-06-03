import React from 'react';
import { row1Sections, row2Sections, specialThanks, assetAttributions } from '../../data/creditsData';

const CreditsSection = ({ section }) => (
  <div key={section.title}>
    <div className="flex items-center mb-2">
      <span className={`font-bold text-lg ${section.color}`}>{section.title}</span>
    </div>
    <ul className="list-disc list-inside space-y-1">
      {section.items.map((item) => (
        <li key={item} className="text-xs ">{item}</li>
      ))}
    </ul>
  </div>
);

const Credits = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-0">
      <div className="flex flex-col items-start">
        <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
          Credits & Acknowledgements
        </span>
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 w-full max-w-6xl mx-auto border border-white/30">
          <div className="bg-white rounded-lg p-6">
            <p className="text-gray-500 mb-8 max-w-2xl text-xs">
              The truth is, a project like this doesn't come together overnight—and it certainly wasn't a solo effort. 
              I want to give a heartfelt thank you to everyone who helped make this possible: my close friends and family, 
              the generous people on online forums who offered support when I was stuck, the brilliant library creators 
              whose tools saved me from writing thousands of lines of code, and all those who inspired me along the way. 
              I truly couldn't have done it without you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-8 md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
                  {row1Sections.map((section) => (
                    <CreditsSection key={section.title} section={section} />
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
                  {row2Sections.map((section) => (
                    <CreditsSection key={section.title} section={section} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <span className="font-bold text-lg text-black flex items-center gap-1">
                    SPECIAL THANKS <span role="img" aria-label="heart">❤️</span>
                  </span>
                </div>
                {specialThanks.map((thank, index) => {
                  const [firstName, ...rest] = thank.text.split(' ');
                  return (
                    <div key={thank.alt || index} className="flex items-start gap-3">
                      <img src={thank.img} alt={thank.alt} className="w-16 h-16 rounded-lg object-cover" />
                      <span className="text-xs text-gray-600">
                        <span className="font-bold">{firstName}</span>{' '}{rest.join(' ')}
                      </span>
                    </div>
                  );
                })}
                <div className="mt-6">
                  <div className="font-bold text-gray-400 text-base mb-2">ASSET ATTRIBUTIONS</div>
                  <div className="border border-gray-300 rounded-xl p-3 text-xs text-gray-600 bg-white/60">
                    {assetAttributions.map((attr, index) => (
                      <div key={index}>{attr}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;