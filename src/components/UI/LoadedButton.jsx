import React, { useState, useEffect } from "react"

const LoadedButton = ({ onBoardingPassClick }) => {
  const [isPrinting, setIsPrinting] = useState(false)
  const [printingComplete, setPrintingComplete] = useState(false)

  const handlePrintClick = () => {
    const printAudio = new Audio("sounds/ticket-printer.mp3")
    printAudio.play()
    setIsPrinting(true)
    setPrintingComplete(true)
  };

  const handleBoardingPassClick = () => {
    if (onBoardingPassClick && printingComplete) {
      onBoardingPassClick()
    }
  };

  return (
    <div className="relative">
      {/* Print Button */}
      <button
        onClick={handlePrintClick}
        disabled={isPrinting}
        className="relative border-0 text-white font-semibold text-[15px] cursor-pointer rounded-md z-10 hover:shadow-2xl"
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
      <div className="boarding-pass-container">
        <img
          src="/images/UI/portfolio-boardingpass.svg"
          alt="Boarding Pass"
          onClick={handleBoardingPassClick}
          className={`boarding-pass ${isPrinting ? "printing" : ""} ${!printingComplete ? "pointer-events-none" : "cursor-pointer"}`}
        />
      </div>
    </div>
  );
};

export default LoadedButton;

