import React from 'react'
import './jar.css';

const Kombucha = () => {
    return (
        <div className="absolute top-4 left-4 right-4 z-10 w-auto max-w-[400px] md:w-[400px] md:right-auto flex flex-col justify-center h-auto">
            <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block self-start">
                Hobbies | Kombucha
            </span>
            {/* Info Glass Panel */}
            <div className="bg-white/30 backdrop-blur-md rounded-lg p-4 md:p-6 border border-white/30 shadow-lg mb-4 group transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
                <p className="text-[12px] md:text-[13px] leading-snug text-gray-800">
                    In late 2023, <span className="font-bold text-black">I decided to start making my own beverages </span> 
                    after realizing just how much sugar I was consuming from store-bought beverages. That little lifestyle 
                    change led me down a rabbit hole and eventually into <span className="font-bold text-black">the world 
                    of kombucha brewing</span>. What started as a fun experiment quickly turned into a full-blown obsession. 
                    Kombucha ended up becoming my favorite thing to make , not just because it's tasty, but because 
                    <span className="font-bold text-black"> fermentation gives it a kind of personality so to speak. </span>  
                    Every batch is a little different, shaped by the temperature, timing, and even the mood of the room 
                    (or so I like to think). <span className="font-bold text-black">It's like the drink evolves on its 
                    own terms</span>, and I'm just there to guide it along. There's nothing quite like that first sip after 
                    two weeks—when the flavors hit just right, <span className="font-bold text-black">it feels less like 
                    tasting a drink and more like having it speak back to you.</span>
                </p>
            </div>
            {/* Glassmorphic wrapper */}
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-1 border border-white/30 shadow-2xl transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-3xl">
                {/* Main white card */}
                <div className="bg-white rounded-2xl p-2 flex flex-col items-center max-w-xl w-full">
                    <span className="text-gray-400 text-[14px] md:text-[15px] mb-2">Main Fermentation Blend</span>
                    <div className="flex flex-col md:flex-row items-center justify-center w-full">
                        {/* Jar on the left */}
                        <div className="jar-bottle-wrapper static md:-mr-[40px] md:-ml-[80px] mb-2 md:mb-0">
                            <button type="button" className="jar-button scale-[0.5] md:scale-[0.7] transition-transform duration-300 hover:scale-[0.55] md:hover:scale-[0.75]">
                                <div className="jar-neck"></div>
                                <div className="jar-body">
                                    <div className="jar-bubbles">
                                        <span className="jar-bubble"></span>
                                        <span className="jar-bubble"></span>
                                        <span className="jar-bubble"></span>
                                        <span className="jar-bubble"></span>
                                        <span className="jar-bubble"></span>
                                        <span className="jar-bubble"></span>
                                        <span className="jar-bubble"></span>
                                    </div>
                                </div>
                            </button>
                        </div>
                        {/* Ingredients on the right */}
                        <ul className="text-left text-[11px] md:text-[13px] font-medium space-y-1 px-2">
                            <li><span className="font-bold">3 Tbsp <span className="font-extrabold">Darjeeling Black Tea</span></span></li>
                            <li><span className="font-bold">2 Cups <span className="font-extrabold">Starter Tea</span></span></li>
                            <li><span className="font-bold">1 Cup <span className="font-extrabold">Granulated Sugar</span></span></li>
                            <li><span className="font-bold">12 Cups <span className="font-extrabold">Purified Water</span></span></li>
                            <li><span className="font-bold">1 SCOBY Pellicle</span></li>
                            <li><span className="font-bold">Some <span className="text-red-500">Love</span></span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Kombucha