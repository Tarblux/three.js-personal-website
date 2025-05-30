import React, { useRef } from 'react';
import './bottle.css';

const DropIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 405.047 405.047" fill={color} xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle mr-2">
    <g>
      <path d="M283.897,92.846c-36.582-49.345-73.688-89.267-74.061-89.664C207.944,1.153,205.296,0,202.523,0
        c-2.774,0-5.423,1.152-7.314,3.182c-0.371,0.397-37.478,40.319-74.06,89.664c-49.971,67.403-75.308,119.726-75.308,155.513
        c0,86.396,70.287,156.688,156.682,156.688c86.396,0,156.683-70.29,156.683-156.688C359.206,212.572,333.868,160.25,283.897,92.846z
         M218.171,354.342c-8.213,1.941-16.68,2.926-25.162,2.926c-60.294,0-109.347-49.055-109.347-109.35
        c0-8.312,2.559-23.373,14.75-47.914c1.225-2.467,4.046-3.691,6.687-2.908c2.639,0.785,4.33,3.357,4.007,6.091
        c-0.28,2.361-0.421,4.584-0.421,6.607c0,64.629,45.966,120.77,109.298,133.484c2.607,0.525,4.5,2.795,4.545,5.455
        C222.575,351.396,220.761,353.729,218.171,354.342z"/>
    </g>
  </svg>
);

const KombuchaBottle = ({ title, price, ingredients, personality, liquidColor, priceColor, isPlaying, onPlay, onStop }) => {
  const audioRef = useRef(null);

  React.useEffect(() => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (isPlaying && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [isPlaying]);

  const handleMouseEnter = () => {
    if (onPlay) onPlay();
  };

  const handleMouseLeave = () => {
    if (onStop) onStop();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="kombucha-bottle-outer scale-[0.90]">
      <div className="flex flex-row items-start gap-8 ">
        <audio ref={audioRef} src="/sounds/bottle-sfx.mp3" preload="auto" />
        <div className="bottle-wrapper -ml-[80px] -mr-[100px] relative">
          <button
            type="button"
            className="button scale-[0.8] origin-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="neck"></div>
            <div className="body">
              <div className="liquid" style={{ background: liquidColor }}></div>
              <div className="bubbles">
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>
                <span className="bubble"></span>

                <span className="explosion-bubble"></span>
                <span className="explosion-bubble"></span>
                <span className="explosion-bubble"></span>
                <span className="explosion-bubble"></span>
                <span className="explosion-bubble"></span>
                <span className="explosion-bubble"></span>
                <span className="explosion-bubble"></span>
                <span className="explosion-bubble"></span>
              </div>
            </div>
          </button>
        </div>
        {/* Details Section */}
        <div className="flex flex-col items-start mt-2">
          <div className="flex items-center mb-1">
            <span className="font-bold font-fredoka text-black text-md leading-tight mr-1">{title}</span>
            <span className="font-bold rounded-md px-1 py-1 text-sm ml-2" style={{ fontSize: '0.7rem', background: priceColor, color: '#fff' }}> $ {price} </span>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            {ingredients.map((ingredient, idx) => (
              <span key={idx} className="flex items-start text-black font-semibold text-sm leading-tight">
                <span className={`flex items-center${ingredient.iconType === 'img' ? ' mr-3' : ''}`}>
                  {ingredient.iconType === 'img' ? (
                    <img src={ingredient.icon} alt={ingredient.name} className="inline-block align-middle w-[18px] h-[18px]" />
                  ) : (
                    <DropIcon color={ingredient.icon} />
                  )}
                </span>
                <span className="flex flex-col">
                  <span>{ingredient.name}</span>
                  <span className="text-gray-400 font-bold text-xs" style={{ fontSize: '0.65rem' }}>{ingredient.amount}</span>
                </span>
              </span>
            ))}
          </div>
          <div className="">
            <span className="font-bold text-black text-sm">Personality:</span>
            <span className="block text-[11px] text-gray-400 " style={{ maxWidth: '180px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
              {personality}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KombuchaBottle; 