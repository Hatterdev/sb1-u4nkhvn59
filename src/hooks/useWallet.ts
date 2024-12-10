import { useAccount, useBalance, useConnect, useDisconnect } from '@reownkit/appkit';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

export const useWallet = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  const handleConnect = useCallback(async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
    }
  }, [connect]);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast.error('Failed to disconnect wallet. Please try again.');
    }
  }, [disconnect]);

  return {
    address,
    isConnected,
    balance,
    connect: handleConnect,
    disconnect: handleDisconnect,
  };
};