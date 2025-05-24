import React, { useEffect, useState } from 'react';
import 'flag-icons/css/flag-icons.min.css';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://threejs-backend.tariqwill.com';

const ChessProfile = () => {
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

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="col-span-3 row-span-1 flex items-start px-4 py-2">
      <a
        href="https://www.chess.com/member/blunderrasta"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex focus:outline-none focus:ring-0"
      >
        <img
          src="/images/Hobbies/hobbies-chesscom-profilepic.jpg"
          alt="Profile"
          className="w-28 h-28 rounded-xl object-cover shadow-md mr-4 transition-transform duration-300 hover:scale-105"
        />
      </a>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2">
          <a
            href="https://www.chess.com/member/blunderrasta"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-xl truncate hover:underline focus:underline"
          >
            BlunderRasta
          </a>
          <span className="fi fi-jm rounded-[4px] overflow-hidden border border-white" title="Jamaica" style={{ fontSize: '1rem', verticalAlign: 'middle' }}></span>
        </div>
        <span className="text-gray-600 text-sm">Joined Dec 10, 2020</span>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block "></span>
          <span className="text-gray-500 text-xs">Last Online:</span>
        </div>
        <div className="flex flex-col items-start mt-0.5 ml-4">    
          <span className="text-gray-400 text-xs">
            {loading || !lastOnline
              ? '3 days ago'
              : formatDate(lastOnline)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChessProfile; 