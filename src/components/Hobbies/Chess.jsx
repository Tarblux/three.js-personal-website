import React from 'react'
import 'flag-icons/css/flag-icons.min.css'

const Chess = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-0">
            {/* Glassmorphic Container */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 w-full max-w-7xl mx-auto border border-white/30">
                <div className="grid grid-cols-7 grid-rows-5 gap-4 w-full h-[80vh]">
                    {/* Ratings */}
                    <div className="col-span-1 row-span-1">
                        <div className="bg-white rounded-2xl shadow-md h-full flex flex-row items-center px-6 py-4">
                            <img src="/images/Hobbies/hobbies-puzzle.svg" alt="Puzzles" className="w-12 h-12 mr-1" />
                            <div className="flex flex-row flex-1 items-center justify-between w-full">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 font-semibold text-xl">Puzzles</span>
                                    <span className="text-3xl font-bold text-black leading-tight">2394</span>
                                </div>
                                <span className="text-transparent font-bold text-lg ml-4">+0</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 row-span-1">
                        <div className="bg-white rounded-2xl shadow-md h-full flex flex-row items-center px-6 py-4">
                            <img src="/images/Hobbies/hobbies-bullet.svg" alt="Bullet" className="w-12 h-12 mr-4" />
                            <div className="flex flex-row flex-1 items-center justify-between w-full">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 font-semibold text-xl">Bullet</span>
                                    <span className="text-3xl font-bold text-black leading-tight">1565</span>
                                </div>
                                <span className="text-red-600 font-bold text-lg ml-4">-52</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 row-span-1">
                        <div className="bg-white rounded-2xl shadow-md h-full flex flex-row items-center px-6 py-4">
                            <img src="/images/Hobbies/hobbies-lightning.svg" alt="Blitz" className="w-12 h-12 mr-4" />
                            <div className="flex flex-row flex-1 items-center justify-between w-full">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 font-semibold text-xl">Blitz</span>
                                    <span className="text-3xl font-bold text-black leading-tight">1672</span>
                                </div>
                                <span className="text-green-600 font-bold text-lg ml-4">+120</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 row-span-1">
                        <div className="bg-white rounded-2xl shadow-md h-full flex flex-row items-center px-6 py-4">
                            <img src="/images/Hobbies/hobbies-rapid.svg" alt="Rapid" className="w-12 h-12 mr-4" />
                            <div className="flex flex-row flex-1 items-center justify-between w-full">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 font-semibold text-xl">Rapid</span>
                                    <span className="text-3xl font-bold text-black leading-tight">1495</span>
                                </div>
                                <span className="text-green-600 font-bold text-lg ml-4">+0</span>
                            </div>
                        </div>
                    </div>

                    {/* Profile */}
                    <div className="col-span-3 row-span-1   flex items-start px-4 py-2">
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
                                <span className="text-gray-500 text-xs">Online 3 days ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="col-span-4 row-span-4 bg-white/90 rounded-lg shadow-lg" />

                    {/* Last 5 Games */}
                    <div className="col-span-3 row-span-3 bg-white/90 rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
    );
};

export default Chess