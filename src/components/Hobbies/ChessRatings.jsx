import React, { useEffect, useState } from 'react';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://threejs-backend.tariqwill.com';

const ChessRatings = () => {
  const [ratings, setRatings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/my-ratings`)
      .then((res) => res.json())
      .then((data) => {
        setRatings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full py-8">
        <span className="text-gray-400 text-sm">Loading...</span>
      </div>
    );
  }


  const get = (obj, path, fallback = '-') => {
    return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj) ?? fallback;
  };


  const formatChange = (val) => {
    if (val > 0) return `+ ${val}`;
    if (val < 0) return `${val}`;
    return '0';
  };

  return (
    <>
      <div className="col-span-1 row-span-1">
        <div className="bg-white rounded-2xl shadow-md h-full flex flex-row items-center px-6 py-4">
          <img src="/images/Hobbies/hobbies-puzzle.svg" alt="Puzzles" className="w-12 h-12 mr-1" />
          <div className="flex flex-row flex-1 items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-gray-500 font-semibold text-xl">Puzzles</span>
              <span className="text-3xl font-bold text-black leading-tight">{get(ratings, ['tactics', 'highest', 'rating'], 0)}</span>
            </div>
            <span className="text-transparent font-bold text-lg ml-4">+0</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 row-span-1">
        <div className="bg-white rounded-2xl shadow-md h-full flex flex-row items-center px-6 py-4">
          <img src="/images/Hobbies/hobbies-bullet.svg" alt="Bullet" className="w-12 h-12 mr-4" />
          <div className="flex flex-row flex-1 items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-gray-500 font-semibold text-xl">Bullet</span>
              <span className="text-3xl font-bold text-black leading-tight">{get(ratings, ['chess_bullet', 'last', 'rating'], 0)}</span>
            </div>
            <span className="text-red-600 font-bold text-lg ml-4">{formatChange(get(ratings, ['rating_change_90d', 'bullet'], 0))}</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 row-span-1">
        <div className="bg-white rounded-2xl shadow-md h-full flex flex-row items-center px-6 py-4">
          <img src="/images/Hobbies/hobbies-blitz.svg" alt="Blitz" className="w-12 h-12 mr-4" />
          <div className="flex flex-row flex-1 items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-gray-500 font-semibold text-xl">Blitz</span>
              <span className="text-3xl font-bold text-black leading-tight">{get(ratings, ['chess_blitz', 'last', 'rating'], 0)}</span>
            </div>
            <span className="text-green-600 font-bold text-lg ml-4">{formatChange(get(ratings, ['rating_change_90d', 'blitz'], 0))}</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 row-span-1">
        <div className="bg-white rounded-2xl shadow-md h-full flex flex-row items-center px-6 py-4">
          <img src="/images/Hobbies/hobbies-rapid.svg" alt="Rapid" className="w-12 h-12 mr-4" />
          <div className="flex flex-row flex-1 items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-gray-500 font-semibold text-xl">Rapid</span>
              <span className="text-3xl font-bold text-black leading-tight">{get(ratings, ['chess_rapid', 'last', 'rating'], 0)}</span>
            </div>
            <span className="text-green-600 font-bold text-lg ml-4">{formatChange(get(ratings, ['rating_change_90d', 'rapid'], 0))}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChessRatings; 