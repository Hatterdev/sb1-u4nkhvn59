import React, { useState } from 'react';
import { TokenConfig } from '../types/token';
import { useNetworkStore } from '../store/useNetworkStore';
import { AlertCircle, Settings } from 'lucide-react';
import { useTokenCreator } from '../hooks/useTokenCreator';
import { TokenBasicInfo } from './token/TokenBasicInfo';
import { TokenAdvancedSettings } from './token/TokenAdvancedSettings';

export const TokenCreator: React.FC = () => {
  const { currentNetwork } = useNetworkStore();
  const { createToken, isCreating } = useTokenCreator();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [config, setConfig] = useState<TokenConfig>({
    name: '',
    symbol: '',
    decimals: 18,
    totalSupply: '',
    taxFeeBps: 0,
    liquidityFeeBps: 0,
    marketingFeeBps: 0,
    buybackFeeBps: 0,
    isDeflationary: false,
    antiBot: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createToken(config);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertCircle className="text-pink-500" />
          <h2 className="text-2xl font-bold text-gray-800">Create New Token</h2>
        </div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-gray-600 hover:text-pink-500"
        >
          <Settings size={20} />
          <span>Advanced</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TokenBasicInfo config={config} onChange={setConfig} />
        {showAdvanced && <TokenAdvancedSettings config={config} onChange={setConfig} />}

        <button
          type="submit"
          disabled={isCreating}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? 'Creating...' : 'Create Token'}
        </button>
      </form>
    </div>
  );
};