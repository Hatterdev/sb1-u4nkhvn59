import React from 'react';
import { TokenConfig } from '../../types/token';

interface TokenBasicInfoProps {
  config: TokenConfig;
  onChange: (config: TokenConfig) => void;
}

export const TokenBasicInfo: React.FC<TokenBasicInfoProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Token Name</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          value={config.name}
          onChange={(e) => onChange({ ...config, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Token Symbol</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          value={config.symbol}
          onChange={(e) => onChange({ ...config, symbol: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Decimals</label>
        <input
          type="number"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          value={config.decimals}
          onChange={(e) => onChange({ ...config, decimals: parseInt(e.target.value) })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Total Supply</label>
        <input
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          value={config.totalSupply}
          onChange={(e) => onChange({ ...config, totalSupply: e.target.value })}
          required
        />
      </div>
    </div>
  );
};