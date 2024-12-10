import { useNetwork, useSwitchNetwork } from '@reownkit/appkit';
import { SUPPORTED_CHAINS } from '../config/chains';

export const useChain = () => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const currentChain = SUPPORTED_CHAINS.find(c => c.id === chain?.id) || SUPPORTED_CHAINS[0];

  return {
    currentChain,
    switchChain: switchNetwork,
    chains: SUPPORTED_CHAINS,
  };
};