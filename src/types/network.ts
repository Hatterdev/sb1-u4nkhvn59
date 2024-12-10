export interface Network {
  id: number;
  name: string;
  rpcUrl: string;
  symbol: string;
  explorerUrl: string;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  address?: string;
}