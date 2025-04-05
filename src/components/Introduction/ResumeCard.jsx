import React from 'react';

const ResumeCard = ({ onImageClick }) => {
  return (
    <div className="bg-white rounded-lg shadow p-2 col-span-2 row-span-1 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={onImageClick}>
      <img
        src="/images/resume-thumbnail.jpg"
        alt="Resume"
        className="rounded mb-1 w-full h-auto"
      />
    </div>
  );
};

export default ResumeCard; 