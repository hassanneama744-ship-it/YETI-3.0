
import React, { useState, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Marquee from './components/Marquee.tsx';
import MemeLabSection from './components/MemeLabSection.tsx';
import Yetinomics from './components/Yetinomics.tsx';
import UtilitySection from './components/UtilitySection.tsx';
import Snowmap from './components/Snowmap.tsx';
import Footer from './components/Footer.tsx';
import AboutYeti from './components/AboutYeti.tsx';
import SwapSection from './components/SwapSection.tsx';
import NFTSection from './components/NFTSection.tsx';
import StakeSection from './components/StakeSection.tsx';
import DocsSection from './components/DocsSection.tsx';
import AIAgentSection from './components/AIAgentSection.tsx';

type Page = 'home' | 'ai-agent' | 'meme' | 'stake' | 'swap' | 'nft' | 'docs';

const ComingSoonBar: React.FC<{ pageName: string }> = ({ pageName }) => {
  const displayLabel = pageName === 'ai-agent' ? 'YETI AGENT' : pageName === 'meme' ? 'MEME LAB' : pageName.toUpperCase();
  const label = `${displayLabel} VAULT • COMING SOON • `;
  return (
    <div className="w-full bg-[#FFEA31] border-b-[4px] border-black py-2 overflow-hidden select-none z-40 relative">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="text-black font-bungee text-sm tracking-widest uppercase px-4">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [memes, setMemes] = useState<string[]>([]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleNewMeme = (url: string) => {
    setMemes(prev => [url, ...prev]);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <Marquee />
            <AboutYeti memes={memes.slice(0, 4)} />
            <Marquee />
            <UtilitySection />
            <Marquee direction="reverse" />
            <Yetinomics />
            <Marquee />
            <Snowmap />
            <Marquee direction="reverse" />
          </>
        );
      case 'ai-agent':
        return <AIAgentSection />;
      case 'meme':
        return (
          <div className="animate-in fade-in duration-500">
            <div className="py-12 bg-[#1EB7E9] text-center border-b-[4px] border-black">
               <h1 className="font-bungee text-5xl md:text-7xl text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">MEME LAB</h1>
               <p className="font-bold text-black mt-4 uppercase tracking-widest">Create your own abominable masterpieces</p>
            </div>
            <MemeLabSection globalMemes={memes} onGenerate={handleNewMeme} />
          </div>
        );
      case 'stake':
        return <StakeSection />;
      case 'swap':
        return <SwapSection />;
      case 'nft':
        return <NFTSection />;
      case 'docs':
        return <DocsSection />;
      default:
        return null;
    }
  };

  const showComingSoonBar = ['meme', 'stake', 'swap', 'nft'].includes(currentPage);
  const showFooter = currentPage !== 'ai-agent';

  return (
    <div className="min-h-screen flex flex-col bg-[#050608]">
      <Header onNavigate={navigateTo} currentPage={currentPage} />
      <main className="flex-grow pt-20">
        {showComingSoonBar && <ComingSoonBar pageName={currentPage} />}
        {renderContent()}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  // Use a constant network for the connection endpoint
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Stable wallets array to prevent unnecessary re-renders of the Provider
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter()
  ], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AppContent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
