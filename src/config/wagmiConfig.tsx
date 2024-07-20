import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from 'wagmi';
import { eduChainTestnet } from "./customChain";

const wagmiConfig = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
  chains: [eduChainTestnet],
  transports: {
    [eduChainTestnet.id]: http(eduChainTestnet.rpcUrls.default.http[0]),
  },
});

export { wagmiConfig };