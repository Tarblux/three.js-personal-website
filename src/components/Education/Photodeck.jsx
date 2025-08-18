import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Photodeck.css';
import soundManager from '../../utils/soundManager'

const deckImages = [
  { src: '/images/Education/korea-4.webp' },
  { src: '/images/Education/korea-3.webp' },
  { src: '/images/Education/korea-2.webp' },
  { src: '/images/Education/korea-1.webp' },
  { src: '/images/Education/korea-0.webp' }
];

const modalImages = [
  { src: '/images/Education/education-korea-4.webp' },
  { src: '/images/Education/education-korea-3.webp' },
  { src: '/images/Education/education-korea-2.webp' },
  { src: '/images/Education/education-korea-1.webp' },
  { src: '/images/Education/education-korea-0.webp' }
];

const Photodeck = () => {
  const [selected, setSelected] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSideImages, setShowSideImages] = useState(false);

  useEffect(() => {
    soundManager.preload('polaroid', ['/sounds/polaroid-print.ogg', '/sounds/polaroid-print.mp3'])
    soundManager.preload('polaroid-next', ['/sounds/polaroid-next.ogg', '/sounds/polaroid-next.mp3'])
    soundManager.preload('modalClose', ['/sounds/modal-close.ogg', '/sounds/modal-close.mp3'])
  }, [])

  const handleCardClick = (index) => {
    soundManager.play('polaroid')
    setSelected(index);
    setIsClosing(false);
    setShowSideImages(false); // Reset side images visibility
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains('photodeck-modal')) {
      soundManager.play('modalClose');
      setIsClosing(true);
      setTimeout(() => {
        setSelected(null);
        setIsClosing(false);
      }, 300);
    }
  };

  const handleCloseButton = () => {
    soundManager.play('modalClose');
    setIsClosing(true);
    setTimeout(() => {
      setSelected(null);
      setIsClosing(false);
    }, 300);
    };

  const handlePrevious = () => {
    if (isTransitioning) return;
    soundManager.play('polaroid-next');
    setIsTransitioning(true);
    setTimeout(() => {
      setSelected(prev => prev > 0 ? prev - 1 : modalImages.length - 1);
      setIsTransitioning(false);
    }, 150);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    soundManager.play('polaroid-next');
    setIsTransitioning(true);
    setTimeout(() => {
      setSelected(prev => prev < modalImages.length - 1 ? prev + 1 : 0);
      setIsTransitioning(false);
    }, 150);
  };

  const handleImageSelect = (index) => {
    if (isTransitioning || index === selected) return;
    soundManager.play('polaroid-next');
    setIsTransitioning(true);
    setTimeout(() => {
      setSelected(index);
      setIsTransitioning(false);
    }, 150);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selected === null) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'Escape':
          e.preventDefault();
          handleCloseButton();
          break;
      }
    };

    if (selected !== null) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected]);

  // Show side images after 1.5 seconds when modal opens
  useEffect(() => {
    if (selected !== null) {
      const timer = setTimeout(() => {
        setShowSideImages(true);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setShowSideImages(false);
    }
  }, [selected]);

  // Helper function to get image indices for carousel
  const getPrevIndex = (current) => current > 0 ? current - 1 : modalImages.length - 1;
  const getNextIndex = (current) => current < modalImages.length - 1 ? current + 1 : 0;

  // Modal content
  const modalContent = selected !== null && (
    <>
      <div className="fixed inset-0 z-[999] backdrop-blur-md"></div>
      <div className="photodeck-modal" onClick={handleCloseModal}>
        <div className={`photodeck-modal-content no-bg ${isClosing ? 'animate-modalOut' : 'animate-modalIn'}`}>
          <div className="photodeck-carousel">
            {/* Previous Image - only show after delay */}
            {showSideImages && (
              <div 
                className="photodeck-carousel-side photodeck-carousel-prev photodeck-side-fade-in"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageSelect(getPrevIndex(selected));
                }}
              >
                <img 
                  src={modalImages[getPrevIndex(selected)].src} 
                  alt={`Korea ${getPrevIndex(selected) + 1}`} 
                  className={`photodeck-side-img ${isTransitioning ? 'photodeck-img-transition' : ''}`}
                />
              </div>
            )}

            {/* Main Image */}
            <div className="photodeck-carousel-main">
              <img 
                src={modalImages[selected].src} 
                alt={`Korea ${selected + 1}`} 
                className={`photodeck-modal-img ${isTransitioning ? 'photodeck-img-transition' : ''}`}
              />
              {/* Close button positioned relative to main image */}
              <button className="photodeck-modal-close" onClick={handleCloseButton}>&times;</button>
            </div>

            {/* Next Image - only show after delay */}
            {showSideImages && (
              <div 
                className="photodeck-carousel-side photodeck-carousel-next photodeck-side-fade-in"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageSelect(getNextIndex(selected));
                }}
              >
                <img 
                  src={modalImages[getNextIndex(selected)].src} 
                  alt={`Korea ${getNextIndex(selected) + 1}`} 
                  className={`photodeck-side-img ${isTransitioning ? 'photodeck-img-transition' : ''}`}
                />
              </div>
            )}

            {/* Image Counter */}
            <div className="photodeck-counter">
              {selected + 1} / {modalImages.length}
            </div>

            {/* Instructional Text */}
            <div className="photodeck-instructions">
              ← → Navigate • ESC Close
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="photodeck-container">
        {deckImages.map((image, i) => (
          <div className="photodeck-card" key={i} onClick={() => handleCardClick(i)} style={{ cursor: 'pointer' }}>
            <img src={image.src} alt={`Korea ${i + 1}`} className="photodeck-img" />
            <div className="photodeck-info">Favorite Memories</div>
          </div>
        ))}
      </div>
      
      {/* Render modal using portal to escape scroll container constraints */}
      {modalContent && createPortal(modalContent, document.body)}
    </>
  );
};

export default Photodeck; 