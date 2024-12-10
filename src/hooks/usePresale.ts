import { useContractWrite, useContractRead, useWaitForTransaction } from '@reownkit/appkit';
import { toast } from 'react-hot-toast';
import { PRESALE_ABI } from '../config/abis';
import { useNetworkStore } from '../store/useNetworkStore';

export const usePresale = (presaleAddress?: string) => {
  const { currentNetwork } = useNetworkStore();

  const { data: presaleInfo } = useContractRead({
    address: presaleAddress,
    abi: PRESALE_ABI,
    functionName: 'presaleInfo',
    enabled: !!presaleAddress,
  });

  const { write: contribute, data: contributionData } = useContractWrite({
    address: presaleAddress,
    abi: PRESALE_ABI,
    functionName: 'contribute',
  });

  const { isLoading: isContributing } = useWaitForTransaction({
    hash: contributionData?.hash,
    onSuccess: () => {
      toast.success('Successfully contributed to presale!');
    },
    onError: (error) => {
      toast.error(`Failed to contribute: ${error.message}`);
    },
  });

  const handleContribute = async (amount: bigint) => {
    try {
      await contribute({ value: amount });
    } catch (error) {
      console.error('Failed to contribute:', error);
      toast.error('Failed to contribute to presale. Please try again.');
    }
  };

  return {
    presaleInfo,
    contribute: handleContribute,
    isContributing,
  };
};