
import React, { useState, useEffect } from 'react';

const WALLETS = [
  { name: 'Phantom', icon: 'https://res.cloudinary.com/df9q090v2/image/upload/v1700143169/phantom-logo_cy6f6r.png' },
  { name: 'Solflare', icon: 'https://res.cloudinary.com/df9q090v2/image/upload/v1700143169/solflare-logo_v8x8z3.png' },
  { name: 'Backpack', icon: 'https://res.cloudinary.com/df9q090v2/image/upload/v1700143168/backpack-logo_p2m8v7.png' }
];

const StakeSection: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [myStakedBalance, setMyStakedBalance] = useState<number>(0);
  const [frostPoints, setFrostPoints] = useState<number>(0);
  const [isStaking, setIsStaking] = useState<boolean>(false);

  // Simulate point accumulation: 10,000 $YETI = 10 points per hour.
  // 1 hour = 3600 seconds. 10/3600 points per second for every 10k.
  useEffect(() => {
    let interval: any;
    if (isWalletConnected && myStakedBalance > 0) {
      interval = setInterval(() => {
        const pointsPerSec = (myStakedBalance / 10000) * (10 / 3600);
        setFrostPoints(prev => prev + pointsPerSec);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWalletConnected, myStakedBalance]);

  const handleWalletSelect = (name: string) => {
    setSelectedWallet(name);
    setIsConnecting(true);
    // Simulate a wallet signing/connecting delay
    setTimeout(() => {
      setIsConnecting(false);
      setShowWalletModal(false);
      setIsWalletConnected(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const handleStake = () => {
    if (!stakeAmount || isNaN(Number(stakeAmount))) return;
    setIsStaking(true);
    setTimeout(() => {
      setMyStakedBalance(prev => prev + Number(stakeAmount));
      setStakeAmount("");
      setIsStaking(false);
    }, 1500);
  };

  const getWhitelistTier = (points: number) => {
    if (points >= 8000) return { name: "YETI KING", color: "text-[#FF4D4D]", chance: "100%" };
    if (points >= 6000) return { name: "DIAMOND", color: "text-[#3B82F6]", chance: "80%" };
    if (points >= 4000) return { name: "GOLD", color: "text-[#FFEA31]", chance: "60%" };
    if (points >= 2000) return { name: "SILVER", color: "text-slate-400", chance: "40%" };
    return { name: "BRONZE", color: "text-orange-400", chance: "20%" };
  };

  const tier = getWhitelistTier(frostPoints);

  return (
    <div className="min-h-screen bg-[#9BDDFF] dot-bg flex flex-col items-center py-12 px-4 relative overflow-hidden">
      
      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isConnecting && setShowWalletModal(false)}></div>
          <div className="bg-white border-[6px] border-black rounded-[40px] p-8 md:p-12 max-w-md w-full relative z-10 neo-shadow-lg animate-in zoom-in-95 duration-300">
            {isConnecting ? (
              <div className="text-center py-10 space-y-6">
                <div className="relative w-24 h-24 mx-auto">
                   <div className="absolute inset-0 border-8 border-slate-100 rounded-full"></div>
                   <div className="absolute inset-0 border-t-8 border-[#1EB7E9] rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center text-4xl">❄️</div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bungee text-2xl text-black uppercase">FREEZING CONNECTION...</h3>
                  <p className="font-bold text-gray-400 text-xs uppercase tracking-widest">Approve the request in {selectedWallet}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="font-bungee text-2xl text-black">SELECT WALLET</h3>
                  <button onClick={() => setShowWalletModal(false)} className="text-2xl hover:rotate-90 transition-transform">✕</button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {WALLETS.map(w => (
                    <button 
                      key={w.name}
                      onClick={() => handleWalletSelect(w.name)}
                      className="group flex items-center justify-between p-5 bg-slate-50 border-4 border-black rounded-3xl hover:bg-[#FFEA31] transition-all neo-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                    >
                      <div className="flex items-center gap-4">
                        <img src={w.icon} className="w-10 h-10 object-contain" alt={w.name} />
                        <span className="font-bungee text-lg text-black">{w.name}</span>
                      </div>
                      <span className="text-black/20 group-hover:text-black">→</span>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] font-black text-center text-gray-400 uppercase tracking-widest">
                  New to Solana? <a href="#" className="text-[#1EB7E9] underline">Learn more</a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Page Title */}
      <div className="text-center mb-12 relative z-10">
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="bg-[#FF4D4D] text-white border-[3px] border-black px-6 py-1.5 rounded-full font-bungee text-xs neo-shadow-sm uppercase tracking-widest animate-pulse">
            TESTNET LIVE
          </div>
        </div>
        <h1 className="font-bungee text-5xl md:text-8xl text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase">STAKING VAULT</h1>
        <div className="flex flex-col items-center gap-4 mt-4">
           <p className="font-black text-black uppercase tracking-[0.2em] bg-white/30 backdrop-blur-sm inline-block px-6 py-2 rounded-2xl border-2 border-black/10">
            Freeze $YETI • Earn Frost Points • Secure Whitelist
           </p>
           {!isWalletConnected && (
             <div className="bg-[#FFEA31] border-2 border-black px-4 py-1 rounded-full font-bungee text-[10px] text-black neo-shadow-sm uppercase">
               COMING SOON
             </div>
           )}
        </div>
      </div>

      {!isWalletConnected ? (
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Intro Card */}
          <div className="space-y-8">
            <h2 className="font-bungee text-4xl text-black leading-none">STAKE TO <span className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">CLIMB</span> THE HIERARCHY</h2>
            <div className="space-y-4">
              {[
                { icon: "⚡", title: "1.5X MULTIPLIER", desc: "Early stakers get a permanent boost on all Frost Point accumulation." },
                { icon: "🎟️", title: "NFT WHITELIST", desc: "Highest tier stakers get guaranteed access to the Frozen NFT Collection." },
                { icon: "💰", title: "GOVERNANCE", desc: "Stake at least 100k $YETI to vote on the Coldest Charity donations." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border-4 border-black p-5 rounded-[24px] neo-shadow flex gap-4">
                  <div className="w-12 h-12 bg-[#F0F9FF] border-2 border-black rounded-xl flex items-center justify-center text-xl shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bungee text-sm text-black">{item.title}</h4>
                    <p className="text-xs font-bold text-gray-500 uppercase leading-tight mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Connect Card */}
          <div className="bg-white border-[6px] border-black rounded-[50px] p-12 neo-shadow-lg text-center space-y-8">
            <div className="relative">
               <div className="w-24 h-24 bg-[#F0F9FF] rounded-full border-4 border-black mx-auto flex items-center justify-center text-5xl animate-bounce-short">
                🧊
               </div>
               <div className="absolute top-0 right-1/3 w-8 h-8 bg-[#1EB7E9] border-2 border-black rounded-full flex items-center justify-center text-xs">✨</div>
            </div>
            <div className="space-y-2">
              <h2 className="font-bungee text-3xl text-black">VAULT LOCKED</h2>
              <p className="font-bold text-gray-500 uppercase text-xs tracking-widest leading-relaxed">Connect your Solana wallet to view your<br/>staking dashboard and rewards.</p>
            </div>
            <button 
              onClick={() => setShowWalletModal(true)}
              className="w-full bg-[#1EB7E9] text-black font-bungee py-5 rounded-[24px] border-4 border-black neo-shadow-lg hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3 group"
            >
              <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-6 h-6 group-hover:rotate-12 transition-transform" alt="SOL" />
              CONNECT SOLANA WALLET
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard label="MY STAKED $YETI" value={myStakedBalance.toLocaleString()} color="text-[#1EB7E9]" />
            <StatCard label="FROST POINTS" value={frostPoints.toFixed(2)} color="text-orange-500" pulse={myStakedBalance > 0} />
            <StatCard label="WHITELIST TIER" value={tier.name} color={tier.color} />
            <StatCard label="WL CHANCE" value={tier.chance} color="text-green-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Staking Controls */}
            <div className="lg:col-span-7 bg-white border-[6px] border-black rounded-[50px] p-8 neo-shadow-lg space-y-8">
              <div className="flex justify-between items-center border-b-4 border-slate-50 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-bungee">S</div>
                  <h3 className="font-bungee text-2xl text-black">STAKE $YETI</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-300 uppercase">Multiplier</p>
                  <p className="font-bungee text-xl text-[#1EB7E9]">1.5x FROST</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 rounded-[32px] p-6 border-2 border-black/5 space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Available to Stake</span>
                    <span className="font-bungee text-xs text-black">Balance: 1,000,000</span>
                  </div>
                  <div className="bg-white border-2 border-black rounded-2xl p-4 flex items-center justify-between">
                    <input 
                      type="number" 
                      placeholder="Enter amount..."
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="bg-transparent text-xl font-bungee text-black w-1/2 outline-none" 
                    />
                    <button className="bg-black text-white px-4 py-1.5 rounded-xl font-bungee text-[10px] neo-shadow-sm">MAX</button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={handleStake}
                    disabled={isStaking || !stakeAmount}
                    className="flex-1 bg-black text-white font-bungee py-5 rounded-[24px] border-4 border-black neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50"
                  >
                    {isStaking ? "FREEZING..." : "STAKE & EARN POINTS"}
                  </button>
                  <button className="flex-1 bg-white text-black font-bungee py-5 rounded-[24px] border-4 border-black neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                    UNSTAKE
                  </button>
                </div>
              </div>

              <div className="bg-[#F0F9FF] border-2 border-dashed border-[#1EB7E9] rounded-3xl p-6">
                 <p className="text-[10px] font-black text-[#1EB7E9] uppercase tracking-widest mb-2">Earnings Report</p>
                 <div className="flex justify-between items-end">
                    <div>
                      <p className="font-bold text-black text-sm">Accumulating <span className="text-[#1EB7E9]">10 Frost Points</span> per 10k $YETI / hour</p>
                      <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">Next payout in: 14m 22s</p>
                    </div>
                    <div className="text-right">
                       <p className="font-bungee text-2xl text-black">+{((myStakedBalance/10000) * 10).toFixed(2)}</p>
                       <p className="text-[10px] font-black text-gray-400 uppercase">PTS / HR</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Whitelist Tracker */}
            <div className="lg:col-span-5 space-y-6">
               <div className="bg-white border-[6px] border-black rounded-[50px] p-8 neo-shadow-lg text-black space-y-6">
                  <h3 className="font-bungee text-2xl text-black">WHITELIST PROGRESS</h3>
                  <div className="space-y-4">
                    {[
                      { name: "BRONZE", range: "0 - 2,000", threshold: 0 },
                      { name: "SILVER", range: "2,000 - 4,000", threshold: 2000 },
                      { name: "GOLD", range: "4,000 - 6,000", threshold: 4000 },
                      { name: "DIAMOND", range: "6,000 - 8,000", threshold: 6000 },
                      { name: "YETI KING", range: "8,000 - 10,000", threshold: 8000 }
                    ].map((t, idx) => {
                      const isActive = tier.name === t.name;
                      const isPast = frostPoints >= t.threshold;
                      return (
                        <div key={t.name} className={`flex items-center gap-4 transition-all ${isPast ? 'opacity-100' : 'opacity-40'}`}>
                          <div className={`w-8 h-8 rounded-full border-[3px] flex items-center justify-center font-bungee text-[10px] transition-colors
                            ${isPast ? 'bg-[#1EB7E9] border-black text-black' : 'bg-slate-50 border-slate-200 text-slate-300'}`}>
                            {isPast ? "✓" : idx + 1}
                          </div>
                          <div className="flex flex-col">
                            <span className={`font-bungee text-sm ${isActive ? 'text-[#1EB7E9]' : isPast ? 'text-black' : 'text-slate-300'}`}>{t.name}</span>
                            <span className="text-[8px] font-black text-gray-400 uppercase">{t.range} PTS</span>
                          </div>
                          {isActive && <span className="ml-auto text-[10px] font-black text-[#1EB7E9] animate-pulse">CURRENT</span>}
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-6 border-t-2 border-slate-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Connected Address</p>
                    <div className="bg-slate-50 border-2 border-black/5 rounded-2xl p-4 flex justify-between items-center">
                      <span className="font-mono text-xs text-black/60">8xP1...zQ9f</span>
                      <button onClick={() => setIsWalletConnected(false)} className="bg-red-50 text-red-500 border border-red-200 px-3 py-1 rounded-xl text-[10px] font-black hover:bg-red-500 hover:text-white transition-all neo-shadow-sm">DISCONNECT</button>
                    </div>
                  </div>
               </div>

               <div className="bg-[#FFEA31] border-[6px] border-black rounded-[40px] p-6 neo-shadow flex items-center gap-6 relative overflow-hidden">
                 <div className="text-4xl relative z-10">💎</div>
                 <div className="relative z-10">
                   <h4 className="font-bungee text-lg text-black">DIAMOND HANDS?</h4>
                   <p className="text-[10px] font-black text-black/60 uppercase leading-tight">Hold for 30 days without unstaking for a 3,000 point bonus!</p>
                 </div>
                 <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full translate-x-1/2 -translate-y-1/2"></div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Disclaimer */}
      <div className="mt-16 text-center max-w-2xl opacity-50 relative z-10">
        <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest leading-loose">
          Points are strictly for Whitelist allocation. No financial value. 
          Unstaking resets your current point streak. Stay Frosty.
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, pulse = false }: { label: string; value: string; color: string; pulse?: boolean }) => (
  <div className="bg-white border-[4px] border-black p-6 rounded-[32px] neo-shadow flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
    <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">{label}</p>
    <div className="flex items-center gap-2">
      <p className={`font-bungee text-2xl md:text-3xl ${color}`}>{value}</p>
      {pulse && <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></div>}
    </div>
  </div>
);

export default StakeSection;
