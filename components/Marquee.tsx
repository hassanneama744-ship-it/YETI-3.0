
import React from 'react';

interface MarqueeProps {
  direction?: 'normal' | 'reverse';
}

const Marquee: React.FC<MarqueeProps> = ({ direction = 'normal' }) => {
  const PUMP_FUN_LOGO = "https://logos-world.net/wp-content/uploads/2024/10/Pump-Fun-Logo.png";
  
  const items = [
    "NEXT 100X",
    "YETI POWER AGENTS",
    "FROST SWAP",
    "NFTS",
    "$YETI ON SOLANA",
    "STAY FROSTY",
    "PUMP.FUN ORIGINS",
    "$YETI TO THE PEAK",
    "ABOMINABLE GAINS",
    "THE SNOW KING",
  ];

  return (
    <div className="w-full bg-[#1EB7E9] border-y-[4px] border-black py-4 overflow-hidden select-none">
      <div 
        className="animate-marquee whitespace-nowrap flex items-center"
        style={{ animationDirection: direction }}
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center">
            {/* Removed the internal padding from the span to handle spacing via the logo margins for precision */}
            <span className="text-black font-bungee text-2xl tracking-tighter uppercase">
              {item}
            </span>
            {/* Decreased height to h-7 and added mx-10 for equal spacing on both sides of the logo */}
            <img 
              src={PUMP_FUN_LOGO} 
              alt="Pump.fun" 
              className="h-7 w-auto object-contain mx-10" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
