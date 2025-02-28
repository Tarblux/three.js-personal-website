import React, { useState } from "react";
import LocationCard from "./LocationCard";
import FavoriteBooksCard from "./FavoriteBooksCard";

const WelcomeCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="absolute top-[100vh] left-0 right-0 flex items-center justify-center">
      {/* Glassmorphic Container */}
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 w-full max-w-5xl">
        <div className="grid grid-cols-6 grid-rows-4 gap-4">
          {/* Left Intro Card */}
          <div className="bg-white rounded-lg shadow p-4 col-span-2 row-span-4 flex flex-col items-center space-y-4">
            {/* Profile Image */}
            <img
              src="images/profile-pic.png"
              alt="Profile"
              className="w-36 h-36"
            />
            {/* Name, Job Title, Location */}
            <h2 className="text-xl font-bold">Tariq Williams</h2>
            <p className="text-green-500">Software Engineer</p>
            <p className="text-gray-700">Milwaukee, WI</p>
            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-auto">
              <a href="#" aria-label="GitHub">
                <img
                  src="/icons/Github_light.svg"
                  alt="GitHub"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" aria-label="Email">
                <img src="/icons/gmail.svg" alt="Email" className="w-6 h-6" />
              </a>
            </div>
          </div>

          <LocationCard />
          
          <FavoriteBooksCard />


          {/* Education Card */}
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
              B.A. in{" "}
              <span className="text-green-600">Math &amp; Economics</span>,{" "}
              <span className="text-green-600">Minor in CS</span>
            </h3>
            <p className="text-gray-700 text-sm">
              Kalamazoo College | Sep 2019 - Jun 2023
            </p>
            <p className="mt-3 text-gray-800">
              I graduated from Kalamazoo College with a double major in{" "}
              <span className="text-green-600">Mathematics</span> and{" "}
              <span className="text-green-600">Economics</span>. Throughout my
              coursework, I frequently needed to code, which sparked my interest
              in <span className="text-green-600 font-semibold">Python</span>{" "}
              and ultimately led me to minoring in{" "}
              <span className="text-green-600">Computer Science</span>.
            </p>
          </div>

          {/* Resume Card */}
          <div className="rounded-lg shadow p-4 col-span-1 row-span-2 flex flex-col items-center">
            <img
              src="/images/resume-thumbnail.jpg"
              alt="Resume"
              className="rounded mb-2 w-full h-auto transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={handleImageClick}
            />
            <a
              href="/docs/Tariq-Williams-Resume.pdf"
              download
              className="bg-white text-black py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Download
            </a>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src="/images/resume-thumbnail.jpg" // Replace with a full-resolution image if available
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
