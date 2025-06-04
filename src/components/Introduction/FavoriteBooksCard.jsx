import React, { useState } from 'react';

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

  const books = [
    {
      id: 1,
      cover: '/images/Introduction/book-alchemisty.webp',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      category: 'Fiction',
      whyILikeIt: `As someone who's always trying to plan everything out and make all the "right" moves, This book
                   hit me in a way I didn't expect. It made me realize that life—wild, unpredictable, and totally uninterested in my little
                   spreadsheets—doesn't really follow any plan. Sometimes, it's actually worth letting your heart, your gut, or even a 
                   random tumbleweed take the wheel and see where it goes.`
    },
    {
      id: 2,
      cover: '/images/Introduction/book-atomichabits.webp',
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Non-Fiction',
      whyILikeIt: `Honestly, I picked up Atomic Habits hoping it would magically fix all my bad habits overnight. 
                   Spoiler: it didn't. But weirdly, I think it did something even better—it helped me actually understand my habits, 
                   the good and the not-so-great ones. And somewhere along the way, I realized the real fix wasn't hiding in the pages 
                   of a book, it was more about looking inward. Still working on it, but at least now I've got a better map.`
    },
    {
      id: 3,
      cover: '/images/Introduction/book-underc.webp',
      title: 'The Undercover Economist',
      author: 'Tim Harford',
      category: 'Non-Fiction',
      whyILikeIt: `This book pulled back the curtain on simple stuff like why movie snacks cost more than the ticket 
                   and how companies trick me into spending. Harford makes it all click, and it felt like I'd been seeing 
                   the world with one eye shut and this book opened the other. But plot twist—just because I get the game 
                   now doesn't mean I'm winning. I'm still broke, just more aware of it.`
    },
    {
      id: 4,
      cover: '/images/Introduction/book-felices.webp',
      title: 'Felices Días Tío Sergio',
      author: 'Magali García Ramis',
      category: 'Fiction',
      whyILikeIt: `I was basically forced to read this book for a Spanish lit exam, and I honestly 
                   hated every second of it while it was happening. But weirdly enough, all those painful paragraphs that had me 
                   clinging to Google Translate actually leveled up my Spanish big time. So now I've got this weird appreciation 
                   for it—I kind of love that I hated it, if that makes any sense.`
    },
    {
      id: 5,
      cover: '/images/Introduction/book-msreadme.webp',
      title: 'The Missing README',
      author: 'Chris Riccomini & Dmitriy Ryaboy',
      category: 'Non-Fiction',
      whyILikeIt: `This book honestly saved me from looking totally clueless when I was just starting out 
                    in my career. In school, you kind of learn what software is —like getting a degree in "software theory" or 
                    "software learning"—but this book helped me understand what software "engineering" actually looks like in the 
                    real world. It bridged that awkward gap between classroom knowledge and actual "software building," and made 
                    the whole thing feel way more doable.`
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-3 col-span-4 row-span-1 flex flex-col transform transition-transform duration-300 hover:scale-105">
      <div className="flex items-center mb-2">
        <img
          src="/emojis/emoji-books.webp"
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
