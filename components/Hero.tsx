
import React from 'react';

const Hero: React.FC = () => {
  const roles = [
    { text: "SWAP", color: "bg-[#1EB7E9]" },
    { text: "NFT COLLECTION", color: "bg-[#FFEA31]" },
    { text: "YETI AGENT", color: "bg-[#9BDDFF]" },
    { text: "MEME GENERATOR", color: "bg-white" }
  ];

  return (
    <section id="about" className="relative flex flex-col items-center justify-center py-16 px-4 bg-[#F0F9FF] overflow-hidden">
      {/* Snowflakes - updated color to avoid white */}
      <div className="absolute top-10 left-10 text-blue-400 text-6xl opacity-30 select-none">❄️</div>
      <div className="absolute top-40 right-20 text-blue-400 text-5xl opacity-30 select-none">❄️</div>
      <div className="absolute bottom-20 left-1/4 text-blue-400 text-4xl opacity-30 select-none">❄️</div>

      <div className="relative group">
        <div className="w-64 h-64 bg-white border-[4px] border-black rounded-[40px] flex items-center justify-center neo-shadow-lg overflow-hidden">
           <img 
            src="https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg" 
            alt="Yeti" 
            className="w-full h-full object-cover"
           />
        </div>
        <div className="absolute -top-4 -right-4 bg-[#FFEA31] border-[3px] border-black rounded-full px-4 py-1 font-bungee text-xs neo-shadow transform rotate-12 text-black">
          SUB-ZERO!
        </div>
      </div>

      <div className="mt-10 text-center space-y-6 max-w-3xl">
        <h1 className="font-bungee text-5xl md:text-7xl tracking-tighter drop-shadow-sm text-black uppercase">YETI</h1>
        
        <div className="space-y-4">
          <p className="font-bold text-lg md:text-2xl text-gray-800 leading-tight">
            The <span className="bg-[#9BDDFF] px-2 rounded-lg border-2 border-black text-black">Abominable Powerhouse</span> has landed on Solana.<br />
            Launched on <span className="text-black font-black underline decoration-[#1EB7E9] decoration-4 uppercase">PUMP.FUN</span> – The first unified Swap, Yeti Agent, and Meme Generator ecosystem.
          </p>
          
          <p className="font-black text-sm md:text-base text-black/60 uppercase tracking-widest italic">
            "YETI IS NOT A MEME. YETI IS THE PLATFORM."
          </p>
        </div>

        {/* Utility Badges */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {roles.map((role, idx) => (
            <div 
              key={idx} 
              className={`${role.color} border-[3px] border-black px-4 py-2 rounded-xl neo-shadow-sm flex items-center gap-2 group hover:-translate-y-1 transition-transform cursor-default`}
            >
              <span className="font-bungee text-[10px] md:text-xs text-black">YETI IS {role.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <button className="bg-[#1EB7E9] text-black font-bungee text-lg px-8 py-3 rounded-2xl border-[3px] border-black neo-shadow-lg hover:-translate-y-1 transition-transform">
          BUY ON PUMP.FUN
        </button>
        <a 
          href="https://x.com/theyeticoin"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black font-bungee text-lg px-8 py-3 rounded-2xl border-[3px] border-black neo-shadow-lg hover:-translate-y-1 transition-transform flex items-center justify-center"
        >
          TWITTER
        </a>
      </div>
    </section>
  );
};

export default Hero;
