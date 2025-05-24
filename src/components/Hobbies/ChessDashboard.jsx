import React from 'react'
import 'flag-icons/css/flag-icons.min.css'
import ChessRatings from './ChessRatings';
import ChessProfile from './ChessProfile';
import ChessGames from './ChessGames';

const ChessDashboard = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-0">
            {/* Glassmorphic Container */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 w-full max-w-7xl mx-auto border border-white/30">
                <div className="grid grid-cols-7 grid-rows-5 gap-4 w-full h-[80vh]">
                    {/* Ratings */}
                    <ChessRatings />

                    {/* Profile */}
                    <ChessProfile />

                    {/* Stats */}
                    <div className="col-span-4 row-span-4 bg-white/90 rounded-lg shadow-lg" />

                    {/* Last 5 Games */}
                    <ChessGames />
                </div>
            </div>
        </div>
    );
};

export default ChessDashboard;