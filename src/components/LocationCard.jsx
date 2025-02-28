import React, { useEffect, useState } from "react";

const LocationCard = () => {
  const [milwaukeeTime, setMilwaukeeTime] = useState("");
  const [milwaukeeDate, setMilwaukeeDate] = useState("");
  const [timeDifference, setTimeDifference] = useState("");
  const [gmtOffset, setGmtOffset] = useState("");

  const milwaukeeTimeZone = "America/Chicago";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // 1) Format Milwaukee time
      const timeOptions = {
        timeZone: milwaukeeTimeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const dateOptions = {
        timeZone: milwaukeeTimeZone,
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      setMilwaukeeTime(now.toLocaleTimeString([], timeOptions));
      setMilwaukeeDate(now.toLocaleDateString([], dateOptions));

      // 2) Figure out the offset difference in hours
      const userOffset = now.getTimezoneOffset(); // in minutes from UTC
      const milwaukeeDateObj = new Date(
        now.toLocaleString("en-US", { timeZone: milwaukeeTimeZone })
      );
      const milwaukeeOffset = milwaukeeDateObj.getTimezoneOffset();
      const diffInHours = (userOffset - milwaukeeOffset) / 60;

      if (diffInHours === 0) {
        setTimeDifference("Same time zone as you!");
      } else if (diffInHours > 0) {
        setTimeDifference(`${diffInHours}h behind you`);
      } else {
        setTimeDifference(`${Math.abs(diffInHours)}h ahead of you`);
      }

      // 3) Calculate GMT offset for Milwaukee (e.g., “GMT -5” or “GMT -6”)
      const offsetInHours = milwaukeeOffset / 60;
      const sign = offsetInHours > 0 ? "-" : "+";
      const absoluteOffset = Math.abs(offsetInHours);
      setGmtOffset(`GMT ${sign}${absoluteOffset}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60_000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 col-span-2 row-span-2 text-center">
      {/* Header with emoji icon and title aligned to the left */}
      <div className="flex items-center justify-start mb-2">
        <img
          src="/emojis/emoji-house.png"
          alt="Location"
          className="w-6 h-6 mr-2"
        />
        <h2 className="text-xl font-bold text-black">Location</h2>
      </div>

      {/* “Based in Milwaukee” with Milwaukee in green */}
      <p className="text-xl text-black">
        Based in <span className="text-green-600">Milwaukee</span>
      </p>
      <p className="text-sm text-gray-700">{timeDifference}</p>

      {/* Half-width, centered divider */}
      <hr className="my-3 border-gray-300 opacity-50 w-1/2 mx-auto" />

      {/* Current time in green, offset in black */}
      <div className="flex items-baseline justify-center mb-1">
        <p className="text-3xl font-bold text-green-600 mr-2">{milwaukeeTime}</p>
        <p className="text-base text-black">{gmtOffset}</p>
      </div>

      {/* Smaller date */}
      <p className="text-sm text-black">{milwaukeeDate}</p>
    </div>
  );
};

export default LocationCard;
