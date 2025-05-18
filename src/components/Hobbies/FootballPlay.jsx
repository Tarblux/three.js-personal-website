import React, { useState } from 'react'
import HighlightVideoModal from './HighlightVideoModal'

const FootballPlay = () => {
    const [highlightModalOpen, setHighlightModalOpen] = useState(false);
    const [highlightVideoSrc, setHighlightVideoSrc] = useState(null);

    return (
        <div className="fixed top-8 left-8 z-10 w-[340px] flex flex-col justify-center h-auto">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-2.5 flex flex-col gap-2 border border-white/30 shadow-lg">
                {/* Blurb*/}
                <div className="bg-white/90 rounded-lg shadow-lg hover:shadow-lg p-4 min-h-[100px] flex items-center justify-center group transform transition-transform duration-300 hover:scale-[1.02]">
                    <p className="text-[13px] leading-snug text-gray-800">
                        <span className="font-bold text-green-700">Every now and then</span>, <span className="text-green-700 font-bold">when the weather cooperates</span>, I like to step away from watching football on the couch and actually <span className="text-green-700 font-bold">get outside to play  with friends</span> or just enjoy a solo juggling session.
                    </p>
                </div>
                {/* Player Card */}
                <div className="bg-white/90 rounded-lg shadow-lg hover:shadow-lg flex flex-col justify-between relative min-h-[250px] group transform transition-transform duration-300 hover:scale-[1.02]">
                    {/* Position, Tag, Feet */}
                    <div className="absolute" style={{ right: '1rem', top: '100px' }}>
                        <span className="font-bold text-[13px] text-black mr-1">Midfield</span>
                        <div className="flex items-center mt-0.5">
                            <span className="bg-green-600 text-white text-xs font-bold px-1 py-0.5 rounded">CM</span>
                            <img src="/images/Hobbies/hobbies-leftfoot.jpg" alt="Left foot" className="w-4 h-4 object-contain opacity-50 ml-1" />
                            <img src="/images/Hobbies/hobbies-rightfoot.jpg" alt="Right foot" className="w-4 h-4 object-contain  -ml-1" />
                        </div>
                    </div>
                    {/* Jersey image */}
                    <img src="/images/Hobbies/hobbies-twill-kit.png" alt="Twill Jersey" className="absolute top-6 left-4 w-32 h-36 object-contain select-none" />
                    {/* Badge and name */}
                    <div className="absolute left-2 bottom-2 flex items-center">
                        <img src="/images/Hobbies/hobbies-yaad.png" alt="Yaad badge" className="w-12 h-12 object-contain" />
                        <div className="flex flex-col leading-none mt-2">
                            <span className="font-bold text-black text-[16px]">Tariq</span>
                            <span className="font-bold text-green-500 text-xl -mt-1">Williams</span>
                        </div>
                    </div>
                    {/* Headshot/Celebration */}
                    <div className="absolute bottom-0 right-8 w-40 h-48">
                        <img
                            src="/images/Hobbies/hobbies-twill-headshot-2.png"
                            alt="Twill Headshot"
                            className="absolute inset-0 w-full h-full object-contain object-bottom select-none transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                        />
                        <img
                            src="/images/Hobbies/hobbies-twill-headshot-2.png"
                            alt="Twill Celebration"
                            className="absolute inset-0 w-full h-full object-contain object-bottom select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        />
                    </div>
                </div>
                {/* Preferred Positions */}
                <div className="bg-white/90 rounded-lg shadow-lg hover:shadow-lg p-4 max-h-[230px] flex items-center group transform transition-transform duration-300 hover:scale-[1.02] relative">
                    {/* Title above pitch */}
                    <div className="absolute top-2 left-0 w-full flex justify-center">
                        <span className="text-gray-400 text-[12px] ">Preferred Positions</span>
                    </div>
                    {/* Pitch and tags row */}
                    <div className="flex flex-row items-start w-full">
                        {/* Pitch image */}
                        <div className="relative w-[180px] h-[180px] flex items-center justify-start ml-6">
                            <img
                                src="/images/Hobbies/hobbies-football-pitch.png"
                                alt="Football Pitch"
                                className="w-full h-full object-contain select-none rotate-90"
                            />
                            {/* Dots overlay */}
                            {/* CB (green) */}
                            <div className="absolute" style={{ left: '32px', top: '84px' }}>
                                <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black" />
                            </div>
                            {/* CDM(green) */}
                            <div className="absolute" style={{ left: '62px', top: '84px' }}>
                                <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black" />
                            </div>
                            {/* RB(yellow) */}
                            <div className="absolute" style={{ left: '32px', top: '124px' }}>
                                <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black" />
                            </div>
                            {/* ST (orange) */}
                            <div className="absolute" style={{ left: '150px', top: '84px' }}>
                                <div className="w-4 h-4 rounded-full bg-orange-400 border-2 border-black" />
                            </div>
                        </div>
                        {/* Position tags */}
                        <div className="flex flex-col gap-1 ml-6 mt-5">
                            <div className="flex flex-col items-start">
                                <span className="bg-green-500 text-white font-bold px-1 py-1 rounded text-[12px] leading-none">CDM</span>
                                <span className="text-green-500 text-[10px] ml-0.5">Natural</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="bg-green-500 text-white font-bold px-1.5 py-1 rounded text-[12px] leading-none">CB</span>
                                <span className="text-green-500 text-[10px] ml-0.5">Natural</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="bg-yellow-300 text-black font-bold px-1.5 py-1 rounded text-[12px] leading-none">RB</span>
                                <span className="text-yellow-500 text-[10px] ml-0.5">Decent</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="bg-orange-400 text-white font-bold px-1.5 py-1 rounded text-[12px] leading-none">ST</span>
                                <span className="text-orange-400 text-[10px] ml-0.5">Poor</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Highlights */}
                <div className="bg-white/90 rounded-lg shadow-lg hover:shadow-lg p-2 min-h-[100px] flex flex-col gap-2 group transform transition-transform duration-300 hover:scale-[1.02]">
                    {/* Highlights Title */}
                    <div className="w-full flex justify-center">
                        <span className="text-gray-400 text-[12px] ">Highlights</span>
                    </div>
                    {/* Highlight Items */}
                    <div className="flex flex-col gap-2">
                        {/* Highlight 1 */}
                        <div className="flex items-center justify-between bg-white/40 rounded-lg px-3 py-2 cursor-pointer border-2 hover:bg-gray-100 transition group"
                            onClick={() => {
                                setHighlightVideoSrc('/images/Hobbies/hobbies-solo-dolo.MP4');
                                setHighlightModalOpen(true);
                            }}
                        >
                            <span className="font-bold text-[12px] text-black">Solo Juggling W/ a little trick</span>
                            <div className="flex items-center gap-1">
                                <span className="text-gray-500 text-[13px]">0:06</span>
                                {/* Play Button */}
                                <span className="ml-1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" fill="#fff" stroke="#222" strokeWidth="2"/>
                                        <polygon points="10,8 16,12 10,16" fill="#222" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        {/* Highlight 2 */}
                        <div className="flex items-center justify-between bg-white/40 rounded-lg px-3 py-2 cursor-pointer border-2 hover:bg-gray-100 transition group"
                            onClick={() => {
                                setHighlightVideoSrc('/images/Hobbies/hobbies-solo-dolo.MP4');
                                setHighlightModalOpen(true);
                            }}
                        >
                            <span className="font-bold text-[12px] text-black">Trying to pull a declan rice</span>
                            <div className="flex items-center gap-1">
                                <span className="text-gray-500 text-[13px]">0:12</span>
                                {/* Play Button */}
                                <span className="ml-1">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" fill="#fff" stroke="#222" strokeWidth="2"/>
                                        <polygon points="10,8 16,12 10,16" fill="#222" />
                                    </svg>
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