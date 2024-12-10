import { create } from 'zustand';
import { Network } from '../types/network';
import { SUPPORTED_NETWORKS } from '../config/networks';

interface NetworkStore {
  currentNetwork: Network;
  setNetwork: (network: Network) => void;
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  currentNetwork: SUPPORTED_NETWORKS[0],
  setNetwork: (network) => set({ currentNetwork: network }),
}));