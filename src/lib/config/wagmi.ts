import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { sepolia, Chain } from 'viem/chains';

const anvil: Chain = {
  id: 31337,
  name: 'Anvil',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
    public: { http: ['http://127.0.0.1:8545'] },
  },
  blockExplorers: {
    default: { name: 'Anvil', url: 'http://127.0.0.1:8545' },
  },
  testnet: true,
};

export const wagmiConfig = getDefaultConfig({
  appName: 'NFTicket',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [sepolia, anvil],
  transports: {
    [sepolia.id]: http(),
    [anvil.id]: http(),
  },
}); 