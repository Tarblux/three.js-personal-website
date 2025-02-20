import React, { useEffect, useRef, useState } from "react";

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


  const [smoothedProgress, setSmoothedProgress] = useState(progress);
  const progressRef = useRef(null);

  // Update smoothedProgress gradually to the new progress value.
  useEffect(() => {
    let animationFrame;
    const damping = 0.1; // more or less smoothing

    const update = () => {
      setSmoothedProgress((prev) => {
        const diff = progress - prev;
        // If the difference is minimal, snap to the target value.
        if (Math.abs(diff) < 0.001) return progress;
        return prev + diff * damping;
      });
      animationFrame = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(animationFrame);
  }, [progress]);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${smoothedProgress * 100}%`;
    }
  }, [smoothedProgress]);

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







