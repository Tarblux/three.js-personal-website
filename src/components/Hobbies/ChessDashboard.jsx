import React from 'react'
import 'flag-icons/css/flag-icons.min.css'
import ChessRatings from './ChessRatings';
import ChessProfile from './ChessProfile';
import ChessGames from './ChessGames';
import ChessStats from './ChessStats';

const ChessDashboard = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-0">
            <div className="flex flex-col items-start">
                <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
                    Chess Dashboard
                </span>
                {/* Glassmorphic Container */}
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 w-full max-w-7xl mx-auto border border-white/30">
                    <div className="grid grid-cols-7 grid-rows-5 gap-4 w-full h-[80vh]">
                        {/* Ratings */}
                        <ChessRatings />

                        {/* Profile */}
                        <ChessProfile />

                        {/* Stats */}
                        <ChessStats />

                        {/* Last 5 Games */}
                        <ChessGames />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChessDashboard;