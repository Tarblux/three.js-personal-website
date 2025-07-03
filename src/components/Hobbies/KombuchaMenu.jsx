import React, { useState } from 'react';
import { kombuchaBottles } from '../../data/kombuchaBottles';
import KombuchaBottle from './KombuchaBottle';

const KombuchaMenu = () => {
  const [playingIdx, setPlayingIdx] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  
  return (
    <div className="flex justify-end w-full">
      {/* Hover image - responsive positioning */}
      {hoveredImage && (
        <>
          {/* Mobile overlay background */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setHoveredImage(null)}
          />
          
          {/* Image container */}
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 md:left-[200px] md:transform md:-translate-y-1/2 md:translate-x-0">
            <img 
              src={hoveredImage} 
              alt="Hover Image" 
              className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] object-cover rounded-lg shadow-2xl border-4 border-white"
            />
          </div>
        </>
      )}
      
      <div className="relative bg-white rounded-3xl shadow-2xl p-3 md:p-6 w-full max-w-[730px] h-[90vh] md:h-[800px] mr-2 md:mr-8 mt-4 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4 md:mb-6 flex-shrink-0">
          <div className="flex flex-col items-center order-2 md:order-1">
            <span
              className="text-red-400 text-4xl md:text-7xl font-pacifico leading-none opacity-90"
              style={{ transform: 'rotate(-5deg)' }}
            >
              Kombucha
            </span>
            <span className="block text-black text-3xl md:text-6xl font-fredoka font-bold leading-tight text-center mt-2">
              <span className="inline-block align-middle">&bull;</span> MENU <span className="inline-block align-middle">&bull;</span>
            </span>
          </div>
          <img 
            src="/images/Hobbies/tariqs-booch-lab.webp"
            alt="Tariq's Booch Lab Logo"
            className="w-24 h-24 md:w-44 md:h-44 object-contain order-1 md:order-2"
          />
        </div>
        
        {/* Scrollable Content Container - Only on Mobile */}
        <div className="flex flex-col flex-1 overflow-y-auto min-h-0 pb-4 md:overflow-visible">
          {/* Bottles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 justify-center items-start md:flex-1">
            {kombuchaBottles.map((bottle, idx) => {
              const hoverImages = [
                '/images/Hobbies/nina.webp',
                '/images/Hobbies/Dmango.webp', 
                '/images/Hobbies/sunset.webp'
              ];
              return (
                <KombuchaBottle 
                  key={idx} 
                  {...bottle} 
                  liquidColor={bottle.liquidColor} 
                  priceColor={bottle.priceColor}
                  hoverImage={hoverImages[idx]}
                  isPlaying={playingIdx === idx}
                  onPlay={() => setPlayingIdx(idx)}
                  onStop={() => setPlayingIdx(null)}
                  onHoverImage={() => setHoveredImage(hoverImages[idx])}
                  onHoverEnd={() => setHoveredImage(null)}
                />
              );
            })}
          </div>
          
          {/* Add-Ins and Payment Section - Mobile Only */}
          <div className="w-full flex flex-col gap-1 bg-white/90 p-3 rounded-lg mt-4 md:hidden">
            <div>
              <span className="text-green-500 font-extrabold text-xl font-fredoka">FRESH</span>
              <span className="text-black font-bold text-base ml-2 align-baseline relative -top-[0.5px]">ADD-INS:</span>
              <div className="text-gray-400 text-[10px] font-semibold mb-1">*Additional Charge</div>
            </div>
            <div className="flex flex-col gap-1 items-start mb-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <img src="/images/Hobbies/mint.webp" alt="Mint" className="w-6 h-6 object-contain" />
                  <span className="text-black font-semibold text-xs">Mint</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/images/Hobbies/honey-pot.svg" alt="Honey" className="w-6 h-6 object-contain ml-6" />
                  <span className="text-black font-semibold text-xs">Honey</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <img src="/images/Hobbies/lemon.svg" alt="Lemon Zest" className="w-6 h-6 object-contain" />
                <span className="text-black font-semibold text-xs">Lemon&nbsp;Zest</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="font-bold text-black text-xs mb-0.5">We Accept Credit Cards:</div>
              <div className="flex items-center gap-2">
                <img src="/images/Hobbies/apple-pay.svg" alt="Apple Pay" className="w-6 h-6 object-contain" />
                <img src="/images/Hobbies/mastercard.svg" alt="Mastercard" className="w-6 h-6 object-contain" />
                <img src="/images/Hobbies/visa.svg" alt="Visa" className="w-6 h-6 object-contain" />
                <img src="/images/Hobbies/discover.svg" alt="Discover" className="w-6 h-6 object-contain" />
              </div>
              <div className="text-[11px] text-gray-400">Disclaimer : I am not actually selling anything lol</div>
            </div>
          </div>
        </div>
        
        {/* Add-Ins and Payment Section - Desktop Only (Absolute Positioned) */}
        <div className="absolute bottom-14 right-4 w-[320px] hidden md:flex flex-col gap-1 z-10">
          <div>
            <span className="text-green-500 font-extrabold text-2xl font-fredoka">FRESH</span>
            <span className="text-black font-bold text-lg ml-2 align-baseline relative -top-[0.5px]">ADD-INS:</span>
            <div className="text-gray-400 text-[10px] font-semibold mb-1">*Additional Charge</div>
          </div>
          <div className="flex flex-col gap-1 items-start mb-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <img src="/images/Hobbies/mint.webp" alt="Mint" className="w-8 h-8 object-contain" />
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
            <div className="text-[11px] text-gray-400">Disclaimer : I am not actually selling anything lol</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KombuchaMenu; 