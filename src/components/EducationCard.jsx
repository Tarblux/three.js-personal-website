import React from 'react';

const EducationCard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 col-span-3 row-span-2 flex flex-col">
      <div className="flex items-center mb-2">
        <img
          src="/emojis/emoji-edu.png"
          alt="Education"
          className="w-6 h-6 mr-2"
        />
        <h2 className="text-xl font-bold">Education</h2>
      </div>
      <h3 className="text-lg font-semibold">
        B.A. in <span className="text-green-600">Math &amp; Economics</span>,{' '}
        <span className="text-green-600">Minor in CS</span>
      </h3>
      <p className="text-gray-700 text-sm">
        Kalamazoo College | Sep 2019 - Jun 2023
      </p>
      <p className="mt-3 text-gray-800">
        I graduated from Kalamazoo College with a double major in{' '}
        <span className="text-green-600">Mathematics</span> and{' '}
        <span className="text-green-600">Economics</span>. Throughout my coursework,
        I frequently needed to code, which sparked my interest in{' '}
        <span className="text-green-600 font-semibold">Python</span> and ultimately
        led me to minoring in <span className="text-green-600">Computer Science</span>.
      </p>
    </div>
  );
};

export default EducationCard; 