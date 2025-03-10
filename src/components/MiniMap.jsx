import React, { useRef, useEffect } from "react";

export default function MiniMap({ progress = 0 }) {
  const segments = [
    "Introduction",
    "Career",
    "Projects",
    "Education",
    "Languages",
    "Hobbies",
    "Contact",
  ];

  const progressRef = useRef(null);
  const currentProgressRef = useRef(progress);
  const rafRef = useRef(null);

  useEffect(() => {
    const damping = 0.1;

    const updateProgress = () => {
      if (!progressRef.current) return;

      const diff = progress - currentProgressRef.current;
      
      // If difference is minimal, snap to target
      if (Math.abs(diff) < 0.001) {
        currentProgressRef.current = progress;
      } else {
        currentProgressRef.current += diff * damping;
      }

      progressRef.current.style.width = `${currentProgressRef.current * 100}%`;
      
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    rafRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [progress]);

  return (
    <div className="fixed bottom-0 left-0 w-full h-8 bg-white z-50 overflow-hidden">
      <div className="relative w-full h-full">
        {/* Red progress fill */}
        <div
          ref={progressRef}
          className="absolute inset-y-0 left-0 bg-sky-300 transition-all duration-100 ease-linear"
          style={{ width: "0%" }}
        />
        {/* Segment labels: hidden on screens below md */}
        <div className="relative z-10 h-full items-center text-black text-sm hidden md:flex">
          {segments.map((label, i) => (
            <div key={i} className="flex-1 text-center">
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}







