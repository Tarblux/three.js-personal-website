import React from 'react'
import { footballMoments } from '../../data/footballMoments'

const FootballMemories = () => {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl">
            <span className="mb-2 bg-white/30 backdrop-blur-md rounded-lg px-2 py-1 shadow text-gray-500 text-xs font-semibold select-none inline-block">
                Favorite Moments
            </span>
            <div className="flex flex-col justify-center h-auto">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex flex-col gap-4 border border-white/30 shadow-lg">
                    <div className="flex flex-row gap-6 justify-center">
                        {footballMoments.map((moment) => (
                            <div key={moment.id} className="group relative w-[270px] flex flex-col">
                                <div className="relative aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden [perspective:1000px] shadow-[0_0_0_5px_rgba(255,255,255,0.5)] transition-all duration-[1000ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-105 hover:shadow-[0_8px_16px_rgba(255,255,255,0.2)]">
                                    <div className="absolute inset-0 w-full h-full">
                                        <img
                                            src={moment.img}
                                            alt={moment.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 p-5 bg-gray-100/95 backdrop-blur-sm [transform:rotateX(-90deg)] [transform-origin:bottom] transition-all duration-[1000ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:[transform:rotateX(0deg)] flex flex-col justify-start items-start h-full">
                                        <p className="text-xs text-gray-500 leading-relaxed text-left mb-2">{moment.description}</p>
                                        <button className="px-2 py-1 rounded-lg bg-gray-600 text-white border-none hover:bg-gray-700 transition-colors text-sm">Watch</button>
                                    </div>
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

export default FootballMemories 