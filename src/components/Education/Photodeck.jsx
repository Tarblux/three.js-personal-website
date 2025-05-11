import React, { useState, useRef } from 'react';
import './Photodeck.css';

const deckImages = [
  { src: '/images/Education/korea-4.jpg' },
  { src: '/images/Education/korea-3.jpg' },
  { src: '/images/Education/korea-2.jpg' },
  { src: '/images/Education/korea-1.jpg' },
  { src: '/images/Education/korea-0.jpg' }
];

const modalImages = [
  { src: '/images/Education/education-korea-4.png' },
  { src: '/images/Education/education-korea-3.png' },
  { src: '/images/Education/education-korea-2.png' },
  { src: '/images/Education/education-korea-1.png' },
  { src: '/images/Education/education-korea-0.png' }
];

const Photodeck = () => {
  const [selected, setSelected] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const audioRef = useRef(new Audio('/sounds/polaroid-print.mp3'));

  const handleCardClick = (index) => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setSelected(index);
    setIsClosing(false);
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains('photodeck-modal')) {
      setIsClosing(true);
      setTimeout(() => {
        setSelected(null);
        setIsClosing(false);
      }, 300);
    }
  };

  const handleCloseButton = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelected(null);
      setIsClosing(false);
    }, 300);
  };

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
      {selected !== null && (
        <>
          <div className="fixed inset-0 z-[999] backdrop-blur-md"></div>
          <div className="photodeck-modal" onClick={handleCloseModal}>
            <div className={`photodeck-modal-content no-bg ${isClosing ? 'animate-modalOut' : 'animate-modalIn'}`}>
              <img src={modalImages[selected].src} alt={`Korea ${selected + 1}`} className="photodeck-modal-img" />
              <button className="photodeck-modal-close" onClick={handleCloseButton}>&times;</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Photodeck; 