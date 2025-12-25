import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

type SwapMode = 'pump' | 'jupiter';

// The Yeti Token Mint
const YETI_MINT = 'So11111111111111111111111111111111111111112'; 

const SwapSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SwapMode>('pump');
  const [isPumpBuy, setIsPumpBuy] = useState<boolean>(true);
  const [pumpAmount, setPumpAmount] = useState<string>("");
  
  const passthroughWalletContextState = useWallet();
  const terminalInitialized = useRef(false);

  // Sync wallet state with Jupiter Plugin for Wallet Passthrough
  useEffect(() => {
    const win = window as any;
    if (win.Jupiter && win.Jupiter.syncProps) {
      try {
        win.Jupiter.syncProps({ passthroughWalletContextState });
      } catch (e) {
        console.warn("Jupiter Plugin syncProps failed:", e);
      }
    }
  }, [passthroughWalletContextState.connected, passthroughWalletContextState.publicKey, passthroughWalletContextState.wallet]);

  // Initialize Jupiter Plugin
  useEffect(() => {
    let checkInterval: any;
    
    const initJupiterPlugin = () => {
      const win = window as any;
      const container = document.getElementById("jupiter-plugin");
      
      if (container && !terminalInitialized.current) {
        // Checking for the Jupiter object created by plugin-v1.js
        if (win.Jupiter && typeof win.Jupiter.init === 'function') {
          try {
            win.Jupiter.init({
              displayMode: "integrated", // Embedded within the Yeti card
              integratedTargetId: "jupiter-plugin",
              endpoint: "https://api.mainnet-beta.solana.com", 
              enableWalletPassthrough: true,
              strictTokenList: false, // CRITICAL: Allows swapping any token on Solana as requested
              formProps: {
                initialOutputMint: YETI_MINT,
              },
            });
            terminalInitialized.current = true;
            if (checkInterval) clearInterval(checkInterval);
          } catch (e) {
            console.error("Jupiter Plugin Init Error:", e);
          }
        }
      }
    };

    // Retry mechanism to handle script loading delays
    checkInterval = setInterval(initJupiterPlugin, 500);
    initJupiterPlugin();

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  const PumpFunSwap = () => (
    <div className="w-full max-w-md bg-white border-[4px] border-black rounded-[40px] p-8 neo-shadow-lg space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <img src="https://logos-world.net/wp-content/uploads/2024/10/Pump-Fun-Logo.png" className="h-5 w-auto" alt="Pump.fun" />
          <span className="font-bungee text-[10px] text-black">BONDING CURVE ACTIVE</span>
        </div>
        <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-2xl border-2 border-black/5">
        <button 
          onClick={() => setIsPumpBuy(true)}
          className={`py-2 rounded-xl font-bungee text-xs transition-all ${isPumpBuy ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
        >
          BUY
        </button>
        <button 
          onClick={() => setIsPumpBuy(false)}
          className={`py-2 rounded-xl font-bungee text-xs transition-all ${!isPumpBuy ? 'bg-[#FF4D4D] text-black border-2 border-black' : 'text-gray-400 hover:text-black'}`}
        >
          SELL
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center px-2">
            <span className="font-bungee text-[10px] text-black">{isPumpBuy ? 'AMOUNT IN SOL' : 'AMOUNT IN $YETI'}</span>
            <span className="text-[10px] font-bold text-gray-400">BAL: 0.00</span>
          </div>
          <div className="bg-slate-50 border-2 border-black rounded-2xl p-4 flex items-center justify-between group focus-within:ring-2 ring-[#1EB7E9]/20">
            <input 
              type="number" 
              placeholder="0.0" 
              value={pumpAmount}
              onChange={(e) => setPumpAmount(e.target.value)}
              className="bg-transparent text-2xl font-bungee text-black w-1/2 outline-none" 
            />
            <div className="flex items-center gap-2">
              <button className="text-[10px] font-black text-gray-400 hover:text-black mr-2">MAX</button>
              <div className="bg-white border-2 border-black px-3 py-1.5 rounded-xl flex items-center gap-2 neo-shadow-sm font-bungee text-[10px]">
                {isPumpBuy ? (
                  <><img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="w-4 h-4" alt="SOL" /> SOL</>
                ) : (
                  <><img src="https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg" className="w-4 h-4 rounded-full" alt="YETI" /> YETI</>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border-2 border-dashed border-black/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black text-gray-400 uppercase">Bonding Curve Progress</span>
            <span className="font-bungee text-[10px] text-[#1EB7E9]">84%</span>
          </div>
          <div className="h-2 bg-white border-2 border-black rounded-full overflow-hidden">
            <div className="h-full bg-[#1EB7E9] w-[84%] transition-all duration-1000"></div>
          </div>
          <p className="text-[8px] font-bold text-gray-400 uppercase mt-2">When the curve hits 100%, $YETI migrates to Raydium.</p>
        </div>

        <button className="w-full bg-black text-white font-bungee py-5 rounded-[24px] border-4 border-black neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
          {isPumpBuy ? 'BUY $YETI' : 'SELL $YETI'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#9BDDFF] dot-bg flex flex-col items-center py-12 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 rotate-12 select-none pointer-events-none">❄️</div>
      <div className="absolute bottom-20 right-10 text-8xl opacity-10 -rotate-12 select-none pointer-events-none">🧊</div>

      <div className="text-center mb-8 relative z-10">
        <h1 className="font-bungee text-5xl md:text-7xl text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase">FROST SWAP</h1>
        <div className="flex flex-col items-center gap-3 mt-4">
           <p className="font-black text-black uppercase tracking-widest bg-white/30 backdrop-blur-md inline-block px-4 py-1.5 rounded-xl border-2 border-black/5">
            Instant Sub-Zero Protocol Exchange
           </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mb-10 w-full max-w-sm relative z-10">
        <p className="text-[10px] font-black text-black/40 uppercase tracking-[0.3em]">Select Liquidity Protocol</p>
        <div className="grid grid-cols-2 gap-3 w-full bg-white border-[3px] border-black p-2 rounded-[24px] neo-shadow-sm">
          <button 
            onClick={() => setActiveMode('pump')}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bungee text-[10px]
              ${activeMode === 'pump' 
                ? 'bg-[#1EB7E9] border-black text-black shadow-[3px_3px_0px_rgba(0,0,0,1)]' 
                : 'bg-slate-50 border-transparent text-gray-400 hover:text-black'}`}
          >
            <span>💊</span> PUMP.FUN
          </button>
          <button 
            onClick={() => setActiveMode('jupiter')}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all font-bungee text-[10px]
              ${activeMode === 'jupiter' 
                ? 'bg-[#FFEA31] border-black text-black shadow-[3px_3px_0px_rgba(0,0,0,1)]' 
                : 'bg-slate-50 border-transparent text-gray-400 hover:text-black'}`}
          >
            <span>🪐</span> JUPITER
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center pb-20 relative z-10">
        <div className={activeMode === 'pump' ? 'block w-full flex justify-center' : 'hidden'}>
           <PumpFunSwap />
        </div>
        
        <div className={activeMode === 'jupiter' ? 'block w-full flex justify-center' : 'hidden'}>
           <div className="w-full max-w-md bg-white border-[4px] border-black rounded-[40px] p-2 md:p-6 neo-shadow-lg min-h-[550px] flex flex-col animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-4 px-4 pt-2">
              <div className="flex items-center gap-2">
                <img src="https://jup.ag/svg/jupiter-logo.svg" className="w-5 h-5" alt="Jupiter" />
                <span className="font-bungee text-[11px] text-black uppercase tracking-widest">Jupiter Plugin v1</span>
              </div>
              <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse"></div>
            </div>
            
            {/* The designated target for Jupiter Plugin as per user documentation */}
            <div id="jupiter-plugin" className="flex-grow rounded-3xl overflow-hidden bg-slate-50 border-2 border-black/5 min-h-[400px]">
              {!terminalInitialized.current && (
                 <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-12">
                    <div className="w-12 h-12 border-4 border-black/10 border-t-[#1EB7E9] rounded-full animate-spin"></div>
                    <p className="font-bungee text-xs text-gray-400 uppercase tracking-widest">Infecting with Frost...</p>
                 </div>
              )}
            </div>

            <div className="mt-4 px-4 text-center">
              <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.4em]">
                ANY TOKEN • ANY TIME • ZERO SLIPPAGE DELAY
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto text-center max-w-2xl opacity-40 pb-10 relative z-10">
        <p className="text-[9px] font-black uppercase text-gray-600 tracking-widest leading-loose">
          Yeti Coin integrates the Jupiter Plugin for decentralized asset exchange. <br/>
          Always verify tokens before swapping. Stay frosty.
        </p>
      </div>
    </div>
  );
};

export default SwapSection;