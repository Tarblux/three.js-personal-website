import React from 'react';
import './Photodeck.css';

const images = [
  '/images/Introduction/welcome-moji.png',
  '/images/Introduction/resume-thumbnail.png',
  '/images/Introduction/profile-pic.png',
  '/images/Introduction/mke-landscape-2.png',
  '/images/Introduction/book-underc.jpg',
  '/images/Introduction/book-msreadme.jpg',
  '/images/Introduction/book-atomichabits.jpg'
];

const Photodeck = () => {
  return (
    <div className="photodeck-container">
      {images.map((src, i) => (
        <div className="photodeck-card" key={i}>
          <img src={src} alt={`photo ${i + 1}`} className="photodeck-img" />
        </div>
      ))}
    </div>
  );
};

export default Photodeck; 