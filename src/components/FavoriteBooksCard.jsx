import React, { useState } from 'react';

const FavoriteBooksCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const books = [
    {
      id: 1,
      cover: '/images/book-alchemisty.jpg',
      title: 'Atomic Habits',
      description: 'A guide to building good habits and breaking bad ones.'
    },
    {
      id: 2,
      cover: '/images/book-atomichabits.jpg',
      title: 'Book Two',
      description: 'Description for Book Two.'
    },
    {
      id: 3,
      cover: '/images/book-underc.jpg',
      title: 'Book Three',
      description: 'Description for Book Three.'
    }
  ];

  const openModal = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <>
      {/* Favorite Books Card */}
      <div className="bg-white rounded-lg shadow p-4 col-span-2 row-span-2">
        <div className="flex items-center mb-4">
          <img
            src="/emojis/emoji-books.png"
            alt="Favorite Books"
            className="w-6 h-6 mr-2"
          />
          <h2 className="text-xl font-bold">Favorite Books</h2>
        </div>
        <div className="flex gap-[5px] p-[0.4em] w-[210px] h-[154px] bg-[#212121] rounded-[4px]">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => openModal(book)}
              className="group relative h-full flex-1 overflow-hidden cursor-pointer rounded-[2px] transition-all duration-500 bg-[#212121] border border-[#ff5a91] flex items-center justify-center hover:flex-[4]"
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 text-2xl font-bold"
            >
              &times;
            </button>
            {selectedBook && (
              <div>
                <h3 className="text-xl font-bold mb-2">{selectedBook.title}</h3>
                <p>{selectedBook.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FavoriteBooksCard;
