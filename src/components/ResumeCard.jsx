import React from 'react';

const ResumeCard = ({ onImageClick }) => {
  return (
    <div className="rounded-lg shadow p-4 col-span-1 row-span-2 flex flex-col items-center">
      <img
        src="/images/resume-thumbnail.jpg"
        alt="Resume"
        className="rounded mb-2 w-full h-auto transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={onImageClick}
      />
      <a
        href="/docs/Tariq-Williams-Resume.pdf"
        download
        className="bg-white text-black py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Download
      </a>
    </div>
  );
};

export default ResumeCard; 