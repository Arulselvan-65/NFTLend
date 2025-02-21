import { http } from "wagmi";
import { hardhat } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { Chain } from "wagmi/chains";

// Define Creator Network
const creatorNetwork = {
  id: 66665,
  name: 'Creator Network',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.creatorchain.io'],
    },
    public: {
      http: ['https://rpc.creatorchain.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Creator Explorer',
      url: 'https://explorer.creatorchain.io',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;

export const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID || '',
    chains: [creatorNetwork, hardhat],
    transports: {
      [hardhat.id]: http("http://127.0.0.1:8545"),
      [creatorNetwork.id]: http(creatorNetwork.rpcUrls.default.http[0]),
    },
    ssr: false, 
});

export default config;