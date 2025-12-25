
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const DEFAULT_YETI_URL = "https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg";

interface MemeLabSectionProps {
  globalMemes: string[];
  onGenerate: (url: string) => void;
}

const MemeLabSection: React.FC<MemeLabSectionProps> = ({ globalMemes, onGenerate }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentMeme, setCurrentMeme] = useState(globalMemes[0] || DEFAULT_YETI_URL);
  
  const [selectedStyle, setSelectedStyle] = useState<number>(3); 
  const [selectedSize, setSelectedSize] = useState<string>("1K");

  useEffect(() => {
    setCurrentMeme(globalMemes[0] || DEFAULT_YETI_URL);
  }, [globalMemes[0]]);

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && selectedStyle !== 1) return;
    if (isGenerating) return;

    // Check if API key is selected. This is required for Gemini 3 Pro (High Quality) 
    // and recommended to avoid "missing key" errors in browser.
    try {
      // Assuming window.aistudio is globally available and typed in the execution context.
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        // Proceeding as per race condition rules: assume success after triggering.
      }
    } catch (e) {
      console.warn("API Key Selection UI not available, attempting to proceed with environment key.");
    }

    setIsGenerating(true);

    try {
      // Create fresh instance right before call as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let finalPrompt = "";
      const isPro = selectedSize === "2K" || selectedSize === "4K";
      const model = isPro ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
      
      if (selectedStyle === 3) {
        // Vector Alpha
        finalPrompt = `A professional, clean 2D vector character design of a muscular white-furred bipedal Yeti with small brown antlers. Scenario: ${prompt}. Center the character on a clean background. High quality, professional finish.`;
      } else if (selectedStyle === 1) {
        // Chaos Theory
        const randomScenarios = [
          "riding a Solana-branded rocket to the moon through a blizzard",
          "swimming in a pool of gold $YETI coins",
          "commanding a snow army in a crypto war",
          "sitting on an ice throne made of GPUs",
          "shocked face looking at a vertical crypto chart",
          "wearing diamond chains and sunglasses in an ice cave"
        ];
        const randomScenario = randomScenarios[Math.floor(Math.random() * randomScenarios.length)];
        finalPrompt = `A chaotic and funny crypto meme of a muscular bipedal Yeti. Scenario: ${prompt ? prompt : randomScenario}. Vibrant comic book style, highly detailed.`;
      } else {
        // Retro Blizzard
        finalPrompt = `Retro vaporwave aesthetic, lo-fi grainy texture. Soft pastel colors. Character: Muscular white bipedal Yeti. Scenario: ${prompt}. Nostalgic 90s anime feel.`;
      }

      const response = await ai.models.generateContent({
        model: model,
        contents: {
          parts: [{ text: finalPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            ...(isPro ? { imageSize: selectedSize as any } : {})
          }
        }
      });

      let generatedImageUrl = "";
      // Check parts for inlineData as per SDK extraction rules
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (generatedImageUrl) {
        onGenerate(generatedImageUrl);
        setCurrentMeme(generatedImageUrl);
      } else {
        throw new Error("Generation finished but no image data was found in response parts.");
      }
      
    } catch (error: any) {
      console.error("Meme Lab Error:", error);
      // Handle the specific "Requested entity was not found" error by prompting for key again
      if (error?.message?.includes("Requested entity was not found")) {
        try {
          // @ts-ignore
          await window.aistudio.openSelectKey();
        } catch (e) {}
      }
      alert(`Yeti Lab Error: ${error instanceof Error ? error.message : "The freeze failed. Check your API key or connection."}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="bg-[#9BDDFF] py-12 md:py-20 px-4 font-sans text-white border-t border-black dot-bg min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Workspace Title & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/10 p-6 rounded-[32px] border-2 border-black/20 backdrop-blur-md">
          <div className="space-y-1">
            <h2 className="font-bungee text-3xl text-black flex items-center gap-3 uppercase">
              <span className="bg-black text-[#1EB7E9] px-3 py-1 rounded-xl neo-shadow rotate-[-2deg]">MEME</span> 
              <span>WORKSPACE</span>
            </h2>
            <p className="text-slate-900 font-black text-xs tracking-[0.2em] uppercase">Powered by Gemini AI Core</p>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-black/80 px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-[#1EB7E9] animate-pulse"></div>
               <span className="font-bungee text-[10px] tracking-widest uppercase">System: Online</span>
             </div>
             <div className="bg-white px-4 py-2 rounded-2xl border-2 border-black neo-shadow flex items-center gap-3">
               <span className="font-bungee text-[10px] text-black tracking-widest uppercase">Vault: {globalMemes.length} Items</span>
             </div>
          </div>
        </div>

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Input Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white border-[4px] border-black rounded-[40px] p-6 neo-shadow space-y-6 flex-grow flex flex-col">
              <div className="flex items-center justify-between border-b-2 border-black/5 pb-4">
                <span className="font-bungee text-xs text-black tracking-widest uppercase">1. Ingredients</span>
              </div>

              <div className="space-y-6 flex-grow">
                {/* Style Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Vibe Profile</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 1, label: "Chaos Theory", icon: "🎲" },
                      { id: 3, label: "Vector Alpha", icon: "🎨" },
                      { id: 2, label: "Retro Blizzard", icon: "❄️" }
                    ].map(style => (
                      <button 
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl border-2 transition-all font-bold text-sm
                          ${selectedStyle === style.id 
                            ? 'bg-black border-black text-white translate-x-[2px] translate-y-[2px]' 
                            : 'bg-slate-50 border-black/5 text-slate-400 hover:bg-slate-100'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`${selectedStyle === style.id ? 'grayscale-0' : 'grayscale'}`}>{style.icon}</span>
                          {style.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resolution Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Render Scale</label>
                  <div className="flex gap-2">
                    {["1K", "2K", "4K"].map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`flex-1 py-2 rounded-xl border-2 font-bungee text-xs transition-all
                          ${selectedSize === size 
                            ? 'bg-[#1EB7E9] border-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' 
                            : 'bg-slate-50 border-black/5 text-slate-400 hover:bg-slate-100'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {(selectedSize === "2K" || selectedSize === "4K") && (
                    <p className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter mt-1 italic">
                      * Uses High-Quality Gemini 3 Pro
                      <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="ml-2 underline">Billing Info</a>
                    </p>
                  )}
                </div>

                {/* Prompt Textarea */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Composition Prompt</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={selectedStyle === 1 ? "Surprise me with some Yeti chaos..." : "Ex: Yeti surfing on a slice of pizza..."}
                    className="w-full bg-slate-50 border-2 border-black/5 rounded-2xl px-4 py-4 text-sm font-bold text-black placeholder:text-slate-300 focus:outline-none focus:border-black min-h-[120px] resize-none transition-colors"
                  />
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || (!prompt.trim() && selectedStyle !== 1)}
                className="w-full bg-black text-white font-bungee py-5 rounded-[24px] border-4 border-black neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 group"
              >
                <div className="flex items-center justify-center gap-3">
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                      <span>FROSTING...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl">🚀</span>
                      <span>GENERATE MEME</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Right: Preview Canvas */}
          <div className="lg:col-span-8">
            <div id="whisk-canvas" className="bg-white border-[4px] border-black rounded-[50px] p-4 md:p-8 h-full neo-shadow-lg relative overflow-hidden flex flex-col">
              <div className="absolute top-8 right-8 text-[10px] font-black text-black/5 tracking-[0.5em] select-none uppercase">YETI_LAB_RENDERER</div>

              <div className="flex-grow flex items-center justify-center relative">
                <div className="w-full max-w-2xl aspect-square relative group">
                  {/* Image Container */}
                  <div className={`w-full h-full rounded-[40px] overflow-hidden border-[4px] border-black relative z-10 bg-slate-100 shadow-inner transition-all duration-700
                    ${isGenerating ? 'scale-95 blur-md grayscale' : 'scale-100 blur-0 grayscale-0'}`}>
                    <img 
                      src={currentMeme} 
                      alt="Current Result" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Loading State UI */}
                  {isGenerating && (
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6">
                      <div className="relative">
                        <div className="w-32 h-32 border-8 border-black/5 rounded-full"></div>
                        <div className="absolute inset-0 border-t-8 border-[#1EB7E9] rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <span className="font-bungee text-2xl text-black">❄️</span>
                        </div>
                      </div>
                      <div className="text-center space-y-1">
                        <p className="font-bungee text-xl text-black">INJECTING FROST...</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gemini Generative Renderer</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Metadata */}
              <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t-2 border-slate-50 pt-6">
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Engine Status</p>
                    <p className="font-bold text-black text-sm uppercase">Cloud_Sync_Active</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => downloadImage(currentMeme, `yeti-meme-${Date.now()}.png`)}
                    className={`bg-[#1EB7E9] text-black px-8 py-4 rounded-2xl border-4 border-black font-bungee text-sm neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-3
                    ${currentMeme === DEFAULT_YETI_URL ? 'opacity-30 cursor-not-allowed' : 'animate-bounce-short'}`}
                    disabled={currentMeme === DEFAULT_YETI_URL}
                  >
                    DOWNLOAD IMAGE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Vault: Historical Generations */}
        <div className="space-y-10 pt-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-[6px] border-black pb-8">
            <div className="space-y-1">
              <h3 className="font-bungee text-4xl md:text-5xl text-black uppercase">THE <span className="text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">FROZEN</span> VAULT</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {globalMemes.map((url, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white border-[4px] border-black rounded-[40px] p-4 neo-shadow hover:-translate-y-4 transition-all duration-300 cursor-pointer"
              >
                <div 
                  className="aspect-square rounded-[30px] overflow-hidden border-2 border-black/5 bg-slate-50 relative mb-4"
                  onClick={() => setCurrentMeme(url)}
                >
                  <img src={url} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <p className="font-bungee text-xs text-black">ITEM #{globalMemes.length - idx}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MemeLabSection;
