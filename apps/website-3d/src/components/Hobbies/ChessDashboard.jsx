import React, { useState, useEffect } from 'react';
import 'flag-icons/css/flag-icons.min.css'
import ChessRatings from './ChessRatings';
import ChessProfile from './ChessProfile';
import ChessGames from './ChessGames';
import ChessStats from './ChessStats';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // 640px is the default for sm in Tailwind

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

const ChessDashboard = () => {
    const isMobile = useIsMobile();

    return (
        <div className="absolute inset-0 flex items-center justify-center z-0 p-4 sm:p-0">
            <div className="flex flex-col items-start w-full max-w-7xl">
                <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
                    Chess Dashboard
                </span>
                {/* Glassmorphic Container */}
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 w-full min-h-[700px] max-h-[740px] mx-auto border border-white/30 overflow-y-auto sm:overflow-y-visible">
                    {isMobile ? (
                        // Mobile Layout - Stack vertically
                        <div className="flex flex-col gap-4">
                            <div className="w-full"><ChessProfile isMobile={isMobile} /></div>
                            <div className="w-full"><ChessRatings isMobile={isMobile} /></div>
                            <div className="w-full"><ChessStats isMobile={isMobile} /></div>
                            <div className="w-full"><ChessGames isMobile={isMobile} /></div>
                        </div>
                    ) : (
                        // Desktop Layout - Grid
                        <div className="grid grid-cols-7 grid-rows-5 gap-4 w-full h-[80vh]">
                            <ChessRatings isMobile={isMobile} />
                            <ChessProfile isMobile={isMobile} />
                            <ChessStats isMobile={isMobile} />
                            <ChessGames isMobile={isMobile} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(ChessDashboard);