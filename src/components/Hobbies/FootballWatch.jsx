import React, { useEffect, useState } from 'react';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://threejs-backend.tariqwill.com';

const FootballWatch = () => {
    const [standings, setStandings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/arsenal-standings`)
            .then(res => res.json())
            .then(data => {
                setStandings(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Helper to add ordinal suffix
    const formatOrdinal = (n) => {
        if (typeof n !== 'number') return n;
        const s = ["th", "st", "nd", "rd"], v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return (
        <div className="fixed top-8 left-8 z-10 w-[340px] flex flex-col justify-center h-auto ">
            <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block self-start">
                Hobbies | Football
            </span>
            {/* Top Info Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 border border-white/30 shadow-lg transition-transform duration-300 hover:scale-[1.02] mb-4">
                <p className="text-[13px] leading-snug text-gray-800">
                    <span className="font-bold text-red-500">During my brief moments of freedom</span> from work or a project, 
                    I'm likely investing my emotional stability in <span className="font-bold text-red-500">English Premier League football</span>. 
                    I adore the beautiful game, even though <span className="font-bold text-red-500">my own coordination is more 'newborn foal' than 'pro footballer'</span>. 
                    Still, I provide unsolicited tactical advice to my television screen while watching the pros and <span className="font-bold text-red-500">pretend I wouldn't need an oxygen tank after a light jog</span>. 
                    The red (or the huge logo below) may have given it away but my favorite team is <span className="font-bold text-red-500">ARSENAL</span>.
                </p>
            </div>
            {/* Main Card Stack */}
            <div className="flex flex-col gap-2">
                {/* Arsenal Card */}
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-2.5 flex flex-col gap-2 border border-white/30 shadow-lg">
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
                            <img src="/images/Hobbies/hobbies-arsenal-badge.webp" alt="Arsenal Badge" className="w-24 h-24 object-contain" />
                            {/* Info */}
                            <div className="flex-1 flex flex-col gap-1">
                                <div className="text-sm text-gray-700">League Position: <span className="font-bold">{loading || !standings ? '-' : formatOrdinal(standings.position)}</span></div>
                                <div className="text-sm text-gray-700">Points: <span className="font-bold">{loading || !standings ? '-' : standings.points}</span></div>
                                <div className="text-sm text-gray-700 mt-1">Record:</div>
                                <div className="flex gap-2 mt-1">
                                    <span className="bg-green-400 text-white text-sm font-bold px-3 py-1 rounded-lg">{loading || !standings ? '-' : standings.wins}</span>
                                    <span className="bg-gray-400 text-white text-sm font-bold px-3 py-1 rounded-lg">{loading || !standings ? '-' : standings.draws}</span>
                                    <span className="bg-red-400 text-white text-sm font-bold px-3 py-1 rounded-lg">{loading || !standings ? '-' : standings.losses}</span>
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
                                <span className="bg-red-700 text-white text-xs font-bold px-1 py-0.5 rounded">RW</span>
                                <img src="/images/Hobbies/hobbies-leftfoot.webp" alt="Left foot" className="w-4 h-4 object-contain" />
                                <img src="/images/Hobbies/hobbies-rightfoot.webp" alt="Right foot" className="w-4 h-4 object-contain opacity-50 -ml-1" />
                            </div>
                        </div>
                        {/* Jersey image */}
                        <img src="/images/Hobbies/hobbies-bsaks-jersey.webp" alt="Saka Jersey" className="absolute top-6 left-4 w-32 h-36 object-contain select-none" />
                        {/* England badge and name */}
                        <div className="absolute left-2 bottom-2 flex items-center">
                            <img src="/images/Hobbies/hobbies-engerland.webp" alt="England badge" className="w-12 h-12 object-contain" />
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
                            src="/images/Hobbies/hobbies-bsaks-celebration.webp"
                            alt="Bukayo Saka Celebration"
                            className="absolute inset-0 w-full h-full object-contain object-bottom select-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                          />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FootballWatch