import React, { useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';

const ChessPlay = () => {
    return (
        <div className="fixed top-8 left-8 z-10 w-[360px] flex flex-col justify-center h-auto ">
            <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block self-start">
                Hobbies | Chess
            </span>
            {/* Top Info Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 border border-white/30 shadow-lg transition-transform duration-300 hover:scale-[1.02] mb-4">
                <p className="text-[13px] leading-snug text-gray-800">
                    I was <span className="font-bold text-blue-600">first introduced to chess when I was 11</span>, thanks to my <span className="font-bold text-blue-700">uncle Clinton</span>. Sadly, that chess phase didn't last long—high school rolled around and I found out it <span className="font-bold text-blue-700">apparently wasn't "cool" to play chess</span>, so I gave in to the peer pressure and dropped it. Fast forward to 2020, when COVID locked us all inside and I was finally old enough to realize I don't really care what's considered cool anymore. <span className="font-bold text-blue-700">I picked it back up, and now I can't imagine not having it in my life</span>—it's easily one of my favorite ways to unwind and challenge myself.
                </p>
            </div>
            {/* Main Card Stack */}
            <div className="flex flex-col gap-2">
                
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-2.5 flex flex-col gap-2 border border-white/30 shadow-lg">

                    {/* Placeholder Card 1 */}
                    <a href="https://www.chess.com/analysis/game/live/137609920378?tab=explore&move=67" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="bg-white/90 rounded-lg shadow-lg p-4 flex flex-col justify-center relative min-h-[140px] transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
                        {/* Title */}
                        <div className="w-full flex justify-center mb-2">
                            <span className="text-gray-400 text-[12px] ">Favorite Game</span>
                        </div>
                        {/* Chessboard and Info Row */}
                        <div className="flex flex-row gap-3 items-start">
                            {/* Chessboard*/}
                            <div className="flex flex-col items-center mt-4">
                                <div className="rounded-md overflow-hidden border border-gray-300 bg-white" style={{ width: 120, height: 120 }}>
                                    <Chessboard
                                        id="favorite-game-board"
                                        position="1k6/p1pR2pp/1p3b2/5p2/3B1P2/6PP/3r4/6K1 w - - 5 35"
                                        boardWidth={120}
                                        arePiecesDraggable={false}
                                        showBoardNotation={false}
                                    />
                                </div>
                                {/* Moves and Time Control below board */}
                                <div className="flex flex-col items-start mt-2 w-full">
                                    <span className="text-gray-600 text-[13px] leading-tight">Total Moves : <span className="font-bold text-gray-800">53</span></span>
                                    <span className="text-gray-600 text-[13px] leading-tight">Time Control: <span className="font-bold text-gray-800">Blitz</span></span>
                                </div>
                            </div>
                            {/* Game Info */}
                            <div className="flex flex-row items-start justify-center gap-x-2 w-full mt-1">
                                {/* Player 1 Column (Me) */}
                                <div className="flex flex-col items-center text-center h-full justify-start">
                                    <span className="font-bold text-black text-[12px]">Me</span>
                                    <img src="/images/Hobbies/chess-blunderRasta.webp" alt="Me" className="w-8 h-8 rounded-md object-cover border border-gray-300 my-1" />
                                    <span className="bg-black text-white text-[10px] font-bold rounded px-1 py-0.5 mb-2">93.5</span>
                                    {/* Move type numbers */}
                                    <span className="bg-green-500 text-white text-[13px] font-bold rounded-md w-5 h-5 flex items-center justify-center mb-1">31</span>
                                    <span className="bg-yellow-400 text-white text-[13px] font-bold rounded-md w-5 h-5 flex items-center justify-center mb-1">1</span>
                                    <span className="bg-pink-300 text-white text-[13px] font-bold rounded-md w-5 h-5 flex items-center justify-center mb-1">0</span>
                                    <span className="bg-red-600 text-white text-[13px] font-bold rounded-md w-5 h-5 flex items-center justify-center">0</span>
                                </div>

                                {/* VS and Labels Column */}
                                <div className="flex flex-col items-center text-center justify-start mt-6">
                                    <span className="text-gray-500 font-semibold text-[12px] pt-1 mb-4">vs</span>
                                    <span className="text-gray-500 text-[10px] font-semibold pb-0.5 mb-2">Accuracy</span>
                                    {/* Move type labels */}
                                    <span className="text-gray-500 text-[10px] font-semibold min-w-[70px] text-center mb-3">Best Move</span>
                                    <span className="text-gray-500 text-[10px] font-semibold min-w-[70px] text-center mb-2">Mistake</span>
                                    <span className="text-gray-500 text-[10px] font-semibold min-w-[70px] text-center mb-2">Miss</span>
                                    <span className="text-gray-500 text-[10px] font-semibold min-w-[70px] text-center">Blunder</span>
                                </div>

                                {/* Player 2 Column (Opponent) */}
                                <div className="flex flex-col items-center text-center h-full justify-start">
                                    <span className="font-bold text-black text-[12px]">steph..</span>
                                    <img src="/images/Hobbies/chess-steph.webp" alt="stephskogatt" className="w-8 h-8 rounded-md object-cover border border-gray-300 my-1" />
                                    <span className="bg-gray-100 text-black text-[10px] font-bold rounded px-1 py-0.5 border border-gray-300 mb-2">86.0</span>
                                    {/* Move type numbers */}
                                    <span className="bg-green-500 text-white text-[13px] font-bold rounded-md w-5 h-5 flex items-center justify-center mb-1">22</span>
                                    <span className="bg-yellow-400 text-white text-[13px] font-bold rounded-md w-5 h-5 flex items-center justify-center mb-1">3</span>
                                    <span className="bg-pink-300 text-white text-[13px] font-bold rounded-md w-5 h-5 flex items-center justify-center mb-1">0</span>
                                    <span className="bg-red-600 text-white text-[13px] font-bold rounded-md w-5 h-5 flex items-center justify-center">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </a>
                    {/* Placeholder Card 2 */}
                    <a href="https://www.chess.com/openings/Scandinavian-Defense-Modern-Variation" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="bg-white/90 rounded-lg shadow-lg flex flex-col justify-between relative min-h-[220px] p-4 mt-2 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
                      {/* Title */}
                      <div className="w-full flex justify-center mb-2">
                        <span className="text-gray-400 text-[13px]">Favorite Opening</span>
                      </div>
                      {/* Chessboard and Opening Info */}
                      <div className="flex flex-row gap-3 items-start">
                        {/* Chessboard */}
                        <div className="rounded-md overflow-hidden border border-gray-300 bg-white" style={{ width: 120, height: 120 }}>
                          <Chessboard
                            id="favorite-opening-board"
                            position="rnbqkb1r/ppp1pppp/5n2/3P4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 1 3"
                            boardWidth={120}
                            arePiecesDraggable={false}
                            showBoardNotation={false}
                          />
                        </div>
                        {/* Opening Info */}
                        <div className="flex flex-col justify-center ml-2 mt-6">
                          <span className="font-bold text-black text-[14px] leading-tight text-center">Scandinavian Defense:<br />Modern Variation</span>
                          <span className="text-blue-600 font-bold text-[13px] mt-1 text-center">1.e4 d5 2.exd5 Nf6</span>
                        </div>
                      </div>
                      {/* Why I Like it */}
                      <div className="flex flex-row items-center mt-4">
                        <img src="/images/Hobbies/info-icon.svg" alt="info" className="w-3 h-3 mr-1 opacity-20" />
                        <span className="font-bold text-black text-[14px]">Why I Like it ?</span>
                      </div>
                      <div className="text-gray-500 text-[13px] mt-1 leading-snug ml-1">
                        In most cases it gambits away a pawn for the added benefit of getting black ahead in development and I like whipper snap
                      </div>
                    </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ChessPlay; 