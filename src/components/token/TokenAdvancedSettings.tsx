import React from 'react';
import { TokenConfig } from '../../types/token';

interface TokenAdvancedSettingsProps {
  config: TokenConfig;
  onChange: (config: TokenConfig) => void;
}

export const TokenAdvancedSettings: React.FC<TokenAdvancedSettingsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-4 pt-4 border-t border-gray-200">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tax Fee (%)</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={config.taxFeeBps ? config.taxFeeBps / 100 : ''}
            onChange={(e) => onChange({ ...config, taxFeeBps: Math.floor(parseFloat(e.target.value) * 100) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Liquidity Fee (%)</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            value={config.liquidityFeeBps ? config.liquidityFeeBps / 100 : ''}
            onChange={(e) => onChange({ ...config, liquidityFeeBps: Math.floor(parseFloat(e.target.value) * 100) })}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            checked={config.isDeflationary}
            onChange={(e) => onChange({ ...config, isDeflationary: e.target.checked })}
          />
          <span className="text-sm text-gray-700">Deflationary</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            checked={config.antiBot}
            onChange={(e) => onChange({ ...config, antiBot: e.target.checked })}
          />
          <span className="text-sm text-gray-700">Anti-Bot</span>
        </label>
      </div>
    </div>
  );
};