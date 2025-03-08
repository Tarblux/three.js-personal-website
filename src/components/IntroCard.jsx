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
        <a href="#" aria-label="GitHub">
          <img src="/icons/Github_light.svg" alt="GitHub" className="w-6 h-6" />
        </a>
        <a href="#" aria-label="LinkedIn">
          <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
        </a>
        <a href="#" aria-label="Email">
          <img src="/icons/gmail.svg" alt="Email" className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default IntroCard; 