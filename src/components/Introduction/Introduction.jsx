import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import LocationCard from "./LocationCard";
import FavoriteBooksCard from "./FavoriteBooksCard";
import IntroCard from "./IntroCard";
import EducationCard from "./EducationCard";
import ResumeCard from "./ResumeCard";
import FlipCardDashboard from "../UI/FlipCardDashboard";
import soundManager from "../../utils/soundManager";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false); // 768px for md

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const Introduction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    soundManager.preload("infoPop", [
      "/sounds/infographic-pop-1.ogg",
      "/sounds/infographic-pop-1.mp3",
    ]);
    soundManager.preload("modalClose", ["/sounds/modal-close.ogg", "/sounds/modal-close.mp3"]);

    soundManager.volume("infoPop", 0.5);
    soundManager.volume("modalClose", 0.7);
  }, []);

  const handleImageClick = () => {
    soundManager.play("infoPop");
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    soundManager.play("modalClose");
    setIsModalOpen(false);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    soundManager.play("infoPop");
    setIsBookModalOpen(true);
  };

  const handleCloseBookModal = () => {
    soundManager.play("modalClose");
    setIsBookModalOpen(false);
    setSelectedBook(null);
  };

  // Resume Modal Content
  const resumeModalContent = isModalOpen && (
    <div
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-[9999] p-4"
      onClick={handleCloseModal}
    >
      <div className="relative flex flex-col items-center gap-4 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <img
          src="/images/Introduction/resume-thumbnail.webp"
          alt="Resume Full"
          className="rounded shadow-lg object-contain w-[700px] max-h-[90vh]"
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
  );

  // Books Modal Content
  const booksModalContent = isBookModalOpen && selectedBook && (
    <div
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-[9999] p-4 overflow-y-auto"
      onClick={handleCloseBookModal}
    >
      <div 
        className="bg-white rounded-lg shadow-lg relative w-full max-w-2xl flex flex-col md:flex-row gap-6 p-4 md:p-6 max-h-[90vh] overflow-y-auto"
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
        <div className="w-full md:w-1/3 flex-shrink-0 flex items-start justify-center">
          <img
            src={selectedBook.cover}
            alt={selectedBook.title}
            className="w-auto max-w-[220px] max-h-[40vh] md:max-w-full md:max-h-[350px] rounded-lg shadow-md mx-auto"
          />
        </div>
        <div className="w-full md:w-2/3">
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
  );

  return (
    <>
      <div className="min-h-screen flex items-center justify-center z-0 p-4 md:p-0">
        <div className={`flex flex-col items-start w-full ${isMobile ? 'max-w-none' : 'max-w-5xl'}`}>
          <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
            Introduction
          </span>
          {/* Mobile: Flip Card; Desktop: Original grid in glass container */}
          {isMobile ? (
            <FlipCardDashboard
              className="h-[82vh] max-h-[92vh]"
              frontSide={
                <div className="flex flex-col gap-4 h-full overflow-visible mt-4">
                  <IntroCard />
                  <EducationCard />
                </div>
              }
              backSide={
                <div className="flex flex-col gap-4 h-full overflow-hidden">
                  <ResumeCard onImageClick={handleImageClick} />
                  <FavoriteBooksCard onBookClick={handleBookClick} />
                </div>
              }
              flipButtonText={{ front: 'More about me', back: 'Back to intro' }}
            />
          ) : (
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 w-full border border-white/30 overflow-visible">
              <div className="grid grid-cols-12 gap-3 auto-rows-auto max-h-[600px] overflow-visible">
                <IntroCard />
                <LocationCard />
                <FavoriteBooksCard onBookClick={handleBookClick} />
                <EducationCard />
                <ResumeCard onImageClick={handleImageClick} />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Render modals using portals to escape scroll container constraints */}
      {resumeModalContent && createPortal(resumeModalContent, document.body)}
      {booksModalContent && createPortal(booksModalContent, document.body)}
    </>
  );
};

export default React.memo(Introduction);
