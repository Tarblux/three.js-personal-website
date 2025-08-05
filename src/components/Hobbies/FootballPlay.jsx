import React, { useState } from 'react'
import HighlightVideoModal from './HighlightVideoModal'

const FootballPlay = () => {
    const [highlightModalOpen, setHighlightModalOpen] = useState(false);
    const [highlightVideoSrc, setHighlightVideoSrc] = useState(null);

    return (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 sm:left-4 sm:transform-none sm:translate-x-0 z-10 w-[300px] sm:w-[340px] flex flex-col justify-center h-auto">
            <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block self-start">
                Hobbies | Football
            </span>
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 sm:p-2.5 flex flex-col gap-2 border border-white/30 shadow-lg">
                {/* Blurb*/}
                <div className="bg-white/90 rounded-lg shadow-lg hover:shadow-lg p-3 sm:p-4 min-h-[70px] sm:min-h-[100px] flex items-center justify-center group transform transition-transform duration-300 hover:scale-[1.02]">
                    <p className="text-[11px] sm:text-[13px] leading-snug text-gray-800">
                        <span className="font-bold text-green-700">Every now and then</span>, <span className="text-green-700 font-bold">when the weather cooperates</span>, I like to step away from watching football on the couch and actually <span className="text-green-700 font-bold">get outside to play  with friends</span> or just enjoy a solo juggling session.
                    </p>
                </div>
                {/* Player Card */}
                <div className="bg-white/90 rounded-lg shadow-lg hover:shadow-lg flex flex-col justify-between relative min-h-[180px] sm:min-h-[250px] group transform transition-transform duration-300 hover:scale-[1.02]">
                    {/* Position, Tag, Feet */}
                    <div className="absolute" style={{ right: '0.5rem', top: '70px' }}>
                        <span className="font-bold text-[11px] sm:text-[13px] text-black mr-1">Midfield</span>
                        <div className="flex items-center mt-0.5">
                            <span className="bg-green-600 text-white text-xs font-bold px-1 py-0.5 rounded">CM</span>
                            <img src="/images/Hobbies/hobbies-leftfoot.webp" alt="Left foot" className="w-3 h-3 sm:w-4 sm:h-4 object-contain opacity-50 ml-1" />
                            <img src="/images/Hobbies/hobbies-rightfoot.webp" alt="Right foot" className="w-3 h-3 sm:w-4 sm:h-4 object-contain  -ml-1" />
                        </div>
                    </div>
                    {/* Jersey image */}
                    <img src="/images/Hobbies/hobbies-twill-kit.webp" alt="Twill Jersey" className="absolute top-3 left-2 w-24 h-28 sm:w-32 sm:h-36 object-contain select-none" />
                    {/* Badge and name */}
                    <div className="absolute left-1 bottom-1 flex items-center">
                        <img src="/images/Hobbies/hobbies-yaad.webp" alt="Yaad badge" className="w-8 h-8 sm:w-12 sm:h-12 object-contain" />
                        <div className="flex flex-col leading-none mt-2">
                            <span className="font-bold text-black text-[14px] sm:text-[16px]">Tariq</span>
                            <span className="font-bold text-green-500 text-lg sm:text-xl -mt-1">Williams</span>
                        </div>
                    </div>
                    {/* Headshot/Celebration */}
                    <div className="absolute bottom-0 right-9 sm:right-4 w-32 h-36 sm:w-40 sm:h-48">
                        <img
                            src="/images/Hobbies/hobbies-twill-headshot-2.webp"
                            alt="Twill Headshot"
                            className="absolute inset-0 w-full h-full object-contain object-bottom select-none transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                        />
                        <img
                            src="/images/Hobbies/hobbies-twill-headshot-2.webp"
                            alt="Twill Celebration"
                            className="absolute inset-0 w-full h-full object-contain object-bottom select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        />
                    </div>
                </div>
                {/* Preferred Positions */}
                <div className="bg-white/90 rounded-lg shadow-lg hover:shadow-lg p-2 sm:p-4 max-h-[160px] sm:max-h-[230px] flex items-center group transform transition-transform duration-300 hover:scale-[1.02] relative">
                    {/* Title above pitch */}
                    <div className="absolute top-1 left-0 w-full flex justify-center">
                        <span className="text-gray-400 text-[10px] sm:text-[12px]">Preferred Positions</span>
                    </div>
                    {/* Pitch and tags row */}
                    <div className="flex flex-row items-center w-full justify-between sm:items-start sm:justify-start">
                        {/* Pitch image */}
                        <div className="relative w-[120px] h-[120px] sm:w-[120px] sm:h-[130px] flex items-center justify-start ml-2 sm:ml-6">
                            <img
                                src="/images/Hobbies/hobbies-football-pitch.webp"
                                alt="Football Pitch"
                                className="w-full h-full object-contain select-none rotate-90"
                            />
                            {/* Dots overlay - scaled for mobile */}
                            {/* CB (green) */}
                            <div className="absolute" style={{ left: '20px', top: '56px' }}>
                                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 border-2 border-black" />
                            </div>
                            {/* CDM(green) */}
                            <div className="absolute" style={{ left: '40px', top: '56px' }}>
                                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 border-2 border-black" />
                            </div>
                            {/* RB(yellow) */}
                            <div className="absolute" style={{ left: '20px', top: '84px' }}>
                                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-400 border-2 border-black" />
                            </div>
                            {/* ST (orange) */}
                            <div className="absolute" style={{ left: '100px', top: '56px' }}>
                                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-orange-400 border-2 border-black" />
                            </div>
                        </div>
                        {/* Position tags */}
                        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:gap-1 mr-2 ml-5 sm:ml-6 sm:mt-5 justify-center items-center flex-1 sm:flex-none">
                            <div className="flex flex-col items-start">
                                <span className="bg-green-500 text-white font-bold px-1 py-1 rounded text-[10px] sm:text-[12px] leading-none">CDM</span>
                                <span className="text-green-500 text-[9px] sm:text-[10px] ml-0.5">Natural</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="bg-green-500 text-white font-bold px-1.5 py-1 rounded text-[10px] sm:text-[12px] leading-none">CB</span>
                                <span className="text-green-500 text-[9px] sm:text-[10px] ml-0.5">Natural</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="bg-yellow-300 text-black font-bold px-1.5 py-1 rounded text-[10px] sm:text-[12px] leading-none">RB</span>
                                <span className="text-yellow-500 text-[9px] sm:text-[10px] ml-0.5">Decent</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="bg-orange-400 text-white font-bold px-1.5 py-1 rounded text-[10px] sm:text-[12px] leading-none">ST</span>
                                <span className="text-orange-400 text-[9px] sm:text-[10px] ml-0.5">Poor</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Highlights */}
                <div className="bg-white/90 rounded-lg shadow-lg hover:shadow-lg p-2 min-h-[80px] sm:min-h-[100px] flex flex-col gap-1 sm:gap-2 group transform transition-transform duration-300 hover:scale-[1.02]">
                    {/* Highlights Title */}
                    <div className="w-full flex justify-center">
                        <span className="text-gray-400 text-[10px] sm:text-[12px]">Highlights</span>
                    </div>
                    {/* Highlight Items */}
                    <div className="flex flex-col gap-1 sm:gap-2">
                        {/* Highlight 1 */}
                        <div className="flex items-center justify-between bg-white/40 rounded-lg px-2 sm:px-3 py-1 sm:py-2 cursor-pointer border-2 hover:bg-gray-100 transition group"
                            onClick={() => {
                                setHighlightVideoSrc('/videos/hobbies-solo-dolo.mp4');
                                setHighlightModalOpen(true);
                            }}
                        >
                            <span className="font-bold text-[10px] sm:text-[12px] text-black">Solo Juggling W/ a little trick</span>
                            <div className="flex items-center gap-1">
                                <span className="text-gray-500 text-[11px] sm:text-[13px]">0:06</span>
                                {/* Play Button */}
                                <span className="ml-1">
                                    <img src="/images/Hobbies/play.svg" alt="Play" width="20" height="20" className="sm:w-6 sm:h-6" />
                                </span>
                            </div>
                        </div>
                        {/* Highlight 2 */}
                        <div className="flex items-center justify-between bg-white/40 rounded-lg px-2 sm:px-3 py-1 sm:py-2 cursor-pointer border-2 hover:bg-gray-100 transition group"
                            onClick={() => {
                                setHighlightVideoSrc('/videos/tariq-freekick.mp4');
                                setHighlightModalOpen(true);
                            }}
                        >
                            <span className="font-bold text-[10px] sm:text-[12px] text-black">Trying to do a declan rice</span>
                            <div className="flex items-center gap-1">
                                <span className="text-gray-500 text-[11px] sm:text-[13px]">0:07</span>
                                {/* Play Button */}
                                <span className="ml-1">
                                    <img src="/images/Hobbies/play.svg" alt="Play" width="20" height="20" className="sm:w-6 sm:h-6" />
                                </span>
                            </div>
                        </div>

                        {/* Highlight 3 */}
                        <div className="flex items-center justify-between bg-white/40 rounded-lg px-2 sm:px-3 py-1 sm:py-2 cursor-pointer border-2 hover:bg-gray-100 transition group"
                            onClick={() => {
                                setHighlightVideoSrc('/videos/tariq-blooper.mp4');
                                setHighlightModalOpen(true);
                            }}
                        >
                            <span className="font-bold text-[10px] sm:text-[12px] text-black">Blooper</span>
                            <div className="flex items-center gap-1">
                                <span className="text-gray-500 text-[11px] sm:text-[13px]">0:10</span>
                                {/* Play Button */}
                                <span className="ml-1">
                                    <img src="/images/Hobbies/play.svg" alt="Play" width="20" height="20" className="sm:w-6 sm:h-6" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Highlight Video Modal */}
            <HighlightVideoModal
                isVisible={highlightModalOpen}
                onClose={() => setHighlightModalOpen(false)}
                videoSrc={highlightVideoSrc}
            />
        </div>
    );
};

export default FootballPlay