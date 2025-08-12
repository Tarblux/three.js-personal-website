import React, { useEffect, useState } from 'react';
import 'flag-icons/css/flag-icons.min.css';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://threejs-backend.tariqwill.com';

const ChessProfile = ({ isMobile }) => {
  const [lastOnline, setLastOnline] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/last-online`)
      .then((res) => res.json())
      .then((data) => {
        setLastOnline(data.last_online_date);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatRelativeDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Reset time to start of day for accurate comparison
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const timeDiff = todayOnly.getTime() - dateOnly.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Format the date and time
    const dateStr = date.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const timeStr = date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit'
    });
    
    if (daysDiff === 0) {
      return `Today (${dateStr} at ${timeStr})`;
    } else if (daysDiff === 1) {
      return `Yesterday (${dateStr} at ${timeStr})`;
    } else if (daysDiff === 2) {
      return `Two Days Ago (${dateStr}) at ${timeStr}`;
    } else {
      return `${daysDiff} Days Ago (${dateStr} at ${timeStr})`;
    }
  };

  const isOnlineToday = () => {
    if (!lastOnline) return false;
    const date = new Date(lastOnline);
    const today = new Date();
    
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    return dateOnly.getTime() === todayOnly.getTime();
  };

  if (loading) {
    return (
      <div className="flex items-start px-3 sm:px-4 py-2">
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl bg-gray-200 animate-pulse shadow-md mr-3 sm:mr-4"></div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-24 sm:w-32 h-5 sm:h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-5 sm:w-6 h-3 sm:h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="w-20 sm:w-28 h-3 sm:h-4 bg-gray-200 rounded animate-pulse mt-1"></div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-16 sm:w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex flex-col items-start mt-1 ml-4">    
            <div className="w-20 sm:w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start px-3 sm:px-4 py-2 sm:col-span-3 sm:row-span-1">
      <a
        href="https://www.chess.com/member/blunderrasta"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex focus:outline-none focus:ring-0"
      >
        <img
          src="/images/Hobbies/hobbies-chesscom-profilepic.webp"
          alt="Profile"
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl object-cover shadow-md mr-3 sm:mr-4 transition-transform duration-300 hover:scale-105"
        />
      </a>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2">
          <a
            href="https://www.chess.com/member/blunderrasta"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-lg sm:text-xl truncate hover:underline focus:underline"
          >
            BlunderRasta
          </a>
          <span className="fi fi-jm rounded-[4px] overflow-hidden border border-white" title="Jamaica" style={{ fontSize: '0.875rem', verticalAlign: 'middle' }}></span>
        </div>
        <span className="text-gray-600 text-sm">Joined Dec 10, 2020</span>
        <div className="flex items-center gap-2 mt-1">
          <span className={`w-2 h-2 ${isOnlineToday() ? 'bg-green-500' : 'bg-yellow-500'} rounded-full inline-block`}></span>
          <span className="text-gray-500 text-xs">Last Online:</span>
        </div>
        <div className="flex flex-col items-start mt-0.5 ml-4">    
          <span className="text-gray-400 text-xs">
            {!lastOnline
              ? 'Three Days Ago (June 1, 2024)'
              : formatRelativeDate(lastOnline)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChessProfile);