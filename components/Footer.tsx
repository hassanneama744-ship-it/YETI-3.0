
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B2F44] py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
        <div className="space-y-4">
          <h2 className="font-bungee text-6xl md:text-8xl text-[#9BDDFF] tracking-tighter uppercase leading-none">JOIN THE PACK</h2>
          <div className="space-y-1">
            <p className="text-[#9BDDFF] font-bold text-xl">"Ice should be free for everyone."</p>
            <p className="text-[#1EB7E9] font-bold text-lg uppercase tracking-tight">YETI AGENT: ORACLE & QUESTS • SWAP • NFTS</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <SocialIcon 
            icon="https://img.favpng.com/9/9/6/x-logo-minimalist-monochrome-x-logo-MR9JAjaN.jpg" 
            label="Twitter" 
            href="https://x.com/theyeticoin"
          />
          <SocialIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" 
            label="Telegram" 
            href="https://t.me/theyeticoin"
          />
          <SocialIcon 
            icon="https://logos-world.net/wp-content/uploads/2024/10/Pump-Fun-Logo.png" 
            label="Pump.fun" 
          />
          <SocialIcon 
            icon="https://images.apifyusercontent.com/NtX7v0_NGm_nR95ljRYDySuBs9nmhWPuAg8bzinmPfY/rs:fill:250:250/cb:1/aHR0cHM6Ly9hcGlmeS1pbWFnZS11cGxvYWRzLXByb2QuczMudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vSElNQUNaaE9uN1lKNzFkVHUtYWN0b3ItaGVvRNGp4SlpJdGRrUDMzcjktdlpKQ1c1NjJ2ay1kZXhwbmcucG5n.webp" 
            label="Dexscreener" 
          />
        </div>

        <div className="w-full relative py-8">
           <div className="bg-white border-[6px] border-black rounded-[40px] p-10 neo-shadow-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-32 h-32 bg-[#9BDDFF] rounded-full -translate-x-1/2 -translate-y-1/2 border-[3px] border-black opacity-30"></div>
             <div className="absolute bottom-0 right-0 w-24 h-24 bg-gray-200 rounded-full translate-x-1/2 translate-y-1/2 border-[3px] border-black opacity-30"></div>
             
             <h2 className="font-bungee text-5xl md:text-6xl text-black relative z-10">$YETI COIN</h2>
             <span className="font-black text-[10px] text-gray-500 tracking-widest uppercase mt-4 md:mt-0">© 2025 THE ABOMINABLE SOLANA REVOLUTION</span>
           </div>
        </div>

        <div className="max-w-2xl">
          <p className="text-[10px] font-black uppercase text-[#1EB7E9]/60 leading-relaxed tracking-wider">
            DISCLAIMER: $YETI IS A MULTI-UTILITY YETI AGENT PLATFORM, DEX SWAP, AND NFT ECOSYSTEM ON SOLANA VIA PUMP.FUN.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, label, href }: { icon: string; label?: string; href?: string }) => (
  <a 
    href={href || "#"}
    target={href ? "_blank" : undefined}
    rel={href ? "noopener noreferrer" : undefined}
    title={label}
    className="w-16 h-16 bg-white border-[4px] border-black rounded-[20px] flex items-center justify-center neo-shadow hover:-translate-y-1 transition-transform group overflow-hidden"
  >
    <img src={icon} alt={label || "Social"} className="w-10 h-10 opacity-90 group-hover:opacity-100 transition-opacity object-contain" />
  </a>
);

export default Footer;
