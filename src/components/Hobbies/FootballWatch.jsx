import React from 'react'

const FootballWatch = () => {
    return (
        <div className="fixed top-8 left-8 z-10 w-[340px] flex flex-col justify-center h-auto">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-2.5 flex flex-col gap-2 border border-white/30 shadow-lg">
                {/* Arsenal Card */}
                <div className="bg-white/90 rounded-lg shadow-lg hover:shadow-lg p-4 flex flex-col justify-center relative min-h-[140px] group transform transition-transform duration-300 hover:scale-[1.02]">
                    {/* LIVE badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1" style={{marginBottom: '18px'}}>
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-1.5 py-0.25 rounded-full flex items-center gap-1 border border-green-300">
                            LIVE
                            <span
                                className="w-2 h-2 bg-green-500 rounded-full inline-block ml-1 animate-pulse-dot"
                            ></span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4 mt-7">
                        {/* Arsenal Badge */}
                        <img src="/images/Hobbies/hobbies-arsenal-badge.png" alt="Arsenal Badge" className="w-24 h-24 object-contain" />
                        {/* Info */}
                        <div className="flex-1 flex flex-col gap-1">
                            <div className="text-sm text-gray-700">League Position: <span className="font-bold">2nd</span></div>
                            <div className="text-sm text-gray-700">Points: <span className="font-bold">68</span></div>
                            <div className="text-sm text-gray-700 mt-1">Record:</div>
                            <div className="flex gap-2 mt-1">
                                <span className="bg-green-400 text-white text-sm font-bold px-3 py-1 rounded-lg">18</span>
                                <span className="bg-gray-400 text-white text-sm font-bold px-3 py-1 rounded-lg">14</span>
                                <span className="bg-red-400 text-white text-sm font-bold px-3 py-1 rounded-lg">4</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Section 3 */}
                <div className="bg-white/90 rounded-lg shadow-lg hover:shadow-lg flex flex-col justify-between relative min-h-[250px] group transform transition-transform duration-300 hover:scale-[1.02]">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-gray-400 text-[12px] select-none">Favorite Player</div>
                    {/* Forward, RW, feetsiz */}
                    <div className="absolute" style={{ right: '1rem', top: '100px' }}>
                        <span className="font-bold text-[13px] text-black mr-1">Forward</span>
                        <div className="flex items-center mt-0.5">
                            <span className="bg-blue-700 text-white text-xs font-bold px-1 py-0.5 rounded">RW</span>
                            <img src="/images/Hobbies/hobbies-leftfoot.JPG" alt="Left foot" className="w-4 h-4 object-contain" />
                            <img src="/images/Hobbies/hobbies-rightfoot.JPG" alt="Right foot" className="w-4 h-4 object-contain opacity-50 -ml-1" />
                        </div>
                    </div>
                    {/* Jersey image */}
                    <img src="/images/Hobbies/hobbies-bsaks-jersey.png" alt="Saka Jersey" className="absolute top-6 left-4 w-32 h-36 object-contain select-none" />
                    {/* England badge and name */}
                    <div className="absolute left-2 bottom-2 flex items-center">
                        <img src="/images/Hobbies/hobbies-engerland.png" alt="England badge" className="w-12 h-12 object-contain" />
                        <div className="flex flex-col leading-none mt-2">
                            <span className="font-bold text-black text-[15px]">Bukayo</span>
                            <span className="font-bold text-red-400 text-3xl -mt-1">Saka</span>
                        </div>
                    </div>
                    {/* B saks Headshot */}
                    <div className="absolute bottom-0 right-8 w-40 h-48">
                      <img
                        src="/images/Hobbies/hobbies-bsaks-headshot.webp"
                        alt="Bukayo Saka"
                        className="absolute inset-0 w-full h-full object-contain object-bottom select-none transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                      />
                      <img
                        src="/images/Hobbies/hobbies-bsaks-celebration.PNG"
                        alt="Bukayo Saka Celebration"
                        className="absolute inset-0 w-full h-full object-contain object-bottom select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      />
                    </div>
                </div>
                {/* Section 2 */}
                <div className="bg-white/90 rounded-lg shadow-lg hover:shadow-lg p-6 flex flex-col justify-center group transform transition-transform duration-300 hover:scale-[1.02]">
                    <p className="text-[13px] leading-snug text-gray-800">
                        <span className="font-bold text-red-500">When I'm not at work</span> or deep into a project, there's a good chance you'll find me <span className="font-bold text-red-500">watching English Premier League football</span>. I've always loved the game—though <span className="font-bold text-red-500">playing it is a whole different story</span>. Still, that doesn't stop me from yelling tactical advice at the TV like I belong on the sidelines. Watching the pros and <span className="font-bold text-red-500">pretending I could keep up for ten minutes is all part of the fun.</span> The red may have given it away but my favorite team is <span className="font-bold text-red-500">ARSENAL</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FootballWatch