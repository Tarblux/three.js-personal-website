import React, { useState } from "react";
import LocationCard from "./LocationCard";
import FavoriteBooksCard from "./FavoriteBooksCard";
import IntroCard from "./IntroCard";
import EducationCard from "./EducationCard";
import ResumeCard from "./ResumeCard";

const Introduction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const handleImageClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsBookModalOpen(true);
  };

  const handleCloseBookModal = () => {
    setIsBookModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-0">
      <div className="flex flex-col items-start">
        <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
          Introduction
        </span>
        {/* Glassmorphic Container */}
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 w-full max-w-4xl mx-auto border border-white/30">
          <div className="grid grid-cols-12 gap-3 auto-rows-auto max-h-[500px]">
            <IntroCard />
            <LocationCard />
            <FavoriteBooksCard onBookClick={handleBookClick} />
            <EducationCard />
            <ResumeCard onImageClick={handleImageClick} />
          </div>
        </div>
      </div>

      {/* Resume Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-[9999]"
          onClick={handleCloseModal}
        >
          <div className="relative flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img
              src="/images/Introduction/resume-thumbnail.png"
              alt="Resume Full"
              className="max-w-[85vw] max-h-[85vh] rounded shadow-lg object-contain"
            />
            <a
              href="/docs/Tariq-Williams-Resume.pdf"
              download
              className="bg-white text-black py-2 px-6 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >
              Download Resume
            </a>
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black/50 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Books Modal Overlay */}
      {isBookModalOpen && selectedBook && (
        <div
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-[9999]"
          onClick={handleCloseBookModal}
        >
          <div 
            className="bg-white rounded-lg shadow-lg relative max-w-2xl w-full mx-4 p-6 flex gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseBookModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="w-1/3">
              <img
                src={selectedBook.cover}
                alt={selectedBook.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="w-2/3">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedBook.category === 'Fiction' 
                    ? 'bg-pink-100 text-pink-800' 
                    : 'bg-cyan-100 text-cyan-800'
                }`}>
                  {selectedBook.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{selectedBook.title}</h3>
              <p className="text-gray-600 italic mb-6">{selectedBook.author}</p>
              <div>
                <h4 className="font-bold text-lg mb-2">Why I like it:</h4>
                <p className="text-gray-700">{selectedBook.whyILikeIt}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Introduction;
