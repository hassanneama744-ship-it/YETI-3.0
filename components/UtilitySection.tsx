
import React from 'react';

const UtilitySection: React.FC = () => {
  const utilities = [
    {
      title: "YETI AGENT",
      desc: "The Neural Oracle and Mission Control. Generates viral meme prophecies using Gemini AI and rewards the pack for social engagement via Quests.",
      icon: "🧠",
      color: "bg-[#FF4D4D]",
      textColor: "text-white"
    },
    {
      title: "MEME LAB",
      desc: "Powers the engine. Use $YETI to render high-res abominable assets and viral content via AI.",
      icon: "🤖",
      color: "bg-[#1EB7E9]"
    },
    {
      title: "FROST STAKING",
      desc: "Freeze your tokens in the vault to earn points and secure NFT whitelist tiers.",
      icon: "🧊",
      color: "bg-[#FFEA31]"
    },
    {
      title: "FROST SWAP",
      desc: "Exchange assets instantly with the best rates on Solana via our integrated DEX hub.",
      icon: "🔄",
      color: "bg-[#0B2F44]",
      textColor: "text-white"
    },
    {
      title: "DAO VOTING",
      desc: "The pack decides. $YETI holders vote on community grants and frozen charity allocations.",
      icon: "🗳️",
      color: "bg-[#9BDDFF]"
    },
    {
      title: "NFT ACCESS",
      desc: "Exclusive minting rights for the Frozen Collection and future ecosystem drops.",
      icon: "🖼️",
      color: "bg-white"
    }
  ];

  return (
    <section id="utility" className="bg-[#F0F9FF] py-24 px-4 border-t-4 border-black">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-block bg-black text-[#1EB7E9] px-6 py-2 rounded-xl font-bungee text-sm neo-shadow rotate-[-2deg] uppercase tracking-widest">
            Protocol Utility
          </div>
          <h2 className="font-bungee text-5xl md:text-8xl text-black leading-none uppercase">
            SUB-ZERO <span className="text-[#1EB7E9] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">UTILITY</span>
          </h2>
          <p className="font-bold text-gray-500 uppercase tracking-[0.2em] text-sm">Beyond the meme • Built for the ecosystem</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {utilities.map((util, idx) => (
            <div 
              key={idx} 
              className={`bg-white border-[6px] border-black rounded-[40px] p-8 neo-shadow-lg hover:-translate-y-4 transition-all duration-300 group cursor-default flex flex-col items-center text-center`}
            >
              <div className={`w-16 h-16 ${util.color} border-[4px] border-black rounded-2xl flex items-center justify-center text-3xl mb-6 neo-shadow-sm group-hover:rotate-12 transition-transform`}>
                <span className={util.textColor || 'text-black'}>{util.icon}</span>
              </div>
              <h3 className="font-bungee text-2xl text-black mb-3">{util.title}</h3>
              <p className="font-bold text-xs text-slate-500 uppercase leading-relaxed tracking-wider">
                {util.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UtilitySection;
