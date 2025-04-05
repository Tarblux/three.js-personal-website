import React from 'react';

const FavoriteBooksCard = ({ onBookClick }) => {
  const books = [
    {
      id: 1,
      cover: '/images/book-alchemisty.jpg',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      category: 'Fiction',
      whyILikeIt: 'A philosophical journey that teaches us about following our dreams and listening to our hearts.'
    },
    {
      id: 2,
      cover: '/images/book-atomichabits.jpg',
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Non-Fiction',
      whyILikeIt: 'A practical guide that provides actionable steps to build better habits and break bad ones.'
    },
    {
      id: 3,
      cover: '/images/book-underc.jpg',
      title: 'Understanding Comics',
      author: 'Scott McCloud',
      category: 'Non-Fiction',
      whyILikeIt: 'A fascinating exploration of visual communication and storytelling through the medium of comics.'
    },
    {
      id: 4,
      cover: '/images/book-felices.jpg',
      title: 'Felices Días Tío Sergio',
      author: 'Magali García Ramis',
      category: 'Fiction',
      whyILikeIt: 'A beautiful coming-of-age story that captures the essence of Puerto Rican culture and family dynamics.'
    },
    {
      id: 5,
      cover: '/images/book-msreadme.jpg',
      title: 'The Missing README',
      author: 'Chris Riccomini & Dmitriy Ryaboy',
      category: 'Non-Fiction',
      whyILikeIt: 'An essential guide that fills the gaps in software engineering education with practical industry knowledge.'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-3 col-span-4 row-span-1 flex flex-col transform transition-transform duration-300 hover:scale-105">
      <div className="flex items-center mb-2">
        <img
          src="/emojis/emoji-books.png"
          alt="Favorite Books"
          className="w-5 h-5 mr-2"
        />
        <h4 className="text-lg font-bold">Favorite Books</h4>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex gap-[4px] px-0.5 py-1 w-[300px] h-[160px] rounded-[4px]">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => onBookClick(book)}
              className="group relative h-full flex-1 overflow-hidden cursor-pointer rounded-[2px] transition-all duration-500 bg-[#212121] flex items-center justify-center hover:flex-[3]"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteBooksCard;
