
import React from 'react';

const NFTSection: React.FC = () => {
  // Ordered from lowest rank to highest rank
  const nfts = [
    { name: "SNOW BALLER", rarity: "COMMON", img: "https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg" },
    { name: "FROST FOOT", rarity: "UNCOMMON", img: "https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg" },
    { name: "GLACIER SCOUT", rarity: "RARE", img: "https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg" },
    { name: "STORM BREAKER", rarity: "EPIC", img: "https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg" },
    { name: "GOLDEN HIMALAYA", rarity: "LEGENDARY", img: "https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg" },
    { name: "YETI OVERLORD", rarity: "MYTHICAL", img: "https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg" },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'MYTHICAL': return 'bg-[#FF4D4D] text-white'; // Vivid Red
      case 'LEGENDARY': return 'bg-[#FFEA31] text-black'; // Bright Yellow
      case 'EPIC': return 'bg-[#C084FC] text-black'; // Soft Purple
      case 'RARE': return 'bg-[#3B82F6] text-white'; // Deep Blue
      case 'UNCOMMON': return 'bg-[#4ADE80] text-black'; // Fresh Green
      case 'COMMON': return 'bg-white text-black'; 
      default: return 'bg-slate-200 text-black';
    }
  };

  const getPowerLevelWidth = (idx: number) => {
    // Progressively fuller bars as rank increases
    const levels = ['w-1/6', 'w-2/6', 'w-3/6', 'w-4/6', 'w-5/6', 'w-full'];
    return levels[idx] || 'w-0';
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b-[6px] border-black pb-10">
          <div className="space-y-2">
            <h1 className="font-bungee text-4xl md:text-6xl text-black uppercase leading-none tracking-tight">THE <span className="text-[#1EB7E9] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">FROZEN</span> COLLECTION</h1>
            <p className="font-black text-sm md:text-base tracking-[0.2em] uppercase text-gray-400">6 Rarity Levels • From Rookie to Overlord</p>
          </div>
          <div className="bg-white border-4 border-black p-6 rounded-[32px] neo-shadow flex items-center gap-6">
            <div className="text-center">
              <p className="font-bungee text-2xl text-black">3,333</p>
              <p className="text-[10px] font-black text-gray-400">TOTAL</p>
            </div>
            <div className="w-[2px] h-10 bg-black/10"></div>
            <div className="text-center">
              <p className="font-bungee text-2xl text-[#1EB7E9]">0.1 SOL</p>
              <p className="text-[10px] font-black text-gray-400">MINT PRICE</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {nfts.map((nft, idx) => (
            <div key={idx} className="bg-white border-[6px] border-black rounded-[50px] overflow-hidden neo-shadow-lg group hover:-translate-y-4 transition-all duration-300">
              <div className="aspect-square overflow-hidden relative border-b-[4px] border-black bg-slate-100">
                {/* Image with blur effect */}
                <img 
                  src={nft.img} 
                  className="w-full h-full object-cover blur-2xl group-hover:blur-md transition-all duration-700 scale-110 group-hover:scale-100" 
                  alt={nft.name} 
                />
                
                {/* "FROZEN" Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="bg-white/30 backdrop-blur-md border-2 border-white/50 px-6 py-2 rounded-2xl rotate-[-15deg] group-hover:opacity-0 transition-opacity">
                      <span className="font-bungee text-white text-xl drop-shadow-md">FROZEN</span>
                   </div>
                </div>

                <div className="absolute top-6 left-6 z-10">
                  <span className={`px-4 py-1 rounded-xl border-2 border-black font-bungee text-[10px] neo-shadow-sm transition-all duration-300
                    ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bungee text-2xl text-black">{nft.name}</h3>
                  <span className="text-xs font-black text-gray-300">#{(idx+1).toString().padStart(3, '0')}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Power Level</span>
                    <span className="text-[10px] font-black text-black uppercase">{Math.round(((idx + 1) / 6) * 100)}%</span>
                  </div>
                  <div className="h-2 flex-grow bg-slate-100 rounded-full overflow-hidden border border-black/5">
                    <div className={`h-full bg-black transition-all duration-1000 ${getPowerLevelWidth(idx)}`}></div>
                  </div>
                </div>
                <button className="w-full bg-black text-white font-bungee py-4 rounded-2xl border-2 border-black neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                  VIEW ON MAGIC EDEN
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#1EB7E9] border-[6px] border-black rounded-[60px] p-12 neo-shadow flex flex-col items-center text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <h2 className="font-bungee text-4xl md:text-6xl text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase">MINTING STARTS SOON</h2>
          <p className="font-bold text-xl text-black/80 max-w-2xl">
            From COMMON to MYTHICAL, only the true Yeti pack will survive the freeze. Stake your tokens now for a shot at the rarest drops.
          </p>
          <div className="relative group">
            <div className="absolute -top-3 -right-3 bg-[#FFEA31] border-2 border-black px-4 py-1 rounded-full font-bungee text-[10px] text-black neo-shadow-sm rotate-12 z-20">
              COMING SOON
            </div>
            <button className="bg-white text-black font-bungee text-2xl px-12 py-5 rounded-[30px] border-[5px] border-black neo-shadow-lg hover:-translate-y-1 transition-transform">
              JOIN WHITELIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTSection;
