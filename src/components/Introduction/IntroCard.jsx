import React from 'react';

const IntroCard = () => {
  return (
    // ROOT_CARD_CONTAINER: This is the main positioning context for the absolute image and the card content
    <div className="relative bg-white rounded-lg shadow p-3 pb-4 col-span-3 row-span-2 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
      
      {/* OVERFLOWING_IMAGE HACK: Positioned absolutely relative to ROOT_CARD_CONTAINER */}
      {/* This fixes the clipping issues in Safari and Firefox with rounded containers */}
      <div className="absolute top-[calc(0.75rem-52px)] left-[calc(50%-6.5rem)] z-20">
        {/* Gray background square */}
        <div className="absolute top-[52px] left-3 w-[182px] h-[182px] bg-gray-200 rounded-2xl z-0"></div>
        {/* Profile image */}
        <img
          src="/images/Contact/profile-pic-contact.webp"
          alt="Profile"
          className="w-[250px] h-[250px] object-cover rounded-2xl z-10 -left-5 relative overflow-visible"
        />
      </div>

      <div className="flex flex-col items-center space-y-2">
        {/* AVATAR_SPACER: This div creates space for the absolutely positioned image */}
        <div className="relative w-32 h-32 flex-shrink-0 mb-16">
          {/* This spacer maintains the layout spacing where the image would have been */}
        </div>
        <h2 className="text-xl font-bold tracking-tight">Tariq Williams</h2>
        <div className="space-y-0 text-center w-full">
          <p className="text-green-500 font-bold">Software Engineer</p>
          <p className="text-black-600 -mt-1 font-medium">at Flextrade</p>
        </div>
        <hr className="w-3/4 border-gray-300 my-1" />
        <p className="text-grey-700 text-sm font-thin">Milwaukee, WI</p>
      </div>
      <div className="flex space-x-3 mt-auto mb-3">
        <a 
          href="https://github.com/Tarblux" 
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="transform transition-transform hover:scale-110"
        >
          <img src="/icons/Github_light.svg" alt="GitHub" className="w-6 h-6" />
        </a>
        <a 
          href="https://www.linkedin.com/in/tariq-williams12/" 
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="transform transition-transform hover:scale-110"
        >
          <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
        </a>
        <a 
          href="https://stackoverflow.com/users/30169462/tariq-williams?tab=profile" 
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="transform transition-transform hover:scale-110"
        >
          <img src="/icons/stackoverflow.svg" alt="LinkedIn" className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default IntroCard;