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
    <div className="absolute md:inset-0 inset-0 z-0 flex items-center justify-center p-2 md:p-0 min-h-screen max-h-screen overflow-y-auto">
      <div className="flex flex-col items-start w-full max-w-6xl mx-auto min-h-[80vh] max-h-[80vh] overflow-y-auto md:min-h-0 md:max-h-none md:overflow-visible">
        <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
          Credits & Acknowledgements
        </span>
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 w-full max-w-6xl mx-auto border border-white/30 transition-all duration-300 ease-in-out hover:shadow-xl cursor-pointer min-h-[60vh] max-h-[80vh] md:min-h-[75vh] md:max-h-[80vh] overflow-hidden flex flex-col">
          <div className="bg-white rounded-lg p-4 md:p-6 flex-1 overflow-y-auto">
            <p className="text-gray-600 mb-8 max-w-3xl text-sm">
              The truth is, a project like this{" "}
              <b>doesn't come together overnight</b>, and it certainly{" "}
              <b>wasn't a solo effort</b>. I want to give a{" "}
              <b>heartfelt thank you</b> to everyone who helped make this
              possible:
              <b>my close friends and family</b>, the{" "}
              <b>generous people on online forums</b> who offered support when I
              was stuck, the <b>brilliant library creators</b> whose tools saved
              me from writing thousands of lines of code, and all those who{" "}
              <b>inspired me along the way</b>. I truly{" "}
              <b>couldn't have done it without you</b>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4 md:col-span-2">
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
                    SPECIAL THANKS{" "}
                    <span role="img" aria-label="heart">
                      ❤️
                    </span>
                  </span>
                </div>
                {specialThanks.map((thank, index) => {
                  const [firstName, ...rest] = thank.text.split(" ");
                  return (
                    <div
                      key={thank.alt || index}
                      className="flex items-start gap-3"
                    >
                      <img
                        src={thank.img}
                        alt={thank.alt}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <span className="text-xs text-gray-600">
                        <span className="font-bold">{firstName}</span>{" "}
                        {rest.join(" ")}
                      </span>
                    </div>
                  );
                })}
                <div className="mt-6">
                  <div className="font-bold text-gray-400 text-base mb-2">
                    ASSET ATTRIBUTIONS
                  </div>
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

export default React.memo(Credits);