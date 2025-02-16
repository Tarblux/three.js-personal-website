import React from "react";

const LoadedButton = ({ onFadeOut }) => {
  return (
    <div className="group relative">
      {/* Main button */}
      <button
        onClick={onFadeOut}
        className="relative border-0 text-white font-semibold text-[15px] cursor-pointer rounded-md z-10 group hover:shadow-2xl"
      >
        <div className="flex items-center justify-between gap-2 min-h-[40px] px-3 rounded-md z-10 bg-[#242a35] border border-[#e8e8e82d] transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]">
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Print Boarding Pass
        </div>
      </button>

      {/* Boarding Pass */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center items-center w-[300px] translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-full">
        <img
          src="/images/portfolio-boardingpass.svg"
          alt="Boarding Pass"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default LoadedButton;
