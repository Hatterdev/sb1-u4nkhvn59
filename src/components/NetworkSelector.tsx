import React from 'react';
import { useChain } from '../hooks/useChain';

export const NetworkSelector: React.FC = () => {
  const { currentChain, switchChain, chains } = useChain();

  return (
    <div className="relative">
      <select
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        value={currentChain.id}
        onChange={(e) => {
          const chainId = Number(e.target.value);
          switchChain?.(chainId);
        }}
      >
        {chains.map((chain) => (
          <option key={chain.id} value={chain.id}>
            {chain.name}
          </option>
        ))}
      </select>
    </div>
  );
};