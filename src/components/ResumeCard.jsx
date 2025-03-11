import React from 'react';

const ResumeCard = ({ onImageClick }) => {
  return (
    <div className="col-span-1 row-span-2 flex flex-col items-center">
      <img
        src="/images/resume-thumbnail.jpg"
        alt="Resume"
        className="rounded mb-2 w-full h-auto transform transition-transform duration-300 hover:scale-105 cursor-pointer mt-4"
        onClick={onImageClick}
      />
      <p className="text-sm text-gray-600">Click to enlarge !</p>
    </div>
  );
};

export default ResumeCard; 