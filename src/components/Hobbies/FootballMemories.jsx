import React, { useState, useEffect } from 'react'
import { footballMoments } from '../../data/footballMoments'

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

const FootballMemories = ({ onSelectVideo }) => {
    const isMobile = useIsMobile();

    const handleImageClick = (moment) => {
        if (!moment) return;
        if (moment.videoUrl) {
            if (typeof onSelectVideo === 'function') {
                onSelectVideo(moment.videoUrl);
            } else {
                // Fallback: open in a new tab if no handler is provided
                window.open(moment.videoUrl, '_blank');
            }
        }
    };

    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4">
            <span className="mb-2 bg-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow text-gray-500 text-xs select-none inline-block border border-white/30">
                Favorite Moments
            </span>
            <div className="flex flex-col justify-center h-auto">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex flex-col gap-4 border border-white/30 shadow-lg">
                    <div className="flex flex-row gap-6 justify-center">
                        {footballMoments.map((moment) => (
                            <div key={moment.id} className="group relative w-[270px] flex flex-col">
                                <div className={`relative aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden ${isMobile ? 'cursor-pointer' : '[perspective:1000px]'} shadow-[0_0_0_5px_rgba(255,255,255,0.5)] transition-all duration-[1000ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:shadow-[0_8px_16px_rgba(255,255,255,0.2)]`}
                                    style={isMobile ? { WebkitTapHighlightColor: 'transparent' } : {}}
                                    onClick={() => handleImageClick(moment)}
                                >
                                    <div className="absolute inset-0 w-full h-full">
                                        <img
                                            src={moment.img}
                                            alt={moment.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {!isMobile && (
                                        <div className="absolute inset-0 p-5 bg-gray-100/95 backdrop-blur-sm [transform:rotateX(-90deg)] [transform-origin:bottom] transition-all duration-[1000ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:[transform:rotateX(0deg)] flex flex-col justify-start items-start h-full">
                                            <p className="text-xs text-gray-500 leading-relaxed text-left mb-2">{moment.description}</p>
                                            <button 
                                                className="px-2 py-1 rounded-lg bg-gray-600 text-white border-none hover:bg-gray-700 transition-colors text-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleImageClick(moment);
                                                }}
                                            >
                                                Watch Highlight
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col items-start w-full px-1 pt-2">
                                    <div className="font-bold text-sm text-gray-900 leading-tight">{moment.title}</div>
                                    <div className="text-gray-500 text-xs">{moment.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(FootballMemories)  