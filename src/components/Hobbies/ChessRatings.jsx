import React, { useEffect, useState } from 'react';
import ChessRatingCard from './ChessRatingCard';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://threejs-backend.tariqwill.com';



const ChessRatings = ({ isMobile }) => {
  const [ratings, setRatings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blitzMonthData, setBlitzMonthData] = useState([]);
  const [blitzMonthChange, setBlitzMonthChange] = useState(0);
  const [bulletMonthData, setBulletMonthData] = useState([]);
  const [bulletMonthChange, setBulletMonthChange] = useState(0);
  const [rapidMonthData, setRapidMonthData] = useState([]);
  const [rapidMonthChange, setRapidMonthChange] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}/my-ratings`)
      .then((res) => res.json())
      .then((data) => {
        setRatings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Helper to fetch and set month data for a time control (all data for now but can change to 90d, week, month, year, all to reduce API call load)
  const fetchMonthData = async (control, setData, setChange) => {
    try {
      const res = await fetch(`${API_BASE_URL}/ratings-${control}?period=all`);
      const data = await res.json();
      const now = new Date();
      const monthAgo = new Date(now);
      monthAgo.setMonth(now.getMonth() - 1);
      const monthData = Array.isArray(data)
        ? data.filter(entry => new Date(entry.date) >= monthAgo)
        : [];
      setData(monthData.map(d => d.my_rating));
      if (monthData.length > 1) {
        setChange(monthData[monthData.length - 1].my_rating - monthData[0].my_rating);
      } else {
        setChange(0);
      }
    } catch {
      setData([]);
      setChange(0);
    }
  };

  useEffect(() => {
    fetchMonthData('blitz', setBlitzMonthData, setBlitzMonthChange);
    fetchMonthData('bullet', setBulletMonthData, setBulletMonthChange);
    fetchMonthData('rapid', setRapidMonthData, setRapidMonthChange);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:contents sm:gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="sm:col-span-1 sm:row-span-1">
            <div className="bg-white rounded-2xl shadow-md h-24 sm:h-28 flex flex-row px-2 sm:px-1 py-3 sm:py-4 justify-start">
              <div className="flex flex-col justify-end">
                <div className="flex flex-row items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 mr-1 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex flex-col justify-center ml-1">
                    <div className="w-12 sm:w-16 h-3 sm:h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="w-8 h-5 sm:h-7 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-center justify-center ml-10 sm:ml-20">
                <div className="w-6 h-5 bg-transparent"></div>
              </div>
            </div>
          </div>
        ))}
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
    <div className="grid grid-cols-2 gap-2 sm:contents sm:gap-4">
      {/* Puzzles Card */}
      <div className="sm:col-span-1 sm:row-span-1">
        <div className="bg-white rounded-2xl shadow-md h-24 sm:h-28 flex flex-row px-2 sm:px-1 py-3 sm:py-4 sm:mt-[16px] justify-start transition-transform duration-200 hover:scale-105">
          <div className="flex flex-col justify-end sm:justify-center">
            <div className="flex flex-row items-center">
              <img src="/images/Hobbies/hobbies-puzzle.svg" alt="Puzzles" className="w-8 h-8 sm:w-10 sm:h-10 mr-1" />
              <div className="flex flex-col justify-center ml-1">
                <span className="text-gray-500 font-semibold text-xs sm:text-md">Puzzles</span>
                <span className="text-xl sm:text-2xl font-bold text-black leading-tight">{get(ratings, ['tactics', 'highest', 'rating'], 0)}</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-center justify-center ml-10">
            <span className="text-transparent font-bold text-lg">+0</span>
          </div>
        </div>
      </div>
      
      {/* Bullet Card */}
      <div className="sm:col-span-2 sm:row-span-1">
        <div className="bg-white rounded-2xl shadow-md h-24 sm:h-28 flex flex-row px-2 sm:px-1 py-3 sm:py-4 justify-start transition-transform duration-200 hover:scale-105 relative sm:bg-transparent sm:shadow-none sm:rounded-none sm:p-0">
          {/* Mobile version - simple layout */}
          <div className="flex flex-col justify-end sm:hidden">
            <div className="flex flex-row items-center">
              <img src="/images/Hobbies/hobbies-bullet.svg" alt="Bullet" className="w-8 h-8 mr-1" />
              <div className="flex flex-col justify-center ml-1">
                <span className="text-gray-400 font-semibold text-xs">Bullet</span>
                <span className="text-xl font-bold text-black leading-tight">{get(ratings, ['chess_bullet', 'last', 'rating'], 1565)}</span>
              </div>
            </div>
          </div>
          
          {/* Desktop version - with chart */}
          <div className="hidden sm:flex w-full">
            <ChessRatingCard
              iconSrc="/images/Hobbies/hobbies-bullet.svg"
              alt="Bullet"
              label="Bullet"
              rating={get(ratings, ['chess_bullet', 'last', 'rating'], 1565)}
              sparklineData={bulletMonthData.length > 0 ? bulletMonthData : [1565]}
              change={bulletMonthChange}
              getChangeColor={getChangeColor}
              getChangeTextColor={getChangeTextColor}
              formatChange={formatChange}
            />
          </div>
        </div>
      </div>
      
      {/* Blitz Card */}
      <div className="sm:col-span-2 sm:row-span-1">
        <div className="bg-white rounded-2xl shadow-md h-24 sm:h-28 flex flex-row px-2 sm:px-1 py-3 sm:py-4 justify-start transition-transform duration-200 hover:scale-105 relative sm:bg-transparent sm:shadow-none sm:rounded-none sm:p-0">
          {/* Mobile version - simple layout */}
          <div className="flex flex-col justify-end sm:hidden">
            <div className="flex flex-row items-center">
              <img src="/images/Hobbies/hobbies-blitz.svg" alt="Blitz" className="w-8 h-8 mr-1" />
              <div className="flex flex-col justify-center ml-1">
                <span className="text-gray-400 font-semibold text-xs">Blitz</span>
                <span className="text-xl font-bold text-black leading-tight">{get(ratings, ['chess_blitz', 'last', 'rating'], 1672)}</span>
              </div>
            </div>
          </div>
          
          {/* Desktop version - with chart */}
          <div className="hidden sm:flex w-full">
            <ChessRatingCard
              iconSrc="/images/Hobbies/hobbies-blitz.svg"
              alt="Blitz"
              label="Blitz"
              rating={get(ratings, ['chess_blitz', 'last', 'rating'], 1672)}
              sparklineData={blitzMonthData.length > 0 ? blitzMonthData : [1672]}
              change={blitzMonthChange}
              getChangeColor={getChangeColor}
              getChangeTextColor={getChangeTextColor}
              formatChange={formatChange}
            />
          </div>
        </div>
      </div>
      
      {/* Rapid Card */}
      <div className="sm:col-span-2 sm:row-span-1">
        <div className="bg-white rounded-2xl shadow-md h-24 sm:h-28 flex flex-row px-2 sm:px-1 py-3 sm:py-4 justify-start transition-transform duration-200 hover:scale-105 relative sm:bg-transparent sm:shadow-none sm:rounded-none sm:p-0">
          {/* Mobile version - simple layout */}
          <div className="flex flex-col justify-end sm:hidden">
            <div className="flex flex-row items-center">
              <img src="/images/Hobbies/hobbies-rapid.svg" alt="Rapid" className="w-8 h-8 mr-1" />
              <div className="flex flex-col justify-center ml-1">
                <span className="text-gray-400 font-semibold text-xs">Rapid</span>
                <span className="text-xl font-bold text-black leading-tight">{get(ratings, ['chess_rapid', 'last', 'rating'], 1495)}</span>
              </div>
            </div>
          </div>
          
          {/* Desktop version - with chart */}
          <div className="hidden sm:flex w-full">
            <ChessRatingCard
              iconSrc="/images/Hobbies/hobbies-rapid.svg"
              alt="Rapid"
              label="Rapid"
              rating={get(ratings, ['chess_rapid', 'last', 'rating'], 1495)}
              sparklineData={rapidMonthData.length > 0 ? rapidMonthData : [1495]}
              change={rapidMonthChange}
              getChangeColor={getChangeColor}
              getChangeTextColor={getChangeTextColor}
              formatChange={formatChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChessRatings);