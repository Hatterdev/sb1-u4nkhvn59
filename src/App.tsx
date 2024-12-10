import React from 'react';
import { NetworkSelector } from './components/NetworkSelector';
import { TokenCreator } from './components/TokenCreator';
import { LaunchpadForm } from './components/LaunchpadForm';
import { WalletConnect } from './components/WalletConnect';
import { Rocket } from 'lucide-react';
import { Web3Provider } from './providers/Web3Provider';

function App() {
  return (
    <Web3Provider>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Rocket className="h-8 w-8 text-pink-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">TokenLaunch</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-48">
                  <NetworkSelector />
                </div>
                <WalletConnect />
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <TokenCreator />
            <LaunchpadForm />
          </div>
        </main>
      </div>
    </Web3Provider>
  );
}

export default App;