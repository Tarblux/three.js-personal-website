import React from 'react';

const IntroCard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 col-span-2 row-span-4 flex flex-col items-center space-y-4">
      <img
        src="images/profile-pic.png"
        alt="Profile"
        className="w-36 h-36"
      />
      <h2 className="text-xl font-bold">Tariq Williams</h2>
      <p className="text-green-500">Software Engineer</p>
      <p className="text-gray-700">Milwaukee, WI</p>
      <div className="flex space-x-3 mt-auto">
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
      </div>
    </div>
  );
};

export default IntroCard;