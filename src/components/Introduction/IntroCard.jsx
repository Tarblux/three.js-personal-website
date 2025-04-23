import React from 'react';

const IntroCard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-3 pb-4 col-span-3 row-span-2 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col items-center space-y-2">
        <img
          src="/images/Introduction/profile-pic.png"
          alt="Profile"
          className="w-38 h-38"
        />
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
          href="www.linkedin.com/in/tariq-williams12" 
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