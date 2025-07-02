import React, { useState } from 'react';
import { favoriteBooks } from '../../data/favoriteBooks';

const FavoriteBooksCard = ({ onBookClick }) => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleMouseEnter = (bookId) => {
    setHoveredBook(bookId);
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);
    return () => clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    setHoveredBook(null);
    setShowMessage(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 md:col-span-4 md:row-span-1 flex flex-col transform transition-transform duration-300 hover:scale-105">
      <div className="flex items-center mb-2">
        <img
          src="/emojis/emoji-books.webp"
          alt="Favorite Books"
          className="w-5 h-5 mr-2"
        />
        <h4 className="text-lg font-bold">Favorite Books</h4>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex gap-[4px] px-0.5 py-1 w-full max-w-[300px] h-[160px] rounded-[4px]">
          {favoriteBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => onBookClick(book)}
              onMouseEnter={() => handleMouseEnter(book.id)}
              onMouseLeave={handleMouseLeave}
              className="group relative h-full flex-1 overflow-hidden cursor-pointer rounded-[2px] transition-all duration-500 bg-[#212121] flex items-center justify-center hover:flex-[3]"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              {hoveredBook === book.id && showMessage && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fadeIn">
                  <p className="text-white text-sm font-medium">Click me</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteBooksCard;
