export interface TokenConfig {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  taxFeeBps: number;
  liquidityFeeBps: number;
  marketingFeeBps: number;
  buybackFeeBps: number;
  isDeflationary: boolean;
  antiBot: boolean;
}

export interface TokenInfo extends TokenConfig {
  address: string;
  owner: string;
  network: number;
  createdAt: number;
}