import React, { useEffect, useState } from "react";

const LocationCard = () => {
  const [milwaukeeTime, setMilwaukeeTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const timeOptions = {
        timeZone: 'America/Chicago',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      const now = new Date();
      setMilwaukeeTime(now.toLocaleTimeString('en-US', timeOptions));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white rounded-lg px-1 py-1 col-span-5 row-span-1 relative overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <a 
        href="https://www.google.com/maps/@43.0252086,-87.8610821,12z?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoASAFQAw%3D%3D"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full h-full cursor-pointer"
      >
        <div className="relative w-full h-full">
          <img
            src="/images/Introduction/mke-landscape-2.webp"
            alt="Milwaukee Map"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-[60%] left-[57%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full absolute top-0 left-0"></div>
          </div>
          <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-0.5 rounded text-xs text-gray-700 origin-bottom-left">
            Milwaukee, WI, USA
          </div>
          <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-0.5 rounded text-xs text-gray-700 origin-bottom-right">
            {milwaukeeTime}
          </div>
        </div>
      </a>
    </div>
  );
};

export default LocationCard;
