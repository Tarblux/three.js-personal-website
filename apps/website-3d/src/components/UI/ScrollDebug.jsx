import React from 'react';

export default function ScrollDebug({ scrollProgress }) {
  // Calculate the current viewport height position
  const currentVh = Math.round(scrollProgress * 1500); // 15 pages * 100vh

  return (
    <div className="fixed top-1/2 right-4 bg-black/80 text-white px-3 py-2 rounded-md font-mono text-sm z-50">
      <div>Scroll Position:</div>
      <div>{currentVh}vh</div>
    </div>
  );
} 