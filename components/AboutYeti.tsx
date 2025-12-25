
import React from 'react';

const DEFAULT_YETI_URL = "https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg";

interface AboutYetiProps {
  memes: string[];
}

const AboutYeti: React.FC<AboutYetiProps> = ({ memes }) => {
  const primaryImage = memes.length > 0 ? memes[0] : DEFAULT_YETI_URL;

  return (
    <section id="about-yeti" className="py-24 px-4 bg-[#9BDDFF] border-t-4 border-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-block bg-black text-[#9BDDFF] px-6 py-2 rounded-xl font-bungee text-sm rotate-[-2deg] neo-shadow border-2 border-black">
              PLATFORM ORIGIN
            </div>
            <div className="space-y-4">
              <h2 className="font-bungee text-5xl md:text-7xl text-black leading-none uppercase">
                THE <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">ULTIMATE</span> HUB
              </h2>
              <p className="text-2xl font-black text-black/80 leading-tight uppercase tracking-tight">
                NOT JUST A MEME. A UTILITY POWERHOUSE.
              </p>
            </div>
            
            <p className="text-xl font-bold text-slate-800 leading-relaxed max-w-xl">
              While the rest of the market melts, the Yeti builds. Born in the deepest crevasses of the Himalayas and forged on Solana, <span className="text-black underline decoration-[#1EB7E9] decoration-4">$YETI is the core of a massive utility platform.</span> 
              <br /><br />
              We are the first unified <span className="text-[#0B2F44]">Swap engine</span>, elite <span className="text-[#0B2F44]">Yeti Agent hub</span>, and viral <span className="text-[#0B2F44]">Meme Generator</span> platform launched on <span className="font-black text-black">PUMP.FUN</span>. The Yeti doesn't just represent the winter—it controls it.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
               <div className="bg-white border-[4px] border-black p-6 rounded-[32px] neo-shadow flex-1">
                 <p className="font-bungee text-[#1EB7E9] text-3xl">0%</p>
                 <p className="font-black text-xs uppercase text-gray-400 tracking-widest mt-1">MELT RATE</p>
               </div>
               <div className="bg-black border-[4px] border-black p-6 rounded-[32px] neo-shadow flex-1">
                 <p className="font-bungee text-[#9BDDFF] text-3xl">100%</p>
                 <p className="font-black text-xs uppercase text-blue-300 tracking-widest mt-1">FROST POWER</p>
               </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-black/10 rounded-[60px] blur-3xl -z-10 translate-y-10"></div>
            <div className="bg-white border-[8px] border-black rounded-[50px] overflow-hidden neo-shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-700">
               <img 
                 src={primaryImage} 
                 alt="Latest Yeti" 
                 className="w-full h-auto scale-105 hover:scale-100 transition-transform duration-700" 
               />
            </div>
            <div className="absolute -top-10 -right-4 bg-[#FFEA31] border-[4px] border-black p-5 rounded-3xl neo-shadow rotate-[12deg] font-bungee text-xl text-black animate-bounce">
              BULLISH!
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutYeti;
