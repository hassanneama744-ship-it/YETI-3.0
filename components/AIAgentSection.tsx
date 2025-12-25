
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  TerminalSquare, 
  Loader2, 
  Zap, 
  Cpu, 
  Ghost,
  Twitter,
  Repeat,
  Heart,
  UserPlus,
  Trophy,
  CheckCircle,
  TrendingUp,
  Award,
  ShieldCheck,
  ZapOff,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

type ViewMode = 'oracle' | 'quest';

const YETI_IMAGE = "https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg";

interface QuestSubmission {
  id: string;
  type: 'follow' | 'like' | 'repost';
  status: 'verified' | 'failed';
  timestamp: number;
  points: number;
}

interface TweetQuest {
  id: string;
  text: string;
  date: string;
  likes: string;
  rts: string;
  points: { like: number; repost: number };
}

const InfoMarquee: React.FC = () => {
  const label = "USE YETI ORACLE PROMPTS IN THE MEME LAB TO GENERATE YOUR OWN ABOMINABLE MASTERPIECES • ";
  return (
    <div className="w-full bg-[#FFEA31] border-b-[4px] border-black py-2 overflow-hidden select-none relative z-10">
      <div className="flex whitespace-nowrap animate-marquee items-center">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="text-black font-bungee text-sm tracking-widest uppercase px-4">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

const AIAgentSection: React.FC = () => {
  const [view, setView] = useState<ViewMode>('oracle');
  const [inspiration, setInspiration] = useState<string | null>(null);
  const [isInspiring, setIsInspiring] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [typewriterText, setTypewriterText] = useState("");
  const [copied, setCopied] = useState(false);
  
  // Quest States
  const [quests, setQuests] = useState<TweetQuest[]>([]);
  const [isLoadingQuests, setIsLoadingQuests] = useState(false);
  const [submissions, setSubmissions] = useState<QuestSubmission[]>([]);
  const [userPoints, setUserPoints] = useState(0);
  const [twitterHandle, setTwitterHandle] = useState("");
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Typewriter effect for Oracle
  useEffect(() => {
    if (inspiration) {
      let i = 0;
      setTypewriterText("");
      const interval = setInterval(() => {
        setTypewriterText(inspiration.slice(0, i));
        i++;
        if (i > inspiration.length) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [inspiration]);

  // Fetch real-time tweets when entering Quest mode
  useEffect(() => {
    if (view === 'quest' && quests.length === 0) {
      fetchRealTimeQuests();
    }
  }, [view]);

  const fetchRealTimeQuests = async () => {
    setIsLoadingQuests(true);
    setErrorMsg(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Find the 3 most recent tweets from the X (Twitter) account @theyeticoin (https://x.com/theyeticoin). Return ONLY a raw JSON array of objects with keys: id (a unique string), text (the tweet content), date (relative time like '2h ago'), likes (count like '1.2k'), rts (count like '450'). Do not include any markdown or extra text.",
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "";
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        // Map to include points logic
        const formattedQuests = parsed.map((q: any) => ({
          ...q,
          points: { like: 5, repost: 15 }
        }));
        setQuests(formattedQuests);
      } else {
        throw new Error("Could not parse real-time feed data.");
      }
    } catch (error) {
      console.error("Feed fetch error:", error);
      showError("FAILED TO FETCH LIVE FEED. RELOADING SYSTEM...");
      // Fallback to empty or a retry after delay could be added
    } finally {
      setIsLoadingQuests(false);
    }
  };

  const generateAIInspiration = async () => {
    if (isInspiring) return;
    setIsInspiring(true);
    setInspiration(null);
    setCopied(false);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate a hilarious, high-energy, and bullish 'Yeti Meme Prophecy' for the $YETI coin on Solana. Use degen slang (LFG, moon, green candles) and yeti-themed winter imagery. Make it funny and punchy. Max 20 words.",
        config: { temperature: 1.0 }
      });
      const text = response.text || "THE YETI HAS SPOKEN: GREEN CANDLES ARE COMING TO FREEZE THE BEARS. LFG! ❄️🚀";
      setInspiration(text);
      setHistory(prev => [text, ...prev].slice(0, 5));
    } catch (error) {
      console.error(error);
      setInspiration("THE DATA BLIZZARD IS TOO THICK. REBOOTING NEURAL SYSTEM...");
    } finally {
      setIsInspiring(false);
    }
  };

  const copyToClipboard = async () => {
    if (!inspiration) return;
    try {
      await navigator.clipboard.writeText(inspiration);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const verifyFollow = async () => {
    if (!twitterHandle.startsWith('@') || twitterHandle.length < 3) {
      showError("ENTER A VALID X HANDLE STARTING WITH @");
      return;
    }
    setVerifyingId('follow');
    await new Promise(r => setTimeout(r, 1500));
    addPoints(10, 'follow');
    setVerifyingId(null);
  };

  const verifyTweetAction = async (tweetId: string, type: 'like' | 'repost', points: number) => {
    const actionId = `${tweetId}-${type}`;
    if (submissions.find(s => s.id === actionId)) return;
    setVerifyingId(actionId);
    await new Promise(r => setTimeout(r, 1200));
    addPoints(points, type, actionId);
    setVerifyingId(null);
  };

  const addPoints = (pts: number, type: 'follow' | 'like' | 'repost', customId?: string) => {
    setUserPoints(prev => prev + pts);
    setSubmissions(prev => [{
      id: customId || `sub-${Date.now()}`,
      type,
      status: 'verified',
      timestamp: Date.now(),
      points: pts
    }, ...prev]);
  };

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 3000);
  };

  const getBadge = (pts: number) => {
    if (pts >= 100) return { name: "YETI KING", color: "text-[#1EB7E9]" };
    if (pts >= 50) return { name: "SNOWBALLER", color: "text-black" };
    return { name: "ROOKIE", color: "text-gray-400" };
  };

  const currentBadge = getBadge(userPoints);

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex flex-col items-center">
      <InfoMarquee />

      <div className="w-full flex flex-col items-center py-8 px-4">
        {/* Error Popup */}
        {errorMsg && (
          <div className="fixed top-24 z-[60] animate-in slide-in-from-top duration-300">
            <div className="bg-[#FF4D4D] text-white border-[3px] border-black px-6 py-3 rounded-2xl flex items-center gap-3 neo-shadow">
              <AlertCircle className="w-5 h-5" />
              <span className="font-bungee text-xs uppercase">{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Navigation & Stats Header */}
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="bg-white border-[3px] border-black rounded-3xl p-1.5 flex gap-1 neo-shadow-sm">
            <button 
              onClick={() => setView('oracle')}
              className={`px-6 py-2 rounded-2xl font-bungee text-xs transition-all ${view === 'oracle' ? 'bg-[#1EB7E9] text-black' : 'text-gray-400 hover:text-black'}`}
            >
              ORACLE
            </button>
            <button 
              onClick={() => setView('quest')}
              className={`px-6 py-2 rounded-2xl font-bungee text-xs transition-all ${view === 'quest' ? 'bg-[#1EB7E9] text-black' : 'text-gray-400 hover:text-black'}`}
            >
              QUESTS
            </button>
          </div>

          <div className="flex gap-4">
            <div className="bg-white border-[3px] border-black px-6 py-2 rounded-3xl neo-shadow-sm flex items-center gap-4">
              <div className="text-right">
                <p className="text-[8px] font-black text-gray-400 uppercase">STATUS</p>
                <p className={`font-bungee text-xs ${currentBadge.color}`}>{currentBadge.name}</p>
              </div>
              <div className="w-[2px] h-6 bg-gray-100"></div>
              <div className="text-right">
                <p className="text-[8px] font-black text-gray-400 uppercase">PTS</p>
                <p className="font-bungee text-xl text-black">{userPoints}</p>
              </div>
            </div>
          </div>
        </div>

        {view === 'oracle' ? (
          /* ORACLE VIEW */
          <div className="max-w-4xl w-full space-y-8 flex flex-col items-center animate-in fade-in duration-500">
            <div className="relative group">
              <div className="w-40 h-40 bg-white border-[4px] border-black rounded-[40px] neo-shadow-lg overflow-hidden flex items-center justify-center">
                <img src={YETI_IMAGE} alt="Yeti" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute -top-3 -right-3 bg-[#FFEA31] border-[2px] border-black rounded-full px-4 py-1 font-bungee text-[9px] neo-shadow rotate-12 text-black">
                NEURAL CORE
              </div>
            </div>

            <div className="w-full space-y-4 text-center">
              <div className="inline-block bg-black text-[#1EB7E9] px-4 py-1.5 rounded-xl font-bungee text-[10px] neo-shadow-sm uppercase">
                Yeti Agent V3.2
              </div>
              <h1 className="font-bungee text-3xl md:text-5xl text-black leading-none">
                THE <span className="text-[#1EB7E9] drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">ORACLE</span> HUB
              </h1>
            </div>

            <div className="w-full bg-white border-[4px] border-black rounded-[32px] p-6 md:p-10 neo-shadow-lg relative min-h-[180px] flex flex-col items-center justify-center">
              <div className="absolute top-4 left-6 flex items-center gap-2">
                <TerminalSquare className="w-4 h-4 text-gray-300" />
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">PROPHECY.LOG</span>
              </div>
              
              {isInspiring ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 animate-spin text-[#1EB7E9]" />
                  <p className="font-bungee text-xs text-gray-300">SYNCHRONIZING VOID...</p>
                </div>
              ) : inspiration ? (
                <div className="space-y-6 flex flex-col items-center">
                  <p className="font-bungee text-lg md:text-xl text-black leading-relaxed text-center px-4">
                    "{typewriterText}"
                  </p>
                  <button 
                    onClick={copyToClipboard}
                    className="bg-[#FFEA31] text-black border-[3px] border-black px-6 py-2 rounded-2xl font-bungee text-xs neo-shadow hover:-translate-y-0.5 transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'COPIED!' : 'COPY PROPHECY'}
                  </button>
                </div>
              ) : (
                <p className="font-bungee text-base text-gray-400 text-center uppercase">
                  Awaiting first ignition sequence...
                </p>
              )}
            </div>

            <button 
              onClick={generateAIInspiration}
              disabled={isInspiring}
              className="bg-[#1EB7E9] text-black font-bungee text-lg px-10 py-4 rounded-[2rem] border-[4px] border-black neo-shadow hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center gap-4"
            >
              {isInspiring ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              GENERATE MEME PROPHECY
            </button>
          </div>
        ) : (
          /* QUEST VIEW */
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-right duration-500">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border-[4px] border-black rounded-[32px] p-6 neo-shadow space-y-6">
                <div className="flex items-center gap-6 mb-2">
                  <div className="w-14 h-14 bg-[#1EB7E9] border-[3px] border-black rounded-xl flex items-center justify-center neo-shadow-sm">
                    <UserPlus className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bungee text-xl text-black">FOLLOW PACK</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SYNC YOUR HANDLE FOR REWARDS</p>
                  </div>
                  <div className="ml-auto bg-[#FFEA31] border-2 border-black px-4 py-1 rounded-xl font-bungee text-[10px]">+10 PTS</div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <input 
                    type="text" 
                    placeholder="@twitter_handle"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value.startsWith('@') ? e.target.value : '@' + e.target.value)}
                    className="flex-grow w-full bg-slate-50 border-2 border-black rounded-xl px-6 py-3.5 text-sm font-bold text-black focus:outline-none"
                  />
                  <button 
                    onClick={verifyFollow}
                    disabled={verifyingId === 'follow' || submissions.some(s => s.type === 'follow')}
                    className="w-full md:w-auto bg-black text-white px-8 py-3.5 rounded-xl font-bungee text-[10px] neo-shadow hover:translate-x-1 transition-all disabled:opacity-50"
                  >
                    {verifyingId === 'follow' ? "SYNCING..." : "INITIALIZE SYNC"}
                  </button>
                </div>
              </div>

              <div className="bg-white border-[4px] border-black rounded-[32px] p-6 neo-shadow space-y-6">
                 <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4">
                    <h3 className="font-bungee text-lg text-black tracking-tight">OPERATION HISTORY</h3>
                    <div className="bg-slate-100 px-3 py-1 rounded-lg text-[8px] font-black uppercase text-gray-400">TELEMETRY_LOGS</div>
                 </div>
                 {submissions.length === 0 ? (
                   <div className="py-8 text-center text-gray-300">
                     <ZapOff className="w-8 h-8 mx-auto mb-2 opacity-20" />
                     <p className="font-bungee text-[10px]">NO ACTIVE TELEMETRY</p>
                   </div>
                 ) : (
                   <div className="space-y-3">
                     {submissions.map(sub => (
                       <div key={sub.id} className="bg-slate-50 border-2 border-black/5 p-3 rounded-xl flex items-center justify-between animate-in slide-in-from-left duration-300">
                         <div className="flex items-center gap-4">
                           <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
                             <CheckCircle className="w-3 h-3 text-emerald-500" />
                           </div>
                           <span className="font-bungee text-[10px] text-black uppercase">LOG: {sub.type}</span>
                         </div>
                         <span className="font-bungee text-[10px] text-emerald-500">+{sub.points}</span>
                       </div>
                     ))}
                   </div>
                 )}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border-[4px] border-black rounded-[32px] p-6 neo-shadow overflow-hidden relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bungee text-[10px] text-black uppercase tracking-widest">AUTO_QUEST_FEED</h3>
                    <div className="w-2 h-2 rounded-full bg-[#1EB7E9] animate-pulse"></div>
                  </div>
                  <button 
                    onClick={fetchRealTimeQuests}
                    disabled={isLoadingQuests}
                    className="p-2 bg-slate-50 border-2 border-black rounded-lg hover:bg-slate-100 transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 text-black ${isLoadingQuests ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                
                <div className="space-y-8 min-h-[300px]">
                  {isLoadingQuests ? (
                    <div className="flex flex-col items-center justify-center h-48 gap-4 opacity-40">
                      <Loader2 className="w-8 h-8 animate-spin text-black" />
                      <p className="font-bungee text-[8px] tracking-[0.3em]">FETCHING REAL-TIME DATA...</p>
                    </div>
                  ) : quests.length === 0 ? (
                    <div className="py-8 text-center text-gray-300">
                      <p className="font-bungee text-[10px]">FEED UNAVAILABLE</p>
                    </div>
                  ) : (
                    quests.map(tweet => (
                      <div key={tweet.id} className="space-y-4 border-b-2 border-gray-50 pb-6 last:border-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#9BDDFF] rounded-lg border-2 border-black flex items-center justify-center">
                            <Ghost className="w-4 h-4 text-black" />
                          </div>
                          <div className="flex flex-col">
                             <span className="font-black text-[9px] text-black uppercase">@theyeticoin</span>
                             <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest">{tweet.date}</span>
                          </div>
                        </div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed italic">"{tweet.text}"</p>
                        <div className="flex gap-4 mb-2">
                           <div className="flex items-center gap-1">
                              <Heart className="w-2.5 h-2.5 text-red-400 fill-current" />
                              <span className="text-[8px] font-black text-slate-400">{tweet.likes}</span>
                           </div>
                           <div className="flex items-center gap-1">
                              <Repeat className="w-2.5 h-2.5 text-blue-400" />
                              <span className="text-[8px] font-black text-slate-400">{tweet.rts}</span>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button 
                            onClick={() => verifyTweetAction(tweet.id, 'like', tweet.points.like)}
                            disabled={!!verifyingId || submissions.some(s => s.id === `${tweet.id}-like`)}
                            className={`py-2.5 rounded-xl border-2 border-black font-bungee text-[9px] transition-all ${submissions.some(s => s.id === `${tweet.id}-like`) ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-black hover:bg-[#FF4D4D]/10 shadow-sm'}`}
                          >
                            {verifyingId === `${tweet.id}-like` ? '...' : submissions.some(s => s.id === `${tweet.id}-like`) ? 'LIKED' : 'LIKE'}
                          </button>
                          <button 
                            onClick={() => verifyTweetAction(tweet.id, 'repost', tweet.points.repost)}
                            disabled={!!verifyingId || submissions.some(s => s.id === `${tweet.id}-repost`)}
                            className={`py-2.5 rounded-xl border-2 border-black font-bungee text-[9px] transition-all ${submissions.some(s => s.id === `${tweet.id}-repost`) ? 'bg-[#1EB7E9]/10 text-[#1EB7E9]' : 'bg-white text-black hover:bg-[#1EB7E9]/10 shadow-sm'}`}
                          >
                            {verifyingId === `${tweet.id}-repost` ? '...' : submissions.some(s => s.id === `${tweet.id}-repost`) ? 'REPOSTED' : 'REPOST'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-[#FFEA31] border-[4px] border-black rounded-[32px] p-6 neo-shadow text-black text-center space-y-4">
                <Trophy className="w-10 h-10 mx-auto" />
                <h3 className="font-bungee text-xl">THE PEAK</h3>
                <p className="text-[9px] font-black uppercase opacity-60">High score leaderboard sync coming soon</p>
                <div className="pt-2">
                   <a 
                    href="https://x.com/theyeticoin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-[8px] font-bungee hover:scale-105 transition-transform"
                   >
                     VIEW ON X.COM <ExternalLink className="w-2.5 h-2.5" />
                   </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAgentSection;
