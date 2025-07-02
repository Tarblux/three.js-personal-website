import React from 'react';

const EducationCard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-3 md:col-span-7 md:row-span-1 transform transition-transform duration-300 hover:scale-[1.03]">
      <div className="flex items-center mb-2">
        <img
          src="/emojis/emoji-edu.webp"
          alt="Education"
          className="w-5 h-5 mr-2"
        />
        <h2 className="text-lg font-bold">Education</h2>
      </div>

      <h3 className="text-lg font-bold">
        B.A. in <span className="text-green-600">Math & Economics</span>, Minor in CS
      </h3>
      <p className="text-sm text-gray-600">Kalamazoo College | Sep 2019 - Jun 2023</p>

      <p className="text-sm mt-2">
        I graduated from Kalamazoo College with a double major in{' '}
        <span className="text-green-600 font-bold">Mathematics</span> and{' '}
        <span className="text-green-600 font-bold">Economics</span>. Throughout my coursework, I frequently
        needed to code, which sparked my interest in{' '}
        <span className="text-green-600 font-bold">Python</span> and ultimately led me to minoring in{' '}
        <span className="text-green-600 font-bold">Computer Science</span>.
      </p>
    </div>
  );
};

export default EducationCard; 