import React from 'react';
import { createRoot } from 'react-dom/client';
import { Buffer } from 'buffer';
import App from './App.tsx';

/**
 * POLYFILLS
 * Many Solana and Web3 libraries expect Buffer and process to be available globally.
 */
// Fix: Cast window to any to bypass property check for global Buffer assignment
(window as any).Buffer = Buffer;
// Fix: Cast window to any to bypass property check for global process object existence and assignment
if (!(window as any).process) {
  (window as any).process = { env: { NODE_ENV: 'production' } };
}

/**
 * ENTRY POINT
 * This file bootstraps the React application by mounting the main App component
 * to the #root div defined in index.html.
 */

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root container not found. Check index.html for <div id='root'></div>");
}