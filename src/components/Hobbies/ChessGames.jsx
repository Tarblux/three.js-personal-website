import React, { useEffect, useState } from 'react';

const TIME_CONTROL_ICONS = {
  blitz: '/images/Hobbies/hobbies-blitz.svg',
  bullet: '/images/Hobbies/hobbies-bullet.svg',
  rapid: '/images/Hobbies/hobbies-rapid.svg',
};


const RESULT_LABELS = {
  win: 'W',
  loss: 'L',
  draw: 'D',
};

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://threejs-backend.tariqwill.com';

const ChessGames = ({ isMobile }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/recent-games/`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="sm:col-span-3 sm:row-span-3 p-3 sm:p-2 flex flex-col h-full">
      <div className="flex items-center w-full mb-2 sm:mb-1">
        <div className="flex-1 border-t border-gray-400" />
        <span className="mx-4 text-sm font-bold text-gray-500 whitespace-nowrap text-center">Recent Games</span>
        <div className="flex-1 border-t border-gray-400" />
      </div>
      <div className="flex-1 flex flex-col gap-1 sm:gap-2 max-h-[400px] sm:max-h-full  ">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="block">
              <div className="flex items-center bg-white rounded-xl border border-gray-200 px-3 sm:px-3 py-2 sm:py-1.5 shadow-sm">
                {/* Icon and time skeleton */}
                <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-10 sm:w-12 h-3 sm:h-4 bg-gray-200 rounded animate-pulse mr-2 sm:mr-3"></div>
                
                {/* Player columns skeleton */}
                <div className="flex flex-col items-start mr-2 min-w-[60px] sm:min-w-[80px]">
                  <div className="flex items-center">
                    <div className="w-16 sm:w-20 h-3 sm:h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-3 sm:w-4 h-2 sm:h-3 bg-gray-200 rounded animate-pulse ml-1"></div>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-6 sm:w-8 h-2 sm:h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="w-4 sm:w-6 h-3 sm:h-4 bg-gray-200 rounded animate-pulse mx-2 sm:mx-4"></div>
                
                <div className="flex flex-col items-start mr-2 min-w-[60px] sm:min-w-[80px]">
                  <div className="flex items-center">
                    <div className="w-14 sm:w-16 h-3 sm:h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-3 sm:w-4 h-2 sm:h-3 bg-gray-200 rounded animate-pulse ml-1"></div>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-6 sm:w-8 h-2 sm:h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Spacer */}
                <div className="flex-1" />
                
                {/* Result skeleton */}
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          ))
        ) : (
          games.map((game) => (
            <a
              key={game.id}
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex items-center bg-white rounded-xl border border-gray-200 px-3 sm:px-3 py-2 sm:py-1.5 shadow-sm hover:shadow-md group transition-transform duration-200 hover:scale-105">
                {/* Icon and time */}
                <img
                  src={TIME_CONTROL_ICONS[game.time_control] || TIME_CONTROL_ICONS['blitz']}
                  alt={game.time_control}
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                />
                <span className="text-gray-700 font-semibold mr-2 sm:mr-3 text-xs sm:text-sm min-w-[40px] sm:min-w-[48px]">{game.time}</span>
                {/* Player columns */}
                <div className="flex flex-col items-start mr-2 min-w-[60px] sm:min-w-[80px]">
                  <div className="flex items-center">
                    <span className="font-bold text-black text-xs sm:text-base">BlunderRasta</span>
                    <span className="fi fi-jm rounded-[4px] border border-white ml-1" style={{ fontSize: '0.6rem', verticalAlign: 'middle' }}></span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="font-semibold text-xs sm:text-sm">{game.my_rating}</span>
                    <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${game.my_color === 'white' ? 'bg-white border border-gray-400' : 'bg-black'}`}></span>
                  </div>
                </div>
                <span className="mx-2 sm:mx-4 text-gray-500 font-semibold text-xs sm:text-sm">vs</span>
                <div className="flex flex-col items-start mr-2 min-w-[60px] sm:min-w-[80px]">
                  <div className="flex items-center">
                    <span className="font-bold text-black truncate text-xs sm:text-base">{game.opponent_name.length > (isMobile ? 8 : 12) ? game.opponent_name.slice(0, isMobile ? 8 : 12) + '..' : game.opponent_name}</span>
                    {game.opponent_flag && (
                      <span className={`fi fi-${game.opponent_flag.toLowerCase()} rounded-[4px] border border-white ml-1`} style={{ fontSize: '0.6rem', verticalAlign: 'middle' }}></span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="font-semibold text-xs sm:text-sm">{game.opponent_rating}</span>
                    <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${game.opponent_color === 'white' ? 'bg-white border border-gray-400' : 'bg-black'}`}></span>
                  </div>
                </div>
                {/* Spacer */}
                <div className="flex-1" />
                {/* Result */}
                <span
                  className={`ml-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-0 text-xs font-bold flex items-center justify-center ${
                    game.result === 'win' ? 'bg-green-500 text-white' :
                    game.result === 'loss' ? 'bg-red-500 text-white' :
                    game.result === 'draw' ? 'bg-gray-500 text-white' :
                    'bg-gray-300 text-white'
                  }`}
                >
                  {RESULT_LABELS[game.result] || '?'}
                </span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(ChessGames);