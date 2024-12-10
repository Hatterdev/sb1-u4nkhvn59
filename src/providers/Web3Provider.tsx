import React from 'react';
import { ReownKitProvider } from '@reownkit/appkit';
import { SUPPORTED_CHAINS } from '../config/chains';

interface Web3ProviderProps {
  children: React.ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  return (
    <ReownKitProvider
      chains={SUPPORTED_CHAINS}
      defaultChain={SUPPORTED_CHAINS[0]}
      projectId={import.meta.env.VITE_WALLETCONNECT_PROJECT_ID}
      appName={import.meta.env.VITE_APP_NAME || 'TokenLaunch'}
    >
      {children}
    </ReownKitProvider>
  );
};