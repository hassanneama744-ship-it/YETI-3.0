import React from 'react';

const Snowmap: React.FC = () => {
  const steps = [
    {
      step: "STEP 1",
      title: "THE AVALANCHE",
      points: [
        "Community building", 
        "Pump.fun Launch", 
        "Pump Swap Migration AND DEX Screener Boosting", 
        "Frost Staking (Freeze Your Token)"
      ],
      bgColor: "bg-white",
      textColor: "text-black"
    },
    {
      step: "STEP 2",
      title: "FROSTBITE",
      points: [
        "YETI AGENT (AI-Driven Prophecy Oracle and Mission Control engagement center for social dominance)",
        "Meme Lab (AI Power MEME Creation )", 
        "Frozen Collection NFT MINTING", 
        "Community Freeze"
      ],
      bgColor: "bg-[#9BDDFF]",
      textColor: "text-black"
    },
    {
      step: "STEP 3",
      title: "BLIZZARD",
      points: [
        "Yeti Swap Launch", 
        "Winter NFT (NFT WHITELIST)", 
        "NFT Collection Minting", 
        "CEX Peak Listings"
      ],
      bgColor: "bg-[#1EB7E9]",
      textColor: "text-black"
    },
    {
      step: "STEP 4",
      title: "PEAK DOMINATION",
      points: ["Global Snow Domination", "$100M Mcap Peak", "Yeti DAO", "The Coldest Charity"],
      bgColor: "bg-[#0B2F44]",
      textColor: "text-[#9BDDFF]"
    }
  ];

  const renderPoint = (text: string) => {
    // Splits by either Dev.FUN or Pump.fun, keeping the delimiters in the result array
    const parts = text.split(/(Dev\.FUN|Pump\.fun)/g);
    return (
      <>
        {parts.map((part, i) => 
          (part === "Dev.FUN" || part === "Pump.fun")
            ? <span key={i} className="text-green-600 font-black">{part}</span> 
            : part
        )}
      </>
    );
  };

  return (
    <section id="snowmap" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bungee text-7xl md:text-9xl tracking-tighter inline-flex flex-col">
            <span className="text-black">THE</span>
            <span className="text-[#9BDDFF] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] -mt-6">SNOWMAP</span>
          </h2>
          <div className="w-24 h-2.5 bg-black mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((item, idx) => (
            <div key={idx} className={`${item.bgColor} border-[6px] border-black rounded-[40px] p-8 neo-shadow-lg flex flex-col gap-4 relative group`}>
              <div className="bg-black text-[#9BDDFF] px-6 py-1.5 rounded-full inline-block self-start font-bungee text-sm">
                {item.step}
              </div>
              <h3 className={`font-bungee text-3xl md:text-4xl ${item.textColor} tracking-tight`}>
                {item.title}
              </h3>
              <ul className={`space-y-3 font-bold ${item.textColor === 'text-[#9BDDFF]' ? 'text-blue-200' : 'text-gray-700'}`}>
                {item.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full border-2 border-black shrink-0 mt-1 ${item.textColor === 'text-[#9BDDFF]' ? 'bg-[#9BDDFF]' : 'bg-black'}`}></div>
                    <span className="text-xs md:text-sm uppercase tracking-tight leading-snug">
                      {renderPoint(point)}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="absolute top-8 right-8 text-6xl opacity-10 font-bungee pointer-events-none group-hover:opacity-20 transition-opacity">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Snowmap;