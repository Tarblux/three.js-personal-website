import React, { useState } from 'react';
import { kombuchaBottles } from '../../data/kombuchaBottles';
import KombuchaBottle from './KombuchaBottle';

const KombuchaMenu = () => {
  const [playingIdx, setPlayingIdx] = useState(null);
  return (
    <div className="flex justify-end w-full">
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-[710px] h-[710px] mr-8 mt-4">
        {/* Header */}
        <div className="flex justify-between items-start ">
          <div className="flex flex-col items-center">
            <span
              className="text-red-400 text-7xl font-pacifico leading-none opacity-90"
              style={{ transform: 'rotate(-5deg)' }}
            >
              Kombucha
            </span>
            <span className="block text-black text-6xl font-fredoka font-bold leading-tight text-center mt-2">
              <span className="inline-block align-middle">&bull;</span> MENU <span className="inline-block align-middle">&bull;</span>
            </span>
          </div>
          <img 
            src="/images/Hobbies/tariqs-booch-lab.png"
            alt="Tariq's Booch Lab Logo"
            className="w-44 h-44 object-contain"
          />
        </div>
        {/* Bottles Grid */}
        <div className="grid grid-cols-2  justify-center items-start">
          {kombuchaBottles.map((bottle, idx) => (
            <KombuchaBottle 
              key={idx} 
              {...bottle} 
              liquidColor={bottle.liquidColor} 
              priceColor={bottle.priceColor}
              isPlaying={playingIdx === idx}
              onPlay={() => setPlayingIdx(idx)}
              onStop={() => setPlayingIdx(null)}
            />
          ))}
        </div>
        {/* Add-Ins and Payment Section */}
        <div className="absolute bottom-6 right-4 w-[320px] flex flex-col gap-1 z-10">
          <div>
            <span className="text-green-500 font-extrabold text-2xl font-fredoka ">FRESH</span>
            <span className="text-black font-bold text-lg ml-2 align-baseline relative -top-[0.5px]">ADD-INS:</span>
            <div className="text-gray-400 text-[10px] font-semibold mb-1">*Additional Charge</div>
          </div>
          <div className="flex flex-col gap-1 items-start mb-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <img src="/images/Hobbies/mint.png" alt="Mint" className="w-8 h-8 object-contain" />
                <span className="text-black font-semibold text-xs">Mint</span>
              </div>
              <div className="flex items-center gap-1">
                <img src="/images/Hobbies/honey-pot.svg" alt="Honey" className="w-8 h-8 object-contain ml-9" />
                <span className="text-black font-semibold text-xs">Honey</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <img src="/images/Hobbies/lemon.svg" alt="Lemon Zest" className="w-8 h-8 object-contain" />
              <span className="text-black font-semibold text-xs">Lemon&nbsp;Zest</span>
            </div>
          </div>
          <div className="mt-5">
            <div className="font-bold text-black text-xs mb-0.5">We Accept Credit Cards:</div>
            <div className="flex items-center gap-3">
              <img src="/images/Hobbies/apple-pay.svg" alt="Apple Pay" className="w-8 h-8 object-contain" />
              <img src="/images/Hobbies/mastercard.svg" alt="Mastercard" className="w-8 h-8 object-contain" />
              <img src="/images/Hobbies/visa.svg" alt="Visa" className="w-8 h-8 object-contain" />
              <img src="/images/Hobbies/discover.svg" alt="Discover" className="w-8 h-8 object-contain" />
            </div>
            <div className="text-[11px] text-gray-400 ">Disclaimer : I am not actually selling anything lol</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KombuchaMenu; 