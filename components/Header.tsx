
import React from 'react';

type Page = 'home' | 'ai-agent' | 'meme' | 'stake' | 'swap' | 'nft' | 'docs';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const NavButton = ({ target, label }: { target: Page; label: string }) => (
    <button 
      onClick={() => onNavigate(target)}
      className={`font-bungee text-sm transition-colors hover:text-[#1EB7E9] whitespace-nowrap ${currentPage === target ? 'text-[#1EB7E9] underline underline-offset-4' : 'text-black'}`}
    >
      {label}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto bg-white border-[3px] border-black rounded-full flex items-center justify-between px-6 py-2 neo-shadow">
        <div 
          className="flex items-center gap-2 cursor-pointer group shrink-0"
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-black flex items-center justify-center overflow-hidden transition-transform group-hover:rotate-12">
            <img src="https://i.etsystatic.com/40533556/r/il/c05622/4679008741/il_fullxfull.4679008741_nkwa.jpg" alt="Yeti" className="w-full h-full object-cover" />
          </div>
          <span className="font-bungee text-lg tracking-tighter text-black">YETI</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          <NavButton target="home" label="HOME" />
          <NavButton target="ai-agent" label="YETI AGENT" />
          <NavButton target="meme" label="MEME LAB" />
          <NavButton target="stake" label="STAKE" />
          <NavButton target="swap" label="SWAP" />
          <NavButton target="nft" label="NFT" />
          <NavButton target="docs" label="DOCS" />
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => onNavigate('meme')}
            className="md:hidden bg-white text-black border-2 border-black p-1.5 rounded-full neo-shadow"
          >
            🎨
          </button>
          <button className="bg-[#1EB7E9] text-black font-bungee px-4 py-1.5 rounded-full border-2 border-black text-xs neo-shadow hover:-translate-y-0.5 transition-transform">
            BUY $YETI
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
