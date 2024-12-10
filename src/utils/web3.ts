import { formatUnits, parseUnits } from 'viem';

export const formatTokenAmount = (amount: bigint, decimals: number): string => {
  return formatUnits(amount, decimals);
};

export const parseTokenAmount = (amount: string, decimals: number): bigint => {
  return parseUnits(amount, decimals);
};

export const shortenAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const validateAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};