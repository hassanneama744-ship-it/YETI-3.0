
import React, { useState } from 'react';

type DocTab = 'info' | 'agent' | 'lab' | 'swap' | 'roadmap' | 'tokenomics' | 'staking' | 'nft';

interface DocCardProps {
  title: string;
  children: React.ReactNode;
}

const DocCard: React.FC<DocCardProps> = ({ title, children }) => (
  <div className="bg-white border-[6px] border-black rounded-[40px] p-8 md:p-12 neo-shadow-lg space-y-6 animate-in fade-in zoom-in-95 duration-300">
    <h2 className="font-bungee text-2xl md:text-3xl text-black border-b-4 border-slate-50 pb-4 uppercase tracking-tight">{title}</h2>
    {children}
  </div>
);

const ValueBox: React.FC<{ label: string; val: string }> = ({ label, val }) => (
  <div className="bg-black text-white p-4 rounded-2xl border-2 border-black text-center">
    <p className="text-[10px] font-black uppercase text-[#1EB7E9] tracking-widest mb-1">{label}</p>
    <p className="font-bungee text-xl">{val}</p>
  </div>
);

const RoadmapDeepDive: React.FC<{ step: string; title: string; items: { label: string; detail: string }[]; color: string; textColor?: string }> = ({ step, title, items, color, textColor = "text-black" }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="px-4 py-1 rounded-xl border-2 border-black font-bungee text-xs neo-shadow-sm bg-white text-black">{step}</div>
      <h3 className="font-bungee text-2xl text-black">{title}</h3>
    </div>
    <div className="grid grid-cols-1 gap-4">
      {items.map((item, i) => (
        <div key={i} className={`${color} border-2 border-black/10 p-6 rounded-3xl space-y-2 group hover:border-black/30 transition-colors neo-shadow-sm`}>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${textColor === 'text-white' ? 'bg-white' : 'bg-black'}`}></div>
            <h4 className={`font-bungee text-sm uppercase tracking-tight ${textColor}`}>{item.label}</h4>
          </div>
          <p className={`text-[10px] font-bold uppercase leading-relaxed tracking-wide opacity-80 ${textColor}`}>
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const DocsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DocTab>('info');

  const tabs: { id: DocTab; label: string }[] = [
    { id: 'info', label: 'YETI INFO' },
    { id: 'agent', label: 'YETI AGENT' },
    { id: 'lab', label: 'MEME LAB' },
    { id: 'swap', label: 'FROST SWAP' },
    { id: 'roadmap', label: 'ROADMAP' },
    { id: 'tokenomics', label: 'YETINOMICS' },
    { id: 'staking', label: 'STAKING' },
    { id: 'nft', label: 'NFT' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-10">
            <DocCard title="1. THE $YETI PROTOCOL ORIGIN">
              <div className="space-y-6">
                <p className="text-xl font-black text-black leading-relaxed uppercase tracking-tight">
                  We are the first unified <span className="text-[#1EB7E9]">Swap engine</span>, elite <span className="text-[#1EB7E9]">YETI AGENT hub</span>, and viral <span className="text-[#1EB7E9]">Meme Generator</span> platform launched on <span className="text-green-600">PUMP.FUN</span>. 
                  <br /><br />
                  The Yeti doesn't just represent the winter—it controls it.
                </p>
                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-black/5 space-y-4">
                  <h4 className="font-bungee text-black text-sm uppercase">BORN IN THE HIMALAYAS</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase leading-relaxed">
                    While the rest of the market melts, the Yeti builds. $YETI was launched exclusively via PUMP.FUN to ensure a 100% fair launch with no team allocation, ensuring that the community—the pack—is the true owner of the protocol.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <ValueBox label="PLATFORM" val="UNIFIED HUB" />
                  <ValueBox label="LAUNCH" val="PUMP.FUN" />
                  <ValueBox label="PHILOSOPHY" val="ANTI-MELT" />
                </div>
              </div>
            </DocCard>
          </div>
        );
      case 'agent':
        return (
          <div className="space-y-8">
            <DocCard title="YETI AGENT V3.2: MISSION PROTOCOLS">
              <div className="space-y-10">
                <div className="space-y-4">
                  <p className="font-black text-slate-800 uppercase leading-relaxed text-sm">
                    YETI AGENT IS A DUAL-CORE AI SYSTEM DESIGNED TO COORDINATE THE PACK'S SOCIAL DOMINANCE AND EXTRACT MARKET ALPHA THROUGH CRYSTALLINE LOGIC.
                  </p>
                  <div className="flex gap-4">
                    <div className="bg-black text-[#1EB7E9] px-4 py-1.5 rounded-xl font-bungee text-[10px] neo-shadow-sm">MODEL: GEMINI-3-FLASH</div>
                    <div className="bg-[#1EB7E9] text-black px-4 py-1.5 rounded-xl font-bungee text-[10px] neo-shadow-sm">SYNC: ACTIVE</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bungee text-xl text-black border-l-4 border-[#1EB7E9] pl-4">CORE 1: THE ORACLE HUB</h3>
                  <div className="bg-[#F0F9FF] border-2 border-black rounded-[32px] p-6 space-y-4">
                    <p className="text-[11px] font-bold text-slate-600 uppercase leading-relaxed">
                      The Prophet Core analyzes high-energy market sentiment to generate "Meme Prophecies"—viral, bullish, and humorous text strings optimized for social platform saturation.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-[10px] font-black text-black uppercase">
                        <div className="w-1.5 h-1.5 bg-[#1EB7E9] rounded-full"></div>
                        Neural Ignition: Triggers real-time AI generation via Gemini.
                      </li>
                      <li className="flex items-center gap-2 text-[10px] font-black text-black uppercase">
                        <div className="w-1.5 h-1.5 bg-[#1EB7E9] rounded-full"></div>
                        Prophecy Logs: View and copy the latest void insights.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bungee text-xl text-black border-l-4 border-[#FFEA31] pl-4">CORE 2: MISSION CONTROL (QUESTS)</h3>
                  <div className="bg-white border-4 border-black rounded-[32px] p-6 space-y-6">
                    <p className="text-[11px] font-bold text-slate-600 uppercase leading-relaxed">
                      Earn Frost Points by completing Quests. Social Telemetry allows the Yeti Agent to verify actions on X (formerly Twitter).
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border-2 border-black/5">
                        <p className="font-bungee text-[10px] text-black">SYNC HANDLE</p>
                        <p className="font-bold text-[9px] text-emerald-500 uppercase mt-1">+10 PTS</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border-2 border-black/5">
                        <p className="font-bungee text-[10px] text-black">LIKE/REPOST</p>
                        <p className="font-bold text-[9px] text-emerald-500 uppercase mt-1">+5/+15 PTS</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bungee text-xl text-black border-l-4 border-black pl-4 uppercase">THE PACK HIERARCHY</h3>
                  <div className="bg-black text-white p-8 rounded-[40px] space-y-6 neo-shadow">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RANKING TIERS BASED ON TOTAL FROST POINTS:</p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="font-bungee text-sm text-gray-400">ROOKIE</span>
                        <span className="font-bold text-[10px]">0 - 49 PTS</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="font-bungee text-sm text-white">SNOWBALLER</span>
                        <span className="font-bold text-[10px]">50 - 99 PTS</span>
                      </div>
                      <div className="flex justify-between items-center text-[#1EB7E9]">
                        <span className="font-bungee text-sm">YETI KING</span>
                        <span className="font-bold text-[10px]">100+ PTS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DocCard>
          </div>
        );
      case 'lab':
        return (
          <div className="space-y-10">
            <DocCard title="MEME LAB: NEURAL RENDER CORE">
              <div className="space-y-8">
                <div className="bg-black text-white p-8 rounded-[40px] border-4 border-black neo-shadow space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bungee text-[#1EB7E9] text-xl">ENGINE OVERVIEW</h3>
                    <div className="bg-[#1EB7E9]/20 text-[#1EB7E9] px-3 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest">Active v4.0</div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed tracking-widest">
                    The Yeti Meme Lab is a high-fidelity image generation workspace powered by Google Gemini Multi-Modal logic.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bungee text-xl text-black border-l-4 border-[#1EB7E9] pl-4 uppercase">THE 3 GENERATOR PROFILES</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-[#FF4D4D]/5 border-2 border-[#FF4D4D]/20 p-6 rounded-[32px] space-y-2">
                      <h4 className="font-bungee text-lg text-black">🎲 CHAOS THEORY</h4>
                      <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">
                        Optimized for "Degen" culture. Prioritizes vibrant comic-book aesthetics, high-energy scenarios, and hilarious crypto-centric compositions.
                      </p>
                    </div>
                    <div className="bg-[#1EB7E9]/5 border-2 border-[#1EB7E9]/20 p-6 rounded-[32px] space-y-2">
                      <h4 className="font-bungee text-lg text-black">🎨 VECTOR ALPHA</h4>
                      <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">
                        Professional 2D Character design. Generates clean, flat-vector bipedal Yeti assets with consistent features. Ideal for branding and stickers.
                      </p>
                    </div>
                    <div className="bg-slate-50 border-2 border-black/5 p-6 rounded-[32px] space-y-2">
                      <h4 className="font-bungee text-lg text-black">❄️ RETRO BLIZZARD</h4>
                      <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">
                        90s Nostalgia Engine. Merges Vaporwave aesthetics with lo-fi grainy textures and soft pastel palettes for a "Winter Anime" vibe.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bungee text-xl text-black border-l-4 border-[#FFEA31] pl-4 uppercase">RENDER SCALES</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-black p-4 rounded-2xl text-center">
                      <p className="font-bungee text-lg">1K</p>
                      <p className="text-[7px] font-black uppercase">FLASH</p>
                    </div>
                    <div className="bg-[#FFEA31]/20 border-2 border-black p-4 rounded-2xl text-center">
                      <p className="font-bungee text-lg">2K</p>
                      <p className="text-[7px] font-black uppercase">PRO</p>
                    </div>
                    <div className="bg-[#FFEA31] border-2 border-black p-4 rounded-2xl text-center">
                      <p className="font-bungee text-lg">4K</p>
                      <p className="text-[7px] font-black uppercase">ULTRA</p>
                    </div>
                  </div>
                </div>
              </div>
            </DocCard>
          </div>
        );
      case 'swap':
        return (
          <div className="space-y-10">
            <DocCard title="FROST SWAP: HYBRID LIQUIDITY">
              <div className="space-y-8">
                <div className="bg-black text-white p-8 rounded-[40px] border-4 border-black neo-shadow space-y-4">
                  <h3 className="font-bungee text-[#1EB7E9] text-xl">ARCHITECTURE</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-relaxed tracking-widest">
                    Frost Swap provides sub-zero latency by switching between two liquidity layers depending on the token's lifecycle.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-white border-2 border-black p-6 rounded-[32px] space-y-3">
                    <h4 className="font-bungee text-black flex items-center gap-2">🪐 JUPITER AGGREGATOR (V1)</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">
                      Post-migration engine. Aggregates liquidity from across Solana with **Strict Token List: OFF**, allowing the trade of any asset instantly.
                    </p>
                  </div>
                  <div className="bg-white border-2 border-black p-6 rounded-[32px] space-y-3">
                    <h4 className="font-bungee text-black flex items-center gap-2">💊 PUMP.FUN BONDING CURVE</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">
                      Launch phase engine. Used during the fair-launch period to track progress toward the 100% Raydium migration target.
                    </p>
                  </div>
                </div>
              </div>
            </DocCard>
          </div>
        );
      case 'roadmap':
        return (
          <div className="space-y-12">
            <DocCard title="THE COMPREHENSIVE SNOWMAP">
              <div className="space-y-16 mt-8">
                <RoadmapDeepDive 
                  step="STEP 1" 
                  title="THE AVALANCHE (Genesis)" 
                  color="bg-white"
                  items={[
                    { label: "PRE-SALE ORIGINS", detail: "Fair launch genesis via Dev.FUN to ensure no team snipes and pure community ownership." },
                    { label: "PUMP.FUN IGNITION", detail: "Bonding curve activation to establish early price discovery and holder base." },
                    { label: "MIGRATION PROTOCOL", detail: "Automated migration to Raydium upon 100% curve completion with DEX Screener boosts." },
                    { label: "FROST STAKING v1", detail: "Launch of the 'Freeze' protocol allowing users to lock tokens for points." }
                  ]} 
                />

                <RoadmapDeepDive 
                  step="STEP 2" 
                  title="FROSTBITE (Utility Launch)" 
                  color="bg-[#9BDDFF]"
                  items={[
                    { label: "YETI AGENT HUB", detail: "Deployment of the dual-core AI agent for social questing and oracle prophecies." },
                    { label: "NEURAL MEME LAB", detail: "Opening the AI Power Meme Creation workshop for high-fidelity asset generation." },
                    { label: "FROZEN NFT MINT", detail: "Launch of the 3,333 generative collection with on-chain utility." },
                    { label: "COMMUNITY FREEZE", detail: "Coordinated market events to solidify the holder core." }
                  ]} 
                />

                <RoadmapDeepDive 
                  step="STEP 3" 
                  title="BLIZZARD (Expansion)" 
                  color="bg-[#1EB7E9]"
                  items={[
                    { label: "YETI SWAP LAUNCH", detail: "Evolution of the swap interface into a dedicated ecosystem DEX hub for all Yeti-related pairs." },
                    { label: "WINTER NFT (WHITELIST)", detail: "Exclusive access tiers for high-point stakers to enter upcoming ecosystem projects." },
                    { label: "NFT COLLECTION MINTING", detail: "Launch of the 3,333 generative collection with on-chain utility and staking multipliers." },
                    { label: "CEX PEAK LISTINGS", detail: "Strategic listings on Tier-1 and Tier-2 Centralized Exchanges." }
                  ]} 
                />

                <RoadmapDeepDive 
                  step="STEP 4" 
                  title="PEAK DOMINATION (Legacy)" 
                  color="bg-[#0B2F44]"
                  textColor="text-white"
                  items={[
                    { label: "GLOBAL SNOW DOMINATION", detail: "$YETI becomes the standard for AI-Meme utility on Solana." },
                    { label: "$100M MCAP PEAK", detail: "Achieving major market capitalization milestones through utility-driven growth." },
                    { label: "YETI DAO GOVERNANCE", detail: "Handing full control of the community vault and protocol parameters to the stakers." },
                    { label: "THE COLDEST CHARITY", detail: "Global philanthropic initiatives focusing on environmental preservation and community support." }
                  ]} 
                />
              </div>
            </DocCard>
          </div>
        );
      case 'tokenomics':
        return (
          <DocCard title="6. THE COLD HARD YETINOMICS">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <ValueBox label="Total Supply" val="1 BILLION" />
                <ValueBox label="Buy/Sell Tax" val="0% / 0%" />
              </div>
              
              <div className="bg-slate-50 border-2 border-black/5 p-8 rounded-[40px] space-y-6">
                <h3 className="font-bungee text-black text-xl">SUPPLY ALLOCATION</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 bg-[#1EB7E9] rounded mt-1"></div>
                    <div>
                      <p className="font-bungee text-sm">70.31% - PRESALE</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Allocated to Dev.FUN fair-launch participants.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 bg-[#C084FC] rounded mt-1"></div>
                    <div>
                      <p className="font-bungee text-sm">8% - REWARDS & AIRDROPS</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">3 Month Cliff + 2 Months Vesting.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 bg-[#FFEA31] rounded mt-1"></div>
                    <div>
                      <p className="font-bungee text-sm">21.69% - LIQUIDITY / BUILDER</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Includes 1% Builder allocation (1 Month Cliff + 3 Months Vesting).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DocCard>
        );
      case 'staking':
        return (
          <DocCard title="7. FROZEN VAULT: STAKING PROTOCOLS">
            <div className="space-y-12">
              {/* Introduction */}
              <div className="bg-slate-50 p-8 rounded-[40px] border-2 border-black/5 space-y-4">
                <h3 className="font-bungee text-black text-xl uppercase">VAULT OVERVIEW</h3>
                <p className="text-[11px] font-bold text-slate-700 uppercase leading-relaxed">
                  The Frozen Vault is a sub-zero secure environment where $YETI holders can lock their assets to generate <span className="text-[#1EB7E9]">Frost Points (FP)</span>. FP is the primary metric used to determine ecosystem standing, whitelist priority, and airdrop eligibility.
                </p>
              </div>

              {/* Accumulation Mechanics */}
              <div className="space-y-6">
                <h3 className="font-bungee text-black text-xl border-l-4 border-[#1EB7E9] pl-4 uppercase">ACCUMULATION MECHANICS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-black p-6 rounded-3xl space-y-2">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Base Earning Rate</p>
                    <p className="font-bungee text-lg text-black">10 PTS / 10K $YETI / HR</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase leading-tight mt-2">
                      Points are calculated per second and updated in real-time within the dashboard.
                    </p>
                  </div>
                  <div className="bg-white border-2 border-black p-6 rounded-3xl space-y-2">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Withdrawal Rules</p>
                    <p className="font-bungee text-lg text-[#FF4D4D]">INSTANT UNSTAKE</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase leading-tight mt-2">
                      Warning: Unstaking resets your current point accumulation streak and Diamond Hands bonus progress.
                    </p>
                  </div>
                </div>
              </div>

              {/* Hierarchy Levels */}
              <div className="space-y-6">
                <h3 className="font-bungee text-black text-xl border-l-4 border-[#FFEA31] pl-4 uppercase">THE PACK HIERARCHY (TIERS)</h3>
                <div className="bg-black text-white p-8 rounded-[40px] space-y-6 neo-shadow">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">FP THRESHOLDS & WHITELIST PROBABILITIES:</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-bungee text-sm text-orange-400">BRONZE</span>
                      <span className="font-bold text-[10px] text-gray-300">0 - 2,000 PTS (20% CHANCE)</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-bungee text-sm text-slate-400">SILVER</span>
                      <span className="font-bold text-[10px] text-gray-300">2,000 - 4,000 PTS (40% CHANCE)</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-bungee text-sm text-[#FFEA31]">GOLD</span>
                      <span className="font-bold text-[10px] text-gray-300">4,000 - 6,000 PTS (60% CHANCE)</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-bungee text-sm text-[#3B82F6]">DIAMOND</span>
                      <span className="font-bold text-[10px] text-gray-300">6,000 - 8,000 PTS (80% CHANCE)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bungee text-sm text-[#FF4D4D]">YETI KING</span>
                      <span className="font-bold text-[10px] text-gray-300">8,000+ PTS (100% CHANCE)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multipliers & Bonuses */}
              <div className="space-y-6">
                <h3 className="font-bungee text-black text-xl border-l-4 border-black pl-4 uppercase">BOOSTS & MULTIPLIERS</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-[#9BDDFF]/10 border-2 border-[#9BDDFF]/30 p-6 rounded-[32px] space-y-2">
                    <h4 className="font-bungee text-lg text-black">⚡ EARLY STAKER MULTIPLIER</h4>
                    <p className="text-[10px] font-bold text-slate-700 uppercase leading-relaxed">
                      Participate in the first 7 days of the vault launch to receive a permanent <span className="text-[#1EB7E9]">1.5x Multiplier</span> on all Frost Point accumulation. This boost is tied to your wallet address.
                    </p>
                  </div>
                  <div className="bg-[#FFEA31]/10 border-2 border-[#FFEA31]/30 p-6 rounded-[32px] space-y-2">
                    <h4 className="font-bungee text-lg text-black">💎 DIAMOND HANDS BONUS</h4>
                    <p className="text-[10px] font-bold text-slate-700 uppercase leading-relaxed">
                      Hold your position for 30 consecutive days without unstaking to trigger a one-time <span className="text-emerald-600">3,000 Point Bonus</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Governance */}
              <div className="bg-[#1EB7E9] border-[4px] border-black rounded-[40px] p-8 text-black space-y-4 neo-shadow-sm">
                <h3 className="font-bungee text-xl uppercase">DAO GOVERNANCE RIGHTS</h3>
                <p className="text-[11px] font-bold uppercase leading-relaxed opacity-80">
                  Stakers who maintain a balance of at least <span className="font-black">100,000 $YETI</span> within the Frozen Vault unlock voting permissions for the <span className="underline">Coldest Charity</span>. This allows the pack to collectively decide which Himalayan conservation projects receive community grant allocations.
                </p>
              </div>
            </div>
          </DocCard>
        );
      case 'nft':
        return (
          <DocCard title="8. THE FROZEN NFT COLLECTION">
            <div className="space-y-12">
              <div className="bg-slate-50 p-8 rounded-[40px] border-2 border-black/5 space-y-4">
                <h3 className="font-bungee text-black text-xl">COLLECTION SPECS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="bg-white p-4 rounded-2xl border-2 border-black/10">
                     <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Total Supply</p>
                     <p className="font-bungee text-lg text-black">3,333 UNITS</p>
                   </div>
                   <div className="bg-white p-4 rounded-2xl border-2 border-black/10">
                     <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Mint Price</p>
                     <p className="font-bungee text-lg text-[#1EB7E9]">0.1 SOL</p>
                   </div>
                </div>
                <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed mt-4">
                  NFTs grant direct multipliers for $YETI staking and exclusive access to high-fidelity generation profiles in the Meme Lab.
                </p>
              </div>

              <div className="space-y-8">
                <h3 className="font-bungee text-black text-xl border-l-4 border-[#1EB7E9] pl-4 uppercase">RARITY TIERS EXPLAINED</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* COMMON */}
                  <div className="bg-white border-2 border-black p-6 rounded-[32px] space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bungee text-lg text-black">SNOW BALLER (COMMON)</h4>
                      <span className="bg-slate-100 px-3 py-1 rounded-xl text-[8px] font-black text-black">POWER: 17%</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 uppercase leading-relaxed">
                      The foundation of the pack. These Yetis provide the baseline entry into the ecosystem, offering standard staking rewards and access to the basic Meme Lab 1K rendering engine.
                    </p>
                  </div>

                  {/* UNCOMMON */}
                  <div className="bg-[#4ADE80]/10 border-2 border-[#4ADE80]/30 p-6 rounded-[32px] space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bungee text-lg text-black">FROST FOOT (UNCOMMON)</h4>
                      <span className="bg-[#4ADE80] px-3 py-1 rounded-xl text-[8px] font-black text-black">POWER: 33%</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-800 uppercase leading-relaxed">
                      Experienced climbers with enhanced cold resistance. These units provide a 1.2x boost to Frost Point accumulation compared to the baseline.
                    </p>
                  </div>

                  {/* RARE */}
                  <div className="bg-[#3B82F6]/10 border-2 border-[#3B82F6]/30 p-6 rounded-[32px] space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bungee text-lg text-black">GLACIER SCOUT (RARE)</h4>
                      <span className="bg-[#3B82F6] px-3 py-1 rounded-xl text-[8px] font-black text-white">POWER: 50%</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-900 uppercase leading-relaxed">
                      The reconnaissance elite. Scouts hold 50% power, granting significant voting weight in the Yeti DAO and priority access to limited ecosystem alpha drops.
                    </p>
                  </div>

                  {/* EPIC */}
                  <div className="bg-[#C084FC]/10 border-2 border-[#C084FC]/30 p-6 rounded-[32px] space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bungee text-lg text-black">STORM BREAKER (EPIC)</h4>
                      <span className="bg-[#C084FC] px-3 py-1 rounded-xl text-[8px] font-black text-black">POWER: 67%</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-800 uppercase leading-relaxed">
                      Masters of the blizzard who control the weather. Epic Yetis unlock the Gemini 3 Pro (2K) rendering engine for their owners in the Meme Lab.
                    </p>
                  </div>

                  {/* LEGENDARY */}
                  <div className="bg-[#FFEA31]/10 border-2 border-[#FFEA31]/30 p-6 rounded-[32px] space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bungee text-lg text-black">GOLDEN HIMALAYA (LEGENDARY)</h4>
                      <span className="bg-[#FFEA31] px-3 py-1 rounded-xl text-[8px] font-black text-black">POWER: 83%</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-900 uppercase leading-relaxed">
                      Legends spoken of in the oldest void prophecies. Owners receive maximum whitelist priority for all future sub-protocol launches and sub-zero staking multipliers.
                    </p>
                  </div>

                  {/* MYTHICAL */}
                  <div className="bg-[#FF4D4D]/10 border-2 border-[#FF4D4D]/30 p-6 rounded-[32px] space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bungee text-lg text-[#FF4D4D]">YETI OVERLORD (MYTHICAL)</h4>
                      <span className="bg-[#FF4D4D] px-3 py-1 rounded-xl text-[8px] font-black text-white">POWER: 100%</span>
                    </div>
                    <p className="text-[10px] font-bold text-red-950 uppercase leading-relaxed">
                      The supreme rulers of the peak. Only 33 exist. Overlords grant 4K rendering access, full DAO veto rights for charity proposals, and the highest possible yield in the Frozen Vault.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DocCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-bungee text-5xl md:text-8xl text-black drop-shadow-[4px_4px_0px_rgba(30,183,233,1)] uppercase">PROTOCOL DOCS</h1>
          <div className="inline-block bg-black text-[#1EB7E9] px-6 py-2 rounded-xl font-bungee text-sm neo-shadow uppercase">
            v3.2 YETI AGENT PROTOCOL
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-2xl border-[3px] border-black font-bungee text-xs md:text-sm transition-all neo-shadow-sm
                ${activeTab === tab.id 
                  ? 'bg-black text-[#1EB7E9] translate-y-1 shadow-none' 
                  : 'bg-white text-black hover:bg-slate-50 hover:-translate-y-1'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Content */}
        <div className="mt-8 max-w-4xl mx-auto">
          {renderContent()}
        </div>

        {/* Support Section */}
        <div className="text-center pt-10">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Still have questions?</p>
           <div className="flex justify-center gap-4">
             <button className="bg-white border-2 border-black px-6 py-2 rounded-xl font-bungee text-xs hover:bg-[#9BDDFF] transition-colors uppercase">TELEGRAM</button>
             <button className="bg-white border-2 border-black px-6 py-2 rounded-xl font-bungee text-xs hover:bg-[#1EB7E9] transition-colors uppercase">X (TWITTER)</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DocsSection;
