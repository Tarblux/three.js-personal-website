import React, { useEffect, useState } from 'react';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import ChessRatingCard from './ChessRatingCard';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://threejs-backend.tariqwill.com';

const mockBulletData = [1600, 1580, 1570, 1560, 1550, 1570, 1565,1534];
const mockBlitzData = [1500, 1520, 1550, 1600, 1620, 1650, 1672,1634];
const mockRapidData = [1490, 1492, 1493, 1494, 1495, 1495, 1495,1494];

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
    if (val > 0) return `+${val}`;
    if (val < 0) return `${val}`;
    return '+0';
  };

  const getChangeColor = (val) => {
    if (val > 0) return 'mediumseagreen'; // 
    if (val < 0) return 'red'; // 
    return 'blue'; // 
  };

  const getChangeTextColor = (val) => {
    if (val > 0) return 'text-green-600';
    if (val < 0) return 'text-red-500';
    return 'text-blue-500';
  };

  return (
    <>
      {/* Puzzles Card */}
      <div className="col-span-1 row-span-1">
        <div className="bg-white rounded-2xl shadow-md h-28 flex flex-row px-1 py-4 justify-start transition-transform duration-200 hover:scale-105">
          {/* Left: Icon and Info */}
          <div className="flex flex-col justify-end">
            <div className="flex flex-row items-center">
              <img src="/images/Hobbies/hobbies-puzzle.svg" alt="Puzzles" className="w-12 h-12 mr-1" />
              <div className="flex flex-col justify-center ml-1">
                <span className="text-gray-400 font-semibold text-sm">Puzzles</span>
                <span className="text-2xl font-bold text-black leading-tight">{get(ratings, ['tactics', 'highest', 'rating'], 0)}</span>
              </div>
            </div>
          </div>
          {/* Right: Change */}
          <div className="flex flex-col items-center justify-center ml-20">
            <span className="text-transparent font-bold text-lg">+0</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 row-span-1">
        <ChessRatingCard
          iconSrc="/images/Hobbies/hobbies-bullet.svg"
          alt="Bullet"
          label="Bullet"
          rating={get(ratings, ['chess_bullet', 'last', 'rating'], 1565)}
          sparklineData={mockBulletData}
          change={get(ratings, ['rating_change_90d', 'bullet'], -52)}
          getChangeColor={getChangeColor}
          getChangeTextColor={getChangeTextColor}
          formatChange={formatChange}
        />
      </div>
      {/* Blitz Card */}
      <div className="col-span-2 row-span-1">
        <ChessRatingCard
          iconSrc="/images/Hobbies/hobbies-blitz.svg"
          alt="Blitz"
          label="Blitz"
          rating={get(ratings, ['chess_blitz', 'last', 'rating'], 1672)}
          sparklineData={mockBlitzData}
          change={get(ratings, ['rating_change_90d', 'blitz'], 120)}
          getChangeColor={getChangeColor}
          getChangeTextColor={getChangeTextColor}
          formatChange={formatChange}
        />
      </div>
      {/* Rapid Card */}
      <div className="col-span-2 row-span-1">
        <ChessRatingCard
          iconSrc="/images/Hobbies/hobbies-rapid.svg"
          alt="Rapid"
          label="Rapid"
          rating={get(ratings, ['chess_rapid', 'last', 'rating'], 1495)}
          sparklineData={mockRapidData}
          change={get(ratings, ['rating_change_90d', 'rapid'], 0)}
          getChangeColor={getChangeColor}
          getChangeTextColor={getChangeTextColor}
          formatChange={formatChange}
        />
      </div>
    </>
  );
};

export default ChessRatings; 