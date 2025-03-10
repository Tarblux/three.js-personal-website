import React, { useState } from "react";
import LocationCard from "./LocationCard";
import FavoriteBooksCard from "./FavoriteBooksCard";
import IntroCard from "./IntroCard";
import EducationCard from "./EducationCard";
import ResumeCard from "./ResumeCard";

const WelcomeCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="absolute top-[100vh] left-0 right-0 flex items-center justify-center">
      {/* Glassmorphic Container */}
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 w-full max-w-5xl">
        <div className="grid grid-cols-6 grid-rows-4 gap-4">
          <IntroCard />
          <LocationCard />
          <FavoriteBooksCard />
          <EducationCard />
          <ResumeCard onImageClick={handleImageClick} />
        </div>
      </div>

      {/* Resume Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src="/images/resume-thumbnail.jpg"
              alt="Resume Full"
              className="max-w-full max-h-full rounded shadow-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeCard;
