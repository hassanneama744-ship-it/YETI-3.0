
import React from 'react';

const Yetinomics: React.FC = () => {
  const PUMP_FUN_LOGO = "https://logos-world.net/wp-content/uploads/2024/10/Pump-Fun-Logo.png";

  return (
    <section id="yetinomics" className="dot-bg py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Clean Yetinomics Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-0">
          <h2 className="font-bungee text-4xl text-white drop-shadow-[4px_4px_0px_rgba(30,183,233,1)] uppercase text-center">COLD HARD</h2>
          <h2 className="font-bungee text-7xl text-white drop-shadow-[4px_4px_0px_rgba(30,183,233,1)] uppercase text-center">YETINOMICS</h2>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          
          {/* Chart Side */}
          <div className="flex flex-col items-center justify-center gap-12">
            <div className="relative">
              <div className="w-72 h-72 bg-white border-[8px] border-black rounded-full flex flex-col items-center justify-center neo-shadow-lg p-6 text-center">
                <div className="absolute inset-0 border-[12px] border-dashed border-[#1EB7E9] rounded-full scale-95 opacity-50"></div>
                <h3 className="font-bungee text-5xl text-[#1EB7E9] leading-none">100%</h3>
                <span className="font-bungee text-2xl text-black mt-1">COMMUNITY</span>
                
                {/* Requirements: No Team Allocation & Fair Launch */}
                <div className="mt-4 flex flex-col gap-1">
                  <div className="bg-[#1EB7E9] border-2 border-black rounded-lg px-2 py-0.5 -rotate-2">
                    <p className="font-bungee text-[10px] text-white uppercase whitespace-nowrap">NO TEAM ALLOCATION</p>
                  </div>
                  <div className="bg-[#FFEA31] border-2 border-black rounded-lg px-2 py-0.5 rotate-2">
                    <p className="font-bungee text-[10px] text-black uppercase whitespace-nowrap">FAIR LAUNCH</p>
                  </div>
                </div>
              </div>
              
              {/* Yellow Ball with Pump.fun logo */}
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#FFEA31] border-[4px] border-black rounded-full neo-shadow flex items-center justify-center overflow-hidden p-2">
                <img src={PUMP_FUN_LOGO} alt="Pump.fun" className="w-full h-full object-contain" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="bg-white border-[4px] border-black rounded-2xl p-4 text-center neo-shadow">
                <p className="text-[10px] font-black uppercase text-gray-400">TOTAL SUPPLY</p>
                <p className="font-bungee text-2xl text-black">1 BILLION</p>
              </div>
              <div className="bg-white border-[4px] border-black rounded-2xl p-4 text-center neo-shadow">
                <p className="text-[10px] font-black uppercase text-gray-400">CHAIN</p>
                <p className="font-bungee text-2xl text-black">SOLANA</p>
              </div>
              <div className="bg-white border-[4px] border-black rounded-2xl p-4 text-center neo-shadow">
                <p className="text-[10px] font-black uppercase text-gray-400">PLATFORM</p>
                <p className="font-bungee text-2xl uppercase text-black">PUMP.FUN</p>
              </div>
              <div className="bg-white border-[4px] border-black rounded-2xl p-4 text-center neo-shadow">
                <p className="text-[10px] font-black uppercase text-gray-400">BUY/SELL TAX</p>
                <p className="font-bungee text-2xl text-black">0%</p>
              </div>
            </div>
            
            <div className="w-full max-w-md relative group">
              <div className="absolute -top-3 -left-3 bg-black text-[#9BDDFF] px-3 py-1 rounded-md text-[10px] font-black rotate-[-5deg] z-10">CONTRACT</div>
              <div className="bg-white border-[4px] border-black rounded-2xl p-6 neo-shadow overflow-hidden text-center">
                <code className="text-[#1EB7E9] font-bold break-all">Yetixx...PumpFun...Soon</code>
              </div>
            </div>
          </div>

          {/* Graphic Side */}
          <div className="hidden lg:flex justify-center">
            <div className="relative rotate-[5deg] hover:rotate-0 transition-transform duration-500">
              <div className="bg-white border-[6px] border-black rounded-[40px] overflow-hidden neo-shadow-lg w-[400px]">
                <img 
                  src="https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg" 
                  alt="Yeti" 
                  className="w-full h-auto"
                />
              </div>
              {/* Yellow Box with Pump.fun logo */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#FFEA31] border-[4px] border-black rounded-3xl neo-shadow rotate-[-15deg] flex items-center justify-center overflow-hidden p-4">
                <img src={PUMP_FUN_LOGO} alt="Pump.fun" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* New Detailed Allocation Section with Pie Chart */}
        <div className="w-full max-w-5xl bg-white border-[8px] border-black rounded-[60px] p-8 md:p-16 neo-shadow-lg flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F0F9FF] rounded-full translate-x-1/2 -translate-y-1/2 -z-0"></div>
          
          {/* Pie Chart SVG */}
          <div className="relative z-10 w-full md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 group">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Presale Slice - 70.31% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#1EB7E9"
                  strokeWidth="20"
                  strokeDasharray={`${70.31 * 2.513} ${100 * 2.513}`}
                  className="transition-all duration-1000"
                />
                {/* Staking Reward & Airdrop - 8% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#C084FC"
                  strokeWidth="20"
                  strokeDasharray={`${8 * 2.513} ${100 * 2.513}`}
                  strokeDashoffset={`${-70.31 * 2.513}`}
                  className="transition-all duration-1000"
                />
                {/* Liquidity Slice - 21.69% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#FFEA31"
                  strokeWidth="20"
                  strokeDasharray={`${21.69 * 2.513} ${100 * 2.513}`}
                  strokeDashoffset={`${-78.31 * 2.513}`}
                  className="transition-all duration-1000"
                />
                {/* Black Border Overlay */}
                <circle cx="50" cy="50" r="50" fill="transparent" stroke="black" strokeWidth="4" />
                <circle cx="50" cy="50" r="30" fill="transparent" stroke="black" strokeWidth="4" />
                {/* Separator lines */}
                <line x1="50" y1="0" x2="50" y2="20" stroke="black" strokeWidth="2" />
                <line 
                  x1="50" y1="0" x2="50" y2="20" 
                  stroke="black" strokeWidth="2" 
                  transform={`rotate(${(70.31 / 100) * 360} 50 50)`} 
                />
                <line 
                  x1="50" y1="0" x2="50" y2="20" 
                  stroke="black" strokeWidth="2" 
                  transform={`rotate(${(78.31 / 100) * 360} 50 50)`} 
                />
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white border-4 border-black p-4 rounded-full neo-shadow-sm flex flex-col items-center">
                  <span className="font-bungee text-2xl text-black leading-none">SPLIT</span>
                  <span className="font-black text-[8px] text-gray-400 uppercase tracking-widest">Protocol</span>
                </div>
              </div>
            </div>
          </div>

          {/* Allocation Legends */}
          <div className="w-full md:w-1/2 space-y-8 relative z-10">
            <div>
              <h3 className="font-bungee text-3xl text-black mb-6 uppercase tracking-tight">Supply Distribution</h3>
              <div className="space-y-4">
                
                {/* Presale Item */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-[#1EB7E9] border-2 border-black rounded-lg mt-1 shrink-0"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bungee text-xl text-black">70.31%</p>
                      <p className="font-bungee text-sm text-[#1EB7E9] uppercase">Presale</p>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                      Allocated to <span className="text-green-600 font-black">DEV.Fun</span> Presale participants. Pure fair-launch mechanics.
                    </p>
                  </div>
                </div>

                {/* Staking & Airdrop Item */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-[#C084FC] border-2 border-black rounded-lg mt-1 shrink-0"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bungee text-xl text-black">8%</p>
                      <p className="font-bungee text-sm text-[#C084FC] uppercase">Staking & Airdrop</p>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                      Rewards for active pack members and long-term stakers.
                    </p>
                    <div className="mt-2 bg-purple-50 border-2 border-dashed border-purple-200 p-3 rounded-xl">
                      <p className="font-black text-[9px] text-purple-900">3 MONTH CLIFF + 2 MONTHS VESTING</p>
                      <p className="text-[8px] font-bold text-purple-400 uppercase tracking-tighter mt-1">
                        Ensuring zero sell-pressure during core development phases.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Liquidity Item */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-[#FFEA31] border-2 border-black rounded-lg mt-1 shrink-0"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bungee text-xl text-black">21.69%</p>
                      <p className="font-bungee text-sm text-[#FFEA31] uppercase">Liquidity</p>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                      Reserved for Exchange and Dex liquidity and market stability.
                    </p>
                    
                    {/* Builder Sub-Note */}
                    <div className="mt-3 bg-slate-50 border-2 border-dashed border-black/10 p-3 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-black"></div>
                        <p className="font-black text-[10px] text-black">1% BUILDER ALLOCATION</p>
                      </div>
                      <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">
                        (Included in Liquidity) • 1 Month Cliff + 3 Months Linear Vesting.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
            <div className="pt-6 border-t-2 border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧊</span>
                <span className="font-bungee text-xs text-black uppercase">Frost-Locked Verified</span>
              </div>
              <div className="bg-[#1EB7E9] text-white px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest">
                IMMUTABLE
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Yetinomics;
